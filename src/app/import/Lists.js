import ToolsImport from './ToolsImport';

var Lists = {
  "trackedEntityAttributes": {
    "ClientCode": {
      "nameXls":  "ClientCode",
      "nameDhis": "Unique ID (OldID)",
      "uid":      "w1rn31LvDeZ",          // TO UPDATE LATER
      "active":   true,
      evaluate:   function (val) { return val; },
    },
    "CUIC": {
      "nameXls":  "CUIC",
      "nameDhis": "Unique ID (CUIC)",
      "uid":      "zRA08XEYiSF",
      "active":   true,
      evaluate:   function (val) { return val; },
    },
    "BirthDate": {
      "nameXls":  "BirthDate",
      "nameDhis": "Date of Birth",
      "uid":      "wSp6Q7QDMsk",
      "active":   true,
      evaluate:   function (val) { return ToolsImport.excelDateToJSDate(val); },
    },
    "BirthDistrict": {
      "nameXls":  "BirthDistrict",
      "nameDhis": "District of birth",
      "uid":      "u57uh7lHwF8",
      "active":   true,
      evaluate:   function (val) { return Lists.orgUnits["District"][val].optionSet; },
    },
    "ClientLastname": {
      "nameXls":  "ClientLastname",
      "nameDhis": "Last name",
      "uid":      "mUxDHgywnn2",
      "active":   true,
      evaluate:   function (val) { return val; },
    },
    "ClientFirstname": {
      "nameXls":  "ClientFirstname",
      "nameDhis": "First name",
      "uid":      "mW2l3T2zL0N",
      "active":   true,
      evaluate:   function (val) { return val; },
    },
    "BirthOrder": {
      "nameXls":  "BirthOrder",
      "nameDhis": "Birth Order",
      "uid":      "vTPYC9BXPNn",
      "active":   true,
      evaluate:   function (val) { return val < 10 ? "0" + val : val; },
    },
    "Sex": {
      "nameXls":  "Sex",
      "nameDhis": "Sex",
      "uid":      "CCVO6BZMrnp",
      "active":   true,
      evaluate:   function (val) {
        var categories = {"1": "Male", "2":"Female"};
        return categories[val];
      },/*
    "": {
      "nameXls": "",
      "nameDhis": "PP Factory worker or ex-factory worker",
      "uid": "tzZCy78mWEG",
      "active": true,
      "categories": {"1": "Yes", "2":"No"}
    },
    "": {
      "nameDhis": "PP Miner or ex-miner",
      "uid": "gYiUqfKwktq",
      "active": true,
      "nameXls": "",
      "categories": {"1": "Yes", "2":"No"}*/
  },
  /*{"nameDhis": "Ever tested and received result",       "uid": "PWy9kmp4Pmb", "active": true,       "nameXls": "",
  "categories": {"1": "Yes", "2":"No"}
  },
  {"nameDhis": "Date of last HIV test",                 "uid": "PyfoYtwNGrI", "active": true,       "nameXls": "" },
  {"nameDhis": "Result of last HIV test",               "uid": "XTWSNIlxkEj", "active": true,       "nameXls": "",
  "categories": {"1": "Negative", "2":"Positive"}
  },
  {"nameDhis": "Education level",                       "uid": "Bs4zxQQ3EyB", "active": true,       "nameXls": "" },
    *//*
    {"nameDhis": "Key Population",                        "uid": "Y35TizULMzg", "active": true,       "nameXls": "" },
    {"nameDhis": "KEY POP - PWID",                        "uid": "kdzfhXK71re", "active": true,       "nameXls": "" },
    {"nameDhis": "KEY POP - Prisoner/ enclosed setting",  "uid": "Fty7JMtC7mX", "active": true,       "nameXls": "" },
    {"nameDhis": "PP OVC",                                "uid": "vD0qayOxs64", "active": true,       "nameXls": "" },
    {"nameDhis": "PP Mobile pop",                         "uid": "kpMMzIM3t5I", "active": true,       "nameXls": "" },
    {"nameDhis": "PP Military",                           "uid": "fa7lRYdWJfl", "active": true,       "nameXls": "" },
    {"nameDhis": "Phone number",                          "uid": "C1twCsH0rjI", "active": "contact",  "nameXls": "" },
    {"nameDhis": "Place of residence",                    "uid": "GfeneNwPZmH", "active": "contact",  "nameXls": "" },
    */
  },
  "dataElements": {
    /*
    {"nameDhis": "Client - type",                         "uid": "RvYugZqBKoN", "active": true,       "nameXls": "",
      "categories": {"1": "Individual", "2":"Couple"}
    },
    {"nameDhis": "Client - Age (yrs)",                    "uid": "e4XZKCNJjlc", "active": true,       "nameXls": "" },
    {"nameDhis": "Client - Delivery channel",             "uid": "quOYwc0SOqD", "active": true,       "nameXls": "" },
    {"nameDhis": "Client - Employment status",            "uid": "VEVaRAcZUcD", "active": true,       "nameXls": "" },
    {"nameDhis": "Client - What motivated HIV test",      "uid": "vOrRzjpdQC6", "active": true,       "nameXls": "" },
    {"nameDhis": "Client - What motivated HIV test - other","uid": "GCl3ORKj1jC", "active": true,     "nameXls": "" },
    {"nameDhis": "NCD - Height",                          "uid": "aIplfQPaJH7", "active": true,       "nameXls": "" },
    {"nameDhis": "NCD - Weight",                          "uid": "PazJ9tnjGhS", "active": true,       "nameXls": "" },
    {"nameDhis": "NCD - BMI",                             "uid": "r0Lh3dEecPF", "active": true,       "nameXls": "" },
    {"nameDhis": "NCD - BP systolic (mmHg)",              "uid": "yI7kyMQJVKW", "active": true,       "nameXls": "" },
    {"nameDhis": "NCD - BP diastolic (mmHg)",             "uid": "SvAAL4qH5pX", "active": true,       "nameXls": "" },
    {"nameDhis": "NCD - Blood glucose (mmol/l)",          "uid": "xioxtS6erFa", "active": true,       "nameXls": "" },
    {"nameDhis": "RA - Pregnant or breastfeeding",        "uid": "Ax5h5bwtBMK", "active": true,       "nameXls": "" },
    {"nameDhis": "RA - STI circumcised",                  "uid": "Ml9lBSv0iCC", "active": true,       "nameXls": "" },
    {"nameDhis": "RA - Genital sores or discharge",       "uid": "za8zgXEjUHp", "active": true,       "nameXls": "" },
    {"nameDhis": "RA - Does partner know HIV status",     "uid": "TSqDjQSS2Qi", "active": true,       "nameXls": "" },
    {"nameDhis": "Partner HIV status",                    "uid": "C4Zu5mKJQ9y", "active": true,       "nameXls": "" },
    {"nameDhis": "RA - Number of sexual partners",        "uid": "drqngyyqyP3", "active": true,       "nameXls": "" },
    {"nameDhis": "Test 1 - Result",                       "uid": "choHDFxMCaU", "active": true,       "nameXls": "" },
    {"nameDhis": "Test 2 - Result",                       "uid": "KDnhSz51HKS", "active": true,       "nameXls": "" },
    {"nameDhis": "Test 3 Parallel 1 - Result",            "uid": "rMh4ZGNzrh1", "active": true,       "nameXls": "" },
    {"nameDhis": "Test 3 Parallel 2 - Result",            "uid": "Bqff4skvt4d", "active": true,       "nameXls": "" },
    {"nameDhis": "Test - SD bioline result",              "uid": "M11JqgkJt2X", "active": true,       "nameXls": "" },
    {"nameDhis": "Test - Invalid tests",                  "uid": "UOmjmckRjzR", "active": true,       "nameXls": "" },
    {"nameDhis": "Test result final HIV status",          "uid": "UuKat0HFjWS", "active": true,       "nameXls": "" },
    {"nameDhis": "Test - Results given",                  "uid": "QLMo6Kh3eVP", "active": true,       "nameXls": "" },
    {"nameDhis": "Previous knowledge of HIV+ status",     "uid": "esWS3Y9LDi6", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - referral offered",           "uid": "r8AftzZCjWP", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - TB screening conducted",     "uid": "mkVl2wjztaz", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - TB suspected",               "uid": "aK3LtjgJwUH", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - STI diagnosis/treatment",    "uid": "hv1oAJf18cE", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - TB diagnosis/treatment",     "uid": "a9x8qqtTs0J", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - ART",                        "uid": "tUIkmIFMEDS", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - Family Planning",            "uid": "BqyBHC6eEFr", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - VMMC",                       "uid": "DbfyDJ04SjL", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - PReP (HIV-)",                "uid": "sTmbmjnUhrA", "active": true,       "nameXls": "" },
    {"nameDhis": "Referral - Referral facility",          "uid": "E1KAxdya3y5", "active": true,       "nameXls": "" },
    {"nameDhis": "Commodity - Female condom distributed (units)","uid": "nNJQ6POHKNc", "active": true,"nameXls": "" },
    {"nameDhis": "Commodity - Male condom distributed (units)","uid": "A5aT1hCrMw1", "active": true,  "nameXls": "" },
    {"nameDhis": "Commodity - Lubricants distributed (units)","uid": "ettc2MtVOcm", "active": true,   "nameXls": "" }
    */
  },
  "orgUnits": {
    "url": "http://localhost:8989/dhis/api/organisationUnits/vJNI6blhosr?fields=id,name,children[id,name,children[id,name]]&paging=false",
    "Country": {
      "nameDhis": "Lesotho",
      "uid": "QPRZuTHu18l",
    },
    "District": {
      "1": {
        "nameDhis": "Maseru (01)",
        "uid": "QPRZuTHu18l",
        "parent": "LS",
        "nameXls": "1",
        "optionSet": "05",
      },
      "3": {
        "nameDhis": "Leribe (03)",
        "uid": "rp9THcpEmRk",
        "parent": "LS",
        "nameXls": "3",
        "optionSet": "03",
      }
    },
    "Community Council": {
      "Likolobeng A03":         { "nameDhis": "Likolobeng A03 (013904)",          "uid": "anjmGLCTTNB", "parent": "1",    "nameXls": "" },
      "Mazenod A06":            { "nameDhis": "Mazenod A06 (014309)",             "uid": "KZgkbAmRWIu", "parent": "1",    "nameXls": "" },
      "Makhoarane A08":         { "nameDhis": "Makhoarane A08 (014511)",          "uid": "epdvPcnet5Q", "parent": "1",    "nameXls": "" },
      "Kubake A09":             { "nameDhis": "Kubake A09 (014512)",              "uid": "FsdhkF2xcRT", "parent": "1",    "nameXls": "" },
      "Matsoku C01":            { "nameDhis": "Matsoku C01 (030601)",             "uid": "wtWiqkTijBP", "parent": "3",    "nameXls": "" },
      "Mamafubelu C04":         { "nameDhis": "Maoamafubelu C04 (030908)",        "uid": "vjN3wXIwogG", "parent": "3",    "nameXls": "" },
      "Litjotjela C08":         { "nameDhis": "Litjotjela C08 (031414)",          "uid": "xInpsLkifcS", "parent": "3",    "nameXls": "" },
      "Manka C10":              { "nameDhis": "Manka C10 (031717)",               "uid": "GqtHUHVRXch", "parent": "3",    "nameXls": "" },
      "Maputsoe urban council": { "nameDhis": "Maputsoe urban council (031515)",  "uid": "SSnj1hiozjl", "parent": "3",    "nameXls": "" },
      "Hlotse urban council":   { "nameDhis": "Hlotse urban council (031313)",    "uid": "KQxjlV6Bt3l", "parent": "3",    "nameXls": "" }
    }
  },
  "Counsellors": {
    "VOD 20333":  "Tsepang Molise",
    "VOD 18286":  "Marorisang Manare",
    "VOD 20646":  "Makhakhe Papielo",
    "VOD 20586":  "Lengau Tsela",
    "VOD 8591":   "Tiisetso Mojaje",
    "VOD 8861":   "Nthabeleng Manaka",
    "VOD 14034":  "Mosiuoa Raseotsana",
    "VOD 8850":   "Thabo Chere",
    "VOD 19148":  "Maboe Likotsi",
    "VOD 9251":   "Puleng Marabe",
    "VOD 7782":   "Moeketsi Chaka",
    "VOD 20818":  "Mosito Lehata",
    "VOD 6969":   "Maqaba Sekhohola",
    "VOD 20074":  "Hlapase Sekhohola",
    "VOD 20831":  "Jacobina Mahao",
    "VOD 20848":  "Thabiso Zwakala",
    "VOD 14906":  "Hlompho Mohale",
    "VOD 8468":   "Kefuoe Janki",
    "VOD 20235":  "Karabelo Tieli",
    "VOD 20131":  "Mosongoa Lempe",
    "VOD 20667":  "Matau Kholotsa",
    "VOD 14053":  "Liketso Thokoa",
    "VOD 14052":  "Neo Thokoa",
    "VOD 19538":  "Palesa Nyokong",
    "VOD 7272":   "Lejella Mokoaleli",
    "VOD 19091":  "Nthabiseng Lebona",
    "VOD 19098":  "Motlalefosa Lerotholi",
    "VOD 19328":  "Likotsi Ntaba",
    "VOD 19560":  "Relebohile Mokonyana",
    "VOD 19716":  "Malebellang Sethinyane",
    "VOD 19255":  "Nthabiseng Lintsa",
    "VOD 19652":  "Marapelang Raselepe",
    "VOD 19336":  "Matsepang Khanyapa",
    "VOD 19345":  "Fako Rathala",
    "VOD 38097":  "Mapaseka Tsiame",
    "VOD 19363":  "Lehlohonolo Litelu Tseo",
    "VOD 14049":  "Tumelo Pitsi",
    "VOD 21105":  "Polo Motobaki",
    "VOD 7859":   "Boitumelo Selialia",
    "VOD 19143":  "Maletsatsi Kori",
    "VOD 19169":  "Lekhanya Lekhanya",
    "VOD 19281":  "Malefane Mohloboli",
    "VOD 8866":   "Mahlomola Leshoela",
    "VOD 20293":  "Karabelo Koloti"
  }
};

export default Lists;
