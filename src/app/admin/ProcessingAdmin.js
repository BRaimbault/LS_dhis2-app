import React from 'react';
import ReactDOM from 'react-dom';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

var ProcessingAdmin = {
  onLoad: function (newValue) {
    console.log('load',newValue);
  },
  onValue: function () {
    return 'value';
  },
  onChange: function (newValue) {
    console.log('change',newValue);
    window.list_new = newValue;
  },
  getUrl: function() {
    //var e = "production";
    var e = undefined;
    if(e){
      console.log('prod_path');
      window.dhisUrl1 = window.location.href.split('apps/')[0];
      window.dhisUrl2 = window.location.href.split('apps/')[0];
      console.log("window.dhisUrl: ", window.dhisUrl);
    }else{
      console.log('dev_path');
      window.dhisUrl1 = "http://localhost:8989/dhis/";
      window.dhisUrl2 = "https://sandbox.psi-mis.org/";
      console.log("window.dhisUrl: ", window.dhisUrl);
    }
  },
  start: function() {
    ProcessingAdmin.getUrl();
    var url = window.dhisUrl1 + "api/dataStore/LS_dhis2-app/list";
    console.log(url);
    var oReq = new XMLHttpRequest();
    oReq.withCredentials = true;
    oReq.open("GET", url, true);
    //oReq.setRequestHeader("authorization", "Basic YnJhaW1iYXVsdDpEaXN0cmljdDg4");

    oReq.onload = function(e) {
      window.list = e.target.response;
      window.list_new = window.list;
      console.log("window.list", window.list);
      ProcessingAdmin.load(window.list);
    }
    oReq.send();
  },
  load: function(value) {
    ReactDOM.render((<AceEditor
      mode="json"
      theme="github"
      name="ls_list"
      onLoad={ProcessingAdmin.onLoad}
      onChange={ProcessingAdmin.onChange}
      fontSize={14}
      width="90%"
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={value}
      editorProps={{$blockScrolling: Infinity}}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}/>), document.getElementById('ace'));
  },
  save: function() {
    var List = JSON.parse(window.list_new);
    //console.log(JSON.parse(window.list_new));
    console.log(List);

    /*var test = List.stages["Client Information"].evaluate;
    console.log(test);
    console.log(typeof test);

    var fct = eval(test);
    console.log(fct);
    console.log(fct('blibli'));*/

    var data = window.list_new;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("PUT", "http://localhost:8989/dhis/api/dataStore/LS_dhis2-app/list");
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(data);
  }
};

export default ProcessingAdmin;
