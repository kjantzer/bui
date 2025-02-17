/*
    An opionated model class for gathering important data from both versions of Onix
*/
const dayjs = require('dayjs')
const groupBy = require('../array.groupBy')
const {decodeHtmlEntity, separatePrefix} = require('../string')
const {uniformAndDedupeCSV} = require('./util')

const TO_JSON_BLACKLIST = ['release', 'is2', 'is3', 'series']

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
            if( getter.get && !TO_JSON_BLACKLIST.includes(key) )
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

    get notificationType(){ return this.onix.getValue('NotificationType') }
    set notificationType(type){ return this.onix.set('NotificationType', type) }

    get recordID(){ return this.onix.getValue('RecordReference')}
    set recordID(id){ return this.onix.set('RecordReference', id)}

    get proprietaryID(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'Proprietary'}) }
    set proprietaryID(id){ return this.onix.set('ProductIdentifier', {ProductIDType: 'Proprietary', IDValue: id}) }

    get isbn13(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'ISBN-13'}) }
    get isbn10(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'ISBN-10'}) }
    get gtin13(){ return this.onix.get('ProductIdentifier')?.getValue('IDValue', {ProductIDType: 'GTIN-13'}) }

    // TODO: add check for existing and update?
    set isbn13(id){ return this.onix.set('ProductIdentifier', {ProductIDType: 'ISBN-13', IDValue: id}) }
    set isbn10(id){ return this.onix.set('ProductIdentifier', {ProductIDType: 'ISBN-10', IDValue: id}) }
    set gtin13(id){ return this.onix.set('ProductIdentifier', {ProductIDType: 'GTIN-13', IDValue: id}) }
    
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
    // get providerRef(){ return this.workID }

    get publisherName(){
        if( this.is2 ) return this.onix.get('Publisher')?.getValue('PublisherName')
        return this.onix.get('PublishingDetail.Publisher')?.getValue('PublisherName')
    }

    set publisherName(name){
        if( this.is2 ) return this.onix.set('Publisher', {PublishingRole: 'Publisher', PublisherName: name})
        return this.onix.set('PublishingDetail.Publisher', {PublishingRole: 'Publisher', PublisherName: name})
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
            return decodeHtmlEntity(this.onix.getValue('Title.TitleText'))
        
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
        
        this.onix.set('DescriptiveDetail.TitleDetail.TitleType', '01')
        this.onix.set('DescriptiveDetail.TitleDetail.TitleElement.TitleText', title)
    }

    set titleAndPrefix(title){
        let {prefix, label} = separatePrefix(title)
        
        if( this.is2 )
            return this.onix.set('Title', {TitleWithoutPrefix: label, TitlePrefix: prefix})
        
        this.onix.set('DescriptiveDetail.TitleDetail.TitleType', '01')
        this.onix.set('DescriptiveDetail.TitleDetail.TitleElement', {
            TitleWithoutPrefix: label,
            TitlePrefix: prefix
        })
    }
    
    get subtitle(){ 
        if( this.is2 ) return decodeHtmlEntity(this.onix.getValue('Title.Subtitle'))
        return decodeHtmlEntity(this.onix.getValue('DescriptiveDetail.TitleDetail.TitleElement.Subtitle'))
    }

    set subtitle(subtitle){ 
        if( !subtitle ) return
        if( this.is2 ) return this.onix.set('Title.Subtitle', subtitle)
        return this.onix.set('DescriptiveDetail.TitleDetail.TitleElement.Subtitle', subtitle)
    }

    get releaseDate(){
        let date = this.is2 
            ? this.onix.formatDate(this.onix.get('PublicationDate')) 
            : this.onix.formatDate(this.onix.getValue('PublishingDetail.PublishingDate.Date'))

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
        this.onix.set('DescriptiveDetail.Collection.CollectionType', 'Publisher collection')
        this.onix.set('DescriptiveDetail.Collection.TitleDetail.TitleType', '01')
        this.onix.set('DescriptiveDetail.Collection.TitleDetail.TitleElement', {
            TitleElementLevel: 'Collection level',
            TitleText: series
        })
    }

    set series({name, num}){
        if( name ) this.seriesName = name
        if( num ) this.seriesNum = num
    }

    get seriesNum(){ 
        if( this.is2 ) return this.onix.getValue('Series.SeriesPartName')
        return this.onix.getValue('DescriptiveDetail.Collection.TitleDetail.TitleElement.PartNumber')
    }

    set seriesNum(num){ 
        if( this.is2 ) return this.onix.set('Series.SeriesPartName', num)
        return this.onix.set('DescriptiveDetail.Collection.TitleDetail.TitleElement.PartNumber', num)
    }

    get productComposition(){
        if( this.is2 ) return this.onix.getValue('ProductComposition')
        return this.onix.getValue('DescriptiveDetail.ProductComposition')
    }

    set productComposition(comp){
        if( this.is2 ) return this.onix.set('ProductComposition', comp)
        return this.onix.set('DescriptiveDetail.ProductComposition', comp)
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

    set edition(edition){
        if( this.is2 ) return this.onix.set('EditionTypeCode', edition)
        return this.onix.set('DescriptiveDetail.EditionType', edition)
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

    set bisacs(bisacs){

        bisacs = Array.isArray(bisacs) ? bisacs : bisacs.split(',')

        return bisacs.map((bisac, i)=>{

            if( this.is2 ) 
                return i == 0 
                ? this.onix.set('BASICMainSubject', bisac)
                : this.onix.set('Subject', {
                    SubjectSchemeIdentifier: 'BISAC Subject Heading',
                    SubjectCode: bisac
                })

            return this.onix.set('DescriptiveDetail.Subject', {
                MainSubject: i==0,
                SubjectSchemeIdentifier: 'BISAC Subject Heading',
                SubjectCode: bisac
            })
        })
    }

    get keywords(){
        let keywords
        if( this.is2 ) keywords = this.onix.get('subject')?.getValue('SubjectHeadingText', {SubjectSchemeIdentifier: 'Keywords'})
        else keywords = this.onix.get('DescriptiveDetail.subject')?.getValue('SubjectHeadingText', {SubjectSchemeIdentifier: 'Keywords'})

        // keep keywords in order and dedupe
        if( keywords )
            keywords = uniformAndDedupeCSV(keywords)

        return keywords
    }

    set keywords(keywords){ 
        if( Array.isArray(keywords) )
            keywords = keywords.join(',')

        if( this.is2 ) return this.onix.set('subject', {SubjectSchemeIdentifier: 'Keywords', SubjectHeadingText: keywords})
        return this.onix.set('DescriptiveDetail.subject', {SubjectSchemeIdentifier: 'Keywords', SubjectHeadingText: keywords})
    }

    get territories(){ 
        if( this.is2 ){
            return this.onix.get('SalesRights')
            ?.filter(d=>['00', '01', '02'].includes(d.get('SalesRightsType.value')))// exlusive and non-exclusive
            .map(d=>[d.getValue('RightsCountry'), d.getValue('RightsTerritory')] )
            .flatMap(a=>a)
            .filter(s=>s)
            .join(' ').split(' ').sort().join(' ')
        }

        return this.onix.get('PublishingDetail.SalesRights')
            ?.filter(d=>['00', '01', '02'].includes(d.get('SalesRightsType.value')))// exlusive and non-exclusive
            .map(d=>[d.getValue('Territory.CountriesIncluded'), d.getValue('Territory.RegionsIncluded')])
            .flatMap(a=>a)
            .filter(s=>s)
            .join(' ').split(' ').sort().join(' ')
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
        let unit = String(dur?.find({ExtentType: 'Duration'})?.get('ExtentUnit.value'))

        if( !val ) return null

        switch(unit){
            // minutes
            case '05': val = val * 60; break;
			
            // hours
            case '04':
            case '14': val = parseFloat(val) * 60 * 60; break;
            
            // HHHMM
            case '15':
                [, h, m] = String(val).match(/(\d{3})(\d{2})/)
                val = (parseFloat(m)*60) + (parseFloat(h)*60*60);
                break;
        
            // HHHMMSS
            case '16':
                [, h, m, s] = String(val).match(/(\d{3})(\d{2})(\d{2})/)
                val = parseFloat(s) + (parseFloat(m)*60) + (parseFloat(h)*60*60);
                break;
        }

        return Math.round((val / 60 / 60)*100)/100 // hours
    }

    set duration(dur){
        dur = {ExtentType: 'Duration', ExtentValue: dur, ExtentUnit: '05'} // minutes
        if( this.is2 ) return this.onix.set('Extent', dur)
        return this.onix.set('DescriptiveDetail.Extent', dur)
    }

    get pages(){
        let val = this.is2 ? this.onix.get('Extent') : this.onix.get('DescriptiveDetail.Extent')
        return val?.getValue('ExtentValue', {ExtentType: 'Main content page count', ExtentUnit: 'Pages'})
    }

    set pages(pages){
        pages = {ExtentType: 'Main content page count', ExtentValue: pages, ExtentUnit: 'Pages'}
        if( this.is2 ) return this.onix.set('Extent', pages)
        return this.onix.set('DescriptiveDetail.Extent', pages)
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
        : this.onix.set('CollateralDetail.TextContent', {Text: copy, TextType: 'Description', ContentAudience: 'Unrestricted'})
    }

    set quotes(quotes){

        if( !Array.isArray(quotes) ) quotes =[quotes]

        quotes = quotes.map(quote=>{

            if( typeof quote == 'string' ) quote = {text: quote, src: ''}
            
            this.is2 
            ? this.onix.set('OtherText', {TextTypeCode: 'Review quote', Text: quote.text, TextSourceTitle: quote.src})
            : this.onix.set('CollateralDetail.TextContent', {TextType: 'Review quote', Text: quote.text, SourceTitle: quote.src, ContentAudience: 'Unrestricted'})
        })
    }

    get illustrationNote(){
        if( this.is2 ) return this.onix.getValue('IllustrationsNote')
        return this.onix.getValue('DescriptiveDetail.IllustrationsNote')
    }

    set illustrationNote(note){
        if( this.is2 ) return this.onix.set('IllustrationsNote', note)
        return this.onix.set('DescriptiveDetail.IllustrationsNote', note)
    }

    get credits(){
        let credits = this.is2 ? this.onix.get('contributor') : this.onix.get('DescriptiveDetail.Contributor')

        if( !credits ) return credits

        credits = credits.map((d, i)=>{

            let bio = d.getValue('BiographicalNote')

            // assume first bio text goes with the first credit
            // this fits based on the 2.1 onix I looked at (by Hachette)
            if( !bio && this.is2 && i == 0 ){
                bio = this.onix.get('OtherText')?.getValue('Text', {TextTypeCode: 'Biographical note'})
            }

            return {
                name: decodeHtmlEntity(d.getValue('PersonName')),
                first: decodeHtmlEntity(d.getValue('NamesBeforeKey')),
                last: decodeHtmlEntity(d.getValue('KeyNames')),
                ordinal: d.getValue('SequenceNumber'),
                bio: decodeHtmlEntity(bio),
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

    set credits(data){

        if( Array.isArray(data) ){
            return data.map(d=>this.credits = d)
        }

        if( data.name && !data.last && !data.first ){
            let name = data.name.split(' ')
            data.last = name.pop()
            data.first = name.join('')
        }else if( !data.name && data.last && data.first ){
            data.name = data.first+' '+data.last
        }

        let onix = {
            SequenceNumber: (this.credits?.length||0)+1,
            PersonName: data.name,
            KeyNames: data.last,
            NamesBeforeKey: data.first,
            ContributorRole: data.roles,
            BiographicalNote: data.bio
        }

        Object.keys(onix).forEach(key=>{
            if( !onix[key] )
                delete onix[key]
        })
        
        this.onix.set(this.is2?'Contributor':'DescriptiveDetail.Contributor', onix)
    }

    get availability(){
        return this.is2
        ? this.onix.getValue('SupplyDetail.0.ProductAvailability')
        : this.onix.getValue('ProductSupply.SupplyDetail.0.ProductAvailability')
    }

    set availability(avail){
        if( this.is2 ) return this.onix.set('SupplyDetail.ProductAvailability', avail)
        return this.onix.set('ProductSupply.SupplyDetail.ProductAvailability', avail)
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

    set embargo(date){
        date = dayjs(date).format('YYYY-MM-DD')

        if( this.is2 ) return this.onix.set('SupplyDetail.OnSaleDate', date)
        return this.onix.set('ProductSupply.SupplyDetail.SupplyDate', {Date: date, SupplyDateRole: 'Sales embargo date'})
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

    set price(price){
        if( price?.PriceAmount )
            price = {PriceAmount: price, PriceQualifier: 'Consumer price', CurrencyCode: 'USD'}

        if( this.is2 ) return this.onix.set('SupplyDetail.Price', price)
        return this.onix.set('ProductSupply.SupplyDetail.Price', price)
    }

    get prices() {
        let prices = this.is2 ? this.onix.get('SupplyDetail.Price') : this.onix.get('ProductSupply.SupplyDetail.Price')

        // NOTE: what bout "Corporate price"?
        let PriceTypes = ['Consumer price', 'Unqualified price']

        return prices?.filter(m => {
            return !m.getValue('PriceQualifier') || PriceTypes.includes(m.getValue('PriceQualifier'))
        }).map(m => {

            let territory = m.get('Territory')?.toJSON()
            let date = m.get('PriceDate')

            // some have a date range (ex: on sale for a month)
            if( date ){
                date = [
                    date.getValue('Date', {PriceDateRole: 'From date'}),
                    date.getValue('Date', {PriceDateRole: 'Until date'})
                ].filter(d=>d)
                
                if( date.length != 2 )
                    date = null
            }

            if( this.is2 )
                territory = {
                    CountriesIncluded: m.get('CountryCode')?.map(d=>d.value()).join(' ')
                }

            let attrs = {
                price: m.getValue('PriceAmount'),
                currency: m.get('CurrencyCode.value'),
                territory
            }

            if( date ){
                let daysleft = new dayjs(date[1]).diff(new Date(), 'days')
                
                // ignore prices that expire in under 30 days
                // in my tests, the regular price was also present in the feed
                if( daysleft < 30 )
                    return null

                attrs.date = date
            }

            return attrs

        }).filter(d=>d)
    }

    get drm(){
        return null // FIXME:
    }

    get cartonQty(){
        if( this.is2 ) this.onix.getValue('SupplyDetail.0.PackQuantity')
        return this.onix.getValue('ProductSupply.SupplyDetail.0.PackQuantity')
    }

    set cartonQty(qty){
        if( this.is2 ) return this.onix.set('SupplyDetail.PackQuantity', qty)
        return this.onix.set('ProductSupply.SupplyDetail.PackQuantity', qty)
    }

    get prize(){
        return this.onix.get('CollateralDetail.Prize')
    }

    set prize(prize){
        if( this.is2 ) return false // not supported

        if( Array.isArray(prize) )
            return prize.map(p=>this.prize = p)

        let data = {}
        prize = typeof prize == 'string' ? {PrizeName: prize} : prize

        for( let key in prize ){
            
            if( !key.startsWith('Prize') ){
                data['Prize'+key.charAt(0).toUpperCase()+key.slice(1)] = prize[key]
                delete prize[key]
            }else{
                data[key] = prize[key]
            }
        }
        
        return this.onix.set('CollateralDetail.Prize', data)
    }
    
}