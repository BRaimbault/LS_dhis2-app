import React from 'react';
import ReactDOM from 'react-dom';

var Tools = {
  getTrackedEntityInstance: function(op,clientObj, callback1, callback2) {
    var payload = null;
    var clientCUIC = clientObj["CUIC"];
    var clientOldID = clientObj["ClientCode"];
    var url = "http://localhost:8989/dhis/api/trackedEntityInstances.json?filter=w1rn31LvDeZ:" + op + ":"+ clientOldID +"&ou=vJNI6blhosr&ouMode=DESCENDANTS&trackedEntity=MCPQUTHX1Ze&skipPaging=true";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", url, true);
  	xhr.onreadystatechange = function() {
  		if (this.readyState == 4) {
          var response = JSON.parse(this.responseText);
          console.log("fun Tools.getTrackedEntityInstance: ", response);
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
