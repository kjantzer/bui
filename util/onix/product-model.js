/*
    An opionated model class for gathering important data from both versions of Onix
*/
const dayjs = require('dayjs')
const groupBy = require('../array.groupBy')
const {decodeHtmlEntity} = require('../string')

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
            if( getter.get && !['is2', 'is3', 'release'].includes(key) )
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
    set recordID(id){ return this.onix.set('RecordReference', id)}

    get isbn13(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'ISBN-13'}) }
    get isbn10(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'ISBN-10'}) }
    get gtin13(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'GTIN-13'}) }

    // TODO: add check for existing and update?
    set isbn13(id){ return this.onix.set('ProductIdentifier', {IDValue: id, ProductIDType: 'ISBN-13'}) }
    set isbn10(id){ return this.onix.set('ProductIdentifier', {IDValue: id, ProductIDType: 'ISBN-10'}) }
    set gtin13(id){ return this.onix.set('ProductIdentifier', {IDValue: id, ProductIDType: 'GTIN-13'}) }
    
    get workID(){
        if( this.is2 ) return this.onix.getValue('WorkIdentifier.IDValue')
        return this.onix.getValue('RelatedMaterial.RelatedWork.WorkIdentifier.IDValue')
    }

    set workID(id){
        if( this.is2 ) return this.onix.set('WorkIdentifier.IDValue', id)
        return this.onix.set('RelatedMaterial.RelatedWork.WorkIdentifier.IDValue', id)
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

    set publisherName(name){
        if( this.is2 ) return this.onix.set('Publisher.PublisherName', name)
        return this.onix.set('PublishingDetail.Publisher.PublisherName', name)
    }

    get imprintName(){
        if( this.is2 ) return this.onix.get('Imprint')?.getValue('ImprintName')
        return this.onix.get('PublishingDetail.Imprint')?.getValue('ImprintName')
    }

    set imprintName(name){
        if( this.is2 ) return this.onix.set('Imprint.ImprintName', name)
        return this.onix.set('PublishingDetail.Imprint.ImprintName', name)
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

        return decodeHtmlEntity(title)
    }

    set title(title){

        if( this.is2 )
            return this.onix.set('Title.TitleText', title)
        
        this.onix.set('DescriptiveDetail.TitleDetail.TitleElement.TitleText', title)
    }
    
    get subtitle(){ 
        if( this.is2 ) return decodeHtmlEntity(this.onix.getValue('Title.Subtitle'))
        return decodeHtmlEntity(this.onix.getValue('DescriptiveDetail.TitleDetail.TitleElement.Subtitle'))
    }

    set subtitle(subtitle){ 
        if( this.is2 ) return this.onix.set('Title.Subtitle', subtitle)
        return this.onix.set('DescriptiveDetail.TitleDetail.TitleElement.Subtitle', subtitle)
    }

    get releaseDate(){
        let date = this.is2 ? this.onix.formatDate(this.onix.get('PublicationDate')) : this.onix.getValue('PublishingDetail.PublishingDate.Date')
        date = date ? dayjs(date).format('YYYY-MM-DD') : date

        // I think we want to do this? (at least, may be what we did before)
        if( !date )
            date = this.availabilityDate

        return date
    }

    set releaseDate(date){
        date = dayjs(date).format('YYYY-MM-DD')

        this.is2 ? this.onix.set('PublicationDate', date) : this.onix.set('PublishingDetail.PublishingDate.Date', date)
    }

    get seriesName(){ 
        if( this.is2 ) return decodeHtmlEntity(this.onix.getValue('Series.TitleOfSeries'))
        return decodeHtmlEntity(this.onix.getValue('DescriptiveDetail.Collection.TitleDetail.TitleElement.TitleText'))
    }

    set seriesName(series){ 
        return this.onix.set('DescriptiveDetail.Collection.TitleDetail.TitleElement.TitleText', series)
    }

    get seriesNum(){ 
        if( this.is2 ) return this.onix.getValue('Series.SeriesPartName')
        return this.onix.getValue('DescriptiveDetail.Collection.TitleDetail.TitleElement.PartNumber')
    }

    set seriesNum(num){ 
        return this.onix.set('DescriptiveDetail.Collection.TitleDetail.TitleElement.PartNumber', num)
    }

    get productForm(){ 
        if( this.is2 ) return this.onix.getValue('ProductForm')
        return this.onix.getValue('DescriptiveDetail.ProductForm')
    }

    set productForm(form){ 
        if( this.is2 ) return this.onix.set('ProductForm', form)
        return this.onix.set('DescriptiveDetail.ProductForm', form)
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

    set language(lang){
        if( this.is2 ) return this.onix.set('Language', {LanguageCode: lang, LanguageRole: 'Language of text'})
        return this.onix.set('DescriptiveDetail.Language', {LanguageCode: lang, LanguageRole: 'Language of text'})
    }

    // mainbisac|otherbisac,otherbisac
    get bisacs(){
        
        if( this.is2 )
            return [
                this.onix.getValue('BASICMainSubject'),
                this.onix.get('Subject')?.getValues('SubjectCode', {
                    SubjectSchemeIdentifier: 'BISAC Subject Heading', MainSubject: false}).join(',')
            ].filter(s=>s).join('|')
            
        return [
            this.onix.get('DescriptiveDetail.subject')?.getValue('SubjectCode', {
                SubjectSchemeIdentifier: 'BISAC Subject Heading', MainSubject: true}),
            this.onix.get('DescriptiveDetail.subject')?.getValues('SubjectCode', {
                SubjectSchemeIdentifier: 'BISAC Subject Heading', MainSubject: false}).join(','),
        ].filter(s=>s).join('|')
    }

    get keywords(){ 
        if( this.is2 ) return this.onix.get('subject')?.getValue('SubjectHeadingText', {SubjectSchemeIdentifier: 'Keywords'})
        return this.onix.get('DescriptiveDetail.subject')?.getValue('SubjectHeadingText', {SubjectSchemeIdentifier: 'Keywords'})
    }

    set keywords(keywords){ 
        if( Array.isArray(keywords) )
            keywords = keywords.join(',')

        if( this.is2 ) return this.onix.get('subject', {SubjectHeadingText: keywords, SubjectSchemeIdentifier: 'Keywords'})
        return this.onix.set('DescriptiveDetail.subject', {SubjectHeadingText: keywords, SubjectSchemeIdentifier: 'Keywords'})
    }

    get territories(){ 
        // NOTE: use RightsTerritory too?
        if( this.is2 ){
            return this.onix.get('SalesRights')
            ?.filter(d=>['00', '01', '02'].includes(d.get('SalesRightsType.value')))// exlusive and non-exclusive
            .map(d=>d.getValue('RightsCountry'))
            .join(' ').split(' ').sort().join(' ')
        }
        //return this.onix.getValue('SalesRights.RightsCountry')

        return this.onix.get('PublishingDetail.SalesRights')
            ?.filter(d=>['00', '01', '02'].includes(d.get('SalesRightsType.value')))// exlusive and non-exclusive
            .map(d=>d.getValue('Territory.CountriesIncluded'))
            .join(' ').split(' ').sort().join(' ')
    }
    // TODO: get territories by exclusive vs non? then a a combined?

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
        let unit = String(dur?.find({ExtentType: 'Duration'}).get('ExtentUnit.value'))

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
            if( this.is2 )
                return text = texts.getValue('Text', {TextTypeCode: type})

            return text = texts.getValue('Text', {TextType: type})
        })

        return text
    }

    set copy(copy){
        this.is2 
        ? this.onix.set('OtherText', {Text: copy, TextTypeCode: 'Main description'}) 
        : this.onix.set('CollateralDetail.TextContent', {Text: copy, TextType: 'Description'})
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
                name: decodeHtmlEntity(d.getValue('PersonName')),
                first: decodeHtmlEntity(d.getValue('NamesBeforeKey')),
                last: decodeHtmlEntity(d.getValue('KeyNames')),
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

    // WIP
    set credit(data){

        let onix = {
            PersonName: data.name,
            KeyNames: data.last,
            NamesBeforeKey: data.first,
            ContributorRole: data.roles,
            BiographicalNote: data.bio
        }

        if( !onix.PersonName ){
            // use first/last
        }
        
        this.onix.set(this.is2?'Contributor':'DescriptiveDetail.Contributor', onix)

    }

    get availability(){
        return this.is2
        ? this.onix.getValue('SupplyDetail.0.ProductAvailability')
        : this.onix.getValue('ProductSupply.SupplyDetail.0.ProductAvailability')
    }

    get availabilityCode(){
        return this.is2 
        ? String(this.onix.get('SupplyDetail.0.ProductAvailability.value'))
        : String(this.onix.get('ProductSupply.SupplyDetail.0.ProductAvailability.value'))
    }

    get embargo(){

        if( this.is2 )
            return this.onix.formatDate(this.onix.getValue('SupplyDetail.0.OnSaleDate'))

        return this.onix.get('ProductSupply.SupplyDetail.0.SupplyDate')
            ?.getValue('Date', {SupplyDateRole: 'Sales embargo date'})
    }

    get availabilityDate(){
        
        if( this.is2 )
            return this.onix.formatDate(this.onix.getValue('SupplyDetail.0.ExpectedShipDate'))

        return this.onix.get('ProductSupply.SupplyDetail.0.SupplyDate')
            ?.getValue('Date', {SupplyDateRole: 'Expected availability date'})
    }

    get price(){
        return this.prices?.find(d=>d.currency == 'USD')?.price
    }

    get prices(){
        let prices = this.is2 ? this.onix.get('SupplyDetail.Price') : this.onix.get('ProductSupply.SupplyDetail.Price')
        
        return prices?.filter(m=>{
            return !m.getValue('PriceQualifier') || ['Consumer price', 'Unqualified price'].includes(m.getValue('PriceQualifier'))
        }).map(m=>{
            return {
                price: m.getValue('PriceAmount'),
                currency: m.get('CurrencyCode.value'),
                territory: m.get('Territory')?.toJSON()
            }
        })
    }

    get drm(){
        return null // FIXME:
    }

    get cartonQty(){
        if( this.is2 ) this.onix.get('SupplyDetail.0.PackQuantity')
        return this.onix.get('ProductSupply.SupplyDetail.0.PackQuantity')
    }
}