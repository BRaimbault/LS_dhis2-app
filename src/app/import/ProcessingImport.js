import React from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from 'material-ui/lib/linear-progress';

import Tools from './../Tools';

import Import from './Import';
import Lists from './Lists';
import ToolsImport from './ToolsImport';

var updates = [];

var ProcessingImport = {
  start: function(e) {
    if(e){
      console.log('prod_path');
      window.dhisUrl = window.location.href.split('apps/')[0];
      //window.dhisUrl = "http://localhost:8989/dhis/api/";
      console.log("window.dhisUrl: ", window.dhisUrl);
      updates = ToolsImport.logger(updates,"---------------------------------------------");
      updates = ToolsImport.logger(updates,"File selected: " + e.target.files[0].name);
      updates = ToolsImport.logger(updates,"ProcessingImport started");
      ProcessingImport.readFile(e);
    }else{
      console.log('dev_path');
      window.dhisUrl = "http://localhost:8989/dhis/api/";
      console.log("window.dhisUrl: ", window.dhisUrl);

      setTimeout(function () {
        updates = ToolsImport.logger(updates,"---------------------------------------------");
        updates = ToolsImport.logger(updates,"Development mode! A file will be loaded automatically to start processing. Change var dev to false in Import.js to switch to production.");
        updates = ToolsImport.logger(updates,"File selected: " + window.dhisUrl + "documents/Zacj6Ykgyox/data");
        updates = ToolsImport.logger(updates,"ProcessingImport started");
        ProcessingImport.getFile();
      }, 2000);
    }
  },
  getFile: function() {
    /* set up XMLHttpRequest */
    var url = window.dhisUrl + "documents/TY1MTzxgeWw/data";
    var oReq = new XMLHttpRequest();
    oReq.withCredentials = true;
    oReq.open("GET", url, true);
    oReq.setRequestHeader("authorization", "Basic YnJhaW1iYXVsdDpEaXN0cmljdDg4");
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      window.wbk = XLSX.read(bstr, {type:"binary"});

      updates = ToolsImport.logger(updates,"File loaded in cache");
      ProcessingImport.initiate();
    }
    oReq.send();
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
    updates = ToolsImport.logger(updates,"Starting conversion");
    console.log("fun ProcessingImport.initiate: window.wbk - ", window.wbk);
    var sheetName = window.wbk.SheetNames[0];
    var rowHXL = 1;
    var rowHead = 2;
    var colLength = parseInt(window.wbk.Sheets[sheetName]["!ref"].match(/:[A-Z]+([0-9]+)/)[1]);//["!autofilter"].ref
    //var colLength = 11;
    var rowLength = ToolsImport.lettersToNumbers(window.wbk.Sheets[sheetName]["!ref"].match(/:([A-Z]+)/)[1]); //["!autofilter"].ref
    var headerObject = {};
    for (var j = 1; j < rowLength; j++) {
      var key = window.wbk.Sheets[sheetName]['' + ToolsImport.numbersToLetters(j) + (rowHXL) ];
      if (key) {
        headerObject[key.v] = j;
      }
    }
    console.log("fun ProcessingImport.initiate: headerObject - ", headerObject);
    ProcessingImport.iterateOverRows(rowHead + 1,colLength + 1);

  },
  iterateOverRows: function(rowNum,rowMax) {
    console.log("fun ProcessingImport.iterateOverRows - params: rowNum: ", rowNum, " rowMax: ", rowMax);

    var progress = (rowNum / rowMax) * 100;
    ReactDOM.render((<LinearProgress
      mode="determinate"
      value={progress}
    />), document.getElementById('progress'));
    var sheetName = window.wbk.SheetNames[0];
    var rowHXL = 1;
    var rowHead = 2;
    var rowLength = ToolsImport.lettersToNumbers(window.wbk.Sheets[sheetName]["!ref"].match(/:([A-Z]+)/)[1]); //["!autofilter"].ref
    var clientObj = {};
    if (rowNum <= rowMax) {
      for (var j = 1; j < rowLength; j++) {
        var key = window.wbk.Sheets[sheetName]['' + ToolsImport.numbersToLetters(j) + (rowHXL) ];
        var value = window.wbk.Sheets[sheetName]['' + ToolsImport.numbersToLetters(j) + (rowHXL + 1 + rowNum) ];
        if (key && value) {
          clientObj[key.v] = value.v;
        }
      }
      if (Object.keys(clientObj).length == 0) {
        updates = ToolsImport.logger(updates,"" + rowNum + "/" + rowMax + " - Empty row");
        ProcessingImport.iterateOverRows(rowNum + 1,rowMax);
      } else {
        clientObj["rowNum"] = rowNum;
        clientObj["rowMax"] = rowMax;
        ProcessingImport.checkTrackedEntityInstance(clientObj);
      }
    }else{
      console.log("THE END");
    }
  },
  checkTrackedEntityInstance: function(clientObj) {
    console.log("fun ProcessingImport.checkTrackedEntityInstance - params: clientObj: ", clientObj);

    Tools.getTrackedEntityInstance("EQ",clientObj,ProcessingImport.newTrackedEntityInstance,ProcessingImport.existingTrackedEntityInstance)
  },
  existingTrackedEntityInstance: function(clientObj,response) {
    console.log("fun ProcessingImport.existingTrackedEntityInstance - params: clientObj: ", clientObj, ", response: ", response);

    var clientCUIC = clientObj["#attr+client+id+cuic"];
    var clientOldID = clientObj["#attr+client+id+snold"];
    var clientOU = clientObj["#ou+adm2"];
    updates = ToolsImport.logger(updates,"" + clientObj["rowNum"] + "/" + clientObj["rowMax"] + "  - Client NOT created - A trackedEntityInstance with the same OldID already exits: [ClientCUIC: " + clientCUIC + " - ClientOldID: " + clientOldID + " - Community Council: " + clientOU + "]");
    ProcessingImport.iterateOverRows(clientObj["rowNum"] + 1,clientObj["rowMax"]);
  },
  newTrackedEntityInstance: function(clientObj,response) {
    console.log("fun ProcessingImport.newTrackedEntityInstance - params: clientObj: ", clientObj, ", response: ", response);

    var url = window.dhisUrl + "trackedEntityInstances";
    var trackedEntity = "MCPQUTHX1Ze";
    var clientOU = clientObj["#ou+adm2"];
    var orgUnit = Lists.orgUnits["#ou+adm2"][clientOU].uid;
    var program = "KDgzpKX3h2S";
    var enrollmentDate = ToolsImport.excelDateToJSDate(clientObj["#date+enrollment"]);
    var attributes = ToolsImport.getElements("Client Information",clientObj,"attribute");

    var payload = {
      "trackedEntity": trackedEntity,
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
        var clientUID = JSON.parse(this.responseText).response.reference;
        console.log("fun ProcessingImport.newTrackedEntityInstance - response: ", JSON.parse(this.responseText));
        updates = ToolsImport.logger(updates,"" + clientObj["rowNum"] + "/" + clientObj["rowMax"] + " - Client created: [ClientUID: " + clientUID + " - ClientCUIC: " + clientCUIC + " - ClientOldID: " + clientOldID + " - Community Council: " + clientOU + "]");

        ProcessingImport.newEnrollment(clientObj,clientUID)
      }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    //console.log(JSON.stringify(payload));
    xhr.send(JSON.stringify(payload));

  },
  newEnrollment: function(clientObj,clientUID) {
    console.log("fun ProcessingImport.newEnrollment - params: clientObj: ", clientObj, ", clientUID: ", clientUID);

    var url = window.dhisUrl + "enrollments";
    var trackedEntity = "MCPQUTHX1Ze";
    var clientOU = clientObj["#ou+adm2"];
    var orgUnit = Lists.orgUnits["#ou+adm2"][clientOU].uid;
    var program = "KDgzpKX3h2S";
    var enrollmentDate = ToolsImport.excelDateToJSDate(clientObj["#date+enrollment"]);

    var clientKeys = Object.keys(clientObj);

    var payload = {"enrollments":[ {
        "trackedEntityInstance": clientUID,
        "orgUnit": orgUnit,
        "program": program,
        "enrollmentDate": enrollmentDate,
        "incidentDate": enrollmentDate,
     } ]};


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var clientCUIC = clientObj["#attr+client+id+cuic"];
        var clientOldID = clientObj["#attr+client+id+snold"];
        var enrollentUID = JSON.parse(this.responseText).response.importSummaries[0].reference;
        console.log("fun ProcessingImport.newEnrollment - response: ", JSON.parse(this.responseText));
        updates = ToolsImport.logger(updates,"" + clientObj["rowNum"] + "/" + clientObj["rowMax"] + " - Client enrolled: [ClientUID: " + clientUID + " - EnrollmentUID: " + enrollentUID + "]");

        ProcessingImport.newEvent(clientObj,clientUID,enrollentUID,["Testing","ART Referral - Opening","ART Referral - Closure","Contact Log"]);
      }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    //console.log(JSON.stringify(payload));
    xhr.send(JSON.stringify(payload));

  },
  newEvent: function(clientObj,clientUID,enrollentUID,programStageList) {
    console.log("fun ProcessingImport.newEvent - params: clientObj: ", clientObj, ", clientUID: ", clientUID, ", enrollentUID: ", enrollentUID, ", programStageList: ", programStageList);

    if (programStageList.length == 0) {

      ProcessingImport.iterateOverRows(clientObj["rowNum"] + 1,clientObj["rowMax"]);
    } else {

      var url = window.dhisUrl + "events";
      var trackedEntity = "MCPQUTHX1Ze";
      var clientOU = clientObj["#ou+adm2"];
      var orgUnit = Lists.orgUnits["#ou+adm2"][clientOU].uid;
      var program = "KDgzpKX3h2S";
      var programStageName = programStageList.shift();
      var programStage = Lists.stages[programStageName].uid;

      var dataValues = ToolsImport.getElements(programStageName,clientObj,'dataElement');

      if (dataValues.length == 0) {

        ProcessingImport.newEvent(clientObj,clientUID,enrollentUID,programStageList);
      } else {

        var eventDate = ToolsImport.excelDateToJSDate(clientObj[Lists.stages[programStageName].date]);
        var workerID = clientObj[Lists.stages[programStageName].attribution];
        var attributeCategoryOptions = Lists["#psiworker+id"][workerID].uid;

        var payload = {"events":[ {
          "trackedEntityInstance": clientUID,
          "program": program,
          "programStage": programStage,
          "enrollment": enrollentUID,
          "orgUnit": orgUnit,
          "eventDate": eventDate,
          "status": "ACTIVE", // ?
          "attributeCategoryOptions": attributeCategoryOptions,
          "dataValues": dataValues,
        } ]};

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            var clientCUIC = clientObj["#attr+client+id+cuic"];
            var clientOldID = clientObj["#attr+client+id+snold"];
            var eventUID = JSON.parse(this.responseText).response.importSummaries[0].reference;
            console.log("fun ProcessingImport.newEvent - response/dataElements: ", JSON.parse(this.responseText));
            updates = ToolsImport.logger(updates,"" + clientObj["rowNum"] + "/" + clientObj["rowMax"] + " - Event created: [ClientUID: " + clientUID + " - EventUID: " + eventUID + " - EventName: " +programStageName +" - dataValues imported]");

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
                      var orgUnit = Lists.orgUnits["#ou+adm2"][clientOU].uid;
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
      }
    }

  },
};

export default ProcessingImport;
