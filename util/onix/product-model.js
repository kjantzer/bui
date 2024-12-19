/*
    An opionated model class for gathering important data from both versions of Onix
*/
const dayjs = require('dayjs')
const groupBy = require('../array.groupBy')

module.exports = class OnixProductModel {

    constructor(onix){
        this.onix = onix
    }

    get(key){
        return this[key]
    }

    toJSON(opts={}){
        let data = {}
        let getters = Object.getOwnPropertyDescriptors(this.constructor.prototype)
        for( let key in getters ){
            let getter = getters[key]
            if( !getter.set && getter.get && !['is2', 'is3'].includes(key) )
                data[key] = this.onix ? this[key] : null
        }

        if( opts.array ){
            let dataArray = []
            for( let k in data ){
                dataArray.push({key: k, val: data[k]})
            }
            return dataArray
        }

        if( opts.string )
            return JSON.stringify(data, null, 2)

        return data
    }

    get release(){ return this.onix?.release }
    get is2(){ return this.release == '2.1' }
    get is3(){ return this.release ==  '3.0' }

    get recordID(){ return this.onix.getValue('RecordReference')}
    get isbn13(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'ISBN-13'}) }
    get isbn10(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'ISBN-10'}) }
    get gtin13(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'GTIN-13'}) }
    
    get workID(){
        if( this.is2 ) return this.onix.getValue('WorkIdentifier.IDValue')
        return this.onix.getValue('RelatedMaterial.RelatedWork.WorkIdentifier.IDValue')
    }
    get relatedIDs(){ 
        if( this.is2 ) return this.onix.get('RelatedProductInfo')?.getValues('ProductIdentifier.IDValue')
        return this.onix.get('RelatedMaterial.RelatedProduct')?.getValues('ProductIdentifier.IDValue')
    }

    // aliases to match old php
    get partnerRef(){ return this.gtin13 || this.isbn13 }
    get providerRef(){ return this.workID }

    get publisherName(){
        if( this.is2 ) return this.onix.get('Publisher')?.getValue('PublisherName')
        return this.onix.get('PublishingDetail.Publisher')?.getValue('PublisherName')
    }

    get imprintName(){
        if( this.is2 ) return this.onix.get('Imprint')?.getValue('ImprintName')
        return this.onix.get('PublishingDetail.Imprint')?.getValue('ImprintName')
    }
    
    get title(){

        if( this.is2 )
            return this.onix.getValue('Title.TitleText')
        
        let title = this.onix.getValue('DescriptiveDetail.TitleDetail.TitleElement.TitleText')

        if( !title ){
            title = this.onix.getValue('DescriptiveDetail.TitleDetail.TitleElement.TitleWithoutPrefix')
            let prefix = this.onix.getValue('DescriptiveDetail.TitleDetail.TitleElement.TitlePrefix') || ''

            if( title && prefix )
                title = prefix+' '+title
        }

        return title
    }
    
    get subtitle(){ 
        if( this.is2 ) return this.onix.getValue('Title.Subtitle')
        return this.onix.getValue('DescriptiveDetail.TitleDetail.TitleElement.Subtitle')
    }

    get releaseDate(){
        let date = this.is2 ? this.onix.formatDate(this.onix.get('PublicationDate')) : this.onix.getValue('PublishingDetail.PublishingDate.Date')
        return date ? dayjs(date).format('YYYY-MM-DD') : date
    }

    get seriesName(){ 
        return this.onix.getValue('DescriptiveDetail.Collection.TitleDetail.TitleElement.TitleText')
    }

    get seriesNum(){ 
        return this.onix.getValue('DescriptiveDetail.Collection.TitleDetail.TitleElement.PartNumber')
    }

    get productForm(){ 
        if( this.is2 ) return this.onix.getValue('ProductForm')
        return this.onix.getValue('DescriptiveDetail.ProductForm')
    }

    get productFormCode(){ 
        if( this.is2 ) return this.onix.get('ProductForm.value')
        return this.onix.get('DescriptiveDetail.ProductForm.value')
    }

    get productFormDetail(){
        if( this.is2 ) return this.onix.getValue('ProductFormDetail')
        return this.onix.getValue('DescriptiveDetail.ProductFormDetail')
    }
    
    get edition(){
        if( this.is2 ) return this.onix.getValue('EditionTypeCode')
        return this.onix.getValue('DescriptiveDetail.EditionType')
    }

    // TODO: check
    get editionStatement(){
        if( this.is2 ) return this.onix.getValue('EditionStatement')
        return this.onix.getValue('DescriptiveDetail.EditionStatement')
    }
    
    get language(){ 
        if( this.is2 ) return this.onix.getValue('Language.LanguageCode')
        return this.onix.getValue('DescriptiveDetail.Language.LanguageCode')
    }

    // mainbisac|otherbisac,otherbisac
    get bisacs(){
        
        if( this.is2 )
            return [
                this.onix.getValue('BASICMainSubject')
            ]
        return [
            this.onix.get('DescriptiveDetail.subject')?.getValue('SubjectCode', {
                SubjectSchemeIdentifier: 'BISAC Subject Heading', MainSubject: true}),
            this.onix.get('DescriptiveDetail.subject')?.getValues('SubjectCode', {
                SubjectSchemeIdentifier: 'BISAC Subject Heading', MainSubject: false}).join(','),
        ].join('|')
    }

    get keywords(){ 
        if( this.is2 ) return this.onix.get('subject')?.getValue('SubjectHeadingText', {SubjectSchemeIdentifier: 'Keywords'})
        return this.onix.get('DescriptiveDetail.subject')?.getValue('SubjectHeadingText', {SubjectSchemeIdentifier: 'Keywords'})
    }

    get territories(){ 
        if( this.is2 ) return this.onix.getValue('SalesRights.RightsTerritory')
        return this.onix.getValue('PublishingDetail.SalesRights.Territory.CountriesIncluded')
    }

    // not reliable
    // get img(){ return this.onix.getValue('CollateralDetail.SupportingResource.ResourceVersion.ResourceLink')}

    get coverImg(){
        // TODO: 2.1

        let img = this.onix.get('CollateralDetail.SupportingResource')
                    ?.find({ResourceContentType: 'Front cover'})
                    ?.getValue('ResourceVersion.ResourceLink')
        return img
    }

    get duration(){
        let dur = this.is2 ? this.onix.get('Extent') : this.onix.get('DescriptiveDetail.Extent')
        if( !dur ) return null

        let val = dur?.getValue('ExtentValue', {ExtentType: 'Duration'})
        let h, m, s;
        let unit = dur?.get('ExtentUnit.value')

        switch(unit){
            // minutes
            case '05': val = val * 60; break;
			
            // hours
            case '04':
            case '14': val = parseFloat(val) * 60 * 60; break;
            
            // HHHMM
            case '15':
                [, h, m] = val.match(/(\d{3})(\d{2})/)
                val = (parseFloat(m)*60) + (parseFloat(h)*60*60);
                break;
        
            // HHHMMSS
            case '16':
                [, h, m, s] = val.match(/(\d{3})(\d{2})(\d{2})/)
                val = parseFloat(s) + (parseFloat(m)*60) + (parseFloat(h)*60*60);
                break;
        }

        return Math.round((val / 60 / 60)*100)/100 // hours
    }

    get copy(){
        // order of preference
        let text = null
        let type = ['Description', 'Main description', 'Primary cover copy', 'Sender-defined text']
        let texts = this.is2 ? this.onix.get('OtherText') : this.onix.get('CollateralDetail.TextContent')

        if( texts )
        type.find(type=>{
            return text = texts.getValue('Text', {TextType: type})
        })

        return text
    }

    get quotes(){
        return 'WIP'
    }

    get illustrationNote(){
        if( this.is2 ) return this.onix.getValue('IllustrationsNote')
        return this.onix.getValue('DescriptiveDetail.IllustrationsNote')
    }

    get credits(){
        let credits = this.is2 ? this.onix.get('contributor') : this.onix.get('DescriptiveDetail.Contributor')

        if( !credits ) return credits

        credits = credits.map(d=>{
            return {
                name: d.getValue('PersonName'),
                first: d.getValue('NamesBeforeKey'),
                last: d.getValue('KeyNames'),
                ordinal: d.getValue('SequenceNumber'),
                bio: d.getValue('BiographicalNote'),
                roles: d.getArray('ContributorRole')?.map(m=>m.get?.('value'))
            }
        })

        // group credits by the same name (should only be cause of separate roles)
        credits = groupBy.call(credits, 'name', {forceArray: true, returnAsArray: true})

        // now reduce to one of each person, but combine the roles listed
        credits = credits.map(credits=>{
            // combine all roles
            let roles = credits.flatMap(credit=>credit.roles)

            return {
                ...credits[0],
                roles
            }
        })

        return credits
    }

    get availability(){
        // TODO: v2
        return this.onix.getValue('ProductSupply.SupplyDetail.0.ProductAvailability')
    }

    get embargo(){
        // TODO: v2
        let date = this.onix.get('ProductSupply.SupplyDetail.0.SupplyDate')
        if( date?.getValue('SupplyDateRole') == 'Sales embargo date' )
            return date.getValue('Date')
    }

    get price(){
        return this.prices?.find(d=>d.currency == 'USD')?.price
    }

    get prices(){
        return this.onix.get('ProductSupply.SupplyDetail.Price')?.filter(m=>{
            return !m.getValue('PriceQualifier') || ['Consumer price', 'Unqualified price'].includes(m.getValue('PriceQualifier'))
        }).map(m=>{
            return {
                price: m.getValue('PriceAmount'),
                currency: m.get('CurrencyCode.value'),
                territory: m.get('Territory')?.toJSON()
            }
        })
    }
}