/*
    Original list from: https://github.com/keveightysev/us-state-converter
    Related: https://github.com/nathanbarrett/usa-states

    Census Regions/Division: https://www2.census.gov/geo/pdfs/maps-data/maps/reference/us_regdiv.pdf
*/
const list = [
  {
    name: 'Alabama',
    usps: 'AL',
    demonym: 'Alabamian',
    iso: 'US-AL',
    altAbbr: ['Ala'],
    uscg: 'AL',
    censusRegion: 'South',
    censusDivision: 'East South Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Alaska',
    usps: 'AK',
    demonym: 'Alaskan',
    iso: 'US-AK',
    altAbbr: ['Alas'],
    uscg: 'AK',
    censusRegion: 'West',
    censusDivision: 'Pacific',
    contiguous: false,
    territory: false
  },
  {
    name: 'Arizona',
    usps: 'AZ',
    demonym: 'Arizonan',
    iso: 'US-AZ',
    altAbbr: ['Ariz'],
    uscg: 'AZ',
    censusRegion: 'West',
    censusDivision: 'Mountain',
    contiguous: true,
    territory: false
  },
  {
    name: 'Arkansas',
    usps: 'AR',
    demonym: 'Arkansan',
    iso: 'US-AR',
    altAbbr: ['Ark'],
    uscg: 'AR',
    censusRegion: 'South',
    censusDivision: 'West South Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'California',
    usps: 'CA',
    demonym: 'Californian',
    iso: 'US-CA',
    altAbbr: ['Cal', 'Calif'],
    uscg: 'CF',
    censusRegion: 'West',
    censusDivision: 'Pacific',
    contiguous: true,
    territory: false
  },
  {
    name: 'Colorado',
    usps: 'CO',
    demonym: 'Coloradan',
    iso: 'US-CO',
    altAbbr: ['Colo', 'Col'],
    uscg: 'CL',
    censusRegion: 'West',
    censusDivision: 'Mountain',
    contiguous: true,
    territory: false
  },
  {
    name: 'Connecticut',
    usps: 'CT',
    demonym: 'Connecticuter',
    iso: 'US-CT',
    altAbbr: ['Conn'],
    uscg: 'CT',
    censusRegion: 'Northeast',
    censusDivision: 'New England',
    contiguous: true,
    territory: false
  },
  {
    name: 'Delaware',
    usps: 'DE',
    demonym: 'Delawarean',
    iso: 'US-DE',
    altAbbr: ['Del'],
    uscg: 'DL',
    censusRegion: 'South',
    censusDivision: 'South Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'District of Columbia',
    usps: 'DC',
    demonym: 'Washingtonian',
    iso: 'US-DC',
    altAbbr: ['Wash DC'],
    uscg: 'DC',
    censusRegion: 'South',
    censusDivision: 'South Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'Florida',
    usps: 'FL',
    demonym: 'Floridian',
    iso: 'US-FL',
    altAbbr: ['Fla', 'Flor'],
    uscg: 'FL',
    censusRegion: 'South',
    censusDivision: 'South Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'Georgia',
    usps: 'GA',
    demonym: 'Georgian',
    iso: 'US-GA',
    altAbbr: ['Geo'],
    uscg: 'GA',
    censusRegion: 'South',
    censusDivision: 'South Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'Hawaii',
    usps: 'HI',
    demonym: 'Hawaii resident',
    iso: 'US-HI',
    altAbbr: ['Geo'],
    uscg: 'HA',
    censusRegion: 'West',
    censusDivision: 'Pacific',
    contiguous: false,
    territory: false
  },
  {
    name: 'Idaho',
    usps: 'ID',
    demonym: 'Idahoan',
    iso: 'US-ID',
    altAbbr: ['Ida'],
    uscg: 'ID',
    censusRegion: 'West',
    censusDivision: 'Mountain',
    contiguous: true,
    territory: false
  },
  {
    name: 'Illinois',
    usps: 'IL',
    demonym: 'Illinoisan',
    iso: 'US-IL',
    altAbbr: ['Ill', 'Ills', "Ill's"],
    uscg: 'IL',
    censusRegion: 'Midwest',
    censusDivision: 'East North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Indiana',
    usps: 'IN',
    demonym: 'Hoosier',
    iso: 'US-IN',
    altAbbr: ['Ind'],
    uscg: 'IN',
    censusRegion: 'Midwest',
    censusDivision: 'East North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Iowa',
    usps: 'IA',
    demonym: 'Iowan',
    iso: 'US-IA',
    altAbbr: ['Ioa'],
    uscg: 'IA',
    censusRegion: 'Midwest',
    censusDivision: 'West North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Kansas',
    usps: 'KS',
    demonym: 'Kansan',
    iso: 'US-KS',
    altAbbr: ['Kans', 'Kan'],
    uscg: 'KA',
    censusRegion: 'Midwest',
    censusDivision: 'West North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Kentucky',
    usps: 'KY',
    demonym: 'Kentuckian',
    iso: 'US-KY',
    altAbbr: ['Ken', 'Kent'],
    uscg: 'KY',
    censusRegion: 'South',
    censusDivision: 'East South Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Louisiana',
    usps: 'LA',
    demonym: 'Louisianian',
    iso: 'US-LA',
    altAbbr: [],
    uscg: 'LA',
    censusRegion: 'South',
    censusDivision: 'West South Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Maine',
    usps: 'ME',
    demonym: 'Mainer',
    iso: 'US-ME',
    altAbbr: [],
    uscg: 'ME',
    censusRegion: 'Northeast',
    censusDivision: 'New England',
    contiguous: true,
    territory: false
  },
  {
    name: 'Maryland',
    usps: 'MD',
    demonym: 'Marylander',
    iso: 'US-MD',
    altAbbr: [],
    uscg: 'MD',
    censusRegion: 'South',
    censusDivision: 'South Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'Massachusetts',
    usps: 'MA',
    demonym: 'Massachusettsan',
    iso: 'US-MA',
    altAbbr: ['Mass'],
    uscg: 'MS',
    censusRegion: 'Northeast',
    censusDivision: 'New England',
    contiguous: true,
    territory: false
  },
  {
    name: 'Michigan',
    usps: 'MI',
    demonym: 'Michiganian',
    iso: 'US-MI',
    altAbbr: ['Mich'],
    uscg: 'MC',
    censusRegion: 'Midwest',
    censusDivision: 'East North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Minnesota',
    usps: 'MN',
    demonym: 'Minnesotan',
    iso: 'US-MN',
    altAbbr: ['Minn'],
    uscg: 'MN',
    censusRegion: 'Midwest',
    censusDivision: 'West North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Mississippi',
    usps: 'MS',
    demonym: 'Mississippian',
    iso: 'US-MS',
    altAbbr: ['Miss'],
    uscg: 'MI',
    censusRegion: 'South',
    censusDivision: 'East South Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Missouri',
    usps: 'MO',
    demonym: 'Missourian',
    iso: 'US-MO',
    altAbbr: [],
    uscg: 'MO',
    censusRegion: 'Midwest',
    censusDivision: 'West North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Montana',
    usps: 'MT',
    demonym: 'Montanan',
    iso: 'US-MT',
    altAbbr: ['Mont'],
    uscg: 'MT',
    censusRegion: 'West',
    censusDivision: 'Mountain',
    contiguous: true,
    territory: false
  },
  {
    name: 'Nebraska',
    usps: 'NE',
    demonym: 'Nebraskan',
    iso: 'US-NE',
    altAbbr: ['Nebr', 'Neb'],
    uscg: 'NB',
    censusRegion: 'Midwest',
    censusDivision: 'West North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Nevada',
    usps: 'NV',
    demonym: 'Nevadan',
    iso: 'US-NV',
    altAbbr: ['Nev'],
    uscg: 'NV',
    censusRegion: 'West',
    censusDivision: 'Mountain',
    contiguous: true,
    territory: false
  },
  {
    name: 'New Hampshire',
    usps: 'NH',
    demonym: 'New Hampshirite',
    iso: 'US-NH',
    altAbbr: [],
    uscg: 'NH',
    censusRegion: 'Northeast',
    censusDivision: 'New England',
    contiguous: true,
    territory: false
  },
  {
    name: 'New Jersey',
    usps: 'NJ',
    demonym: 'New Jerseyan',
    iso: 'US-NJ',
    altAbbr: ['N Jersey'],
    uscg: 'NJ',
    censusRegion: 'Northeast',
    censusDivision: 'Middle Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'New Mexico',
    usps: 'NM',
    demonym: 'New Mexican',
    iso: 'US-NM',
    altAbbr: ['N Mex', 'New M'],
    uscg: 'NM',
    censusRegion: 'West',
    censusDivision: 'Mountain',
    contiguous: true,
    territory: false
  },
  {
    name: 'New York',
    usps: 'NY',
    demonym: 'New Yorker',
    iso: 'US-NY',
    altAbbr: ['N York'],
    uscg: 'NY',
    censusRegion: 'Northeast',
    censusDivision: 'Middle Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'North Carolina',
    usps: 'NC',
    demonym: 'North Carolinian',
    iso: 'US-NC',
    altAbbr: ['N Car'],
    uscg: 'NC',
    censusRegion: 'South',
    censusDivision: 'South Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'North Dakota',
    usps: 'ND',
    demonym: 'North Dakotan',
    iso: 'US-ND',
    altAbbr: ['N Dak', 'NoDak'],
    uscg: 'ND',
    censusRegion: 'Midwest',
    censusDivision: 'West North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Ohio',
    usps: 'OH',
    demonym: 'Ohioan',
    iso: 'US-OH',
    altAbbr: ['O'],
    uscg: 'OH',
    censusRegion: 'Midwest',
    censusDivision: 'East North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Oklahoma',
    usps: 'OK',
    demonym: 'Oklahoman',
    iso: 'US-OK',
    altAbbr: ['Okla'],
    uscg: 'OK',
    censusRegion: 'South',
    censusDivision: 'West South Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Oregon',
    usps: 'OR',
    demonym: 'Oregonian',
    iso: 'US-OR',
    altAbbr: ['Ore'],
    uscg: 'OR',
    censusRegion: 'West',
    censusDivision: 'Pacific',
    contiguous: true,
    territory: false
  },
  {
    name: 'Pennsylvania',
    usps: 'PA',
    demonym: 'Pennsylvanian',
    iso: 'US-PA',
    altAbbr: ['Penn', 'Penna'],
    uscg: 'PA',
    censusRegion: 'Northeast',
    censusDivision: 'Middle Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'Rhode Island',
    usps: 'RI',
    demonym: 'Rhode Islander',
    iso: 'US-RI',
    altAbbr: ['RI & PP', 'R Isl'],
    uscg: 'RI',
    censusRegion: 'Northeast',
    censusDivision: 'New England',
    contiguous: true,
    territory: false
  },
  {
    name: 'South Carolina',
    usps: 'SC',
    demonym: 'South Carolinian',
    iso: 'US-SC',
    altAbbr: ['S Car'],
    uscg: 'SC',
    censusRegion: 'South',
    censusDivision: 'South Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'South Dakota',
    usps: 'SD',
    demonym: 'South Dakotan',
    iso: 'US-SD',
    altAbbr: ['S Dak', 'SoDak'],
    uscg: 'SD',
    censusRegion: 'Midwest',
    censusDivision: 'West North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Tennessee',
    usps: 'TN',
    demonym: 'Tennessean',
    iso: 'US-TN',
    altAbbr: ['Tenn'],
    uscg: 'TN',
    censusRegion: 'South',
    censusDivision: 'East South Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Texas',
    usps: 'TX',
    demonym: 'Texan',
    iso: 'US-TX',
    altAbbr: ['Tex'],
    uscg: 'TX',
    censusRegion: 'South',
    censusDivision: 'West South Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Utah',
    usps: 'UT',
    demonym: 'Utahn',
    iso: 'US-UT',
    altAbbr: [],
    uscg: 'UT',
    censusRegion: 'West',
    censusDivision: 'Mountain',
    contiguous: true,
    territory: false
  },
  {
    name: 'Vermont',
    usps: 'VT',
    demonym: 'Vermonter',
    iso: 'US-VT',
    altAbbr: [],
    uscg: 'VT',
    censusRegion: 'Northeast',
    censusDivision: 'New England',
    contiguous: true,
    territory: false
  },
  {
    name: 'Virginia',
    usps: 'VA',
    demonym: 'Virginian',
    iso: 'US-VA',
    altAbbr: ['Virg'],
    uscg: 'VA',
    censusRegion: 'South',
    censusDivision: 'South Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'Washington',
    usps: 'WA',
    demonym: 'Washingtonian',
    iso: 'US-WA',
    altAbbr: ['Wash', 'Wn'],
    uscg: 'WN',
    censusRegion: 'West',
    censusDivision: 'Pacific',
    contiguous: true,
    territory: false
  },
  {
    name: 'West Virginia',
    usps: 'WV',
    demonym: 'West Virginian',
    iso: 'US-WV',
    altAbbr: ['W Va', 'W Virg'],
    uscg: 'WV',
    censusRegion: 'South',
    censusDivision: 'South Atlantic',
    contiguous: true,
    territory: false
  },
  {
    name: 'Wisconsin',
    usps: 'WI',
    demonym: 'Wisconsinite',
    iso: 'US-WI',
    altAbbr: ['Wis', 'Wisc'],
    uscg: 'WS',
    censusRegion: 'Midwest',
    censusDivision: 'East North Central',
    contiguous: true,
    territory: false
  },
  {
    name: 'Wyoming',
    usps: 'WY',
    demonym: 'Wyomingite',
    iso: 'US-WY',
    altAbbr: ['Wyo'],
    uscg: 'WY',
    censusRegion: 'West',
    censusDivision: 'Mountain',
    contiguous: true,
    territory: false
  },
  {
    name: 'American Samoa',
    usps: 'AS',
    demonym: 'American Samoan',
    iso: 'US-AS',
    altAbbr: [],
    uscg: 'AS',
    censusRegion: '',
    censusDivision: '',
    contiguous: false,
    territory: true
  },
  {
    name: 'Guam',
    usps: 'GU',
    demonym: 'Guamanian',
    iso: 'US-GU',
    altAbbr: [],
    uscg: 'GU',
    censusRegion: '',
    censusDivision: '',
    contiguous: false,
    territory: true
  },
  {
    name: 'Northern Mariana Islands',
    usps: 'MP',
    demonym: 'Mariana Islander',
    iso: 'US-MP',
    altAbbr: ['CNMI'],
    uscg: 'CM',
    censusRegion: '',
    censusDivision: '',
    contiguous: false,
    territory: true
  },
  {
    name: 'Puerto Rico',
    usps: 'PR',
    demonym: 'Puerto Rican',
    iso: 'US-PR',
    altAbbr: [],
    uscg: 'PR',
    censusRegion: '',
    censusDivision: '',
    contiguous: false,
    territory: true
  },
  {
    name: 'US Virgin Islands',
    usps: 'VI',
    demonym: 'Virgin Islander',
    iso: 'US-VI',
    altAbbr: ['USVI'],
    uscg: 'VI',
    censusRegion: '',
    censusDivision: '',
    contiguous: false,
    territory: true
  },
  {
    name: 'US Minor Outlying Islands',
    usps: 'UM',
    demonym: '',
    iso: 'US-UM',
    altAbbr: [],
    uscg: 'UM',
    censusRegion: '',
    censusDivision: '',
    contiguous: false,
    territory: true
  },
]

module.exports = {list}

// NOTE: disabled this cause I have not reviewed it
// dont need any of it yet; would like to write my own for what I need

// from: https://github.com/keveightysev/us-state-converter
// module.exports = (() => {
//   const main = state => {
//     if (!state) return list
//     state = state.split('.').join('')
//     const found = list.find(
//       item =>
//         item.name.toUpperCase() === state.toUpperCase() ||
//         item.usps.toUpperCase() === state.toUpperCase() ||
//         item.altAbbr.find(st => st.toUpperCase() === state.toUpperCase()),
//     )
//     if (found) return found

//     return 'No state found!'
//   }

//   main.abbr = state => {
//     if (!state) return 'Please pass a full state name as your argument'
//     const found = list.find(
//       item => item.name.toUpperCase() === state.toUpperCase(),
//     )
//     if (found) return found.usps
//     return 'No abbreviation found with that state name'
//   }

//   main.fullName = abbr => {
//     if (!abbr) return 'Please pass an abbreviation as your argument'
//     const found = list.find(
//       item =>
//         item.usps.toUpperCase() === abbr.toUpperCase() ||
//         item.altAbbr.find(st => st.toUpperCase() === abbr.toUpperCase()),
//     )
//     if (found) return found.name
//     return 'No state found with that abbreviation'
//   }

//   main.only50 = () => {
//     const notStates = ['DC', 'AS', 'GU', 'MP', 'PR', 'VI', 'UM']
//     return list.filter(item => !notStates.includes(item.usps))
//   }

//   main.demonym = state => {
//     if (!state)
//       return 'Please pass a state name or abbreviation as your argument'
//     const found = list.find(
//       item =>
//         item.name.toUpperCase() === state.toUpperCase() ||
//         item.usps.toUpperCase() === state.toUpperCase() ||
//         item.altAbbr.find(st => st.toUpperCase() === state.toUpperCase()),
//     )
//     if (found) return found.demonym
//     return 'No demonym found for that state'
//   }

//   return main
// })()