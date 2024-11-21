/*
  ONIX 2.1 Tags

  Retrieved from: https://onixedit.com/en-us/products/onixedit/onix-tags
  Converted with Claude.ai
*/
const OnixElements = require('./_elements')

module.exports = new OnixElements({
    "Product": {
        "shortTag": "product",
        "required": true,
        "components": {
            "RecordReference": {
                "shortTag": "a001",
                "type": "string",
                "required": true
            },
            "NotificationType": {
                "shortTag": "a002",
                "type": "code",
                "codeList": 1,
                "required": true
            },
            "DeletionCode": {
                "shortTag": "a198",
                "type": "code",
                "codeList": 2
            },
            "RecordSourceType": {
                "shortTag": "a194",
                "type": "code",
                "codeList": 3
            },
            "ProductIdentifier": {
                "shortTag": "productidentifier",
                "type": "composite",
                "repeatable": true,
                "required": true,
                "components": {
                    "ProductIDType": {
                        "shortTag": "b221",
                        "type": "code",
                        "codeList": 5,
                        "required": true
                    },
                    "IDTypeName": {
                        "shortTag": "b233",
                        "type": "string"
                    },
                    "IDValue": {
                        "shortTag": "b244",
                        "type": "string",
                        "required": true
                    }
                }
            },
            "ProductForm": {
                "shortTag": "b012",
                "type": "code",
                "codeList": 7,
                "required": true
            },
            "ProductFormDetail": {
                "shortTag": "b333",
                "type": "code",
                "codeList": 78,
                "repeatable": true
            },
            "ProductFormFeature": {
                "shortTag": "productformfeature",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "ProductFormFeatureType": {
                        "shortTag": "b334",
                        "type": "code",
                        "codeList": 79,
                        "required": true
                    },
                    "ProductFormFeatureValue": {
                        "shortTag": "b335",
                        "type": "string"
                    },
                    "ProductFormFeatureDescription": {
                        "shortTag": "b336",
                        "type": "text"
                    }
                }
            },
            "BookFormDetail": {
                "shortTag": "b013",
                "type": "code",
                "codeList": 8,
                "repeatable": true
            },
            "ProductPackaging": {
                "shortTag": "b225",
                "type": "code",
                "codeList": 80
            },
            "ProductFormDescription": {
                "shortTag": "b014",
                "type": "text"
            },
            "NumberOfPieces": {
                "shortTag": "b210",
                "type": "integer"
            },
            "TradeCategory": {
                "shortTag": "b384",
                "type": "code",
                "codeList": 12
            },
            "ProductContentType": {
                "shortTag": "b385",
                "type": "code",
                "codeList": 81,
                "repeatable": true
            },
            "EpubType": {
                "shortTag": "b211",
                "type": "code",
                "codeList": 10
            },
            "EpubFormat": {
                "shortTag": "b214",
                "type": "code",
                "codeList": 11
            },
            "EpubSource": {
                "shortTag": "b278",
                "type": "code",
                "codeList": 11
            },
            "EpubTypeVersion": {
                "shortTag": "b212",
                "type": "string"
            },
            "EpubFormatVersion": {
                "shortTag": "b215",
                "type": "string"
            },
            "EpubTypeDescription": {
                "shortTag": "b213",
                "type": "text"
            },
            "EpubFormatDescription": {
                "shortTag": "b216",
                "type": "text"
            },
            "EpubTypeNote": {
                "shortTag": "b277",
                "type": "text"
            },
            "Series": {
                "shortTag": "series",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "SeriesIdentifier": {
                        "shortTag": "seriesidentifier",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "SeriesIDType": {
                                "shortTag": "b273",
                                "type": "code",
                                "codeList": 13,
                                "required": true
                            },
                            "IDTypeName": {
                                "shortTag": "b233",
                                "type": "string"
                            },
                            "IDValue": {
                                "shortTag": "b244",
                                "type": "string",
                                "required": true
                            }
                        }
                    },
                    "TitleOfSeries": {
                        "shortTag": "b018",
                        "type": "string"
                    },
                    "SeriesPartName": {
                        "shortTag": "b019",
                        "type": "string",
                        "repeatable": true
                    },
                    "NumberWithinSeries": {
                        "shortTag": "b020",
                        "type": "string"
                    }
                }
            },
            "Set": {
                "shortTag": "set",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "ISBNOfSet": {
                        "shortTag": "b021",
                        "type": "string"
                    },
                    "EAN13OfSet": {
                        "shortTag": "b022",
                        "type": "string"
                    },
                    "TitleOfSet": {
                        "shortTag": "b023",
                        "type": "string"
                    },
                    "SetPartNumber": {
                        "shortTag": "b024",
                        "type": "string"
                    },
                    "SetPartTitle": {
                        "shortTag": "b025",
                        "type": "string"
                    },
                    "ItemNumberWithinSet": {
                        "shortTag": "b026",
                        "type": "string"
                    },
                    "LevelSequenceNumber": {
                        "shortTag": "b284",
                        "type": "string"
                    },
                    "SetItemTitle": {
                        "shortTag": "b281",
                        "type": "string"
                    }
                }
            },
            "Title": {
                "shortTag": "title",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "TitleType": {
                        "shortTag": "b202",
                        "type": "code",
                        "codeList": 15,
                        "required": true
                    },
                    "AbbreviatedLength": {
                        "shortTag": "b276",
                        "type": "integer"
                    },
                    "TitleText": {
                        "shortTag": "b203",
                        "type": "string",
                        "textcase": "title"
                    },
                    "TitlePrefix": {
                        "shortTag": "b030",
                        "type": "string"
                    },
                    "TitleWithoutPrefix": {
                        "shortTag": "b031",
                        "type": "string",
                        "textcase": "title"
                    },
                    "Subtitle": {
                        "shortTag": "b029",
                        "type": "string",
                        "textcase": "title"
                    }
                }
            },
            "WorkIdentifier": {
                "shortTag": "workidentifier",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "WorkIDType": {
                        "shortTag": "b201",
                        "type": "code",
                        "codeList": 16,
                        "required": true
                    },
                    "IDTypeName": {
                        "shortTag": "b233",
                        "type": "string"
                    },
                    "IDValue": {
                        "shortTag": "b244",
                        "type": "string",
                        "required": true
                    }
                }
            },
            "Website": {
                "shortTag": "website",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "WebsiteRole": {
                        "shortTag": "b367",
                        "type": "code",
                        "codeList": 73
                    },
                    "WebsiteDescription": {
                        "shortTag": "b294",
                        "type": "text"
                    },
                    "WebsiteLink": {
                        "shortTag": "b295",
                        "type": "string",
                        "required": true
                    }
                }
            },
            "Contributor": {
                "shortTag": "contributor",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "SequenceNumber": {
                        "shortTag": "b034",
                        "type": "integer"
                    },
                    "ContributorRole": {
                        "shortTag": "b035",
                        "type": "code",
                        "codeList": 17,
                        "repeatable": true,
                        "required": true
                    },
                    "PersonNameIdentifier": {
                        "shortTag": "personnameidentifier",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "PersonNameIDType": {
                                "shortTag": "b390",
                                "type": "code",
                                "codeList": 101,
                                "required": true
                            },
                            "IDTypeName": {
                                "shortTag": "b233",
                                "type": "string"
                            },
                            "IDValue": {
                                "shortTag": "b244",
                                "type": "string",
                                "required": true
                            }
                        }
                    },
                    "PersonName": {
                        "shortTag": "b036",
                        "type": "string"
                    },
                    "PersonNameInverted": {
                        "shortTag": "b037",
                        "type": "string"
                    },
                    "TitlesBeforeNames": {
                        "shortTag": "b038",
                        "type": "string"
                    },
                    "NamesBeforeKey": {
                        "shortTag": "b039",
                        "type": "string"
                    },
                    "PrefixToKey": {
                        "shortTag": "b247",
                        "type": "string"
                    },
                    "KeyNames": {
                        "shortTag": "b040",
                        "type": "string"
                    },
                    "NamesAfterKey": {
                        "shortTag": "b041",
                        "type": "string"
                    },
                    "SuffixToKey": {
                        "shortTag": "b248",
                        "type": "string"
                    },
                    "LettersAfterNames": {
                        "shortTag": "b042",
                        "type": "string"
                    },
                    "TitlesAfterNames": {
                        "shortTag": "b043",
                        "type": "string"
                    },
                    "CorporateName": {
                        "shortTag": "b047",
                        "type": "string"
                    },
                    "BiographicalNote": {
                        "shortTag": "b044",
                        "type": "text"
                    },
                    "ProfessionalAffiliation": {
                        "shortTag": "professionalaffiliation",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "ProfessionalPosition": {
                                "shortTag": "b045",
                                "type": "string"
                            },
                            "Affiliation": {
                                "shortTag": "b046",
                                "type": "string"
                            }
                        }
                    },
                    "ContributorDescription": {
                        "shortTag": "b048",
                        "type": "text"
                    },
                    "UnnamedPersons": {
                        "shortTag": "b249",
                        "type": "code",
                        "codeList": 19
                    }
                }
            },
            "PublicationDate": {
                "shortTag": "b003",
                "formatList": "55",
            },
            "OtherText": {
                "shortTag": "othertext",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "TextTypeCode": {
                        "shortTag": "d102",
                        "type": "code",
                        "codeList": 33,
                        "required": true
                    },
                    "TextFormat": {
                        "shortTag": "d103",
                        "type": "code",
                        "codeList": 34
                    },
                    "Text": {
                        "shortTag": "d104",
                        "type": "text"
                    },
                    "TextLinkType": {
                        "shortTag": "d105",
                        "type": "code",
                        "codeList": 35
                    },
                    "TextLink": {
                        "shortTag": "d106",
                        "type": "string"
                    },
                    "TextAuthor": {
                        "shortTag": "d107",
                        "type": "string"
                    },
                    "TextSourceCorporate": {
                        "shortTag": "b374",
                        "type": "string"
                    },
                    "TextSourceTitle": {
                        "shortTag": "d108",
                        "type": "string"
                    },
                    "TextPublicationDate": {
                        "shortTag": "d109",
                        "type": "string"
                    },
                    "StartDate": {
                        "shortTag": "b324",
                        "type": "string"
                    },
                    "EndDate": {
                        "shortTag": "b325",
                        "type": "string"
                    }
                }
            },
            "Language": {
                "shortTag": "language",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "LanguageRole": {
                        "shortTag": "b253",
                        "type": "code",
                        "codeList": 22,
                        "required": true
                    },
                    "LanguageCode": {
                        "shortTag": "b252",
                        "type": "code",
                        "codeList": 74,
                        "required": true
                    }
                }
            },
            "EditionTypeCode": {
                "shortTag": "b056",
                "codeList": "21"
            },
            "BASICMainSubject": {
                "shortTag": "b064"
            },
            "Extent": {
                "shortTag": "extent",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "ExtentType": {
                        "shortTag": "b218",
                        "type": "code",
                        "codeList": 23,
                        "required": true
                    },
                    "ExtentValue": {
                        "shortTag": "b219",
                        "type": "integer",
                        "required": true
                    },
                    "ExtentUnit": {
                        "shortTag": "b220",
                        "type": "code",
                        "codeList": 24,
                        "required": true
                    }
                }
            },
            "Illustrations": {
                "shortTag": "illustrations",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "IllustrationType": {
                        "shortTag": "b256",
                        "type": "code",
                        "codeList": 25
                    },
                    "IllustrationTypeDescription": {
                        "shortTag": "b361",
                        "type": "text"
                    },
                    "Number": {
                        "shortTag": "b257",
                        "type": "integer"
                    }
                }
            },
            "Subject": {
                "shortTag": "subject",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "SubjectSchemeIdentifier": {
                        "shortTag": "b067",
                        "type": "code",
                        "codeList": 27,
                        "required": true
                    },
                    "SubjectSchemeName": {
                        "shortTag": "b171",
                        "type": "string"
                    },
                    "SubjectSchemeVersion": {
                        "shortTag": "b068",
                        "type": "string"
                    },
                    "SubjectCode": {
                        "shortTag": "b069",
                        "type": "string"
                    },
                    "SubjectHeadingText": {
                        "shortTag": "b070",
                        "type": "string"
                    }
                }
            },
            "Audience": {
                "shortTag": "audience",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "AudienceCodeType": {
                        "shortTag": "b204",
                        "type": "code",
                        "codeList": 29,
                        "required": true
                    },
                    "AudienceCodeValue": {
                        "shortTag": "b205",
                        "type": "string",
                        "required": true
                    },
                    "AudienceCodeTypeName": {
                        "shortTag": "b206",
                        "type": "string"
                    }
                }
            },
            "AudienceRange": {
                "shortTag": "audiencerange",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "AudienceRangeQualifier": {
                        "shortTag": "b074",
                        "type": "code",
                        "codeList": 30,
                        "required": true
                    },
                    "AudienceRangePrecision": {
                        "shortTag": "b075",
                        "type": "code",
                        "codeList": 31,
                        "repeatable": true
                    },
                    "AudienceRangeValue": {
                        "shortTag": "b076",
                        "type": "string",
                        "repeatable": true
                    }
                }
            },
            "Complexity": {
                "shortTag": "complexity",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "ComplexitySchemeIdentifier": {
                        "shortTag": "b077",
                        "type": "code",
                        "codeList": 32,
                        "required": true
                    },
                    "ComplexityCode": {
                        "shortTag": "b078",
                        "type": "string"
                    }
                }
            },
            "Publisher": {
                "shortTag": "publisher",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "PublishingRole": {
                        "shortTag": "b291",
                        "type": "code",
                        "codeList": 45,
                        "required": true
                    },
                    "PublisherIdentifier": {
                        "shortTag": "publisheridentifier",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "PublisherIDType": {
                                "shortTag": "b241",
                                "type": "code",
                                "codeList": 44,
                                "required": true
                            },
                            "IDTypeName": {
                                "shortTag": "b233",
                                "type": "string"
                            },
                            "IDValue": {
                                "shortTag": "b244",
                                "type": "string",
                                "required": true
                            }
                        }
                    },
                    "PublisherName": {
                        "shortTag": "b081",
                        "type": "string"
                    },
                    "Website": {
                        "shortTag": "website",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "WebsiteRole": {
                                "shortTag": "b367",
                                "type": "code",
                                "codeList": 73
                            },
                            "WebsiteDescription": {
                                "shortTag": "b294",
                                "type": "text"
                            },
                            "WebsiteLink": {
                                "shortTag": "b295",
                                "type": "string",
                                "required": true
                            }
                        }
                    }
                }
            },
            "PublishingStatus": {
                "shortTag": "publishingstatus",
                "type": "composite",
                "components": {
                    "PublishingStatusCode": {
                        "shortTag": "b394",
                        "type": "code",
                        "codeList": 64
                    },
                    "PublishingStatusNote": {
                        "shortTag": "b395",
                        "type": "text"
                    }
                }
            },
            "PublishingDate": {
                "shortTag": "publishingdate",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "PublishingDateRole": {
                        "shortTag": "b306",
                        "type": "code",
                        "codeList": 163,
                        "required": true
                    },
                    "DateFormat": {
                        "shortTag": "j260",
                        "type": "code",
                        "codeList": 55
                    },
                    "Date": {
                        "shortTag": "b306",
                        "type": "string",
                        "required": true
                    }
                }
            },
            "SalesRights": {
                "shortTag": "salesrights",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "SalesRightsType": {
                        "shortTag": "b089",
                        "type": "code",
                        "codeList": 46,
                        "required": true
                    },
                    "RightsCountry": {
                        "shortTag": "b090",
                        "type": "code",
                        "codeList": 91,
                        "repeatable": true
                    },
                    "RightsTerritory": {
                        "shortTag": "b388",
                        "type": "code",
                        "codeList": 49
                    },
                    "RightsRegion": {
                        "shortTag": "b091",
                        "type": "code",
                        "codeList": 47,
                        "repeatable": true
                    }
                }
            },
            "RelatedProduct": {
                "shortTag": "relatedproduct",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "RelationCode": {
                        "shortTag": "h208",
                        "type": "code",
                        "codeList": 51,
                        "required": true
                    },
                    "ProductIdentifier": {
                        "shortTag": "productidentifier",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "ProductIDType": {
                                "shortTag": "b221",
                                "type": "code",
                                "codeList": 5,
                                "required": true
                            },
                            "IDTypeName": {
                                "shortTag": "b233",
                                "type": "string"
                            },
                            "IDValue": {
                                "shortTag": "b244",
                                "type": "string",
                                "required": true
                            }
                        }
                    },
                    "ProductForm": {
                        "shortTag": "b012",
                        "type": "code",
                        "codeList": 7
                    }
                }
            },
            "SupplyDetail": {
                "shortTag": "supplydetail",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "SupplierIdentifier": {
                        "shortTag": "supplieridentifier",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "SupplierIDType": {
                                "shortTag": "j345",
                                "type": "code",
                                "codeList": 92,
                                "required": true
                            },
                            "IDTypeName": {
                                "shortTag": "b233",
                                "type": "string"
                            },
                            "IDValue": {
                                "shortTag": "b244",
                                "type": "string",
                                "required": true
                            }
                        }
                    },
                    "SupplierRole": {
                        "shortTag": "j292",
                        "type": "code",
                        "codeList": 93,
                        "required": true
                    },
                    "SupplierName": {
                        "shortTag": "j137",
                        "type": "string"
                    },
                    "TelephoneNumber": {
                        "shortTag": "j270",
                        "type": "string"
                    },
                    "FaxNumber": {
                        "shortTag": "j271",
                        "type": "string"
                    },
                    "EmailAddress": {
                        "shortTag": "j272",
                        "type": "string"
                    },
                    "Website": {
                        "shortTag": "website",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "WebsiteRole": {
                                "shortTag": "b367",
                                "type": "code",
                                "codeList": 73
                            },
                            "WebsiteDescription": {
                                "shortTag": "b294",
                                "type": "text"
                            },
                            "WebsiteLink": {
                                "shortTag": "b295",
                                "type": "string",
                                "required": true
                            }
                        }
                    },
                    "SupplyToCountry": {
                        "shortTag": "j138",
                        "type": "code",
                        "codeList": 91,
                        "repeatable": true
                    },
                    "SupplyToTerritory": {
                        "shortTag": "j397",
                        "type": "code",
                        "codeList": 49
                    },
                    "SupplyToRegion": {
                        "shortTag": "j139",
                        "type": "code",
                        "codeList": 47,
                        "repeatable": true
                    },
                    "ReturnsCodeType": {
                        "shortTag": "j268",
                        "type": "code",
                        "codeList": 53
                    },
                    "ReturnsCode": {
                        "shortTag": "j269",
                        "type": "string"
                    },
                    "LastDateForReturns": {
                        "shortTag": "j387",
                        "type": "string"
                    },
                    "ProductAvailability": {
                        "shortTag": "j396",
                        "type": "code",
                        "codeList": 65,
                        "required": true
                    },
                    "NewSupplier": {
                        "shortTag": "newsupplier",
                        "type": "composite",
                        "components": {
                            "SupplierIdentifier": {
                                "shortTag": "supplieridentifier",
                                "type": "composite",
                                "repeatable": true,
                                "components": {
                                    "SupplierIDType": {
                                        "shortTag": "j345",
                                        "type": "code",
                                        "codeList": 92,
                                        "required": true
                                    },
                                    "IDTypeName": {
                                        "shortTag": "b233",
                                        "type": "string"
                                    },
                                    "IDValue": {
                                        "shortTag": "b244",
                                        "type": "string",
                                        "required": true
                                    }
                                }
                            },
                            "SupplierRole": {
                                "shortTag": "j292",
                                "type": "code",
                                "codeList": 93,
                                "required": true
                            },
                            "SupplierName": {
                                "shortTag": "j137",
                                "type": "string"
                            },
                            "TelephoneNumber": {
                                "shortTag": "j270",
                                "type": "string"
                            },
                            "FaxNumber": {
                                "shortTag": "j271",
                                "type": "string"
                            },
                            "EmailAddress": {
                                "shortTag": "j272",
                                "type": "string"
                            }
                        }
                    },
                    "Stock": {
                        "shortTag": "stock",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "OnHand": {
                                "shortTag": "j350",
                                "type": "integer"
                            },
                            "OnOrder": {
                                "shortTag": "j351",
                                "type": "integer"
                            },
                            "CBO": {
                                "shortTag": "j375",
                                "type": "integer"
                            },
                            "LocationIdentifier": {
                                "shortTag": "locationidentifier",
                                "type": "composite",
                                "repeatable": true,
                                "components": {
                                    "LocationIDType": {
                                        "shortTag": "j377",
                                        "type": "code",
                                        "codeList": 94,
                                        "required": true
                                    },
                                    "IDTypeName": {
                                        "shortTag": "b233",
                                        "type": "string"
                                    },
                                    "IDValue": {
                                        "shortTag": "b244",
                                        "type": "string",
                                        "required": true
                                    }
                                }
                            }
                        }
                    },
                    "PackQuantity": {
                        "shortTag": "j145",
                        "type": "integer"
                    },
                    "Price": {
                        "shortTag": "price",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "PriceTypeCode": {
                                "shortTag": "j148",
                                "type": "code",
                                "codeList": 58,
                                "required": true
                            },
                            "PriceQualifier": {
                                "shortTag": "j261",
                                "type": "code",
                                "codeList": 59
                            },
                            "PriceTypeDescription": {
                                "shortTag": "j262",
                                "type": "text"
                            },
                            "PriceAmount": {
                                "shortTag": "j151",
                                "type": "decimal",
                                "required": true
                            },
                            "CurrencyCode": {
                                "shortTag": "j152",
                                "type": "code",
                                "codeList": 96
                            },
                            "PriceStatus": {
                                "shortTag": "j266",
                                "type": "code",
                                "codeList": 61
                            },
                            "MinimumOrderQuantity": {
                                "shortTag": "j263",
                                "type": "integer"
                            },
                            "ClassOfTrade": {
                                "shortTag": "j149",
                                "type": "string"
                            },
                            "DiscountCoded": {
                                "shortTag": "discountcoded",
                                "type": "composite",
                                "repeatable": true,
                                "components": {
                                    "DiscountCodeType": {
                                        "shortTag": "j363",
                                        "type": "code",
                                        "codeList": 100,
                                        "required": true
                                    },
                                    "DiscountCodeTypeName": {
                                        "shortTag": "j378",
                                        "type": "string"
                                    },
                                    "DiscountCode": {
                                        "shortTag": "j364",
                                        "type": "string",
                                        "required": true
                                    }
                                }
                            },
                            "PriceEffectiveFrom": {
                                "shortTag": "j161",
                                "type": "string"
                            },
                            "PriceEffectiveUntil": {
                                "shortTag": "j162",
                                "type": "string"
                            }
                        }
                    },
                    "MarketRepresentation": {
                        "shortTag": "marketrepresentation",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "AgentIdentifier": {
                                "shortTag": "agentidentifier",
                                "type": "composite",
                                "repeatable": true,
                                "components": {
                                    "AgentIDType": {
                                        "shortTag": "j400",
                                        "type": "code",
                                        "codeList": 92,
                                        "required": true
                                    },
                                    "IDTypeName": {
                                        "shortTag": "b233",
                                        "type": "string"
                                    },
                                    "IDValue": {
                                        "shortTag": "b244",
                                        "type": "string",
                                        "required": true
                                    }
                                }
                            },
                            "AgentName": {
                                "shortTag": "j401",
                                "type": "string"
                            },
                            "AgentRole": {
                                "shortTag": "j402",
                                "type": "code",
                                "codeList": 69,
                                "required": true
                            },
                            "MarketCountry": {
                                "shortTag": "j403",
                                "type": "code",
                                "codeList": 91,
                                "repeatable": true
                            },
                            "MarketTerritory": {
                                "shortTag": "j404",
                                "type": "code",
                                "codeList": 49
                            },
                            "MarketRegion": {
                                "shortTag": "j405",
                                "type": "code",
                                "codeList": 47,
                                "repeatable": true
                            },
                            "MarketDate": {
                                "shortTag": "marketdate",
                                "type": "composite",
                                "repeatable": true,
                                "components": {
                                    "MarketDateRole": {
                                        "shortTag": "j408",
                                        "type": "code",
                                        "codeList": 67,
                                        "required": true
                                    },
                                    "DateFormat": {
                                        "shortTag": "j260",
                                        "type": "code",
                                        "codeList": 55
                                    },
                                    "Date": {
                                        "shortTag": "b306",
                                        "type": "string",
                                        "required": true
                                    }
                                }
                            }
                        }
                    },
                    "SalesPromotion": {
                        "shortTag": "salespromotion",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "PromotionType": {
                                "shortTag": "k165",
                                "type": "code",
                                "codeList": 71,
                                "required": true
                            },
                            "PromotionDescription": {
                                "shortTag": "k166",
                                "type": "text"
                            },
                            "PromotionStartDate": {
                                "shortTag": "k167",
                                "type": "string"
                            },
                            "PromotionEndDate": {
                                "shortTag": "k168",
                                "type": "string"
                            }
                        }
                    },
                    "ContainedItem": {
                        "shortTag": "containeditem",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "ISBN": {
                                "shortTag": "b004",
                                "type": "string"
                            },
                            "EAN13": {
                                "shortTag": "b005",
                                "type": "string"
                            },
                            "ProductIdentifier": {
                                "shortTag": "productidentifier",
                                "type": "composite",
                                "repeatable": true,
                                "components": {
                                    "ProductIDType": {
                                        "shortTag": "b221",
                                        "type": "code",
                                        "codeList": 5,
                                        "required": true
                                    },
                                    "IDTypeName": {
                                        "shortTag": "b233",
                                        "type": "string"
                                    },
                                    "IDValue": {
                                        "shortTag": "b244",
                                        "type": "string",
                                        "required": true
                                    }
                                }
                            },
                            "ItemQuantity": {
                                "shortTag": "b015",
                                "type": "integer"
                            }
                        }
                    }
                }
            },
            "MediaFile": {
                "shortTag": "mediafile",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "MediaFileTypeCode": {
                        "shortTag": "f114",
                        "type": "code",
                        "codeList": 38,
                        "required": true
                    },
                    "MediaFileFormatCode": {
                        "shortTag": "f115",
                        "type": "code",
                        "codeList": 39
                    },
                    "MediaFileLinkTypeCode": {
                        "shortTag": "f116",
                        "type": "code",
                        "codeList": 40
                    },
                    "MediaFileLink": {
                        "shortTag": "f117",
                        "type": "string"
                    },
                    "TextWithMediaFile": {
                        "shortTag": "f118",
                        "type": "text"
                    },
                    "DownloadTerms": {
                        "shortTag": "f119",
                        "type": "text"
                    },
                    "MediaFileDate": {
                        "shortTag": "f120",
                        "type": "string"
                    }
                }
            },
            "Imprint": {
                "shortTag": "imprint",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "ImprintIdentifier": {
                        "shortTag": "imprintidentifier",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "ImprintIDType": {
                                "shortTag": "b241",
                                "type": "code",
                                "codeList": 44,
                                "required": true
                            },
                            "IDTypeName": {
                                "shortTag": "b233",
                                "type": "string"
                            },
                            "IDValue": {
                                "shortTag": "b244",
                                "type": "string",
                                "required": true
                            }
                        }
                    },
                    "ImprintName": {
                        "shortTag": "b079",
                        "type": "string"
                    }
                }
            },
            "CopyrightStatement": {
                "shortTag": "copyrightstatement",
                "type": "composite",
                "repeatable": true,
                "components": {
                    "CopyrightYear": {
                        "shortTag": "b087",
                        "type": "string",
                        "required": true
                    },
                    "CopyrightOwner": {
                        "shortTag": "copyrightowner",
                        "type": "composite",
                        "repeatable": true,
                        "components": {
                            "PersonName": {
                                "shortTag": "b036",
                                "type": "string"
                            },
                            "CorporateName": {
                                "shortTag": "b047",
                                "type": "string"
                            }
                        }
                    }
                }
            }
        }
    }
}, {release: '2.1'})