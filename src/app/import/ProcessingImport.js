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
      updates = ToolsImport.logger(updates,"---------------------------------------------");
      updates = ToolsImport.logger(updates,"File selected: " + e.target.files[0].name);
      updates = ToolsImport.logger(updates,"ProcessingImport started");
      ProcessingImport.readFile(e);
    }else{
      console.log('dev_path');
      setTimeout(function () {
        updates = ToolsImport.logger(updates,"---------------------------------------------");
        updates = ToolsImport.logger(updates,"Development mode! A file will be loaded automatically to start processing. Change var dev to false in Import.js to switch to production.");
        updates = ToolsImport.logger(updates,"File selected: http://localhost:8989/dhis/api/documents/Zacj6Ykgyox/data");
        updates = ToolsImport.logger(updates,"ProcessingImport started");
        ProcessingImport.getFile();
      }, 2000);
    }
  },
  getFile: function() {
    /* set up XMLHttpRequest */
    var url = "http://localhost:8989/dhis/api/documents/Zacj6Ykgyox/data";
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
      ProcessingImport.conversion();
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
      ProcessingImport.conversion();
    };
    reader.readAsBinaryString(f);
  },
  conversion: function() {
    updates = ToolsImport.logger(updates,"Starting conversion");
    console.log("fun ProcessingImport.conversion: window.wbk - ", window.wbk);
    var sheetName = window.wbk.SheetNames[0];
    var rowHXL = 2;
    var rowHead = 3;
    //var colLength = parseInt(window.wbk.Sheets[sheetName]["!autofilter"].ref.match(/:[A-Z]+([0-9]+)/)[1]);
    var colLength = 50;
    console.log(rowLength);
    var rowLength = ToolsImport.lettersToNumbers(window.wbk.Sheets[sheetName]["!autofilter"].ref.match(/:([A-Z]+)/)[1]);
    console.log(colLength);
    var headerObject = {};
    for (var j = 1; j < rowLength; j++) {
      var key = window.wbk.Sheets[sheetName]['' + ToolsImport.numbersToLetters(j) + (rowHead) ];
      if (key) {
        headerObject[key.v] = j;
      }
    }
    console.log("fun ProcessingImport.conversion: headerObject - ", headerObject);
    ProcessingImport.iterateOverRows(rowHead + 1,colLength);

  },
  iterateOverRows: function(rowNum,rowMax) {
    var progress = (rowNum / rowMax) * 100;
    ReactDOM.render((<LinearProgress
      mode="determinate"
      value={progress}
    />), document.getElementById('progress'));
    var sheetName = window.wbk.SheetNames[0];
    var rowHead = 3;
    var rowLength = parseInt(window.wbk.Sheets[sheetName]["!autofilter"].ref.match(/:[A-Z]+([0-9]+)/)[1]);
    var clientObj = {};
    if (rowNum <= rowMax) {
      for (var j = 1; j < rowLength; j++) {
        var key = window.wbk.Sheets[sheetName]['' + ToolsImport.numbersToLetters(j) + (rowHead) ];
        var value = window.wbk.Sheets[sheetName]['' + ToolsImport.numbersToLetters(j) + (rowHead + 1 + rowNum) ];
        if (key && value) {
          clientObj[key.v] = value.v;
        }
      }
      clientObj["rowNum"] = rowNum;
      clientObj["rowMax"] = rowMax;
      ProcessingImport.checkTrackedEntityInstance(clientObj);
      console.log("fun ProcessingImport.conversion: clientObj - ", clientObj);
    }else{
      console.log("THE END");
    }
  },
  checkTrackedEntityInstance: function(clientObj) {
    Tools.getTrackedEntityInstance("EQ",clientObj,ProcessingImport.newTrackedEntityInstance,ProcessingImport.existingTrackedEntityInstance)
  },
  existingTrackedEntityInstance: function(clientObj,response) {
    var clientCUIC = clientObj["CUIC"];
    var clientOldID = clientObj["ClientCode"];
    updates = ToolsImport.logger(updates,"" + clientObj["rowNum"] + "/" + clientObj["rowMax"] + "  - Client NOT imported - A trackedEntityInstance with the same OldID already exits: [ClientCUIC: " + clientCUIC + " - ClientOldID: " + clientOldID + " - Community Council: " + clientObj["Community Council"] + "]");
    ProcessingImport.iterateOverRows(clientObj["rowNum"] + 1,clientObj["rowMax"]);
  },
  newTrackedEntityInstance: function(clientObj,response) {
    var url = "http://localhost:8989/dhis/api/trackedEntityInstances";
    var trackedEntity = "MCPQUTHX1Ze";
    var orgUnit = Lists.orgUnits["Community Council"][clientObj["Community Council"]].uid;
    var program = "KDgzpKX3h2S";
    var enrollmentDate = ToolsImport.excelDateToJSDate(clientObj["Date of Visit"]);

    var clientKeys = Object.keys(clientObj);
    var attributes = [];
    clientKeys.forEach(function(key) {
      if (Lists.trackedEntityAttributes[key]) {
        attributes.push({
          "attribute": Lists.trackedEntityAttributes[key].uid,
          "value": Lists.trackedEntityAttributes[key].evaluate(clientObj[key])
        });
      }
    });

    var payload = {
      "trackedEntity": trackedEntity,
      "orgUnit": orgUnit,
      "attributes": attributes,
    };

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var clientCUIC = clientObj["CUIC"];
        var clientOldID = clientObj["ClientCode"];
        var clientUID = JSON.parse(this.responseText).response.reference;
        console.log("fun ToolsImport.newTrackedEntityInstance: ", JSON.parse(this.responseText));
        updates = ToolsImport.logger(updates,"" + clientObj["rowNum"] + "/" + clientObj["rowMax"] + " - Client imported: [ClientUID: " + clientUID + " - ClientCUIC: " + clientCUIC + " - ClientOldID: " + clientOldID + " - Community Council: " + clientObj["Community Council"] + "]");
        ProcessingImport.newEnrollment(clientObj,clientUID)
      }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    //console.log(JSON.stringify(payload));
    xhr.send(JSON.stringify(payload));

  },
  newEnrollment: function(clientObj,clientUID) {
    var url = "http://localhost:8989/dhis/api/enrollments";
    var trackedEntity = "MCPQUTHX1Ze";
    var orgUnit = Lists.orgUnits["Community Council"][clientObj["Community Council"]].uid;
    var program = "KDgzpKX3h2S";
    var enrollmentDate = ToolsImport.excelDateToJSDate(clientObj["Date of Visit"]);

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
        var clientCUIC = clientObj["CUIC"];
        var clientOldID = clientObj["ClientCode"];
        var enrollentUID = JSON.parse(this.responseText).response.importSummaries[0].reference;
        console.log("fun ToolsImport.newEnrollment: ", JSON.parse(this.responseText));
        updates = ToolsImport.logger(updates,"" + clientObj["rowNum"] + "/" + clientObj["rowMax"] + " - Client enrolled: [ClientUID: " + clientUID + " - EnrollmentUID: " + enrollentUID + "]");
        ProcessingImport.iterateOverRows(clientObj["rowNum"] + 1,clientObj["rowMax"]);
      }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    //console.log(JSON.stringify(payload));
    xhr.send(JSON.stringify(payload));

  },
};

export default ProcessingImport;
