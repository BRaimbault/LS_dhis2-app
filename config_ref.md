**DATA SERVER CONFIGURATION:**

| element | uid | link |
|---------|-----|------|
| trackedEntityAttributes and options | program: KDgzpKX3h2S |  [here](https://data.psi-mis.org/api/programs/KDgzpKX3h2S.json?fields=programTrackedEntityAttributes[trackedEntityAttribute[name,id,valueType,optionSet[options[code,name]]]]) |
| dataElements and options by stage | program: KDgzpKX3h2S |  [here](https://data.psi-mis.org/api/programs/KDgzpKX3h2S.json?fields=programStages[id,name,programStageDataElements[dataElement[name,id,valueType,optionSet[options[code,name]]]]]) |
| PSI workers | category: qVl8p3w3fI5 | [here](https://data.psi-mis.org/api/25/categories/qVl8p3w3fI5.json?fields=categoryOptions[name,id,code]) |
| adm1 (Districts) | optionSet: LofSGLWMJnX | [here](https://data.psi-mis.org/api/25/optionSets/LofSGLWMJnX.json?fields=options[id,name,code]) |
| adm2 (Councils) | optionSet: lBe8SEycwQV | [here](https://data.psi-mis.org/api/25/optionSets/lBe8SEycwQV.json?fields=options[id,name,code]) |
| adm3 (Health Facilities) | optionSet: KsjTWR0iBKL | [here](https://data.psi-mis.org/api/25/optionSets/KsjTWR0iBKL.json?fields=options[id,name,code]) |

**OVERVIEW CONFIGURATION JSON:**

Date: 13/07/2017

````
{
  "exports": {
      "Testing": {                                         // Configuration exports from of 1st stage
          "url_lastMonth":  *DHIS URL*,                    // 1st button
          "url_lastWeek":   *DHIS URL*,                    // 2nd button
          "uid_table":      *DHIS UID*                     // 3rd button
      },
      "ART Referral - Opening": {                          // Configuration exports from of 2nd stage
          ...
      },
      ...                                                  // Configuration exports from of more stages
  },
  "duplicates": {                                          // To identify duplicate clients
      *ANY NAME*: {                                        // 1st data point
          "toCheck":  *BOOLEAN*,                           // Confirm that this data point is checked
          "header":   *XLS HEADER*,
          "uid":      *DHIS UID*
      },
      ...                                                  // More data points
    },
    "ressources": {                                        // General configuration
        "importMock":       *DHIS UID*,                    // Used for development
        "importSheet":      *XLS SHEET NAME*,
        "importHXL":        *BOOLEAN*,
        "uidTrackedEntity": *DHIS UID*,
        "uidProgram":       *DHIS UID*,
        "CUIC": {
            "header":         *XLS HEADER*,
            "uid":            *DHIS UID*
        },
        "CUIC_old":         null,                          // Not available
        "stageNames": ["Testing","ART Referral - Opening",...]
    },
    "dataPoints": {                                        // Data points configuration
        "enrollement": {                                   // Configuration of enrollment "pre-stage"
            "uid":            null,
            "attribution":    null,
            "date":           *XLS HEADER*,
            "orgUnit":        *XLS HEADER*,                // In adm2 by default
            "attributes": {                                // Configuration of trackedEntityAttributes
              *XLS HEADER*: {                              // 1st trackedEntityAttribute
                "nameDhis": *DHIS NAME*,                   // For information purpose only
                "uid":      *DHIS UID*,
                "valueType": *KEY WORD*,                   // See list of available types below
                "optionSet": {                             // Mandatory if "valueType" is "OPTIONSET"
                  *XLS OPTION*: {                          // 1st option
                    "codeDhis": *DHIS OPTION CODE*,
                    "nameDhis": *DHIS OPTION NAME*         // For information purpose only
                  },
                  ...                                      // More options
                }
              },
              ...                                          // More trackedEntityAttribute
            }
        },
        "Testing": {                                       // Configuration of 1st "real" stage
            "uid":          *DHIS UID*,
            "attribution":  *XLS HEADER*,                  // PSI Worker categoryOption
            "date":         *XLS HEADER*,
            "orgUnit":      *XLS HEADER*,                  // In adm2 by default
            "dataElements": {                              // Configuration of dataElements
              *XLS HEADER*: {                              // 1st dataElement
                "nameDhis": *DHIS NAME*,
                "uid":      *DHIS UID*,
                "valueType":*KEY WORD*,
                "optionSet": {                             // Mandatory if "valueType" is "OPTIONSET"
                  *XLS OPTION*: {
                    "codeDhis": *DHIS OPTION CODE*,
                    "nameDhis": *DHIS OPTION NAME*
                  },
                  ...
                }
              },
              ...                                          // More dataElement
            }
            },
            "attributes":   null                           // Configuration of trackedEntityAttributes if any
        },
        "ART Referral - Opening": {                        // Configuration of 2nd "real" stages
          ...
        },
        ...                                                // Configuration of more "real" stages
    },
    "psiWorkers": {                                        // PSI workers configuration
      "categroyId": *DHIS UID*,
      *xLS CODE*: {
         "name":    *DHIS NAME*,
         "uid":     *DHIS UID*
       },
       ...
    },
    "organisationUnits": {                                 // Organisation units configuration
      "adm0": {                                            // Country
        "LS": {
          "nameDhis":   "Lesotho",
          "uid":        "vJNI6blhosr"
        }
      },
      "adm1": {                                            // District
        *XLS CODE*: {
          "nameDhis":   *DHIS NAME*,
          "uid":        *DHIS UID*,
          "optionSet":  *DHIS CODE*,
        },
        ...
      },
      "adm2": {                                            // Council
        ...
      },
      "adm3": {                                            // Health Facility
        ...
      }
    }
}

````

**SUGGESTED CONFIGURATION JSON:**

Date: 13/07/2017

````
{
    "exports": {
      "Testing": {
          "url_lastMonth": "api/analytics/events/query/KDgzpKX3h2S.xls?stage=OSpZnLBMVhr&dimension=pe:LAST_MONTH&dimension=ou:vJNI6blhosr&dimension=zRA08XEYiSF&dimension=Nz4w5ctIBLO&dimension=wSp6Q7QDMsk&dimension=u57uh7lHwF8&dimension=mW2l3T2zL0N&dimension=mUxDHgywnn2&dimension=vTPYC9BXPNn&dimension=CCVO6BZMrnp&dimension=Y35TizULMzg&dimension=kdzfhXK71re&dimension=Fty7JMtC7mX&dimension=vD0qayOxs64&dimension=tzZCy78mWEG&dimension=gYiUqfKwktq&dimension=kpMMzIM3t5I&dimension=fa7lRYdWJfl&dimension=PWy9kmp4Pmb&dimension=XTWSNIlxkEj&dimension=PyfoYtwNGrI",
          "url_lastWeek": "api/analytics/events/query/KDgzpKX3h2S.xls?stage=OSpZnLBMVhr&dimension=pe:LAST_WEEK&dimension=ou:vJNI6blhosr&dimension=zRA08XEYiSF&dimension=Nz4w5ctIBLO&dimension=wSp6Q7QDMsk&dimension=u57uh7lHwF8&dimension=mW2l3T2zL0N&dimension=mUxDHgywnn2&dimension=vTPYC9BXPNn&dimension=CCVO6BZMrnp&dimension=Y35TizULMzg&dimension=kdzfhXK71re&dimension=Fty7JMtC7mX&dimension=vD0qayOxs64&dimension=tzZCy78mWEG&dimension=gYiUqfKwktq&dimension=kpMMzIM3t5I&dimension=fa7lRYdWJfl&dimension=PWy9kmp4Pmb&dimension=XTWSNIlxkEj&dimension=PyfoYtwNGrI",
          "uid_table": "UngpAAZjEmt"
      },
      "ART Referral - Opening": {
          "url_lastMonth": "",
          "url_lastWeek": "",
          "uid_table": ""
      },
      "ART Referral - Closure": {
          "url_lastMonth": "",
          "url_lastWeek": "",
          "uid_table": ""
      },
      "Contact Log": {
          "url_lastMonth": "",
          "url_lastWeek": "",
          "uid_table": ""
      }
  },
  "duplicates": {
        "CUIC": {
            "toCheck": true,
            "header": "UIC",
            "uid": "rw3W9pDCPb2"
        },
        "dateOfBirth": {
            "toCheck": true,
            "header": "DateOfBirth",
            "uid": "BvsJfkddTgZ"
        },
        "districtOfBirth": {
            "toCheck": true,
            "header": "DistirctOfBirth",
            "uid": "u57uh7lHwF8"
        },
        "orderOfBirth": {
            "toCheck": true,
            "header": "BirthOrder",
            "uid": "vTPYC9BXPNn"
        },
        "firstName": {
            "toCheck": true,
            "header": "FirstName",
            "uid": "R9Lw1uNtRuj"
        },
        "lastName": {
            "toCheck": true,
            "header": "Surname",
            "uid": "TBt2a4Bq0Lx"
        }
    },
    "ressources": {
        "importMock": "m6399KcahUP",
        "importSheet": null,
        "importHXL": false,
        "uidTrackedEntity": "XV3kldsZq0H",
        "uidProgram": "KDgzpKX3h2S",
        "CUIC": {
            "header": "UIC",
            "uid": "rw3W9pDCPb2"
        },
        "CUIC_old": null,
        "stageNames": ["Testing","ART Referral - Opening"]
    },
    "dataPoints":{
        "enrollement": {
            "uid":          null,
            "attribution":  null,
            "date":         "DateOfTestingToday",
            "orgUnit":      "Council",
            "attributes": {
              "UIC": {
                "nameDhis": "LS - Client Info - Client ID (CUIC)",
                "uid": "rw3W9pDCPb2",
                "valueType": "TEXT"
              },
              "DateOfBirth": {
                "nameDhis": "LS - Client Info - Date of Birth",
                "uid": "BvsJfkddTgZ",
                "valueType": "DATE"
              },
              "DistirctOfBirth": {
                "nameDhis": "LS - Client Info - District of Birth",
                "uid": "u57uh7lHwF8",
                "valueType": "ADM1"
              },
              "FirstName": {
                "nameDhis": "LS - Client Info - First name",
                "uid": "R9Lw1uNtRuj",
                "valueType": "TEXT"
              },
              "Surname": {
                "nameDhis": "LS - Client Info - Surname",
                "uid": "TBt2a4Bq0Lx",
                "valueType": "TEXT"
              },
              "BirthOrder": {
                "nameDhis": "LS - Client Info - Birth Order",
                "uid": "vTPYC9BXPNn",
                "valueType": "OPTIONSET",
                "optionSet": {
                  "0": {
                    "codeDhis": "00",
                    "nameDhis": "00 - if twin or triplet"
                  },
                  "1": {
                    "codeDhis": "01",
                    "nameDhis": "01"
                  },
                  "2": {
                    "codeDhis": "02",
                    "nameDhis": "02"
                  },
                  "3": {
                    "codeDhis": "03",
                    "nameDhis": "03"
                  },
                  "4": {
                    "codeDhis": "04",
                    "nameDhis": "04"
                  },
                  "5": {
                    "codeDhis": "05",
                    "nameDhis": "05"
                  },
                  "6": {
                    "codeDhis": "06",
                    "nameDhis": "06"
                  },
                  "7": {
                    "codeDhis": "07",
                    "nameDhis": "07"
                  },
                  "8": {
                    "codeDhis": "08",
                    "nameDhis": "08"
                  },
                  "9": {
                    "codeDhis": "09",
                    "nameDhis": "09"
                  },
                  "10": {
                    "codeDhis": "10",
                    "nameDhis": "10"
                  },
                  "11": {
                    "codeDhis": "11",
                    "nameDhis": "11"
                  },
                  "12": {
                    "codeDhis": "12",
                    "nameDhis": "12"
                  }
                }
              },
              "Sex": {
                "nameDhis": "CORE - Sex",
                "uid": "CCVO6BZMrnp",
                "valueType": "OPTIONSET",
                "optionSet": {
                  "Female": {
                    "codeDhis": "Female",
                    "nameDhis": "Female"
                  },
                  "Male": {
                    "codeDhis": "Male",
                    "nameDhis": "Male"
                  }
                }
              },
              "KP1": {
                "nameDhis": "CORE - Key Population",
                "uid": "Y35TizULMzg",
                "valueType": "OPTIONSET",
                "optionSet": {
                  "FSW": {
                    "codeDhis": "FSW",
                    "nameDhis": "FSW"
                  },
                  "MSMSW": {
                    "codeDhis": "MSMSW",
                    "nameDhis": "MSM SW"
                  },
                  "MSMNONSW": {
                    "codeDhis": "MSMNONSW",
                    "nameDhis": "MSM Non SW"
                  },
                  "TGSW": {
                    "codeDhis": "TGSW",
                    "nameDhis": "TG SW"
                  },
                  "TGNONSW": {
                    "codeDhis": "TGNONSW",
                    "nameDhis": "TG Non SW"
                  }
                }
              },
              "PWID": {
                "nameDhis": "CORE - KEY POP - PWID",
                "uid": "kdzfhXK71re",
                "valueType": "TRUE_ONLY"
              },
              "Prisoner/enclosed": {
                "nameDhis": "CORE - KEY POP - Prisoner/ enclosed setting",
                "uid": "Fty7JMtC7mX",
                "valueType": "TRUE_ONLY"
              },
              "OVC": {
                "nameDhis": "LS - Client Info - PP OVC",
                "uid": "vD0qayOxs64",
                "valueType": "OPTIONSET",
                "optionSet": {
                  "OVC1": {
                    "codeDhis": "OVC1",
                    "nameDhis": "OVC 1"
                  },
                  "OVC2": {
                    "codeDhis": "OVC2",
                    "nameDhis": "OVC 2"
                  }
                }
              },
              "Factory/ex-factory": {
                "nameDhis": "LS - Client Info - PP Factory worker or ex-factory worker",
                "uid": "tzZCy78mWEG",
                "valueType": "TRUE_ONLY"
              },
              "Miner/ex-miner": {
                "nameDhis": "LS - Client Info - PP Miner or ex",
                "uid": "gYiUqfKwktq",
                "valueType": "TRUE_ONLY"
              },
              "Mobile": {
                "nameDhis": "LS - Client Info - PP Mobile pop",
                "uid": "kpMMzIM3t5I",
                "valueType": "TRUE_ONLY"
              },
              "Military": {
                "nameDhis": "LS - Client Info - PP Military",
                "uid": "fa7lRYdWJfl",
                "valueType": "TRUE_ONLY"
              },
              "EverTested": {
                "nameDhis": "LS - Client Info - Ever tested and received result",
                "uid": "PWy9kmp4Pmb",
                "valueType": "BOOLEAN"
              },
              "PreviousResult": {
                "nameDhis": "LS - Client Info - Result of last HIV test",
                "uid": "XTWSNIlxkEj",
                "valueType": "OPTIONSET",
                "optionSet": {
                  "NEG": {
                    "codeDhis": "NEG",
                    "nameDhis": "Negative"
                  },
                  "POS-noART": {
                    "codeDhis": "POS-noART",
                    "nameDhis": "Positive-not on ART"
                  },
                  "POS-ART": {
                    "codeDhis": "POS-ART",
                    "nameDhis": "Positive-currently on ART"
                  },
                  "IND": {
                    "codeDhis": "IND",
                    "nameDhis": "Indeterminate"
                  }
                }
              },
              "DateLastTested": {
                "nameDhis": "LS - Client Info - Date of last HIV test",
                "uid": "PyfoYtwNGrI",
                "valueType": "DATE"
              }
            }
        },
        "Testing": {
            "uid":          "lVglvBnE3TY",
            "attribution":  "Counselor_Code",
            "date":         "DateOfTestingToday",
            "orgUnit":      "Council",
            "attributes":   null,
            "dataElements": {
                "Age": {
                  "nameDhis": "LS HTS TRK - Client - Age (yrs)",
                  "uid": "e4XZKCNJjlc",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "Channel": {
                  "nameDhis": "LS HTS TRK - Background - Delivery channel",
                  "uid": "quOYwc0SOqD",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Index": {
                      "codeDhis": "LS_CHA4",
                      "nameDhis": "Index"
                    },
                    "VCT": {
                      "codeDhis": "LS_CHA1",
                      "nameDhis": "VCT"
                    },
                    "New Start clinic": {
                      "codeDhis": "LS_CHA2",
                      "nameDhis": "New Start clinic"
                    },
                    "Home-based": {
                      "codeDhis": "LS_CHA6",
                      "nameDhis": "Home-based"
                    },
                    "Other testing channel": {
                      "codeDhis": "LS_CHA5",
                      "nameDhis": "Other testing channel"
                    },
                    "Mobile testing": {
                      "codeDhis": "LS_CHA3",
                      "nameDhis": "Mobile testing"
                    },
                    "Other (specify)": {
                      "codeDhis": "LS_CHA7",
                      "nameDhis": "Other (specify)"
                    }
                  }
                },
                "Occupation": {
                  "nameDhis": "LS HTS TRK - Client - Employment status",
                  "uid": "VEVaRAcZUcD",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Employed/Self-employed": {
                      "codeDhis": "LS_EMP1",
                      "nameDhis": "Employed/Self-employed"
                    },
                    "Student": {
                      "codeDhis": "LS_EMP4",
                      "nameDhis": "Student"
                    },
                    "Unemployed": {
                      "codeDhis": "LS_EMP5",
                      "nameDhis": "Unemployed"
                    }
                  }
                },
                "ClientType": {
                  "nameDhis": "LS HTS TRK - Background - Client Type",
                  "uid": "RvYugZqBKoN",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Individual": {
                      "codeDhis": "LS_SER1",
                      "nameDhis": "Individual test"
                    },
                    "Couple": {
                      "codeDhis": "LS_SER2",
                      "nameDhis": "Couple test"
                    },
                    "EQC/PPT": {
                      "codeDhis": "LS_SER3",
                      "nameDhis": "EQC / PPT"
                    }
                  }
                },
                "WhatMadeYouDecideToTestToday": {
                  "nameDhis": "LS HTS TRK - Client - What motivated HIV test",
                  "uid": "vOrRzjpdQC6",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Index": {
                      "codeDhis": "INDEX",
                      "nameDhis": "Index"
                    },
                    "Self-motivated": {
                      "codeDhis": "SELF",
                      "nameDhis": "Self-motivated"
                    },
                    "PSI/NewStart_Staff": {
                      "codeDhis": "PSI",
                      "nameDhis": "PSI field/ NS staff"
                    },
                    "Other health worker": {
                      "codeDhis": "OHW",
                      "nameDhis": "Other health worker"
                    },
                    "Positive self-test": {
                      "codeDhis": "SELFTEST",
                      "nameDhis": "Positive self-test"
                    },
                    "Partner notification": {
                      "codeDhis": "PARTNER",
                      "nameDhis": "Partner notification"
                    },
                    "Other friends or relatives (not index)": {
                      "codeDhis": "NOTINDEX",
                      "nameDhis": "Other friends or relatives (not index)"
                    },
                    "Radio/ TV": {
                      "codeDhis": "RDTV",
                      "nameDhis": "Radio/ TV"
                    },
                    "Billboard/ Poster": {
                      "codeDhis": "POSTER",
                      "nameDhis": "Billboard/ Poster"
                    },
                    "Other (specify)": {
                      "codeDhis": "OTHER",
                      "nameDhis": "Other (specify)"
                    }
                  }
                },
                "FemaleCondoms": {
                  "nameDhis": "LS HTS TRK - Commodity - Female condom distributed (units)",
                  "uid": "nNJQ6POHKNc",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "MaleCondoms": {
                  "nameDhis": "LS HTS TRK - Commodity - Lubricants distributed (units)",
                  "uid": "ettc2MtVOcm",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "Lubcricants": {
                  "nameDhis": "LS HTS TRK - Commodity - Male condom distributed (units)",
                  "uid": "A5aT1hCrMw1",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "Glucose": {
                  "nameDhis": "LS HTS TRK - NCD - Blood glucose (mmol/l)",
                  "uid": "xioxtS6erFa",
                  "valueType": "NUMBER"
                },
                "BMI": {
                  "nameDhis": "LS HTS TRK - NCD - BMI",
                  "uid": "r0Lh3dEecPF",
                  "valueType": "NUMBER"
                },
                "Diastolic": {
                  "nameDhis": "LS HTS TRK - NCD - BP Diastolic (mmHg)",
                  "uid": "SvAAL4qH5pX",
                  "valueType": "INTEGER"
                },
                "Systolic": {
                  "nameDhis": "LS HTS TRK - NCD - BP systolic (mmHg)",
                  "uid": "yI7kyMQJVKW",
                  "valueType": "INTEGER"
                },
                "Height": {
                  "nameDhis": "LS HTS TRK - NCD - Height",
                  "uid": "aIplfQPaJH7",
                  "valueType": "NUMBER"
                },
                "Weight": {
                  "nameDhis": "LS HTS TRK - NCD - Weight",
                  "uid": "PazJ9tnjGhS",
                  "valueType": "NUMBER"
                },
                "KnowledgeOfPartnerStatus": {
                  "nameDhis": "LS HTS TRK - RA - Does partner know HIV status",
                  "uid": "TSqDjQSS2Qi",
                  "valueType": "BOOLEAN"
                },
                "IfYesPartnersStatus": {
                  "nameDhis": "LS HTS TRK - RA - Partner HIV status",
                  "uid": "C4Zu5mKJQ9y",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "HIV+": {
                      "codeDhis": "HIVPOS",
                      "nameDhis": "HIV+"
                    },
                    "HIV-": {
                      "codeDhis": "HIVNEG",
                      "nameDhis": "HIV-"
                    },
                    "Does not want to disclose": {
                      "codeDhis": "NODISC",
                      "nameDhis": "Does not want to disclose"
                    }
                  }
                },
                "NumberSexualPartners": {
                  "nameDhis": "LS HTS TRK - RA - Number of sexual partners",
                  "uid": "drqngyyqyP3",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "Pregant/BreastFeeding": {
                  "nameDhis": "LS HTS TRK - RA - Pregnant or breastfeeding",
                  "uid": "Ax5h5bwtBMK",
                  "valueType": "BOOLEAN"
                },
                "Circumcised?": {
                  "nameDhis": "LS HTS TRK - RA - STI circumcised",
                  "uid": "Ml9lBSv0iCC",
                  "valueType": "TRUE_ONLY"
                },
                "GenitalSores/Discharge": {
                  "nameDhis": "LS HTS TRK - RA - Genital sores or discharge",
                  "uid": "za8zgXEjUHp",
                  "valueType": "TRUE_ONLY"
                },
                "STI_Dx/Tx": {
                  "nameDhis": "LS HTS TRK - Referral to - STI diagnosis/treatment",
                  "uid": "hv1oAJf18cE",
                  "valueType": "TRUE_ONLY"
                },
                "TB_Dx/Tx": {
                  "nameDhis": "LS HTS TRK - Referral to - TB diagnosis/treatment",
                  "uid": "a9x8qqtTs0J",
                  "valueType": "TRUE_ONLY"
                },
                "VMMC": {
                  "nameDhis": "LS HTS TRK - Referral to - VMMC",
                  "uid": "DbfyDJ04SjL",
                  "valueType": "TRUE_ONLY"
                },
                "PReP(HIV-)": {
                  "nameDhis": "LS HTS TRK - Referral to - PReP (HIV-)",
                  "uid": "sTmbmjnUhrA",
                  "valueType": "TRUE_ONLY"
                },
                "FP": {
                  "nameDhis": "LS HTS TRK - Referral to - Family Planning",
                  "uid": "BqyBHC6eEFr",
                  "valueType": "TRUE_ONLY"
                },
                "TBSuspect?": {
                  "nameDhis": "LS HTS TRK - TB - Suspected",
                  "uid": "aK3LtjgJwUH",
                  "valueType": "BOOLEAN"
                },
                "ResultsGiven?": {
                  "nameDhis": "LS HTS TRK - Test - Results given",
                  "uid": "QLMo6Kh3eVP",
                  "valueType": "BOOLEAN"
                },
                "SDBioline": {
                  "nameDhis": "LS HTS TRK - Test - SD Bioline - Result",
                  "uid": "M11JqgkJt2X",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Negative": {
                      "codeDhis": "Negative",
                      "nameDhis": "Negative"
                    },
                    "Positive": {
                      "codeDhis": "Positive",
                      "nameDhis": "Positive"
                    },
                    "Indeterminate": {
                      "codeDhis": "Indeterminate",
                      "nameDhis": "Indeterminate"
                    },
                    "Indeterminate out of stock": {
                      "codeDhis": "Indeterminate out of stock",
                      "nameDhis": "SD bioline out of stock"
                    }
                  }
                },
                "T1:Result": {
                  "nameDhis": "LS HTS TRK - Test 1 - Result",
                  "uid": "choHDFxMCaU",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Positive": {
                      "codeDhis": "Positive",
                      "nameDhis": "Positive"
                    },
                    "Negative": {
                      "codeDhis": "Negative",
                      "nameDhis": "Negative"
                    }
                  }
                },
                "T2:Result": {
                  "nameDhis": "LS HTS TRK - Test 2 - Result",
                  "uid": "KDnhSz51HKS",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Positive": {
                      "codeDhis": "Positive",
                      "nameDhis": "Positive"
                    },
                    "Negative": {
                      "codeDhis": "Negative",
                      "nameDhis": "Negative"
                    }
                  }
                },
                "Parallel1": {
                  "nameDhis": "LS HTS TRK - Test 3 Parallel 1 - Result",
                  "uid": "rMh4ZGNzrh1",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Positive": {
                      "codeDhis": "Positive",
                      "nameDhis": "Positive"
                    },
                    "Negative": {
                      "codeDhis": "Negative",
                      "nameDhis": "Negative"
                    }
                  }
                },
                "Parallel2": {
                  "nameDhis": "LS HTS TRK - Test 3 Parallel 2 - Result",
                  "uid": "Bqff4skvt4d",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Positive": {
                      "codeDhis": "Positive",
                      "nameDhis": "Positive"
                    },
                    "Negative": {
                      "codeDhis": "Negative",
                      "nameDhis": "Negative"
                    }
                  }
                },
                "Final_Result": {
                  "nameDhis": "LS HTS TRK - Test - Final HIV status",
                  "uid": "UuKat0HFjWS",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Negative": {
                      "codeDhis": "Negative",
                      "nameDhis": "Negative"
                    },
                    "Positive": {
                      "codeDhis": "Positive",
                      "nameDhis": "Positive"
                    },
                    "Indeterminate": {
                      "codeDhis": "Indeterminate",
                      "nameDhis": "Indeterminate"
                    }
                  }
                },
                "ART": {
                  "nameDhis": "LS HTS TRK - Referral to - ART",
                  "uid": "tUIkmIFMEDS",
                  "valueType": "TRUE_ONLY"
                },
                "ExtraDetermineStrips": {
                  "nameDhis": "LS HTS TRK - Commodity - Determine strips invalids (units)",
                  "uid": "UOmjmckRjzR",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "ReferralOffered?": {
                  "nameDhis": "LS HTS TRK - Referral - Referral offered",
                  "uid": "r8AftzZCjWP",
                  "valueType": "BOOLEAN"
                },
                "TBScreeningConducted?": {
                  "nameDhis": "LS HTS TRK - TB - Screening conducted",
                  "uid": "mkVl2wjztaz",
                  "valueType": "BOOLEAN"
                },
                "WhatMadeYouDecideToTestToday+other": {
                  "nameDhis": "LS HTS TRK - Client - What motivated HIV test - other",
                  "uid": "GCl3ORKj1jC",
                  "valueType": "TEXT"
                },
                "IfHIV+DidClientDisclose?": {
                  "nameDhis": "LS HTS TRK - Test - Previous knowledge of HIV+ status",
                  "uid": "esWS3Y9LDi6",
                  "valueType": "BOOLEAN"
                },
                "Channel+other": {
                  "nameDhis": "LS HTS TRK - Background - Delivery channel - other",
                  "uid": "Tjw4iDAjyy6",
                  "valueType": "TEXT"
                },
                "ExtraAlcoholSwabs": {
                  "nameDhis": "LS HTS TRK - Commodity - Alcohol swabs extras (units)",
                  "uid": "GmbfRCbWdRA",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "ExtraBloodLancets": {
                  "nameDhis": "LS HTS TRK - Commodity - Blood lancets extras (units)",
                  "uid": "dqynj0LR6ba",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "ExtraCapillaryTubes": {
                  "nameDhis": "LS HTS TRK - Commodity - Capillary tubes extras (units)",
                  "uid": "kY8Yhg3va7P",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "ExtraExamGloves": {
                  "nameDhis": "LS HTS TRK - Commodity - Examination gloves extras (units)",
                  "uid": "qq2C8BLOe4F",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "ExtraUnigoldStrips": {
                  "nameDhis": "LS HTS TRK - Commodity - Unigold strips invalids (units)",
                  "uid": "tYNs16xzTqS",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "CoupleUIC": {
                  "nameDhis": "LS HTS TRK - Couple - Partner's CUIC",
                  "uid": "UYyCL2xz8Wz",
                  "valueType": "TEXT"
                },
                "DNA PCR": {
                  "nameDhis": "LS HTS TRK - Referral to - DNA PCR",
                  "uid": "ZKWK5UIO9wp",
                  "valueType": "TRUE_ONLY"
                },
                "Layering": {
                  "nameDhis": "LS HTS TRK - Background - Layer",
                  "uid": "fGSXGuPIEOy",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "1": {
                      "codeDhis": "LAY01",
                      "nameDhis": "1. Assist/ Sentibale"
                    },
                    "2": {
                      "codeDhis": "LAY02",
                      "nameDhis": "2. IPC"
                    },
                    "3": {
                      "codeDhis": "LAY03",
                      "nameDhis": "3. M2M"
                    },
                    "4": {
                      "codeDhis": "LAY04",
                      "nameDhis": "4. CRS/Caritas"
                    },
                    "5": {
                      "codeDhis": "LAY05",
                      "nameDhis": "5. Promo"
                    },
                    "6": {
                      "codeDhis": "LAY06",
                      "nameDhis": "6. WVI"
                    },
                    "7": {
                      "codeDhis": "LAY07",
                      "nameDhis": "7. Care for Lesotho"
                    },
                    "8": {
                      "codeDhis": "LAY08",
                      "nameDhis": "8. Other"
                    }
                  }
                },
                "Layering+other": {
                  "nameDhis": "LS HTS TRK - Background - Layer - other",
                  "uid": "omugvBULuf0",
                  "valueType": "TEXT"
                },
                "CoupleStatus": {
                  "nameDhis": "LS HTS TRK - Couple - Couple status",
                  "uid": "Umu8i2QXCZk",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "Concordant": {
                      "codeDhis": "CON",
                      "nameDhis": "Concordant"
                    },
                    "Discordant": {
                      "codeDhis": "DIS",
                      "nameDhis": "Discordant"
                    },
                    "Negative": {
                      "codeDhis": "NEG",
                      "nameDhis": "Negative"
                    },
                    "Indeterminate": {
                      "codeDhis": "IND",
                      "nameDhis": "Indeterminate"
                    }
                  }
                },
                "TimeSinceLastTest": {
                  "nameDhis": "LS HTS TRK - Client - Time since last test (months)",
                  "uid": "nrYd6E6BmSP",
                  "valueType": "INTEGER_ZERO_OR_POSITIVE"
                },
                "Village/SiteName": {
                  "nameDhis": "LS HTS TRK - Background - Village / Township",
                  "uid": "jBmfQ0i1McL",
                  "valueType": "TEXT"
                },
                "Education": {
                  "nameDhis": "LS HTS TRK - Client - Education level",
                  "uid": "KZsCEYMUuXz",
                  "valueType": "OPTIONSET",
                  "optionSet": {
                    "None": {
                      "codeDhis": "LS_EDU0",
                      "nameDhis": "None"
                    },
                    "Primary": {
                      "codeDhis": "LS_EDU1",
                      "nameDhis": "Primary"
                    },
                    "High school": {
                      "codeDhis": "LS_EDU2",
                      "nameDhis": "High school"
                    },
                    "Tertiary": {
                      "codeDhis": "LS_EDU3",
                      "nameDhis": "Tertiary"
                    }
                  }
                },
                "IndexLeadUIC": {
                  "nameDhis": "LS HTS TRK - Indexing -Lead's CUIC",
                  "uid": "nSr0NMql5FW",
                  "valueType": "TEXT"
                }
              }
        },
        "ART Referral - Opening": {
            "uid":          "OSpZnLBMVhr",
            "attribution":  "Counselor_Code",
            "date":         "DateOfTestingToday",
            "orgUnit":      "Council",
            "attributes":   {
                "LinkageStatus": {
                    "nameDhis": "LS - ART Referral - Linkage status",
                    "uid": "mYdfuRItatP",
                    "valueType": "OPTIONSET",
                    "optionSet": {
                          "Success": {
                            "codeDhis": "SUCCESS",
                            "nameDhis": "Successful Linkage"
                          },
                          "Dropped": {
                            "codeDhis": "DROPPED",
                            "nameDhis": "Case Dropped"
                          },
                          "Pending": {
                            "codeDhis": "PENDING",
                            "nameDhis": "Pending Linkage"
                          }
                    }
                }
            },
            "dataElements": {
                "ReferralFacility": {
                  "nameDhis": "LS HTS TRK - ART Referral Op - Referral facility",
                  "uid": "E1KAxdya3y5",
                  "valueType": "ADM3"
                },
                "ReferralFacility+other": {
                  "nameDhis": "LS HTS TRK - ART Referral Op - Referral facility - other",
                  "uid": "CLclHLxzl9e",
                  "valueType": "TEXT"
                }
            }
        }
    },
    "psiWorkers": {
      "url": "categoryOptionGroups?fields=name,categoryOptions[name,code,id]",
      "categroyId": "qVl8p3w3fI5",
      "TES001": {
        "name": "LS - TES001 - Test",
        "id": "i2gN5gAiQ59"
      },
      "TES002": {
        "name": "LS - TES002 - Test",
        "id": "wrygHPUqyZB"
      }
    },
    "organisationUnits": {
      "url": "organisationUnits/vJNI6blhosr?fields=id,name,children[id,name,children[id,name]]&paging=false",
      "adm0": {
        "LS": {
          "nameDhis": "Lesotho",
          "uid": "vJNI6blhosr"
        }
      },
      "adm1": {
        "LS01": {
          "nameDhis": "Maseru (01)",
          "uid": "QPRZuTHu18l",
          "optionSet": "01",
          "parent": "LS"
        },
        "LS02": {
          "nameDhis": "Butha Buthe (02)",
          "uid": "HuxtEzVg7Fh",
          "optionSet": "02",
          "parent": "LS"
        },
        "LS03": {
          "nameDhis": "Leribe (03)",
          "uid": "rp9THcpEmRk",
          "optionSet": "03",
          "parent": "LS"
        },
        "LS04": {
          "nameDhis": "Berea (04)",
          "uid": "ywXuaGCp1JN",
          "optionSet": "04",
          "parent": "LS"
        },
        "LS05": {
          "nameDhis": "Mafeteng (05)",
          "uid": "ztofJR0XBPQ",
          "optionSet": "05",
          "parent": "LS"
        },
        "LS06": {
          "nameDhis": "Mohale's Hoek (06)",
          "uid": "SKAwa0gTWOn",
          "optionSet": "06",
          "parent": "LS"
        },
        "LS07": {
          "nameDhis": "Quthing (07)",
          "uid": "bUqBiVA5CNu",
          "optionSet": "07",
          "parent": "LS"
        },
        "LS08": {
          "nameDhis": "Qacha's Nek (08)",
          "uid": "JpHAT8IQqWc",
          "optionSet": "08",
          "parent": "LS"
        },
        "LS09": {
          "nameDhis": "Mokhotlong (09)",
          "uid": "vNhNoq47IHU",
          "optionSet": "09",
          "parent": "LS"
        },
        "LS10": {
          "nameDhis": "Thaba Tseka (10)",
          "uid": "BfWFyhN4Hhr",
          "optionSet": "10",
          "parent": "LS"
        },
        "LS11": {
          "nameDhis": "South Africa (11)",
          "uid": "BfWFyhN4Hhr",
          "optionSet": "11",
          "parent": "LS"
        },
        "LS12": {
          "nameDhis": "Abroad (12)",
          "uid": "BfWFyhN4Hhr",
          "optionSet": "12",
          "parent": "LS"
        }
      },
      "adm2": {
         "LS031010": {
           "nameDhis": "Menkhoaneng C05 (031010)",
           "uid": "ExnDUccM0wh",
           "optionSet": "LS031010",
           "parent": "LS03"
         },
         "LS031515": {
           "nameDhis": "Maputsoe urban council (031515)",
           "uid": "SSnj1hiozjl",
           "optionSet": "LS031515",
           "parent": "LS03"
         },
         "LS031818": {
           "nameDhis": "Tsoili-Tsoili C11 (031818)",
           "uid": "as3ohcRMzPf",
           "optionSet": "LS031818",
           "parent": "LS03"
         },
         "LS031111": {
           "nameDhis": "Maisa-Phoka C06 (031111)",
           "uid": "UZJXKmhnOK8",
           "optionSet": "LS031111",
           "parent": "LS03"
         },
         "LS031414": {
           "nameDhis": "Litjotjela C08 (031414)",
           "uid": "xInpsLkifcS",
           "optionSet": "LS031414",
           "parent": "LS03"
         },
         "LS030704": {
           "nameDhis": "Bolahla C02 (030704)",
           "uid": "K9Uf9iDW0YO",
           "optionSet": "LS030704",
           "parent": "LS03"
         },
         "LS031717": {
           "nameDhis": "Manka C10 (031717)",
           "uid": "GqtHUHVRXch",
           "optionSet": "LS031717",
           "parent": "LS03"
         },
         "LS030908": {
           "nameDhis": "Mamafubelu C04 (030908)",
           "uid": "vjN3wXIwogG",
           "optionSet": "LS030908",
           "parent": "LS03"
         },
         "LS030806": {
           "nameDhis": "Ramapepe C03 (030806)",
           "uid": "rasggRQQLbI",
           "optionSet": "LS030806",
           "parent": "LS03"
         },
         "LS031212": {
           "nameDhis": "Sephokong C07 (031212)",
           "uid": "iRjsiLfsX5E",
           "optionSet": "LS031212",
           "parent": "LS03"
         },
         "LS031616": {
           "nameDhis": "Hleoheng C09 (031616)",
           "uid": "AlY7kfwaOkT",
           "optionSet": "LS031616",
           "parent": "LS03"
         },
         "LS031313": {
           "nameDhis": "Hlotse urban council (031313)",
           "uid": "KQxjlV6Bt3l",
           "optionSet": "LS031313",
           "parent": "LS03"
         },
         "LS030601": {
           "nameDhis": "Matsoku C01 (030601)",
           "uid": "wtWiqkTijBP",
           "optionSet": "LS030601",
           "parent": "LS03"
         },
         "LS013701": {
           "nameDhis": "Qiloane A01 (013701)",
           "uid": "OTmyIqbHkqI",
           "optionSet": "LS013701",
           "parent": "LS01"
         },
         "LS014512": {
           "nameDhis": "Kubake A09 (014512)",
           "uid": "FsdhkF2xcRT",
           "optionSet": "LS014512",
           "parent": "LS01"
         },
         "LS013201": {
           "nameDhis": "Maseru Central - MCC (013201)",
           "uid": "mxR0T9D3r6w",
           "optionSet": "LS013201",
           "parent": "LS01"
         },
         "LS014511": {
           "nameDhis": "Makhoarane A08 (014511)",
           "uid": "epdvPcnet5Q",
           "optionSet": "LS014511",
           "parent": "LS01"
         },
         "LS013802": {
           "nameDhis": "Ratau A02 (013802)",
           "uid": "ZtdqvKN9NAY",
           "optionSet": "LS013802",
           "parent": "LS01"
         },
         "LS014309": {
           "nameDhis": "Mazenod A06 (014309)",
           "uid": "KZgkbAmRWIu",
           "optionSet": "LS014309",
           "parent": "LS01"
         },
         "LS014006": {
           "nameDhis": "Manonyane A04 (014006)",
           "uid": "iLT1py94y6Z",
           "optionSet": "LS014006",
           "parent": "LS01"
         },
         "LS014614": {
           "nameDhis": "Semonkong urban council (014614)",
           "uid": "nqzbAKlFbCH",
           "optionSet": "LS014614",
           "parent": "LS01"
         },
         "LS014410": {
           "nameDhis": "Lilala A07 (014410)",
           "uid": "uo8bJ5dyrMq",
           "optionSet": "LS014410",
           "parent": "LS01"
         },
         "LS014208": {
           "nameDhis": "Mohlakeng A05 (014208)",
           "uid": "WdLxSgOKh7z",
           "optionSet": "LS014208",
           "parent": "LS01"
         },
         "LS014613": {
           "nameDhis": "Makhoalipana A10 (014613)",
           "uid": "QFIGR956G2q",
           "optionSet": "LS014613",
           "parent": "LS01"
         },
         "LS013904": {
           "nameDhis": "Likolobeng A03 (013904)",
           "uid": "anjmGLCTTNB",
           "optionSet": "LS013904",
           "parent": "LS01"
         },
         "LS097908": {
           "nameDhis": "Sanqebethu J03 (097908)",
           "uid": "oMlRPZTXaJh",
           "optionSet": "LS097908",
           "parent": "LS09"
         },
         "LS097805": {
           "nameDhis": "Mphokojoana J02 (097805)",
           "uid": "RqqGW8n8srE",
           "optionSet": "LS097805",
           "parent": "LS09"
         },
         "LS097909": {
           "nameDhis": "Mokhotlong urban council (097909)",
           "uid": "MRaap9GkAhX",
           "optionSet": "LS097909",
           "parent": "LS09"
         },
         "LS097701": {
           "nameDhis": "Seate J01 (097701)",
           "uid": "PFNXYruS5tT",
           "optionSet": "LS097701",
           "parent": "LS09"
         },
         "LS098012": {
           "nameDhis": "Menoaneng J04 (098012)",
           "uid": "cHAMLcqSNjf",
           "optionSet": "LS098012",
           "parent": "LS09"
         },
         "LS020409": {
           "nameDhis": "Ts'ale-Le-Moleka B04 (020409)",
           "uid": "hEaKfRZ3Fzf",
           "optionSet": "LS020409",
           "parent": "LS02"
         },
         "LS020101": {
           "nameDhis": "Ngoajane B01 (020101)",
           "uid": "DPpKjXuyVhj",
           "optionSet": "LS020101",
           "parent": "LS02"
         },
         "LS020510": {
           "nameDhis": "Butha Buthe Urban council (020510)",
           "uid": "ZWRZWcXKctp",
           "optionSet": "LS020510",
           "parent": "LS02"
         },
         "LS020204": {
           "nameDhis": "Likila B02 (020204)",
           "uid": "kTNtaqoPVyZ",
           "optionSet": "LS020204",
           "parent": "LS02"
         },
         "LS020305": {
           "nameDhis": "Nqoe B03 (020305)",
           "uid": "XuQvaSICrxB",
           "optionSet": "LS020305",
           "parent": "LS02"
         },
         "LS054701": {
           "nameDhis": "Metsi-Maholo E01 (054701)",
           "uid": "ou7FDO5DfeG",
           "optionSet": "LS054701",
           "parent": "LS05"
         },
         "LS054903": {
           "nameDhis": "Ramoetsana E03 (054903)",
           "uid": "fiUNhfMW1MX",
           "optionSet": "LS054903",
           "parent": "LS05"
         },
         "LS054904": {
           "nameDhis": "Lehlakaneng E04 (054904)",
           "uid": "pXabJ9mtgur",
           "optionSet": "LS054904",
           "parent": "LS05"
         },
         "LS054802": {
           "nameDhis": "Mamants'o E02 (054802)",
           "uid": "jp3Br5JwnEh",
           "optionSet": "LS054802",
           "parent": "LS05"
         },
         "LS055208": {
           "nameDhis": "Mafeteng urban council (055208)",
           "uid": "W66mv6ZqWks",
           "optionSet": "LS055208",
           "parent": "LS05"
         },
         "LS054907": {
           "nameDhis": "Qibing E07 (054907)",
           "uid": "OHoBVqhPFdj",
           "optionSet": "LS054907",
           "parent": "LS05"
         },
         "LS054905": {
           "nameDhis": "Makoabating E05 (054905)",
           "uid": "ZzdHfPqyu1b",
           "optionSet": "LS054905",
           "parent": "LS05"
         },
         "LS054906": {
           "nameDhis": "Ts'ana-Talana E06 (054906)",
           "uid": "aulhngcwiHf",
           "optionSet": "LS054906",
           "parent": "LS05"
         },
         "LS076503": {
           "nameDhis": "Qomoqomong G02 (076503)",
           "uid": "kXFqvdcPKHC",
           "optionSet": "LS076503",
           "parent": "LS07"
         },
         "LS076707": {
           "nameDhis": "Telle G04 (076707)",
           "uid": "TIT649RRgzf",
           "optionSet": "LS076707",
           "parent": "LS07"
         },
         "LS076605": {
           "nameDhis": "Tosing G03 (076605)",
           "uid": "z0EVhO9vtul",
           "optionSet": "LS076605",
           "parent": "LS07"
         },
         "LS076504": {
           "nameDhis": "Quthing urban council (076504)",
           "uid": "SJKcstAuOix",
           "optionSet": "LS076504",
           "parent": "LS07"
         },
         "LS076809": {
           "nameDhis": "Mphaki G05 (076809)",
           "uid": "tGn8ffM3Gld",
           "optionSet": "LS076809",
           "parent": "LS07"
         },
         "LS076401": {
           "nameDhis": "Mtjanyane G01 (076401)",
           "uid": "f1fiJwG8EqU",
           "optionSet": "LS076401",
           "parent": "LS07"
         },
         "LS065904": {
           "nameDhis": "Khoelenya F03 (065904)",
           "uid": "a2BhNVaRPuX",
           "optionSet": "LS065904",
           "parent": "LS06"
         },
         "LS066005": {
           "nameDhis": "Lithipeng F04 (066005)",
           "uid": "hyMqltsoJ4z",
           "optionSet": "LS066005",
           "parent": "LS06"
         },
         "LS065601": {
           "nameDhis": "Siloe F01 (065601)",
           "uid": "yApxsln0dIl",
           "optionSet": "LS065601",
           "parent": "LS06"
         },
         "LS065803": {
           "nameDhis": "Mohale's Hoek urban council (065803)",
           "uid": "QMGPYWWhYJs",
           "optionSet": "LS065803",
           "parent": "LS06"
         },
         "LS065702": {
           "nameDhis": "Mashaleng F02 (065702)",
           "uid": "xK43YaJs7AB",
           "optionSet": "LS065702",
           "parent": "LS06"
         },
         "LS066209": {
           "nameDhis": "Qhoasing F06 (066209)",
           "uid": "d7Gz1pXL6BC",
           "optionSet": "LS066209",
           "parent": "LS06"
         },
         "LS066108": {
           "nameDhis": "Thaba-Mokhele F05 (066108)",
           "uid": "y6zJN7TTaak",
           "optionSet": "LS066108",
           "parent": "LS06"
         },
         "LS066312": {
           "nameDhis": "Senqunyane F07 (066312)",
           "uid": "iwx4oiQ5p6w",
           "optionSet": "LS066312",
           "parent": "LS06"
         },
         "LS042709": {
           "nameDhis": "Kanana D08 (042709)",
           "uid": "KauEn2jKOk6",
           "optionSet": "LS042709",
           "parent": "LS04"
         },
         "LS041901": {
           "nameDhis": "Makeoana D01 (041901)",
           "uid": "Zn7kf51v9ov",
           "optionSet": "LS041901",
           "parent": "LS04"
         },
         "LS042507": {
           "nameDhis": "Motanasela D06 (042507)",
           "uid": "HsMdQCwfl1R",
           "optionSet": "LS042507",
           "parent": "LS04"
         },
         "LS042305": {
           "nameDhis": "Phuthiatsana D05 (042305)",
           "uid": "LYKzrLTul9U",
           "optionSet": "LS042305",
           "parent": "LS04"
         },
         "LS042103": {
           "nameDhis": "Kueneng D03 (042103)",
           "uid": "cqaNJ87HX92",
           "optionSet": "LS042103",
           "parent": "LS04"
         },
         "LS042204": {
           "nameDhis": "Tebe-Tebe D04 (042204)",
           "uid": "t16Jtf4LqCu",
           "optionSet": "LS042204",
           "parent": "LS04"
         },
         "LS042608": {
           "nameDhis": "Senekane D07 (042608)",
           "uid": "r6EH81I5Ayd",
           "optionSet": "LS042608",
           "parent": "LS04"
         },
         "LS042406": {
           "nameDhis": "Berea Urban council (042406)",
           "uid": "O161S3uTLV3",
           "optionSet": "LS042406",
           "parent": "LS04"
         },
         "LS042002": {
           "nameDhis": "Mapoteng D02 (042002)",
           "uid": "M8fKOjgMNnh",
           "optionSet": "LS042002",
           "parent": "LS04"
         },
         "LS086903": {
           "nameDhis": "Qacha's Nek urban council (086903)",
           "uid": "NmFLNsQYI46",
           "optionSet": "LS086903",
           "parent": "LS08"
         },
         "LS087108": {
           "nameDhis": "Tsoelikana H03 (087108)",
           "uid": "yb1krTjdJjC",
           "optionSet": "LS087108",
           "parent": "LS08"
         },
         "LS087004": {
           "nameDhis": "Nts'upe H02 (087004)",
           "uid": "kQtqtHNfeJS",
           "optionSet": "LS087004",
           "parent": "LS08"
         },
         "LS086902": {
           "nameDhis": "Qanya H01 (086902)",
           "uid": "gn2F0tvkNVS",
           "optionSet": "LS086902",
           "parent": "LS08"
         },
         "LS107510": {
           "nameDhis": "Bokong K04 (107510)",
           "uid": "ZIzox2kOt1t",
           "optionSet": "LS107510",
           "parent": "LS10"
         },
         "LS107508": {
           "nameDhis": "Litsoetsoe K03 (107508)",
           "uid": "t6tdC2ddxzo",
           "optionSet": "LS107508",
           "parent": "LS10"
         },
         "LS107201": {
           "nameDhis": "Tenesolo K01 (107201)",
           "uid": "hhVRk1NL8KH",
           "optionSet": "LS107201",
           "parent": "LS10"
         },
         "LS107305": {
           "nameDhis": "Khutlo-se-Metsi K02 (107305)",
           "uid": "kAKsCa7AGqk",
           "optionSet": "LS107305",
           "parent": "LS10"
         },
         "LS107306": {
           "nameDhis": "Thaba-Tseka urban council (107306)",
           "uid": "GuURF81NSL6",
           "optionSet": "LS107306",
           "parent": "LS10"
         },
         "LS107611": {
           "nameDhis": "Linakeng K05 (107611)",
           "uid": "QTanm9ZJfqX",
           "optionSet": "LS107611",
           "parent": "LS10"
         }
      },
      "adm3": {
        "Other": {
          "optionSet": "Other",
          "nameDhis": "Other (specify)"
        },
        "LS013201H01": {
          "optionSet": "LS013201H01",
          "nameDhis": "Domiciliary Filter Clinic"
        },
        "LS013201H02": {
          "optionSet": "LS013201H02",
          "nameDhis": "Likotsi Filter Clinic"
        },
        "LS013201H03": {
          "optionSet": "LS013201H03",
          "nameDhis": "Loretto HC"
        },
        "LS013201H04": {
          "optionSet": "LS013201H04",
          "nameDhis": "Mabote Filter Clinic"
        },
        "LS013201H05": {
          "optionSet": "LS013201H05",
          "nameDhis": "Maseru SDA HC"
        },
        "LS013201H06": {
          "optionSet": "LS013201H06",
          "nameDhis": "Qoaling Filter Clinic"
        },
        "LS013201H07": {
          "optionSet": "LS013201H07",
          "nameDhis": "Queen Mamohato Memorial Hospital"
        },
        "LS013201H08": {
          "optionSet": "LS013201H08",
          "nameDhis": "R.L.D.F HC"
        },
        "LS013201H09": {
          "optionSet": "LS013201H09",
          "nameDhis": "St. Leo HC"
        },
        "LS013201H10": {
          "optionSet": "LS013201H10",
          "nameDhis": "Thamae HC"
        },
        "LS013201H11": {
          "optionSet": "LS013201H11",
          "nameDhis": "Khubetsoana HC"
        },
        "LS013701H01": {
          "optionSet": "LS013701H01",
          "nameDhis": "Thaba Bosiu HC"
        },
        "LS013802H01": {
          "optionSet": "LS013802H01",
          "nameDhis": "Nazareth HC"
        },
        "LS013904H01": {
          "optionSet": "LS013904H01",
          "nameDhis": "Likalaneng HC"
        },
        "LS013904H02": {
          "optionSet": "LS013904H02",
          "nameDhis": "Marakabei HC"
        },
        "LS013904H03": {
          "optionSet": "LS013904H03",
          "nameDhis": "Mohale HC"
        },
        "LS013904H04": {
          "optionSet": "LS013904H04",
          "nameDhis": "St Benedict HC"
        },
        "LS013904H05": {
          "optionSet": "LS013904H05",
          "nameDhis": "St Bernard HC"
        },
        "LS014006H01": {
          "optionSet": "LS014006H01",
          "nameDhis": "St Joseph Hospital"
        },
        "LS014208H01": {
          "optionSet": "LS014208H01",
          "nameDhis": "Koro-koro HC"
        },
        "LS014208H02": {
          "optionSet": "LS014208H02",
          "nameDhis": "Mofoka HC"
        },
        "LS014309H01": {
          "optionSet": "LS014309H01",
          "nameDhis": "Matukeng HC"
        },
        "LS014309H02": {
          "optionSet": "LS014309H02",
          "nameDhis": "Paki HC"
        },
        "LS014309H03": {
          "optionSet": "LS014309H03",
          "nameDhis": "Pshatlella HC"
        },
        "LS014410H01": {
          "optionSet": "LS014410H01",
          "nameDhis": "Peter Claver HC"
        },
        "LS014410H02": {
          "optionSet": "LS014410H02",
          "nameDhis": "St Barnabas HC"
        },
        "LS014511H01": {
          "optionSet": "LS014511H01",
          "nameDhis": "Matsieng HC"
        },
        "LS014511H02": {
          "optionSet": "LS014511H02",
          "nameDhis": "Scott Hospital"
        },
        "LS014512H01": {
          "optionSet": "LS014512H01",
          "nameDhis": "Ha Tlali HC"
        },
        "LS014512H02": {
          "optionSet": "LS014512H02",
          "nameDhis": "Kena HC"
        },
        "LS014512H03": {
          "optionSet": "LS014512H03",
          "nameDhis": "Ramabanta HC"
        },
        "LS014512H04": {
          "optionSet": "LS014512H04",
          "nameDhis": "St Rodrique HC"
        },
        "LS014613H01": {
          "optionSet": "LS014613H01",
          "nameDhis": "Ha Seng HC"
        },
        "LS014614H01": {
          "optionSet": "LS014614H01",
          "nameDhis": "Semonkong HC"
        },
        "LS014614H02": {
          "optionSet": "LS014614H02",
          "nameDhis": "St Leornard HC"
        },
        "LS020101H01": {
          "optionSet": "LS020101H01",
          "nameDhis": "Boiketsiso HC"
        },
        "LS020101H02": {
          "optionSet": "LS020101H02",
          "nameDhis": "Ngoajane HC"
        },
        "LS020101H03": {
          "optionSet": "LS020101H03",
          "nameDhis": "Qholaqhoe HC"
        },
        "LS020204H01": {
          "optionSet": "LS020204H01",
          "nameDhis": "Seboche Hospital"
        },
        "LS020204H02": {
          "optionSet": "LS020204H02",
          "nameDhis": "Tsime HC"
        },
        "LS020305H01": {
          "optionSet": "LS020305H01",
          "nameDhis": "Motete HC"
        },
        "LS020305H02": {
          "optionSet": "LS020305H02",
          "nameDhis": "Muela site HC"
        },
        "LS020305H03": {
          "optionSet": "LS020305H03",
          "nameDhis": "Rampai HC"
        },
        "LS020305H04": {
          "optionSet": "LS020305H04",
          "nameDhis": "St Peters HC"
        },
        "LS020409H01": {
          "optionSet": "LS020409H01",
          "nameDhis": "Linakeng HC"
        },
        "LS020510H01": {
          "optionSet": "LS020510H01",
          "nameDhis": "Butha Buthe Hospital"
        },
        "LS020510H02": {
          "optionSet": "LS020510H02",
          "nameDhis": "St Paul HC"
        },
        "LS030601H01": {
          "optionSet": "LS030601H01",
          "nameDhis": "Mamohau Hospital"
        },
        "LS030601H02": {
          "optionSet": "LS030601H02",
          "nameDhis": "Palama HC"
        },
        "LS030601H03": {
          "optionSet": "LS030601H03",
          "nameDhis": "Sepinare HC"
        },
        "LS030601H04": {
          "optionSet": "LS030601H04",
          "nameDhis": "Seshote HC"
        },
        "LS030704H01": {
          "optionSet": "LS030704H01",
          "nameDhis": "Matlameng HC"
        },
        "LS030806H01": {
          "optionSet": "LS030806H01",
          "nameDhis": "Mositi HC"
        },
        "LS030806H02": {
          "optionSet": "LS030806H02",
          "nameDhis": "Thaba Phat?oa HC"
        },
        "LS030908H01": {
          "optionSet": "LS030908H01",
          "nameDhis": "Mahobong HC"
        },
        "LS030908H02": {
          "optionSet": "LS030908H02",
          "nameDhis": "Mahobong Holy Trinity HC"
        },
        "LS030908H03": {
          "optionSet": "LS030908H03",
          "nameDhis": "Pontmain HC"
        },
        "LS030908H04": {
          "optionSet": "LS030908H04",
          "nameDhis": "Seetsa HC"
        },
        "LS031010H01": {
          "optionSet": "LS031010H01",
          "nameDhis": "Khabo HC"
        },
        "LS031010H02": {
          "optionSet": "LS031010H02",
          "nameDhis": "St Denis HC"
        },
        "LS031111H01": {
          "optionSet": "LS031111H01",
          "nameDhis": "Emmanuel HC"
        },
        "LS031111H02": {
          "optionSet": "LS031111H02",
          "nameDhis": "Maryland HC"
        },
        "LS031111H03": {
          "optionSet": "LS031111H03",
          "nameDhis": "St Magaret HC"
        },
        "LS031313H01": {
          "optionSet": "LS031313H01",
          "nameDhis": "Louis Gerard HC"
        },
        "LS031313H02": {
          "optionSet": "LS031313H02",
          "nameDhis": "Motebang Hospital"
        },
        "LS031414H01": {
          "optionSet": "LS031414H01",
          "nameDhis": "Linotsing HC"
        },
        "LS031616H01": {
          "optionSet": "LS031616H01",
          "nameDhis": "Maputsoe Filter Clinic"
        },
        "LS031616H02": {
          "optionSet": "LS031616H02",
          "nameDhis": "Maputsoe SDA HC"
        },
        "LS031616H03": {
          "optionSet": "LS031616H03",
          "nameDhis": "St Monicas HC"
        },
        "LS031717H01": {
          "optionSet": "LS031717H01",
          "nameDhis": "Peka HC"
        },
        "LS031717H02": {
          "optionSet": "LS031717H02",
          "nameDhis": "St Anne HC"
        },
        "LS031717H03": {
          "optionSet": "LS031717H03",
          "nameDhis": "St Rose HC"
        },
        "LS031818H01": {
          "optionSet": "LS031818H01",
          "nameDhis": "Fobane HC"
        },
        "LS031818H02": {
          "optionSet": "LS031818H02",
          "nameDhis": "Little Flower HC"
        },
        "LS041901H01": {
          "optionSet": "LS041901H01",
          "nameDhis": "Mapheleng HC"
        },
        "LS041901H02": {
          "optionSet": "LS041901H02",
          "nameDhis": "Sebedia HC"
        },
        "LS042002H01": {
          "optionSet": "LS042002H01",
          "nameDhis": "Maluti Hospital"
        },
        "LS042002H02": {
          "optionSet": "LS042002H02",
          "nameDhis": "Sion HC"
        },
        "LS042103H01": {
          "optionSet": "LS042103H01",
          "nameDhis": "Immaculate Conception HC"
        },
        "LS042103H02": {
          "optionSet": "LS042103H02",
          "nameDhis": "Kolojane HC"
        },
        "LS042103H03": {
          "optionSet": "LS042103H03",
          "nameDhis": "St. Theresa HC"
        },
        "LS042204H01": {
          "optionSet": "LS042204H01",
          "nameDhis": "Pilot HC"
        },
        "LS042204H02": {
          "optionSet": "LS042204H02",
          "nameDhis": "St. Magdalena HC"
        },
        "LS042305H01": {
          "optionSet": "LS042305H01",
          "nameDhis": "Mahlatsa HC"
        },
        "LS042305H02": {
          "optionSet": "LS042305H02",
          "nameDhis": "St David HC"
        },
        "LS042406H01": {
          "optionSet": "LS042406H01",
          "nameDhis": "Berea Hospital"
        },
        "LS042507H01": {
          "optionSet": "LS042507H01",
          "nameDhis": "Koali HC"
        },
        "LS042608H01": {
          "optionSet": "LS042608H01",
          "nameDhis": "Bethany Mission HC"
        },
        "LS042608H02": {
          "optionSet": "LS042608H02",
          "nameDhis": "Good Sherpard HC"
        },
        "LS042709H01": {
          "optionSet": "LS042709H01",
          "nameDhis": "Maqhaka HC"
        },
        "LS054701H01": {
          "optionSet": "LS054701H01",
          "nameDhis": "Sekameng HC"
        },
        "LS054701H02": {
          "optionSet": "LS054701H02",
          "nameDhis": "T?akholo HC"
        },
        "LS054802H01": {
          "optionSet": "LS054802H01",
          "nameDhis": "Kolo HC"
        },
        "LS054802H02": {
          "optionSet": "LS054802H02",
          "nameDhis": "Motsekuoa HC"
        },
        "LS054903H01": {
          "optionSet": "LS054903H01",
          "nameDhis": "Masemouse HC"
        },
        "LS054903H02": {
          "optionSet": "LS054903H02",
          "nameDhis": "Matelile HC"
        },
        "LS054903H03": {
          "optionSet": "LS054903H03",
          "nameDhis": "Thaba-T?oeu HC"
        },
        "LS054904H01": {
          "optionSet": "LS054904H01",
          "nameDhis": "Emmaus HC"
        },
        "LS054904H02": {
          "optionSet": "LS054904H02",
          "nameDhis": "Malea-Lea HC"
        },
        "LS054904H03": {
          "optionSet": "LS054904H03",
          "nameDhis": "Ribaneng HC"
        },
        "LS054904H04": {
          "optionSet": "LS054904H04",
          "nameDhis": "St Andrew HC"
        },
        "LS054905H01": {
          "optionSet": "LS054905H01",
          "nameDhis": "Mount Olivet HC"
        },
        "LS054905H02": {
          "optionSet": "LS054905H02",
          "nameDhis": "Mount Tabor HC"
        },
        "LS054905H03": {
          "optionSet": "LS054905H03",
          "nameDhis": "Thabana-Morena HC"
        },
        "LS054906H01": {
          "optionSet": "LS054906H01",
          "nameDhis": "Samaria HC"
        },
        "LS054907H01": {
          "optionSet": "LS054907H01",
          "nameDhis": "Lit?oeneng HC"
        },
        "LS055208H01": {
          "optionSet": "LS055208H01",
          "nameDhis": "Leco-op HC"
        },
        "LS055208H02": {
          "optionSet": "LS055208H02",
          "nameDhis": "Mafeteng Hospital"
        },
        "LS065601H01": {
          "optionSet": "LS065601H01",
          "nameDhis": "Liphiring HC"
        },
        "LS065601H02": {
          "optionSet": "LS065601H02",
          "nameDhis": "Mofumahali-oa-Rosari HC"
        },
        "LS065601H03": {
          "optionSet": "LS065601H03",
          "nameDhis": "Mohalinyane HC"
        },
        "LS065702H01": {
          "optionSet": "LS065702H01",
          "nameDhis": "Ha T?epo HC"
        },
        "LS065803H01": {
          "optionSet": "LS065803H01",
          "nameDhis": "Nt?ekhe Hospital"
        },
        "LS065904H01": {
          "optionSet": "LS065904H01",
          "nameDhis": "Holy Cross HC"
        },
        "LS065904H02": {
          "optionSet": "LS065904H02",
          "nameDhis": "Morifi HC"
        },
        "LS066005H01": {
          "optionSet": "LS066005H01",
          "nameDhis": "Bethel HC"
        },
        "LS066005H02": {
          "optionSet": "LS066005H02",
          "nameDhis": "Lithipeng HC"
        },
        "LS066005H03": {
          "optionSet": "LS066005H03",
          "nameDhis": "Phamong HC"
        },
        "LS066108H01": {
          "optionSet": "LS066108H01",
          "nameDhis": "Mootsinyane HC"
        },
        "LS066108H02": {
          "optionSet": "LS066108H02",
          "nameDhis": "Mpharane HC"
        },
        "LS066209H01": {
          "optionSet": "LS066209H01",
          "nameDhis": "Nohana HC"
        },
        "LS066312H01": {
          "optionSet": "LS066312H01",
          "nameDhis": "Kuebunyane HC"
        },
        "LS066312H02": {
          "optionSet": "LS066312H02",
          "nameDhis": "Nkau HC"
        },
        "LS076401H01": {
          "optionSet": "LS076401H01",
          "nameDhis": "Dilli - Dilli HC"
        },
        "LS076503H01": {
          "optionSet": "LS076503H01",
          "nameDhis": "Quthing Hospital"
        },
        "LS076503H02": {
          "optionSet": "LS076503H02",
          "nameDhis": "Villa Maria HC"
        },
        "LS076605H01": {
          "optionSet": "LS076605H01",
          "nameDhis": "Ha Makoae HC"
        },
        "LS076605H02": {
          "optionSet": "LS076605H02",
          "nameDhis": "St Gabriel HC"
        },
        "LS076605H03": {
          "optionSet": "LS076605H03",
          "nameDhis": "Tsatsane HC"
        },
        "LS076707H01": {
          "optionSet": "LS076707H01",
          "nameDhis": "Maqokho HC"
        },
        "LS076707H02": {
          "optionSet": "LS076707H02",
          "nameDhis": "St.Mathews HC"
        },
        "LS076809H01": {
          "optionSet": "LS076809H01",
          "nameDhis": "Mphaki HC"
        },
        "LS086902H01": {
          "optionSet": "LS086902H01",
          "nameDhis": "Sacred heart HC"
        },
        "LS086902H02": {
          "optionSet": "LS086902H02",
          "nameDhis": "Sekake HC"
        },
        "LS086903H01": {
          "optionSet": "LS086903H01",
          "nameDhis": "Hermitage HC"
        },
        "LS086903H02": {
          "optionSet": "LS086903H02",
          "nameDhis": "Machabeng Hospital"
        },
        "LS087004H01": {
          "optionSet": "LS087004H01",
          "nameDhis": "Lebakeng HC"
        },
        "LS087004H02": {
          "optionSet": "LS087004H02",
          "nameDhis": "Matebeng HC"
        },
        "LS087004H03": {
          "optionSet": "LS087004H03",
          "nameDhis": "Melikane HC"
        },
        "LS087004H04": {
          "optionSet": "LS087004H04",
          "nameDhis": "Mohlapiso HC"
        },
        "LS087004H05": {
          "optionSet": "LS087004H05",
          "nameDhis": "Tebellong Hospital"
        },
        "LS087108H01": {
          "optionSet": "LS087108H01",
          "nameDhis": "Rankakala HC"
        },
        "LS087108H02": {
          "optionSet": "LS087108H02",
          "nameDhis": "Sehlaba-Thebe HC"
        },
        "LS087108H03": {
          "optionSet": "LS087108H03",
          "nameDhis": "St Francis HC"
        },
        "LS097701H01": {
          "optionSet": "LS097701H01",
          "nameDhis": "Mapholaneng HC"
        },
        "LS097701H02": {
          "optionSet": "LS097701H02",
          "nameDhis": "St Martin HC"
        },
        "LS097805H01": {
          "optionSet": "LS097805H01",
          "nameDhis": "Molika-Liko HC"
        },
        "LS097805H02": {
          "optionSet": "LS097805H02",
          "nameDhis": "Tlhanyaku HC"
        },
        "LS097908H01": {
          "optionSet": "LS097908H01",
          "nameDhis": "Malefiloane HC"
        },
        "LS097909H01": {
          "optionSet": "LS097909H01",
          "nameDhis": "Mokhotlong Hospital"
        },
        "LS098012H01": {
          "optionSet": "LS098012H01",
          "nameDhis": "Libibing HC"
        },
        "LS098012H02": {
          "optionSet": "LS098012H02",
          "nameDhis": "Linakaneng HC"
        },
        "LS098012H03": {
          "optionSet": "LS098012H03",
          "nameDhis": "Moeketsane HC"
        },
        "LS098012H04": {
          "optionSet": "LS098012H04",
          "nameDhis": "St James HC"
        },
        "LS107201H01": {
          "optionSet": "LS107201H01",
          "nameDhis": "Auray HC"
        },
        "LS107201H02": {
          "optionSet": "LS107201H02",
          "nameDhis": "St James  Hospital"
        },
        "LS107305H01": {
          "optionSet": "LS107305H01",
          "nameDhis": "Ha Lephoi HC"
        },
        "LS107305H02": {
          "optionSet": "LS107305H02",
          "nameDhis": "Ha Popa HC"
        },
        "LS107305H03": {
          "optionSet": "LS107305H03",
          "nameDhis": "Methalaneng HC"
        },
        "LS107305H04": {
          "optionSet": "LS107305H04",
          "nameDhis": "Montmartre HC"
        },
        "LS107306H01": {
          "optionSet": "LS107306H01",
          "nameDhis": "Paray  Hospital"
        },
        "LS107306H02": {
          "optionSet": "LS107306H02",
          "nameDhis": "Thaba-Tseka HC"
        },
        "LS107508H01": {
          "optionSet": "LS107508H01",
          "nameDhis": "Ha Mokoto HC"
        },
        "LS107508H02": {
          "optionSet": "LS107508H02",
          "nameDhis": "Mohlanapeng HC"
        },
        "LS107510H01": {
          "optionSet": "LS107510H01",
          "nameDhis": "Bobete HC "
        },
        "LS107510H02": {
          "optionSet": "LS107510H02",
          "nameDhis": "Katse HC"
        },
        "LS107510H03": {
          "optionSet": "LS107510H03",
          "nameDhis": "Khohlo-Nt?o HC"
        },
        "LS107510H04": {
          "optionSet": "LS107510H04",
          "nameDhis": "Semenanyana HC"
        },
        "LS107611H01": {
          "optionSet": "LS107611H01",
          "nameDhis": "Manamaneng HC"
        },
        "LS107611H02": {
          "optionSet": "LS107611H02",
          "nameDhis": "Sehong-Hong HC"
        },
        "LS107611H03": {
          "optionSet": "LS107611H03",
          "nameDhis": "St Theresa HC"
        },
        "LS107611H04": {
          "optionSet": "LS107611H04",
          "nameDhis": "Linakeng HC"
        }
      }
    }
}
````
