/*
    Book MARC Record

    An opinionated subset of the MARC record for books.
    Methods handle the ISBD punctuation, indicators, and subfield order (RDA)
*/
const MarcRecord = require('../index')
const {stringToSubfields} = require('../../util')

const LANGUAGES = {
    'arabic': 'ara', 'cantonese': 'yue', 'danish': 'dan', 'dutch': 'dut', 'english': 'eng',
    'filipino': 'fil', 'finnish': 'fin', 'french': 'fre', 'german': 'ger',
    'greek': 'grc', 'hindi': 'hin', 'hungarian': 'hun', 'italian': 'ita',
    'japanese': 'jpn', 'korean': 'kor', 'malay': 'zlm', 'mandarin': 'cmn',
    'marathi': 'mar', 'norwegian': 'nor', 'persian': 'fas', 'polish': 'pol',
    'portuguese': 'por', 'russian': 'rus', 'spanish': 'spa', 'swedish': 'swe',
    'thai': 'tha', 'turkish': 'tur', 'vietnamese': 'vie', 'yiddish': 'yid'
}

const NONFILING_ARTICLES = ['a', 'an', 'the', 'el', 'la', 'las', 'lo', 'los', 'un', 'una']

// subtitles that don't make a useful variant title
const GENERIC_SUBTITLE = /^(a|an)\s+(novel|thriller|memoir|mystery|romance|novella)\.?$/i

// ensure string ends with punctuation (unless it already ends with one of `allowed`)
const endWith = (str, char, allowed='.')=>{
    str = String(str).trim()
    return allowed.includes(str.slice(-1)) ? str : str+char
}

class Book extends MarcRecord {

    // ex: `13 hr.`, `11 1/2 hr.`, `14 hr., 19 min.`
    static runtime(hours){
        let mins = Math.round(parseFloat(hours||0) * 60)
        if( !mins ) return ''

        let h = Math.floor(mins / 60)
        let m = mins % 60

        if( !h ) return `${m} min.`
        if( !m ) return `${h} hr.`
        if( m == 30 ) return `${h} 1/2 hr.`
        return `${h} hr., ${m} min.`
    }

    static languageCode(language, fallback='eng'){
        return LANGUAGES[String(language||'').trim().toLowerCase()] || fallback
    }

    // number of characters to ignore when sorting (ex: "The ")
    static nonfilingChars(title){
        let firstWord = String(title||'').split(' ').shift()
        return NONFILING_ARTICLES.includes(firstWord.toLowerCase()) && title.includes(' ') ? firstWord.length+1 : 0
    }

    // 005 - formatted as yyyymmddhhmmss.f
    lastModified(date=new Date()){
        this.dateLastModified = timestamp(date)
    }

    // 008 - fixed-length data elements
    // material specific positions (18-34) should be given by their start position
    fixedLengthData({entered=new Date(), date1, date2, place='xxu', language='eng', source='d', ...positions}={}){

        date1 = date1 ? String(date1) : ''
        date2 = date2 && String(date2) != date1 ? String(date2) : ''

        this.add('008', {
            0: timestamp(entered).slice(2, 8), // date entered on file (yymmdd)
            6: !date1 ? 'n' : date2 ? 't' : 's', // type of date [unknown, publication and copyright, single]
            7: date1,
            11: date2,
            15: place,
            35: language,
            39: source, // cataloging source
            ...positions
        })
    }

    // 020 - ex: isbn('9798228915534', '(sound recording ;', 'Blackstone Library CD)')
    isbn(isbn, ...qualifiers){
        this.add('020', [
            ['a', isbn],
            ...qualifiers.filter(Boolean).map(q=>['q', q])
        ])
    }

    // 035
    oclcNumber(ocn){
        this.add('035', [['a', `(OCoLC)${String(ocn).replace(/^0+/, '')}`]])
    }

    // 037
    sourceOfAcquisition(stockNumber, source){
        this.add('037', [['a', stockNumber], ['b', source]])
    }

    // 040
    catalogingSource(agency, {language='eng', rules='rda', transcribing=agency}={}){
        this.add('040', [
            ['a', agency],
            ['b', language],
            ['e', rules],
            ['c', transcribing],
        ])
    }

    // 050 - ex: `PS3566.A822` or `PS3566.A822$bM75 2026`
    lcClassification(str){
        this.add('050', [,4], [
            ['a', str.split('$').shift()],
            ...stringToSubfields(str)
        ])
    }

    // 082 - ex: `813/.54$223`
    deweyClassification(str){
        this.add('082', [0,4], [
            ['a', str.split('$').shift()],
            ...stringToSubfields(str)
        ])
    }

    // 245 (and 246 for the subtitle)
    title(title, {subtitle, statement, hasMainEntry=true}={}){

        title = title?.trim()
        subtitle = subtitle?.trim()
        statement = statement?.trim()

        let sf = [['a', title + (subtitle ? ' :' : statement ? ' /' : '')]]

        if( subtitle )
            sf.push(['b', subtitle + (statement ? ' /' : '')])

        if( statement )
            sf.push(['c', endWith(statement, '.')])

        this.add('245', [hasMainEntry ? 1 : 0, Book.nonfilingChars(title)], sf)

        if( subtitle )
            this.subtitle(subtitle)
    }

    // 246 - subtitle as a variant title (leading article removed)
    subtitle(subtitle){
        if( !subtitle || GENERIC_SUBTITLE.test(subtitle) ) return

        let variant = subtitle.trim().replace(new RegExp(`^(${NONFILING_ARTICLES.join('|')})\\s+`, 'i'), '')

        this.add('246', [3, 0], [
            ['a', variant[0].toUpperCase() + variant.slice(1)]
        ])
    }

    series(series, volume){
        if( volume && !series.endsWith(';'))
            series += ' ;'

        let fields = [['a', series]]

        if( volume)
            fields.push(['v', volume])

        return this.add('490', [0], fields)
    }

    edition(edition){
        this.add('250', [
            ['a', endWith(edition, '.')]
        ])
    }

    // 264 _1 - place and date are often "supplied" so caller should add brackets as needed
    publication(place, publisher, date){
        let sf = [['a', place + (publisher ? ' :' : date ? ',' : '')]]

        if( publisher )
            sf.push(['b', publisher + (date ? ',' : '')])

        if( date )
            sf.push(['c', date])

        this.add('264', [,1], sf)
    }

    // 264 _4
    copyright(year, {phonogram=false}={}){
        this.add('264', [,4], [
            ['c', `${phonogram ? '℗' : '©'}${year}`]
        ])
    }

    // 300 - ex: physicalDescription('11 audio discs (13 hr.)', 'CD audio, digital', '4 3/4 in.')
    physicalDescription(extent, details, dimensions){
        let sf = [['a', extent + (details ? ' :' : dimensions ? ' ;' : '')]]

        if( details )
            sf.push(['b', details + (dimensions ? ' ;' : '')])

        if( dimensions )
            sf.push(['c', dimensions])

        this.add('300', sf)
    }

    // 100/110 - name may include subfields, ex: `Patterson, James,$d1947-`
    mainPerson(name, roles, opts={}){
        this.person(name, roles, {...opts, main: true})
    }

    // 700/710
    additionalPerson(name, roles, opts={}){
        this.person(name, roles, {...opts, main: false})
    }

    person(name, roles=[], {main=false, corporate=false}={}){

        roles = [roles].flat().filter(Boolean)

        let sf = [['a', name.split('$').shift().trim()], ...stringToSubfields(name)]
        let ind1 = corporate ? 2 : sf[0][1].includes(',') ? 1 : 0 // surname first or forename only

        roles.forEach((role, i)=>{
            sf.push(['e', role.toLowerCase() + (i == roles.length - 1 ? '.' : ',')])
        })

        // elements before dates and relator terms must end in a comma
        sf.forEach((s, i)=>{
            let next = sf[i+1]
            if( next && ['d', 'e'].includes(next[0]) && !s[1].match(/[,-]$/) )
                s[1] = s[1].trim()+','
        })

        let tag = (main ? 1 : 7) + (corporate ? '10' : '00')

        this.add(tag, [ind1], sf)
    }

    biasac(bisac){
        this.add('650', [,7], [
            ['a', endWith(bisac, '.')],
            ['2', 'bisacsh']
        ])
    }

    keyword(keyword, source){
        this.add('655', [,7], [
            ['a', endWith(keyword, '.', '.)')],
            ['2', source]
        ])
    }

    summary(val){
        this.add('520', [
            ['a', val]
        ])
    }

    content(term, code, source='rdacontent'){
        this.add('336', [['a', term], ['b', code], ['2', source]])
    }

    media(term, code, source='rdamedia'){
        this.add('337', [['a', term], ['b', code], ['2', source]])
    }

    carrier(term, code, source='rdacarrier'){
        this.add('338', [['a', term], ['b', code], ['2', source]])
    }

    typeOfRecording(type, source='rdatr'){
        this.add('344', [['a', type], ['2', source]])
    }

    recordingMedium(medium, source='rdarm'){
        this.add('344', [['b', medium], ['2', source]])
    }

    fileType(type, source='rdaft'){
        this.add('347', [['a', type], ['2', source]])
    }

    encodingFormat(format){
        this.add('347', [['b', format]])
    }

    generalNote(note){
        this.add('500', [['a', note]])
    }

    // 511
    performerNote(note){
        this.add('511', [0], [['a', endWith(note, '.')]])
    }

    // 538
    systemDetails(note){
        this.add('538', [['a', note]])
    }
}

function timestamp(date=new Date()){
    let pad = n=>String(n).padStart(2, '0')
    return date.getFullYear()+pad(date.getMonth()+1)+pad(date.getDate())
        +pad(date.getHours())+pad(date.getMinutes())+pad(date.getSeconds())+'.0'
}

module.exports = Book
