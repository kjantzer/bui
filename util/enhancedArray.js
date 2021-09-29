
module.exports = class EnhancedArray extends Array {

    isFirst(val){
        return this.indexOf(val) == 0
    }

    isLast(val){
        return this.indexOf(val) == this.length-1
    }

    isAfter(val, otherVal){
        let [vi, ovi] = this.indexOfRange(val, otherVal)
        if( vi < 0 || ovi < 0 ) return false
        return vi > ovi
    }

    isBefore(val, otherVal){
        let [vi, ovi] = this.indexOfRange(val, otherVal)
        if( vi < 0 || ovi < 0 ) return false
        return vi > ovi
    }

    indexOfRange(start, end){
        return [this.indexOf(start), this.indexOf(end)]
    }

    after(val){
        let i = this.indexOf(val)
        if( i < 0 || i >= this.length ) return undefined
        return this[++i]
    }

    before(val){
        let i = this.indexOf(val)
        if( i <= 0 ) return undefined
        return this[--i]
    }
}