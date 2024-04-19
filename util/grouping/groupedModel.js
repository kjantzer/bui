import { Model} from 'backbone'

export default class GroupedCollModel extends Model {
    
    // override if needed
    // should return dayjs
    get ts(){ return this.get('timestamp_created') }

    get tsWeek(){ return this.ts.startOf('week').format('YYYY-MM-DD') }
    get tsHour(){ return this.ts.startOf('hour').format('YYYY-MM-DD HH:00:00') }
    get tsDay(){ return this.ts.format('YYYY-MM-DD') }
    get tsMonth(){ return this.ts.format('YYYY-MM') }
    get tsQuarter(){ return this.ts.format('YYYY Q')+this.ts.quarter() }
    get tsYear(){ return this.ts.format('YYYY') }
}