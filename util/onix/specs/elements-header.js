module.exports = {
  "header": {
    "Sender": {
      "shortTag": "sender",
      "required": true,
        "SenderName": {
          "shortTag": "m379",
          "type": "string",
          "required": true
        },
        "SenderIdentifier": {
          "shortTag": "senderidentifier",
          "type": "composite",
          "required": false,
          "repeatable": true,
            "SenderIDType": {
              "shortTag": "m379",
              "type": "code",
              "required": true
            },
            "IDTypeName": {
              "shortTag": "b233",
              "type": "string",
              "required": false
            },
            "IDValue": {
              "shortTag": "b244",
              "type": "string",
              "required": true
            }
        },
        "ContactName": {
          "shortTag": "m270",
          "type": "string",
          "required": false
        },
        "EmailAddress": {
          "shortTag": "m283",
          "type": "string",
          "required": false
        }
      }
    },
    "Addressee": {
        "shortTag": "addressee",
        "required": false,
        "AddresseeName": {
            "shortTag": "m380",
            "type": "string",
            "required": true
        },
        "AddresseeIdentifier": {
            "shortTag": "addresseeidentifier",
            "type": "composite",
            "required": false,
            "repeatable": true,
            "AddresseeIDType": {
                "shortTag": "m380",
                "type": "code",
                "required": true
            },
            "IDTypeName": {
                "shortTag": "b233",
                "type": "string",
                "required": false
            },
            "IDValue": {
                "shortTag": "b244",
                "type": "string",
                "required": true
            }
        }
      }
    },
    "MessageNumber": {
      "shortTag": "m180",
      "required": false,
      "type": "string"
    },
    "MessageRepeat": {
      "shortTag": "m181",
      "required": false,
      "type": "integer"
    },
    "SentDateTime": {
      "shortTag": "m182",
      "required": true,
      "type": "datetime"
    },
    "MessageNote": {
      "shortTag": "m183",
      "required": false,
      "type": "string",
      "repeatable": true
    },
    "DefaultLanguageOfText": {
      "shortTag": "m184",
      "required": false,
      "type": "string",
      "format": "ISO 639-2/B"
    },
    "DefaultPriceType": {
      "shortTag": "m185",
      "required": false,
      "type": "code"
    },
    "DefaultCurrencyCode": {
      "shortTag": "m186",
      "required": false,
      "type": "string",
      "format": "ISO 4217"
    },
    "DefaultLinearUnit": {
      "shortTag": "m187",
      "required": false,
      "type": "code"
    },
    "DefaultWeightUnit": {
      "shortTag": "m188",
      "required": false,
      "type": "code"
    },
    "DefaultClassOfTrade": {
      "shortTag": "m193",
      "required": false,
      "type": "string"
    }
  }
}