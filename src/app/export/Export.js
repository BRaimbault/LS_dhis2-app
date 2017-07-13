import React from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';

import Tools from './../Tools';

import ProcessingExport from './ProcessingExport';

const styles = {
};

var dev = false;

var Export = React.createClass({
  render(){
    //Testing
    var export_test_month = function() {
      ProcessingExport.exportXls(["Testing","url_lastMonth"]);
    };
    var export_test_week = function() {
      ProcessingExport.exportXls(["Testing","url_lastWeek"]);
    };
    var export_test_open = function() {
      ProcessingExport.exportUID(["Testing","uid_table"]);
    };
    //Opening
    var export_open_month = function() {
      ProcessingExport.exportXls(["ART Referral - Opening","url_lastMonth"]);
    };
    var export_open_week = function() {
      ProcessingExport.exportXls(["ART Referral - Opening","url_lastWeek"]);
    };
    var export_open_open = function() {
      ProcessingExport.exportUID(["ART Referral - Opening","uid_table"]);
    };
    //Closure
    var export_close_month = function() {
      ProcessingExport.exportXls(["ART Referral - Closure","url_lastMonth"]);
    };
    var export_close_week = function() {
      ProcessingExport.exportXls(["ART Referral - Closure","url_lastWeek"]);
    };
    var export_close_open = function() {
      ProcessingExport.exportUID(["ART Referral - Closure","uid_table"]);
    };
    //Contact Log
    var export_contact_month = function() {
      ProcessingExport.exportXls(["Contact Log","url_lastMonth"]);
    };
    var export_contact_week = function() {
      ProcessingExport.exportXls(["Contact Log","url_lastWeek"]);
    };
    var export_contact_open = function() {
      ProcessingExport.exportUID(["Contact Log","uid_table"]);
    };

    return(
      <table style={{float:"left",width:'100%'}}>
        <tbody>
          <tr>
            <td style={{float:"left",width:'30%'}}>
              <div id="export_test_disabled">
                <RaisedButton
                  label="Testing data from:"
                  disabled={true}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_test_month">
                <RaisedButton
                  label="Last Month in *.XLS"
                  secondary={true}
                  onClick={export_test_month}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_test_week">
                <RaisedButton
                  label="Last Week in *.XLS"
                  secondary={true}
                  onClick={export_test_week}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_test_open">
                <RaisedButton
                  label="Open Table in DHIS2"
                  primary={true}
                  onClick={export_test_open}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td style={{float:"left",width:'30%'}}>
              <div id="export_open_disabled">
                <RaisedButton
                  label="ART Referral - Opening data from:"
                  disabled={true}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_open_month">
                <RaisedButton
                  label="Last Month in *.XLS"
                  secondary={true}
                  onClick={export_open_month}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_open_week">
                <RaisedButton
                  label="Last Week in *.XLS"
                  secondary={true}
                  onClick={export_open_week}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_open_open">
                <RaisedButton
                  label="Open Table in DHIS2"
                  primary={true}
                  onClick={export_open_open}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td style={{float:"left",width:'30%'}}>
              <div id="export_close_disabled">
                <RaisedButton
                  label="ART Referral - Closure data from:"
                  disabled={true}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_close_month">
                <RaisedButton
                  label="Last Month in *.XLS"
                  secondary={true}
                  onClick={export_close_month}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_close_week">
                <RaisedButton
                  label="Last Week in *.XLS"
                  secondary={true}
                  onClick={export_close_week}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_close_open">
                <RaisedButton
                  label="Open Table in DHIS2"
                  primary={true}
                  onClick={export_close_open}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td style={{float:"left",width:'30%'}}>
              <div id="export_contact_disabled">
                <RaisedButton
                  label="Contact Log data from:"
                  disabled={true}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_contact_month">
                <RaisedButton
                  label="Last Month in *.XLS"
                  secondary={true}
                  onClick={export_contact_month}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_contact_week">
                <RaisedButton
                  label="Last Week in *.XLS"
                  secondary={true}
                  onClick={export_contact_week}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_contact_open">
                <RaisedButton
                  label="Open Table in DHIS2"
                  primary={true}
                  onClick={export_contact_open}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
  componentWillMount(){
    Tools.getUrl();
    Tools.getList();
  },
});

export default Export;
