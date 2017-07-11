import React from 'react';
import ReactDOM from 'react-dom';

import { init } from 'd2/lib/d2';


import App from './App';

var Tools = {
  getTrackedEntityInstance: function(op,clientObj, callback1, callback2) {
    console.log("fun Tools.getTrackedEntityInstance - params: op: ", op, ", clientObj: ", clientObj, ", callback1: ", typeof callback1, ", callback2: ", typeof callback2);

    var payload = null;
    var clientCUIC = clientObj[window.config.ressources.CUIC.header];

    var clientCUICUID = window.config.ressources.CUIC.uid;
    var trackedEntityUID = window.config.ressources.uidTrackedEntity;
    var countryUID = window.config.organisationUnits.adm0.LS.uid;


    if (window.config.ressources.CUIC_old) {

      updates = ToolsImport.logger(updates,"ERROR: Use of old CUIC is not currenlty supported.");
      updates = ToolsImport.logger(updates,"---------------------------------------------");

    }else {
      var url = window.dhisUrl + "api/trackedEntityInstances.json?filter=" + clientCUICUID + ":" + op + ":"+ clientCUIC +"&ou=" + countryUID + "&ouMode=DESCENDANTS&trackedEntity=" + trackedEntityUID + "&skipPaging=true";
      console.log(url);

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


  },
  getUrl: function() {
    //var e = "production";
    window.e = undefined;
    if (window.e) {
      console.log('prod_path');
      window.dhisUrl = window.location.href.split('apps/')[0];
      console.log("window.dhisUrl: ", window.dhisUrl);
    } else {
      console.log('dev_path');
      window.dhisUrl = "http://localhost:8989/dhis/";
      console.log("window.dhisUrl: ", window.dhisUrl);
    }
  },
  getList: function(fun_success,fun_failure) {
    //Tools.getUrl();
    var data = JSON.stringify("No configuration found!");

    if (!window.config || window.config.status == "ERROR" || '"'+ window.config+'"' == data) {

      var url = window.dhisUrl + "api/dataStore/LS_dhis2-app/list";

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open("GET", url, true);

      xhr.onload = function(e) {

        window.list = e.target.response;
        window.list_new = window.list;

        window.config = JSON.parse(window.list);

        console.log("window.config", window.config);

        var is_error = JSON.parse(window.list);
        if (is_error.status == "ERROR") {

          var url = window.dhisUrl + "api/dataStore/LS_dhis2-app/list";

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("POST", url, true);
          xhr.setRequestHeader("content-type", "application/json");

          xhr.onload = function(e) {

            init().then(function(promise) {
              ReactDOM.render(<App d2={promise} sectionKey={'admin'} />, document.getElementById('app'));
            });
          }

          xhr.send(data);
        }else if (window.list == data) {

          init().then(function(promise) {
            ReactDOM.render(<App d2={promise} sectionKey={'admin'} />, document.getElementById('app'));
          });

        }

      }
      xhr.send();
    }else {
      console.log("window.config", window.config);
    }

  },
};

export default Tools;
