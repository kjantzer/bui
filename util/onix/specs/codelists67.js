/*
  Onix 3.0 Codelists

  CSV pulled from: https://www.editeur.org/14/code-lists/#CodeListFiles
  Formatted to JSON via chatgpt

  NOTE: not sure what a/b/c data is supposed to be. CSV did not have a header
  not needed for now. Rename keys when known
*/
module.exports = {
  "1": {
    "01": {
      "value": "Early notification",
      "description": "Use for a complete record issued earlier than approximately six months before publication",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Advance notification (confirmed)",
      "description": "Use for a complete record issued to confirm advance information approximately six months before publication; or for a complete record issued after that date and before information has been confirmed from the book-in-hand",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Notification confirmed on publication",
      "description": "Use for a complete record issued to confirm advance information at or just before actual publication date, usually from the book-in-hand, or for a complete record issued at any later date",
      "a": 0,
      "b": 11.0,
      "c": null
    },
    "04": {
      "value": "Update (partial)",
      "description": "In ONIX 3.0 or later only, use when sending a \u0091block update\u0092 record. A block update implies using the supplied block(s) to update the existing record for the product, replacing only the blocks included in the block update, and leaving other blocks unchanged \u0096 for example, replacing old information from Blocks 4 and 6 with the newly-received data while retaining information from Blocks 1\u00963, 5 and 7\u00968 untouched. In previous ONIX releases, and for ONIX 3.0 or later using other notification types, updating is by replacing the complete record with the newly-received data",
      "a": 0,
      "b": 42.0,
      "c": null
    },
    "05": {
      "value": "Delete",
      "description": "Use when sending an instruction to delete a record which was previously issued. Note that a Delete instruction should NOT be used when a product is cancelled, put out of print, or otherwise withdrawn from sale: this should be handled as a change of Publishing status, leaving the receiver to decide whether to retain or delete the record. A Delete instruction is used ONLY when there is a particular reason to withdraw a record completely, eg because it was issued in error",
      "a": 0,
      "b": 13.0,
      "c": null
    },
    "08": {
      "value": "Notice of sale",
      "description": "Notice of sale of a product, from one publisher to another: sent by the publisher disposing of the product",
      "a": 2,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Notice of acquisition",
      "description": "Notice of acquisition of a product, by one publisher from another: sent by the acquiring publisher",
      "a": 2,
      "b": null,
      "c": null
    },
    "88": {
      "value": "Test update (Partial)",
      "description": "Only for use in ONIX 3.0 or later. Record may be processed for test purposes, but data should be discarded when testing is complete. Sender must ensure the <RecordReference> matches a previously-sent Test record",
      "a": 26,
      "b": null,
      "c": null
    },
    "89": {
      "value": "Test record",
      "description": "Record may be processed for test purposes, but data should be discarded when testing is complete. Sender must ensure the <RecordReference> does not match any previously-sent live product record",
      "a": 26,
      "b": null,
      "c": null
    }
  },
  "2": {
    "00": {
      "value": "Single-component retail product",
      "description": null,
      "a": 9,
      "b": 39.0,
      "c": null
    },
    "01": {
      "value": "Single-component, not available separately",
      "description": "Used only when an ONIX record is required for a component-as-an-item, even though it is not currently available as such",
      "a": 53,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Multiple-component retail product",
      "description": "Multiple-component product retailed as a whole",
      "a": 9,
      "b": 39.0,
      "c": null
    },
    "11": {
      "value": "Multiple-item collection, retailed as separate parts",
      "description": "Used only when an ONIX record is required for a collection-as-a-whole, even though it is not currently retailed as such",
      "a": 9,
      "b": 39.0,
      "c": null
    },
    "20": {
      "value": "Trade-only product",
      "description": "Product available to the book trade, but not for retail sale, and not carrying retail items, eg empty dumpbin, empty counterpack, promotional material",
      "a": 9,
      "b": 39.0,
      "c": null
    },
    "30": {
      "value": "Multiple-item trade-only pack",
      "description": "Product available to the book trade, but not for general retail sale as a whole. It carries multiple components for retailing as separate items, eg shrink-wrapped trade pack, filled dumpbin, filled counterpack",
      "a": 9,
      "b": 39.0,
      "c": null
    },
    "31": {
      "value": "Multiple-item pack",
      "description": "Carrying multiple components, primarily for retailing as separate items. The pack may be split and retailed as separate items OR retailed as a single item. Use instead of Multiple-item trade-only pack (code 30) if the data provider specifically wishes to make explicit that the pack may optionally be retailed as a whole",
      "a": 21,
      "b": 39.0,
      "c": null
    }
  },
  "3": {
    "00": {
      "value": "Unspecified",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Publisher",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Publisher\u0092s distributor",
      "description": "Use to designate a distributor providing primary warehousing and fulfillment for a publisher or for a publisher\u0092s sales agent, as distinct from a wholesaler",
      "a": 0,
      "b": 46.0,
      "c": null
    },
    "03": {
      "value": "Wholesaler",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Bibliographic agency",
      "description": "Bibliographic data aggregator",
      "a": 0,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Library bookseller",
      "description": "Library supplier. Bookseller selling to libraries (including academic libraries)",
      "a": 0,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Publisher\u0092s sales agent",
      "description": "Use for a publisher\u0092s sales agent responsible for marketing the publisher\u0092s products within a territory, as opposed to a publisher\u0092s distributor who fulfills orders but does not market",
      "a": 4,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Publisher\u0092s conversion service provider",
      "description": "Downstream provider of e-publication format conversion services (who might also be a distributor or retailer of the converted e-publication), supplying metadata on behalf of the publisher. The assigned ISBN is taken from the publisher\u0092s ISBN prefix",
      "a": 15,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Conversion service provider",
      "description": "Downstream provider of e-publication format conversion services (who might also be a distributor or retailer of the converted e-publication), supplying metadata on behalf of the publisher. The assigned ISBN is taken from the service provider\u0092s prefix (whether or not the service provider dedicates that prefix to a particular publisher)",
      "a": 15,
      "b": null,
      "c": null
    },
    "09": {
      "value": "ISBN Registration Agency",
      "description": null,
      "a": 18,
      "b": null,
      "c": null
    },
    "10": {
      "value": "ISTC Registration Agency",
      "description": null,
      "a": 18,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Retail bookseller",
      "description": "Bookseller selling primarily to consumers",
      "a": 28,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Education bookseller",
      "description": "Bookseller selling primarily to educational institutions",
      "a": 28,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Library",
      "description": "Library service providing enhanced metadata to publishers or other parties",
      "a": 36,
      "b": null,
      "c": null
    }
  },
  "5": {
    "01": {
      "value": "Proprietary",
      "description": "For example, a publisher\u0092s or wholesaler\u0092s product number or SKU. Note that <IDTypeName> is required with proprietary identifiers",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "ISBN-10",
      "description": "International Standard Book Number, pre-2007 (10 digits, or 9 digits plus X, without spaces or hyphens) \u0096 now Deprecated in ONIX for Books, except where providing historical information for compatibility with legacy systems. It should only be used in relation to products published before 2007 \u0096 when ISBN-13 superseded it \u0096 and should never be used as the ONLY identifier (it should always be accompanied by the correct GTIN-13 / ISBN-13)",
      "a": 0,
      "b": 14.0,
      "c": 11.0
    },
    "03": {
      "value": "GTIN-13",
      "description": "GS1 Global Trade Item Number, formerly known as EAN article number (13 digits, without spaces or hyphens)",
      "a": 0,
      "b": 39.0,
      "c": null
    },
    "04": {
      "value": "UPC",
      "description": "UPC product number (12 digits, without spaces or hyphens)",
      "a": 0,
      "b": null,
      "c": null
    },
    "05": {
      "value": "ISMN-10",
      "description": "International Standard Music Number, pre-2008 (M plus nine digits, without spaces or hyphens) \u0096 now Deprecated in ONIX for Books, except where providing historical information for compatibility with legacy systems. It should only be used in relation to products published before 2008 \u0096 when ISMN-13 superseded it \u0096 and should never be used as the ONLY identifier (it should always be accompanied by the correct GTIN-12 / ISMN-13)",
      "a": 0,
      "b": 14.0,
      "c": 12.0
    },
    "06": {
      "value": "DOI",
      "description": "Digital Object Identifier (variable length and character set, beginning \u009110.\u0092 and without https://doi.org/ or the older http://dx.doi.org/)",
      "a": 0,
      "b": null,
      "c": null
    },
    "13": {
      "value": "LCCN",
      "description": "Library of Congress Control Number in normalized form (up to 12 characters, alphanumeric)",
      "a": 1,
      "b": null,
      "c": null
    },
    "14": {
      "value": "GTIN-14",
      "description": "GS1 Global Trade Item Number (14 digits, without spaces or hyphens)",
      "a": 1,
      "b": 9.0,
      "c": null
    },
    "15": {
      "value": "ISBN-13",
      "description": "International Standard Book Number, from 2007 (13 digits starting 978 or 9791\u00969799, without spaces or hyphens)",
      "a": 4,
      "b": 39.0,
      "c": null
    },
    "17": {
      "value": "Legal deposit number",
      "description": "The number assigned to a publication as part of a national legal deposit process",
      "a": 7,
      "b": null,
      "c": null
    },
    "22": {
      "value": "URN",
      "description": "Uniform Resource Name: note that in trade applications an ISBN must be sent as a GTIN-13 and, where required, as an ISBN-13 \u0096 it should not be sent as a URN",
      "a": 8,
      "b": 9.0,
      "c": null
    },
    "23": {
      "value": "OCLC number",
      "description": "A unique number assigned to a bibliographic item by OCLC",
      "a": 9,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Co-publisher\u0092s ISBN-13",
      "description": "An ISBN-13 assigned by a co-publisher. The \u0091main\u0092 ISBN sent with <ProductIDType> codes 03 and/or 15 should always be the ISBN that is used for ordering from the supplier identified in <SupplyDetail>. However, ISBN rules allow a co-published title to carry more than one ISBN. The co-publisher should be identified in an instance of the <Publisher> composite, with the applicable <PublishingRole> code",
      "a": 9,
      "b": null,
      "c": null
    },
    "25": {
      "value": "ISMN-13",
      "description": "International Standard Music Number, from 2008 (13-digit number starting 9790, without spaces or hyphens)",
      "a": 12,
      "b": 39.0,
      "c": null
    },
    "26": {
      "value": "ISBN-A",
      "description": "Actionable ISBN, in fact a special DOI incorporating the ISBN-13 within the DOI syntax. Begins \u009110.978.\u0092 or \u009110.979.\u0092 and includes a / character between the registrant element (publisher prefix) and publication element of the ISBN, eg 10.978.000/1234567. Note the ISBN-A should always be accompanied by the ISBN itself, using <ProductIDType> codes 03 and/or 15",
      "a": 17,
      "b": null,
      "c": null
    },
    "27": {
      "value": "JP e-code",
      "description": "E-publication identifier controlled by JPOIID\u0092s Committee for Research and Management of Electronic Publishing Codes. 20 alphanumeric characters, without spaces, beginning with the ISBN \u0091registrant element\u0092",
      "a": 17,
      "b": 67.0,
      "c": null
    },
    "28": {
      "value": "OLCC number",
      "description": "Unique number assigned by the Chinese Online Library Cataloging Center (see http://olcc.nlc.gov.cn)",
      "a": 18,
      "b": null,
      "c": null
    },
    "29": {
      "value": "JP Magazine ID",
      "description": "Japanese magazine identifier, similar in scope to ISSN but identifying a specific issue of a serial publication. Five digits to identify the periodical, plus a hyphen and two digits to identify the issue",
      "a": 21,
      "b": null,
      "c": null
    },
    "30": {
      "value": "UPC-12+5",
      "description": "Used only with comic books and other products which use the UPC extension to identify individual issues or products. Do not use where the UPC12 itself identifies the specific product, irrespective of any 5-digit extension \u0096 use code 04 instead",
      "a": 29,
      "b": null,
      "c": null
    },
    "31": {
      "value": "BNF Control number",
      "description": "Num\u00e9ro de la notice bibliographique BNF",
      "a": 31,
      "b": null,
      "c": null
    },
    "34": {
      "value": "ISSN-13",
      "description": "International Standard Serial Number expressed as a GTIN-13, with optional 2- or 5-digit barcode extension (ie 13, 15 or 18 digits starting 977, without spaces or hyphens, with <BarcodeType> codes 02, 12 or 05), and only when the extended ISSN is used specifically as a product identifier (ie when the two publisher-defined \u0091variant\u0092 digits within the ISSN-13 itself and/or the 2- or 5-digit barcode extension are used to identify a single issue of a serial publication for separate sale). Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": 67.0,
      "c": null
    },
    "35": {
      "value": "ARK",
      "description": "Archival Resource Key, as a URL (including the address of the ARK resolver provided by eg a national library)",
      "a": 36,
      "b": null,
      "c": null
    }
  },
  "9": {
    "01": {
      "value": "WCO Harmonized System",
      "description": "World Customs Organization Harmonized Commodity Coding and Description System, the basis of most other commodity code schemes. Use 6 digits, without punctuation. See https://www.wcoomd.org/en/topics/nomenclature/instrument-and-tools/hs-nomenclature-2022-edition.aspx and https://www.wcotradetools.org/en/harmonized-system",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "02": {
      "value": "UNSPSC",
      "description": "UN Standard Product and Service Classification, including national versions adopted without any additions or changes to the codes or their meaning. Use 8 (or occasionally 10) digits, without punctuation",
      "a": 0,
      "b": 58.0,
      "c": null
    },
    "03": {
      "value": "HMRC",
      "description": "UK Revenue and Customs classifications, based on the Harmonized System (8 or 10 digits, without punctuation, for exports from and imports into the UK respectively). See https://www.gov.uk/trade-tariff",
      "a": 1,
      "b": 63.0,
      "c": null
    },
    "04": {
      "value": "Warenverzeichnis f\u00fcr die Au\u00dfenhandelsstatistik",
      "description": "German export trade classification, based on the Harmonised System",
      "a": 5,
      "b": null,
      "c": null
    },
    "05": {
      "value": "TARIC",
      "description": "EU TARIC codes, an extended version of the Harmonized System primarily for imports into the EU. Use 10 digits, without punctuation. See https://taxation-customs.ec.europa.eu/customs-4/calculation-customs-duties/customs-tariff/eu-customs-tariff-taric_en",
      "a": 5,
      "b": 63.0,
      "c": null
    },
    "06": {
      "value": "Fondsgroep",
      "description": "Centraal Boekhuis free classification field for publishers",
      "a": 8,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Sender\u0092s product category",
      "description": "A product category (not a subject classification) assigned by the sender",
      "a": 10,
      "b": null,
      "c": null
    },
    "08": {
      "value": "GAPP Product Class",
      "description": "Product classification maintained by the Chinese General Administration of Press and Publication (http://www.gapp.gov.cn)",
      "a": 15,
      "b": null,
      "c": null
    },
    "09": {
      "value": "CPA",
      "description": "Statistical Classification of Products by Activity in the European Economic Community, see http://ec.europa.eu/eurostat/ramon/nomenclatures/index.cfm?TargetUrl=LST_NOM_DTL&StrNom=CPA_2008. Use 6 digits, without punctuation. For example, printed children\u0092s books are \u009158.11.13\u0092, but the periods are normally ommited in ONIX",
      "a": 16,
      "b": null,
      "c": null
    },
    "10": {
      "value": "NCM",
      "description": "Mercosur/Mercosul Common Nomenclature, based on the Harmonised System. Use 8 digits, without punctuation",
      "a": 23,
      "b": null,
      "c": null
    },
    "11": {
      "value": "CPV",
      "description": "Common Procurement Vocabulary (2008), used to describe products and services for public tendering and procurement within the EU. Code is a nine digit number (including the check digit), and may also include a space plus an alphanumeric code of two letters and three digits (including the supplementary check digit) from the Supplementary Vocabulary. See https://simap.ted.europa.eu/web/simap/cpv",
      "a": 33,
      "b": 65.0,
      "c": null
    },
    "12": {
      "value": "PKWiU",
      "description": "Polish Classification of Products and Services (2015). Use a single letter followed by 2 to 7 digits, without punctuation. Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "13": {
      "value": "HTSUS",
      "description": "US HTS (or HTSA) commodity codes for import of goods into USA (10 digits, without punctuation). Only for use in ONIX 3.0 or later. See https://hts.usitc.gov/current",
      "a": 52,
      "b": null,
      "c": null
    },
    "14": {
      "value": "US Schedule B",
      "description": "US Schedule B commodity codes for export from USA (10 digits, without punctuation). Only for use in ONIX 3.0 or later. See http://uscensus.prod.3ceonline.com",
      "a": 52,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Clave SAT",
      "description": "Mexican SAT classification, based on UN SPSC with later modifications (8 digits, without punctuation). Only for use in ONIX 3.0 or later. See https://www.sat.gob.mx/consultas/53693/catalogo-de-productos-y-servicios",
      "a": 58,
      "b": null,
      "c": null
    },
    "16": {
      "value": "CN",
      "description": "EU Combined Nomenclature commodity codes, an extended version of the Harmonized System primarily for exports from the EU. Use 8 digits, without punctuation. Only for use in ONIX 3.0 or later. See https://trade.ec.europa.eu/access-to-markets/en/content/combined-nomenclature-0",
      "a": 63,
      "b": null,
      "c": null
    },
    "17": {
      "value": "CCT",
      "description": "Canadian Customs Tariff scheme, 8 or 10 digits for imports into and exports from Canada. Only for use in ONIX 3.0 or later. See https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/menu-eng.html",
      "a": 64,
      "b": null,
      "c": null
    },
    "18": {
      "value": "CACT",
      "description": "Australian \u0091Working tariff\u0092. Combined Australian Customs Tariff Nomenclature and Statistical Classification. Only for use in ONIX 3.0 or later. See https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification",
      "a": 64,
      "b": null,
      "c": null
    },
    "19": {
      "value": "NICO",
      "description": "Mexican N\u00famero de Identificaci\u00f3n Comercial, 10 digits for imports into and exports from Mexico. Only for use in ONIX 3.0 or later. See https://www.snice.gob.mx/cs/avi/snice/nico.ligie.html",
      "a": 64,
      "b": null,
      "c": null
    },
    "50": {
      "value": "Electre genre",
      "description": "Typologie de march\u00e9 g\u00e9r\u00e9 par Electre (Market segment code maintained by Electre)",
      "a": 24,
      "b": null,
      "c": null
    }
  },
  "12": {
    "01": {
      "value": "UK open market edition",
      "description": "An edition from a UK publisher sold only in territories where exclusive rights are not held. Rights details should be carried in PR.21 (in ONIX 2.1) OR P.21 (in ONIX 3.0 or later) as usual",
      "a": 2,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Airport edition",
      "description": "In UK, an edition intended primarily for airside sales in UK airports, though it may be available for sale in other territories where exclusive rights are not held. Rights details should be carried in PR.21 (in ONIX 2.1) OR P.21 (in ONIX 3.0 or later) as usual",
      "a": 2,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Sonderausgabe",
      "description": "In Germany, a special printing sold at a lower price than the regular hardback",
      "a": 2,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Pocket book",
      "description": "In countries where recognised as a distinct trade category, eg France \u00ab\u00a0livre de poche\u00a0\u00bb, Germany ,Taschenbuch\u0091, Italy \u00abtascabile\u00bb, Spain \u00ablibro de bolsillo\u00bb",
      "a": 2,
      "b": 39.0,
      "c": null
    },
    "05": {
      "value": "International edition (US)",
      "description": "Edition produced solely for sale in designated export markets",
      "a": 2,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Library audio edition",
      "description": "Audio product sold in special durable packaging and with a replacement guarantee for the contained cassettes or CDs for a specified shelf-life",
      "a": 2,
      "b": null,
      "c": null
    },
    "07": {
      "value": "US open market edition",
      "description": "An edition from a US publisher sold only in territories where exclusive rights are not held. Rights details should be carried in PR.21 (in ONIX 2.1) OR P.21 (in ONIX 3.0 or later) as usual",
      "a": 3,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Livre scolaire, d\u00e9clar\u00e9 par l\u0092\u00e9diteur",
      "description": "In France, a category of book that has a particular legal status, claimed by the publisher",
      "a": 5,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Livre scolaire (non sp\u00e9cifi\u00e9)",
      "description": "In France, a category of book that has a particular legal status, designated independently of the publisher",
      "a": 5,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Supplement to newspaper",
      "description": "Edition published for sale only with a newspaper or periodical",
      "a": 7,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Precio libre textbook",
      "description": "In Spain, a school textbook for which there is no fixed or suggested retail price and which is supplied by the publisher on terms individually agreed with the bookseller",
      "a": 8,
      "b": null,
      "c": null
    },
    "12": {
      "value": "News outlet edition",
      "description": "For editions sold only through newsstands/newsagents",
      "a": 14,
      "b": null,
      "c": null
    },
    "13": {
      "value": "US textbook",
      "description": "In the US and Canada, a book that is published primarily for use by students in school or college education as a basis for study. Textbooks published for the elementary and secondary school markets are generally purchased by school districts for the use of students. Textbooks published for the higher education market are generally adopted for use in particular classes by the instructors of those classes. Textbooks are usually not marketed to the general public, which distinguishes them from trade books. Note that trade books adopted for course use are not considered to be textbooks (though a specific education edition of a trade title may be)",
      "a": 17,
      "b": null,
      "c": null
    },
    "14": {
      "value": "E-book short",
      "description": "\u0091Short\u0092 e-book (sometimes also called a \u0091single\u0092), typically containing a single short story, an essay or piece of long-form journalism",
      "a": 27,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Superpocket book",
      "description": "In countries where recognised as a distinct trade category, eg Italy \u00absupertascabile\u00bb. Only for use in ONIX 3.0 or later",
      "a": 39,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Beau-livre",
      "description": "Category of books, usually hardcover and of a large format (A4 or larger) and printed on high-quality paper, where the primary features are illustrations, and these are more important than text. Sometimes called \u0091coffee-table books\u0092 or \u0091art books\u0092 in English. Only for use in ONIX 3.0 or later",
      "a": 42,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Podcast",
      "description": "Category of audio products typically distinguished by being free of charge (but which may be monetised through advertising content) and episodic. Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Periodical",
      "description": "Category of books or e-books which are single issues of a periodical publication, sold as independent products. Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Catalog",
      "description": "Publisher\u0092s or supplier\u0092s catalog (when treated as a product in its own right). Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Atlas",
      "description": "Category of books containing a linked group of plates, tables, diagrams, lists, often but not always combined with maps or a geographical theme or approach. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Newspaper",
      "description": "Daily or weekly. Only for use in ONIX 3.0 or later",
      "a": 67,
      "b": null,
      "c": null
    }
  },
  "13": {
    "01": {
      "value": "Proprietary",
      "description": "For example, publisher\u0092s own series ID. Note that <IDTypeName> is required with proprietary identifiers",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "ISSN",
      "description": "International Standard Serial Number, unhyphenated, 8 digits",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "German National Bibliography series ID",
      "description": "Maintained by the Deutsche Nationalbibliothek",
      "a": 0,
      "b": null,
      "c": null
    },
    "04": {
      "value": "German Books in Print series ID",
      "description": "Maintained by VLB",
      "a": 1,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Electre series ID",
      "description": "Maintained by Electre Information, France",
      "a": 1,
      "b": null,
      "c": null
    },
    "06": {
      "value": "DOI",
      "description": "Digital Object Identifier (variable length and character set, beginning \u009110.\u0092 and without https://doi.org/ or the older http://dx.doi.org/)",
      "a": 6,
      "b": 65.0,
      "c": null
    },
    "15": {
      "value": "ISBN-13",
      "description": "Use only where the collection (series or set) is available as a single product",
      "a": 15,
      "b": null,
      "c": null
    },
    "22": {
      "value": "URN",
      "description": "Uniform Resource Name using full URN syntax, eg urn:issn:1476-4687 \u0096 though where a specific code for the identifier type is available, use of that code (ie code 02 for ISSN) is preferred",
      "a": 8,
      "b": 62.0,
      "c": null
    },
    "27": {
      "value": "JP Magazine ID",
      "description": "Japanese magazine identifier, similar in scope to ISSN. Five digits to identify the periodical, without any hyphen or two digit extension. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "29": {
      "value": "BNF Control number",
      "description": "French National Bibliography series ID. Identifiant des publications en s\u00e9rie maintenu par la Biblioth\u00e8que Nationale de France",
      "a": 24,
      "b": 36.0,
      "c": null
    },
    "35": {
      "value": "ARK",
      "description": "Archival Resource Key, as a URL (including the address of the ARK resolver provided by eg a national library)",
      "a": 36,
      "b": null,
      "c": null
    },
    "38": {
      "value": "ISSN-L",
      "description": "International Standard Serial Number \u0091linking ISSN\u0092, used when distinct from the serial ISSN. Unhyphenated, 8 digits. Only for use in ONIX 3.0 or later",
      "a": 41,
      "b": null,
      "c": null
    }
  },
  "14": {
    "00": {
      "value": "Undefined",
      "description": "Default",
      "a": 0,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Sentence case",
      "description": "Initial capitals on first word and subsequently on proper names only, eg \u0091The conquest of Mexico\u0092",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Title case",
      "description": "Initial capitals on first word and subsequently on all significant words (nouns, pronouns, adjectives, verbs, adverbs, subordinate conjunctions) thereafter. Unless they appear as the first word, articles, prepositions and coordinating conjunctions remain lower case, eg \u0091The Conquest of Mexico\u0092",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "All capitals",
      "description": "For example, \u0091THE CONQUEST OF MEXICO\u0092. Use only when Sentence or Title case are not possible (for example because of system limitations). Do NOT use simply because title is (correctly) in all caps (eg \u0091BBQ USA\u0092)",
      "a": 0,
      "b": 44.0,
      "c": null
    }
  },
  "15": {
    "00": {
      "value": "Undefined",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Distinctive title (book); Cover title (serial); Title of content item, collection, or resource",
      "description": "The full text of the distinctive title of the item, without abbreviation or abridgement. For books, generally taken from the title page (see codes 11\u009615 where an alternative title is provided on cover or spine). Where the item is an omnibus edition containing two or more works by the same author, and there is no separate combined title, a distinctive title may be constructed (by the sender) by concatenating the individual titles, with suitable punctuation, as in \u0091Pride and prejudice / Sense and sensibility / Northanger Abbey\u0092. Where the title alone is not distinctive, recipients may add elements taken from a collection title and part number etc to create a distinctive title \u0096 but these elements should be provided separately by the sender",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "02": {
      "value": "ISSN key title of serial",
      "description": "Serials only",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Title in original language",
      "description": "Where the subject of the ONIX record is a translated item",
      "a": 0,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Title acronym or initialism",
      "description": "For serials: an acronym or initialism of Title Type 01, eg \u0091JAMA\u0092, \u0091JACM\u0092",
      "a": 0,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Abbreviated title",
      "description": "An abbreviated form of Title Type 01",
      "a": 0,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Title in other language",
      "description": "A translation of Title Type 01 or 03, or an independent title, used when the work is translated into another language, sometimes termed a \u0091parallel title\u0092",
      "a": 0,
      "b": 60.0,
      "c": null
    },
    "07": {
      "value": "Thematic title of journal issue",
      "description": "Serials only: when a journal issue is explicitly devoted to a specified topic",
      "a": 0,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Former title",
      "description": "Books or serials: when an item was previously published under another title",
      "a": 0,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Distributor\u0092s title",
      "description": "For books: the title carried in a book distributor\u0092s title file: frequently incomplete, and may include elements not properly part of the title",
      "a": 4,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Alternative title on cover",
      "description": "An alternative title that appears on the cover of a book",
      "a": 7,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Alternative title on back",
      "description": "An alternative title that appears on the back of a book",
      "a": 7,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Expanded title",
      "description": "An expanded form of the title, eg the title of a school text book with grade and type and other details added to make the title meaningful, where otherwise it would comprise only the curriculum subject. This title type is required for submissions to the Spanish ISBN Agency",
      "a": 7,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Alternative title",
      "description": "An alternative title that the book is widely known by, whether it appears on the book or not (including a title used in another market \u0096\u00a0but see code 06 for translations \u0096 or a working title previously used in metadata but replaced before publication)",
      "a": 25,
      "b": 67.0,
      "c": null
    },
    "15": {
      "value": "Alternative title on spine",
      "description": "An alternative title that appears on the spine of a book. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Translated from title",
      "description": "Where the subject of the ONIX record is a translated item, but has been translated via some intermediate language. Title type 16 is distinct from title type 03. Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    }
  },
  "16": {
    "01": {
      "value": "Proprietary",
      "description": "Note that <IDTypeName> is required with proprietary identifiers",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "ISBN-10",
      "description": "10-character ISBN of manifestation of work, when this is the only work identifier available \u0096 now Deprecated in ONIX for Books, except where providing historical information for compatibility with legacy systems. It should only be used in relation to products published before 2007 \u0096 when ISBN-13 superseded it \u0096 and should never be used as the ONLY identifier (it should always be accompanied by the correct GTIN-13 / ISBN-13 of the manifestation of the work)",
      "a": 0,
      "b": 14.0,
      "c": 11.0
    },
    "06": {
      "value": "DOI",
      "description": "Digital Object Identifier (variable length and character set, beginning \u009110.\u0092 and without https://doi.org/ or the older http://dx.doi.org/)",
      "a": 0,
      "b": 65.0,
      "c": null
    },
    "11": {
      "value": "ISTC",
      "description": "International Standard Text Code (16 characters: numerals and letters A-F, unhyphenated)",
      "a": 0,
      "b": null,
      "c": null
    },
    "15": {
      "value": "ISBN-13",
      "description": "13-character ISBN of a manifestation of work, when this is the only work identifier available (13 digits, without spaces or hyphens)",
      "a": 7,
      "b": null,
      "c": null
    },
    "18": {
      "value": "ISRC",
      "description": "International Standard Recording Code",
      "a": 7,
      "b": null,
      "c": null
    },
    "32": {
      "value": "GLIMIR",
      "description": "Global Library Manifestation Identifier, OCLC\u0092s \u0091manifestation cluster\u0092 ID",
      "a": 34,
      "b": null,
      "c": null
    },
    "33": {
      "value": "OWI",
      "description": "OCLC Work Identifier",
      "a": 34,
      "b": null,
      "c": null
    },
    "39": {
      "value": "ISCC",
      "description": "International Standard Content Code, a \u0091similarity hash\u0092 derived algorithmically from the content itself (see https://iscc.codes). <IDValue> is a sequence comprising the Meta-Code and Content-Code ISCC-UNITSs generated from a digital manifestation of the work, as a variable-length case-insensitive alphanumeric string (or 27 characters including one hyphen if using ISCC v1.0, but this is deprecated). Note alphabetic characters in v1.x ISCCs use Base32 encoding and are conventionally upper case. The \u0091ISCC:\u0092 prefix is omitted. Only for use in ONIX 3.0 or later",
      "a": 50,
      "b": 62.0,
      "c": null
    }
  },
  "17": {
    "A01": {
      "value": "By (author)",
      "description": "Author of a textual work",
      "a": 0,
      "b": null,
      "c": null
    },
    "A02": {
      "value": "With",
      "description": "With or as told to: \u0091ghost\u0092 or secondary author of a literary work (for clarity, should not be used for true \u0091ghost\u0092 authors who are not credited on the book and whose existence is secret)",
      "a": 0,
      "b": 38.0,
      "c": null
    },
    "A03": {
      "value": "Screenplay by",
      "description": "Writer of screenplay or script (film or video)",
      "a": 0,
      "b": null,
      "c": null
    },
    "A04": {
      "value": "Libretto by",
      "description": "Writer of libretto (opera): see also A31",
      "a": 0,
      "b": null,
      "c": null
    },
    "A05": {
      "value": "Lyrics by",
      "description": "Author of lyrics (song): see also A31",
      "a": 0,
      "b": null,
      "c": null
    },
    "A06": {
      "value": "By (composer)",
      "description": "Composer of music",
      "a": 0,
      "b": null,
      "c": null
    },
    "A07": {
      "value": "By (artist)",
      "description": "Visual artist when named as the primary creator of, eg, a book of reproductions of artworks",
      "a": 0,
      "b": null,
      "c": null
    },
    "A08": {
      "value": "By (photographer)",
      "description": "Photographer when named as the primary creator of, eg, a book of photographs",
      "a": 0,
      "b": null,
      "c": null
    },
    "A09": {
      "value": "Created by",
      "description": "For example of editorial concept, of board game, etc",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "A10": {
      "value": "From an idea by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "A11": {
      "value": "Designed by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "A12": {
      "value": "Illustrated by",
      "description": "Artist when named as the creator of artwork which illustrates a text, or the originator (sometimes \u0091penciller\u0092 for collaborative art) of the artwork of a graphic novel or comic book",
      "a": 0,
      "b": 29.0,
      "c": null
    },
    "A13": {
      "value": "Photographs by",
      "description": "Photographer when named as the creator of photographs which illustrate a text",
      "a": 0,
      "b": null,
      "c": null
    },
    "A14": {
      "value": "Text by",
      "description": "Author of text which accompanies art reproductions or photographs, or which is part of a graphic novel or comic book",
      "a": 0,
      "b": null,
      "c": null
    },
    "A15": {
      "value": "Preface by",
      "description": "Author of preface",
      "a": 0,
      "b": null,
      "c": null
    },
    "A16": {
      "value": "Prologue by",
      "description": "Author of prologue",
      "a": 0,
      "b": null,
      "c": null
    },
    "A17": {
      "value": "Summary by",
      "description": "Author of summary",
      "a": 0,
      "b": null,
      "c": null
    },
    "A18": {
      "value": "Supplement by",
      "description": "Author of supplement",
      "a": 0,
      "b": null,
      "c": null
    },
    "A19": {
      "value": "Afterword by",
      "description": "Author of afterword",
      "a": 0,
      "b": null,
      "c": null
    },
    "A20": {
      "value": "Notes by",
      "description": "Author of notes or annotations: see also A29",
      "a": 0,
      "b": null,
      "c": null
    },
    "A21": {
      "value": "Commentaries by",
      "description": "Author of commentaries on the main text",
      "a": 0,
      "b": null,
      "c": null
    },
    "A22": {
      "value": "Epilogue by",
      "description": "Author of epilogue",
      "a": 0,
      "b": null,
      "c": null
    },
    "A23": {
      "value": "Foreword by",
      "description": "Author of foreword",
      "a": 0,
      "b": null,
      "c": null
    },
    "A24": {
      "value": "Introduction by",
      "description": "Author of introduction: see also A29",
      "a": 0,
      "b": null,
      "c": null
    },
    "A25": {
      "value": "Footnotes by",
      "description": "Author/compiler of footnotes",
      "a": 0,
      "b": null,
      "c": null
    },
    "A26": {
      "value": "Memoir by",
      "description": "Author of memoir accompanying main text",
      "a": 0,
      "b": null,
      "c": null
    },
    "A27": {
      "value": "Experiments by",
      "description": "Person who carried out experiments reported in the text",
      "a": 0,
      "b": null,
      "c": null
    },
    "A28": {
      "value": "Interpreted through",
      "description": "Use with narratives drawn from an oral tradition, where no \u0091ownership\u0092 of the narrative is claimed. See also B33. Only for use in ONIX 3.0 or later",
      "a": 65,
      "b": null,
      "c": null
    },
    "A29": {
      "value": "Introduction and notes by",
      "description": "Author of introduction and notes: see also A20 and A24",
      "a": 0,
      "b": null,
      "c": null
    },
    "A30": {
      "value": "Software written by",
      "description": "Writer of computer programs ancillary to the text",
      "a": 0,
      "b": null,
      "c": null
    },
    "A31": {
      "value": "Book and lyrics by",
      "description": "Author of the textual content of a musical drama: see also A04 and A05",
      "a": 0,
      "b": null,
      "c": null
    },
    "A32": {
      "value": "Contributions by",
      "description": "Author of additional contributions to the text",
      "a": 0,
      "b": null,
      "c": null
    },
    "A33": {
      "value": "Appendix by",
      "description": "Author of appendix",
      "a": 0,
      "b": null,
      "c": null
    },
    "A34": {
      "value": "Index by",
      "description": "Compiler of index",
      "a": 0,
      "b": null,
      "c": null
    },
    "A35": {
      "value": "Drawings by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "A36": {
      "value": "Cover design or artwork by",
      "description": "Use also for the cover artist of a graphic novel or comic book if named separately",
      "a": 0,
      "b": null,
      "c": null
    },
    "A37": {
      "value": "Preliminary work by",
      "description": "Responsible for preliminary work on which the work is based",
      "a": 0,
      "b": null,
      "c": null
    },
    "A38": {
      "value": "Original author",
      "description": "Author of the first edition (usually of a standard work) who is not an author of the current edition",
      "a": 0,
      "b": null,
      "c": null
    },
    "A39": {
      "value": "Maps by",
      "description": "Maps drawn or otherwise contributed by",
      "a": 4,
      "b": null,
      "c": null
    },
    "A40": {
      "value": "Inked or colored by",
      "description": "Use for secondary creators when separate persons are named as having respectively drawn and inked/colored/finished artwork, eg for a graphic novel or comic book. Use with A12 for \u0091drawn by\u0092. Use A40 for \u0091finished by\u0092, but prefer more specific codes A46 to A48 instead of A40 unless the more specific secondary roles are inappropriate, unclear or unavailable",
      "a": 5,
      "b": 29.0,
      "c": null
    },
    "A41": {
      "value": "Paper engineering by",
      "description": "Designer or paper engineer of die-cuts, press-outs or of pop-ups in a pop-up book, who may be different from the illustrator",
      "a": 7,
      "b": 38.0,
      "c": null
    },
    "A42": {
      "value": "Continued by",
      "description": "Use where a standard work is being continued by somebody other than the original author",
      "a": 7,
      "b": null,
      "c": null
    },
    "A43": {
      "value": "Interviewer",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "A44": {
      "value": "Interviewee",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "A45": {
      "value": "Comic script by",
      "description": "Writer of dialogue, captions in a comic book (following an outline by the primary writer)",
      "a": 29,
      "b": null,
      "c": null
    },
    "A46": {
      "value": "Inker",
      "description": "Renders final comic book line art based on work of the illustrator or penciller (code A12). Preferred to code A40",
      "a": 29,
      "b": null,
      "c": null
    },
    "A47": {
      "value": "Colorist",
      "description": "Provides comic book color art and effects. Preferred to code A40",
      "a": 29,
      "b": null,
      "c": null
    },
    "A48": {
      "value": "Letterer",
      "description": "Creates comic book text balloons and other text elements (where this is a distinct role from script writer and/or illustrator), or creates calligraphy in non-comic products",
      "a": 29,
      "b": 63.0,
      "c": null
    },
    "A49": {
      "value": "Cover inker",
      "description": "Renders final comic book cover line art based on work of the cover designer (code A36), where different from the inker of the interior line art. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "A50": {
      "value": "Cover colorist",
      "description": "Provides comic book cover color art and effects, where different from the colorist of the interior art and effects. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "A51": {
      "value": "Research by",
      "description": "Person or organization responsible for performing research on which the work is based. Only for use in ONIX 3.0 or later",
      "a": 39,
      "b": null,
      "c": null
    },
    "A52": {
      "value": "Original character design",
      "description": "(for comic books). Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "A99": {
      "value": "Other primary creator",
      "description": "Other type of primary creator not specified above",
      "a": 0,
      "b": null,
      "c": null
    },
    "B01": {
      "value": "Edited by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B02": {
      "value": "Revised by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B03": {
      "value": "Retold by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B04": {
      "value": "Abridged by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B05": {
      "value": "Adapted by",
      "description": "See also B22 (Dramatized by)",
      "a": 0,
      "b": 66.0,
      "c": null
    },
    "B06": {
      "value": "Translated by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B07": {
      "value": "As told by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B08": {
      "value": "Translated with commentary by",
      "description": "This code applies where a translator has provided a commentary on issues relating to the translation. If the translator has also provided a commentary on the work itself, codes B06 and A21 should be used",
      "a": 0,
      "b": null,
      "c": null
    },
    "B09": {
      "value": "Series edited by",
      "description": "Name of a series editor when the product belongs to a series",
      "a": 0,
      "b": null,
      "c": null
    },
    "B10": {
      "value": "Edited and translated by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B11": {
      "value": "Editor-in-chief",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B12": {
      "value": "Guest editor",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B13": {
      "value": "Volume editor",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B14": {
      "value": "Editorial board member",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B15": {
      "value": "Editorial coordination by",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B16": {
      "value": "Managing editor",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "B17": {
      "value": "Founded by",
      "description": "Usually the founder editor of a serial publication (de: Begruendet von)",
      "a": 1,
      "b": null,
      "c": null
    },
    "B18": {
      "value": "Prepared for publication by",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B19": {
      "value": "Associate editor",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B20": {
      "value": "Consultant editor",
      "description": "Use also for \u0091advisory editor\u0092, \u0091series advisor\u0092, \u0091editorial consultant\u0092 etc",
      "a": 2,
      "b": 6.0,
      "c": null
    },
    "B21": {
      "value": "General editor",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B22": {
      "value": "Dramatized by",
      "description": "See also B05 (Adapted by)",
      "a": 2,
      "b": 66.0,
      "c": null
    },
    "B23": {
      "value": "General rapporteur",
      "description": "In Europe, an expert editor who takes responsibility for the legal content of a collaborative law volume",
      "a": 2,
      "b": null,
      "c": null
    },
    "B24": {
      "value": "Literary editor",
      "description": "Editor who is responsible for establishing the text used in an edition of a literary work, where this is recognised as a distinctive role (es: editor literario)",
      "a": 6,
      "b": null,
      "c": null
    },
    "B25": {
      "value": "Arranged by (music)",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "B26": {
      "value": "Technical editor",
      "description": "Responsible for the technical accuracy and language, may also be involved in coordinating and preparing technical material for publication",
      "a": 15,
      "b": 30.0,
      "c": null
    },
    "B27": {
      "value": "Thesis advisor or supervisor",
      "description": null,
      "a": 23,
      "b": null,
      "c": null
    },
    "B28": {
      "value": "Thesis examiner",
      "description": null,
      "a": 23,
      "b": null,
      "c": null
    },
    "B29": {
      "value": "Scientific editor",
      "description": "Responsible overall for the scientific content of the publication",
      "a": 30,
      "b": null,
      "c": null
    },
    "B30": {
      "value": "Historical advisor",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 37,
      "b": null,
      "c": null
    },
    "B31": {
      "value": "Original editor",
      "description": "Editor of the first edition (usually of a standard work) who is not an editor of the current edition. Only for use in ONIX 3.0 or later",
      "a": 37,
      "b": null,
      "c": null
    },
    "B32": {
      "value": "Translation revised by",
      "description": "Where possible, use with B06 for the original translator. Only for use in ONIX 3.0 or later",
      "a": 53,
      "b": 65.0,
      "c": null
    },
    "B33": {
      "value": "Transcribed by",
      "description": "As told to. Use with narratives drawn from an oral tradition, and with B03 (Retold by), B07 (As told by) or A28 (Interpreted through). Only for use in ONIX 3.0 or later",
      "a": 65,
      "b": null,
      "c": null
    },
    "B34": {
      "value": "Sensitivity reader / editor",
      "description": "Reader or editor responsible for ensuring the text is free of offensive, potentially offensive or insensitive language, is inclusive and free from bias, and avoids stereotypical characterization. Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    },
    "B99": {
      "value": "Other adaptation by",
      "description": "Other type of adaptation or editing not specified above",
      "a": 0,
      "b": null,
      "c": null
    },
    "C01": {
      "value": "Compiled by",
      "description": "For puzzles, directories, statistics, etc",
      "a": 0,
      "b": 31.0,
      "c": null
    },
    "C02": {
      "value": "Selected by",
      "description": "For textual material (eg for an anthology)",
      "a": 0,
      "b": 31.0,
      "c": null
    },
    "C03": {
      "value": "Non-text material selected by",
      "description": "Eg for a collection of photographs etc",
      "a": 31,
      "b": null,
      "c": null
    },
    "C04": {
      "value": "Curated by",
      "description": "Eg for an exhibition",
      "a": 31,
      "b": null,
      "c": null
    },
    "C99": {
      "value": "Other compilation by",
      "description": "Other type of compilation not specified above",
      "a": 0,
      "b": null,
      "c": null
    },
    "D01": {
      "value": "Producer",
      "description": "Of a film, of a theatrical or multimedia production, of dramatized audio etc",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "D02": {
      "value": "Director",
      "description": "Of a film, of a theatrical or multimedia production, of dramatized audio etc",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "D03": {
      "value": "Conductor",
      "description": "Conductor of a musical performance",
      "a": 0,
      "b": null,
      "c": null
    },
    "D04": {
      "value": "Choreographer",
      "description": "Of a dance performance. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "D99": {
      "value": "Other direction by",
      "description": "Other type of direction not specified above",
      "a": 0,
      "b": null,
      "c": null
    },
    "E01": {
      "value": "Actor",
      "description": "Performer in a dramatized production (including a voice actor in an audio production)",
      "a": 0,
      "b": 42.0,
      "c": null
    },
    "E02": {
      "value": "Dancer",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "E03": {
      "value": "Narrator",
      "description": "Where the narrator is a character in a dramatized production (including a voice actor in an audio production). For the \u0091narrator\u0092 of a non-dramatized audiobook, use code E07",
      "a": 0,
      "b": 42.0,
      "c": null
    },
    "E04": {
      "value": "Commentator",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "E05": {
      "value": "Vocal soloist",
      "description": "Singer etc",
      "a": 0,
      "b": null,
      "c": null
    },
    "E06": {
      "value": "Instrumental soloist",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "E07": {
      "value": "Read by",
      "description": "Reader of recorded text, as in an audiobook",
      "a": 0,
      "b": null,
      "c": null
    },
    "E08": {
      "value": "Performed by (orchestra, band, ensemble)",
      "description": "Name of a musical group in a performing role",
      "a": 0,
      "b": null,
      "c": null
    },
    "E09": {
      "value": "Speaker",
      "description": "Of a speech, lecture etc",
      "a": 15,
      "b": null,
      "c": null
    },
    "E10": {
      "value": "Presenter",
      "description": "Introduces and links other contributors and material, eg within a documentary",
      "a": 32,
      "b": null,
      "c": null
    },
    "E11": {
      "value": "Introduction read by",
      "description": "Reader of recorded introduction (or other \u0091front matter\u0092) in an audiobook. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "E99": {
      "value": "Performed by",
      "description": "Other type of performer not specified above: use for a recorded performance which does not fit a category above, eg a performance by a stand-up comedian",
      "a": 0,
      "b": null,
      "c": null
    },
    "F01": {
      "value": "Filmed/photographed by",
      "description": "Cinematographer, etc",
      "a": 0,
      "b": null,
      "c": null
    },
    "F02": {
      "value": "Editor (film or video)",
      "description": null,
      "a": 25,
      "b": null,
      "c": null
    },
    "F99": {
      "value": "Other recording by",
      "description": "Other type of recording not specified above",
      "a": 0,
      "b": null,
      "c": null
    },
    "Z01": {
      "value": "Assisted by",
      "description": "Contributor must follow another contributor with any contributor role, and placement should therefore be controlled by contributor sequence numbering to ensure the correct association",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "Z02": {
      "value": "Honored/dedicated to",
      "description": null,
      "a": 32,
      "b": null,
      "c": null
    },
    "Z03": {
      "value": "Enacting jurisdiction",
      "description": "For publication of laws, regulations, rulings etc. Only for use in ONIX 3.0 or later",
      "a": 48,
      "b": null,
      "c": null
    },
    "Z04": {
      "value": "Peer reviewed",
      "description": "Use with <UnnamedPersons> code 02 as a \u0091flag\u0092 to indicate the publication is anonymously peer-reviewed. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "Z05": {
      "value": "Posthumously completed by",
      "description": "Contributor must follow another (posthumous) contributor with any contributor role, and placement should therefore be controlled by contributor sequence numbering to ensure the correct association. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": 67.0,
      "c": null
    },
    "Z06": {
      "value": "In association with",
      "description": "Contributor must follow another contributor with any contributor role, and placement should therefore be controlled by contributor sequence numbering to ensure the correct association. See also \u0091published in association with\u0092 in List 45. Only for use in ONIX 3.0 or later",
      "a": 67,
      "b": null,
      "c": null
    },
    "Z98": {
      "value": "(Various roles)",
      "description": "For use ONLY with \u0091et al\u0092 or \u0091Various\u0092 within <UnnamedPersons>, where the roles of the multiple contributors vary",
      "a": 20,
      "b": null,
      "c": null
    },
    "Z99": {
      "value": "Other",
      "description": "Other creative responsibility not falling within A to F above",
      "a": 0,
      "b": null,
      "c": null
    }
  },
  "18": {
    "00": {
      "value": "Unspecified",
      "description": "Usually the name as it is presented on the book",
      "a": 0,
      "b": 54.0,
      "c": null
    },
    "01": {
      "value": "Pseudonym",
      "description": "May be used to give a well-known pseudonym, where the primary name is a \u0091real\u0092 name",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Authority-controlled name",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Earlier name",
      "description": "Use only within <AlternativeName>",
      "a": 11,
      "b": null,
      "c": null
    },
    "04": {
      "value": "\u0091Real\u0092 name",
      "description": "May be used to identify a well-known \u0091real\u0092 name, where the primary name is a pseudonym or is unnamed",
      "a": 12,
      "b": 67.0,
      "c": null
    },
    "05": {
      "value": "Transliterated / translated form of primary name",
      "description": "Use only within <AlternativeName>, when the primary name type is unspecified, for names in a different script or language",
      "a": 16,
      "b": 54.0,
      "c": null
    },
    "06": {
      "value": "Later name",
      "description": "Use only within <AlternativeName>",
      "a": 33,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Fictional character name",
      "description": "Use only within <NameAsSubject> to indicate the subject is fictional, or in <AlternativeName> alongside <UnnamedPersons> to indicate a human-like name for a synthetic voice or AI. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": 64.0,
      "c": null
    }
  },
  "19": {
    "01": {
      "value": "Unknown",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Anonymous",
      "description": "Note that Anonymous can be interpreted as singular or plural. A real name can be provided using <AlternativeName> where it is generally known",
      "a": 0,
      "b": 49.0,
      "c": null
    },
    "03": {
      "value": "et al",
      "description": "And others. Use when some but not all contributors are listed individually, perhaps because the complete contributor list is impractically long",
      "a": 0,
      "b": 67.0,
      "c": null
    },
    "04": {
      "value": "Various",
      "description": "When there are multiple contributors, and none are listed individually. Use for example when the product is a pack of books by different authors",
      "a": 1,
      "b": 49.0,
      "c": null
    },
    "05": {
      "value": "Synthesised voice \u0096 male",
      "description": "Use for example with Contributor role code E07 \u0091read by\u0092 for audio books with digital narration having a male-inflected tone. \u0091Brand name\u0092 of voice may be provided in <AlternativeName>",
      "a": 8,
      "b": 67.0,
      "c": null
    },
    "06": {
      "value": "Synthesized voice \u0096 female",
      "description": "Use for example with Contributor role code E07 \u0091read by\u0092 for audio books with digital narration having a female-inflected tone. \u0091Brand name\u0092 of voice may be provided in <AlternativeName>",
      "a": 8,
      "b": 67.0,
      "c": null
    },
    "07": {
      "value": "Synthesized voice \u0096 unspecified",
      "description": "Use for example with Contributor role code E07 \u0091read by\u0092 for audio books with digital narration",
      "a": 8,
      "b": 67.0,
      "c": null
    },
    "08": {
      "value": "Synthesized voice \u0096 based on real voice actor",
      "description": "Sometimes termed an \u0091Authorized Voice Replica\u0092. Use for exanple with Contributor role code E07 \u0091read by\u0092 for audio books with digital narration, and provide name of voice actor in <AlternativeName>. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": 67.0,
      "c": null
    },
    "09": {
      "value": "AI (Artificial intelligence)",
      "description": "Use when the creator (of text, of images etc) is a generative AI model or technique. Note, can also be combined with the role \u0091assisted by\u0092. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    }
  },
  "20": {
    "01": {
      "value": "Publication linked to conference",
      "description": "For example an academic, professional or political conference",
      "a": 33,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Complete proceedings of conference",
      "description": null,
      "a": 33,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Selected papers from conference",
      "description": null,
      "a": 33,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Publication linked to sporting event",
      "description": "For example a competitive match, fixture series or championship",
      "a": 33,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Programme or guide for sporting event",
      "description": null,
      "a": 33,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Publication linked to artistic event",
      "description": "For example a theatrical or musical event or performance, a season of events or performances, or an exhibition of art",
      "a": 33,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Programme or guide for artistic event",
      "description": null,
      "a": 33,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Publication linked to exposition",
      "description": "For example a commercial exposition",
      "a": 33,
      "b": null,
      "c": null
    },
    "32": {
      "value": "Programme or guide for exposition",
      "description": null,
      "a": 33,
      "b": null,
      "c": null
    }
  },
  "21": {
    "ABR": {
      "value": "Abridged edition",
      "description": "Content has been shortened: use for abridged, shortened, concise, condensed",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "ACT": {
      "value": "Acting edition",
      "description": "Version of a play or script intended for use of those directly involved in a production, usually including full stage directions in addition to the text of the script",
      "a": 16,
      "b": null,
      "c": null
    },
    "ADP": {
      "value": "Adapted edition",
      "description": "Content has been adapted to serve a different purpose or audience, or from one medium to another: use for dramatization, novelization etc. Use <EditionStatement> to describe the exact nature of the adaptation",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "ALT": {
      "value": "Alternate",
      "description": "Do not use. Deprecated, but retained in the list for reasons of backwards compatibility. Not for use in ONIX 3.0 or later",
      "a": 0,
      "b": 1.0,
      "c": 1.0
    },
    "ANN": {
      "value": "Annotated edition",
      "description": "Content is augmented by the addition of notes",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "BLL": {
      "value": "Bilingual edition",
      "description": "Both languages should be specified in the <Language> group. Use MLL for an edition in more than two languages",
      "a": 5,
      "b": null,
      "c": null
    },
    "BLP": {
      "value": "Bilingual \u0091facing page\u0092 edition",
      "description": "Use only where the two languages are presented in parallel on facing pages, or in parallel columns of text on a single page (otherwise use BLL). Both languages should be specified in the <Language> group",
      "a": 35,
      "b": null,
      "c": null
    },
    "BRL": {
      "value": "Braille edition",
      "description": "Braille edition",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "BUD": {
      "value": "Budget edition",
      "description": "Product sold at lower price than other editions, usually with lower quality paper or binding to reduce production costs. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "CMB": {
      "value": "Combined volume",
      "description": "An edition in which two or more works also published separately are combined in a single volume; AKA \u0091omnibus edition\u0092, or in comic books a \u0091trade paperback\u0092 (fr: \u0091int\u00e9grale\u0092)",
      "a": 9,
      "b": 61.0,
      "c": null
    },
    "CRI": {
      "value": "Critical edition",
      "description": "Content includes critical commentary on the text",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "CSP": {
      "value": "Coursepack",
      "description": "Content was compiled for a specified educational course",
      "a": 0,
      "b": null,
      "c": null
    },
    "DGO": {
      "value": "Digital original",
      "description": "A digital product that, at the time of publication, has or had no physical counterpart and that is or was not expected to have a physical counterpart for a reasonable time (recommended at least 30 days following publication)",
      "a": 11,
      "b": 64.0,
      "c": null
    },
    "ENH": {
      "value": "Enhanced edition",
      "description": "Use for e-publications that have been enhanced with additional text, speech, other audio, video, interactive or other content",
      "a": 12,
      "b": 28.0,
      "c": null
    },
    "ENL": {
      "value": "Enlarged edition",
      "description": "Content has been enlarged or expanded from that of a previous edition",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "ETR": {
      "value": "Easy-to-read edition",
      "description": "Book which uses highly simplified wording, clear page layout and typography to ensure the content can be understood by those with intellectual disabilities. See https://www.inclusion-europe.eu/easy-to-read for guidelines. See also SMP for editions with simplified language. Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "EXP": {
      "value": "Expurgated edition",
      "description": "\u0091Offensive\u0092 content has been removed",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "FAC": {
      "value": "Facsimile edition",
      "description": "Exact reproduction of the content and format of a previous edition",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "FST": {
      "value": "Festschrift",
      "description": "A collection of writings published in honor of a person, an institution or a society",
      "a": 9,
      "b": null,
      "c": null
    },
    "HRE": {
      "value": "High readability edition",
      "description": "Edition optimised for high readability, typically featuring colored or tinted page backgrounds to reduce contrast, extra letter, word and line spacing to reduce crowding and isolate individual words, simplified page layouts and an open, sans serif font (or occasionally, an unusual font design) intended to aid readability. Sometimes labelled \u0091dyslexia-friendly\u0092. See also code SMP if the text itself is simplified, and codes LTE or ULP if the type size is significantly larger than normal. Only for use in ONIX 3.0 or later",
      "a": 46,
      "b": null,
      "c": null
    },
    "ILL": {
      "value": "Illustrated edition",
      "description": "Content includes extensive illustrations which are not part of other editions",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "INT": {
      "value": "International edition",
      "description": "A product aimed specifically at markets other than the country of original publication, usually titled as an \u0091International edition\u0092 and with specification and/or content changes",
      "a": 36,
      "b": null,
      "c": null
    },
    "LTE": {
      "value": "Large type / large print edition",
      "description": "Large print edition, print sizes 14 to 19pt \u0096 see also ULP",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "MCP": {
      "value": "Microprint edition",
      "description": "A printed edition in a type size too small to be read without a magnifying glass",
      "a": 1,
      "b": 28.0,
      "c": null
    },
    "MDT": {
      "value": "Media tie-in",
      "description": "An edition published to coincide with the release of a film, TV program, or electronic game based on the same work. Use <EditionStatement> to describe the exact nature of the tie-in",
      "a": 1,
      "b": null,
      "c": null
    },
    "MLL": {
      "value": "Multilingual edition",
      "description": "All languages should be specified in the \u0091Language\u0092 group. Use BLL for a bilingual edition",
      "a": 5,
      "b": null,
      "c": null
    },
    "NED": {
      "value": "New edition",
      "description": "Where no other information is given, or no other coded type or edition numbering is applicable",
      "a": 1,
      "b": 46.0,
      "c": null
    },
    "NUM": {
      "value": "Edition with numbered copies",
      "description": "A limited or collectors\u0092 edition in which each copy is individually numbered, and the actual number of copies is strictly limited. Note that the supplier may limit the number of orders fulfilled per retail outlet. Use <EditionStatement> to give details of the number of copies printed",
      "a": 9,
      "b": 64.0,
      "c": null
    },
    "PBO": {
      "value": "Paperback original",
      "description": "A product published in any form of soft cover, that at the time of publication, has or had no counterpart in any other format, and that is or was not expected to have such a counterpart for a reasonable time (recommended at least 30 days following publication). Only for use in ONIX 3.0 or later",
      "a": 54,
      "b": null,
      "c": null
    },
    "PRB": {
      "value": "Prebound edition",
      "description": "In the US, a book that was previously bound, normally as a paperback, and has been rebound with a library-quality hardcover binding by a supplier other than the original publisher. See also the <Publisher> and <RelatedProduct> composites for other aspects of the treatment of prebound editions in ONIX",
      "a": 9,
      "b": null,
      "c": null
    },
    "REV": {
      "value": "Revised edition",
      "description": "Content has been revised from that of a previous edition (often used when there has been no corresponding increment in the edition number, or no edition numbering is available)",
      "a": 0,
      "b": 46.0,
      "c": null
    },
    "SCH": {
      "value": "School edition",
      "description": "An edition intended specifically for use in schools",
      "a": 0,
      "b": null,
      "c": null
    },
    "SIG": {
      "value": "Signed edition",
      "description": "Individually autographed by the author(s)",
      "a": 33,
      "b": null,
      "c": null
    },
    "SMP": {
      "value": "Simplified language edition",
      "description": "An edition that uses simplified language, usually for second or additional language learners. See ETR for highly simplified editions for readers with intellectual disabilities",
      "a": 8,
      "b": 59.0,
      "c": null
    },
    "SPE": {
      "value": "Special edition",
      "description": "Use for anniversary, collectors\u0092, de luxe, gift, limited (but prefer codes NUM or UNN as appropriate), autographed (but prefer code SIG as appropriate) edition. Use <EditionStatement> to describe the exact nature of the special edition",
      "a": 1,
      "b": 30.0,
      "c": null
    },
    "STU": {
      "value": "Student edition",
      "description": "Where a text is available in both student and teacher\u0092s editions",
      "a": 0,
      "b": null,
      "c": null
    },
    "TCH": {
      "value": "Teacher\u0092s edition",
      "description": "Where a text is available in both student and teacher\u0092s editions; use also for instructor\u0092s or leader\u0092s editions, and for editions intended exclusively for educators where no specific student edition is available",
      "a": 0,
      "b": 36.0,
      "c": null
    },
    "UBR": {
      "value": "Unabridged edition",
      "description": "Where a title has also been published in an abridged edition; also for audiobooks, regardless of whether an abridged audio version also exists",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "ULP": {
      "value": "Ultra large print edition",
      "description": "For print sizes 20pt and above, and with typefaces designed for the visually impaired \u0096 see also LTE",
      "a": 6,
      "b": 28.0,
      "c": null
    },
    "UNN": {
      "value": "Edition with unnumbered copies",
      "description": "A limited or collectors\u0092 edition in which each copy is not individually numbered \u0096 but where the actual number of copies is strictly limited. Note that the supplier may limit the number of orders fulfilled per retail outlet. Use <EditionStatement> to give details of the number of copies printed",
      "a": 30,
      "b": 64.0,
      "c": null
    },
    "UXP": {
      "value": "Unexpurgated edition",
      "description": "Content previously considered \u0091offensive\u0092 has been restored",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "VAR": {
      "value": "Variorum edition",
      "description": "Content includes notes by various commentators, and/or includes and compares several variant texts of the same work",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "VOR": {
      "value": "Vorleseb\u00fccher",
      "description": "Readaloud edition \u0096 specifially intended and designed for reading aloud (to children). Only for use in ONIX 3.0 or later",
      "a": 56,
      "b": null,
      "c": null
    }
  },
  "22": {
    "01": {
      "value": "Language of text",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Original language of a translated text",
      "description": "Where the text in the original language is NOT part of the current product",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Language of abstracts",
      "description": "Where different from language of text: used mainly for serials",
      "a": 0,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Original language in a multilingual edition",
      "description": "Where the text in the original language is part of a bilingual or multilingual product",
      "a": 5,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Translated language in a multilingual edition",
      "description": "Where the text in a translated language is part of a bilingual or multilingual product",
      "a": 5,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Language of audio track",
      "description": "For example, on an audiobook or video product. Use for the only available audio track, or where there are multiple tracks (eg on a DVD), for an alternate language audio track that is NOT the original. (In the latter case, use code 11 for the original language audio if it is included in the product, or code 10 to identify an original language that is not present in the product)",
      "a": 7,
      "b": 42.0,
      "c": null
    },
    "09": {
      "value": "Language of subtitles",
      "description": "For example, on a DVD",
      "a": 7,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Language of original audio track",
      "description": "Where the audio in the original language is NOT part of the current product",
      "a": 35,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Original language audio track in a multilingual product",
      "description": "Where the audio in the original language is part of a multilingual product with multiple audio tracks",
      "a": 35,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Language of notes",
      "description": "Use for the language of footnotes, endnotes, annotations or commentary, instructions or guidance for use etc, where it is different from the language of the main text",
      "a": 35,
      "b": 58.0,
      "c": null
    },
    "13": {
      "value": "Language of introduction / end matter",
      "description": "Use for the language of any introductory text, prologue, etc, or epilogue, end matter, etc, where it is different from the language of the main text. Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Target language of teaching / learning",
      "description": "Eg for the book \u0091Ingles para latinos\u0092, English. For phrasebooks and language teaching, learning or study material. Wherever possible, the language should also be listed as the subject of the book. Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": 59.0,
      "c": null
    },
    "15": {
      "value": "Additional vocabulary / text in this language",
      "description": "Use of significant words, phrases, quotations or short passages from a language other than the main language of the text, as an integral part of the text. This does not include \u0091loanwords\u0092, academic Latin, etc. Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    }
  },
  "23": {
    "00": {
      "value": "Main content page count",
      "description": "The highest-numbered page in a single numbered sequence of main content, usually the highest Arabic-numbered page in a book; or, for books without page numbers or (rarely) with multiple numbered sequences of main content, the total number of pages that carry the main content of the book. Note that this may include numbered but otherwise blank pages (eg pages inserted to ensure chapters start on a recto page) and may exclude unnumbered (but contentful) pages such as those in inserts/plate sections. It should exclude pages of back matter (eg any index) even when their numbering sequence continues from the main content. Either this or the Content Page count is the preferred page count for most books for the general reader. For books with substantial front and/or back matter, include also Front matter (03) and Back matter (04) page counts, or Total numbered pages (05). For books with inserts (plate sections), also include Total unnumbered insert page count whenever possible",
      "a": 9,
      "b": 14.0,
      "c": null
    },
    "02": {
      "value": "Total text length",
      "description": "Number of words or characters of natural language text",
      "a": 2,
      "b": 49.0,
      "c": null
    },
    "03": {
      "value": "Front matter page count",
      "description": "The total number of numbered (usually Roman-numbered) pages that precede the main content of a book. This usually consists of various title and imprint pages, table of contents, an introduction, preface, foreword, etc",
      "a": 9,
      "b": 14.0,
      "c": null
    },
    "04": {
      "value": "Back matter page count",
      "description": "The total number of numbered (often Roman-numbered) pages that follow the main content of a book. This usually consists of an afterword, appendices, endnotes, index, etc. It excludes extracts or \u0091teaser\u0092 material from other works, and blank (or advertising) pages that are present only for convenience of printing and binding",
      "a": 9,
      "b": 14.0,
      "c": null
    },
    "05": {
      "value": "Total numbered pages",
      "description": "The sum of all Roman- and Arabic-numbered pages. Note that this may include numbered but otherwise blank pages (eg pages inserted to ensure chapters start on a recto page) and may exclude unnumbered (but contentful) pages such as those in inserts/plate sections. It is the sum of the main content (00), front matter (03) and back matter (04) page counts",
      "a": 9,
      "b": 14.0,
      "c": null
    },
    "06": {
      "value": "Production page count",
      "description": "The total number of pages in a book, including unnumbered pages, front matter, back matter, etc. This includes any extracts or \u0091teaser\u0092 material from other works, and blank pages at the back that carry no content and are present only for convenience of printing and binding",
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Absolute page count",
      "description": "The total number of pages of the book counting the cover as page 1. This page count type should be used only for digital publications delivered with fixed pagination",
      "a": 9,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Number of pages in print counterpart",
      "description": "The total number of pages (equivalent to the Content page count, code 11) in the print counterpart of a digital product delivered without fixed pagination, or of an audio product",
      "a": 11,
      "b": 14.0,
      "c": null
    },
    "09": {
      "value": "Duration",
      "description": "Total duration in time, expressed in the specified extent unit. This is the \u0091running time\u0092 equivalent of code 11",
      "a": 0,
      "b": 20.0,
      "c": null
    },
    "10": {
      "value": "Notional number of pages in digital product",
      "description": "An estimate of the number of \u0091pages\u0092 in a digital product delivered without fixed pagination, and with no print counterpart, given as an indication of the size of the work. Equivalent to code 08, but exclusively for digital or audio products",
      "a": 11,
      "b": 14.0,
      "c": null
    },
    "11": {
      "value": "Content page count",
      "description": "The sum of all Roman- and Arabic-numbered and contentful unnumbered pages. Sum of page counts with codes 00, 03, 04 and 12, and also the sum of 05 and 12",
      "a": 13,
      "b": 14.0,
      "c": null
    },
    "12": {
      "value": "Total unnumbered insert page count",
      "description": "The total number of unnumbered pages with content inserted within the main content of a book \u0096 for example inserts/plate sections that are not numbered",
      "a": 13,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Duration of introductory matter",
      "description": "Duration in time, expressed in the specified extent units, of introductory matter. This is the \u0091running time\u0092 equivalent of code 03, and comprises any significant amount of running time represented by a musical intro, announcements, titles, introduction or other material prefacing the main content",
      "a": 20,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Duration of main content",
      "description": "Duration in time, expressed in the specified extent units, of the main content. This is the \u0091running time\u0092 equivalent of code 00, and excludes time represented by announcements, titles, introduction or other prefatory material or \u0091back matter\u0092",
      "a": 20,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Duration of back matter",
      "description": "Duration in time, expressed in the specified extent units, of any content that follows the main content of a book. This may consist of an afterword, appendices, endnotes, end music etc. It excludes extracts or \u0091teaser\u0092 material from other works. This is the \u0091running time\u0092 equivalent of code 04",
      "a": 36,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Production duration",
      "description": "Duration in time, expressed in the specified extent units, of the complete content of a book. This is the \u0091running time\u0092 equivalent of code 06, and includes time represented by musical themes, announcements, titles, introductory and other prefatory material, plus \u0091back matter\u0092 such as any afterword, appendices, plus any extracts or \u0091teaser\u0092 material from other works",
      "a": 36,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Number of cards",
      "description": "In a pack of educational flash cards, playing cards, postcards, greeting cards etc. Only for use in ONIX 3.0 or later",
      "a": 54,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Number of write-in pages",
      "description": "Count of the number of pages within the main content page count that are blank or substantially blank, intended for the reader to fill in (eg in a journal). Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Filesize",
      "description": "Approximate size of a digital file or package (in the form it is downloaded), expressed in the specified extent unit",
      "a": 0,
      "b": 53.0,
      "c": null
    },
    "23": {
      "value": "Storage filesize",
      "description": "Approximate size of storage space required for a digital file or package in the form in which it is usually stored for use on a device, where this is different from the download filesize (see code 22), and expressed in the specified extent unit. Only for use in ONIX 3.0 or later",
      "a": 53,
      "b": null,
      "c": null
    }
  },
  "24": {
    "00": {
      "value": "Physical pieces",
      "description": "Unbound sheets or leaves, where \u0091pages\u0092 is not appropriate. For example a count of the individual number of cards in a pack. Only for use in ONIX 3.0 or later. For number of pieces in eg a jigsaw, kit, board game, see <ProductFormFeature> and code 22 from list 79",
      "a": 54,
      "b": 63.0,
      "c": null
    },
    "01": {
      "value": "Characters",
      "description": "Approximate number of characters (including spaces) of natural language text. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Words",
      "description": "Approximate number of words of natural language text",
      "a": 2,
      "b": 49.0,
      "c": null
    },
    "03": {
      "value": "Pages",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Hours (integer and decimals)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Minutes (integer and decimals)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Seconds (integer only)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Tracks",
      "description": "Of an audiobook on CD (or a similarly divided selection of audio files). Conventionally, each track is 3\u00966 minutes of running time, and track counts are misleading and inappropriate if the average track duration is significantly more or less than this. Note that track breaks are not necessarily aligned with structural breaks in the text (eg chapter breaks)",
      "a": 22,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Discs",
      "description": "Of an audiobook on multiple Red Book audio CDs. Conventionally, each disc is 60\u009670 minutes of running time, and disc counts are misleading and inappropriate if the average disc duration is significantly more or less than this (for example if the discs are Yellow Book CDs containing mp3 files). Note that disc breaks are not necessarily aligned with structural breaks in the text (eg chapter breaks). Only for use in ONIX 3.0 or later",
      "a": 39,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Hours HHH",
      "description": "Fill with leading zeroes if any elements are missing",
      "a": 0,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Hours and minutes HHHMM",
      "description": "Fill with leading zeroes if any elements are missing",
      "a": 0,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Hours minutes seconds HHHMMSS",
      "description": "Fill with leading zeroes if any elements are missing. If centisecond precision is required, use HHHMMSScc. Only for use in ONIX 3.0 or later",
      "a": 0,
      "b": 49.0,
      "c": null
    },
    "17": {
      "value": "Bytes",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Kbytes",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Mbytes",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Chapters",
      "description": "Number of chapters (or other similar subdivisions) of the content. Only for use in ONIX 3.0 or later",
      "a": 65,
      "b": null,
      "c": null
    }
  },
  "25": {
    "00": {
      "value": "Unspecified, see description",
      "description": "See description in the <IllustrationTypeDescription> element",
      "a": 0,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Illustrations, black and white",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Illustrations, color",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Halftones, black and white",
      "description": "Including black and white photographs",
      "a": 0,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Halftones, color",
      "description": "Including color photographs",
      "a": 0,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Line drawings, black and white",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Line drawings, color",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Tables, black and white",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Tables, color",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Illustrations, unspecified",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Halftones, unspecified",
      "description": "Including photographs",
      "a": 1,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Tables, unspecified",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Line drawings, unspecified",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Halftones, duotone",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Maps",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Frontispiece",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Diagrams",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Figures",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Charts",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Recorded music items",
      "description": "Recorded music extracts or examples, or complete recorded work(s), accompanying textual or other content",
      "a": 1,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Printed music items",
      "description": "Printed music extracts or examples, or complete music score(s), accompanying textual or other content",
      "a": 1,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Graphs",
      "description": "To be used in the mathematical sense of a diagram that represents numerical values plotted against an origin and axes, cf codes 16 and 18",
      "a": 4,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Plates, unspecified",
      "description": "\u0091Plates\u0092 means illustrations that are on separate pages bound into the body of a book",
      "a": 4,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Plates, black and white",
      "description": "\u0091Plates\u0092 means illustrations that are on separate pages bound into the body of a book",
      "a": 4,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Plates, color",
      "description": "\u0091Plates\u0092 means illustrations that are on separate pages bound into the body of a book",
      "a": 4,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Index",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Bibliography",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Inset maps",
      "description": "Larger-scale inset maps of places or features of interest included in a map product",
      "a": 7,
      "b": null,
      "c": null
    },
    "28": {
      "value": "GPS grids",
      "description": "GPS grids included in a map product",
      "a": 7,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Glossary",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Table of contents",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 41,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Gazetteer",
      "description": "Geographical index. Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    }
  },
  "27": {
    "01": {
      "value": "Dewey",
      "description": "Dewey Decimal Classification",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Abridged Dewey",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "LC classification",
      "description": "US Library of Congress classification",
      "a": 0,
      "b": null,
      "c": null
    },
    "04": {
      "value": "LC subject heading",
      "description": "US Library of Congress subject heading",
      "a": 0,
      "b": null,
      "c": null
    },
    "05": {
      "value": "NLM classification",
      "description": "US National Library of Medicine medical classification",
      "a": 9,
      "b": null,
      "c": null
    },
    "06": {
      "value": "MeSH heading",
      "description": "US National Library of Medicine Medical subject heading",
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "NAL subject heading",
      "description": "US National Agricultural Library subject heading",
      "a": 9,
      "b": null,
      "c": null
    },
    "08": {
      "value": "AAT",
      "description": "Getty Art and Architecture Thesaurus heading",
      "a": 9,
      "b": null,
      "c": null
    },
    "09": {
      "value": "UDC",
      "description": "Universal Decimal Classification",
      "a": 0,
      "b": null,
      "c": null
    },
    "10": {
      "value": "BISAC Subject Heading",
      "description": "BISAC Subject Headings are used in the North American market to categorize books based on topical content. They serve as a guideline for shelving books in physical stores and browsing books in online stores. See https://www.bisg.org/complete-bisac-subject-headings-list",
      "a": 0,
      "b": 60.0,
      "c": null
    },
    "11": {
      "value": "BISAC Regional theme",
      "description": "A geographical qualifier used with a BISAC subject category",
      "a": 5,
      "b": null,
      "c": null
    },
    "12": {
      "value": "BIC subject category",
      "description": "For all BIC subject codes and qualifiers, see https://bic.org.uk/resources/BIC-Standard-Subject-Categories/",
      "a": 0,
      "b": 61.0,
      "c": null
    },
    "13": {
      "value": "BIC geographical qualifier",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "14": {
      "value": "BIC language qualifier (language as subject)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "15": {
      "value": "BIC time period qualifier",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "16": {
      "value": "BIC educational purpose qualifier",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "17": {
      "value": "BIC reading level and special interest qualifier",
      "description": null,
      "a": 6,
      "b": null,
      "c": null
    },
    "18": {
      "value": "DDC-Sachgruppen der Deutschen Nationalbibliografie",
      "description": "Used for German National Bibliography since 2004 (100 subjects). Is different from value 30. See http://www.dnb.de/service/pdf/ddc_wv_aktuell.pdf (in German) or http://www.dnb.de/eng/service/pdf/ddc_wv_aktuell_eng.pdf (English)",
      "a": 9,
      "b": null,
      "c": null
    },
    "19": {
      "value": "LC fiction genre heading",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Keywords",
      "description": "For indexing and search purposes, not normally intended for display. Where multiple keywords or keyword phrases are sent, this should be in a single instance of the <SubjectHeadingText> element, and it is recommended that they should be separated by semi-colons (this is consistent with Library of Congress preferred practice)",
      "a": 0,
      "b": 34.0,
      "c": null
    },
    "21": {
      "value": "BIC children\u0092s book marketing category",
      "description": "See PA/BIC CBMC guidelines at https://bic.org.uk/resources/childrens-books-marketing-classifications/",
      "a": 0,
      "b": 61.0,
      "c": null
    },
    "22": {
      "value": "BISAC Merchandising Theme",
      "description": "BISAC Merchandising Themes are used in addition to BISAC Subject Headings to denote an audience to which a work may be of particular appeal, a time of year or event for which a work may be especially appropriate, or to further describe fictional works that have been subject-coded by genre",
      "a": 0,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Publisher\u0092s own category code",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Proprietary subject scheme",
      "description": "As specified in <SubjectSchemeName>",
      "a": 0,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Tabla de materias ISBN",
      "description": "Latin America",
      "a": 0,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Warengruppen-Systematik des deutschen Buchhandels",
      "description": "See https://vlb.de/assets/images/wgsneuversion2_0.pdf (in German)",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "27": {
      "value": "SWD",
      "description": "Schlagwortnormdatei \u0096 Subject Headings Authority File in the German-speaking countries. See http://www.dnb.de/standardisierung/normdateien/swd.htm (in German) and http://www.dnb.de/eng/standardisierung/normdateien/swd.htm (English). Deprecated in favor of the GND",
      "a": 0,
      "b": 18.0,
      "c": 18.0
    },
    "28": {
      "value": "Th\u00e8mes Electre",
      "description": "Subject classification used by Electre (France)",
      "a": 0,
      "b": null,
      "c": null
    },
    "29": {
      "value": "CLIL Classification th\u00e9matique",
      "description": "France. A four-digit number, see https://clil.centprod.com/listeActive.html (in French)",
      "a": 0,
      "b": 53.0,
      "c": null
    },
    "30": {
      "value": "DNB-Sachgruppen",
      "description": "Deutsche Bibliothek subject groups. Used for German National Bibliography until 2003 (65 subjects). Is different from value 18. See http://www.dnb.de/service/pdf/ddc_wv_alt_neu.pdf (in German)",
      "a": 1,
      "b": 9.0,
      "c": null
    },
    "31": {
      "value": "NUGI",
      "description": "Nederlandse Uniforme Genre-Indeling (former Dutch book trade classification)",
      "a": 1,
      "b": null,
      "c": null
    },
    "32": {
      "value": "NUR",
      "description": "Nederlandstalige Uniforme Rubrieksindeling (Dutch book trade classification, from 2002), see http://www.boek.nl/nur (in Dutch)",
      "a": 1,
      "b": null,
      "c": null
    },
    "33": {
      "value": "ECPA Christian Book Category",
      "description": "Former ECPA Christian Product Category Book Codes, consisting of up to three x 3-letter blocks, for Super Category, Primary Category and Sub-Category, previously at http://www.ecpa.org/ECPA/cbacategories.xls. No longer maintained by the ECPA. Deprecated",
      "a": 1,
      "b": 60.0,
      "c": 60.0
    },
    "34": {
      "value": "SISO",
      "description": "Schema Indeling Systematische Catalogus Openbare Bibliotheken (Dutch library classification)",
      "a": 1,
      "b": null,
      "c": null
    },
    "35": {
      "value": "Korean Decimal Classification (KDC)",
      "description": "A modified Dewey Decimal Classification used in the Republic of Korea",
      "a": 1,
      "b": null,
      "c": null
    },
    "36": {
      "value": "DDC Deutsch 22",
      "description": "German Translation of Dewey Decimal Classification 22. Also known as DDC 22 ger. See http://www.ddc-deutsch.de/produkte/uebersichten/",
      "a": 2,
      "b": 9.0,
      "c": null
    },
    "37": {
      "value": "Bokgrupper",
      "description": "Norwegian book trade product categories (Bokgrupper) administered by the Norwegian Publishers Association (http://www.forleggerforeningen.no/)",
      "a": 5,
      "b": 28.0,
      "c": null
    },
    "38": {
      "value": "Varegrupper",
      "description": "Norwegian bookselling subject categories (Bokhandelens varegrupper) administered by the Norwegian Booksellers Association (http://bokhandlerforeningen.no/)",
      "a": 5,
      "b": 28.0,
      "c": null
    },
    "39": {
      "value": "L\u00e6replaner-KL06",
      "description": "Norwegian school curriculum version. Deprecated",
      "a": 6,
      "b": 53.0,
      "c": 28.0
    },
    "40": {
      "value": "Nippon Decimal Classification",
      "description": "Japanese subject classification scheme",
      "a": 5,
      "b": null,
      "c": null
    },
    "41": {
      "value": "BSQ",
      "description": "BookSelling Qualifier: Russian book trade classification",
      "a": 5,
      "b": null,
      "c": null
    },
    "42": {
      "value": "ANELE Materias",
      "description": "Spain: subject coding scheme of the Asociaci\u00f3n Nacional de Editores de Libros y Material de Ense\u00f1anza",
      "a": 5,
      "b": null,
      "c": null
    },
    "43": {
      "value": "Utdanningsprogram",
      "description": "Codes for Norwegian \u0091utdanningsprogram\u0092 used in secondary education. See: http://www.udir.no/. (Formerly labelled \u0091Skolefag\u0092)",
      "a": 6,
      "b": 28.0,
      "c": null
    },
    "44": {
      "value": "Programomr\u00e5de",
      "description": "Codes for Norwegian \u0091programomr\u00e5de\u0092 used in secondary education. See http://www.udir.no/. (Formerly labelled \u0091Videreg\u00e5ende\u0092 or \u0091Programfag\u0092)",
      "a": 6,
      "b": 32.0,
      "c": null
    },
    "45": {
      "value": "Undervisningsmateriell",
      "description": "Norwegian list of categories for books and other material used in education",
      "a": 6,
      "b": null,
      "c": null
    },
    "46": {
      "value": "Norsk DDK",
      "description": "Norwegian version of Dewey Decimal Classification",
      "a": 6,
      "b": null,
      "c": null
    },
    "47": {
      "value": "Varugrupper",
      "description": "Swedish bookselling subject categories",
      "a": 7,
      "b": null,
      "c": null
    },
    "48": {
      "value": "SAB",
      "description": "Swedish classification scheme",
      "a": 7,
      "b": null,
      "c": null
    },
    "49": {
      "value": "L\u00e4romedelstyp",
      "description": "Swedish bookselling educational subject type",
      "a": 7,
      "b": 28.0,
      "c": null
    },
    "50": {
      "value": "F\u00f6rhandsbeskrivning",
      "description": "Swedish publishers preliminary subject classification",
      "a": 7,
      "b": null,
      "c": null
    },
    "51": {
      "value": "Spanish ISBN UDC subset",
      "description": "Controlled subset of UDC codes used by the Spanish ISBN Agency",
      "a": 7,
      "b": null,
      "c": null
    },
    "52": {
      "value": "ECI subject categories",
      "description": "Subject categories defined by El Corte Ingl\u00e9s and used widely in the Spanish book trade",
      "a": 7,
      "b": null,
      "c": null
    },
    "53": {
      "value": "Soggetto CCE",
      "description": "Classificazione commerciale editoriale (Italian book trade subject category based on BIC). CCE documentation available at https://www.ie-online.it/CCE2_2.0.pdf",
      "a": 7,
      "b": null,
      "c": null
    },
    "54": {
      "value": "Qualificatore geografico CCE",
      "description": "CCE Geographical qualifier",
      "a": 7,
      "b": null,
      "c": null
    },
    "55": {
      "value": "Qualificatore di lingua CCE",
      "description": "CCE Language qualifier",
      "a": 7,
      "b": null,
      "c": null
    },
    "56": {
      "value": "Qualificatore di periodo storico CCE",
      "description": "CCE Time Period qualifier",
      "a": 7,
      "b": null,
      "c": null
    },
    "57": {
      "value": "Qualificatore di livello scolastico CCE",
      "description": "CCE Educational Purpose qualifier",
      "a": 7,
      "b": null,
      "c": null
    },
    "58": {
      "value": "Qualificatore di et\u00e0 di lettura CCE",
      "description": "CCE Reading Level Qualifier",
      "a": 7,
      "b": null,
      "c": null
    },
    "59": {
      "value": "VdS Bildungsmedien F\u00e4cher",
      "description": "Subject code list of the German association of educational media publishers, formerly at http://www.bildungsmedien.de/service/onixlisten/unterrichtsfach_onix_codelist27_value59_0408.pdf. Deprecated \u0096 use Thema subject category (eg YPA \u0096 Educational: Arts, general) instead, and add a Thema language qualifier (eg 2ACB \u0096\u00a0English) for language teaching",
      "a": 7,
      "b": 60.0,
      "c": 59.0
    },
    "60": {
      "value": "Fagkoder",
      "description": "Norwegian primary and secondary school subject categories (fagkoder), see http://www.udir.no/",
      "a": 7,
      "b": 28.0,
      "c": null
    },
    "61": {
      "value": "JEL classification",
      "description": "Journal of Economic Literature classification scheme",
      "a": 7,
      "b": null,
      "c": null
    },
    "62": {
      "value": "CSH",
      "description": "National Library of Canada subject heading (English)",
      "a": 9,
      "b": null,
      "c": null
    },
    "63": {
      "value": "RVM",
      "description": "R\u00e9pertoire de vedettes-mati\u00e8re Biblioth\u00e8que de l\u0092Universit\u00e9 Laval) (French)",
      "a": 9,
      "b": 34.0,
      "c": null
    },
    "64": {
      "value": "YSA",
      "description": "Finnish General Thesaurus (Finnish: Yleinen suomalainen asiasanasto). See https://finto.fi/ysa/fi/ (in Finnish). Deprecated. No longer updated, and replaced by YSO (see code 71)",
      "a": 8,
      "b": 58.0,
      "c": 58.0
    },
    "65": {
      "value": "All\u00e4rs",
      "description": "Swedish translation of the Finnish General Thesaurus (Swedish: Allm\u00e4n tesaurus p\u00e5 svenska). See https://finto.fi/allars/sv/ (in Swedish). Deprecated. No longer updated, and replaced by YSO (see code 71)",
      "a": 8,
      "b": 58.0,
      "c": 58.0
    },
    "66": {
      "value": "YKL",
      "description": "Finnish Public Libraries Classification System (Finnish: Yleisten kirjastojen luokitusj\u00e4rjestelm\u00e4). See https://finto.fi/ykl/fi/ (in Finnish), https://finto.fi/ykl/sv/ (in Swedish), https://finto.fi/ykl/en/ (in English)",
      "a": 8,
      "b": 58.0,
      "c": null
    },
    "67": {
      "value": "MUSA",
      "description": "Finnish Music Thesaurus (Finnish: Musiikin asiasanasto). See https://finto.fi/musa/fi/ (in Finnish). Deprecated, and replaced by YSO (see code 71)",
      "a": 8,
      "b": 58.0,
      "c": 58.0
    },
    "68": {
      "value": "CILLA",
      "description": "Swedish translation of the Finnish Music Thesaurus (Swedish: Specialtesaurus f\u00f6r musik). See https://finto.fi/musa/sv/ (in Swedish). Deprecated, and replaced by YSO (see code 71)",
      "a": 8,
      "b": 58.0,
      "c": 58.0
    },
    "69": {
      "value": "Kaunokki",
      "description": "Finnish thesaurus for fiction (Finnish: Fiktiivisen aineiston asiasanasto). See https://finto.fi/kaunokki/fi/ (in Finnish). Deprecated. No longer updated, and replaced by Kauno and SLM (see codes D0 and D1)",
      "a": 8,
      "b": 58.0,
      "c": 58.0
    },
    "70": {
      "value": "Bella",
      "description": "Swedish translation of the Finnish thesaurus for fiction (Swedish: Specialtesaurus f\u00f6r fiktivt material:). See https://finto.fi/kaunokki/sv/ (in Swedish). Deprecated. No longer updated, and replaced by Kauno and SLM (see codes D0 and D1)",
      "a": 8,
      "b": 58.0,
      "c": 58.0
    },
    "71": {
      "value": "YSO",
      "description": "General Finnish Ontology (Finnish: Yleinen suomalainen ontologia). See https://finto.fi/yso/fi/ (in Finnish), https://finto.fi/yso/sv/ (in Swedish), https://finto.fi/yso/en/ (in English)",
      "a": 8,
      "b": 58.0,
      "c": null
    },
    "72": {
      "value": "PTO",
      "description": "Finnish Geospatial Domain Ontology (Finnish: Paikkatieto ontologia). See https://finto.fi/pto/fi/ (in Finnish), https://finto.fi/pto/sv/ (in Swedish), https://finto.fi/pto/en/ (in English)",
      "a": 8,
      "b": 58.0,
      "c": null
    },
    "73": {
      "value": "Suomalainen kirja-alan luokitus",
      "description": "Finnish book trade categorisation",
      "a": 8,
      "b": null,
      "c": null
    },
    "74": {
      "value": "Sears",
      "description": "Sears List of Subject Headings",
      "a": 9,
      "b": null,
      "c": null
    },
    "75": {
      "value": "BIC E4L",
      "description": "BIC E4Libraries Category Headings, formerly at http://www.bic.org.uk/51/E4libraries-Subject-Category-Headings/ but replaced by UK Standard Library Categories (code 92). Deprecated",
      "a": 9,
      "b": 61.0,
      "c": 61.0
    },
    "76": {
      "value": "CSR",
      "description": "Code Sujet Rayon: subject categories used by bookstores in France",
      "a": 11,
      "b": null,
      "c": null
    },
    "77": {
      "value": "Suomalainen oppiaineluokitus",
      "description": "Finnish school subject categories. See https://www.onixkeskus.fi/media/f/5722",
      "a": 11,
      "b": 60.0,
      "c": null
    },
    "78": {
      "value": "Japanese book trade C-Code",
      "description": "See https://isbn.jpo.or.jp/doc/08.pdf#page=44 (in Japanese)",
      "a": 12,
      "b": 54.0,
      "c": null
    },
    "79": {
      "value": "Japanese book trade Genre Code",
      "description": null,
      "a": 12,
      "b": null,
      "c": null
    },
    "80": {
      "value": "Fiktiivisen aineiston lis\u00e4luokitus",
      "description": "Finnish fiction genre classification. See https://finto.fi/ykl/fi/page/fiktioluokka (in Finnish), https://finto.fi/ykl/sv/page/fiktioluokka (in Swedish), https://finto.fi/ykl/en/page/fiktioluokka (in English)",
      "a": 13,
      "b": 58.0,
      "c": null
    },
    "81": {
      "value": "Arabic Subject heading scheme",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "82": {
      "value": "Arabized BIC subject category",
      "description": "Arabized version of BIC subject category scheme developed by ElKotob.com",
      "a": 13,
      "b": null,
      "c": null
    },
    "83": {
      "value": "Arabized LC subject headings",
      "description": "Arabized version of Library of Congress scheme",
      "a": 13,
      "b": null,
      "c": null
    },
    "84": {
      "value": "Bibliotheca Alexandrina Subject Headings",
      "description": "Classification scheme used by Library of Alexandria",
      "a": 13,
      "b": null,
      "c": null
    },
    "85": {
      "value": "Postal code",
      "description": "Location defined by postal code. Format is two-letter country code (from List 91), space, postal code. Note some postal codes themselves contain spaces, eg \u0091GB N7 9DP\u0092 or \u0091US 10125\u0092",
      "a": 14,
      "b": null,
      "c": null
    },
    "86": {
      "value": "GeoNames ID",
      "description": "ID number for geographical place, as defined at http://www.geonames.org (eg 2825297 is Stuttgart, Germany, see http://www.geonames.org/2825297)",
      "a": 14,
      "b": null,
      "c": null
    },
    "87": {
      "value": "NewBooks Subject Classification",
      "description": "Used for classification of academic and specialist publication in German-speaking countries. See http://www.newbooks-services.com/de/top/unternehmensportrait/klassifikation-und-mapping.html (German) and http://www.newbooks-services.com/en/top/about-newbooks/classification-mapping.html (English)",
      "a": 14,
      "b": null,
      "c": null
    },
    "88": {
      "value": "Chinese Library Classification",
      "description": "Subject classification maintained by the Editorial Board of Chinese Library Classification. See http://cct.nlc.gov.cn for access to details of the scheme",
      "a": 15,
      "b": null,
      "c": null
    },
    "89": {
      "value": "NTCPDSAC Classification",
      "description": "Subject classification for Books, Audiovisual products and E-publications formulated by China National Technical Committee 505",
      "a": 15,
      "b": null,
      "c": null
    },
    "90": {
      "value": "Season and Event Indicator",
      "description": "German code scheme indicating association with seasons, holidays, events (eg Autumn, Back to School, Easter)",
      "a": 18,
      "b": null,
      "c": null
    },
    "91": {
      "value": "GND",
      "description": "(de: Gemeinsame Normdatei) Integrated Authority File used in the German-speaking countries. See https://www.dnb.de/DE/Professionell/Standardisierung/GND/gnd_node.html (German) and https://www.dnb.de/EN/Professionell/Standardisierung/GND/gnd_node.html (English). Combines the PND, SWD and GKD into a single authority file, and should be used in preference to the older codes",
      "a": 18,
      "b": 66.0,
      "c": null
    },
    "92": {
      "value": "BIC UKSLC",
      "description": "UK Standard Library Categories, the successor to BIC\u0092s E4L classification scheme. See https://bic.org.uk/resources/uk-standard-library-categories/",
      "a": 19,
      "b": 61.0,
      "c": null
    },
    "93": {
      "value": "Thema subject category",
      "description": "International multilingual subject category scheme \u0096 see https://ns.editeur.org/thema",
      "a": 20,
      "b": null,
      "c": null
    },
    "94": {
      "value": "Thema place qualifier",
      "description": null,
      "a": 20,
      "b": 42.0,
      "c": null
    },
    "95": {
      "value": "Thema language qualifier",
      "description": null,
      "a": 20,
      "b": null,
      "c": null
    },
    "96": {
      "value": "Thema time period qualifier",
      "description": null,
      "a": 20,
      "b": null,
      "c": null
    },
    "97": {
      "value": "Thema educational purpose qualifier",
      "description": null,
      "a": 20,
      "b": null,
      "c": null
    },
    "98": {
      "value": "Thema interest age / special interest qualifier",
      "description": null,
      "a": 20,
      "b": 21.0,
      "c": null
    },
    "99": {
      "value": "Thema style qualifier",
      "description": null,
      "a": 21,
      "b": null,
      "c": null
    },
    "A2": {
      "value": "\u00c4mnesord",
      "description": "Swedish subject categories maintained by Bokrondellen",
      "a": 22,
      "b": null,
      "c": null
    },
    "A3": {
      "value": "Statystyka Ksiazek Papierowych, M\u00f3wionych I Elektronicznych",
      "description": "Polish Statistical Book and E-book Classification",
      "a": 23,
      "b": null,
      "c": null
    },
    "A4": {
      "value": "CCSS",
      "description": "Common Core State Standards curriculum alignment, for links to US educational standards. <SubjectCode> uses the full dot notation. See http://www.corestandards.org/developers-and-publishers",
      "a": 26,
      "b": null,
      "c": null
    },
    "A5": {
      "value": "Rameau",
      "description": "French library subject headings",
      "a": 24,
      "b": 34.0,
      "c": null
    },
    "A6": {
      "value": "Nomenclature discipline scolaire",
      "description": "French educational subject classification, URI http://data.education.fr/voc/scolomfr/scolomfr-voc-015GTPX",
      "a": 24,
      "b": 48.0,
      "c": null
    },
    "A7": {
      "value": "ISIC",
      "description": "International Standard Industry Classification, a classification of economic activities. Use for books that are about a particular industry or economic activity. <SubjectCode> should be a single letter denoting an ISIC section OR a 2-, 3- or 4-digit number denoting an ISIC division, group or class. See http://unstats.un.org/unsd/cr/registry/isic-4.asp",
      "a": 26,
      "b": null,
      "c": null
    },
    "A8": {
      "value": "LC Children\u0092s Subject Headings",
      "description": "Library of Congress Children\u0092s Subject Headings: LCSHAC supplementary headings for Children\u0092s books",
      "a": 28,
      "b": null,
      "c": null
    },
    "A9": {
      "value": "Ny L\u00e4romedel",
      "description": "Swedish bookselling educational subject",
      "a": 28,
      "b": null,
      "c": null
    },
    "B0": {
      "value": "EuroVoc",
      "description": "EuroVoc multilingual thesaurus. <SubjectCode> should be a EuroVoc concept dc:identifier (for example, 2777, \u0091refrigerated products\u0092). See http://eurovoc.europa.eu",
      "a": 29,
      "b": null,
      "c": null
    },
    "B1": {
      "value": "BISG Educational Taxonomy",
      "description": "Controlled vocabulary for educational objectives. See https://www.bisg.org/products/recommendations-for-citing-educational-standards-and-objectives-in-metadata",
      "a": 29,
      "b": 60.0,
      "c": null
    },
    "B2": {
      "value": "Keywords (not for display)",
      "description": "For indexing and search purposes, MUST not be displayed. Where multiple keywords or keyword phrases are sent, this should be in a single instance of the <SubjectHeadingText> element, and it is recommended that they should be separated by semi-colons. Use of code B2 should be very rare: use B2 in preference to code 20 only where it is important to show the keyword list is specifically NOT for display to purchasers (eg some keywords for a medical textbook may appear offensive if displayed out of context)",
      "a": 33,
      "b": 34.0,
      "c": null
    },
    "B3": {
      "value": "Nomenclature Dipl\u00f4me",
      "description": "French higher and vocational educational subject classification, URI http://data.education.fr/voc/scolomfr/scolomfr-voc-029",
      "a": 34,
      "b": 48.0,
      "c": null
    },
    "B4": {
      "value": "Key character names",
      "description": "For fiction and non-fiction, one or more key names, provided \u0096 like keywords \u0096 for indexing and search purposes. Where multiple character names are sent, this should be in a single instance of <SubjectHeadingText>, and multiple names should be separated by semi-colons. Note <NameAsSubject> should be used for people who are the central subject of the book. Code B4 may be used for names of lesser importance",
      "a": 35,
      "b": 42.0,
      "c": null
    },
    "B5": {
      "value": "Key place names",
      "description": "For fiction and non-fiction, one or more key names, provided \u0096 like keywords \u0096 for indexing and search purposes. Where multiple place names are sent, this should in a single instance of <SubjectHeadingText>, and multiple names should be separated by semi-colons. Only for use in ONIX 3.0 or later",
      "a": 42,
      "b": null,
      "c": null
    },
    "B6": {
      "value": "FAST",
      "description": "Faceted Application of Subject Terminology, OCLC subject scheme derived from LCSH (see code 04). See https://fast.oclc.org/fast/. Codes are up to 8 digits, for example 1726640 for Historical fiction (see https://id.worldcat.org/fast/1726640). Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": 66.0,
      "c": null
    },
    "B7": {
      "value": "NGSS",
      "description": "Next Generation Science Standards for K-12 education in the USA (https://www.nextgenscience.org). <SubjectCode> is a code such as 4-PS3-2. Only for use in ONIX 3.0 or later",
      "a": 48,
      "b": null,
      "c": null
    },
    "B8": {
      "value": "MVB-Lesemotive",
      "description": "MVB classification of \u0091reading rationales\u0092, which classify unconscious motives that lead to a book purchase. Categories are assigned and maintained by MVB. Only for use in ONIX 3.0 or later. See https://vlb.de/lesemotive",
      "a": 52,
      "b": null,
      "c": null
    },
    "B9": {
      "value": "LOPS21 Subject module",
      "description": "Finnish Suomalainen oppiaineluokitus. Only for use in ONIX 3.0 or later",
      "a": 52,
      "b": null,
      "c": null
    },
    "C0": {
      "value": "L\u00e6replaner-LK20",
      "description": "Codes for Norwegian curriculum for primary and secondary education. Only for use in ONIX 3.0 or later. See L\u00e6replaner-LK20 at https://www.udir.no/om-udir/data/kl06-grep/",
      "a": 53,
      "b": null,
      "c": null
    },
    "C1": {
      "value": "Kompetansem\u00e5l-LK20",
      "description": "Codes for competency aims in the Norwegian curriculum for primary and secondary education. Only for use in ONIX 3.0 or later. See Kompetansem\u00e5l-LK20 at https://www.udir.no/om-udir/data/kl06-grep/",
      "a": 53,
      "b": null,
      "c": null
    },
    "C2": {
      "value": "Kompetansem\u00e5lsett-LK20",
      "description": "Codes for sets of competency aims in the Norwegian curriculum for primary and secondary education. Only for use in ONIX 3.0 or later. See Kompetansem\u00e5lsett-LK20 at https://www.udir.no/om-udir/data/kl06-grep/",
      "a": 53,
      "b": null,
      "c": null
    },
    "C3": {
      "value": "Tverrfaglige temaer-LK20",
      "description": "Codes for interdisciplinary topics in the Norwegian curriculum for primary and secondary education. Only for use in ONIX 3.0 or later. See Tverrfaglige temaer-LK20 at https://www.udir.no/om-udir/data/kl06-grep/",
      "a": 53,
      "b": null,
      "c": null
    },
    "C4": {
      "value": "CLIL \u0096 Type d\u0092article scolaire",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 53,
      "b": null,
      "c": null
    },
    "C5": {
      "value": "GAR \u0096 Type p\u00e9dagogique",
      "description": "Gestionnaire d\u0092Acc\u00e8s aux resources \u0096 see https://gar.education.fr/ Only for use in ONIX 3.0 or later",
      "a": 53,
      "b": null,
      "c": null
    },
    "C6": {
      "value": "ISCED-F",
      "description": "UNESCO ISCED Fields of education and training (2013), eg <SubjectCode> 0222 is \u0091History and archaeology\u0092. Only for use in ONIX 3.0 or later. See http://uis.unesco.org/sites/default/files/documents/international-standard-classification-of-education-fields-of-education-and-training-2013-detailed-field-descriptions-2015-en.pdf",
      "a": 55,
      "b": null,
      "c": null
    },
    "C7": {
      "value": "Klassifikationen von Spielen, Puzzles und Spielwaren",
      "description": "German category scheme for games, puzzles and toys. Only for use in ONIX 3.0 or later. See https://www.ludologie.de/fileadmin/user_upload/PDFs/211126_Kategorisierung_von_Spielen_Puzzles_und_Spielwaren.pdf",
      "a": 56,
      "b": null,
      "c": null
    },
    "C8": {
      "value": "NBVok NTSF",
      "description": "National Library of Norway genre and form thesaurus. Only for use in ONIX 3.0 or later. See https://www.nb.no/nbvok/ntsf",
      "a": 57,
      "b": 59.0,
      "c": null
    },
    "C9": {
      "value": "JPRO Genre",
      "description": "Subject / genre code used in Japan. Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "D0": {
      "value": "KAUNO",
      "description": "Finnish Ontology for fiction (Finnish: Fiktiivisen aineiston ontologia). See https://finto.fi/kauno/fi/ (in Finnish), https://finto.fi/kauno/sv/ (in Swedish), https://finto.fi/kauno/en/ (in English). Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "D1": {
      "value": "SLM",
      "description": "Finnish genre and form vocabulary (Finnish: Suomalainen lajityyppi ja muotosanasto). See https://finto.fi/slm/fi/ (in Finnish), https://finto.fi/slm/sv/ (in Swedish), https://finto.fi/slm/en/ (in English). Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "D2": {
      "value": "YSO-places",
      "description": "General Finnish Ontology for Places (Finnish: Yleinen suomalainen ontologia \u0096 paikat). See https://finto.fi/yso-paikat/fi/ (in Finnish), https://finto.fi/yso-paikat/sv/ (in Swedish), https://finto.fi/yso-paikat/en/ (in English). Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    }
  },
  "28": {
    "01": {
      "value": "General / adult",
      "description": "For a non-specialist or \u0091popular\u0092 adult audience. Consider also adding an ONIX Adult audience rating",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "02": {
      "value": "Children",
      "description": "For a young audience typically up to about the age of 12, not specifically for any educational purpose. An audience range should also be included",
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "03": {
      "value": "Teenage",
      "description": "For a teenage or \u0091young adult\u0092 audience typically from about the age of 12 to the late teens, not specifically for any educational purpose. An audience range should also be included",
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "04": {
      "value": "Primary and secondary education",
      "description": "Kindergarten, pre-school, primary / elementary or secondary / high school education. Note \u0091secondary\u0092 includes both level 2 and level 3 secondary education as defined in UNESCO\u0092s ISCED 2011 (see http://uis.unesco.org/en/topic/international-standard-classification-education-isced). An audience range should also be included",
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "11": {
      "value": "Pre-primary education",
      "description": "Equivalent to UNESCO\u0092s ISCED Level 0 \u0096 see http://uis.unesco.org/en/topic/international-standard-classification-education-isced (note codes 11\u009614 are specific subsets of the Primary and secondary education audience, code 04). Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Primary education",
      "description": "Equivalent to ISCED Level 1. Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Lower secondary education",
      "description": "Equivalent to ISCED Level 2 (general and vocational). Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Upper secondary education",
      "description": "Equivalent to ISCED Level 3 (general and vocational). Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Tertiary education",
      "description": "For tertiary education typically in universities and colleges of higher education, equivalent to ISCED Levels 5\u00967",
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "06": {
      "value": "Professional and scholarly",
      "description": "For an expert adult audience, including professional development and academic research",
      "a": 0,
      "b": 34.0,
      "c": null
    },
    "08": {
      "value": "Adult education",
      "description": "For any adult audience in a formal or semi-formal learning setting, eg vocational training and apprenticeships (collectively, equivalent to ISCED Level 4), or practical or recreational learning for adults",
      "a": 2,
      "b": 55.0,
      "c": null
    },
    "07": {
      "value": "EFL / TEFL / TESOL",
      "description": "Intended for use in teaching and learning English as a second, non-native or additional language. Indication of the language level (eg CEFR) should be included where possible. An audience range should also be included if the product is (also) suitable for use in primary and secondary education",
      "a": 0,
      "b": 58.0,
      "c": null
    },
    "09": {
      "value": "Second / additional language teaching",
      "description": "Intended for use in teaching and learning second, non-native or additional languages (other than English), for example teaching German to Spanish speakers. Indication of the language level (eg CEFR) should be included where possible. An audience range should also be included if the product is (also) suitable for use in primary and secondary education. Prefer code 07 for products specific to teaching English",
      "a": 29,
      "b": 58.0,
      "c": null
    }
  },
  "29": {
    "01": {
      "value": "ONIX audience codes",
      "description": "Using a code from List 28",
      "a": 6,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Proprietary",
      "description": "As specified in <AudienceCodeTypeName>",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "MPAA rating",
      "description": "Motion Picture Association of America rating applied to movies",
      "a": 0,
      "b": null,
      "c": null
    },
    "04": {
      "value": "BBFC rating",
      "description": "British Board of Film Classification rating applied to movies",
      "a": 0,
      "b": null,
      "c": null
    },
    "05": {
      "value": "FSK rating",
      "description": "German FSK (Freiwillige Selbstkontrolle der Filmwirtschaft) rating applied to movies",
      "a": 1,
      "b": null,
      "c": null
    },
    "06": {
      "value": "BTLF audience code",
      "description": "French Canadian audience code list, used by BTLF for Memento",
      "a": 4,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Electre audience code",
      "description": "Audience code used by Electre (France)",
      "a": 4,
      "b": null,
      "c": null
    },
    "08": {
      "value": "ANELE Tipo",
      "description": "Spain: educational audience and material type code of the Asociaci\u00f3n Nacional de Editores de Libros y Material de Ense\u00f1anza",
      "a": 5,
      "b": null,
      "c": null
    },
    "09": {
      "value": "AVI",
      "description": "Code list used to specify reading levels for children\u0092s books, used in Flanders, and formerly in the Netherlands \u0096 see also code 18",
      "a": 7,
      "b": 11.0,
      "c": null
    },
    "10": {
      "value": "USK rating",
      "description": "German USK (Unterhaltungssoftware Selbstkontrolle) rating applied to video or computer games",
      "a": 7,
      "b": null,
      "c": null
    },
    "11": {
      "value": "AWS",
      "description": "Audience code used in Flanders",
      "a": 8,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Schulform",
      "description": "Type of school: codelist formerly maintained by VdS Bildungsmedien eV, the German association of educational media publishers at http://www.bildungsmedien.de/service/onixlisten/schulform_onix_codelist29_value12_0408.pdf. Deprecated \u0096 use Thema educational purpose qualifier (eg 4Z-DE-BA \u0096 for German Elementary School) in <Subject> instead",
      "a": 8,
      "b": 60.0,
      "c": 59.0
    },
    "13": {
      "value": "Bundesland",
      "description": "School region: codelist maintained by VdS Bildungsmedien eV, the German association of educational media publishers, indicating where products are licensed to be used in schools. See http://www.bildungsmedien.de/service/onixlisten/bundesland_onix_codelist29_value13_0408.pdf. Deprecated",
      "a": 8,
      "b": 59.0,
      "c": 59.0
    },
    "14": {
      "value": "Ausbildungsberuf",
      "description": "Occupation: codelist for vocational training materials formerly maintained by VdS Bildungsmedien eV, the German association of educational media publishers at http://www.bildungsmedien.de/service/onixlisten/ausbildungsberufe_onix_codelist29_value14_0408.pdf. Deprecated \u0096 use Thema educational purpose qualifier (eg 4Z-DE-UH \u0096 for specific German professional/vocational qualifications and degrees) in <Subject> instead",
      "a": 8,
      "b": 60.0,
      "c": 59.0
    },
    "15": {
      "value": "Suomalainen kouluasteluokitus",
      "description": "Finnish school or college level",
      "a": 8,
      "b": null,
      "c": null
    },
    "16": {
      "value": "CBG age guidance",
      "description": "UK Publishers Association, Children\u0092s Book Group, coded indication of intended reader age, carried on book covers",
      "a": 8,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Nielsen Book audience code",
      "description": "Audience code used in Nielsen Book Services",
      "a": 11,
      "b": null,
      "c": null
    },
    "18": {
      "value": "AVI (revised)",
      "description": "Code list used to specify reading levels for children\u0092s books, used in the Netherlands \u0096 see also code 09",
      "a": 11,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Lexile measure",
      "description": "Lexile measure (the Lexile measure in <AudienceCodeValue> may optionally be prefixed by the Lexile code). Examples might be \u0091880L\u0092, \u0091AD0L\u0092 or \u0091HL600L\u0092. Deprecated \u0096 use <Complexity> instead",
      "a": 12,
      "b": 24.0,
      "c": 24.0
    },
    "20": {
      "value": "Fry Readability score",
      "description": "Fry readability metric based on number of sentences and syllables per 100 words. Expressed as a number from 1 to 15 in <AudienceCodeValue>. Deprecated \u0096 use <Complexity> instead",
      "a": 14,
      "b": 24.0,
      "c": 24.0
    },
    "21": {
      "value": "Japanese Children\u0092s audience code",
      "description": "Children\u0092s audience code, two-digit encoding of intended target readership from 0\u00962 years up to High School level",
      "a": 18,
      "b": null,
      "c": null
    },
    "22": {
      "value": "ONIX Adult audience rating",
      "description": "Publisher\u0092s rating indicating suitability for a particular adult audience, using a code from List 203. Should only be used when the ONIX Audience code indicates a general adult audience (code 01 from List 28)",
      "a": 18,
      "b": 47.0,
      "c": null
    },
    "23": {
      "value": "Common European Framework of Reference for Language Learning (CEFR)",
      "description": "Codes A1 to C2 indicating standardised level of language learning or teaching material, from beginner to advanced, defined by the Council of Europe (see http://www.coe.int/lang-CEFR)",
      "a": 19,
      "b": 41.0,
      "c": null
    },
    "24": {
      "value": "Korean Publication Ethics Commission rating",
      "description": "Rating used in Korea to control selling of books and e-books to minors. Current values are 0 (suitable for all) and 19 (only for sale to ages 19+). See http://www.kpec.or.kr/english/",
      "a": 21,
      "b": null,
      "c": null
    },
    "25": {
      "value": "IoE Book Band",
      "description": "UK Institute of Education Book Bands for Guided Reading scheme (see http://www.ioe.ac.uk/research/4664.html). <AudienceCodeValue> is a color, eg \u0091Pink A\u0092 or \u0091Copper\u0092. Deprecated \u0096 use <Complexity> instead",
      "a": 23,
      "b": 24.0,
      "c": 24.0
    },
    "26": {
      "value": "FSK Lehr-/Infoprogramm",
      "description": "Used for German videos/DVDs with educational or informative content; value for <AudienceCodeValue> must be either \u0091Infoprogramm gem\u00e4\u00df \u00a7 14 JuSchG\u0092 or \u0091Lehrprogramm gem\u00e4\u00df \u00a7 14 JuSchG\u0092",
      "a": 23,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Intended audience language",
      "description": "Where this is different from the language of the text of the book recorded in <Language>. <AudienceCodeValue> should be a value from List 74",
      "a": 25,
      "b": null,
      "c": null
    },
    "28": {
      "value": "PEGI rating",
      "description": "Pan European Game Information rating used primarily for video games",
      "a": 25,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Gymnasieprogram",
      "description": "Code indicating the intended curriculum (eg Naturvetenskapsprogrammet, Estetica programmet) in Swedish higher secondary education",
      "a": 28,
      "b": null,
      "c": null
    },
    "30": {
      "value": "ISCED 2011",
      "description": "International Standard Classification of Education levels (2011), eg <AudienceCodeValue> 253 is \u0091Lower secondary vocational education, level completion without direct access to upper secondary education\u0092. Only for use in ONIX 3.0 or later. See http://uis.unesco.org/en/topic/international-standard-classification-education-isced",
      "a": 55,
      "b": null,
      "c": null
    }
  },
  "30": {
    "11": {
      "value": "US school grade range",
      "description": "Values for <AudienceRangeValue> are specified in List 77",
      "a": 0,
      "b": null,
      "c": null
    },
    "12": {
      "value": "UK school grade",
      "description": "Values are to be defined by BIC for England and Wales, Scotland and N Ireland",
      "a": 6,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Reading speed, words per minute",
      "description": "Values in <AudienceRangeValue> must be integers",
      "a": 7,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Interest age, months",
      "description": "For use up to 36 months only, or up to 42 months in Audience range value (2) only: values in <AudienceRangeValue> must be integers. Should not be used when an Audience range with qualifier code 17 is present",
      "a": 6,
      "b": 62.0,
      "c": null
    },
    "17": {
      "value": "Interest age, years",
      "description": "Values in <AudienceRangeValue> must be integers",
      "a": 0,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Reading age, years",
      "description": "Values in <AudienceRangeValue> must be integers",
      "a": 0,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Spanish school grade",
      "description": "Spain: combined grade and region code, maintained by the Ministerio de Educaci\u00f3n",
      "a": 5,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Skoletrinn",
      "description": "Norwegian educational level for primary and secondary education",
      "a": 6,
      "b": 28.0,
      "c": null
    },
    "21": {
      "value": "Niv\u00e5",
      "description": "Swedish educational qualifier (code)",
      "a": 7,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Italian school grade",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Schulform",
      "description": "Deprecated \u0096 assigned in error: see List 29",
      "a": 7,
      "b": 8.0,
      "c": 8.0
    },
    "24": {
      "value": "Bundesland",
      "description": "Deprecated \u0096 assigned in error: see List 29",
      "a": 7,
      "b": 8.0,
      "c": 8.0
    },
    "25": {
      "value": "Ausbildungsberuf",
      "description": "Deprecated \u0096 assigned in error: see List 29",
      "a": 7,
      "b": 8.0,
      "c": 8.0
    },
    "26": {
      "value": "Canadian school grade range",
      "description": "Values for <AudienceRangeValue> are specified in List 77",
      "a": 8,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Finnish school grade range",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Finnish Upper secondary school course",
      "description": "Lukion kurssi",
      "a": 13,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Chinese School Grade range",
      "description": "Values are P, K, 1\u009617 (including college-level audiences), see List 227",
      "a": 15,
      "b": null,
      "c": null
    },
    "30": {
      "value": "French school cycles / classes",
      "description": "Detailed French educational level classification. Values are defined by ScoLOMFR, see http://data.education.fr/voc/scolomfr/scolomfr-voc-022 \u0096 Cycles de l\u0092enseignement scolaire. See also code 34",
      "a": 24,
      "b": 56.0,
      "c": null
    },
    "31": {
      "value": "Brazil Education level",
      "description": "N\u00edvel de Educa\u00e7\u00e3o do Brasil, see List 238. Only for use in ONIX 3.0 or later",
      "a": 39,
      "b": null,
      "c": null
    },
    "32": {
      "value": "French educational levels",
      "description": "Basic French educational level classification. Values are defined by ScoLOMFR. Only for use in ONIX 3.0 or later. See http://data.education.fr/voc/scolomfr/scolomfr-voc-012",
      "a": 48,
      "b": 56.0,
      "c": null
    },
    "33": {
      "value": "Finnish Upper secondary school course (2021+)",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 50,
      "b": null,
      "c": null
    },
    "34": {
      "value": "Detailed French educational levels",
      "description": "Detailed French educational level classification. Values are defined by ScoLOMFR. Only for use in ONIX 3.0 or later. See http://data.education.fr/voc/scolomfr/scolomfr-voc-022 \u0096 Niveau \u00e9ducatif d\u00e9taill\u00e9. See also code 30",
      "a": 56,
      "b": null,
      "c": null
    }
  },
  "31": {
    "01": {
      "value": "Exact",
      "description": "May only be used in Audience range precision (1), and when no Audience range precision (2) is present",
      "a": 0,
      "b": 62.0,
      "c": null
    },
    "03": {
      "value": "From",
      "description": "May only be used in Audience range precision (1)",
      "a": 0,
      "b": 62.0,
      "c": null
    },
    "04": {
      "value": "To",
      "description": "May be used in Audience range precision (1) when no Audience range precision (2) is present, or in Audience range precision (2) when Audience range precision (1) is code 03",
      "a": 0,
      "b": 62.0,
      "c": null
    }
  },
  "32": {
    "01": {
      "value": "Lexile code",
      "description": "For example AD or HL. Deprecated in ONIX 3 \u0096 use code 06 instead",
      "a": 0,
      "b": 24.0,
      "c": 12.0
    },
    "02": {
      "value": "Lexile number",
      "description": "For example 880L. Deprecated in ONIX 3 \u0096 use code 06 instead",
      "a": 0,
      "b": 24.0,
      "c": 12.0
    },
    "03": {
      "value": "Fry Readability score",
      "description": "Fry readability metric based on number of sentences and syllables per 100 words. Expressed as an integer from 1 to 15 in <ComplexityCode>",
      "a": 14,
      "b": null,
      "c": null
    },
    "04": {
      "value": "IoE Book Band",
      "description": "UK Institute of Education Book Bands for Guided Reading scheme (see https://www.ucl.ac.uk/reading-recovery-europe/ilc/publications/which-book-why). <ComplexityCode> is a color, eg \u0091Pink A\u0092 or \u0091Copper\u0092",
      "a": 23,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Fountas & Pinnell Text Level Gradient",
      "description": "<ComplexityCode> is a code from \u0091A\u0092 to Z+\u0092. See http://www.fountasandpinnellleveledbooks.com/aboutLeveledTexts.aspx",
      "a": 23,
      "b": 30.0,
      "c": null
    },
    "06": {
      "value": "Lexile measure",
      "description": "The Lexile measure in <ComplexityCode> combines MetaMetrics\u0092 Lexile number (for example 620L or 880L) and optionally the Lexile code (for example AD or HL). Examples might be \u0091880L\u0092, \u0091AD0L\u0092 or \u0091HL600L\u0092. Applies to English text. See https://lexile.com/about-lexile/lexile-overview/",
      "a": 24,
      "b": 67.0,
      "c": null
    },
    "07": {
      "value": "ATOS for Books",
      "description": "Advantage-TASA Open Standard book readability score, used for example within the Renaissance Learning Accelerated Reader scheme. <ComplexityCode> is the \u0091Book Level\u0092, a real number between 0 and 17. See http://www.renaissance.com/products/accelerated-reader/atos-analyzer",
      "a": 25,
      "b": 47.0,
      "c": null
    },
    "08": {
      "value": "Flesch-Kincaid Grade Level",
      "description": "Flesch-Kincaid Grade Level Formula, a standard readability measure based on the weighted number of syllables per word and words per sentence. <ComplexityCode> is a real number typically between about -1 and 20",
      "a": 26,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Guided Reading Level",
      "description": "Use this code for books levelled by the publisher or a third party using the Fountas and Pinnell Guided Reading methodology",
      "a": 30,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Reading Recovery Level",
      "description": "Used for books aimed at K-2 literacy intervention. <ComplexityCode> is an integer between 1 and 20",
      "a": 30,
      "b": null,
      "c": null
    },
    "11": {
      "value": "LIX",
      "description": "Swedish \u0091l\u00e4sbarhetsindex\u0092 readability index used in Scandinavia. Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Lexile Audio measure",
      "description": "Lexile Audio measure from MetaMetrics\u0092 Framework for Listening. The code in <ComplexityCode> indicates the difficulty of comprehension of audio material (for example 600L or 1030L). Only for use in ONIX 3.0 or later. See https://lexile.global/the-lexile-framework-for-listening/",
      "a": 56,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Lexile measure (Spanish)",
      "description": "Metametrics\u0092 Lexile measure for Spanish text. See https://lexile.com/educators/understanding-lexile-measures/lexile-measures-spanish/ Only for use in ONIX 3.0 or later",
      "a": 67,
      "b": null,
      "c": null
    }
  },
  "34": {
    "02": {
      "value": "HTML",
      "description": "Other than XHTML",
      "a": 0,
      "b": 2.0,
      "c": null
    },
    "03": {
      "value": "XML",
      "description": "Other than XHTML",
      "a": 0,
      "b": 2.0,
      "c": null
    },
    "05": {
      "value": "XHTML",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Default text format",
      "description": "Default: plain text containing no markup tags of any kind, except for the character entities &amp; and &lt; that XML insists must be used to represent ampersand and less-than characters in textual data, and in the encoding declared at the head of the message or in the XML default (UTF-8 or UTF-16) if there is no explicit declaration",
      "a": 4,
      "b": 49.0,
      "c": null
    },
    "07": {
      "value": "Basic ASCII text",
      "description": "Plain text containing no markup tags of any kind, except for the character entities &amp; and &lt; that XML insists must be used to represent ampersand and less-than characters in textual data, and with the character set limited to the ASCII range, i.e. valid characters whose Unicode character numbers lie between 32 (space) and 126 (tilde)",
      "a": 4,
      "b": 49.0,
      "c": null
    }
  },
  "41": {
    "01": {
      "value": "Winner",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Runner-up",
      "description": "Named as being in second place",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Commended",
      "description": "Cited as being worthy of special attention at the final stage of the judging process, but not named specifically as winner or runner-up. Possible terminology used by a particular prize includes \u0091specially commended\u0092 or \u0091honored\u0092",
      "a": 0,
      "b": 23.0,
      "c": null
    },
    "04": {
      "value": "Short-listed",
      "description": "Title named by the judging process to be one of the final list of candidates, such as a \u0091short-list\u0092 from which the winner is selected, or a title named as \u0091finalist\u0092",
      "a": 0,
      "b": 23.0,
      "c": null
    },
    "05": {
      "value": "Long-listed",
      "description": "Title named by the judging process to be one of the preliminary list of candidates, such as a \u0091long-list\u0092 from which first a shorter list or set of finalists is selected, and then the winner is announced",
      "a": 3,
      "b": 23.0,
      "c": null
    },
    "06": {
      "value": "Joint winner",
      "description": "Or co-winner",
      "a": 5,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Nominated",
      "description": "Selected by judging panel or an official nominating process for final consideration for a prize, award or honour for which no \u0091short-list\u0092 or \u0091long list\u0092 exists",
      "a": 24,
      "b": null,
      "c": null
    }
  },
  "42": {
    "01": {
      "value": "Textual work",
      "description": "A complete work which is published as a content item in a product which carries two or more such works, eg when two or three novels are published in a single omnibus volume",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Front matter",
      "description": "Text components such as Preface, Introduction etc which appear as preliminaries to the main body of text content in a product",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Body matter",
      "description": "Text components such as Part, Chapter, Section etc which appear as part of the main body of text content in a product",
      "a": 0,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Back matter",
      "description": "Text components such as Index which appear after the main body of text in a product",
      "a": 0,
      "b": null,
      "c": null
    }
  },
  "43": {
    "01": {
      "value": "Proprietary",
      "description": "For example, a publisher\u0092s own identifier. Note that <IDTypeName> is required with proprietary identifiers",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "GTIN-13",
      "description": "Formerly known as the EAN-13 (unhyphenated)",
      "a": 13,
      "b": null,
      "c": null
    },
    "06": {
      "value": "DOI",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "09": {
      "value": "PII",
      "description": "Publisher item identifier",
      "a": 0,
      "b": null,
      "c": null
    },
    "10": {
      "value": "SICI",
      "description": "For serial items only",
      "a": 0,
      "b": null,
      "c": null
    },
    "11": {
      "value": "ISTC",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "15": {
      "value": "ISBN-13",
      "description": "(Unhyphenated)",
      "a": 13,
      "b": null,
      "c": null
    },
    "39": {
      "value": "ISCC",
      "description": "International Standard Content Code, a \u0091similarity hash\u0092 derived algorithmically from the content itself (see https://iscc.codes). <IDValue> is a sequence comprising the Meta-Code and Content-Code ISCC-UNITSs generated from a digital manifestation of the work, as a variable-length case-insensitive alphanumeric string (or 27 characters including one hyphen if using ISCC v1.0, but this is deprecated). Note alphabetic characters in v1.x ISCCs use Base32 encoding and are conventionally upper case. The \u0091ISCC:\u0092 prefix is omitted. Only for use in ONIX 3.0 or later",
      "a": 50,
      "b": 62.0,
      "c": null
    }
  },
  "44": {
    "01": {
      "value": "Proprietary",
      "description": "Note that <IDTypeName> is required with proprietary identifiers",
      "a": 10,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Proprietary",
      "description": "Deprecated \u0096 use code 01",
      "a": 0,
      "b": 10.0,
      "c": 10.0
    },
    "03": {
      "value": "DNB publisher identifier",
      "description": "Deutsche Nationalbibliothek publisher identifier",
      "a": 1,
      "b": null,
      "c": null
    },
    "04": {
      "value": "B\u00f6rsenverein Verkehrsnummer",
      "description": "(de: Verkehrsnummer ded B\u00f6rsenverein des deutschen Buchhandels)",
      "a": 1,
      "b": 63.0,
      "c": null
    },
    "05": {
      "value": "German ISBN Agency publisher identifier",
      "description": "(de: MVB-Kennnummer)",
      "a": 1,
      "b": 63.0,
      "c": null
    },
    "06": {
      "value": "GLN",
      "description": "GS1 global location number (formerly EAN location number)",
      "a": 1,
      "b": 9.0,
      "c": null
    },
    "07": {
      "value": "SAN",
      "description": "Book trade Standard Address Number \u0096 US, UK etc",
      "a": 1,
      "b": 6.0,
      "c": null
    },
    "08": {
      "value": "MARC organization code",
      "description": "MARC code list for organizations \u0096 see http://www.loc.gov/marc/organizations/orgshome.html",
      "a": 28,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Centraal Boekhuis Relatie ID",
      "description": "Trading party identifier used in the Netherlands",
      "a": 4,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Distributeurscode Boekenbank",
      "description": "Flemish supplier code. Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Fondscode Boekenbank",
      "description": "Flemish publisher code",
      "a": 7,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Y-tunnus",
      "description": "Business Identity Code (Finland). See http://www.ytj.fi/ (in Finnish)",
      "a": 8,
      "b": null,
      "c": null
    },
    "16": {
      "value": "ISNI",
      "description": "International Standard Name Identifier. A sixteen digit number. Usually presented with spaces or hyphens dividing the number into four groups of four digits, but in ONIX the spaces or hyphens should be omitted. See https://isni.org/",
      "a": 10,
      "b": null,
      "c": null
    },
    "17": {
      "value": "PND",
      "description": "Personennamendatei \u0096 person name authority file used by Deutsche Nationalbibliothek and in other German-speaking countries. See http://www.dnb.de/standardisierung/normdateien/pnd.htm (German) or http://www.dnb.de/eng/standardisierung/normdateien/pnd.htm (English). Deprecated in favor of the GND",
      "a": 10,
      "b": 18.0,
      "c": 18.0
    },
    "18": {
      "value": "NACO",
      "description": "A control number assigned to a Library of Congress Control Number (LCCN) Name Authority / NACO record",
      "a": 10,
      "b": 51.0,
      "c": null
    },
    "19": {
      "value": "Japanese Publisher identifier",
      "description": "Publisher identifier administered by Japanese ISBN Agency",
      "a": 12,
      "b": null,
      "c": null
    },
    "20": {
      "value": "GKD",
      "description": "Gemeinsame K\u00f6rperschaftsdatei \u0096 Corporate Body Authority File in the German-speaking countries. See http://www.dnb.de/standardisierung/normdateien/gkd.htm (German) or http://www.dnb.de/eng/standardisierung/normdateien/gkd.htm (English). Deprecated in favor of the GND",
      "a": 13,
      "b": 18.0,
      "c": 18.0
    },
    "21": {
      "value": "ORCID",
      "description": "Open Researcher and Contributor ID. A sixteen digit number. Usually presented with hyphens dividing the number into four groups of four digits, but in ONIX the hyphens should be omitted. See http://www.orcid.org/",
      "a": 13,
      "b": null,
      "c": null
    },
    "22": {
      "value": "GAPP Publisher Identifier",
      "description": "Publisher identifier maintained by the Chinese ISBN Agency (GAPP)",
      "a": 15,
      "b": null,
      "c": null
    },
    "23": {
      "value": "VAT Identity Number",
      "description": "Identifier for a business organization for VAT purposes, eg within the EU\u0092s VIES system. See http://ec.europa.eu/taxation_customs/vies/faqvies.do for EU VAT ID formats, which vary from country to country. Generally these consist of a two-letter country code followed by the 8\u009612 digits of the national VAT ID. Some countries include one or two letters within their VAT ID. See http://en.wikipedia.org/wiki/VAT_identification_number for non-EU countries that maintain similar identifiers. Spaces, dashes etc should be omitted",
      "a": 16,
      "b": null,
      "c": null
    },
    "24": {
      "value": "JP Distribution Identifier",
      "description": "4-digit business organization identifier controlled by the Japanese Publication Wholesalers Association",
      "a": 17,
      "b": null,
      "c": null
    },
    "25": {
      "value": "GND",
      "description": "Gemeinsame Normdatei \u0096 Joint Authority File in the German-speaking countries. See http://www.dnb.de/EN/gnd (English). Combines the PND, SWD and GKD into a single authority file, and should be used in preference",
      "a": 18,
      "b": null,
      "c": null
    },
    "26": {
      "value": "DUNS",
      "description": "Dunn and Bradstreet Universal Numbering System, see http://www.dnb.co.uk/dandb-duns-number",
      "a": 22,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Ringgold ID",
      "description": "Ringgold organizational identifier, see http://www.ringgold.com/identify.html",
      "a": 22,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Identifiant Editeur Electre",
      "description": "French Electre publisher identifier",
      "a": 24,
      "b": null,
      "c": null
    },
    "29": {
      "value": "EIDR Party DOI",
      "description": "DOI used in EIDR party registry, for example \u009110.5237/C9F6-F41F\u0092 (Sam Raimi). See http://eidr.org",
      "a": 29,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Identifiant Marque Electre",
      "description": "French Electre imprint Identifier",
      "a": 24,
      "b": null,
      "c": null
    },
    "31": {
      "value": "VIAF ID",
      "description": "Virtual Internet Authority File. <IDValue> should be a number. The URI form of the identifier can be created by prefixing the number with \u0091https://viaf.org/viaf/\u0092. See https://viaf.org",
      "a": 29,
      "b": null,
      "c": null
    },
    "32": {
      "value": "FundRef DOI",
      "description": "DOI used in CrossRef\u0092s Open Funder Registry list of academic research funding bodies, for example \u009110.13039/100010269\u0092 (Wellcome Trust). Use of RORs for funder identifiers is now preferred. See https://www.crossref.org/services/funder-registry/",
      "a": 27,
      "b": 67.0,
      "c": null
    },
    "33": {
      "value": "BNE CN",
      "description": "Control number assigned to a Name Authority record by the Biblioteca Nacional de Espa\u00f1a",
      "a": 35,
      "b": null,
      "c": null
    },
    "34": {
      "value": "BNF Control Number",
      "description": "Num\u00e9ro de la notice de personne BNF",
      "a": 36,
      "b": null,
      "c": null
    },
    "35": {
      "value": "ARK",
      "description": "Archival Resource Key, as a URL (including the address of the ARK resolver provided by eg a national library)",
      "a": 36,
      "b": null,
      "c": null
    },
    "36": {
      "value": "Nasjonalt autoritetsregister",
      "description": "Nasjonalt autoritetsregister for navn \u0096 Norwegian national authority file for personal and corporate names. Only for use in ONIX 3.0 or later",
      "a": 37,
      "b": null,
      "c": null
    },
    "37": {
      "value": "GRID",
      "description": "Global Research Identifier Database ID (see https://www.grid.ac). Only for use in ONIX 3.0 or later. Deprecated \u0096 ROR is now generally preferred",
      "a": 39,
      "b": 60.0,
      "c": 60.0
    },
    "38": {
      "value": "IDRef",
      "description": "Party ID from Identifiers and Standards for Higher Education and Research (fr: Identifiants et R\u00e9f\u00e9rentiels pour l\u0092enseignement sup\u00e9rieur et la recherche). Only for use in ONIX 3.0 or later. See https://www.idref.fr",
      "a": 52,
      "b": null,
      "c": null
    },
    "39": {
      "value": "IPI",
      "description": "Party ID from CISAC\u0092s proprietary Interested Party Information scheme, used primarily in rights and royalies administration. Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    },
    "40": {
      "value": "ROR",
      "description": "Research organization registry identifier (see https://ror.org), leading 0 followed by 8 alphanumeric characters (including 2-digit checksum). Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "41": {
      "value": "EORI",
      "description": "Economic Operators Registration and Identification, identifier for businesses that import into or export from the EU. Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "42": {
      "value": "LEI",
      "description": "Legal Entity Identifier, administered by the Global LEI Foundation, as 20 alphanumeric characters without spaces or hyphens. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "43": {
      "value": "SIREN",
      "description": "French business identifier, issued by the National Institute of Statistics and Economic Studies (INSEE). 9 digits, without spaces. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "44": {
      "value": "SIRET",
      "description": "French business and location identifier, issued by the National Institute of Statistics and Economic Studies (INSEE). 14 digits (the SIREN plus a further five digits), without spaces, or occasionally an alphanumeric code. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    }
  },
  "45": {
    "01": {
      "value": "Publisher",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Co-publisher",
      "description": "Use where two or more publishers co-publish the exact same product, either under a single ISBN (in which case both publishers are co-publishers), or under different ISBNs (in which case the publisher of THIS ISBN is the publisher and the publishers of OTHER ISBNs are co-publishers. Note this is different from publication of \u0091co-editions\u0092",
      "a": 0,
      "b": 19.0,
      "c": null
    },
    "03": {
      "value": "Sponsor",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Publisher of original-language version",
      "description": "Of a translated work",
      "a": 0,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Host/distributor of electronic content",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Published for/on behalf of",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Published in association with",
      "description": "Use also for \u0091Published in cooperation with\u0092",
      "a": 2,
      "b": null,
      "c": null
    },
    "09": {
      "value": "New or acquiring publisher",
      "description": "When ownership of a product or title is transferred from one publisher to another",
      "a": 2,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Publishing group",
      "description": "The group to which a publisher (publishing role 01) belongs: use only if a publisher has been identified with role code 01",
      "a": 8,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Publisher of facsimile original",
      "description": "The publisher of the edition of which a product is a facsimile",
      "a": 9,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Repackager of prebound edition",
      "description": "The repackager of a prebound edition that has been assigned its own identifier. (In the US, a \u0091prebound edition\u0092 is a book that was previously bound, normally as a paperback, and has been rebound with a library-quality hardcover binding by a supplier other than the original publisher.) Required when the <EditionType> is coded PRB. The original publisher should be named as the \u0091publisher\u0092",
      "a": 9,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Former publisher",
      "description": "When ownership of a product or title is transferred from one publisher to another (complement of code 09)",
      "a": 12,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Publication funder",
      "description": "Body funding publication fees, if different from the body funding the underlying research. Intended primarily for use with open access publications",
      "a": 22,
      "b": 37.0,
      "c": null
    },
    "15": {
      "value": "Research funder",
      "description": "Body funding the research on which publication is based, if different from the body funding the publication. Intended primarily for use with open access publications",
      "a": 22,
      "b": 37.0,
      "c": null
    },
    "16": {
      "value": "Funding body",
      "description": "Body funding research and publication. Intended primarily for use with open access publications",
      "a": 22,
      "b": 37.0,
      "c": null
    },
    "17": {
      "value": "Printer",
      "description": "Organization responsible for printing a printed product. Supplied primarily to meet legal deposit requirements, and may apply only to the first impression. The organization may also be responsible for binding, when a separate binder is not specified",
      "a": 24,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Binder",
      "description": "Organization responsible for binding a printed product (where distinct from the printer). Supplied primarily to meet legal deposit requirements, and may apply only to the first impression",
      "a": 24,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Manufacturer",
      "description": "Organization primarily responsible for physical manufacture of a product, when neither Printer nor Binder is directly appropriate (for example, with disc or tape products, or digital products on a physical carrier)",
      "a": 29,
      "b": null,
      "c": null
    }
  },
  "46": {
    "00": {
      "value": "Sales rights unknown or unstated for any reason",
      "description": "May only be used with the <ROWSalesRightsType> element",
      "a": 12,
      "b": null,
      "c": null
    },
    "01": {
      "value": "For sale with exclusive rights in the specified countries or territories",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "For sale with non-exclusive rights in the specified countries or territories",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Not for sale in the specified countries or territories (reason unspecified)",
      "description": null,
      "a": 0,
      "b": 12.0,
      "c": null
    },
    "04": {
      "value": "Not for sale in the specified countries (but publisher holds exclusive rights in those countries or territories)",
      "description": null,
      "a": 12,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Not for sale in the specified countries (publisher holds non-exclusive rights in those countries or territories)",
      "description": null,
      "a": 12,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Not for sale in the specified countries (because publisher does not hold rights in those countries or territories)",
      "description": null,
      "a": 12,
      "b": null,
      "c": null
    },
    "07": {
      "value": "For sale with exclusive rights in the specified countries or territories (sales restriction applies)",
      "description": "Only for use with ONIX 3.0. Deprecated",
      "a": 12,
      "b": 24.0,
      "c": 24.0
    },
    "08": {
      "value": "For sale with non-exclusive rights in the specified countries or territories (sales restriction applies)",
      "description": "Only for use with ONIX 3.0. Deprecated",
      "a": 12,
      "b": 24.0,
      "c": 24.0
    }
  },
  "48": {
    "01": {
      "value": "Height",
      "description": "For a book, the overall height when standing on a shelf. For a folded map, the height when folded. For packaged products, the height of the retail packaging, and for trade-only products, the height of the trade packaging. In general, the height of a product in the form in which it is presented or packaged for retail sale",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "02": {
      "value": "Width",
      "description": "For a book, the overall horizontal dimension of the cover when standing upright. For a folded map, the width when folded. For packaged products, the width of the retail packaging, and for trade-only products, the width of the trade packaging. In general, the width of a product in the form in which it is presented or packaged for retail sale",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "03": {
      "value": "Thickness",
      "description": "For a book, the overall thickness of the spine. For a folded map, the thickness when folded. For packaged products, the depth of the retail packaging, and for trade-only products, the depth of the trade packaging. In general, the thickness or depth of a product in the form in which it is presented or packaged for retail sale",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "04": {
      "value": "Page trim height",
      "description": "Overall height (code 01) is preferred for general use, as it includes the board overhang for hardbacks",
      "a": 0,
      "b": 61.0,
      "c": null
    },
    "05": {
      "value": "Page trim width",
      "description": "Overall width (code 02) is preferred for general use, as it includes the board overhang and spine thickness for hardbacks",
      "a": 0,
      "b": 61.0,
      "c": null
    },
    "06": {
      "value": "Unit volume",
      "description": "The volume of the product, including any retail packaging. Note the <MeasureUnit> is interpreted as a volumetric unit \u0096 for example code cm = cubic centimetres (ie millilitres), and code oz = (US) fluid ounces. Only for use in ONIX 3.0 or later",
      "a": 46,
      "b": 58.0,
      "c": null
    },
    "07": {
      "value": "Unit capacity",
      "description": "Volume of the internal (fluid) contents of a product (eg of paint in a can). Note the <MeasureUnit> is interpreted as a volumetric unit \u0096 for example code cm = cubic centimetres (ie millilitres), and code oz = (US) fluid ounces. Only for use in ONIX 3.0 or later",
      "a": 46,
      "b": 58.0,
      "c": null
    },
    "08": {
      "value": "Unit weight",
      "description": "The overall weight of the product, including any retail packaging",
      "a": 0,
      "b": 45.0,
      "c": null
    },
    "09": {
      "value": "Diameter (sphere)",
      "description": "Of a globe, for example",
      "a": 1,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Unfolded/unrolled sheet height",
      "description": "The height of a folded or rolled sheet map, poster etc when unfolded",
      "a": 7,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Unfolded/unrolled sheet width",
      "description": "The width of a folded or rolled sheet map, poster etc when unfolded",
      "a": 7,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Diameter (tube or cylinder)",
      "description": "The diameter of the cross-section of a tube or cylinder, usually carrying a rolled sheet product. Use 01 \u0091Height\u0092 for the height or length of the tube",
      "a": 7,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Rolled sheet package side measure",
      "description": "The length of a side of the cross-section of a long triangular or square package, usually carrying a rolled sheet product. Use 01 \u0091Height\u0092 for the height or length of the package",
      "a": 7,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Unpackaged height",
      "description": "As height, but of the product without packaging (use only for products supplied in retail packaging, must also supply overall size when packaged using code 01). Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Unpackaged width",
      "description": "As width, but of the product without packaging (use only for products supplied in retail packaging, must also supply overall size when packaged using code 02). Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Unpackaged thickness",
      "description": "As thickness, but of the product without packaging (use only for products supplied in retail packaging, must also supply overall size when packaged using code 03). Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Total battery weight",
      "description": "Weight of batteries built-in, pre-installed or supplied with the product. Details of the batteries should be provided using <ProductFormFeature>. A per-battery unit weight may be calculated from the number of batteries if required. Only for use in ONIX 3.0 or later",
      "a": 45,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Total weight of Lithium",
      "description": "Mass or equivalent mass of elemental Lithium within the batteries built-in, pre-installed or supplied with the product (eg a Lithium Iron phosphate battery with 160g of cathode material would have a total of around 7g of Lithium). Details of the batteries must be provided using ProductFormFeature. A per-battery unit mass of Lithium may be calculated from the number of batteries if required. Only for use in ONIX 3.0 or later",
      "a": 45,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Assembled length",
      "description": "For use where product or part of product requires assembly, for example the size of a completed kit, puzzle or assembled display piece. The assembled dimensions may be larger than the product size as supplied. Use only when the unassembled dimensions as supplied (including any retail or trade packaging) are also provided using codes 01, 02 and 03. Only for use in ONIX 3.0 or later",
      "a": 50,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Assembled width",
      "description": null,
      "a": 50,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Assembled height",
      "description": null,
      "a": 50,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Unpackaged unit weight",
      "description": "Overall unit weight (code 08) is preferred for general use, as it includes the weight of any packaging. Use Unpackaged unit weight only for products supplied in retail packaging, and must also supply overall unit weight. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Carton length",
      "description": "Includes packaging. See <PackQuantity> for number of copies of the product per pack, and used only when dimensions of individual copies (codes 01, 02, 03) AND <PackQuantity> are supplied. Note that neither orders nor deliveries have to be aligned with multiples of the pack quantity, but such orders and deliveries may be more convenient to handle. Only for use in ONIX 3.0 or later",
      "a": 50,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Carton width",
      "description": null,
      "a": 50,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Carton height",
      "description": null,
      "a": 50,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Carton weight",
      "description": "Includes the weight of product(s) within the carton. See <PackQuantity> for number of copies per pack, and used only when the weight of individual copies (code 08) AND <PackQuantity> are supplied. Only for use in ONIX 3.0 or later",
      "a": 50,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Pallet length",
      "description": "Includes pallet and packaging. See <PalletQuantity> for number of copies of the product per pallet, and used only when dimensions of individual copies (codes 01, 02, 03) AND <PalletQuantity> are supplied. Note that neither orders nor deliveries have to be aligned with multiples of the pallet quantity, but such orders and deliveries may be more convenient to handle. Only for use in ONIX 3.0 or later",
      "a": 50,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Pallet width",
      "description": null,
      "a": 50,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Pallet height",
      "description": null,
      "a": 50,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Pallet weight",
      "description": "Includes the weight of product(s) and cartons stacked on the pallet. See <PalletQuantity> for the number of copies per pallet, and used only when the weight of individual copies (code 08) AND <PalletQuantity> are supplied.Only for use in ONIX 3.0 or later",
      "a": 50,
      "b": null,
      "c": null
    }
  },
  "49": {
    "AU-CT": {
      "value": "Australian Capital Territory",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "AU-NS": {
      "value": "New South Wales",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "AU-NT": {
      "value": "Northern Territory",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "AU-QL": {
      "value": "Queensland",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "AU-SA": {
      "value": "South Australia",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "AU-TS": {
      "value": "Tasmania",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "AU-VI": {
      "value": "Victoria",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "AU-WA": {
      "value": "Western Australia",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "BE-BRU": {
      "value": "Brussels-Capital Region",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 40,
      "b": null,
      "c": null
    },
    "BE-VLG": {
      "value": "Flemish Region",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 40,
      "b": null,
      "c": null
    },
    "BE-WAL": {
      "value": "Walloon Region",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 40,
      "b": null,
      "c": null
    },
    "CA-AB": {
      "value": "Alberta",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-BC": {
      "value": "British Columbia",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-MB": {
      "value": "Manitoba",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-NB": {
      "value": "New Brunswick",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-NL": {
      "value": "Newfoundland and Labrador",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-NS": {
      "value": "Nova Scotia",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-NT": {
      "value": "Northwest Territories",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-NU": {
      "value": "Nunavut",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-ON": {
      "value": "Ontario",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-PE": {
      "value": "Prince Edward Island",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-QC": {
      "value": "Quebec",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-SK": {
      "value": "Saskatchewan",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CA-YT": {
      "value": "Yukon Territory",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "CN-BJ": {
      "value": "Beijing Municipality",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-TJ": {
      "value": "Tianjin Municipality",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-HE": {
      "value": "Hebei Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-SX": {
      "value": "Shanxi Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-NM": {
      "value": "Nei Mongol Autonomous Region",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": 56.0,
      "c": null
    },
    "CN-LN": {
      "value": "Liaoning Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-JL": {
      "value": "Jilin Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-HL": {
      "value": "Heilongjiang Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-SH": {
      "value": "Shanghai Municipality",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-JS": {
      "value": "Jiangsu Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-ZJ": {
      "value": "Zhejiang Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-AH": {
      "value": "Anhui Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-FJ": {
      "value": "Fujian Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-JX": {
      "value": "Jiangxi Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-SD": {
      "value": "Shandong Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-HA": {
      "value": "Henull Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-HB": {
      "value": "Hubei Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-HN": {
      "value": "Hunull Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-GD": {
      "value": "Guangdong Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-GX": {
      "value": "Guangxi Zhuangzu Autonomous Region",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": 56.0,
      "c": null
    },
    "CN-HI": {
      "value": "Hainull Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-CQ": {
      "value": "Chongqing Municipality",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-SC": {
      "value": "Sichuan Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-GZ": {
      "value": "Guizhou Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-YN": {
      "value": "Yunnull Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-XZ": {
      "value": "Tibet Autonomous Region",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-SN": {
      "value": "Shaanxi Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-GS": {
      "value": "Gansu Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-QH": {
      "value": "Qinghai Province",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-NX": {
      "value": "Ningxia Huizu Autonomous Region",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": 56.0,
      "c": null
    },
    "CN-XJ": {
      "value": "Xinjiang Uygur Autonomous Region",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": 56.0,
      "c": null
    },
    "CN-TW": {
      "value": "Taiwan Province",
      "description": "Prefer code TW (Taiwan, Province of China) from List 91. Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-HK": {
      "value": "Hong Kong Special Administrative Region",
      "description": "Prefer code HK (Hong Kong) from List 91. Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-MO": {
      "value": "Macau Special Administrative Region",
      "description": "Prefer code MO (Macao) from List 91. Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CN-11": {
      "value": "Beijing Municipality",
      "description": "Deprecated in favor of CN-BJ",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-12": {
      "value": "Tianjin Municipality",
      "description": "Deprecated in favor of CN-TJ",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-13": {
      "value": "Hebei Province",
      "description": "Deprecated in favor of CN-HE",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-14": {
      "value": "Shanxi Province",
      "description": "Deprecated in favor of CN-SX",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-15": {
      "value": "Inner Mongolia Autonomous Region",
      "description": "Deprecated in favor of CN-NM",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-21": {
      "value": "Liaoning Province",
      "description": "Deprecated in favor of CN-LN",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-22": {
      "value": "Jilin Province",
      "description": "Deprecated in favor of CN-JL",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-23": {
      "value": "Heilongjiang Province",
      "description": "Deprecated in favor of CN-HL",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-31": {
      "value": "Shanghai Municipality",
      "description": "Deprecated in favor of CN-SH",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-32": {
      "value": "Jiangsu Province",
      "description": "Deprecated in favor of CN-JS",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-33": {
      "value": "Zhejiang Province",
      "description": "Deprecated in favor of CN-ZJ",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-34": {
      "value": "Anhui Province",
      "description": "Deprecated in favor of CN-AH",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-35": {
      "value": "Fujian Province",
      "description": "Deprecated in favor of CN-FJ",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-36": {
      "value": "Jiangxi Province",
      "description": "Deprecated in favor of CN-JX",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-37": {
      "value": "Shandong Province",
      "description": "Deprecated in favor of CN-SD",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-41": {
      "value": "Henull Province",
      "description": "Deprecated in favor of CN-HA",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-42": {
      "value": "Hubei Province",
      "description": "Deprecated in favor of CN-HB",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-43": {
      "value": "Hunull Province",
      "description": "Deprecated in favor of CN-HN",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-44": {
      "value": "Guangdong Province",
      "description": "Deprecated in favor of CN-GD",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-45": {
      "value": "Guangxi Zhuang Autonomous Region",
      "description": "Deprecated in favor of CN-GX",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-46": {
      "value": "Hainull Province",
      "description": "Deprecated in favor of CN-HI",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-50": {
      "value": "Chongqing Municipality",
      "description": "Deprecated in favor of CN-CQ",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-51": {
      "value": "Sichuan Province",
      "description": "Deprecated in favor of CN-SC",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-52": {
      "value": "Guizhou Province",
      "description": "Deprecated in favor of CN-GZ",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-53": {
      "value": "Yunnull Province",
      "description": "Deprecated in favor of CN-YN",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-54": {
      "value": "Tibet Autonomous Region",
      "description": "Deprecated in favor of CN-XZ",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-61": {
      "value": "Shaanxi Province",
      "description": "Deprecated in favor of CN-SN",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-62": {
      "value": "Gansu Province",
      "description": "Deprecated in favor of CN-GS",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-63": {
      "value": "Qinghai Province",
      "description": "Deprecated in favor of CN-QH",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-64": {
      "value": "Ningxia Hui Autonomous Region",
      "description": "Deprecated in favor of CN-NX",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-65": {
      "value": "Xinjiang Uyghur Autonomous Region",
      "description": "Deprecated in favor of CN-XJ",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-71": {
      "value": "Taiwan Province",
      "description": "Deprecated in favor of CN-TW, but prefer code TW (Taiwan, Province of China) from List 91",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-91": {
      "value": "Hong Kong Special Administrative Region",
      "description": "Deprecated in favor of CN-HK, but prefer code HK (Hong Kong) from List 91",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "CN-92": {
      "value": "Macau Special Administrative Region",
      "description": "Deprecated in favor of CN-MO, but prefer code MO (Macao) from List 91",
      "a": 30,
      "b": 44.0,
      "c": 44.0
    },
    "ES-CN": {
      "value": "Canary Islands",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "FR-H": {
      "value": "Corsica",
      "description": null,
      "a": 36,
      "b": null,
      "c": null
    },
    "GB-AIR": {
      "value": "UK airside",
      "description": "Airside outlets at UK international airports only",
      "a": 1,
      "b": null,
      "c": null
    },
    "GB-APS": {
      "value": "UK airports",
      "description": "All UK airports, including both airside and other outlets",
      "a": 3,
      "b": null,
      "c": null
    },
    "GB-CHA": {
      "value": "Channel Islands",
      "description": "Deprecated, replaced by country codes GG \u0096 Guernsey, and JE \u0096 Jersey from List 91",
      "a": 1,
      "b": 13.0,
      "c": 13.0
    },
    "GB-ENG": {
      "value": "England",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "GB-EWS": {
      "value": "England, Wales, Scotland",
      "description": "UK excluding Northern Ireland. Deprecated \u0096 use separate region codes GB-ENG, GB-SCT, GB-WLS instead",
      "a": 1,
      "b": 40.0,
      "c": 40.0
    },
    "GB-IOM": {
      "value": "Isle of Man",
      "description": "Deprecated, replaced by country code IM \u0096 Isle of Man from List 91",
      "a": 1,
      "b": 13.0,
      "c": 13.0
    },
    "GB-NIR": {
      "value": "Northern Ireland",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "GB-SCT": {
      "value": "Scotland",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "GB-WLS": {
      "value": "Wales",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "IE-AIR": {
      "value": "Ireland airside",
      "description": "Airside outlets at Irish international airports only",
      "a": 23,
      "b": null,
      "c": null
    },
    "IT-AG": {
      "value": "Agrigento",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-AL": {
      "value": "Alessandria",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-AN": {
      "value": "Ancona",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-AO": {
      "value": "Aosta",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-AR": {
      "value": "Arezzo",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-AP": {
      "value": "Ascoli Piceno",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-AT": {
      "value": "Asti",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-AV": {
      "value": "Avellino",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BA": {
      "value": "Bari",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BT": {
      "value": "Barletta-Andria-Trani",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BL": {
      "value": "Belluno",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BN": {
      "value": "Benevento",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BG": {
      "value": "Bergamo",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BI": {
      "value": "Biella",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BO": {
      "value": "Bologna",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BZ": {
      "value": "Bolzano",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BS": {
      "value": "Brescia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-BR": {
      "value": "Brindisi",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CA": {
      "value": "Cagliari",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CL": {
      "value": "Caltanissetta",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CB": {
      "value": "Campobasso",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CI": {
      "value": "Carbonia-Iglesias",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CE": {
      "value": "Caserta",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CT": {
      "value": "Catania",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CZ": {
      "value": "Catanzaro",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CH": {
      "value": "Chieti",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CO": {
      "value": "Como",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CS": {
      "value": "Cosenza",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CR": {
      "value": "Cremona",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-KR": {
      "value": "Crotone",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-CN": {
      "value": "Cuneo",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-EN": {
      "value": "Enna",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-FM": {
      "value": "Fermo",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-FE": {
      "value": "Ferrara",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-FI": {
      "value": "Firenze",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-FG": {
      "value": "Foggia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-FC": {
      "value": "Forl\u00ec-Cesena",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-FR": {
      "value": "Frosinone",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-GE": {
      "value": "Genova",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-GO": {
      "value": "Gorizia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-GR": {
      "value": "Grosseto",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-IM": {
      "value": "Imperia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-IS": {
      "value": "Isernia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-SP": {
      "value": "La Spezia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-AQ": {
      "value": "L\u0092Aquila",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-LT": {
      "value": "Latina",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-LE": {
      "value": "Lecce",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-LC": {
      "value": "Lecco",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-LI": {
      "value": "Livorno",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-LO": {
      "value": "Lodi",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-LU": {
      "value": "Lucca",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-MC": {
      "value": "Macerata",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-MN": {
      "value": "Mantova",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-MS": {
      "value": "Massa-Carrara",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-MT": {
      "value": "Matera",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-VS": {
      "value": "Medio Campidano",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-ME": {
      "value": "Messina",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-MI": {
      "value": "Milano",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-MO": {
      "value": "Modena",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-MB": {
      "value": "Monza e Brianza",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-NA": {
      "value": "Napoli",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-NO": {
      "value": "Novara",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-NU": {
      "value": "Nuoro",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-OG": {
      "value": "Ogliastra",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-OT": {
      "value": "Olbia-Tempio",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-OR": {
      "value": "Oristano",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PD": {
      "value": "Padova",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PA": {
      "value": "Palermo",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PR": {
      "value": "Parma",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PV": {
      "value": "Pavia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PG": {
      "value": "Perugia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PU": {
      "value": "Pesaro e Urbino",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PE": {
      "value": "Pescara",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PC": {
      "value": "Piacenza",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PI": {
      "value": "Pisa",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PT": {
      "value": "Pistoia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PN": {
      "value": "Pordenone",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PZ": {
      "value": "Potenza",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-PO": {
      "value": "Prato",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-RG": {
      "value": "Ragusa",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-RA": {
      "value": "Ravenna",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-RC": {
      "value": "Reggio Calabria",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-RE": {
      "value": "Reggio Emilia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-RI": {
      "value": "Rieti",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-RN": {
      "value": "Rimini",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-RM": {
      "value": "Roma",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-RO": {
      "value": "Rovigo",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-SA": {
      "value": "Salerno",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-SS": {
      "value": "Sassari",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-SV": {
      "value": "Savona",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-SI": {
      "value": "Siena",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-SR": {
      "value": "Siracusa",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-SO": {
      "value": "Sondrio",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-TA": {
      "value": "Taranto",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-TE": {
      "value": "Teramo",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-TR": {
      "value": "Terni",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-TO": {
      "value": "Torino",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-TP": {
      "value": "Trapani",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-TN": {
      "value": "Trento",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-TV": {
      "value": "Treviso",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-TS": {
      "value": "Trieste",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-UD": {
      "value": "Udine",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-VA": {
      "value": "Varese",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-VE": {
      "value": "Venezia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-VB": {
      "value": "Verbano-Cusio-Ossola",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-VC": {
      "value": "Vercelli",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-VR": {
      "value": "Verona",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-VV": {
      "value": "Vibo Valentia",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-VI": {
      "value": "Vicenza",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IT-VT": {
      "value": "Viterbo",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "RS-KM": {
      "value": "Kosovo-Metohija",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "RS-VO": {
      "value": "Vojvodina",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "RU-AD": {
      "value": "Republic of Adygeya",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-AL": {
      "value": "Republic of Altay",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-BA": {
      "value": "Republic of Bashkortostan",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-BU": {
      "value": "Republic of Buryatiya",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-CE": {
      "value": "Chechenskaya Republic",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-CU": {
      "value": "Chuvashskaya Republic",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-DA": {
      "value": "Republic of Dagestan",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-IN": {
      "value": "Republic of Ingushetiya",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KB": {
      "value": "Kabardino-Balkarskaya Republic",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KL": {
      "value": "Republic of Kalmykiya",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KC": {
      "value": "Karachayevo-Cherkesskaya Republic",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KR": {
      "value": "Republic of Kareliya",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KK": {
      "value": "Republic of Khakasiya",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KO": {
      "value": "Republic of Komi",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-ME": {
      "value": "Republic of Mariy El",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-MO": {
      "value": "Republic of Mordoviya",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-SA": {
      "value": "Republic of Sakha (Yakutiya)",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-SE": {
      "value": "Republic of Severnaya Osetiya-Alaniya",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-TA": {
      "value": "Republic of Tatarstan",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-TY": {
      "value": "Republic of Tyva (Tuva)",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-UD": {
      "value": "Udmurtskaya Republic",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-ALT": {
      "value": "Altayskiy Administrative Territory",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KAM": {
      "value": "Kamchatskiy Administrative Territory",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KHA": {
      "value": "Khabarovskiy Administrative Territory",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KDA": {
      "value": "Krasnodarskiy Administrative Territory",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KYA": {
      "value": "Krasnoyarskiy Administrative Territory",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-PER": {
      "value": "Permskiy Administrative Territory",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-PRI": {
      "value": "Primorskiy Administrative Territory",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-STA": {
      "value": "Stavropol\u0092skiy Administrative Territory",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-ZAB": {
      "value": "Zabaykal\u0092skiy Administrative Territory",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-AMU": {
      "value": "Amurskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-ARK": {
      "value": "Arkhangel\u0092skaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-AST": {
      "value": "Astrakhanskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-BEL": {
      "value": "Belgorodskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-BRY": {
      "value": "Bryanskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-CHE": {
      "value": "Chelyabinskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-IRK": {
      "value": "Irkutskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-IVA": {
      "value": "Ivanovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KGD": {
      "value": "Kaliningradskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KLU": {
      "value": "Kaluzhskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KEM": {
      "value": "Kemerovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KIR": {
      "value": "Kirovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KOS": {
      "value": "Kostromskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KGN": {
      "value": "Kurganskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KRS": {
      "value": "Kurskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-LEN": {
      "value": "Leningradskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-LIP": {
      "value": "Lipetskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-MAG": {
      "value": "Magadanskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-MOS": {
      "value": "Moskovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-MUR": {
      "value": "Murmanskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-NIZ": {
      "value": "Nizhegorodskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-NGR": {
      "value": "Novgorodskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-NVS": {
      "value": "Novosibirskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-OMS": {
      "value": "Omskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-ORE": {
      "value": "Orenburgskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-ORL": {
      "value": "Orlovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-PNZ": {
      "value": "Penzenskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-PSK": {
      "value": "Pskovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-ROS": {
      "value": "Rostovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-RYA": {
      "value": "Ryazanskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-SAK": {
      "value": "Sakhalinskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-SAM": {
      "value": "Samarskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-SAR": {
      "value": "Saratovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-SMO": {
      "value": "Smolenskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-SVE": {
      "value": "Sverdlovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-TAM": {
      "value": "Tambovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-TOM": {
      "value": "Tomskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-TUL": {
      "value": "Tul\u0092skaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-TVE": {
      "value": "Tverskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-TYU": {
      "value": "Tyumenskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-ULY": {
      "value": "Ul\u0092yanovskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-VLA": {
      "value": "Vladimirskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-VGG": {
      "value": "Volgogradskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-VLG": {
      "value": "Vologodskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-VOR": {
      "value": "Voronezhskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-YAR": {
      "value": "Yaroslavskaya Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-MOW": {
      "value": "Moskva City",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-SPE": {
      "value": "Sankt-Peterburg City",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-YEV": {
      "value": "Yevreyskaya Autonomous Administrative Region",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-CHU": {
      "value": "Chukotskiy Autonomous District",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-KHM": {
      "value": "Khanty-Mansiyskiy Autonomous District",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-NEN": {
      "value": "Nenetskiy Autonomous District",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "RU-YAN": {
      "value": "Yamalo-Nenetskiy Autonomous District",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "US-AK": {
      "value": "Alaska",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-AL": {
      "value": "Alabama",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-AR": {
      "value": "Arkansas",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-AZ": {
      "value": "Arizona",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-CA": {
      "value": "California",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-CO": {
      "value": "Colorado",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-CT": {
      "value": "Connecticut",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-DC": {
      "value": "District of Columbia",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-DE": {
      "value": "Delaware",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-FL": {
      "value": "Florida",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-GA": {
      "value": "Georgia",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-HI": {
      "value": "Hawaii",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-IA": {
      "value": "Iowa",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-ID": {
      "value": "Idaho",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-IL": {
      "value": "Illinois",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-IN": {
      "value": "Indiana",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-KS": {
      "value": "Kansas",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-KY": {
      "value": "Kentucky",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-LA": {
      "value": "Louisiana",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-MA": {
      "value": "Massachusetts",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-MD": {
      "value": "Maryland",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-ME": {
      "value": "Maine",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-MI": {
      "value": "Michigan",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-MN": {
      "value": "Minnesota",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-MO": {
      "value": "Missouri",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-MS": {
      "value": "Mississippi",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-MT": {
      "value": "Montana",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-NC": {
      "value": "North Carolina",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-ND": {
      "value": "North Dakota",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-NE": {
      "value": "Nebraska",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-NH": {
      "value": "New Hampshire",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-NJ": {
      "value": "New Jersey",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-NM": {
      "value": "New Mexico",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-NV": {
      "value": "Nevada",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-NY": {
      "value": "New York",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-OH": {
      "value": "Ohio",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-OK": {
      "value": "Oklahoma",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-OR": {
      "value": "Oregon",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-PA": {
      "value": "Pennsylvania",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-RI": {
      "value": "Rhode Island",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-SC": {
      "value": "South Carolina",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-SD": {
      "value": "South Dakota",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-TN": {
      "value": "Tennessee",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-TX": {
      "value": "Texas",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-UT": {
      "value": "Utah",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-VA": {
      "value": "Virginia",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-VT": {
      "value": "Vermont",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-WA": {
      "value": "Washington",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-WI": {
      "value": "Wisconsin",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-WV": {
      "value": "West Virginia",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "US-WY": {
      "value": "Wyoming",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "ECZ": {
      "value": "Eurozone",
      "description": "Countries geographically within continental Europe which use the Euro as their sole currency. At the time of writing, this is a synonym for \u0091AT BE CY EE FI FR DE ES GR HR IE IT LT LU LV MT NL PT SI SK\u0092 (the official Eurozone 20), plus \u0091AD MC SM VA ME\u0092 and Kosovo (other Euro-using countries in continental Europe). Note some other territories using the Euro, but outside continental Europe are excluded from this list, and may need to be specified separately. ONLY valid in ONIX 3.0, and ONLY within P.26 \u0096 and this use is itself Deprecated. Use of an explicit list of countries instead of ECZ is strongly encouraged",
      "a": 13,
      "b": 35.0,
      "c": 35.0
    },
    "WORLD": {
      "value": "World",
      "description": "In ONIX 3.0 and later, may ONLY be used in <RegionsIncluded>",
      "a": 1,
      "b": 35.0,
      "c": null
    }
  },
  "50": {
    "cm": {
      "value": "Centimeters",
      "description": "Millimeters are the preferred metric unit of length",
      "a": 6,
      "b": null,
      "c": null
    },
    "gr": {
      "value": "Grams",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "in": {
      "value": "Inches (US)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kg": {
      "value": "Kilograms",
      "description": "Grams are the preferred metric unit of weight",
      "a": 9,
      "b": null,
      "c": null
    },
    "lb": {
      "value": "Pounds (US)",
      "description": "Ounces are the preferred US customary unit of weight",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "mm": {
      "value": "Millimeters",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "oz": {
      "value": "Ounces (US)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "px": {
      "value": "Pixels",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    }
  },
  "51": {
    "00": {
      "value": "Unspecified",
      "description": "<Product> is related to <RelatedProduct> in a way that cannot be specified by another code value",
      "a": 1,
      "b": 11.0,
      "c": null
    },
    "01": {
      "value": "Includes",
      "description": "<Product> includes <RelatedProduct> (inverse of code 02)",
      "a": 1,
      "b": 11.0,
      "c": null
    },
    "02": {
      "value": "Is part of",
      "description": "<Product> is part of <RelatedProduct>: use for \u0091also available as part of\u0092 (inverse of code 01)",
      "a": 1,
      "b": 11.0,
      "c": null
    },
    "03": {
      "value": "Replaces",
      "description": "<Product> replaces, or is new edition of, <RelatedProduct> (inverse of code 05)",
      "a": 0,
      "b": 11.0,
      "c": null
    },
    "04": {
      "value": "Has companion product",
      "description": "<Product> and <RelatedProduct> are companion products, intended to be used, or are usable, together (is own inverse). Only for use in ONIX 3.0 or later",
      "a": 53,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Replaced by",
      "description": "<Product> is replaced by, or has new edition, <RelatedProduct> (inverse of code 03)",
      "a": 0,
      "b": 11.0,
      "c": null
    },
    "06": {
      "value": "Alternative format",
      "description": "<Product> is available in an alternative format as <RelatedProduct> \u0096 indicates an alternative format of the same content which is or may be available (is own inverse)",
      "a": 0,
      "b": 11.0,
      "c": null
    },
    "07": {
      "value": "Has ancillary product",
      "description": "<Product> has an ancillary or supplementary product <RelatedProduct> (inverse of code 08)",
      "a": 1,
      "b": 11.0,
      "c": null
    },
    "08": {
      "value": "Is ancillary to",
      "description": "<Product> is ancillary or supplementary to <RelatedProduct> (inverse of code 07)",
      "a": 1,
      "b": 11.0,
      "c": null
    },
    "09": {
      "value": "Is remaindered as",
      "description": "<Product> is remaindered as <RelatedProduct>, when a remainder merchant assigns its own identifier to the product (inverse of code 10)",
      "a": 1,
      "b": 11.0,
      "c": null
    },
    "10": {
      "value": "Is remainder of",
      "description": "<Product> was originally sold as <RelatedProduct>, indicating the publisher\u0092s original identifier for a title which is offered as a remainder under a different identifier (inverse of code 09)",
      "a": 1,
      "b": 11.0,
      "c": null
    },
    "11": {
      "value": "Is other-language version of",
      "description": "<Product> is an other-language version of <RelatedProduct> (is own inverse)",
      "a": 6,
      "b": 11.0,
      "c": null
    },
    "12": {
      "value": "Publisher\u0092s suggested alternative",
      "description": "<Product> has a publisher\u0092s suggested alternative <RelatedProduct>, which does not, however, carry the same content (cf 05 and 06)",
      "a": 0,
      "b": 11.0,
      "c": null
    },
    "13": {
      "value": "Epublication based on (print product)",
      "description": "<Product> is an epublication based on printed product <RelatedProduct>. The related product is the source of any print-equivalent page numbering present in the epublication (inverse of code 27)",
      "a": 0,
      "b": 40.0,
      "c": null
    },
    "16": {
      "value": "POD replacement for",
      "description": "<Product> is a POD replacement for <RelatedProduct>. <RelatedProduct> is an out-of-print product replaced by a print-on-demand version under a new ISBN (inverse of code 17)",
      "a": 5,
      "b": 11.0,
      "c": null
    },
    "17": {
      "value": "Replaced by POD",
      "description": "<Product> is replaced by POD <RelatedProduct>. <RelatedProduct> is a print-on-demand replacement, under a new ISBN, for an out-of-print <Product> (inverse of code 16)",
      "a": 5,
      "b": 11.0,
      "c": null
    },
    "18": {
      "value": "Is special edition of",
      "description": "<Product> is a special edition of <RelatedProduct>. Used for a special edition (de: \u0091Sonderausgabe\u0092) with different cover, binding, premium content etc \u0096 more than \u0091alternative format\u0092 \u0096 which may be available in limited quantity and for a limited time (inverse of code 19)",
      "a": 8,
      "b": 11.0,
      "c": null
    },
    "19": {
      "value": "Has special edition",
      "description": "<Product> has a special edition <RelatedProduct> (inverse of code 18)",
      "a": 8,
      "b": 11.0,
      "c": null
    },
    "20": {
      "value": "Is prebound edition of",
      "description": "<Product> is a prebound edition of <RelatedProduct> (In the US, a \u0091prebound\u0092 edition is \u0091a book that was previously bound and has been rebound with a library quality hardcover binding. In almost all commercial cases, the book in question began as a paperback. This might also be termed \u0091re-bound\u0092) (inverse of code 21)",
      "a": 9,
      "b": 11.0,
      "c": null
    },
    "21": {
      "value": "Is original of prebound edition",
      "description": "<Product> is the regular edition of which <RelatedProduct> is a prebound edition (inverse of code 20)",
      "a": 9,
      "b": 11.0,
      "c": null
    },
    "22": {
      "value": "Product by same author",
      "description": "<Product> and <RelatedProduct> have a common author",
      "a": 9,
      "b": 11.0,
      "c": null
    },
    "23": {
      "value": "Similar product",
      "description": "<RelatedProduct> is another product that is suggested as similar to <Product> (\u0091if you liked <Product>, you may also like <RelatedProduct>\u0092, or vice versa)",
      "a": 9,
      "b": 11.0,
      "c": null
    },
    "24": {
      "value": "Is facsimile of",
      "description": "<Product> is a facsimile edition of <RelatedProduct> (inverse of code 25)",
      "a": 9,
      "b": 11.0,
      "c": null
    },
    "25": {
      "value": "Is original of facsimile",
      "description": "<Product> is the original edition from which a facsimile edition <RelatedProduct> is taken (inverse of code 24)",
      "a": 9,
      "b": 11.0,
      "c": null
    },
    "26": {
      "value": "Is license for",
      "description": "<Product> is a license for a digital <RelatedProduct>, traded or supplied separately",
      "a": 9,
      "b": 11.0,
      "c": null
    },
    "27": {
      "value": "Electronic version available as",
      "description": "<RelatedProduct> is an electronic version of print <Product> (inverse of code 13)",
      "a": 9,
      "b": 11.0,
      "c": null
    },
    "28": {
      "value": "Enhanced version available as",
      "description": "<RelatedProduct> is an \u0091enhanced\u0092 version of <Product>, with additional content. Typically used to link an enhanced e-book to its original \u0091unenhanced\u0092 equivalent, but not specifically limited to linking e-books \u0096 for example, may be used to link illustrated and non-illustrated print books. <Product> and <RelatedProduct> should share the same <ProductForm> (inverse of code 29)",
      "a": 13,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Basic version available as",
      "description": "<RelatedProduct> is a basic version of <Product>. <Product> and <RelatedProduct> should share the same <ProductForm> (inverse of code 28)",
      "a": 13,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Product in same collection",
      "description": "<RelatedProduct> and <Product> are part of the same collection (eg two products in same series or set) (is own inverse)",
      "a": 13,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Has alternative in a different market sector",
      "description": "<RelatedProduct> is an alternative product in another sector (of the same geographical market). Indicates an alternative that carries the same content, but available to a different set of customers, as one or both products are retailer-, channel- or market sector-specific (is own inverse)",
      "a": 22,
      "b": null,
      "c": null
    },
    "32": {
      "value": "Has equivalent intended for a different market",
      "description": "<RelatedProduct> is an equivalent product, often intended for another (geographical) market. Indicates an alternative that carries essentially the same content, though slightly adapted for local circumstances (as opposed to a translation \u0096 use code 11) (is own inverse)",
      "a": 24,
      "b": null,
      "c": null
    },
    "33": {
      "value": "Has alternative intended for different market",
      "description": "<RelatedProduct> is an alternative product, often intended for another (geographical) market. Indicates the content of the alternative is identical in all respects (is own inverse)",
      "a": 24,
      "b": null,
      "c": null
    },
    "34": {
      "value": "Cites",
      "description": "<Product> cites <RelatedProduct> (inverse of code 35)",
      "a": 24,
      "b": null,
      "c": null
    },
    "35": {
      "value": "Is cited by",
      "description": "<Product> is the object of a citation in <RelatedProduct> (inverse of code 34)",
      "a": 24,
      "b": null,
      "c": null
    },
    "37": {
      "value": "Is signed version of",
      "description": "<Product> is a signed copy of <RelatedProduct>. Use where signed copies are given a distinct product identifier and can be ordered separately, but are otherwise identical (inverse of code 38)",
      "a": 33,
      "b": null,
      "c": null
    },
    "38": {
      "value": "Has signed version",
      "description": "<Product> is an unsigned copy of <RelatedProduct>. Use where signed copies are given a distinct product identifier and can be ordered separately, but are otherwise identical (inverse of code 37)",
      "a": 33,
      "b": null,
      "c": null
    },
    "39": {
      "value": "Has related student material",
      "description": "<Product> is intended for teacher use, and the related product is for student use",
      "a": 35,
      "b": null,
      "c": null
    },
    "40": {
      "value": "Has related teacher material",
      "description": "<Product> is intended for student use, and the related product is for teacher use",
      "a": 35,
      "b": null,
      "c": null
    },
    "41": {
      "value": "Some content shared with",
      "description": "<Product> includes some content shared with <RelatedProduct>. Note the shared content does not form the whole of either product. Compare with the \u0091includes\u0092 / \u0091is part of\u0092 relationship pair (codes 01 and 02), where the shared content forms the whole of one of the products, and with the \u0091alternative format\u0092 relationship (code 06), where the shared content forms the whole of both products (code 41 is own inverse)",
      "a": 35,
      "b": null,
      "c": null
    },
    "42": {
      "value": "Is later edition of first edition",
      "description": "<Product> is a later edition of <RelatedProduct>, where the related product is the first edition",
      "a": 36,
      "b": null,
      "c": null
    },
    "43": {
      "value": "Adapted from",
      "description": "<Product> is an adapted (dramatized, abridged, novelized etc) version of <RelatedProduct> (inverse of code 44). Only for use in ONIX 3.0 or later",
      "a": 43,
      "b": null,
      "c": null
    },
    "44": {
      "value": "Adapted as",
      "description": "<Product> is the original from which <RelatedProduct> is adapted (dramatized etc) (inverse of code 43). Only for use in ONIX 3.0 or later",
      "a": 43,
      "b": null,
      "c": null
    },
    "45": {
      "value": "Has linked product offer",
      "description": "Purchases of <Product> may qualify for one or more copies of <RelatedProduct> either free of charge or at a reduced price (inverse of code 48). This may be dependent on retailer participation, upon price and upon the quantity of the <Product> purchased. Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": 61.0,
      "c": null
    },
    "46": {
      "value": "May be substituted by",
      "description": "If ordered, <Product> may (at the supplier\u0092s discretion) be substituted and the <RelatedProduct> supplied instead (inverse of code 47). Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": 61.0,
      "c": null
    },
    "47": {
      "value": "May be substituted for",
      "description": "If ordered, <RelatedProduct> may (at the supplier\u0092s discretion) be substituted and the <Product> supplied instead (inverse of code 46). Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "48": {
      "value": "Is linked product offer",
      "description": "Purchases of <RelatedProduct> may qualify for one or more copies of <Product> either free of charge or at a reduced price (inverse of code 45). This may be dependent on retailer participation, upon price and upon the quantity of the <RelatedProduct> purchased. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    }
  },
  "53": {
    "00": {
      "value": "Proprietary",
      "description": "As specified in <ReturnsCodeTypeName>. Only for use in ONIX 3.0 or later",
      "a": 11,
      "b": null,
      "c": null
    },
    "01": {
      "value": "French book trade returns conditions code",
      "description": "Maintained by CLIL (Commission Interprofessionnel du Livre). Returns conditions values in <ReturnsCode> should be taken from the CLIL list",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "BISAC Returnable Indicator code",
      "description": "Maintained by BISAC: Returns conditions values in <ReturnsCode> should be taken from List 66",
      "a": 1,
      "b": null,
      "c": null
    },
    "03": {
      "value": "UK book trade returns conditions code",
      "description": "NOT CURRENTLY USED \u0096 BIC has decided that it will not maintain a code list for this purpose, since returns conditions are usually at least partly based on the trading relationship",
      "a": 6,
      "b": null,
      "c": null
    },
    "04": {
      "value": "ONIX Returns conditions code",
      "description": "Returns conditions values in <ReturnsCode> should be taken from List 204",
      "a": 19,
      "b": null,
      "c": null
    }
  },
  "55": {
    "00": {
      "value": "YYYYMMDD",
      "description": "Common Era year, month and day (default for most dates)",
      "a": 0,
      "b": 41.0,
      "c": null
    },
    "01": {
      "value": "YYYYMM",
      "description": "Year and month",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "YYYYWW",
      "description": "Year and week number",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "YYYYQ",
      "description": "Year and quarter (Q = 1, 2, 3, 4, with 1 = Jan to Mar)",
      "a": 0,
      "b": null,
      "c": null
    },
    "04": {
      "value": "YYYYS",
      "description": "Year and season (S = 1, 2, 3, 4, with 1 = \u0091Spring\u0092)",
      "a": 1,
      "b": null,
      "c": null
    },
    "05": {
      "value": "YYYY",
      "description": "Year (default for some dates)",
      "a": 1,
      "b": null,
      "c": null
    },
    "06": {
      "value": "YYYYMMDDYYYYMMDD",
      "description": "Spread of exact dates",
      "a": 1,
      "b": null,
      "c": null
    },
    "07": {
      "value": "YYYYMMYYYYMM",
      "description": "Spread of months",
      "a": 1,
      "b": null,
      "c": null
    },
    "08": {
      "value": "YYYYWWYYYYWW",
      "description": "Spread of week numbers",
      "a": 1,
      "b": null,
      "c": null
    },
    "09": {
      "value": "YYYYQYYYYQ",
      "description": "Spread of quarters",
      "a": 1,
      "b": null,
      "c": null
    },
    "10": {
      "value": "YYYYSYYYYS",
      "description": "Spread of seasons",
      "a": 1,
      "b": null,
      "c": null
    },
    "11": {
      "value": "YYYYYYYY",
      "description": "Spread of years",
      "a": 1,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Text string",
      "description": "For complex, approximate or uncertain dates, or dates BCE. Suggested maximum length 100 characters",
      "a": 1,
      "b": 62.0,
      "c": null
    },
    "13": {
      "value": "YYYYMMDDThhmm",
      "description": "Exact time. Use ONLY when exact times with hour/minute precision are relevant. By default, time is local. Alternatively, the time may be suffixed with an optional \u0091Z\u0092 for UTC times, or with \u0091+\u0092 or \u0091-\u0092 and an hhmm timezone offset from UTC. Times without a timezone are \u0091rolling\u0092 local times, times qualified with a timezone (using Z, + or -) specify a particular instant in time",
      "a": 17,
      "b": 18.0,
      "c": null
    },
    "14": {
      "value": "YYYYMMDDThhmmss",
      "description": "Exact time. Use ONLY when exact times with second precision are relevant. By default, time is local. Alternatively, the time may be suffixed with an optional \u0091Z\u0092 for UTC times, or with \u0091+\u0092 or \u0091-\u0092 and an hhmm timezone offset from UTC. Times without a timezone are \u0091rolling\u0092 local times, times qualified with a timezone (using Z, + or -) specify a particular instant in time",
      "a": 17,
      "b": 18.0,
      "c": null
    },
    "20": {
      "value": "YYYYMMDD (H)",
      "description": "Year month day (Hijri calendar)",
      "a": 13,
      "b": null,
      "c": null
    },
    "21": {
      "value": "YYYYMM (H)",
      "description": "Year and month (Hijri calendar)",
      "a": 13,
      "b": null,
      "c": null
    },
    "25": {
      "value": "YYYY (H)",
      "description": "Year (Hijri calendar)",
      "a": 13,
      "b": null,
      "c": null
    },
    "32": {
      "value": "Text string (H)",
      "description": "For complex, approximate or uncertain dates (Hijri calendar), text would usually be in Arabic script. Suggested maximum length 100 characters",
      "a": 13,
      "b": null,
      "c": null
    }
  },
  "57": {
    "01": {
      "value": "Free of charge",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Price to be announced",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Not sold separately",
      "description": "Not sold separately at retail",
      "a": 1,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Contact supplier",
      "description": "May be used for books that do not carry a recommended retail price; when goods can only be ordered \u0091in person\u0092 from a sales representative; when an ONIX file is \u0091broadcast\u0092 rather than sent one-to-one to a single trading partner; or for digital products offered on subscription or with pricing which is too complex to specify in ONIX",
      "a": 4,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Not sold as set",
      "description": "When a collection that is not sold as a set nevertheless has its own ONIX record",
      "a": 10,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Revenue share",
      "description": "Unpriced, but available via a pre-determined revenue share agreement",
      "a": 30,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Calculated from contents",
      "description": "Price calculated as sum of individual prices of components listed as Product parts. Only for use in ONIX 3.0 or later",
      "a": 52,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Supplier does not supply",
      "description": "The supplier does not operate, or does not offer this product, in this part of the market as indicated by <territory>. Use when other prices apply in different parts of the market (eg when the market is global, but the particular supplier does not operate outside its domestic territory). Use code 04 when the supplier does supply but has not set a price for part of the market. Only for use in ONIX 3.0 or later",
      "a": 56,
      "b": null,
      "c": null
    }
  },
  "58": {
    "01": {
      "value": "RRP excluding tax",
      "description": "Recommended Retail Price, excluding any sales tax or value-added tax. Price recommended by the publisher or supplier for retail sales to the consumer. Also termed the Suggested Retail Price (SRP) or Maximum Suggested Retail Price (MSRP) in some countries. The retailer may choose to use this recommended price, or may choose to sell to the consumer at a lower (or occasionally, a higher) price which is termed the Actual Selling Price (ASP) in sales reports. The net price charged to the retailer depends on the RRP minus a trade discount (which may be customer-specific). Relevant tax detail must be calculated by the data recipient",
      "a": 0,
      "b": 45.0,
      "c": null
    },
    "02": {
      "value": "RRP including tax",
      "description": "Recommended Retail Price, including sales or value-added tax where applicable. The net price charged to the retailer depends on the trade discount. Sales or value-added tax detail is usually supplied in the <Tax> composite",
      "a": 0,
      "b": 45.0,
      "c": null
    },
    "03": {
      "value": "FRP excluding tax",
      "description": "Fixed Retail Price, excluding any sales or value-added tax, used in countries where retail price maintenullce applies (by law or via trade agreement) to certain products. Price fixed by the publisher or supplier for retail sales to the consumer. The retailer must use this price, or may vary the price only within certain legally-prescribed limits. The net price charged to the retailer depends on the FRP minus a customer-specific trade discount. Relevant tax detail must be calculated by the data recipient",
      "a": 0,
      "b": 57.0,
      "c": null
    },
    "04": {
      "value": "FRP including tax",
      "description": "Fixed Retail Price, including any sales or value-added tax where applicable, used in countries where retail price maintenullce applies (by law or via trade agreement) to certain products. The net price charged to the retailer depends on the trade discount. Sales or value-added tax detail is usually supplied in the <Tax> composite",
      "a": 0,
      "b": 57.0,
      "c": null
    },
    "05": {
      "value": "Supplier\u0092s Net price excluding tax",
      "description": "Net or wholesale price, excluding any sales or value-added tax. Unit price charged by supplier for business-to-business transactions, without any direct relationship to the price for retail sales to the consumer, but sometimes subject to a further customer-specific trade discount based on volume. Relevant tax detail must be calculated by the data recipient",
      "a": 0,
      "b": 45.0,
      "c": null
    },
    "06": {
      "value": "Supplier\u0092s Net price excluding tax: rental goods",
      "description": "Unit price charged by supplier to reseller / rental outlet, excluding any sales tax or value-added tax: goods for rental (used for video and DVD)",
      "a": 0,
      "b": 8.0,
      "c": null
    },
    "07": {
      "value": "Supplier\u0092s Net price including tax",
      "description": "Net or wholesale price, including any sales or value-added tax where applicable. Unit price charged by supplier for business-to-business transactions, without any direct relationship to the price for retail sales to the consumer, but sometimes subject to a further customer-specific trade discount based on volume. Sales or value-added tax detail is usually supplied in the <Tax> composite",
      "a": 8,
      "b": 45.0,
      "c": null
    },
    "08": {
      "value": "Supplier\u0092s alternative Net price excluding tax",
      "description": "Net or wholesale price charged by supplier to a specified class of reseller, excluding any sales tax or value-added tax. Relevant tax detail must be calculated by the data recipient. (This value is for use only in countries, eg Finland, where trade practice requires two different Net prices to be listed for different classes of resellers, and where national guidelines specify how the code should be used)",
      "a": 8,
      "b": 45.0,
      "c": null
    },
    "09": {
      "value": "Supplier\u0092s alternative net price including tax",
      "description": "Net or wholesale price charged by supplier to a specified class of reseller, including any sales tax or value-added tax. Sales or value-added tax detail is usually supplied in the <Tax> composite. (This value is for use only in countries, eg Finland, where trade practice requires two different Net prices to be listed for different classes of resellers, and where national guidelines specify how the code should be used)",
      "a": 8,
      "b": 45.0,
      "c": null
    },
    "11": {
      "value": "Special sale RRP excluding tax",
      "description": "Special sale RRP excluding any sales tax or value-added tax. Note \u0091special sales\u0092 are sales where terms and conditions are different from normal trade sales, when for example products that are normally sold on a sale-or-return basis are sold on firm-sale terms, where a particular product is tailored for a specific retail outlet (often termed a \u0091premium\u0092 product), or where other specific conditions or qualiifications apply. Further details of the modified terms and conditions should be given in <PriceTypeDescription>",
      "a": 0,
      "b": 15.0,
      "c": null
    },
    "12": {
      "value": "Special sale RRP including tax",
      "description": "Special sale RRP including sales or value-added tax if applicable",
      "a": 0,
      "b": 8.0,
      "c": null
    },
    "13": {
      "value": "Special sale fixed retail price excluding tax",
      "description": "In countries where retail price maintenullce applies by law to certain products: not used in USA",
      "a": 0,
      "b": 8.0,
      "c": null
    },
    "14": {
      "value": "Special sale fixed retail price including tax",
      "description": "In countries where retail price maintenullce applies by law to certain products: not used in USA",
      "a": 0,
      "b": 8.0,
      "c": null
    },
    "15": {
      "value": "Supplier\u0092s net price for special sale excluding tax",
      "description": "Unit price charged by supplier to reseller for special sale excluding any sales tax or value-added tax",
      "a": 0,
      "b": 8.0,
      "c": null
    },
    "17": {
      "value": "Supplier\u0092s net price for special sale including tax",
      "description": "Unit price charged by supplier to reseller for special sale including any sales tax or value-added tax",
      "a": 15,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Pre-publication RRP excluding tax",
      "description": "Pre-publication RRP excluding any sales tax or value-added tax. Use where RRP for pre-orders is different from post-publication RRP",
      "a": 0,
      "b": 8.0,
      "c": null
    },
    "22": {
      "value": "Pre-publication RRP including tax",
      "description": "Pre-publication RRP including sales or value-added tax if applicable. Use where RRP for pre-orders is different from post-publication RRP",
      "a": 0,
      "b": 8.0,
      "c": null
    },
    "23": {
      "value": "Pre-publication fixed retail price excluding tax",
      "description": "In countries where retail price maintenullce applies by law to certain products: not used in USA",
      "a": 0,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Pre-publication fixed retail price including tax",
      "description": "In countries where retail price maintenullce applies by law to certain products: not used in USA",
      "a": 0,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Supplier\u0092s pre-publication net price excluding tax",
      "description": "Unit price charged by supplier to reseller pre-publication excluding any sales tax or value-added tax",
      "a": 0,
      "b": 8.0,
      "c": null
    },
    "27": {
      "value": "Supplier\u0092s pre-publication net price including tax",
      "description": "Unit price charged by supplier to reseller pre-publication including any sales tax or value-added tax",
      "a": 15,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Freight-pass-through RRP excluding tax",
      "description": "In the US, books are sometimes supplied on \u0091freight-pass-through\u0092 terms, where a price that is different from the RRP is used as the basis for calculating the supplier\u0092s charge to a reseller. To make it clear when such terms are being invoked, code 31 is used instead of code 01 to indicate the RRP. Code 32 is used for the \u0091billing price\u0092",
      "a": 3,
      "b": null,
      "c": null
    },
    "32": {
      "value": "Freight-pass-through billing price excluding tax",
      "description": "When freight-pass-through terms apply, the price on which the supplier\u0092s charge to a reseller is calculated, ie the price to which trade discount terms are applied. See also code 31",
      "a": 3,
      "b": null,
      "c": null
    },
    "33": {
      "value": "Importer\u0092s Fixed retail price excluding tax",
      "description": "In countries where retail price maintenullce applies by law to certain products, but the price is set by the importer or local sales agent, not the foreign publisher. In France, \u0091prix catalogue \u00e9diteur \u00e9tranger\u0092",
      "a": 28,
      "b": null,
      "c": null
    },
    "34": {
      "value": "Importer\u0092s Fixed retail price including tax",
      "description": "In countries where retail price maintenullce applies by law to certain products, but the price is set by the importer or local sales agent, not the foreign publisher. In France, \u0091prix catalogue \u00e9diteur \u00e9tranger\u0092",
      "a": 28,
      "b": null,
      "c": null
    },
    "35": {
      "value": "Nominal gratis copy value for customs purposes, excluding tax",
      "description": "Nominal value of gratis copies (eg review, sample or evaluation copies) for international customs declarations only, when a \u0091free of charge\u0092 price cannot be used. Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    },
    "36": {
      "value": "Nominal value for claims purposes, excluding tax",
      "description": "Nominal value of copies for claims purposes only (eg to account for copies lost during distribution). Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "37": {
      "value": "Nominal value for customs purposes, excluding tax",
      "description": "Nominal value of copies (Declared Unit Value) for international customs declarations only. Only for use in ONIX 3.0 or later",
      "a": 65,
      "b": null,
      "c": null
    },
    "41": {
      "value": "Publishers retail price excluding tax",
      "description": "For a product supplied on agency terms, the retail price set by the publisher, excluding any sales tax or value-added tax",
      "a": 11,
      "b": null,
      "c": null
    },
    "42": {
      "value": "Publishers retail price including tax",
      "description": "For a product supplied on agency terms, the retail price set by the publisher, including sales or value-added tax if applicable",
      "a": 11,
      "b": null,
      "c": null
    }
  },
  "59": {
    "00": {
      "value": "Unqualified price",
      "description": "Price applies to all customers that do not fall within any other group with a specified group-specific qualified price",
      "a": 20,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Member/subscriber price",
      "description": "Price applies to a designated group membership",
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Export price",
      "description": "Price applies to sales outside the territory in which the supplier is located",
      "a": 0,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Reduced price applicable when the item is purchased as part of a set (or series, or collection)",
      "description": "Use in cases where there is no combined price, but a lower price is offered for each part if the whole set / series / collection is purchased (either at one time, as part of a continuing commitment, or in a single purchase)",
      "a": 0,
      "b": 13.0,
      "c": null
    },
    "04": {
      "value": "Voucher price",
      "description": "In the Netherlands (or any other market where similar arrangements exist): a reduced fixed price available for a limited time on presentation of a voucher or coupon published in a specified medium, eg a newspaper. Should be accompanied by Price Type code 13 and additional detail in <PriceTypeDescription>, and by validity dates in <PriceEffectiveFrom> and <PriceEffectiveUntil> (ONIX 2.1) or in the <PriceDate> composite (ONIX 3.0 or later)",
      "a": 2,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Consumer price",
      "description": "Price for individual consumer sale only",
      "a": 11,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Corporate / Library / Education price",
      "description": "Price for sale to libraries or other corporate or institutional customers",
      "a": 11,
      "b": 29.0,
      "c": null
    },
    "07": {
      "value": "Reservation order price",
      "description": "Price valid for a specified period prior to publication. Orders placed prior to the end of the period are guaranteed to be delivered to the retailer before the nominal publication date. The price may or may not be different from the \u0091normal\u0092 price, which carries no such delivery guarantee. Must be accompanied by a <PriceEffectiveUntil> date (or equivalent <PriceDate> composite in ONIX 3.0 or later), and should also be accompanied by a \u0091normal\u0092 price",
      "a": 13,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Promotional offer price",
      "description": "Temporary \u0091Special offer\u0092 price. Must be accompanied by <PriceEffectiveFrom> and <PriceEffectiveUntil> dates (or equivalent <PriceDate> composites in ONIX 3.0 or later), and may also be accompanied by a \u0091normal\u0092 price",
      "a": 15,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Linked price",
      "description": "Price requires purchase with, or proof of ownership of another product. Further details of purchase or ownership requirements must be given in <PriceTypeDescription>",
      "a": 21,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Library price",
      "description": "Price for sale only to libraries (including public, school and academic libraries)",
      "a": 29,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Education price",
      "description": "Price for sale only to educational institutions (including school and academic libraries), educational buying consortia, government and local government bodies purchasing for use in education",
      "a": 29,
      "b": 32.0,
      "c": null
    },
    "12": {
      "value": "Corporate price",
      "description": "Price for sale to corporate customers only",
      "a": 29,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Subscription service price",
      "description": "Price for sale to organizations or services offering consumers subscription access to a library of books",
      "a": 29,
      "b": null,
      "c": null
    },
    "14": {
      "value": "School library price",
      "description": "Price for primary and secondary education",
      "a": 30,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Academic library price",
      "description": "Price for higher education and scholarly institutions",
      "a": 30,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Public library price",
      "description": null,
      "a": 30,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Introductory price",
      "description": "Initial \u0091Introductory offer\u0092 price. Must be accompanied by an Effective until date in a <PriceDate> composite in ONIX 3, and may also be accompanied by a \u0091normal\u0092 price valid after the introductory offer expires (Fr. Prix de lancement). Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Consortial price",
      "description": "Price for library consortia. Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Education price for alternative provision",
      "description": "(fr: \u00ab\u00a0prix pour l\u0092education specialis\u00e9e\u00a0\u00bb) Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    }
  },
  "60": {
    "00": {
      "value": "Per copy of whole product",
      "description": "Default. Note where the product is a pack of multiple copies, the price is per multi-item product, not per individual copy within the pack",
      "a": 0,
      "b": 60.0,
      "c": null
    },
    "01": {
      "value": "Per page for printed loose-leaf content only",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    }
  },
  "61": {
    "00": {
      "value": "Unspecified",
      "description": "Default",
      "a": 0,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Provisional",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Confirmed",
      "description": null,
      "a": 0,
      "b": 57.0,
      "c": null
    }
  },
  "62": {
    "H": {
      "value": "Higher rate",
      "description": "Specifies that tax is applied at a higher rate than standard",
      "a": 5,
      "b": null,
      "c": null
    },
    "P": {
      "value": "Tax paid at source (Italy)",
      "description": "Under Italian tax rules, VAT on books may be paid at source by the publisher, and subsequent transactions through the supply chain are tax-exempt",
      "a": 7,
      "b": null,
      "c": null
    },
    "R": {
      "value": "Lower rate",
      "description": "Specifies that tax is applied at a lower rate than standard. In the EU, use code R for \u0091Reduced rates\u0092, and for rates lower than 5%, use code T (\u0091Super-reduced\u0092) or Z (Zero-rated)",
      "a": 0,
      "b": 42.0,
      "c": null
    },
    "S": {
      "value": "Standard rate",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "T": {
      "value": "Super-low rate",
      "description": "Specifies that tax is applied at a rate lower than the Lower rate(s). In the EU, use code T for \u0091Super-reduced rates\u0092, and for Reduced rates (5% or above) use code R (Lower rate). Only for use in ONIX 3.0 or later",
      "a": 42,
      "b": null,
      "c": null
    },
    "Z": {
      "value": "Zero-rated",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    }
  },
  "64": {
    "00": {
      "value": "Unspecified",
      "description": "Status is not specified (as distinct from unknown): the default if the <PublishingStatus> element is not sent. Also to be used in applications where the element is considered mandatory, but the sender of the ONIX message chooses not to pass on status information",
      "a": 2,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Cancelled",
      "description": "The product was announced, and subsequently abandoned; the <PublicationDate> element in ONIX 2.1 or its equivalent in <PublishingDate> in ONIX 3.0 or later must not be sent",
      "a": 2,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Forthcoming",
      "description": "Not yet published; must be accompanied by the expected date in <PublicationDate> in ONIX 2.1, or its equivalent in the <PublishingDate> composite in ONIX 3.0 or later",
      "a": 2,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Postponed indefinitely",
      "description": "The product was announced, and subsequently postponed with no expected publication date; the <PublicationDate> element in ONIX 2.1, or its equivalent as a <PublishingDate> composite in ONIX 3.0 or later, must not be sent",
      "a": 2,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Active",
      "description": "The product was published, and is still active in the sense that the publisher will accept orders for it, though it may or may not be immediately available, for which see <SupplyDetail>",
      "a": 2,
      "b": null,
      "c": null
    },
    "05": {
      "value": "No longer our product",
      "description": "Ownership of the product has been transferred to another publisher (with details of acquiring publisher if possible in PR.19 (ONIX 2.1) OR P.19 (ONIX 3.0 or later))",
      "a": 2,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Out of stock indefinitely",
      "description": "The product was active, but is now inactive in the sense that (a) the publisher cannot fulfill orders for it, though stock may still be available elsewhere in the supply chain, and (b) there are no current plans to bring it back into stock. Use this code for \u0091reprint under consideration\u0092. Code 06 does not specifically imply that returns are or are not still accepted",
      "a": 2,
      "b": 9.0,
      "c": null
    },
    "07": {
      "value": "Out of print",
      "description": "The product was active, but is now permanently inactive in the sense that (a) the publisher will not accept orders for it, though stock may still be available elsewhere in the supply chain, and (b) the product will not be made available again under the same ISBN. Code 07 normally implies that the publisher will not accept returns beyond a specified date",
      "a": 2,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Inactive",
      "description": "The product was active, but is now permanently or indefinitely inactive in the sense that the publisher will not accept orders for it, though stock may still be available elsewhere in the supply chain. Code 08 covers both of codes 06 and 07, and may be used where the distinction between those values is either unnecessary or meaningless",
      "a": 2,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Unknown",
      "description": "The sender of the ONIX record does not know the current publishing status",
      "a": 2,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Remaindered",
      "description": "The product is no longer available from the current publisher, under the current ISBN, at the current price. It may be available to be traded through another channel. A Publishing Status code 10 \u0091Remaindered\u0092 usually but not always means that the publisher has decided to sell off excess inventory of the book. Copies of books that are remaindered are often made available in the supply chain at a reduced price. However, such remainders are often sold under a product identifier that differs from the ISBN on the full-priced copy of the book. A Publishing Status code 10 \u0091Remaindered\u0092 on a given product record may or may not be followed by a Publishing Status code 06 \u0091Out of Stock Indefinitely\u0092 or 07 \u0091Out of Print\u0092: the practise varies from one publisher to another. Some publishers may revert to a Publishing Status code 04 \u0091Active\u0092 if a desired inventory level on the product in question has subsequently been reached. No change in rights should ever be inferred from this (or any other) Publishing Status code value",
      "a": 3,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Withdrawn from sale",
      "description": "Withdrawn, typically for legal reasons or to avoid giving offence",
      "a": 9,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Recalled",
      "description": "Recalled for reasons of consumer safety. Deprecated, use code 15 instead",
      "a": 9,
      "b": 15.0,
      "c": 15.0
    },
    "13": {
      "value": "Active, but not sold separately",
      "description": "The product is published and active but, as a publishing decision, its constituent parts are not sold separately \u0096 only in an assembly or as part of a pack, eg with Product composition code 01. Also use with Product composition codes 30, 31 where depending on product composition and pricing, items in the pack may or may not be saleable separately at retail",
      "a": 36,
      "b": 58.0,
      "c": null
    },
    "15": {
      "value": "Recalled",
      "description": "Recalled for reasons of consumer safety",
      "a": 15,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Temporarily withdrawn from sale",
      "description": "Withdrawn temporarily, typically for quality or technical reasons. In ONIX 3.0 or later, must be accompanied by expected availability date coded \u009122\u0092 within the <PublishingDate> composite, except in exceptional circumstances where no date is known",
      "a": 15,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Permanently withdrawn from sale",
      "description": "Withdrawn permanently from sale in all markets. Effectively synonymous with \u0091Out of print\u0092 (code 07), but specific to downloadable and online digital products (where no \u0091stock\u0092 would remain in the supply chain)",
      "a": 21,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Active, but not sold as set",
      "description": "The various constituent parts of a product are published and active but, as a publishing decision, they are not sold together as a single product \u0096 eg with Product composition code 11 \u0096 and are only available as a number of individual items. Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    }
  },
  "65": {
    "01": {
      "value": "Cancelled",
      "description": "Product was announced, and subsequently abandoned by the publisher. No expected availability date should be included in <SupplyDate>",
      "a": 2,
      "b": 47.0,
      "c": null
    },
    "09": {
      "value": "Not yet available, postponed indefinitely",
      "description": "Product is not yet available from the supplier, and the publisher indicates that it has been postponed indefinitely. Should be used in preference to code 10 where the publisher has indicated that a previously-announced publication date is no longer correct, and no new date has yet been announced. No expected avalabilty date should be included in <SupplyDate>. Only for use in ONIX 3.0 or later",
      "a": 37,
      "b": 67.0,
      "c": null
    },
    "10": {
      "value": "Not yet available",
      "description": "Product is not yet available (requires expected date, either as <ExpectedShipDate> (ONIX 2.1) or as <SupplyDate> with <SupplyDateRole> coded \u009108\u0092 (ONIX 3.0 or later), except in exceptional circumstances where no date is known)",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "11": {
      "value": "Awaiting stock",
      "description": "Product is not yet available, but will be a stock item when available (requires expected date, either as <ExpectedShipDate> (ONIX 2.1) or as <SupplyDate> with <SupplyDateRole> coded \u009108\u0092 (ONIX 3.0 or later), except in exceptional circumstances where no date is known). Used particularly for imports which have been published in the country of origin but have not yet arrived in the importing country",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "12": {
      "value": "Not yet available, will be POD",
      "description": "Product is not yet available, to be published as print-on-demand only (requires expected date, either as <ExpectedShipDate> (ONIX 2.1) or as <SupplyDate> with <SupplyDateRole> coded \u009108\u0092 (ONIX 3.0 or later), except in exceptional circumstances where no date is known). May apply either to a POD successor to an existing conventional edition, when the successor will be published under a different ISBN (normally because different trade terms apply); or to a title that is being published as a POD original",
      "a": 5,
      "b": 67.0,
      "c": null
    },
    "20": {
      "value": "Available",
      "description": "Product is available from the supplier (form of availability unspecified)",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "21": {
      "value": "In stock",
      "description": "Product is available from the supplier as a stock item",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "22": {
      "value": "To order",
      "description": "Product is available from the supplier as a non-stock item, by special order. Where possible, an <OrderTime> should be included",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "23": {
      "value": "POD",
      "description": "Product is available from the supplier by print-on-demand. If the fulfillment delay is likely to be more than 24 hours, an <OrderTime> should be included",
      "a": 2,
      "b": 47.0,
      "c": null
    },
    "30": {
      "value": "Temporarily unavailable",
      "description": "Product is temporarily unavailable: temporarily unavailable from the supplier (reason unspecified) (requires expected date, either as <ExpectedShipDate> (ONIX 2.1) or as <SupplyDate> with <SupplyDateRole> coded \u009108\u0092 (ONIX 3.0 or later), except in exceptional circumstances where no date is known)",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "31": {
      "value": "Out of stock",
      "description": "Product is stock item, but is temporarily out of stock (requires expected date, either as <ExpectedShipDate> (ONIX 2.1) or as <SupplyDate> with <SupplyDateRole> coded \u009108\u0092 (ONIX 3.0 or later), except in exceptional circumstances where no date is known)",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "32": {
      "value": "Reprinting",
      "description": "Product is temporarily unavailable, and is reprinting (requires expected date, either as <ExpectedShipDate> (ONIX 2.1) or as <SupplyDate> with <SupplyDateRole> coded \u009108\u0092 (ONIX 3.0 or later), except in exceptional circumstances where no date is known)",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "33": {
      "value": "Awaiting reissue",
      "description": "Product is temporarily unavailable, awaiting reissue (requires expected date, either as <ExpectedShipDate> (ONIX 2.1) or as <SupplyDate> with <SupplyDateRole> coded \u009108\u0092 (ONIX 3.0 or later), except in exceptional circumstances where no date is known)",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "34": {
      "value": "Temporarily withdrawn from sale",
      "description": "Product is temporarily withdrawn from sale, possibly for quality or technical reasons. Requires expected availability date, either as <ExpectedShipDate> (ONIX 2.1) or as <SupplyDate> with <SupplyDateRole> coded \u009108\u0092 (ONIX 3.0 or later), except in exceptional circumstances where no date is known",
      "a": 15,
      "b": 67.0,
      "c": null
    },
    "40": {
      "value": "Not available (reason unspecified)",
      "description": "Product is not available from the supplier (for any reason)",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "41": {
      "value": "Not available, replaced by new product",
      "description": "Product is unavailable, but a successor product or edition is or will be available from the supplier (identify successor in <RelatedProduct>)",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "42": {
      "value": "Not available, other format available",
      "description": "Product is unavailable, but the same content is or will be available from the supplier in an alternative format (identify other format product in <RelatedProduct>)",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "43": {
      "value": "No longer supplied by the supplier",
      "description": "Product is no longer available from the supplier. Identify new supplier in <NewSupplier> if possible",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "44": {
      "value": "Apply direct",
      "description": "Product is not available to trade, apply direct to publisher",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "45": {
      "value": "Not sold separately",
      "description": "Product must be bought as part of a set or trade pack (identify set or pack in <RelatedProduct> using code 02). Individual copies of the product are not available from the supplier, but packs of copies are available, and individual copies of the product may typically be sold at retail",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "46": {
      "value": "Withdrawn from sale",
      "description": "Product is withdrawn from sale, possibly permanently. May be for legal reasons or to avoid giving offence",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "47": {
      "value": "Remaindered",
      "description": "Product has been remaindered and is no longer available from the supplier in the normal way, but may be available under different terms and conditions in order to dispose of excess stock",
      "a": 2,
      "b": 67.0,
      "c": null
    },
    "48": {
      "value": "Not available, replaced by POD",
      "description": "Product is out of print, but a print-on-demand edition is or will be available under a different ISBN. Use only when the POD successor has a different ISBN, normally because different trade terms apply",
      "a": 5,
      "b": 67.0,
      "c": null
    },
    "49": {
      "value": "Recalled",
      "description": "Product has been recalled, possibly for reasons of consumer safety",
      "a": 9,
      "b": 67.0,
      "c": null
    },
    "50": {
      "value": "Not sold as set",
      "description": "Contents of set or pack must be bought as individual items (identify contents of set or oack in <RelatedProduct> using code 01). Used when a collection that is not sold as a set nevertheless has its own ONIX record",
      "a": 10,
      "b": 67.0,
      "c": null
    },
    "51": {
      "value": "Not available, publisher indicates OP",
      "description": "Product is unavailable from the supplier, no successor product or alternative format is available or planned. Use this code only when the publisher has indicated the product is out of print",
      "a": 13,
      "b": 67.0,
      "c": null
    },
    "52": {
      "value": "Not available, publisher no longer sells product in this market",
      "description": "Product is unavailable from the supplier in this market, no successor product or alternative format is available or planned. Use this code when a publisher has indicated the product is permanently unavailable (in this market) while remaining available elsewhere",
      "a": 13,
      "b": 67.0,
      "c": null
    },
    "97": {
      "value": "No recent update received",
      "description": "Sender has not received any recent update for this product from the publisher or supplier (for use when the sender is a data aggregator). The definition of \u0091recent\u0092 must be specified by the aggregator, or by agreement between parties to an exchange",
      "a": 11,
      "b": null,
      "c": null
    },
    "98": {
      "value": "No longer receiving updates",
      "description": "Sender is no longer receiving any updates from the publisher or supplier of this product (for use when the sender is a data aggregator)",
      "a": 9,
      "b": 11.0,
      "c": null
    },
    "99": {
      "value": "Contact supplier",
      "description": "Product availability not known to sender",
      "a": 2,
      "b": 67.0,
      "c": null
    }
  },
  "66": {
    "N": {
      "value": "No, not returnable",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "Y": {
      "value": "Yes, returnable, full copies only",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "S": {
      "value": "Yes, returnable, stripped cover",
      "description": "Note the product barcode should be repeated (with triangular \u0091strippable\u0092 indicator) on cover 2 (inside front cover) to facilitate scanning of returned stripped covers",
      "a": 2,
      "b": 63.0,
      "c": null
    },
    "C": {
      "value": "Conditional",
      "description": "Contact publisher for requirements and/or authorization",
      "a": 2,
      "b": null,
      "c": null
    }
  },
  "68": {
    "00": {
      "value": "Unspecified",
      "description": "Status is not specified (as distinct from unknown): the default if the <MarketPublishingStatus> element is not sent",
      "a": 3,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Cancelled",
      "description": "The product was announced for publication in this market, and subsequently abandoned. A market publication date must not be sent",
      "a": 3,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Forthcoming",
      "description": "Not yet published in this market, should be accompanied by expected local publication date",
      "a": 3,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Postponed indefinitely",
      "description": "The product was announced for publication in this market, and subsequently postponed with no expected local publication date. A market publication date must not be sent",
      "a": 3,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Active",
      "description": "The product was published in this market, and is still active in the sense that the publisher will accept orders for it, though it may or may not be immediately available, for which see <SupplyDetail>",
      "a": 3,
      "b": null,
      "c": null
    },
    "05": {
      "value": "No longer our product",
      "description": "Responsibility for the product in this market has been transferred elsewhere (with details of acquiring publisher representative in this market if possible in PR.25 (in ONIX 2.1) OR P.25 (in ONIX 3.0 or later))",
      "a": 3,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Out of stock indefinitely",
      "description": "The product was active in this market, but is now inactive in the sense that (a) the publisher representative (local publisher or sales agent) cannot fulfill orders for it, though stock may still be available elsewhere in the supply chain, and (b) there are no current plans to bring it back into stock in this market. Code 06 does not specifically imply that returns are or are not still accepted",
      "a": 3,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Out of print",
      "description": "The product was active in this market, but is now permanently inactive in this market in the sense that (a) the publisher representative (local publisher or sales agent) will not accept orders for it, though stock may still be available elsewhere in the supply chain, and (b) the product will not be made available again in this market under the same ISBN. Code 07 normally implies that the publisher will not accept returns beyond a specified date",
      "a": 3,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Inactive",
      "description": "The product was active in this market, but is now permanently or indefinitely inactive in the sense that the publisher representative (local publisher or sales agent) will not accept orders for it, though stock may still be available elsewhere in the supply chain. Code 08 covers both of codes 06 and 07, and may be used where the distinction between those values is either unnecessary or meaningless",
      "a": 3,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Unknown",
      "description": "The sender of the ONIX record does not know the current publishing status in this market",
      "a": 3,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Remaindered",
      "description": "The product is no longer available in this market from the publisher representative (local publisher or sales agent), under the current ISBN, at the current price. It may be available to be traded through another channel, usually at a reduced price",
      "a": 3,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Withdrawn from sale",
      "description": "Withdrawn from sale in this market, typically for legal reasons or to avoid giving offence",
      "a": 3,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Not available in this market",
      "description": "Either no rights are held for the product in this market, or for other reasons the publisher has decided not to make it available in this market",
      "a": 3,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Active, but not sold separately",
      "description": "The product is published and active in this market but, as a publishing decision, its constituent parts are not sold separately \u0096 only in an assembly or as part of a pack, eg with Product composition code 01. Also use with Product composition codes 30, 31 where depending on product composition and pricing, items in the pack may be saleable separately at retail",
      "a": 3,
      "b": 58.0,
      "c": null
    },
    "14": {
      "value": "Active, with market restrictions",
      "description": "The product is published in this market and active, but is not available to all customer types, typically because the market is split between exclusive sales agents for different market segments. In ONIX 2.1, should be accompanied by a free-text statement in <MarketRestrictionDetail> describing the nature of the restriction. In ONIX 3.0 or later, the <SalesRestriction> composite in Group P.24 should be used",
      "a": 3,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Recalled",
      "description": "Recalled in this market for reasons of consumer safety",
      "a": 12,
      "b": 15.0,
      "c": null
    },
    "16": {
      "value": "Temporarily withdrawn from sale",
      "description": "Temporarily withdrawn from sale in this market, typically for quality or technical reasons. In ONIX 3.0 or later, must be accompanied by expected availability date coded \u009122\u0092 within the <MarketDate> composite, except in exceptional circumstances where no date is known",
      "a": 15,
      "b": 46.0,
      "c": null
    },
    "17": {
      "value": "Permanently withdrawn from sale",
      "description": "Withdrawn permanently from sale in this market. Effectively synonymous with \u0091Out of print\u0092 (code 07), but specific to downloadable and online digital products (where no \u0091stock\u0092 would remain in the supply chain). Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Active, but not sold as set",
      "description": "The various constituent parts of a product are published and active in this market but, as a publishing decision, they are not sold together as a single product \u0096 eg with Product composition code 11 \u0096 and are only available as a number of individual items. Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    }
  },
  "69": {
    "05": {
      "value": "Exclusive sales agent",
      "description": "Publisher\u0092s exclusive sales agent in a specified territory",
      "a": 3,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Non-exclusive sales agent",
      "description": "Publisher\u0092s non-exclusive sales agent in a specified territory",
      "a": 3,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Local publisher",
      "description": "Publisher for a specified territory",
      "a": 3,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Sales agent",
      "description": "Publisher\u0092s sales agent in a specific territory. Use only where exclusive / non-exclusive status is not known. Prefer 05 or 06 as appropriate, where possible",
      "a": 7,
      "b": null,
      "c": null
    }
  },
  "70": {
    "01": {
      "value": "Proprietary",
      "description": "As specified in <StockQuantityCodeTypeName>",
      "a": 6,
      "b": null,
      "c": null
    },
    "02": {
      "value": "APA stock quantity code",
      "description": "Code scheme defined by the Australian Publishers Association. Deprecated",
      "a": 6,
      "b": 48.0,
      "c": 48.0
    }
  },
  "71": {
    "00": {
      "value": "Unspecified \u0096 see text",
      "description": "Restriction must be described in <SalesRestrictionDetail> (ONIX 2.1) or <SalesRestrictionNote> (ONIX 3.0 or later)",
      "a": 1,
      "b": 11.0,
      "c": null
    },
    "01": {
      "value": "Retailer exclusive / own brand",
      "description": "Sales rights (or market distribution rights) apply to sales through designated retailer(s), which must be identified or named in an instance of the <SalesOutlet> composite. Use only when it is not possible to assign the more explicit codes 04 or 05",
      "a": 1,
      "b": 49.0,
      "c": null
    },
    "02": {
      "value": "Through office supplies outlets only",
      "description": "Sales rights (or market distribution rights) apply to sales though office supplies channels. Specific outlet(s) may be identified or named in an instance of the <SalesOutlet> composite",
      "a": 1,
      "b": 49.0,
      "c": null
    },
    "03": {
      "value": "Internal publisher use only: do not list",
      "description": "For an ISBN that is assigned for a publisher\u0092s internal purposes",
      "a": 1,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Retailer exclusive",
      "description": "Sales rights (or market distribution rights) apply to sales (under the publisher\u0092s brand / imprint) through the designated retailer(s), which must be identified or named in an instance of the <SalesOutlet> composite",
      "a": 6,
      "b": 49.0,
      "c": null
    },
    "05": {
      "value": "Retailer own brand",
      "description": "Sales rights (or market distribution rights) apply to sales (under the retailer\u0092s own brand / imprint) through the designated retailer(s), which must be identified or named in an instance of the <SalesOutlet> composite",
      "a": 6,
      "b": 49.0,
      "c": null
    },
    "06": {
      "value": "To libraries only",
      "description": "Sales rights (or market distribution rights) apply to supplies to libraries (public and national libraries, libraries in educational institutions)",
      "a": 6,
      "b": 67.0,
      "c": null
    },
    "07": {
      "value": "To schools only",
      "description": "Sales rights (or market distribution rights) apply to supplies to schools (primary and secondary education)",
      "a": 8,
      "b": 67.0,
      "c": null
    },
    "08": {
      "value": "Indiziert",
      "description": "Indexed for the German market \u0096 in Deutschland indiziert",
      "a": 9,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Except to libraries",
      "description": "Sales rights (or market distribution rights) apply to supplies other than to libraries",
      "a": 11,
      "b": 49.0,
      "c": null
    },
    "10": {
      "value": "Through news outlets only",
      "description": "Sales rights (or market distribution rights) apply to sales though news outlet channels (newsstands / newsagents)",
      "a": 14,
      "b": 49.0,
      "c": null
    },
    "11": {
      "value": "Retailer exception",
      "description": "Sales rights (or market distribution rights) apply to sales other than through designated retailer(s), which must be identified or named in the <SalesOutlet> composite",
      "a": 23,
      "b": 49.0,
      "c": null
    },
    "12": {
      "value": "Except to subscription services",
      "description": "Sales rights (or market distribution rights) apply to supplies other than to organizations or services offering consumers subscription access to a catalog of books",
      "a": 29,
      "b": 49.0,
      "c": null
    },
    "13": {
      "value": "To subscription services only",
      "description": "Sales rights (or market distribution rights) apply to supplies to organizations or services offering consumers subscription access to a catalog of books",
      "a": 30,
      "b": 49.0,
      "c": null
    },
    "14": {
      "value": "Except through online retail",
      "description": "Sales rights (or market distribution rights) apply to sales other than through online retail channels",
      "a": 36,
      "b": 49.0,
      "c": null
    },
    "15": {
      "value": "Through online retail only",
      "description": "Sales rights (or market distribution rights) apply to sales through online retail channels",
      "a": 36,
      "b": 49.0,
      "c": null
    },
    "16": {
      "value": "Except to schools",
      "description": "Sales rights (or market distribution rights) apply to supplies other than to schools. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Through Inventoryless POD",
      "description": "POD copies may be manufactured at any time, either to fulfill a customer order immediately or to replace a minimal stockholding (ie near-inventoryless). Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Through Stock Protection POD",
      "description": "POD copies may be manfactured only to fulfill a customer order immediately while out of stock and awaiting delivery of further stock from the supplier. Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Except through POD",
      "description": "Not eligible for POD. Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Except to some subscription services",
      "description": "Sales rights (or market distribution rights) apply to all supplies through retailers, and to the designated subscription services, which must be identified or named in an instance of the <SalesOutlet> composite. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Subscription service exclusive",
      "description": "Sales rights (or market distribution rights) apply to supplies to the designated subscription service(s), which must be identified or named in an instance of the <SalesOutlet> composite. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "22": {
      "value": "To education only",
      "description": "Sales rights (or market distribution rights) apply to supplies to educational institutions only (primary, secondary, tertiary, adult, vocational and professional etc). Only for use in ONIX 3.0 or later",
      "a": 67,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Except to education",
      "description": "Sales rights (or market distribution rights) apply to supplies other than to educational institutions. Only for use in ONIX 3.0 or later",
      "a": 67,
      "b": null,
      "c": null
    },
    "99": {
      "value": "No restrictions on sales",
      "description": "Positive indication that no sales restrictions apply, for example to indicate the product may be sold both online and in bricks-and mortar retail, or to subscription services and non-subscription customers. Only for use in ONIX 3.0 or later",
      "a": 46,
      "b": null,
      "c": null
    }
  },
  "72": {
    "01": {
      "value": "Habilitationsschrift",
      "description": "Professorial dissertation (thesis for postdoctoral lecturing qualification)",
      "a": 1,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Dissertationsschrift",
      "description": "Doctoral thesis",
      "a": 1,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Staatsexamensarbeit",
      "description": "State examination thesis",
      "a": 1,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Magisterarbeit",
      "description": "Magisters degree thesis",
      "a": 1,
      "b": 9.0,
      "c": null
    },
    "05": {
      "value": "Diplomarbeit",
      "description": "Diploma degree thesis",
      "a": 1,
      "b": 9.0,
      "c": null
    },
    "06": {
      "value": "Bachelorarbeit",
      "description": "Bachelors degree thesis",
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Masterarbeit",
      "description": "Masters degree thesis",
      "a": 9,
      "b": null,
      "c": null
    }
  },
  "73": {
    "00": {
      "value": "Unspecified, see website description",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Publisher\u0092s corporate website",
      "description": "See also codes 17 and 18",
      "a": 5,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Publisher\u0092s website for a specified work",
      "description": "A publisher\u0092s informative and/or promotional webpage relating to a specified work (book, journal, online resource or other publication type)",
      "a": 5,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Online hosting service home page",
      "description": "A webpage giving access to an online content hosting service as a whole",
      "a": 5,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Journal home page",
      "description": "A webpage giving general information about a serial, in print or electronic format or both",
      "a": 5,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Online resource \u0091available content\u0092 page",
      "description": "A webpage giving direct access to the content that is available online for a specified resource version. Generally used for content available online under subscription terms",
      "a": 5,
      "b": 14.0,
      "c": null
    },
    "06": {
      "value": "Contributor\u0092s own website",
      "description": "A webpage maintained by an author or other contributor about their publications and personal background",
      "a": 5,
      "b": 66.0,
      "c": null
    },
    "07": {
      "value": "Publisher\u0092s website relating to specified contributor",
      "description": "A publisher\u0092s webpage devoted to a specific author or other contributor",
      "a": 5,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Other publisher\u0092s website relating to specified contributor",
      "description": "A webpage devoted to a specific author or other contributor, and maintained by a publisher other than the publisher of the item described in the ONIX record",
      "a": 5,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Third-party website relating to specified contributor",
      "description": "A webpage devoted to a specific author or other contributor, and maintained by a third party (eg a fan site)",
      "a": 5,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Contributor\u0092s own website for specified work",
      "description": "A webpage maintained by an author or other contributor and specific to an individual work",
      "a": 5,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Other publisher\u0092s website relating to specified work",
      "description": "A webpage devoted to an individual work, and maintained by a publisher other than the publisher of the item described in the ONIX record",
      "a": 5,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Third-party website relating to specified work",
      "description": "A webpage devoted to an individual work, and maintained by a third party (eg a fan site)",
      "a": 5,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Contributor\u0092s own website for group or series of works",
      "description": "A webpage maintained by an author or other contributor and specific to a group or series of works",
      "a": 5,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Publisher\u0092s website relating to group or series of works",
      "description": "A publisher\u0092s webpage devoted to a group or series of works",
      "a": 5,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Other publisher\u0092s website relating to group or series of works",
      "description": "A webpage devoted to a group or series of works, and maintained by a publisher other than the publisher of the item described in the ONIX record",
      "a": 5,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Third-party website relating to group or series of works (eg a fan site)",
      "description": "A webpage devoted to a group or series of works, and maintained by a third party (eg a fan site)",
      "a": 5,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Publisher\u0092s B2B website",
      "description": "Use instead of code 01 to specify a publisher\u0092s website for trade users",
      "a": 5,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Publisher\u0092s B2C website",
      "description": "Use instead of code 01 to specify a publisher\u0092s website for end customers (consumers)",
      "a": 5,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Author blog",
      "description": "For example, a Blogger or Tumblr URL, a Wordpress website or other blog URL",
      "a": 8,
      "b": 16.0,
      "c": null
    },
    "24": {
      "value": "Web page for author presentation / commentary",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Web page for author interview",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Web page for author reading",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Web page for cover material",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Web page for sample content",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Web page for full content",
      "description": "Use this value in the <Website> composite (typically within <Publisher> or <SupplyDetail>) when sending a link to a webpage at which a digital product is available for download and/or online access",
      "a": 8,
      "b": 11.0,
      "c": null
    },
    "30": {
      "value": "Web page for other commentary / discussion",
      "description": "For example a subscribable podcast hosting site, social media message, newsletter issue, other commentary",
      "a": 8,
      "b": 53.0,
      "c": null
    },
    "31": {
      "value": "Transfer-URL",
      "description": "URL needed by the German National Library for direct access, harvesting and storage of an electronic resource",
      "a": 9,
      "b": null,
      "c": null
    },
    "32": {
      "value": "DOI Website Link",
      "description": "Link needed by German Books in Print (VLB) for DOI registration and ONIX DOI conversion",
      "a": 9,
      "b": null,
      "c": null
    },
    "33": {
      "value": "Supplier\u0092s corporate website",
      "description": "A corporate website operated by a distributor or other supplier (not the publisher)",
      "a": 10,
      "b": null,
      "c": null
    },
    "34": {
      "value": "Supplier\u0092s B2B website",
      "description": "A website operated by a distributor or other supplier (not the publisher) and aimed at trade customers",
      "a": 10,
      "b": null,
      "c": null
    },
    "35": {
      "value": "Supplier\u0092s B2C website",
      "description": "A website operated by a distributor or other supplier (not the publisher) and aimed at consumers",
      "a": 10,
      "b": null,
      "c": null
    },
    "36": {
      "value": "Supplier\u0092s website for a specified work",
      "description": "A distributor or supplier\u0092s webpage describing a specified work",
      "a": 10,
      "b": null,
      "c": null
    },
    "37": {
      "value": "Supplier\u0092s B2B website for a specified work",
      "description": "A distributor or supplier\u0092s webpage describing a specified work, and aimed at trade customers",
      "a": 10,
      "b": null,
      "c": null
    },
    "38": {
      "value": "Supplier\u0092s B2C website for a specified work",
      "description": "A distributor or supplier\u0092s webpage describing a specified work, and aimed at consumers",
      "a": 10,
      "b": null,
      "c": null
    },
    "39": {
      "value": "Supplier\u0092s website for a group or series of works",
      "description": "A distributor or supplier\u0092s webpage describing a group or series of works",
      "a": 10,
      "b": null,
      "c": null
    },
    "40": {
      "value": "URL of full metadata description",
      "description": "For example an ONIX or MARC record for the product, available online",
      "a": 14,
      "b": null,
      "c": null
    },
    "41": {
      "value": "Social networking URL for specific work or product",
      "description": "For example, a Facebook, Instagram, Youtube, Pinterest, Tiktok (including Booktok), Twitter (latterly, X) or similar URL for the product or work",
      "a": 16,
      "b": 64.0,
      "c": null
    },
    "42": {
      "value": "Author\u0092s social networking URL",
      "description": "For example, a Facebook, Instagram, Youtube, Pinterest, Tiktok (including Booktok), Twitter (latterly, X) or similar page for the contributor",
      "a": 16,
      "b": 66.0,
      "c": null
    },
    "43": {
      "value": "Publisher\u0092s social networking URL",
      "description": "For example, a Facebook, Instagram, Youtube, Pinterest, Tiktok (including Booktok), Twitter (latterly, X) or similar page",
      "a": 16,
      "b": 64.0,
      "c": null
    },
    "44": {
      "value": "Social networking URL for specific article, chapter or content item",
      "description": "For example, a Facebook, Instagram, Youtube, Pinterest, Tiktok (including Booktok), Twitter (latterly, X) or similar page. Use only in the context of a specific content item (eg within <ContentItem>)",
      "a": 17,
      "b": 64.0,
      "c": null
    },
    "45": {
      "value": "Publisher\u0092s or third party website for permissions requests",
      "description": "For example, a service offering click-through licensing of extracts",
      "a": 29,
      "b": null,
      "c": null
    },
    "46": {
      "value": "Publisher\u0092s or third party website for privacy statement",
      "description": "For example, a page providing details related to GDPR. Only for use in ONIX 3.0 or later",
      "a": 43,
      "b": null,
      "c": null
    },
    "47": {
      "value": "Publisher\u0092s website for digital preservation",
      "description": "The URL of the publisher\u0092s preservation service, or a more specific URL for access to its preservation metadata, to provide confirmation of the preservation status of the product. <WebsiteDescription> may contain the name of the service. Only for use in ONIX 3.0 or later",
      "a": 52,
      "b": 64.0,
      "c": null
    },
    "48": {
      "value": "Third-party website for digital preservation",
      "description": "The URL of the preservation service (eg https://clockss.org), or a more specific URL for access to its preservation metadata, to provide confirmation of the preservation status of the product. <WebsiteDescription> may contain the name of the service. Only for use in ONIX 3.0 or later",
      "a": 52,
      "b": 64.0,
      "c": null
    },
    "49": {
      "value": "Product website for environmental responsibility statement",
      "description": "The URL of a web page describing the environmental and sustainability policy, or carbon neutrality status, that applies to the specific product. Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "50": {
      "value": "Organization\u0092s website for environmental responsibility statement",
      "description": "The URL of a web page describing the environmental and sustainability policies, carbon neutrality status, etc of the organization (publisher, supplier etc). For environmental sustainability of the product itself, see List 79. Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": 64.0,
      "c": null
    },
    "51": {
      "value": "Legal deposit website for digital preservation",
      "description": "The URL of a digital legal deposit service (eg https://www.legaldeposit.org.uk), or a more specific URL for access to its preservation metadata, to provide confirmation of the digital legal deposit status of the product. <WebsiteDescription> may contain the name of the service. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    }
  },
  "74": {
    "abk": {
      "value": "Abkhazian",
      "description": null,
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "ace": {
      "value": "Achinese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ach": {
      "value": "Acoli",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ada": {
      "value": "Adangme",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ady": {
      "value": "Adygei; Adyghe",
      "description": "(West Circassian)",
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "aar": {
      "value": "Afar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "afh": {
      "value": "Afrihili",
      "description": "Artificial language",
      "a": 0,
      "b": null,
      "c": null
    },
    "afr": {
      "value": "Afrikaans",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "afa": {
      "value": "Afro-Asiatic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "ain": {
      "value": "Ainu",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "aka": {
      "value": "Akan",
      "description": "Macrolanguage. See also fat (Fanti), twi (Twi)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "akk": {
      "value": "Akkadian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "alb": {
      "value": "Albanian",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "ale": {
      "value": "Aleut",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "alg": {
      "value": "Algonquian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "alq": {
      "value": "Algonquin",
      "description": "Alginkin. ONIX local code, equivalent to alq in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "tut": {
      "value": "Altaic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "amh": {
      "value": "Amharic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "anp": {
      "value": "Angika",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "apa": {
      "value": "Apache languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "ara": {
      "value": "Arabic",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "arg": {
      "value": "Aragonese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "qar": {
      "value": "Aran\u00e9s",
      "description": "ONIX local code, distinct dialect of Occitan (not distinguished from oci by ISO 639-3)",
      "a": 6,
      "b": 24.0,
      "c": null
    },
    "arp": {
      "value": "Arapaho",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "arw": {
      "value": "Arawak",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "arm": {
      "value": "Armenian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "rup": {
      "value": "Aromanian; Arumanian; Macedo-Romanian",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "art": {
      "value": "Artificial languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "asm": {
      "value": "Assamese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ast": {
      "value": "Asturian; Bable; Leonese; Asturleonese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ath": {
      "value": "Athapascan languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "atj": {
      "value": "Atikamekw",
      "description": "ONIX local code, equivalent to atj in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "aus": {
      "value": "Australian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "aav": {
      "value": "Austro-Asiatic languages",
      "description": "Collective name. ONIX local code, equivalent of aav in ISO 639-5. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "map": {
      "value": "Austronesian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "ava": {
      "value": "Avaric",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ave": {
      "value": "Avestan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "awa": {
      "value": "Awadhi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "aym": {
      "value": "Aymara",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "aze": {
      "value": "Azerbaijani",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "ban": {
      "value": "Balinese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bat": {
      "value": "Baltic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "bal": {
      "value": "Baluchi",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "bam": {
      "value": "Bambara",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bai": {
      "value": "Bamileke languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "bad": {
      "value": "Banda languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "bnt": {
      "value": "Bantu languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "bas": {
      "value": "Basa",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bak": {
      "value": "Bashkir",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "baq": {
      "value": "Basque",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "btk": {
      "value": "Batak languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "bej": {
      "value": "Beja; Bedawiyet",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bel": {
      "value": "Belarusian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bem": {
      "value": "Bemba",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ben": {
      "value": "Bengali",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ber": {
      "value": "Berber languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "bho": {
      "value": "Bhojpuri",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bih": {
      "value": "Bihari languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "bik": {
      "value": "Bikol",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "bin": {
      "value": "Bini; Edo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bis": {
      "value": "Bislama",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "byn": {
      "value": "Blin; Bilin",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "zbl": {
      "value": "Blissymbols; Blissymbolics; Bliss",
      "description": "Artificial language",
      "a": 8,
      "b": null,
      "c": null
    },
    "brx": {
      "value": "Bodo (India)",
      "description": "Boro. ONIX local code, equivalent to brx in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "bos": {
      "value": "Bosnian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bra": {
      "value": "Braj",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bre": {
      "value": "Breton",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bug": {
      "value": "Buginese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bul": {
      "value": "Bulgarian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "bum": {
      "value": "Bulu (Cameroon)",
      "description": "ONIX local code, equivalent to bum in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "bua": {
      "value": "Buriat",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "bur": {
      "value": "Burmese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cad": {
      "value": "Caddo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sro": {
      "value": "Campidanese",
      "description": "ONIX local code for Sardinian dialect, equivalent to sro in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "yue": {
      "value": "Cantonese",
      "description": "ONIX local code, equivalent to yue in ISO 639-3",
      "a": 35,
      "b": null,
      "c": null
    },
    "cat": {
      "value": "Catalan",
      "description": "See also qav (Valencian)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "cau": {
      "value": "Caucasian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "cay": {
      "value": "Cayuga",
      "description": "ONIX local code, equivalent to cay in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "ceb": {
      "value": "Cebuano",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cel": {
      "value": "Celtic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "cai": {
      "value": "Central American Indian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "tzm": {
      "value": "Central Atlas Tamazight",
      "description": "ONIX local code, equivalent to tzm in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 56,
      "b": null,
      "c": null
    },
    "khm": {
      "value": "Central Khmer",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ckb": {
      "value": "Central Kurdish (Sorani)",
      "description": "ONIX local code, equivalent to ckb in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "chg": {
      "value": "Chagatai",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cmc": {
      "value": "Chamic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "cha": {
      "value": "Chamorro",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "che": {
      "value": "Chechen",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "chr": {
      "value": "Cherokee",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "chy": {
      "value": "Cheyenne",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "chb": {
      "value": "Chibcha",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nya": {
      "value": "Chichewa; Chewa; Nyanja",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cic": {
      "value": "Chickasaw",
      "description": "ONIX local code, equivalent to cic in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "chi": {
      "value": "Chinese",
      "description": "Macrolanguage. See also cmn (Mandarin), yue (Cantonese)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "chn": {
      "value": "Chinook jargon",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "chp": {
      "value": "Chipewyan; Dene Suline",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cho": {
      "value": "Choctaw",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "chu": {
      "value": "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "chk": {
      "value": "Chuukese (Truk)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "chv": {
      "value": "Chuvash",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nwc": {
      "value": "Classical Newari; Old Newari; Classical Nepal Bhasa",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "syc": {
      "value": "Classical Syriac",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "cop": {
      "value": "Coptic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cor": {
      "value": "Cornish",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cos": {
      "value": "Corsican",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cre": {
      "value": "Cree",
      "description": "Macrolanguage. See also crj (Southern East Cree), crk (plains Cree), crl (Northern East Cree), crm (Moose Cree), csw (Swampy Cree), cwd (Woods Cree)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "mus": {
      "value": "Creek",
      "description": "Seminole",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "crp": {
      "value": "Creoles and pidgins",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "cpe": {
      "value": "Creoles and pidgins, English-based",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "cpf": {
      "value": "Creoles and pidgins, French-based",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "cpp": {
      "value": "Creoles and pidgins, Portuguese-based",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "crh": {
      "value": "Crimean Turkish; Crimean Tatar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "hrv": {
      "value": "Croatian",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "scr": {
      "value": "Croatian",
      "description": "Deprecated \u0096 use hrv",
      "a": 0,
      "b": 10.0,
      "c": 10.0
    },
    "cus": {
      "value": "Cushitic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "cze": {
      "value": "Czech",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "dak": {
      "value": "Dakota",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "dan": {
      "value": "Danish",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "dar": {
      "value": "Dargwa",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "prs": {
      "value": "Dari; Afghan Persian",
      "description": "ONIX local code, equivalent to prs in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 39,
      "b": null,
      "c": null
    },
    "del": {
      "value": "Delaware",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "din": {
      "value": "Dinka",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "div": {
      "value": "Divehi; Dhivehi; Maldivian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "doi": {
      "value": "Dogri",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "dgr": {
      "value": "Dogrib",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "dra": {
      "value": "Dravidian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "dua": {
      "value": "Duala",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "dum": {
      "value": "Dutch, Middle (ca. 1050-1350)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "dut": {
      "value": "Dutch; Flemish",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "dyu": {
      "value": "Dyula",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "dzo": {
      "value": "Dzongkha",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ike": {
      "value": "Eastern Canadian Inuktitut",
      "description": "ONIX local code, equivalent to ike in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "frs": {
      "value": "Eastern Frisian",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "efi": {
      "value": "Efik",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "egy": {
      "value": "Egyptian (Ancient)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "eka": {
      "value": "Ekajuk",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "elx": {
      "value": "Elamite",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "egl": {
      "value": "Emilian",
      "description": "ONIX local code for Italian dialect, equivalent to egl in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "eng": {
      "value": "English",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "enm": {
      "value": "English, Middle (1100-1500)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ang": {
      "value": "English, Old (ca. 450-1100)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "myv": {
      "value": "Erzya",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "esx": {
      "value": "Eskaleut languages",
      "description": "Inuit-Yupik-Unullgan languages. Collective name. ONIX local code, equivalent of esx in ISO 639-5. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "epo": {
      "value": "Esperanto",
      "description": "Artificial language",
      "a": 0,
      "b": null,
      "c": null
    },
    "est": {
      "value": "Estonian",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "gez": {
      "value": "Ethiopic (Ge\u0092ez)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ewe": {
      "value": "Ewe",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ewo": {
      "value": "Ewondo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fan": {
      "value": "Fang",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fat": {
      "value": "Fanti",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fao": {
      "value": "Faroese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fij": {
      "value": "Fijian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fil": {
      "value": "Filipino; Pilipino",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "fin": {
      "value": "Finnish",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fiu": {
      "value": "Finno-Ugrian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "fon": {
      "value": "Fon",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fre": {
      "value": "French",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "frm": {
      "value": "French, Middle (ca. 1400-1600)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fro": {
      "value": "French, Old (ca. 842-1400)",
      "description": "See also qgl (Gallo)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "fur": {
      "value": "Friulian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ful": {
      "value": "Fulah",
      "description": "Macrolanguage",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "gaa": {
      "value": "G\u00e3",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "car": {
      "value": "Galibi Carib",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "glg": {
      "value": "Galician",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "qgl": {
      "value": "Gallo",
      "description": "ONIX local code, distinct variant of langue d\u0092o\u00efl (old northern French), not distinguished from fro, or from frm, fre, nrf by ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 52,
      "b": null,
      "c": null
    },
    "sdn": {
      "value": "Gallurese",
      "description": "ONIX local code for Sardinian dialect, equivalent to sdn in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "lug": {
      "value": "Ganda",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "grt": {
      "value": "Garo",
      "description": "ONIX local code, equivalent to grt in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 52,
      "b": null,
      "c": null
    },
    "gay": {
      "value": "Gayo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "gba": {
      "value": "Gbaya",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "geo": {
      "value": "Georgian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ger": {
      "value": "German",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "gmh": {
      "value": "German, Middle High (ca. 1050-1500)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "goh": {
      "value": "German, Old High (ca. 750-1050)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "gem": {
      "value": "Germanic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "gil": {
      "value": "Gilbertese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "git": {
      "value": "Gitxsan",
      "description": "ONIX local code, equivalent to git in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "gon": {
      "value": "Gondi",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "gor": {
      "value": "Gorontalo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "got": {
      "value": "Gothic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "grb": {
      "value": "Grebo",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "grc": {
      "value": "Greek, Ancient (to 1453)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "gre": {
      "value": "Greek, Modern (1453-)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "grn": {
      "value": "Guarani",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "nrf": {
      "value": "Guern\u00e9siais, J\u00e8rriais",
      "description": "ONIX local code, equivalent to nrf in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 46,
      "b": null,
      "c": null
    },
    "guj": {
      "value": "Gujarati",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "gwi": {
      "value": "Gwich\u0092in",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "hai": {
      "value": "Haida",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "hat": {
      "value": "Haitian; Haitian Creole",
      "description": null,
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "hau": {
      "value": "Hausa",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "haw": {
      "value": "Hawaiian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "heb": {
      "value": "Hebrew",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "her": {
      "value": "Herero",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "hil": {
      "value": "Hiligaynon",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "him": {
      "value": "Himachali languages; Western Pahari languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "hin": {
      "value": "Hindi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "hmo": {
      "value": "Hiri Motu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "hit": {
      "value": "Hittite",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "hmx": {
      "value": "Hmong-Mien languages",
      "description": "Collective name. ONIX local code, equivalent of hmx in ISO 639-5. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "hmn": {
      "value": "Hmong; Mong",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "hop": {
      "value": "Hopi",
      "description": "ONIX local code, equivalent to hop in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "hun": {
      "value": "Hungarian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "hup": {
      "value": "Hupa",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "iba": {
      "value": "Iban",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ice": {
      "value": "Icelandic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ido": {
      "value": "Ido",
      "description": "Artificial language",
      "a": 0,
      "b": null,
      "c": null
    },
    "ibo": {
      "value": "Igbo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ijo": {
      "value": "Ijo languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "ilo": {
      "value": "Iloko",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "smn": {
      "value": "Inari Sami",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "inc": {
      "value": "Indic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "ine": {
      "value": "Indo-European languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "ind": {
      "value": "Indonesian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "inh": {
      "value": "Ingush",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "moe": {
      "value": "Innu, Montagnais",
      "description": "ONIX local code, equivalent to moe in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "ina": {
      "value": "Interlingua (International Auxiliary Language Association)",
      "description": "Artificial language",
      "a": 0,
      "b": null,
      "c": null
    },
    "ile": {
      "value": "Interlingue; Occidental",
      "description": "Artificial language",
      "a": 0,
      "b": null,
      "c": null
    },
    "ikt": {
      "value": "Inuinnaqtun",
      "description": "Western Canadian Inuktitut. ONIX local code, equivalent to ikt in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "iku": {
      "value": "Inuktitut",
      "description": "Macrolanguage. See also ike (Eastern Canadian Inuktitut), ikt (Inuinnaqtun)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "ipk": {
      "value": "Inupiaq",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "qiv": {
      "value": "Inuvialuktun",
      "description": "ONIX local code, distinct dialect of Inuktitut (not distinguished from iku, ike, ikt by ISO 639-3). Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "ira": {
      "value": "Iranian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "pes": {
      "value": "Iranian Persian; Parsi",
      "description": "ONIX local code, equivalent to pes in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 39,
      "b": null,
      "c": null
    },
    "gle": {
      "value": "Irish",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mga": {
      "value": "Irish, Middle (ca. 1100-1550)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sga": {
      "value": "Irish, Old (to 1100)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "iro": {
      "value": "Iroquoian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "ita": {
      "value": "Italian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "jpn": {
      "value": "Japanese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "jpx": {
      "value": "Japanese languages",
      "description": "Japonic. Collective name. ONIX local code, equivalent of jpx in ISO 639-5. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "jav": {
      "value": "Javanese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "jow": {
      "value": "Jowulu",
      "description": "ONIX local code, equivalent to jow in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    },
    "jrb": {
      "value": "Judeo-Arabic",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "jpr": {
      "value": "Judeo-Persian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kbd": {
      "value": "Kabardian",
      "description": "(East Circassian)",
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "kbp": {
      "value": "Kabiy\u00e8",
      "description": "ONIX local code, equivalent to kbp in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 65,
      "b": null,
      "c": null
    },
    "kab": {
      "value": "Kabyle",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kac": {
      "value": "Kachin; Jingpho",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kal": {
      "value": "Kal\u00e2tdlisut; Greenlandic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "xal": {
      "value": "Kalmyk; Oirat",
      "description": null,
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "kam": {
      "value": "Kamba",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kan": {
      "value": "Kannada",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kau": {
      "value": "Kanuri",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "kaa": {
      "value": "Kara-Kalpak",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "krc": {
      "value": "Karachay-Balkar",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "kdr": {
      "value": "Karaim",
      "description": "ONIX local code, equivalent to kdr in ISO 639-3",
      "a": 32,
      "b": null,
      "c": null
    },
    "krl": {
      "value": "Karelian",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "kar": {
      "value": "Karen languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "kas": {
      "value": "Kashmiri",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "csb": {
      "value": "Kashubian",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "kaw": {
      "value": "Kawi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kaz": {
      "value": "Kazakh",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kha": {
      "value": "Khasi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "khi": {
      "value": "Khoisan languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "kho": {
      "value": "Khotanese; Sakan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "xuu": {
      "value": "Khwedam, Kxoe",
      "description": "ONIX local code, equivalent to xuu in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 42,
      "b": null,
      "c": null
    },
    "kik": {
      "value": "Kikuyu; Gikuyu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kmb": {
      "value": "Kimbundu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kin": {
      "value": "Kinyarwanda",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kir": {
      "value": "Kirghiz; Kyrgyz",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kqs": {
      "value": "Kissi, Northern",
      "description": "Kisi (Guinean language). ONIX local code, equivalent to kqs in ISO 639-3. Only for use in ONIX 3.0 or later. Do not confuse with Kisi (Tanzanian language)",
      "a": 64,
      "b": null,
      "c": null
    },
    "kss": {
      "value": "Kissi, Southern",
      "description": "Kisi (Liberian language). ONIX local code, equivalent to kss in ISO 639-3. Only for use in ONIX 3.0 or later. Do not confuse with Kisi (Tanzanian language)",
      "a": 64,
      "b": null,
      "c": null
    },
    "tlh": {
      "value": "Klingon; tlhIngan-Hol",
      "description": "Artificial language",
      "a": 4,
      "b": null,
      "c": null
    },
    "kom": {
      "value": "Komi",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "kon": {
      "value": "Kongo",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "kok": {
      "value": "Konkani",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "kor": {
      "value": "Korean",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kpe": {
      "value": "Kpelle",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "kro": {
      "value": "Kru languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "kua": {
      "value": "Kuanyama; Kwanyama",
      "description": null,
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "kum": {
      "value": "Kumyk",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kur": {
      "value": "Kurdish",
      "description": "Macrolanguage. See also ckb (Central Kurdish)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "kru": {
      "value": "Kurukh",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kos": {
      "value": "Kusaiean (Caroline Islands)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "kut": {
      "value": "Kutenai",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fkv": {
      "value": "Kvensk",
      "description": "ONIX local code, equivalent to fkv in ISO 639-3",
      "a": 24,
      "b": null,
      "c": null
    },
    "kwk": {
      "value": "Kwakiutl",
      "description": "ONIX local code, equivalent to kwk in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "lad": {
      "value": "Ladino",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lah": {
      "value": "Lahnda",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "lkt": {
      "value": "Lakota",
      "description": "Teton, Teton Sioux. ONIX local code, equivalent to lkt in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "lam": {
      "value": "Lamba",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "day": {
      "value": "Land Dayak languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "lao": {
      "value": "Lao",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lat": {
      "value": "Latin",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lav": {
      "value": "Latvian",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "qlk": {
      "value": "Lemko",
      "description": "ONIX local code, distinct dialect of of Rusyn (not distinguished from rue by ISO 639-3). Only for use in ONIX 3.0 or later",
      "a": 40,
      "b": null,
      "c": null
    },
    "lez": {
      "value": "Lezgian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lij": {
      "value": "Ligurian",
      "description": "ONIX local code for Italian dialect, equivalent to lij in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "lim": {
      "value": "Limbergan; Limburger; Limburgish",
      "description": null,
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "lin": {
      "value": "Lingala",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lit": {
      "value": "Lithuanian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "jbo": {
      "value": "Lojban",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "lmo": {
      "value": "Lombard",
      "description": "ONIX local code for Italian dialect, equivalent to lmo in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "nds": {
      "value": "Low German; Low Saxon",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "dsb": {
      "value": "Lower Sorbian",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "loz": {
      "value": "Lozi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lub": {
      "value": "Luba-Katanga",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lua": {
      "value": "Luba-Lulua",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lui": {
      "value": "Luise\u00f1o",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "smj": {
      "value": "Lule Sami",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lun": {
      "value": "Lunda",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "luo": {
      "value": "Luo (Kenya and Tanzania)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "lus": {
      "value": "Lushai",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ltz": {
      "value": "Luxembourgish; Letzeburgesch",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mac": {
      "value": "Macedonian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mad": {
      "value": "Madurese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mag": {
      "value": "Magahi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mai": {
      "value": "Maithili",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mak": {
      "value": "Makasar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mlg": {
      "value": "Malagasy",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "may": {
      "value": "Malay",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "mal": {
      "value": "Malayalam",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "poz": {
      "value": "Malayo-Polynesian languages",
      "description": "Collective name. ONIX local code, equivalent of poz in ISO 639-5. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "mlt": {
      "value": "Maltese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mnc": {
      "value": "Manchu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mdr": {
      "value": "Mandar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cmn": {
      "value": "Mandarin",
      "description": "ONIX local code, equivalent to cmn in ISO 639-3",
      "a": 35,
      "b": null,
      "c": null
    },
    "man": {
      "value": "Mandingo",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "mni": {
      "value": "Manipuri",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mno": {
      "value": "Manobo languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "glv": {
      "value": "Manx",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "swb": {
      "value": "Maore Comorian",
      "description": "Shimaore. ONIX local code, equivalent to swb in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    },
    "mao": {
      "value": "Maori",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "arn": {
      "value": "Mapudungun; Mapuche",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mar": {
      "value": "Marathi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "chm": {
      "value": "Mari",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "mah": {
      "value": "Marshallese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mwr": {
      "value": "Marwari",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "mas": {
      "value": "Masai",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "myn": {
      "value": "Mayan languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "fit": {
      "value": "Me\u00e4nkieli / Tornedalen Finnish",
      "description": "ONIX local code, equivalent to fit in ISO 639-3",
      "a": 29,
      "b": null,
      "c": null
    },
    "men": {
      "value": "Mende",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mic": {
      "value": "Mi\u0092kmaq; Micmac; Mi\u0092gmaw",
      "description": null,
      "a": 0,
      "b": 66.0,
      "c": null
    },
    "crg": {
      "value": "Michif",
      "description": "ONIX local code, equivalent to crg in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "gml": {
      "value": "Middle Low German",
      "description": "ONIX local code, equivalent to gml in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "min": {
      "value": "Minullgkabau",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mwl": {
      "value": "Mirandese",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "moh": {
      "value": "Mohawk",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mdf": {
      "value": "Moksha",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "mol": {
      "value": "Moldavian; Moldovan",
      "description": "Deprecated \u0096 use rum",
      "a": 0,
      "b": 10.0,
      "c": 10.0
    },
    "mkh": {
      "value": "Mon-Khmer languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "lol": {
      "value": "Mongo-Nkundu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mon": {
      "value": "Mongolian",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "cnr": {
      "value": "Montenegrin",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "mos": {
      "value": "Moor\u00e9; Mossi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "crm": {
      "value": "Moose Cree",
      "description": "ONIX local code, equivalent to crm in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "mun": {
      "value": "Munda languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "mwf": {
      "value": "Murrinh-Patha",
      "description": "ONIX local code, equivalent to mwf in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "nqo": {
      "value": "N\u0092Ko",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "nah": {
      "value": "Nahuatl languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "nsk": {
      "value": "Naskapi",
      "description": "ONIX local code, equivalent to nsk in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "nau": {
      "value": "Nauruan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nav": {
      "value": "Navajo; Navaho",
      "description": null,
      "a": 0,
      "b": 55.0,
      "c": null
    },
    "nde": {
      "value": "Ndebele, North",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nbl": {
      "value": "Ndebele, South",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ndo": {
      "value": "Ndonga",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nap": {
      "value": "Neapolitan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nep": {
      "value": "Nepali",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "qls": {
      "value": "Neutral Latin American Spanish",
      "description": "ONIX local code, distinct and exclusively spoken variation of Spanish, not distinguished from spa (Spanish, Castilian) by ISO 639-3. Neutral Latin American Spanish should be considered a \u0091shorthand\u0092 for spa plus a \u0091country code\u0092 for Latin America \u0096 but prefer spa plus the relevant country code for specifically Mexican Spanish, Argentine (Rioplatense) Spanish, Puerto Rican Spanish etc. Neutral Latin American Spanish must only be used with audio material (including the audio tracks of TV, video and film) to indicate use of accent, vocabulary and construction suitable for broad use across Latin America. Only for use in ONIX 3.0 or later",
      "a": 43,
      "b": null,
      "c": null
    },
    "new": {
      "value": "Newari; Nepal Bhasa",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nia": {
      "value": "Nias",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nic": {
      "value": "Niger-Kordofanian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "ssa": {
      "value": "Nilo-Saharan languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "niu": {
      "value": "Niuean",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nog": {
      "value": "Nogai",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "qnf": {
      "value": "Norman French",
      "description": "Normand, of which Guern\u00e9siais, J\u00e8rriais are distinct dialects. ONIX local code (not distinguished from nrf in ISO 639-3). Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "nai": {
      "value": "North American Indian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "crl": {
      "value": "Northern East Cree",
      "description": "ONIX local code, equivalent to crl in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "frr": {
      "value": "Northern Frisian",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "sme": {
      "value": "Northern Sami",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nor": {
      "value": "Norwegian",
      "description": "Macrolanguage. See also nob (Bokm\u00e5l), nno (Nynorsk)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "nob": {
      "value": "Norwegian Bokm\u00e5l",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "nno": {
      "value": "Norwegian Nynorsk",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "nub": {
      "value": "Nubian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "nym": {
      "value": "Nyamwezi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nyn": {
      "value": "Nyankole",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nyo": {
      "value": "Nyoro",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "nzi": {
      "value": "Nzima",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "oci": {
      "value": "Occitan (post-1500)",
      "description": "See also qar (Aran\u00e9s)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "arc": {
      "value": "Official Aramaic; Imperial Aramaic (700-300 BCE)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "oji": {
      "value": "Ojibwa",
      "description": "Macrolanguage. See also ojs (Severn Ojibwa)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "odt": {
      "value": "Old Dutch / Old Low Franconian (ca. 400\u00961050)",
      "description": "ONIX local code, equivalent to odt in ISO 639-3",
      "a": 32,
      "b": null,
      "c": null
    },
    "non": {
      "value": "Old Norse",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "peo": {
      "value": "Old Persian (ca. 600-400 B.C.)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ori": {
      "value": "Oriya",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "orm": {
      "value": "Oromo",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "osa": {
      "value": "Osage",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "oss": {
      "value": "Ossetian; Ossetic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "omq": {
      "value": "Oto-Manguean languages",
      "description": "ONIX local code, equivalent to omq in ISO 639-5. Collective name",
      "a": 32,
      "b": null,
      "c": null
    },
    "oto": {
      "value": "Otomian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "pal": {
      "value": "Pahlavi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "pau": {
      "value": "Palauan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "pli": {
      "value": "Pali",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "pam": {
      "value": "Pampanga; Kapampangan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "pag": {
      "value": "Pangasinull",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "pan": {
      "value": "Panjabi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "pap": {
      "value": "Papiamento",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "paa": {
      "value": "Papuan languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "nso": {
      "value": "Pedi; Sepedi; Northern Sotho",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "per": {
      "value": "Persian",
      "description": "Macrolanguage. See also pes (Iranian Persian, Farsi), prs (Dari)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "phi": {
      "value": "Philippine languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "phn": {
      "value": "Phoenician",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "pcd": {
      "value": "Picard",
      "description": "ONIX local code, distinct variant of langue d\u0092o\u00efl (old northern French), equivalent to pcd in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "qsp": {
      "value": "Picture Communication Symbols (PCS)",
      "description": "ONIX local code for graphical symbols used in augmentative and alternative communication and education, not listed in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "pms": {
      "value": "Piedmontese",
      "description": "ONIX local code for Italian dialect, equivalent to pms in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "crk": {
      "value": "Plains Cree",
      "description": "ONIX local code, equivalent to crk in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "pol": {
      "value": "Polish",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "pon": {
      "value": "Ponapeian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "por": {
      "value": "Portuguese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "pra": {
      "value": "Prakrit languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "pro": {
      "value": "Proven\u00e7al, Old (to 1500); Occitan, Old (to 1500)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fuf": {
      "value": "Pular",
      "description": "ONIX local code, equivalent to fuf in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    },
    "pus": {
      "value": "Pushto; Pashto",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "que": {
      "value": "Quechua",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "raj": {
      "value": "Rajasthani",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "rap": {
      "value": "Rapanui",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "rar": {
      "value": "Rarotongan; Cook Islands Maori",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "rcf": {
      "value": "R\u00e9union Creole French",
      "description": "ONIX local code, equivalent to rcf in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 46,
      "b": null,
      "c": null
    },
    "rgn": {
      "value": "Romagnol",
      "description": "ONIX local code for Italian dialect, equivalent to rgl in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "roa": {
      "value": "Romance languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "rum": {
      "value": "Romanian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "roh": {
      "value": "Romansh",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "rom": {
      "value": "Romany",
      "description": "Romani. Macrolanguage",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "run": {
      "value": "Rundi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "rus": {
      "value": "Russian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sal": {
      "value": "Salishan languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "sam": {
      "value": "Samaritan Aramaic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "smi": {
      "value": "Sami languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "smo": {
      "value": "Samoan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sad": {
      "value": "Sandawe",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sag": {
      "value": "Sango",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "san": {
      "value": "Sanskrit",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sat": {
      "value": "Santali",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "srm": {
      "value": "Saramaccan",
      "description": "ONIX local code for Saramaccan language, equivalent to srm in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 54,
      "b": null,
      "c": null
    },
    "srd": {
      "value": "Sardinian",
      "description": "Macrolanguage. See also sdc (Sassarese), sdn (Gallurese), sro (Campidanese)",
      "a": 0,
      "b": 63.0,
      "c": null
    },
    "sas": {
      "value": "Sasak",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sdc": {
      "value": "Sassarese",
      "description": "ONIX local code for Sardinian dialect, equivalent to sdc in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "sco": {
      "value": "Scots",
      "description": null,
      "a": 0,
      "b": 44.0,
      "c": null
    },
    "gla": {
      "value": "Scottish Gaelic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sel": {
      "value": "Selkup",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sem": {
      "value": "Semitic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "scc": {
      "value": "Serbian",
      "description": "Deprecated \u0096 use srp",
      "a": 0,
      "b": 10.0,
      "c": 10.0
    },
    "srp": {
      "value": "Serbian",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "srr": {
      "value": "Serer",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ojs": {
      "value": "Severn Ojibwa",
      "description": "ONIX local code, equivalent to ojs in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "shn": {
      "value": "Shan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sna": {
      "value": "Shona",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "shs": {
      "value": "Shuswap",
      "description": "ONIX local code, equivalent to shs in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "iii": {
      "value": "Sichuan Yi; Nuosu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "scn": {
      "value": "Sicilian",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "sid": {
      "value": "Sidamo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sgn": {
      "value": "Sign languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "bla": {
      "value": "Siksika",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "szl": {
      "value": "Silesian",
      "description": "ONIX local code, equivalent to szl in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "snd": {
      "value": "Sindhi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sin": {
      "value": "Sinhala; Sinhalese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "zhx": {
      "value": "Sinitic languages",
      "description": "Chinese (family) languages. Collective name. ONIX local code, equivalent of zhx in ISO 639-5. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "sit": {
      "value": "Sino-Tibetan languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "sio": {
      "value": "Siouan languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "sms": {
      "value": "Skolt Sami",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "den": {
      "value": "Slave (Athapascan)",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "sla": {
      "value": "Slavic languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "slo": {
      "value": "Slovak",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "slv": {
      "value": "Slovenian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sog": {
      "value": "Sogdian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "som": {
      "value": "Somali",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "son": {
      "value": "Songhai languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "snk": {
      "value": "Soninke",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "wen": {
      "value": "Sorbian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "sot": {
      "value": "Sotho; Sesotho",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sai": {
      "value": "South American Indian languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "alt": {
      "value": "Southern Altai",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "crj": {
      "value": "Southern East Cree",
      "description": "ONIX local code, equivalent to crj in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "sma": {
      "value": "Southern Sami",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "spa": {
      "value": "Spanish",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "srn": {
      "value": "Sranull Tongo",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "zgh": {
      "value": "Standard Moroccan Tamazight",
      "description": null,
      "a": 32,
      "b": null,
      "c": null
    },
    "sto": {
      "value": "Stoney",
      "description": "ONIX local code, equivalent to sto in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "suk": {
      "value": "Sukuma",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sux": {
      "value": "Sumerian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sun": {
      "value": "Sundanese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sus": {
      "value": "Susu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "swa": {
      "value": "Swahili",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "csw": {
      "value": "Swampy Cree",
      "description": "ONIX local code, equivalent to csw in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "ssw": {
      "value": "Swazi; Swati",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "swe": {
      "value": "Swedish",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "gsw": {
      "value": "Swiss German; Alemannic; Alsatian",
      "description": null,
      "a": 7,
      "b": 55.0,
      "c": null
    },
    "syr": {
      "value": "Syriac",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "tgl": {
      "value": "Tagalog",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tah": {
      "value": "Tahitian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tai": {
      "value": "Tai languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "tgk": {
      "value": "Tajik; Tajiki Persian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tmh": {
      "value": "Tamashek",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "tam": {
      "value": "Tamil",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "shi": {
      "value": "Tashelhit; Shilha",
      "description": "ONIX local code, equivalent to shi in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 56,
      "b": null,
      "c": null
    },
    "tat": {
      "value": "Tatar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tel": {
      "value": "Telugu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tem": {
      "value": "Temne; Time",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ter": {
      "value": "Terena",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tet": {
      "value": "Tetum",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tha": {
      "value": "Thai",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "thp": {
      "value": "Thompson",
      "description": "Nla\u0092kapamux. ONIX local code, equivalent to thp in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "tib": {
      "value": "Tibetan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tig": {
      "value": "Tigr\u00e9",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tir": {
      "value": "Tigrinya",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tiv": {
      "value": "Tiv",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tli": {
      "value": "Tlingit",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tpi": {
      "value": "Tok Pisin",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tkl": {
      "value": "Tokelauan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tog": {
      "value": "Tonga (Nyasa)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ton": {
      "value": "Tongan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "rmg": {
      "value": "Traveler Norwegian",
      "description": "ONIX local code for Norwegian Scandoromani variant, equivalent to rmg in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "tsd": {
      "value": "Tsakonian",
      "description": "ONIX local code, equivalent to tsd in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "tsi": {
      "value": "Tsimshian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tso": {
      "value": "Tsonga",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tsn": {
      "value": "Tswana",
      "description": "AKA Setswana",
      "a": 0,
      "b": null,
      "c": null
    },
    "tum": {
      "value": "Tumbuka",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tup": {
      "value": "Tupi languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "tur": {
      "value": "Turkish",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ota": {
      "value": "Turkish, Ottoman",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tuk": {
      "value": "Turkmen",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tvl": {
      "value": "Tuvaluan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tyv": {
      "value": "Tuvinian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "twi": {
      "value": "Twi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "tzo": {
      "value": "Tzotzil",
      "description": "ONIX local code, equivalent to tzo in ISO 639-3",
      "a": 32,
      "b": null,
      "c": null
    },
    "udm": {
      "value": "Udmurt",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "uga": {
      "value": "Ugaritic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "uig": {
      "value": "Uighur; Uyghur",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ukr": {
      "value": "Ukrainian",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "umb": {
      "value": "Umbundu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "hsb": {
      "value": "Upper Sorbian",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "urj": {
      "value": "Uralic languages",
      "description": "Collective name. ONIX local code, equivalent of urj in ISO 639-5. Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "urd": {
      "value": "Urdu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "uzb": {
      "value": "Uzbek",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "vai": {
      "value": "Vai",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "qav": {
      "value": "Valencian",
      "description": "ONIX local code, distinct dialect of Catalan (not distinguished from cat by ISO 639-3)",
      "a": 5,
      "b": 24.0,
      "c": null
    },
    "ven": {
      "value": "Venda",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "vec": {
      "value": "Venetian/Venetan",
      "description": "ONIX local code for Italian dialect, equivalent to vec in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 49,
      "b": null,
      "c": null
    },
    "vie": {
      "value": "Vietnamese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "vol": {
      "value": "Volap\u00fck",
      "description": "Artificial language",
      "a": 0,
      "b": null,
      "c": null
    },
    "vot": {
      "value": "Votic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "wak": {
      "value": "Wakashan languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "wls": {
      "value": "Wallisian",
      "description": "East Uvean. ONIX local code, equivalent to wls in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "wln": {
      "value": "Walloon",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "war": {
      "value": "Waray",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "was": {
      "value": "Washo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "guc": {
      "value": "Wayuu",
      "description": "Guajiro. ONIX local code, equivalent of guc in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "wel": {
      "value": "Welsh",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "fry": {
      "value": "Western Frisian",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "qsw": {
      "value": "Widgit symbols",
      "description": "ONIX local code for graphical symbols used in augmentative and alternative communication and education, not listed in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "wal": {
      "value": "Wolaitta; Wolaytta",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "wol": {
      "value": "Wolof",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "cwd": {
      "value": "Woods Cree",
      "description": "ONIX local code, equivalent to cwd in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "wym": {
      "value": "Wymysorys",
      "description": "Vilamovian. ONIX local code, equivalent to wym in ISO 639-3. Only for use in ONIX 3.0 or later",
      "a": 53,
      "b": null,
      "c": null
    },
    "xho": {
      "value": "Xhosa",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "sah": {
      "value": "Yakut",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "yao": {
      "value": "Yao",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "yap": {
      "value": "Yapese",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "yid": {
      "value": "Yiddish",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "yor": {
      "value": "Yoruba",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ypk": {
      "value": "Yupik languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "znd": {
      "value": "Zande languages",
      "description": "Collective name",
      "a": 0,
      "b": null,
      "c": null
    },
    "zap": {
      "value": "Zapotec",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "zza": {
      "value": "Zaza; Dimili; Dimli; Kirdki; Kirmanjki; Zazaki",
      "description": "Macrolanguage",
      "a": 7,
      "b": null,
      "c": null
    },
    "zen": {
      "value": "Zenaga",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "zha": {
      "value": "Zhuang; Chuang",
      "description": "Macrolanguage",
      "a": 0,
      "b": null,
      "c": null
    },
    "zul": {
      "value": "Zulu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "zun": {
      "value": "Zuni",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mis": {
      "value": "Uncoded language",
      "description": "Use where no suitable code is available",
      "a": 0,
      "b": null,
      "c": null
    },
    "und": {
      "value": "Undetermined language",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "mul": {
      "value": "Multiple languages",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "zxx": {
      "value": "No linguistic content",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    }
  },
  "76": {
    "0": {
      "value": "All regions",
      "description": "DVD or Blu-Ray",
      "a": 2,
      "b": 8.0,
      "c": null
    },
    "1": {
      "value": "DVD region 1",
      "description": "US, US Territories, Canada",
      "a": 2,
      "b": null,
      "c": null
    },
    "2": {
      "value": "DVD region 2",
      "description": "Japan, Europe, South Africa and Middle East (including Egypt)",
      "a": 2,
      "b": 8.0,
      "c": null
    },
    "3": {
      "value": "DVD region 3",
      "description": "Southeast Asia, Hong Kong, Macau, South Korea, and Taiwan",
      "a": 2,
      "b": 8.0,
      "c": null
    },
    "4": {
      "value": "DVD region 4",
      "description": "Australia, New Zealand, Pacific Islands, Central America, Mexico, South America and the Caribbean",
      "a": 2,
      "b": null,
      "c": null
    },
    "5": {
      "value": "DVD region 5",
      "description": "Eastern Europe (former Soviet Union), Indian subcontinent, Africa, North Korea and Mongolia",
      "a": 2,
      "b": null,
      "c": null
    },
    "6": {
      "value": "DVD region 6",
      "description": "People\u0092s Republic of China (except Macau and Hong Kong)",
      "a": 2,
      "b": 8.0,
      "c": null
    },
    "7": {
      "value": "DVD region 7",
      "description": "Reserved for future use",
      "a": 2,
      "b": 8.0,
      "c": null
    },
    "8": {
      "value": "DVD region 8",
      "description": "International venues: aircraft, cruise ships etc",
      "a": 2,
      "b": 8.0,
      "c": null
    },
    "A": {
      "value": "Blu-Ray region A",
      "description": "North America, Central America, South America, Japan, Taiwan, North Korea, South Korea, Hong Kong, and Southeast Asia",
      "a": 8,
      "b": null,
      "c": null
    },
    "B": {
      "value": "Blu-Ray region B",
      "description": "Most of Europe, Greenland, French territories, Middle East, Africa, Australia, and New Zealand, plus all of Oceania",
      "a": 8,
      "b": null,
      "c": null
    },
    "C": {
      "value": "Blu-Ray region C",
      "description": "India, Bangladesh, Nepal, Mainland China, Pakistan, Russia, Ukraine, Belarus, Central, and South Asia",
      "a": 8,
      "b": null,
      "c": null
    }
  },
  "77": {
    "P": {
      "value": "Preschool",
      "description": "Age typically 0-4 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "K": {
      "value": "Kindergarten",
      "description": "Age typically 5 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "1": {
      "value": "First Grade",
      "description": "Age typically 6 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "2": {
      "value": "Second Grade",
      "description": "Age typically 7 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "3": {
      "value": "Third Grade",
      "description": "Age typically 8 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "4": {
      "value": "Fourth Grade",
      "description": "Age typically 9 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "5": {
      "value": "Fifth Grade",
      "description": "Age typically 10 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "6": {
      "value": "Sixth Grade",
      "description": "Age typically 11 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "7": {
      "value": "Seventh Grade",
      "description": "Age typically 12 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "8": {
      "value": "Eighth Grade",
      "description": "Age typically 13 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "9": {
      "value": "Ninth Grade",
      "description": "High School Freshman \u0096 age typically 14 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Tenth Grade",
      "description": "High School Sophomore \u0096 age typically 15 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Eleventh Grade",
      "description": "High School Junior \u0096 age typically 16 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Twelfth Grade",
      "description": "High School Senior \u0096 age typically 17 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "13": {
      "value": "College Freshman",
      "description": "Age typically 18 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "14": {
      "value": "College Sophomore",
      "description": "Age typically 19 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "15": {
      "value": "College Junior",
      "description": "Age typically 20 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "16": {
      "value": "College Senior",
      "description": "Age typically 21 years",
      "a": 1,
      "b": null,
      "c": null
    },
    "17": {
      "value": "College Graduate Student",
      "description": "Age typically 22+ years",
      "a": 1,
      "b": null,
      "c": null
    }
  },
  "79": {
    "01": {
      "value": "Color of cover",
      "description": "For Product Form Feature values see code list 98",
      "a": 1,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Color of spine",
      "description": "Where it is different from the overall color of the cover (see code 01). For Product Form Feature values see code list 98. Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Color of foil",
      "description": "On cover or spine. For Product Form Feature values see metallic colors from code list 98. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Color of page edge",
      "description": "Sprayed / gilded edges. For Product Form Feature values see code list 98",
      "a": 1,
      "b": 63.0,
      "c": null
    },
    "03": {
      "value": "Text font",
      "description": "The principal font used for body text, when this is a significant aspect of product description, eg for some Bibles, and for large print product. The accompanying <ProductFormFeatureDescription> is text specifying the typeface name. The font size may be specified with the font name, but is preferred separately (in points) in <ProductFormFeatureValue>",
      "a": 1,
      "b": 50.0,
      "c": null
    },
    "04": {
      "value": "Special cover material",
      "description": "For Product Form Feature values see code list 99",
      "a": 1,
      "b": null,
      "c": null
    },
    "05": {
      "value": "DVD region",
      "description": "For Product Form Feature values see code list 76",
      "a": 2,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Operating system requirements",
      "description": "A computer or handheld device operating system required to use a digital product, with version detail if applicable. The accompanying Product Form Feature Value is a code from List 176. Version detail, when applicable, is carried in Product Form Feature Description",
      "a": 10,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Other system requirements",
      "description": "Other system requirements for a digital product, described by free text in Product Form Feature Description",
      "a": 10,
      "b": null,
      "c": null
    },
    "08": {
      "value": "\u0091Point and listen\u0092 device compatibility",
      "description": "Indicates compatibility with proprietary \u0091point and listen\u0092 devices such as Ting Pen (http://www.ting.eu), the iSmart Touch and Read Pen. These devices scan invisible codes specially printed on the page to identify the book and position of the word, and the word is then read aloud by the device. The name of the compatible device (or range of devices) should be given in <ProductFormFeatureDescription>",
      "a": 15,
      "b": null,
      "c": null
    },
    "09": {
      "value": "E-publication accessibility detail",
      "description": "For <ProductFormFeatureValue> codes, see Codelist 196",
      "a": 15,
      "b": null,
      "c": null
    },
    "10": {
      "value": "E-publication format version",
      "description": "For versioned e-book file formats (or in some cases, devices). <ProductFormFeatureValue> should contain the version number as a period-separated list of numbers (eg \u00917\u0092, \u00911.5\u0092 or \u00913.10.7\u0092). Only for use in ONIX 3.0 or later \u0096 in ONIX 2.1, use <EpubTypeVersion> instead. For the most common file formats, code 15 and List 220 is strongly preferred",
      "a": 17,
      "b": 24.0,
      "c": null
    },
    "12": {
      "value": "US CPSIA or other international hazard warning",
      "description": "Hazard warning required by US Consumer Product Safety Improvement Act (CPSIA) of 2008 or other US or international legislation. Required, when applicable, for products sold in the US. The Product Form Feature Value is a code from List 143. Further explanation may be given in Product Form Feature Description",
      "a": 9,
      "b": 46.0,
      "c": null
    },
    "13": {
      "value": "EU Toy Safety Hazard warning",
      "description": "Product carries hazard warning required by EU Toy Safety Directive. The Product Form Feature Value is a code from List 184, and (for some codes) the exact wording of the warning may be given in Product Form Feature Description",
      "a": 13,
      "b": 14.0,
      "c": null
    },
    "14": {
      "value": "IATA Dangerous Goods warning",
      "description": "Product Form Feature Description must give further details of the warning",
      "a": 21,
      "b": null,
      "c": null
    },
    "15": {
      "value": "E-publication format version code",
      "description": "For common versioned e-book formats (or in some cases, devices) \u0096 for example EPUB 2.0.1 or EPUB 3.0. <ProductFormFeatureValue> is a code from list 220. Only for use in ONIX 3.0 or later",
      "a": 24,
      "b": null,
      "c": null
    },
    "16": {
      "value": "E-publication format validator version",
      "description": "For common versioned e-book formats, the name and version of the validator used to check conformance. <ProductFormFeatureDescription> is the common name of the validator used (eg EpubCheck, Flightdeck), and <ProductFormFeatureValue> is the version number of the validator (eg 4.0.0a). Use with code 15 (or possibly code 10), or with <EpubTypeVersion>, to specify the version the e-publication conforms with",
      "a": 30,
      "b": null,
      "c": null
    },
    "17": {
      "value": "\u0091Point and watch\u0092 device/app compatibility",
      "description": "Indicates compatibility with proprietary \u0091point and watch\u0091 devices or apps. These scan invisible codes specially printed on the page, or the whole page image, to identify the book and page position. Scanning can trigger display of (for example) an augmented reality view of the page. The name of the compatible app or device (or range of apps/devices) should be given in <ProductFormFeatureDescription>. Only for use in ONIX 3.0 or later",
      "a": 39,
      "b": null,
      "c": null
    },
    "18": {
      "value": "E-publication authentication and access control",
      "description": "Requirement for user authentication prior to use, with detail of authentication method (user enrolment, and login passwords, location- or device-based recognition, authentication via third-party identity service etc) given in <ProductFormFeatureDescription>. Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Battery type and safety",
      "description": "Use to describe battery requirements, types, hazards and battery safety warnings. <ProductFormFeatureValue> is a code from List 242. Only for use in ONIX 3.0 or later",
      "a": 45,
      "b": 58.0,
      "c": null
    },
    "20": {
      "value": "Battery capacity",
      "description": "Total capacity (of batteries in the product) in Watt hours. <ProductFormFeatureValue> is an integer or decimal number (eg \u009145\u0092, not \u009145Wh\u0092). Only for use in ONIX 3.0 or later",
      "a": 45,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Dangerous goods",
      "description": "Use to describe regulation of the product for various purposes. <ProductFormFeatureValue> is a code from List 243. Only for use in ONIX 3.0 or later",
      "a": 45,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Game pieces",
      "description": "Number of pieces, eg for jigsaws, puzzles, kits, board games. <ProductFormFeatureValue> is an integer. Only for use in ONIX 3.0 or later. For pieces like cards in a pack, see <Extent> and code 00 from List 24",
      "a": 48,
      "b": 63.0,
      "c": null
    },
    "23": {
      "value": "Game players",
      "description": "Number of players, for board games, card games, videogames etc. <ProductFormFeatureValue> must be a required (exact) number as an integer OR a range (eg \u00912\u00966\u0092), optionally accompanied by the number of players as text (eg \u0091suitable for 2\u00966 players\u0092) in <ProductFormFeatureDescription>. Only for use in ONIX 3.0 or later",
      "a": 48,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Game play time",
      "description": "Typical time to complete a game, for board games, card games, videogames etc, stated as an integer (in minutes) OR range (eg \u009160\u009690\u0092) in <ProductFormFeatureValue>, optionally accompanied by the playing time as text (eg \u0091typically 60\u009690 minutes\u0092) in <ProductFormFeatureDescription>. Only for use in ONIX 3.0 or later",
      "a": 48,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Personal data requirements",
      "description": "Personal data required for registration or use of the product. This can be coded in <ProductFormFeatureValue> (for example using a URI from SCOLOM list 044 \u0096 see http://data.education.fr/voc/scolomfr/scolomfr-voc-044) \u0096 and/or described in <ProductFormFeatureDescription>. Only for use in ONIX 3.0 or later",
      "a": 53,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Not FSC or PEFC certified",
      "description": "Product does not carry FSC or PEFC logo. The Product Form Feature Value element is not used. The Product Form Feature Description element may carry free text indicating the grade or type of paper. The product record may also still carry a claimed Pre- and Post-Consumer Waste (PCW) percentage value (type code 37) in a separate repeat of the Product Form Feature composite",
      "a": 10,
      "b": 42.0,
      "c": null
    },
    "31": {
      "value": "FSC certified \u0096 pure",
      "description": "Product carries FSC logo (Pure, 100%). <ProductFormFeatureValue> is the Certification number (ie either a Chain Of Custody (COC) number or a Trademark License number) printed on the book. Format: Chain of Custody number is two to five letters-COC-six digits (the digits should include leading zeros if necessary), eg \u0091AB-COC-001234\u0092 or \u0091ABCDE-COC-123456\u0092; Trademark License number is C followed by six digits, eg \u0091C005678\u0092 (this would normally be prefixed by \u0091FSC\u00ae\u0092 when displayed). The Product Form Feature Description element may carry free text indicating the grade or type of paper. By definition, a product certified Pure does not contain Pre- or Post-Consumer-Waste (PCW), so type code 31 can only occur on its own. Certification numbers may be checked at https://info.fsc.org/",
      "a": 10,
      "b": 42.0,
      "c": null
    },
    "32": {
      "value": "FSC certified \u0096 mixed sources",
      "description": "Product carries FSC logo (Mixed sources, Mix). <ProductFormFeatureValue> is the Certification number (ie either a Chain Of Custody (COC) number or a Trademark License number) printed on the book. Format: Chain of Custody number is two to five letters-COC-six digits (the digits should include leading zeros if necessary), eg \u0091AB-COC-001234\u0092 or \u0091ABCDE-COC-123456\u0092; Trademark License number is C followed by six digits, eg \u0091C005678\u0092 (this would normally be prefixed by \u0091FSC\u00ae\u0092 when displayed). The Product Form Feature Description element may carry free text indicating the grade or type of paper. May be accompanied by a Pre- and Post-Consumer-Waste (PCW) percentage value, to be reported in another instance of <ProductFormFeature> with type code 36. Certification numbers may be checked at https://info.fsc.org/",
      "a": 10,
      "b": 42.0,
      "c": null
    },
    "33": {
      "value": "FSC certified \u0096 recycled",
      "description": "Product carries FSC logo (Recycled). <ProductFormFeatureValue> is the Certification number (ie either a Chain Of Custody (COC) number or a Trademark License number) printed on the book. Format: Chain of Custody number is two to five letters-COC-six digits (the digits should include leading zeroes if necessary), eg \u0091AB-COC-001234\u0092 or \u0091ABCDE-COC-123456\u0092; Trademark License number is C followed by six digits, eg \u0091C005678\u0092 (this would normally be prefixed by \u0091FSC\u00ae\u0092 when displayed). The Product Form Feature Description element may carry free text indicating the grade or type of paper. Should be accompanied by a Pre- and Post-Consumer-Waste (PCW) percentage value, to be reported in another instance of <ProductFormFeature> with type code 36. Certification numbers may be checked at https://info.fsc.org/",
      "a": 10,
      "b": 42.0,
      "c": null
    },
    "34": {
      "value": "PEFC certified",
      "description": "Product carries PEFC logo (certified) or equivalent from PEFC-endorsed national scheme. <ProductFormFeatureValue> is the Chain Of Custody (COC) number printed on the book. The Product Form Feature Description element may carry free text indicating the grade or type of paper. May be accompanied by a Post-Consumer Waste (PCW) percentage value, to be reported in another instance of <ProductFormFeature> with type code 36",
      "a": 10,
      "b": 58.0,
      "c": null
    },
    "35": {
      "value": "PEFC recycled",
      "description": "Product carries PEFC logo (recycled) or equivalent from PEFC-endorsed national scheme. <ProductFormFeatureValue> is the Chain Of Custody (COC) number printed on the book. The Product Form Feature Description element may carry free text indicating the grade or type of paper. Should be accompanied by a Post-Consumer-Waste (PCW) percentage value, to be reported in another instance of <ProductFormFeature> with type code 36",
      "a": 10,
      "b": 58.0,
      "c": null
    },
    "36": {
      "value": "FSC or PEFC certified Pre- and Post-Consumer Waste (PCW) percentage",
      "description": "The percentage of recycled Pre- and Post-Consumer-Waste (PCW) used in a product where the composition is certified by FSC, PEFC or PEFC-endorsed scheme. <ProductFormFeatureValue> is an integer. May occur together with type code 32, 33, 34 or 35",
      "a": 10,
      "b": 58.0,
      "c": null
    },
    "37": {
      "value": "Claimed Pre- and Post-Consumer Waste (PCW) percentage",
      "description": "The percentage of recycled Pre- and Post-Consumer Waste (PCW) claimed to be used in a product where the composition is not certified by FSC or PEFC. <Product FormFeatureValue> is an integer. <ProductFormFeatureDescription> may carry free text supporting the claim. Must be accompanied by type code 30",
      "a": 10,
      "b": 14.0,
      "c": null
    },
    "38": {
      "value": "\u0091Green\u0092 inks",
      "description": "Vegetable-based or other environmentally-conscious inks and varnishes. <ProductFormFeatureDescription> may carry free text with a more detailed statement. Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "39": {
      "value": "\u0091Green\u0092 adhesives",
      "description": "Product binding uses environmentally-concious adhesives and other binding materials. <ProductFormFeatureDescription> may carry free text with a more detailed statement. Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "40": {
      "value": "Paper produced by \u0091green\u0092 technology",
      "description": "Product made from paper produced using environmentally-conscious technology. <ProductFormFeatureDescription> may carry free text with a more detailed statement",
      "a": 11,
      "b": null,
      "c": null
    },
    "41": {
      "value": "Carbon/GHG emission certification scheme",
      "description": "<ProductFormFeatureValue> is a code from List 262 identifying the particular certification scheme. <ProductFormFeatureDescription> may be a descriptor for some part, schedule or annex of the certification scheme, where necessary. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "42": {
      "value": "Carbon/GHG emission certification / license number",
      "description": "<ProductFormFeatureValue> is a code from List 262 identifying a particular certification scheme. <ProductFormFeatureDescription> is a certificate or license number used to certify compliance with the scheme. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "43": {
      "value": "Carbon/GHG emission certification URL",
      "description": "<ProductFormFeatureValue> is a code from List 262 identifying a particular certification scheme. <ProductFormFeatureDescription> is a URL linking to a web page certifying compliance with the scheme. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "44": {
      "value": "Carbon/GHG Scope 3 certified Carbon dioxide equivalent emission",
      "description": "<ProductFormFeatureValue> is a code from List 262 identifying a particular certification scheme. <ProductFormFeatureDescription> is a number specifying certified GHG emissions per copy of the product, measured in kilograms of Carbon dioxide equivalent (CO2e) using the Scope 3 methodology of the scheme. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "45": {
      "value": "Carbon/GHG Scope 2 certified Carbon dioxide equivalent emission",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "46": {
      "value": "Carbon/GHG Scope 1 certified Carbon dioxide equivalent emission",
      "description": "Scope 1 emission certifications are not recommended for use. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "47": {
      "value": "EUDR raw material location (interior or full product)",
      "description": "For EU Deforestation regulations, location of raw material source plot (\u0091where the tree grew\u0092) for the interior or main body of the product (or for the entire product, if the raw material source for the binding and other parts of the product cannot be differentiated). If there are multiple sources for the same raw material, repeat <ProductFormFeature> for each plot. Further repeats of <ProductFormFeature> may be used for multiple paper, card and board types. <ProductFormFeatureValue> is a country code from List 91 indicating the country in which the source plot is, optionally followed by a space and the binomial (Latin) name of the species, optionally followed by a space and the date of harvest of the source plot (YYYY, YYYYMM or YYYYMMDD). <ProductFormFeatureDescription> is a list of points defining one or more plots from which the raw material was harvested, using GPS coordinates with 6 decimal places of precision (these are real numbers, \u00b190 for latitude [negative numbers indicate a latitude south of the equator], \u00b1180 excluding -180 itself for longitude [negative numbers indicate a longitude west of the Prime Greenwich meridian]). Latitude and Longitude for each point are space-separated, and multiple points are comma-separated. Multiple plots are semicolon separated, and must be in the same country. (Any supplied species name and date must also apply to all plots in the list.) (Note these GPS coordinates use decimal parts of a degree, not minutes and seconds.) ONE point defines the centre of a 4 hectare plot (200m \u00d7 200m). TWO points define a line joining opposite corners of a \u0091square\u0092 plot bounded by two lines of latitude and two of longitude. THREE or more points define a simple polygon outlining the plot. Plot types with one, two or multiple points must not be mixed in a list of multiple plots. Lines and polygon edges may not cross a national boundary or the 180\u00b0 line of longitude. Polygon edges may not intersect. It is good practice to ensure the polygon is drawn clockwise and is \u0091closed\u0092 (that is, that the first and last points are identical, so that for example four points define a triangle). If not closed, the closing polygon edge is implied, and to avoid ambiguity, trailing zeros in the latitude and longitude should be explicit. Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": 67.0,
      "c": null
    },
    "48": {
      "value": "EUDR raw material location (binding)",
      "description": "For endpaper, cover card or board, any other binding or covering material and any jacket (but not including any slipcase or other packaging). Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    },
    "49": {
      "value": "EUDR raw material location (other)",
      "description": "Including any slipcase or box, retail packaging, supplementary material (but not including any packaging discarded before retail sale). Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    },
    "50": {
      "value": "EUDR due diligence reference",
      "description": "For EU Deforestation Regulations, <ProductFormFeatureValue> is the \u0091Due Diligence Statement\u0092 (DDS) document reference recorded by the publisher or other organization responsible for the product when a due diligence statement is uploaded to the EU\u0092s portal, expected to be in a format like \u009124FRXVV3VOS991\u0092. This references the DDS for the product as a whole. There may also be a UUID acting as an internal or proprietary document reference, for which use <ProductFormFeatureDescription>. <ProductFormFeature> should be repeated if multiple DDSs apply to the product as a whole. See https://environment.ec.europa.eu/topics/forests/deforestation/regulation-deforestation-free-products_en Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": 67.0,
      "c": null
    },
    "51": {
      "value": "EUDR associated due diligence references",
      "description": "For EU Deforestation Regulation, <ProductFormFeatureValue> is a space-separated list of document references for DDSs created by upstream operators that are or may be referred to in the DDS for the product as a whole (ie the DDS specified using code 50). Only for use in ONIX 3.0 or later",
      "a": 67,
      "b": null,
      "c": null
    },
    "52": {
      "value": "EUDR compliant with national law attestation",
      "description": "For EU Deforestation regulations, a \u0091flag\u0092 indicating that all raw materials were produced in accordance with legal requirements of one or more countries within each of which there are one or more source plots, and that documentation to verify this is available upon request. <ProductFormFeatureValue> is a space-separated list of country codes from List 91. Presence of code 52 and a country code acts as an positive attestation that the product\u0092s raw materials sourced from the specified country are compliant with the national laws of that country, but the attestation is meaningful only if there is no pre-existing DDS for the product as a whole (presence of a DDS reference already attests the product is compliant with all national laws and that documentation is available). Only for use in ONIX 3.0 or later",
      "a": 67,
      "b": null,
      "c": null
    },
    "53": {
      "value": "EUDR deforestation-free attestation",
      "description": "For EU Deforestation regulations, a \u0091flag\u0092 indicating that all raw materials used for the product are \u0091deforestation-free\u0092, and that documentation to verify this is available upon request. Presence of code 53 acts as a positive attestation that the product\u0092s raw materials are deforestation-free, but the attestation is meaningful only if there is no pre-existing DDS for the product as a whole (presence of a DDS reference already attests the product is deforestation-free and that documentation is available). Only for use in ONIX 3.0 or later",
      "a": 67,
      "b": null,
      "c": null
    }
  },
  "80": {
    "00": {
      "value": "No outer packaging",
      "description": "No packaging, or all smaller items enclosed inside largest item",
      "a": 13,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Slip-sleeve",
      "description": "Thin card or soft plastic sleeve, much less rigid than a slip case",
      "a": 1,
      "b": 21.0,
      "c": null
    },
    "02": {
      "value": "Clamshell",
      "description": "Packaging consisting of formed plastic sealed around each side of the product. Not to be confused with single-sided Blister pack",
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "03": {
      "value": "Keep case",
      "description": "Typical DVD-style packaging, sometimes known as an \u0091Amaray\u0092 case",
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "05": {
      "value": "Jewel case",
      "description": "Typical CD-style packaging",
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "06": {
      "value": "Digipak",
      "description": "Common CD-style packaging, a card folder with one or more panels incorporating a tray, hub or pocket to hold the disc(s)",
      "a": 21,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Shrink-wrapped (biodegradable)",
      "description": "Use for products or product bundles supplied for retail sale in shrink-wrapped packaging, where the shrink-wrap film is biodegradable. For non-degradable film, see code 21. Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "09": {
      "value": "In box (with lid)",
      "description": "Individual item, items or set in card box with separate or hinged lid: not to be confused with the commonly-used \u0091boxed set\u0092 which is more likely to be packaged in a slip case",
      "a": 2,
      "b": 62.0,
      "c": null
    },
    "10": {
      "value": "Slip-cased",
      "description": "Slip-case for single item only (de: \u0091Schuber\u0092)",
      "a": 2,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Slip-cased set",
      "description": "Slip-case for multi-volume set, also commonly referred to as \u0091boxed set\u0092 (de: \u0091Kassette\u0092)",
      "a": 2,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Tube",
      "description": "Rolled in tube or cylinder: eg sheet map or poster",
      "a": 2,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Binder",
      "description": "Use for miscellaneous items such as slides, microfiche, when presented in a binder",
      "a": 2,
      "b": null,
      "c": null
    },
    "14": {
      "value": "In wallet or folder",
      "description": "Use for miscellaneous items such as slides, microfiche, when presented in a wallet or folder",
      "a": 2,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Long triangular package",
      "description": "Long package with triangular cross-section used for rolled sheet maps, posters etc",
      "a": 7,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Long square package",
      "description": "Long package with square cross-section used for rolled sheet maps, posters, etc",
      "a": 7,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Softbox (for DVD)",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Pouch",
      "description": "In pouch, eg teaching materials in a plastic bag or pouch",
      "a": 8,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Rigid plastic case",
      "description": "In duroplastic or other rigid plastic case, eg for a class set",
      "a": 8,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Cardboard case",
      "description": "In cardboard case, eg for a class set",
      "a": 8,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Shrink-wrapped",
      "description": "Use for products or product bundles supplied for retail sale in shrink-wrapped packaging. For biodegradable shrink-wrap film, prefer code 08. For shrink-wrapped packs of multiple products for trade supply only, see code XL in List 7",
      "a": 8,
      "b": 63.0,
      "c": null
    },
    "22": {
      "value": "Blister pack",
      "description": "A pack comprising a pre-formed plastic blister and a printed card with a heat-seal coating",
      "a": 8,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Carry case",
      "description": "A case with carrying handle, typically for a set of educational books and/or learning materials",
      "a": 8,
      "b": null,
      "c": null
    },
    "24": {
      "value": "In tin",
      "description": "Individual item, items or set in metal box or can with separate or hinged lid",
      "a": 34,
      "b": null,
      "c": null
    },
    "25": {
      "value": "With browse-prevention tape",
      "description": "(ja: koguchi tome) Peelable sticker or tape sealing the foredge of a book to prevent pre-purchase reading of the content. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    }
  },
  "81": {
    "10": {
      "value": "Text",
      "description": "Readable text of the main content: this value is required, together with applicable <ProductForm> and <ProductFormDetail> values, to designate an e-book or other digital or physical product whose primary content is text. Note \u0091text\u0092 is \u0091text-as-text\u0092, not \u0091text as an image\u0092 or images of text",
      "a": 9,
      "b": 62.0,
      "c": null
    },
    "15": {
      "value": "Extensive links between internal content",
      "description": "E-publication contains a significant number of actionable (clickable) cross-references, hyperlinked notes and annotations, or with other actionable links between largely textual elements (eg quiz/test questions, \u0091choose your own ending\u0092 etc)",
      "a": 13,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Extensive links to external content",
      "description": "E-publication contains a significant number of actionable (clickable) web links to external content, downloadable resources, supplementary material, etc",
      "a": 13,
      "b": 62.0,
      "c": null
    },
    "51": {
      "value": "Links to external interactive content",
      "description": "Publication contains actionable (clickable) links to external interactive content. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Additional text not part of main content",
      "description": "Publication contains additional textual content such as an interview, feature article, essay, bibliography, quiz/test, other background material, or text that is not included in a primary or \u0091unenhanced\u0092 version. Note \u0091text\u0092 is \u0091text-as-text\u0092, not \u0091text as an image\u0092 or images of text",
      "a": 13,
      "b": 62.0,
      "c": null
    },
    "45": {
      "value": "Text within images ",
      "description": "Including text-as-text embedded in diagrams, charts, or within images containing speech balloons, thought bubbles, captions etc. Note this does not include \u0091text as an image\u0092 or images of text (for which see code 49). Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "41": {
      "value": "Additional eye-readable links to external content",
      "description": "Publication contains a significant number of web links (printed URLs, QR codes etc). Only for use in ONIX 3.0 or later",
      "a": 39,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Promotional text for other book product",
      "description": "Publication contains supplementary text as promotional content such as, for example, a teaser chapter",
      "a": 13,
      "b": 62.0,
      "c": null
    },
    "11": {
      "value": "Musical notation",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Still images / graphics",
      "description": "Includes any type of illustrations. Use only when no more detailed specification is provided",
      "a": 2,
      "b": 62.0,
      "c": null
    },
    "18": {
      "value": "Photographs",
      "description": "Whether in a plate section / insert, or not",
      "a": 13,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Figures, diagrams, charts, graphs",
      "description": "Including other \u0091mechanical\u0092 (ie non-photographic) illustrations",
      "a": 13,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Additional images / graphics not part of main work",
      "description": "Publication is enhanced with additional images or graphical content such as supplementary photographs that are not included in a primary or \u0091unenhanced\u0092 version",
      "a": 13,
      "b": 37.0,
      "c": null
    },
    "12": {
      "value": "Maps and/or other cartographic content",
      "description": null,
      "a": 12,
      "b": null,
      "c": null
    },
    "47": {
      "value": "Chemical content",
      "description": "Indicates that the publication contains chemical notations, formulae. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "48": {
      "value": "Mathematical content",
      "description": "Indicates that the publication contains mathematical notation, equations, formulae. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "46": {
      "value": "Decorative images or graphics",
      "description": "Publication contains visual content that is purely decorative and are not necessary to understanding of the content. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "42": {
      "value": "Assessment material",
      "description": "eg Questions or student exercises, problems, quizzes or tests (as an integral part of the work). Only for use in ONIX 3.0 or later",
      "a": 40,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Audiobook",
      "description": "Audio recording of a reading of a book or other text",
      "a": 1,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Performance \u0096 spoken word",
      "description": "Audio recording of a drama or other spoken word performance",
      "a": 1,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Other speech content",
      "description": "eg an interview, speech, lecture or commentary / discussion, not a \u0091reading\u0092 or \u0091performance\u0092)",
      "a": 12,
      "b": 53.0,
      "c": null
    },
    "03": {
      "value": "Music recording",
      "description": "Audio recording of a music performance, including musical drama and opera",
      "a": 1,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Other audio",
      "description": "Audio recording of other sound, eg birdsong, sound effects, ASMR material",
      "a": 2,
      "b": 62.0,
      "c": null
    },
    "49": {
      "value": "Images of text",
      "description": "At least some text \u0096 including text within other images \u0096 is \u0091text as an image\u0092 (ie a picture of text). Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Partial performance \u0096 spoken word",
      "description": "Audio recording of a reading, performance or dramatization of part of the work",
      "a": 13,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Additional audio content not part of main content",
      "description": "Product includes additional pre-recorded audio of any supplementary material such as full or partial reading, lecture, performance, dramatization, interview, background documentary or other audio content not included in the primary or \u0091unenhanced\u0092 version",
      "a": 13,
      "b": 62.0,
      "c": null
    },
    "23": {
      "value": "Promotional audio for other book product",
      "description": "eg Reading of teaser chapter",
      "a": 13,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Video",
      "description": "Includes Film, video, animation etc. Use only when no more detailed specification is provided. Formerly \u0091Moving images\u0092",
      "a": 2,
      "b": 13.0,
      "c": null
    },
    "26": {
      "value": "Video recording of a reading",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "50": {
      "value": "Video content without audio",
      "description": "Publication contains video material with no audio recording or narration (but may have music or textual subtitles) . Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Performance \u0096 visual",
      "description": "Video recording of a drama or other performance, including musical performance",
      "a": 13,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Animated / interactive illustrations",
      "description": "eg animated diagrams, charts, graphs or other illustrations (usually without sound)",
      "a": 13,
      "b": 66.0,
      "c": null
    },
    "25": {
      "value": "Narrative animation",
      "description": "eg cartoon, animatic or CGI animation (usually includes sound)",
      "a": 13,
      "b": 66.0,
      "c": null
    },
    "28": {
      "value": "Other video",
      "description": "Other video content eg interview, not a reading or performance",
      "a": 13,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Partial performance \u0096 video",
      "description": "Video recording of a reading, performance or dramatization of part of the work",
      "a": 13,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Additional video content not part of main work",
      "description": "E-publication is enhanced with video recording of full or partial reading, performance, dramatization, interview, background documentary or other content not included in the primary or \u0091unenhanced\u0092 version",
      "a": 13,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Promotional video for other book product",
      "description": "eg Book trailer",
      "a": 13,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Game / Puzzle",
      "description": "No multi-user functionality. Formerly just \u0091Game\u0092",
      "a": 2,
      "b": 13.0,
      "c": null
    },
    "32": {
      "value": "Contest",
      "description": "Includes some degree of multi-user functionality",
      "a": 13,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Software",
      "description": "Largely \u0091content free\u0092",
      "a": 2,
      "b": 13.0,
      "c": null
    },
    "09": {
      "value": "Data",
      "description": "Data files",
      "a": 2,
      "b": null,
      "c": null
    },
    "33": {
      "value": "Data set plus software",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "34": {
      "value": "Blank pages or spaces",
      "description": "Entire pages or blank spaces, forms, boxes, write-in pages etc, intended to be filled in by the reader",
      "a": 13,
      "b": 62.0,
      "c": null
    },
    "35": {
      "value": "Advertising content",
      "description": "Use only where type of advertising content is not stated",
      "a": 13,
      "b": null,
      "c": null
    },
    "37": {
      "value": "Advertising \u0096 first party",
      "description": "\u0091Back ads\u0092 \u0096 promotional content for other books (that does not include sample content of those books, cf codes 17, 23)",
      "a": 13,
      "b": 62.0,
      "c": null
    },
    "36": {
      "value": "Advertising \u0096 coupons",
      "description": "Eg to obtain discounts on other products",
      "a": 13,
      "b": null,
      "c": null
    },
    "38": {
      "value": "Advertising \u0096 third party display",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "39": {
      "value": "Advertising \u0096 third party textual",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "40": {
      "value": "Scripting",
      "description": "E-publication contains microprograms written (eg) in Javascript and executed within the reading system. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "43": {
      "value": "Scripted pop-ups",
      "description": "E-publication contains pop-ups or other functionality offering (eg) term definitions, cross-links or glossary entries [Note this should not include (eg) dictionary functionality that is part of the reading system.] Only for use in ONIX 3.0 or later",
      "a": 52,
      "b": null,
      "c": null
    },
    "44": {
      "value": "Sequential art",
      "description": "Or pictorial narrative, usually panel-based. Images displayed in a specific order for the purpose of graphic storytelling or giving information (eg graphic novels, comics and manga). May include text integrated into the image (as speech and thought bubbles, textual \u0091sound\u0092 effects, captions etc). Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    }
  },
  "82": {
    "AP": {
      "value": "Apocrypha (Catholic canon)",
      "description": "The seven portions of the Apocrypha added to the Catholic canon at the Council of Trent in 1546: Tobit; Judith; Wisdom of Solomon; Sirach (Ecclesiasticus); Baruch, including the Letter of Jeremiah; I and II Maccabees; Extra portions of Esther and Daniel (Additions to Esther; the Prayer of Azariah; Song of the Three Jews; Susannah; Bel and the Dragon). These are not generally included in the Protestant canon",
      "a": 1,
      "b": 8.0,
      "c": null
    },
    "AQ": {
      "value": "Apocrypha (canon unspecified)",
      "description": "A collection of Apocryphal texts, canon not specified",
      "a": 8,
      "b": null,
      "c": null
    },
    "AX": {
      "value": "Additional Apocryphal texts: Greek Orthodox canon",
      "description": "I Esdras; Prayer of Manasseh; Psalm 151; III Maccabees",
      "a": 5,
      "b": null,
      "c": null
    },
    "AY": {
      "value": "Additional Apocryphal texts: Slavonic Orthodox canon",
      "description": "I and II Esdras; Prayer of Manasseh; Psalm 151; III and IV Maccabees",
      "a": 5,
      "b": null,
      "c": null
    },
    "AZ": {
      "value": "Additional Apocryphal texts",
      "description": "Additional Apocryphal texts included in some Bible versions: I and II Esdras; Prayer of Manasseh",
      "a": 5,
      "b": null,
      "c": null
    },
    "GA": {
      "value": "General canon with Apocrypha (Catholic canon)",
      "description": "The 66 books included in the Protestant, Catholic and Orthodox canons, together with the seven portions of the Apocrypha included in the Catholic canon. (Equivalent to OT plus NT plus AP)",
      "a": 2,
      "b": 8.0,
      "c": null
    },
    "GC": {
      "value": "General canon with Apocryphal texts (canon unspecified)",
      "description": "The 66 books included in the Protestant, Catholic and Orthodox canons, together with Apocryphal texts, canon not specified. (Equivalent to OT plus NT plus AQ)",
      "a": 8,
      "b": null,
      "c": null
    },
    "GE": {
      "value": "General canon",
      "description": "The 66 books included in the Protestant, Catholic and Orthodox canons, 39 from the Old Testament and 27 from the New Testament. The sequence of books may differ in different canons. (Equivalent to OT plus NT)",
      "a": 1,
      "b": null,
      "c": null
    },
    "GS": {
      "value": "Gospels",
      "description": "The books of Matthew, Mark, Luke and John",
      "a": 1,
      "b": null,
      "c": null
    },
    "OT": {
      "value": "Old Testament",
      "description": "Those 39 books which were included in the Jewish canon by the rabbinical academy established at Jamma in 90 CE. Also known as the Jewish or Hebrew scriptures",
      "a": 1,
      "b": null,
      "c": null
    },
    "NT": {
      "value": "New Testament",
      "description": "The 27 books included in the Christian canon through the Easter Letter of Athanasius, Bishop of Alexandria and also by a general council of the Christian church held near the end of the 4th century CE",
      "a": 1,
      "b": null,
      "c": null
    },
    "NP": {
      "value": "New Testament with Psalms and Proverbs",
      "description": "Includes the 27 books of the New Testament plus Psalms and Proverbs from the Old Testament. Equivalent to NT plus PP)",
      "a": 1,
      "b": null,
      "c": null
    },
    "PE": {
      "value": "Paul\u0092s Epistles",
      "description": "The books containing the letters of Paul to the various early Christian churches",
      "a": 1,
      "b": null,
      "c": null
    },
    "PP": {
      "value": "Psalms and Proverbs",
      "description": "The book of Psalms and the book of Proverbs combined",
      "a": 1,
      "b": null,
      "c": null
    },
    "PS": {
      "value": "Psalms",
      "description": "The book of Psalms",
      "a": 5,
      "b": null,
      "c": null
    },
    "PT": {
      "value": "Pentateuch",
      "description": "The first five books of the Bible: Genesis, Exodus, Numbers, Leviticus, Deuteronomy. Also applied to the Torah",
      "a": 1,
      "b": null,
      "c": null
    },
    "ZZ": {
      "value": "Other portions",
      "description": "Selected books of either the OT or NT not otherwise noted",
      "a": 1,
      "b": null,
      "c": null
    }
  },
  "83": {
    "ALV": {
      "value": "Alberto Vaccari",
      "description": "Alberto Vaccari \u0096 Pontificio Istituto Biblico",
      "a": 7,
      "b": null,
      "c": null
    },
    "AMP": {
      "value": "Amplified",
      "description": "A translation based on the American Standard Version and showing multiple options for the translation of ancient text. Published in full in 1965. Sponsored by the Lockman Foundation",
      "a": 1,
      "b": null,
      "c": null
    },
    "ANM": {
      "value": "Antonio Martini",
      "description": "Most popular Catholic Bible translation in Italian prior to the CEI translation in 1971",
      "a": 7,
      "b": null,
      "c": null
    },
    "ASV": {
      "value": "American Standard",
      "description": "A 1901 translation using verbal equivalence techniques with the purpose of Americanizing the REV",
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "BLA": {
      "value": "Biblia de las Americas",
      "description": "(LBLA) Spanish translation by the Lockman Foundation, first published in 1986 and updated in 1995, 1997. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "BLB": {
      "value": "Nueva Biblia de las Americas",
      "description": "(NBLA) Updated Spanish translation by the Lockman Foundation, first published in 2005. Also known as Nueva Biblia Latinoamericana de Hoy (NBLH), Nueva Biblia de los Hispanos (NBH), and Nueva Biblia Latinoamericana (NBL). Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "CEB": {
      "value": "Common English Bible",
      "description": "2011 contemporary English translation of the Bible sponsored by the US-based Christian Resources Development Corporation. The translation includes Old Testament, Apocrypha and New Testament, and is aimed to be accessible to most English readers (minimum 7th grade reading age)",
      "a": 27,
      "b": null,
      "c": null
    },
    "CEI": {
      "value": "Conferenza Episcopale Italiana",
      "description": "Italian Episcopal Conference 1971 translation suitable for Italian Catholic liturgy. (Includes minor 1974 revision)",
      "a": 7,
      "b": 9.0,
      "c": null
    },
    "CEN": {
      "value": "Conferenza Episcopale Italiana 2008",
      "description": "New translation of the C.E.I. first published in 2008 \u0096 the version most widely used by the Italian Catholic Church",
      "a": 9,
      "b": null,
      "c": null
    },
    "CEV": {
      "value": "Contemporary English",
      "description": "A translation completed in 1995 and sponsored by the American Bible Society under the leadership of Barclay Newman",
      "a": 1,
      "b": null,
      "c": null
    },
    "CNC": {
      "value": "Concordata",
      "description": "1968 Interfaith version promoted by the Italian Bible Society. Has a Catholic \u0091imprimateur\u0092, but its ecumenical approach has Jewish, Protestant and Christian Orthodox approval",
      "a": 7,
      "b": null,
      "c": null
    },
    "DDI": {
      "value": "Diodati",
      "description": "Version based on original documents, edited by Giovanni Diodati in 1607, revised by Diodati in 1641 and again in 1894. It is the reference version for many Italian Protestants",
      "a": 7,
      "b": null,
      "c": null
    },
    "DDN": {
      "value": "Nuova Diodati",
      "description": "Revision of the Diodati Bible dating to the 1990s, aiming at highest fidelity to original ancient Greek (New Testament) and Hebrew (Old Testament) texts",
      "a": 7,
      "b": null,
      "c": null
    },
    "DOU": {
      "value": "Douay-Rheims",
      "description": "An early (1580-1609) English translation from the Latin Vulgate designed for Catholics and performed by George Martin",
      "a": 1,
      "b": null,
      "c": null
    },
    "EIN": {
      "value": "Einheits\u00fcbersetzung",
      "description": "A German translation of the Bible for use in Roman Catholic churches",
      "a": 7,
      "b": null,
      "c": null
    },
    "ESV": {
      "value": "English Standard",
      "description": "An update of the Revised Standard Version that makes \u0091modest\u0092 use of gender-free terminology",
      "a": 1,
      "b": null,
      "c": null
    },
    "FBB": {
      "value": "Biblia (1776)",
      "description": "Finnish Bible translation",
      "a": 8,
      "b": null,
      "c": null
    },
    "FRA": {
      "value": "Raamattu (1933/1938)",
      "description": "Finnish Bible translation",
      "a": 8,
      "b": null,
      "c": null
    },
    "FRK": {
      "value": "Raamattu kansalle",
      "description": "Finnish Bible translation",
      "a": 8,
      "b": null,
      "c": null
    },
    "FRM": {
      "value": "Raamattu (1992)",
      "description": "Finnish Bible translation",
      "a": 8,
      "b": null,
      "c": null
    },
    "GDW": {
      "value": "God\u0092s Word",
      "description": "A 1995 translation by the World Bible Publishing Company using the English language in a manner to communicate to the late 20th century American",
      "a": 1,
      "b": null,
      "c": null
    },
    "GEN": {
      "value": "Geneva",
      "description": "An early (1560) English version of the Bible translated by William Whittingham with strong Protestant leanings",
      "a": 1,
      "b": null,
      "c": null
    },
    "GNB": {
      "value": "Good News",
      "description": "A translation sponsored by the American Bible Society. The New Testament was first published (as \u0091Today\u0092s English Version\u0092 TEV) in 1966. The Old Testament was completed in 1976, and the whole was published as the \u0091Good News Bible\u0092",
      "a": 1,
      "b": null,
      "c": null
    },
    "GPR": {
      "value": "Galbiati, Penna, Rossano \u0096 UTET",
      "description": "Version edited by E. Galbiati, A. Penna and P. Rossano, and published by UTET. This version, based on original texts, is rich in notes and has been used as the basis for CEI translation",
      "a": 7,
      "b": null,
      "c": null
    },
    "GRK": {
      "value": "Original Greek",
      "description": "New Testament text in an original Greek version",
      "a": 1,
      "b": null,
      "c": null
    },
    "GRM": {
      "value": "Garofano, Rinaldi \u0096 Marietti",
      "description": "Richly annotated 1963 Version edited by S. Garofano and S. Rinaldi, and published by Marietti",
      "a": 7,
      "b": null,
      "c": null
    },
    "HBR": {
      "value": "Original Hebrew",
      "description": "Old Testament text in an original Hebrew version",
      "a": 1,
      "b": null,
      "c": null
    },
    "HCS": {
      "value": "Holman Christian Standard",
      "description": "Published by Broadman and Holman this translation rejects all forms of gender-neutral wording and is written with strong influences from the Southern Baptist perspective of biblical scholarship",
      "a": 1,
      "b": null,
      "c": null
    },
    "ICB": {
      "value": "International Children\u0092s",
      "description": "A translation completed in 1986 targeting readability at the US third grade level",
      "a": 1,
      "b": null,
      "c": null
    },
    "ILC": {
      "value": "Traduzione Interconfessionale in Lingua Corrente",
      "description": "Interconfessional translation resulting from 1985 effort by Catholic and Protestant scholars, aimed at delivering an easy-to-understand message",
      "a": 7,
      "b": null,
      "c": null
    },
    "JER": {
      "value": "Jerusalem",
      "description": "A translation designed for English speaking Catholics based on the original languages. It is based on French as well as ancient texts and was first published in 1966",
      "a": 1,
      "b": null,
      "c": null
    },
    "KJV": {
      "value": "King James",
      "description": "A translation commissioned by King James I of England and first published in 1611",
      "a": 1,
      "b": null,
      "c": null
    },
    "KJT": {
      "value": "21st Century King James",
      "description": "A verbal translation led by William Prindele. Published in 1994, it was designed to modernize the language of the King James Version based on Webster\u0092s New International Dictionary, 2nd edition, unabridged",
      "a": 1,
      "b": null,
      "c": null
    },
    "LVB": {
      "value": "Living Bible",
      "description": "A paraphrase translation led by Kenneth N Taylor and first published in 1972",
      "a": 1,
      "b": null,
      "c": null
    },
    "LZZ": {
      "value": "Luzzi",
      "description": "1924 translation by Giovanni Luzzi, Professor at the Waldensian Faculty of Theology in Rome, who revised the 17th Century Diodati version",
      "a": 7,
      "b": null,
      "c": null
    },
    "MSG": {
      "value": "Message Bible",
      "description": "A paraphrase translation of the New Testament by Eugene Peterson first published in 1993",
      "a": 1,
      "b": null,
      "c": null
    },
    "NAB": {
      "value": "New American",
      "description": "A translation aimed at Catholic readers first published in its entirety in 1970. A revised New Testament was issued in 1986 as the 2nd Edition. The 3rd Edtion was published in 1991 with a revision to Psalms. The 4th Edition (also known as the New American Bible Revised Edition) was published in 2011, incorporating revisions to the Old Testament",
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "NAS": {
      "value": "New American Standard",
      "description": "A translation commissioned by the Lockman Foundation. The New Testament was published in 1960 followed by the entire Bible in 1971",
      "a": 1,
      "b": null,
      "c": null
    },
    "NAU": {
      "value": "New American Standard, Updated",
      "description": "A 1995 translation using more modern language than the NASB",
      "a": 1,
      "b": null,
      "c": null
    },
    "NBA": {
      "value": "Bibelen 1895",
      "description": "Norwegian Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "NBB": {
      "value": "Bibelen 1930",
      "description": "Norwegian Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "NBC": {
      "value": "Bibelen 1938",
      "description": "Norwegian Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "NBD": {
      "value": "Bibelen 1978-85",
      "description": "Norwegian Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "NBE": {
      "value": "Bibelen 1978",
      "description": "Norwegian Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "NBF": {
      "value": "Bibelen 1985",
      "description": "Norwegian Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "NBG": {
      "value": "Norsk Bibel 88",
      "description": "Norwegian Bible translation",
      "a": 6,
      "b": 64.0,
      "c": null
    },
    "NBH": {
      "value": "Bibelen 1978-85/rev. 2005",
      "description": "Norwegian Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "NBI": {
      "value": "Bibelen 2011",
      "description": "Norwegian Bible translation",
      "a": 17,
      "b": null,
      "c": null
    },
    "NBJ": {
      "value": "Norsk Bibel 88/rev. 2007",
      "description": "Norwegian Bible translation. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "NBK": {
      "value": "Fauskanger 2015",
      "description": "Norwegian Bible translation with commentary. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "NBL": {
      "value": "Bibelen 2011/rev. 2024",
      "description": "Norwegian Bible translation, 2024 update of Bibelen 2011. Only for use in ONIX 3.0 or later",
      "a": 65,
      "b": null,
      "c": null
    },
    "NBP": {
      "value": "Pollestad 2023",
      "description": "Norwegian Bible translation. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "NCV": {
      "value": "New Century",
      "description": "A translation inspired by the International Children\u0092s version. First published by World Publishing in 1991",
      "a": 1,
      "b": null,
      "c": null
    },
    "NEB": {
      "value": "New English",
      "description": "A translation first issued in 1961 (New Testament) and 1970 (complete Bible) as a result of a proposal at the 1946 General Assembly of the Church of Scotland",
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "NGO": {
      "value": "Bibelen Guds ord",
      "description": "Norwegian Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "NIV": {
      "value": "New International",
      "description": "A translation underwritten by Biblica (formerly the International Bible Society, and previously the New York Bible Society). The New Testament was published in 1973 followed by the entire Bible in 1978. The NIV text was revised in 1984 and again in 2011",
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "NIR": {
      "value": "New International Reader\u0092s",
      "description": "A 1996 translation designed for people with limited literacy in English and based on the NIV",
      "a": 1,
      "b": null,
      "c": null
    },
    "NJB": {
      "value": "New Jerusalem",
      "description": "A revision of the Jerusalem Bible. First published in 1986",
      "a": 1,
      "b": null,
      "c": null
    },
    "NKJ": {
      "value": "New King James",
      "description": "A version issued by Thomas Nelson Publishers in 1982-83 designed to update the language of the King James Version while maintaining the phrasing and rhythm and using the same sources as its predecessor",
      "a": 1,
      "b": null,
      "c": null
    },
    "NNK": {
      "value": "Bibelen, nynorsk",
      "description": "Norwegian \u0091nynorsk\u0092 Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "NLV": {
      "value": "New Living",
      "description": "A translation sponsored by Tyndale House and first released in 1996. It is considered a revision and updating of the Living Bible",
      "a": 1,
      "b": null,
      "c": null
    },
    "NRS": {
      "value": "New Revised Standard",
      "description": "A revision of the Revised Standard based on ancient texts but updating language to American usage of the 1980s",
      "a": 1,
      "b": null,
      "c": null
    },
    "NTV": {
      "value": "Nueva Traducci\u00f3n Viviente",
      "description": "A Spanish translation from the original Greek and Hebrew, sponsored by Tyndale House",
      "a": 10,
      "b": null,
      "c": null
    },
    "NVB": {
      "value": "Novissima Versione della Bibbia",
      "description": "Nuovissima version \u0096 a Catholic-oriented translation in modern Italian, edited by a group including Carlo Martini, Gianfranco Ravasi and Ugo Vanni and first published (in 48 volumes, 1967-1980) by Edizioni San Paolo",
      "a": 7,
      "b": null,
      "c": null
    },
    "NVD": {
      "value": "Nueva Biblia al Dia",
      "description": "A Spanish translation from the original Greek and Hebrew, sponsored by the International Bible Society/Sociedad B\u00edblica Internacional",
      "a": 10,
      "b": null,
      "c": null
    },
    "NVI": {
      "value": "Nueva Version Internacional",
      "description": "A Spanish translation underwritten by the International Bible Society",
      "a": 1,
      "b": null,
      "c": null
    },
    "PHP": {
      "value": "New Testament in Modern English (Phillips)",
      "description": "An idiomatic translation by J B Phillips, first completed in 1966",
      "a": 1,
      "b": null,
      "c": null
    },
    "REB": {
      "value": "Revised English",
      "description": "A 1989 revision of the NEB. A significant effort was made to reduce the British flavor present in the NEB",
      "a": 1,
      "b": null,
      "c": null
    },
    "REV": {
      "value": "Revised Version",
      "description": "The first major revision of the King James Version, the Revised Version incorporates insights from early manuscripts discovered between 1611 and 1870, and corrects readings in the KJV which nineteenth-century scholarship deemed mistaken. The New Testament was published in 1881, the Old Testament in 1885, and the Apocrypha in 1895",
      "a": 5,
      "b": null,
      "c": null
    },
    "RSV": {
      "value": "Revised Standard",
      "description": "A translation authorized by the National Council of Churches of Christ in the USA. The New Testament was published in 1946 followed by a complete Protestant canon in 1951",
      "a": 1,
      "b": null,
      "c": null
    },
    "RVL": {
      "value": "Reina Valera",
      "description": "A Spanish translation based on the original texts",
      "a": 1,
      "b": null,
      "c": null
    },
    "SBB": {
      "value": "Bibel 2000",
      "description": "Swedish Bible translation",
      "a": 8,
      "b": null,
      "c": null
    },
    "SMK": {
      "value": "Bibelen, samisk",
      "description": "Norwegian \u0091samisk\u0092 Bible translation",
      "a": 6,
      "b": null,
      "c": null
    },
    "TEV": {
      "value": "Today\u0092s English",
      "description": "A translation of the New Testament sponsored by the American Bible Society and first published in 1966. It was incorporated into the \u0091Good News Bible\u0092 (GNB) in 1976",
      "a": 1,
      "b": null,
      "c": null
    },
    "TNI": {
      "value": "Today\u0092s New International",
      "description": "An updating of the New International Version. The New Testament was published in 2002, and the entire Bible in 2005. Superseded by the 2011 NIV update",
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "ZZZ": {
      "value": "Other",
      "description": "Other translations not otherwise noted",
      "a": 1,
      "b": null,
      "c": null
    }
  },
  "84": {
    "CAM": {
      "value": "Cambridge Annotated",
      "description": "Contains the work of Howard Clark Kee including a summary of the development of the canon, introductions to the books, notes and cross references. Originally published in 1993, NRSV",
      "a": 1,
      "b": null,
      "c": null
    },
    "LIF": {
      "value": "Life Application",
      "description": "A project of Tyndale House Publishers and Zondervan intended to help readers apply the Bible to daily living. Living Bible, King James, New International, NASB",
      "a": 1,
      "b": null,
      "c": null
    },
    "MAC": {
      "value": "Macarthur",
      "description": "A King James version study Bible with notes by James Macarthur first published in 1997",
      "a": 1,
      "b": null,
      "c": null
    },
    "OXF": {
      "value": "Oxford Annotated",
      "description": "A study Bible originally published in the 1960s and based on the RSV / NRSV",
      "a": 1,
      "b": null,
      "c": null
    },
    "NNT": {
      "value": "Studiebibel, Det Nye testamentet",
      "description": "Norwegian study Bible, New Testament",
      "a": 6,
      "b": null,
      "c": null
    },
    "NOX": {
      "value": "New Oxford Annotated",
      "description": "Published in 1991 and based on the New Revised Standard version",
      "a": 1,
      "b": null,
      "c": null
    },
    "NSB": {
      "value": "Norsk studiebibel",
      "description": "Norwegian study Bible",
      "a": 6,
      "b": null,
      "c": null
    },
    "RYR": {
      "value": "Ryrie",
      "description": "Based on the work of Charles C. Ryrie. King James, NI, NASB",
      "a": 1,
      "b": null,
      "c": null
    },
    "SCO": {
      "value": "Scofield",
      "description": "A study Bible based on the early 20th century work of C.I. Scofield. Based on the King James version",
      "a": 1,
      "b": null,
      "c": null
    },
    "SPR": {
      "value": "Spirit Filled",
      "description": "A transdenominational study Bible for persons from the Pentecostal/Charismatic traditions",
      "a": 1,
      "b": null,
      "c": null
    }
  },
  "85": {
    "AW": {
      "value": "Award",
      "description": "A Bible (or selected Biblical text) designed for presentation from a religious organization",
      "a": 1,
      "b": null,
      "c": null
    },
    "BB": {
      "value": "Baby",
      "description": "A Bible (or selected Biblical text) designed to be a gift to commemorate a child\u0092s birth",
      "a": 1,
      "b": null,
      "c": null
    },
    "BR": {
      "value": "Bride",
      "description": "A special gift Bible (or selected Biblical text) designed for the bride on her wedding day. Usually white",
      "a": 1,
      "b": null,
      "c": null
    },
    "CF": {
      "value": "Confirmation",
      "description": "A Bible (or selected Biblical text) designed to be used in the confirmation reading or as a gift to a confirmand",
      "a": 6,
      "b": null,
      "c": null
    },
    "CH": {
      "value": "Children\u0092s",
      "description": "A text Bible (or selected Biblical text) designed in presentation and readability for a child",
      "a": 1,
      "b": null,
      "c": null
    },
    "CM": {
      "value": "Compact",
      "description": "A small Bible (or selected Biblical text) with a trim height of five inches or less",
      "a": 1,
      "b": null,
      "c": null
    },
    "CR": {
      "value": "Cross-reference",
      "description": "A Bible (or selected Biblical text) which includes text conveying cross-references to related scripture passages",
      "a": 1,
      "b": null,
      "c": null
    },
    "DR": {
      "value": "Daily readings",
      "description": "A Bible (or selected Biblical text) laid out to provide readings for each day of the year",
      "a": 1,
      "b": null,
      "c": null
    },
    "DV": {
      "value": "Devotional",
      "description": "A Bible (or selected Biblical text) containing devotional content together with the scripture",
      "a": 1,
      "b": null,
      "c": null
    },
    "FM": {
      "value": "Family",
      "description": "A Bible (or selected Biblical text) containing family record pages and/or additional study material for family devotion",
      "a": 1,
      "b": null,
      "c": null
    },
    "GT": {
      "value": "General/Text",
      "description": "A standard Bible (or selected Biblical text) of any version with no distinguishing characteristics beyond the canonical text",
      "a": 1,
      "b": null,
      "c": null
    },
    "GF": {
      "value": "Gift",
      "description": "A Bible (or selected Biblical text) designed for gift or presentation, often including a presentation page",
      "a": 1,
      "b": null,
      "c": null
    },
    "LP": {
      "value": "Lectern/Pulpit",
      "description": "A large Bible (or selected Biblical text) with large print designed for use in reading scriptures in public worship from either the pulpit or lectern",
      "a": 1,
      "b": null,
      "c": null
    },
    "MN": {
      "value": "Men\u0092s",
      "description": "A Bible (or selected Biblical text) especially designed with helps and study guides oriented to the adult male",
      "a": 1,
      "b": null,
      "c": null
    },
    "PS": {
      "value": "Primary school",
      "description": "A Bible (or selected Biblical text) designed for use in primary school",
      "a": 6,
      "b": null,
      "c": null
    },
    "PW": {
      "value": "Pew",
      "description": "Usually inexpensive but sturdy, a Bible (or selected Biblical text) designed for use in church pews",
      "a": 1,
      "b": null,
      "c": null
    },
    "SC": {
      "value": "Scholarly",
      "description": "A Bible (or selected Biblical text) including texts in Greek and/or Hebrew and designed for scholarly study",
      "a": 1,
      "b": null,
      "c": null
    },
    "SL": {
      "value": "Slimline",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "ST": {
      "value": "Student",
      "description": "A Bible (or selected Biblical text) with study articles and helps especially for use in the classroom",
      "a": 1,
      "b": null,
      "c": null
    },
    "SU": {
      "value": "Study",
      "description": "A Bible (or selected Biblical text) with many extra features, e.g. book introductions, dictionary, concordance, references, maps, etc., to help readers better understand the scripture",
      "a": 1,
      "b": null,
      "c": null
    },
    "WG": {
      "value": "Wedding gift",
      "description": "A special gift Bible (or selected Biblical text) designed as a gift to the couple on their wedding day",
      "a": 6,
      "b": null,
      "c": null
    },
    "WM": {
      "value": "Women\u0092s",
      "description": "A devotional or study Bible (or selected Biblical text) with helps targeted at the adult woman",
      "a": 1,
      "b": null,
      "c": null
    },
    "YT": {
      "value": "Youth",
      "description": "A Bible (or selected Biblical text) containing special study and devotional helps designed specifically for the needs of teenagers",
      "a": 1,
      "b": null,
      "c": null
    }
  },
  "86": {
    "CHR": {
      "value": "Chronological",
      "description": "A Bible with the text organized in the order in which events are believed to have happened",
      "a": 1,
      "b": null,
      "c": null
    },
    "CHA": {
      "value": "Chain reference",
      "description": "A Bible which explores keywords or themes by referring text to preceding or following text",
      "a": 1,
      "b": null,
      "c": null
    },
    "INT": {
      "value": "Interlinear",
      "description": "A Bible or other text in which different versions are printed one line above the other, so that the variations can easily be detected",
      "a": 1,
      "b": null,
      "c": null
    },
    "PAR": {
      "value": "Parallel",
      "description": "A Bible with two or more versions printed side by side",
      "a": 1,
      "b": null,
      "c": null
    },
    "STN": {
      "value": "Standard",
      "description": "A Bible in which the text is presented in the traditional order",
      "a": 1,
      "b": null,
      "c": null
    }
  },
  "87": {
    "CCL": {
      "value": "Center column",
      "description": "References are printed in a narrow column in the center of the page between two columns of text",
      "a": 1,
      "b": null,
      "c": null
    },
    "PGE": {
      "value": "Page end",
      "description": "References are printed at the foot of the page",
      "a": 1,
      "b": null,
      "c": null
    },
    "SID": {
      "value": "Side column",
      "description": "References are printed in a column to the side of the scripture",
      "a": 1,
      "b": null,
      "c": null
    },
    "VER": {
      "value": "Verse end",
      "description": "References are printed at the end of the applicable verse",
      "a": 1,
      "b": null,
      "c": null
    },
    "UNK": {
      "value": "Unknown",
      "description": "The person creating the ONIX record does not know where the references are located",
      "a": 1,
      "b": null,
      "c": null
    },
    "ZZZ": {
      "value": "Other",
      "description": "Other locations not otherwise identified",
      "a": 1,
      "b": null,
      "c": null
    }
  },
  "89": {
    "01": {
      "value": "Church season or activity",
      "description": "A church season or activity for which a religious text is intended. Religious text feature code must be taken from List 90",
      "a": 7,
      "b": null,
      "c": null
    }
  },
  "90": {
    "01": {
      "value": "Academic year",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Catechistic year",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Liturgical year",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Advent and Christmas",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Blessings",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Scholastic cycles",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Confirmation and Holy Communion",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Summer activites",
      "description": "For example, summer camps and other youth recreational activities: use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Easter",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Lent",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Marian themes",
      "description": "Use with code 01 in <ReligiousTextFeatureType>",
      "a": 7,
      "b": null,
      "c": null
    }
  },
  "91": {
    "AD": {
      "value": "Andorra",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AE": {
      "value": "United Arab Emirates",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AF": {
      "value": "Afghanistan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AG": {
      "value": "Antigua and Barbuda",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AI": {
      "value": "Anguilla",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AL": {
      "value": "Albania",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AM": {
      "value": "Armenia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AN": {
      "value": "Netherlands Antilles",
      "description": "Deprecated \u0096 use BQ, CW and SX as appropriate",
      "a": 0,
      "b": 13.0,
      "c": 13.0
    },
    "AO": {
      "value": "Angola",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AQ": {
      "value": "Antarctica",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AR": {
      "value": "Argentina",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AS": {
      "value": "American Samoa",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AT": {
      "value": "Austria",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AU": {
      "value": "Australia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AW": {
      "value": "Aruba",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AX": {
      "value": "\u00c5land Islands",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "AZ": {
      "value": "Azerbaijan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BA": {
      "value": "Bosnia and Herzegovina",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BB": {
      "value": "Barbados",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BD": {
      "value": "Bangladesh",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BE": {
      "value": "Belgium",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BF": {
      "value": "Burkina Faso",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BG": {
      "value": "Bulgaria",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BH": {
      "value": "Bahrain",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BI": {
      "value": "Burundi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BJ": {
      "value": "Benin",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BL": {
      "value": "Saint Barth\u00e9lemy",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "BM": {
      "value": "Bermuda",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BN": {
      "value": "Brunei Darussalam",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BO": {
      "value": "Bolivia, Plurinational State of",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BQ": {
      "value": "Bonaire, Sint Eustatius and Saba",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "BR": {
      "value": "Brazil",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BS": {
      "value": "Bahamas",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BT": {
      "value": "Bhutan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BV": {
      "value": "Bouvet Island",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BW": {
      "value": "Botswana",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BY": {
      "value": "Belarus",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "BZ": {
      "value": "Belize",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CA": {
      "value": "Canada",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CC": {
      "value": "Cocos (Keeling) Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CD": {
      "value": "Congo, Democratic Republic of the",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CF": {
      "value": "Central African Republic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CG": {
      "value": "Congo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CH": {
      "value": "Switzerland",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CI": {
      "value": "Cote d\u0092Ivoire",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CK": {
      "value": "Cook Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CL": {
      "value": "Chile",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CM": {
      "value": "Cameroon",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CN": {
      "value": "China",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CO": {
      "value": "Colombia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CR": {
      "value": "Costa Rica",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CS": {
      "value": "Serbia and Montenegro",
      "description": "Deprecated, replaced by ME \u0096 Montenegro and RS \u0096 Serbia",
      "a": 4,
      "b": 7.0,
      "c": 7.0
    },
    "CU": {
      "value": "Cuba",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CV": {
      "value": "Cabo Verde",
      "description": null,
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "CW": {
      "value": "Cura\u00e7ao",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "CX": {
      "value": "Christmas Island",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CY": {
      "value": "Cyprus",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CZ": {
      "value": "Czechia",
      "description": "Formerly Czech Republic",
      "a": 0,
      "b": 38.0,
      "c": null
    },
    "DE": {
      "value": "Germany",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "DJ": {
      "value": "Djibouti",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "DK": {
      "value": "Denmark",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "DM": {
      "value": "Dominica",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "DO": {
      "value": "Dominican Republic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "DZ": {
      "value": "Algeria",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "EC": {
      "value": "Ecuador",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "EE": {
      "value": "Estonia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "EG": {
      "value": "Egypt",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "EH": {
      "value": "Western Sahara",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ER": {
      "value": "Eritrea",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ES": {
      "value": "Spain",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ET": {
      "value": "Ethiopia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "FI": {
      "value": "Finland",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "FJ": {
      "value": "Fiji",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "FK": {
      "value": "Falkland Islands (Malvinas)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "FM": {
      "value": "Micronesia, Federated States of",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "FO": {
      "value": "Faroe Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "FR": {
      "value": "France",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GA": {
      "value": "Gabon",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GB": {
      "value": "United Kingdom",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GD": {
      "value": "Grenada",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GE": {
      "value": "Georgia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GF": {
      "value": "French Guiana",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GG": {
      "value": "Guernsey",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "GH": {
      "value": "Ghana",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GI": {
      "value": "Gibraltar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GL": {
      "value": "Greenland",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GM": {
      "value": "Gambia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GN": {
      "value": "Guinea",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GP": {
      "value": "Guadeloupe",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GQ": {
      "value": "Equatorial Guinea",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GR": {
      "value": "Greece",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GS": {
      "value": "South Georgia and the South Sandwich Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GT": {
      "value": "Guatemala",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GU": {
      "value": "Guam",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GW": {
      "value": "Guinea-Bissau",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "GY": {
      "value": "Guyana",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "HK": {
      "value": "Hong Kong",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "HM": {
      "value": "Heard Island and McDonald Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "HN": {
      "value": "Honduras",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "HR": {
      "value": "Croatia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "HT": {
      "value": "Haiti",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "HU": {
      "value": "Hungary",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ID": {
      "value": "Indonesia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "IE": {
      "value": "Ireland",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "IL": {
      "value": "Israel",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "IM": {
      "value": "Isle of Man",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "IN": {
      "value": "India",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "IO": {
      "value": "British Indian Ocean Territory",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "IQ": {
      "value": "Iraq",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "IR": {
      "value": "Iran, Islamic Republic of",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "IS": {
      "value": "Iceland",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "IT": {
      "value": "Italy",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "JE": {
      "value": "Jersey",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "JM": {
      "value": "Jamaica",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "JO": {
      "value": "Jordan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "JP": {
      "value": "Japan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KE": {
      "value": "Kenya",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KG": {
      "value": "Kyrgyzstan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KH": {
      "value": "Cambodia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KI": {
      "value": "Kiribati",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KM": {
      "value": "Comoros",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KN": {
      "value": "Saint Kitts and Nevis",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KP": {
      "value": "Korea, Democratic People\u0092s Republic of",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KR": {
      "value": "Korea, Republic of",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KW": {
      "value": "Kuwait",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KY": {
      "value": "Cayman Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "KZ": {
      "value": "Kazakhstan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LA": {
      "value": "Lao People\u0092s Democratic Republic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LB": {
      "value": "Lebanon",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LC": {
      "value": "Saint Lucia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LI": {
      "value": "Liechtenstein",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LK": {
      "value": "Sri Lanka",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LR": {
      "value": "Liberia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LS": {
      "value": "Lesotho",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LT": {
      "value": "Lithuania",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LU": {
      "value": "Luxembourg",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LV": {
      "value": "Latvia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "LY": {
      "value": "Libya",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MA": {
      "value": "Morocco",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MC": {
      "value": "Monaco",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MD": {
      "value": "Moldova, Republic of",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ME": {
      "value": "Montenegro",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "MF": {
      "value": "Saint Martin (French part)",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "MG": {
      "value": "Madagascar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MH": {
      "value": "Marshall Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MK": {
      "value": "North Macedonia",
      "description": "Formerly FYR Macedonia",
      "a": 0,
      "b": 46.0,
      "c": null
    },
    "ML": {
      "value": "Mali",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MM": {
      "value": "Myanmar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MN": {
      "value": "Mongolia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MO": {
      "value": "Macao",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MP": {
      "value": "Northern Mariana Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MQ": {
      "value": "Martinique",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MR": {
      "value": "Mauritania",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MS": {
      "value": "Montserrat",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MT": {
      "value": "Malta",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MU": {
      "value": "Mauritius",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MV": {
      "value": "Maldives",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MW": {
      "value": "Malawi",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MX": {
      "value": "Mexico",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MY": {
      "value": "Malaysia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MZ": {
      "value": "Mozambique",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "null": {
      "value": "Namibia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NC": {
      "value": "New Caledonia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NE": {
      "value": "Niger",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NF": {
      "value": "Norfolk Island",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NG": {
      "value": "Nigeria",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NI": {
      "value": "Nicaragua",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NL": {
      "value": "Netherlands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NO": {
      "value": "Norway",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NP": {
      "value": "Nepal",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NR": {
      "value": "Nauru",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NU": {
      "value": "Niue",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "NZ": {
      "value": "New Zealand",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "OM": {
      "value": "Oman",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PA": {
      "value": "Panama",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PE": {
      "value": "Peru",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PF": {
      "value": "French Polynesia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PG": {
      "value": "Papua New Guinea",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PH": {
      "value": "Philippines",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PK": {
      "value": "Pakistan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PL": {
      "value": "Poland",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PM": {
      "value": "Saint Pierre and Miquelon",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PN": {
      "value": "Pitcairn",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PR": {
      "value": "Puerto Rico",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PS": {
      "value": "Palestine, State of",
      "description": null,
      "a": 0,
      "b": 21.0,
      "c": null
    },
    "PT": {
      "value": "Portugal",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PW": {
      "value": "Palau",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PY": {
      "value": "Paraguay",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "QA": {
      "value": "Qatar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "RE": {
      "value": "R\u00e9union",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "RO": {
      "value": "Romania",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "RS": {
      "value": "Serbia",
      "description": null,
      "a": 7,
      "b": null,
      "c": null
    },
    "RU": {
      "value": "Russian Federation",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "RW": {
      "value": "Rwanda",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SA": {
      "value": "Saudi Arabia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SB": {
      "value": "Solomon Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SC": {
      "value": "Seychelles",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SD": {
      "value": "Sudan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SE": {
      "value": "Sweden",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SG": {
      "value": "Singapore",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SH": {
      "value": "Saint Helena, Ascension and Tristan da Cunha",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SI": {
      "value": "Slovenia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SJ": {
      "value": "Svalbard and Jan Mayen",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SK": {
      "value": "Slovakia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SL": {
      "value": "Sierra Leone",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SM": {
      "value": "San Marino",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SN": {
      "value": "Senegal",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SO": {
      "value": "Somalia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SR": {
      "value": "Suriname",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SS": {
      "value": "South Sudan",
      "description": null,
      "a": 15,
      "b": null,
      "c": null
    },
    "ST": {
      "value": "Sao Tome and Principe",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SV": {
      "value": "El Salvador",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SX": {
      "value": "Sint Maarten (Dutch part)",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "SY": {
      "value": "Syrian Arab Republic",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "SZ": {
      "value": "Eswatini",
      "description": "Formerly known as Swaziland",
      "a": 0,
      "b": 43.0,
      "c": null
    },
    "TC": {
      "value": "Turks and Caicos Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TD": {
      "value": "Chad",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TF": {
      "value": "French Southern Territories",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TG": {
      "value": "Togo",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TH": {
      "value": "Thailand",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TJ": {
      "value": "Tajikistan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TK": {
      "value": "Tokelau",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TL": {
      "value": "Timor-Leste",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TM": {
      "value": "Turkmenistan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TN": {
      "value": "Tunisia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TO": {
      "value": "Tonga",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TR": {
      "value": "T\u00fcrkiye",
      "description": "Formerly known as Turkey",
      "a": 0,
      "b": 58.0,
      "c": null
    },
    "TT": {
      "value": "Trinidad and Tobago",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TV": {
      "value": "Tuvalu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TW": {
      "value": "Taiwan, Province of China",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "TZ": {
      "value": "Tanzania, United Republic of",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "UA": {
      "value": "Ukraine",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "UG": {
      "value": "Uganda",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "UM": {
      "value": "United States Minor Outlying Islands",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "US": {
      "value": "United States",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "UY": {
      "value": "Uruguay",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "UZ": {
      "value": "Uzbekistan",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "VA": {
      "value": "Holy See (Vatican City State)",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "VC": {
      "value": "Saint Vincent and the Grenadines",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "VE": {
      "value": "Venezuela, Bolivarian Republic of",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "VG": {
      "value": "Virgin Islands, British",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "VI": {
      "value": "Virgin Islands, US",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "VN": {
      "value": "Viet Nam",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "VU": {
      "value": "Vanuatu",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "WF": {
      "value": "Wallis and Futuna",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "WS": {
      "value": "Samoa",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "YE": {
      "value": "Yemen",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "YT": {
      "value": "Mayotte",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "YU": {
      "value": "Yugoslavia",
      "description": "Deprecated, replaced by ME \u0096 Montenegro and RS \u0096 Serbia",
      "a": 0,
      "b": 7.0,
      "c": 4.0
    },
    "ZA": {
      "value": "South Africa",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ZM": {
      "value": "Zambia",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ZW": {
      "value": "Zimbabwe",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    }
  },
  "92": {
    "01": {
      "value": "Proprietary",
      "description": "Note that <IDTypeName> is required with proprietary identifiers",
      "a": 11,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Proprietary",
      "description": "Deprecated \u0096 use code 01",
      "a": 1,
      "b": 11.0,
      "c": 11.0
    },
    "04": {
      "value": "B\u00f6rsenverein Verkehrsnummer",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "05": {
      "value": "German ISBN Agency publisher identifier",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "06": {
      "value": "GLN",
      "description": "GS1 global location number (formerly EAN location number)",
      "a": 1,
      "b": 9.0,
      "c": null
    },
    "07": {
      "value": "SAN",
      "description": "Book trade Standard Address Number \u0096 US, UK etc",
      "a": 1,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Distributeurscode Boekenbank",
      "description": "Flemish supplier code",
      "a": 7,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Fondscode Boekenbank",
      "description": "Flemish publisher code",
      "a": 7,
      "b": null,
      "c": null
    },
    "16": {
      "value": "ISNI",
      "description": "International Standard Name Identifier (used here to identify an organization). Only for use in ONIX 3.0 or later. See https://isni.org/",
      "a": 57,
      "b": null,
      "c": null
    },
    "23": {
      "value": "VAT Identity Number",
      "description": "Identifier for a business organization for VAT purposes, eg within the EU\u0092s VIES system. See http://ec.europa.eu/taxation_customs/vies/faqvies.do for EU VAT ID formats, which vary from country to country. Generally these consist of a two-letter country code followed by the 8\u009612 digits of the national VAT ID. Some countries include one or two letters within their VAT ID. See http://en.wikipedia.org/wiki/VAT_identification_number for non-EU countries that maintain similar identifiers. Spaces, dashes etc should be omitted",
      "a": 16,
      "b": null,
      "c": null
    }
  },
  "93": {
    "00": {
      "value": "Unspecified",
      "description": "Default",
      "a": 1,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Publisher to resellers",
      "description": "Publisher as supplier to retail trade outlets",
      "a": 1,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Publisher\u0092s exclusive distributor to resellers",
      "description": null,
      "a": 1,
      "b": 9.0,
      "c": null
    },
    "03": {
      "value": "Publisher\u0092s non-exclusive distributor to resellers",
      "description": null,
      "a": 1,
      "b": 9.0,
      "c": null
    },
    "04": {
      "value": "Wholesaler to retailers",
      "description": "Wholesaler supplying retail trade outlets",
      "a": 1,
      "b": 9.0,
      "c": null
    },
    "05": {
      "value": "Sales agent",
      "description": "Deprecated \u0096 use <MarketRepresentation> (ONIX 2.1) or <MarketPublishingDetail> (ONIX 3.0 or later) to specify a sales agent",
      "a": 1,
      "b": 5.0,
      "c": 5.0
    },
    "06": {
      "value": "Publisher\u0092s distributor to retailers",
      "description": "In a specified supply territory. Use only where exclusive/non-exclusive status is not known. Prefer 02 or 03 as appropriate, where possible",
      "a": 6,
      "b": 9.0,
      "c": null
    },
    "07": {
      "value": "POD supplier",
      "description": "Where a POD product is supplied to retailers and/or consumers direct from a POD source",
      "a": 6,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Retailer",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Publisher to end-customers",
      "description": "Publisher as supplier direct to consumers and/or institutional customers",
      "a": 9,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Exclusive distributor to end-customers",
      "description": "Intermediary as exclusive distributor direct to consumers and/or institutional customers",
      "a": 9,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Non-exclusive distributor to end-customers",
      "description": "Intermediary as non-exclusive distributor direct to consumers and/or institutional customers",
      "a": 9,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Distributor to end-customers",
      "description": "Use only where exclusive/non-exclusive status is not known. Prefer 10 or 11 as appropriate, where possible",
      "a": 9,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Exclusive distributor to resellers and end-customers",
      "description": "Intermediary as exclusive distributor to retailers and direct to consumers and/or institutional customers. Only for use in ONIX 3.0 or later",
      "a": 37,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Non-exclusive distributor to resellers and end-customers",
      "description": "Intermediary as non-exclusive distributor to retailers and direct to consumers and/or institutional customers. Only for use in ONIX 3.0 or later",
      "a": 37,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Distributor to resellers and end-customers",
      "description": "Use only where exclusive/non-exclusive status is not known. Prefer codes 13 or 14 as appropriate whenever possible. Only for use in ONIX 3.0 or later",
      "a": 37,
      "b": null,
      "c": null
    }
  },
  "96": {
    "AED": {
      "value": "UAE Dirham",
      "description": "United Arab Emirates",
      "a": 0,
      "b": null,
      "c": null
    },
    "AFA": {
      "value": "Afghani",
      "description": "Afghanistan. Deprecated, replaced by AFN",
      "a": 0,
      "b": 4.0,
      "c": 4.0
    },
    "AFN": {
      "value": "Afghani",
      "description": "Afghanistan (prices normally quoted as integers)",
      "a": 4,
      "b": 27.0,
      "c": null
    },
    "ALL": {
      "value": "Lek",
      "description": "Albania (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "AMD": {
      "value": "Armenian Dram",
      "description": "Armenia (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "ANG": {
      "value": "Netherlands Antillian Guilder",
      "description": "Cura\u00e7ao, Sint Maarten",
      "a": 0,
      "b": 17.0,
      "c": null
    },
    "AOA": {
      "value": "Kwanza",
      "description": "Angola",
      "a": 0,
      "b": null,
      "c": null
    },
    "ARS": {
      "value": "Argentine Peso",
      "description": "Argentina",
      "a": 0,
      "b": null,
      "c": null
    },
    "ATS": {
      "value": "Schilling",
      "description": "Austria. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 5.0,
      "c": 42.0
    },
    "AUD": {
      "value": "Australian Dollar",
      "description": "Australia, Christmas Island, Cocos (Keeling) Islands, Heard Island and McDonald Islands, Kiribati, Nauru, Norfolk Island, Tuvalu",
      "a": 0,
      "b": null,
      "c": null
    },
    "AWG": {
      "value": "Aruban Florin",
      "description": "Aruba",
      "a": 0,
      "b": null,
      "c": null
    },
    "AZN": {
      "value": "Azerbaijan Manat",
      "description": "Azerbaijan",
      "a": 7,
      "b": 38.0,
      "c": null
    },
    "BAM": {
      "value": "Convertible Marks",
      "description": "Bosnia and Herzegovina",
      "a": 0,
      "b": null,
      "c": null
    },
    "BBD": {
      "value": "Barbados Dollar",
      "description": "Barbados",
      "a": 0,
      "b": null,
      "c": null
    },
    "BDT": {
      "value": "Taka",
      "description": "Bangladesh",
      "a": 0,
      "b": null,
      "c": null
    },
    "BEF": {
      "value": "Belgian Franc",
      "description": "Belgium. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 5.0,
      "c": 42.0
    },
    "BGL": {
      "value": "Bulgarian Lev",
      "description": "Deprecated, replaced by BGN",
      "a": 0,
      "b": 4.0,
      "c": 4.0
    },
    "BGN": {
      "value": "Bulgarian Lev",
      "description": "Bulgaria",
      "a": 4,
      "b": null,
      "c": null
    },
    "BHD": {
      "value": "Bahraini Dinar",
      "description": "Bahrain (prices normally quoted with 3 decimal places)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "BIF": {
      "value": "Burundi Franc",
      "description": "Burundi (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "BMD": {
      "value": "Bermudian Dollar",
      "description": "Bermuda",
      "a": 0,
      "b": null,
      "c": null
    },
    "BND": {
      "value": "Brunei Dollar",
      "description": "Brunei Darussalam",
      "a": 0,
      "b": null,
      "c": null
    },
    "BOB": {
      "value": "Boliviano",
      "description": "Bolivia",
      "a": 0,
      "b": null,
      "c": null
    },
    "BRL": {
      "value": "Brazilian Real",
      "description": "Brazil",
      "a": 0,
      "b": null,
      "c": null
    },
    "BSD": {
      "value": "Bahamian Dollar",
      "description": "Bahamas",
      "a": 0,
      "b": null,
      "c": null
    },
    "BTN": {
      "value": "Ngultrun",
      "description": "Bhutan",
      "a": 0,
      "b": null,
      "c": null
    },
    "BWP": {
      "value": "Pula",
      "description": "Botswana",
      "a": 0,
      "b": null,
      "c": null
    },
    "BYR": {
      "value": "(Old) Belarussian Ruble",
      "description": "Belarus (prices normally quoted as integers). Deprecated \u0096 now replaced by new Belarussian Ruble (BYN): use only for historical prices that pre-date the introduction of the new Belarussian Ruble",
      "a": 0,
      "b": 44.0,
      "c": 44.0
    },
    "BYN": {
      "value": "Belarussian Ruble",
      "description": "Belarus",
      "a": 32,
      "b": null,
      "c": null
    },
    "BZD": {
      "value": "Belize Dollar",
      "description": "Belize",
      "a": 0,
      "b": null,
      "c": null
    },
    "CAD": {
      "value": "Canadian Dollar",
      "description": "Canada",
      "a": 0,
      "b": null,
      "c": null
    },
    "CDF": {
      "value": "Franc Congolais",
      "description": "Congo (Democratic Republic of the)",
      "a": 0,
      "b": null,
      "c": null
    },
    "CHF": {
      "value": "Swiss Franc",
      "description": "Switzerland, Liechtenstein",
      "a": 0,
      "b": null,
      "c": null
    },
    "CLP": {
      "value": "Chilean Peso",
      "description": "Chile (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "CNY": {
      "value": "Yuan Renminbi",
      "description": "China",
      "a": 0,
      "b": null,
      "c": null
    },
    "COP": {
      "value": "Colombian Peso",
      "description": "Colombia (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "CRC": {
      "value": "Costa Rican Colon",
      "description": "Costa Rica (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "CSD": {
      "value": "Serbian Dinar",
      "description": "Deprecated, replaced by RSD",
      "a": 4,
      "b": 17.0,
      "c": 17.0
    },
    "CUC": {
      "value": "Cuban Convertible Peso",
      "description": "Cuba (alternative currency)",
      "a": 4,
      "b": null,
      "c": null
    },
    "CUP": {
      "value": "Cuban Peso",
      "description": "Cuba",
      "a": 0,
      "b": null,
      "c": null
    },
    "CVE": {
      "value": "Cabo Verde Escudo",
      "description": "Cabo Verde (prices normally quoted as integers)",
      "a": 0,
      "b": 28.0,
      "c": null
    },
    "CYP": {
      "value": "Cyprus Pound",
      "description": "Cyprus. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 13.0,
      "c": 42.0
    },
    "CZK": {
      "value": "Czech Koruna",
      "description": "Czechia",
      "a": 0,
      "b": 44.0,
      "c": null
    },
    "DEM": {
      "value": "Mark",
      "description": "Germany. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 5.0,
      "c": 42.0
    },
    "DJF": {
      "value": "Djibouti Franc",
      "description": "Djibouti (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "DKK": {
      "value": "Danish Krone",
      "description": "Denmark, Faroe Islands, Greenland",
      "a": 0,
      "b": null,
      "c": null
    },
    "DOP": {
      "value": "Dominican Peso",
      "description": "Dominican Republic",
      "a": 0,
      "b": null,
      "c": null
    },
    "DZD": {
      "value": "Algerian Dinar",
      "description": "Algeria",
      "a": 0,
      "b": null,
      "c": null
    },
    "EEK": {
      "value": "Kroon",
      "description": "Estonia.Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 13.0,
      "c": 42.0
    },
    "EGP": {
      "value": "Egyptian Pound",
      "description": "Egypt",
      "a": 0,
      "b": null,
      "c": null
    },
    "ERN": {
      "value": "Nakfa",
      "description": "Eritrea",
      "a": 0,
      "b": null,
      "c": null
    },
    "ESP": {
      "value": "Peseta",
      "description": "Spain. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": 42.0
    },
    "ETB": {
      "value": "Ethiopian Birr",
      "description": "Ethiopia",
      "a": 0,
      "b": null,
      "c": null
    },
    "EUR": {
      "value": "Euro",
      "description": "Eurozone: Andorra, Austria, Belgium, Croatia, Cyprus, Estonia, Finland, France, Fr Guiana, Fr S Territories, Germany, Greece, Guadeloupe, Holy See (Vatican City), Ireland, Italy, Latvia, Lithuania, Luxembourg, Martinique, Malta, Mayotte, Monaco, Montenegro, Netherlands, Portugal, R\u00e9union, St Barthelemy, St Martin, St Pierre and Miquelon, San Marino, Slovakia, Slovenia, Spain",
      "a": 5,
      "b": 60.0,
      "c": null
    },
    "FIM": {
      "value": "Markka",
      "description": "Finland. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 5.0,
      "c": 42.0
    },
    "FJD": {
      "value": "Fiji Dollar",
      "description": "Fiji",
      "a": 0,
      "b": null,
      "c": null
    },
    "FKP": {
      "value": "Falkland Islands Pound",
      "description": "Falkland Islands (Malvinas)",
      "a": 0,
      "b": null,
      "c": null
    },
    "FRF": {
      "value": "Franc",
      "description": "France. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 5.0,
      "c": 42.0
    },
    "GBP": {
      "value": "Pound Sterling",
      "description": "United Kingdom, Isle of Man, Channel Islands, South Georgia, South Sandwich Islands, British Indian Ocean Territory (de jure)",
      "a": 0,
      "b": null,
      "c": null
    },
    "GEL": {
      "value": "Lari",
      "description": "Georgia",
      "a": 0,
      "b": null,
      "c": null
    },
    "GHC": {
      "value": "Ghana Cedi",
      "description": "Deprecated, replaced by GHS",
      "a": 0,
      "b": 17.0,
      "c": 17.0
    },
    "GHS": {
      "value": "Ghana Cedi",
      "description": "Ghana",
      "a": 17,
      "b": null,
      "c": null
    },
    "GIP": {
      "value": "Gibraltar Pound",
      "description": "Gibraltar",
      "a": 0,
      "b": null,
      "c": null
    },
    "GMD": {
      "value": "Dalasi",
      "description": "Gambia",
      "a": 0,
      "b": null,
      "c": null
    },
    "GNF": {
      "value": "Guinean Franc",
      "description": "Guinea (prices normally quoted as integers)",
      "a": 0,
      "b": 38.0,
      "c": null
    },
    "GRD": {
      "value": "Drachma",
      "description": "Greece. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 5.0,
      "c": 42.0
    },
    "GTQ": {
      "value": "Quetzal",
      "description": "Guatemala",
      "a": 0,
      "b": null,
      "c": null
    },
    "GWP": {
      "value": "Guinea-Bissau Peso",
      "description": "Now replaced by the CFA Franc BCEAO XOF use only for historical prices that pre-date use of the CFA Franc",
      "a": 0,
      "b": 17.0,
      "c": null
    },
    "GYD": {
      "value": "Guyana Dollar",
      "description": "Guyana (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "HKD": {
      "value": "Hong Kong Dollar",
      "description": "Hong Kong",
      "a": 0,
      "b": null,
      "c": null
    },
    "HNL": {
      "value": "Lempira",
      "description": "Honduras",
      "a": 0,
      "b": null,
      "c": null
    },
    "HRK": {
      "value": "Kuna",
      "description": "Croatia. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 60.0,
      "c": 60.0
    },
    "HTG": {
      "value": "Gourde",
      "description": "Haiti",
      "a": 0,
      "b": null,
      "c": null
    },
    "HUF": {
      "value": "Forint",
      "description": "Hungary (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "IDR": {
      "value": "Rupiah",
      "description": "Indonesia (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "IEP": {
      "value": "Punt",
      "description": "Ireland. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 5.0,
      "c": 42.0
    },
    "ILS": {
      "value": "New Israeli Sheqel",
      "description": "Israel",
      "a": 0,
      "b": null,
      "c": null
    },
    "INR": {
      "value": "Indian Rupee",
      "description": "India, Bhutan (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "IQD": {
      "value": "Iraqi Dinar",
      "description": "Iraq (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "IRR": {
      "value": "Iranian Rial",
      "description": "Iran (Islamic Republic of) (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "ISK": {
      "value": "Iceland Krona",
      "description": "Iceland (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "ITL": {
      "value": "Lira",
      "description": "Italy. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": 42.0
    },
    "JMD": {
      "value": "Jamaican Dollar",
      "description": "Jamaica",
      "a": 0,
      "b": null,
      "c": null
    },
    "JOD": {
      "value": "Jordanian Dinar",
      "description": "Jordan (prices normally quoted with 3 decimal places)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "JPY": {
      "value": "Yen",
      "description": "Japan (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "KES": {
      "value": "Kenyan Shilling",
      "description": "Kenya",
      "a": 0,
      "b": null,
      "c": null
    },
    "KGS": {
      "value": "Som",
      "description": "Kyrgyzstan",
      "a": 0,
      "b": null,
      "c": null
    },
    "KHR": {
      "value": "Riel",
      "description": "Cambodia",
      "a": 0,
      "b": null,
      "c": null
    },
    "KMF": {
      "value": "Comorian Franc",
      "description": "Comoros (prices normally quoted as integers)",
      "a": 0,
      "b": 38.0,
      "c": null
    },
    "KPW": {
      "value": "North Korean Won",
      "description": "Korea (Democratic People\u0092s Republic of) (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "KRW": {
      "value": "Won",
      "description": "Korea (Republic of) (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "KWD": {
      "value": "Kuwaiti Dinar",
      "description": "Kuwait (prices normally quoted with 3 decimal places)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "KYD": {
      "value": "Cayman Islands Dollar",
      "description": "Cayman Islands",
      "a": 0,
      "b": null,
      "c": null
    },
    "KZT": {
      "value": "Tenge",
      "description": "Kazakstan",
      "a": 0,
      "b": null,
      "c": null
    },
    "LAK": {
      "value": "Lao Kip",
      "description": "Lao People\u0092s Democratic Republic (prices normally quoted as integers)",
      "a": 0,
      "b": 38.0,
      "c": null
    },
    "LBP": {
      "value": "Lebanese Pound",
      "description": "Lebanon (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "LKR": {
      "value": "Sri Lanka Rupee",
      "description": "Sri Lanka",
      "a": 0,
      "b": null,
      "c": null
    },
    "LRD": {
      "value": "Liberian Dollar",
      "description": "Liberia",
      "a": 0,
      "b": null,
      "c": null
    },
    "LSL": {
      "value": "Loti",
      "description": "Lesotho",
      "a": 0,
      "b": null,
      "c": null
    },
    "LTL": {
      "value": "Litus",
      "description": "Lithuania. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 28.0,
      "c": 42.0
    },
    "LUF": {
      "value": "Luxembourg Franc",
      "description": "Luxembourg. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": 42.0
    },
    "LVL": {
      "value": "Latvian Lats",
      "description": "Latvia. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 24.0,
      "c": 42.0
    },
    "LYD": {
      "value": "Libyan Dinar",
      "description": "Libyan Arab Jamahiriya (prices normally quoted with 3 decimal places)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "MAD": {
      "value": "Moroccan Dirham",
      "description": "Morocco, Western Sahara",
      "a": 0,
      "b": null,
      "c": null
    },
    "MDL": {
      "value": "Moldovan Leu",
      "description": "Moldova, Republic of",
      "a": 0,
      "b": null,
      "c": null
    },
    "MGA": {
      "value": "Malagasy Ariary",
      "description": "Madagascar (prices normally quoted with 0 or 1 decimal place \u0096 1 iraimbilanja = Ar0.2)",
      "a": 4,
      "b": 27.0,
      "c": null
    },
    "MGF": {
      "value": "Malagasy Franc",
      "description": "Now replaced by the Ariary (MGA) (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "MKD": {
      "value": "Denar",
      "description": "North Macedonia (formerly FYR Macedonia)",
      "a": 0,
      "b": 46.0,
      "c": null
    },
    "MMK": {
      "value": "Kyat",
      "description": "Myanmar (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "MNT": {
      "value": "Tugrik",
      "description": "Mongolia (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "MOP": {
      "value": "Pataca",
      "description": "Macau",
      "a": 0,
      "b": null,
      "c": null
    },
    "MRO": {
      "value": "(Old) Ouguiya",
      "description": "Mauritania (prices normally quoted with 0 or 1 decimal place \u0096 1 khoums = UM0.2). Was interchangeable with MRU (New) Ouguiya at rate of 10:1 until June 2018. Deprecated, use MRU instead",
      "a": 0,
      "b": 42.0,
      "c": 42.0
    },
    "MRU": {
      "value": "Ouguiya",
      "description": "Mauritania (prices normally quoted with 0 or 1 decimal place \u0096 1 khoums = UM0.2). Replaced MRO (old) Ouguiya at rate of 10:1 in June 2018. Only for use in ONIX 3.0 or later",
      "a": 40,
      "b": 42.0,
      "c": null
    },
    "MTL": {
      "value": "Maltese Lira",
      "description": "Malta. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 13.0,
      "c": 42.0
    },
    "MUR": {
      "value": "Mauritius Rupee",
      "description": "Mauritius (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "MVR": {
      "value": "Rufiyaa",
      "description": "Maldives",
      "a": 0,
      "b": null,
      "c": null
    },
    "MWK": {
      "value": "Malawi Kwacha",
      "description": "Malawi",
      "a": 0,
      "b": 33.0,
      "c": null
    },
    "MXN": {
      "value": "Mexican Peso",
      "description": "Mexico",
      "a": 0,
      "b": null,
      "c": null
    },
    "MYR": {
      "value": "Malaysian Ringgit",
      "description": "Malaysia",
      "a": 0,
      "b": null,
      "c": null
    },
    "MZN": {
      "value": "Mozambique Metical",
      "description": "Mozambique",
      "a": 7,
      "b": null,
      "c": null
    },
    "NAD": {
      "value": "Namibia Dollar",
      "description": "Namibia",
      "a": 0,
      "b": null,
      "c": null
    },
    "NGN": {
      "value": "Naira",
      "description": "Nigeria",
      "a": 0,
      "b": null,
      "c": null
    },
    "NIO": {
      "value": "Cordoba Oro",
      "description": "Nicaragua",
      "a": 0,
      "b": null,
      "c": null
    },
    "NLG": {
      "value": "Guilder",
      "description": "Netherlands. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 5.0,
      "c": 42.0
    },
    "NOK": {
      "value": "Norwegian Krone",
      "description": "Norway, Bouvet Island, Svalbard and Jan Mayen",
      "a": 0,
      "b": null,
      "c": null
    },
    "NPR": {
      "value": "Nepalese Rupee",
      "description": "Nepal",
      "a": 0,
      "b": null,
      "c": null
    },
    "NZD": {
      "value": "New Zealand Dollar",
      "description": "New Zealand, Cook Islands, Niue, Pitcairn, Tokelau",
      "a": 0,
      "b": null,
      "c": null
    },
    "OMR": {
      "value": "Rial Omani",
      "description": "Oman (prices normally quoted with 3 decimal places)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "PAB": {
      "value": "Balboa",
      "description": "Panama",
      "a": 0,
      "b": null,
      "c": null
    },
    "PEN": {
      "value": "Sol",
      "description": "Peru (formerly Nuevo Sol)",
      "a": 0,
      "b": 33.0,
      "c": null
    },
    "PGK": {
      "value": "Kina",
      "description": "Papua New Guinea",
      "a": 0,
      "b": null,
      "c": null
    },
    "PHP": {
      "value": "Philippine Peso",
      "description": "Philippines",
      "a": 0,
      "b": 43.0,
      "c": null
    },
    "PKR": {
      "value": "Pakistan Rupee",
      "description": "Pakistan (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "PLN": {
      "value": "Zloty",
      "description": "Poland",
      "a": 0,
      "b": null,
      "c": null
    },
    "PTE": {
      "value": "Escudo",
      "description": "Portugal. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 5.0,
      "c": 42.0
    },
    "PYG": {
      "value": "Guarani",
      "description": "Paraguay (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "QAR": {
      "value": "Qatari Rial",
      "description": "Qatar",
      "a": 0,
      "b": null,
      "c": null
    },
    "ROL": {
      "value": "Romanian Old Leu",
      "description": "Deprecated, replaced by RON",
      "a": 0,
      "b": 17.0,
      "c": 17.0
    },
    "RON": {
      "value": "Romanian Leu",
      "description": "Romania",
      "a": 7,
      "b": null,
      "c": null
    },
    "RSD": {
      "value": "Serbian Dinar",
      "description": "Serbia (prices normally quoted as integers)",
      "a": 17,
      "b": 27.0,
      "c": null
    },
    "RUB": {
      "value": "Russian Ruble",
      "description": "Russian Federation",
      "a": 4,
      "b": null,
      "c": null
    },
    "RUR": {
      "value": "Russian Ruble",
      "description": "Deprecated, replaced by RUB",
      "a": 0,
      "b": 4.0,
      "c": 4.0
    },
    "RWF": {
      "value": "Rwanda Franc",
      "description": "Rwanda (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "SAR": {
      "value": "Saudi Riyal",
      "description": "Saudi Arabia",
      "a": 0,
      "b": null,
      "c": null
    },
    "SBD": {
      "value": "Solomon Islands Dollar",
      "description": "Solomon Islands",
      "a": 0,
      "b": null,
      "c": null
    },
    "SCR": {
      "value": "Seychelles Rupee",
      "description": "Seychelles",
      "a": 0,
      "b": null,
      "c": null
    },
    "SDD": {
      "value": "Sudanese Dinar",
      "description": "Now replaced by the Sudanese Pound (SDG)",
      "a": 0,
      "b": 17.0,
      "c": null
    },
    "SDG": {
      "value": "Sudanese Pound",
      "description": "Sudan",
      "a": 17,
      "b": null,
      "c": null
    },
    "SEK": {
      "value": "Swedish Krona",
      "description": "Sweden",
      "a": 0,
      "b": null,
      "c": null
    },
    "SGD": {
      "value": "Singapore Dollar",
      "description": "Singapore",
      "a": 0,
      "b": null,
      "c": null
    },
    "SHP": {
      "value": "Saint Helena Pound",
      "description": "Saint Helena",
      "a": 0,
      "b": null,
      "c": null
    },
    "SIT": {
      "value": "Tolar",
      "description": "Slovenia. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 17.0,
      "c": 42.0
    },
    "SKK": {
      "value": "Slovak Koruna",
      "description": "Slovakia. Now replaced by the Euro (EUR). Deprecated \u0096 use only for historical prices that pre-date the introduction of the Euro",
      "a": 0,
      "b": 17.0,
      "c": 42.0
    },
    "SLE": {
      "value": "Leone",
      "description": "Sierra Leone (from April 2022). Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    },
    "SLL": {
      "value": "Leone",
      "description": "Sierra Leone (prices normally quoted as integers). Deprecated \u0096 gradually replaced by SLE from April 2022, but SLL Leone still usable until December 2023 (SLE is a redenomination of the Leone by a factor of 1,000)",
      "a": 0,
      "b": 61.0,
      "c": 58.0
    },
    "SOS": {
      "value": "Somali Shilling",
      "description": "Somalia (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "SRD": {
      "value": "Surinam Dollar",
      "description": "Suriname",
      "a": 4,
      "b": null,
      "c": null
    },
    "SRG": {
      "value": "Suriname Guilder",
      "description": "DEPRECATED, replaced by SRD",
      "a": 0,
      "b": 4.0,
      "c": 4.0
    },
    "STD": {
      "value": "(Old) Dobra",
      "description": "S\u00e3o Tome and Principe (prices normally quoted as integers). Was interchangeable with STN (New) Dobra at rate of 1000:1 until June 2018. Deprecated, use STN instead",
      "a": 0,
      "b": 42.0,
      "c": 42.0
    },
    "STN": {
      "value": "Dobra",
      "description": "S\u00e3o Tome and Principe. Replaced STD (old) Dobra at rate of 1000:1 in June 2018. Only for use in ONIX 3.0 or later",
      "a": 39,
      "b": 42.0,
      "c": null
    },
    "SVC": {
      "value": "El Salvador Colon",
      "description": "El Salvador",
      "a": 0,
      "b": null,
      "c": null
    },
    "SYP": {
      "value": "Syrian Pound",
      "description": "Syrian Arab Republic (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "SZL": {
      "value": "Lilangeni",
      "description": "Eswatini (formerly known as Swaziland)",
      "a": 0,
      "b": 43.0,
      "c": null
    },
    "THB": {
      "value": "Baht",
      "description": "Thailand",
      "a": 0,
      "b": null,
      "c": null
    },
    "TJS": {
      "value": "Somoni",
      "description": "Tajikistan",
      "a": 0,
      "b": null,
      "c": null
    },
    "TMM": {
      "value": "Turkmenistan Manat",
      "description": "Deprecated, replaced by TMT (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": 17.0
    },
    "TMT": {
      "value": "Turkmenistan New Manat",
      "description": "Turkmenistan",
      "a": 17,
      "b": null,
      "c": null
    },
    "TND": {
      "value": "Tunisian Dinar",
      "description": "Tunisia (prices normally quoted with 3 decimal places)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "TOP": {
      "value": "Pa\u0092anga",
      "description": "Tonga",
      "a": 0,
      "b": null,
      "c": null
    },
    "TPE": {
      "value": "Timor Escudo",
      "description": "Deprecated. Timor-Leste now uses the US Dollar",
      "a": 0,
      "b": 7.0,
      "c": 7.0
    },
    "TRL": {
      "value": "Turkish Lira (old)",
      "description": "Deprecated, replaced by TRY (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": 17.0
    },
    "TRY": {
      "value": "Turkish Lira",
      "description": "T\u00fcrkiye, from 1 January 2005",
      "a": 4,
      "b": null,
      "c": null
    },
    "TTD": {
      "value": "Trinidad and Tobago Dollar",
      "description": "Trinidad and Tobago",
      "a": 0,
      "b": null,
      "c": null
    },
    "TWD": {
      "value": "New Taiwan Dollar",
      "description": "Taiwan (Province of China)",
      "a": 0,
      "b": null,
      "c": null
    },
    "TZS": {
      "value": "Tanzanian Shilling",
      "description": "Tanzania (United Republic of) (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "UAH": {
      "value": "Hryvnia",
      "description": "Ukraine",
      "a": 0,
      "b": null,
      "c": null
    },
    "UGX": {
      "value": "Uganda Shilling",
      "description": "Uganda (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "USD": {
      "value": "US Dollar",
      "description": "United States, American Samoa, Bonaire, Sint Eustatius and Saba, British Indian Ocean Territory, Ecuador, El Salvador, Guam, Haiti, Marshall Is, Micronesia (Federated States of), Northern Mariana Is, Palau, Panama, Puerto Rico, Timor-Leste, Turks and Caicos Is, US Minor Outlying Is, Virgin Is (British), Virgin Is (US)",
      "a": 0,
      "b": null,
      "c": null
    },
    "UYU": {
      "value": "Peso Uruguayo",
      "description": "Uruguay",
      "a": 0,
      "b": null,
      "c": null
    },
    "UZS": {
      "value": "Uzbekistan Sum",
      "description": "Uzbekistan (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "VEB": {
      "value": "Bol\u00edvar",
      "description": "Deprecated, replaced by VEF",
      "a": 0,
      "b": 17.0,
      "c": 17.0
    },
    "VEF": {
      "value": "Bol\u00edvar",
      "description": "Venezuela (formerly Bol\u00edvar fuerte). Deprecated, replaced by VES",
      "a": 17,
      "b": 43.0,
      "c": 43.0
    },
    "VES": {
      "value": "Bol\u00edvar Soberano",
      "description": "Venezuela (replaced VEF from August 2018 at rate of 100,000:1, and was redenominated by a further factor of 1,000,000:1 in late 2021). Only for use in ONIX 3.0 or later",
      "a": 42,
      "b": 55.0,
      "c": null
    },
    "VND": {
      "value": "Dong",
      "description": "Viet Nam (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "VUV": {
      "value": "Vatu",
      "description": "Vanuatu (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "WST": {
      "value": "Tala",
      "description": "Samoa",
      "a": 0,
      "b": null,
      "c": null
    },
    "XAF": {
      "value": "CFA Franc BEAC",
      "description": "Cameroon, Central African Republic, Chad, Congo, Equatorial Guinea, Gabon (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "XCD": {
      "value": "East Caribbean Dollar",
      "description": "Anguilla, Antigua and Barbuda, Dominica, Grenada, Montserrat, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines",
      "a": 0,
      "b": null,
      "c": null
    },
    "XOF": {
      "value": "CFA Franc BCEAO",
      "description": "Benin, Burkina Faso, C\u00f4te D\u0092Ivoire, Guinea-Bissau, Mali, Niger, Senegal, Togo (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "XPF": {
      "value": "CFP Franc",
      "description": "French Polynesia, New Caledonia, Wallis and Futuna (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "YER": {
      "value": "Yemeni Rial",
      "description": "Yemen (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": null
    },
    "YUM": {
      "value": "Yugoslavian Dinar",
      "description": "Deprecated, replaced by CSD",
      "a": 0,
      "b": 4.0,
      "c": 4.0
    },
    "ZAR": {
      "value": "Rand",
      "description": "South Africa, Namibia, Lesotho",
      "a": 0,
      "b": null,
      "c": null
    },
    "ZMK": {
      "value": "Kwacha",
      "description": "Zambia. Deprecated, replaced with ZMW (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": 27.0
    },
    "ZMW": {
      "value": "Zambian Kwacha",
      "description": "Zambia",
      "a": 23,
      "b": null,
      "c": null
    },
    "ZWD": {
      "value": "Zimbabwe Dollar",
      "description": "Deprecated, replaced with ZWL (prices normally quoted as integers)",
      "a": 0,
      "b": 27.0,
      "c": 17.0
    },
    "ZWG": {
      "value": "Zimbabwe Gold",
      "description": "Zimbabwe. Also known as ZiG. Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    },
    "ZWL": {
      "value": "Zimbabwe Dollar",
      "description": "Deprecated, replaced by ZWG",
      "a": 17,
      "b": 66.0,
      "c": 66.0
    }
  },
  "97": {
    "RL": {
      "value": "Red letter",
      "description": "Words spoken by Christ are printed in red",
      "a": 1,
      "b": null,
      "c": null
    }
  },
  "98": {
    "BLK": {
      "value": "Black",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "BLU": {
      "value": "Blue",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "BRN": {
      "value": "Brown",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "BUR": {
      "value": "Burgundy/Maroon",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "CEL": {
      "value": "Celadon/Pale green",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "CPR": {
      "value": "Copper",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "CRE": {
      "value": "Cream",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "FCO": {
      "value": "Four-color",
      "description": "Use <ProductFormFeatureDescription> to add brief details if required",
      "a": 8,
      "b": 44.0,
      "c": null
    },
    "FCS": {
      "value": "Four-color and spot-color",
      "description": "Use <ProductFormFeatureDescription> to add brief details if required",
      "a": 8,
      "b": 44.0,
      "c": null
    },
    "GLD": {
      "value": "Gold",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "GRN": {
      "value": "Green",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "GRY": {
      "value": "Grey",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "MUL": {
      "value": "Multicolor",
      "description": "Use <ProductFormFeatureDescription> to add brief details if required",
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "NAV": {
      "value": "Navy/Dark blue",
      "description": null,
      "a": 1,
      "b": 17.0,
      "c": null
    },
    "ORG": {
      "value": "Orange",
      "description": null,
      "a": 6,
      "b": null,
      "c": null
    },
    "PNK": {
      "value": "Pink",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "PUR": {
      "value": "Purple",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "RED": {
      "value": "Red",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "SKY": {
      "value": "Sky/Pale blue",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "SLV": {
      "value": "Silver",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "TAN": {
      "value": "Tan/Light brown",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "TEA": {
      "value": "Teal/Turquoise green",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "WHI": {
      "value": "White",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "YEL": {
      "value": "Yellow",
      "description": null,
      "a": 1,
      "b": null,
      "c": null
    },
    "ZZZ": {
      "value": "Other",
      "description": "Use <ProductFormFeatureDescription> to add brief details if required",
      "a": 1,
      "b": 44.0,
      "c": null
    }
  },
  "99": {
    "01": {
      "value": "Berkshire leather",
      "description": "Pigskin",
      "a": 2,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Calfskin",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "03": {
      "value": "French Morocco",
      "description": "Calf split or sheep split",
      "a": 2,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Morocco",
      "description": "Goatskin",
      "a": 2,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Bonded buffalo grain",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Bonded calf grain",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Bonded Cordova",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Bonded eelskin",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Bonded Ostraleg",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Bonded ostrich",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Bonded reptile grain",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Bonded leather",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Cowhide",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Eelskin",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Kivar",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Leatherflex",
      "description": "An imitation leather binding material",
      "a": 2,
      "b": 17.0,
      "c": null
    },
    "17": {
      "value": "Moleskin",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Softhide leather",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Metal",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Velvet",
      "description": "(de: \u0091Samt\u0092)",
      "a": 6,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Mother-of-pearl",
      "description": "(es: \u0091n\u00e1car\u0092)",
      "a": 6,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Papyrus",
      "description": null,
      "a": 6,
      "b": null,
      "c": null
    },
    "23": {
      "value": "G\u00e9ltex / Wibalin",
      "description": "Proprietary imitation cloth binding material, cellulose-based, usually embossed / textured",
      "a": 6,
      "b": 51.0,
      "c": null
    },
    "24": {
      "value": "Guaflex / Skivertex",
      "description": "Proprietary imitation leather binding material, cellulose-based, usually embossed / textured",
      "a": 6,
      "b": 51.0,
      "c": null
    },
    "25": {
      "value": "Imitation leather",
      "description": "An imitation made of any non-leather material",
      "a": 28,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Pigskin",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Goatskin",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    }
  },
  "100": {
    "01": {
      "value": "BIC discount group code",
      "description": "UK publisher\u0092s or distributor\u0092s discount group code in a format specified by BIC to ensure uniqueness (a five-letter prefix allocated by BIC, plus one to three alphanumeric characters \u0096 normally digits \u0096 chosen by the supplier). See https://bic.org.uk/resources/discount-group-codes/",
      "a": 1,
      "b": 62.0,
      "c": null
    },
    "02": {
      "value": "Proprietary discount code",
      "description": "A publisher\u0092s or supplier\u0092s own code which identifies a trade discount category, as specified in <DiscountCodeTypeName>. The actual discount for each code is set by trading partner agreement (applies to goods supplied on standard trade discounting terms)",
      "a": 1,
      "b": 11.0,
      "c": null
    },
    "03": {
      "value": "Boeksoort",
      "description": "Terms code used in the Netherlands book trade",
      "a": 4,
      "b": null,
      "c": null
    },
    "04": {
      "value": "German terms code",
      "description": "Terms code used in German ONIX applications",
      "a": 5,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Proprietary commission code",
      "description": "A publisher\u0092s or supplier\u0092s own code which identifies a commission rate category, as specified in <DiscountCodeTypeName>. The actual commission rate for each code is set by trading partner agreement (applies to goods supplied on agency terms)",
      "a": 11,
      "b": null,
      "c": null
    },
    "06": {
      "value": "BIC commission group code",
      "description": "UK publisher\u0092s or distributor\u0092s commission group code in format specified by BIC to ensure uniqueness. Format is identical to BIC discount group code, but indicates a commission rather than a discount (applies to goods supplied on agency terms)",
      "a": 12,
      "b": null,
      "c": null
    },
    "07": {
      "value": "ISNI-based discount group code",
      "description": "ISNI-based discount group scheme devised initially by the German IG ProduktMetadaten, in a format comprised of the supplier\u0092s 16-digit ISNI, followed by a hyphen and one to three alphanumeric characters \u0096 normally digits \u0096 chosen by the supplier. These characters are the index to a discount percentage in a table shared in advance by the supplier with individual customers. In this way, a supplier may maintain individual product-specific discount arrangements with each customer. Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    }
  },
  "102": {
    "01": {
      "value": "Proprietary",
      "description": "Proprietary list of retail and other end-user sales outlet IDs. Note that <IDTypeName> is required with proprietary identifiers",
      "a": 4,
      "b": null,
      "c": null
    },
    "03": {
      "value": "ONIX retail sales outlet ID code",
      "description": "Use with ONIX retail and other end-user sales outlet IDs from List 139",
      "a": 8,
      "b": 32.0,
      "c": null
    },
    "04": {
      "value": "Retail sales outlet GLN",
      "description": "13-digit GS1 global location number (formerly EAN location number). Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Retail sales outlet SAN",
      "description": "7-digit Book trade Standard Address Number (US, UK etc). Only for use in ONIX 3.0 or later",
      "a": 44,
      "b": null,
      "c": null
    }
  },
  "121": {
    "Adlm": {
      "value": "Adlam",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Afak": {
      "value": "Afaka",
      "description": "Script is not supported by Unicode",
      "a": 13,
      "b": null,
      "c": null
    },
    "Aghb": {
      "value": "Caucasian Albanian",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Ahom": {
      "value": "Ahom, Tai Ahom",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Arab": {
      "value": "Arabic",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Aran": {
      "value": "Arabic (Nastaliq variant)",
      "description": "Typographic variant of Arabic. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Armi": {
      "value": "Imperial Aramaic",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Armn": {
      "value": "Armenian",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Avst": {
      "value": "Avestan",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Bali": {
      "value": "Balinese",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Bamu": {
      "value": "Bamun",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Bass": {
      "value": "Bassa Vah",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Batk": {
      "value": "Batak",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Beng": {
      "value": "Bengali (Bangla)",
      "description": null,
      "a": 9,
      "b": 38.0,
      "c": null
    },
    "Bhks": {
      "value": "Bhaiksuki",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Blis": {
      "value": "Blissymbols",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Bopo": {
      "value": "Bopomofo",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Brah": {
      "value": "Brahmi",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Brai": {
      "value": "Braille",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Bugi": {
      "value": "Buginese",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Buhd": {
      "value": "Buhid",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Cakm": {
      "value": "Chakma",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Cans": {
      "value": "Unified Canadian Aboriginal Syllabics",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Cari": {
      "value": "Carian",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Cham": {
      "value": "Cham",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Cher": {
      "value": "Cherokee",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Chrs": {
      "value": "Chorasmian",
      "description": "Khwarezmian. Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Cirt": {
      "value": "Cirth",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Copt": {
      "value": "Coptic",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Cpmn": {
      "value": "Cypro-Minoan",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Cprt": {
      "value": "Cypriot",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Cyrl": {
      "value": "Cyrillic",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Cyrs": {
      "value": "Cyrillic (Old Church Slavonic variant)",
      "description": "Ancient/historic, typographic variant of Cyrillic",
      "a": 9,
      "b": null,
      "c": null
    },
    "Deva": {
      "value": "Devanagari (Nagari)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Diak": {
      "value": "Dives Akuru",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Dogr": {
      "value": "Dogra",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": 61.0,
      "c": null
    },
    "Dsrt": {
      "value": "Deseret (Mormon)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Dupl": {
      "value": "Duployan shorthand, Duployan stenography",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Egyd": {
      "value": "Egyptian demotic",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Egyh": {
      "value": "Egyptian hieratic",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Egyp": {
      "value": "Egyptian hieroglyphs",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Elba": {
      "value": "Elbasan",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Elym": {
      "value": "Elymaic",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Ethi": {
      "value": "Ethiopic (Ge\u0091ez)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Geok": {
      "value": "Khutsuri (Asomtavruli and Khutsuri)",
      "description": "Georgian in Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Geor": {
      "value": "Georgian (Mkhedruli and Mtavruli)",
      "description": null,
      "a": 9,
      "b": 38.0,
      "c": null
    },
    "Glag": {
      "value": "Glagolitic",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Gong": {
      "value": "Gunjala Gondi",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": 61.0,
      "c": null
    },
    "Gonm": {
      "value": "Masaram Gondi",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Goth": {
      "value": "Gothic",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Gran": {
      "value": "Grantha",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Grek": {
      "value": "Greek",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Gujr": {
      "value": "Gujarati",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Guru": {
      "value": "Gurmukhi",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Hanb": {
      "value": "Han with Bopomofo",
      "description": "See Hani, Bopo. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Hang": {
      "value": "Hangul (Hangeul)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Hani": {
      "value": "Han (Hanzi, Kanji, Hanja)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Hano": {
      "value": "Hanunoo (Hanun\u00f3o)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Hans": {
      "value": "Han (Simplified variant)",
      "description": "Subset of Hani",
      "a": 9,
      "b": null,
      "c": null
    },
    "Hant": {
      "value": "Han (Traditional variant)",
      "description": "Subset of Hani",
      "a": 9,
      "b": null,
      "c": null
    },
    "Hatr": {
      "value": "Hatran",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Hebr": {
      "value": "Hebrew",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Hira": {
      "value": "Hiragana",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Hluw": {
      "value": "Anatolian Hieroglyphs (Luwian Hieroglyphs, Hittite Hieroglyphs)",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Hmng": {
      "value": "Pahawh Hmong",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Hmnp": {
      "value": "Nyiakeng Puachue Hmong",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Hrkt": {
      "value": "Japanese syllabaries (alias for Hiragana + Katakana)",
      "description": "See Hira, Kana",
      "a": 9,
      "b": null,
      "c": null
    },
    "Hung": {
      "value": "Old Hungarian (Hungarian Runic)",
      "description": "Ancient/historic script",
      "a": 9,
      "b": 38.0,
      "c": null
    },
    "Inds": {
      "value": "Indus (Harappan)",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Ital": {
      "value": "Old Italic (Etruscan, Oscan, etc.)",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Jamo": {
      "value": "Jamo (alias for Jamo subset of Hangul)",
      "description": "Subset of Hang. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Java": {
      "value": "Javanese",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Jpan": {
      "value": "Japanese (alias for Han + Hiragana + Katakana)",
      "description": "See Hani, Hira and Kana",
      "a": 13,
      "b": null,
      "c": null
    },
    "Jurc": {
      "value": "Jurchen",
      "description": "Script is not supported by Unicode",
      "a": 13,
      "b": null,
      "c": null
    },
    "Kali": {
      "value": "Kayah Li",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Kana": {
      "value": "Katakana",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Kawi": {
      "value": "Kawi",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Khar": {
      "value": "Kharoshthi",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Khmr": {
      "value": "Khmer",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Khoj": {
      "value": "Khojki",
      "description": "Ancient/historic script",
      "a": 16,
      "b": null,
      "c": null
    },
    "Kitl": {
      "value": "Khitan large script",
      "description": "Script is not supported by Unicode. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Kits": {
      "value": "Khitan small script",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": 61.0,
      "c": null
    },
    "Knda": {
      "value": "Kannada",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Kore": {
      "value": "Korean (alias for Hangul + Han)",
      "description": "See Hani and Hang",
      "a": 9,
      "b": null,
      "c": null
    },
    "Kpel": {
      "value": "Kpelle",
      "description": "Script is not supported by Unicode",
      "a": 13,
      "b": null,
      "c": null
    },
    "Kthi": {
      "value": "Kaithi",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Lana": {
      "value": "Tai Tham (Lanna)",
      "description": null,
      "a": 9,
      "b": 38.0,
      "c": null
    },
    "Laoo": {
      "value": "Lao",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Latf": {
      "value": "Latin (Fraktur variant)",
      "description": "Typographic variant of Latin",
      "a": 9,
      "b": null,
      "c": null
    },
    "Latg": {
      "value": "Latin (Gaelic variant)",
      "description": "Typographic variant of Latin",
      "a": 9,
      "b": null,
      "c": null
    },
    "Latn": {
      "value": "Latin",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Leke": {
      "value": "Leke",
      "description": "Script is not supported by Unicode. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Lepc": {
      "value": "Lepcha (R\u00f3ng)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Limb": {
      "value": "Limbu",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Lina": {
      "value": "Linear A",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Linb": {
      "value": "Linear B",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Lisu": {
      "value": "Lisu (Fraser)",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Loma": {
      "value": "Loma",
      "description": "Script is not supported by Unicode",
      "a": 13,
      "b": null,
      "c": null
    },
    "Lyci": {
      "value": "Lycian",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Lydi": {
      "value": "Lydian",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Mahj": {
      "value": "Mahajani",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Maka": {
      "value": "Makasar",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Mand": {
      "value": "Mandaic, Mandaean",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Mani": {
      "value": "Manichaean",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Marc": {
      "value": "Marchen",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Maya": {
      "value": "Mayan hieroglyphs",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Medf": {
      "value": "Medefaidrin (Oberi Okaime)",
      "description": "Script is not supported by Unicode. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Mend": {
      "value": "Mende Kikakui",
      "description": null,
      "a": 13,
      "b": 38.0,
      "c": null
    },
    "Merc": {
      "value": "Meroitic Cursive",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Mero": {
      "value": "Meroitic Hieroglyphs",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Mlym": {
      "value": "Malayalam",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Modi": {
      "value": "Modi",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Mong": {
      "value": "Mongolian",
      "description": "Includes Clear, Manchu scripts",
      "a": 9,
      "b": null,
      "c": null
    },
    "Moon": {
      "value": "Moon (Moon code, Moon script, Moon type)",
      "description": "Script is not supported by Unicode",
      "a": 13,
      "b": null,
      "c": null
    },
    "Mroo": {
      "value": "Mro, Mru",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Mtei": {
      "value": "Meitei Mayek (Meithei, Meetei)",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Mult": {
      "value": "Multani",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Mymr": {
      "value": "Myanmar (Burmese)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Nagm": {
      "value": "Nag Mundari",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "nulld": {
      "value": "nulldinagari",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Narb": {
      "value": "Old North Arabian (Ancient North Arabian)",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Nbat": {
      "value": "Nabatean",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Newa": {
      "value": "Newa, Newar, Newari",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Nkgb": {
      "value": "Nakhi Geba (Naxi Geba)",
      "description": "Script is not supported by Unicode",
      "a": 13,
      "b": null,
      "c": null
    },
    "Nkoo": {
      "value": "N\u0092Ko",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Nshu": {
      "value": "N\u00fcshu",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Ogam": {
      "value": "Ogham",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Olck": {
      "value": "Ol Chiki (Ol Cemet\u0092, Ol, Santali)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Orkh": {
      "value": "Old Turkic, Orkhon Runic",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Orya": {
      "value": "Oriya (Odia)",
      "description": null,
      "a": 9,
      "b": 38.0,
      "c": null
    },
    "Osge": {
      "value": "Osage",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Osma": {
      "value": "Osmanya",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Ougr": {
      "value": "Old Uyghur",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Palm": {
      "value": "Palmyrene",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Pauc": {
      "value": "Pau Cin Hau",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Perm": {
      "value": "Old Permic",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Phag": {
      "value": "Phags-pa",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Phli": {
      "value": "Inscriptional Pahlavi",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Phlp": {
      "value": "Psalter Pahlavi",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Phlv": {
      "value": "Book Pahlavi",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Phnx": {
      "value": "Phoenician",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Piqd": {
      "value": "Klingon (KLI plqaD)",
      "description": "Script is not supported by Unicode. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Plrd": {
      "value": "Miao (Pollard)",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Prti": {
      "value": "Inscriptional Parthian",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Qaaa": {
      "value": "Reserved for private use (start)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Qabp": {
      "value": "Picture Communication Symbols (PCS)",
      "description": "ONIX local code for graphical symbols used in augmentative and alternative communication and education, not listed in ISO 15924. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "Qabw": {
      "value": "Widgit symbols",
      "description": "ONIX local code for graphical symbols used in augmentative and alternative communication and education, not listed in ISO 15924. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "Qabx": {
      "value": "Reserved for private use (end)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Rjng": {
      "value": "Rejang (Redjang, Kaganga)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Roro": {
      "value": "Rongorongo",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Runr": {
      "value": "Runic",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Samr": {
      "value": "Samaritan",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Sara": {
      "value": "Sarati",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Sarb": {
      "value": "Old South Arabian",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Saur": {
      "value": "Saurashtra",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Sgnw": {
      "value": "SignWriting",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Shaw": {
      "value": "Shavian (Shaw)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Shrd": {
      "value": "Sharada",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Sidd": {
      "value": "Siddham",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Sind": {
      "value": "Khudawadi, Sindhi",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Sinh": {
      "value": "Sinhala",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Sogd": {
      "value": "Sogdian",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Sogo": {
      "value": "Old Sogdian",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Sora": {
      "value": "Sora Sompeng",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Soyo": {
      "value": "Soyombo",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Sund": {
      "value": "Sundanese",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Sylo": {
      "value": "Syloti Nagri",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Syrc": {
      "value": "Syriac",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Syre": {
      "value": "Syriac (Estrangelo variant)",
      "description": "Typographic variant of Syriac",
      "a": 9,
      "b": null,
      "c": null
    },
    "Syrj": {
      "value": "Syriac (Western variant)",
      "description": "Typographic variant of Syriac",
      "a": 9,
      "b": null,
      "c": null
    },
    "Syrn": {
      "value": "Syriac (Eastern variant)",
      "description": "Typographic variant of Syriac",
      "a": 9,
      "b": null,
      "c": null
    },
    "Tagb": {
      "value": "Tagbanwa",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Takr": {
      "value": "Takri",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Tale": {
      "value": "Tai Le",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Talu": {
      "value": "New Tai Lue",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Taml": {
      "value": "Tamil",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Tang": {
      "value": "Tangut",
      "description": "Ancient/historic script",
      "a": 13,
      "b": null,
      "c": null
    },
    "Tavt": {
      "value": "Tai Viet",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Telu": {
      "value": "Telugu",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Teng": {
      "value": "Tengwar",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Tfng": {
      "value": "Tifinagh (Berber)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Tglg": {
      "value": "Tagalog (Baybayin, Alibata)",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Thaa": {
      "value": "Thaana",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Thai": {
      "value": "Thai",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Tibt": {
      "value": "Tibetan",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Tirh": {
      "value": "Tirhuta",
      "description": null,
      "a": 16,
      "b": 38.0,
      "c": null
    },
    "Tnsa": {
      "value": "Tangsa",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Toto": {
      "value": "Toto",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Ugar": {
      "value": "Ugaritic",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Vaii": {
      "value": "Vai",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Visp": {
      "value": "Visible Speech",
      "description": "Script is not supported by Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Vith": {
      "value": "Vithkuqi",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Wara": {
      "value": "Warang Citi (Varang Kshiti)",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Wcho": {
      "value": "Wancho",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Wole": {
      "value": "Woleai",
      "description": "Script is not supported by Unicode",
      "a": 13,
      "b": null,
      "c": null
    },
    "Xpeo": {
      "value": "Old Persian",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Xsux": {
      "value": "Cuneiform, Sumero-Akkadian",
      "description": "Ancient/historic script",
      "a": 9,
      "b": null,
      "c": null
    },
    "Yezi": {
      "value": "Yezidi",
      "description": "Ancient/historic script. Only for use in ONIX 3.0 or later",
      "a": 61,
      "b": null,
      "c": null
    },
    "Yiii": {
      "value": "Yi",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Zanb": {
      "value": "Zanabazar Square (Zanabazarin D\u00f6rb\u00f6ljin Useg, Xewtee D\u00f6rb\u00f6ljin Bicig, Horizontal Square Script)",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Zmth": {
      "value": "Mathematical notation",
      "description": "Not a script in Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Zsye": {
      "value": "Symbols (Emoji variant)",
      "description": "Not a script in Unicode. Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "Zsym": {
      "value": "Symbols",
      "description": "Not a script in Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Zxxx": {
      "value": "Code for unwritten documents",
      "description": "Not a script in Unicode",
      "a": 9,
      "b": null,
      "c": null
    },
    "Zinh": {
      "value": "Code for inherited script",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "Zyyy": {
      "value": "Code for undetermined script",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "Zzzz": {
      "value": "Code for uncoded script",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    }
  },
  "139": {
    "SYM": {
      "value": "24Symbols",
      "description": null,
      "a": 29,
      "b": null,
      "c": null
    },
    "ACM": {
      "value": "A C Moore",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "AAP": {
      "value": "AandP",
      "description": "Academic and Professional Book Center (HK)",
      "a": 8,
      "b": null,
      "c": null
    },
    "ADL": {
      "value": "Adlibris",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "ACB": {
      "value": "Akademibokhandeln",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "AKK": {
      "value": "Akateeminen Kirjakauppa",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "ALB": {
      "value": "Albertson\u0092s",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "ALT": {
      "value": "AlmaTalent",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "AMZ": {
      "value": "Amazon",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "ANR": {
      "value": "Angus and Robertson",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "ANB": {
      "value": "Anobii",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "APA": {
      "value": "Apabi",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "APC": {
      "value": "Apple",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "ASD": {
      "value": "Asda",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "ASB": {
      "value": "Asia Books",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "AUD": {
      "value": "Audible",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "AUC": {
      "value": "Audiobooks.com",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "ATK": {
      "value": "Audioteka",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "ELU": {
      "value": "Axiell ELibU",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 56,
      "b": null,
      "c": null
    },
    "BDL": {
      "value": "B Dalton",
      "description": "Deprecated",
      "a": 8,
      "b": 47.0,
      "c": 47.0
    },
    "BNO": {
      "value": "Barnes and Noble",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "BDZ": {
      "value": "BDBuzz",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 37,
      "b": null,
      "c": null
    },
    "BBB": {
      "value": "Bed Bath and Beyond",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "BST": {
      "value": "Best Buy",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "BOD": {
      "value": "Biblio-on-Demand",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "MMM": {
      "value": "Bibliotheca",
      "description": "Formerly 3M Cloud Library",
      "a": 31,
      "b": null,
      "c": null
    },
    "BIL": {
      "value": "Bilbary",
      "description": "Deprecated",
      "a": 16,
      "b": 47.0,
      "c": 47.0
    },
    "BLG": {
      "value": "Billigbook",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "BJW": {
      "value": "BJ\u0092s Wholesale Club",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "BLA": {
      "value": "Blackstone Audio",
      "description": null,
      "a": 31,
      "b": 58.0,
      "c": null
    },
    "BLK": {
      "value": "Blackwell\u0092s",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "GOS": {
      "value": "Blinkbox",
      "description": "Formerly GoSpoken/Mobcast. Deprecated",
      "a": 16,
      "b": 47.0,
      "c": 47.0
    },
    "BGI": {
      "value": "Bog & id\u00e9",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "BSK": {
      "value": "Boksnok",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    },
    "BSY": {
      "value": "Boksy",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    },
    "BKU": {
      "value": "Bokus",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "BLD": {
      "value": "Bolinda",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 41,
      "b": null,
      "c": null
    },
    "BCA": {
      "value": "Book Club Associates",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "BDO": {
      "value": "Book d\u0092oreille",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "BSL": {
      "value": "Book Solutions",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "BOO": {
      "value": "Bookbeat",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "BBI": {
      "value": "Bookbites",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "BSH": {
      "value": "Bookish",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "BMA": {
      "value": "Bookmate",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "BKP": {
      "value": "Bookpeople",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "BRB": {
      "value": "Books Etc",
      "description": "Deprecated",
      "a": 8,
      "b": 47.0,
      "c": 47.0
    },
    "BKM": {
      "value": "Books-A-Million",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "BKS": {
      "value": "Bookshout",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "BTP": {
      "value": "Booktopia",
      "description": null,
      "a": 29,
      "b": null,
      "c": null
    },
    "BKY": {
      "value": "Booky.fi",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "BRD": {
      "value": "Borders",
      "description": "Deprecated",
      "a": 8,
      "b": 47.0,
      "c": 47.0
    },
    "BRT": {
      "value": "British Bookshops",
      "description": "Deprecated",
      "a": 8,
      "b": 47.0,
      "c": 47.0
    },
    "CAI": {
      "value": "Cairn",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "CDL": {
      "value": "Casa del Libro",
      "description": null,
      "a": 20,
      "b": null,
      "c": null
    },
    "CDN": {
      "value": "CDON.com",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "CEB": {
      "value": "Ceebo",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "CFU": {
      "value": "CFU Danmark",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "CHP": {
      "value": "Chapter",
      "description": "Danish e-book retailer. Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "CHD": {
      "value": "Christianbook.com",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "CYM": {
      "value": "Citymarket",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "CMX": {
      "value": "Comixology",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 46,
      "b": null,
      "c": null
    },
    "COP": {
      "value": "Copia",
      "description": "Deprecated",
      "a": 24,
      "b": 47.0,
      "c": 47.0
    },
    "CST": {
      "value": "Costco",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "CRB": {
      "value": "Crate and Barrel",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "CVS": {
      "value": "CVS Drug Stores",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "CVM": {
      "value": "CVS Mediatheques",
      "description": "www.cvs-mediatheques.com",
      "a": 34,
      "b": null,
      "c": null
    },
    "CYB": {
      "value": "Cyberlibris",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "DAU": {
      "value": "Daunt Books",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "DEM": {
      "value": "De Marque",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "DSG": {
      "value": "Dick\u0092s Sporting Goods",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "DIL": {
      "value": "Dilicom",
      "description": null,
      "a": 27,
      "b": null,
      "c": null
    },
    "DYM": {
      "value": "Dymocks",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "EPA": {
      "value": "E-Pagine",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "ERD": {
      "value": "E-Reads",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "ELC": {
      "value": "Early Learning Centre",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "ESN": {
      "value": "Eason",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "EBC": {
      "value": "Ebooks Corp",
      "description": "www.ebooks.com",
      "a": 16,
      "b": null,
      "c": null
    },
    "ECH": {
      "value": "eChristian",
      "description": "Deprecated",
      "a": 16,
      "b": 47.0,
      "c": 47.0
    },
    "ECI": {
      "value": "El Corte Ingl\u00e9s",
      "description": null,
      "a": 20,
      "b": null,
      "c": null
    },
    "EKJ": {
      "value": "E-kirjasto",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    },
    "ELE": {
      "value": "Electre",
      "description": null,
      "a": 21,
      "b": null,
      "c": null
    },
    "ELB": {
      "value": "Publizon",
      "description": "Formerly Axiell Elib.se",
      "a": 16,
      "b": 63.0,
      "c": null
    },
    "ELI": {
      "value": "Elib Library",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "ELS": {
      "value": "Elisa",
      "description": "Only for use in ONIX 3.0 or later. Deprecated",
      "a": 47,
      "b": 67.0,
      "c": 67.0
    },
    "ELK": {
      "value": "Elisa Kirja Kuukausitilaus",
      "description": "Only for use in ONIX 3.0 or later. Deprecated",
      "a": 52,
      "b": 67.0,
      "c": 67.0
    },
    "ELL": {
      "value": "Ellibs.com",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "EMP": {
      "value": "Empik",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "ENH": {
      "value": "English Heritage",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "EPC": {
      "value": "Epic!",
      "description": "www.getepic.com",
      "a": 33,
      "b": null,
      "c": null
    },
    "ELN": {
      "value": "Ereolen.dk",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "EVB": {
      "value": "Everybook",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "FAI": {
      "value": "FairyLoot",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "FDB": {
      "value": "FeedBooks",
      "description": null,
      "a": 21,
      "b": null,
      "c": null
    },
    "FIN": {
      "value": "Findaway",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "FSP": {
      "value": "Fishpond",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "FLP": {
      "value": "FlipKart",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "FNC": {
      "value": "Fnac",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "FOL": {
      "value": "Follett",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "FRY": {
      "value": "Fry\u0092s Electronics",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "GMS": {
      "value": "Gamestop",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "GAR": {
      "value": "Gardners",
      "description": "(as a retail platform). Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    },
    "GLO": {
      "value": "Glose",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "GOO": {
      "value": "Google Books",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "HST": {
      "value": "Hastings Entertainment",
      "description": "Deprecated",
      "a": 8,
      "b": 47.0,
      "c": 47.0
    },
    "HMV": {
      "value": "HMV",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "HMD": {
      "value": "Home Depot",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "IMM": {
      "value": "Immat\u00e9riel.fr",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "IND": {
      "value": "Indigo-Chapters",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "INF": {
      "value": "Info.fi",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "ILT": {
      "value": "Inl\u00e4sningstj\u00e4nst",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "IBS": {
      "value": "Internet Bookshop Italia",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "IZN": {
      "value": "Izneo",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "JAM": {
      "value": "Jamera",
      "description": "Only for use in ONIX 3.0 or later. Deprecated",
      "a": 58,
      "b": 64.0,
      "c": 64.0
    },
    "JBH": {
      "value": "JB Hifi",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "JSM": {
      "value": "John Smith and Son",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "KMT": {
      "value": "K-Mart",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "KIP": {
      "value": "KIPA",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "KID": {
      "value": "Kirja&Idea",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "KPV": {
      "value": "Kirjastopalvelu",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "KRJ": {
      "value": "Kirja.fi",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "KNB": {
      "value": "KNFB/Blio",
      "description": null,
      "a": 17,
      "b": null,
      "c": null
    },
    "KNO": {
      "value": "Kno Inc",
      "description": "Deprecated",
      "a": 16,
      "b": 47.0,
      "c": 47.0
    },
    "KBO": {
      "value": "Kobo",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "KOO": {
      "value": "Koorong",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "KOR": {
      "value": "Kortext",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "KRG": {
      "value": "Kroger",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "LDL": {
      "value": "Lidl",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 60,
      "b": null,
      "c": null
    },
    "LEG": {
      "value": "Legible.com",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "LEX": {
      "value": "Lexplore",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "LTP": {
      "value": "Lehtipiste",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "LMB": {
      "value": "LoadMyBook",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "LWE": {
      "value": "Lowe\u0092s",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "MAC": {
      "value": "Mackin",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "MAG": {
      "value": "Magzter",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "MNO": {
      "value": "Maneno",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "MKS": {
      "value": "Marks and Spencer",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "MAT": {
      "value": "Matras",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "MMS": {
      "value": "Media Markt/Saturn",
      "description": "Also known as Media World",
      "a": 16,
      "b": null,
      "c": null
    },
    "ADP": {
      "value": "Messageries ADP",
      "description": null,
      "a": 33,
      "b": null,
      "c": null
    },
    "MCR": {
      "value": "Microcenter",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "MSF": {
      "value": "Microsoft",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 38,
      "b": null,
      "c": null
    },
    "MOF": {
      "value": "Mofibo",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "MRR": {
      "value": "Morrisons",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "MTC": {
      "value": "Mothercare",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "MYB": {
      "value": "MyBoox",
      "description": "Deprecated",
      "a": 21,
      "b": 47.0,
      "c": 47.0
    },
    "MYI": {
      "value": "MyiLibrary",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "NTR": {
      "value": "National Trust",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "NEX": {
      "value": "NEXT",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "NXT": {
      "value": "Nextory",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "NUM": {
      "value": "Numilog",
      "description": null,
      "a": 21,
      "b": null,
      "c": null
    },
    "ODL": {
      "value": "Odilo.us",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 55,
      "b": null,
      "c": null
    },
    "OFD": {
      "value": "Office Depot",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "OFM": {
      "value": "Office Max",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "OLF": {
      "value": "OLF",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "OVD": {
      "value": "OverDrive",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "OYS": {
      "value": "Oyster",
      "description": "Deprecated",
      "a": 29,
      "b": 47.0,
      "c": 47.0
    },
    "PER": {
      "value": "Perlego",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 67,
      "b": null,
      "c": null
    },
    "PST": {
      "value": "Past Times",
      "description": "Deprecated",
      "a": 8,
      "b": 47.0,
      "c": 47.0
    },
    "PTS": {
      "value": "Pet Smart",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "PTC": {
      "value": "Petco",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "PIC": {
      "value": "Piccoma",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 57,
      "b": null,
      "c": null
    },
    "PLY": {
      "value": "Play.com",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "POD": {
      "value": "Podimo",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "POY": {
      "value": "Podit Oy",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 54,
      "b": null,
      "c": null
    },
    "POK": {
      "value": "Pokkaritukku",
      "description": "Only for use in ONIX 3.0 or later. Deprecated",
      "a": 47,
      "b": 58.0,
      "c": 58.0
    },
    "PTB": {
      "value": "Pottery Barn",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "PLO": {
      "value": "Publio",
      "description": "Publio.pl. Only for use in ONIX 3.0 or later",
      "a": 65,
      "b": null,
      "c": null
    },
    "RDB": {
      "value": "Readbooks",
      "description": "Deprecated",
      "a": 21,
      "b": 47.0,
      "c": 47.0
    },
    "RCL": {
      "value": "ReadCloud",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "RST": {
      "value": "Restoration Hardware",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "RET": {
      "value": "Rethink",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "RTZ": {
      "value": "Ritz Camera",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "RMB": {
      "value": "RM Books",
      "description": "Deprecated",
      "a": 31,
      "b": 47.0,
      "c": 47.0
    },
    "RBD": {
      "value": "Rosebud",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "SGR": {
      "value": "S Group",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "SAC": {
      "value": "Sacrum",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "SAF": {
      "value": "Safari",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "SFW": {
      "value": "Safeway",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "SNS": {
      "value": "Sainsbury\u0092s",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "SAX": {
      "value": "Saxo",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "SCR": {
      "value": "Scribd",
      "description": null,
      "a": 29,
      "b": null,
      "c": null
    },
    "SLF": {
      "value": "Selfridges",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "SEQ": {
      "value": "Sequencity",
      "description": null,
      "a": 35,
      "b": null,
      "c": null
    },
    "SES": {
      "value": "Sesamy",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 54,
      "b": null,
      "c": null
    },
    "SBT": {
      "value": "Shanghai Book Traders",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "SKB": {
      "value": "Skoobe",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "SMW": {
      "value": "SmashWords",
      "description": null,
      "a": 26,
      "b": null,
      "c": null
    },
    "SNY": {
      "value": "Sony",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "SPO": {
      "value": "Spotify",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 63,
      "b": null,
      "c": null
    },
    "STP": {
      "value": "Staples",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "STH": {
      "value": "Storyhouse",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "STT": {
      "value": "Storytel",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "SKK": {
      "value": "Suomalainen Kirjakauppa",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "SPL": {
      "value": "Suomalainen Plus",
      "description": "Only for use in ONIX 3.0 or later. Deprecated",
      "a": 49,
      "b": 64.0,
      "c": 64.0
    },
    "SUP": {
      "value": "Supla+",
      "description": "Only for use in ONIX 3.0 or later. Deprecated",
      "a": 50,
      "b": 64.0,
      "c": 64.0
    },
    "SSK": {
      "value": "Suuri Suomalainen Kirjakerho",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "TRG": {
      "value": "Target",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "TES": {
      "value": "Tesco",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "TIK": {
      "value": "TikTok Shop",
      "description": "TikTok\u0092s in-app store. Only for use in ONIX 3.0 or later",
      "a": 65,
      "b": null,
      "c": null
    },
    "TOK": {
      "value": "Tokmanni",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "TOL": {
      "value": "Tolino",
      "description": null,
      "a": 31,
      "b": null,
      "c": null
    },
    "TSR": {
      "value": "Toys \u0092R\u0092 Us",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "TSO": {
      "value": "TSO (The Stationery Office)",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "TKK": {
      "value": "Turun kansallinen kirjakauppa",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 58,
      "b": null,
      "c": null
    },
    "TXR": {
      "value": "Txtr",
      "description": "Deprecated",
      "a": 24,
      "b": 47.0,
      "c": 47.0
    },
    "UBH": {
      "value": "Ugglan Bokhandel",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "VRG": {
      "value": "Virgin Megastores",
      "description": "Deprecated",
      "a": 8,
      "b": 47.0,
      "c": 47.0
    },
    "TEA": {
      "value": "Vivlio",
      "description": "Formerly The Ebook Alternative",
      "a": 21,
      "b": 59.0,
      "c": null
    },
    "WHS": {
      "value": "W H Smith",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "WTR": {
      "value": "Waitrose",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "WLM": {
      "value": "Wal-Mart",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "WST": {
      "value": "Waterstone\u0092s",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "WHT": {
      "value": "Whitcoul\u0092s",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "WLS": {
      "value": "Williams Sonoma",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "WLW": {
      "value": "Woolworths",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "YOU": {
      "value": "Youboox",
      "description": null,
      "a": 34,
      "b": null,
      "c": null
    },
    "YSC": {
      "value": "Youscribe",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 59,
      "b": null,
      "c": null
    },
    "ZVV": {
      "value": "Zavvi",
      "description": "Formerly Virgin Megastores (UK)",
      "a": 8,
      "b": null,
      "c": null
    },
    "PUB": {
      "value": "Publisher\u0092s own direct sales",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": null,
      "c": null
    },
    "ZZZ": {
      "value": "Other",
      "description": "Include retailer name in <SalesOutletName>",
      "a": 8,
      "b": null,
      "c": null
    }
  },
  "141": {
    "00": {
      "value": "Not barcoded",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Barcoded, scheme unspecified",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "GTIN-13",
      "description": "Barcode uses 13-digit EAN symbology (version NR without 5-digit extension). See (eg) https://bic.org.uk/wp-content/uploads/2022/11/2019.05.31-Bar-Coding-for-Books-rev-09.pdf or https://www.bisg.org/barcoding-guidelines-for-the-us-book-industry",
      "a": 9,
      "b": 59.0,
      "c": null
    },
    "03": {
      "value": "GTIN-13+5 (US dollar price encoded)",
      "description": "EAN symbology (version NK, first digit of 5-digit extension is 1\u00965)",
      "a": 9,
      "b": 59.0,
      "c": null
    },
    "04": {
      "value": "GTIN-13+5 (CAN dollar price encoded)",
      "description": "EAN symbology (version NK, first digit of 5-digit extension is 6)",
      "a": 9,
      "b": 59.0,
      "c": null
    },
    "05": {
      "value": "GTIN-13+5 (no price encoded)",
      "description": "EAN symbology (version NF, 5-digit extension is 90000\u009698999 for proprietary use \u0096 extension does not indicate a price)",
      "a": 9,
      "b": 59.0,
      "c": null
    },
    "06": {
      "value": "UPC-12 (item-specific)",
      "description": "AKA item/price",
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "UPC-12+5 (item-specific)",
      "description": "AKA item/price",
      "a": 9,
      "b": null,
      "c": null
    },
    "08": {
      "value": "UPC-12 (price-point)",
      "description": "AKA price/item",
      "a": 9,
      "b": null,
      "c": null
    },
    "09": {
      "value": "UPC-12+5 (price-point)",
      "description": "AKA price/item",
      "a": 9,
      "b": null,
      "c": null
    },
    "10": {
      "value": "GTIN-13+5 (UK Pound Sterling price encoded)",
      "description": "EAN symbology (version NK, first digit of 5-digit extension is 0)",
      "a": 57,
      "b": 59.0,
      "c": null
    },
    "11": {
      "value": "GTIN-13+5 (other price encoded)",
      "description": "EAN symbology (version NK, price currency by local agreement)",
      "a": 62,
      "b": null,
      "c": null
    },
    "12": {
      "value": "GTIN-13+2",
      "description": "EAN symbology (two-digit extension, normally indicating periodical issue number)",
      "a": 62,
      "b": null,
      "c": null
    },
    "13": {
      "value": "GTIN-13+5",
      "description": "EAN symbology (five-digit extension, normally indicating periodical issue number)",
      "a": 67,
      "b": null,
      "c": null
    }
  },
  "142": {
    "00": {
      "value": "Unknown / unspecified",
      "description": "Position unknown or unspecified",
      "a": 9,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Cover 4",
      "description": "The back cover of a book (or book jacket) \u0096 the recommended position",
      "a": 9,
      "b": 63.0,
      "c": null
    },
    "02": {
      "value": "Cover 3",
      "description": "The inside back cover of a book",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Cover 2",
      "description": "The inside front cover of a book",
      "a": 9,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Cover 1",
      "description": "The front cover of a book",
      "a": 9,
      "b": null,
      "c": null
    },
    "05": {
      "value": "On spine",
      "description": "The spine of a book",
      "a": 9,
      "b": null,
      "c": null
    },
    "06": {
      "value": "On box",
      "description": "Used only for boxed products",
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "On tag",
      "description": "Used only for products fitted with hanging tags",
      "a": 9,
      "b": null,
      "c": null
    },
    "08": {
      "value": "On bottom",
      "description": "Not be used for books unless they are contained within outer packaging",
      "a": 9,
      "b": null,
      "c": null
    },
    "09": {
      "value": "On back",
      "description": "Not be used for books unless they are contained within outer packaging",
      "a": 9,
      "b": null,
      "c": null
    },
    "10": {
      "value": "On outer sleeve / back",
      "description": "Used only for products packaged in outer sleeves",
      "a": 9,
      "b": null,
      "c": null
    },
    "11": {
      "value": "On removable wrapping",
      "description": "Used only for products packaged in shrink-wrap or other removable wrapping",
      "a": 9,
      "b": null,
      "c": null
    }
  },
  "143": {
    "00": {
      "value": "No known hazards or warnings",
      "description": "Product assessed but no known hazards or warnings applicable. May be applied to both digital and physical products. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "01": {
      "value": "WARNING: CHOKING HAZARD \u0096 Small parts | Not for children under 3 yrs.",
      "description": "Required on applicable products sold in the US",
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "WARNING: CHOKING HAZARD \u0096 Children under 8 yrs. can choke or suffocate on uninflated or broken balloons. Adult supervision required | Keep uninflated balloons from children. Discard broken balloons at once.",
      "description": "Required on applicable products sold in the US",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "WARNING: CHOKING HAZARD \u0096 This toy is a small ball | Not for children under 3 yrs.",
      "description": "Required on applicable products sold in the US",
      "a": 9,
      "b": null,
      "c": null
    },
    "04": {
      "value": "WARNING: CHOKING HAZARD \u0096 Toy contains a small ball | Not for children under 3 yrs.",
      "description": "Required on applicable products sold in the US",
      "a": 9,
      "b": null,
      "c": null
    },
    "05": {
      "value": "WARNING: CHOKING HAZARD \u0096 This toy is a marble | Not for children under 3 yrs.",
      "description": "Required on applicable products sold in the US",
      "a": 9,
      "b": null,
      "c": null
    },
    "06": {
      "value": "WARNING: CHOKING HAZARD \u0096 Toy contains a marble | Not for children under 3 yrs.",
      "description": "Required on applicable products sold in the US",
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "No choking hazard warning necessary",
      "description": "To be used when a supplier wishes to make a clear statement that no such warning is applicable to product",
      "a": 9,
      "b": null,
      "c": null
    },
    "08": {
      "value": "WARNING: STRANGULATION HAZARD \u0096 Long cord | Not for children under 3 yrs.",
      "description": "Required on applicable products sold in the US",
      "a": 57,
      "b": null,
      "c": null
    },
    "09": {
      "value": "No strangulation hazard warning necessary",
      "description": "To be used when a supplier wishes to make a clear statement that no such warning is applicable to product",
      "a": 57,
      "b": null,
      "c": null
    },
    "11": {
      "value": "WARNING: MAGNET HAZARD \u0096 Product contains (a) small magnet(s)",
      "description": "Required on applicable products sold in the US. Should be accompanied by additional text: Swallowed magnets can stick together across intestines causing serious infections and death. Seek immediate medical attention if magnet(s) are swallowed or inhaled",
      "a": 32,
      "b": null,
      "c": null
    },
    "12": {
      "value": "No magnet hazard warning necessary",
      "description": "To be used when a supplier wishes to make a clear statement that no such warning is applicable to product",
      "a": 46,
      "b": null,
      "c": null
    },
    "13": {
      "value": "WARNING \u0096 Flashing hazard",
      "description": "Product flashes, flickers or includes high-contrast static or moving patterns which may cause discomfort or seizures in people with photosensitive epilepsy",
      "a": 46,
      "b": null,
      "c": null
    },
    "14": {
      "value": "No flashing hazard warning necessary",
      "description": "To be used when a supplier wishes to make a clear statement that no such warning is applicable to product",
      "a": 46,
      "b": null,
      "c": null
    },
    "15": {
      "value": "WARNING \u0096 Sound hazard",
      "description": "Product makes loud, sudden, repetitive or other sounds which may trigger seizures in sensitive people",
      "a": 51,
      "b": null,
      "c": null
    },
    "16": {
      "value": "No sound hazard warning necessary",
      "description": "To be used when a supplier wishes to make a clear statement that no such warning is applicable to product",
      "a": 51,
      "b": null,
      "c": null
    },
    "17": {
      "value": "WARNING \u0096 Motion simulation hazard",
      "description": "Products simulates (via visual effects) the experience of motion, which may cause nausea in sensitive people",
      "a": 51,
      "b": null,
      "c": null
    },
    "18": {
      "value": "No motion simulation hazard warning necessary",
      "description": "To be used when a supplier wishes to make a clear statement that no such warning is applicable to product",
      "a": 51,
      "b": null,
      "c": null
    },
    "21": {
      "value": "WARNING \u0096 California Proposition 65 carcinogenic, teratogenic or other reproductively harmful chemical hazard",
      "description": "Required on applicable products sold in California. Must be accompanied in <ProductFormFeatureDescription> by specific additional text as displayed on product or packaging. For example, \u0093WARNING: This product can expose you to chemicals including [chemical name], which is known to the State of California to cause cancer. For more information, go to www.P65Warnings.ca.gov\u0094. Note long-form warnings should be used here, even if a short form warning is used on the product or packaging",
      "a": 46,
      "b": null,
      "c": null
    },
    "22": {
      "value": "No California Proposition 65 hazard warning necessary",
      "description": "To be used when a supplier wishes to make a clear statement that no such warning is applicable to product",
      "a": 46,
      "b": null,
      "c": null
    },
    "23": {
      "value": "California Proposition 65 chemical name",
      "description": "<ProductFormFeatureDescripton> carries the name of chemical that is the subject of a warning, taken from the list at www.p65warnings.ca.gov/chemicals",
      "a": 48,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Flashing risk unknown",
      "description": "Flashing present but risk unknown or unassessed",
      "a": 66,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Sound risk unknown",
      "description": "Sound present but risk unknown or unassessed",
      "a": 66,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Motion simulation risk unknown",
      "description": "Motion simulation present but risk unknown or unassessed",
      "a": 66,
      "b": null,
      "c": null
    }
  },
  "144": {
    "00": {
      "value": "None",
      "description": "Has no technical protection",
      "a": 9,
      "b": null,
      "c": null
    },
    "01": {
      "value": "DRM",
      "description": "Has DRM protection",
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Digital watermarking",
      "description": "Has digital watermarking",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Adobe DRM",
      "description": "Has DRM protection applied by the Adobe CS4 Content Server Package or by the Adobe ADEPT hosted service",
      "a": 10,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Apple DRM",
      "description": "Has FairPlay DRM protection applied via Apple proprietary online store",
      "a": 12,
      "b": null,
      "c": null
    },
    "05": {
      "value": "OMA DRM",
      "description": "Has OMA v2 DRM protection applied, as used to protect some mobile phone content",
      "a": 12,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Readium LCP DRM",
      "description": "Has Licensed Content Protection DRM applied by a Readium License Server. See https://readium.org/lcp-specs/",
      "a": 34,
      "b": 67.0,
      "c": null
    },
    "07": {
      "value": "Sony DRM",
      "description": "Has Sony DADC User Rights Management (URMS) DRM protection applied",
      "a": 34,
      "b": null,
      "c": null
    }
  },
  "145": {
    "00": {
      "value": "No constraints",
      "description": "Allows positive indication that there are no particular constraints (that can be specifed in <EpubUsageConstraint>). By convention, use 01 in <EpubUsageStatus>",
      "a": 52,
      "b": 57.0,
      "c": null
    },
    "01": {
      "value": "Preview",
      "description": "Preview before purchase. Allows a retail customer, account holder or patron to view or listen to a proportion of the book before purchase. Also applies to borrowers making use of \u0091acquisition on demand\u0092 models in libraries, and to \u0091subscription\u0092 models where the purchase is made on behalf of the reader",
      "a": 9,
      "b": 50.0,
      "c": null
    },
    "02": {
      "value": "Print",
      "description": "Print paper copy of extract",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Copy / paste",
      "description": "Make digital copy of extract",
      "a": 9,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Share",
      "description": "Share product across multiple concurrent devices. Allows a retail customer, account holder or patron to read the book across multiple devices linked to the same account. Also applies to readers in library borrowing and \u0091subscription\u0092 models",
      "a": 9,
      "b": 33.0,
      "c": null
    },
    "05": {
      "value": "Text to speech",
      "description": "\u0091Read aloud\u0092 with text to speech functionality",
      "a": 9,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Lend",
      "description": "Lendable by the purchaser to other device owner or account holder or patron, eg \u0091Lend-to-a-friend\u0092, library lending (where the library product has a separate <ProductIdentifier> from the consumer product). The \u0091primary\u0092 copy becomes unusable while the secondary copy is \u0091on loan\u0092 unless a number of concurrent borrowers is also specified",
      "a": 12,
      "b": 33.0,
      "c": null
    },
    "07": {
      "value": "Time-limited license",
      "description": "E-publication license is time-limited. Use with code 02 from List 146 and either a time period in days, weeks or months in <EpubUsageLimit>, or a Valid until date in <EpubUsageLimit>. The purchased copy becomes unusable when the license expires. For clarity, a perpetual license is the default, but may be specified explicitly with code 01 from list 146, or with code 02 and a limit <Quantity> of 0 days",
      "a": 13,
      "b": 47.0,
      "c": null
    },
    "08": {
      "value": "Loan renewal",
      "description": "Maximum number of consecutive loans or loan extensions (eg from a library) to a single device owner or account holder. Note that a limit of 1 indicates that a loan cannot be renewed or extended",
      "a": 32,
      "b": 37.0,
      "c": null
    },
    "09": {
      "value": "Multi-user license",
      "description": "E-publication license is multi-user. Maximum number of concurrent users licensed to use the product should be given in <EpubUsageLimit>. For clarity, unlimited concurrencyis the default, but may be specified explicitly with code 01 from list 146, or with code 02 and a limit <Quantity> of 0 users",
      "a": 36,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Preview on premises",
      "description": "Preview locally before purchase. Allows a retail customer, account holder or patron to view a proportion of the book (or the whole book, if no proportion is specified) before purchase, but ONLY while located physically in the retailer\u0092s store (eg while logged on to the store or library wifi). Also applies to patrons making use of \u0091acquisition on demand\u0092 models in libraries",
      "a": 44,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Text and data mining",
      "description": "Make use of the content of the product (text, images, audio etc) for extraction of useful (and possibly new) information through automated computer analysis. By convention, use 01 or 03 in <EpubUsageStatus>. Note 03 should be regarded as \u0091prohibited to the full extent allowed by law\u0092, or otherwise expressly reserved by the rightsholder, as in some jurisdictions, TDM may be subject to copyright exception (eg for not-for-profit purposes), subject to optional reservation, or allowed under \u0091fair use\u0092 doctrine",
      "a": 63,
      "b": null,
      "c": null
    }
  },
  "146": {
    "01": {
      "value": "Permitted unlimited",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Permitted subject to limit",
      "description": "Limit should be specified in <EpubUsageLimit> or <PriceConstraintLimit>",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Prohibited",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    }
  },
  "147": {
    "01": {
      "value": "Copies",
      "description": "Maximum number of copies that may be made of a permitted extract",
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Characters",
      "description": "Maximum number of characters in a permitted extract for a specified usage",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Words",
      "description": "Maximum number of words in a permitted extract for a specified usage",
      "a": 9,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Pages",
      "description": "Maximum number of pages in a permitted extract for a specified usage",
      "a": 9,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Percentage",
      "description": "Maximum percentage of total content in a permitted extract for a specified usage",
      "a": 9,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Devices",
      "description": "Maximum number of devices in \u0091share group\u0092",
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Concurrent users",
      "description": "Maximum number of concurrent users. NB where the number of concurrent users is specifically not limited, set the number of concurrent users to zero",
      "a": 9,
      "b": 15.0,
      "c": null
    },
    "15": {
      "value": "Users",
      "description": "Maximum number of licensed individual users, independent of concurrency of use",
      "a": 40,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Concurrent classes",
      "description": "Maximum number of licensed concurrent classes of user. A \u0091class\u0092 is a group of learners attending a specific course or lesson and generally taught as a group",
      "a": 45,
      "b": 53.0,
      "c": null
    },
    "20": {
      "value": "Classes",
      "description": "Maximum number of licensed classes of learners, independent of concurrency of use and the number of users per class",
      "a": 45,
      "b": 53.0,
      "c": null
    },
    "31": {
      "value": "Institutions",
      "description": "Maximum number of licensed institutions, independend of concurrency of use and the number of classes or individuals per institution",
      "a": 53,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Percentage per time period",
      "description": "Maximum percentage of total content which may be used in a specified usage per time period; the time period being specified as another <EpubUsageLimit> Quantity",
      "a": 11,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Days",
      "description": "Maximum time period in days (beginning from product purchase or activation)",
      "a": 11,
      "b": 36.0,
      "c": null
    },
    "13": {
      "value": "Weeks",
      "description": "Maximum time period in weeks",
      "a": 17,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Months",
      "description": "Maximum time period in months",
      "a": 17,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Hours minutes and seconds",
      "description": "Maximum amount of time in hours, minutes and seconds allowed in a permitted extract for a specified usage, in the format HHHMMSS (7 digits, with leading zeros if necessary)",
      "a": 42,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Days (fixed start)",
      "description": "Maximum time period in days (beginning from the product publication date). In effect, this defines a fixed end date for the license independent of the purchase or activation date",
      "a": 36,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Weeks (fixed start)",
      "description": "Maximum time period in weeks",
      "a": 36,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Months (fixed start)",
      "description": "Maximum time period in months",
      "a": 36,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Times",
      "description": "Maximum number of times a specified usage event may occur (in the lifetime of the product)",
      "a": 11,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Times per day",
      "description": "Maximum frequency a specified usage event may occur (per day)",
      "a": 36,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Times per month",
      "description": "Maximum frequency a specified usage event may occur (per month)",
      "a": 35,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Times per year",
      "description": "Maximum frequency a specified usage event may occur (per year)",
      "a": 35,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Dots per inch",
      "description": "Maximum resolution of printed or copy/pasted extracts",
      "a": 28,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Dots per cm",
      "description": "Maximum resolution of printed or copy/pasted extracts",
      "a": 36,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Allowed usage start page",
      "description": "Page number where allowed usage begins. <Quantity> should contain an absolute page number, counting the cover as page 1. (This type of page numbering should not be used where the e-publication has no fixed pagination). Use with (max number of) Pages, Percentage of content, or End page to specify pages allowed in Preview",
      "a": 14,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Allowed usage end page",
      "description": "Page number at which allowed usage ends. <Quantity> should contain an absolute page number, counting the cover as page 1. (This type of page numbering should not be used where the e-publication has no fixed pagination). Use with Start page to specify pages allowed in a preview",
      "a": 14,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Allowed usage start time",
      "description": "Time at which allowed usage begins. <Quantity> should contain an absolute time, counting from the beginning of an audio or video product, in the format HHHMMSS or HHHMMSScc. Use with Time, Percentage of content, or End time to specify time-based extract allowed in Preview",
      "a": 42,
      "b": 44.0,
      "c": null
    },
    "18": {
      "value": "Allowed usage end time",
      "description": "Time at which allowed usage ends. <Quantity> should contain an absolute time, counting from the beginning of an audio or video product, in the format HHHMMSS or HHHMMSScc. Use with Start time to specify time-based extract allowed in Preview",
      "a": 42,
      "b": 44.0,
      "c": null
    },
    "98": {
      "value": "Valid from",
      "description": "The date from which the usage constraint applies. <Quantity> is in the format YYYYMMDD",
      "a": 46,
      "b": null,
      "c": null
    },
    "99": {
      "value": "Valid to",
      "description": "The date until which the usage constraint applies. <Quantity> is in the format YYYYMMDD",
      "a": 46,
      "b": null,
      "c": null
    }
  },
  "148": {
    "00": {
      "value": "Unspecified (default)",
      "description": "Collection type is not determined",
      "a": 9,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Publisher collection",
      "description": "The collection is a bibliographic collection (eg a series or set (Fr. s\u00e9rie)) defined and identified by a publisher, either on the product itself or in product information supplied by the publisher. The books in the collection generally share a subject, narrative, design style or authorship. They may have a specific order, or the collection may be unordered",
      "a": 9,
      "b": 27.0,
      "c": null
    },
    "11": {
      "value": "Collection \u00e9ditoriale",
      "description": "The collection is a bibliographic collection defined and identified by a publisher, either on the product itself or in product information supplied by the publisher, where the books in the collection have no specific order (other than order of publication), shared subject, narrative, style or shared authorship, and are grouped by the publisher largely for marketing purposes. The collection has many of the characteristics of an imprint or marque. Used primarily in French book publishing, to distinguish between \u0091s\u00e9rie\u0092 (using the normal code 10) and \u0091collection\u0092 (code 11), and where the collection \u00e9ditoriale is not an imprint",
      "a": 27,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Ascribed collection",
      "description": "The collection has been defined and identified by a party in the metadata supply chain other than the publisher, typically an aggregator.",
      "a": 9,
      "b": null,
      "c": null
    }
  },
  "149": {
    "01": {
      "value": "Product",
      "description": "The title element refers to an individual product",
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Collection level",
      "description": "The title element refers to the top level of a bibliographic collection",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Subcollection",
      "description": "The title element refers to an intermediate level of a bibliographic collection that comprises two or more \u0091sub-collections\u0092",
      "a": 9,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Content item",
      "description": "The title element refers to a content item within a product, eg a work included in a combined or \u0091omnibus\u0092 edition, or a chapter in a book. Generally used only for titles within <ContentItem> (Block 3)",
      "a": 10,
      "b": 44.0,
      "c": null
    },
    "05": {
      "value": "Master brand",
      "description": "The title element names a multimedia franchise, licensed property or master brand where the use of the brand spans multiple collections and product forms, and possibly multiple imprints and publishers. It need not have a hierarchical relationship with title elements at other levels, or with other master brands. Used only for branded media properties carrying, for example, a children\u0092s character brand or film franchise branding",
      "a": 19,
      "b": 60.0,
      "c": null
    },
    "06": {
      "value": "Sub-subcollection",
      "description": "The title element refers to an intermediate level of a bibliographic collection that is a subdivision of a sub-collection (a third level of collective identity)",
      "a": 27,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Universe",
      "description": "The title element names a \u0091universe\u0092, where parallel or intersecting narratives spanning multiple works and multiple characters occur in the same consistent fictional setting. It need not have a hierarchical relationship with title elements at other levels, in particular with master brands. Used primarily for comic books, but applicable to other fiction where appropriate",
      "a": 65,
      "b": null,
      "c": null
    }
  },
  "150": {
    "00": {
      "value": "Undefined",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "AA": {
      "value": "Audio",
      "description": "Audio recording \u0096 detail unspecified. Use only when the form is unknown and no further detail can be provided. Prefer AZ plus <ProductFormDescription> if detail is available but no other A* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "AB": {
      "value": "Audio cassette",
      "description": "Audio cassette (analogue)",
      "a": 0,
      "b": null,
      "c": null
    },
    "AC": {
      "value": "CD-Audio",
      "description": "Audio compact disc: use for \u0091Red book\u0092 discs (conventional audio CD) and SACD, and use coding in <ProductFormDetail> to specify the format, if required",
      "a": 8,
      "b": null,
      "c": null
    },
    "AD": {
      "value": "DAT",
      "description": "Digital audio tape cassette",
      "a": 0,
      "b": null,
      "c": null
    },
    "AE": {
      "value": "Audio disc",
      "description": "Audio disc (excluding CD-Audio): use for \u0091Yellow book\u0092 (CD-Rom-style) discs, including for example mp3 CDs, and use coding in <ProductFormDetail> to specify the format of the data on the disc",
      "a": 0,
      "b": 37.0,
      "c": null
    },
    "AF": {
      "value": "Audio tape",
      "description": "Audio tape (analogue open reel tape)",
      "a": 0,
      "b": null,
      "c": null
    },
    "AG": {
      "value": "MiniDisc",
      "description": "Sony MiniDisc format",
      "a": 2,
      "b": null,
      "c": null
    },
    "AH": {
      "value": "CD-Extra",
      "description": "Audio compact disc with part CD-ROM content, also termed CD-Plus or Enhanced-CD: use for \u0091Blue book\u0092 and \u0091Yellow/Red book\u0092 two-session discs",
      "a": 2,
      "b": null,
      "c": null
    },
    "AI": {
      "value": "DVD Audio",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "AJ": {
      "value": "Downloadable audio file",
      "description": "Digital audio recording downloadable to the purchaser\u0092s own device(s)",
      "a": 2,
      "b": 39.0,
      "c": null
    },
    "AK": {
      "value": "Pre-recorded digital audio player",
      "description": "For example, Playaway audiobook and player: use coding in <ProductFormDetail> to specify the recording format, if required",
      "a": 11,
      "b": null,
      "c": null
    },
    "AL": {
      "value": "Pre-recorded SD card",
      "description": "For example, Audiofy audiobook chip",
      "a": 7,
      "b": null,
      "c": null
    },
    "AM": {
      "value": "LP",
      "description": "Vinyl disc (analogue).",
      "a": 38,
      "b": null,
      "c": null
    },
    "AN": {
      "value": "Downloadable and online audio file",
      "description": "Digital audio recording available both by download to the purchaser\u0092s own device(s) and by online (eg streamed) access",
      "a": 39,
      "b": null,
      "c": null
    },
    "AO": {
      "value": "Online audio file",
      "description": "Digital audio recording available online (eg streamed), not downloadable to the purchaser\u0092s own device(s)",
      "a": 39,
      "b": null,
      "c": null
    },
    "AZ": {
      "value": "Other audio format",
      "description": "Other audio format not specified by AB to AO. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "BA": {
      "value": "Book",
      "description": "Book \u0096 detail unspecified. Use only when the form is unknown and no further detail can be provided. Prefer BZ plus <ProductFormDescription> if detail is available but no other B* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "BB": {
      "value": "Hardback",
      "description": "Hardback or cased book",
      "a": 0,
      "b": null,
      "c": null
    },
    "BC": {
      "value": "Paperback / softback",
      "description": "Paperback or other softback book",
      "a": 0,
      "b": null,
      "c": null
    },
    "BD": {
      "value": "Loose-leaf",
      "description": "Loose-leaf book",
      "a": 0,
      "b": null,
      "c": null
    },
    "BE": {
      "value": "Spiral bound",
      "description": "Spiral, comb or coil bound book",
      "a": 0,
      "b": null,
      "c": null
    },
    "BF": {
      "value": "Pamphlet",
      "description": "Pamphlet, stapled (de: \u0091geheftet\u0092). Includes low-extent wire-stitched books bound without a distinct spine (eg many comic book \u0091floppies\u0092)",
      "a": 0,
      "b": 61.0,
      "c": null
    },
    "BG": {
      "value": "Leather / fine binding",
      "description": "Use <ProductFormDetail> to provide additional description",
      "a": 0,
      "b": null,
      "c": null
    },
    "BH": {
      "value": "Board book",
      "description": "Child\u0092s book with all pages printed on board",
      "a": 0,
      "b": null,
      "c": null
    },
    "BI": {
      "value": "Rag book",
      "description": "Child\u0092s book with all pages printed on textile",
      "a": 0,
      "b": null,
      "c": null
    },
    "BJ": {
      "value": "Bath book",
      "description": "Child\u0092s book printed on waterproof material",
      "a": 0,
      "b": null,
      "c": null
    },
    "BK": {
      "value": "Novelty book",
      "description": "A book whose novelty consists wholly or partly in a format which cannot be described by any other available code \u0096 a \u0091conventional\u0092 format code is always to be preferred; one or more Product Form Detail codes, eg from the B2nn group, should be used whenever possible to provide additional description",
      "a": 2,
      "b": null,
      "c": null
    },
    "BL": {
      "value": "Slide bound",
      "description": "Slide bound book",
      "a": 2,
      "b": null,
      "c": null
    },
    "BM": {
      "value": "Big book",
      "description": "Extra-large format for teaching etc; this format and terminology may be specifically UK; required as a top-level differentiator",
      "a": 2,
      "b": null,
      "c": null
    },
    "BN": {
      "value": "Part-work (fasc\u00edculo)",
      "description": "A part-work issued with its own ISBN and intended to be collected and bound into a complete book.",
      "a": 6,
      "b": null,
      "c": null
    },
    "BO": {
      "value": "Fold-out book or chart",
      "description": "Concertina-folded booklet or chart, designed to fold to pocket or regular page size, and usually bound within distinct board or card covers (de: \u0091Leporello\u0092)",
      "a": 8,
      "b": null,
      "c": null
    },
    "BP": {
      "value": "Foam book",
      "description": "A children\u0092s book whose cover and pages are made of foam",
      "a": 10,
      "b": null,
      "c": null
    },
    "BZ": {
      "value": "Other book format",
      "description": "Other book format or binding not specified by BB to BP. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "CA": {
      "value": "Sheet map",
      "description": "Sheet map \u0096 detail unspecified. Use only when the form is unknown and no further detail can be provided. Prefer CZ plus <ProductFormDescription> if detail is available but no other C* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "CB": {
      "value": "Sheet map, folded",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CC": {
      "value": "Sheet map, flat",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "CD": {
      "value": "Sheet map, rolled",
      "description": "See <ProductPackaging> and Codelist 80 for \u0091rolled in tube\u0092",
      "a": 0,
      "b": null,
      "c": null
    },
    "CE": {
      "value": "Globe",
      "description": "Globe or planisphere",
      "a": 0,
      "b": null,
      "c": null
    },
    "CZ": {
      "value": "Other cartographic",
      "description": "Other cartographic format not specified by CB to CE. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "DA": {
      "value": "Digital (on physical carrier)",
      "description": "Digital content delivered on a physical carrier (detail unspecified). Use only when the form is unknown and no further detail can be provided. Prefer DZ plus <ProductFormDescription> if detail is available but no other D* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "DB": {
      "value": "CD-ROM",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "DC": {
      "value": "CD-I",
      "description": "CD interactive: use for \u0091Green book\u0092 discs",
      "a": 0,
      "b": null,
      "c": null
    },
    "DE": {
      "value": "Game cartridge",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "DF": {
      "value": "Diskette",
      "description": "AKA \u0091floppy disc\u0092",
      "a": 0,
      "b": null,
      "c": null
    },
    "DI": {
      "value": "DVD-ROM",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "DJ": {
      "value": "Secure Digital (SD) Memory Card",
      "description": null,
      "a": 6,
      "b": null,
      "c": null
    },
    "DK": {
      "value": "Compact Flash Memory Card",
      "description": null,
      "a": 6,
      "b": null,
      "c": null
    },
    "DL": {
      "value": "Memory Stick Memory Card",
      "description": null,
      "a": 6,
      "b": null,
      "c": null
    },
    "DM": {
      "value": "USB Flash Drive",
      "description": null,
      "a": 6,
      "b": null,
      "c": null
    },
    "DN": {
      "value": "Double-sided CD/DVD",
      "description": "Double-sided disc, one side Audio CD/CD-ROM, other side DVD",
      "a": 7,
      "b": null,
      "c": null
    },
    "DO": {
      "value": "BR-ROM",
      "description": "(Blu Ray ROM)",
      "a": 51,
      "b": null,
      "c": null
    },
    "DZ": {
      "value": "Other digital carrier",
      "description": "Other carrier of digital content not specified by DB to DO. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "EA": {
      "value": "Digital (delivered electronically)",
      "description": "Digital content delivered electronically (delivery method unspecified). Use only when the form and delivery method is unknown, or when no other E* code applies and the delivery method is described in <ProductFormDescription>. Note, use <ProductFormDetail> to specify file format",
      "a": 9,
      "b": 64.0,
      "c": null
    },
    "EB": {
      "value": "Digital download and online",
      "description": "Digital content available both by download and by online access",
      "a": 9,
      "b": null,
      "c": null
    },
    "EC": {
      "value": "Digital online",
      "description": "Digital content accessed online only (eg streamed), not downloadable to the purchaser\u0092s own device(s)",
      "a": 9,
      "b": 67.0,
      "c": null
    },
    "ED": {
      "value": "Digital download",
      "description": "Digital content delivered by download only",
      "a": 9,
      "b": null,
      "c": null
    },
    "FA": {
      "value": "Film or transparency",
      "description": "Film or transparency \u0096 detail unspecified. Use only when the form is unknown and no further detail can be provided. Prefer FZ plus <ProductFormDescription> if detail is available but no other F* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "FC": {
      "value": "Slides",
      "description": "Photographic transparencies mounted for projection",
      "a": 0,
      "b": null,
      "c": null
    },
    "FD": {
      "value": "OHP transparencies",
      "description": "Transparencies for overhead projector",
      "a": 0,
      "b": null,
      "c": null
    },
    "FE": {
      "value": "Filmstrip",
      "description": "Photographic transparencies, unmounted but cut into short multi-frame strips",
      "a": 2,
      "b": null,
      "c": null
    },
    "FF": {
      "value": "Film",
      "description": "Continuous movie film as opposed to filmstrip",
      "a": 2,
      "b": null,
      "c": null
    },
    "FZ": {
      "value": "Other film or transparency format",
      "description": "Other film or transparency format not specified by FB to FF. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "LA": {
      "value": "Digital product license",
      "description": "Digital product license (delivery method unspecified). Use only when the form is unknown, or when no other L* code applies and the delivery method is described in <ProductFormDescription>",
      "a": 10,
      "b": 64.0,
      "c": null
    },
    "LB": {
      "value": "Digital product license key",
      "description": "Digital product license delivered through the retail supply chain as a physical \u0091key\u0092, typically a card or booklet containing a code enabling the purchaser to download the associated product",
      "a": 10,
      "b": null,
      "c": null
    },
    "LC": {
      "value": "Digital product license code",
      "description": "Digital product license delivered by email or other electronic distribution, typically providing a code enabling the purchaser to activate, upgrade or extend the license supplied with the associated product",
      "a": 10,
      "b": null,
      "c": null
    },
    "MA": {
      "value": "Microform",
      "description": "Microform \u0096 detail unspecified. Use only when the form is unknown and no further detail can be provided. Prefer MZ plus <ProductFormDescription> if detail is available but no other M* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "MB": {
      "value": "Microfiche",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "MC": {
      "value": "Microfilm",
      "description": "Roll microfilm",
      "a": 0,
      "b": null,
      "c": null
    },
    "MZ": {
      "value": "Other microform",
      "description": "Other microform not specified by MB or MC. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "PA": {
      "value": "Miscellaneous print",
      "description": "Miscellaneous printed material \u0096 detail unspecified. Use only when the form is unknown and no further detail can be provided. Prefer PZ plus <ProductFormDescription> if detail is available but no other P* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "PB": {
      "value": "Address book",
      "description": "May use <ProductFormDetail> codes P201 to P204 to specify binding",
      "a": 0,
      "b": null,
      "c": null
    },
    "PC": {
      "value": "Calendar",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PD": {
      "value": "Cards",
      "description": "Cards, flash cards (eg for teaching reading), revision cards, divination, playing or trading cards",
      "a": 0,
      "b": 48.0,
      "c": null
    },
    "PE": {
      "value": "Copymasters",
      "description": "Copymasters, photocopiable sheets",
      "a": 0,
      "b": null,
      "c": null
    },
    "PF": {
      "value": "Diary or journal",
      "description": "May use <ProductFormDetail> codes P201 to P204 to specify binding",
      "a": 0,
      "b": 48.0,
      "c": null
    },
    "PG": {
      "value": "Frieze",
      "description": "Narrow strip-shaped printed sheet used mostly for education or children\u0092s products (eg depicting alphabet, number line, procession of illustrated characters etc). Usually intended for horizontal display",
      "a": 0,
      "b": 14.0,
      "c": null
    },
    "PH": {
      "value": "Kit",
      "description": "Parts for post-purchase assembly, including card, wood or plastic parts or model components, interlocking construction blocks, beads and other crafting materials etc",
      "a": 0,
      "b": 51.0,
      "c": null
    },
    "PI": {
      "value": "Sheet music",
      "description": "May use <ProductFormDetail> codes P201 to P204 to specify binding",
      "a": 0,
      "b": 48.0,
      "c": null
    },
    "PJ": {
      "value": "Postcard book or pack",
      "description": "Including greeting cards and packs. For bound books (usually with perforated sheets to remove cards), may use <ProductFormDetail> codes P201 to P204 to specify binding",
      "a": 0,
      "b": 48.0,
      "c": null
    },
    "PK": {
      "value": "Poster",
      "description": "Poster for retail sale \u0096 see also XF",
      "a": 0,
      "b": null,
      "c": null
    },
    "PL": {
      "value": "Record book",
      "description": "Record book (eg \u0091birthday book\u0092, \u0091baby book\u0092): binding unspecified; may use <ProductFormDetail> codes P201 to P204 to specify binding",
      "a": 0,
      "b": null,
      "c": null
    },
    "PM": {
      "value": "Wallet or folder",
      "description": "Wallet, folder or box (containing loose sheets etc, or empty): it is preferable to code the contents and treat \u0091wallet\u0092 (or folder / box) as packaging in <ProductPackaging> with Codelist 80, but if this is not possible (eg where the product is empty and intended for storing other loose items) the product as a whole may be coded as a \u0091wallet\u0092. For binders intended for loose leaf or partwork publications intended to be updateable, see codes BD, BN",
      "a": 0,
      "b": 51.0,
      "c": null
    },
    "PN": {
      "value": "Pictures or photographs",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PO": {
      "value": "Wallchart",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "PP": {
      "value": "Stickers",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "PQ": {
      "value": "Plate (l\u00e1mina)",
      "description": "A book-sized (as opposed to poster-sized) sheet, usually in color or high quality print",
      "a": 6,
      "b": null,
      "c": null
    },
    "PR": {
      "value": "Notebook / blank book",
      "description": "A book with all pages blank for the buyer\u0092s own use; may use <ProductFormDetail> codes P201 to P204 to specify binding",
      "a": 8,
      "b": null,
      "c": null
    },
    "PS": {
      "value": "Organizer",
      "description": "May use <ProductFormDetail> codes P201 to P204 to specify binding",
      "a": 8,
      "b": null,
      "c": null
    },
    "PT": {
      "value": "Bookmark",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "PU": {
      "value": "Leaflet",
      "description": "Folded but unbound",
      "a": 42,
      "b": null,
      "c": null
    },
    "PV": {
      "value": "Book plates",
      "description": "Ex libris\u0092 book labels and packs",
      "a": 48,
      "b": null,
      "c": null
    },
    "PZ": {
      "value": "Other printed item",
      "description": "Other printed item not specified by PB to PQ. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "SA": {
      "value": "Multiple-component retail product",
      "description": "Presentation unspecified: format of product components must be given in <ProductPart>. Use only when the packaging of the product is unknown, or when no other S* code applies and the presentation is described in <ProductFormDescription>",
      "a": 9,
      "b": 64.0,
      "c": null
    },
    "SB": {
      "value": "Multiple-component retail product, boxed",
      "description": "Format of product components must be given in <ProductPart>",
      "a": 9,
      "b": 41.0,
      "c": null
    },
    "SC": {
      "value": "Multiple-component retail product, slip-cased",
      "description": "Format of product components must be given in <ProductPart>",
      "a": 9,
      "b": 41.0,
      "c": null
    },
    "SD": {
      "value": "Multiple-component retail product, shrink-wrapped",
      "description": "Format of product components must be given in <ProductPart>. Use code XL for a shrink-wrapped pack for trade supply, where the retail items it contains are intended for sale individually",
      "a": 9,
      "b": 41.0,
      "c": null
    },
    "SE": {
      "value": "Multiple-component retail product, loose",
      "description": "Format of product components must be given in <ProductPart>",
      "a": 9,
      "b": 41.0,
      "c": null
    },
    "SF": {
      "value": "Multiple-component retail product, part(s) enclosed",
      "description": "Multiple component product where subsidiary product part(s) is/are supplied as enclosures to the primary part, eg a book with a CD packaged in a sleeve glued within the back cover. Format of product components must be given in <ProductPart>",
      "a": 9,
      "b": 41.0,
      "c": null
    },
    "SG": {
      "value": "Multiple-component retail product, entirely digital",
      "description": "Multiple component product where all parts are digital, and delivered as separate files, eg a group of individual EPUB files, an EPUB with a PDF, an e-book with a license to access a range of online resources, etc. Format of product components must be given in <ProductPart>",
      "a": 60,
      "b": null,
      "c": null
    },
    "VA": {
      "value": "Video",
      "description": "Video \u0096 detail unspecified. Use only when the form is unknown and no further detail can be provided. Prefer VZ plus <ProductFormDescription> if detail is available but no other V* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "VF": {
      "value": "Videodisc",
      "description": "eg Laserdisc",
      "a": 0,
      "b": null,
      "c": null
    },
    "VI": {
      "value": "DVD video",
      "description": "DVD video: specify TV standard in <ProductFormDetail>",
      "a": 2,
      "b": null,
      "c": null
    },
    "VJ": {
      "value": "VHS video",
      "description": "VHS videotape: specify TV standard in <ProductFormDetail>",
      "a": 2,
      "b": null,
      "c": null
    },
    "VK": {
      "value": "Betamax video",
      "description": "Betamax videotape: specify TV standard in <ProductFormDetail>",
      "a": 2,
      "b": null,
      "c": null
    },
    "VL": {
      "value": "VCD",
      "description": "VideoCD",
      "a": 5,
      "b": null,
      "c": null
    },
    "VM": {
      "value": "SVCD",
      "description": "Super VideoCD",
      "a": 5,
      "b": null,
      "c": null
    },
    "VN": {
      "value": "HD DVD",
      "description": "High definition DVD disc, Toshiba HD DVD format",
      "a": 7,
      "b": null,
      "c": null
    },
    "VO": {
      "value": "Blu-ray",
      "description": "High definition DVD disc, Sony Blu-ray format",
      "a": 7,
      "b": null,
      "c": null
    },
    "VP": {
      "value": "UMD Video",
      "description": "Sony Universal Media disc",
      "a": 7,
      "b": null,
      "c": null
    },
    "VQ": {
      "value": "CBHD",
      "description": "China Blue High-Definition, derivative of HD-DVD",
      "a": 23,
      "b": null,
      "c": null
    },
    "VZ": {
      "value": "Other video format",
      "description": "Other video format not specified by VB to VQ. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 50.0,
      "c": null
    },
    "XA": {
      "value": "Trade-only material",
      "description": "Trade-only material (unspecified). Use only when the form is unknown and no further detail can be provided. Prefer XZ plus <ProductFormDescription> if detail is available but no other X* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "XB": {
      "value": "Dumpbin \u0096 empty",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "XC": {
      "value": "Dumpbin \u0096 filled",
      "description": "Dumpbin with contents. ISBN (where applicable) and format of contained items must be given in <ProductPart>",
      "a": 0,
      "b": 11.0,
      "c": null
    },
    "XD": {
      "value": "Counterpack \u0096 empty",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "XE": {
      "value": "Counterpack \u0096 filled",
      "description": "Counterpack with contents. ISBN (where applicable) and format of contained items must be given in <ProductPart>",
      "a": 0,
      "b": 11.0,
      "c": null
    },
    "XF": {
      "value": "Poster, promotional",
      "description": "Promotional poster for display, not for sale \u0096 see also PK",
      "a": 0,
      "b": null,
      "c": null
    },
    "XG": {
      "value": "Shelf strip",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "XH": {
      "value": "Window piece",
      "description": "Promotional piece for shop window display",
      "a": 0,
      "b": null,
      "c": null
    },
    "XI": {
      "value": "Streamer",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "XJ": {
      "value": "Spinner \u0096 empty",
      "description": null,
      "a": 0,
      "b": 51.0,
      "c": null
    },
    "XK": {
      "value": "Large book display",
      "description": "Large scale facsimile of book for promotional display",
      "a": 0,
      "b": null,
      "c": null
    },
    "XL": {
      "value": "Shrink-wrapped pack",
      "description": "A quantity pack with its own product code, usually for trade supply only: the retail items it contains are intended for sale individually. ISBN (where applicable) and format of contained items must be given in <ProductPart>. For products or product bundles supplied individually shrink-wrapped for retail sale, use code SD",
      "a": 0,
      "b": 11.0,
      "c": null
    },
    "XM": {
      "value": "Boxed pack",
      "description": "A quantity pack with its own product code, usually for trade supply only: the retail items it contains are intended for sale individually. ISBN (where applicable) and format of contained items must be given in <ProductPart>. For products or product bundles boxed individually for retail sale, use code SB",
      "a": 27,
      "b": null,
      "c": null
    },
    "XN": {
      "value": "Pack (outer packaging unspecified)",
      "description": "A quantity pack with its own product code, usually for trade supply only: the retail items it contains are intended for sale individually. ISBN (where applicable) and format of contained items must be given in <ProductPart>. Use only when the pack is neither shrinp-wrapped nor boxed",
      "a": 49,
      "b": null,
      "c": null
    },
    "XO": {
      "value": "Spinner \u0096 filled",
      "description": "Spinner with contents. ISBN(s) (where applicable) and detail of contained items must be given in <ProductPart>",
      "a": 51,
      "b": null,
      "c": null
    },
    "XY": {
      "value": "Other point of sale \u0096 including retail product",
      "description": "Other point of sale material not specified by XB to XO, supplied with included product(s) for retail sale. The retail product(s) must be described in <ProductPart>. Further detail of the POS material is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 51,
      "b": 53.0,
      "c": null
    },
    "XZ": {
      "value": "Other point of sale",
      "description": "Other point of sale material not specified by XB to XY, promotional or decorative. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 53.0,
      "c": null
    },
    "ZA": {
      "value": "General merchandise",
      "description": "General merchandise, book accessories and non-book products \u0096 unspecified. Use only when the form is unknown and no further detail can be provided. Prefer ZX, ZY or ZZ, plus <ProductFormDescription> if detail is available but no other Z* code applies",
      "a": 0,
      "b": 64.0,
      "c": null
    },
    "ZB": {
      "value": "Doll or figure",
      "description": "Including action figures, figurines",
      "a": 0,
      "b": 48.0,
      "c": null
    },
    "ZC": {
      "value": "Soft toy",
      "description": "Soft or plush toy",
      "a": 0,
      "b": null,
      "c": null
    },
    "ZD": {
      "value": "Toy",
      "description": "Including educational toys (where no other code is relevant)",
      "a": 0,
      "b": 48.0,
      "c": null
    },
    "ZE": {
      "value": "Game",
      "description": "Board game, or other game (except computer game: see DE and other D* codes)",
      "a": 0,
      "b": null,
      "c": null
    },
    "ZF": {
      "value": "T-shirt",
      "description": null,
      "a": 0,
      "b": null,
      "c": null
    },
    "ZG": {
      "value": "E-book reader",
      "description": "Dedicated e-book reading device, typically with mono screen",
      "a": 21,
      "b": null,
      "c": null
    },
    "ZH": {
      "value": "Tablet computer",
      "description": "General purpose tablet computer, typically with color screen",
      "a": 21,
      "b": null,
      "c": null
    },
    "ZI": {
      "value": "Audiobook player",
      "description": "Dedicated audiobook player device, typically including book-related features like bookmarking",
      "a": 25,
      "b": null,
      "c": null
    },
    "ZJ": {
      "value": "Jigsaw",
      "description": "Jigsaw or similar \u0091shapes\u0092 puzzle",
      "a": 25,
      "b": 48.0,
      "c": null
    },
    "ZK": {
      "value": "Mug",
      "description": "For example, branded, promotional or tie-in drinking mug, cup etc",
      "a": 34,
      "b": null,
      "c": null
    },
    "ZL": {
      "value": "Tote bag",
      "description": "For example, branded, promotional or tie-in bag",
      "a": 34,
      "b": null,
      "c": null
    },
    "ZM": {
      "value": "Tableware",
      "description": "For example, branded, promotional or tie-in plates, bowls etc (note for mugs and cups, use code ZK)",
      "a": 38,
      "b": null,
      "c": null
    },
    "ZN": {
      "value": "Umbrella",
      "description": "For example, branded, promotional or tie-in umbrella",
      "a": 38,
      "b": null,
      "c": null
    },
    "ZO": {
      "value": "Paints, crayons, pencils",
      "description": "Coloring set, including pens, chalks, etc",
      "a": 51,
      "b": null,
      "c": null
    },
    "ZP": {
      "value": "Handicraft kit",
      "description": "Handicraft kit or set, eg sewing, crochet, weaving, basketry, beadwork, leather, wood or metalworking, pottery and glassworking, candlemaking etc",
      "a": 60,
      "b": null,
      "c": null
    },
    "ZX": {
      "value": "Other toy/game accessories",
      "description": "Other toy, game and puzzle items not specified by ZB to ZQ, generally accessories to other products etc. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 50,
      "b": null,
      "c": null
    },
    "ZY": {
      "value": "Other apparel",
      "description": "Other apparel items not specified by ZB to ZQ, including branded, promotional or tie-in scarves, caps, aprons, dress-up costumes etc. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 25,
      "b": 51.0,
      "c": null
    },
    "ZZ": {
      "value": "Other merchandise",
      "description": "Other branded, promotional or tie-in merchandise not specified by ZB to ZY. Further detail is expected in <ProductFormDescription>, as <ProductFormDetail> and <ProductFormFeature> are unlikely to be sufficient",
      "a": 0,
      "b": 62.0,
      "c": null
    }
  },
  "151": {
    "00": {
      "value": "Associated with",
      "description": "To express unknown relationship types (for use when expressing legacy ONIX 2.1 data in ONIX 3.0)",
      "a": 50,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Born in",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Died in",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Formerly resided in",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Currently resides in",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Educated in",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Worked in",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Flourished in",
      "description": "(\u0091Floruit\u0092)",
      "a": 9,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Citizen of",
      "description": "Or nationality. For use with country codes only",
      "a": 20,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Registered in",
      "description": "The place of legal registration of an organization",
      "a": 46,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Operating from",
      "description": "The place an organization or part of an organization is based or operates from",
      "a": 46,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Eligible for geographical marketing programs",
      "description": "Contributor is eligible for national, regional or local marketing support. Use with country code, region code or country/region plus location, as appropriate",
      "a": 59,
      "b": null,
      "c": null
    }
  },
  "152": {
    "01": {
      "value": "No",
      "description": "Not illustrated",
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Yes",
      "description": "Illustrated",
      "a": 9,
      "b": null,
      "c": null
    }
  },
  "153": {
    "01": {
      "value": "Sender-defined text",
      "description": "To be used only in circumstances where the parties to an exchange have agreed to include text which (a) is not for general distribution, and (b) cannot be coded elsewhere. If more than one type of text is sent, it must be identified by tagging within the text itself",
      "a": 10,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Short description/annotation",
      "description": "Of the product. Limited to a maximum of 350 characters. In ONIX 3.0, this is assumed to include markup characters. In ONIX 3.1 and later, this limit does not include markup",
      "a": 10,
      "b": 66.0,
      "c": null
    },
    "03": {
      "value": "Description",
      "description": "Of the product. Length unrestricted",
      "a": 10,
      "b": 60.0,
      "c": null
    },
    "04": {
      "value": "Table of contents",
      "description": "Used for a table of contents sent as a single text field, which may or may not carry structure expressed using XHTML",
      "a": 10,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Primary cover copy",
      "description": "Primary descriptive blurb usually taken from the back cover or jacket, or occasionally from the cover/jacket flaps. See also code 27",
      "a": 10,
      "b": 50.0,
      "c": null
    },
    "06": {
      "value": "Review quote",
      "description": "A quote taken from a review of the product or of the work in question where there is no need to take account of different editions",
      "a": 10,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Review quote: previous edition",
      "description": "A quote taken from a review of a previous edition of the work",
      "a": 10,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Review quote: previous work",
      "description": "A quote taken from a review of a previous work by the same author(s) or in the same series",
      "a": 10,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Endorsement",
      "description": "A quote usually provided by a celebrity or another author to promote a new book, not from a review",
      "a": 10,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Promotional headline",
      "description": "A promotional phrase which is intended to headline a description of the product",
      "a": 10,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Feature",
      "description": "Text describing a feature of a product to which the publisher wishes to draw attention for promotional purposes. Each separate feature should be described by a separate repeat, so that formatting can be applied at the discretion of the receiver of the ONIX record, or multiple features can be described using appropriate XHTML markup",
      "a": 10,
      "b": 22.0,
      "c": null
    },
    "12": {
      "value": "Biographical note",
      "description": "A note referring to all contributors to a product \u0096 NOT linked to a single contributor",
      "a": 10,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Publisher\u0092s notice",
      "description": "A statement included by a publisher in fulfillment of contractual obligations, such as a disclaimer, sponsor statement, or legal notice of any sort. Note that the inclusion of such a notice cannot and does not imply that a user of the ONIX record is obliged to reproduce it",
      "a": 10,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Excerpt",
      "description": "A short excerpt from the main text of the work",
      "a": 10,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Index",
      "description": "Used for an index sent as a single text field, which may be structured using XHTML",
      "a": 17,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Short description/annotation for collection",
      "description": "(of which the product is a part.) Limited to a maximum of 350 characters",
      "a": 17,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Description for collection",
      "description": "(of which the product is a part.) Length unrestricted",
      "a": 17,
      "b": null,
      "c": null
    },
    "18": {
      "value": "New feature",
      "description": "As code 11 but used for a new feature of this edition or version",
      "a": 22,
      "b": null,
      "c": null
    },
    "19": {
      "value": "Version history",
      "description": null,
      "a": 22,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Open access statement",
      "description": "Short summary statement of open access status and any related conditions (eg \u0091Open access \u0096 no commercial use\u0092), primarily for marketing purposes. Should always be accompanied by a link to the complete license (see <EpubLicense> or code 99 in List 158)",
      "a": 22,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Digital exclusivity statement",
      "description": "Short summary statement that the product is available only in digital formats (eg \u0091Digital exclusive\u0092). If a non-digital version is planned, <ContentDate> should be used to specify the date when exclusivity will end (use content date role code 15). If a non-digital version is available, the statement should not be included",
      "a": 28,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Official recommendation",
      "description": "For example a recommendation or approval provided by a ministry of education or other official body. Use <Text> to provide details and ideally use <TextSourceCorporate> to name the approver",
      "a": 29,
      "b": null,
      "c": null
    },
    "23": {
      "value": "JBPA description",
      "description": "Short description in format specified by Japanese Book Publishers Association",
      "a": 32,
      "b": null,
      "c": null
    },
    "24": {
      "value": "schema.org snippet",
      "description": "JSON-LD snippet suitable for use within an HTML <script type=\u0092application/ld+json\u0092> tag, containing structured metadata suitable for use with schema.org",
      "a": 36,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Errata",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Introduction",
      "description": "Introduction, preface or the text of other preliminary material, sent as a single text field, which may be structured using XHTML",
      "a": 40,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Secondary cover copy",
      "description": "Secondary descriptive blurb taken from the cover/jacket flaps, or occasionally from the back cover or jacket, used only when there are two separate texts and the primary text is included using code 05",
      "a": 43,
      "b": 50.0,
      "c": null
    },
    "28": {
      "value": "Full cast and credit list",
      "description": "For use with dramatized audiobooks, filmed entertainment etc, for a cast list sent as a single text field, which may or may not carry structure expressed using XHTML",
      "a": 43,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Bibliography",
      "description": "Complete list of books by the author(s), supplied as a single text field, which may be structured using (X)HTML",
      "a": 44,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Abstract",
      "description": "Formal summary of content (normally used with academic and scholarly content only)",
      "a": 46,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Rules or instructions",
      "description": "Eg for a game, kit",
      "a": 48,
      "b": null,
      "c": null
    },
    "32": {
      "value": "List of contents",
      "description": "Eg for a game, kit. Note: use code 04 for a Table of Contents of a book",
      "a": 50,
      "b": null,
      "c": null
    },
    "33": {
      "value": "Short description/annotation for imprint",
      "description": "Length limited to a maximum of 350 characters",
      "a": 59,
      "b": null,
      "c": null
    },
    "34": {
      "value": "Description for imprint",
      "description": "Length unrestricted",
      "a": 59,
      "b": null,
      "c": null
    },
    "35": {
      "value": "Short description/annotation for publisher",
      "description": "Length limited to a maximum of 350 characters",
      "a": 59,
      "b": null,
      "c": null
    },
    "36": {
      "value": "Description for publisher",
      "description": "Length unrestricted",
      "a": 59,
      "b": null,
      "c": null
    },
    "37": {
      "value": "Cover line",
      "description": "(US) Reading line \u0096 line of usually explanatory copy on cover, somewhat like a subtitle but not on the title page and added by the publisher, eg \u0091with 125 illustrated recipes\u0092",
      "a": 61,
      "b": null,
      "c": null
    }
  },
  "154": {
    "00": {
      "value": "Unrestricted",
      "description": "Any audience",
      "a": 10,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Restricted",
      "description": "Distribution by agreement between the parties to the ONIX exchange (this value is provided to cover applications where ONIX content includes material which is not for general distribution)",
      "a": 10,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Booktrade",
      "description": "Distributors, bookstores, publisher\u0092s own staff etc",
      "a": 10,
      "b": null,
      "c": null
    },
    "03": {
      "value": "End-customers",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Librarians",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Teachers",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Students",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Press",
      "description": "Press or other media",
      "a": 10,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Shopping comparison service",
      "description": "Where a specially formatted description is required for this audience",
      "a": 10,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Search engine index",
      "description": "Text not intended for display, but may be used (in addition to any less restricted text) for indexing and search",
      "a": 32,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Bloggers",
      "description": "(Including vloggers, influencers etc) Where this is distinct from end customers or the Press",
      "a": 50,
      "b": null,
      "c": null
    }
  },
  "155": {
    "01": {
      "value": "Publication date",
      "description": "Nominal date of publication (of the content item or supporting resource)",
      "a": 10,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Broadcast date",
      "description": "Date when a TV or radio program was / will be broadcast",
      "a": 10,
      "b": null,
      "c": null
    },
    "14": {
      "value": "From date",
      "description": "Date from which a content item or supporting resource may be referenced or used. The content is embargoed until this date",
      "a": 10,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Until date",
      "description": "Date until which a content item or supporting resource may be referenced or used",
      "a": 10,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Last updated",
      "description": "Date when a resource was last changed or updated",
      "a": 10,
      "b": null,
      "c": null
    },
    "24": {
      "value": "From\u0085 until date",
      "description": "Combines From date and Until date to define a period (both dates are inclusive). Use for example with dateformat 06",
      "a": 16,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Available from",
      "description": "Date from which a supporting resource is available for download. Note that this date also implies that it can be immediately displayed to the intended audience, unless a From date (code 14) is also supplied and is later than the Available from date",
      "a": 20,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Available until",
      "description": "Date until which a supporting resource is available for download. Note that this date does not imply it must be removed from display to the intended audience on this date \u0096 for this, use Until date (code 15)",
      "a": 20,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Associated start date",
      "description": "Start date referenced by the supporting resource, for example, the \u0091earliest exam date\u0092 for an official recommendation",
      "a": 38,
      "b": null,
      "c": null
    },
    "32": {
      "value": "Associated end date",
      "description": "End date referenced by the supporting resource, for example, the \u0091latest exam date\u0092 for an official recommendation",
      "a": 38,
      "b": null,
      "c": null
    }
  },
  "156": {
    "01": {
      "value": "Review",
      "description": "The full text of a review in a third-party publication in any medium",
      "a": 10,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Bestseller list",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Media mention",
      "description": "Other than a review",
      "a": 10,
      "b": null,
      "c": null
    },
    "04": {
      "value": "\u0091One locality, one book\u0092 program",
      "description": "Inclusion in a program such as \u0091Chicago Reads\u0092, \u0091Seattle Reads\u0092, \u0091Canada Reads\u0092, \u0091One Dublin, one book\u0092",
      "a": 10,
      "b": 53.0,
      "c": null
    },
    "05": {
      "value": "Curated list",
      "description": "For example a \u0091best books of the year\u0092 or \u009125 books you should have read\u0092 list, without regard to their bestseller status",
      "a": 37,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Commentary / discussion",
      "description": "For example a third party podcast episode, social media message, newsletter issue, other commentary (see also code 03 for very brief items)",
      "a": 53,
      "b": null,
      "c": null
    }
  },
  "157": {
    "01": {
      "value": "Printed media",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Website",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Radio",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "04": {
      "value": "TV",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    }
  },
  "158": {
    "01": {
      "value": "Front cover",
      "description": "2D",
      "a": 10,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Back cover",
      "description": "2D",
      "a": 10,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Cover / pack",
      "description": "Not limited to front or back, including 3D perspective",
      "a": 10,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Contributor picture",
      "description": "Photograph or portrait of contributor(s)",
      "a": 10,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Series image / artwork",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Series logo",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Product image / artwork",
      "description": "For example, an isolated image from the front cover (without text), image of a completed jigsaw",
      "a": 10,
      "b": 50.0,
      "c": null
    },
    "08": {
      "value": "Product logo",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Publisher logo",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Imprint logo",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Contributor interview",
      "description": null,
      "a": 10,
      "b": 12.0,
      "c": null
    },
    "12": {
      "value": "Contributor presentation",
      "description": "Contributor presentation and/or commentary",
      "a": 10,
      "b": 12.0,
      "c": null
    },
    "13": {
      "value": "Contributor reading",
      "description": null,
      "a": 10,
      "b": 12.0,
      "c": null
    },
    "14": {
      "value": "Contributor event schedule",
      "description": "Link to a schedule in iCalendar format",
      "a": 10,
      "b": 12.0,
      "c": null
    },
    "15": {
      "value": "Sample content",
      "description": "For example: a short excerpt, sample text or a complete sample chapter, page images, screenshots etc",
      "a": 10,
      "b": null,
      "c": null
    },
    "16": {
      "value": "Widget",
      "description": "A \u0091look inside\u0092 feature presented as a small embeddable application",
      "a": 10,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Review",
      "description": "Review text held in a separate downloadable file, not in the ONIX record. Equivalent of code 06 in List 153. Use the <TextContent> composite for review quotes carried in the ONIX record. Use the <CitedContent> composite for a third-party review which is referenced from the ONIX record. Use <SupportingResource> for review text offered as a separate file resource for reproduction as part of promotional material for the product",
      "a": 10,
      "b": 11.0,
      "c": null
    },
    "18": {
      "value": "Commentary / discussion",
      "description": "For example a publisher\u0092s podcast episode, social media message, newsletter issue, other commentary",
      "a": 10,
      "b": 53.0,
      "c": null
    },
    "19": {
      "value": "Reading group guide",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Teacher\u0092s guide",
      "description": "Incuding associated teacher / instructor resources",
      "a": 10,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Feature article",
      "description": "Feature article provided by publisher",
      "a": 10,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Character \u0091interview\u0092",
      "description": "Fictional character \u0091interview\u0092",
      "a": 10,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Wallpaper / screensaver",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Press release",
      "description": null,
      "a": 10,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Table of contents",
      "description": "A table of contents held in a separate downloadable file, not in the ONIX record. Equivalent of code 04 in List 153. Use the <TextContent> composite for a table of contents carried in the ONIX record. Use <Supporting Resource> for text offered as a separate file resource",
      "a": 11,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Trailer",
      "description": "A promotional video (or audio), similar to a movie trailer (sometimes referred to as a \u0091book trailer\u0092)",
      "a": 11,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Cover thumbnail",
      "description": "Intended ONLY for transitional use, where ONIX 2.1 records referencing existing thumbnail assets of unknown pixel size are being re-expressed in ONIX 3.0. Use code 01 for all new cover assets, and where the pixel size of older assets is known",
      "a": 14,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Full content",
      "description": "The full content of the product (or the product itself), supplied for example to support full-text search or indexing",
      "a": 17,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Full cover",
      "description": "Includes cover, back cover, spine and \u0096 where appropriate \u0096 any flaps",
      "a": 17,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Master brand logo",
      "description": null,
      "a": 20,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Description",
      "description": "Descriptive text in a separate downloadable file, not in the ONIX record. Equivalent of code 03 in List 153. Use the <TextContent> composite for descriptions carried in the ONIX record. Use <Supporting Resource> for text offered as a separate file resource for reproduction as part of promotional material for the product",
      "a": 27,
      "b": null,
      "c": null
    },
    "32": {
      "value": "Index",
      "description": "Index text held in a separate downloadable file, not in the ONIX record. Equivalent of code 15 in List 153. Use the <TextContent> composite for index text carried in the ONIX record. Use <Supporting Resource> for an index offered as a separate file resource",
      "a": 27,
      "b": null,
      "c": null
    },
    "33": {
      "value": "Student\u0092s guide",
      "description": "Including associated student / learner resources",
      "a": 30,
      "b": null,
      "c": null
    },
    "34": {
      "value": "Publisher\u0092s catalogue",
      "description": "For example a PDF or other digital representation of a publisher\u0092s \u0091new titles\u0092 or range catalog",
      "a": 31,
      "b": null,
      "c": null
    },
    "35": {
      "value": "Online advertisement panel",
      "description": "For example a banner ad for the product. Pixel dimensions should typically be included in <ResourceVersionFeature>",
      "a": 31,
      "b": null,
      "c": null
    },
    "36": {
      "value": "Online advertisement page",
      "description": "(de: \u0091B\u00fahnenbild\u0092)",
      "a": 31,
      "b": null,
      "c": null
    },
    "37": {
      "value": "Promotional event material",
      "description": "For example, posters, logos, banners, advertising templates for use in connection with a promotional event",
      "a": 31,
      "b": null,
      "c": null
    },
    "38": {
      "value": "Digital review copy",
      "description": "Availability of a digital review, evaluation or sample copy, or a digital proof copy, which may be limited to authorised users or account holders, but should otherwise be fully readable and functional",
      "a": 31,
      "b": 57.0,
      "c": null
    },
    "39": {
      "value": "Instructional material",
      "description": "For example, video showing how to use the product",
      "a": 32,
      "b": null,
      "c": null
    },
    "40": {
      "value": "Errata",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "41": {
      "value": "Introduction",
      "description": "Introduction, preface or other preliminary material in a separate resource file",
      "a": 40,
      "b": null,
      "c": null
    },
    "42": {
      "value": "Collection description",
      "description": "Descriptive material in a separate resource file, not in the ONIX record. Equivalent of code 17 in List 153. Use the <TextContent> composite for collection descriptions carried in the ONIX record. Use <Supporting Resource> for material (which need not be solely only) offered as a separate file resource for reproduction as part of promotional material for the product and collection",
      "a": 40,
      "b": null,
      "c": null
    },
    "43": {
      "value": "Bibliography",
      "description": "Complete list of books by the author(s), supplied as a separate resource file",
      "a": 44,
      "b": null,
      "c": null
    },
    "44": {
      "value": "Abstract",
      "description": "Formal summary of content (normally used with academic and scholarly content only)",
      "a": 46,
      "b": null,
      "c": null
    },
    "45": {
      "value": "Cover holding image",
      "description": "Image that may be used for promotional purposes in place of a front cover, ONLY where the front cover itself cannot be provided or used for any reason. Typically, holding images may comprise logos, artwork or an unfinished front cover image. Senders should ensure removal of the holding image from the record as soon as a cover image is available. Recipients must ensure replacement of the holding image with the cover image when it is supplied",
      "a": 46,
      "b": null,
      "c": null
    },
    "46": {
      "value": "Rules or instructions",
      "description": "Eg for a game, kit",
      "a": 48,
      "b": null,
      "c": null
    },
    "47": {
      "value": "Transcript",
      "description": "Full transcript of audio or video content of the product",
      "a": 51,
      "b": null,
      "c": null
    },
    "48": {
      "value": "Full cast and credit list",
      "description": "For use with dramatised audiobooks, filmed entertainment etc, for a cast list sent as a separate resource file, not in the ONIX record. Equivalent of code 28 in List 153",
      "a": 57,
      "b": null,
      "c": null
    },
    "49": {
      "value": "Image for social media",
      "description": "Image \u0096 not specifically a cover image or artwork, contributor image, or logo \u0096 explicitly intended for use in social media",
      "a": 62,
      "b": null,
      "c": null
    },
    "50": {
      "value": "Supplementary learning resources",
      "description": "Eg downloadable worksheets, home learning materials",
      "a": 63,
      "b": null,
      "c": null
    },
    "51": {
      "value": "Cover flap",
      "description": "2D, front or back flap image",
      "a": 64,
      "b": null,
      "c": null
    },
    "52": {
      "value": "Warning label",
      "description": "Image of any warning label or hazard warning text on product or packaging",
      "a": 66,
      "b": null,
      "c": null
    },
    "53": {
      "value": "Product safety contacts",
      "description": "Document giving full contact detail, including postal addresses, for product safety contacts at publisher or supplier",
      "a": 67,
      "b": null,
      "c": null
    },
    "99": {
      "value": "License",
      "description": "Link to a license covering permitted usage of the product content. Deprecated in favor of <EpubLicense>. This was a temporary workaround in ONIX 3.0, and use of <EpubLicense> is strongly preferred",
      "a": 22,
      "b": 24.0,
      "c": 24.0
    }
  },
  "159": {
    "01": {
      "value": "Application",
      "description": "An executable together with data on which it operates",
      "a": 10,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Audio",
      "description": "A sound recording",
      "a": 10,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Image",
      "description": "A still image",
      "a": 10,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Text",
      "description": "Readable text, with or without associated images etc",
      "a": 10,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Video",
      "description": "Moving images, with or without accompanying sound",
      "a": 10,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Multi-mode",
      "description": "A website or other supporting resource delivering content in a variety of modes",
      "a": 10,
      "b": null,
      "c": null
    }
  },
  "160": {
    "01": {
      "value": "Required credit",
      "description": "Credit that must be displayed when a resource is used (eg \u0091Photo Jerry Bauer\u0092 or \u0091\u00a9 Magnum Photo\u0092). Credit text should be carried in <FeatureNote>",
      "a": 12,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Caption",
      "description": "Explanatory caption that may accompany a resource (eg use to identify an author in a photograph). Caption text should be carried in <FeatureNote>",
      "a": 12,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Copyright holder",
      "description": "Copyright holder of resource (indicative only, as the resource can be used without consultation). Copyright text should be carried in <FeatureNote>",
      "a": 12,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Length in minutes",
      "description": "Approximate length in minutes of an audio or video resource. <FeatureValue> should contain the length of time as an integer number of minutes",
      "a": 12,
      "b": null,
      "c": null
    },
    "05": {
      "value": "ISNI of resource contributor",
      "description": "Use to link resource such as a contributor image to a contributor unambiguously. Use for example with Resource Content types 04, 11\u009614 from List 158, particularly where the product has more than a single contributor. <FeatureValue> contains the 16-digit ISNI, which must match an ISNI given in an instance of <Contributor>",
      "a": 27,
      "b": 66.0,
      "c": null
    },
    "06": {
      "value": "Proprietary ID of resource contributor",
      "description": "Use to link resource such as a contributor image to a contributor unambiguously. Use for example with Resource Content types 04, 11\u009614 from List 158, particularly where the product has more than a single contributor. <FeatureValue> contains the proprietary ID, which must match a proprietary ID given in an instance of <Contributor>",
      "a": 32,
      "b": 66.0,
      "c": null
    },
    "07": {
      "value": "Resource alternative text",
      "description": "<FeatureNote> is Alternative text for the resource, which might be presented to visually-impaired readers",
      "a": 52,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Background color of image resource",
      "description": "<FeatureValue> is a 24-bit RGB or 32-bit RBGA color in hexadecimal, eg fff2de for an opaque warm cream. Used when the resource \u0096 for example a 3D image of the product \u0096 includes a background, or if used with an alpha channel, when the image is irregularly shaped or contains a semi-transparent shadow thrown against a background",
      "a": 52,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Attribute of product image resource",
      "description": "<FeatureValue> is an ONIX code from List 256 that describes an attribute of a product image resource (eg perspective of 3D view, content)",
      "a": 52,
      "b": 66.0,
      "c": null
    },
    "10": {
      "value": "Background color of page",
      "description": "<FeatureValue> is a 24-bit RGB color in hexadecimal, eg ffc300 for a rich yellow-orange, used when the resource supplier requests a specific background color be displayed behind the resource on a web page",
      "a": 52,
      "b": null,
      "c": null
    },
    "11": {
      "value": "ORCID of resource contributor",
      "description": "Use to link resource such as a contributor image to a contributor unambiguously, for example with Resource Content types 04, 11\u009614 from List 158, particularly where the product has more than a single contributor. <FeatureValue> contains the 16-digit ISNI, which must match an ORCID given in an instance of <Contributor>",
      "a": 66,
      "b": null,
      "c": null
    }
  },
  "161": {
    "01": {
      "value": "Linkable resource",
      "description": "A resource that may be accessed by a hyperlink. The current host (eg the ONIX sender, who may be the publisher) will provide ongoing hosting services for the resource for the active life of the product (or at least until the Until Date specified in <ContentDate>). The ONIX recipient may embed the URL in a consumer facing-website (eg as the src attribute in an <img> link), and need not host an independent copy of the resource",
      "a": 10,
      "b": 12.0,
      "c": null
    },
    "02": {
      "value": "Downloadable file",
      "description": "A file that may be downloaded on demand for third-party use. The ONIX sender will host a copy of the resource until the specified Until Date, but only for the ONIX recipient\u0092s direct use. The ONIX recipient should download a copy of the resource, and must host an independent copy of the resource if it is used on a consumer-facing website. Special attention should be paid to the \u0091Last Updated\u0092 <ContentDate> to ensure the independent copy of the resource is kept up to date",
      "a": 10,
      "b": 12.0,
      "c": null
    },
    "03": {
      "value": "Embeddable application",
      "description": "An application which is supplied in a form which can be embedded into a third-party webpage. As type 02, except the resource contains active content such as JavaScript, Flash, etc",
      "a": 10,
      "b": 12.0,
      "c": null
    }
  },
  "162": {
    "01": {
      "value": "File format",
      "description": "Resource Version Feature Value carries a code from List 178",
      "a": 10,
      "b": 11.0,
      "c": null
    },
    "02": {
      "value": "Image height in pixels",
      "description": "Resource Version Feature Value carries an integer",
      "a": 10,
      "b": 11.0,
      "c": null
    },
    "03": {
      "value": "Image width in pixels",
      "description": "Resource Version Feature Value carries an integer",
      "a": 10,
      "b": 11.0,
      "c": null
    },
    "04": {
      "value": "Filename",
      "description": "Resource Version Feature Value carries the filename of the supporting resource, necessary only when it is different from the last part of the path provided in <ResourceLink>",
      "a": 11,
      "b": 44.0,
      "c": null
    },
    "05": {
      "value": "Approximate download file size in megabytes",
      "description": "Resource Version Feature Value carries a decimal number only, suggested no more than 2 or 3 significant digits (eg 1.7, not 1.7462 or 1.75MB)",
      "a": 11,
      "b": 17.0,
      "c": null
    },
    "06": {
      "value": "MD5 hash value",
      "description": "MD5 hash value of the resource file. <ResourceVersionFeatureValue> should contain the 128-bit digest value (as 32 hexadecimal digits). Can be used as a cryptographic check on the integrity of a resource after it has been retrieved",
      "a": 12,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Exact download file size in bytes",
      "description": "Resource Version Feature Value carries a integer number only (eg 1831023)",
      "a": 17,
      "b": null,
      "c": null
    },
    "08": {
      "value": "SHA-256 hash value",
      "description": "SHA-256 hash value of the resource file. <ResourceVersionFeatureValue> should contain the 256-bit digest value (as 64 hexadecimal digits). Can be used as a cryptographic check on the integrity of a resource after it has been retrieved",
      "a": 28,
      "b": null,
      "c": null
    },
    "09": {
      "value": "ISCC",
      "description": "International Standard Content Code, a \u0091similarity hash\u0092 derived algorithmically from the resource content itself (see https://iscc.codes). <IDValue> is the ISCC-CODE generated from a digital manifestation of the work, as a variable-length case-insensitive alphanumeric string (or 55 characters including three hyphens if using ISCC v1.0, but this is deprecated). Note alphabetic characters in v1.x ISCCs use Base32 encoding and are conventionally upper case. The \u0091ISCC:\u0092 prefix is omitted",
      "a": 50,
      "b": 62.0,
      "c": null
    },
    "10": {
      "value": "Previous filename",
      "description": "<ResourceVersionFeatureValue> carries the previous filename of the supporting resource, necessary only when it is different from the last part of the path provided in <ResourceLink> and from the filename provided using <ResourceVersionFeatureType> code 04, and when the data sender suggests the recipient delete this old file. Note that the \u0091trigger\u0092 to update the resource and delete the old file is provided by the Resource version\u0092s <ContentDate>",
      "a": 66,
      "b": null,
      "c": null
    }
  },
  "163": {
    "01": {
      "value": "Publication date",
      "description": "Nominal date of publication. This date is primarily used for planning, promotion and other business process purposes, and is not necessarily the first date for retail sales or fulfillment of pre-orders. In the absence of a sales embargo date, retail sales and pre-order fulfillment may begin as soon as stock is available to the retailer",
      "a": 9,
      "b": 40.0,
      "c": null
    },
    "02": {
      "value": "Sales embargo date",
      "description": "If there is an embargo on retail sales (in the market) before a certain date, the date from which the embargo is lifted and retail sales and fulfillment of pre-orders are permitted. (In some markets, this may be termed a \u0091strict on-sale date\u0092.)In the absence of an embargo date, retail sales and pre-order fulfillment may begin as soon as stock is available to the retailer",
      "a": 12,
      "b": 67.0,
      "c": null
    },
    "09": {
      "value": "Public announcement date",
      "description": "Date when a new product may be announced to the general public. Prior to the announcement date, the product data is intended for internal use by the recipient and supply chain partners only. After the announcement date, or in the absence of an announcement date, the planned product may be announced to the public as soon as metadata is available",
      "a": 9,
      "b": 46.0,
      "c": null
    },
    "10": {
      "value": "Trade announcement date",
      "description": "Date when a new product may be announced to the book trade only. Prior to the announcement date, the product information is intended for internal use by the recipient only. After the announcement date, or in the absence of a trade announcement date, the planned product may be announced to supply chain partners (but not necessarily made public \u0096 see the Public announcement date) as soon as metadata is available",
      "a": 9,
      "b": 46.0,
      "c": null
    },
    "11": {
      "value": "Date of first publication",
      "description": "Date when the work incorporated in a product was first published. For works in translation, see also Date of first publication in original language (code 20)",
      "a": 9,
      "b": 40.0,
      "c": null
    },
    "12": {
      "value": "Latest reprint date",
      "description": "Date when a product was most recently reprinted",
      "a": 9,
      "b": 67.0,
      "c": null
    },
    "13": {
      "value": "Out-of-print / permanently withdrawn date",
      "description": "Date when a product was (or will be) declared out-of-print, permanently withdrawn from sale or deleted",
      "a": 9,
      "b": 58.0,
      "c": null
    },
    "16": {
      "value": "Latest reissue date",
      "description": "Date when a product was most recently reissued",
      "a": 9,
      "b": 67.0,
      "c": null
    },
    "19": {
      "value": "Publication date of print counterpart",
      "description": "Date of publication of a printed book which is the direct print counterpart to a digital product. The counterpart product may be included in <RelatedProduct> using code 13",
      "a": 11,
      "b": 40.0,
      "c": null
    },
    "20": {
      "value": "Date of first publication in original language",
      "description": "Date when the original language version of work incorporated in a product was first published (note, use only on works in translation \u0096 see code 11 for first publication date in the translated language)",
      "a": 13,
      "b": 40.0,
      "c": null
    },
    "21": {
      "value": "Forthcoming reissue date",
      "description": "Date when a product will be reissued",
      "a": 13,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Expected availability date after temporary withdrawal",
      "description": "Date when a product that has been temporary withdrawn from sale or recalled for any reason is expected to become available again, eg after correction of quality or technical issues",
      "a": 15,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Review embargo date",
      "description": "Date from which reviews of a product may be published eg in newspapers and magazines or online. Provided to the book trade for information only: newspapers and magazines are not expected to be recipients of ONIX metadata",
      "a": 16,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Publisher\u0092s reservation order deadline",
      "description": "Latest date on which an order may be placed with the publisher for guaranteed delivery prior to the publication date. May or may not be linked to a special reservation or pre-publication price",
      "a": 18,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Forthcoming reprint date",
      "description": "Date when a product will be reprinted",
      "a": 18,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Preorder embargo date",
      "description": "Earliest date a retail \u0091preorder\u0092 can be placed (in the market), where this is distinct from the public announcement date. In the absence of a preorder embargo, advance orders can be placed as soon as metadata is available to the consumer (this would be the public announcement date, or in the absence of a public announcement date, the earliest date metadata is available to the retailer)",
      "a": 25,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Transfer date",
      "description": "Date of acquisition of product by new publisher (use with publishing roles 09 and 13)",
      "a": 28,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Date of production",
      "description": "For an audiovisual work (eg on DVD)",
      "a": 30,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Streaming embargo date",
      "description": "For digital products that are available to end customers both as a download and streamed, the earliest date the product can be made available on a stream, where the streamed version becomes available later than the download. For the download, see code 02 if it is embargoed or code 01 if there is no embargo",
      "a": 43,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Subscription embargo date",
      "description": "For digital products that are available to end customers both as purchases and as part of a subscription package, the earliest date the product can be made available by subscription, where the product may not be included in a subscription package until shome while after publication. For ordinary sales, see code 02 if there is a sales embargo or code 01 if there is no embargo",
      "a": 43,
      "b": null,
      "c": null
    },
    "35": {
      "value": "CIP date",
      "description": "Date by which CIP copy is required for inclusion in the product",
      "a": 51,
      "b": null,
      "c": null
    }
  },
  "164": {
    "01": {
      "value": "Manifestation of",
      "description": "Product A is or includes a manifestation of work X. (There is a direct parent\u0096child relation between work X and the product). The instance of <RelatedWork> must include an identifier for work X",
      "a": 9,
      "b": 59.0,
      "c": null
    },
    "02": {
      "value": "Derived from",
      "description": "Product A is or includes a manifestation of a work X which is derived (directly) from related work W in one or more of the ways specified in the former ISTC rules. (There is a relationship between a grandparent work W and a parent work X, and between that parent work and the product.) This relation type is intended to enable products with a common \u0091grandparent\u0092 work to be linked without specifying the precise nature of their derivation, and without necessarily assigning an identifier to the product\u0092s parent work X. The instance of <RelatedWork> must include an identifier for work W. Codes 20\u009630 may be used instead to provide details of the derivation of work X from work W",
      "a": 9,
      "b": 59.0,
      "c": null
    },
    "03": {
      "value": "Related work is derived from this",
      "description": "Product A is a manifestation of a work X from which related work Y is (directly) derived in one or more of the ways specified in the former ISTC rules. (There is a relationship between a parent work X and a child work Y, and between the parent work X and the product.) The instance of <RelatedWork> must include an identifier for work Y. Codes 40\u009650 may be used instead to provide details of the derivation of work Y from work X",
      "a": 13,
      "b": 59.0,
      "c": null
    },
    "04": {
      "value": "Other work in same (bibliographic) collection",
      "description": "Product A is a manifestation of a work X in the same (bibliographic) collection as related work Z. (There is a relationship between the parent work X and a \u0091same collection\u0092 work Z, and between the parent work X and the product.) The instance of <RelatedWork> must include an identifier for work Z",
      "a": 13,
      "b": 59.0,
      "c": null
    },
    "05": {
      "value": "Other work by same contributor",
      "description": "Product A is a manifestation of a work X by the same contributor(s) as related work Z. (There is a relationship between the parent work X and a work Z where X and Z have at least one contributor in common, and between the parent work X and the product.) The instance of <RelatedWork> must include an identifier for work Z",
      "a": 13,
      "b": 59.0,
      "c": null
    },
    "06": {
      "value": "Manifestation of original work",
      "description": "Product A is or includes a manifestation of work X. (There is a direct parent\u0096child relation between work X and the product, and work X is original, ie not a derived work of any kind \u0096 there is no work W.) The instance of <RelatedWork> must include an identifier for work X. See code 01 if the originality of X is unspecified or unknown",
      "a": 59,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Derived from by abridgement",
      "description": "Product A is or includes a manifestation of a work X which is derived directly from related work W by abridgement. (There is a relationship between the grandparent [unabridged] work W and the parent [abridged] work X, and between the parent work X and the product.) The instance of <RelatedWork> must include an identifier for [unabridged] work W. <EditionType> of product A would normally be ABR. See code 02 if the method of derivation of X from W is unknown or unstated. The [abridged] parent work X may be identified using a separate instance of <RelatedWork> with relation code 01",
      "a": 59,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Derived from by annotation",
      "description": "Product A is or includes a manifestation of a work X which is derived directly from related work W by annotation. The instance of <RelatedWork> must include an identifier for [unullnotated] work W. <EditionType> of product X would normally be ANN, VAR etc. See code 02 if the method of derivation of X from W is unknown or unstated. The [annotated] parent work X may be identified using a separate instance of <RelatedWork> with relation code 01",
      "a": 59,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Derived from by compilation",
      "description": "The content of the work X has been formed by compilation of work W and another work Z. The instance of <RelatedWork> must include an identifier for work W. <EditionType> of product A may be CMB. Work Z may be identified using a separate instance of <RelatedWork> with code 23. The compiled parent work X may be identified using a separate instance of <Related> work with relation code 01",
      "a": 59,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Derived from by criticism",
      "description": "The content of the work W has been augmented by the addition of critical commendary to form work X. The instance of <RelatedWork> must include an identifier for work W. <EditionType> of Product A would normally be CRI",
      "a": 59,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Derived from by excerption",
      "description": "The content of the work X is an excerpt from work W. The instance of <RelatedWork> must include an identifier for [complete] work W",
      "a": 59,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Derived from by expurgation",
      "description": "Offensive or unsuitable text material has been removed from work W to form work X. The instance of <RelatedWork> must include an identifier for [unsuitable] work W. <EditionType> of Product A would normally be EXP",
      "a": 59,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Derived from by addition (of non-text material)",
      "description": "The content of work W has been augmented by the addition of significant non-textual elements to form work X. The instance of <RelatedWork> must include an identifier for [unaugmented] work W. <EditionType> of product A may be ILL, ENH etc",
      "a": 59,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Derived from by revision",
      "description": "The content of work W has been revised and/or expanded or enlarged to form work X [including addition, deletion or replacement of text material]. The instance of <RelatedWork> must include an identifier for [unrevised] work W. <EditionType> of product A may be REV, NED, etc, or A may be numbered",
      "a": 59,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Derived from via translation",
      "description": "The content of work W has been translated into another language to form work X. The instance of <RelatedWork> must include an identifier for [untranslated] work W",
      "a": 59,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Derived from via adaptation",
      "description": "The content of work W has been adapted [into a different literary form] to form work X. The instance of <RelatedWork> must include an identifier for [unadapted] work W. <EditionType> of product A would normally be ADP, ACT etc",
      "a": 59,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Derived from by subtraction (of non-text material)",
      "description": "The content of work W has been modified by the removal of significant non-textual elements to form work X. The instance of <RelatedWork> must include an identifier for work W",
      "a": 59,
      "b": null,
      "c": null
    },
    "41": {
      "value": "Related work is derived from this by abridgement",
      "description": "Product A is a manifestation of a work X from which the related work Y is (directly) derived by abridgement. (There is a relationship between the parent [unabridged] work X and the child [abridged] work Y, and between parent work X and the product.) The instance of <RelatedWork> must include the identifier for [abridged] work Y. See code 03 if the method of derivation of Y from X is unknown or unstated. The [unabridged] parent work X may be identified using a separate instance of <RelatedWork> with relation code 01 or 06",
      "a": 59,
      "b": null,
      "c": null
    },
    "42": {
      "value": "Related work is derived from this by annotation",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "43": {
      "value": "Related work is derived from this by compilation",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "44": {
      "value": "Related work is derived from this by criticism",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "45": {
      "value": "Related work is derived from this by excerption",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "46": {
      "value": "Related work is derived from this by expurgation",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "47": {
      "value": "Related work is derived from this by addition (of non-text material)",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "48": {
      "value": "Related work is derived from this by revision",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "49": {
      "value": "Related work is derived from this via translation",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "50": {
      "value": "Related work is derived from this via adaptation",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "51": {
      "value": "Derived from this by subtraction (of non-text material)",
      "description": null,
      "a": 59,
      "b": null,
      "c": null
    },
    "98": {
      "value": "Manifestation of LRM work",
      "description": "Product A is or includes a manifestation of an expression of LRM work X. Do not use, except as a workaround for differences between LRM works and expressions, and ONIX works in LRM library practice, and always also include a relationship to an ONIX work using code 01",
      "a": 63,
      "b": null,
      "c": null
    },
    "99": {
      "value": "Manifestation of LRM expression",
      "description": "Product A is or includes a manifestation of an LRM expression with the same content, same agents and in the same modality (text, audio, video etc) as work X. Do not use, except as a workaround for differences between LRM expressions and ONIX works in LRM library practice, and always also include a relationship to an ONIX work using code 01",
      "a": 63,
      "b": null,
      "c": null
    }
  },
  "165": {
    "01": {
      "value": "Supplier\u0092s sales classification",
      "description": "A rating applied by a supplier (typically a wholesaler) to indicate its assessment of the expected or actual sales performance of a product",
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Supplier\u0092s bonus eligibility",
      "description": "A supplier\u0092s coding of the eligibility of a product for a bonus scheme on overall sales",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Publisher\u0092s sales classification",
      "description": "A rating applied by the publisher to indicate a sales category (eg backlist/frontlist, core stock etc). Use only when the publisher is not the \u0091supplier\u0092",
      "a": 13,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Supplier\u0092s pricing restriction classification",
      "description": "A classification applied by a supplier to a product sold on Agency terms, to indicate that retail price restrictions are applicable",
      "a": 15,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Supplier\u0092s sales expectation",
      "description": "Code is the ISBN of another book that had sales (both in terms of copy numbers and customer profile) comparable to that the distributor or supplier estimates for the product. <SupplierCodeValue> must be an ISBN-13 or GTIN-13",
      "a": 31,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Publisher\u0092s sales expectation",
      "description": "Code is the ISBN of another book that had sales (both in terms of copy numbers and customer profile) comparable to that the publisher estimates for the product. <SupplierCodeValue> must be an ISBN-13 or GTIN-13",
      "a": 31,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Supplier\u0092s order routing eligibility",
      "description": "Code indicates whether an order can be placed with the supplier indirectly via an intermediary system. The code name type indicates the specific intermediate order aggregation/routing platform and the code indicates the eligibility",
      "a": 47,
      "b": null,
      "c": null
    }
  },
  "166": {
    "02": {
      "value": "Sales embargo date",
      "description": "If there is an embargo on retail sales (of copies from the supplier) before a certain date and this is later than any general or market-wide embargo date, the date from which the embargo is lifted and retail sales and fulfillment of pre-orders are permitted. Use code 02 here ONLY in the exceptional case when the embargo is supplier-specific. More general market-wide or global sales embargos should be specified in <MarketDate> or <PublishingDate> codes. In the absence of any supplier-specific, market-wide or general embargo date, retail sales and pre-order fulfillment may begin as soon as stock is available to the retailer",
      "a": 9,
      "b": 43.0,
      "c": null
    },
    "08": {
      "value": "Expected availability date",
      "description": "The date on which physical stock is expected to be available to be shipped from the supplier to retailers, or a digital product is expected to be released by the publisher or digital asset distributor to retailers or their retail platform providers",
      "a": 9,
      "b": null,
      "c": null
    },
    "18": {
      "value": "Last date for returns",
      "description": "Last date when returns will be accepted, generally for a product which is being remaindered or put out of print",
      "a": 11,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Reservation order deadline",
      "description": "Latest date on which an order may be placed for guaranteed delivery prior to the publication date. May or may not be linked to a special reservation or pre-publication price",
      "a": 17,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Last redownload date",
      "description": "Latest date on which existing owners or licensees may download or re-download a copy of the product. Existing users may continue to use their local copy of the product",
      "a": 38,
      "b": null,
      "c": null
    },
    "30": {
      "value": "Last TPM date",
      "description": "Date on which any required technical protection measures (DRM) support will be withdrawn. DRM-protected products may not be usable after this date",
      "a": 38,
      "b": null,
      "c": null
    },
    "34": {
      "value": "Expected warehouse date",
      "description": "The date on which physical stock is expected to be delivered to the supplier from the manufacturer or from a primary distributor. For the distributor or wholesaler (the supplier) this is the \u0091goods in\u0092 date, as contrasted with the Expected availability date, code 08, which is the \u0091goods out\u0092 date",
      "a": 41,
      "b": null,
      "c": null
    },
    "50": {
      "value": "New supplier start date",
      "description": "First date on which the supplier specified in <NewSupplier> will accept orders. Note the first date would typically be the day after the old supplier end date, but they may overlap if there is an agreement to forward any orders between old and new supplier for fulfillment",
      "a": 34,
      "b": null,
      "c": null
    },
    "51": {
      "value": "Supplier end date",
      "description": "Last date on which the supplier specified in <Supplier> will accept orders. New supplier should be specified where available. Note last date would typically be the day before the new supplier start date, but they may overlap if there is an agreement to forward any orders between old and new supplier for fulfillment",
      "a": 34,
      "b": null,
      "c": null
    }
  },
  "167": {
    "00": {
      "value": "No conditions",
      "description": "Allows positive indication that there are no conditions (the default if <PriceCondition> is omitted)",
      "a": 20,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Includes updates",
      "description": "Purchase at this price includes specified updates",
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Must also purchase updates",
      "description": "Purchase at this price requires commitment to purchase specified updates, not included in price",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Updates available",
      "description": "Updates may be purchased separately, no minimum commitment required",
      "a": 9,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Linked subsequent purchase price",
      "description": "Use with <PriceConditionQuantity> and <ProductIdentifier>. Purchase at this price requires commitment to purchase the specified linked product, which is not included in the price",
      "a": 43,
      "b": 57.0,
      "c": null
    },
    "05": {
      "value": "Linked prior purchase price",
      "description": "Use with <PriceConditionQuantity> and <ProductIdentifier>. Purchase at this price requires prior purchase of the specified linked product",
      "a": 24,
      "b": 57.0,
      "c": null
    },
    "06": {
      "value": "Linked price",
      "description": "Use with <PriceConditionQuantity> and <ProductIdentifier>. Purchase at this price requires simultaneous purchase of the specified linked product, which is not included in the price",
      "a": 24,
      "b": 57.0,
      "c": null
    },
    "07": {
      "value": "Auto-renewing",
      "description": "The rental or subscription will automatically renew at the end of the period unless actively cancelled",
      "a": 48,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Combined price",
      "description": "Purchase at this price includes the price of the specified other product",
      "a": 53,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Rental duration",
      "description": "The duration of the rental to which the price applies. Deprecated, use <PriceConstraint> instead",
      "a": 20,
      "b": 34.0,
      "c": 34.0
    },
    "11": {
      "value": "Rental to purchase",
      "description": "Purchase at this price requires prior rental of the product. <PriceConditionQuantity> gives minimum prior rental period, and <ProductIdentifier> may be used if rental uses a different product identifier",
      "a": 24,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Rental extension",
      "description": "Upgrade to longer rental duration. <PriceConditionQuantity> gives minimum prior rental duration, and <ProductIdentifier> may be used if rental uses a different product identifier. Separate price constraint with time limited license duration (code 07) specifies the new combined rental duration",
      "a": 26,
      "b": 34.0,
      "c": null
    }
  },
  "168": {
    "01": {
      "value": "Time period",
      "description": "The price condition quantity represents a time period",
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Number of updates",
      "description": "The price condition quantity is a number of updates",
      "a": 9,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Number of linked products",
      "description": "Use with Price condition type 06 and a Quantity of units. Price is valid when purchased with a specific number of products from a list of product identifiers provided in the associated <ProductIdentifier> composites. Use for example when describing a price for this product which is valid if it is purchased along with any two from a list of other products",
      "a": 38,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Number of copies of this product",
      "description": "Use with Price condition type 06 and a Quantity of units. Meeting the Price condition qualifies for purchase of a specified number of copies of this product at this price. Use for example when describing a price that applies to the specified number of units of this product which is valid if they are purchased along with a number of copies of another product",
      "a": 57,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Minimum number of linked products",
      "description": "Use with Price condition type 06 and a Quantity of units. Price is valid when purchased with at least a specific number of products from a list of product identifiers provided in the associated <ProductIdentifier> composites. Use for example when describing a price for this product which is valid if it is purchased along with any two from a list of other products",
      "a": 61,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Maximum number of copies of this product",
      "description": "(at this price). Use with Price condition type 06 and a Quantity of units. Meeting the Price condition qualifies for purchase of up to the specified number of copies of this product at this price. Use for example when describing a price that applies to the specified number of units of this product which is valid if they are purchased along with a number of copies of another product",
      "a": 61,
      "b": null,
      "c": null
    }
  },
  "169": {
    "00": {
      "value": "Units",
      "description": "The quantity refers to a unit implied by the quantity type",
      "a": 9,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Days",
      "description": null,
      "a": 20,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Weeks",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Months",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Years",
      "description": null,
      "a": 20,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Classes",
      "description": "Multiple copies or units suitable for a class. A \u0091class\u0092 is a group of learners attending a specific course or lesson and generally taught as a group",
      "a": 61,
      "b": null,
      "c": null
    }
  },
  "170": {
    "01": {
      "value": "Rising discount",
      "description": "Discount applied to all units in a qualifying order. The default if no <DiscountType> is specified",
      "a": 24,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Rising discount (cumulative)",
      "description": "Additional discount may be applied retrospectively, based on number of units ordered over a specific period",
      "a": 24,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Progressive discount",
      "description": "Discount applied to marginal units in a qualifying order",
      "a": 24,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Progressive discount (cumulative)",
      "description": "Previous orders within a specific time period are counted when calculating a progressive discount",
      "a": 24,
      "b": null,
      "c": null
    }
  },
  "171": {
    "01": {
      "value": "VAT (Value-added tax)",
      "description": "TVA, IVA, MwSt, GST etc, levied incrementally at all parts of the supply chain",
      "a": 9,
      "b": 64.0,
      "c": null
    },
    "02": {
      "value": "GST (Sales tax)",
      "description": "General sales tax, levied on retail sales",
      "a": 9,
      "b": 64.0,
      "c": null
    },
    "03": {
      "value": "ECO",
      "description": "\u0091Green\u0092 or eco-tax, levied to encourage responsible production or disposal, used only where this is identified separately from value-added or sales taxes",
      "a": 31,
      "b": 35.0,
      "c": null
    }
  },
  "172": {
    "EUR": {
      "value": "Eurozone",
      "description": "Countries that at the time being have the Euro as their national currency. Deprecated",
      "a": 9,
      "b": 12.0,
      "c": 12.0
    }
  },
  "173": {
    "14": {
      "value": "From date",
      "description": "Date on which a price becomes effective",
      "a": 9,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Until date",
      "description": "Date on which a price ceases to be effective",
      "a": 9,
      "b": null,
      "c": null
    },
    "24": {
      "value": "From\u0085 until date",
      "description": "Combines From date and Until date to define a period (both dates are inclusive). Use for example with dateformat 06",
      "a": 16,
      "b": null,
      "c": null
    }
  },
  "174": {
    "01": {
      "value": "No",
      "description": "Price not printed on product",
      "a": 9,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Yes",
      "description": "Price printed on product",
      "a": 9,
      "b": null,
      "c": null
    }
  },
  "175": {
    "A101": {
      "value": "CD standard audio format",
      "description": "CD \u0091red book\u0092 format",
      "a": 2,
      "b": null,
      "c": null
    },
    "A102": {
      "value": "SACD super audio format",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "A103": {
      "value": "MP3 format",
      "description": "MPEG-1/2 Audio Layer III file",
      "a": 2,
      "b": null,
      "c": null
    },
    "A104": {
      "value": "WAV format",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "A105": {
      "value": "Real Audio format",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "A106": {
      "value": "WMA",
      "description": "Windows Media Audio format",
      "a": 9,
      "b": null,
      "c": null
    },
    "A107": {
      "value": "AAC",
      "description": "Advanced Audio Coding format",
      "a": 9,
      "b": null,
      "c": null
    },
    "A108": {
      "value": "Ogg/Vorbis",
      "description": "Vorbis audio format in the Ogg container",
      "a": 9,
      "b": null,
      "c": null
    },
    "A109": {
      "value": "Audible",
      "description": "Audio format proprietary to Audible.com",
      "a": 9,
      "b": null,
      "c": null
    },
    "A110": {
      "value": "FLAC",
      "description": "Free lossless audio codec",
      "a": 9,
      "b": null,
      "c": null
    },
    "A111": {
      "value": "AIFF",
      "description": "Audio Interchangeable File Format",
      "a": 9,
      "b": null,
      "c": null
    },
    "A112": {
      "value": "ALAC",
      "description": "Apple Lossless Audio Codec",
      "a": 9,
      "b": null,
      "c": null
    },
    "A113": {
      "value": "W3C Audiobook format",
      "description": "Audiobook package format",
      "a": 51,
      "b": null,
      "c": null
    },
    "A201": {
      "value": "DAISY 2: full audio with title only (no navigation)",
      "description": "Deprecated, as does not meet DAISY 2 standard. Use conventional audiobook codes instead",
      "a": 8,
      "b": 13.0,
      "c": 13.0
    },
    "A202": {
      "value": "DAISY 2: full audio with navigation (no text)",
      "description": null,
      "a": 8,
      "b": 13.0,
      "c": null
    },
    "A203": {
      "value": "DAISY 2: full audio with navigation and partial text",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "A204": {
      "value": "DAISY 2: full audio with navigation and full text",
      "description": null,
      "a": 8,
      "b": 13.0,
      "c": null
    },
    "A205": {
      "value": "DAISY 2: full text with navigation and partial audio",
      "description": "Reading systems may provide full audio via text-to-speech",
      "a": 8,
      "b": 13.0,
      "c": null
    },
    "A206": {
      "value": "DAISY 2: full text with navigation and no audio",
      "description": "Reading systems may provide full audio via text-to-speech",
      "a": 8,
      "b": 13.0,
      "c": null
    },
    "A207": {
      "value": "DAISY 3: full audio with title only (no navigation)",
      "description": "Deprecated, as does not meet DAISY 3 standard. Use conventional audiobook codes instead",
      "a": 8,
      "b": 13.0,
      "c": 13.0
    },
    "A208": {
      "value": "DAISY 3: full audio with navigation (no text)",
      "description": null,
      "a": 8,
      "b": 13.0,
      "c": null
    },
    "A209": {
      "value": "DAISY 3: full audio with navigation and partial text",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "A210": {
      "value": "DAISY 3: full audio with navigation and full text",
      "description": null,
      "a": 8,
      "b": 13.0,
      "c": null
    },
    "A211": {
      "value": "DAISY 3: full text with navigation and partial audio",
      "description": "Reading systems may provide full audio via text-to-speech",
      "a": 8,
      "b": 13.0,
      "c": null
    },
    "A212": {
      "value": "DAISY 3: full text with navigation and no audio",
      "description": "Reading systems may provide full audio via text-to-speech",
      "a": 8,
      "b": 13.0,
      "c": null
    },
    "A301": {
      "value": "Standalone audio",
      "description": null,
      "a": 15,
      "b": null,
      "c": null
    },
    "A302": {
      "value": "Readalong audio",
      "description": "Audio intended exclusively for use alongside a printed copy of the book. Most often a children\u0092s product. Normally contains instructions such as \u0091turn the page now\u0092 and other references to the printed item, and is usually sold packaged together with a printed copy",
      "a": 15,
      "b": null,
      "c": null
    },
    "A303": {
      "value": "Playalong audio",
      "description": "Audio intended for musical accompaniment, eg \u0091Music minus one\u0092, etc, often used for music learning. Includes singalong backing audio for musical learning or for Karaoke-style entertainment",
      "a": 15,
      "b": null,
      "c": null
    },
    "A304": {
      "value": "Speakalong audio",
      "description": "Audio intended for language learning, which includes speech plus gaps intended to be filled by the listener",
      "a": 15,
      "b": null,
      "c": null
    },
    "A305": {
      "value": "Synchronised audio",
      "description": "Audio synchronised to text within an e-publication, for example an EPUB3 with audio overlay. Synchronisation at least at paragraph level, and covering the full content",
      "a": 26,
      "b": null,
      "c": null
    },
    "A310": {
      "value": "Sound effects",
      "description": "Incidental sounds added to the audiobook narration (eg background environmental sounds)",
      "a": 47,
      "b": null,
      "c": null
    },
    "A311": {
      "value": "Background music",
      "description": "Incidental music added to the audiobook narration (eg to heighten atmosphere). Do not use where the music is a primary part of the audio",
      "a": 47,
      "b": null,
      "c": null
    },
    "A312": {
      "value": "Without background sounds",
      "description": "Pre-recorded audiobook narration does not contain any background sounds, including music, sound effects, etc, though music and effects may be present if isolated from the speech (ie the sounds do not overlap)",
      "a": 62,
      "b": null,
      "c": null
    },
    "A400": {
      "value": "64kbits/s",
      "description": "Constant or average bit rate (eg of an mp3 or AAC audio file) 64kbits/second or more. Note the bit rate is the total across all channels, not a per channel rate",
      "a": 54,
      "b": null,
      "c": null
    },
    "A401": {
      "value": "128kbits/s",
      "description": "Constant or average bit rate 128bbits/second or more",
      "a": 54,
      "b": null,
      "c": null
    },
    "A402": {
      "value": "192kbits/s",
      "description": null,
      "a": 54,
      "b": null,
      "c": null
    },
    "A403": {
      "value": "256kbits/s",
      "description": null,
      "a": 54,
      "b": null,
      "c": null
    },
    "A404": {
      "value": "320kbits/s",
      "description": null,
      "a": 54,
      "b": null,
      "c": null
    },
    "A410": {
      "value": "Mono",
      "description": "Includes \u0091stereo\u0092 where channels are identical",
      "a": 29,
      "b": null,
      "c": null
    },
    "A420": {
      "value": "Stereo",
      "description": "Includes \u0091joint stereo\u0092",
      "a": 29,
      "b": 50.0,
      "c": null
    },
    "A421": {
      "value": "Stereo 2.1",
      "description": "Stereo plus low-frequency channel",
      "a": 29,
      "b": null,
      "c": null
    },
    "A441": {
      "value": "Surround 4.1",
      "description": "Five-channel audio (including low-frequency channel)",
      "a": 29,
      "b": null,
      "c": null
    },
    "A451": {
      "value": "Surround 5.1",
      "description": "Six-channel audio (including low-frequency channel)",
      "a": 29,
      "b": null,
      "c": null
    },
    "A471": {
      "value": "Dolby Atmos",
      "description": "Multi-channel \u0091spatial\u0092 audio (eg for 7.1.4 speaker arrangements or processed for headphone delivery)",
      "a": 62,
      "b": null,
      "c": null
    },
    "B101": {
      "value": "Mass market (rack) paperback",
      "description": "In North America, a category of paperback characterized partly by page size (typically from 6.75 up to 7.125 x 4.25 inches) and partly by target market and terms of trade. Use with Product Form code BC",
      "a": 2,
      "b": null,
      "c": null
    },
    "B102": {
      "value": "Trade paperback (US)",
      "description": "In North America, a category of paperback characterized partly by page size (larger than rack-sized) and partly by target market and terms of trade. AKA \u0091quality paperback\u0092, and including textbooks. Most paperback books sold in North America except \u0091mass-market\u0092 (B101) and \u0091tall rack\u0092 (B107) are correctly described with this code. Use with Product Form code BC",
      "a": 2,
      "b": null,
      "c": null
    },
    "B103": {
      "value": "Digest format paperback",
      "description": "In North America, a category of paperback characterized by page size (typically 7 x 5 inches) and generally used for children\u0092s books; use with Product Form code BC. Note: was wrongly shown as B102 (duplicate entry) in Issue 3",
      "a": 4,
      "b": null,
      "c": null
    },
    "B104": {
      "value": "A-format paperback",
      "description": "In UK and IE, a category of paperback characterized by page size (normally 178 x 111 mm approx); use with Product Form code BC",
      "a": 2,
      "b": 50.0,
      "c": null
    },
    "B105": {
      "value": "B-format paperback",
      "description": "In UK and IE, a category of paperback characterized by page size (normally 198 x 129 mm approx); use with Product Form code BC",
      "a": 2,
      "b": 50.0,
      "c": null
    },
    "B106": {
      "value": "Trade paperback (UK)",
      "description": "In UK and IE, a category of paperback characterized largely by size (usually in traditional hardback dimensions), and often used for paperback originals or retailer/travel/export-exclusives; use with Product Form code BC",
      "a": 2,
      "b": 50.0,
      "c": null
    },
    "B107": {
      "value": "Tall rack paperback (US)",
      "description": "In North America, a category of paperback characterised partly by page size (typically 7\u00bd x 4\u00bc inches) and partly by target market and terms of trade; use with Product Form code BC",
      "a": 4,
      "b": null,
      "c": null
    },
    "B108": {
      "value": "A5 size Tankobon",
      "description": "Japanese A-series size, 210 x 148mm. A tankobon is a complete collected story originally published in serialised form (eg in a magazine)",
      "a": 5,
      "b": 17.0,
      "c": null
    },
    "B109": {
      "value": "JIS B5 size Tankobon",
      "description": "Japanese B-series size, 257 x 182mm",
      "a": 5,
      "b": 17.0,
      "c": null
    },
    "B110": {
      "value": "JIS B6 size Tankobon",
      "description": "Japanese B-series size, 182 x 128mm",
      "a": 5,
      "b": 17.0,
      "c": null
    },
    "B111": {
      "value": "A6 size Bunko",
      "description": "Japanese A-series size, 148 x 105mm",
      "a": 5,
      "b": 17.0,
      "c": null
    },
    "B112": {
      "value": "B40-dori Shinsho",
      "description": "Japanese format, 182x103mm or 173x105mm",
      "a": 5,
      "b": 17.0,
      "c": null
    },
    "B113": {
      "value": "Pocket (Sweden, Norway, France)",
      "description": "A Swedish, Norwegian, French paperback format, of no particular fixed size. Use with Product Form Code BC",
      "a": 7,
      "b": 28.0,
      "c": null
    },
    "B114": {
      "value": "Storpocket (Sweden)",
      "description": "A Swedish paperback format, use with Product Form Code BC. In Finnish, J\u00e4ttipokkari",
      "a": 7,
      "b": null,
      "c": null
    },
    "B115": {
      "value": "Kartonnage (Sweden)",
      "description": "A Swedish hardback format, use with Product Form Code BB",
      "a": 7,
      "b": null,
      "c": null
    },
    "B116": {
      "value": "Flexband (Sweden)",
      "description": "A Swedish softback format, use with Product Form Code BC",
      "a": 7,
      "b": null,
      "c": null
    },
    "B117": {
      "value": "Mook / Bookazine",
      "description": "A softback book in the format of a magazine, usually sold like a book. Use with Product Form code BC",
      "a": 11,
      "b": 30.0,
      "c": null
    },
    "B118": {
      "value": "Dwarsligger",
      "description": "Also called \u0091Flipback\u0092. A softback book in a specially compact proprietary format with pages printed in landscape on very thin paper and bound along the long (top) edge (ie parallel with the lines of text). Use with Product Form code BC \u0096 see www.dwarsligger.com",
      "a": 11,
      "b": 14.0,
      "c": null
    },
    "B119": {
      "value": "46 size",
      "description": "Japanese format, 188 x 127mm",
      "a": 12,
      "b": null,
      "c": null
    },
    "B120": {
      "value": "46-Henkei size",
      "description": "Japanese format, approximately 188 x 127mm",
      "a": 12,
      "b": 64.0,
      "c": null
    },
    "B121": {
      "value": "A4",
      "description": "297 x 210mm",
      "a": 12,
      "b": null,
      "c": null
    },
    "B122": {
      "value": "A4-Henkei size",
      "description": "Japanese format, approximately 297 x 210mm",
      "a": 12,
      "b": 64.0,
      "c": null
    },
    "B123": {
      "value": "A5-Henkei size",
      "description": "Japanese format, approximately 210 x 146mm",
      "a": 12,
      "b": 64.0,
      "c": null
    },
    "B124": {
      "value": "B5-Henkei size",
      "description": "Japanese format, approximately 257 x 182mm",
      "a": 12,
      "b": 64.0,
      "c": null
    },
    "B125": {
      "value": "B6-Henkei size",
      "description": "Japanese format, approximately 182 x 128mm",
      "a": 12,
      "b": 64.0,
      "c": null
    },
    "B126": {
      "value": "AB size",
      "description": "257 x 210mm",
      "a": 12,
      "b": null,
      "c": null
    },
    "B127": {
      "value": "JIS B7 size",
      "description": "Japanese B-series size, 128 x 91mm",
      "a": 12,
      "b": 17.0,
      "c": null
    },
    "B128": {
      "value": "Kiku size",
      "description": "Japanese format, 218 x 152mm or 227 x 152mm",
      "a": 12,
      "b": 17.0,
      "c": null
    },
    "B129": {
      "value": "Kiku-Henkei size",
      "description": "Japanese format",
      "a": 12,
      "b": null,
      "c": null
    },
    "B130": {
      "value": "JIS B4 size",
      "description": "Japanese B-series size, 364 x 257 mm",
      "a": 17,
      "b": null,
      "c": null
    },
    "B131": {
      "value": "Paperback (DE)",
      "description": "German large paperback format, greater than about 205mm high, with flaps. Use with Product form code BC",
      "a": 24,
      "b": null,
      "c": null
    },
    "B132": {
      "value": "Libro de bolsillo",
      "description": "Spanish pocket paperback. Use with Product form code BC",
      "a": 36,
      "b": null,
      "c": null
    },
    "B133": {
      "value": "Pocket-sized",
      "description": "Pocket-sized format, usually less than about 205mm high, without necessarily implying a particular trade category (de: ,Taschenbuch\u0091; it: \u00abTascabile / Supertascabile\u00bb; es: \u00ablibro de bolsillo\u00bb; fr: \u00ab\u00a0livre de poche\u00a0\u00bb etc). Use with Product form code BB or BC. See also List 12 code 04",
      "a": 38,
      "b": 61.0,
      "c": null
    },
    "B134": {
      "value": "A5",
      "description": "210 x 148mm",
      "a": 39,
      "b": null,
      "c": null
    },
    "B135": {
      "value": "Mass market max paperback",
      "description": "In North America, a category of paperback characterized partly by page size (typically 7.125 x 4.75 inches) and partly by target market and terms of trade. Use with Product Form code BC",
      "a": 50,
      "b": null,
      "c": null
    },
    "B139": {
      "value": "Comic book size (US)",
      "description": "Standard 10.25 x 6.625in size approx (260 x 170mm)",
      "a": 63,
      "b": null,
      "c": null
    },
    "B140": {
      "value": "Comic album size (Euro)",
      "description": "Standard 240 x 320mm size approx",
      "a": 63,
      "b": null,
      "c": null
    },
    "B141": {
      "value": "B4-Henkei size",
      "description": "Japanese format, approximately 364 x 257 mm",
      "a": 64,
      "b": null,
      "c": null
    },
    "B201": {
      "value": "Coloring / join-the-dot book",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B202": {
      "value": "Lift-the-flap book",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B204": {
      "value": "Miniature book",
      "description": null,
      "a": 4,
      "b": null,
      "c": null
    },
    "B205": {
      "value": "Moving picture / flicker book",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B206": {
      "value": "Pop-up book",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B207": {
      "value": "Scented / \u0091smelly\u0092 book",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B208": {
      "value": "Sound story / \u0091noisy\u0092 book",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B209": {
      "value": "Sticker book",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B210": {
      "value": "Touch-and-feel book",
      "description": "A book whose pages have a variety of textured inserts designed to stimulate tactile exploration: see also B214 and B215",
      "a": 10,
      "b": null,
      "c": null
    },
    "B212": {
      "value": "Die-cut book",
      "description": "A book which is cut into a distinctive non-rectilinear shape and/or in which holes or shapes have been cut internally. (\u0091Die-cut\u0092 is used here as a convenient shorthand, and does not imply strict limitation to a particular production process)",
      "a": 10,
      "b": null,
      "c": null
    },
    "B213": {
      "value": "Book-as-toy",
      "description": "A book which is also a toy, or which incorporates a toy as an integral part. (Do not, however, use B213 for a multiple-item product which includes a book and a toy as separate items)",
      "a": 10,
      "b": null,
      "c": null
    },
    "B214": {
      "value": "Soft-to-touch book",
      "description": "A book whose cover has a soft textured finish, typically over board",
      "a": 10,
      "b": null,
      "c": null
    },
    "B215": {
      "value": "Fuzzy-felt book",
      "description": "A book with detachable felt pieces and textured pages on which they can be arranged",
      "a": 10,
      "b": null,
      "c": null
    },
    "B216": {
      "value": "Press-out pieces",
      "description": "A book containing pages with die-cut or press-out pieces that can be used as a jigsaw, as puzzle or game pieces, play pieces (eg paper dolls) etc",
      "a": 38,
      "b": 67.0,
      "c": null
    },
    "B221": {
      "value": "Picture book",
      "description": "Picture book, generally for children, with few words per illustration: use with applicable Product Form code",
      "a": 2,
      "b": 62.0,
      "c": null
    },
    "B222": {
      "value": "\u0091Carousel\u0092 book",
      "description": "(aka \u0091Star\u0092 book). Tax treatment of products may differ from that of products with similar codes such as Book as toy or Pop-up book)",
      "a": 12,
      "b": null,
      "c": null
    },
    "B223": {
      "value": "Pull-the-tab book",
      "description": "A book with movable card \u0091tabs\u0092 within the pages. Pull a tab to reveal or animate part of a picture (distinct from a \u0091lift-the-flap\u0092 book, where flaps simply reveal hidden pictures, and not a \u0091pop-up\u0092 book with 3D paper engineering)",
      "a": 35,
      "b": null,
      "c": null
    },
    "B224": {
      "value": "\u0091Wordless\u0092 book",
      "description": "Picture book, generally for children though also used in augmentative and alternative education, without text in the body of the book. Also \u0091silent books\u0092, wordless graphic novels and comic books: use with applicable Product Form code",
      "a": 62,
      "b": null,
      "c": null
    },
    "B225": {
      "value": "Cut-out pieces",
      "description": "A book containing pages with pieces intended to be cut out (not pre-cut or press-out \u0096 see B216) that can be used as puzzle or game pieces, play pieces etc, but which may not be suitable for young children",
      "a": 67,
      "b": null,
      "c": null
    },
    "B301": {
      "value": "Loose leaf or partwork \u0096 sheets / parts and binder / wallet",
      "description": "Use with Product Form code BD, BN or PM",
      "a": 2,
      "b": 51.0,
      "c": null
    },
    "B302": {
      "value": "Loose leaf or partwork \u0096 binder / wallet only",
      "description": "Use with Product Form code BD, BN or PM",
      "a": 2,
      "b": 51.0,
      "c": null
    },
    "B303": {
      "value": "Loose leaf or partwork \u0096 sheets / parts only",
      "description": "Use with Product Form code BD, BN or PM",
      "a": 2,
      "b": 51.0,
      "c": null
    },
    "B304": {
      "value": "Sewn",
      "description": "AKA stitched; for \u0091saddle-sewn\u0092, see code B310",
      "a": 2,
      "b": null,
      "c": null
    },
    "B305": {
      "value": "Unsewn / adhesive bound",
      "description": "Including \u0091perfect bound\u0092, \u0091glued\u0092",
      "a": 3,
      "b": null,
      "c": null
    },
    "B306": {
      "value": "Library binding",
      "description": "Strengthened cloth-over-boards binding intended for libraries: use with Product form code BB",
      "a": 2,
      "b": null,
      "c": null
    },
    "B307": {
      "value": "Reinforced binding",
      "description": "Strengthened binding, not specifically intended for libraries: use with Product form code BB or BC",
      "a": 2,
      "b": null,
      "c": null
    },
    "B308": {
      "value": "Half bound",
      "description": "Highest qualiy material used on spine and corners only. Must be accompanied by a code specifiying a material, eg \u0091half-bound real leather\u0092",
      "a": 2,
      "b": null,
      "c": null
    },
    "B309": {
      "value": "Quarter bound",
      "description": "Highest qualiy material used on spine only. Must be accompanied by a code specifiying a material, eg \u0091quarter bound real leather\u0092",
      "a": 2,
      "b": null,
      "c": null
    },
    "B310": {
      "value": "Saddle-sewn",
      "description": "AKA \u0091saddle-stitched\u0092 or \u0091wire-stitched\u0092",
      "a": 3,
      "b": null,
      "c": null
    },
    "B311": {
      "value": "Comb bound",
      "description": "Round or oval plastic forms in a clamp-like configuration: use with Product Form code BE",
      "a": 6,
      "b": null,
      "c": null
    },
    "B312": {
      "value": "Wire-O",
      "description": "Twin loop metal wire spine: use with Product Form code BE",
      "a": 6,
      "b": null,
      "c": null
    },
    "B313": {
      "value": "Concealed wire",
      "description": "Cased over Coiled or Wire-O binding: use with Product Form code BE and Product Form Detail code B312 or B314",
      "a": 6,
      "b": 28.0,
      "c": null
    },
    "B314": {
      "value": "Coiled wire bound",
      "description": "Spiral wire bound. Use with product form code BE. The default if a spiral binding type is not stated. Cf. Comb and Wire-O binding",
      "a": 28,
      "b": null,
      "c": null
    },
    "B315": {
      "value": "Trade binding",
      "description": "Hardcover binding intended for general consumers rather than libraries, use with Product form code BB. The default if a hardcover binding detail is not stated. cf. Library binding",
      "a": 28,
      "b": null,
      "c": null
    },
    "B316": {
      "value": "Swiss binding",
      "description": "Cover is attached to the book block along only one edge of the spine, allowing the cover to lay flat",
      "a": 34,
      "b": null,
      "c": null
    },
    "B317": {
      "value": "Notched binding",
      "description": "Refinement of perfect binding, with notches cut in the spine of the book block prior to glueing, to improve adhesion and durability",
      "a": 34,
      "b": null,
      "c": null
    },
    "B318": {
      "value": "Lay-flat binding",
      "description": "Hardcover or softcover where interior spreads lay flat across the spine",
      "a": 57,
      "b": null,
      "c": null
    },
    "B400": {
      "value": "Self-covered",
      "description": "Covers do not use a distinctive stock, but are the same as the body pages. Use for example with Product form BF, to indicate a pamphlet does not use a card or distinct paper cover. See also B416 (for card covers) and B418 (for distinct paper covers)",
      "a": 29,
      "b": 66.0,
      "c": null
    },
    "B401": {
      "value": "Cloth over boards",
      "description": "Cotton, linen or other woven fabric over boards. Use with <ProductForm> BB",
      "a": 2,
      "b": 39.0,
      "c": null
    },
    "B402": {
      "value": "Paper over boards",
      "description": "Cellulose-based or similar non-woven material, which may be printed and may be embossed with an artificial cloth or leather-like texture, over boards. Use with <ProductForm> BB",
      "a": 2,
      "b": 39.0,
      "c": null
    },
    "B403": {
      "value": "Leather, real",
      "description": "Covered with leather created by tanning animal hide. May be \u0091full-grain\u0092 using the entire thickness of the hide, \u0091top grain\u0092 using the outer layer of the hide, or \u0091split\u0092 using the inner layers of the hide. Split leather may be embossed with an artificial grain or texture. Use with <ProductForm> BG, and if appropriate with codes B308 or B309 (otherwise \u0091full-bound\u0092 is implied)",
      "a": 2,
      "b": 39.0,
      "c": null
    },
    "B404": {
      "value": "Leather, imitation",
      "description": "Covered with synthetic leather-like material \u0096 polymer or non-animal fibre over a textile backing, usually coated and embossed with an artificial grain or texture. Leatherette, pleather etc. Use with <ProductForm> BB (or BG if particularly high-quality), and if appropriate with codes B308 or B309 (otherwise \u0091full-bound\u0092 is implied)",
      "a": 2,
      "b": 39.0,
      "c": null
    },
    "B405": {
      "value": "Leather, bonded",
      "description": "Covered with leather reconstituted from a pulp made from shredded animal hide, layered on a fibre or textile backing, coated and usually embossed with an artificial grain or texture. Use with <ProductForm> BG, and if appropriate with codes B308 or B309 (otherwise \u0091full-bound\u0092 is implied)",
      "a": 2,
      "b": 39.0,
      "c": null
    },
    "B406": {
      "value": "Vellum",
      "description": "Pages made with prepared but untanned animal skin (usually calf, occasionally goat or sheep). Includes parchment, a thicker and less refined form of animal skin, but not \u0091paper vellum\u0092 or vegetable parchment made from synthetic or plant fibres",
      "a": 2,
      "b": 39.0,
      "c": null
    },
    "B407": {
      "value": "Head and tail bands",
      "description": "Decorative or functional",
      "a": 63,
      "b": null,
      "c": null
    },
    "B408": {
      "value": "Decorated endpapers",
      "description": "Illustrated or abstract printed endpapers, but not those solely of colored paper",
      "a": 63,
      "b": null,
      "c": null
    },
    "B409": {
      "value": "Cloth",
      "description": "Cloth, not necessarily over boards \u0096 cf B401",
      "a": 6,
      "b": null,
      "c": null
    },
    "B410": {
      "value": "Imitation cloth",
      "description": "Spanish \u0091simil-tela\u0092",
      "a": 6,
      "b": null,
      "c": null
    },
    "B411": {
      "value": "Velvet",
      "description": null,
      "a": 8,
      "b": null,
      "c": null
    },
    "B412": {
      "value": "Flexible plastic / vinyl cover",
      "description": "AKA \u0091flexibound\u0092: use with Product Form code BC",
      "a": 8,
      "b": null,
      "c": null
    },
    "B413": {
      "value": "Plastic-covered",
      "description": "Separate outer plastic cover, often transparent and allowing the cover to show through. Typically has pockets into which the cover tucks. See also B412, where the cover itself is plastic or vinyl",
      "a": 8,
      "b": 57.0,
      "c": null
    },
    "B414": {
      "value": "Vinyl-covered",
      "description": "Separate outer vinyl cover. See also B412, where the cover itself is plastic or vinyl",
      "a": 8,
      "b": 57.0,
      "c": null
    },
    "B415": {
      "value": "Laminated cover",
      "description": "Book, laminating material unspecified, often termed PLC or PPC (printed laminated case, printed paper case) when used with Product form BB. Use L101 for \u0091whole product laminated\u0092, eg a laminated sheet map or wallchart",
      "a": 8,
      "b": 51.0,
      "c": null
    },
    "B416": {
      "value": "Card cover",
      "description": "With card cover (like a typical paperback). As distinct from a self-cover or more elaborate binding. Use for example with Product form BF, to indicate a pamphlet is bound within a card cover. See also B400 (for self-covers) and B418 (for distinct paper covers)",
      "a": 29,
      "b": 66.0,
      "c": null
    },
    "B417": {
      "value": "Duplex-printed cover",
      "description": "Printed both inside and outside the front and/or back cover",
      "a": 39,
      "b": null,
      "c": null
    },
    "B418": {
      "value": "Paper cover",
      "description": "Cover uses a distinct, usually heavier (thicker) paper than the interior pages. Use for example with Product form BF, to indicate a pamphlet is bound within a paper cover. See also B400 (for self-covers) and B416 (for card covers)",
      "a": 66,
      "b": null,
      "c": null
    },
    "B420": {
      "value": "Delicate cover / jacket finish",
      "description": "Cover or jacket finish may merit special handling or packaging during distribution and fulfilment, for example because of gloss varnish which may hold fingerprints or matt laminate liable to scuffing",
      "a": 55,
      "b": null,
      "c": null
    },
    "B501": {
      "value": "With dust jacket",
      "description": "Type unspecified",
      "a": 2,
      "b": null,
      "c": null
    },
    "B502": {
      "value": "With printed dust jacket",
      "description": "Used to distinguish from B503",
      "a": 2,
      "b": null,
      "c": null
    },
    "B503": {
      "value": "With translucent dust cover",
      "description": "With translucent paper or plastic protective cover",
      "a": 2,
      "b": null,
      "c": null
    },
    "B504": {
      "value": "With flaps",
      "description": "For paperback with flaps",
      "a": 2,
      "b": null,
      "c": null
    },
    "B505": {
      "value": "With thumb index",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B506": {
      "value": "With ribbon marker(s)",
      "description": "If the number of markers is significant, it can be stated as free text in <ProductFormDescription>",
      "a": 2,
      "b": null,
      "c": null
    },
    "B507": {
      "value": "With zip fastener",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B508": {
      "value": "With button snap fastener",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "B509": {
      "value": "With leather edge lining",
      "description": "AKA yapp edge?",
      "a": 2,
      "b": null,
      "c": null
    },
    "B510": {
      "value": "Rough front",
      "description": "With edge trimming such that the front edge is ragged, not neatly and squarely trimmed: AKA deckle edge, feather edge, uncut edge, rough cut",
      "a": 11,
      "b": null,
      "c": null
    },
    "B511": {
      "value": "Foldout",
      "description": "With one or more gatefold or foldout sections bound in",
      "a": 24,
      "b": null,
      "c": null
    },
    "B512": {
      "value": "Wide margin",
      "description": "Pages include extra-wide margin specifically intended for hand-written annotations",
      "a": 27,
      "b": null,
      "c": null
    },
    "B513": {
      "value": "With fastening strap",
      "description": "Book with attached loop for fixing to baby stroller, cot, chair etc",
      "a": 28,
      "b": null,
      "c": null
    },
    "B514": {
      "value": "With perforated pages",
      "description": "With one or more pages perforated and intended to be torn out for use",
      "a": 29,
      "b": null,
      "c": null
    },
    "B515": {
      "value": "Acid-free paper",
      "description": "Printed on acid-free or alkaline buffered paper conforming with ISO 9706",
      "a": 35,
      "b": null,
      "c": null
    },
    "B516": {
      "value": "Archival paper",
      "description": "Printed on acid-free or alkaline buffered paper with a high cotton content, conforming with ISO 11108",
      "a": 35,
      "b": null,
      "c": null
    },
    "B517": {
      "value": "With elasticated strap",
      "description": "Strap acts as closure or as page marker",
      "a": 38,
      "b": null,
      "c": null
    },
    "B518": {
      "value": "With serialized authenticity token",
      "description": "For example, holographic sticker such as the banderol used in the Turkish book trade",
      "a": 43,
      "b": null,
      "c": null
    },
    "B519": {
      "value": "With dust jacket poster",
      "description": "Jacket in the form of a pamphlet or poster, specifically intended to be removed and read or used separately from the book",
      "a": 45,
      "b": null,
      "c": null
    },
    "B520": {
      "value": "Rounded corners",
      "description": "Usually die-cut rounding to foredge corners of cover (and/or to foredge page corners). See B212 for elaborate die-cutting",
      "a": 54,
      "b": null,
      "c": null
    },
    "B521": {
      "value": "Splashproof",
      "description": "Water-resistant or \u0091waterproof\u0092 cover and pages",
      "a": 59,
      "b": null,
      "c": null
    },
    "B522": {
      "value": "Mineral paper",
      "description": "Pages composed of \u0091mineral paper\u0092 comprised of HDPE plastic and ground calcium carbonate, eg Stonepaper",
      "a": 64,
      "b": null,
      "c": null
    },
    "B523": {
      "value": "With accessibility claim ticket",
      "description": "For example, cut-out claim form such as the \u0091text data request ticket\u0092 used in the Japanese book trade",
      "a": 66,
      "b": null,
      "c": null
    },
    "B601": {
      "value": "Turn-around book",
      "description": "A book in which half the content is printed upside-down, to be read the other way round. Also known as a \u0091flip-book\u0092 or \u0091t\u00eate-b\u00eache\u0092 (Fr) binding, it has two front covers and a single spine. Usually an omnibus of two works",
      "a": 7,
      "b": 42.0,
      "c": null
    },
    "B602": {
      "value": "Unflipped manga format",
      "description": "Manga with pages and panels in the sequence of (right-to-left flowing) Japanese-style design",
      "a": 8,
      "b": 60.0,
      "c": null
    },
    "B603": {
      "value": "Back-to-back book",
      "description": "A book in which half the content is printed so as to be read from the other cover. All content is printed the same way up. Also known as \u0091dos-\u00e0-dos\u0092 (Fr) binding, it has two front covers and two spines. Usually an omnibus of two works",
      "a": 42,
      "b": null,
      "c": null
    },
    "B604": {
      "value": "Flipped manga format",
      "description": "Manga with pages and panels in the sequence mirrored from Japanese-style design (thus flowing left-to-right)",
      "a": 60,
      "b": null,
      "c": null
    },
    "B605": {
      "value": "Variant turn-around book",
      "description": "A book in which half the content is read the other way round from \u0091back\u0092 to \u0091front\u0092. A variant on \u0091flip-book\u0092 or \u0091t\u00eate-b\u00eache\u0092 (fr) binding where the text is in two languages with different page progression (eg English and Arabic) and neither needs to be upside down, it has two front covers and a single spine. Usually an omnibus of a work and a derived translated work",
      "a": 62,
      "b": null,
      "c": null
    },
    "B606": {
      "value": "Page progression LTR",
      "description": "Pages are ordered left to right (the left page in a spread is read before the right). Note this does not specifically mean text on the page is also read left to right",
      "a": 62,
      "b": null,
      "c": null
    },
    "B607": {
      "value": "Page progression RTL",
      "description": "Pages are ordered right to left",
      "a": 62,
      "b": null,
      "c": null
    },
    "B608": {
      "value": "Page progression TTB",
      "description": "Pages are ordered top to bottom, with the spine oriented horizontally. See also Dwarsligger (code B118), a proprietary variation of this format",
      "a": 62,
      "b": null,
      "c": null
    },
    "B609": {
      "value": "Page progression other",
      "description": "Pages are ordered bottom to top, with the spine oriented horizontally, or in a way for which there is no other code",
      "a": 62,
      "b": null,
      "c": null
    },
    "B610": {
      "value": "Syllabification",
      "description": "Text shows syllable breaks",
      "a": 25,
      "b": null,
      "c": null
    },
    "B611": {
      "value": "Upper case only",
      "description": "For bicameral scripts, body text is upper case only",
      "a": 62,
      "b": null,
      "c": null
    },
    "B701": {
      "value": "UK Uncontracted Braille",
      "description": "Single letters only. Was formerly identified as UK Braille Grade 1",
      "a": 8,
      "b": 12.0,
      "c": null
    },
    "B702": {
      "value": "UK Contracted Braille",
      "description": "With some letter combinations. Was formerly identified as UK Braille Grade 2",
      "a": 8,
      "b": 12.0,
      "c": null
    },
    "B703": {
      "value": "US Braille",
      "description": "For US Braille, prefer codes B704 and B705 as appropriate",
      "a": 8,
      "b": 12.0,
      "c": null
    },
    "B704": {
      "value": "US Uncontracted Braille",
      "description": null,
      "a": 12,
      "b": null,
      "c": null
    },
    "B705": {
      "value": "US Contracted Braille",
      "description": null,
      "a": 12,
      "b": null,
      "c": null
    },
    "B706": {
      "value": "Unified English Braille",
      "description": "For UEB, prefer codes B708 and B709 as appropriate",
      "a": 12,
      "b": 36.0,
      "c": null
    },
    "B707": {
      "value": "Moon",
      "description": "Moon embossed alphabet, used by some print-impaired readers who have difficulties with Braille",
      "a": 13,
      "b": null,
      "c": null
    },
    "B708": {
      "value": "Unified English Uncontracted Braille",
      "description": null,
      "a": 36,
      "b": null,
      "c": null
    },
    "B709": {
      "value": "Unified English Contracted Braille",
      "description": null,
      "a": 36,
      "b": null,
      "c": null
    },
    "B750": {
      "value": "Tactile images",
      "description": "Eg charts, diagrams, maps, that are embossed or textured for accessibility purposes",
      "a": 59,
      "b": null,
      "c": null
    },
    "B751": {
      "value": "Lenticular images",
      "description": "Image-changing effect, \u00913D\u0092 images, \u0091tilt cards\u0092, printed with tiny lenses",
      "a": 59,
      "b": null,
      "c": null
    },
    "B752": {
      "value": "Anaglyph images",
      "description": "Stereoscopic 3D effect (eg of images) as viewed through red/green filters",
      "a": 59,
      "b": null,
      "c": null
    },
    "C750": {
      "value": "Raised 3D relief",
      "description": "Physical 3D relief (eg of a map, globe) reflects height of terrain etc",
      "a": 59,
      "b": null,
      "c": null
    },
    "D101": {
      "value": "Real Video format",
      "description": "Proprietary RealNetworks format. Includes Real Video packaged within a .rm RealMedia container",
      "a": 2,
      "b": 18.0,
      "c": null
    },
    "D102": {
      "value": "Quicktime format",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "D103": {
      "value": "AVI format",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "D104": {
      "value": "Windows Media Video format",
      "description": null,
      "a": 2,
      "b": null,
      "c": null
    },
    "D105": {
      "value": "MPEG-4",
      "description": null,
      "a": 5,
      "b": null,
      "c": null
    },
    "D201": {
      "value": "MS-DOS",
      "description": "Use with an applicable Product Form code D*; note that more detail of operating system requirements can be given in a Product Form Feature composite",
      "a": 2,
      "b": null,
      "c": null
    },
    "D202": {
      "value": "Windows",
      "description": "Use with an applicable Product Form code D*; see note on D201",
      "a": 2,
      "b": null,
      "c": null
    },
    "D203": {
      "value": "Macintosh",
      "description": "Use with an applicable Product Form code D*; see note on D201",
      "a": 2,
      "b": null,
      "c": null
    },
    "D204": {
      "value": "UNIX / LINUX",
      "description": "Use with an applicable Product Form code D*; see note on D201",
      "a": 2,
      "b": null,
      "c": null
    },
    "D205": {
      "value": "Other operating system(s)",
      "description": "Use with an applicable Product Form code D*; see note on D201",
      "a": 2,
      "b": null,
      "c": null
    },
    "D206": {
      "value": "Palm OS",
      "description": "Use with an applicable Product Form code D*; see note on D201",
      "a": 6,
      "b": null,
      "c": null
    },
    "D207": {
      "value": "Windows Mobile",
      "description": "Use with an applicable Product Form code D*; see note on D201",
      "a": 6,
      "b": null,
      "c": null
    },
    "D301": {
      "value": "Microsoft XBox",
      "description": "Use with Product Form code DB or DI as applicable",
      "a": 2,
      "b": 51.0,
      "c": null
    },
    "D302": {
      "value": "Nintendo Gameboy Color",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 2,
      "b": null,
      "c": null
    },
    "D303": {
      "value": "Nintendo Gameboy Advanced",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 2,
      "b": null,
      "c": null
    },
    "D304": {
      "value": "Nintendo Gameboy",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 2,
      "b": null,
      "c": null
    },
    "D305": {
      "value": "Nintendo Gamecube",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 2,
      "b": null,
      "c": null
    },
    "D306": {
      "value": "Nintendo 64",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 2,
      "b": null,
      "c": null
    },
    "D307": {
      "value": "Sega Dreamcast",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 2,
      "b": null,
      "c": null
    },
    "D308": {
      "value": "Sega Genesis/Megadrive",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 2,
      "b": null,
      "c": null
    },
    "D309": {
      "value": "Sega Saturn",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 2,
      "b": null,
      "c": null
    },
    "D310": {
      "value": "Sony PlayStation 1",
      "description": "Use with Product Form code DB as applicable",
      "a": 2,
      "b": 51.0,
      "c": null
    },
    "D311": {
      "value": "Sony PlayStation 2",
      "description": "Use with Product Form code DB or DI as applicable",
      "a": 2,
      "b": 51.0,
      "c": null
    },
    "D312": {
      "value": "Nintendo Dual Screen",
      "description": "Use with Product Form code DE as applicable",
      "a": 6,
      "b": 52.0,
      "c": null
    },
    "D313": {
      "value": "Sony PlayStation 3",
      "description": "Use with Product Form code DB, DI, DO or E* as applicable",
      "a": 7,
      "b": 51.0,
      "c": null
    },
    "D314": {
      "value": "Microsoft Xbox 360",
      "description": "Use with Product Form code DB, DI or VN as applicable",
      "a": 7,
      "b": 51.0,
      "c": null
    },
    "D315": {
      "value": "Nintendo Wii",
      "description": "Use with Product Form code DA or E* as applicable",
      "a": 7,
      "b": 52.0,
      "c": null
    },
    "D316": {
      "value": "Sony PlayStation Portable (PSP)",
      "description": "Use with Product Form code DL or VL as applicable",
      "a": 7,
      "b": 51.0,
      "c": null
    },
    "D317": {
      "value": "Sony PlayStation 3",
      "description": "Use with Product Form code DB, DI, DO or E* as applicable. Deprecated \u0096 use D313",
      "a": 47,
      "b": 51.0,
      "c": 51.0
    },
    "D318": {
      "value": "Sony PlayStation 4",
      "description": "Use with Product Form code DB, DI, DO or E* as applicable",
      "a": 47,
      "b": 51.0,
      "c": null
    },
    "D319": {
      "value": "Sony PlayStation Vita",
      "description": "Use with Product Form code DA or E* as applicable",
      "a": 47,
      "b": 51.0,
      "c": null
    },
    "D320": {
      "value": "Microsoft Xbox One",
      "description": "Use with Product Form code DB, DI, DO or E* as applicable",
      "a": 47,
      "b": 51.0,
      "c": null
    },
    "D321": {
      "value": "Nintendo Switch",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 47,
      "b": null,
      "c": null
    },
    "D322": {
      "value": "Nintendo Wii U",
      "description": "Use with Product Form code DE or DB as applicable",
      "a": 47,
      "b": null,
      "c": null
    },
    "D323": {
      "value": "Sony PlayStation 5",
      "description": "Use with Product Form code DB, DI, DO or E* as applicable",
      "a": 51,
      "b": null,
      "c": null
    },
    "D324": {
      "value": "Microsoft Xbox Series X / S",
      "description": "Use with Product Form code DB, DI, DO or E* as applicable",
      "a": 51,
      "b": null,
      "c": null
    },
    "E100": {
      "value": "Other",
      "description": "No code allocated for this e-publication format yet",
      "a": 13,
      "b": null,
      "c": null
    },
    "E101": {
      "value": "EPUB",
      "description": "The Open Publication Structure / OPS Container Format standard of the International Digital Publishing Forum (IDPF) [File extension .epub]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E102": {
      "value": "OEB",
      "description": "The Open EBook format of the IDPF, a predecessor of the full EPUB format, still (2008) supported as part of the latter [File extension .opf]. Includes EPUB format up to and including version 2 \u0096 but prefer code E101 for EPUB 2, and always use code E101 for EPUB 3",
      "a": 10,
      "b": 17.0,
      "c": null
    },
    "E103": {
      "value": "DOC",
      "description": "Microsoft Word binary document format [File extension .doc]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E104": {
      "value": "DOCX",
      "description": "Office Open XML / Microsoft Word XML document format (ISO/IEC 29500:2008) [File extension .docx]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E105": {
      "value": "HTML",
      "description": "HyperText Mark-up Language [File extension .html, .htm]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E106": {
      "value": "ODF",
      "description": "Open Document Format [File extension .odt]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E107": {
      "value": "PDF",
      "description": "Portable Document Format (ISO 32000-1:2008) [File extension .pdf]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E108": {
      "value": "PDF/A",
      "description": "PDF archiving format defined by ISO 19005-1:2005 [File extension .pdf]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E109": {
      "value": "RTF",
      "description": "Rich Text Format [File extension .rtf]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E110": {
      "value": "SGML",
      "description": "Standard Generalized Mark-up Language",
      "a": 10,
      "b": null,
      "c": null
    },
    "E111": {
      "value": "TCR",
      "description": "A compressed text format mainly used on Psion handheld devices [File extension .tcr]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E112": {
      "value": "TXT",
      "description": "Text file format [File extension .txt]. Typically ASCII or Unicode UTF-8/16",
      "a": 10,
      "b": null,
      "c": null
    },
    "E113": {
      "value": "XHTML",
      "description": "Extensible Hypertext Markup Language [File extension .xhtml, .xht, .xml, .html, .htm]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E114": {
      "value": "zTXT",
      "description": "A compressed text format mainly used on Palm handheld devices [File extension .pdb \u0096 see also E121, E125, E130]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E115": {
      "value": "XPS",
      "description": "XML Paper Specification format [File extension .xps]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E116": {
      "value": "Amazon Kindle",
      "description": "A format proprietary to Amazon for use with its Kindle reading devices or software readers [File extensions .azw, .mobi, .prc etc]. Prefer code E148 for Print Replica files",
      "a": 10,
      "b": 47.0,
      "c": null
    },
    "E117": {
      "value": "BBeB",
      "description": "A Sony proprietary format for use with the Sony Reader and LIBRI\u00e9 reading devices [File extension .lrf]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E118": {
      "value": "DXReader",
      "description": "A proprietary format for use with DXReader software",
      "a": 10,
      "b": null,
      "c": null
    },
    "E119": {
      "value": "EBL",
      "description": "A format proprietary to the Ebook Library service",
      "a": 10,
      "b": null,
      "c": null
    },
    "E120": {
      "value": "Ebrary",
      "description": "A format proprietary to the Ebrary service",
      "a": 10,
      "b": null,
      "c": null
    },
    "E121": {
      "value": "eReader",
      "description": "A proprietary format for use with eReader (AKA \u0091Palm Reader\u0092) software on various hardware platforms [File extension .pdb \u0096 see also E114, E125, E130]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E122": {
      "value": "Exebook",
      "description": "A proprietary format with its own reading system for Windows platforms [File extension .exe]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E123": {
      "value": "Franklin eBookman",
      "description": "A proprietary format for use with the Franklin eBookman reader",
      "a": 10,
      "b": null,
      "c": null
    },
    "E124": {
      "value": "Gemstar Rocketbook",
      "description": "A proprietary format for use with the Gemstar Rocketbook reader [File extension .rb]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E125": {
      "value": "iSilo",
      "description": "A proprietary format for use with iSilo software on various hardware platforms [File extension .pdb \u0096 see also E114, E121, E130]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E126": {
      "value": "Microsoft Reader",
      "description": "A proprietary format for use with Microsoft Reader software on Windows and Pocket PC platforms [File extension .lit]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E127": {
      "value": "Mobipocket",
      "description": "A proprietary format for use with Mobipocket software on various hardware platforms [File extensions .mobi, .prc]. Includes Amazon Kindle formats up to and including version 7 \u0096 but prefer code E116 for version 7, and always use E116 for KF8",
      "a": 10,
      "b": 17.0,
      "c": null
    },
    "E128": {
      "value": "MyiLibrary",
      "description": "A format proprietary to the MyiLibrary service",
      "a": 10,
      "b": null,
      "c": null
    },
    "E129": {
      "value": "NetLibrary",
      "description": "A format proprietary to the NetLibrary service",
      "a": 10,
      "b": null,
      "c": null
    },
    "E130": {
      "value": "Plucker",
      "description": "A proprietary format for use with Plucker reader software on Palm and other handheld devices [File extension .pdb \u0096 see also E114, E121, E125]",
      "a": 10,
      "b": null,
      "c": null
    },
    "E131": {
      "value": "VitalBook",
      "description": "A format proprietary to the VitalSource service",
      "a": 10,
      "b": null,
      "c": null
    },
    "E132": {
      "value": "Vook",
      "description": "A proprietary digital product combining text and video content and available to be used online or as a downloadable application for a mobile device \u0096 see www.vook.com",
      "a": 11,
      "b": null,
      "c": null
    },
    "E133": {
      "value": "Google Edition",
      "description": "An epublication made available by Google in association with a publisher; readable online on a browser-enabled device and offline on designated ebook readers",
      "a": 11,
      "b": null,
      "c": null
    },
    "E134": {
      "value": "Book \u0091app\u0092 for iOS",
      "description": "Epublication packaged as application for iOS (eg Apple iPhone, iPad etc), containing both executable code and content. Use <ProductContentType> to describe content, and <ProductFormFeatureType> to list detailed technical requirements",
      "a": 12,
      "b": null,
      "c": null
    },
    "E135": {
      "value": "Book \u0091app\u0092 for Android",
      "description": "Epublication packaged as application for Android (eg Android phone or tablet), containing both executable code and content. Use <ProductContentType> to describe content, and <ProductFormFeatureType> to list detailed technical requirements",
      "a": 12,
      "b": null,
      "c": null
    },
    "E136": {
      "value": "Book \u0091app\u0092 for other operating system",
      "description": "Epublication packaged as application, containing both executable code and content. Use where other \u0091app\u0092 codes are not applicable. Technical requirements such as target operating system and/or device should be provided eg in <ProductFormFeatureType>. Content type (text or text plus various \u0091enhancements\u0092) may be described with <ProductContentType>",
      "a": 12,
      "b": null,
      "c": null
    },
    "E139": {
      "value": "CEB",
      "description": "Founder Apabi\u0092s proprietary basic e-book format",
      "a": 15,
      "b": null,
      "c": null
    },
    "E140": {
      "value": "CEBX",
      "description": "Founder Apabi\u0092s proprietary XML e-book format",
      "a": 15,
      "b": null,
      "c": null
    },
    "E141": {
      "value": "iBook",
      "description": "Apple\u0092s iBook format (a proprietary extension of EPUB), can only be read on Apple iOS devices",
      "a": 17,
      "b": null,
      "c": null
    },
    "E142": {
      "value": "ePIB",
      "description": "Proprietary format based on EPUB used by Barnes and Noble for fixed-format e-books, readable on NOOK devices and Nook reader software",
      "a": 17,
      "b": null,
      "c": null
    },
    "E143": {
      "value": "SCORM",
      "description": "Sharable Content Object Reference Model, standard content and packaging format for e-learning objects",
      "a": 20,
      "b": null,
      "c": null
    },
    "E144": {
      "value": "EBP",
      "description": "E-book Plus (proprietary Norwegian e-book format)",
      "a": 24,
      "b": null,
      "c": null
    },
    "E145": {
      "value": "Page Perfect",
      "description": "Proprietary format based on PDF used by Barnes and Noble for fixed-format e-books, readable on some NOOK devices and Nook reader software",
      "a": 28,
      "b": null,
      "c": null
    },
    "E146": {
      "value": "BRF",
      "description": "(Braille-ready file) Electronic Braille file",
      "a": 37,
      "b": 51.0,
      "c": null
    },
    "E147": {
      "value": "Erudit",
      "description": "Proprietary XML format for articles, see for example https://www.cairn.info/services-aux-editeurs.php",
      "a": 41,
      "b": null,
      "c": null
    },
    "E148": {
      "value": "Amazon Kindle Print Replica",
      "description": "A format proprietary to Amazon for use with its Kindle reading devices or software readers. Essentially a PDF embedded within a KF8 format file",
      "a": 47,
      "b": null,
      "c": null
    },
    "E149": {
      "value": "Comic Book Archive",
      "description": "Format for comic books, consisting primarily of sequentially-named PNG or JPEG images in a zip container",
      "a": 50,
      "b": null,
      "c": null
    },
    "E150": {
      "value": "EPUB/A",
      "description": null,
      "a": 66,
      "b": null,
      "c": null
    },
    "E200": {
      "value": "Reflowable",
      "description": "Use this and/or code E201 when a particular e-publication type (specified using codes E100 and upwards) is reflowable or has both fixed layout and reflowable sections or variants, to indicate which option is included in this product",
      "a": 15,
      "b": 66.0,
      "c": null
    },
    "E201": {
      "value": "Fixed format",
      "description": "Use this and/or code E200 when a particular e-publication type (specified using codes E100 and upwards) is fixed layout or has both fixed layout and reflowable sections or variants, to indicate which option is included in this product",
      "a": 15,
      "b": 66.0,
      "c": null
    },
    "E202": {
      "value": "Readable offline",
      "description": "All e-publication resources are included within the e-publication package",
      "a": 15,
      "b": null,
      "c": null
    },
    "E203": {
      "value": "Requires network connection",
      "description": "E-publication requires a network connection to access some resources (eg an enhanced e-book where video clips are not stored within the e-publication package itself, but are delivered via an internet connection)",
      "a": 15,
      "b": null,
      "c": null
    },
    "E204": {
      "value": "Content removed",
      "description": "Resources (eg images) present in other editions have been removed from this product, eg due to rights issues",
      "a": 19,
      "b": null,
      "c": null
    },
    "E205": {
      "value": "Visible page numbering",
      "description": "(Mostly fixed-format) e-publication contains visible page numbers. Use with List 196 code 19 if numbering has a print-equivalent",
      "a": 62,
      "b": null,
      "c": null
    },
    "E206": {
      "value": "No preferred page progression",
      "description": "For e-publications only, pages may be rendered LTR or RTL (see B606 to B609)",
      "a": 62,
      "b": null,
      "c": null
    },
    "E210": {
      "value": "Landscape",
      "description": "Use for fixed-format e-books optimised for landscape display. Also include an indication of the optimal screen aspect ratio",
      "a": 23,
      "b": null,
      "c": null
    },
    "E211": {
      "value": "Portrait",
      "description": "Use for fixed-format e-books optimised for portrait display. Also include an indication of the optimal screen aspect ratio",
      "a": 23,
      "b": null,
      "c": null
    },
    "E212": {
      "value": "Square",
      "description": "Use for fixed-format e-books optimised for a square display.",
      "a": 54,
      "b": null,
      "c": null
    },
    "E213": {
      "value": "Vertical scrolling",
      "description": "Use for fixed-format e-publications optimised for vertical scrolling display (\u0091webtoon format\u0092)",
      "a": 62,
      "b": null,
      "c": null
    },
    "E221": {
      "value": "5:4",
      "description": "(1.25:1) Use for fixed-format e-books optimised for displays with a 5:4 aspect ratio (eg 1280x1024 pixels etc, assuming square pixels). Note that aspect ratio codes are NOT specific to actual screen dimensions or pixel counts, but to the ratios between two dimensions or two pixel counts",
      "a": 23,
      "b": null,
      "c": null
    },
    "E222": {
      "value": "4:3",
      "description": "(1.33:1) Use for fixed-format e-books optimised for displays with a 4:3 aspect ratio (eg 800x600, 1024x768, 2048x1536 pixels etc)",
      "a": 23,
      "b": null,
      "c": null
    },
    "E223": {
      "value": "3:2",
      "description": "(1.5:1) Use for fixed-format e-books optimised for displays with a 3:2 aspect ratio (eg 960x640, 3072x2048 pixels etc)",
      "a": 23,
      "b": null,
      "c": null
    },
    "E224": {
      "value": "16:10",
      "description": "(1.6:1) Use for fixed-format e-books optimised for displays with a 16:10 aspect ratio (eg 1440x900, 2560x1600 pixels etc)",
      "a": 23,
      "b": null,
      "c": null
    },
    "E225": {
      "value": "16:9",
      "description": "(1.77:1) Use for fixed-format e-books optimised for displays with a 16:9 aspect ratio (eg 1024x576, 1920x1080, 2048x1152 pixels etc)",
      "a": 23,
      "b": null,
      "c": null
    },
    "E226": {
      "value": "18:9",
      "description": "(2:1) Use for fixed-format e-books optimised for displays with an 18:9 aspect ratio (eg 2160x1080, 2880x1440 pixels etc)",
      "a": 54,
      "b": null,
      "c": null
    },
    "E227": {
      "value": "21:9",
      "description": "(2.37:1) Use for fixed-format e-books optimised for displays with an 21:9 (or 64:27) aspect ratio (eg 3840x1644 pixels etc)",
      "a": 54,
      "b": null,
      "c": null
    },
    "L101": {
      "value": "Laminated",
      "description": "Whole product laminated (eg laminated map, fold-out chart, wallchart, etc): use B415 for book with laminated cover",
      "a": 8,
      "b": null,
      "c": null
    },
    "P091": {
      "value": "Calendar with write-in space",
      "description": "(de: Nutzkalendarium) Calendar or diary has spaces intended for entering birthdays, appointments, notes etc. Use with other calendar / diary type codes",
      "a": 62,
      "b": null,
      "c": null
    },
    "P092": {
      "value": "Calendar without write-in space",
      "description": "(de: Schmuckkalendarium) Calendar or diary has no spaces intended for entering birthdays, appointments, notes etc. Use with other calendar / diary type codes",
      "a": 62,
      "b": null,
      "c": null
    },
    "P096": {
      "value": "Multiple months per page",
      "description": "(de: Mehrmonatskalender) Calendar has multiple months (but not whole year) per page or view. Use with other calendar / diary type codes when the time period per sheet, page or view is not the expected arrangement",
      "a": 62,
      "b": null,
      "c": null
    },
    "P097": {
      "value": "One month per page",
      "description": "(de: Monatskalender) Calendar has one month per page or view",
      "a": 62,
      "b": null,
      "c": null
    },
    "P098": {
      "value": "One week per page",
      "description": "(de: Wochenkalender) Calendar has one week per page or view",
      "a": 62,
      "b": null,
      "c": null
    },
    "P099": {
      "value": "One day per page",
      "description": "(de: Tageskalender) Calendar has one day per page or view",
      "a": 62,
      "b": null,
      "c": null
    },
    "P101": {
      "value": "Desk calendar or diary",
      "description": "Large format, usually one week per page or view. Use with Product Form code PC or PF",
      "a": 2,
      "b": 48.0,
      "c": null
    },
    "P102": {
      "value": "Mini calendar or pocket diary",
      "description": "Small format, usually one week per page or view. Use with Product Form code PC or PF",
      "a": 2,
      "b": 48.0,
      "c": null
    },
    "P103": {
      "value": "Engagement calendar or Appointment diary",
      "description": "Day planner. Usually one day per page or view, with time-of-day subdivisions (rather than just days) or adequate space to add them. Use with Product Form code PC or PF",
      "a": 2,
      "b": 48.0,
      "c": null
    },
    "P104": {
      "value": "Day by day calendar",
      "description": "Eg tear-off calendars (one day per sheet). Use with Product Form code PC",
      "a": 2,
      "b": 48.0,
      "c": null
    },
    "P105": {
      "value": "Poster calendar",
      "description": "Large single-sheet calendar intended for hanging. Use with Product Form code PC or PK",
      "a": 2,
      "b": 49.0,
      "c": null
    },
    "P106": {
      "value": "Wall calendar",
      "description": "Large calendar usually intended for hanging from the spine, typically one page per view and one month per view, with illustrations. See also P134. Use with Product Form code PC",
      "a": 2,
      "b": 63.0,
      "c": null
    },
    "P107": {
      "value": "Perpetual calendar or diary",
      "description": "Usually undated. Use with Product Form code PC or PF, and can be combined with other calendar/diary type codes",
      "a": 6,
      "b": 48.0,
      "c": null
    },
    "P108": {
      "value": "Advent calendar",
      "description": "Use with Product Form code PC, and can be combined with other calendar/diary type codes",
      "a": 6,
      "b": null,
      "c": null
    },
    "P109": {
      "value": "Bookmark calendar",
      "description": "Use with Product Form code PC or PT",
      "a": 8,
      "b": 48.0,
      "c": null
    },
    "P110": {
      "value": "Student or Academic calendar or diary",
      "description": "Mid-year diary, start and end aligned with the academic year. Use with Product Form code PC or PF, and can be combined with other calendar/diary type codes",
      "a": 8,
      "b": 48.0,
      "c": null
    },
    "P111": {
      "value": "Project calendar",
      "description": "Use with Product Form code PC",
      "a": 8,
      "b": null,
      "c": null
    },
    "P112": {
      "value": "Almanac calendar",
      "description": "Use with Product Form code PC",
      "a": 8,
      "b": null,
      "c": null
    },
    "P113": {
      "value": "Other calendar, diary or organiser",
      "description": "A calendar, diary or organiser that is not one of the types specified elsewhere: use with Product Form code PC, PF or PS",
      "a": 8,
      "b": 48.0,
      "c": null
    },
    "P114": {
      "value": "Other calendar or organiser product",
      "description": "A product that is associated with or ancillary to a calendar or organiser, eg a deskstand for a calendar, or an insert for an organiser: use with Product Form code PC or PS",
      "a": 8,
      "b": null,
      "c": null
    },
    "P115": {
      "value": "Family planner",
      "description": "Wall or poster calendar with entries for each family member. Use with Product Form code PC or PK",
      "a": 49,
      "b": null,
      "c": null
    },
    "P116": {
      "value": "Postcard calendar",
      "description": "Calendar sheets detachable (usually perforated) and intended for mailing as postcards. Use with Product Form code PC",
      "a": 51,
      "b": null,
      "c": null
    },
    "P131": {
      "value": "Blank calendar",
      "description": "Wall calendar without illustrations, usually one page per month, intended to be used by adding your own images (de: Bastelkalender). Use with Product Form code PC",
      "a": 62,
      "b": null,
      "c": null
    },
    "P132": {
      "value": "Panoramic calendar",
      "description": "Very large wall calendar intended for hanging, usually one page per month, wide landscape orientation, with illustrations. Use with Product Form code PC",
      "a": 62,
      "b": null,
      "c": null
    },
    "P133": {
      "value": "Columnar calendar",
      "description": "Very large wall calendar intended for hanging, usually one page per month, narrow portrait orientation, with illustrations. Use with Product Form code PC",
      "a": 62,
      "b": null,
      "c": null
    },
    "P134": {
      "value": "Square calendar",
      "description": "(de: Broschurkalender) Wall calendar, usually intended for hanging from a page edge, typically two pages per view and one month per view, with illustrations. See also P106. Use with Product Form code PC",
      "a": 63,
      "b": null,
      "c": null
    },
    "P120": {
      "value": "Picture story cards",
      "description": "Kamishibai / Cantastoria cards",
      "a": 30,
      "b": null,
      "c": null
    },
    "P121": {
      "value": "Flash cards",
      "description": "For use to specify letter, word, image (etc) recognition cards for teaching reading or other classroom use. Use with Product form code PD",
      "a": 51,
      "b": null,
      "c": null
    },
    "P122": {
      "value": "Reference cards",
      "description": "Quick reference cards, revision cards, recipe cards etc. Use with Product form code PD",
      "a": 51,
      "b": null,
      "c": null
    },
    "P123": {
      "value": "Recreation cards",
      "description": "For use to specify cards and card decks for gaming, collecting and trading etc. Use also for divination cards. Use with Product form codes PD",
      "a": 51,
      "b": null,
      "c": null
    },
    "P124": {
      "value": "Postcards",
      "description": "And postcard packs / books. Use with Product form code PJ",
      "a": 51,
      "b": null,
      "c": null
    },
    "P125": {
      "value": "Greeting cards",
      "description": "And greeting card packs. Use with Product form code PJ",
      "a": 51,
      "b": null,
      "c": null
    },
    "P126": {
      "value": "Gift cards",
      "description": "Physical cards which carry an intrinsic value, or which are intended to have value added to them, that may be redeemed later. For example book token cards, gift cards. Note value additions and redemption may be in a physical store or online",
      "a": 53,
      "b": null,
      "c": null
    },
    "P127": {
      "value": "Certificate cards",
      "description": "Blank certificate, award or achivement cards, Use with Product form code PD",
      "a": 58,
      "b": null,
      "c": null
    },
    "P201": {
      "value": "Hardback (stationery)",
      "description": "Stationery item in hardback book format",
      "a": 10,
      "b": null,
      "c": null
    },
    "P202": {
      "value": "Paperback / softback (stationery)",
      "description": "Stationery item in paperback/softback book format",
      "a": 10,
      "b": null,
      "c": null
    },
    "P203": {
      "value": "Spiral bound (stationery)",
      "description": "Stationery item in spiral-bound book format",
      "a": 10,
      "b": null,
      "c": null
    },
    "P204": {
      "value": "Leather / fine binding (stationery)",
      "description": "Stationery item in leather-bound book format, or other fine binding",
      "a": 10,
      "b": null,
      "c": null
    },
    "P301": {
      "value": "With hanging strips",
      "description": "For wall map, poster, wallchart etc",
      "a": 32,
      "b": null,
      "c": null
    },
    "P305": {
      "value": "Single-sided",
      "description": "Content is printed single-sided (for wallcharts and hanging maps, calendars, etc)",
      "a": 57,
      "b": null,
      "c": null
    },
    "P306": {
      "value": "Double-sided",
      "description": "Content is printed double-sided (for wallcharts and hanging maps, calendars, etc, where double-sided may not always be expected)",
      "a": 57,
      "b": null,
      "c": null
    },
    "V201": {
      "value": "PAL",
      "description": "SD TV standard for video or DVD",
      "a": 2,
      "b": null,
      "c": null
    },
    "V202": {
      "value": "NTSC",
      "description": "SD TV standard for video or DVD",
      "a": 2,
      "b": null,
      "c": null
    },
    "V203": {
      "value": "SECAM",
      "description": "SD TV standard for video or DVD",
      "a": 2,
      "b": null,
      "c": null
    },
    "V205": {
      "value": "HD",
      "description": "Up to 2K resolution (1920 or 2048 pixels wide) eg for Blu-Ray",
      "a": 40,
      "b": null,
      "c": null
    },
    "V206": {
      "value": "UHD",
      "description": "Up to 4K resolution (3840 or 4096 pixels wide) eg for Ultra HD Blu-Ray",
      "a": 40,
      "b": null,
      "c": null
    },
    "V207": {
      "value": "3D video",
      "description": "Eg for Blu-ray 3D",
      "a": 40,
      "b": null,
      "c": null
    },
    "V210": {
      "value": "Closed captions",
      "description": "Or subtitles",
      "a": 64,
      "b": null,
      "c": null
    },
    "V211": {
      "value": "Open captions",
      "description": "\u0091Burnt-in\u0092 or hard captions or subtitles",
      "a": 64,
      "b": null,
      "c": null
    },
    "V212": {
      "value": "Transcript",
      "description": "Full transcript of audio and audiovisual content included within the product supplied. See also List 158, where a transcript is a separate resource",
      "a": 66,
      "b": null,
      "c": null
    },
    "V213": {
      "value": "Sign language interpretation",
      "description": "Full signing of audio and audiovisual content of the included within the product supplied",
      "a": 66,
      "b": null,
      "c": null
    },
    "V220": {
      "value": "Home use",
      "description": "Licensed for use in domestic contexts only",
      "a": 28,
      "b": null,
      "c": null
    },
    "V221": {
      "value": "Classroom use",
      "description": "Licensed for use in education",
      "a": 28,
      "b": null,
      "c": null
    },
    "Z101": {
      "value": "Wooden",
      "description": "Primary material composition (eg of kit or puzzle pieces, of gameplay tokens or tiles) is wood or has wooden pieces/parts",
      "a": 50,
      "b": null,
      "c": null
    },
    "Z102": {
      "value": "Plastic",
      "description": "Plastic or plastic pieces/parts",
      "a": 50,
      "b": null,
      "c": null
    },
    "Z103": {
      "value": "Board",
      "description": "Card or board pieces/parts",
      "a": 50,
      "b": null,
      "c": null
    },
    "Z111": {
      "value": "3D puzzle",
      "description": "Puzzle assembles into a 3D object",
      "a": 51,
      "b": null,
      "c": null
    },
    "Z112": {
      "value": "Noisy kit / puzzle / toy",
      "description": "Toy makes a noise. See B208 for noisy books",
      "a": 51,
      "b": null,
      "c": null
    },
    "Z113": {
      "value": "Puppet",
      "description": "Including finger / hand puppets, marionettes",
      "a": 51,
      "b": null,
      "c": null
    },
    "Z121": {
      "value": "Extra large pieces",
      "description": "Designed and sized for the very young, or those with visual impairments, limited motor skills, dementia etc",
      "a": 50,
      "b": null,
      "c": null
    }
  },
  "176": {
    "01": {
      "value": "Android",
      "description": "An Open Source mobile device operating system originally developed by Google and supported by the Open Handset Alliance",
      "a": 10,
      "b": null,
      "c": null
    },
    "02": {
      "value": "BlackBerry OS",
      "description": "A proprietary operating system supplied by Research In Motion for its BlackBerry handheld devices",
      "a": 10,
      "b": null,
      "c": null
    },
    "03": {
      "value": "iOS",
      "description": "A proprietary operating system based on Mac OS X supplied by Apple for its iPhone, iPad and iPod Touch handheld devices",
      "a": 10,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Linux",
      "description": "An operating system based on the Linux kernel",
      "a": 10,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Mac OS",
      "description": "Proprietary \u0091Classic\u0092 operating system supplied by Apple on Macintosh computers up to 2002. Deprecated \u0096 use code 13 for all Mac OS versions",
      "a": 10,
      "b": 11.0,
      "c": 11.0
    },
    "06": {
      "value": "Mac OS X",
      "description": "Proprietary \u0091OS X\u0092 operating system supplied by Apple on Macintosh computers from 2001/2002. Deprecated \u0096 use code 13 for all Mac OS versions",
      "a": 10,
      "b": 11.0,
      "c": 11.0
    },
    "07": {
      "value": "Palm OS",
      "description": "A proprietary operating system (AKA Garnet OS) originally developed for handheld devices",
      "a": 10,
      "b": null,
      "c": null
    },
    "08": {
      "value": "webOS",
      "description": "A proprietry Linux-based operating system for handheld devices, originally developed by Palm (now owned by LG)",
      "a": 10,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Symbian",
      "description": "An operating system for hand-held devices, originally developed as a proprietary system, but planned to become wholly Open Source by 2010",
      "a": 10,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Windows",
      "description": "A proprietary operating system supplied by Microsoft",
      "a": 10,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Windows CE",
      "description": "A proprietary operating system (AKA Windows Embedded Compact, WinCE) supplied by Microsoft for small-scale devices",
      "a": 10,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Windows Mobile",
      "description": "A proprietary operating system supplied by Microsoft for mobile devices",
      "a": 10,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Mac OS",
      "description": "A proprietary operating system supplied by Apple on Macintosh computers",
      "a": 11,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Windows Phone 7",
      "description": "A proprietary operating system supplied by Microsoft for mobile devices, successor to Windows Mobile",
      "a": 12,
      "b": null,
      "c": null
    }
  },
  "177": {
    "50": {
      "value": "Date of birth",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "51": {
      "value": "Date of death",
      "description": null,
      "a": 9,
      "b": null,
      "c": null
    },
    "56": {
      "value": "Flourished around",
      "description": "(\u0091Floruit\u0092). To date the height of or most productive period during a career",
      "a": 33,
      "b": null,
      "c": null
    }
  },
  "178": {
    "A103": {
      "value": "MP3",
      "description": "MPEG 1/2 Audio Layer III file",
      "a": 10,
      "b": null,
      "c": null
    },
    "A104": {
      "value": "WAV",
      "description": "Waveform Audio file",
      "a": 10,
      "b": null,
      "c": null
    },
    "A105": {
      "value": "Real Audio",
      "description": "Proprietary RealNetworks format",
      "a": 10,
      "b": null,
      "c": null
    },
    "A106": {
      "value": "WMA",
      "description": "Windows Media Audio format",
      "a": 10,
      "b": null,
      "c": null
    },
    "A107": {
      "value": "AAC",
      "description": "Advanced Audio Coding format",
      "a": 10,
      "b": null,
      "c": null
    },
    "A108": {
      "value": "Ogg/Vorbis",
      "description": "Vorbis audio format in the Ogg container",
      "a": 35,
      "b": null,
      "c": null
    },
    "A111": {
      "value": "AIFF",
      "description": "Audio Interchange File format",
      "a": 15,
      "b": null,
      "c": null
    },
    "D101": {
      "value": "Real Video",
      "description": "Proprietary RealNetworks format. Includes Real Video packaged within a .rm RealMedia container",
      "a": 10,
      "b": 18.0,
      "c": null
    },
    "D102": {
      "value": "Quicktime",
      "description": "Quicktime container format (.mov)",
      "a": 10,
      "b": 15.0,
      "c": null
    },
    "D103": {
      "value": "AVI",
      "description": "Audio Video Interleave format",
      "a": 10,
      "b": null,
      "c": null
    },
    "D104": {
      "value": "WMV",
      "description": "Windows Media Video format",
      "a": 10,
      "b": null,
      "c": null
    },
    "D105": {
      "value": "MPEG-4",
      "description": "MPEG-4 container format (.mp4, .m4a)",
      "a": 10,
      "b": 15.0,
      "c": null
    },
    "D106": {
      "value": "FLV",
      "description": "Flash Video (.flv, .f4v)",
      "a": 10,
      "b": null,
      "c": null
    },
    "D107": {
      "value": "SWF",
      "description": "ShockWave (.swf)",
      "a": 10,
      "b": null,
      "c": null
    },
    "D108": {
      "value": "3GP",
      "description": "3GPP container format (.3gp, .3g2)",
      "a": 15,
      "b": null,
      "c": null
    },
    "D109": {
      "value": "WebM",
      "description": "WebM container format (includes .mkv)",
      "a": 15,
      "b": null,
      "c": null
    },
    "D401": {
      "value": "PDF",
      "description": "Portable Document File (single page image)",
      "a": 10,
      "b": 44.0,
      "c": null
    },
    "D501": {
      "value": "GIF",
      "description": "Graphic Interchange File format",
      "a": 10,
      "b": null,
      "c": null
    },
    "D502": {
      "value": "JPEG",
      "description": "Joint Photographic Experts Group format",
      "a": 10,
      "b": null,
      "c": null
    },
    "D503": {
      "value": "PNG",
      "description": "Portable Network Graphics format",
      "a": 10,
      "b": null,
      "c": null
    },
    "D504": {
      "value": "TIFF",
      "description": "Tagged Image File format",
      "a": 10,
      "b": null,
      "c": null
    },
    "D505": {
      "value": "BMP",
      "description": "Windows Bitmap format",
      "a": 44,
      "b": null,
      "c": null
    },
    "D506": {
      "value": "JP2",
      "description": "JPEG 2000, improved Joint Photographic Experts Group format",
      "a": 44,
      "b": null,
      "c": null
    },
    "D507": {
      "value": "PSD",
      "description": "Adobe Photoshop native file format, PSD or PSB",
      "a": 44,
      "b": null,
      "c": null
    },
    "D508": {
      "value": "EPS",
      "description": "Image as Postscript or Encapsulated Postscript file (.ps or .eps)",
      "a": 44,
      "b": null,
      "c": null
    },
    "D509": {
      "value": "WebP",
      "description": "Google-developed image format",
      "a": 65,
      "b": null,
      "c": null
    },
    "D510": {
      "value": "SVG",
      "description": "Scalable vector graphics",
      "a": 65,
      "b": null,
      "c": null
    },
    "E101": {
      "value": "EPUB",
      "description": "The Open Publication Structure / OPS Container Format standard of the International Digital Publishing Forum (IDPF) [File extension .epub]",
      "a": 11,
      "b": null,
      "c": null
    },
    "E105": {
      "value": "HTML",
      "description": "HyperText Mark-up Language [File extension .html, .htm]",
      "a": 17,
      "b": null,
      "c": null
    },
    "E107": {
      "value": "PDF",
      "description": "Portable Document Format (ISO 32000-1:2008) [File extension .pdf]",
      "a": 17,
      "b": null,
      "c": null
    },
    "E112": {
      "value": "TXT",
      "description": "Plain text (either ASCII or UTF-8/16 Unicode)",
      "a": 30,
      "b": null,
      "c": null
    },
    "E113": {
      "value": "XHTML",
      "description": "Extensible Hypertext Markup Language [File extension .xhtml, .xht, .xml, .html, .htm]",
      "a": 17,
      "b": null,
      "c": null
    },
    "E115": {
      "value": "XPS",
      "description": "XML Paper Specification",
      "a": 16,
      "b": null,
      "c": null
    },
    "E116": {
      "value": "Amazon Kindle",
      "description": "A format proprietary to Amazon for use with its Kindle reading devices or software readers [File extensions .azw, .mobi, .prc]",
      "a": 21,
      "b": null,
      "c": null
    },
    "E139": {
      "value": "CEB",
      "description": "Founder Apabi\u0092s proprietary basic e-book format",
      "a": 20,
      "b": null,
      "c": null
    },
    "E140": {
      "value": "CEBX",
      "description": "Founder Apabi\u0092s proprietary XML e-book format",
      "a": 20,
      "b": null,
      "c": null
    }
  },
  "179": {
    "01": {
      "value": "Proprietary",
      "description": "A publisher or retailer\u0092s proprietary code list as specified in <PriceCodeTypeName> which identifies particular codes with particular price points, price tiers or bands",
      "a": 12,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Finnish Pocket Book price code",
      "description": "Price Code scheme for Finnish Pocket Books (Pokkareiden hintaryhm\u00e4). Price codes expressed as letters A\u0096J in <PriceCode>",
      "a": 14,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Finnish Miki Book price code",
      "description": "Price Code scheme for Finnish Miki Books (Miki-kirjojen hintaryhm\u00e4). Price codes expressed as an integer 1\u0096n in <PriceCode>",
      "a": 25,
      "b": null,
      "c": null
    }
  },
  "184": {
    "00": {
      "value": "No warning",
      "description": "Use to provide positive indication that no warnings are applicable",
      "a": 13,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Carries \u0091CE\u0092 logo",
      "description": null,
      "a": 13,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Carries minimum age warning",
      "description": "Use to specify age (in years, or years and months). Provide specific wording in <ProductFormFeatureDescription>",
      "a": 13,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Carries EU Toy Safety Directive \u0091Unsuitable for children ages 0\u00963\u0092 warning logo",
      "description": "Carries logo, and must be accompanied by the default warning \u0091Not suitable for children under 36 months\u0092 (or its approved equivalent in a language other than English, as appropriate), unless specific wording is provided in <ProductFormFeatureDescription>. If specific alternative wording is carried in <ProductFormFeatureDescription>, this must be used in place of the default text",
      "a": 13,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Carries EU Toy Safety Directive hazard warning",
      "description": "Exact text of warning must be included in <ProductFormFeatureDescription>",
      "a": 13,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Carries other text associated with toy safety",
      "description": "Exact text (not in itself a warning) must be included in <ProductFormFeatureDescription>. May be used either without any warning, or as text additional to a warning. Note that if no warnings apply, code 00 can provide positive indication of this. Example uses: \u0091Suitable for all ages\u0092 or \u0091Adult supervision required\u0092",
      "a": 15,
      "b": 48.0,
      "c": null
    },
    "06": {
      "value": "Material Safety Data Sheet available",
      "description": "Material Safety Data Sheet (a document required by the EU Toy Safety Directive) available online, typically as a PDF file or similar. <ProductFormFeatureDescription> must carry the URL of the document",
      "a": 17,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Declaration of Conformity available",
      "description": "Declaration of Conformity (the document that backs up the CE or CA mark) available online, typically as a PDF file or similar. <ProductFormFeatureDescription> must carry the URL of the document",
      "a": 17,
      "b": 52.0,
      "c": null
    },
    "08": {
      "value": "Carries EN71 conformity statement",
      "description": "If specific alternative wording is carried in <ProductFormFeatureDescription>, this must be used in place of the default \u0091Conforms to EN71\u0092 text",
      "a": 48,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Carries \u0091UKCA\u0092 logo",
      "description": "UK Conformity Assessment mark. Only for use in ONIX 3.0 or later",
      "a": 52,
      "b": null,
      "c": null
    }
  },
  "196": {
    "00": {
      "value": "Accessibility summary",
      "description": "<ProductFormFeatureDescription> contains a short explanatory summary of the accessibility of the product, or the URL of a web page comprising such a summary, consistent with the more specific conformance, feature and certification details provided. The summary should note both the accessibility features provided and any potential deficiencies. The summary does not remove the requirement for full structured accessibility data, but should be considered a fall-back option if more structured detail cannot be provided or used. Further detailed information may be provided in an external file using codes 94\u009696. Only for use in ONIX 3.0 or later",
      "a": 37,
      "b": 64.0,
      "c": null
    },
    "01": {
      "value": "LIA Compliance Scheme",
      "description": null,
      "a": 16,
      "b": null,
      "c": null
    },
    "02": {
      "value": "EPUB Accessibility Specification 1.0 A",
      "description": "Conforms with the requirements of EPUB Accessibility Spec 1.0 and WCAG level A. <ProductFormFeatureDescription> may carry a URL linking to a compliance report or certification provided by an independent third party certifier. In the absence of a URL, conformance with the requirements of the Accessibility Specification is self-certified by the publisher",
      "a": 36,
      "b": 46.0,
      "c": null
    },
    "03": {
      "value": "EPUB Accessibility Specification 1.0 AA",
      "description": "Conforms with the requirements of EPUB Accessibility Spec 1.0 and WCAG level AA. <ProductFormFeatureDescription> may carry a URL linking to a compliance report or certification provided by an independent third party certifier. In the absence of a URL, conformance with the requirements of the Accessibility Specification is self-certified by the publisher",
      "a": 36,
      "b": 46.0,
      "c": null
    },
    "04": {
      "value": "Epub Accessibility Specification 1.1",
      "description": "Conforms with the requirements of EPUB Accessibility Spec v1.1 \u0096 see https://www.w3.org/TR/epub-a11y-11/. <ProductFormFeatureDescription> may carry a URL linking to a compliance report or certification provided by an independent third-party certifier. In the absence of a URL, conformance with the requirements of the Accessibility Specification is self- certified by the publisher. Use with other List 196 codes to indicate WCAG version and level, ARIA inclusion. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "05": {
      "value": "PDF/UA-1",
      "description": "Conforms with the requirements of ISO 32000-1:2008 plus ISO 14289-1:2014 \u0096 Portable Document Format for Universal Accessibility, for example, all content is tagged in logical reading order and correctly represents the document\u0092s semantic structure. Only for use in ONIX 3.0 or later",
      "a": 46,
      "b": 66.0,
      "c": null
    },
    "06": {
      "value": "PDF/UA-2",
      "description": "Conforms with the requirements of ISO 32000-2:2020 (PDF 2.0) plus ISO 14289-2:2024 \u0096 Portable Document Format for Universal Accessibility v2, for example, the revised semantic tagging, MathML, Unicode support and associated documents from PDF 2.0. Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Unknown accessibility",
      "description": "Product has not yet been assessed for accessibility, or no or insufficient accessibility information is provided. It should be treated as likely to be inaccessible (and also may not have been checked for hazards). <ProductFormFeatureDescription> may carry details of why the accessibility of the title is unknown. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Inaccessible, or known limited accessibility",
      "description": "Known to lack significant features required for broad accessibility. Details of and reasons for limitations on accessibility can be given in <ProductFormFeatureDescription>. Only for use in ONIX 3.0 or later",
      "a": 40,
      "b": 62.0,
      "c": null
    },
    "10": {
      "value": "No reading system accessibility options actively disabled (except)",
      "description": "No accessibility features or content rendering options offered by the reading system, device or reading software (including but not limited to the ability to modify or choose text size or typeface, word and line spacing, zoom level, text or background color, or use of text-to-speech) are limited, disabled, overridden or otherwise unusable with the product EXCEPT \u0096 in ONIX 3 messages only \u0096 those specifically noted as subject to restriction or prohibition in <EpubUsageConstraint>. Note that provision of any significant part of the textual content as images (ie as pictures of text, rather than as \u0091text-as-text\u0092, and without any textual equivalent) or the application of some technical protection measures (DRM), inevitably prevents full use of these accessibility options. Code 10 means \u0091this e-publication is accessible to the full extent that the file format and types of content allow, on a specific reading device, by default, without necessarily inluding any additions such as textual descriptions of images or enhanced navigation. Note that for reflowable e-books, this means code 36 also applies, although code 10 can also be used with accessible non-reflowable (fixed-format) e-publications and with audio material. Should be used with other codes that describe any additions to enhance the level of accessibility",
      "a": 15,
      "b": 62.0,
      "c": null
    },
    "11": {
      "value": "Table of contents navigation",
      "description": "Table of contents allows direct (eg hyperlinked) access to all levels of text organization above individual paragraphs (ie to all chapters, sections and subsections that exist within the text), and to all tables, figures, illustrations etc (non-textual items such as illustrations, tables, audio or video content may be directly accessible from the Table of contents, or from a similar List of illustrations, List of tables, etc)",
      "a": 15,
      "b": 66.0,
      "c": null
    },
    "12": {
      "value": "Index navigation",
      "description": "Index provides direct (eg hyperlinked) access to uses of the index terms in the document body",
      "a": 15,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Single logical reading order",
      "description": "All or substantially all textual matter is arranged in a single logical reading order (including text that is visually presented as separate from the main text flow, eg in boxouts, captions, tables, footnotes, endnotes, citations, etc). Non-textual content is also linked from within this logical reading order. (Purely decorative non-text content can be ignored). All or substantially all audio content should also have a single logical \u0091reading order\u0092, which is the order the content should be presented to the listener",
      "a": 15,
      "b": 62.0,
      "c": null
    },
    "14": {
      "value": "Short alternative textual descriptions",
      "description": "All or substantially all non-text content has short alternative (textual) descriptions, usually provided via alt attributes. Note this applies to normal images (eg photographs, charts and diagrams) and also to any embedded audio, video etc. Audio and video content should include alternative descriptions suitable for hearing-impaired as well as for visually-impaired readers. (Purely decorative non-text content can be ignored, but the accessibility of resources delivered via a network connection rather than as part of the e-publication package must be included)",
      "a": 15,
      "b": 62.0,
      "c": null
    },
    "15": {
      "value": "Full alternative textual descriptions",
      "description": "All or substantially all non-text content has full alternative (textual) descriptions. Note this applies to normal images (eg photographs, charts and diagrams) and also to any embedded audio, video etc. Audio and video content should include full alternative descriptions (eg audio-described video) and transcript, subtitles or captions (whether closed or open) suitable for hearing-impaired as well as for visually-impaired readers. (Purely decorative non-text content can be ignored, but the accessibility of resources delivered via a network connection rather than as part of the e-publication package must be included)",
      "a": 15,
      "b": 62.0,
      "c": null
    },
    "16": {
      "value": "Visualised data also available as non-graphical data",
      "description": "Where data visualisations are provided (eg graphs and charts), the underlying data is also available in non-graphical (usually tabular, textual) form",
      "a": 15,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Accessible math content as MathML",
      "description": "Mathematical content such as equations is usable with assistive technology, through use of MathML. Semantic MathML is preferred but Presentational MathML is acceptable",
      "a": 15,
      "b": 62.0,
      "c": null
    },
    "18": {
      "value": "Accessible chemistry content as ChemML",
      "description": "Chemistry content such as chemical formulae is usable with assistive technology, through use of ChemML",
      "a": 15,
      "b": 62.0,
      "c": null
    },
    "19": {
      "value": "Print-equivalent page numbering",
      "description": "For a reflowable e-publication, contains references to the page numbering of an equivalent printed product, page number navigation based on print-equivalent page numbers or digital-only static page breaks. Use <RelatedProduct> with relation code 13 to specify an identifier for the source of the page numbers",
      "a": 15,
      "b": 66.0,
      "c": null
    },
    "20": {
      "value": "Synchronised pre-recorded audio",
      "description": "Text-synchronised pre-recorded audio narration (natural or synthesised voice) is included for substantially all textual matter, including all alternative descriptions, eg via a SMIL media overlay",
      "a": 15,
      "b": 62.0,
      "c": null
    },
    "21": {
      "value": "Text-to-speech hinting provided",
      "description": "Text-to-speech has been optimised through provision of PLS lexicons, SSML or CSS Speech synthesis hints or other speech synthesis markup languages or hinting",
      "a": 19,
      "b": 62.0,
      "c": null
    },
    "22": {
      "value": "Language tagging provided",
      "description": "The language of the text has been specified (eg via the HTML or XML lang attribute) to optimise text-to-speech (and other alternative renderings), both at whole document level and, where appropriate, for individual words, phrases or passages in a different language",
      "a": 20,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Dyslexia readability",
      "description": "Specialised font, character and/or line spacing, justification and paragraph spacing, coloring and other options provided specifically to improve readability for dyslexic readers. Details, including the name of the font if relevant, should be listed in <ProductFormFeatureDescription>. Use with <EditionType> code HRE as appropriate",
      "a": 33,
      "b": 62.0,
      "c": null
    },
    "25": {
      "value": "Use of color is not sole means of conveying information",
      "description": "For readers with color vision deficiency, use of color (eg in diagrams, graphs and charts, in prompts or on buttons inviting a response) is not the sole means of graphical distinction or of conveying information. Only for use in ONIX 3.0 or later",
      "a": 48,
      "b": 62.0,
      "c": null
    },
    "26": {
      "value": "Use of high contrast between text and background color",
      "description": "Body text is presented with a contrast ratio of at least 4.5:1 (or 3:1 for large/heading text). Only for use in ONIX 3.0 or later",
      "a": 48,
      "b": 62.0,
      "c": null
    },
    "27": {
      "value": "Use of high contrast between foreground and background audio",
      "description": "Foreground audio content (eg voice) is presented with no or low background noise (eg ambient sounds, music), at least 20dB below the level of the foreground, or background noise can be switched off (eg via an alternative audio track). Brief and occasional sound effects may be as loud as foreground voice so long as they are isolated from the foreground. Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": 62.0,
      "c": null
    },
    "28": {
      "value": "Full alternative audio descriptions",
      "description": "All or substantially all non-text content has full alternative descriptions as pre-recorded audio. Note this applies to normal images (eg photographs, charts and diagrams) and also to any embedded video etc. Video content should include full alternative descriptions (eg audio-described video) and transcript, subtitles or captions (whether closed or open) suitable for hearing-impaired as well as for visually-impaired readers. (Purely decorative non-text content can be ignored, but the accessibility of resources delivered via a network connection rather than as part of the e-publication package must be included). Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Next / Previous structural navigation",
      "description": "All levels of heading and other structural elements of the content are correctly marked up and (if applicable) numbered, to enable fast next heading / previous heading, next chapter / previous chapter navigation without returning to the table of contents. Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": 62.0,
      "c": null
    },
    "30": {
      "value": "ARIA roles provided",
      "description": "Accessible Rich Internet Applications (ARIA) roles (including associated states and properties) are used to organize and improve the structural or landmark navigation of the publication (eg to identify key sections of the content and the purpose of hyperlinks). Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": 66.0,
      "c": null
    },
    "31": {
      "value": "Accessible controls provided",
      "description": "Where interactive content is included in the product, controls are provided (eg for speed, pause and resume, reset) and labelled to make their use clear. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": 66.0,
      "c": null
    },
    "32": {
      "value": "Landmark navigation",
      "description": "E-publication includes basic landmark navigation (usually less detailed than TOC-based navigation). Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "34": {
      "value": "Accessible chemistry content (as MathML)",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "35": {
      "value": "Accessible math content (as LaTeX)",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "36": {
      "value": "All textual content can be modified",
      "description": "E-publication does not restrict the ability of users to modify and reflow the display of any textual content to the full extent allowed by the reading system (eg to change the text size or typeface, line height and word spacing, colors). Only for use in ONIX 3.0 or later. Compare with code 10 which applies to a broader range of content types",
      "a": 62,
      "b": null,
      "c": null
    },
    "37": {
      "value": "Use of ultra-high contrast between text foreground and background",
      "description": "Body text is presented with a contrast ratio of at least 7:1 (or 4.5:1 for large/heading text). Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "38": {
      "value": "Unusual words or abbreviations explained",
      "description": "E-publication provides explanations for unusual words, abbreviations, acronyms, idioms, jargon in an accessible form, such as glossaries, scripted pop-ups. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "39": {
      "value": "Supplementary material to an audiobook is accessible",
      "description": "All supplementary visual or textual material necessary for understanding of an audiobook, is available as pre-recorded audio, or has full alternative text that can be read via text-to- speech. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "40": {
      "value": "Link purposes clear",
      "description": "Where links, controls or buttons are included in the product, the purpose or functionality of each link, control or button is apparent from the associated text alone \u0096 or where it is unclear, separate link, control or button descriptions are provided. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": 66.0,
      "c": null
    },
    "51": {
      "value": "All non-decorative content supports reading via pre-recorded audio",
      "description": "All contents of the digital publication necessary to use and understanding, including any text, images (via alternative descriptions), video (via audio description) is fully accessible via suitable audio reproduction. The entire publication can be navigated and \u0091read\u0092 using only pre-recorded sound, and does not require visual or tactile perception. NB this implies that all <ProductContent> types listed can be accessed without sight. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "52": {
      "value": "All non-decorative content supports reading without sight",
      "description": "Sometimes termed \u0091screen reader-friendly\u0092, and fully supports multiple forms of non-visual reading. All contents of the digital publication necessary to use and understanding, including text, images (via their alternative descriptions), audio and video material (via their transcripts, descriptions, captions or subtitles) are fully accessible via suitable reading devices, for example text-to-speech screen readers or tactile reading devices (\u0091Braille displays\u0092), and nothing in the digital publication prevents or blocks the use of alternative reading modes. The entire publication can be navigated and \u0091read\u0092 using only text rendered via sound or touch, and does not require visual perception. NB this implies that all <ProductContent> types listed can be accessed without sight. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": 64.0,
      "c": null
    },
    "75": {
      "value": "EAA exception 1 \u0096 Micro-enterprises",
      "description": "Digital product falls under European Accessibility Act exception for Micro-enterprises (as defined by current regulations). The product may not have to comply with requirements of the EAA if the publisher is a micro-enterprise. <ProductFormFeatureDescription> may carry details justifying the exception claim. Use for example with code 09. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "76": {
      "value": "EAA exception 2 \u0096 Disproportionate burden",
      "description": "Digital product falls under European Accessibility Act exception for Disproportionate burden (as defined by current regulations). The product may not have to comply with requirements of the EAA if doing so would finullcially overburden the publisher. <ProductFormFeatureDescription> may carry details justifying the exception claim. Use for example with code 09. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "77": {
      "value": "EAA exception 3 \u0096 Fundamental modification",
      "description": "Digital product falls under European Accessibility Act exception for Fundamental modification (as defined by current regulations). The product may not have to comply with requirements of the EAA if doing so requires a fundamental modification of the nature of the product or service. <ProductFormFeatureDescription> may carry details justifying the exception claim. Use for example with code 09. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "80": {
      "value": "WCAG v2.0",
      "description": "Conforms with the requirements of WCAG version 2.0 \u0096 see https://www.w3.org/WAI/standards-guidelines/wcag/. <ProductFormFeatureDescription> may carry a URL linking to a compliance report or certification provided by an independent third-party certifier. In the absence of a URL, conformance with the requirements of the Specification is self-certified by the publisher. Should be used in combination with code 04. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "81": {
      "value": "WCAG v2.1",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "82": {
      "value": "WCAG v2.2",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "84": {
      "value": "WCAG level A",
      "description": "Conforms with the requirements of WCAG level A. <ProductFormFeatureDescription> may carry a URL linking to a compliance report or certification provided by an independent third-party certifier. In the absence of a URL, conformance with the requirements of the Specification is self-certified by the publisher. Should be used in combination with code 04. Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "85": {
      "value": "WCAG level AA",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "86": {
      "value": "WCAG level AAA",
      "description": "Only for use in ONIX 3.0 or later",
      "a": 62,
      "b": null,
      "c": null
    },
    "90": {
      "value": "Compliance certification by (name)",
      "description": "<ProductFormFeatureDescription> carries the name of the organization responsible for compliance testing and certification of the product. See code 93 for the URL of the organization, which should also be provided. Only for use in ONIX 3.0 or later",
      "a": 66,
      "b": null,
      "c": null
    },
    "91": {
      "value": "Latest accessibility assessment date",
      "description": "<ProductFormFeatureDescription> contains a date in the YYYYMMDD format of the latest assessment or re-assessment of the accessibility of the product. (Note that changes to or re-confirmation of individual accessibility features, standards conformance or certification may be highlighted with a timestamp attribute on the relevant repeat of <ProductFormFeature>). Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "92": {
      "value": "Accessibility addendum",
      "description": "<ProductFormFeatureDescription> contains a short addendum to the accessibility detail of the product, or the URL of a web page comprising such an addendum, providing further details of the specific conformance and features derails provided. The addendum should be considered additional to the more structured data. A complete Accessibility summary (including information that is duplicated in the structured data) should be provided using code 00. Further detailed information may be provided in an external file using codes 94\u009696. Only for use in ONIX 3.0 or later",
      "a": 64,
      "b": null,
      "c": null
    },
    "93": {
      "value": "Compliance certification by (URL)",
      "description": "<ProductFormFeatureDescription> carries the URL of a web page belonging to an organization responsible for compliance testing and certification of the product \u0096 typically a \u0091home page\u0092 or a page describing the certification scheme itself. Only for use in ONIX 3.0 or later",
      "a": 51,
      "b": 66.0,
      "c": null
    },
    "94": {
      "value": "Compliance web page for detailed accessibility information",
      "description": "<ProductFormFeatureDescription> carries the URL of a web page giving further detailed description of the accessibility features, compatibility, testing, certification etc relevant to this product. The web page should be maintained by an independent compliance scheme or testing organization. Note the web page may include information about specific national requirements or voluntary conformance reports",
      "a": 19,
      "b": 66.0,
      "c": null
    },
    "95": {
      "value": "Trusted intermediary\u0092s web page for detailed accessibility information",
      "description": "<ProductFormFeatureDescription> carries the URL of a web page giving further detailed description of the accessibility features, compatibility, testing etc relevant to this product. The web page should be provided by a trusted intermediary or third party nominated by the publisher. Note the web page can include information about specific national requirements or voluntary conformance reports",
      "a": 19,
      "b": 66.0,
      "c": null
    },
    "96": {
      "value": "Publisher\u0092s web page for detailed accessibility information",
      "description": "<ProductFormFeatureDescription> carries the URL of a web page giving further detailed description of the accessibility features, compatibility, testing etc relevant to this product. The web page should be provided by the publisher. Note the web page can include information about specific national requirements or voluntary conformance reports",
      "a": 19,
      "b": 66.0,
      "c": null
    },
    "97": {
      "value": "Compatibility tested",
      "description": "<ProductFormFeatureDescription> carries the URL of a web page giving a short description of compatibility testing carried out for this product, including detailed compatibility with various assistive technology such as third-party screen-reading software. See also code 00 for a summary of the accessibility features of the product itself",
      "a": 15,
      "b": null,
      "c": null
    },
    "98": {
      "value": "Trusted Intermediary contact",
      "description": "<ProductFormFeatureDescription> carries the e-mail address for a contact at a \u0091trusted intermediary\u0092, to whom detailed questions about accessibility for this product may be directed",
      "a": 15,
      "b": null,
      "c": null
    },
    "99": {
      "value": "Publisher contact for further accessibility information",
      "description": "<ProductFormFeatureDescription> carries the e-mail address for a contact at the publisher to whom detailed questions about accessibility of this product may be directed",
      "a": 15,
      "b": null,
      "c": null
    }
  },
  "197": {
    "01": {
      "value": "Proprietary",
      "description": "A short explanatory label for the sequence should be provided in <CollectionSequenceTypeName>",
      "a": 16,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Title order",
      "description": "Order as specified by the title, eg by volume or part number sequence, provided for confirmation",
      "a": 16,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Publication order",
      "description": "Order of publication of products within the collection",
      "a": 16,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Temporal/narrative order",
      "description": "Order defined by a continuing narrative or temporal sequence within products in the collection. Applicable to either fiction or to non-fiction (eg within a collection of history textbooks)",
      "a": 16,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Original publication order",
      "description": "Original publication order, for a republished collection or collected works originally published outside a collection",
      "a": 16,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Suggested reading order",
      "description": "Where it is different from the title order, publication order, narrative order etc",
      "a": 38,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Suggested display order",
      "description": "Where it is different from the title order, publication order, narrative order, reading order etc",
      "a": 41,
      "b": null,
      "c": null
    }
  },
  "198": {
    "00": {
      "value": "Metadata contact",
      "description": "For queries and feedback concerning the metadata record itself",
      "a": 42,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Accessibility request contact",
      "description": "Eg for requests for supply of mutable digital files for conversion to other formats",
      "a": 16,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Promotional contact",
      "description": "Eg for requests relating to interviews, author events",
      "a": 16,
      "b": 27.0,
      "c": null
    },
    "03": {
      "value": "Advertising contact",
      "description": "Eg for co-op advertising",
      "a": 27,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Review copy contact",
      "description": "Eg for requests for review copies",
      "a": 27,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Evaluation copy contact",
      "description": "Eg for requests for approval or evaluation copies (particularly within education)",
      "a": 27,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Permissions contact",
      "description": "Eg for requests to reproduce or repurpose parts of the publication",
      "a": 27,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Return authorisation contact",
      "description": "Eg for use where authorisation must be gained from the publisher rather than the distributor or wholesaler",
      "a": 38,
      "b": null,
      "c": null
    },
    "08": {
      "value": "CIP / Legal deposit contact",
      "description": "Eg for legal deposit or long-term preservation",
      "a": 42,
      "b": 62.0,
      "c": null
    },
    "09": {
      "value": "Rights and licensing contact",
      "description": "Eg for subrights licensing, collective licensing",
      "a": 62,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Product safety contact",
      "description": "Eg for EU General product safety regulation (GPSR) compliance. See https://commission.europa.eu/business-economy-euro/product-safety-and-requirements/product-safety/general-product-safety-regulation_en",
      "a": 66,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Product raw materials contact",
      "description": "Eg for EU Deforestation regulation (EUDR) compliance. See https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1115&qid=1687867231461",
      "a": 67,
      "b": null,
      "c": null
    }
  },
  "203": {
    "00": {
      "value": "Unrated",
      "description": null,
      "a": 18,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Any adult audience",
      "description": "The publisher states that the product is suitable for any adult audience",
      "a": 18,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Content warning",
      "description": "The publisher warns the content may offend parts of the adult audience (for any reason).",
      "a": 18,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Content warning (sex)",
      "description": "The publisher warns the product includes content of an explicit sexual nature",
      "a": 18,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Content warning (violence)",
      "description": "The publisher warns the product includes content of an extreme violent nature",
      "a": 18,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Content warning (drugs)",
      "description": "The publisher warns the product includes content involving severe misuse of drugs or alcohol",
      "a": 18,
      "b": 67.0,
      "c": null
    },
    "06": {
      "value": "Content warning (language)",
      "description": "The publisher warns the product includes extreme / offensive / explicit language",
      "a": 18,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Content warning (intolerance)",
      "description": "The publisher warns the product includes content involving severe intolerance or abuse of particular groups (eg religious, ethnic, racial, gendered and other social groups)",
      "a": 19,
      "b": 54.0,
      "c": null
    },
    "08": {
      "value": "Content warning (abuse)",
      "description": "The publisher warns the product includes content involving sexual or extreme domestic abuse (including both mental and physical abuse)",
      "a": 54,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Content warning (self-harm)",
      "description": "The publisher warns the product includes content involving severe self-harm (including serious eating disorders)",
      "a": 54,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Content warning (animal cruelty)",
      "description": "The publisher warns the product includes content involving extreme cruelty to animals",
      "a": 60,
      "b": 62.0,
      "c": null
    },
    "11": {
      "value": "Content warning (illness)",
      "description": "The publisher warns the product includes content involving serious chronic or acute illness (mental or physical)",
      "a": 67,
      "b": null,
      "c": null
    }
  },
  "204": {
    "00": {
      "value": "Unspecified",
      "description": "Unspecified, contact supplier for details",
      "a": 19,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Consignment",
      "description": "The retailer pays for goods only after they are sold by the retailer to an end consumer, and may return excess unsold inventory to the supplier at any time. The goods remain the property of the supplier until they are paid for, even while they are physically located at the retailer",
      "a": 19,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Firm sale",
      "description": "The retailer is invoiced for the goods immediately (or upon dispatch) and pays within the specified credit period, as in the sale or return model, but any excess unsold inventory cannot be returned to the supplier",
      "a": 19,
      "b": 47.0,
      "c": null
    },
    "03": {
      "value": "Sale or return",
      "description": "Contact supplier for applicable returns authorization process. The retailer is invoiced for the goods immediately (or upon dispatch) and pays within the specified credit period, but can return excess unsold inventory to the supplier for full credit at a later date. Some kind of returns authorisation process is normally required. Returns must be in saleable conditon, except when return of stripped covers or proof of destruction may be allowed instead. For more detail, use codes 05, 06 or 07",
      "a": 19,
      "b": 47.0,
      "c": null
    },
    "04": {
      "value": "Direct fulfillment",
      "description": "The retailer pays for goods only after they are sold by the retailer to an end consumer, but all inventory remains physically located at the supplier (thus there can be no retailer returns of unsold inventory). When ordered by the retailer, the goods are delivered direct to the end consumer",
      "a": 27,
      "b": 47.0,
      "c": null
    },
    "05": {
      "value": "Sale or return of saleable copies",
      "description": "Contact supplier for applicable returns authorization process. As for code 03, but only returns of saleable copies will be accepted. Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Sale or return of stripped covers",
      "description": "Contact supplier for applicable cover returns authorization process. As for code 03, but only returns of stripped covers will be accepted. An additional barcode will likely be required on cover 2 (inside front cover) to facilitate scanning of returned covers. Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": 63.0,
      "c": null
    },
    "07": {
      "value": "Sale or certified destruction",
      "description": "Contact supplier for applicable destruction certification process. As for code 03, but only certified destruction will be accepted. Only for use in ONIX 3.0 or later",
      "a": 47,
      "b": null,
      "c": null
    }
  },
  "215": {
    "01": {
      "value": "Less than",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Not more than",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Exactly",
      "description": "The supplier\u0092s true figure, or at least a best estimate expected to be within 10% of the true figure (ie a quoted figure of 100 could in fact be anything between 91 and 111)",
      "a": 24,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Approximately",
      "description": "Generally interpreted as within 25% of the true figure (ie a quoted figure of 100 could in fact be anything between 80 and 133). The supplier may introduce a deliberate approximation to reduce the commercial sensitivity of the figure",
      "a": 24,
      "b": null,
      "c": null
    },
    "05": {
      "value": "About",
      "description": "Generally interpreted as within a factor of two of the true figure (ie a quoted figure of 100 could in fact be anything between 50 and 200). The supplier may introduce a deliberate approximation to reduce the commercial sensitivity of the figure",
      "a": 24,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Not less than",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "07": {
      "value": "More than",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    }
  },
  "216": {
    "01": {
      "value": "Mean daily sale",
      "description": "Typically measured over most recent 1 month period",
      "a": 24,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Maximum daily sale",
      "description": "Typically measured over most recent 1 month period",
      "a": 24,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Minimum daily sale",
      "description": "Typically measured over most recent 1 month period",
      "a": 24,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Mean weekly sale",
      "description": "Typically measured over most recent rolling 12 week period",
      "a": 24,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Maximum weekly sale",
      "description": "Typically measured over most recent rolling 12 week period",
      "a": 24,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Minimum weekly sale",
      "description": "Typically measured over most recent rolling 12 week period",
      "a": 24,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Mean monthly sale",
      "description": "Typically measured over most recent rolling 6 month period",
      "a": 24,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Maximum monthly sale",
      "description": "Typically measured over the most recent rolling 6 month period",
      "a": 24,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Minimum monthly sale",
      "description": "Typically measured over the most recent rolling 6 month period",
      "a": 24,
      "b": null,
      "c": null
    }
  },
  "217": {
    "01": {
      "value": "Proprietary",
      "description": "Note that <IDTypeName> is required for proprietary identifiers",
      "a": 24,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Proprietary price point identifier",
      "description": "Proprietary identifier uniquely identifies price amount and currency. Two unrelated products with the same price amount carry the same identifier, though their price types may be different",
      "a": 33,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Proprietary price type identifier",
      "description": "Proprietary identifier uniquely identifies price type, qualifier and any constraints and conditions. Two unrelated products with the same price type carry the same identifier, though their price points may be different",
      "a": 33,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Proprietary price point and type identifier",
      "description": "Proprietary identifier identifies a unique combination of price point and type, though two unrelated products may carry the same identifier if all details of their prices are identical",
      "a": 33,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Proprietary unique price identifier",
      "description": "Proprietary identifier is unique to a single price point, price type and product. No two products can carry the same identifier, even if all details of their prices are identical",
      "a": 33,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Proprietary product price point identifier",
      "description": "Proprietary identifier uniquely identifies a specific combination of product, price amount and currency, independent of the price type",
      "a": 34,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Proprietary product price type identifier",
      "description": "Proprietary identifier uniquely identifies a specific combination of product, price type, qualifier and any constraints and conditions, independent of the price amount and currency. A product with the same product price type identififer may carry differing price amounts, currencies at different points in time",
      "a": 34,
      "b": null,
      "c": null
    }
  },
  "218": {
    "01": {
      "value": "Human readable",
      "description": "Document (eg Word file, PDF or web page) Intended for the lay reader",
      "a": 24,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Professional readable",
      "description": "Document (eg Word file, PDF or web page) Intended for the legal specialist reader",
      "a": 24,
      "b": null,
      "c": null
    },
    "10": {
      "value": "ONIX-PL",
      "description": null,
      "a": 24,
      "b": null,
      "c": null
    },
    "20": {
      "value": "ODRL",
      "description": "Open Digital Rights Language (ODRL) in JSON-LD format. Used for example to express TDM licenses using the W3C TDM Reservation Protocol",
      "a": 65,
      "b": null,
      "c": null
    }
  },
  "219": {
    "C": {
      "value": "Copyright",
      "description": "Text or image copyright (normally indicated by the \u00a9 symbol). The default if no <CopyrightType> is specified",
      "a": 24,
      "b": null,
      "c": null
    },
    "P": {
      "value": "Phonogram right",
      "description": "Phonogram copyright or neighbouring right (normally indicated by the (P) symbol)",
      "a": 24,
      "b": null,
      "c": null
    },
    "D": {
      "value": "Database right",
      "description": "Sui generis database right",
      "a": 24,
      "b": null,
      "c": null
    }
  },
  "220": {
    "101A": {
      "value": "EPUB 2.0.1",
      "description": "Use only with <ProductFormDetail> codes E101 or E102",
      "a": 24,
      "b": null,
      "c": null
    },
    "101B": {
      "value": "EPUB 3.0",
      "description": "Use only with <ProductFormDetail> code E101",
      "a": 24,
      "b": null,
      "c": null
    },
    "101C": {
      "value": "EPUB 3.0.1",
      "description": "Use only with <ProductFormDetail> code E101",
      "a": 25,
      "b": null,
      "c": null
    },
    "101D": {
      "value": "EPUB 3.1",
      "description": "Use only with <ProductFormDetail> code E101",
      "a": 33,
      "b": null,
      "c": null
    },
    "101E": {
      "value": "EPUB 3.2",
      "description": "Use only with <ProductFormDetail> code E101",
      "a": 46,
      "b": null,
      "c": null
    },
    "101F": {
      "value": "EPUB 3.3",
      "description": "Use only with <ProductFormDetail> code E101",
      "a": 59,
      "b": null,
      "c": null
    },
    "107C": {
      "value": "PDF 1.3",
      "description": "Use only with <ProductFormDetail> E107 or E108",
      "a": 66,
      "b": null,
      "c": null
    },
    "107D": {
      "value": "PDF 1.4",
      "description": "Use only with <ProductFormDetail> E107 or E108",
      "a": 66,
      "b": null,
      "c": null
    },
    "107G": {
      "value": "PDF 1.7",
      "description": "Use only with <ProductFormDetail> E107 or E108",
      "a": 66,
      "b": null,
      "c": null
    },
    "107J": {
      "value": "PDF 2.0",
      "description": "Use only with <ProductFormDetail> E107 or E108",
      "a": 66,
      "b": null,
      "c": null
    },
    "116A": {
      "value": "Kindle mobi 7",
      "description": "Use only with <ProductFormDetail> codes E116 or E127",
      "a": 24,
      "b": null,
      "c": null
    },
    "116B": {
      "value": "Kindle KF8",
      "description": "Use only with <ProductFormDetail> code E116",
      "a": 24,
      "b": null,
      "c": null
    },
    "116C": {
      "value": "Kindle KFX",
      "description": "Use only with <ProductFormDetail> code E116",
      "a": 40,
      "b": null,
      "c": null
    }
  },
  "221": {
    "00": {
      "value": "Message received",
      "description": "Message received but not yet parsed (Acknowledgement must contain neither <MessageStatusDetail> nor <RecordStatusSummary>, and should include <NoProduct/>). There is no particular implication that the acknowledgement message is valid \u0096 the status is based solely on receipt of a file and minimal parsing of the original ONIX message header to ascertain <MessageNumber> etc. The Acknowledgement message MAY give a date when parsing is planned",
      "a": 28,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Message rejected",
      "description": "Entire original ONIX message rejected (ie NONE of the data records have been ingested). The status of any recognisable records MAY be summarised in the remainder of the Acknowledgement Message",
      "a": 28,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Message part-processed",
      "description": "Original ONIX message partially parsed (ie at least SOME of the data records have been ingested, in whole or in part). Records processed to date MUST be summarised in the remainder of the Acknowledgement Message",
      "a": 28,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Message processed",
      "description": "Original ONIX message parsed and processed in full, and at least SOME of the data records have been ingested, in whole or in part), Results MUST be summarised in the remainder of the Acknowledgement Message",
      "a": 28,
      "b": null,
      "c": null
    }
  },
  "222": {
    "01": {
      "value": "Ingest date",
      "description": "Expected or actual date of processing and ingestion of data to recipient\u0092s system",
      "a": 28,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Export date",
      "description": "Expected or actual date for data to be available from the recipient\u0092s system to downstream supply chain partners (or where the recipient is a retailer, to consumers)",
      "a": 28,
      "b": null,
      "c": null
    }
  },
  "223": {
    "01": {
      "value": "Proprietary",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "02": {
      "value": "ONIX Status detail code",
      "description": "Status detail code is taken from List 225",
      "a": 28,
      "b": null,
      "c": null
    }
  },
  "224": {
    "U": {
      "value": "Unclassifiable",
      "description": "Use ONLY if the message severity cannot be determined (eg with a legacy system unable to provide detailed error codes)",
      "a": 28,
      "b": null,
      "c": null
    },
    "I": {
      "value": "Info",
      "description": "For information only, provided to encourage the ONIX data supplier to improve the quality of their data (eg provision of a non-mandatory data element that is currently missing, better conformity with best practice, etc)",
      "a": 28,
      "b": null,
      "c": null
    },
    "Q": {
      "value": "Query",
      "description": "Request for clarification or further detail of the meaning of the data provided",
      "a": 28,
      "b": null,
      "c": null
    },
    "W": {
      "value": "Warning",
      "description": "The ONIX data has been accepted as provided, but there may be issues in the way it is supplied",
      "a": 28,
      "b": null,
      "c": null
    },
    "E": {
      "value": "Error",
      "description": "Some data in an ONIX data element or message structure caused an error due to not meeting the requirements of the standard. The data in question has been rejected, but processing of the remaining elements in the record (or the remain records in the message, if used within <MessageStatusDetail>) has continued",
      "a": 28,
      "b": null,
      "c": null
    },
    "F": {
      "value": "Fatal error",
      "description": "Some data in an ONIX data element or message structure caused an unrecoverable error due to not meeting the requirements of the standard. The entire ONIX record has been rejected (or the entire message, if used within <MessageStatusDetail>)",
      "a": 28,
      "b": null,
      "c": null
    }
  },
  "225": {
    "000": {
      "value": "Unknown error",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    },
    "001": {
      "value": "Unknown warning",
      "description": null,
      "a": 28,
      "b": null,
      "c": null
    }
  },
  "226": {
    "00": {
      "value": "No record errors",
      "description": "Entire record parsed and ingested without errors, record may have a Product record in the Acknowledgement which itself may have a <RecordStatusNote> or <RecordStatusDetail> to convey information, editorial queries or warnings",
      "a": 28,
      "b": null,
      "c": null
    },
    "01": {
      "value": "No record errors \u0096 errors in collateral",
      "description": "Entire record parsed and ingested without errors, record MUST have a Product record in the Acknowledgement with a <RecordStatusNote> or at least one <RecordStatusDetail> to convey errors in associated media files (and possibly supplementary editorial queries)",
      "a": 28,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Record with errors",
      "description": "Record parsed and ingested with errors, record MUST have a Product record in the Acknowledgement with a <RecordStatusNote> or at least one <RecordStatusDetail> to convey errors (and possibly supplementary information, editorial queries or warnings). At least SOME of the data in the original Product record has been ingested. There may also be errors in associated media files",
      "a": 28,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Record rejected",
      "description": "Entire record rejected, record MUST have a Product record in the Acknowedgemet, with a <RecordStatusNote> or at least one <RecordStatusDetail> to convey errors (and possibly supplementary information, editorial queries or warnings). NONE of the data in the original Product record has been ingested",
      "a": 28,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Reported previously",
      "description": "Record status reported in an earlier Acknowledgement message, based on partial processing of ONIX message. The record MUST NOT have a Product record in this Acknowledgement. Code not valid in <RecordStatusDetail>",
      "a": 28,
      "b": null,
      "c": null
    }
  },
  "227": {
    "P": {
      "value": "Preschool",
      "description": "Typical age less than 3",
      "a": 30,
      "b": null,
      "c": null
    },
    "K": {
      "value": "Kindergarten",
      "description": "Typical age 3\u00965",
      "a": 30,
      "b": null,
      "c": null
    },
    "1": {
      "value": "Primary school First grade",
      "description": "Typical age 6",
      "a": 30,
      "b": null,
      "c": null
    },
    "2": {
      "value": "Primary school Second grade",
      "description": "Typical age 7",
      "a": 30,
      "b": null,
      "c": null
    },
    "3": {
      "value": "Primary school Third grade",
      "description": "Typical age 8",
      "a": 30,
      "b": null,
      "c": null
    },
    "4": {
      "value": "Primary school Fourth grade",
      "description": "Typical age 9",
      "a": 30,
      "b": null,
      "c": null
    },
    "5": {
      "value": "Primary school Fifth grade",
      "description": "Typical age 10",
      "a": 30,
      "b": null,
      "c": null
    },
    "6": {
      "value": "Primary school Sixth grade",
      "description": "Typical age 11",
      "a": 30,
      "b": null,
      "c": null
    },
    "7": {
      "value": "Junior secondary school Seventh grade",
      "description": "Typical age 12",
      "a": 30,
      "b": null,
      "c": null
    },
    "8": {
      "value": "Junior secondary school Eighth grade",
      "description": "Typical age 13",
      "a": 30,
      "b": null,
      "c": null
    },
    "9": {
      "value": "Junior secondary school Ninth grade",
      "description": "Typical age 14",
      "a": 30,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Senior secondary school Tenth grade",
      "description": "Typical age 15",
      "a": 30,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Senior secondary school Eleventh grade",
      "description": "Typical age 16",
      "a": 30,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Senior secondary school Twelfth grade",
      "description": "Typical age 17",
      "a": 30,
      "b": null,
      "c": null
    },
    "13": {
      "value": "University first year",
      "description": "Typical age 18",
      "a": 30,
      "b": null,
      "c": null
    },
    "14": {
      "value": "University second year",
      "description": "Typical age 19",
      "a": 30,
      "b": null,
      "c": null
    },
    "15": {
      "value": "University third year",
      "description": "Typical age 20",
      "a": 30,
      "b": null,
      "c": null
    },
    "16": {
      "value": "University fourth year",
      "description": "Typical age 21",
      "a": 30,
      "b": null,
      "c": null
    },
    "17": {
      "value": "Graduate level",
      "description": "Typical age 22+",
      "a": 30,
      "b": null,
      "c": null
    }
  },
  "228": {
    "01": {
      "value": "Proprietary",
      "description": "Note that <IDTypeName> is required with proprietary identifiers",
      "a": 33,
      "b": null,
      "c": null
    },
    "06": {
      "value": "DOI",
      "description": "Digital Object Identifier (variable length and character set, beginning \u009110.\u0092 and without https://doi.org/ or the older http://dx.doi.org/)",
      "a": 65,
      "b": null,
      "c": null
    }
  },
  "229": {
    "u": {
      "value": "Unknown or unspecified",
      "description": "Provides positive indication that the gender is not known or is not specified by the sender for any reason",
      "a": 33,
      "b": null,
      "c": null
    },
    "f": {
      "value": "Female",
      "description": null,
      "a": 33,
      "b": null,
      "c": null
    },
    "m": {
      "value": "Male",
      "description": null,
      "a": 33,
      "b": null,
      "c": null
    }
  },
  "230": {
    "00": {
      "value": "No price-specific constraints",
      "description": "Allows positive indication that there are no additional constraints (other than those specified in <EpubUsageConstraint>). By convention, use 01 in <PriceConstraintStatus>",
      "a": 34,
      "b": 57.0,
      "c": null
    },
    "01": {
      "value": "Preview",
      "description": "Preview before purchase. Allows a retail customer, account holder or patron to view or listen to a proportion of the book before purchase. Also applies to borrowers making use of \u0091acquisition on demand\u0092 models in libraries, and to \u0091subscription\u0092 models where the purchase is made on behalf of the reader. Generally used to specify different preview percentages across different customer types",
      "a": 55,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Lend",
      "description": "Lendable by the purchaser to other device owner, account holder or patron, eg library lending (use where the library product is not identified with a separate <ProductIdentifier> from the consumer product). The \u0091primary\u0092 copy becomes unusable while the secondary copy is on loan, unless a number of concurrent borrowers is also specified",
      "a": 33,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Time-limited license",
      "description": "E-publication license is time-limited. Use with code 02 from List 146 and either a time period in days, weeks or months in <PriceConstraintLimit>, or a Valid until date in <PriceConstraintLimit>. The purchased copy becomes unusable when the license expires. For clarity, a perpetual license is the default, but may be specified explicitly with code 01 from list 146, or with code 02 and a limit <Quantity> of 0 days",
      "a": 33,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Loan renewal",
      "description": "Maximum number of consecutive loans or loan extensions (eg from a library) to a single device owner, account holder or patron. Note that a limit of 1 indicates that a loan cannot be renewed or extended",
      "a": 33,
      "b": 37.0,
      "c": null
    },
    "09": {
      "value": "Multi-user license",
      "description": "E-publication license is multi-user. Maximum number of concurrent users licensed to use the product should be given in <PriceConstraintLimit>. For clarity, unlimited concurrencyis the default, but may be specified explicitly with code 01 from list 146, or with code 02 and a limit <Quantity> of 0 users",
      "a": 36,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Preview on premises",
      "description": "Preview locally before purchase. Allows a retail customer, account holder or patron to view a proportion of the book (or the whole book, if no proportion is specified) before purchase, but ONLY while located physically in the retailer\u0092s store (eg while logged on to the store wifi). Also applies to borrowers making use of \u0091acquisition on demand\u0092 models in libraries",
      "a": 44,
      "b": null,
      "c": null
    }
  },
  "238": {
    "K": {
      "value": "Educa\u00e7\u00e3o Infantil",
      "description": "Preschool and kindergarten",
      "a": 39,
      "b": null,
      "c": null
    },
    "1": {
      "value": "Fundamental I 1\u00ba ano",
      "description": "Elementary school",
      "a": 39,
      "b": null,
      "c": null
    },
    "2": {
      "value": "Fundamental I 2\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "3": {
      "value": "Fundamental I 3\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "4": {
      "value": "Fundamental I 4\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "5": {
      "value": "Fundamental I 5\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "6": {
      "value": "Fundamental II 6\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "7": {
      "value": "Fundamental II 7\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "8": {
      "value": "Fundamental II 8\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "9": {
      "value": "Fundamental II 9\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Ensino M\u00e9dio 1\u00ba ano",
      "description": "High school",
      "a": 39,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Ensino M\u00e9dio 2\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "12": {
      "value": "Ensino M\u00e9dio 3\u00ba ano",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "13": {
      "value": "Ensino T\u00e9cnico Integrado",
      "description": "Technical study at High school, alongside 2nd and 3rd year",
      "a": 39,
      "b": null,
      "c": null
    },
    "14": {
      "value": "Ensino T\u00e9cnico Concomitante",
      "description": "Technical study at separate institution in parallel with 2nd and 3rd year High school study",
      "a": 39,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Ensino T\u00e9cnico Subsequente",
      "description": "Technical study after completion of High school",
      "a": 39,
      "b": null,
      "c": null
    },
    "P": {
      "value": "Ensino pr\u00e9-vestibular",
      "description": "University entrance",
      "a": 39,
      "b": null,
      "c": null
    },
    "A": {
      "value": "Ensino Superior Gradua\u00e7\u00e3o Licenciatura/ Bacharelado",
      "description": "Undergraduate degree level",
      "a": 39,
      "b": null,
      "c": null
    },
    "B": {
      "value": "Ensino Superior Gradua\u00e7\u00e3o Tecnologia",
      "description": null,
      "a": 39,
      "b": null,
      "c": null
    },
    "D": {
      "value": "Ensino Superior P\u00f3s-gradua\u00e7\u00e3o Stricto sensu",
      "description": "Masters and Doctoral degree level",
      "a": 39,
      "b": null,
      "c": null
    },
    "F": {
      "value": "Ensino Superior P\u00f3s-gradua\u00e7\u00e3o Lato sensu",
      "description": "Professional qualifications",
      "a": 39,
      "b": null,
      "c": null
    }
  },
  "239": {
    "07": {
      "value": "Return authorisation contact",
      "description": "Eg for use where authorisation must be gained from the supplier (distributor or wholesaler)",
      "a": 39,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Product safety contact",
      "description": "Eg for EU General product safety regulation (GPSR) compliance where the supplier acts on behalf of the publisher or publisher representative as an importer into the EU. See https://commission.europa.eu/business-economy-euro/product-safety-and-requirements/product-safety/general-product-safety-regulation_en",
      "a": 66,
      "b": null,
      "c": null
    },
    "11": {
      "value": "Product raw materials contact",
      "description": "Eg for EU Deforestation regulation (EUDR) compliance where the supplier acts on behalf of the publisher or publisher representtive as an importer into the EU. See https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1115&qid=1687867231461",
      "a": 67,
      "b": null,
      "c": null
    },
    "99": {
      "value": "Customer services contact",
      "description": "For general enquiries",
      "a": 39,
      "b": null,
      "c": null
    }
  },
  "240": {
    "01": {
      "value": "Audiovisual work",
      "description": "A complete audiovisual work which is published as a content item in a product which carries two or more such works, eg when two or three AV works are published in a single omnibus package",
      "a": 43,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Front matter",
      "description": "Audiovisual components such as a scene index or introduction which appear before the main content of the product",
      "a": 43,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Body matter",
      "description": "Audiovisual components such as scenes or \u0091chapters\u0092 which appear as part of the main body of the AV material in the product",
      "a": 43,
      "b": null,
      "c": null
    },
    "04": {
      "value": "End matter",
      "description": "Audiovisual components such as advertising which appear after the main content of the product",
      "a": 43,
      "b": null,
      "c": null
    }
  },
  "241": {
    "01": {
      "value": "Proprietary",
      "description": "For example, a publisher\u0092s own identifier. Note that <IDTypeName> is required with proprietary identifiers",
      "a": 43,
      "b": null,
      "c": null
    },
    "03": {
      "value": "GTIN-13",
      "description": "Formerly known as the EAN-13 (unhyphenated)",
      "a": 43,
      "b": null,
      "c": null
    },
    "06": {
      "value": "DOI",
      "description": "Digital Object Identifier (variable length and character set, beginning \u009110.\u0092 and without https://doi.org/ or the older http://dx.doi.org/)",
      "a": 43,
      "b": null,
      "c": null
    },
    "12": {
      "value": "IMDB",
      "description": "Motion picture work identifier from the International Movie Database",
      "a": 43,
      "b": null,
      "c": null
    },
    "18": {
      "value": "ISRC",
      "description": "International Standard Recording Code, 5 alphanumeric characters plus 7 digits",
      "a": 43,
      "b": null,
      "c": null
    },
    "19": {
      "value": "ISAN",
      "description": "International Standard Audiovisual Number (17 or 26 characters \u0096 16 or 24 hexadecimal digits, plus one or two alphanumeric check characters, and without spaces or hyphens)",
      "a": 43,
      "b": 46.0,
      "c": null
    },
    "31": {
      "value": "EIDR DOI",
      "description": "Entertainment Identifier Registry DOI",
      "a": 43,
      "b": null,
      "c": null
    }
  },
  "242": {
    "00": {
      "value": "Batteries not required",
      "description": "The default if battery type and safety information is omitted",
      "a": 45,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Batteries built in",
      "description": "Batteries built in or pre-installed in product, non-user replaceable. May use <ProductFormFeatureDesciption> to provide further details",
      "a": 45,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Batteries pre-installed",
      "description": "Batteries pre-installed, user replaceable. Use <ProductFormFeatureDescription> to provide further details, eg \u00912 x 1.2V LR6/AA rechargeable\u0092, with these details formatted as [integer] x [number]V [type or descriptive text] and usually taken from the outer packaging",
      "a": 45,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Batteries supplied",
      "description": "Batteries included with the product, but not pre-installed. Use <ProductFormFeatureDescription> to provide further details, eg \u00912 x 1.2V LR6/AA rechargeable\u0092, with these details formatted as [integer] x [number]V [type or descriptive text] and usually taken from the outer packaging",
      "a": 45,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Batteries required",
      "description": "Batteries required for use, but not supplied with the product. May use <ProductFormFeatureDescription> to provide further details, eg \u00912 x 1.2V LR6/AA rechargeable\u0092, with these details formatted as [integer] x [number]V [type or descriptive text] and usually taken from the outer packaging",
      "a": 45,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Batteries supplied spare",
      "description": "Spare batteries included with product, in addition to those specified using codes 02 or 03. May use <ProductFormFeatureDescription> to provide further details",
      "a": 45,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Safety data sheet available",
      "description": "(Material) Safety Data Sheet available for the product (including its batteries). <ProductFormFeatureDescription> must be used to supply URL of documentation",
      "a": 45,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Technical data sheet available",
      "description": "Battery manufacturer\u0092s technical data sheet available. <ProductFormFeatureDescription> must be used to supply URL of documentation",
      "a": 45,
      "b": null,
      "c": null
    },
    "08": {
      "value": "Rechargeable",
      "description": "Independent of whether charger is supplied as part of the product. Note that this is largely dependent on battery chemistry, but should be specified separately to avoid ambiguity",
      "a": 45,
      "b": null,
      "c": null
    },
    "09": {
      "value": "Non-rechargeable",
      "description": null,
      "a": 45,
      "b": null,
      "c": null
    },
    "10": {
      "value": "Battery warning text",
      "description": "<ProductFormFeatureDescription> contains battery safety-related warning text, generally taken from the outer packaging (eg \u0091Warning \u0096 internal battery: product must not be pierced\u0092)",
      "a": 45,
      "b": null,
      "c": null
    },
    "20": {
      "value": "Battery chemistry",
      "description": "<ProductFormFeatureDescription> must provide details of the battery chemistry (eg \u0091Sodium-Sulfur\u0092). Use ONLY where no suitable code exists for the specific chemistry used",
      "a": 45,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Lithium-ion",
      "description": "For all specific battery chemistries, <ProductFormFeatureDescription> may optionally describe the battery construction \u0096 for example the nunber of individual cells per battery and any other physical details, eg \u00914 x pouch cells\u0092",
      "a": 45,
      "b": null,
      "c": null
    },
    "22": {
      "value": "Lithium-polymer",
      "description": null,
      "a": 45,
      "b": null,
      "c": null
    },
    "23": {
      "value": "Lithium-metal",
      "description": null,
      "a": 45,
      "b": null,
      "c": null
    },
    "24": {
      "value": "Nickel-metal hydride",
      "description": null,
      "a": 45,
      "b": null,
      "c": null
    },
    "25": {
      "value": "Nickel-Cadmium",
      "description": null,
      "a": 45,
      "b": null,
      "c": null
    },
    "26": {
      "value": "Zinc-Manganese dioxide",
      "description": "\u0091Alkaline battery\u0092",
      "a": 45,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Zinc-Carbon",
      "description": "Common \u0091dry cell\u0092 battery",
      "a": 45,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Zinc-air",
      "description": null,
      "a": 45,
      "b": null,
      "c": null
    },
    "29": {
      "value": "Silver oxide",
      "description": null,
      "a": 45,
      "b": null,
      "c": null
    },
    "99": {
      "value": "Battery description",
      "description": "<ProductFormFeatureDescription> may contain a full description of the batteries supplied (chemistry, cell structure, battery size and weight, number, capacity etc). Use ONLY if the product (or a product part) contains multiple different TYPES of battery that cannot be described with existing codes (eg a mix of battery chemistries or batteries of different sizes, within a single product part)",
      "a": 45,
      "b": null,
      "c": null
    }
  },
  "243": {
    "00": {
      "value": "Inapplicable",
      "description": "The product is not classed as dangerous goods. The default if information is omitted",
      "a": 45,
      "b": null,
      "c": null
    },
    "01": {
      "value": "GHS",
      "description": "Indicates if the product is generally classed as a hazardous substance. <ProductFormFeatureDescription> must contain a Hazard Class [eg \u0093Irritant (Category 2)\u0094] using the Globally Harmonized System of Classification and Labelling of Chemicals (http://www.unece.org/fileadmin/DAM/trans/danger/publi/ghs/ghs_rev08/ST-SG-AC10-30-Rev8e.pdf \u0096 Annex 1 contains a list of hazard classes and categories). The text is usually available on the Safety Data Sheet, along with equivalent GHS Hazard Pictograms, and may also be on the product or packaging. Must be accompanied by a Safety Data Sheet URL (see code 06), and is usually accompanied by one or more of codes 02\u009605 listing the specific chemlcal hazard",
      "a": 45,
      "b": 48.0,
      "c": null
    },
    "02": {
      "value": "Transport",
      "description": "Indicates the product is classed as a hazardous substance for transportation purposes. <ProductFormFeatureDescription> must contain a \u0091UN number\u0092 (or UNID, \u0091UN\u0092 plus four digits from the list of at http://www.unece.org/fileadmin/DAM/trans/danger/publi/unrec/English/index.pdf) specifying the specific chemical hazard, eg UN1203 is gasoline",
      "a": 45,
      "b": 48.0,
      "c": null
    },
    "03": {
      "value": "Storage",
      "description": "Indicates the product is classed as a hazardous substance for storage purposes. <ProductFormFeatureDescription> must contain a \u0091UN number\u0092 (or UNID, \u0091UN\u0092 plus four digits from the list of at http://www.unece.org/fileadmin/DAM/trans/danger/publi/unrec/English/index.pdf) specifying the specific chemical hazard, eg UN1203 is gasoline",
      "a": 45,
      "b": 48.0,
      "c": null
    },
    "04": {
      "value": "Waste",
      "description": "Indicates the product is classed as a hazardous substance for disposal purposes. <ProductFormFeatureDescription> must contain a \u0091UN number\u0092 (or UNID, \u0091UN\u0092 plus four digits from the list of at http://www.unece.org/fileadmin/DAM/trans/danger/publi/unrec/English/index.pdf) specifying the specific chemical hazard, eg UN1203 is gasoline",
      "a": 45,
      "b": 48.0,
      "c": null
    },
    "05": {
      "value": "Other",
      "description": "Indicates the product is classed as a hazardous substance for purposes not covered by other codes. <ProductFormFeatureDescription> must contain a \u0091UN number\u0092 (or UNID, \u0091UN\u0092 plus four digits from the list of at http://www.unece.org/fileadmin/DAM/trans/danger/publi/unrec/English/index.pdf) specifying the specific chemical hazard, eg UN1203 is gasoline. Must be accompanied by a Safety Data Sheet URL (see code 06)",
      "a": 46,
      "b": 48.0,
      "c": null
    },
    "06": {
      "value": "Safety data sheet available",
      "description": "(Material) Safety Data Sheet available for the product. <ProductFormFeatureDescription> must contain the URL of documentation",
      "a": 46,
      "b": null,
      "c": null
    }
  },
  "244": {
    "01": {
      "value": "Proprietary",
      "description": null,
      "a": 47,
      "b": null,
      "c": null
    }
  },
  "245": {
    "00": {
      "value": "Unspecified \u0096 see description",
      "description": null,
      "a": 47,
      "b": null,
      "c": null
    },
    "01": {
      "value": "Book signing",
      "description": null,
      "a": 47,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Book reading",
      "description": null,
      "a": 47,
      "b": null,
      "c": null
    }
  },
  "246": {
    "A": {
      "value": "Announced",
      "description": null,
      "a": 47,
      "b": null,
      "c": null
    },
    "C": {
      "value": "Cancelled",
      "description": "Abandoned after having previously been announced",
      "a": 47,
      "b": null,
      "c": null
    }
  },
  "247": {
    "01": {
      "value": "Date of occurrence",
      "description": "Date and (with the default dateformat) time the event occurrence begins",
      "a": 47,
      "b": 51.0,
      "c": null
    },
    "02": {
      "value": "Date of occurrence end",
      "description": "Date and (with the default dateformat) time the event occurrence ends",
      "a": 47,
      "b": 51.0,
      "c": null
    }
  },
  "248": {
    "A411": {
      "value": "22.05kHz",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A412": {
      "value": "44.1kHz",
      "description": "44,100 samples per channel per second (CD quality)",
      "a": 53,
      "b": null,
      "c": null
    },
    "A413": {
      "value": "48kHz",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A416": {
      "value": "16-bits per sample",
      "description": "Bit depth, 16 bits per sample (CD-quality)",
      "a": 53,
      "b": null,
      "c": null
    },
    "A418": {
      "value": "24-bits per sample",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A424": {
      "value": "ID3v1",
      "description": "Includes v1.1",
      "a": 53,
      "b": null,
      "c": null
    },
    "A425": {
      "value": "ID3v2",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "B001": {
      "value": "Printed long grain",
      "description": "Grain of paper parallel to spine",
      "a": 53,
      "b": null,
      "c": null
    },
    "B002": {
      "value": "Printed short grain",
      "description": "Grain of paper perpendicular to spine",
      "a": 53,
      "b": null,
      "c": null
    },
    "B003": {
      "value": "Monochrome",
      "description": "Usually B/W",
      "a": 53,
      "b": null,
      "c": null
    },
    "B004": {
      "value": "Printed CMYK",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "B005": {
      "value": "Printed higher-quality CMYK",
      "description": "Printed \u0091premium\u0092 or high-fidelity / high resolution CMYK (where different from \u0091Printed CMYK\u0092, and the manufacturer offers two quality settings)",
      "a": 54,
      "b": null,
      "c": null
    },
    "B006": {
      "value": "Printed with bleed",
      "description": "At least some content bleeds to or beyond trimmed page edge",
      "a": 54,
      "b": null,
      "c": null
    }
  },
  "249": {
    "04": {
      "value": "Filename",
      "description": "Specification Feature Value carries the filename of the final product",
      "a": 53,
      "b": null,
      "c": null
    },
    "21": {
      "value": "Audio loudness",
      "description": "Specification Feature Value is the target loudness in LKFS (LUFS) used for audio normalisation \u0096 see ITU-R BS.1770",
      "a": 53,
      "b": null,
      "c": null
    },
    "41": {
      "value": "Paper type",
      "description": "Specification Feature Description is the paper or card type, eg Coated, uncoated",
      "a": 53,
      "b": null,
      "c": null
    },
    "42": {
      "value": "Paper weight",
      "description": "Specification Feature Value is the paper or card weight in GSM",
      "a": 53,
      "b": null,
      "c": null
    },
    "43": {
      "value": "Paper color",
      "description": "Specification Feature Value is the paper or card color code selected from List 257",
      "a": 53,
      "b": null,
      "c": null
    },
    "44": {
      "value": "Ink color(s)",
      "description": "Specification Feature Description lists the ink color(s) required. Do not use if mono or conventional CMYK",
      "a": 53,
      "b": null,
      "c": null
    },
    "45": {
      "value": "Special finish",
      "description": "Specification Feature Value lists a special finish required, from List 258",
      "a": 53,
      "b": null,
      "c": null
    }
  },
  "250": {
    "01": {
      "value": "Proprietary",
      "description": "For example, a publisher\u0092s internal digital asset ID. Note that <IDTypeName> is required with proprietary identifiers",
      "a": 53,
      "b": null,
      "c": null
    },
    "09": {
      "value": "ISCC",
      "description": "International Standard Content Code, a \u0091similarity hash\u0092 derived algorithmically from the resource content itself (see https://iscc.codes). <IDValue> is the ISCC-CODE generated from a digital manifestation of the work, as a variable-length case-insensitive alphanumeric string (or 55 characters including three hyphens if using ISCC v1.0, but this is deprecated). Note alphabetic characters in v1.x ISCCs use Base32 encoding and are conventionally upper case. The \u0091ISCC:\u0092 prefix is omitted",
      "a": 53,
      "b": 62.0,
      "c": null
    }
  },
  "252": {
    "A410": {
      "value": "Mono",
      "description": "Includes \u0091stereo\u0092 where channels are identical",
      "a": 53,
      "b": null,
      "c": null
    },
    "A411": {
      "value": "22.05kHz",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A412": {
      "value": "44.1kHz",
      "description": "44,100 samples per channel per second (CD-quality)",
      "a": 53,
      "b": null,
      "c": null
    },
    "A413": {
      "value": "48kHz",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A414": {
      "value": "88.2kHz",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A415": {
      "value": "96kHz",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A416": {
      "value": "16-bits per sample",
      "description": "Bit depth, 16 bits per sample (CD-quality)",
      "a": 53,
      "b": null,
      "c": null
    },
    "A417": {
      "value": "20-bits per sample",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A418": {
      "value": "24-bits per sample",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A419": {
      "value": "32-bits per sample (FP)",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A420": {
      "value": "Stereo",
      "description": "Includes \u0091joint stereo\u0092",
      "a": 53,
      "b": null,
      "c": null
    },
    "A421": {
      "value": "Stereo 2.1",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A422": {
      "value": "ID3v1",
      "description": "Includes v1.1",
      "a": 53,
      "b": null,
      "c": null
    },
    "A423": {
      "value": "ID3v2",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "A441": {
      "value": "Surround 4.1",
      "description": "Five-channel audio (including low-frequency channel)",
      "a": 53,
      "b": null,
      "c": null
    },
    "A451": {
      "value": "Surround 5.1",
      "description": "Six-channel audio (including low-frequency channel)",
      "a": 53,
      "b": null,
      "c": null
    },
    "B001": {
      "value": "With crop marks",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "B002": {
      "value": "Without crop marks",
      "description": "If page size of the resource file is not equal to final trimmed page size of the product (in <Measure>, then text or image area should be centred on final pages. Note that content may not bleed to the trimmed page edge",
      "a": 53,
      "b": null,
      "c": null
    },
    "B003": {
      "value": "Monochrome",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "B004": {
      "value": "Preseparated \u0096 2 channels",
      "description": "Two pages in the resource file represent a single page in the product",
      "a": 53,
      "b": null,
      "c": null
    },
    "B005": {
      "value": "Preseparated \u0096 3 channels",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "B006": {
      "value": "Preseparated \u0096 4 channels",
      "description": "For example, preseparated CMYK",
      "a": 55,
      "b": null,
      "c": null
    },
    "B010": {
      "value": "Composite (CMYK)",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "B011": {
      "value": "Composite (RGB)",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    }
  },
  "253": {
    "01": {
      "value": "File format",
      "description": "Resource File Feature Value carries a code from List 178",
      "a": 53,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Filename",
      "description": "Resource File Feature Value carries the filename of the supporting resource, necessary only when it is different from the last part of the path provided in <ResourceFileLink>",
      "a": 53,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Approximate download file size in megabytes",
      "description": "Resource File Feature Value carries a decimal number only, suggested no more than 2 or 3 significant digits (eg 1.7, not 1.7462 or 1.75MB)",
      "a": 53,
      "b": null,
      "c": null
    },
    "06": {
      "value": "MD5 hash value",
      "description": "MD5 hash value of the resource file. <ResourceFileFeatureValue> should contain the 128-bit digest value (as 32 hexadecimal digits). Can be used as a cryptographic check on the integrity of a resource after it has been retrieved",
      "a": 53,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Exact download file size in bytes",
      "description": "Resource File Feature Value carries a integer number only (eg 1831023)",
      "a": 53,
      "b": null,
      "c": null
    },
    "08": {
      "value": "SHA-256 hash value",
      "description": "SHA-256 hash value of the resource file. <ResourceFileFeatureValue> should contain the 256-bit digest value (as 64 hexadecimal digits). Can be used as a cryptographic check on the integrity of a resource after it has been retrieved",
      "a": 53,
      "b": null,
      "c": null
    },
    "31": {
      "value": "Audio loudness",
      "description": "Resource File Feature Value is the loudness in LKFS (LUFS) used for audio normalisation \u0096 see ITU-R BS.1770",
      "a": 53,
      "b": null,
      "c": null
    }
  },
  "254": {
    "17": {
      "value": "Last updated",
      "description": "Date when a resource was last changed or updated",
      "a": 53,
      "b": null,
      "c": null
    },
    "27": {
      "value": "Available from",
      "description": "Date from which a resource is available for download",
      "a": 53,
      "b": null,
      "c": null
    },
    "28": {
      "value": "Available until",
      "description": "Date until which a resource is available for download",
      "a": 53,
      "b": null,
      "c": null
    }
  },
  "255": {
    "ALP": {
      "value": "Adjacent to logical page",
      "description": "Insert appears after an even numbered or before an odd numbered logical page. <InsertPointValue> is an integer page number",
      "a": 53,
      "b": null,
      "c": null
    },
    "APP": {
      "value": "Adjacent to physical page",
      "description": "Insert appears after an even numbered or before an odd numbered printed page number. <InsertPointValue> is an integer page number",
      "a": 53,
      "b": null,
      "c": null
    },
    "ATC": {
      "value": "At timecode",
      "description": "Insert appears in the body at a specific timecode (hours, minutes, seconds, counted from the beginning of the product before any inserts are added). <InsertPointValue> is in the format HHHMMSS. Fill with leading zeroes if any elements are missing. If centisecond precision is required, use HHHMMSScc",
      "a": 53,
      "b": null,
      "c": null
    },
    "AHL": {
      "value": "Adjacent to HTML label",
      "description": "Insert appears before the block-level HTML element \u0096 &lt;InsertPointValue> is the value of the id or name attribute of the block-level element (which must be unique within the body of the product)",
      "a": 53,
      "b": null,
      "c": null
    }
  },
  "256": {
    "01": {
      "value": "Image shows product in packaging",
      "description": "Image shows retail product only, in packaging",
      "a": 52,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Image shows product (without packaging)",
      "description": "Image shows retail product only, without packaging",
      "a": 52,
      "b": null,
      "c": null
    },
    "03": {
      "value": "Image shows product and accessories",
      "description": "Image shows product (with or without packaging) and accessory items not included with product",
      "a": 52,
      "b": null,
      "c": null
    },
    "04": {
      "value": "Image shows assembled product",
      "description": "Image shows product in final form (eg an assembled toy or model, completed puzzle)",
      "a": 52,
      "b": null,
      "c": null
    },
    "05": {
      "value": "Image shows product in use",
      "description": "Image shows product in use by a person or people",
      "a": 52,
      "b": null,
      "c": null
    },
    "06": {
      "value": "Image shows multiple products",
      "description": "Image shows multiple copies of the product, or multiple related products",
      "a": 52,
      "b": null,
      "c": null
    },
    "07": {
      "value": "Image shows detail of product",
      "description": "Image shows part of product, for example inside pages of a book or detail of part of a toy",
      "a": 52,
      "b": null,
      "c": null
    },
    "21": {
      "value": "3D perspective \u0091front\u0092",
      "description": "Shows front cover, spine and top edge of pages (or equivalent for non-book products or packaging)",
      "a": 52,
      "b": null,
      "c": null
    },
    "22": {
      "value": "3D perspective \u0091back\u0092",
      "description": "Shows back cover, spine and top edge of pages (or equivalent for non-book products or packaging)",
      "a": 52,
      "b": null,
      "c": null
    },
    "23": {
      "value": "3D perspective \u0091front foredge\u0092",
      "description": "Shows front cover, foredge and top edge of pages (or equivalent for non-book products or packaging)",
      "a": 52,
      "b": null,
      "c": null
    },
    "24": {
      "value": "3D perspective \u0091back foredge\u0092",
      "description": "Shows back cover, foredge and top edge of pages (or equivalent for non-book products or packaging)",
      "a": 52,
      "b": null,
      "c": null
    },
    "33": {
      "value": "3D perspective \u0091front low\u0092",
      "description": "Shows front cover and spine (or equivalent for non-book products or packaging)",
      "a": 53,
      "b": null,
      "c": null
    },
    "34": {
      "value": "3D perspective \u0091back low\u0092",
      "description": "Shows back cover and spine (or equivalent for non-book products or packaging)",
      "a": 53,
      "b": null,
      "c": null
    },
    "35": {
      "value": "3D perspective \u0091front foredge low\u0092",
      "description": "Shows front cover and foredge (or equivalent for non-book products or packaging)",
      "a": 53,
      "b": null,
      "c": null
    },
    "36": {
      "value": "3D perspective \u0091back foredge low\u0092",
      "description": "Shows back cover and foredge (or equivalent for non-book products or packaging)",
      "a": 53,
      "b": null,
      "c": null
    },
    "41": {
      "value": "2D front",
      "description": "Shows front cover only (or equivalent for non-book products or packaging)",
      "a": 53,
      "b": null,
      "c": null
    },
    "42": {
      "value": "2D back",
      "description": "Shows back cover only (or equivalent for non-book products or packaging)",
      "a": 53,
      "b": null,
      "c": null
    },
    "43": {
      "value": "2D spine",
      "description": "Shows spine only (or equivalent for non-book products or packaging)",
      "a": 53,
      "b": null,
      "c": null
    },
    "47": {
      "value": "3D perspective \u0091horizontal\u0092",
      "description": "Product is horizontal (eg lying on table)",
      "a": 52,
      "b": null,
      "c": null
    },
    "48": {
      "value": "3D perspective \u0091vertical\u0092",
      "description": "Product is vertical (eg standing on table)",
      "a": 52,
      "b": null,
      "c": null
    },
    "49": {
      "value": "3D perspective \u0091open\u0092",
      "description": "Product or product packaging is open, showing at least some interior detail (eg of the page content of a book)",
      "a": 66,
      "b": null,
      "c": null
    },
    "50": {
      "value": "3D perspective \u0091closed\u0092",
      "description": "Product or product packaging is closed, or no significant interior detail is visible",
      "a": 66,
      "b": null,
      "c": null
    }
  },
  "257": {
    "BRW": {
      "value": "Bright white",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "WHI": {
      "value": "White",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "OFW": {
      "value": "Off white",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "CRE": {
      "value": "Cream",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    }
  },
  "258": {
    "01": {
      "value": "Overall matt laminate",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    },
    "02": {
      "value": "Overall gloss laminate",
      "description": null,
      "a": 53,
      "b": null,
      "c": null
    }
  },
  "259": {
    "u": {
      "value": "Unknown",
      "description": null,
      "a": 60,
      "b": null,
      "c": null
    },
    "i": {
      "value": "Irregular",
      "description": "No fixed publication schedule",
      "a": 60,
      "b": null,
      "c": null
    },
    "e": {
      "value": "Biennial",
      "description": "Once every two years",
      "a": 60,
      "b": null,
      "c": null
    },
    "a": {
      "value": "Annual",
      "description": "Yearly",
      "a": 60,
      "b": null,
      "c": null
    },
    "b": {
      "value": "Biannual",
      "description": "Twice a year, or once per academic semester",
      "a": 60,
      "b": null,
      "c": null
    },
    "t": {
      "value": "Triannual",
      "description": "Three times a year, or once per academic term",
      "a": 60,
      "b": null,
      "c": null
    },
    "q": {
      "value": "Quarterly",
      "description": "Four times a year",
      "a": 60,
      "b": null,
      "c": null
    },
    "s": {
      "value": "Bimonthly",
      "description": "Six times per year",
      "a": 60,
      "b": null,
      "c": null
    },
    "m": {
      "value": "Monthly",
      "description": "Once every month, or approximately twelve times per year",
      "a": 60,
      "b": null,
      "c": null
    },
    "f": {
      "value": "Fortnightly",
      "description": "Once every two weeks, or approximately twenty five times per year",
      "a": 60,
      "b": null,
      "c": null
    },
    "w": {
      "value": "Weekly",
      "description": "Or approximately fifty times per year",
      "a": 60,
      "b": null,
      "c": null
    },
    "d": {
      "value": "Daily, or more frequently than weekly",
      "description": "At least twice a week",
      "a": 60,
      "b": 66.0,
      "c": null
    },
    "x": {
      "value": "No future publications",
      "description": "Positive indication that the product is the last to be published in the collection, or that no further publications are planned",
      "a": 60,
      "b": null,
      "c": null
    }
  },
  "260": {
    "14": {
      "value": "Valid from",
      "description": "Date on which a license becomes effective",
      "a": 60,
      "b": null,
      "c": null
    },
    "15": {
      "value": "Valid until",
      "description": "Date on which a license ceases to be effective",
      "a": 60,
      "b": null,
      "c": null
    },
    "24": {
      "value": "From\u0085 until date",
      "description": "Combines From date and Until date to define a period (both dates are inclusive). Use for example with dateformat 06",
      "a": 60,
      "b": null,
      "c": null
    }
  },
  "261": {
    "u": {
      "value": "Unclassifiable",
      "description": "Use ONLY if the error message severity cannot be determined (eg with a legacy system unable to provide detailed error codes)",
      "a": 62,
      "b": null,
      "c": null
    },
    "i": {
      "value": "Info",
      "description": "For information only, provided to encourage the master file supplier to improve the quality of their files (eg to make rendering of the product more reliable/interoperable, or to improve accessibility, etc)",
      "a": 62,
      "b": null,
      "c": null
    },
    "q": {
      "value": "Query",
      "description": "Request for clarification or further detail of the meaning of some part of the master file data provided",
      "a": 62,
      "b": null,
      "c": null
    },
    "w": {
      "value": "Warning",
      "description": "The master files have been accepted as provided, but there may be issues in the way they were supplied",
      "a": 62,
      "b": null,
      "c": null
    },
    "e": {
      "value": "Error",
      "description": "Some data in the content or structure of a master file caused an error due to not meeting the requirements of the relevant standard. The master file in question has been rejected, but processing of the remaining master files comprising tthe product has continued",
      "a": 62,
      "b": null,
      "c": null
    },
    "f": {
      "value": "Fatal error",
      "description": "Some data in the content or struture of a master file caused an unrecoverable error due to not meeting the requirements of the relevant standard. The entire set of master files for the product has been rejected",
      "a": 62,
      "b": null,
      "c": null
    }
  },
  "262": {
    "101": {
      "value": "Blue Angel",
      "description": "Product carries \u0096 or is eligible to carry \u0096 Blue Angel labelling. See https://www.blauer-engel.de",
      "a": 62,
      "b": null,
      "c": null
    },
    "102": {
      "value": "Cradle to Cradle",
      "description": "Product carries \u0096 or is eligible to carry \u0096 C2C labelling. Has bronze, silver, gold and platinum levels. See c2ccertified.org",
      "a": 62,
      "b": null,
      "c": null
    },
    "103": {
      "value": "Nordic Swan",
      "description": "See https://www.nordic-swan-ecolabel.org",
      "a": 62,
      "b": null,
      "c": null
    },
    "104": {
      "value": "ClimatePartner",
      "description": "See https://www.climatepartner.com/en/take-action/measure-carbon-footprints/product-carbon-footprint-pcf",
      "a": 62,
      "b": 63.0,
      "c": null
    },
    "105": {
      "value": "EU Ecolabel",
      "description": "See www.ecolabel.eu",
      "a": 62,
      "b": null,
      "c": null
    },
    "501": {
      "value": "V-Label",
      "description": "Indicates the product is certified as vegan (does not use animal products, for example in binding or adhesives). See v-label.com",
      "a": 62,
      "b": null,
      "c": null
    }
  },
  "263": {
    "01": {
      "value": "Proprietary",
      "description": "Note that <IDTypeName> is required with proprietary identifiers",
      "a": 65,
      "b": null,
      "c": null
    },
    "91": {
      "value": "GND",
      "description": "Gemeinsame Normdatei \u0096 Joint Authority File in the German-speaking countries. See https://www.dnb.de/DE/Professionell/Standardisierung/GND/gnd_node.html (German) and https://www.dnb.de/EN/Professionell/Standardisierung/GND/gnd_node.html (English)",
      "a": 66,
      "b": null,
      "c": null
    },
    "B6": {
      "value": "FAST",
      "description": "Faceted Application of Subject Terminology, OCLC subject scheme derived from LCSH. See https://fast.oclc.org/fast/. Codes are up to 8 digits, for example 1430698 for the Booker Prize (see https://id.worldcat.org/fast/1430698)",
      "a": 66,
      "b": null,
      "c": null
    }
  }
}