import ToolsImport from './ToolsImport';

window.OldID = "XQmoiBDmJwS";

var Lists = {
  "stages": {
    "Client Information": {
      "name": "Client Information",
      "uid": null,
      "date": "#date+enrollment",
      "attributes": {
        "#attr+client+id+snold": {
          "nameXls":  "ClientCode",
          "nameDhis": "Unique ID (OldID)",
          "uid":      window.OldID,          // TO UPDATE LATER
          "active":   true,
          evaluate:   function (val) { return val; },
        },
        "#attr+client+id+cuic": {
          "nameXls":  "CUIC",
          "nameDhis": "Unique ID (CUIC)",
          "uid":      "zRA08XEYiSF",
          "active":   true,
          evaluate:   function (val) { return val; },
        },
        "#attr+client+id+fname": {
          "nameXls":  "ClientFirstname",
          "nameDhis": "First name",
          "uid":      "mW2l3T2zL0N",
          "active":   true,
          evaluate:   function (val) { return val; },
        },
        "#attr+cilent+id+lname": {
          "nameXls":  "ClientLastname",
          "nameDhis": "Last name",
          "uid":      "mUxDHgywnn2",
          "active":   true,
          evaluate:   function (val) { return val; },
        },
        "#attr+client+id+dob": {
          "nameXls":  "BirthDate",
          "nameDhis": "Date of Birth",
          "uid":      "wSp6Q7QDMsk",
          "active":   true,
          evaluate:   function (val) { return ToolsImport.excelDateToJSDate(val); },
        },
        "#attr+client+id+bo": {
          "nameXls":  "BirthOrder",
          "nameDhis": "Birth Order",
          "uid":      "vTPYC9BXPNn",
          "active":   true,
          evaluate:   function (val) { return val < 10 ? "0" + val : val; },
        },
        "#attr+client+id+bd": {
          "nameXls":  "BirthDistrict",
          "nameDhis": "District of birth",
          "uid":      "u57uh7lHwF8",
          "active":   true,
          evaluate:   function (val) { return Lists.orgUnits["#ou+adm1"][val].optionSet; },
        },
        "#attr+client+info+sex": {
          "nameXls":  "Sex",
          "nameDhis": "Sex",
          "uid":      "CCVO6BZMrnp",
          "active":   true,
          evaluate:   function (val) {
            var categories = {"1": "Male", "2":"Female"};
            return categories[val];
          },
        },
        "#attr+client+info+edu": {
          "nameXls": "Highest Education",
          "nameDhis": "Education level",
          "uid": "Bs4zxQQ3EyB",
          evaluate:   function (val) {
            var categories = {"1": "LS_EDU0", "2":"LS_EDU1", "3":"LS_EDU2", "4":"LS_EDU3"};
            return categories[val];
          },
        },
        "#attr+client+prevt": {
          "nameXls": "EverTested",
          "nameDhis": "Ever tested and received result",
          "uid": "PWy9kmp4Pmb",
          evaluate:   function (val) {
            var categories = {"1": "Yes", "2":"false"};
            return categories[val];
          },
        },
        "#attr+client+prevt+date": {
          "nameXls": "Date Of Most Recent Test",
          "nameDhis": "Date of last HIV test",
          "uid": "PyfoYtwNGrI",
          evaluate:   function (val) { return ToolsImport.excelDateToJSDate(val); },
        },
        "#attr+client+prevt+result": {
          "nameXls": "Result Of Most Recent Test",
          "nameDhis": "Result of last HIV test",
          "uid": "XTWSNIlxkEj",
          evaluate:   function (val) {
            var categories = {"1": "NEG", "2":"POS-noART", "3":"POS-ART", "4":"IND"};
            return categories[val];
          },
        },
        "#attr+client+info+kp+1": {
          "nameXls": "KP1",
          "nameDhis": "Key Population",
          "uid": "Y35TizULMzg",
          evaluate:   function (val) {
            var categories = {"1": "FSW", "2":"MSMSW", "3":"MSMNONSW", "4":"TGSW", "5":"TGNONSW"};
            return categories[val];
          },
        },
        "#attr+client+info+kp+2":	{
          "nameXls": "KP2 - PWID",
          "nameDhis": "KEY POP - PWID",
          "uid": "kdzfhXK71re",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#attr+client+info+kp+3": {
          "nameXls": "KP3 - Prisoner",
          "nameDhis": "KEY POP - Prisoner/ enclosed setting",
          "uid": "Fty7JMtC7mX",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#attr+client+info+pp+1": {
          "nameXls": "PP1 - OVC",
          "nameDhis": "PP OVC",
          "uid": "vD0qayOxs64",
          evaluate:   function (val) {
            var categories = {"1": "OVC1", "2": "OVC2"};
            return categories[val];
          },
        },
        "#attr+client+info+pp+2": {
          "nameXls": "PP2 - Ex Factory Worker",
          "nameDhis": "PP Factory worker or ex-factory worker",
          "uid": "tzZCy78mWEG",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#attr+client+info+pp+3": {
          "nameXls": "PP3 - Ex  Miner",
          "nameDhis": "PP Miner or ex-miner",
          "uid": "gYiUqfKwktq",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#attr+client+info+pp+4": {
          "nameXls": "PP4 - Mobile",
          "nameDhis": "PP Mobile pop",
          "uid": "kpMMzIM3t5I",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#attr+client+info+pp+5": {
          "nameXls": "PP5 - Military",
          "nameDhis": "PP Military",
          "uid": "fa7lRYdWJfl",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
      },
      "dataElements": null,
    },
    "Testing": {
      "name": "Testing",
      "uid": "lVglvBnE3TY",
      "date": "#date+test",
      "attribution": "#psiworker+id+test",
      "attributes": null,
      "dataElements": {
        "#de+test+info+type": {
          "nameXls": "Client Type",
          "nameDhis": "Client - type",
          "uid": "RvYugZqBKoN",
          evaluate:   function (val) {
            var categories = {"1": "Individual", "2":"Couple"};
            return categories[val];
          },
        },
        "#de+test+info+couple+cuic": {
          "nameXls": "If couple Partners Client Code",
          "nameDhis": "Client partner's CUIC",
          "uid": "UYyCL2xz8Wz",
          evaluate:   function (val) { return val; },
        },
        "#de+test+info+age": {
          "nameXls": "Age",
          "nameDhis": "Client - Age (yrs)",
          "uid": "e4XZKCNJjlc",
          evaluate:   function (val) { return val; },
        },
        "#de+test+info+channel": {
          "nameXls": "Delivery channel",
          "nameDhis": "Client - Delivery channel",
          "uid": "quOYwc0SOqD",
          evaluate:   function (val) {
            var categories = {"1": "LS_CHA1", "2":"LS_CHA2", "4":"LS_CHA4", "5":"LS_CHA5", "6":"LS_CHA6"};
            return categories[val];
          },
        },
        "#de+test+info+channel+other": {
          "nameXls": "Delivery channel - Other",
          "nameDhis": "Client - Delivery channel - Other",
          "uid": "Tjw4iDAjyy6",
          evaluate:   function (val) { return val; },
        },
        "#de+test+info+employ": {
          "nameXls": "Employment Status",
          "nameDhis": "Client - Employment status",
          "uid": "VEVaRAcZUcD",
          evaluate:   function (val) {
            var categories = {"1": "LS_EMP1", "4":"LS_EMP4", "5":"LS_EMP5"};
            return categories[val];
          },
        },
        "#de+test+info+motiv": {
          "nameXls": "Heard About HIV Testing",
          "nameDhis": "Client - What motivated HIV test",
          "uid": "vOrRzjpdQC6",
          evaluate:   function (val) {
            var categories = {"1": "INDEX", "2":"SELF", "3":"PSI", "4":"OHW", "5":"SELFTEST", "6":"PARTNER", "7":"NOTINDEX", "8":"RDTV", "9":"POSTER", "10":"OTHER"};
            return categories[val];
          },
        },
        "#de+test+info+motiv+other": {
          "nameXls": "Heard About HIV Testing - Other",
          "nameDhis": "Client - What motivated HIV test - other",
          "uid": "GCl3ORKj1jC",
          evaluate:   function (val) { return val; },
        },
        "#de+test+layer+1": {
          "nameXls": "Layer - Assist / Sentibale",
          "nameDhis": "Layer - Assist / Sentibale",
          "uid": "M0Mr4xEU0EW",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+layer+2": {
          "nameXls": "Layer - IPC",
          "nameDhis": "Layer - IPC",
          "uid": "LVObO0EMMhD",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+layer+3": {
          "nameXls": "Layer - M2M",
          "nameDhis": "Layer - M2M",
          "uid": "xoTc4jR9vrA",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+layer+4": {
          "nameXls": "Layer - CRS / Caritas",
          "nameDhis": "Layer - CRS / Caritas",
          "uid": "rsxVKBtNQnY",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+layer+5": {
          "nameXls": "Layer - Promo",
          "nameDhis": "Layer - Promo",
          "uid": "fh3oIGx7Olc",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+layer+6": {
          "nameXls": "Layer - WVI",
          "nameDhis": "Layer - WVI",
          "uid": "LuBoC8dgSlV",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+layer+7": {
          "nameXls": "Layer - Care for Lesotho",
          "nameDhis": "Layer - Care for Lesotho",
          "uid": "Qq571GOyMkU",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+layer+8": {
          "nameXls": "Layer - Other",
          "nameDhis": "Layer - Other",
          "uid": "NDQouehqKGf",
          evaluate:   function (val) { return val; },
        },
        "#de+test+ncd+h": {
          "nameXls": "NCD - Height",
          "nameDhis": "NCD - Height",
          "uid": "aIplfQPaJH7",
          evaluate:   function (val) { return val; },
        },
        "#de+test+ncd+w": {
          "nameXls": "NCD - Weight",
          "nameDhis": "NCD - Weight",
          "uid": "PazJ9tnjGhS",
          evaluate:   function (val) { return val; },
        },
        "#de+test+ncd+bmi": {
          "nameXls": "NCD - BMI",
          "nameDhis": "NCD - BMI",
          "uid": "r0Lh3dEecPF",
          evaluate:   function (val) { return val; },
        },
        "#de+test+ncd+sys": {
          "nameXls": "NCD - Systolic",
          "nameDhis": "NCD - BP systolic (mmHg)",
          "uid": "yI7kyMQJVKW",
          evaluate:   function (val) { return val; },
        },
        "#de+test+ncd+dia": {
          "nameXls": "NCD - Diastolic",
          "nameDhis": "NCD - BP diastolic (mmHg)",
          "uid": "SvAAL4qH5pX",
          evaluate:   function (val) { return val; },
        },
        "#de+test+ncd+bg": {
          "nameXls": "NCD - Blood Glucose",
          "nameDhis": "NCD - Blood glucose (mmol/l)",
          "uid": "xioxtS6erFa",
          evaluate:   function (val) { return val; },
        },
        "#de+test+ra+preg": {
          "nameXls": "RA - Pregnant or breastfeeding",
          "nameDhis": "RA - Pregnant or breastfeeding",
          "uid": "Ax5h5bwtBMK",
          evaluate:   function (val) {
            var categories = {"1": "Yes", "2":"No"};
            return categories[val];
          },
        },
        "#de+test+ra+circu": {
          "nameXls": "RA - STI circumcised",
          "nameDhis": "RA - STI circumcised",
          "uid": "Ml9lBSv0iCC",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+ra+gen": {
          "nameXls": "RA - Genital sores or discharge",
          "nameDhis": "RA - Genital sores or discharge",
          "uid": "za8zgXEjUHp",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+ra+part+status+known": {
          "nameXls": "RA - Does partner know HIV status",
          "nameDhis": "RA - Does partner know HIV status",
          "uid": "TSqDjQSS2Qi",
          evaluate:   function (val) {
            var categories = {"1": "Yes", "2":"No"};
            return categories[val];
          },
        },
        "#de+test+ra+part+status": {
          "nameXls": "RA - Partner HIV status",
          "nameDhis": "Partner HIV status",
          "uid": "C4Zu5mKJQ9y",
          evaluate:   function (val) {
            var categories = {"1":"HIVNEG", "2": "HIVPOS", "3":"NODISC"};
            return categories[val];
          },
        },
        "#de+test+ra+part+num": {
          "nameXls": "RA - Number of sexual partners",
          "nameDhis": "RA - Number of sexual partners",
          "uid": "drqngyyqyP3",
          evaluate:   function (val) { return val; },
        },
        "#de+test+result+1": {
          "nameXls": "Result 01",
          "nameDhis": "Test 1 - Result",
          "uid": "choHDFxMCaU",
          evaluate:   function (val) {
            var categories = {"1": "Negative", "2":"Positive"};
            return categories[val];
          },
        },
        "#de+test+result+2": {
          "nameXls": "Result 02",
          "nameDhis": "Test 2 - Result",
          "uid": "KDnhSz51HKS",
          evaluate:   function (val) {
            var categories = {"1": "Negative", "2":"Positive"};
            return categories[val];
          },
        },
        "#de+test+result+3p1": {
          "nameXls": "Result 03 P1",
          "nameDhis": "Test 3 Parallel 1 - Result",
          "uid": "rMh4ZGNzrh1",
          evaluate:   function (val) {
            var categories = {"1": "Negative", "2":"Positive"};
            return categories[val];
          },
        },
        "#de+test+result+3p2": {
          "nameXls": "Result 03 P2",
          "nameDhis": "Test 3 Parallel 2 - Result",
          "uid": "Bqff4skvt4d",
          evaluate:   function (val) {
            var categories = {"1": "Negative", "2":"Positive"};
            return categories[val];
          },
        },
        "#de+test+result+sd": {
          "nameXls": "Result SD",
          "nameDhis": "Test - SD bioline result",
          "uid": "M11JqgkJt2X",
          evaluate:   function (val) {
            var categories = {"1": "Negative", "2":"Positive", "3":"Indeterminate", "4":"SD bioline out of stock"};
            return categories[val];
          },
        },
        "#de+test+result+final": {
          "nameXls": "Final result",
          "nameDhis": "Test result final HIV status",
          "uid": "UuKat0HFjWS",
          evaluate:   function (val) {
            var categories = {"1": "Negative", "2":"Positive", "3":"Indeterminate"};
            return categories[val];
          },
        },
        "#de+test+result+recieved": {
          "nameXls": "Client Recieved Results",
          "nameDhis": "Test - Results given",
          "uid": "QLMo6Kh3eVP",
          evaluate:   function (val) {
            var categories = {"1": "Yes", "2":"No"};
            return categories[val];
          },
        },
        "#de+test+result+prevknow": {
          "nameXls": "Previous knowledge HIV+",
          "nameDhis": "Previous knowledge of HIV+ status",
          "uid": "esWS3Y9LDi6",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+tb+conduct": {
          "nameXls": "TB screening conducted",
          "nameDhis": "Referral - TB screening conducted",
          "uid": "mkVl2wjztaz",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+tb+suspect": {
          "nameXls": "TB suspected",
          "nameDhis": "Referral - TB suspected",
          "uid": "aK3LtjgJwUH",
          evaluate:   function (val) {
            var categories = {"1": "Yes", "2":"No"};
            return categories[val];
          },
        },
        "#de+test+refer+offer": {
          "nameXls": "Referral offered",
          "nameDhis": "Referral - Referral offered",
          "uid": "r8AftzZCjWP",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+refer+sti": {
          "nameXls": "STI diagnosis/treatment",
          "nameDhis": "Referral - STI diagnosis/treatment",
          "uid": "hv1oAJf18cE",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+refer+tb": {
          "nameXls": "TB diagnosis/treatment",
          "nameDhis": "Referral - TB diagnosis/treatment",
          "uid": "a9x8qqtTs0J",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+refer+fp": {
          "nameXls": "Family Planning",
          "nameDhis": "Referral - Family Planning",
          "uid": "BqyBHC6eEFr",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+refer+vmmc": {
          "nameXls": "VMMC",
          "nameDhis": "Referral - VMMC",
          "uid": "DbfyDJ04SjL",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+refer+prep": {
          "nameXls": "PReP (HIV-)",
          "nameDhis": "Referral - PReP (HIV-)",
          "uid": "sTmbmjnUhrA",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+refer+art": {
          "nameXls": "ART",
          "nameDhis": "Referral - ART",
          "uid": "tUIkmIFMEDS",
          evaluate:   function (val) {
            var categories = {"1": "Yes"};
            return categories[val];
          },
        },
        "#de+test+com+condom+male": {
          "nameXls": "Male Condoms",
          "nameDhis": "Commodity - Female condom distributed (units)",
          "uid": "nNJQ6POHKNc",
          evaluate:   function (val) { return val; },
        },
        "#de+test+com+condom+female": {
          "nameXls": "Female Condoms",
          "nameDhis": "Commodity - Male condom distributed (units)",
          "uid": "A5aT1hCrMw1",
          evaluate:   function (val) { return val; },
        },
        "#de+test+com+lub": {
          "nameXls": "Lubricant",
          "nameDhis": "Commodity - Lubricants distributed (units)",
          "uid": "ettc2MtVOcm",
          evaluate:   function (val) { return val; },
        },
      },
    },
    "ART Referral - Openning": {
      "name": "ART Referral - Openning",
      "uid": "OSpZnLBMVhr",
      "date": "#date+referop",
      "attribution": "#psiworker+id+referop",
      "attributes": null,
      "dataElements": {
        "#de+referop+facility": {
          "nameXls": "ART health facility (referred to)",
          "nameDhis": "ART health facility (referred to)",
          "uid": "E1KAxdya3y5",
          evaluate:   function (val) { return val; },
        },
        "ART linkage status": {
          //WISH?
        },
      },
    },
    "ART Referral - Closure": {
      "name": "ART Referral - Closure",
      "uid": "usEIFQODMxf",
      "date": "#date+refercl",
      "attribution": "#psiworker+id+refercl",
      "attributes": {
        "#attr+refercl+id": {
          "nameXls": "ART number",
          "nameDhis": "ART number",
          "uid": "t6JNCifEt8r",
          evaluate:   function (val) { return val; },
        },
        "#attr+refercl+facility": {
          "nameXls": "ART health facility",
          "nameDhis": "ART health facility",
          "uid": "LCLiPzJWVAb",
          evaluate:   function (val) { return val; },
        },
        "#attr+refercl+date": {
          "nameXls": "ART date of enrollment",
          "nameDhis": "ART date of enrollment",
          "uid": "LnXn5fK0b5b",
          evaluate:   function (val) { return ToolsImport.excelDateToJSDate(val); },
        },
      },
      "dataElements": {
        "#de+refercl+status": {
          "nameXls": "ART Referral - Linkage outcome",
          "nameDhis": "ART Referral - Linkage outcome",
          "uid": "nOK8JcDWT9X",
          evaluate:   function (val) {
            var categories = {"1": "SUCCESS", "2":"DROPPED"};
            return categories[val];
          },
        },
        "#de+refercl+drop": {
          "nameXls": "ART Referral - Case dropped reason",
          "nameDhis": "ART Referral - Case dropped reason",
          "uid": "ZRfojTCqVhc",
          evaluate:   function (val) { return val; },
        },
      },
    },
    "Contact Log": {
      "name": "Contact Log",
      "uid": "gmBozy0KAMC",
      "date": "#date+contact+log",
      "attribution": "#psiworker+id+contact+log",
      "attributes": {
        "#attr+contact+details+consent": {
          "nameXls": "Contact Consent",
          "nameDhis": "Contact Consent",
          "uid": "ZQiKIaeOKv4",
          evaluate:   function (val) {
            var categories = {"1": "Yes", "2":"No"};
            return categories[val];
          },
        },
        "#attr+contact+details+phone": {
          "nameXls": "Phone number",
          "nameDhis": "Phone number",
          "uid": "C1twCsH0rjI",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+details+restrict": {
          "nameXls": "Contact Restrictions",
          "nameDhis": "Contact Restrictions",
          "uid": "z78Y1qdewNQ",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+details+address+1": {
          "nameXls": "Address 1 - Street/N",
          "nameDhis": "Address 1 - Street/N",
          "uid": "gY1FrhX5UTn",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+details+address+2": {
          "nameXls": "Address 2 - Landmark",
          "nameDhis": "Address 2 - Landmark",
          "uid": "gn35714pj4p",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+details+address+3": {
          "nameXls": "Address 3 - District",
          "nameDhis": "Address 3 - District",
          "uid": "qynN2cqRe71",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+details+address+4": {
          "nameXls": "Address 4 - Council",
          "nameDhis": "Address 4 - Council",
          "uid": "NLNTtpbT3c5",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+details+address+5": {
          "nameXls": "Address 5 - Village",
          "nameDhis": "Address 5 - Village",
          "uid": "jQilj6Wjweq",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+details+chief": {
          "nameXls": "Village chief Name",
          "nameDhis": "Village chief Name",
          "uid": "Wea8fAtYVwx",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+nok+consent": {
          "nameXls": "NoK - Consent",
          "nameDhis": "NoK - Consent",
          "uid": "VRUFmF5tE7b",
          evaluate:   function (val) {
            var categories = {"1": "Yes", "2":"No"};
            return categories[val];
          },
        },
        "#attr+contact+nok+name": {
          "nameXls": "NoK - Name",
          "nameDhis": "NoK - Name",
          "uid": "Kn6E1pGJzFR",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+nok+rel": {
          "nameXls": "NoK - Relationship",
          "nameDhis": "NoK - Relationship",
          "uid": "zZRKJdqskbC",
          evaluate:   function (val) { return val; },
        },
        "#attr+contact+nok+phone": {
          "nameXls": "NoK - Phone number",
          "nameDhis": "NoK - Phone number",
          "uid": "HtQU1Bfhc9m",
          evaluate:   function (val) { return val; },
        },
      },
      "dataElements": {
        "#de+contact+log+type": {
          "nameXls": "Type of contact",
          "nameDhis": "Type of contact",
          "uid": "wzM3bUiPowS",
          evaluate:   function (val) {
            var categories = {"1": "Yes", "2":"No"};
            return categories[val];
          },
        },
        "#de+contact+log+out": {
          "nameXls": "Outcome",
          "nameDhis": "Outcome",
          "uid": "hjpNXAyZ0cm",
          evaluate:   function (val) {
            var categories = {"1": "PHONE", "2":"SMS", "3": "PERSON"};
            return categories[val];
          },
        },
        "#de+contact+log+next": {
          "nameXls": "Next action",
          "nameDhis": "Next action",
          "uid": "mcgzEFh5IV8",
          evaluate:   function (val) {
            var categories = {"1": "REMIND", "2":"UNABLE", "3":"REF_PROMISED", "4":"REF_ENROLLED", "5":"IDX_PROMISED", "6":"IDX_ARRANGED", "7":"AGAIN", "8":"NEVER"};
            return categories[val];
          },
        },
        "Due date": {
          //WISH?
        },
        "#de+contact+log+com": {
          "nameXls": "Comments",
          "nameDhis": "Comments",
          "uid": "HaauwE6JkEs",
          evaluate:   function (val) { return val; },
        },
      },
    },
  },
  "orgUnits": {
    "url": "http://localhost:8989/dhis/api/organisationUnits/vJNI6blhosr?fields=id,name,children[id,name,children[id,name]]&paging=false",
    "Country": {
      "nameDhis": "Lesotho",
      "uid": "QPRZuTHu18l",
    },
    "#ou+adm1": {
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
    "#ou+adm2": {
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
  "#psiworker+id": {
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
