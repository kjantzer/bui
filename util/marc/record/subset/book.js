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

    mainPerson(name, role='Author', ...sf){
        this.add('100', [1], [
            ['a', name],
            ['e', role],
            ...sf
        ])
    }

    additionalPerson(name, role, ...sf){
        this.add('700', [1], [
            ['a', name],
            ['e', role],
            ...sf
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
}

module.exports = Book