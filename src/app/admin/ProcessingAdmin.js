import Tools from './../Tools';

import React from 'react';
import ReactDOM from 'react-dom';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

var ProcessingAdmin = {
  onLoad: function(newValue) {
  },
  onValue: function() {
    return 'value';
  },
  onChange: function(newValue) {
    window.list_new = newValue;
  },
  start: function() {
    Tools.getUrl();
    var url = window.dhisUrl + "api/dataStore/LS_dhis2-app/list";
    console.log(url);
    var oReq = new XMLHttpRequest();
    oReq.withCredentials = true;
    oReq.open("GET", url, true);

    oReq.onload = function(e) {
      window.list = e.target.response;
      window.list_new = window.list;
      var is_error = JSON.parse(window.list);
      if (is_error.status == "ERROR") {
        ProcessingAdmin.setup();
      } else {
        ProcessingAdmin.load(window.list);
      }

    }
    oReq.send();
  },
  setup: function(value) {

  },
  load: function(value) {
    ReactDOM.render((<AceEditor
      mode="json"
      theme="github"
      name="ls_list"
      onLoad={ProcessingAdmin.onLoad}
      onChange={ProcessingAdmin.onChange}
      fontSize={14}
      width="100%"
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={value}
      editorProps={{
        $blockScrolling: Infinity
      }}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2
      }}/>), document.getElementById('ace'));
  },
  save: function() {
    var List = JSON.parse(window.list_new);

    //console.log(JSON.parse(window.list_new));

    /*var test = List.stages["Client Information"].evaluate;
    console.log(test);
    console.log(typeof test);

    var fct = eval(test);
    console.log(fct);
    console.log(fct('blibli'));*/

    var data = window.list_new;
    var url = window.dhisUrl + "api/dataStore/LS_dhis2-app/list";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("PUT", url);
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(data);

    window.config = JSON.parse(window.list_new);
    console.log("window.config", window.config);
  }
};

export default ProcessingAdmin;
