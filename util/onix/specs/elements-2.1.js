/*
  ONIX 2.1 Tags

  Retrieved from: https://onixedit.com/en-us/products/onixedit/onix-tags
  Converted with Claude.ai
*/
const OnixElements = require('./_elements')

module.exports = new OnixElements({
  "Product": {
    "RecordReference": "a001",
    "NotificationType": "a002",
    "RecordSourceType": "a194",
    "RecordSourceName": "al97",
    "ProductIdentifier": {
      "ProductIDType": "b221",
      "IDTypeName": "b233",
      "IDValue": "b244"
    },
    "Barcode": "b246",
    "ProductForm": "b012",
    "ProductFormDetail": "b333",
    "ProductFormFeature": {
      "ProductFormFeatureType": "b334",
      "ProductFormFeatureValue": "b335",
      "ProductFormFeatureDescription": "b336"
    },
    "ProductPackaging": "b225",
    "ProductFormDescription": "b014",
    "NumberOfPieces": "b210",
    "TradeCategory": "b384",
    "ProductContentType": "b385",
    "ContainedItem": {
      "ProductIdentifier": {
        "ProductIDType": "b221",
        "IDTypeName": "b233",
        "IDValue": "b244"
      },
      "ProductForm": "b012",
      "ProductFormDetail": "b333",
      "NumberOfPieces": "b210",
      "ItemQuantity": "b015"
    },
    "ProductClassification": {
      "ProductClassificationType": "b274",
      "ProductClassificationCode": "b275",
      "Percent": "b337"
    },
    "EpubType": "b211",
    "EpubTypeVersion": "b212",
    "EpubTypeDescription": "b213",
    "EpubFormat": "b214",
    "EpubFormatVersion": "b215",
    "EpubFormatDescription": "b216",
    "EpubTypeNote": "b277",
    "Series": {
      "SeriesIdentifier": {
        "SeriesIDType": "b273",
        "IDTypeName": "b233",
        "IDValue": "b244"
      },
      "TitleOfSeries": "b018",
      "Title": {
        "TitleType": "b202",
        "TitleText": "b203",
        "TitlePrefix": "b030",
        "TitleWithoutPrefix": "b031",
        "Subtitle": "b029"
      },
      "NumberWithinSeries": "b019",
      "YearOfAnnual": "b020"
    },
    "Set": {
      "ProductIdentifier": {
        "ProductIDType": "b221",
        "IDTypeName": "b233",
        "IDValue": "b244"
      },
      "TitleOfSet": "b023",
      "Title": {
        "TitleType": "b202",
        "TitleText": "b203",
        "TitlePrefix": "b030",
        "TitleWithoutPrefix": "b031",
        "Subtitle": "b029"
      },
      "SetPartNumber": "b024",
      "SetPartTitle": "b025",
      "ItemNumberWithinSet": "b026",
      "SetItemTitle": "b281"
    },
    "Title": {
      "TitleType": "b202",
      "TitleText": "b203",
      "TitlePrefix": "b030",
      "TitleWithoutPrefix": "b031",
      "Subtitle": "b029"
    },
    "WorkIdentifier": {
      "WorkIDType": "b201",
      "IDTypeName": "b233",
      "IDValue": "b244"
    },
    "Website": {
      "WebsiteRole": "b367",
      "WebsiteDescription": "b294",
      "WebsiteLink": "b295"
    },
    "Contributor": {
      "SequenceNumber": "b034",
      "ContributorRole": "b035",
      "LanguageCode": "b252",
      "SequenceNumberWithinRole": "b340",
      "PersonName": "b036",
      "PersonNameInverted": "b037",
      "TitlesBeforeNames": "b038",
      "NamesBeforeKey": "b039",
      "PrefixToKey": "b247",
      "KeyNames": "b040",
      "SuffixToKey": "b248",
      "LettersAfterNames": "b042",
      "PersonNameIdentifier": {
        "PersonNameIDType": "b390",
        "IDTypeName": "b233",
        "IDValue": "b244"
      },
      "PersonDate": {
        "PersonDateRole": "b305",
        "Date": "b306"
      },
      "ProfessionalAffiliation": {
        "ProfessionalPosition": "b045",
        "Affiliation": "b046"
      },
      "CorporateName": "b047",
      "BiographicalNote": "b044",
      "Website": {
        "WebsiteRole": "b367",
        "WebsiteLink": "b295"
      },
      "ContributorDescription": "b048",
      "CountryCode": "b251",
      "RegionCode": "b398"
    },
    "ContributorStatement": "b049",
    "Conference": {
      "ConferenceName": "b052",
      "ConferenceAcronym": "b341",
      "ConferenceNumber": "b053",
      "ConferenceDate": "b054",
      "ConferencePlace": "b055"
    },
    "EditionTypeCode": {
      "shortTag": "b056",
      "codeList": "21"
    },
    "EditionNumber": "b057",
    "EditionStatement": "b058",
    "Language": {
      "LanguageRole": "b253",
      "LanguageCode": "b252"
    },
    "NumberOfPages": "b061",
    "Extent": {
      "ExtentType": "b218",
      "ExtentValue": "b219",
      "ExtentUnit": "b220"
    },
    "NumberOfIllustrations": "b125",
    "IllustrationsNote": "b062",
    "Illustrations": {
      "IllustrationType": "b256",
      "IllustrationTypeDescription": "b361",
      "Number": "b257"
    },
    "MapScale": "b063",
    "BASICMainSubject": "b064",
    "BASICVersion": "b200",
    "BICMainSubject": "b065",
    "BICVersion": "b066",
    "MainSubject": {
      "MainSubjectSchemeIdentifier": "b191",
      "SubjectSchemeVersion": "b068",
      "SubjectCode": "b069",
      "SubjectHeadingText": "b070"
    },
    "Subject": {
      "SubjectSchemeIdentifier": "b067",
      "SubjectSchemeName": "b171",
      "SubjectSchemeVersion": "b068",
      "SubjectCode": "b069",
      "SubjectHeadingText": "b070"
    },
    "PlaceAsSubject": "b072",
    "AudienceCode": "b073",
    "Audience": {
      "AudienceCodeType": "b204",
      "AudienceCodeTypeName": "b205",
      "AudienceCodeValue": "b206"
    },
    "AudienceRange": {
      "AudienceRangeQualifier": "b074",
      "AudienceRangePrecision1": "b075",
      "AudienceRangeValue1": "b076",
      "AudienceRangePrecision2": "b075",
      "AudienceRangeValue2": "b076"
    },
    "AudienceDescription": "b207",
    "Complexity": {
      "ComplexitySchemeIdentifier": "b077",
      "ComplexityCode": "b078"
    },
    "OtherText": {
      "TextTypeCode": "d102",
      "TextFormat": "d103",
      "Text": "d104",
      "TextLinkType": "d105",
      "TextLink": "d106",
      "TextAuthor": "d107",
      "TextSourceCorporate": "b374",
      "TextSourceTitle": "d108",
      "TextPublicationDate": "d109"
    },
    "MediaFile": {
      "MediaFileTypeCode": "f114",
      "MediaFileFormatCode": "f115",
      "ImageResolution": "f259",
      "MediaFileLinkTypeCode": "f116",
      "MediaFileLink": "f117",
      "TextWithDownload": "f118",
      "DownloadCaption": "f119",
      "DownloadCredit": "f120",
      "DownloadCopyrightNotice": "f121",
      "DownloadTerms": "f122",
      "MediaFileDate": "f373"
    },
    "ProductWebsite": {
      "WebsiteRole": "b367",
      "ProductWebsiteDescription": "f170",
      "ProductWebsiteLink": "f123"
    },
    "Prize": {
      "PrizeName": "g126",
      "PrizeYear": "g127",
      "PrizeCountry": "g128",
      "PrizeCode": "g129"
    },
    "Imprint": {
      "NameCodeType": "b241",
      "NameCodeTypeName": "b242",
      "NameCodeValue": "b243",
      "ImprintName": "b079"
    },
    "Publisher": {
      "PublishingRole": "b291",
      "NameCodeType": "b241",
      "NameCodeTypeName": "b242",
      "NameCodeValue": "b243",
      "PublisherName": "b081",
      "Website": {
        "WebsiteRole": "b367",
        "WebsiteLink": "b295"
      }
    },
    "CityOfPublication": "b209",
    "CountryOfPublication": "b083",
    "PublishingStatus": "b394",
    "AnnouncementDate": "b086",
    "TradeAnnouncementDate": "b362",
    "PublicationDate": {
      "shortTag": "b003",
      "formatList": "55",
    },
    "CopyrightStatement": {
      "CopyrightYear": "b087",
      "CopyrightOwner": {
        "CopyrightOwnerIdentifier": {
          "CopyrightOwnerIDType": "b392",
          "IDTypeName": "b233",
          "IDValue": "b244"
        },
        "PersonName": "b036",
        "CorporateName": "b047"
      }
    },
    "CopyrightYear": "b087",
    "YearFirstPublished": "b088",
    "SalesRights": {
      "SalesRightsType": "b089",
      "RightsCountry": "b090",
      "RightsTerritory": "b388"
    },
    "NotForSale": {
      "RightsCountry": "b090",
      "RightsTerritory": "b388",
      "ProductIdentifier": {
        "ProductIDType": "b221",
        "IDValue": "b244"
      }
    },
    "SalesRestriction": {
      "SalesRestrictionType": "b381",
      "SalesOutlet": {
        "SalesOutletIdentifier": {
          "SalesOutletIDType": "b393",
          "IDTypeName": "b233",
          "IDValue": "b244"
        },
        "SalesOutletName": "b382"
      }
    },
    "Measure": {
      "MeasureTypeCode": "c093",
      "Measurement": "c094",
      "MeasureUnitCode": "c095"
    },
    "RelatedProduct": {
      "RelationCode": "h208",
      "ProductIdentifier": {
        "ProductIDType": "b221",
        "IDTypeName": "b233",
        "IDValue": "b244"
      },
      "ProductForm": "b012",
      "ProductFormDetail": "b333",
      "EpubType": "b211"
    },
    "OutOfPrintDate": "h134",
    "SupplyDetail": {
      "SupplierEANLocationNumber": "j135",
      "SupplierSAN": "j136",
      "SupplierIdentifier": {
        "SupplierIDType": "j345",
        "IDTypeName": "b233",
        "IDValue": "b244"
      },
      "SupplierName": "j137",
      "TelephoneNumber": "j270",
      "FaxNumber": "j271",
      "EmailAddress": "j272",
      "SupplierRole": "j292",
      "SupplyToCountry": "j138",
      "SupplyToTerritory": "j397",
      "SupplyToCountryExcluded": "j140",
      "ReturnsCodeType": "j268",
      "ReturnsCode": "j269",
      "LastDateForReturns": "j387",
      "ProductAvailability": "j396",
      "NewSupplier": {
        "SupplierIdentifier": {
          "SupplierIDType": "j345",
          "IDValue": "b244"
        },
        "SupplierName": "j137"
      },
      "ExpectedShipDate": "j142",
      "OnSaleDate": "j143",
      "OrderTime": "j144",
      "Stock": {
        "LocationName": "j349",
        "OnHand": "j350",
        "OnOrder": "j351",
        "CBO": "j375"
      },
      "PackQuantity": "j145",
      "AudienceRestrictionFlag": "j146",
      "AudienceRestrictionNote": "j147",
      "UnpricedItemType": "j192",
      "Price": {
        "PriceTypeCode": "j148",
        "PriceQualifier": "j261",
        "PriceTypeDescription": "j262",
        "ClassOfTrade": "j149",
        "BICDiscountGroupCode": "j150",
        "DiscountCoded": {
          "DiscountCodeType": "j363",
          "DiscountCodeTypeName": "j378",
          "DiscountCode": "j364"
        },
        "DiscountPercent": "j267",
        "PriceStatus": "j266",
        "PriceAmount": "j151",
        "CurrencyCode": "j152",
        "CountryCode": "b251",
        "TaxRateCode1": "j153",
        "TaxRatePercent1": "j154",
        "TaxableAmount1": "j155",
        "TaxAmount1": "j156",
        "TaxRateCode2": "j157",
        "TaxRatePercent2": "j158",
        "TaxableAmount2": "j159",
        "TaxAmount2": "j160",
        "PriceEffectiveFrom": "j161",
        "PriceEffectiveUntil": "j162"
      }
    },
    "MarketRepresentation": {
      "AgentName": "j401",
      "AgentRole": "j402",
      "MarketCountry": "j403",
      "MarketTerritory": "j404",
      "MarketPublishingStatus": "j407",
      "MarketDate": {
        "MarketDateRole": "j408",
        "Date": "b306"
      }
    },
    "PromotionCampaign": "k165",
    "PromotionContact": "k166",
    "InitialPrintRun": "k167"
  }
}, {version: '2.1'})