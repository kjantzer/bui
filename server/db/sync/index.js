const chalk = require('chalk')
const {prompt, shell} = require('./util')
const fs = require('fs')

const JOB_FILE = '/tmp/sync-job.json' // for "resuming" a job
const DEFAULT_OPTS = [
    '--single-transaction',
    '--opt', // fast dump, https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html#option_mysqldump_opt
    '--skip-triggers',
    '--compress',
    '--set-gtid-purged=OFF',
    '--default-character-set=utf8',
    '--hex-blob',
]

function query(PULL, sql){
    sql = sql.replace(/\n/g, ' '); // remove new lines as I dont think shell command will like them
    return shell(`mysql ${PULL} -Bse "${sql}"`)
}

process.on('unhandledRejection', (reason, promise) => {
    console.log(chalk.red(reason));
    process.exit()
});

module.exports = function syncDB({
    pull={},
    push={},
    structureOnly=[],
    historyFields=['ts_updated', 'ts_created', 'timestamp_updated', 'timestamp_created'],
    historyDays=30,
    largeTableSize=2000, // MB
    presets=[],
    dryRun=false,
    silent=true // change to false to test for errors in the last mysqldump part
}={}){ return new Promise(async (resolve, reject)=>{

    const PULL = `-h${pull.host} --port=${pull.port} -u${pull.user} -p${pull.pw} ${pull.db}`
    const PUSH = `-h${push.host} --port=${push.port} -u${push.user} -p${push.pw} ${push.db}`

    let prevJob = null
    
    try{
        prevJob = fs.readFileSync(JOB_FILE)
        prevJob = JSON.parse(prevJob)
    }catch(err){ prevJob = null }

    let dumpOptions = [].concat(DEFAULT_OPTS)
    let tablesStructureOnly = false
    let tablePromptOptions = []

    if( presets )
        tablePromptOptions = tablePromptOptions.concat(presets.map((preset, i)=>{
            return chalk.gray(`- \`${i}\`: ${preset.name}`)
        }))

    if( prevJob )
        tablePromptOptions.push(chalk.magenta(`- \`resume\` previous job of ${prevJob.tables.length} tables starting at \`${prevJob.tables[0]}\`; History days: ${prevJob.historyDays||'none'}`))

    let tables = await prompt([
        chalk.cyan(`List tables to import`),
        chalk.gray(`blank for all, table names separated by spaces, or...\n- \`wildcard*\` table name matching\n- use \`>m\` for all tables starting at M (greater or equal to M)`),
        ...tablePromptOptions,
        ``
    ], '')

    tables = tables.trim()//.toLowerCase()

    // did not choose to use previous job, so clear it 
    if( prevJob && tables != 'resume' )
        prevJob = null
 
    // looks like preset was chosen
    if( presets && tables.match(/^\d+$/)){

        let preset = presets[tables]

        if( !preset ) return reject('Invalid preset number')

        tables = preset.tables || ''
        if( preset.historyDays != undefined ) historyDays = preset.historyDays
        if( preset.largeTableSize != undefined ) largeTableSize = preset.largeTableSize
        if( preset.tablesStructureOnly != undefined ) tablesStructureOnly = preset.tablesStructureOnly
    }

    // get list of ALL tables from remote host
    if( tables == 'resume' ){

        if( !prevJob ) return reject('Nothing to resume')

        // reuse job specs
        tables = [...prevJob.tables] // clone
        tablesStructureOnly = prevJob.tablesStructureOnly
        historyDays = prevJob.historyDays
        largeTableSize = prevJob.largeTableSize // dont think we need to set this

    }else if( tables === 'all' || !tables ){

        tables = await query(PULL, `SHOW TABLES`)
        tables = tables.trim().split(`\n`).filter(t=>t)

        tablesStructureOnly = await structureOnlyPrompt(PULL, {pull, structureOnly, largeTableSize})

    // create array of tables from user input
    }else{
        tables = tables.split(' ')
        let _structureOnly = structureOnly
        let _usedWildcard = false
        let _tables = []

        console.log(chalk.gray('Determining tables...'));

        // look for wildcards and lookup tables that match
        for( let i in tables ){
            let table = tables[i]

            // only one table and requested all tables after (ex: `>m`)
            if( tables.length == 1 && tables[0].match(/^>/) ){

                _usedWildcard = true
                let after = table.replace(/^>/, '')
                let tablesAfter = await query(PULL, `SHOW TABLES WHERE Tables_in_${pull.db} > '${after}' 
                    AND LEFT(Tables_in_catalog_live, 1) != '_'`)
                tablesAfter = tablesAfter.trim().split(`\n`).filter(t=>t)
                _tables.push(...tablesAfter)

            // is wildcard
            }else if( table.match(/\*$/) ){

                _usedWildcard = true
                let like = table.replace(/\*$/, '%').replace(/_/, '\\_')
                let wildcardTables = await query(PULL, `SHOW TABLES LIKE '${like}'`)
                wildcardTables = wildcardTables.trim().split(`\n`).filter(t=>t)
                _tables.push(...wildcardTables)

            }else{

                let i = _structureOnly.indexOf(table)
                if( i > -1 )
                    _structureOnly.splice(i, 1) // delete

                _tables.push(table)
            }
        }
        tables = _tables

        if( tables.length == 0 )
            return reject('no tables match')

        console.log(chalk.gray(tables.join(' ')))

        // if any wild cards were used, use default structure only tables
        if( _usedWildcard ){
            tablesStructureOnly = await structureOnlyPrompt(PULL, {pull, structureOnly, largeTableSize})
        }
    }

    if( !prevJob ){

        // if requested a smaller number of tables, default to all data
        if( tables.length <= 15 )
            historyDays = ''

        historyDays = await prompt([
            chalk.red(`🕓 How many days history do you want?`),
            chalk.gray(`data will be MERGED with existing; leave BLANK for no limit\n`)
        ], historyDays)
    }

    if( historyDays != '' ){
        historyDays = parseInt(historyDays)
        
        if( isNaN(historyDays) ){
            return reject('Invalid number of days')
        }

        // replace data without dropping existing data
        dumpOptions.push('--replace', '--no-create-info')
    }

    // create regex tester for structure only tables
    let structureOnlyPatt = tablesStructureOnly ? new RegExp(tablesStructureOnly.map(patt=>{
        return '^'+patt.replace(/^\*|\*$/, '.+')+'$'
    }).join('|')) : false
    
    console.log('');
    console.log(chalk.inverse(` SYNC SUMMARY `) + (dryRun?' '+chalk.magenta('DRY RUN'):''))
    console.log(`Import: ${chalk.cyan(tables.length+' tables')} into `+chalk.red(push.db));
    
    if( tablesStructureOnly.length > 0 )
        console.log('Structure Only: '+tablesStructureOnly.join(' '));
        
    if( historyDays )
        console.log(`History: ${historyDays} days`);
    else if( historyDays === 0)
        console.log('Structure only');
    else
        console.log('History: all data');
        
    if( (await prompt(chalk.yellow.inverse(`Continue? [y/N]\n`))) !== 'y' )
        return resolve()

    let job = {tables: [...tables], historyDays, tablesStructureOnly, largeTableSize}
    fs.writeFileSync(JOB_FILE, JSON.stringify(job))

    // sync each table
    for( let i in tables){

        let num = parseInt(i)+1
        let table = tables[i]
        let title = chalk.cyan(num)+chalk.gray(`/${tables.length} `)+chalk.yellow(table)

        let options = [].concat(dumpOptions)
        
        // should this table be structure only? (no data)
        if( historyDays === 0 || (structureOnlyPatt && structureOnlyPatt.test(table)) ){
            title += chalk.gray.inverse(' (structure only)')
            options.push('--no-data')
        }

        if( historyDays > 0 ){
            let tableColumns = await query(PULL, `SELECT column_name FROM information_schema.columns WHERE table_name = '${table}' AND table_schema = '${pull.db}'`)
            tableColumns = tableColumns.split(`\n`)

            let historyField = tableColumns.find(col=>historyFields.includes(col))
            
            if( historyField ){
                title += chalk.magenta(` [${historyDays} day history]`)
                options.push(`"--where=${historyField} > now() - interval ${historyDays} day"`)
            }
        }
        options = options.join(' ')

        let _silent = silent ? '2>/dev/null' : ''
        let cmd = [
            `mysqldump ${PULL} ${table} ${options} ${_silent}`, // dump the data
            `pv --name "${title}" -t -b -r`, // show a timer, bytes transfer, and rate of transfer
            `mysql ${PUSH} ${_silent}` // import the data
        ].join(' | ')

        if( dryRun )
            console.log(chalk.gray(cmd));
        else
            await shell(cmd, {stdio: 'inherit'})

        // update 
        job.tables.shift() // remove start of stack
        fs.writeFileSync(JOB_FILE, JSON.stringify(job)) // rewrite the job file
        
    }

    // trash job file, we're all done
    fs.unlinkSync(JOB_FILE)

    console.log(chalk.green("\n✅ Sync Done"));
    resolve()

})}



async function structureOnlyPrompt(PULL, {pull, structureOnly, largeTableSize}={}){

    largeTableSize = await prompt([
        chalk.magenta(`🗄 Structure only for large tables?`),
        chalk.gray(`size in MB; leave empty for no limit\n`)
    ], largeTableSize)

    if( largeTableSize != '' ){
        largeTableSize = parseFloat(largeTableSize)
        
        if( isNaN(largeTableSize) ){
            return reject('Invalid number for "large table size"')
        }
    }
    
    let largeTables = !largeTableSize ? '' : await query(PULL, /*sql*/`
        SELECT table_name 
        FROM information_schema.TABLES 
        WHERE table_schema = '${pull.db}'
        AND round(((data_length + index_length) / 1024 / 1024 ), 2) >= ${largeTableSize}
    `)
    largeTables = largeTables.trim().split(`\n`).filter(t=>t)
    
    if( largeTables.length > 0 )
        console.log(chalk.gray('Structure only: '+largeTables.join(', ')))

    
    // ask the user if they want to only get structure for certain tables
    let tablesStructureOnly = await prompt([
        chalk.magenta(`Other structure only tables:\n`),
    ], structureOnly.join(' '))

    tablesStructureOnly = tablesStructureOnly.split(' ').filter(t=>t)

    tablesStructureOnly = tablesStructureOnly.concat(largeTables)

    return tablesStructureOnly
}