import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  log: {
    margin: 10,
  }
};

var ToolsImport = {
  logger: function(updates,update) {
    var now = new Date();
    updates.unshift(now.toUTCString() + ' - ' + update);
    ReactDOM.render(<code style={styles.log} >{updates.map(function(update, i) {
      return (<p key={'update_'+i} >{update}</p>);
    })}</code>, document.getElementById('logStateImport'));
    return updates;
  },
  fixdata: function(data) {
    var o = "", l = 0, w = 10240;
    for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
    o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
    return o;
  },
  numbersToLetters: function(num) {
    for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
      ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
    }
    return ret;
  },
  lettersToNumbers: function(string) {
    string = string.toUpperCase();
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', sum = 0, i;
    for (i = 0; i < string.length; i++) {
        sum += Math.pow(letters.length, i) * (letters.indexOf(string.substr(((i + 1) * -1), 1)) + 1);
    }
    return sum;
  },
  excelDateToJSDate: function(serial) {
    if (isFinite(serial)) {
      var utc_days  = Math.floor(serial - 25569);
      var utc_value = utc_days * 86400;
      var date_info = new Date(utc_value * 1000);
      var fractional_day = serial - Math.floor(serial) + 0.0000001;
      var total_seconds = Math.floor(86400 * fractional_day);
      var seconds = total_seconds % 60;
      total_seconds -= seconds;
      var hours = Math.floor(total_seconds / (60 * 60));
      var minutes = Math.floor(total_seconds / 60) % 60;
      var date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);

      var dhisYear = date.getFullYear();
      var dhisMonth = date.getMonth() + 1;
      dhisMonth = dhisMonth < 10 ? "0" + dhisMonth : dhisMonth;
      var dhisDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return "" + dhisYear + "-" + dhisMonth + "-" + dhisDate;

    } else {
      var dateArray = serial.split("/");
      console.log(dateArray);
      if (dateArray.length == 3 && dateArray[0].length == 2 && dateArray[1].length == 2 && dateArray[2].length == 4) {
        return "" + dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
      }else {
        console.log("fun ToolsImport.excelDateToJSDate - ERROR: In date format");
      }
    }
  },
  getElement: function(element,clientObj,key) {
    console.log("fun ToolsImport.getElement - params: element: ", element , ", clientObj: ", clientObj , ", key: ", key);
    //console.log("fun ToolsImport.getElements - header: " + key + " - valueType: " + element.valueType + " -  value: " + clientObj[key] + " -  uid: " + element.uid);

    var temp_value;

    if(element.valueType == "TEXT"){ //OK
      temp_value = clientObj[key];
    }else if (element.valueType == "DATE") { //OK
      temp_value = ToolsImport.excelDateToJSDate(clientObj[key]);
    }else if (element.valueType == "OPTIONSET") { //OK
      temp_value = element.optionSet[clientObj[key]].codeDhis;
    }else if (element.valueType == "ADM1") { //OK
      temp_value = window.config.organisationUnits.adm1[clientObj[key]].optionSet;
    }else if (element.valueType == "ADM2") { //OK
      temp_value = window.config.organisationUnits.adm2[clientObj[key]].optionSet;
    }else if (element.valueType == "ADM3") { //To configure
      temp_value = window.config.organisationUnits.adm3[clientObj[key]].optionSet;
    }else if (element.valueType == "BOOLEAN") { //OK
      if(clientObj[key] == "Yes") {
        temp_value = "true";
      }else if (clientObj[key] == "No") {
        temp_value = "false";
      }
    }else if (element.valueType == "TRUE_ONLY") { //OK
      if(clientObj[key] == "Yes") {
         temp_value = "true";
      }
    }else if (element.valueType == "INTEGER_ZERO_OR_POSITIVE") {
      temp_value = clientObj[key];
    }else if (element.valueType == "NUMBER") {
      temp_value = clientObj[key];
    }else if (element.valueType == "INTEGER") {
      temp_value = clientObj[key];
    }else { //OK
      console.log("fun ToolsImport.getElement - ERROR: Import of dataPoints of type: " + element.valueType + " - " + key + " is not currenlty supported, check the configuration");
    }
    return temp_value;
  },
  getElements: function(stage,clientObj,elementType) {
    console.log("fun ToolsImport.getElements - params: stage: ", stage , ", clientObj: ", clientObj, ", elementType: ", elementType);

    var elements = [];
    if (window.config.dataPoints[stage][elementType + "s"]) {
      var clientKeys = Object.keys(clientObj);
      clientKeys.forEach(function(key) {
        var element = window.config.dataPoints[stage][elementType + "s"][key];

        if (element) {
          var temp = {};
          temp[elementType] = element.uid;
          temp["value"] = ToolsImport.getElement(element,clientObj,key);

          elements.push(temp);
        }
      });
    }

    console.log("fun ToolsImport.getElements - elements: ", elements);
    return elements;
  },
};

export default ToolsImport;
