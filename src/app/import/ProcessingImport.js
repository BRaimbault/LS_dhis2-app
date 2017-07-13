/*
ProcessingImport.start
# prod & dev path
# Get url and get list.
# Choose between dev and prod paths
# Next action
  -> readFile
  -> getFile

ProcessingImport.getFile
# dev path
# Gets and read file from given dhis2 ressource "importMock" defined in admin / window.config
# Next action
-> initiate

ProcessingImport.readFile
# prod path
# Gets and read file selected by user
# Next action
    -> initiate

ProcessingImport.initiate
# prod & dev path
# Get number of cols and rows
# Next action
    -> iterateOverRows

ProcessingImport.iterateOverRows
# prod & dev path
# Get client object, if empty row go to next row, else start processing
# Next action
    -> iterateOverRows
    -> checkTrackedEntityInstance

ProcessingImport.checkTrackedEntityInstance
# prod & dev path
# Determine if client already exist or not with CUIC
# Next action
    -> Tools.getTrackedEntityInstance
    -> ProcessingImport.newTrackedEntityInstance
    -> ProcessingImport.existingTrackedEntityInstance

ProcessingImport.newTrackedEntityInstance
# prod & dev path
#
# Next action
    -> ProcessingImport.newEnrollment

ProcessingImport.newEnrollment
# prod & dev path
#
# Next action
    -> ProcessingImport.newEvent

ProcessingImport.newEvent
# prod & dev path
#
# Next action
    -> ProcessingImport.

*/


import React from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from 'material-ui/lib/linear-progress';

import Tools from './../Tools';

import Import from './Import';
import ToolsImport from './ToolsImport';

var updates = [];

var ProcessingImport = {
  start: function(e) {

    Tools.getUrl();
    Tools.getList();

    //if(window.e){
    if(true){
      updates = ToolsImport.logger(updates,"---------------------------------------------");
      updates = ToolsImport.logger(updates,"File selected: " + e.target.files[0].name);
      updates = ToolsImport.logger(updates,"ProcessingImport started");
      ProcessingImport.readFile(e);
    }else{
      setTimeout(function () {
        updates = ToolsImport.logger(updates,"---------------------------------------------");
        updates = ToolsImport.logger(updates,"Development mode! A file will be loaded automatically to start processing. Change var e in Tools.js to switch to production mode.");
        updates = ToolsImport.logger(updates,"File selected: " + window.dhisUrl + "documents/" + window.config.ressources.importMock + "/data");
        updates = ToolsImport.logger(updates,"ProcessingImport started");
        ProcessingImport.getFile();
      }, 2000);
    }
  },
  getFile: function() {
    /* set up XMLHttpRequest */

    var url = window.dhisUrl + "api/documents/" + window.config.ressources.importMock + "/data";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function(e) {
      var arraybuffer = xhr.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      window.wbk = XLSX.read(bstr, {type:"binary"});

      updates = ToolsImport.logger(updates,"File loaded in cache");

      ProcessingImport.initiate();
    }
    xhr.send();
  },
  readFile: function(e) {
    console.log("fun ProcessingImport.readFile: e - ", e);
    updates = ToolsImport.logger(updates,"Loading file in cache");
    var files = e.target.files;
    var f = files[0];
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;

      /* if binary string, read with type 'binary' else btoa(arr), {type: 'base64'} */
      window.wbk = XLSX.read(data, {type: 'binary'});

      updates = ToolsImport.logger(updates,"File loaded in cache");
      ProcessingImport.initiate();
    };
    reader.readAsBinaryString(f);
  },
  initiate: function() {

    console.log("fun ProcessingImport.initiate: window.wbk - ", window.wbk);

    if (window.config.ressources.importSheet) {
      window.wbk.SheetNames.forEach(function(sheetName_tmp,sheetNum_tmp) {
        if (window.config.ressources.importSheet == sheetName_tmp) {
          window.wbk.thisSheetNum = sheetNum_tmp;
          window.wbk.thisSheetName = window.wbk.SheetNames[window.wbk.thisSheetNum];
        }
      });
    }else {
      window.wbk.thisSheetNum = 0;
      window.wbk.thisSheetName = window.wbk.SheetNames[window.wbk.thisSheetNum];
    }

    console.log("fun ProcessingImport.initiate: sheet Name/Number - ", window.wbk.thisSheetName, window.wbk.thisSheetNum);

    window.wbk.thisColNum = 0;
    window.wbk.thisRowNum = 0;

    Object.keys(window.wbk.Sheets[window.wbk.thisSheetName]).forEach(function(key) {
      var matched = key.match(/([A-Z]+)([0-9]+)/);

      if (matched && matched.length == 3) {
        var colNum_temp = ToolsImport.lettersToNumbers(matched[1]);
        window.wbk.thisColNum  = Math.max(window.wbk.thisColNum ,colNum_temp);
        var rowNum_temp = JSON.parse(matched[2]);
        window.wbk.thisRowNum = Math.max(window.wbk.thisRowNum,rowNum_temp);
      }

    });
    console.log("fun ProcessingImport.initiate: window.wbk.thisColNum/window.wbk.thisRowNum - ", window.wbk.thisColNum,window.wbk.thisRowNum);


    if (window.config.ressources.importHXL){
      window.wbk.thisRowHXL = 1;
      window.wbk.thisRowHead = 2;
    }else {
      window.wbk.thisRowHXL = 1;
      window.wbk.thisRowHead = 1;
    }

    if (window.wbk.thisRowNum <= 1000 + window.wbk.thisRowHead) {

      updates = ToolsImport.logger(updates,"Starting conversion");

      var headerObject = {};
      for (var j = 1; j < window.wbk.thisColNum; j++) {
        var key = window.wbk.Sheets[window.wbk.thisSheetName]['' + ToolsImport.numbersToLetters(j) + (window.wbk.thisRowHXL) ];
        if (key) {
          headerObject[key.v] = j;
        }
      }
      console.log("fun ProcessingImport.initiate: headerObject - ", headerObject);

      ProcessingImport.iterateOverRows(window.wbk.thisRowHead + 1);

    } else {

      updates = ToolsImport.logger(updates,"ERROR: Importing files of over 1,000 records can result in error if connexion gets interrupted. Try again splitting the file in parts.");
      updates = ToolsImport.logger(updates,"---------------------------------------------");

    }

  },
  iterateOverRows: function(rowNum) {

    console.log("fun ProcessingImport.iterateOverRows - params: rowNum: ", rowNum);

    var progress = (rowNum / window.wbk.thisRowNum) * 100;
    ReactDOM.render((<LinearProgress
      mode="determinate"
      value={progress}
    />), document.getElementById('progress'));

    var clientObj = {};
    if (rowNum <= window.wbk.thisRowNum) {
      for (var j = 1; j < window.wbk.thisColNum; j++) {
        var key = window.wbk.Sheets[window.wbk.thisSheetName]['' + ToolsImport.numbersToLetters(j) + (window.wbk.thisRowHXL) ];
        var value = window.wbk.Sheets[window.wbk.thisSheetName]['' + ToolsImport.numbersToLetters(j) + (window.wbk.thisRowHXL + rowNum) ];
        if (key && value) {
          clientObj[key.v] = value.v;
        }
      }
      if (Object.keys(clientObj).length == 0) {
        updates = ToolsImport.logger(updates,"Row: " + rowNum + "/" + window.wbk.thisRowNum + " - Empty row");
        ProcessingImport.iterateOverRows(rowNum + 1);
      } else {
        clientObj["rowNum"] = rowNum;
        ProcessingImport.checkTrackedEntityInstance(clientObj);
      }
    }else{
      updates = ToolsImport.logger(updates,"END OF PROCESS");
      updates = ToolsImport.logger(updates,"---------------------------------------------");
      console.log("END OF PROCESS");
    }
  },
  checkTrackedEntityInstance: function(clientObj) {
    console.log("fun ProcessingImport.checkTrackedEntityInstance - params: clientObj: ", clientObj);

    var clientCUIC = clientObj[window.config.ressources.CUIC.header];
    var clientOrgUnit = clientObj[window.config.dataPoints["enrollement"].orgUnit];

    updates = ToolsImport.logger(updates,"---------------------------------------------");

    updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - Client creation: [ClientCUIC: " + clientCUIC + " - Council: " + clientOrgUnit + "]");

    Tools.getTrackedEntityInstance("EQ",clientObj, ProcessingImport.newTrackedEntityInstance, ProcessingImport.existingTrackedEntityInstance);

  },
  existingTrackedEntityInstance: function(clientObj,response) {
    console.log("fun ProcessingImport.existingTrackedEntityInstance - params: clientObj: ", clientObj, ", response: ", response);

    updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - WARNING: One or more client(s) with the same CUIC already exist");

    var toCheckList = {};

    /*
    Create object for TEI duplicate check from config:
    {...
    dhis_uid_of_datapoint: xls_header_of_datapoint
    ...}
    */
    Object.keys(window.config.duplicates).forEach(function(key) {
      if (window.config.duplicates[key].toCheck) {
        toCheckList[window.config.duplicates[key].uid] = window.config.duplicates[key].header;
      }
    });

    var matched_tei = undefined;

    // Browse TEIs to check if any matches criteria for duplicate
    response.trackedEntityInstances.forEach(function(tei) {
      var toCheckValue = true;
      tei.attributes.forEach(function(tea) {
        if (toCheckList[tea.attribute]) {
          var element = window.config.dataPoints.enrollement.attributes[toCheckList[tea.attribute]];
          var cond1 = ToolsImport.getElement(element,clientObj,toCheckList[tea.attribute]);
          var cond2 = tea.value;
          toCheckValue = toCheckValue && (cond1 == cond2);
        }
      });
      if (toCheckValue) {
        matched_tei = tei;
      }
    });

    if (matched_tei) {
      updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - WARNING: One or more new event(s) will be added to the client with UID: " + matched_tei.trackedEntityInstance);

      var countryUID = window.config.organisationUnits.adm0.LS.uid;
      var data = null;
      var url = window.dhisUrl + "api/25/enrollments?trackedEntityInstance=" +  matched_tei.trackedEntityInstance + "&ou=" + countryUID + "&ouMode=DESCENDANTS&skipPaging=true";
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if (JSON.parse(this.responseText).enrollments.length == 0) {
            updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - ERROR: [ClientUIC: " + clientObj[window.config.ressources.CUIC.header] + " - This client do not have any enrollment! Please proceed to manual review! This record will be skipped]");
            ProcessingImport.iterateOverRows(clientObj["rowNum"] + 1);
          } else {
            ProcessingImport.checkEvent([clientObj,matched_tei.trackedEntityInstance,JSON.parse(this.responseText).enrollments[0].enrollment,JSON.parse(JSON.stringify(window.config.ressources.stageNames))],false);
          }
        }
      });

      xhr.open("GET", url);
      xhr.send(data);

    } else {
      updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - WARNING: The mandatory parameters (duplicates object in config) are not met with any of the existing clients, a new client will be created with the same CUIC");
      ProcessingImport.newTrackedEntityInstance(clientObj,null);
    }

  },
  newTrackedEntityInstance: function(clientObj,response) {
    console.log("fun ProcessingImport.newTrackedEntityInstance - params: clientObj: ", clientObj, ", response: ", response);

    var url = window.dhisUrl + "api/trackedEntityInstances";

    var clientOrgUnit = clientObj[window.config.dataPoints["enrollement"].orgUnit];

    var temp = ToolsImport.getElements("enrollement",clientObj,"attribute");
    var attributes = temp[0];
    var errors = temp[1];

    if (errors.length > 0) {
      errors.forEach(function(error) {
        console.log("fun ProcessingImport.newTrackedEntityInstance - xlsToDhis/attributes: ", error);
        updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - ERROR: [ClientUIC: " + clientObj[window.config.ressources.CUIC.header] + " - " + error[1] + " " + error[3] + " does not exist for " + error[2] + " datapoint]");
      });
    }

    var payload = {
      "trackedEntity": window.config.ressources.uidTrackedEntity,
      "orgUnit": window.config.organisationUnits.adm2[clientOrgUnit].uid,
      "attributes": attributes,
    };

    console.log("fun ProcessingImport.newTrackedEntityInstance - payload: ", payload);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var clientUID = JSON.parse(this.responseText).response.reference;
        console.log("fun ProcessingImport.newTrackedEntityInstance - clientUID: " + clientUID + " - response: ", JSON.parse(this.responseText));

        ProcessingImport.newEnrollment(clientObj,clientUID)
      }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(payload));

  },
  newEnrollment: function(clientObj,clientUID) {
    console.log("fun ProcessingImport.newEnrollment - params: clientObj: ", clientObj, ", clientUID: ", clientUID);

    var url = window.dhisUrl + "api/enrollments";

    var clientOrgUnit = clientObj[window.config.dataPoints["enrollement"].orgUnit];
    var enrollmentDate = ToolsImport.excelDateToJSDate(clientObj[window.config.dataPoints["enrollement"].date]);

    var clientKeys = Object.keys(clientObj);

    var payload = {"enrollments":[ {
        "trackedEntityInstance": clientUID,
        "orgUnit": window.config.organisationUnits.adm2[clientOrgUnit].uid,
        "program": window.config.ressources.uidProgram,
        "enrollmentDate": enrollmentDate,
        "incidentDate": enrollmentDate,
     } ]};

     console.log("fun ProcessingImport.newEnrollment - payload: ", payload);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {

        var enrollentUID = JSON.parse(this.responseText).response.importSummaries[0].reference;
        console.log("fun ProcessingImport.newEnrollment - response: ", JSON.parse(this.responseText));
        updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - Client enrolled: [ClientUID: " + clientUID + " - EnrollmentUID: " + enrollentUID + "]");

        ProcessingImport.checkEvent([clientObj,clientUID,enrollentUID,JSON.parse(JSON.stringify(window.config.ressources.stageNames))],false);

      }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(payload));

  },
  checkEvent: function(arrayArgs,lastEventWasDuplicate) {

    var clientObj = arrayArgs[0];
    var clientUID = arrayArgs[1];
    var enrollentUID = arrayArgs[2];
    var programStageList = arrayArgs[3];
    console.log("fun ProcessingImport.checkEvent - params: clientObj: ", clientObj, ", clientUID: ", clientUID, ", enrollentUID: ", enrollentUID, ", programStageList: ", programStageList, ", lastEventWasDuplicate: ", lastEventWasDuplicate);

    if (lastEventWasDuplicate) {
      updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - ERROR: [ClientUIC: " + clientObj[window.config.ressources.CUIC.header] + " - This event could not be created, an event of the SAME TYPE already existed for the SAME DATE]");

    }
    // Check if we still have stages to import
    if (programStageList.length == 0) {

      ProcessingImport.iterateOverRows(clientObj["rowNum"] + 1);

    } else {

      var programStageName = programStageList.shift();

      updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - Event creation: [Stage name: " + programStageName + "]");


      // Check if we already have a existing event for the same date
      var programStage = window.config.dataPoints[programStageName].uid;
      var eventDate = ToolsImport.excelDateToJSDate(clientObj[window.config.dataPoints[programStageName].date]); //OK

      var eventAlreadyExists = ToolsImport.checkEvents(clientUID,eventDate,programStage,
        ProcessingImport.checkEvent,[clientObj,clientUID,enrollentUID,programStageList],
        ProcessingImport.newEvent,[clientObj,clientUID,enrollentUID,[programStageName].concat(programStageList)]);
    }

  },
  newEvent: function(arrayArgs, lastEventWasDuplicate) {
    var clientObj = arrayArgs[0];
    var clientUID = arrayArgs[1];
    var enrollentUID = arrayArgs[2];
    var programStageList = arrayArgs[3];

    console.log("fun ProcessingImport.newEvent - params: clientObj: ", clientObj, ", clientUID: ", clientUID, ", enrollentUID: ", enrollentUID, ", programStageList: ", programStageList, ", lastEventWasDuplicate: ", lastEventWasDuplicate);

    var programStageName = programStageList.shift();

    var programStage = window.config.dataPoints[programStageName].uid;
    var eventDate = ToolsImport.excelDateToJSDate(clientObj[window.config.dataPoints[programStageName].date]); //OK

    // Import dataElements
    var url = window.dhisUrl + "api/events";

    var clientOrgUnit = clientObj[window.config.dataPoints[programStageName].orgUnit];

    var temp = ToolsImport.getElements(programStageName,clientObj,'dataElement');
    var dataElements = temp[0];
    var errors = temp[1];

    if (errors.length > 0) {
      errors.forEach(function(error) {
        console.log("fun ProcessingImport.newEvent - xlsToDhis/dataElement: ", error);
        updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - ERROR: [ClientUIC: " + clientObj[window.config.ressources.CUIC.header] + " - " + error.value[1] + " " + error.value[3] + " does not exist for " + error.value[2] + " datapoint]");
      });
    }

    // Check if we have dataElements
    if (dataElements.length == 0) {

      updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - WARNING: Event creation: [ClientUID: " + clientUID + " - EventName: " + programStageName +" - no dataElements to import]");


      ProcessingImport.checkEvent([clientObj,clientUID,enrollentUID,programStageList],lastEventWasDuplicate);

    } else {

      var workerID = clientObj[window.config.dataPoints[programStageName].attribution]; //OK

      if (window.config.psiWorkers[workerID]) {
        var attributeCategoryOptions = window.config.psiWorkers[workerID].uid; //OK - Configure
      }else {
        updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - ERROR: [ClientUIC: " + clientObj[window.config.ressources.CUIC.header] + " - psiWorker ID: " + workerID + " is not setup in the system you will have to do the setup and try re-import this record]");
      }

      var payload = {
        "events":
          [ {
            "trackedEntityInstance": clientUID, //OK
            "program": window.config.ressources.uidProgram, //OK
            "programStage": programStage, //OK
            "enrollment": enrollentUID, //OK
            "orgUnit": window.config.organisationUnits.adm2[clientOrgUnit].uid, //OK
            "eventDate": eventDate, //OK
            "status": "COMPLETED", // OK
            "attributeCategoryOptions": attributeCategoryOptions, //OK - Configure
            "dataValues": dataElements, //OK - Configure
          } ]
        };

      console.log("fun ProcessingImport.newEvent - payload: ", payload);

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

          var eventUID = JSON.parse(this.responseText).response.importSummaries[0].reference;

          console.log("fun ProcessingImport.newEvent - response/dataElements: ", JSON.parse(this.responseText));

          updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - Event created: [ClientUID: " + clientUID + " - EventUID: " + eventUID + " - EventName: " + programStageName +" - dataElements imported]");

          // Import attributes
          var temp = ToolsImport.getElements(programStageName,clientObj,"attribute");
          var attributes = temp[0];
          var errors = temp[1];

          if (errors.length > 0) {
            errors.forEach(function(error) {
              console.log("fun ProcessingImport.newEvent - xlsToDhis/attributes: ", error);
              updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - ERROR: [ClientUIC: " + clientObj[window.config.ressources.CUIC.header] + " - " + error[1] + " " + error[3] + " does not exist for " + error[2] + " datapoint]");
            });
          }

          // Check if we have attributes
          if (attributes.length == 0) {

            updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - WARNING: Event creation: [ClientUID: " + clientUID + " - EventName: " + programStageName +" - no attributes to import]");


            ProcessingImport.checkEvent([clientObj,clientUID,enrollentUID,programStageList],lastEventWasDuplicate);

          } else {

            var payload = null;
            var url = window.dhisUrl + "api/25/trackedEntityInstances/" + clientUID + ".json";

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
          	xhr.onreadystatechange = function() {

          		if (this.readyState == 4) {

                  var response = JSON.parse(this.responseText);

                  // Check if we already have trackedEntityInstances
                  if (response.attributes.length > 0) {
                    response.attributes = response.attributes.concat(attributes);
                  }

                  var url = window.dhisUrl + "api/25/trackedEntityInstances/" + clientUID;

                  var payload = response;

                  var xhr = new XMLHttpRequest();
                  xhr.withCredentials = true;

                  xhr.addEventListener("readystatechange", function() {
                    if (this.readyState === 4) {

                      console.log("fun ProcessingImport.newEvent - response/attributes: ", JSON.parse(this.responseText));
                      updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - Event created: [ClientUID: " + clientUID + " - EventName: " + programStageName +" - attributes imported]");

                      ProcessingImport.checkEvent([clientObj,clientUID,enrollentUID,programStageList],lastEventWasDuplicate);
                    }
                  });

                  xhr.open("PUT", url);
                  xhr.setRequestHeader("content-type", "application/json");
                  xhr.send(JSON.stringify(payload));

                }
          		}

              xhr.open("GET", url, true);
              xhr.send(payload);
            }

          }
        });

        xhr.open("POST", url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(payload));
      }
    }
};

export default ProcessingImport;
