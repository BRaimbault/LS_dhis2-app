import React from 'react';
import ReactDOM from 'react-dom';

var Tools = {
  getTrackedEntityInstance: function(op,clientObj, callback1, callback2) {
    console.log("fun Tools.getTrackedEntityInstance - params: op: ", op, ", clientObj: ", clientObj, ", callback1: ", typeof callback1, ", callback2: ", typeof callback2);

    var payload = null;
    var clientCUIC = clientObj["#attr+client+id+cuic"];
    var clientOldID = clientObj["#attr+client+id+snold"];
    var url = window.dhisUrl + "trackedEntityInstances.json?filter=" + window.OldID + ":" + op + ":"+ clientOldID +"&ou=vJNI6blhosr&ouMode=DESCENDANTS&trackedEntity=MCPQUTHX1Ze&skipPaging=true";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", url, true);
  	xhr.onreadystatechange = function() {
  		if (this.readyState == 4) {
          var response = JSON.parse(this.responseText);
          if (response.trackedEntityInstances.length == 0) {
            callback1(clientObj, response);
          }else {
            callback2(clientObj, response);
          }
  		}
  	};
    xhr.send(payload);
  }
};

export default Tools;
