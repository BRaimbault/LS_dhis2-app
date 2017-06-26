import ToolsImport from './ToolsImport';

window.OldID = "Nz4w5ctIBLO";//Local BR "XQmoiBDmJwS";

var Lists = {
  "stages": {
    "Client Information": {
      "name": "Client Information",
      "uid": null,
      "attribution": null,
      "date": "#date+enrollment",
      "attributes": {
        "#attr+client+id+snold": {
          "nameXls":  "ClientCode",
          "nameDhis": "Unique ID (OldID)",
          "uid":      window.OldID,          // TO UPDATE LATER
          evaluate:   function (val) { return val; },
        },
        "#attr+client+id+cuic": {
          "nameXls":  "CUIC",
          "nameDhis": "Unique ID (CUIC)",
          "uid":      "zRA08XEYiSF",
          evaluate:   function (val) { return val; },
        },
        "#attr+client+id+fname": {
          "nameXls":  "ClientFirstname",
          "nameDhis": "First name",
          "uid":      "mW2l3T2zL0N",
          evaluate:   function (val) { return val; },
        },
        "#attr+cilent+id+lname": {
          "nameXls":  "ClientLastname",
          "nameDhis": "Last name",
          "uid":      "mUxDHgywnn2",
          evaluate:   function (val) { return val; },
        },
        "#attr+client+id+dob": {
          "nameXls":  "BirthDate",
          "nameDhis": "Date of Birth",
          "uid":      "wSp6Q7QDMsk",
          evaluate:   function (val) { return ToolsImport.excelDateToJSDate(val); },
        },
        "#attr+client+id+bo": {
          "nameXls":  "BirthOrder",
          "nameDhis": "Birth Order",
          "uid":      "vTPYC9BXPNn",
          evaluate:   function (val) { return val < 10 ? "0" + val : val; },
        },
        "#attr+client+id+bd": {
          "nameXls":  "BirthDistrict",
          "nameDhis": "District of birth",
          "uid":      "u57uh7lHwF8",
          evaluate:   function (val) { return Lists.orgUnits["#ou+adm1"][val].optionSet; },
        },
        "#attr+client+info+sex": {
          "nameXls":  "Sex",
          "nameDhis": "Sex",
          "uid":      "CCVO6BZMrnp",
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
            var categories = {"1": "true", "2":"false"};
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
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#attr+client+info+kp+3": {
          "nameXls": "KP3 - Prisoner",
          "nameDhis": "KEY POP - Prisoner/ enclosed setting",
          "uid": "Fty7JMtC7mX",
          evaluate:   function (val) {
            var categories = {"1": "true"};
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
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#attr+client+info+pp+3": {
          "nameXls": "PP3 - Ex  Miner",
          "nameDhis": "PP Miner or ex-miner",
          "uid": "gYiUqfKwktq",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#attr+client+info+pp+4": {
          "nameXls": "PP4 - Mobile",
          "nameDhis": "PP Mobile pop",
          "uid": "kpMMzIM3t5I",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#attr+client+info+pp+5": {
          "nameXls": "PP5 - Military",
          "nameDhis": "PP Military",
          "uid": "fa7lRYdWJfl",
          evaluate:   function (val) {
            var categories = {"1": "true"};
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
            var categories = {"1": "LS_CHA1", "2":"LS_CHA2", "3":"LS_CHA3", "4":"LS_CHA4", "5":"LS_CHA5", "6":"LS_CHA6", "7":"LS_CHA7"};
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
        "#de+test+layer": {
          "nameXls": "Layer",
          "nameDhis": "Layer",
          "uid": "fGSXGuPIEOy",
          evaluate:   function (val) {
            var categories = {"1": "LAY01", "2": "LAY02", "3": "LAY03", "4": "LAY04", "5": "LAY05", "6": "LAY06", "7": "LAY07", "8": "LAY08"};
            return categories[val];
          },
        },
        "#de+test+layer+other": {
          "nameXls": "Layer - Other",
          "nameDhis": "Layer - Other",
          "uid": "omugvBULuf0",
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
            var categories = {"1": "true", "2":"false"};
            return categories[val];
          },
        },
        "#de+test+ra+circu": {
          "nameXls": "RA - STI circumcised",
          "nameDhis": "RA - STI circumcised",
          "uid": "Ml9lBSv0iCC",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#de+test+ra+gen": {
          "nameXls": "RA - Genital sores or discharge",
          "nameDhis": "RA - Genital sores or discharge",
          "uid": "za8zgXEjUHp",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#de+test+ra+part+status+known": {
          "nameXls": "RA - Does partner know HIV status",
          "nameDhis": "RA - Does partner know HIV status",
          "uid": "TSqDjQSS2Qi",
          evaluate:   function (val) {
            var categories = {"1": "true", "2":"false"};
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
            var categories = {"1": "true", "2":"false"};
            return categories[val];
          },
        },
        "#de+test+result+prevknow": {
          "nameXls": "Previous knowledge HIV+",
          "nameDhis": "Previous knowledge of HIV+ status",
          "uid": "esWS3Y9LDi6",
          evaluate:   function (val) {
            var categories = {"1": "true", "2":"false"};
            return categories[val];
          },
        },
        "#de+test+extra+deter": {
          "nameXls": "Extra - Determine strips",
          "nameDhis": "Extra - Determine strips",
          "uid": "UOmjmckRjzR",
          evaluate:   function (val) { return val; },
        },
        "#de+test+extra+unigo": {
          "nameXls": "Extra - Unigold strips",
          "nameDhis": "Extra - Unigold strips",
          "uid": "tYNs16xzTqS",
          evaluate:   function (val) { return val; },
        },
        "#de+test+extra+tubes": {
          "nameXls": "Extra - Capillary tubes",
          "nameDhis": "Extra - Capillary tubes",
          "uid": "kY8Yhg3va7P",
          evaluate:   function (val) { return val; },
        },
        "#de+test+extra+alcoh": {
          "nameXls": "Extra - Alcohol swabs",
          "nameDhis": "Extra - Alcohol swabs",
          "uid": "GmbfRCbWdRA",
          evaluate:   function (val) { return val; },
        },
        "#de+test+extra+lance": {
          "nameXls": "Extra - Blood lancets",
          "nameDhis": "Extra - Blood lancets",
          "uid": "dqynj0LR6ba",
          evaluate:   function (val) { return val; },
        },
        "#de+test+extra+glove": {
          "nameXls": "Extra - Exam gloves",
          "nameDhis": "Extra - Exam gloves",
          "uid": "qq2C8BLOe4F",
          evaluate:   function (val) { return val; },
        },
        "#de+test+tb+conduct": {
          "nameXls": "TB screening conducted",
          "nameDhis": "Referral - TB screening conducted",
          "uid": "mkVl2wjztaz",
          evaluate:   function (val) {
            var categories = {"1": "true", "2":"false"};
            return categories[val];
          },
        },
        "#de+test+tb+suspect": {
          "nameXls": "TB suspected",
          "nameDhis": "Referral - TB suspected",
          "uid": "aK3LtjgJwUH",
          evaluate:   function (val) {
            var categories = {"1": "true", "2":"false"};
            return categories[val];
          },
        },
        "#de+test+refer+offer": {
          "nameXls": "Referral offered",
          "nameDhis": "Referral - Referral offered",
          "uid": "r8AftzZCjWP",
          evaluate:   function (val) {
            var categories = {"1": "true", "2":"false"};
            return categories[val];
          },
        },
        "#de+test+refer+sti": {
          "nameXls": "STI diagnosis/treatment",
          "nameDhis": "Referral - STI diagnosis/treatment",
          "uid": "hv1oAJf18cE",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#de+test+refer+tb": {
          "nameXls": "TB diagnosis/treatment",
          "nameDhis": "Referral - TB diagnosis/treatment",
          "uid": "a9x8qqtTs0J",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#de+test+refer+fp": {
          "nameXls": "Family Planning",
          "nameDhis": "Referral - Family Planning",
          "uid": "BqyBHC6eEFr",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#de+test+refer+vmmc": {
          "nameXls": "VMMC",
          "nameDhis": "Referral - VMMC",
          "uid": "DbfyDJ04SjL",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#de+test+refer+prep": {
          "nameXls": "PReP (HIV-)",
          "nameDhis": "Referral - PReP (HIV-)",
          "uid": "sTmbmjnUhrA",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#de+test+refer+dna": {
          "nameXls": "DNA PCR",
          "nameDhis": "Referral - DNA PCR",
          "uid": "ZKWK5UIO9wp",
          evaluate:   function (val) {
            var categories = {"1": "true"};
            return categories[val];
          },
        },
        "#de+test+refer+art": {
          "nameXls": "ART",
          "nameDhis": "Referral - ART",
          "uid": "tUIkmIFMEDS",
          evaluate:   function (val) {
            var categories = {"1": "true"};
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
    "ART Referral - Opening": {
      "name": "ART Referral - Opening",
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
            var categories = {"1": "true", "2":"false"};
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
            var categories = {"1": "true", "2":"false"};
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
            var categories = {"1": "PHONE", "2":"SMS", "3":"PERSON"};
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
    "url": "organisationUnits/vJNI6blhosr?fields=id,name,children[id,name,children[id,name]]&paging=false",
    "Country": {
      "nameDhis": "Lesotho",
      "uid": "QPRZuTHu18l",
    },
    "#ou+adm1": {
      "LS03": {
        "nameDhis": "Leribe (03)",
        "uid": "rp9THcpEmRk",
        "nameXls": "LS03",
        "optionSet": "03",
        "parent": "LS"
      },
      "LS01": {
        "nameDhis": "Maseru (01)",
        "uid": "QPRZuTHu18l",
        "nameXls": "LS01",
        "optionSet": "01",
        "parent": "LS"
      },
      "LS09": {
        "nameDhis": "Mokhotlong (09)",
        "uid": "vNhNoq47IHU",
        "nameXls": "LS09",
        "optionSet": "09",
        "parent": "LS"
      },
      "LS02": {
        "nameDhis": "Butha Buthe (02)",
        "uid": "HuxtEzVg7Fh",
        "nameXls": "LS02",
        "optionSet": "02",
        "parent": "LS"
      },
      "LS05": {
        "nameDhis": "Mafeteng (05)",
        "uid": "ztofJR0XBPQ",
        "nameXls": "LS05",
        "optionSet": "05",
        "parent": "LS"
      },
      "LS07": {
        "nameDhis": "Quthing (07)",
        "uid": "bUqBiVA5CNu",
        "nameXls": "LS07",
        "optionSet": "07",
        "parent": "LS"
      },
      "LS06": {
        "nameDhis": "Mohale's Hoek (06)",
        "uid": "SKAwa0gTWOn",
        "nameXls": "LS06",
        "optionSet": "06",
        "parent": "LS"
      },
      "LS04": {
        "nameDhis": "Berea (04)",
        "uid": "ywXuaGCp1JN",
        "nameXls": "LS04",
        "optionSet": "04",
        "parent": "LS"
      },
      "LS08": {
        "nameDhis": "Qacha's Nek (08)",
        "uid": "JpHAT8IQqWc",
        "nameXls": "LS08",
        "optionSet": "08",
        "parent": "LS"
      },
      "LS10": {
        "nameDhis": "Thaba Tseka (10)",
        "uid": "BfWFyhN4Hhr",
        "nameXls": "LS10",
        "optionSet": "10",
        "parent": "LS"
      },
    },
    "#ou+adm2": {
       "LS031010": {
         "parent": "LS03",
         "nameDhis": "Menkhoaneng C05 (031010)",
         "uid": "ExnDUccM0wh",
         "nameXls": "LS031010"
       },
       "LS031515": {
         "parent": "LS03",
         "nameDhis": "Maputsoe urban council (031515)",
         "uid": "SSnj1hiozjl",
         "nameXls": "LS031515"
       },
       "LS031818": {
         "parent": "LS03",
         "nameDhis": "Tsoili-Tsoili C11 (031818)",
         "uid": "as3ohcRMzPf",
         "nameXls": "LS031818"
       },
       "LS031111": {
         "parent": "LS03",
         "nameDhis": "Maisa-Phoka C06 (031111)",
         "uid": "UZJXKmhnOK8",
         "nameXls": "LS031111"
       },
       "LS031414": {
         "parent": "LS03",
         "nameDhis": "Litjotjela C08 (031414)",
         "uid": "xInpsLkifcS",
         "nameXls": "LS031414"
       },
       "LS030704": {
         "parent": "LS03",
         "nameDhis": "Bolahla C02 (030704)",
         "uid": "K9Uf9iDW0YO",
         "nameXls": "LS030704"
       },
       "LS031717": {
         "parent": "LS03",
         "nameDhis": "Manka C10 (031717)",
         "uid": "GqtHUHVRXch",
         "nameXls": "LS031717"
       },
       "LS030908": {
         "parent": "LS03",
         "nameDhis": "Mamafubelu C04 (030908)",
         "uid": "vjN3wXIwogG",
         "nameXls": "LS030908"
       },
       "LS030806": {
         "parent": "LS03",
         "nameDhis": "Ramapepe C03 (030806)",
         "uid": "rasggRQQLbI",
         "nameXls": "LS030806"
       },
       "LS031212": {
         "parent": "LS03",
         "nameDhis": "Sephokong C07 (031212)",
         "uid": "iRjsiLfsX5E",
         "nameXls": "LS031212"
       },
       "LS031616": {
         "parent": "LS03",
         "nameDhis": "Hleoheng C09 (031616)",
         "uid": "AlY7kfwaOkT",
         "nameXls": "LS031616"
       },
       "LS031313": {
         "parent": "LS03",
         "nameDhis": "Hlotse urban council (031313)",
         "uid": "KQxjlV6Bt3l",
         "nameXls": "LS031313"
       },
       "LS030601": {
         "parent": "LS03",
         "nameDhis": "Matsoku C01 (030601)",
         "uid": "wtWiqkTijBP",
         "nameXls": "LS030601"
       },
       "LS013701": {
         "parent": "LS01",
         "nameDhis": "Qiloane A01 (013701)",
         "uid": "OTmyIqbHkqI",
         "nameXls": "LS013701"
       },
       "LS014512": {
         "parent": "LS01",
         "nameDhis": "Kubake A09 (014512)",
         "uid": "FsdhkF2xcRT",
         "nameXls": "LS014512"
       },
       "LS013201": {
         "parent": "LS01",
         "nameDhis": "Maseru Central - MCC (013201)",
         "uid": "mxR0T9D3r6w",
         "nameXls": "LS013201"
       },
       "LS014511": {
         "parent": "LS01",
         "nameDhis": "Makhoarane A08 (014511)",
         "uid": "epdvPcnet5Q",
         "nameXls": "LS014511"
       },
       "LS013802": {
         "parent": "LS01",
         "nameDhis": "Ratau A02 (013802)",
         "uid": "ZtdqvKN9NAY",
         "nameXls": "LS013802"
       },
       "LS014309": {
         "parent": "LS01",
         "nameDhis": "Mazenod A06 (014309)",
         "uid": "KZgkbAmRWIu",
         "nameXls": "LS014309"
       },
       "LS014006": {
         "parent": "LS01",
         "nameDhis": "Manonyane A04 (014006)",
         "uid": "iLT1py94y6Z",
         "nameXls": "LS014006"
       },
       "LS014614": {
         "parent": "LS01",
         "nameDhis": "Semonkong urban council (014614)",
         "uid": "nqzbAKlFbCH",
         "nameXls": "LS014614"
       },
       "LS014410": {
         "parent": "LS01",
         "nameDhis": "Lilala A07 (014410)",
         "uid": "uo8bJ5dyrMq",
         "nameXls": "LS014410"
       },
       "LS014208": {
         "parent": "LS01",
         "nameDhis": "Mohlakeng A05 (014208)",
         "uid": "WdLxSgOKh7z",
         "nameXls": "LS014208"
       },
       "LS014613": {
         "parent": "LS01",
         "nameDhis": "Makhoalipana A10 (014613)",
         "uid": "QFIGR956G2q",
         "nameXls": "LS014613"
       },
       "LS013904": {
         "parent": "LS01",
         "nameDhis": "Likolobeng A03 (013904)",
         "uid": "anjmGLCTTNB",
         "nameXls": "LS013904"
       },
       "LS097908": {
         "parent": "LS09",
         "nameDhis": "Sanqebethu J03 (097908)",
         "uid": "oMlRPZTXaJh",
         "nameXls": "LS097908"
       },
       "LS097805": {
         "parent": "LS09",
         "nameDhis": "Mphokojoana J02 (097805)",
         "uid": "RqqGW8n8srE",
         "nameXls": "LS097805"
       },
       "LS097909": {
         "parent": "LS09",
         "nameDhis": "Mokhotlong urban council (097909)",
         "uid": "MRaap9GkAhX",
         "nameXls": "LS097909"
       },
       "LS097701": {
         "parent": "LS09",
         "nameDhis": "Seate J01 (097701)",
         "uid": "PFNXYruS5tT",
         "nameXls": "LS097701"
       },
       "LS098012": {
         "parent": "LS09",
         "nameDhis": "Menoaneng J04 (098012)",
         "uid": "cHAMLcqSNjf",
         "nameXls": "LS098012"
       },
       "LS020409": {
         "parent": "LS02",
         "nameDhis": "Ts'ale-Le-Moleka B04 (020409)",
         "uid": "hEaKfRZ3Fzf",
         "nameXls": "LS020409"
       },
       "LS020101": {
         "parent": "LS02",
         "nameDhis": "Ngoajane B01 (020101)",
         "uid": "DPpKjXuyVhj",
         "nameXls": "LS020101"
       },
       "LS020510": {
         "parent": "LS02",
         "nameDhis": "Butha Buthe Urban council (020510)",
         "uid": "ZWRZWcXKctp",
         "nameXls": "LS020510"
       },
       "LS020204": {
         "parent": "LS02",
         "nameDhis": "Likila B02 (020204)",
         "uid": "kTNtaqoPVyZ",
         "nameXls": "LS020204"
       },
       "LS020305": {
         "parent": "LS02",
         "nameDhis": "Nqoe B03 (020305)",
         "uid": "XuQvaSICrxB",
         "nameXls": "LS020305"
       },
       "LS054701": {
         "parent": "LS05",
         "nameDhis": "Metsi-Maholo E01 (054701)",
         "uid": "ou7FDO5DfeG",
         "nameXls": "LS054701"
       },
       "LS054903": {
         "parent": "LS05",
         "nameDhis": "Ramoetsana E03 (054903)",
         "uid": "fiUNhfMW1MX",
         "nameXls": "LS054903"
       },
       "LS054904": {
         "parent": "LS05",
         "nameDhis": "Lehlakaneng E04 (054904)",
         "uid": "pXabJ9mtgur",
         "nameXls": "LS054904"
       },
       "LS054802": {
         "parent": "LS05",
         "nameDhis": "Mamants'o E02 (054802)",
         "uid": "jp3Br5JwnEh",
         "nameXls": "LS054802"
       },
       "LS055208": {
         "parent": "LS05",
         "nameDhis": "Mafeteng urban council (055208)",
         "uid": "W66mv6ZqWks",
         "nameXls": "LS055208"
       },
       "LS054907": {
         "parent": "LS05",
         "nameDhis": "Qibing E07 (054907)",
         "uid": "OHoBVqhPFdj",
         "nameXls": "LS054907"
       },
       "LS054905": {
         "parent": "LS05",
         "nameDhis": "Makoabating E05 (054905)",
         "uid": "ZzdHfPqyu1b",
         "nameXls": "LS054905"
       },
       "LS054906": {
         "parent": "LS05",
         "nameDhis": "Ts'ana-Talana E06 (054906)",
         "uid": "aulhngcwiHf",
         "nameXls": "LS054906"
       },
       "LS076503": {
         "parent": "LS07",
         "nameDhis": "Qomoqomong G02 (076503)",
         "uid": "kXFqvdcPKHC",
         "nameXls": "LS076503"
       },
       "LS076707": {
         "parent": "LS07",
         "nameDhis": "Telle G04 (076707)",
         "uid": "TIT649RRgzf",
         "nameXls": "LS076707"
       },
       "LS076605": {
         "parent": "LS07",
         "nameDhis": "Tosing G03 (076605)",
         "uid": "z0EVhO9vtul",
         "nameXls": "LS076605"
       },
       "LS076504": {
         "parent": "LS07",
         "nameDhis": "Quthing urban council (076504)",
         "uid": "SJKcstAuOix",
         "nameXls": "LS076504"
       },
       "LS076809": {
         "parent": "LS07",
         "nameDhis": "Mphaki G05 (076809)",
         "uid": "tGn8ffM3Gld",
         "nameXls": "LS076809"
       },
       "LS076401": {
         "parent": "LS07",
         "nameDhis": "Mtjanyane G01 (076401)",
         "uid": "f1fiJwG8EqU",
         "nameXls": "LS076401"
       },
       "LS065904": {
         "parent": "LS06",
         "nameDhis": "Khoelenya F03 (065904)",
         "uid": "a2BhNVaRPuX",
         "nameXls": "LS065904"
       },
       "LS066005": {
         "parent": "LS06",
         "nameDhis": "Lithipeng F04 (066005)",
         "uid": "hyMqltsoJ4z",
         "nameXls": "LS066005"
       },
       "LS065601": {
         "parent": "LS06",
         "nameDhis": "Siloe F01 (065601)",
         "uid": "yApxsln0dIl",
         "nameXls": "LS065601"
       },
       "LS065803": {
         "parent": "LS06",
         "nameDhis": "Mohale's Hoek urban council (065803)",
         "uid": "QMGPYWWhYJs",
         "nameXls": "LS065803"
       },
       "LS065702": {
         "parent": "LS06",
         "nameDhis": "Mashaleng F02 (065702)",
         "uid": "xK43YaJs7AB",
         "nameXls": "LS065702"
       },
       "LS066209": {
         "parent": "LS06",
         "nameDhis": "Qhoasing F06 (066209)",
         "uid": "d7Gz1pXL6BC",
         "nameXls": "LS066209"
       },
       "LS066108": {
         "parent": "LS06",
         "nameDhis": "Thaba-Mokhele F05 (066108)",
         "uid": "y6zJN7TTaak",
         "nameXls": "LS066108"
       },
       "LS066312": {
         "parent": "LS06",
         "nameDhis": "Senqunyane F07 (066312)",
         "uid": "iwx4oiQ5p6w",
         "nameXls": "LS066312"
       },
       "LS042709": {
         "parent": "LS04",
         "nameDhis": "Kanana D08 (042709)",
         "uid": "KauEn2jKOk6",
         "nameXls": "LS042709"
       },
       "LS041901": {
         "parent": "LS04",
         "nameDhis": "Makeoana D01 (041901)",
         "uid": "Zn7kf51v9ov",
         "nameXls": "LS041901"
       },
       "LS042507": {
         "parent": "LS04",
         "nameDhis": "Motanasela D06 (042507)",
         "uid": "HsMdQCwfl1R",
         "nameXls": "LS042507"
       },
       "LS042305": {
         "parent": "LS04",
         "nameDhis": "Phuthiatsana D05 (042305)",
         "uid": "LYKzrLTul9U",
         "nameXls": "LS042305"
       },
       "LS042103": {
         "parent": "LS04",
         "nameDhis": "Kueneng D03 (042103)",
         "uid": "cqaNJ87HX92",
         "nameXls": "LS042103"
       },
       "LS042204": {
         "parent": "LS04",
         "nameDhis": "Tebe-Tebe D04 (042204)",
         "uid": "t16Jtf4LqCu",
         "nameXls": "LS042204"
       },
       "LS042608": {
         "parent": "LS04",
         "nameDhis": "Senekane D07 (042608)",
         "uid": "r6EH81I5Ayd",
         "nameXls": "LS042608"
       },
       "LS042406": {
         "parent": "LS04",
         "nameDhis": "Berea Urban council (042406)",
         "uid": "O161S3uTLV3",
         "nameXls": "LS042406"
       },
       "LS042002": {
         "parent": "LS04",
         "nameDhis": "Mapoteng D02 (042002)",
         "uid": "M8fKOjgMNnh",
         "nameXls": "LS042002"
       },
       "LS086903": {
         "parent": "LS08",
         "nameDhis": "Qacha's Nek urban council (086903)",
         "uid": "NmFLNsQYI46",
         "nameXls": "LS086903"
       },
       "LS087108": {
         "parent": "LS08",
         "nameDhis": "Tsoelikana H03 (087108)",
         "uid": "yb1krTjdJjC",
         "nameXls": "LS087108"
       },
       "LS087004": {
         "parent": "LS08",
         "nameDhis": "Nts'upe H02 (087004)",
         "uid": "kQtqtHNfeJS",
         "nameXls": "LS087004"
       },
       "LS086902": {
         "parent": "LS08",
         "nameDhis": "Qanya H01 (086902)",
         "uid": "gn2F0tvkNVS",
         "nameXls": "LS086902"
       },
       "LS107510": {
         "parent": "LS10",
         "nameDhis": "Bokong K04 (107510)",
         "uid": "ZIzox2kOt1t",
         "nameXls": "LS107510"
       },
       "LS107508": {
         "parent": "LS10",
         "nameDhis": "Litsoetsoe K03 (107508)",
         "uid": "t6tdC2ddxzo",
         "nameXls": "LS107508"
       },
       "LS107201": {
         "parent": "LS10",
         "nameDhis": "Tenesolo K01 (107201)",
         "uid": "hhVRk1NL8KH",
         "nameXls": "LS107201"
       },
       "LS107305": {
         "parent": "LS10",
         "nameDhis": "Khutlo-se-Metsi K02 (107305)",
         "uid": "kAKsCa7AGqk",
         "nameXls": "LS107305"
       },
       "LS107306": {
         "parent": "LS10",
         "nameDhis": "Thaba-Tseka urban council (107306)",
         "uid": "GuURF81NSL6",
         "nameXls": "LS107306"
       },
       "LS107611": {
         "parent": "LS10",
         "nameDhis": "Linakeng K05 (107611)",
         "uid": "QTanm9ZJfqX",
         "nameXls": "LS107611"
       }
    }
  },
  "#psiworker+id": {
    "url": "categoryOptionGroups?fields=name,categoryOptions[name,code,id]",
    "TES701": {
       "name": "LS - TES701 - Counsellor1 Team1",
       "uid": "ROfMKufLAPd"
     },
     "TES702": {
       "name": "LS - TES702 - Counsellor2 Team1",
       "uid": "D9S9oEGDpGX"
     },
     "TES703": {
       "name": "LS - TES703 - Counsellor3 Team2",
       "uid": "l3en25Gvjsr"
     },
     "TES704": {
       "name": "LS - TES704 - Counsellor4 Team2",
       "uid": "u0y3yLybcKN"
     },
     "TES706": {
       "name": "LS - TES706 - Counsellor6 Team3",
       "uid": "eqgmE4s0Twy"
     },
     "TES705": {
       "name": "LS - TES705 - Counsellor5 Team3",
       "uid": "dTIKuHvkh8O"
     },
     "TES709": {
       "name": "LS - TES709 - RefCoord2 Team4",
       "uid": "AEEGk90PTGF"
     },
     "TES708": {
       "name": "LS - TES708 - RefCoord1 Team4",
       "uid": "zXzDPZP4tUO"
     },
  }
};

export default Lists;
