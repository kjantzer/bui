/*
    Book MARC Record

    An opinionated subset of the MARC record for books.
*/
const MarcRecord = require('../index')

class Book extends MarcRecord {

    title(title, credits){
        return this.add('245', [1,0], [
            ['a', title],
            ['c', credits]
        ])
    }

    subtitle(subtitle){
        this.add('246', [3, 0], [
            ['a', subtitle]
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
            ['a', edition]
        ])
    }

    mainPerson(name, role='Author'){
        this.add('100', [1], [
            ['a', name],
            ['e', role]
        ])
    }

    additionalPerson(name, role){
        this.add('700', [1], [
            ['a', name],
            ['e', role]
        ])
    }

    biasac(bisac){
        this.add('650', [,7], [
            ['a', bisac],
            ['2', 'bisacsh']
        ])
    }

    keyword(keyword, source){
        this.add('655', [,7], [
            ['a', keyword],
            ['2', source]
        ])
    }

    summary(val){
        this.add('520', [
            ['a', val]
        ])
    }

}

module.exports = Book