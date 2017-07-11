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

    if(window.e){
      updates = ToolsImport.logger(updates,"---------------------------------------------");
      updates = ToolsImport.logger(updates,"File selected: " + e.target.files[0].name);
      updates = ToolsImport.logger(updates,"ProcessingImport started");
      ProcessingImport.readFile(window.e);
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
        updates = ToolsImport.logger(updates,"" + rowNum + "/" + window.wbk.thisRowNum + " - Empty row");
        ProcessingImport.iterateOverRows(rowNum + 1);
      } else {
        clientObj["rowNum"] = rowNum;
        ProcessingImport.checkTrackedEntityInstance(clientObj);
      }
    }else{
      updates = ToolsImport.logger(updates,"All the records were imported successfully!");
      updates = ToolsImport.logger(updates,"---------------------------------------------");
      console.log("THE END");
    }
  },
  checkTrackedEntityInstance: function(clientObj) {
    console.log("fun ProcessingImport.checkTrackedEntityInstance - params: clientObj: ", clientObj);

    var clientCUIC = clientObj[window.config.ressources.CUIC.header];
    var clientOrgUnit = clientObj[window.config.dataPoints["enrollement"].orgUnit];
    updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + window.wbk.thisRowNum + " - Client creation: [ClientCUIC: " + clientCUIC + " - Council: " + clientOrgUnit + "]");

    Tools.getTrackedEntityInstance("EQ",clientObj,
      ProcessingImport.newTrackedEntityInstance,
      ProcessingImport.existingTrackedEntityInstance
    );

  },
  existingTrackedEntityInstance: function(clientObj,response) {
    console.log("fun ProcessingImport.existingTrackedEntityInstance - params: clientObj: ", clientObj, ", response: ", response);

    updates = ToolsImport.logger(updates,"WARNING: One or more client(s) with the same CUIC already exist");

    var toCheckList = {};

    Object.keys(window.config.duplicates).forEach(function(key) {
      if (window.config.duplicates[key].toCheck) {
        toCheckList[window.config.duplicates[key].uid] = window.config.duplicates[key].header;
      }
    });

    console.log(toCheckList);
    var matched_tei = undefined;


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
      console.log("toCheckValue" , toCheckValue);
      if (toCheckValue) {
        matched_tei = tei;
      }
    });

    if (matched_tei) {
      updates = ToolsImport.logger(updates,"WARNING: One or more new event(s) will be added to the client with UID: " + matched_tei.trackedEntityInstance);

      var countryUID = window.config.organisationUnits.adm0.LS.uid;
      var data = null;
      var url = "http://localhost:8989/dhis/api/25/enrollments?trackedEntityInstance=" +  matched_tei.trackedEntityInstance + "&ou=" + countryUID + "&ouMode=DESCENDANTS&skipPaging=true";
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(JSON.parse(this.responseText));
          if (JSON.parse(this.responseText).enrollments.length == 0) {
            updates = ToolsImport.logger(updates,"ERROR: This client do not have any enrollment! Please proceed to manual review! This record will be skipped.");
            ProcessingImport.iterateOverRows(clientObj["rowNum"] + 1);
          } else {
            ProcessingImport.newEvent(clientObj,matched_tei.trackedEntityInstance,JSON.parse(this.responseText).enrollments[0].enrollment,window.config.ressources.stagesNames);
          }
        }
      });

      xhr.open("GET", url);
      xhr.send(data);


    } else {
      updates = ToolsImport.logger(updates,"WARNING: The mandatory parameters (duplicates object in config) are not met with any of the existing clients, a new client will be created");
      ProcessingImport.newTrackedEntityInstance(clientObj,null);
    }

  },
  newTrackedEntityInstance: function(clientObj,response) {
    console.log("fun ProcessingImport.newTrackedEntityInstance - params: clientObj: ", clientObj, ", response: ", response);

    var url = window.dhisUrl + "api/trackedEntityInstances";

    var clientOrgUnit = clientObj[window.config.dataPoints["enrollement"].orgUnit];
    var attributes = ToolsImport.getElements("enrollement",clientObj,"attribute");


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
        "orgUnit": clientOrgUnit,
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

        ProcessingImport.newEvent(clientObj,clientUID,enrollentUID,window.config.ressources.stagesNames);

      }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(payload));

  },
  newEvent: function(clientObj,clientUID,enrollentUID,programStageList) {
    console.log("fun ProcessingImport.newEvent - params: clientObj: ", clientObj, ", clientUID: ", clientUID, ", enrollentUID: ", enrollentUID, ", programStageList: ", programStageList);

    if (programStageList.length == 0) {

      ProcessingImport.iterateOverRows(clientObj["rowNum"] + 1,clientObj["rowMax"]);
    } else {

      var url = window.dhisUrl + "api/events";

      var programStageName = programStageList.shift();
      var programStage = window.config.dataPoints[programStageName].uid;
      var clientOrgUnit = clientObj[window.config.dataPoints["enrollement"].orgUnit];

      var dataValues = ToolsImport.getElements(programStageName,clientObj,'dataElement');

      console.log(dataValues);

      if (dataValues.length == 0) {

        ProcessingImport.newEvent(clientObj,clientUID,enrollentUID,programStageList);

      } else {

        var eventDate = ToolsImport.excelDateToJSDate(clientObj[window.config.dataPoints[programStageName].date]); //OK
        var workerID = clientObj[window.config.dataPoints[programStageName].attribution]; //OK

        // TODO MANAGE CASE WHEN COUNSELLOR NOT SETUP
        var attributeCategoryOptions = window.config.psiWorkers[workerID].uid; //OK - Configure

        var payload = {"events":[ {
          "trackedEntityInstance": clientUID, //OK
          "program": window.config.ressources.uidProgram, //OK
          "programStage": programStage, //OK
          "enrollment": enrollentUID, //OK
          "orgUnit": window.config.organisationUnits.adm2[clientOrgUnit].uid, //OK
          "eventDate": eventDate, //OK
          "status": "ACTIVE", // ?
          "attributeCategoryOptions": attributeCategoryOptions, //OK - Configure
          "dataValues": dataValues, //OK - Configure
        } ]};

        console.log("fun ProcessingImport.newEvent - payload: ", payload);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        /*
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            var clientCUIC = clientObj["#attr+client+id+cuic"];
            var clientOldID = clientObj["#attr+client+id+snold"];
            var eventUID = JSON.parse(this.responseText).response.importSummaries[0].reference;
            console.log("fun ProcessingImport.newEvent - response/dataElements: ", JSON.parse(this.responseText));
            updates = ToolsImport.logger(updates,"Row: " + clientObj["rowNum"] + "/" + clientObj["rowMax"] + " - Event created: [ClientUID: " + clientUID + " - EventUID: " + eventUID + " - EventName: " +programStageName +" - dataValues imported]");

            var attributes = ToolsImport.getElements(programStageName,clientObj,"attribute");

            if (true) {
            //if (attributes.length == 0) {

              ProcessingImport.newEvent(clientObj,clientUID,enrollentUID,programStageList);
            } else {

              var payload = null;
              var url = window.dhisUrl + "trackedEntityInstances.json?filter=" + window.OldID + ":EQ:"+ clientOldID +"&ou=vJNI6blhosr&ouMode=DESCENDANTS&trackedEntity=MCPQUTHX1Ze&skipPaging=true";
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;
              xhr.open("GET", url, true);
            	xhr.onreadystatechange = function() {
            		if (this.readyState == 4) {
                    var response = JSON.parse(this.responseText);
                    if (response.trackedEntityInstances.length == 0) {

                      console.log(response);

                      var url = window.dhisUrl + "trackedEntityInstances";
                      var trackedEntity = "MCPQUTHX1Ze";
                      var orgUnit = window.config.organisationUnits["#ou+adm2"][clientOU].uid;
                      var program = "KDgzpKX3h2S";
                      var enrollmentDate = ToolsImport.excelDateToJSDate(clientObj["#date+enrollment"]);

                      var payload = {
                        "trackedEntity": trackedEntity,
                        "trackedEntityInstance": clientUID,
                        "orgUnit": orgUnit,
                        "attributes": attributes,
                      };

                      var xhr = new XMLHttpRequest();
                      xhr.withCredentials = true;

                      xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                          var clientCUIC = clientObj["#attr+client+id+cuic"];
                          var clientOldID = clientObj["#attr+client+id+snold"];
                          var clientOU = clientObj["#ou+adm2"];
                          //var clientUID = JSON.parse(this.responseText).response.reference;
                          console.log("fun ProcessingImport.newEvent - response/attributes: ", JSON.parse(this.responseText));
                          updates = ToolsImport.logger(updates,"" + clientObj["rowNum"] + "/" + clientObj["rowMax"] + " - Event created: [ClientUID: " + clientUID + " - EventUID: " + eventUID + " - EventName: " +programStageName +" - attributes imported]");

                          ProcessingImport.newEvent(clientObj,clientUID,enrollentUID,programStageList);
                        }
                      });

                      xhr.open("POST", url);
                      xhr.setRequestHeader("content-type", "application/json");
                      //console.log(JSON.stringify(payload));
                      xhr.send(JSON.stringify(payload));
                    }else {
                      console.log("fun ProcessingImport.newEvent - ERROR");
                    }
            		}
            	};
              xhr.send(payload);


            }
          }
        });

        xhr.open("POST", url);
        xhr.setRequestHeader("content-type", "application/json");
        //console.log(JSON.stringify(payload));
        xhr.send(JSON.stringify(payload));
        */
      }
    }

  },
};

export default ProcessingImport;
