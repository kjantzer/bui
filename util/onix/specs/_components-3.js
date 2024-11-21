module.exports = {
    "Addressee": {
      "reference": "PR.3",
      "shortTag": "addressee",
      "components": {
        "AddresseeName": {
          "shortTag": "m380",
          "type": "string",
          "required": true
        },
        "AddresseeIdentifier": {
          "shortTag": "addresseeidentifier",
          "type": "composite",
          "repeatable": true,
          "components": {
            "AddresseeIDType": {
              "shortTag": "m380",
              "type": "code",
              "codeList": 44,
              "required": true
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
    "Affiliation": {
      "reference": "P.7.14",
      "shortTag": "affiliation",
      "components": {
        "AffiliationName": {
          "shortTag": "x419",
          "type": "string",
          "required": true
        },
        "ProfessionalPosition": {
          "shortTag": "x418",
          "type": "string"
        }
      }
    },
    "AlternativeName": {
      "reference": "P.7.15",
      "shortTag": "alternativename",
      "components": {
        "NameType": {
          "shortTag": "x415",
          "type": "code",
          "codeList": 18,
          "required": true
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
        }
      }
    },
    "AncillaryContent": {
      "reference": "P.16",
      "shortTag": "ancillarycontent",
      "components": {
        "AncillaryContentType": {
          "shortTag": "x423",
          "type": "code",
          "codeList": 196,
          "required": true
        },
        "AncillaryContentDescription": {
          "shortTag": "x424",
          "type": "text",
          "repeatable": true
        },
        "Number": {
          "shortTag": "b257",
          "type": "integer"
        }
      }
    },
    "Audience": {
      "reference": "P.13",
      "shortTag": "audience",
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
        }
      }
    },
    "AudienceRange": {
      "reference": "P.13.1",
      "shortTag": "audiencerange",
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
    "BatchBonus": {
      "reference": "P.26.17",
      "shortTag": "batchbonus",
      "components": {
        "BatchQuantity": {
          "shortTag": "j264",
          "type": "integer",
          "required": true
        },
        "FreeQuantity": {
          "shortTag": "j265",
          "type": "integer",
          "required": true
        }
      }
    },
    "Bible": {
      "reference": "P.14",
      "shortTag": "bible",
      "components": {
        "BibleContents": {
          "shortTag": "b352",
          "type": "code",
          "codeList": 82,
          "repeatable": true
        },
        "BibleVersion": {
          "shortTag": "b353",
          "type": "string",
          "repeatable": true
        },
        "StudyBibleType": {
          "shortTag": "b389",
          "type": "code",
          "codeList": 84
        },
        "BiblePurpose": {
          "shortTag": "b354",
          "type": "code",
          "codeList": 85,
          "repeatable": true
        },
        "BibleTextOrganization": {
          "shortTag": "b355",
          "type": "code",
          "codeList": 86
        },
        "BibleReferenceLocation": {
          "shortTag": "b356",
          "type": "code",
          "codeList": 87
        },
        "BibleTextFeature": {
          "shortTag": "b357",
          "type": "code",
          "codeList": 97,
          "repeatable": true
        }
      }
    },
    "Collection": {
      "reference": "P.5",
      "shortTag": "collection",
      "components": {
        "CollectionType": {
          "shortTag": "x329",
          "type": "code",
          "codeList": 148,
          "required": true
        },
        "CollectionIdentifier": {
          "shortTag": "collectionidentifier",
          "type": "composite",
          "repeatable": true,
          "components": {
            "CollectionIDType": {
              "shortTag": "x344",
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
        "TitleDetail": {
          "shortTag": "titledetail",
          "type": "composite",
          "repeatable": true,
          "components": {
            "TitleType": {
              "shortTag": "b202",
              "type": "code",
              "codeList": 15,
              "required": true
            },
            "TitleElement": {
              "shortTag": "titleelement",
              "type": "composite",
              "repeatable": true,
              "required": true,
              "components": {
                "TitleElementLevel": {
                  "shortTag": "x409",
                  "type": "code",
                  "codeList": 149,
                  "required": true
                },
                "PartNumber": {
                  "shortTag": "x410",
                  "type": "string"
                },
                "TitlePrefix": {
                  "shortTag": "b030",
                  "type": "string"
                },
                "TitleWithoutPrefix": {
                  "shortTag": "b031",
                  "type": "string"
                },
                "TitleText": {
                  "shortTag": "b203",
                  "type": "string"
                },
                "Subtitle": {
                  "shortTag": "b029",
                  "type": "string"
                }
              }
            }
          }
        },
        "Contributor": {
          "shortTag": "contributor",
          "type": "composite",
          "repeatable": true,
          "components": {
            "ContributorRole": {
              "shortTag": "b035",
              "type": "code",
              "codeList": 17,
              "repeatable": true,
              "required": true
            },
            "NameIdentifier": {
              "shortTag": "nameidentifier",
              "type": "composite",
              "repeatable": true,
              "components": {
                "NameIDType": {
                  "shortTag": "x415",
                  "type": "code",
                  "codeList": 44,
                  "required": true
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
            "CorporateName": {
              "shortTag": "b047",
              "type": "string"
            }
          }
        }
      }
    },
    "CollectionSequence": {
      "reference": "P.5.1",
      "shortTag": "collectionsequence",
      "components": {
        "CollectionSequenceType": {
          "shortTag": "x479",
          "type": "code",
          "codeList": 197,
          "required": true
        },
        "CollectionSequenceTypeName": {
          "shortTag": "x480",
          "type": "string"
        },
        "CollectionSequenceNumber": {
          "shortTag": "x481",
          "type": "string"
        }
      }
    },
    "Conference": {
      "reference": "P.17",
      "shortTag": "conference",
      "components": {
        "ConferenceRole": {
          "shortTag": "b051",
          "type": "code",
          "codeList": 20
        },
        "ConferenceName": {
          "shortTag": "b052",
          "type": "string",
          "required": true
        },
        "ConferenceNumber": {
          "shortTag": "b053",
          "type": "string"
        },
        "ConferenceTheme": {
          "shortTag": "b054",
          "type": "string"
        },
        "ConferenceDate": {
          "shortTag": "b055",
          "type": "string"
        },
        "ConferencePlace": {
          "shortTag": "b056",
          "type": "string"
        }
      }
    },
    "ContentDetail": {
      "reference": "P.15",
      "shortTag": "contentdetail",
      "components": {
        "ContentItem": {
          "shortTag": "contentitem",
          "type": "composite",
          "repeatable": true,
          "components": {
            "TextType": {
              "shortTag": "x426",
              "type": "code",
              "codeList": 153,
              "required": true
            },
            "Text": {
              "shortTag": "d104",
              "type": "text",
              "required": true
            }
          }
        }
      }
    },
    "Contributor": {
      "reference": "P.7",
      "shortTag": "contributor",
      "components": {
        "ContributorRole": {
          "shortTag": "b035",
          "type": "code",
          "codeList": 17,
          "repeatable": true,
          "required": true
        },
        "NameIdentifier": {
          "shortTag": "nameidentifier",
          "type": "composite",
          "repeatable": true,
          "components": {
            "NameIDType": {
              "shortTag": "x415",
              "type": "code",
              "codeList": 44,
              "required": true
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
          "type": "text",
          "repeatable": true
        }
      }
    },
    "CopyrightStatement": {
      "reference": "P.11",
      "shortTag": "copyrightstatement",
      "components": {
        "CopyrightYear": {
          "shortTag": "b087",
          "type": "string",
          "repeatable": true
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
    },
    "DescriptiveDetail": {
      "reference": "P.3",
      "shortTag": "descriptivedetail",
      "components": {
        "ProductComposition": {
          "shortTag": "x314",
          "type": "code",
          "codeList": 2,
          "required": true
        },
        "ProductForm": {
          "shortTag": "b012",
          "type": "code",
          "codeList": 150,
          "required": true
        },
        "ProductFormDetail": {
          "shortTag": "b333",
          "type": "code",
          "codeList": 175,
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
          "codeList": 7,
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
        "NominatedSourceFiletype": {
          "shortTag": "x427",
          "type": "code",
          "codeList": 220,
          "repeatable": true
        },
        "PrimaryContentType": {
          "shortTag": "x416",
          "type": "code",
          "codeList": 81
        },
        "ProductContentType": {
          "shortTag": "b385",
          "type": "code",
          "codeList": 81,
          "repeatable": true
        },
        "Measure": {
          "shortTag": "measure",
          "type": "composite",
          "repeatable": true,
          "components": {
            "MeasureType": {
              "shortTag": "x315",
              "type": "code",
              "codeList": 48,
              "required": true
            },
            "Measurement": {
              "shortTag": "c094",
              "type": "decimal",
              "required": true
            },
            "MeasureUnitCode": {
              "shortTag": "c095",
              "type": "code",
              "codeList": 50,
              "required": true
            }
          }
        },
        "Collection": {
          "shortTag": "collection",
          "type": "composite",
          "repeatable": true
        },
        "TitleDetail": {
          "shortTag": "titledetail",
          "type": "composite",
          "repeatable": true
        },
        "Contributor": {
          "shortTag": "contributor",
          "type": "composite",
          "repeatable": true
        },
        "EditionNumber": {
          "shortTag": "b057",
          "type": "integer"
        },
        "EditionStatement": {
          "shortTag": "b058",
          "type": "text"
        },
        "NoEdition": {
          "shortTag": "n386",
          "type": "empty"
        },
        "Language": {
          "shortTag": "language",
          "type": "composite",
          "repeatable": true
        },
        "Extent": {
          "shortTag": "extent",
          "type": "composite",
          "repeatable": true
        },
        "Subject": {
          "shortTag": "subject",
          "type": "composite",
          "repeatable": true
        },
        "Audience": {
          "shortTag": "audience",
          "type": "composite",
          "repeatable": true
        },
        "AudienceRange": {
          "shortTag": "audiencerange",
          "type": "composite",
          "repeatable": true
        }
      }
    },
    "EpubLicense": {
      "reference": "P.21.2",
      "shortTag": "epublicense",
      "components": {
        "EpubLicenseName": {
          "shortTag": "x512",
          "type": "string"
        },
        "EpubLicenseExpression": {
          "shortTag": "epublicenseexpression",
          "type": "composite",
          "repeatable": true,
          "components": {
            "EpubLicenseExpressionType": {
              "shortTag": "x508",
              "type": "code",
              "codeList": 219,
              "required": true
            },
            "EpubLicenseExpressionLink": {
              "shortTag": "x509",
              "type": "string"
            },
            "EpubLicenseExpressionTypeName": {
              "shortTag": "x510",
              "type": "string"
            }
          }
        }
      }
    },
    "MarketDate": {
      "reference": "P.25.4",
      "shortTag": "marketdate",
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
    },
    "MarketPublishingDetail": {
      "reference": "P.25",
      "shortTag": "marketpublishingdetail",
      "components": {
        "MarketPublishingStatus": {
          "shortTag": "j407",
          "type": "code",
          "codeList": 68,
          "required": true
        },
        "MarketDate": {
          "shortTag": "marketdate",
          "type": "composite",
          "repeatable": true
        },
        "MarketRestriction": {
          "shortTag": "marketrestriction",
          "type": "composite"
        }
      }
    },
    "Price": {
      "reference": "P.26",
      "shortTag": "price",
      "components": {
        "PriceType": {
          "shortTag": "x462",
          "type": "code",
          "codeList": 58,
          "required": true
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
        "Territory": {
          "shortTag": "territory",
          "type": "composite"
        },
        "PriceQualifier": {
          "shortTag": "j261",
          "type": "code",
          "codeList": 59
        },
        "PriceStatus": {
          "shortTag": "j266",
          "type": "code",
          "codeList": 61
        },
        "PriceConstraint": {
          "shortTag": "priceconstraint",
          "type": "composite",
          "repeatable": true
        },
        "DiscountCoded": {
          "shortTag": "discountcoded",
          "type": "composite",
          "repeatable": true
        },
        "Discount": {
          "shortTag": "discount",
          "type": "composite",
          "repeatable": true
        }
      }
    },
    "PriceConstraint": {
      "reference": "P.26.10",
      "shortTag": "priceconstraint",
      "components": {
        "PriceConstraintType": {
          "shortTag": "x529",
          "type": "code",
          "codeList": 230,
          "required": true
        },
        "PriceConstraintStatus": {
          "shortTag": "x530",
          "type": "code",
          "codeList": 146,
          "required": true
        },
        "PriceConstraintLimit": {
          "shortTag": "priceconstraintlimit",
          "type": "composite",
          "repeatable": true,
          "components": {
            "PriceConstraintLimitType": {
              "shortTag": "x531",
              "type": "code",
              "codeList": 147,
              "required": true
            },
            "Quantity": {
              "shortTag": "x532",
              "type": "integer"
            },
            "PriceConstraintUnit": {
              "shortTag": "x533",
              "type": "code",
              "codeList": 147
            }
          }
        }
      }
    },
    "ProductClassification": {
      "reference": "P.4",
      "shortTag": "productclassification",
      "components": {
        "ProductClassificationType": {
          "shortTag": "b274",
          "type": "code",
          "codeList": 9,
          "required": true
        },
        "ProductClassificationCode": {
          "shortTag": "b275",
          "type": "string",
          "required": true
        }
      }
    },
    "ProductContact": {
      "reference": "P.22",
      "shortTag": "productcontact",
      "components": {
        "ProductContactRole": {
          "shortTag": "x482",
          "type": "code",
          "codeList": 198,
          "required": true
        },
        "ProductContactIdentifier": {
          "shortTag": "productcontactidentifier",
          "type": "composite",
          "repeatable": true,
          "components": {
            "ProductContactIDType": {
              "shortTag": "x483",
              "type": "code",
              "codeList": 44,
              "required": true
            },
            "IDValue": {
              "shortTag": "b244",
              "type": "string",
              "required": true
            }
          }
        },
        "ContactName": {
          "shortTag": "x484",
          "type": "string"
        }
      }
    },
    "ProductIdentifier": {
      "reference": "P.2",
      "shortTag": "productidentifier",
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
    "ProductSupply": {
      "reference": "P.24",
      "shortTag": "productsupply",
      "components": {
        "Market": {
          "shortTag": "market",
          "type": "composite"
        },
        "MarketPublishingDetail": {
          "shortTag": "marketpublishingdetail",
          "type": "composite"
        },
        "SupplyDetail": {
          "shortTag": "supplydetail",
          "type": "composite",
          "repeatable": true
        }
      }
    },
    "Publisher": {
      "reference": "P.19",
      "shortTag": "publisher",
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
              "shortTag": "x447",
              "type": "code",
              "codeList": 44,
              "required": true
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
          "repeatable": true
        }
      }
    },
    "PublishingDate": {
      "reference": "P.20",
      "shortTag": "publishingdate",
      "components": {
        "PublishingDateRole": {
          "shortTag": "x448",
          "type": "code",
          "codeList": 163,
          "required": true
        },
        "Date": {
          "shortTag": "b306",
          "type": "string",
          "required": true
        },
        "DateFormat": {
          "shortTag": "j260",
          "type": "code",
          "codeList": 55
        }
      }
    },
    "RelatedProduct": {
      "reference": "P.23",
      "shortTag": "relatedproduct",
      "components": {
        "ProductRelationCode": {
          "shortTag": "x455",
          "type": "code",
          "codeList": 51,
          "required": true
        },
        "ProductIdentifier": {
          "shortTag": "productidentifier",
          "type": "composite",
          "repeatable": true,
          "required": true
        }
      }
    },
    "RelatedWork": {
      "reference": "P.18",
      "shortTag": "relatedwork",
      "components": {
        "WorkRelationCode": {
          "shortTag": "x454",
          "type": "code",
          "codeList": 164,
          "required": true
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
            "IDValue": {
              "shortTag": "b244",
              "type": "string",
              "required": true
            }
          }
        }
      }
    },
   "SalesRights": {
      "reference": "P.21",
      "shortTag": "salesrights",
      "components": {
        "SalesRightsType": {
          "shortTag": "b089",
          "type": "code",
          "codeList": 46,
          "required": true
        },
        "Territory": {
          "shortTag": "territory",
          "type": "composite",
          "required": true,
          "components": {
            "CountriesIncluded": {
              "shortTag": "x449",
              "type": "string"
            },
            "RegionsIncluded": {
              "shortTag": "x450",
              "type": "string"
            },
            "CountriesExcluded": {
              "shortTag": "x451",
              "type": "string"
            },
            "RegionsExcluded": {
              "shortTag": "x452",
              "type": "string"
            }
          }
        }
      }
    },
    "Sender": {
      "reference": "PR.2",
      "shortTag": "sender",
      "components": {
        "SenderIdentifier": {
          "shortTag": "senderidentifier",
          "type": "composite",
          "repeatable": true,
          "components": {
            "SenderIDType": {
              "shortTag": "m379",
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
        "SenderName": {
          "shortTag": "x298",
          "type": "string",
          "required": true
        },
        "ContactName": {
          "shortTag": "x299",
          "type": "string"
        },
        "EmailAddress": {
          "shortTag": "j272",
          "type": "string"
        }
      }
    },
    "Subject": {
      "reference": "P.12",
      "shortTag": "subject",
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
    "Supplier": {
      "reference": "P.24.4",
      "shortTag": "supplier",
      "components": {
        "SupplierRole": {
          "shortTag": "j292",
          "type": "code",
          "codeList": 93,
          "required": true
        },
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
        "SupplierName": {
          "shortTag": "j137",
          "type": "string"
        },
        "TelephoneNumber": {
          "shortTag": "j270",
          "type": "string"
        },
        "EmailAddress": {
          "shortTag": "j272",
          "type": "string"
        },
        "Website": {
          "shortTag": "website",
          "type": "composite",
          "repeatable": true
        }
      }
    },
    "SupplyDate": {
      "reference": "P.24.13",
      "shortTag": "supplydate",
      "components": {
        "SupplyDateRole": {
          "shortTag": "x461",
          "type": "code",
          "codeList": 166,
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
    "SupplyDetail": {
      "reference": "P.24",
      "shortTag": "supplydetail",
      "components": {
        "Supplier": {
          "shortTag": "supplier",
          "type": "composite",
          "required": true
        },
        "ProductAvailability": {
          "shortTag": "j396",
          "type": "code",
          "codeList": 65,
          "required": true
        },
        "SupplyDate": {
          "shortTag": "supplydate",
          "type": "composite",
          "repeatable": true
        },
        "Price": {
          "shortTag": "price",
          "type": "composite",
          "repeatable": true
        },
        "Stock": {
          "shortTag": "stock",
          "type": "composite",
          "repeatable": true
        },
        "PackQuantity": {
          "shortTag": "j145",
          "type": "integer"
        },
        "UnpricedItemType": {
          "shortTag": "j192",
          "type": "code",
          "codeList": 57
        }
      }
    },
    "Territory": {
      "reference": "P.21.1",
      "shortTag": "territory",
      "components": {
        "CountriesIncluded": {
          "shortTag": "x449",
          "type": "string"
        },
        "RegionsIncluded": {
          "shortTag": "x450",
          "type": "string"
        },
        "CountriesExcluded": {
          "shortTag": "x451",
          "type": "string"
        },
        "RegionsExcluded": {
          "shortTag": "x452",
          "type": "string"
        }
      }
    },
    "TextContent": {
      "reference": "P.14",
      "shortTag": "textcontent",
      "components": {
        "TextType": {
          "shortTag": "x426",
          "type": "code",
          "codeList": 153,
          "required": true
        },
        "ContentAudience": {
          "shortTag": "x427",
          "type": "code",
          "codeList": 154
        },
        "Text": {
          "shortTag": "d104",
          "type": "text",
          "required": true
        },
        "TextAuthor": {
          "shortTag": "d107",
          "type": "string"
        },
        "TextSourceCorporate": {
          "shortTag": "b374",
          "type": "string"
        }
      }
    },
    "TitleDetail": {
      "reference": "P.6",
      "shortTag": "titledetail",
      "components": {
        "TitleType": {
          "shortTag": "b202",
          "type": "code",
          "codeList": 15,
          "required": true
        },
        "TitleElement": {
          "shortTag": "titleelement",
          "type": "composite",
          "repeatable": true,
          "required": true,
          "components": {
            "TitleElementLevel": {
              "shortTag": "x409",
              "type": "code",
              "codeList": 149,
              "required": true
            },
            "PartNumber": {
              "shortTag": "x410",
              "type": "string"
            },
            "TitlePrefix": {
              "shortTag": "b030",
              "type": "string"
            },
            "TitleWithoutPrefix": {
              "shortTag": "b031",
              "type": "string"
            },
            "TitleText": {
              "shortTag": "b203",
              "type": "string"
            },
            "Subtitle": {
              "shortTag": "b029",
              "type": "string"
            }
          }
        }
      }
    },
    "Website": {
      "reference": "P.19.9",
      "shortTag": "website",
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
    "WorkIdentifier": {
      "reference": "P.18.1",
      "shortTag": "workidentifier",
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
    }
}