/*
  ONIX 3.0 Tags

  Retrieved from: https://onixedit.com/en-us/products/onixedit/onix-tags
  Converted with Claude.ai
*/
const OnixElements = require('./_elements')

module.exports = new OnixElements({
  "Product": {
    "RecordReference": {
      "shortTag": "a001",
      "required": true
    },
    "NotificationType": {
      "shortTag": "a002",
      "codeList": "1",
      "required": true
    },
    "DeletionText": {
      "shortTag": "a199"
    },
    "RecordSourceType": {
      "shortTag": "a194",
      "codeList": "3"
    },
    "RecordSourceName": {
      "shortTag": "a197"
    },
    "ProductIdentifier": {
      "repeatable": true,
      "components": {
        "ProductIDType": {
          "shortTag": "b221",
          "codeList": "5",
          "required": true
        },
        "IDTypeName": {
          "shortTag": "b233"
        },
        "IDValue": {
          "shortTag": "b244",
          "required": true
        }
      },
      "required": true
    },
    "Barcode": {
      "repeatable": true,
      "components": {
        "BarcodeType": {
          "shortTag": "x312",
          "codeList": "141",
          "required": true
        },
        "PositionOnProduct": {
          "shortTag": "x313",
          "codeList": "142"
        }
      }
    },
    "DescriptiveDetail": {
      "components": {
        "NoCollection":{
          "shortTag": "x411",
          "empty": true
        },
        "ProductComposition": {
          "shortTag": "x314",
          "codeList": "2",
          "required": true
        },
        "ProductForm": {
          "shortTag": "b012",
          "codeList": "150",
          "required": true
        },
        "ProductFormDetail": {
          "shortTag": "b333",
          "codeList": "175"
        },
        "ProductFormFeature": {
          "repeatable": true,
          "components": {
            "ProductFormFeatureType": {
              "shortTag": "b334",
              "codeList": "79",
              "required": true
            },
            "ProductFormFeatureValue": {
              "shortTag": "b335"
            },
            "ProductFormFeatureDescription": {
              "shortTag": "b336"
            }
          }
        },
        "ProductPackaging": {
          "shortTag": "b225",
          "codeList": "80"
        },
        "ProductFormDescription": {
          "shortTag": "b014"
        },
        "TradeCategory": {
          "shortTag": "b384",
          "codeList": "12"
        },
        "PrimaryContentType": {
          "shortTag": "x416",
          "codeList": "81"
        },
        "ProductContentType": {
          "shortTag": "b385",
          "codeList": "81"
        },
        "Measure": {
          "repeatable": true,
          "components": {
            "MeasureType": {
              "shortTag": "x315",
              "codeList": "48",
              "required": true
            },
            "Measurement": {
              "shortTag": "c094",
              "required": true
            },
            "MeasureUnitCode": {
              "shortTag": "c095",
              "codeList": "50",
              "required": true
            }
          }
        },
        "CountryOfManufacture": {
          "shortTag": "x316",
          "codeList": "91"
        },
        "EpubTechnicalProtection": {
          "shortTag": "x317",
          "codeList": "144"
        },
        "EpubUsageConstraint": {
          "repeatable": true,
          "components": {
            "EpubUsageType": {
              "shortTag": "x318",
              "codeList": "145",
              "required": true
            },
            "EpubUsageStatus": {
              "shortTag": "x319",
              "codeList": "146",
              "required": true
            },
            "EpubUsageLimit": {
              "components": {
                "Quantity": {
                  "shortTag": "x320",
                  "required": true
                },
                "EpubUsageUnit": {
                  "shortTag": "x321",
                  "codeList": "147",
                  "required": true
                }
              }
            }
          }
        },
        "MapScale": {
          "shortTag": "b063"
        },
        "ProductClassification": {
          "repeatable": true,
          "components": {
            "ProductClassificationType": {
              "shortTag": "b274",
              "codeList": "9",
              "required": true
            },
            "ProductClassificationCode": {
              "shortTag": "b275",
              "required": true
            },
            "Percent": {
              "shortTag": "b337"
            }
          }
        },
        "ProductPart": {
          "repeatable": true,
          "components": {
            "PrimaryPart": {
              "shortTag": "x457"
            },
            "ProductIdentifier": {
              "components": {
                "ProductIDType": {
                  "shortTag": "b221",
                  "codeList": "5",
                  "required": true
                },
                "IDTypeName": {
                  "shortTag": "b233"
                },
                "IDValue": {
                  "shortTag": "b244",
                  "required": true
                }
              }
            },
            "ProductForm": {
              "shortTag": "b012",
              "codeList": "150",
              "required": true
            },
            "ProductFormDetail": {
              "shortTag": "b333",
              "codeList": "175"
            },
            "NumberOfItemsOfThisForm": {
              "shortTag": "x322"
            },
            "NumberOfCopies": {
              "shortTag": "x323"
            }
          }
        },
        "Collection": {
          "repeatable": true,
          "components": {
            "CollectionType": {
              "shortTag": "x329",
              "codeList": "148",
              "required": true
            },
            "SourceName": {
              "shortTag": "x330"
            },
            "CollectionIdentifier": {
              "repeatable": true,
              "components": {
                "CollectionIDType": {
                  "shortTag": "x344",
                  "codeList": "13",
                  "required": true
                },
                "IDTypeName": {
                  "shortTag": "b233"
                },
                "IDValue": {
                  "shortTag": "b244",
                  "required": true
                }
              }
            },
            "CollectionSequence": {
              "repeatable": true,
              "components": {
                "CollectionSequenceType": {
                  "shortTag": "x479",
                  "codeList": "197",
                  "required": true
                },
                "CollectionSequenceTypeName": {
                  "shortTag": "x480"
                },
                "CollectionSequenceNumber": {
                  "shortTag": "x481",
                  "required": true
                }
              }
            },
            "TitleDetail": {
              "repeatable": true,
              "components": {
                "TitleType": {
                  "shortTag": "b202",
                  "codeList": "15",
                  "required": true
                },
                "TitleElement": {
                  "repeatable": true,
                  "components": {
                    "SequenceNumber": {
                      "shortTag": "b034"
                    },
                    "TitleElementLevel": {
                      "shortTag": "x409",
                      "codeList": "149",
                      "required": true
                    },
                    "PartNumber": {
                      "shortTag": "x410"
                    },
                    "YearOfAnnual": {
                      "shortTag": "b020"
                    },
                    "TitleText": {
                      "shortTag": "b203"
                    },
                    "TitlePrefix": {
                      "shortTag": "b030"
                    },
                    "TitleWithoutPrefix": {
                      "shortTag": "b031"
                    },
                    "Subtitle": {
                      "shortTag": "b029"
                    }
                  }
                },
                "TitleStatement": {
                  "shortTag": "x478"
                }
              }
            }
          }
        },
        "TitleDetail": {
          "repeatable": true,
          "components": {
            "TitleType": {
              "shortTag": "b202",
              "codeList": "15",
              "required": true
            },
            "TitleElement": {
              "repeatable": true,
              "components": {
                "SequenceNumber": {
                  "shortTag": "b034"
                },
                "TitleElementLevel": {
                  "shortTag": "x409",
                  "codeList": "149",
                  "required": true
                },
                "PartNumber": {
                  "shortTag": "x410"
                },
                "YearOfAnnual": {
                  "shortTag": "b020"
                },
                "TitleText": {
                  "shortTag": "b203"
                },
                "TitlePrefix": {
                  "shortTag": "b030"
                },
                "TitleWithoutPrefix": {
                  "shortTag": "b031"
                },
                "Subtitle": {
                  "shortTag": "b029"
                }
              }
            },
            "TitleStatement": {
              "shortTag": "x478"
            }
          }
        },
        "Contributor": {
          "repeatable": true,
          "components":{
            "SequenceNumber": {
              "shortTag": "b034"
            },
            "ContributorRole": {
              "repeatable": true,
              "shortTag": "b035",
              "codeList": "17",
              "required": true
            },
            "FromLanguage": {
              "shortTag": "x412",
              "codeList": "74"
            },
            "ToLanguage": {
              "shortTag": "x413",
              "codeList": "74"
            },
            "NameType": {
              "shortTag": "x414",
              "codeList": "18"
            },
            "NameIdentifier": {
              "repeatable": true,
              "components": {
                "NameIDType": {
                  "shortTag": "x415",
                  "codeList": "44",
                  "required": true
                },
                "IDTypeName": {
                  "shortTag": "b233"
                },
                "IDValue": {
                  "shortTag": "b244",
                  "required": true
                }
              }
            },
            "PersonName": {
              "shortTag": "b036"
            },
            "PersonNameInverted": {
              "shortTag": "b037"
            },
            "TitlesBeforeNames": {
              "shortTag": "b038"
            },
            "NamesBeforeKey": {
              "shortTag": "b039"
            },
            "PrefixToKey": {
              "shortTag": "b247"
            },
            "KeyNames": {
              "shortTag": "b040"
            },
            "SuffixToKey": {
              "shortTag": "b248"
            },
            "LettersAfterNames": {
              "shortTag": "b042"
            },
            "CorporateName": {
              "shortTag": "b047"
            },
            "UnnamedPersons": {
              "shortTag": "b249",
              "codeList": "19"
            },
            "AlternativeName": {
              "repeatable": true,
              "components": {
                "NameType": {
                  "shortTag": "x414",
                  "codeList": "18",
                  "required": true
                },
                "TitlesBeforeNames": {
                  "shortTag": "b038"
                },
                "NamesBeforeKey": {
                  "shortTag": "b039"
                },
                "PrefixToKey": {
                  "shortTag": "b247"
                },
                "KeyNames": {
                  "shortTag": "b040"
                }
              }
            },
            "ContributorDate": {
              "repeatable": true,
              "components": {
                "ContributorDateRole": {
                  "shortTag": "x417",
                  "codeList": "177",
                  "required": true
                },
                "Date": {
                  "shortTag": "b306",
                  "formatList": "55",
                  "required": true
                }
              }
            },
            "ProfessionalAffiliation": {
              "repeatable": true,
              "components": {
                "ProfessionalPosition": {
                  "shortTag": "b045"
                },
                "Affiliation": {
                  "shortTag": "b046"
                }
              }
            },
            "BiographicalNote": {
              "shortTag": "b044"
            },
            "Website": {
              "repeatable": true,
              "components": {
                "WebsiteRole": {
                  "shortTag": "b367",
                  "codeList": "73"
                },
                "WebsiteDescription": {
                  "shortTag": "b294"
                },
                "WebsiteLink": {
                  "shortTag": "b295",
                  "required": true
                }
              }
            },
            "ContributorDescription": {
              "shortTag": "b048"
            },
            "ContributorPlace": {
              "repeatable": true,
              "components": {
                "ContributorPlaceRelator": {
                  "shortTag": "x418",
                  "codeList": "151",
                  "required": true
                },
                "CountryCode": {
                  "shortTag": "b251",
                  "codeList": "91"
                },
                "RegionCode": {
                  "shortTag": "b398",
                  "codeList": "49"
                }
              }
            }
          }
        },
        "ContributorStatement": {
          "shortTag": "b049"
        },
        "Event": {
          "repeatable": true,
          "components": {
            "EventRole": {
              "shortTag": "x515",
              "codeList": "20",
              "required": true
            },
            "EventName": {
              "shortTag": "x516",
              "required": true
            },
            "EventAcronym": {
              "shortTag": "x517"
            },
            "EventNumber": {
              "shortTag": "x518"
            },
            "EventTheme": {
              "shortTag": "x519"
            },
            "EventDate": {
              "shortTag": "x520"
            },
            "EventPlace": {
              "shortTag": "x521"
            }
          }
        },
        "EditionType": {
          "shortTag": "x419",
          "codeList": "21"
        },
        "EditionNumber": {
          "shortTag": "b057"
        },
        "EditionStatement": {
          "shortTag": "b058"
        },
        "ReligiousText": {
          "components": {
            "Bible": {
              "components": {
                "BibleContents": {
                  "shortTag": "b352",
                  "codeList": "82"
                },
                "BibleVersion": {
                  "shortTag": "b353",
                  "codeList": "83"
                },
                "StudyBibleType": {
                  "shortTag": "b389",
                  "codeList": "84"
                },
                "BiblePurpose": {
                  "shortTag": "b354",
                  "codeList": "85"
                },
                "BibleTextOrganization": {
                  "shortTag": "b355",
                  "codeList": "86"
                },
                "BibleReferenceLocation": {
                  "shortTag": "b356",
                  "codeList": "87"
                },
                "BibleTextFeature": {
                  "shortTag": "b357",
                  "codeList": "97"
                }
              }
            },
            "ReligiousTextFeature": {
              "repeatable": true,
              "components": {
                "ReligiousTextFeatureType": {
                  "shortTag": "b358",
                  "codeList": "89",
                  "required": true
                },
                "ReligiousTextFeatureCode": {
                  "shortTag": "b359",
                  "codeList": "90"
                },
                "ReligiousTextFeatureDescription": {
                  "shortTag": "b360"
                }
              }
            }
          }
        },
        "Language": {
          "repeatable": true,
          "components": {
            "LanguageRole": {
              "shortTag": "b253",
              "codeList": "22",
              "required": true
            },
            "LanguageCode": {
              "shortTag": "b252",
              "codeList": "74",
              "required": true
            }
          }
        },
        "Extent": {
          "repeatable": true,
          "components": {
            "ExtentType": {
              "shortTag": "b218",
              "codeList": "23",
              "required": true
            },
            "ExtentValue": {
              "shortTag": "b219",
              "required": true
            },
            "ExtentUnit": {
              "shortTag": "b220",
              "codeList": "24",
              "required": true
            }
          }
        },
        "NumberOfIllustrations": {
          "shortTag": "b125"
        },
        "IllustrationsNote": {
          "shortTag": "b062"
        },
        "AncillaryContent": {
          "repeatable": true,
          "components": {
            "AncillaryContentType": {
              "shortTag": "x423",
              "codeList": "25",
              "required": true
            },
            "AncillaryContentDescription": {
              "shortTag": "x424"
            },
            "Number": {
              "shortTag": "b257"
            }
          }
        },
        "Subject": {
          "repeatable": true,
          "components": {
            "MainSubject": {
              "shortTag": "x425",
              "empty": true
            },
            "SubjectSchemeIdentifier": {
              "shortTag": "b067",
              "codeList": "27",
              "required": true
            },
            "SubjectSchemeName": {
              "shortTag": "b171"
            },
            "SubjectSchemeVersion": {
              "shortTag": "b068"
            },
            "SubjectCode": {
              "shortTag": "b069"
            },
            "SubjectHeadingText": {
              "shortTag": "b070"
            }
          }
        },
        "AudienceCode": {
          "_deprecated": true,
          "shortTag": "b073",
          "codeList": "28"
        },
        "Audience": {
          "repeatable": true,
          "components": {
            "AudienceCodeType": {
              "shortTag": "b204",
              "codeList": "29",
              "required": true
            },
            "AudienceCodeTypeName": {
              "shortTag": "b205"
            },
            "AudienceCodeValue": {
              "shortTag": "b206",
              "required": true
            }
          }
        },
        "AudienceRange": {
          "repeatable": true,
          "components": {
            "AudienceRangeQualifier": {
              "shortTag": "b074",
              "codeList": "30",
              "required": true
            },
            "AudienceRangePrecision1": {
              "shortTag": "b075",
              "codeList": "31",
              "required": true
            },
            "AudienceRangeValue1": {
              "shortTag": "b076",
              "required": true
            },
            "AudienceRangePrecision2": {
              "shortTag": "b075",
              "codeList": "31"
            },
            "AudienceRangeValue2": {
              "shortTag": "b076"
            }
          }
        },
        "AudienceDescription": {
          "shortTag": "b207"
        },
        "Complexity": {
          "repeatable": true,
          "components": {
            "ComplexitySchemeIdentifier": {
              "shortTag": "b077",
              "codeList": "32",
              "required": true
            },
            "ComplexityCode": {
              "shortTag": "b078",
              "required": true
            }
          }
        }
      }
    },
    "CollateralDetail": {
      "components": {
        "TextContent": {
          "repeatable": true,
          "components": {
            "TextType": {
              "shortTag": "x426",
              "codeList": "153",
              "required": true
            },
            "ContentAudience": {
              "shortTag": "x427",
              "codeList": "154",
              "required": true
            },
            "Text": {
              "shortTag": "d104",
              "formatList": "34",
              "required": true
            },
            "ReviewRating": {
              "components": {
                "Rating": {
                  "shortTag": "x525",
                  "required": true
                },
                "RatingLimit": {
                  "shortTag": "x526",
                  "required": true
                },
                "RatingUnits": {
                  "shortTag": "x527"
                }
              }
            },
            "TextAuthor": {
              "shortTag": "d107"
            },
            "TextSourceCorporate": {
              "shortTag": "b374"
            },
            "SourceTitle": {
              "shortTag": "x428"
            },
            "ContentDate": {
              "repeatable": true,
              "components": {
                "ContentDateRole": {
                  "shortTag": "x429",
                  "codeList": "155",
                  "required": true
                },
                "Date": {
                  "shortTag": "b306",
                  "formatList": "55",
                  "required": true
                }
              }
            }
          }
        },
        "CitedContent": {
          "repeatable": true,
          "components": {
            "CitedContentType": {
              "shortTag": "x430",
              "codeList": "156",
              "required": true
            },
            "ContentAudience": {
              "shortTag": "x427",
              "codeList": "154",
              "required": true
            },
            "SourceType": {
              "shortTag": "x431",
              "codeList": "157"
            },
            "SourceTitle": {
              "shortTag": "x428"
            },
            "ListName": {
              "shortTag": "x432"
            },
            "PositionOnList": {
              "shortTag": "x433"
            },
            "CitationNote": {
              "shortTag": "x434"
            },
            "ResourceLink": {
              "shortTag": "x435"
            },
            "ContentDate": {
              "repeatable": true,
              "components": {
                "ContentDateRole": {
                  "shortTag": "x429",
                  "codeList": "155",
                  "required": true
                },
                "Date": {
                  "shortTag": "b306",
                  "formatList": "55",
                  "required": true
                }
              }
            }
          }
        },
        "SupportingResource": {
          "repeatable": true,
          "components": {
            "ResourceContentType": {
              "shortTag": "x436",
              "codeList": "158",
              "required": true
            },
            "ContentAudience": {
              "shortTag": "x427",
              "codeList": "154",
              "required": true
            },
            "ResourceMode": {
              "shortTag": "x437",
              "codeList": "159",
              "required": true
            },
            "ResourceFeature": {
              "repeatable": true,
              "components": {
                "ResourceFeatureType": {
                  "shortTag": "x438",
                  "codeList": "160",
                  "required": true
                },
                "FeatureValue": {
                  "shortTag": "x439"
                },
                "FeatureNote": {
                  "shortTag": "x440"
                }
              }
            },
            "ResourceVersion": {
              "repeatable": true,
              "components": {
                "ResourceForm": {
                  "shortTag": "x441",
                  "codeList": "161",
                  "required": true
                },
                "ResourceVersionFeature": {
                  "repeatable": true,
                  "components": {
                    "ResourceVersionFeatureType": {
                      "shortTag": "x442",
                      "codeList": "162",
                      "required": true
                    },
                    "FeatureValue": {
                      "shortTag": "x439"
                    },
                    "FeatureNote": {
                      "shortTag": "x440"
                    }
                  }
                },
                "ResourceLink": {
                  "shortTag": "x435",
                  "required": true
                },
                "ContentDate": {
                  "repeatable": true,
                  "components": {
                    "ContentDateRole": {
                      "shortTag": "x429",
                      "codeList": "155",
                      "required": true
                    },
                    "Date": {
                      "shortTag": "b306",
                      "formatList": "55",
                      "required": true
                    }
                  }
                }
              }
            }
          }
        },
        "Prize": {
          "repeatable": true,
          "components": {
            "PrizeName": {
              "shortTag": "g126",
              "required": true
            },
            "PrizeYear": {
              "shortTag": "g127"
            },
            "PrizeCountry": {
              "shortTag": "g128",
              "codeList": "91"
            },
            "PrizeCode": {
              "shortTag": "g129",
              "codeList": "41"
            },
            "PrizeStatement": {
              "shortTag": "x503"
            },
            "PrizeJury": {
              "shortTag": "g343"
            }
          }
        }
      }
    },
    "PublishingDetail": {
      "components": {
        "Imprint": {
          "components": {
            "ImprintIdentifier": {
              "repeatable": true,
              "components": {
                "ImprintIDType": {
                  "shortTag": "x445",
                  "codeList": "44",
                  "required": true
                },
                "IDTypeName": {
                  "shortTag": "b233"
                },
                "IDValue": {
                  "shortTag": "b244",
                  "required": true
                }
              }
            },
            "ImprintName": {
              "shortTag": "b079"
            }
          }
        },
        "Publisher": {
          "repeatable": true,
          "components": {
            "PublishingRole": {
              "shortTag": "b291",
              "codeList": "45",
              "required": true
            },
            "PublisherIdentifier": {
              "repeatable": true,
              "components": {
                "PublisherIDType": {
                  "shortTag": "x447",
                  "codeList": "44",
                  "required": true
                },
                "IDTypeName": {
                  "shortTag": "b233"
                },
                "IDValue": {
                  "shortTag": "b244",
                  "required": true
                }
              }
            },
            "PublisherName": {
              "shortTag": "b081"
            },
            "Website": {
              "repeatable": true,
              "components": {
                "WebsiteRole": {
                  "shortTag": "b367",
                  "codeList": "73"
                },
                "WebsiteDescription": {
                  "shortTag": "b294"
                },
                "WebsiteLink": {
                  "shortTag": "b295",
                  "required": true
                }
              }
            }
          }
        },
        "CityOfPublication": {
          "shortTag": "b209"
        },
        "CountryOfPublication": {
          "shortTag": "b083",
          "codeList": "91"
        },
        "PublishingStatus": {
          "shortTag": "b394",
          "codeList": "64"
        },
        "PublishingStatusNote": {
          "shortTag": "b395"
        },
        "PublishingDate": {
          "repeatable": true,
          "components": {
            "PublishingDateRole": {
              "shortTag": "x448",
              "codeList": "163",
              "required": true
            },
            "Date": {
              "shortTag": "b306",
              "formatList": "55",
              "required": true
            }
          }
        },
        "LatestReprintNumber": {
          "shortTag": "x446"
        },
        "CopyrightStatement": {
          "repeatable": true,
          "components": {
            "CopyrightType": {
              "shortTag": "x512",
              "codeList": "219"
            },
            "CopyrightYear": {
              "shortTag": "b087",
              "required": true
            },
            "CopyrightOwner": {
              "repeatable": true,
              "components": {
                "CopyrightOwnerIdentifier": {
                  "repeatable": true,
                  "components": {
                    "CopyrightOwnerIDType": {
                      "shortTag": "b392",
                      "codeList": "44"
                    },
                    "IDTypeName": {
                      "shortTag": "b233"
                    },
                    "IDValue": {
                      "shortTag": "b244"
                    }
                  }
                },
                "PersonName": {
                  "shortTag": "b036"
                },
                "CorporateName": {
                  "shortTag": "b047"
                }
              }
            }
          }
        },
        "SalesRights": {
          "repeatable": true,
          "components": {
            "SalesRightsType": {
              "shortTag": "b089",
              "codeList": "46"
            },
            "Territory": {
              "components": {
                "CountriesIncluded": {
                  "shortTag": "x449",
                  "codeList": "dt.CountryCode"
                },
                "RegionsIncluded": {
                  "shortTag": "x450",
                  "codeList": "dt.RegionCode"
                },
                "CountriesExcluded": {
                  "shortTag": "x451",
                  "codeList": "dt.CountryCode"
                },
                "RegionsExcluded": {
                  "shortTag": "x452",
                  "codeList": "dt.RegionCode"
                }
              }
            },
            "SalesRestriction": {
              "repeatable": true,
              "components": {
                "SalesRestrictionType": {
                  "shortTag": "b381",
                  "codeList": "71"
                },
                "SalesOutlet": {
                  "repeatable": true,
                  "components": {
                    "SalesOutletIdentifier": {
                      "repeatable": true,
                      "components": {
                        "SalesOutletIDType": {
          "WorkIDType": {
            "shortTag": "b201",
            "codeList": "16"
          },
          "IDTypeName": {
            "shortTag": "b233"
          },
          "IDValue": {
            "shortTag": "b244"
          }
        }
        }
      },
      "RelatedProduct": {
        "repeatable": true,
        "components": {
          "ProductRelationCode": {
            "shortTag": "x455",
            "codeList": "51"
          },
          "ProductIdentifier": {
            "ProductIDType": {
              "shortTag": "b221",
              "codeList": "5"
            },
            "IDTypeName": {
              "shortTag": "b233"
            },
            "IDValue": {
              "shortTag": "b244"
            }
          },
          "ProductForm": {
            "shortTag": "b012",
            "codeList": "150"
          },
          "ProductFormDetail": {
            "shortTag": "b333",
            "codeList": "175"
          }
        }
      }
    },
    "ProductionDetail": {
      "ProductionManifest": {
        "ProductIdentifier": {
          "ProductIDType": {
            "shortTag": "b221",
            "codeList": "5"
          },
          "IDTypeName": {
            "shortTag": "b233"
          },
          "IDValue": {
            "shortTag": "b244"
          }
        },
        "CoverManifest": {
          "SpecificationDetail": {
            "shortTag": "x560",
            "codeList": "248"
          },
          "SpecificationFeature": {
            "SpecificationFeatureType": {
              "shortTag": "x561",
              "codeList": "249"
            },
            "SpecificationFeatureValue": {
              "shortTag": "x562"
            },
            "SpecificationFeatureDescription": {
              "shortTag": "x563"
            }
          },
          "CoverResource": {
            "SequenceNumber": {
              "shortTag": "b034"
            },
            "ResourceFileLink": {
              "shortTag": "x572"
            }
          }
        },
        "BodyManifest": {
          "SpecificationDetail": {
            "shortTag": "x560",
            "codeList": "248"
          },
          "SpecificationFeature": {
            "SpecificationFeatureType": {
              "shortTag": "x561",
              "codeList": "249"
            },
            "SpecificationFeatureValue": {
              "shortTag": "x562"
            },
            "SpecificationFeatureDescription": {
              "shortTag": "x563"
            }
          },
          "BodyResource": {
            "SequenceNumber": {
              "shortTag": "b034"
            },
            "ResourceFileLink": {
              "shortTag": "x572"
            }
          }
        }
      }
    },
    "ProductSupply": {
      "Market": {
        "Territory": {
          "CountriesIncluded": {
            "shortTag": "x449",
            "codeList": "dt.CountryCode"
          },
          "RegionsIncluded": {
            "shortTag": "x450",
            "codeList": "dt.RegionCode"
          },
          "CountriesExcluded": {
            "shortTag": "x451",
            "codeList": "dt.CountryCode"
          },
          "RegionsExcluded": {
            "shortTag": "x452",
            "codeList": "dt.RegionCode"
          }
        },
        "SalesRestriction": {
          "SalesRestrictionType": {
            "shortTag": "b381",
            "codeList": "71"
          },
          "SalesOutlet": {
            "SalesOutletIdentifier": {
              "SalesOutletIDType": {
                "shortTag": "b393",
                "codeList": "102"
              },
              "IDTypeName": {
                "shortTag": "b233"
              },
              "IDValue": {
                "shortTag": "b244"
              }
            },
            "SalesOutletName": {
              "shortTag": "b382"
            }
          },
          "SalesRestrictionNote": {
            "shortTag": "x453"
          },
          "StartDate": {
            "shortTag": "b324"
          },
          "EndDate": {
            "shortTag": "b325"
          }
        }
      },
      "MarketPublishingDetail": {
        "PublisherRepresentative": {
          "AgentRole": {
            "shortTag": "j402",
            "codeList": "69"
          },
          "AgentIdentifier": {
            "AgentIDType": {
              "shortTag": "j400",
              "codeList": "92"
            },
            "IDTypeName": {
              "shortTag": "b233"
            },
            "IDValue": {
              "shortTag": "b244"
            }
          },
          "AgentName": {
            "shortTag": "j401"
          }
        },
        "ProductContact": {
          "ProductContactRole": {
            "shortTag": "x482",
            "codeList": "198"
          },
          "ProductContactIdentifier": {
            "ProductContactIDType": {
              "shortTag": "x483",
              "codeList": "44"
            },
            "IDTypeName": {
              "shortTag": "b233"
            },
            "IDValue": {
              "shortTag": "b244"
            }
          },
          "ProductContactName": {
            "shortTag": "x484"
          },
          "ContactName": {
            "shortTag": "x299"
          },
          "EmailAddress": {
            "shortTag": "j272"
          }
        },
        "MarketPublishingStatus": {
          "shortTag": "j407",
          "codeList": "68"
        },
        "MarketDate": {
          "MarketDateRole": {
            "shortTag": "j408",
            "codeList": "163"
          },
          "Date": {
            "shortTag": "b306",
            "formatList": "55"
          }
        },
        "PromotionCampaign": {
          "shortTag": "k165"
        },
        "PromotionContact": {
          "shortTag": "k166"
        },
        "InitialPrintRun": {
          "shortTag": "k167"
        }
      },
      "SupplyDetail": {
        "Supplier": {
          "SupplierRole": {
            "shortTag": "j292",
            "codeList": "93"
          },
          "SupplierIdentifier": {
            "SupplierIDType": {
              "shortTag": "j345",
              "codeList": "92"
            },
            "IDTypeName": {
              "shortTag": "b233"
            },
            "IDValue": {
              "shortTag": "b244"
            }
          },
          "SupplierName": {
            "shortTag": "j137"
          },
          "TelephoneNumber": {
            "shortTag": "j270"
          },
          "FaxNumber": {
            "shortTag": "j271"
          },
          "EmailAddress": {
            "shortTag": "j272"
          }
        },
        "ReturnsConditions": {
          "ReturnsCodeType": {
            "shortTag": "j268",
            "codeList": "53"
          },
          "ReturnsCodeTypeName": {
            "shortTag": "x460"
          },
          "ReturnsCode": {
            "shortTag": "j269"
          }
        },
        "ProductAvailability": {
          "shortTag": "j396",
          "codeList": "65"
        },
        "SupplyDate": {
          "repeatable": true,
          "components": {
            "SupplyDateRole": {
              "shortTag": "x461",
              "codeList": "166"
            },
            "Date": {
              "shortTag": "b306",
              "formatList": "55"
            }
          }
        },
        "OrderTime": {
          "shortTag": "j144"
        },
        "NewSupplier": {
          "SupplierIdentifier": {
            "SupplierIDType": {
              "shortTag": "j345",
              "codeList": "92"
            },
            "IDTypeName": {
              "shortTag": "b233"
            },
            "IDValue": {
              "shortTag": "b244"
            }
          },
          "SupplierName": {
            "shortTag": "j137"
          },
          "TelephoneNumber": {
            "shortTag": "j270"
          },
          "FaxNumber": {
            "shortTag": "j271"
          },
          "EmailAddress": {
            "shortTag": "j272"
          }
        },
        "Stock": {
          "LocationName": {
            "shortTag": "j349"
          },
          "OnHand": {
            "shortTag": "j350"
          },
          "OnOrder": {
            "shortTag": "j351"
          },
          "CBO": {
            "shortTag": "j375"
          }
        },
        "PackQuantity": {
          "shortTag": "j145"
        },
        "UnpricedItemType": {
          "shortTag": "j192",
          "codeList": "57"
        },
        "Price": {
          "PriceIdentifier": {
            "PriceIDType": {
              "shortTag": "x506",
              "codeList": "217"
            },
            "IDTypeName": {
              "shortTag": "b233"
            },
            "IDValue": {
              "shortTag": "b244"
            }
          },
          "PriceType": {
            "shortTag": "x462",
            "codeList": "58"
          },
          "PriceQualifier": {
            "shortTag": "j261",
            "codeList": "59"
          },
          "PriceConstraint": {
            "PriceConstraintType": {
              "shortTag": "x529",
              "codeList": "230"
            },
            "PriceConstraintStatus": {
              "shortTag": "x530",
              "codeList": "146"
            },
            "PriceConstraintLimit": {
              "Quantity": {
                "shortTag": "x320"
              },
              "PriceConstraintUnit": {
                "shortTag": "x531",
                "codeList": "147"
              }
            }
          },
          "PriceTypeDescription": {
            "shortTag": "j262"
          },
          "PriceCondition": {
            "PriceConditionType": {
              "shortTag": "x463",
              "codeList": "167"
            },
            "PriceConditionQuantity": {
              "PriceConditionQuantityType": {
                "shortTag": "x464",
                "codeList": "168"
              },
              "Quantity": {
                "shortTag": "x320"
              },
              "QuantityUnit": {
                "shortTag": "x466",
                "codeList": "169"
              }
            },
            "ProductIdentifier": {
              "ProductIDType": {
                "shortTag": "b221",
                "codeList": "5"
              },
              "IDTypeName": {
                "shortTag": "b233"
              },
              "IDValue": {
                "shortTag": "b244"
              }
            }
          },
          "DiscountCoded": {
            "DiscountCodeType": {
              "shortTag": "j363",
              "codeList": "100"
            },
            "DiscountCodeTypeName": {
              "shortTag": "j378"
            },
            "DiscountCode": {
              "shortTag": "j364"
            }
          },
          "Discount": {
            "DiscountType": {
              "shortTag": "x467",
              "codeList": "170"
            },
            "Quantity": {
              "shortTag": "x320"
            },
            "DiscountPercent": {
              "shortTag": "j267"
            },
            "DiscountAmount": {
              "shortTag": "x469"
            }
          },
          "PriceStatus": {
            "shortTag": "j266",
            "codeList": "61"
          },
          "PriceAmount": {
            "shortTag": "j151"
          },
          "Tax": {
            "TaxType": {
              "shortTag": "x470",
              "codeList": "171"
            },
            "TaxRateCode": {
              "shortTag": "x471",
              "codeList": "62"
            },
            "TaxRatePercent": {
              "shortTag": "x472"
            },
            "TaxableAmount": {
              "shortTag": "x473"
            },
            "TaxAmount": {
              "shortTag": "x474"
            }
          },
          "CurrencyCode": {
            "shortTag": "j152",
            "codeList": "96"
          },
          "Territory": {
            "CountriesIncluded": {
              "shortTag": "x449",
              "codeList": "dt.CountryCode"
            },
            "RegionsIncluded": {
              "shortTag": "x450",
              "codeList": "dt.RegionCode"
            },
            "CountriesExcluded": {
              "shortTag": "x451",
              "codeList": "dt.CountryCode"
            },
            "RegionsExcluded": {
              "shortTag": "x452",
              "codeList": "dt.RegionCode"
            }
          },
          "PriceDate": {
            "repeatable": true,
            "components": {
              "PriceDateRole": {
                "shortTag": "x476",
                "codeList": "173"
              },
              "Date": {
                "shortTag": "b306",
                  "formatList": "55"
              }
            }
          }
        }
      }
    }
  }
}}}}}}}}, {release: '3.0'})