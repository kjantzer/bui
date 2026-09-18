// https://www.loc.gov/marc/bibliographic/
// https://github.com/timathom/marc-schema/blob/main/marc21_bibliographic_schema.json
module.exports = {
  "title":"MARC21 bibliographic format",
  "url":"https:\/\/www.loc.gov\/marc\/bibliographic\/",
  "language":"en",
  "family":"marc",
  "fields":{
    "010":{
      "label":"Library of Congress Control Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"LC control number",
          "repeatable":false
        },
        "b":{
          "label":"NUCMC control number",
          "repeatable":true
        },
        "z":{
          "label":"Canceled\/invalid LC control number",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "013":{
      "label":"Patent Control Information",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Number",
          "repeatable":false
        },
        "b":{
          "label":"Country",
          "repeatable":false
        },
        "c":{
          "label":"Type of number",
          "repeatable":false
        },
        "d":{
          "label":"Date",
          "repeatable":true
        },
        "e":{
          "label":"Status",
          "repeatable":true
        },
        "f":{
          "label":"Party to document",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "015":{
      "label":"National Bibliography Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"National bibliography number",
          "repeatable":true
        },
        "q":{
          "label":"Qualifying information",
          "repeatable":true
        },
        "z":{
          "label":"Canceled\/invalid national bibliography number",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "016":{
      "label":"National Bibliographic Agency Control Number",
      "indicator1":{
        "label":"National bibliographic agency",
        "codes":{
          " ":"Library and Archives Canada",
          "7":"Source specified in subfield $2"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Record control number",
          "repeatable":false
        },
        "z":{
          "label":"Canceled\/invalid control number",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "017":{
      "label":"Copyright or Legal Deposit Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Copyright or legal deposit number",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Copyright or legal deposit number",
          "repeatable":true
        },
        "b":{
          "label":"Assigning agency",
          "repeatable":false
        },
        "d":{
          "label":"Date",
          "repeatable":false
        },
        "z":{
          "label":"Canceled\/invalid copyright or legal deposit number",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        }
      },
      "repeatable":true
    },
    "018":{
      "label":"Copyright Article-Fee Code",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Copyright article-fee code",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "020":{
      "label":"International Standard Book Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"International Standard Book Number",
          "repeatable":false
        },
        "c":{
          "label":"Terms of availability",
          "repeatable":false
        },
        "q":{
          "label":"Qualifying information",
          "repeatable":true
        },
        "z":{
          "label":"Canceled\/invalid ISBN",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "022":{
      "label":"International Standard Serial Number",
      "indicator1":{
        "label":"Level of international interest",
        "codes":{
          " ":"No level specified",
          "0":"Continuing resource of international interest",
          "1":"Continuing resource not of international interest"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"Incorrect ISSN",
          "repeatable":true
        },
        "z":{
          "label":"Canceled ISSN",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":false
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "023":{
      "label":"Cluster ISSN",
      "indicator1":{
        "label":"Type of Cluster ISSN",
        "codes":{
          "0":"ISSN-L",
          "1":"ISSN-H"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Cluster ISSN",
          "repeatable":false
        },
        "y":{
          "label":"Incorrect Cluster ISSN",
          "repeatable":true
        },
        "z":{
          "label":"Canceled Cluster ISSN",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":false
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "024":{
      "label":"Other Standard Identifier",
      "indicator1":{
        "label":"Type of standard number or code",
        "codes":{
          "0":"International Standard Recording Code",
          "1":"Universal Product Code",
          "2":"International Standard Music Number",
          "3":"International Article Number",
          "4":"Serial Item and Contribution Identifier",
          "7":"Source specified in subfield $2",
          "8":"Unspecified type of standard number or code"
        }
      },
      "indicator2":{
        "label":"Difference indicator",
        "codes":{
          " ":"No information provided",
          "0":"No difference",
          "1":"Difference"
        }
      },
      "subfields":{
        "a":{
          "label":"Standard number or code",
          "repeatable":false
        },
        "c":{
          "label":"Terms of availability",
          "repeatable":false
        },
        "d":{
          "label":"Additional codes following the standard number or code",
          "repeatable":false
        },
        "q":{
          "label":"Qualifying information",
          "repeatable":true
        },
        "z":{
          "label":"Canceled\/invalid standard number or code",
          "repeatable":true
        },
        "2":{
          "label":"Source of number or code",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "025":{
      "label":"Overseas Acquisition Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Overseas acquisition number",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "026":{
      "label":"Fingerprint Identifier",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"First and second groups of characters",
          "repeatable":false
        },
        "b":{
          "label":"Third and fourth groups of characters",
          "repeatable":false
        },
        "c":{
          "label":"Date",
          "repeatable":false
        },
        "d":{
          "label":"Number of volume or part",
          "repeatable":true
        },
        "e":{
          "label":"Unparsed fingerprint",
          "repeatable":false
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "027":{
      "label":"Standard Technical Report Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Standard technical report number",
          "repeatable":false
        },
        "q":{
          "label":"Qualifying information",
          "repeatable":true
        },
        "z":{
          "label":"Canceled\/invalid number",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "028":{
      "label":"Publisher or Distributor Number",
      "indicator1":{
        "label":"Type of number",
        "codes":{
          "0":"Issue number",
          "1":"Matrix number",
          "2":"Plate number",
          "3":"Other music publisher number",
          "4":"Video recording publisher number",
          "5":"Other publisher number"
        }
      },
      "indicator2":{
        "label":"Note\/added entry controller",
        "codes":{
          "0":"No note, no added entry",
          "1":"Note, added entry",
          "2":"Note, no added entry",
          "3":"No note, added entry"
        }
      },
      "subfields":{
        "a":{
          "label":"Publisher or distributor number",
          "repeatable":false
        },
        "b":{
          "label":"Source",
          "repeatable":false
        },
        "q":{
          "label":"Qualifying information",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "030":{
      "label":"CODEN Designation",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"CODEN",
          "repeatable":false
        },
        "z":{
          "label":"Canceled\/invalid CODEN",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "031":{
      "label":"Musical Incipits Information",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Number of work",
          "repeatable":false
        },
        "b":{
          "label":"Number of movement",
          "repeatable":false
        },
        "c":{
          "label":"Number of excerpt",
          "repeatable":false
        },
        "d":{
          "label":"Caption or heading",
          "repeatable":true
        },
        "e":{
          "label":"Role",
          "repeatable":false
        },
        "g":{
          "label":"Clef",
          "repeatable":false
        },
        "m":{
          "label":"Voice\/instrument",
          "repeatable":false
        },
        "n":{
          "label":"Key signature",
          "repeatable":false
        },
        "o":{
          "label":"Time signature",
          "repeatable":false
        },
        "p":{
          "label":"Musical notation",
          "repeatable":false
        },
        "q":{
          "label":"General note",
          "repeatable":true
        },
        "r":{
          "label":"Key or mode",
          "repeatable":false
        },
        "s":{
          "label":"Coded validity note",
          "repeatable":true
        },
        "t":{
          "label":"Text incipit",
          "repeatable":true
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "y":{
          "label":"Link text",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "2":{
          "label":"System code",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "032":{
      "label":"Postal Registration Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Postal registration number",
          "repeatable":false
        },
        "b":{
          "label":"Source agency assigning number",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "033":{
      "label":"Date\/Time and Place of an Event",
      "indicator1":{
        "label":"Type of date in subfield $a",
        "codes":{
          " ":"No date information",
          "0":"Single date",
          "1":"Multiple single dates",
          "2":"Range of dates"
        }
      },
      "indicator2":{
        "label":"Type of event",
        "codes":{
          " ":"No information provided",
          "0":"Capture",
          "1":"Broadcast",
          "2":"Finding"
        }
      },
      "subfields":{
        "a":{
          "label":"Formatted date\/time",
          "repeatable":true
        },
        "b":{
          "label":"Geographic classification area code",
          "repeatable":true
        },
        "c":{
          "label":"Geographic classification subarea code",
          "repeatable":true
        },
        "p":{
          "label":"Place of event",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "034":{
      "label":"Coded Cartographic Mathematical Data",
      "indicator1":{
        "label":"Type of scale",
        "codes":{
          "0":"Scale indeterminable\/No scale recorded",
          "1":"Single scale",
          "3":"Range of scales"
        }
      },
      "indicator2":{
        "label":"Type of ring",
        "codes":{
          " ":"Not applicable",
          "0":"Outer ring",
          "1":"Exclusion ring"
        }
      },
      "subfields":{
        "a":{
          "label":"Category of scale",
          "repeatable":false
        },
        "b":{
          "label":"Constant ratio linear horizontal scale",
          "repeatable":true
        },
        "c":{
          "label":"Constant ratio linear vertical scale",
          "repeatable":true
        },
        "d":{
          "label":"Coordinates",
          "repeatable":false
        },
        "e":{
          "label":"Coordinates",
          "repeatable":false
        },
        "f":{
          "label":"Coordinates",
          "repeatable":false
        },
        "g":{
          "label":"Coordinates",
          "repeatable":false
        },
        "h":{
          "label":"Angular scale",
          "repeatable":true
        },
        "j":{
          "label":"Declination",
          "repeatable":false
        },
        "k":{
          "label":"Declination",
          "repeatable":false
        },
        "m":{
          "label":"Right ascension",
          "repeatable":false
        },
        "n":{
          "label":"Right ascension",
          "repeatable":false
        },
        "p":{
          "label":"Equinox",
          "repeatable":false
        },
        "r":{
          "label":"Distance from earth",
          "repeatable":false
        },
        "s":{
          "label":"G-ring latitude",
          "repeatable":true
        },
        "t":{
          "label":"G-ring longitude",
          "repeatable":true
        },
        "x":{
          "label":"Beginning date",
          "repeatable":false
        },
        "y":{
          "label":"Ending date",
          "repeatable":false
        },
        "z":{
          "label":"Name of extraterrestrial body",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "035":{
      "label":"System Control Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"System control number",
          "repeatable":false
        },
        "z":{
          "label":"Canceled\/invalid control number",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "036":{
      "label":"Original Study Number for Computer Data Files",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Original study number",
          "repeatable":false
        },
        "b":{
          "label":"Source agency assigning number",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "037":{
      "label":"Source of Acquisition",
      "indicator1":{
        "label":"Source of acquisition sequence",
        "codes":{
          " ":"Not applicable\/No information provided\/Earliest",
          "2":"Intervening",
          "3":"Current\/Latest"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Stock number",
          "repeatable":false
        },
        "b":{
          "label":"Source of stock number\/acquisition",
          "repeatable":false
        },
        "c":{
          "label":"Terms of availability",
          "repeatable":true
        },
        "f":{
          "label":"Form of issue",
          "repeatable":true
        },
        "g":{
          "label":"Additional format characteristics",
          "repeatable":true
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "038":{
      "label":"Record Content Licensor",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Record content licensor",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "040":{
      "label":"Cataloging Source",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Original cataloging agency",
          "repeatable":false
        },
        "b":{
          "label":"Language of cataloging",
          "repeatable":false
        },
        "c":{
          "label":"Transcribing agency",
          "repeatable":false
        },
        "d":{
          "label":"Modifying agency",
          "repeatable":true
        },
        "e":{
          "label":"Description conventions",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "041":{
      "label":"Language Code",
      "indicator1":{
        "label":"Translation indication",
        "codes":{
          " ":"No information provided",
          "0":"Item not a translation\/does not include a translation",
          "1":"Item is or includes a translation"
        }
      },
      "indicator2":{
        "label":"Source of code",
        "codes":{
          " ":"MARC language code",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Language code of text\/sound track or separate title",
          "repeatable":true
        },
        "b":{
          "label":"Language code of summary or abstract",
          "repeatable":true
        },
        "d":{
          "label":"Language code of sung or spoken text",
          "repeatable":true
        },
        "e":{
          "label":"Language code of librettos",
          "repeatable":true
        },
        "f":{
          "label":"Language code of table of contents",
          "repeatable":true
        },
        "g":{
          "label":"Language code of accompanying material other than librettos and transcripts",
          "repeatable":true
        },
        "h":{
          "label":"Language code of original",
          "repeatable":true
        },
        "i":{
          "label":"Language code of intertitles",
          "repeatable":true
        },
        "j":{
          "label":"Language code of subtitles",
          "repeatable":true
        },
        "k":{
          "label":"Language code of intermediate translations",
          "repeatable":true
        },
        "m":{
          "label":"Language code of original accompanying materials other than librettos",
          "repeatable":true
        },
        "n":{
          "label":"Language code of original libretto",
          "repeatable":true
        },
        "p":{
          "label":"Language code of captions",
          "repeatable":true
        },
        "q":{
          "label":"Language code of accessible audio",
          "repeatable":true
        },
        "r":{
          "label":"Language code of accessible visual language",
          "repeatable":true
        },
        "t":{
          "label":"Language code of accompanying transcripts for audiovisual materials",
          "repeatable":true
        },
        "2":{
          "label":"Source of code",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "042":{
      "label":"Authentication Code",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Authentication code",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "043":{
      "label":"Geographic Area Code",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Geographic area code",
          "repeatable":true
        },
        "b":{
          "label":"Local GAC code",
          "repeatable":true
        },
        "c":{
          "label":"ISO code",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of local code",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "044":{
      "label":"Country of Publishing\/Producing Entity Code",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"MARC country code",
          "repeatable":true
        },
        "b":{
          "label":"Local subentity code",
          "repeatable":true
        },
        "c":{
          "label":"ISO country code",
          "repeatable":true
        },
        "2":{
          "label":"Source of local subentity code",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "045":{
      "label":"Time Period of Content",
      "indicator1":{
        "label":"Type of time period in subfield $b or $c",
        "codes":{
          " ":"Subfield $b or $c not present",
          "0":"Single date\/time",
          "1":"Multiple single dates\/times",
          "2":"Range of dates\/times"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Time period code",
          "repeatable":true
        },
        "b":{
          "label":"Formatted 9999 B.C. through C.E. time period",
          "repeatable":true
        },
        "c":{
          "label":"Formatted pre-9999 B.C. time period",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "046":{
      "label":"Special Coded Dates",
      "indicator1":{
        "label":"Type of entity",
        "codes":{
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Type of date code",
          "repeatable":false
        },
        "b":{
          "label":"Date 1, B.C.E. date",
          "repeatable":false
        },
        "c":{
          "label":"Date 1, C.E. date",
          "repeatable":false
        },
        "d":{
          "label":"Date 2, B.C.E. date",
          "repeatable":false
        },
        "e":{
          "label":"Date 2, C.E. date",
          "repeatable":false
        },
        "j":{
          "label":"Date resource modified",
          "repeatable":false
        },
        "k":{
          "label":"Beginning or single date created",
          "repeatable":false
        },
        "l":{
          "label":"Ending date created",
          "repeatable":false
        },
        "m":{
          "label":"Beginning of date valid",
          "repeatable":false
        },
        "n":{
          "label":"End of date valid",
          "repeatable":false
        },
        "o":{
          "label":"Single or starting date for aggregated content",
          "repeatable":false
        },
        "p":{
          "label":"Ending date for aggregated content",
          "repeatable":false
        },
        "x":{
          "label":"Nonpublic note",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "2":{
          "label":"Source of date",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "047":{
      "label":"Form of Musical Composition Code",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Source of code",
        "codes":{
          " ":"MARC musical composition code",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Form of musical composition code",
          "repeatable":true
        },
        "2":{
          "label":"Source of code",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "048":{
      "label":"Number of Musical Instruments or Voices Code",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Source of code",
        "codes":{
          " ":"MARC code",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Performer or ensemble",
          "repeatable":true
        },
        "b":{
          "label":"Soloist",
          "repeatable":true
        },
        "2":{
          "label":"Source of code",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "050":{
      "label":"Library of Congress Call Number",
      "indicator1":{
        "label":"Existence in LC collection",
        "codes":{
          " ":"No information provided",
          "0":"Item is in LC",
          "1":"Item is not in LC"
        }
      },
      "indicator2":{
        "label":"Source of call number",
        "codes":{
          "0":"Assigned by LC",
          "4":"Assigned by agency other than LC"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":true
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "051":{
      "label":"Library of Congress Copy, Issue, Offprint Statement",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":false
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "c":{
          "label":"Copy information",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "052":{
      "label":"Geographic Classification",
      "indicator1":{
        "label":"Code source",
        "codes":{
          " ":"Library of Congress Classification",
          "1":"U.S. Dept. of Defense Classification",
          "7":"Source specified in subfield $2"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Geographic classification area code",
          "repeatable":false
        },
        "b":{
          "label":"Geographic classification subarea code",
          "repeatable":true
        },
        "d":{
          "label":"Populated place name",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Code source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "055":{
      "label":"Classification Numbers Assigned in Canada",
      "indicator1":{
        "label":"Existence in LAC collection",
        "codes":{
          " ":"Information not provided",
          "0":"Work held by LAC",
          "1":"Work not held by LAC"
        }
      },
      "indicator2":{
        "label":"Type, completeness, source of class\/call number",
        "codes":{
          "0":"LC-based call number assigned by LAC",
          "1":"Complete LC class number assigned by LAC",
          "2":"Incomplete LC class number assigned by LAC",
          "3":"LC-based call number assigned by the contributing library",
          "4":"Complete LC class number assigned by the contributing library",
          "5":"Incomplete LC class number assigned by the contributing library",
          "6":"Other call number assigned by LAC",
          "7":"Other class number assigned by LAC",
          "8":"Other call number assigned by the contributing library",
          "9":"Other class number assigned by the contributing library"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":false
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of call\/class number",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "060":{
      "label":"National Library of Medicine Call Number",
      "indicator1":{
        "label":"Existence in NLM collection",
        "codes":{
          " ":"No information provided",
          "0":"Item is in NLM",
          "1":"Item is not in NLM"
        }
      },
      "indicator2":{
        "label":"Source of call number",
        "codes":{
          "0":"Assigned by NLM",
          "4":"Assigned by agency other than NLM"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":true
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "061":{
      "label":"National Library of Medicine Copy Statement",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":true
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "c":{
          "label":"Copy information",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "066":{
      "label":"Character Sets Present",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Primary G0 character set",
          "repeatable":false
        },
        "b":{
          "label":"Primary G1 character set",
          "repeatable":false
        },
        "c":{
          "label":"Alternate G0 or G1 character set",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "070":{
      "label":"National Agricultural Library Call Number",
      "indicator1":{
        "label":"Existence in NAL collection",
        "codes":{
          " ":"No information provided",
          "0":"Item is in NAL",
          "1":"Item is not in NAL"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":true
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "071":{
      "label":"National Agricultural Library Copy Statement",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":true
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "c":{
          "label":"Copy information",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "072":{
      "label":"Subject Category Code",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Code source",
        "codes":{
          "0":"NAL subject category code list",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Subject category code",
          "repeatable":false
        },
        "x":{
          "label":"Subject category code subdivision",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "074":{
      "label":"GPO Item Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"GPO item number",
          "repeatable":false
        },
        "z":{
          "label":"Canceled\/invalid GPO item number",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "080":{
      "label":"Universal Decimal Classification Number",
      "indicator1":{
        "label":"Type of edition",
        "codes":{
          " ":"No information provided",
          "0":"Full",
          "1":"Abridged"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Universal Decimal Classification number",
          "repeatable":false
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "x":{
          "label":"Common auxiliary subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Edition identifier",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "082":{
      "label":"Dewey Decimal Classification Number",
      "indicator1":{
        "label":"Type of edition",
        "codes":{
          "0":"Full edition",
          "1":"Abridged edition",
          "7":"Other edition specified in subfield $2"
        }
      },
      "indicator2":{
        "label":"Source of classification number",
        "codes":{
          " ":"No information provided",
          "0":"Assigned by LC",
          "4":"Assigned by agency other than LC"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":true
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "m":{
          "label":"Standard or optional designation",
          "repeatable":false
        },
        "q":{
          "label":"Assigning agency",
          "repeatable":false
        },
        "2":{
          "label":"Edition information",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "083":{
      "label":"Additional Dewey Decimal Classification Number",
      "indicator1":{
        "label":"Type of edition",
        "codes":{
          "0":"Full edition",
          "1":"Abridged edition",
          "7":"Other edition specified in subfield $2"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":true
        },
        "c":{
          "label":"Classification number--Ending number of span",
          "repeatable":true
        },
        "m":{
          "label":"Standard or optional designation",
          "repeatable":false
        },
        "q":{
          "label":"Assigning agency",
          "repeatable":false
        },
        "y":{
          "label":"Table sequence number for internal subarrangement or add table",
          "repeatable":true
        },
        "z":{
          "label":"Table identification",
          "repeatable":true
        },
        "2":{
          "label":"Edition information",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "084":{
      "label":"Other Classification Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":true
        },
        "b":{
          "label":"Item number",
          "repeatable":false
        },
        "q":{
          "label":"Assigning agency",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Number source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "085":{
      "label":"Synthesized Classification Number Components",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Number where instructions are found-single number or beginning number of span",
          "repeatable":true
        },
        "b":{
          "label":"Base number",
          "repeatable":true
        },
        "c":{
          "label":"Classification number-ending number of span",
          "repeatable":true
        },
        "f":{
          "label":"Facet designator",
          "repeatable":true
        },
        "r":{
          "label":"Root number",
          "repeatable":true
        },
        "s":{
          "label":"Digits added from classification number in schedule or external table",
          "repeatable":true
        },
        "t":{
          "label":"Digits added from internal subarrangement or add table",
          "repeatable":true
        },
        "u":{
          "label":"Number being analyzed",
          "repeatable":true
        },
        "v":{
          "label":"Number in internal subarrangement or add table where instructions are found",
          "repeatable":true
        },
        "w":{
          "label":"Table identification-Internal subarrangement or add table",
          "repeatable":true
        },
        "y":{
          "label":"Table sequence number for internal subarrangement or add table",
          "repeatable":true
        },
        "z":{
          "label":"Table identification",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "086":{
      "label":"Government Document Classification Number",
      "indicator1":{
        "label":"Number source",
        "codes":{
          " ":"Source specified in subfield $2",
          "0":"Superintendent of Documents Classification System",
          "1":"Government of Canada Publications: Outline of Classification"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Classification number",
          "repeatable":false
        },
        "z":{
          "label":"Canceled\/invalid classification number",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Number source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "088":{
      "label":"Report Number",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Report number",
          "repeatable":false
        },
        "z":{
          "label":"Canceled\/invalid report number",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "100":{
      "label":"Main Entry-Personal Name",
      "indicator1":{
        "label":"Type of personal name entry element",
        "codes":{
          "0":"Forename",
          "1":"Surname",
          "3":"Family name"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Personal name",
          "repeatable":false
        },
        "b":{
          "label":"Numeration",
          "repeatable":false
        },
        "c":{
          "label":"Titles and words associated with a name",
          "repeatable":true
        },
        "d":{
          "label":"Dates associated with a name",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "j":{
          "label":"Attribution qualifier",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "q":{
          "label":"Fuller form of name",
          "repeatable":false
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "110":{
      "label":"Main Entry-Corporate Name",
      "indicator1":{
        "label":"Type of corporate name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Corporate name or jurisdiction name as entry element",
          "repeatable":false
        },
        "b":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":true
        },
        "d":{
          "label":"Date of meeting or treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "111":{
      "label":"Main Entry-Meeting Name",
      "indicator1":{
        "label":"Type of meeting name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Meeting name or jurisdiction name as entry element",
          "repeatable":false
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":true
        },
        "d":{
          "label":"Date of meeting or treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "j":{
          "label":"Relator term",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "q":{
          "label":"Name of meeting following jurisdiction name entry element",
          "repeatable":false
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "130":{
      "label":"Main Entry-Uniform Title",
      "indicator1":{
        "label":"Nonfiling characters",
        "codes":{
          "0-9":"Number of nonfiling characters"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Uniform title",
          "repeatable":false
        },
        "d":{
          "label":"Date of treaty signing",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "210":{
      "label":"Abbreviated Title",
      "indicator1":{
        "label":"Title added entry",
        "codes":{
          "0":"No added entry",
          "1":"Added entry"
        }
      },
      "indicator2":{
        "label":"Type",
        "codes":{
          " ":"Abbreviated key title",
          "0":"Other abbreviated title"
        }
      },
      "subfields":{
        "a":{
          "label":"Abbreviated title",
          "repeatable":false
        },
        "b":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "2":{
          "label":"Source",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "222":{
      "label":"Key Title",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Nonfiling characters",
        "codes":{
          "0":"No nonfiling characters",
          "1-9":"Number of nonfiling characters"
        }
      },
      "subfields":{
        "a":{
          "label":"Key title",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        }
      },
      "repeatable":true
    },
    "240":{
      "label":"Uniform Title",
      "indicator1":{
        "label":"Uniform title printed or displayed",
        "codes":{
          "0":"Not printed or displayed",
          "1":"Printed or displayed"
        }
      },
      "indicator2":{
        "label":"Nonfiling characters",
        "codes":{
          "0-9":"Number of nonfiling characters"
        }
      },
      "subfields":{
        "a":{
          "label":"Uniform title",
          "repeatable":false
        },
        "d":{
          "label":"Date of treaty signing",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "242":{
      "label":"Translation of Title by Cataloging Agency",
      "indicator1":{
        "label":"Title added entry",
        "codes":{
          "0":"No added entry",
          "1":"Added entry"
        }
      },
      "indicator2":{
        "label":"Nonfiling characters",
        "codes":{
          "0":"No nonfiling characters",
          "1-9":"Number of nonfiling characters"
        }
      },
      "subfields":{
        "a":{
          "label":"Title",
          "repeatable":false
        },
        "b":{
          "label":"Remainder of title",
          "repeatable":false
        },
        "c":{
          "label":"Statement of responsibility, etc.",
          "repeatable":false
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "y":{
          "label":"Language code of translated title",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "243":{
      "label":"Collective Uniform Title",
      "indicator1":{
        "label":"Uniform title printed or displayed",
        "codes":{
          "0":"Not printed or displayed",
          "1":"Printed or displayed"
        }
      },
      "indicator2":{
        "label":"Nonfiling characters",
        "codes":{
          "0-9":"Number of nonfiling characters"
        }
      },
      "subfields":{
        "a":{
          "label":"Uniform title",
          "repeatable":false
        },
        "d":{
          "label":"Date of treaty signing",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "245":{
      "label":"Title Statement",
      "indicator1":{
        "label":"Title added entry",
        "codes":{
          "0":"No added entry",
          "1":"Added entry"
        }
      },
      "indicator2":{
        "label":"Nonfiling characters",
        "codes":{
          "0":"No nonfiling characters",
          "1-9":"Number of nonfiling characters"
        }
      },
      "subfields":{
        "a":{
          "label":"Title",
          "repeatable":false
        },
        "b":{
          "label":"Remainder of title",
          "repeatable":false
        },
        "c":{
          "label":"Statement of responsibility, etc.",
          "repeatable":false
        },
        "f":{
          "label":"Inclusive dates",
          "repeatable":false
        },
        "g":{
          "label":"Bulk dates",
          "repeatable":false
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "k":{
          "label":"Form",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "s":{
          "label":"Version",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "246":{
      "label":"Varying Form of Title",
      "indicator1":{
        "label":"Note\/added entry controller",
        "codes":{
          "0":"Note, no added entry",
          "1":"Note, added entry",
          "2":"No note, no added entry",
          "3":"No note, added entry"
        }
      },
      "indicator2":{
        "label":"Type of title",
        "codes":{
          " ":"No type specified",
          "0":"Portion of title",
          "1":"Parallel title",
          "2":"Distinctive title",
          "3":"Other title",
          "4":"Cover title",
          "5":"Added title page title",
          "6":"Caption title",
          "7":"Running title",
          "8":"Spine title"
        }
      },
      "subfields":{
        "a":{
          "label":"Title proper\/short title",
          "repeatable":false
        },
        "b":{
          "label":"Remainder of title",
          "repeatable":false
        },
        "f":{
          "label":"Date or sequential designation",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "i":{
          "label":"Display text",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "247":{
      "label":"Former Title",
      "indicator1":{
        "label":"Title added entry",
        "codes":{
          "0":"No added entry",
          "1":"Added entry"
        }
      },
      "indicator2":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "subfields":{
        "a":{
          "label":"Title",
          "repeatable":false
        },
        "b":{
          "label":"Remainder of title",
          "repeatable":false
        },
        "f":{
          "label":"Date or sequential designation",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "250":{
      "label":"Edition Statement",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Edition statement",
          "repeatable":false
        },
        "b":{
          "label":"Remainder of edition statement",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "251":{
      "label":"Version Information",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Version",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "254":{
      "label":"Musical Presentation Statement",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Musical presentation statement",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "255":{
      "label":"Cartographic Mathematical Data",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Statement of scale",
          "repeatable":false
        },
        "b":{
          "label":"Statement of projection",
          "repeatable":false
        },
        "c":{
          "label":"Statement of coordinates",
          "repeatable":false
        },
        "d":{
          "label":"Statement of zone",
          "repeatable":false
        },
        "e":{
          "label":"Statement of equinox",
          "repeatable":false
        },
        "f":{
          "label":"Outer G-ring coordinate pairs",
          "repeatable":false
        },
        "g":{
          "label":"Exclusion G-ring coordinate pairs",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "256":{
      "label":"Computer File Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Computer file characteristics",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "257":{
      "label":"Country of Producing Entity",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Country of producing entity",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "258":{
      "label":"Philatelic Issue Data",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Issuing jurisdiction",
          "repeatable":false
        },
        "b":{
          "label":"Denomination",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "260":{
      "label":"Publication, Distribution, etc.",
      "indicator1":{
        "label":"Sequence of publishing statements",
        "codes":{
          " ":"Not applicable\/No information provided\/Earliest available publisher",
          "2":"Intervening publisher",
          "3":"Current\/latest publisher"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Place of publication, distribution, etc.",
          "repeatable":true
        },
        "b":{
          "label":"Name of publisher, distributor, etc.",
          "repeatable":true
        },
        "c":{
          "label":"Date of publication, distribution, etc.",
          "repeatable":true
        },
        "e":{
          "label":"Place of manufacture",
          "repeatable":true
        },
        "f":{
          "label":"Manufacturer",
          "repeatable":true
        },
        "g":{
          "label":"Date of manufacture",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "261":{
      "label":"Imprint Statement for Films",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Producing company",
          "repeatable":true
        },
        "b":{
          "label":"Releasing company",
          "repeatable":true
        },
        "d":{
          "label":"Date of production, release, etc.",
          "repeatable":true
        },
        "e":{
          "label":"Contractual producer",
          "repeatable":true
        },
        "f":{
          "label":"Place of production, release, etc.",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "262":{
      "label":"Imprint Statement for Sound Recordings",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Place of production, release, etc.",
          "repeatable":false
        },
        "b":{
          "label":"Publisher or trade name",
          "repeatable":false
        },
        "c":{
          "label":"Date of production, release, etc.",
          "repeatable":false
        },
        "k":{
          "label":"Serial identification",
          "repeatable":false
        },
        "l":{
          "label":"Matrix and\/or take number",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "263":{
      "label":"Projected Publication Date",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Projected publication date",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "264":{
      "label":"Production, Publication, Distribution, Manufacture, and Copyright Notice",
      "indicator1":{
        "label":"Sequence of statements",
        "codes":{
          " ":"Not applicable\/No information provided\/Earliest",
          "2":"Intervening",
          "3":"Current\/Latest"
        }
      },
      "indicator2":{
        "label":"Function of entity",
        "codes":{
          "0":"Production",
          "1":"Publication",
          "2":"Distribution",
          "3":"Manufacture",
          "4":"Copyright notice date"
        }
      },
      "subfields":{
        "a":{
          "label":"Place of production, publication, distribution, manufacture",
          "repeatable":true
        },
        "b":{
          "label":"Name of producer, publisher, distributor, manufacturer",
          "repeatable":true
        },
        "c":{
          "label":"Date of production, publication, distribution, manufacture, or copyright notice",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "270":{
      "label":"Address",
      "indicator1":{
        "label":"Level",
        "codes":{
          " ":"No level specified",
          "1":"Primary",
          "2":"Secondary"
        }
      },
      "indicator2":{
        "label":"Type of address",
        "codes":{
          " ":"No type specified",
          "0":"Mailing",
          "7":"Type specified in subfield $i"
        }
      },
      "subfields":{
        "a":{
          "label":"Address",
          "repeatable":true
        },
        "b":{
          "label":"City",
          "repeatable":false
        },
        "c":{
          "label":"State or province",
          "repeatable":false
        },
        "d":{
          "label":"Country",
          "repeatable":false
        },
        "e":{
          "label":"Postal code",
          "repeatable":false
        },
        "f":{
          "label":"Terms preceding attention name",
          "repeatable":false
        },
        "g":{
          "label":"Attention name",
          "repeatable":false
        },
        "h":{
          "label":"Attention position",
          "repeatable":false
        },
        "i":{
          "label":"Type of address",
          "repeatable":false
        },
        "j":{
          "label":"Specialized telephone number",
          "repeatable":true
        },
        "k":{
          "label":"Telephone number",
          "repeatable":true
        },
        "l":{
          "label":"Fax number",
          "repeatable":true
        },
        "m":{
          "label":"Electronic mail address",
          "repeatable":true
        },
        "n":{
          "label":"TDD or TTY number",
          "repeatable":true
        },
        "p":{
          "label":"Contact person",
          "repeatable":true
        },
        "q":{
          "label":"Title of contact person",
          "repeatable":true
        },
        "r":{
          "label":"Hours",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "300":{
      "label":"Physical Description",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Extent",
          "repeatable":true
        },
        "b":{
          "label":"Other physical details",
          "repeatable":false
        },
        "c":{
          "label":"Dimensions",
          "repeatable":true
        },
        "e":{
          "label":"Accompanying material",
          "repeatable":false
        },
        "f":{
          "label":"Type of unit",
          "repeatable":true
        },
        "g":{
          "label":"Size of unit",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "306":{
      "label":"Playing Time",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Playing time",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "307":{
      "label":"Hours, Etc.",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Hours",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Hours",
          "repeatable":false
        },
        "b":{
          "label":"Additional information",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "310":{
      "label":"Current Publication Frequency",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Current publication frequency",
          "repeatable":false
        },
        "b":{
          "label":"Date of current publication frequency",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":false
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "321":{
      "label":"Former Publication Frequency",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Former publication frequency",
          "repeatable":false
        },
        "b":{
          "label":"Dates of former publication frequency",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":false
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "334":{
      "label":"Mode of Issuance",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Mode of issuance term",
          "repeatable":false
        },
        "b":{
          "label":"Mode of issuance code",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "335":{
      "label":"Extension Plan",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Extension plan term",
          "repeatable":false
        },
        "b":{
          "label":"Extension plan code",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "336":{
      "label":"Content Type",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Content type term",
          "repeatable":true
        },
        "b":{
          "label":"Content type code",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "337":{
      "label":"Media Type",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Media type term",
          "repeatable":true
        },
        "b":{
          "label":"Media type code",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "338":{
      "label":"Carrier Type",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Carrier type term",
          "repeatable":true
        },
        "b":{
          "label":"Carrier type code",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "340":{
      "label":"Physical Medium",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Material base and configuration",
          "repeatable":true
        },
        "b":{
          "label":"Dimensions",
          "repeatable":true
        },
        "c":{
          "label":"Materials applied to surface",
          "repeatable":true
        },
        "d":{
          "label":"Information recording technique",
          "repeatable":true
        },
        "e":{
          "label":"Support",
          "repeatable":true
        },
        "f":{
          "label":"Reduction ratio value",
          "repeatable":true
        },
        "g":{
          "label":"Color content",
          "repeatable":true
        },
        "h":{
          "label":"Location within medium",
          "repeatable":true
        },
        "i":{
          "label":"Technical specifications of medium",
          "repeatable":true
        },
        "j":{
          "label":"Generation",
          "repeatable":true
        },
        "k":{
          "label":"Layout",
          "repeatable":true
        },
        "l":{
          "label":"Binding",
          "repeatable":true
        },
        "m":{
          "label":"Book format",
          "repeatable":true
        },
        "n":{
          "label":"Font size",
          "repeatable":true
        },
        "o":{
          "label":"Polarity",
          "repeatable":true
        },
        "p":{
          "label":"Illustrative content",
          "repeatable":true
        },
        "q":{
          "label":"Reduction ratio designator",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "341":{
      "label":"Accessibility Content",
      "indicator1":{
        "label":"Application",
        "codes":{
          " ":"No information provided",
          "0":"Adaptive features to access primary content",
          "1":"Adaptive features to access secondary content"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Content access mode",
          "repeatable":false
        },
        "b":{
          "label":"Textual assistive features",
          "repeatable":true
        },
        "c":{
          "label":"Visual assistive features",
          "repeatable":true
        },
        "d":{
          "label":"Auditory assistive features",
          "repeatable":true
        },
        "e":{
          "label":"Tactile assistive features",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "342":{
      "label":"Geospatial Reference Data",
      "indicator1":{
        "label":"Geospatial reference dimension",
        "codes":{
          "0":"Horizontal coordinate system",
          "1":"Vertical coordinate system"
        }
      },
      "indicator2":{
        "label":"Geospatial reference method",
        "codes":{
          "0":"Geographic",
          "1":"Map projection",
          "2":"Grid coordinate system",
          "3":"Local planar",
          "4":"Local",
          "5":"Geodetic model",
          "6":"Altitude",
          "7":"Method specified in $2",
          "8":"Depth"
        }
      },
      "subfields":{
        "a":{
          "label":"Name",
          "repeatable":false
        },
        "b":{
          "label":"Coordinate units or distance units",
          "repeatable":false
        },
        "c":{
          "label":"Latitude resolution",
          "repeatable":false
        },
        "d":{
          "label":"Longitude resolution",
          "repeatable":false
        },
        "e":{
          "label":"Standard parallel or oblique line latitude",
          "repeatable":true
        },
        "f":{
          "label":"Oblique line longitude",
          "repeatable":true
        },
        "g":{
          "label":"Longitude of central meridian or projection center",
          "repeatable":false
        },
        "h":{
          "label":"Latitude of projection center or projection origin",
          "repeatable":false
        },
        "i":{
          "label":"False easting",
          "repeatable":false
        },
        "j":{
          "label":"False northing",
          "repeatable":false
        },
        "k":{
          "label":"Scale factor",
          "repeatable":false
        },
        "l":{
          "label":"Height of perspective point above surface",
          "repeatable":false
        },
        "m":{
          "label":"Azimuthal angle",
          "repeatable":false
        },
        "n":{
          "label":"Azimuth measure point longitude or straight vertical longitude from pole",
          "repeatable":false
        },
        "o":{
          "label":"Landsat number and path number",
          "repeatable":false
        },
        "p":{
          "label":"Zone identifier",
          "repeatable":false
        },
        "q":{
          "label":"Ellipsoid name",
          "repeatable":false
        },
        "r":{
          "label":"Semi-major axis",
          "repeatable":false
        },
        "s":{
          "label":"Denominator of flattening ratio",
          "repeatable":false
        },
        "t":{
          "label":"Vertical resolution",
          "repeatable":false
        },
        "u":{
          "label":"Vertical encoding method",
          "repeatable":false
        },
        "v":{
          "label":"Local planar, local, or other projection or grid description",
          "repeatable":false
        },
        "w":{
          "label":"Local planar or local georeference information",
          "repeatable":false
        },
        "2":{
          "label":"Reference method used",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "343":{
      "label":"Planar Coordinate Data",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Planar coordinate encoding method",
          "repeatable":false
        },
        "b":{
          "label":"Planar distance units",
          "repeatable":false
        },
        "c":{
          "label":"Abscissa resolution",
          "repeatable":false
        },
        "d":{
          "label":"Ordinate resolution",
          "repeatable":false
        },
        "e":{
          "label":"Distance resolution",
          "repeatable":false
        },
        "f":{
          "label":"Bearing resolution",
          "repeatable":false
        },
        "g":{
          "label":"Bearing units",
          "repeatable":false
        },
        "h":{
          "label":"Bearing reference direction",
          "repeatable":false
        },
        "i":{
          "label":"Bearing reference meridian",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "344":{
      "label":"Sound Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Type of recording",
          "repeatable":true
        },
        "b":{
          "label":"Recording medium",
          "repeatable":true
        },
        "c":{
          "label":"Playing speed",
          "repeatable":true
        },
        "d":{
          "label":"Groove characteristic",
          "repeatable":true
        },
        "e":{
          "label":"Track configuration",
          "repeatable":true
        },
        "f":{
          "label":"Tape configuration",
          "repeatable":true
        },
        "g":{
          "label":"Configuration of playback channels",
          "repeatable":true
        },
        "h":{
          "label":"Special playback characteristics",
          "repeatable":true
        },
        "i":{
          "label":"Sound content",
          "repeatable":true
        },
        "j":{
          "label":"Original capture and storage technique",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "345":{
      "label":"Moving Image Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Presentation format",
          "repeatable":true
        },
        "b":{
          "label":"Projection speed",
          "repeatable":true
        },
        "c":{
          "label":"Aspect ratio value",
          "repeatable":true
        },
        "d":{
          "label":"Aspect ratio designator",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "346":{
      "label":"Video Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Video format",
          "repeatable":true
        },
        "b":{
          "label":"Broadcast standard",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "347":{
      "label":"Digital File Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"File type",
          "repeatable":true
        },
        "b":{
          "label":"Encoding format",
          "repeatable":true
        },
        "c":{
          "label":"File size",
          "repeatable":true
        },
        "d":{
          "label":"Resolution",
          "repeatable":true
        },
        "e":{
          "label":"Regional encoding",
          "repeatable":true
        },
        "f":{
          "label":"Encoded bitrate",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "348":{
      "label":"Notated Music Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Format of notated music term",
          "repeatable":true
        },
        "b":{
          "label":"Format of notated music code",
          "repeatable":true
        },
        "c":{
          "label":"Form of musical notation term",
          "repeatable":true
        },
        "d":{
          "label":"Form of musical notation code",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "351":{
      "label":"Organization and Arrangement of Materials",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Organization",
          "repeatable":true
        },
        "b":{
          "label":"Arrangement",
          "repeatable":true
        },
        "c":{
          "label":"Hierarchical level",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "352":{
      "label":"Digital Graphic Representation",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Direct reference method",
          "repeatable":false
        },
        "b":{
          "label":"Object type",
          "repeatable":true
        },
        "c":{
          "label":"Object count",
          "repeatable":true
        },
        "d":{
          "label":"Row count",
          "repeatable":false
        },
        "e":{
          "label":"Column count",
          "repeatable":false
        },
        "f":{
          "label":"Vertical count",
          "repeatable":false
        },
        "g":{
          "label":"VPF topology level",
          "repeatable":false
        },
        "i":{
          "label":"Indirect reference description",
          "repeatable":false
        },
        "q":{
          "label":"Format of the digital image",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "353":{
      "label":"Supplementary Content Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Supplementary content term",
          "repeatable":true
        },
        "b":{
          "label":"Supplementary content code",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "355":{
      "label":"Security Classification Control",
      "indicator1":{
        "label":"Controlled element",
        "codes":{
          "0":"Document",
          "1":"Title",
          "2":"Abstract",
          "3":"Contents note",
          "4":"Author",
          "5":"Record",
          "8":"None of the above"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Security classification",
          "repeatable":false
        },
        "b":{
          "label":"Handling instructions",
          "repeatable":true
        },
        "c":{
          "label":"External dissemination information",
          "repeatable":true
        },
        "d":{
          "label":"Downgrading or declassification event",
          "repeatable":false
        },
        "e":{
          "label":"Classification system",
          "repeatable":false
        },
        "f":{
          "label":"Country of origin code",
          "repeatable":false
        },
        "g":{
          "label":"Downgrading date",
          "repeatable":false
        },
        "h":{
          "label":"Declassification date",
          "repeatable":false
        },
        "j":{
          "label":"Authorization",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "357":{
      "label":"Originator Dissemination Control",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Originator control term",
          "repeatable":false
        },
        "b":{
          "label":"Originating agency",
          "repeatable":true
        },
        "c":{
          "label":"Authorized recipients of material",
          "repeatable":true
        },
        "g":{
          "label":"Other restrictions",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "361":{
      "label":"Structured Ownership and Custodial History",
      "indicator1":{
        "label":"Privacy",
        "codes":{
          " ":"No information provided",
          "0":"Private",
          "1":"Not private"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Name",
          "repeatable":false
        },
        "f":{
          "label":"Ownership and custodial history evidence term",
          "repeatable":true
        },
        "k":{
          "label":"Formatted date",
          "repeatable":false
        },
        "l":{
          "label":"Date",
          "repeatable":false
        },
        "o":{
          "label":"Type of ownership and custodial history information",
          "repeatable":true
        },
        "s":{
          "label":"Shelf mark of copy described",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "x":{
          "label":"Nonpublic note",
          "repeatable":true
        },
        "y":{
          "label":"Identifier of the copy described",
          "repeatable":false
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "362":{
      "label":"Dates of Publication and\/or Sequential Designation",
      "indicator1":{
        "label":"Format of date",
        "codes":{
          "0":"Formatted style",
          "1":"Unformatted note"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Dates of publication and\/or sequential designation",
          "repeatable":false
        },
        "z":{
          "label":"Source of information",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "363":{
      "label":"Normalized Date and Sequential Designation",
      "indicator1":{
        "label":"Start\/End designator",
        "codes":{
          " ":"No information provided",
          "0":"Starting information",
          "1":"Ending information"
        }
      },
      "indicator2":{
        "label":"State of issuance",
        "codes":{
          " ":"Not specified",
          "0":"Closed",
          "1":"Open"
        }
      },
      "subfields":{
        "a":{
          "label":"First level of enumeration",
          "repeatable":false
        },
        "b":{
          "label":"Second level of enumeration",
          "repeatable":false
        },
        "c":{
          "label":"Third level of enumeration",
          "repeatable":false
        },
        "d":{
          "label":"Fourth level of enumeration",
          "repeatable":false
        },
        "e":{
          "label":"Fifth level of enumeration",
          "repeatable":false
        },
        "f":{
          "label":"Sixth level of enumeration",
          "repeatable":false
        },
        "g":{
          "label":"Alternative numbering scheme, first level of enumeration",
          "repeatable":false
        },
        "h":{
          "label":"Alternative numbering scheme, second level of enumeration",
          "repeatable":false
        },
        "i":{
          "label":"First level of chronology",
          "repeatable":false
        },
        "j":{
          "label":"Second level of chronology",
          "repeatable":false
        },
        "k":{
          "label":"Third level of chronology",
          "repeatable":false
        },
        "l":{
          "label":"Fourth level of chronology",
          "repeatable":false
        },
        "m":{
          "label":"Alternative numbering scheme, chronology",
          "repeatable":false
        },
        "u":{
          "label":"First level textual designation",
          "repeatable":false
        },
        "v":{
          "label":"First level of chronology, issuance",
          "repeatable":false
        },
        "x":{
          "label":"Nonpublic note",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":false
        }
      },
      "repeatable":true
    },
    "365":{
      "label":"Trade Price",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Price type code",
          "repeatable":false
        },
        "b":{
          "label":"Price amount",
          "repeatable":false
        },
        "c":{
          "label":"Currency code",
          "repeatable":false
        },
        "d":{
          "label":"Unit of pricing",
          "repeatable":false
        },
        "e":{
          "label":"Price note",
          "repeatable":false
        },
        "f":{
          "label":"Price effective from",
          "repeatable":false
        },
        "g":{
          "label":"Price effective until",
          "repeatable":false
        },
        "h":{
          "label":"Tax rate 1",
          "repeatable":false
        },
        "i":{
          "label":"Tax rate 2",
          "repeatable":false
        },
        "j":{
          "label":"ISO country code",
          "repeatable":false
        },
        "k":{
          "label":"MARC country code",
          "repeatable":false
        },
        "m":{
          "label":"Identification of pricing entity",
          "repeatable":false
        },
        "2":{
          "label":"Source of price type code",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "366":{
      "label":"Trade Availability Information",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Publishers' compressed title identification",
          "repeatable":false
        },
        "b":{
          "label":"Detailed date of publication",
          "repeatable":false
        },
        "c":{
          "label":"Availability status code",
          "repeatable":false
        },
        "d":{
          "label":"Expected next availability date",
          "repeatable":false
        },
        "e":{
          "label":"Note",
          "repeatable":false
        },
        "f":{
          "label":"Publisher's discount category",
          "repeatable":false
        },
        "g":{
          "label":"Date made out of print",
          "repeatable":false
        },
        "j":{
          "label":"ISO country code",
          "repeatable":false
        },
        "k":{
          "label":"MARC country code",
          "repeatable":false
        },
        "m":{
          "label":"Identification of agency",
          "repeatable":false
        },
        "2":{
          "label":"Source of availability status code",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "370":{
      "label":"Associated Place",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "c":{
          "label":"Associated country",
          "repeatable":true
        },
        "f":{
          "label":"Other associated place",
          "repeatable":true
        },
        "g":{
          "label":"Place of origin of work or expression",
          "repeatable":true
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "s":{
          "label":"Start period",
          "repeatable":false
        },
        "t":{
          "label":"End period",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "v":{
          "label":"Source of information",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "377":{
      "label":"Associated Language",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Source of code",
        "codes":{
          " ":"MARC language code",
          "7":"Source specified in $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Language code",
          "repeatable":true
        },
        "l":{
          "label":"Language term",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "380":{
      "label":"Form of Work",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Form of work",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "381":{
      "label":"Other Distinguishing Characteristics of Work or Expression",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Other distinguishing characteristic",
          "repeatable":true
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "v":{
          "label":"Source of information",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "382":{
      "label":"Medium of Performance",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"No information provided",
          "0":"Medium of performance",
          "1":"Partial medium of performance",
          "2":"Medium of performance of musical content of representative expression",
          "3":"Partial medium of performance of musical content of representative expression"
        }
      },
      "indicator2":{
        "label":"Access control",
        "codes":{
          " ":"No information provided",
          "0":"Not intended for access",
          "1":"Intended for access"
        }
      },
      "subfields":{
        "a":{
          "label":"Medium of performance",
          "repeatable":true
        },
        "b":{
          "label":"Soloist",
          "repeatable":true
        },
        "d":{
          "label":"Doubling instrument",
          "repeatable":true
        },
        "e":{
          "label":"Number of ensembles of the same type",
          "repeatable":true
        },
        "n":{
          "label":"Number of performers of the same medium",
          "repeatable":true
        },
        "p":{
          "label":"Alternative medium of performance",
          "repeatable":true
        },
        "r":{
          "label":"Total number of individuals performing alongside ensembles",
          "repeatable":false
        },
        "s":{
          "label":"Total number of performers",
          "repeatable":false
        },
        "t":{
          "label":"Total number of ensembles",
          "repeatable":false
        },
        "v":{
          "label":"Note",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "383":{
      "label":"Numeric Designation of Musical Work",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Serial number",
          "repeatable":true
        },
        "b":{
          "label":"Opus number",
          "repeatable":true
        },
        "c":{
          "label":"Thematic index number",
          "repeatable":true
        },
        "d":{
          "label":"Thematic index code",
          "repeatable":false
        },
        "e":{
          "label":"Publisher associated with opus number",
          "repeatable":false
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "384":{
      "label":"Key",
      "indicator1":{
        "label":"Key type",
        "codes":{
          " ":"Relationship to original unknown",
          "0":"Original key",
          "1":"Transposed key",
          "2":"Key of representative expression"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Key",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "385":{
      "label":"Audience Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Audience term",
          "repeatable":true
        },
        "b":{
          "label":"Audience code",
          "repeatable":true
        },
        "m":{
          "label":"Demographic group term",
          "repeatable":false
        },
        "n":{
          "label":"Demographic group code",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "386":{
      "label":"Creator\/Contributor Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Creator\/contributor term",
          "repeatable":true
        },
        "b":{
          "label":"Creator\/contributor code",
          "repeatable":true
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "m":{
          "label":"Demographic group term",
          "repeatable":false
        },
        "n":{
          "label":"Demographic group code",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "387":{
      "label":"Representative Expression Characteristics",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Aspect ratio of representative expression",
          "repeatable":true
        },
        "b":{
          "label":"Color content of representative expression",
          "repeatable":true
        },
        "c":{
          "label":"Content type of representative expression",
          "repeatable":true
        },
        "d":{
          "label":"Date of capture of representative expression",
          "repeatable":true
        },
        "e":{
          "label":"Date of representative expression",
          "repeatable":true
        },
        "f":{
          "label":"Duration of representative expression",
          "repeatable":true
        },
        "g":{
          "label":"Intended audience of representative expression",
          "repeatable":true
        },
        "h":{
          "label":"Language of representative expression",
          "repeatable":true
        },
        "i":{
          "label":"Place of capture of representative expression",
          "repeatable":true
        },
        "j":{
          "label":"Projection of cartographic content of representative expression",
          "repeatable":true
        },
        "k":{
          "label":"Scale of representative expression",
          "repeatable":true
        },
        "l":{
          "label":"Script of representative expression",
          "repeatable":true
        },
        "m":{
          "label":"Sound content of representative expression",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "388":{
      "label":"Time Period of Creation",
      "indicator1":{
        "label":"Type of time period",
        "codes":{
          " ":"No information provided",
          "1":"Creation of work",
          "2":"Creation of aggregate work"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Time period of creation term",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "400":{
      "label":"Series Statement\/Added Entry-Personal Name",
      "indicator1":{
        "label":"Type of personal name entry element",
        "codes":{
          "0":"Forename",
          "1":"Surname",
          "3":"Family name"
        }
      },
      "indicator2":{
        "label":"Pronoun represents main entry",
        "codes":{
          "0":"Main entry not represented by pronoun",
          "1":"Main entry represented by pronoun"
        }
      },
      "subfields":{
        "a":{
          "label":"Personal name",
          "repeatable":false
        },
        "b":{
          "label":"Numeration",
          "repeatable":false
        },
        "c":{
          "label":"Titles and other words associated with a name",
          "repeatable":true
        },
        "d":{
          "label":"Dates associated with a name",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "v":{
          "label":"Volume\/sequential designation",
          "repeatable":false
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "4":{
          "label":"Relator code",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "410":{
      "label":"Series Statement\/Added Entry-Corporate Name",
      "indicator1":{
        "label":"Type of corporate name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Pronoun represents main entry",
        "codes":{
          "0":"Main entry not represented by pronoun",
          "1":"Main entry represented by pronoun"
        }
      },
      "subfields":{
        "a":{
          "label":"Corporate name or jurisdiction name as entry element",
          "repeatable":false
        },
        "b":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":false
        },
        "d":{
          "label":"Date of meeting or treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "v":{
          "label":"Volume\/sequential designation",
          "repeatable":false
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "4":{
          "label":"Relator code",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "411":{
      "label":"Series Statement\/Added Entry Meeting Name",
      "indicator1":{
        "label":"Type of meeting name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Pronoun represents main entry",
        "codes":{
          "0":"Main entry not represented by pronoun",
          "1":"Main entry represented by pronoun"
        }
      },
      "subfields":{
        "a":{
          "label":"Meeting name or jurisdiction name as entry element",
          "repeatable":false
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":false
        },
        "d":{
          "label":"Date of meeting",
          "repeatable":false
        },
        "e":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "q":{
          "label":"Name of meeting following jurisdiction name entry element",
          "repeatable":false
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "v":{
          "label":"Volume\/sequential designation",
          "repeatable":false
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "4":{
          "label":"Relator code",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "440":{
      "label":"Series Statement\/Added Entry-Title",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Nonfiling characters",
        "codes":{
          "0":"No nonfiling characters",
          "1-9":"Number of nonfiling characters"
        }
      },
      "subfields":{
        "a":{
          "label":"Title",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "v":{
          "label":"Volume\/sequential designation",
          "repeatable":false
        },
        "w":{
          "label":"Bibliographic record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "490":{
      "label":"Series Statement",
      "indicator1":{
        "label":"Series tracing policy",
        "codes":{
          "0":"Series not traced",
          "1":"Series traced"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Series statement",
          "repeatable":true
        },
        "l":{
          "label":"Library of Congress call number",
          "repeatable":false
        },
        "v":{
          "label":"Volume\/sequential designation",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":true
        },
        "y":{
          "label":"Incorrect ISSN",
          "repeatable":true
        },
        "z":{
          "label":"Canceled ISSN",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "500":{
      "label":"General Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"General note",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "501":{
      "label":"With Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"With note",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "502":{
      "label":"Dissertation Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Dissertation note",
          "repeatable":false
        },
        "b":{
          "label":"Degree type",
          "repeatable":false
        },
        "c":{
          "label":"Name of granting institution",
          "repeatable":false
        },
        "d":{
          "label":"Year degree granted",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "o":{
          "label":"Dissertation identifier",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "504":{
      "label":"Bibliography, Etc. Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Bibliography, etc. note",
          "repeatable":false
        },
        "b":{
          "label":"Number of references",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "505":{
      "label":"Formatted Contents Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          "0":"Contents",
          "1":"Incomplete contents",
          "2":"Partial contents",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Level of content designation",
        "codes":{
          " ":"Basic",
          "0":"Enhanced"
        }
      },
      "subfields":{
        "a":{
          "label":"Formatted contents note",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "r":{
          "label":"Statement of responsibility",
          "repeatable":true
        },
        "t":{
          "label":"Title",
          "repeatable":true
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "506":{
      "label":"Restrictions on Access Note",
      "indicator1":{
        "label":"Restriction",
        "codes":{
          " ":"No information provided",
          "0":"No restrictions",
          "1":"Restrictions apply"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Terms governing access",
          "repeatable":false
        },
        "b":{
          "label":"Jurisdiction",
          "repeatable":true
        },
        "c":{
          "label":"Physical access provisions",
          "repeatable":true
        },
        "d":{
          "label":"Authorized users",
          "repeatable":true
        },
        "e":{
          "label":"Authorization",
          "repeatable":true
        },
        "f":{
          "label":"Standardized terminology for access restriction",
          "repeatable":true
        },
        "g":{
          "label":"Availability date",
          "repeatable":true
        },
        "q":{
          "label":"Supplying agency",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "507":{
      "label":"Scale Note for Visual Materials",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Representative fraction of scale note",
          "repeatable":false
        },
        "b":{
          "label":"Remainder of scale note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "508":{
      "label":"Creation\/Production Credits Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Creation\/production credits note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "510":{
      "label":"Citation\/References Note",
      "indicator1":{
        "label":"Coverage\/location in source",
        "codes":{
          "0":"Coverage unknown",
          "1":"Coverage complete",
          "2":"Coverage is selective",
          "3":"Location in source not given",
          "4":"Location in source given"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Name of source",
          "repeatable":false
        },
        "b":{
          "label":"Coverage of source",
          "repeatable":false
        },
        "c":{
          "label":"Location within source",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "511":{
      "label":"Participant or Performer Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          "0":"No display constant generated",
          "1":"Cast"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Participant or performer note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "513":{
      "label":"Type of Report and Period Covered Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Type of report",
          "repeatable":false
        },
        "b":{
          "label":"Period covered",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "514":{
      "label":"Data Quality Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Attribute accuracy report",
          "repeatable":false
        },
        "b":{
          "label":"Attribute accuracy value",
          "repeatable":true
        },
        "c":{
          "label":"Attribute accuracy explanation",
          "repeatable":true
        },
        "d":{
          "label":"Logical consistency report",
          "repeatable":false
        },
        "e":{
          "label":"Completeness report",
          "repeatable":false
        },
        "f":{
          "label":"Horizontal position accuracy report",
          "repeatable":false
        },
        "g":{
          "label":"Horizontal position accuracy value",
          "repeatable":true
        },
        "h":{
          "label":"Horizontal position accuracy explanation",
          "repeatable":true
        },
        "i":{
          "label":"Vertical positional accuracy report",
          "repeatable":false
        },
        "j":{
          "label":"Vertical positional accuracy value",
          "repeatable":true
        },
        "k":{
          "label":"Vertical positional accuracy explanation",
          "repeatable":true
        },
        "m":{
          "label":"Cloud cover",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "z":{
          "label":"Display note",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "515":{
      "label":"Numbering Peculiarities Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Numbering peculiarities note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "516":{
      "label":"Type of Computer File or Data Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Type of file",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Type of computer file or data note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "518":{
      "label":"Date\/Time and Place of an Event Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Date\/time and place of an event note",
          "repeatable":false
        },
        "d":{
          "label":"Date of event",
          "repeatable":true
        },
        "o":{
          "label":"Other event information",
          "repeatable":true
        },
        "p":{
          "label":"Place of event",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "520":{
      "label":"Summary, Etc.",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Summary",
          "0":"Subject",
          "1":"Review",
          "2":"Scope and content",
          "3":"Abstract",
          "4":"Content advice",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Summary, etc.",
          "repeatable":false
        },
        "b":{
          "label":"Expansion of summary note",
          "repeatable":false
        },
        "c":{
          "label":"Assigning source",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "521":{
      "label":"Target Audience Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Audience",
          "0":"Reading grade level",
          "1":"Interest age level",
          "2":"Interest grade level",
          "3":"Special audience characteristics",
          "4":"Motivation\/interest level",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Target audience note",
          "repeatable":true
        },
        "b":{
          "label":"Source",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "522":{
      "label":"Geographic Coverage Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Geographic coverage",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Geographic coverage note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "524":{
      "label":"Preferred Citation of Described Materials Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Cite as",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Preferred citation of described materials note",
          "repeatable":false
        },
        "2":{
          "label":"Source of schema used",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "525":{
      "label":"Supplement Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Supplement note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "526":{
      "label":"Study Program Information Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          "0":"Reading program",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Program name",
          "repeatable":false
        },
        "b":{
          "label":"Interest level",
          "repeatable":false
        },
        "c":{
          "label":"Reading level",
          "repeatable":false
        },
        "d":{
          "label":"Title point value",
          "repeatable":false
        },
        "i":{
          "label":"Display text",
          "repeatable":false
        },
        "x":{
          "label":"Nonpublic note",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "530":{
      "label":"Additional Physical Form Available Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Additional physical form available note",
          "repeatable":false
        },
        "b":{
          "label":"Availability source",
          "repeatable":false
        },
        "c":{
          "label":"Availability conditions",
          "repeatable":false
        },
        "d":{
          "label":"Order number",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "532":{
      "label":"Accessibility Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          "0":"Accessibility technical details",
          "1":"Accessibility features",
          "2":"Accessibility deficiencies",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Summary of accessibility",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "533":{
      "label":"Reproduction Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Type of reproduction",
          "repeatable":false
        },
        "b":{
          "label":"Place of reproduction",
          "repeatable":true
        },
        "c":{
          "label":"Agency responsible for reproduction",
          "repeatable":true
        },
        "d":{
          "label":"Date of reproduction",
          "repeatable":false
        },
        "e":{
          "label":"Physical description of reproduction",
          "repeatable":false
        },
        "f":{
          "label":"Series statement of reproduction",
          "repeatable":true
        },
        "m":{
          "label":"Dates and\/or sequential designation of issues reproduced",
          "repeatable":true
        },
        "n":{
          "label":"Note about reproduction",
          "repeatable":true
        },
        "y":{
          "label":"Data provenance",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Fixed-length data elements of reproduction",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of date\/Publication status",
              "code":"0"
            },
            "1-4":{
              "label":"Date 1",
              "code":"1-4"
            },
            "5-8":{
              "label":"Date 2",
              "code":"5-8"
            },
            "9-11":{
              "label":"Place of publication, production, or execution",
              "code":"9-11"
            },
            "12":{
              "label":"Frequency",
              "code":"12"
            },
            "13":{
              "label":"Regularity",
              "code":"13"
            },
            "14":{
              "label":"Form of item",
              "code":"14"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "534":{
      "label":"Original Version Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry of original",
          "repeatable":false
        },
        "b":{
          "label":"Edition statement of original",
          "repeatable":false
        },
        "c":{
          "label":"Publication, distribution, etc. of original",
          "repeatable":false
        },
        "e":{
          "label":"Physical description, etc. of original",
          "repeatable":false
        },
        "f":{
          "label":"Series statement of original",
          "repeatable":true
        },
        "k":{
          "label":"Key title of original",
          "repeatable":true
        },
        "l":{
          "label":"Location of original",
          "repeatable":false
        },
        "m":{
          "label":"Material specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note about original",
          "repeatable":true
        },
        "o":{
          "label":"Other resource identifier",
          "repeatable":true
        },
        "p":{
          "label":"Introductory phrase",
          "repeatable":false
        },
        "t":{
          "label":"Title statement of original",
          "repeatable":false
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":true
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "535":{
      "label":"Location of Originals\/Duplicates Note",
      "indicator1":{
        "label":"Custodial role",
        "codes":{
          "1":"Holder of originals",
          "2":"Holder of duplicates"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Custodian",
          "repeatable":false
        },
        "b":{
          "label":"Postal address",
          "repeatable":true
        },
        "c":{
          "label":"Country",
          "repeatable":true
        },
        "d":{
          "label":"Telecommunications address",
          "repeatable":true
        },
        "g":{
          "label":"Repository location code",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "536":{
      "label":"Funding Information Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Text of note",
          "repeatable":false
        },
        "b":{
          "label":"Contract number",
          "repeatable":true
        },
        "c":{
          "label":"Grant number",
          "repeatable":true
        },
        "d":{
          "label":"Undifferentiated number",
          "repeatable":true
        },
        "e":{
          "label":"Program element number",
          "repeatable":true
        },
        "f":{
          "label":"Project number",
          "repeatable":true
        },
        "g":{
          "label":"Task number",
          "repeatable":true
        },
        "h":{
          "label":"Work unit number",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "538":{
      "label":"System Details Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"System details note",
          "repeatable":false
        },
        "i":{
          "label":"Display text",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "540":{
      "label":"Terms Governing Use and Reproduction Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Terms governing use and reproduction",
          "repeatable":false
        },
        "b":{
          "label":"Jurisdiction",
          "repeatable":false
        },
        "c":{
          "label":"Authorization",
          "repeatable":false
        },
        "d":{
          "label":"Authorized users",
          "repeatable":false
        },
        "f":{
          "label":"Use and reproduction rights",
          "repeatable":true
        },
        "g":{
          "label":"Availability date",
          "repeatable":true
        },
        "q":{
          "label":"Supplying agency",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "541":{
      "label":"Immediate Source of Acquisition Note",
      "indicator1":{
        "label":"Privacy",
        "codes":{
          " ":"No information provided",
          "0":"Private",
          "1":"Not private"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Source of acquisition",
          "repeatable":false
        },
        "b":{
          "label":"Address",
          "repeatable":false
        },
        "c":{
          "label":"Method of acquisition",
          "repeatable":false
        },
        "d":{
          "label":"Date of acquisition",
          "repeatable":false
        },
        "e":{
          "label":"Accession number",
          "repeatable":false
        },
        "f":{
          "label":"Owner",
          "repeatable":false
        },
        "h":{
          "label":"Purchase price",
          "repeatable":false
        },
        "n":{
          "label":"Extent",
          "repeatable":true
        },
        "o":{
          "label":"Type of unit",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "542":{
      "label":"Information Relating to Copyright Status",
      "indicator1":{
        "label":"Privacy",
        "codes":{
          " ":"No information provided",
          "0":"Private",
          "1":"Not private"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Personal creator",
          "repeatable":false
        },
        "b":{
          "label":"Personal creator death date",
          "repeatable":false
        },
        "c":{
          "label":"Corporate creator",
          "repeatable":false
        },
        "d":{
          "label":"Copyright holder",
          "repeatable":true
        },
        "e":{
          "label":"Copyright holder contact information",
          "repeatable":true
        },
        "f":{
          "label":"Copyright statement",
          "repeatable":true
        },
        "g":{
          "label":"Copyright date",
          "repeatable":false
        },
        "h":{
          "label":"Copyright renewal date",
          "repeatable":true
        },
        "i":{
          "label":"Publication date",
          "repeatable":false
        },
        "j":{
          "label":"Creation date",
          "repeatable":false
        },
        "l":{
          "label":"Copyright status",
          "repeatable":false
        },
        "m":{
          "label":"Publication status",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Research date",
          "repeatable":false
        },
        "p":{
          "label":"Country of publication or creation",
          "repeatable":true
        },
        "q":{
          "label":"Supplying agency",
          "repeatable":false
        },
        "r":{
          "label":"Jurisdiction of copyright assessment",
          "repeatable":false
        },
        "s":{
          "label":"Source of information",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        }
      },
      "repeatable":true
    },
    "544":{
      "label":"Location of Other Archival Materials Note",
      "indicator1":{
        "label":"Relationship",
        "codes":{
          " ":"No information provided",
          "0":"Associated materials",
          "1":"Related materials"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Custodian",
          "repeatable":true
        },
        "b":{
          "label":"Address",
          "repeatable":true
        },
        "c":{
          "label":"Country",
          "repeatable":true
        },
        "d":{
          "label":"Title",
          "repeatable":true
        },
        "e":{
          "label":"Provenance",
          "repeatable":true
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "545":{
      "label":"Biographical or Historical Data",
      "indicator1":{
        "label":"Type of data",
        "codes":{
          " ":"No information provided",
          "0":"Biographical sketch",
          "1":"Administrative history"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Biographical or historical data",
          "repeatable":false
        },
        "b":{
          "label":"Expansion",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "546":{
      "label":"Language Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Language note",
          "repeatable":false
        },
        "b":{
          "label":"Information code or alphabet",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "547":{
      "label":"Former Title Complexity Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Former title complexity note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "550":{
      "label":"Issuing Body Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Issuing body note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "552":{
      "label":"Entity and Attribute Information Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Entity type label",
          "repeatable":false
        },
        "b":{
          "label":"Entity type definition and source",
          "repeatable":false
        },
        "c":{
          "label":"Attribute label",
          "repeatable":false
        },
        "d":{
          "label":"Attribute definition and source",
          "repeatable":false
        },
        "e":{
          "label":"Enumerated domain value",
          "repeatable":true
        },
        "f":{
          "label":"Enumerated domain value definition and source",
          "repeatable":true
        },
        "g":{
          "label":"Range domain minimum and maximum",
          "repeatable":false
        },
        "h":{
          "label":"Codeset name and source",
          "repeatable":false
        },
        "i":{
          "label":"Unrepresentable domain",
          "repeatable":false
        },
        "j":{
          "label":"Attribute units of measurement and resolution",
          "repeatable":false
        },
        "k":{
          "label":"Beginning and ending date of attribute values",
          "repeatable":false
        },
        "l":{
          "label":"Attribute value accuracy",
          "repeatable":false
        },
        "m":{
          "label":"Attribute value accuracy explanation",
          "repeatable":false
        },
        "n":{
          "label":"Attribute measurement frequency",
          "repeatable":false
        },
        "o":{
          "label":"Entity and attribute overview",
          "repeatable":true
        },
        "p":{
          "label":"Entity and attribute detail citation",
          "repeatable":true
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "z":{
          "label":"Display note",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "555":{
      "label":"Cumulative Index\/Finding Aids Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Indexes",
          "0":"Finding aids",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Cumulative index\/finding aids note",
          "repeatable":false
        },
        "b":{
          "label":"Availability source",
          "repeatable":true
        },
        "c":{
          "label":"Degree of control",
          "repeatable":false
        },
        "d":{
          "label":"Bibliographic reference",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "556":{
      "label":"Information About Documentation Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Documentation",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Information about documentation note",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "561":{
      "label":"Ownership and Custodial History",
      "indicator1":{
        "label":"Privacy",
        "codes":{
          " ":"No information provided",
          "0":"Private",
          "1":"Not private"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"History",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "562":{
      "label":"Copy and Version Identification Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Identifying markings",
          "repeatable":true
        },
        "b":{
          "label":"Copy identification",
          "repeatable":true
        },
        "c":{
          "label":"Version identification",
          "repeatable":true
        },
        "d":{
          "label":"Presentation format",
          "repeatable":true
        },
        "e":{
          "label":"Number of copies",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "563":{
      "label":"Binding Information",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Binding note",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "565":{
      "label":"Case File Characteristics Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"File size",
          "0":"Case file characteristics",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Number of cases\/variables",
          "repeatable":false
        },
        "b":{
          "label":"Name of variable",
          "repeatable":true
        },
        "c":{
          "label":"Unit of analysis",
          "repeatable":true
        },
        "d":{
          "label":"Universe of data",
          "repeatable":true
        },
        "e":{
          "label":"Filing scheme or code",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "567":{
      "label":"Methodology Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Methodology",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Methodology note",
          "repeatable":false
        },
        "b":{
          "label":"Controlled term",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "580":{
      "label":"Linking Entry Complexity Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Linking entry complexity note",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "581":{
      "label":"Publications About Described Materials Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Publications",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Publications about described materials note",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "583":{
      "label":"Action Note",
      "indicator1":{
        "label":"Privacy",
        "codes":{
          " ":"No information provided",
          "0":"Private",
          "1":"Not private"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Action",
          "repeatable":false
        },
        "b":{
          "label":"Action identification",
          "repeatable":true
        },
        "c":{
          "label":"Time\/date of action",
          "repeatable":true
        },
        "d":{
          "label":"Action interval",
          "repeatable":true
        },
        "e":{
          "label":"Contingency for action",
          "repeatable":true
        },
        "f":{
          "label":"Authorization",
          "repeatable":true
        },
        "h":{
          "label":"Jurisdiction",
          "repeatable":true
        },
        "i":{
          "label":"Method of action",
          "repeatable":true
        },
        "j":{
          "label":"Site of action",
          "repeatable":true
        },
        "k":{
          "label":"Action agent",
          "repeatable":true
        },
        "l":{
          "label":"Status",
          "repeatable":true
        },
        "n":{
          "label":"Extent",
          "repeatable":true
        },
        "o":{
          "label":"Type of unit",
          "repeatable":true
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "x":{
          "label":"Nonpublic note",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "584":{
      "label":"Accumulation and Frequency of Use Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Accumulation",
          "repeatable":true
        },
        "b":{
          "label":"Frequency of use",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "585":{
      "label":"Exhibitions Note",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Exhibitions note",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "586":{
      "label":"Awards Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
          " ":"Awards",
          "8":"No display constant generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Awards note",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "588":{
      "label":"Source of Description Note",
      "indicator1":{
        "label":"Display constant controller",
        "codes":{
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Source of description note",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "600":{
      "label":"Subject Added Entry-Personal Name",
      "indicator1":{
        "label":"Type of personal name entry element",
        "codes":{
          "0":"Forename",
          "1":"Surname",
          "3":"Family name"
        }
      },
      "indicator2":{
        "label":"Thesaurus",
        "codes":{
          "0":"Library of Congress Subject Headings",
          "1":"Library of Congress Children's and Young Adults' Subject Headings",
          "2":"Medical Subject Headings",
          "3":"National Agricultural Library subject authority file",
          "4":"Source not specified",
          "5":"Canadian Subject Headings",
          "6":"Répertoire de vedettes-matière",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Personal name",
          "repeatable":false
        },
        "b":{
          "label":"Numeration",
          "repeatable":false
        },
        "c":{
          "label":"Titles and other words associated with a name",
          "repeatable":true
        },
        "d":{
          "label":"Dates associated with a name",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "j":{
          "label":"Attribution qualifier",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "q":{
          "label":"Fuller form of name",
          "repeatable":false
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "610":{
      "label":"Subject Added Entry-Corporate Name",
      "indicator1":{
        "label":"Type of corporate name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Thesaurus",
        "codes":{
          "0":"Library of Congress Subject Headings",
          "1":"Library of Congress Children's and Young Adults' Subject Headings",
          "2":"Medical Subject Headings",
          "3":"National Agricultural Library subject authority file",
          "4":"Source not specified",
          "5":"Canadian Subject Headings",
          "6":"Répertoire de vedettes-matière",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Corporate name or jurisdiction name as entry element",
          "repeatable":false
        },
        "b":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":true
        },
        "d":{
          "label":"Date of meeting or treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "611":{
      "label":"Subject Added Entry-Meeting Name",
      "indicator1":{
        "label":"Type of meeting name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Thesaurus",
        "codes":{
          "0":"Library of Congress Subject Headings",
          "1":"Library of Congress Children's and Young Adults' Subject Headings",
          "2":"Medical Subject Headings",
          "3":"National Agricultural Library subject authority file",
          "4":"Source not specified",
          "5":"Canadian Subject Headings",
          "6":"Répertoire de vedettes-matière",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Meeting name or jurisdiction name as entry element",
          "repeatable":false
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":true
        },
        "d":{
          "label":"Date of meeting or treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "j":{
          "label":"Relator term",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "q":{
          "label":"Name of meeting following jurisdiction name entry element",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "630":{
      "label":"Subject Added Entry-Uniform Title",
      "indicator1":{
        "label":"Nonfiling characters",
        "codes":{
          "0-9":"Number of nonfiling characters"
        }
      },
      "indicator2":{
        "label":"Thesaurus",
        "codes":{
          "0":"Library of Congress Subject Headings",
          "1":"Library of Congress Children's and Young Adults' Subject Headings",
          "2":"Medical Subject Headings",
          "3":"National Agricultural Library subject authority file",
          "4":"Source not specified",
          "5":"Canadian Subject Headings",
          "6":"Répertoire de vedettes-matière",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Uniform title",
          "repeatable":false
        },
        "d":{
          "label":"Date of treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "647":{
      "label":"Subject Added Entry-Named Event",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Thesaurus",
        "codes":{
          "0":"Library of Congress Subject Headings",
          "1":"Library of Congress Children's and Young Adults' Subject Headings",
          "2":"Medical Subject Headings",
          "3":"National Agricultural Library subject authority file",
          "4":"Source not specified",
          "5":"Canadian Subject Headings",
          "6":"Répertoire de vedettes-matière",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Named event",
          "repeatable":false
        },
        "c":{
          "label":"Location of named event",
          "repeatable":true
        },
        "d":{
          "label":"Date of named event",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "648":{
      "label":"Subject Added Entry-Chronological Term",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Thesaurus",
        "codes":{
          "0":"Library of Congress Subject Headings",
          "1":"Library of Congress Children's and Young Adults' Subject Headings",
          "2":"Medical Subject Headings",
          "3":"National Agricultural Library subject authority file",
          "4":"Source not specified",
          "5":"Canadian Subject Headings",
          "6":"Répertoire de vedettes-matière",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Chronological term",
          "repeatable":false
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "650":{
      "label":"Subject Added Entry-Topical Term",
      "indicator1":{
        "label":"Level of subject",
        "codes":{
          " ":"No information provided",
          "0":"No level specified",
          "1":"Primary",
          "2":"Secondary"
        }
      },
      "indicator2":{
        "label":"Thesaurus",
        "codes":{
          "0":"Library of Congress Subject Headings",
          "1":"Library of Congress Children's and Young Adults' Subject Headings",
          "2":"Medical Subject Headings",
          "3":"National Agricultural Library subject authority file",
          "4":"Source not specified",
          "5":"Canadian Subject Headings",
          "6":"Répertoire de vedettes-matière",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Topical term or geographic name entry element",
          "repeatable":false
        },
        "b":{
          "label":"Topical term following geographic name entry element",
          "repeatable":false
        },
        "c":{
          "label":"Location of event",
          "repeatable":false
        },
        "d":{
          "label":"Active dates",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "651":{
      "label":"Subject Added Entry-Geographic Name",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Thesaurus",
        "codes":{
          "0":"Library of Congress Subject Headings",
          "1":"Library of Congress Children's and Young Adults' Subject Headings",
          "2":"Medical Subject Headings",
          "3":"National Agricultural Library subject authority file",
          "4":"Source not specified",
          "5":"Canadian Subject Headings",
          "6":"Répertoire de vedettes-matière",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Geographic name",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "653":{
      "label":"Index Term-Uncontrolled",
      "indicator1":{
        "label":"Level of index term",
        "codes":{
          " ":"No information provided",
          "0":"No level specified",
          "1":"Primary",
          "2":"Secondary"
        }
      },
      "indicator2":{
        "label":"Type of term or name",
        "codes":{
          " ":"No information provided",
          "0":"Topical term",
          "1":"Personal name",
          "2":"Corporate name",
          "3":"Meeting name",
          "4":"Chronological term",
          "5":"Geographic name",
          "6":"Genre\/form term"
        }
      },
      "subfields":{
        "a":{
          "label":"Uncontrolled term",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "654":{
      "label":"Subject Added Entry-Faceted Topical Terms",
      "indicator1":{
        "label":"Level of subject",
        "codes":{
          " ":"No information provided",
          "0":"No level specified",
          "1":"Primary",
          "2":"Secondary"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Focus term",
          "repeatable":true
        },
        "b":{
          "label":"Non-focus term",
          "repeatable":true
        },
        "c":{
          "label":"Facet\/hierarchy designation",
          "repeatable":true
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "655":{
      "label":"Index Term-Genre\/Form",
      "indicator1":{
        "label":"Type of heading",
        "codes":{
          " ":"Basic",
          "0":"Faceted"
        }
      },
      "indicator2":{
        "label":"Thesaurus",
        "codes":{
          "0":"Library of Congress Subject Headings",
          "1":"Library of Congress Children's and Young Adults' Subject Headings",
          "2":"Medical Subject Headings",
          "3":"National Agricultural Library subject authority file",
          "4":"Source not specified",
          "5":"Canadian Subject Headings",
          "6":"Répertoire de vedettes-matière",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Genre\/form data or focus term",
          "repeatable":false
        },
        "b":{
          "label":"Non-focus term",
          "repeatable":true
        },
        "c":{
          "label":"Facet\/hierarchy designation",
          "repeatable":true
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "656":{
      "label":"Index Term-Occupation",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Source of term",
        "codes":{
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Occupation",
          "repeatable":false
        },
        "k":{
          "label":"Form",
          "repeatable":false
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "657":{
      "label":"Index Term-Function",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Source of term",
        "codes":{
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Function",
          "repeatable":false
        },
        "v":{
          "label":"Form subdivision",
          "repeatable":true
        },
        "x":{
          "label":"General subdivision",
          "repeatable":true
        },
        "y":{
          "label":"Chronological subdivision",
          "repeatable":true
        },
        "z":{
          "label":"Geographic subdivision",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "658":{
      "label":"Index Term-Curriculum Objective",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Main curriculum objective",
          "repeatable":false
        },
        "b":{
          "label":"Subordinate curriculum objective",
          "repeatable":true
        },
        "c":{
          "label":"Curriculum code",
          "repeatable":false
        },
        "d":{
          "label":"Correlation factor",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term or code",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "662":{
      "label":"Subject Added Entry-Hierarchical Place Name",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Country or larger entity",
          "repeatable":true
        },
        "b":{
          "label":"First-order political jurisdiction",
          "repeatable":false
        },
        "c":{
          "label":"Intermediate political jurisdiction",
          "repeatable":true
        },
        "d":{
          "label":"City",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"City subsection",
          "repeatable":true
        },
        "g":{
          "label":"Other nonjurisdictional geographic region and feature",
          "repeatable":true
        },
        "h":{
          "label":"Extraterrestrial area",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "688":{
      "label":"Subject Added Entry-Type of Entity Unspecified",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Source of name, title, or term",
        "codes":{
          " ":"No information provided",
          "7":"Source specified in subfield $2"
        }
      },
      "subfields":{
        "a":{
          "label":"Name, title, or term",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of name, title, or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "700":{
      "label":"Added Entry-Personal Name",
      "indicator1":{
        "label":"Type of personal name entry element",
        "codes":{
          "0":"Forename",
          "1":"Surname",
          "3":"Family name"
        }
      },
      "indicator2":{
        "label":"Type of added entry",
        "codes":{
          " ":"No information provided",
          "2":"Analytical entry"
        }
      },
      "subfields":{
        "a":{
          "label":"Personal name",
          "repeatable":false
        },
        "b":{
          "label":"Numeration",
          "repeatable":false
        },
        "c":{
          "label":"Titles and other words associated with a name",
          "repeatable":true
        },
        "d":{
          "label":"Dates associated with a name",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "j":{
          "label":"Attribution qualifier",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "q":{
          "label":"Fuller form of name",
          "repeatable":false
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "710":{
      "label":"Added Entry-Corporate Name",
      "indicator1":{
        "label":"Type of corporate name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Type of added entry",
        "codes":{
          " ":"No information provided",
          "2":"Analytical entry"
        }
      },
      "subfields":{
        "a":{
          "label":"Corporate name or jurisdiction name as entry element",
          "repeatable":false
        },
        "b":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":true
        },
        "d":{
          "label":"Date of meeting or treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "711":{
      "label":"Added Entry-Meeting Name",
      "indicator1":{
        "label":"Type of meeting name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Type of added entry",
        "codes":{
          " ":"No information provided",
          "2":"Analytical entry"
        }
      },
      "subfields":{
        "a":{
          "label":"Meeting name or jurisdiction name as entry element",
          "repeatable":false
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":true
        },
        "d":{
          "label":"Date of meeting or treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "j":{
          "label":"Relator term",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "q":{
          "label":"Name of meeting following jurisdiction name entry element",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "720":{
      "label":"Added Entry-Uncontrolled Name",
      "indicator1":{
        "label":"Type of name",
        "codes":{
          " ":"Not specified",
          "1":"Personal",
          "2":"Other"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Name",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "730":{
      "label":"Added Entry-Uniform Title",
      "indicator1":{
        "label":"Nonfiling characters",
        "codes":{
          "0-9":"Number of nonfiling characters"
        }
      },
      "indicator2":{
        "label":"Type of added entry",
        "codes":{
          " ":"No information provided",
          "2":"Analytical entry"
        }
      },
      "subfields":{
        "a":{
          "label":"Uniform title",
          "repeatable":false
        },
        "d":{
          "label":"Date of treaty signing",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "740":{
      "label":"Added Entry-Uncontrolled Related\/Analytical Title",
      "indicator1":{
        "label":"Nonfiling characters",
        "codes":{
          "0":"No nonfiling characters",
          "1-9":"Number of nonfiling characters"
        }
      },
      "indicator2":{
        "label":"Type of added entry",
        "codes":{
          " ":"No information provided",
          "2":"Analytical entry"
        }
      },
      "subfields":{
        "a":{
          "label":"Uncontrolled related\/analytical title",
          "repeatable":false
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "751":{
      "label":"Added Entry-Geographic Name",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Geographic name",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Data provenance",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "752":{
      "label":"Added Entry-Hierarchical Place Name",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Country or larger entity",
          "repeatable":true
        },
        "b":{
          "label":"First-order political jurisdiction",
          "repeatable":false
        },
        "c":{
          "label":"Intermediate political jurisdiction",
          "repeatable":true
        },
        "d":{
          "label":"City",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"City subsection",
          "repeatable":true
        },
        "g":{
          "label":"Other nonjurisdictional geographic region and feature",
          "repeatable":true
        },
        "h":{
          "label":"Extraterrestrial area",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "753":{
      "label":"System Details Access to Computer Files",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Make and model of machine",
          "repeatable":false
        },
        "b":{
          "label":"Programming language",
          "repeatable":false
        },
        "c":{
          "label":"Operating system",
          "repeatable":false
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of term",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "754":{
      "label":"Added Entry-Taxonomic Identification",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Taxonomic name",
          "repeatable":true
        },
        "c":{
          "label":"Taxonomic category",
          "repeatable":true
        },
        "d":{
          "label":"Common or alternative name",
          "repeatable":true
        },
        "x":{
          "label":"Non-public note",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of taxonomic identification",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "758":{
      "label":"Resource Identifier",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Label",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "760":{
      "label":"Main Series Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Main series",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "762":{
      "label":"Subseries Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Has subseries",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "765":{
      "label":"Original Language Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Translation of",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "767":{
      "label":"Translation Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Translated as",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "770":{
      "label":"Supplement\/Special Issue Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Has supplement",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "772":{
      "label":"Supplement Parent Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Supplement to",
          "0":"Parent",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "773":{
      "label":"Host Item Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"In",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "p":{
          "label":"Abbreviated title",
          "repeatable":false
        },
        "q":{
          "label":"Enumeration and first page",
          "repeatable":false
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "774":{
      "label":"Constituent Unit Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Constituent unit",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "775":{
      "label":"Other Edition Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Other edition available",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "e":{
          "label":"Language code",
          "repeatable":false
        },
        "f":{
          "label":"Country code",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "776":{
      "label":"Additional Physical Form Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Available in another form",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "777":{
      "label":"Issued With Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Issued with",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "780":{
      "label":"Preceding Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Type of relationship",
        "codes":{
          "0":"Continues",
          "1":"Continues in part",
          "2":"Supersedes",
          "3":"Supersedes in part",
          "4":"Formed by the union of ... and ...",
          "5":"Absorbed",
          "6":"Absorbed in part",
          "7":"Separated from"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "785":{
      "label":"Succeeding Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Type of relationship",
        "codes":{
          "0":"Continued by",
          "1":"Continued in part by",
          "2":"Superseded by",
          "3":"Superseded in part by",
          "4":"Absorbed by",
          "5":"Absorbed in part by",
          "6":"Split into ... and ...",
          "7":"Merged with ... to form ...",
          "8":"Changed back to"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "786":{
      "label":"Data Source Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Data source",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "j":{
          "label":"Period of content",
          "repeatable":false
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "p":{
          "label":"Abbreviated title",
          "repeatable":false
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "v":{
          "label":"Source Contribution",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "787":{
      "label":"Other Relationship Entry",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Related item",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "c":{
          "label":"Qualifying information",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "g":{
          "label":"Related parts",
          "repeatable":true
        },
        "h":{
          "label":"Physical description",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "k":{
          "label":"Series data for related item",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "m":{
          "label":"Material-specific details",
          "repeatable":false
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "o":{
          "label":"Other item identifier",
          "repeatable":true
        },
        "r":{
          "label":"Report number",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "u":{
          "label":"Standard Technical Report Number",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"CODEN designation",
          "repeatable":false
        },
        "z":{
          "label":"International Standard Book Number",
          "repeatable":true
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of main entry heading",
              "code":"0"
            },
            "1":{
              "label":"Form of name",
              "code":"1"
            },
            "2":{
              "label":"Type of record",
              "code":"2"
            },
            "3":{
              "label":"Bibliographic level",
              "code":"3"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "788":{
      "label":"Parallel Description in Another Language of Cataloging",
      "indicator1":{
        "label":"Note controller",
        "codes":{
          "0":"Display note",
          "1":"Do not display note"
        }
      },
      "indicator2":{
        "label":"Display constant controller",
        "codes":{
          " ":"Parallel description in another language of cataloging",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Main entry heading",
          "repeatable":false
        },
        "b":{
          "label":"Edition",
          "repeatable":false
        },
        "d":{
          "label":"Place, publisher, and date of publication",
          "repeatable":false
        },
        "e":{
          "label":"Language of cataloging",
          "repeatable":false
        },
        "i":{
          "label":"Relationship information",
          "repeatable":true
        },
        "l":{
          "label":"Data provenance",
          "repeatable":true
        },
        "n":{
          "label":"Note",
          "repeatable":true
        },
        "s":{
          "label":"Uniform title",
          "repeatable":false
        },
        "t":{
          "label":"Title",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "800":{
      "label":"Series Added Entry-Personal Name",
      "indicator1":{
        "label":"Type of personal name entry element",
        "codes":{
          "0":"Forename",
          "1":"Surname",
          "3":"Family name"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Personal name",
          "repeatable":false
        },
        "b":{
          "label":"Numeration",
          "repeatable":false
        },
        "c":{
          "label":"Titles and other words associated with a name",
          "repeatable":true
        },
        "d":{
          "label":"Dates associated with a name",
          "repeatable":false
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "j":{
          "label":"Attribution qualifier",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "q":{
          "label":"Fuller form of name",
          "repeatable":false
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "v":{
          "label":"Volume\/sequential designation",
          "repeatable":false
        },
        "w":{
          "label":"Bibliographic record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"Data provenance",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of record",
              "code":"0"
            },
            "1":{
              "label":"Bibliographic level",
              "code":"1"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "810":{
      "label":"Series Added Entry-Corporate Name",
      "indicator1":{
        "label":"Type of corporate name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Corporate name or jurisdiction name as entry element",
          "repeatable":false
        },
        "b":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":true
        },
        "d":{
          "label":"Date of meeting or treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Relator term",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "v":{
          "label":"Volume\/sequential designation",
          "repeatable":false
        },
        "w":{
          "label":"Bibliographic record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"Data provenance",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of record",
              "code":"0"
            },
            "1":{
              "label":"Bibliographic level",
              "code":"1"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "811":{
      "label":"Series Added Entry-Meeting Name",
      "indicator1":{
        "label":"Type of meeting name entry element",
        "codes":{
          "0":"Inverted name",
          "1":"Jurisdiction name",
          "2":"Name in direct order"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Meeting name or jurisdiction name as entry element",
          "repeatable":false
        },
        "c":{
          "label":"Location of meeting",
          "repeatable":true
        },
        "d":{
          "label":"Date of meeting or treaty signing",
          "repeatable":true
        },
        "e":{
          "label":"Subordinate unit",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "j":{
          "label":"Relator term",
          "repeatable":true
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "n":{
          "label":"Number of part\/section\/meeting",
          "repeatable":true
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "q":{
          "label":"Name of meeting following jurisdiction name entry element",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "u":{
          "label":"Affiliation",
          "repeatable":false
        },
        "v":{
          "label":"Volume\/sequential designation",
          "repeatable":false
        },
        "w":{
          "label":"Bibliographic record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"Data provenance",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "4":{
          "label":"Relationship",
          "repeatable":true
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of record",
              "code":"0"
            },
            "1":{
              "label":"Bibliographic level",
              "code":"1"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "830":{
      "label":"Series Added Entry-Uniform Title",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Nonfiling characters",
        "codes":{
          "0":"No nonfiling characters",
          "1-9":"Number of nonfiling characters"
        }
      },
      "subfields":{
        "a":{
          "label":"Uniform title",
          "repeatable":false
        },
        "d":{
          "label":"Date of treaty signing",
          "repeatable":true
        },
        "f":{
          "label":"Date of a work",
          "repeatable":false
        },
        "g":{
          "label":"Miscellaneous information",
          "repeatable":true
        },
        "h":{
          "label":"Medium",
          "repeatable":false
        },
        "k":{
          "label":"Form subheading",
          "repeatable":true
        },
        "l":{
          "label":"Language of a work",
          "repeatable":false
        },
        "m":{
          "label":"Medium of performance for music",
          "repeatable":true
        },
        "n":{
          "label":"Number of part\/section of a work",
          "repeatable":true
        },
        "o":{
          "label":"Arranged statement for music",
          "repeatable":false
        },
        "p":{
          "label":"Name of part\/section of a work",
          "repeatable":true
        },
        "r":{
          "label":"Key for music",
          "repeatable":false
        },
        "s":{
          "label":"Version",
          "repeatable":true
        },
        "t":{
          "label":"Title of a work",
          "repeatable":false
        },
        "v":{
          "label":"Volume\/sequential designation",
          "repeatable":false
        },
        "w":{
          "label":"Bibliographic record control number",
          "repeatable":true
        },
        "x":{
          "label":"International Standard Serial Number",
          "repeatable":false
        },
        "y":{
          "label":"Data provenance",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source of heading or term",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Control subfield",
          "repeatable":false,
          "codes":{
            "0":{
              "label":"Type of record",
              "code":"0"
            },
            "1":{
              "label":"Bibliographic level",
              "code":"1"
            }
          }
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "850":{
      "label":"Holding Institution",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Holding institution",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "852":{
      "label":"Location",
      "indicator1":{
        "label":"Shelving scheme",
        "codes":{
          " ":"No information provided",
          "0":"Library of Congress classification",
          "1":"Dewey Decimal classification",
          "2":"National Library of Medicine classification",
          "3":"Superintendent of Documents classification",
          "4":"Shelving control number",
          "5":"Title",
          "6":"Shelved separately",
          "7":"Source specified in subfield $2",
          "8":"Other scheme"
        }
      },
      "indicator2":{
        "label":"Shelving order",
        "codes":{
          " ":"No information provided",
          "0":"Not enumeration",
          "1":"Primary enumeration",
          "2":"Alternative enumeration"
        }
      },
      "subfields":{
        "a":{
          "label":"Location",
          "repeatable":false
        },
        "b":{
          "label":"Sublocation or collection",
          "repeatable":true
        },
        "c":{
          "label":"Shelving location",
          "repeatable":true
        },
        "d":{
          "label":"Former shelving location",
          "repeatable":true
        },
        "e":{
          "label":"Address",
          "repeatable":true
        },
        "f":{
          "label":"Coded location qualifier",
          "repeatable":true
        },
        "g":{
          "label":"Non-coded location qualifier",
          "repeatable":true
        },
        "h":{
          "label":"Classification part",
          "repeatable":false
        },
        "i":{
          "label":"Item part",
          "repeatable":true
        },
        "j":{
          "label":"Shelving control number",
          "repeatable":false
        },
        "k":{
          "label":"Call number prefix",
          "repeatable":true
        },
        "l":{
          "label":"Shelving form of title",
          "repeatable":false
        },
        "m":{
          "label":"Call number suffix",
          "repeatable":true
        },
        "n":{
          "label":"Country code",
          "repeatable":false
        },
        "p":{
          "label":"Piece designation",
          "repeatable":false
        },
        "q":{
          "label":"Piece physical condition",
          "repeatable":false
        },
        "s":{
          "label":"Copyright article-fee code",
          "repeatable":true
        },
        "t":{
          "label":"Copy number",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "x":{
          "label":"Nonpublic note",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "2":{
          "label":"Source of classification or shelving scheme",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Sequence number",
          "repeatable":false
        }
      },
      "repeatable":true
    },
    "856":{
      "label":"Electronic Location and Access",
      "indicator1":{
        "label":"Access method",
        "codes":{
          " ":"No information provided",
          "0":"Email",
          "1":"FTP",
          "2":"Remote login (Telnet)",
          "3":"Dial-up",
          "4":"HTTP",
          "7":"Method specified in subfield $2"
        }
      },
      "indicator2":{
        "label":"Relationship",
        "codes":{
          " ":"No information provided",
          "0":"Resource",
          "1":"Version of resource",
          "2":"Related resource",
          "3":"Component part(s) of resource",
          "4":"Version of component part(s) of resource",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "a":{
          "label":"Host name",
          "repeatable":true
        },
        "c":{
          "label":"Compression information",
          "repeatable":true
        },
        "d":{
          "label":"Path",
          "repeatable":true
        },
        "e":{
          "label":"Data provenance",
          "repeatable":true
        },
        "f":{
          "label":"Electronic name",
          "repeatable":true
        },
        "g":{
          "label":"Persistent identifier",
          "repeatable":true
        },
        "h":{
          "label":"Non-functioning Uniform Resource Identifier",
          "repeatable":true
        },
        "l":{
          "label":"Standardized information governing access",
          "repeatable":true
        },
        "m":{
          "label":"Contact for access assistance",
          "repeatable":true
        },
        "n":{
          "label":"Terms governing access",
          "repeatable":true
        },
        "o":{
          "label":"Operating system",
          "repeatable":false
        },
        "p":{
          "label":"Port",
          "repeatable":false
        },
        "q":{
          "label":"Electronic format type",
          "repeatable":true
        },
        "r":{
          "label":"Standardized information governing use and reproduction",
          "repeatable":true
        },
        "s":{
          "label":"File size",
          "repeatable":true
        },
        "t":{
          "label":"Terms governing use and reproduction",
          "repeatable":true
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "v":{
          "label":"Hours access method available",
          "repeatable":true
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"Nonpublic note",
          "repeatable":true
        },
        "y":{
          "label":"Link text",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "2":{
          "label":"Access method",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Access status",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "857":{
      "label":"Electronic Archive Location and Access",
      "indicator1":{
        "label":"Access method",
        "codes":{
          " ":"No information provided",
          "1":"FTP",
          "4":"HTTP",
          "7":"Method specified in subfield $2"
        }
      },
      "indicator2":{
        "label":"Relationship",
        "codes":{
          " ":"No information provided",
          "0":"Resource",
          "1":"Version of resource",
          "2":"Related resource",
          "3":"Component part(s) of resource",
          "4":"Version of component part(s) of resource",
          "8":"No display constant generated"
        }
      },
      "subfields":{
        "b":{
          "label":"Name of archiving agency",
          "repeatable":false
        },
        "c":{
          "label":"Name of Web archive or digital archive repository",
          "repeatable":false
        },
        "d":{
          "label":"Date range of archived material",
          "repeatable":false
        },
        "e":{
          "label":"Data provenance",
          "repeatable":true
        },
        "f":{
          "label":"Archive completeness",
          "repeatable":false
        },
        "g":{
          "label":"Persistent identifier",
          "repeatable":true
        },
        "h":{
          "label":"Non-functioning Uniform Resource Identifier",
          "repeatable":true
        },
        "l":{
          "label":"Standardized information governing access",
          "repeatable":true
        },
        "m":{
          "label":"Contact for access assistance",
          "repeatable":true
        },
        "n":{
          "label":"Terms governing access",
          "repeatable":true
        },
        "q":{
          "label":"Electronic format type",
          "repeatable":true
        },
        "r":{
          "label":"Standardized information governing use and reproduction",
          "repeatable":true
        },
        "s":{
          "label":"File size",
          "repeatable":true
        },
        "t":{
          "label":"Terms governing use and reproduction",
          "repeatable":true
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        },
        "x":{
          "label":"Nonpublic note",
          "repeatable":true
        },
        "y":{
          "label":"Link text",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "2":{
          "label":"Access method",
          "repeatable":false
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7":{
          "label":"Access status",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "880":{
      "label":"Alternate Graphic Representation",
      "indicator1":{
        "label":"Appropriate indicator as available in associated field",
        "codes":{
        }
      },
      "indicator2":{
        "label":"Appropriate indicator as available in associated field",
        "codes":{
        }
      },
      "subfields":{
        "a-z":{
          "label":"",
          "repeatable":false
        },
        "0-5":{
          "label":"",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "7-9":{
          "label":"",
          "repeatable":false
        }
      },
      "repeatable":true
    },
    "881":{
      "label":"Manifestation Statements",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Manifestation statement, high-level\/general",
          "repeatable":true
        },
        "b":{
          "label":"Manifestation identifier statement",
          "repeatable":true
        },
        "c":{
          "label":"Manifestation title and responsibility statement",
          "repeatable":true
        },
        "d":{
          "label":"Manifestation edition statement",
          "repeatable":true
        },
        "e":{
          "label":"Manifestation production statement",
          "repeatable":true
        },
        "f":{
          "label":"Manifestation publication statement",
          "repeatable":true
        },
        "g":{
          "label":"Manifestation distribution statement",
          "repeatable":true
        },
        "h":{
          "label":"Manifestation manufacture statement",
          "repeatable":true
        },
        "i":{
          "label":"Manifestation copyright statement",
          "repeatable":true
        },
        "j":{
          "label":"Manifestation frequency statement",
          "repeatable":true
        },
        "k":{
          "label":"Manifestation designation of sequence statement",
          "repeatable":true
        },
        "l":{
          "label":"Manifestation series statement",
          "repeatable":true
        },
        "m":{
          "label":"Manifestation dissertation statement",
          "repeatable":true
        },
        "n":{
          "label":"Manifestation regional encoding statement",
          "repeatable":true
        },
        "3":{
          "label":"Materials specified",
          "repeatable":false
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "882":{
      "label":"Replacement Record Information",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Replacement title",
          "repeatable":true
        },
        "i":{
          "label":"Explanatory text",
          "repeatable":true
        },
        "w":{
          "label":"Replacement bibliographic record control number",
          "repeatable":true
        },
        "6":{
          "label":"Linkage",
          "repeatable":false
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":false
    },
    "883":{
      "label":"Metadata Provenance",
      "indicator1":{
        "label":"Method of assignment",
        "codes":{
          " ":"No information provided\/not applicable",
          "0":"Fully machine-generated",
          "1":"Partially machine-generated",
          "2":"Not machine-generated"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Creation process",
          "repeatable":false
        },
        "c":{
          "label":"Confidence value",
          "repeatable":false
        },
        "d":{
          "label":"Creation date",
          "repeatable":false
        },
        "q":{
          "label":"Assigning or generating agency",
          "repeatable":false
        },
        "x":{
          "label":"Validity end date",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":false
        },
        "w":{
          "label":"Bibliographic record control number",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "8":{
          "label":"Field link and sequence number",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "884":{
      "label":"Description Conversion Information",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Conversion process",
          "repeatable":false
        },
        "g":{
          "label":"Conversion date",
          "repeatable":false
        },
        "k":{
          "label":"Identifier of source metadata",
          "repeatable":false
        },
        "q":{
          "label":"Conversion agency",
          "repeatable":false
        },
        "u":{
          "label":"Uniform Resource Identifier",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "885":{
      "label":"Matching Information",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Matching information",
          "repeatable":false
        },
        "b":{
          "label":"Status of matching and its checking",
          "repeatable":false
        },
        "c":{
          "label":"Confidence value",
          "repeatable":false
        },
        "d":{
          "label":"Generation date",
          "repeatable":false
        },
        "w":{
          "label":"Record control number",
          "repeatable":true
        },
        "x":{
          "label":"Nonpublic note",
          "repeatable":true
        },
        "z":{
          "label":"Public note",
          "repeatable":true
        },
        "0":{
          "label":"Authority record control number or standard number",
          "repeatable":true
        },
        "1":{
          "label":"Real World Object URI",
          "repeatable":true
        },
        "2":{
          "label":"Source",
          "repeatable":false
        },
        "5":{
          "label":"Institution to which field applies",
          "repeatable":false
        }
      },
      "repeatable":true
    },
    "886":{
      "label":"Foreign MARC Information Field",
      "indicator1":{
        "label":"Type of field",
        "codes":{
          "0":"Leader",
          "1":"Variable control fields (002-009)",
          "2":"Variable data fields (010-999)"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Tag of the foreign MARC field",
          "repeatable":false
        },
        "b":{
          "label":"Content of the foreign MARC field",
          "repeatable":false
        },
        "2":{
          "label":"Source of data",
          "repeatable":false
        },
        "a-z":{
          "label":"Foreign MARC subfield",
          "repeatable":true
        },
        "0-9":{
          "label":"Foreign MARC subfield",
          "repeatable":true
        }
      },
      "repeatable":true
    },
    "887":{
      "label":"Non-MARC Information Field",
      "indicator1":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "indicator2":{
        "label":"Undefined",
        "codes":{
          " ":"Undefined"
        }
      },
      "subfields":{
        "a":{
          "label":"Content of non-MARC field",
          "repeatable":false
        },
        "2":{
          "label":"Source of data",
          "repeatable":false
        }
      },
      "repeatable":true
    },
    "leader":{
      "label":"Leader",
      "positions":{
        "0-4":{
          "label":"Record length",
          "start":0,
          "end":4,
          "codes":{
          }
        },
        "5-5":{
          "label":"Record status",
          "start":5,
          "end":5,
          "codes":{
            "a":"Increase in encoding level",
            "c":"Corrected or revised",
            "d":"Deleted",
            "n":"New",
            "p":"Increase in encoding level from prepublication"
          }
        },
        "6-6":{
          "label":"Type of record",
          "start":6,
          "end":6,
          "codes":{
            "a":"Language material",
            "c":"Notated music",
            "d":"Manuscript notated music",
            "e":"Cartographic material",
            "f":"Manuscript cartographic material",
            "g":"Projected medium",
            "i":"Nonmusical sound recording",
            "j":"Musical sound recording",
            "k":"Two-dimensional nonprojectable graphic",
            "m":"Computer file",
            "o":"Kit",
            "p":"Mixed materials",
            "r":"Three-dimensional artifact or naturally occurring object",
            "t":"Manuscript language material"
          }
        },
        "7-7":{
          "label":"Bibliographic level",
          "start":7,
          "end":7,
          "codes":{
            "a":"Monographic component part",
            "b":"Serial component part",
            "c":"Collection",
            "d":"Subunit",
            "i":"Integrating resource",
            "m":"Monograph\/Item",
            "s":"Serial"
          }
        },
        "8-8":{
          "label":"Type of control",
          "start":8,
          "end":8,
          "codes":{
            " ":"No specified type",
            "a":"Archival"
          }
        },
        "9-9":{
          "label":"Character coding scheme",
          "start":9,
          "end":9,
          "codes":{
            " ":"MARC-8",
            "a":"UCS\/Unicode"
          }
        },
        "10-10":{
          "label":"Indicator count",
          "start":10,
          "end":10,
          "codes":{
            "2":"Number of character positions used for indicators"
          }
        },
        "11-11":{
          "label":"Subfield code count",
          "start":11,
          "end":11,
          "codes":{
            "2":"Number of character positions used for a subfield code"
          }
        },
        "12-16":{
          "label":"Base address of data",
          "start":12,
          "end":16,
          "codes":{
            "[number]":"Length of Leader and Directory"
          }
        },
        "17-17":{
          "label":"Encoding level",
          "start":17,
          "end":17,
          "codes":{
            " ":"Full level",
            "1":"Full level, material not examined",
            "2":"Less-than-full level, material not examined",
            "3":"Abbreviated level",
            "4":"Core level",
            "5":"Partial (preliminary) level",
            "7":"Minimal level",
            "8":"Prepublication level",
            "u":"Unknown",
            "z":"Not applicable"
          }
        },
        "18-18":{
          "label":"Descriptive cataloging form",
          "start":18,
          "end":18,
          "codes":{
            " ":"Non-ISBD",
            "a":"AACR 2",
            "c":"ISBD punctuation omitted",
            "i":"ISBD punctuation included",
            "n":"Non-ISBD punctuation omitted",
            "u":"Unknown"
          }
        },
        "19-19":{
          "label":"Multipart resource record level",
          "start":19,
          "end":19,
          "codes":{
            " ":"Not specified or not applicable",
            "a":"Set",
            "b":"Part with independent title",
            "c":"Part with dependent title"
          }
        },
        "20-20":{
          "label":"Length of the length-of-field portion",
          "start":20,
          "end":20,
          "codes":{
            "4":"Number of characters in the length-of-field portion of a Directory entry"
          }
        },
        "21-21":{
          "label":"Length of the starting-character-position portion",
          "start":21,
          "end":21,
          "codes":{
            "5":"Number of characters in the starting-character-position portion of a Directory entry"
          }
        },
        "22-22":{
          "label":"Length of the implementation-defined portion",
          "start":22,
          "end":22,
          "codes":{
            "0":"Number of characters in the implementation-defined portion of a Directory entry"
          }
        },
        "23-23":{
          "label":"Undefined",
          "start":23,
          "end":23,
          "codes":{
            "0":"Undefined"
          }
        }
      },
      "repeatable":false
    },
    "001":{
      "label":"Control Number",
      "repeatable":false
    },
    "003":{
      "label":"Control Number Identifier",
      "repeatable":false
    },
    "005":{
      "label":"Date and Time of Latest Transaction",
      "repeatable":false
    },
    "006":{
      "label":"Fixed-Length Data Elements-Additional Material Characteristics",
      "positions":{
        "008b":[
          {
            "label":"Form of material",
            "start":0,
            "end":0
          },
          {
            "label":"Illustrations",
            "start":1,
            "end":4
          },
          {
            "label":"Target audience",
            "start":5,
            "end":5
          },
          {
            "label":"Form of item",
            "start":6,
            "end":6
          },
          {
            "label":"Nature of contents",
            "start":7,
            "end":10
          },
          {
            "label":"Government publication",
            "start":11,
            "end":11
          },
          {
            "label":"Conference publication",
            "start":12,
            "end":12
          },
          {
            "label":"Festschrift",
            "start":13,
            "end":13
          },
          {
            "label":"Index",
            "start":14,
            "end":14
          },
          {
            "label":"Undefined",
            "start":15,
            "end":15
          },
          {
            "label":"Literary form",
            "start":16,
            "end":16
          },
          {
            "label":"Biography",
            "start":17,
            "end":17
          }
        ],
        "008c":[
          {
            "label":"Form of material",
            "start":0,
            "end":0
          },
          {
            "label":"Undefined",
            "start":1,
            "end":4
          },
          {
            "label":"Target audience",
            "start":5,
            "end":5
          },
          {
            "label":"Form of item",
            "start":6,
            "end":6
          },
          {
            "label":"Undefined",
            "start":7,
            "end":8
          },
          {
            "label":"Type of computer file",
            "start":9,
            "end":9
          },
          {
            "label":"Undefined",
            "start":10,
            "end":10
          },
          {
            "label":"Government publication",
            "start":11,
            "end":11
          },
          {
            "label":"Undefined",
            "start":12,
            "end":17
          }
        ],
        "008p":[
          {
            "label":"Form of material",
            "start":0,
            "end":0
          },
          {
            "label":"Relief",
            "start":1,
            "end":4
          },
          {
            "label":"Projection",
            "start":5,
            "end":6
          },
          {
            "label":"Undefined",
            "start":7,
            "end":7
          },
          {
            "label":"Type of cartographic material",
            "start":8,
            "end":8
          },
          {
            "label":"Undefined",
            "start":9,
            "end":10
          },
          {
            "label":"Government publication",
            "start":11,
            "end":11
          },
          {
            "label":"Form of item",
            "start":12,
            "end":12
          },
          {
            "label":"Undefined",
            "start":13,
            "end":13
          },
          {
            "label":"Index",
            "start":14,
            "end":14
          },
          {
            "label":"Undefined",
            "start":15,
            "end":15
          },
          {
            "label":"Special format characteristics",
            "start":16,
            "end":17
          }
        ],
        "008x":[
          {
            "label":"Form of material",
            "start":0,
            "end":0
          },
          {
            "label":"Undefined",
            "start":1,
            "end":5
          },
          {
            "label":"Form of item",
            "start":6,
            "end":6
          },
          {
            "label":"Undefined",
            "start":7,
            "end":17
          }
        ],
        "008m":[
          {
            "label":"Form of material",
            "start":0,
            "end":0
          },
          {
            "label":"Form of composition",
            "start":1,
            "end":2
          },
          {
            "label":"Format of music",
            "start":3,
            "end":3
          },
          {
            "label":"Music parts",
            "start":4,
            "end":4
          },
          {
            "label":"Target audience",
            "start":5,
            "end":5
          },
          {
            "label":"Form of item",
            "start":6,
            "end":6
          },
          {
            "label":"Accompanying matter",
            "start":7,
            "end":12
          },
          {
            "label":"Literary text for sound recordings",
            "start":13,
            "end":14
          },
          {
            "label":"Undefined",
            "start":15,
            "end":15
          },
          {
            "label":"Transposition and arrangement",
            "start":16,
            "end":16
          },
          {
            "label":"Undefined",
            "start":17,
            "end":17
          }
        ],
        "008s":[
          {
            "label":"Form of material",
            "start":0,
            "end":0
          },
          {
            "label":"Frequency",
            "start":1,
            "end":1
          },
          {
            "label":"Regularity",
            "start":2,
            "end":2
          },
          {
            "label":"Undefined",
            "start":3,
            "end":3
          },
          {
            "label":"Type of continuing resource",
            "start":4,
            "end":4
          },
          {
            "label":"Form of original item",
            "start":5,
            "end":5
          },
          {
            "label":"Form of item",
            "start":6,
            "end":6
          },
          {
            "label":"Nature of entire work",
            "start":7,
            "end":7
          },
          {
            "label":"Nature of contents",
            "start":8,
            "end":10
          },
          {
            "label":"Government publication",
            "start":11,
            "end":11
          },
          {
            "label":"Conference publication",
            "start":12,
            "end":12
          },
          {
            "label":"Undefined",
            "start":13,
            "end":15
          },
          {
            "label":"Original alphabet or script of title",
            "start":16,
            "end":16
          },
          {
            "label":"Entry convention",
            "start":17,
            "end":17
          }
        ],
        "008v":[
          {
            "label":"Form of material",
            "start":0,
            "end":0
          },
          {
            "label":"Running time",
            "start":1,
            "end":3
          },
          {
            "label":"Undefined",
            "start":4,
            "end":4
          },
          {
            "label":"Target audience",
            "start":5,
            "end":5
          },
          {
            "label":"Undefined",
            "start":6,
            "end":10
          },
          {
            "label":"Government publication",
            "start":11,
            "end":11
          },
          {
            "label":"Form of item",
            "start":12,
            "end":12
          },
          {
            "label":"Undefined",
            "start":13,
            "end":15
          },
          {
            "label":"Type of visual material",
            "start":16,
            "end":16
          },
          {
            "label":"Technique",
            "start":17,
            "end":17
          }
        ]
      },
      "repeatable":true
    },
    "007a":{
      "label":"Map",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "a":"Map"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "d":"Atlas",
            "g":"Diagram",
            "j":"Map",
            "k":"Profile",
            "q":"Model",
            "r":"Remote-sensing image",
            "s":"Section",
            "u":"Unspecified",
            "y":"View",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Color",
          "start":3,
          "end":3,
          "codes":{
            "a":"One color",
            "c":"Multicolored",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Physical medium",
          "start":4,
          "end":4,
          "codes":{
            "a":"Paper",
            "b":"Wood",
            "c":"Stone",
            "d":"Metal",
            "e":"Synthetic",
            "f":"Skin",
            "g":"Textiles",
            "i":"Plastic",
            "j":"Glass",
            "l":"Vinyl",
            "n":"Vellum",
            "p":"Plaster",
            "q":"Flexible base photographic, positive",
            "r":"Flexible base photographic, negative",
            "s":"Non-flexible base photographic, positive",
            "t":"Non-flexible base photographic, negative",
            "u":"Unknown",
            "v":"Leather",
            "w":"Parchment",
            "x":"Not applicable",
            "y":"Other photographic medium",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Type of reproduction",
          "start":5,
          "end":5,
          "codes":{
            "f":"Facsimile",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "6-6":{
          "label":"Production\/reproduction details",
          "start":6,
          "end":6,
          "codes":{
            "a":"Photocopy, blueline print",
            "b":"Photocopy",
            "c":"Photographic pre-production",
            "d":"Film",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "7-7":{
          "label":"Positive\/negative aspect",
          "start":7,
          "end":7,
          "codes":{
            "a":"Positive",
            "b":"Negative",
            "m":"Mixed polarity",
            "n":"Not applicable",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007c":{
      "label":"Electronic Resource",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "c":"Electronic resource"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "a":"Tape cartridge",
            "b":"Chip cartridge",
            "c":"Computer optical disc cartridge",
            "d":"Computer disc, type unspecified",
            "e":"Computer disc cartridge, type unspecified",
            "f":"Tape cassette",
            "h":"Tape reel",
            "j":"Magnetic disk",
            "k":"Computer card",
            "m":"Magneto-optical disc",
            "o":"Optical disc",
            "r":"Remote",
            "s":"Standalone device",
            "u":"Unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Color",
          "start":3,
          "end":3,
          "codes":{
            "a":"One color",
            "b":"Black-and-white",
            "c":"Multicolored",
            "g":"Gray scale",
            "m":"Mixed",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Dimensions",
          "start":4,
          "end":4,
          "codes":{
            "a":"3 1\/2 in.",
            "e":"12 in.",
            "g":"4 3\/4 in. or 12 cm.",
            "i":"1 1\/8 x 2 3\/8 in.",
            "j":"3 7\/8 x 2 1\/2 in.",
            "n":"Not applicable",
            "o":"5 1\/4 in.",
            "u":"Unknown",
            "v":"8 in.",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Sound",
          "start":5,
          "end":5,
          "codes":{
            " ":"No sound (silent)",
            "a":"Sound",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "6-8":{
          "label":"Image bit depth",
          "start":6,
          "end":8,
          "codes":{
            "001-999":"Exact bit depth",
            "mmm":"Multiple",
            "nnn":"Not applicable",
            "---":"Unknown",
            "|||":"No attempt to code"
          }
        },
        "9-9":{
          "label":"File formats",
          "start":9,
          "end":9,
          "codes":{
            "a":"One file format",
            "m":"Multiple file formats",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "10-10":{
          "label":"Quality assurance target(s)",
          "start":10,
          "end":10,
          "codes":{
            "a":"Absent",
            "n":"Not applicable",
            "p":"Present",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "11-11":{
          "label":"Antecedent\/Source",
          "start":11,
          "end":11,
          "codes":{
            "a":"File reproduced from original",
            "b":"File reproduced from microform",
            "c":"File reproduced from an electronic resource",
            "d":"File reproduced from an intermediate (not microform)",
            "m":"Mixed",
            "n":"Not applicable",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "12-12":{
          "label":"Level of compression",
          "start":12,
          "end":12,
          "codes":{
            "a":"Uncompressed",
            "b":"Lossless",
            "d":"Lossy",
            "m":"Mixed",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "13-13":{
          "label":"Reformatting Quality",
          "start":13,
          "end":13,
          "codes":{
            "a":"Access",
            "n":"Not applicable",
            "p":"Preservation",
            "r":"Replacement",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007d":{
      "label":"Globe",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "d":"Globe"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "a":"Celestial globe",
            "b":"Planetary or lunar globe",
            "c":"Terrestrial globe",
            "e":"Earth moon globe",
            "u":"Unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Color",
          "start":3,
          "end":3,
          "codes":{
            "a":"One color",
            "c":"Multicolored",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Physical medium",
          "start":4,
          "end":4,
          "codes":{
            "a":"Paper",
            "b":"Wood",
            "c":"Stone",
            "d":"Metal",
            "e":"Synthetic",
            "f":"Skin",
            "g":"Textile",
            "i":"Plastic",
            "l":"Vinyl",
            "n":"Vellum",
            "p":"Plaster",
            "u":"Unknown",
            "v":"Leather",
            "w":"Parchment",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Type of reproduction",
          "start":5,
          "end":5,
          "codes":{
            "f":"Facsimile",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007f":{
      "label":"Tactile Material",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "f":"Tactile material"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "a":"Moon",
            "b":"Braille",
            "c":"Combination",
            "d":"Tactile, with no writing system",
            "u":"Unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-4":{
          "label":"Class of braille writing",
          "start":3,
          "end":4,
          "codes":{
            " ":"No specified class of braille writing",
            "a":"Literary braille",
            "b":"Format code braille",
            "c":"Mathematics and scientific braille",
            "d":"Computer braille",
            "e":"Music braille",
            "m":"Multiple braille types",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "||":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Level of contraction",
          "start":5,
          "end":5,
          "codes":{
            "a":"Uncontracted",
            "b":"Contracted",
            "m":"Combination",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "6-8":{
          "label":"Braille music format",
          "start":6,
          "end":8,
          "codes":{
            " ":"No specified braille music format",
            "a":"Bar over bar",
            "b":"Bar by bar",
            "c":"Line over line",
            "d":"Paragraph",
            "e":"Single line",
            "f":"Section by section",
            "g":"Line by line",
            "h":"Open score",
            "i":"Spanner short form scoring",
            "j":"Short form scoring",
            "k":"Outline",
            "l":"Vertical score",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|||":"No attempt to code"
          }
        },
        "9-9":{
          "label":"Special physical characteristics",
          "start":9,
          "end":9,
          "codes":{
            "a":"Print\/braille",
            "b":"Jumbo or enlarged braille",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007g":{
      "label":"Projected Graphic",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "g":"Projected graphic"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "c":"Filmstrip cartridge",
            "d":"Filmslip",
            "f":"Filmstrip, type unspecified",
            "o":"Filmstrip roll",
            "s":"Slide",
            "t":"Transparency",
            "u":"Unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Color",
          "start":3,
          "end":3,
          "codes":{
            "a":"One color",
            "b":"Black-and-white",
            "c":"Multicolored",
            "h":"Hand colored",
            "m":"Mixed",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Base of emulsion",
          "start":4,
          "end":4,
          "codes":{
            "d":"Glass",
            "e":"Synthetic",
            "j":"Safety film",
            "k":"Film base, other than safety film",
            "m":"Mixed collection",
            "o":"Paper",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Sound on medium or separate",
          "start":5,
          "end":5,
          "codes":{
            " ":"No sound (silent)",
            "a":"Sound on medium",
            "b":"Sound separate from medium",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "6-6":{
          "label":"Medium for sound",
          "start":6,
          "end":6,
          "codes":{
            " ":"No sound (silent)",
            "a":"Optical sound track on motion picture film",
            "b":"Magnetic sound track on motion picture film",
            "c":"Magnetic audio tape in cartridge",
            "d":"Sound disc",
            "e":"Magnetic audio tape on reel",
            "f":"Magnetic audio tape in cassette",
            "g":"Optical and magnetic sound track on motion picture",
            "h":"Videotape",
            "i":"Videodisc",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "7-7":{
          "label":"Dimensions",
          "start":7,
          "end":7,
          "codes":{
            "a":"Standard 8 mm. film width",
            "b":"Super 8 mm.\/single 8 mm. film width",
            "c":"9.5 mm. film width",
            "d":"16 mm. film width",
            "e":"28 mm. film width",
            "f":"35 mm. film width",
            "g":"70 mm. film width",
            "j":"2x2 in. or 5x5 cm. slide",
            "k":"2 1\/4 x 2 1\/4 in. or 6x6 cm. slide",
            "s":"4x5 in. or 10x13 cm. transparency",
            "t":"5x7 in. or 13x18 cm. transparency",
            "v":"8x10 in. or 21x26 cm. transparency",
            "w":"9x9 in. or 23x23 cm. transparency",
            "x":"10x10 in. or 26x26 cm. transparency",
            "y":"7x7 in. or 18x18 cm. transparency",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "8-8":{
          "label":"Secondary support material",
          "start":8,
          "end":8,
          "codes":{
            " ":"No secondary support",
            "c":"Cardboard",
            "d":"Glass",
            "e":"Synthetic",
            "h":"Metal",
            "j":"Metal and glass",
            "k":"Synthetic and glass",
            "m":"Mixed collection",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007h":{
      "label":"Microform",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "h":"Microform"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "a":"Aperture card",
            "b":"Microfilm cartridge",
            "c":"Microfilm cassette",
            "d":"Microfilm reel",
            "e":"Microfiche",
            "f":"Microfiche cassette",
            "g":"Microopaque",
            "h":"Microfilm slip",
            "j":"Microfilm roll",
            "u":"Unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Positive\/negative aspect",
          "start":3,
          "end":3,
          "codes":{
            "a":"Positive",
            "b":"Negative",
            "m":"Mixed polarity",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Dimensions",
          "start":4,
          "end":4,
          "codes":{
            "a":"8 mm.",
            "d":"16 mm.",
            "f":"35 mm.",
            "g":"70 mm.",
            "h":"105 mm.",
            "l":"3x5 in. or 8x13 cm.",
            "m":"4x6 in. or 11x15 cm.",
            "o":"6x9 in. or 16x23 cm.",
            "p":"3 1\/4 x 7 3\/8 in. or 9x19 cm.",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Reduction ratio range",
          "start":5,
          "end":5,
          "codes":{
            "a":"Low reduction ratio",
            "b":"Normal reduction",
            "c":"High reduction",
            "d":"Very high reduction",
            "e":"Ultra high reduction",
            "u":"Unknown",
            "v":"Reduction rate varies",
            "|":"No attempt to code"
          }
        },
        "6-8":{
          "label":"Reduction ratio",
          "start":6,
          "end":8,
          "codes":{
          }
        },
        "9-9":{
          "label":"Color",
          "start":9,
          "end":9,
          "codes":{
            "b":"Black-and-white",
            "c":"Multicolored",
            "m":"Mixed",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "10-10":{
          "label":"Emulsion on film",
          "start":10,
          "end":10,
          "codes":{
            "a":"Silver halide",
            "b":"Diazo",
            "c":"Vesicular",
            "m":"Mixed emulsion",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "11-11":{
          "label":"Generation",
          "start":11,
          "end":11,
          "codes":{
            "a":"First generation (master)",
            "b":"Printing master",
            "c":"Service copy",
            "m":"Mixed generation",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "12-12":{
          "label":"Base of film",
          "start":12,
          "end":12,
          "codes":{
            "a":"Safety base, undetermined",
            "c":"Safety base, acetate undetermined",
            "d":"Safety base, diacetate",
            "i":"Nitrate base",
            "m":"Mixed base (nitrate and safety)",
            "n":"Not applicable",
            "p":"Safety base, polyester",
            "r":"Safety base, mixed",
            "t":"Safety base, triacetate",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007k":{
      "label":"Nonprojected Graphic",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "k":"Nonprojected graphic"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "a":"Activity card",
            "c":"Collage",
            "d":"Drawing",
            "e":"Painting",
            "f":"Photomechanical print",
            "g":"Photonegative",
            "h":"Photoprint",
            "i":"Picture",
            "j":"Print",
            "k":"Poster",
            "l":"Technical drawing",
            "n":"Chart",
            "o":"Flash card",
            "p":"Postcard",
            "q":"Icon",
            "r":"Radiograph",
            "s":"Study print",
            "u":"Unspecified",
            "v":"Photograph, type unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Color",
          "start":3,
          "end":3,
          "codes":{
            "a":"One color",
            "b":"Black-and-white",
            "c":"Multicolored",
            "h":"Hand colored",
            "m":"Mixed",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Primary support material",
          "start":4,
          "end":4,
          "codes":{
            "a":"Canvas",
            "b":"Bristol board",
            "c":"Cardboard\/illustration board",
            "d":"Glass",
            "e":"Synthetic",
            "f":"Skin",
            "g":"Textile",
            "h":"Metal",
            "i":"Plastic",
            "l":"Vinyl",
            "m":"Mixed collection",
            "n":"Vellum",
            "o":"Paper",
            "p":"Plaster",
            "q":"Hardboard",
            "r":"Porcelain",
            "s":"Stone",
            "t":"Wood",
            "u":"Unknown",
            "v":"Leather",
            "w":"Parchment",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Secondary support material",
          "start":5,
          "end":5,
          "codes":{
            " ":"No secondary support",
            "a":"Canvas",
            "b":"Bristol board",
            "c":"Cardboard\/illustration board",
            "d":"Glass",
            "e":"Synthetic",
            "f":"Skin",
            "g":"Textile",
            "h":"Metal",
            "i":"Plastic",
            "l":"Vinyl",
            "m":"Mixed collection",
            "n":"Vellum",
            "o":"Paper",
            "p":"Plaster",
            "q":"Hardboard",
            "r":"Porcelain",
            "s":"Stone",
            "t":"Wood",
            "u":"Unknown",
            "v":"Leather",
            "w":"Parchment",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007m":{
      "label":"Motion Picture",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "m":"Motion picture"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "c":"Film cartridge",
            "f":"Film cassette",
            "o":"Film roll",
            "r":"Film reel",
            "u":"Unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Color",
          "start":3,
          "end":3,
          "codes":{
            "b":"Black-and-white",
            "c":"Multicolored",
            "h":"Hand colored",
            "m":"Mixed",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Motion picture presentation format",
          "start":4,
          "end":4,
          "codes":{
            "a":"Standard sound aperture (reduced frame)",
            "b":"Nonanamorphic (wide-screen)",
            "c":"3D",
            "d":"Anamorphic (wide-screen)",
            "e":"Other wide-screen format",
            "f":"Standard silent aperture (full frame)",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Sound on medium or separate",
          "start":5,
          "end":5,
          "codes":{
            " ":"No sound (silent)",
            "a":"Sound on medium",
            "b":"Sound separate from medium",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "6-6":{
          "label":"Medium for sound",
          "start":6,
          "end":6,
          "codes":{
            " ":"No sound (silent)",
            "a":"Optical sound track on motion picture film",
            "b":"Magnetic sound track on motion picture film",
            "c":"Magnetic audio tape in cartridge",
            "d":"Sound disc",
            "e":"Magnetic audio tape on reel",
            "f":"Magnetic audio tape in cassette",
            "g":"Optical and magnetic sound track on motion picture",
            "h":"Videotape",
            "i":"Videodisc",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "7-7":{
          "label":"Dimensions",
          "start":7,
          "end":7,
          "codes":{
            "a":"Standard 8 mm.",
            "b":"Super 8 mm.\/single 8 mm.",
            "c":"9.5 mm.",
            "d":"16 mm.",
            "e":"28 mm.",
            "f":"35 mm.",
            "g":"70 mm.",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "8-8":{
          "label":"Configuration of playback channels",
          "start":8,
          "end":8,
          "codes":{
            "k":"Mixed",
            "m":"Monaural",
            "n":"Not applicable",
            "q":"Quadraphonic, multichannel, or surround",
            "s":"Stereophonic",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "9-9":{
          "label":"Production elements",
          "start":9,
          "end":9,
          "codes":{
            "a":"Workprint",
            "b":"Trims",
            "c":"Outtakes",
            "d":"Rushes",
            "e":"Mixing tracks",
            "f":"Title bands\/inter-title rolls",
            "g":"Production rolls",
            "n":"Not applicable",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "10-10":{
          "label":"Positive\/negative aspect",
          "start":10,
          "end":10,
          "codes":{
            "a":"Positive",
            "b":"Negative",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "11-11":{
          "label":"Generation",
          "start":11,
          "end":11,
          "codes":{
            "d":"Duplicate",
            "e":"Master",
            "o":"Original",
            "r":"Reference print\/viewing copy",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "12-12":{
          "label":"Base of film",
          "start":12,
          "end":12,
          "codes":{
            "a":"Safety base, undetermined",
            "c":"Safety base, acetate undetermined",
            "d":"Safety base, diacetate",
            "i":"Nitrate base",
            "m":"Mixed base (nitrate and safety)",
            "n":"Not applicable",
            "p":"Safety base, polyester",
            "r":"Safety base, mixed",
            "t":"Safety base, triacetate",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "13-13":{
          "label":"Refined categories of color",
          "start":13,
          "end":13,
          "codes":{
            "a":"3 layer color",
            "b":"2 color, single strip",
            "c":"Undetermined 2 color",
            "d":"Undetermined 3 color",
            "e":"3 strip color",
            "f":"2 strip color",
            "g":"Red strip",
            "h":"Blue or green strip",
            "i":"Cyan strip",
            "j":"Magenta strip",
            "k":"Yellow strip",
            "l":"S E N 2",
            "m":"S E N 3",
            "n":"Not applicable",
            "p":"Sepia tone",
            "q":"Other tone",
            "r":"Tint",
            "s":"Tinted and toned",
            "t":"Stencil color",
            "u":"Unknown",
            "v":"Hand colored",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "14-14":{
          "label":"Kind of color stock or print",
          "start":14,
          "end":14,
          "codes":{
            "a":"Imbibition dye transfer prints",
            "b":"Three-layer stock",
            "c":"Three layer stock, low fade",
            "d":"Duplitized stock",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "15-15":{
          "label":"Deterioration stage",
          "start":15,
          "end":15,
          "codes":{
            "a":"None apparent",
            "b":"Nitrate: suspicious odor",
            "c":"Nitrate: pungent odor",
            "d":"Nitrate: brownish, discoloration, fading, dusty",
            "e":"Nitrate: sticky",
            "f":"Nitrate: frothy, bubbles, blisters",
            "g":"Nitrate: congealed",
            "h":"Nitrate: powder",
            "k":"Non-nitrate: detectable deterioration",
            "l":"Non-nitrate: advanced deterioration",
            "m":"Non-nitrate: disaster",
            "|":"No attempt to code"
          }
        },
        "16-16":{
          "label":"Completeness",
          "start":16,
          "end":16,
          "codes":{
            "c":"Complete",
            "i":"Incomplete",
            "n":"Not applicable",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "17-22":{
          "label":"Film inspection date",
          "start":17,
          "end":22,
          "codes":{
          }
        }
      },
      "repeatable":true
    },
    "007o":{
      "label":"Kit",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "o":"Kit"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "u":"Unspecified",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007q":{
      "label":"Notated Music",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "q":"Notated music"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "u":"Unspecified",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007r":{
      "label":"Remote-Sensing Image",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "r":"Remote-sensing image"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "u":"Unspecified",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Altitude of sensor",
          "start":3,
          "end":3,
          "codes":{
            "a":"Surface",
            "b":"Airborne",
            "c":"Spaceborne",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Attitude of sensor",
          "start":4,
          "end":4,
          "codes":{
            "a":"Low oblique",
            "b":"High oblique",
            "c":"Vertical",
            "n":"Not applicable",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Cloud cover",
          "start":5,
          "end":5,
          "codes":{
            "0":"0-9%",
            "1":"10-19%",
            "2":"20-29%",
            "3":"30-39%",
            "4":"40-49%",
            "5":"50-59%",
            "6":"60-69%",
            "7":"70-79%",
            "8":"80-89%",
            "9":"90-100%",
            "n":"Not applicable",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "6-6":{
          "label":"Platform construction type",
          "start":6,
          "end":6,
          "codes":{
            "a":"Balloon",
            "b":"Aircraft--low altitude",
            "c":"Aircraft--medium altitude",
            "d":"Aircraft--high altitude",
            "e":"Manned spacecraft",
            "f":"Unmanned spacecraft",
            "g":"Land-based remote-sensing device",
            "h":"Water surface-based remote-sensing device",
            "i":"Submersible remote-sensing device",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "7-7":{
          "label":"Platform use category",
          "start":7,
          "end":7,
          "codes":{
            "a":"Meteorological",
            "b":"Surface observing",
            "c":"Space observing",
            "m":"Mixed uses",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "8-8":{
          "label":"Sensor type",
          "start":8,
          "end":8,
          "codes":{
            "a":"Active",
            "b":"Passive",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "9-10":{
          "label":"Data type",
          "start":9,
          "end":10,
          "codes":{
            "aa":"Visible light",
            "da":"Near infrared",
            "db":"Middle infrared",
            "dc":"Far infrared",
            "dd":"Thermal infrared",
            "de":"Shortwave infrared (SWIR)",
            "df":"Reflective infrared",
            "dv":"Combinations",
            "dz":"Other infrared data",
            "ga":"Sidelooking airborne radar (SLAR)",
            "gb":"Synthetic aperture radar (SAR)-Single frequency",
            "gc":"SAR-multi-frequency (multichannel)",
            "gd":"SAR-like polarization",
            "ge":"SAR-cross polarization",
            "gf":"Infometric SAR",
            "gg":"polarmetric SAR",
            "gu":"Passive microwave mapping",
            "gz":"Other microwave data",
            "ja":"Far ultraviolet",
            "jb":"Middle ultraviolet",
            "jc":"Near ultraviolet",
            "jv":"Ultraviolet combinations",
            "jz":"Other ultraviolet data",
            "ma":"Multi-spectral, multidata",
            "mb":"Multi-temporal",
            "mm":"Combination of various data types",
            "nn":"Not applicable",
            "pa":"Sonar--water depth",
            "pb":"Sonar--bottom topography images, sidescan",
            "pc":"Sonar--bottom topography, near-surface",
            "pd":"Sonar--bottom topography, near-bottom",
            "pe":"Seismic surveys",
            "pz":"Other acoustical data",
            "ra":"Gravity anomalies (general)",
            "rb":"Free-air",
            "rc":"Bouger",
            "rd":"Isostatic",
            "sa":"Magnetic field",
            "ta":"radiometric surveys",
            "uu":"Unknown",
            "zz":"Other",
            "||":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007s":{
      "label":"Sound Recording",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "s":"Sound recording"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "b":"Belt",
            "d":"Sound disc",
            "e":"Cylinder",
            "g":"Sound cartridge",
            "i":"Sound-track film",
            "q":"Roll",
            "r":"Remote",
            "s":"Sound cassette",
            "t":"Sound-tape reel",
            "u":"Unspecified",
            "w":"Wire recording",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Speed",
          "start":3,
          "end":3,
          "codes":{
            "a":"16 rpm (discs)",
            "b":"33 1\/3 rpm (discs)",
            "c":"45 rpm (discs)",
            "d":"78 rpm (discs)",
            "e":"8 rpm (discs)",
            "f":"1.4 m. per second (discs)",
            "h":"120 rpm (cylinders)",
            "i":"160 rpm (cylinders)",
            "k":"15\/16 ips (tapes)",
            "l":"1 7\/8 ips (tapes)",
            "m":"3 3\/4 ips (tapes)",
            "n":"Not applicable",
            "o":"7 1\/2 ips (tapes)",
            "p":"15 ips (tapes)",
            "r":"30 ips (tape)",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Configuration of playback channels",
          "start":4,
          "end":4,
          "codes":{
            "m":"Monaural",
            "q":"Quadraphonic, multichannel, or surround",
            "s":"Stereophonic",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Groove width\/groove pitch",
          "start":5,
          "end":5,
          "codes":{
            "m":"Microgroove\/fine",
            "n":"Not applicable",
            "s":"Coarse\/standard",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "6-6":{
          "label":"Dimensions",
          "start":6,
          "end":6,
          "codes":{
            "a":"3 in. diameter",
            "b":"5 in. diameter",
            "c":"7 in. diameter",
            "d":"10 in. diameter",
            "e":"12 in. diameter",
            "f":"16 in. diameter",
            "g":"4 3\/4 in. or 12 cm. diameter",
            "j":"3 7\/8 x 2 1\/2 in.",
            "n":"Not applicable",
            "o":"5 1\/4 x 3 7\/8 in.",
            "s":"2 3\/4 x 4 in.",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "7-7":{
          "label":"Tape width",
          "start":7,
          "end":7,
          "codes":{
            "l":"1\/8 in.",
            "m":"1\/4 in.",
            "n":"Not applicable",
            "o":"1\/2 in.",
            "p":"1 in.",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "8-8":{
          "label":"Tape Configuration",
          "start":8,
          "end":8,
          "codes":{
            "a":"Full (1) track",
            "b":"Half (2) track",
            "c":"Quarter (4) track",
            "d":"Eight track",
            "e":"Twelve track",
            "f":"Sixteen track",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "9-9":{
          "label":"Kind of disc, cylinder or tape",
          "start":9,
          "end":9,
          "codes":{
            "a":"Master tape",
            "b":"Tape duplication master",
            "d":"Disc master (negative)",
            "i":"Instantaneous (recorded on the spot)",
            "m":"Mass-produced",
            "n":"Not applicable",
            "r":"Mother (positive)",
            "s":"Stamper (negative)",
            "t":"Test pressing",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "10-10":{
          "label":"Kind of material",
          "start":10,
          "end":10,
          "codes":{
            "a":"Lacquer coating",
            "b":"Cellulose nitrate",
            "c":"Acetate tape with ferrous oxide",
            "g":"Glass with lacquer",
            "i":"Aluminum with lacquer",
            "l":"Metal",
            "m":"Plastic with metal",
            "n":"Not applicable",
            "p":"Plastic",
            "r":"Paper with lacquer or ferrous oxide",
            "s":"Shellac",
            "w":"Wax",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "11-11":{
          "label":"Kind of cutting",
          "start":11,
          "end":11,
          "codes":{
            "h":"Hill-and-dale cutting",
            "l":"Lateral or combined cutting",
            "n":"Not applicable",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "12-12":{
          "label":"Special playback characteristics",
          "start":12,
          "end":12,
          "codes":{
            "a":"NAB standard",
            "b":"CCIR standard",
            "c":"Dolby-B encoded",
            "d":"dbx encoded",
            "e":"Digital recording",
            "f":"Dolby-A encoded",
            "g":"Dolby-C encoded",
            "h":"CX encoded",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "13-13":{
          "label":"Original capture and storage technique",
          "start":13,
          "end":13,
          "codes":{
            "a":"Acoustical capture, analog direct storage",
            "b":"Electrical capture, analog direct storage",
            "d":"Electrical capture, digital storage",
            "e":"Electrical capture, analog electrical storage",
            "u":"Unknown capture and storage",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007t":{
      "label":"Text",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "t":"Text"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "a":"Regular print",
            "b":"Large print",
            "c":"Braille",
            "d":"Loose-leaf",
            "u":"Unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007v":{
      "label":"Videorecording",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "v":"Videorecording"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "c":"Videocartridge",
            "d":"Videodisc",
            "f":"Videocassette",
            "r":"Videoreel",
            "u":"Unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "2-2":{
          "label":"Undefined",
          "start":2,
          "end":2,
          "codes":{
            " ":"Undefined"
          }
        },
        "3-3":{
          "label":"Color",
          "start":3,
          "end":3,
          "codes":{
            "a":"One color",
            "b":"Black-and-white",
            "c":"Multicolored",
            "m":"Mixed",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "4-4":{
          "label":"Videorecording format",
          "start":4,
          "end":4,
          "codes":{
            "a":"Beta (1\/2 in., videocassette)",
            "b":"VHS (1\/2 in., videocassette)",
            "c":"U-matic (3\/4 in., videocasstte)",
            "d":"EIAJ (1\/2 in., reel)",
            "e":"Type C (1 in., reel)",
            "f":"Quadruplex (1 in. or 2 in., reel)",
            "g":"Laserdisc",
            "h":"CED (Capacitance Electronic Disc) videodisc",
            "i":"Betacam (1\/2 in., videocassette)",
            "j":"Betacam SP (1\/2 in., videocassette)",
            "k":"Super-VHS (1\/2 in., videocassette)",
            "m":"M-II (1\/2 in., videocassette)",
            "o":"D-2 (3\/4 in., videocassette)",
            "p":"8 mm.",
            "q":"Hi-8 mm.",
            "s":"Blu-ray disc",
            "u":"Unknown",
            "v":"DVD",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "5-5":{
          "label":"Sound on medium or separate",
          "start":5,
          "end":5,
          "codes":{
            " ":"No sound (silent)",
            "a":"Sound on medium",
            "b":"Sound separate from medium",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "6-6":{
          "label":"Medium for sound",
          "start":6,
          "end":6,
          "codes":{
            " ":"No sound (silent)",
            "a":"Optical sound track on motion picture film",
            "b":"Magnetic sound track on motion picture film",
            "c":"Magnetic audio tape in cartridge",
            "d":"Sound disc",
            "e":"Magnetic audio tape on reel",
            "f":"Magnetic audio tape in cassette",
            "g":"Optical and magnetic sound track on motion picture",
            "h":"Videotape",
            "i":"Videodisc",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "7-7":{
          "label":"Dimensions",
          "start":7,
          "end":7,
          "codes":{
            "a":"8 mm.",
            "m":"1\/4 in.",
            "o":"1\/2 in.",
            "p":"1 in.",
            "q":"2 in.",
            "r":"3\/4 in.",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "8-8":{
          "label":"Configuration of playback channels",
          "start":8,
          "end":8,
          "codes":{
            "k":"Mixed",
            "m":"Monaural",
            "n":"Not applicable",
            "q":"Quadraphonic, multichannel, or surround",
            "s":"Stereophonic",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "007z":{
      "label":"Unspecified",
      "positions":{
        "0-0":{
          "label":"Category of material",
          "start":0,
          "end":0,
          "codes":{
            "z":"Unspecified"
          }
        },
        "1-1":{
          "label":"Specific material designation",
          "start":1,
          "end":1,
          "codes":{
            "m":"Multiple physical forms",
            "u":"Unspecified",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":true
    },
    "008a":{
      "label":"All Materials",
      "positions":{
        "0-5":{
          "label":"Date entered on file",
          "start":0,
          "end":5,
          "codes":{
          }
        },
        "6-6":{
          "label":"Type of date\/Publication status",
          "start":6,
          "end":6,
          "codes":{
            "b":"No dates given; B.C. date involved",
            "c":"Continuing resource currently published",
            "d":"Continuing resource ceased publication",
            "e":"Detailed date",
            "i":"Inclusive dates of collection",
            "k":"Range of years of bulk of collection",
            "m":"Multiple dates",
            "n":"Dates unknown",
            "p":"Date of distribution\/release\/issue and production\/recording session when different",
            "q":"Questionable date",
            "r":"Reprint\/reissue date and original date",
            "s":"Single known date\/probable date",
            "t":"Publication date and copyright date",
            "u":"Continuing resource status unknown",
            "|":"No attempt to code"
          }
        },
        "7-10":{
          "label":"Date 1",
          "start":7,
          "end":10,
          "codes":{
            "1-9":"Date digit",
            " ":"Date element is not applicable",
            "u":"Date element is totally or partially unknown",
            "||||":"No attempt to code"
          }
        },
        "11-14":{
          "label":"Date 2",
          "start":11,
          "end":14,
          "codes":{
            "1-9":"Date digit",
            " ":"Date element is not applicable",
            "u":"Date element is totally or partially unknown",
            "||||":"No attempt to code"
          }
        },
        "15-17":{
          "label":"Place of publication, production, or execution",
          "start":15,
          "end":17,
          "codes":{
            "xx#":"No place, unknown, or undetermined",
            "vp#":"Various places",
            "[aaa]":"Three-character alphabetic code",
            "[aa#]":"Two-character alphabetic code"
          }
        },
        "18-34":{
          "label":"Material specific coded elements",
          "start":18,
          "end":34,
          "codes":{
          }
        },
        "35-37":{
          "label":"Language",
          "start":35,
          "end":37,
          "codes":{
            "###":"No information provided",
            "zxx":"No linguistic content",
            "mul":"Multiple languages",
            "sgn":"Sign languages",
            "und":"Undetermined",
            "[aaa]":"Three-character alphabetic code",
            "|||":"No attempt to code"
          }
        },
        "38-38":{
          "label":"Modified record",
          "start":38,
          "end":38,
          "codes":{
            " ":"Not modified",
            "d":"Dashed-on information omitted",
            "o":"Completely romanized\/printed cards romanized",
            "r":"Completely romanized\/printed cards in script",
            "s":"Shortened",
            "x":"Missing characters",
            "|":"No attempt to code"
          }
        },
        "39-39":{
          "label":"Cataloging source",
          "start":39,
          "end":39,
          "codes":{
            " ":"National bibliographic agency",
            "c":"Cooperative cataloging program",
            "d":"Other",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":false
    },
    "008b":{
      "label":"Books",
      "scope":["a","t"],
      "level":["a","c","d","m"],
      "positions":{
        "18-21":{
          "label":"Illustrations (006\/01-04)",
          "start":18,
          "end":21,
          "codes":{
            " ":"No illustrations",
            "a":"Illustrations",
            "b":"Maps",
            "c":"Portraits",
            "d":"Charts",
            "e":"Plans",
            "f":"Plates",
            "g":"Music",
            "h":"Facsimiles",
            "i":"Coats of arms",
            "j":"Genealogical tables",
            "k":"Forms",
            "l":"Samples",
            "m":"Phonodisc, phonowire, etc.",
            "o":"Photographs",
            "p":"Illuminations",
            "|":"No attempt to code"
          }
        },
        "22-22":{
          "label":"Target audience (006\/05)",
          "start":22,
          "end":22,
          "codes":{
            " ":"Unknown or not specified",
            "a":"Preschool",
            "b":"Primary",
            "c":"Pre-adolescent",
            "d":"Adolescent",
            "e":"Adult",
            "f":"Specialized",
            "g":"General",
            "j":"Juvenile",
            "|":"No attempt to code"
          }
        },
        "23-23":{
          "label":"Form of item (006\/06)",
          "start":23,
          "end":23,
          "codes":{
            " ":"None of the following",
            "a":"Microfilm",
            "b":"Microfiche",
            "c":"Microopaque",
            "d":"Large print",
            "f":"Braille",
            "o":"Online",
            "q":"Direct electronic",
            "r":"Regular print reproduction",
            "s":"Electronic",
            "|":"No attempt to code"
          }
        },
        "24-27":{
          "label":"Nature of contents (006\/07-10)",
          "start":24,
          "end":27,
          "codes":{
            " ":"No specified nature of contents",
            "a":"Abstracts\/summaries",
            "b":"Bibliographies",
            "c":"Catalogs",
            "d":"Dictionaries",
            "e":"Encyclopedias",
            "f":"Handbooks",
            "g":"Legal articles",
            "i":"Indexes",
            "j":"Patent document",
            "k":"Discographies",
            "l":"Legislation",
            "m":"Theses",
            "n":"Surveys of literature in a subject area",
            "o":"Reviews",
            "p":"Programmed texts",
            "q":"Filmographies",
            "r":"Directories",
            "s":"Statistics",
            "t":"Technical reports",
            "u":"Standards\/specifications",
            "v":"Legal cases and case notes",
            "w":"Law reports and digests",
            "y":"Yearbooks",
            "z":"Treaties",
            "2":"Offprints",
            "5":"Calendars",
            "6":"Comics\/graphic novels",
            "|":"No attempt to code"
          }
        },
        "28-28":{
          "label":"Government publication (006\/11)",
          "start":28,
          "end":28,
          "codes":{
            " ":"Not a government publication",
            "a":"Autonomous or semi-autonomous component",
            "c":"Multilocal",
            "f":"Federal\/national",
            "i":"International intergovernmental",
            "l":"Local",
            "m":"Multistate",
            "o":"Government publication-level undetermined",
            "s":"State, provincial, territorial, dependent, etc.",
            "u":"Unknown if item is government publication",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "29-29":{
          "label":"Conference publication (006\/12)",
          "start":29,
          "end":29,
          "codes":{
            "0":"Not a conference publication",
            "1":"Conference publication",
            "|":"No attempt to code"
          }
        },
        "30-30":{
          "label":"Festschrift (006\/13)",
          "start":30,
          "end":30,
          "codes":{
            "0":"Not a festschrift",
            "1":"Festschrift",
            "|":"No attempt to code"
          }
        },
        "31-31":{
          "label":"Index (006\/14)",
          "start":31,
          "end":31,
          "codes":{
            "0":"No index",
            "1":"Index present",
            "|":"No attempt to code"
          }
        },
        "32-32":{
          "label":"Undefined (006\/15)",
          "start":32,
          "end":32,
          "codes":{
          }
        },
        "33-33":{
          "label":"Literary form (006\/16)",
          "start":33,
          "end":33,
          "codes":{
            "0":"Not fiction (not further specified)",
            "1":"Fiction (not further specified)",
            "d":"Dramas",
            "e":"Essays",
            "f":"Novels",
            "h":"Humor, satires, etc.",
            "i":"Letters",
            "j":"Short stories",
            "m":"Mixed forms",
            "p":"Poetry",
            "s":"Speeches",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "34-34":{
          "label":"Biography (006\/17)",
          "start":34,
          "end":34,
          "codes":{
            " ":"No biographical material",
            "a":"Autobiography",
            "b":"Individual biography",
            "c":"Collective biography",
            "d":"Contains biographical information",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":false
    },
    "008c":{
      "label":"Computer Files",
      "scope":["m"],
      "positions":{
        "18-21":{
          "label":"Undefined (006\/01-04)",
          "start":18,
          "end":21,
          "codes":{
            " ":"Undefined",
            "|":"No attempt to code"
          }
        },
        "22-22":{
          "label":"Target audience (006\/05)",
          "start":22,
          "end":22,
          "codes":{
            " ":"Unknown or not specified",
            "a":"Preschool",
            "b":"Primary",
            "c":"Pre-adolescent",
            "d":"Adolescent",
            "e":"Adult",
            "f":"Specialized",
            "g":"General",
            "j":"Juvenile",
            "|":"No attempt to code"
          }
        },
        "23-23":{
          "label":"Form of item (006\/06)",
          "start":23,
          "end":23,
          "codes":{
            " ":"Unknown or not specified",
            "o":"Online",
            "q":"Direct electronic",
            "|":"No attempt to code"
          }
        },
        "24-25":{
          "label":"Undefined (006\/07-08)",
          "start":24,
          "end":25,
          "codes":{
            " ":"Undefined",
            "|":"No attempt to code"
          }
        },
        "26-26":{
          "label":"Type of computer file (006\/09)",
          "start":26,
          "end":26,
          "codes":{
            "a":"Numeric data",
            "b":"Computer program",
            "c":"Representational",
            "d":"Document",
            "e":"Bibliographic data",
            "f":"Font",
            "g":"Game",
            "h":"Sound",
            "i":"Interactive multimedia",
            "j":"Online system or service",
            "m":"Combination",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "27-27":{
          "label":"Undefined (006\/10)",
          "start":27,
          "end":27,
          "codes":{
            " ":"Undefined",
            "|":"No attempt to code"
          }
        },
        "28-28":{
          "label":"Government publication (006\/11)",
          "start":28,
          "end":28,
          "codes":{
            " ":"Not a government publication",
            "a":"Autonomous or semi-autonomous component",
            "c":"Multilocal",
            "f":"Federal\/national",
            "i":"International intergovernmental",
            "l":"Local",
            "m":"Multistate",
            "o":"Government publication-level undetermined",
            "s":"State, provincial, territorial, dependent, etc.",
            "u":"Unknown if item is government publication",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "29-34":{
          "label":"Undefined (006\/12-17)",
          "start":29,
          "end":34,
          "codes":{
            " ":"Undefined",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":false
    },
    "008p":{
      "label":"Maps",
      "scope":["e","f"],
      "positions":{
        "18-21":{
          "label":"Relief (006\/01-04)",
          "start":18,
          "end":21,
          "codes":{
            " ":"No relief shown",
            "a":"Contours",
            "b":"Shading",
            "c":"Gradient and bathymetric tints",
            "d":"Hachures",
            "e":"Bathymetry\/soundings",
            "f":"Form lines",
            "g":"Spot heights",
            "i":"Pictorially",
            "j":"Land forms",
            "k":"Bathymetry\/isolines",
            "m":"Rock drawings",
            "z":"Other",
            "||||":"No attempt to code"
          }
        },
        "22-23":{
          "label":"Projection (006\/05-06)",
          "start":22,
          "end":23,
          "codes":{
            "##":"Projection not specified",
            "aa":"Aitoff",
            "ab":"Gnomic",
            "ac":"Lambert's azimuthal equal area",
            "ad":"Orthographic",
            "ae":"Azimuthal equidistant",
            "af":"Stereographic",
            "ag":"General vertical near-sided",
            "am":"Modified stereographic for Alaska",
            "an":"Chamberlin trimetric",
            "ap":"Polar stereographic",
            "au":"Azimuthal, specific type unknown",
            "az":"Azimuthal, other",
            "ba":"Gall",
            "bb":"Goode's homolographic",
            "bc":"Lambert's cylindrical equal area",
            "bd":"Mercator",
            "be":"Miller",
            "bf":"Mollweide",
            "bg":"Sinusoidal",
            "bh":"Transverse Mercator",
            "bi":"Gauss-Kruger",
            "bj":"Equirectangular",
            "bk":"Krovak",
            "bl":"Cassini-Soldner",
            "bo":"Oblique Mercator",
            "br":"Robinson",
            "bs":"Space oblique Mercator",
            "bu":"Cylindrical, specific type unknown",
            "bz":"Cylindrical, other",
            "ca":"Albers equal area",
            "cb":"Bonne",
            "cc":"Lambert's conformal conic",
            "ce":"Equidistant conic",
            "cp":"Polyconic",
            "cu":"Conic, specific type unknown",
            "cz":"Conic, other",
            "da":"Armadillo",
            "db":"Butterfly",
            "dc":"Eckert",
            "dd":"Goode's homolosine",
            "de":"Miller's bipolar oblique conformal conic",
            "df":"Van Der Grinten",
            "dg":"Dimaxion",
            "dh":"Cordiform",
            "dl":"Lambert conformal",
            "zz":"Other",
            "||":"No attempt to code"
          }
        },
        "24-24":{
          "label":"Undefined (006\/07)",
          "start":24,
          "end":24,
          "codes":{
            " ":"Undefined"
          }
        },
        "25-25":{
          "label":"Type of cartographic material (006\/08)",
          "start":25,
          "end":25,
          "codes":{
            "a":"Single map",
            "b":"Map series",
            "c":"Map serial",
            "d":"Globe",
            "e":"Atlas",
            "f":"Separate supplement to another work",
            "g":"Bound as part of another work",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "26-27":{
          "label":"Undefined (006\/09-10)",
          "start":26,
          "end":27,
          "codes":{
            " ":"Undefined"
          }
        },
        "28-28":{
          "label":"Government publication (006\/11)",
          "start":28,
          "end":28,
          "codes":{
            " ":"Not a government publication",
            "a":"Autonomous or semi-autonomous component",
            "c":"Multilocal",
            "f":"Federal\/national",
            "i":"International intergovernmental",
            "l":"Local",
            "m":"Multistate",
            "o":"Government publication-level undetermined",
            "s":"State, provincial, territorial, dependent, etc.",
            "u":"Unknown if item is government publication",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "29-29":{
          "label":"Form of item (006\/12)",
          "start":29,
          "end":29,
          "codes":{
            " ":"None of the following",
            "a":"Microfilm",
            "b":"Microfiche",
            "c":"Microopaque",
            "d":"Large print",
            "f":"Braille",
            "o":"Online",
            "q":"Direct electronic",
            "r":"Regular print reproduction",
            "s":"Electronic",
            "|":"No attempt to code"
          }
        },
        "30-30":{
          "label":"Undefined (006\/13)",
          "start":30,
          "end":30,
          "codes":{
            " ":"Undefined"
          }
        },
        "31-31":{
          "label":"Index (006\/14)",
          "start":31,
          "end":31,
          "codes":{
            "0":"No index",
            "1":"Index present",
            "|":"No attempt to code"
          }
        },
        "32-32":{
          "label":"Undefined (006\/15)",
          "start":32,
          "end":32,
          "codes":{
            " ":"Undefined"
          }
        },
        "33-34":{
          "label":"Special format characteristics (006\/16-17)",
          "start":33,
          "end":34,
          "codes":{
            " ":"No specified special format characteristics",
            "e":"Manuscript",
            "j":"Picture card, post card",
            "k":"Calendar",
            "l":"Puzzle",
            "n":"Game",
            "o":"Wall map",
            "p":"Playing cards",
            "r":"Loose-leaf",
            "z":"Other",
            "||":"No attempt to code"
          }
        }
      },
      "repeatable":false
    },
    "008m":{
      "label":"Music",
      "scope":["c","d","i","j"],
      "positions":{
        "18-19":{
          "label":"Form of composition (006\/01-02)",
          "start":18,
          "end":19,
          "codes":{
            "an":"Anthems",
            "bd":"Ballads",
            "bg":"Bluegrass music",
            "bl":"Blues",
            "bt":"Ballets",
            "ca":"Chaconnes",
            "cb":"Chants, Other religions",
            "cc":"Chant, Christian",
            "cg":"Concerti grossi",
            "ch":"Chorales",
            "cl":"Chorale preludes",
            "cn":"Canons and rounds",
            "co":"Concertos",
            "cp":"Chansons, polyphonic",
            "cr":"Carols",
            "cs":"Chance compositions",
            "ct":"Cantatas",
            "cy":"Country music",
            "cz":"Canzonas",
            "df":"Dance forms",
            "dv":"Divertimentos, serenades, cassations, divertissements, and notturni",
            "fg":"Fugues",
            "fl":"Flamenco",
            "fm":"Folk music",
            "ft":"Fantasias",
            "gm":"Gospel music",
            "hy":"Hymns",
            "jz":"Jazz",
            "mc":"Musical revues and comedies",
            "md":"Madrigals",
            "mi":"Minuets",
            "mo":"Motets",
            "mp":"Motion picture music",
            "mr":"Marches",
            "ms":"Masses",
            "mu":"Multiple forms",
            "mz":"Mazurkas",
            "nc":"Nocturnes",
            "nn":"Not applicable",
            "op":"Operas",
            "or":"Oratorios",
            "ov":"Overtures",
            "pg":"Program music",
            "pm":"Passion music",
            "po":"Polonaises",
            "pp":"Popular music",
            "pr":"Preludes",
            "ps":"Passacaglias",
            "pt":"Part-songs",
            "pv":"Pavans",
            "rc":"Rock music",
            "rd":"Rondos",
            "rg":"Ragtime music",
            "ri":"Ricercars",
            "rp":"Rhapsodies",
            "rq":"Requiems",
            "sd":"Square dance music",
            "sg":"Songs",
            "sn":"Sonatas",
            "sp":"Symphonic poems",
            "st":"Studies and exercises",
            "su":"Suites",
            "sy":"Symphonies",
            "tc":"Toccatas",
            "tl":"Teatro lirico",
            "ts":"Trio-sonatas",
            "uu":"Unknown",
            "vi":"Villancicos",
            "vr":"Variations",
            "wz":"Waltzes",
            "za":"Zarzuelas",
            "zz":"Other",
            "||":"No attempt to code"
          }
        },
        "20-20":{
          "label":"Format of music (006\/03)",
          "start":20,
          "end":20,
          "codes":{
            "a":"Full score",
            "b":"Miniature or study score",
            "c":"Accompaniment reduced for keyboard",
            "d":"Voice score with accompaniment omitted",
            "e":"Condensed score or piano-conductor score",
            "g":"Close score",
            "h":"Chorus score",
            "i":"Condensed score",
            "j":"Performer-conductor part",
            "k":"Vocal score",
            "l":"Score",
            "m":"Multiple score formats",
            "n":"Not applicable",
            "p":"Piano score",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "21-21":{
          "label":"Music parts (006\/04)",
          "start":21,
          "end":21,
          "codes":{
            " ":"No parts in hand or not specified",
            "d":"Instrumental and vocal parts",
            "e":"Instrumental parts",
            "f":"Vocal parts",
            "n":"Not applicable",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "22-22":{
          "label":"Target audience (006\/05)",
          "start":22,
          "end":22,
          "codes":{
            " ":"Unknown or unspecified",
            "a":"Preschool",
            "b":"Primary",
            "c":"Pre-adolescent",
            "d":"Adolescent",
            "e":"Adult",
            "f":"Specialized",
            "g":"General",
            "j":"Juvenile",
            "|":"No attempt to code"
          }
        },
        "23-23":{
          "label":"Form of item (006\/06)",
          "start":23,
          "end":23,
          "codes":{
            " ":"None of the following",
            "a":"Microfilm",
            "b":"Microfiche",
            "c":"Microopaque",
            "d":"Large print",
            "f":"Braille",
            "o":"Online",
            "q":"Direct electronic",
            "r":"Regular print reproduction",
            "s":"Electronic",
            "|":"No attempt to code"
          }
        },
        "24-29":{
          "label":"Accompanying matter (006\/07-12)",
          "start":24,
          "end":29,
          "codes":{
            " ":"No accompanying matter",
            "a":"Discography",
            "b":"Bibliography",
            "c":"Thematic index",
            "d":"Libretto or text",
            "e":"Biography of composer or author",
            "f":"Biography of performer or history of ensemble",
            "g":"Technical and\/or historical information on instruments",
            "h":"Technical information on music",
            "i":"Historical information",
            "k":"Ethnological information",
            "r":"Instructional materials",
            "s":"Music",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "30-31":{
          "label":"Literary text for sound recordings (006\/13-14)",
          "start":30,
          "end":31,
          "codes":{
            " ":"Item is a music sound recording",
            "a":"Autobiography",
            "b":"Biography",
            "c":"Conference proceedings",
            "d":"Drama",
            "e":"Essays",
            "f":"Fiction",
            "g":"Reporting",
            "h":"History",
            "i":"Instruction",
            "j":"Language instruction",
            "k":"Comedy",
            "l":"Lectures, speeches",
            "m":"Memoirs",
            "n":"Not applicable",
            "o":"Folktales",
            "p":"Poetry",
            "r":"Rehearsals",
            "s":"Sounds",
            "t":"Interviews",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "32-32":{
          "label":"Undefined (006\/15)",
          "start":32,
          "end":32,
          "codes":{
          }
        },
        "33-33":{
          "label":"Transposition and arrangement (006\/16)",
          "start":33,
          "end":33,
          "codes":{
            " ":"Not arrangement or transposition or not specified",
            "a":"Transposition",
            "b":"Arrangement",
            "c":"Both transposed and arranged",
            "n":"Not applicable",
            "u":"Unknown",
            "|":"No attempt to code"
          }
        },
        "34-34":{
          "label":"Undefined (006\/17)",
          "start":34,
          "end":34,
          "codes":{
          }
        }
      },
      "repeatable":false
    },
    "008s":{
      "label":"Continuing Resources",
      "scope":["a"],
      "level":["b","i","s"],
      "positions":{
        "18-18":{
          "label":"Frequency (006\/01)",
          "start":18,
          "end":18,
          "codes":{
            " ":"No determinable frequency",
            "a":"Annual",
            "b":"Bimonthly",
            "c":"Semiweekly",
            "d":"Daily",
            "e":"Biweekly",
            "f":"Semiannual",
            "g":"Biennial",
            "h":"Triennial",
            "i":"Three times a week",
            "j":"Three times a month",
            "k":"Continuously updated",
            "m":"Monthly",
            "q":"Quarterly",
            "s":"Semimonthly",
            "t":"Three times a year",
            "u":"Unknown",
            "w":"Weekly",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "19-19":{
          "label":"Regularity (006\/02)",
          "start":19,
          "end":19,
          "codes":{
            "n":"Normalized irregular",
            "r":"Regular",
            "u":"Unknown",
            "x":"Completely irregular",
            "|":"No attempt to code"
          }
        },
        "20-20":{
          "label":"Undefined (006\/03)",
          "start":20,
          "end":20,
          "codes":{
            " ":"Undefined"
          }
        },
        "21-21":{
          "label":"Type of continuing resource (006\/04)",
          "start":21,
          "end":21,
          "codes":{
            " ":"None of the following",
            "d":"Updating database",
            "g":"Magazine",
            "h":"Blog",
            "j":"Journal",
            "l":"Updating loose-leaf",
            "m":"Monographic series",
            "n":"Newspaper",
            "p":"Periodical",
            "r":"Repository",
            "s":"Newsletter",
            "t":"Directory",
            "w":"Updating Web site",
            "|":"No attempt to code"
          }
        },
        "22-22":{
          "label":"Form of original item (006\/05)",
          "start":22,
          "end":22,
          "codes":{
            " ":"None of the following",
            "a":"Microfilm",
            "b":"Microfiche",
            "c":"Microopaque",
            "d":"Large print",
            "e":"Newspaper format",
            "f":"Braille",
            "o":"Online",
            "q":"Direct electronic",
            "s":"Electronic",
            "|":"No attempt to code"
          }
        },
        "23-23":{
          "label":"Form of item (006\/06)",
          "start":23,
          "end":23,
          "codes":{
            " ":"None of the following",
            "a":"Microfilm",
            "b":"Microfiche",
            "c":"Microopaque",
            "d":"Large print",
            "f":"Braille",
            "o":"Online",
            "q":"Direct electronic",
            "r":"Regular print reproduction",
            "s":"Electronic",
            "|":"No attempt to code"
          }
        },
        "24-24":{
          "label":"Nature of entire work (006\/07)",
          "start":24,
          "end":24,
          "codes":{
            " ":"Not specified",
            "a":"Abstracts\/summaries",
            "b":"Bibliographies",
            "c":"Catalogs",
            "d":"Dictionaries",
            "e":"Encyclopedias",
            "f":"Handbooks",
            "g":"Legal articles",
            "h":"Biography",
            "i":"Indexes",
            "k":"Discographies",
            "l":"Legislation",
            "m":"Theses",
            "n":"Surveys of literature in a subject area",
            "o":"Reviews",
            "p":"Programmed texts",
            "q":"Filmographies",
            "r":"Directories",
            "s":"Statistics",
            "t":"Technical reports",
            "u":"Standards\/specifications",
            "v":"Legal cases and case notes",
            "w":"Law reports and digests",
            "y":"Yearbooks",
            "z":"Treaties",
            "5":"Calendars",
            "6":"Comics\/graphic novels",
            "|":"No attempt to code"
          }
        },
        "25-27":{
          "label":"Nature of contents (006\/08-10)",
          "start":25,
          "end":27,
          "codes":{
            " ":"Not specified",
            "a":"Abstracts\/summaries",
            "b":"Bibliographies",
            "c":"Catalogs",
            "d":"Dictionaries",
            "e":"Encyclopedias",
            "f":"Handbooks",
            "g":"Legal articles",
            "h":"Biography",
            "i":"Indexes",
            "k":"Discographies",
            "l":"Legislation",
            "m":"Theses",
            "n":"Surveys of literature in a subject area",
            "o":"Reviews",
            "p":"Programmed texts",
            "q":"Filmographies",
            "r":"Directories",
            "s":"Statistics",
            "t":"Technical reports",
            "u":"Standards\/specifications",
            "v":"Legal cases and case notes",
            "w":"Law reports and digests",
            "y":"Yearbooks",
            "z":"Treaties",
            "5":"Calendars",
            "6":"Comics\/graphic novels",
            "|||":"No attempt to code"
          }
        },
        "28-28":{
          "label":"Government publication (006\/11)",
          "start":28,
          "end":28,
          "codes":{
            " ":"Not a government publication",
            "a":"Autonomous or semi-autonomous component",
            "c":"Multilocal",
            "f":"Federal\/national",
            "i":"International intergovernmental",
            "l":"Local",
            "m":"Multistate",
            "o":"Government publication-level undetermined",
            "s":"State, provincial, territorial, dependent, etc.",
            "u":"Unknown if item is government publication",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "29-29":{
          "label":"Conference publication (006\/12)",
          "start":29,
          "end":29,
          "codes":{
            "0":"Not a conference publication",
            "1":"Conference publication",
            "|":"No attempt to code"
          }
        },
        "30-32":{
          "label":"Undefined (006\/13-15)",
          "start":30,
          "end":32,
          "codes":{
            " ":"Undefined"
          }
        },
        "33-33":{
          "label":"Original alphabet or script of title (006\/16)",
          "start":33,
          "end":33,
          "codes":{
            " ":"No alphabet or script given\/No key title",
            "a":"Basic Roman",
            "b":"Extended Roman",
            "c":"Cyrillic",
            "d":"Japanese",
            "e":"Chinese",
            "f":"Arabic",
            "g":"Greek",
            "h":"Hebrew",
            "i":"Thai",
            "j":"Devanagari",
            "k":"Korean",
            "l":"Tamil",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "34-34":{
          "label":"Entry convention (006\/17)",
          "start":34,
          "end":34,
          "codes":{
            "0":"Successive entry",
            "1":"Latest entry",
            "2":"Integrated entry",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":false
    },
    "008v":{
      "label":"Visual Materials",
      "scope":["g","k","o","r"],
      "positions":{
        "18-20":{
          "label":"Running time for motion pictures and videorecordings (006\/01-03)",
          "start":18,
          "end":20,
          "codes":{
            "000":"Running time exceeds three characters",
            "001-999":"Running time",
            "nnn":"Not applicable",
            "---":"Unknown",
            "|||":"No attempt to code"
          }
        },
        "21-21":{
          "label":"Undefined (006\/04)",
          "start":21,
          "end":21,
          "codes":{
            " ":"Undefined"
          }
        },
        "22-22":{
          "label":"Target audience (006\/05)",
          "start":22,
          "end":22,
          "codes":{
            " ":"Unknown or not specified",
            "a":"Preschool",
            "b":"Primary",
            "c":"Pre-adolescent",
            "d":"Adolescent",
            "e":"Adult",
            "f":"Specialized",
            "g":"General",
            "j":"Juvenile",
            "|":"No attempt to code"
          }
        },
        "23-27":{
          "label":"Undefined (006\/06-10)",
          "start":23,
          "end":27,
          "codes":{
            " ":"Undefined"
          }
        },
        "28-28":{
          "label":"Government publication (006\/11)",
          "start":28,
          "end":28,
          "codes":{
            " ":"Not a government publication",
            "a":"Autonomous or semi-autonomous component",
            "c":"Multilocal",
            "f":"Federal\/national",
            "i":"International intergovernmental",
            "l":"Local",
            "m":"Multistate",
            "o":"Government publication-level undetermined",
            "s":"State, provincial, territorial, dependent, etc.",
            "u":"Unknown if item is government publication",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "29-29":{
          "label":"Form of item (006\/12)",
          "start":29,
          "end":29,
          "codes":{
            " ":"None of the following",
            "a":"Microfilm",
            "b":"Microfiche",
            "c":"Microopaque",
            "d":"Large print",
            "f":"Braille",
            "o":"Online",
            "q":"Direct electronic",
            "r":"Regular print reproduction",
            "s":"Electronic",
            "|":"No attempt to code"
          }
        },
        "30-32":{
          "label":"Undefined (006\/13-15)",
          "start":30,
          "end":32,
          "codes":{
            " ":"Undefined"
          }
        },
        "33-33":{
          "label":"Type of visual material (006\/16)",
          "start":33,
          "end":33,
          "codes":{
            "a":"Art original",
            "b":"Kit",
            "c":"Art reproduction",
            "d":"Diorama",
            "f":"Filmstrip",
            "g":"Game",
            "i":"Picture",
            "k":"Graphic",
            "l":"Technical drawing",
            "m":"Motion picture",
            "n":"Chart",
            "o":"Flash card",
            "p":"Microscope slide",
            "q":"Model",
            "r":"Realia",
            "s":"Slide",
            "t":"Transparency",
            "v":"Videorecording",
            "w":"Toy",
            "z":"Other",
            "|":"No attempt to code"
          }
        },
        "34-34":{
          "label":"Technique (006\/17)",
          "start":34,
          "end":34,
          "codes":{
            "a":"Animation",
            "c":"Animation and live action",
            "l":"Live action",
            "n":"Not applicable",
            "u":"Unknown",
            "z":"Other",
            "|":"No attempt to code"
          }
        }
      },
      "repeatable":false
    },
    "008x":{
      "label":"Mixed Materials",
      "scope":["p"],
      "positions":{
        "18-22":{
          "label":"Undefined (006\/01-05)",
          "start":18,
          "end":22,
          "codes":{
            " ":"Undefined"
          }
        },
        "23-23":{
          "label":"Form of item (006\/06)",
          "start":23,
          "end":23,
          "codes":{
            " ":"None of the following",
            "a":"Microfilm",
            "b":"Microfiche",
            "c":"Microopaque",
            "d":"Large print",
            "f":"Braille",
            "o":"Online",
            "q":"Direct electronic",
            "r":"Regular print reproduction",
            "s":"Electronic",
            "|":"No attempt to code"
          }
        },
        "24-34":{
          "label":"Undefined (006\/07-17)",
          "start":24,
          "end":34,
          "codes":{
            " ":"Undefined"
          }
        }
      },
      "repeatable":false
    }
  }
}