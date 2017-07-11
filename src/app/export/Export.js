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
                  onClick={ProcessingExport.export_test_month}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_test_week">
                <RaisedButton
                  label="Last Week in *.XLS"
                  secondary={true}
                  onClick={ProcessingExport.start}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_test_open">
                <RaisedButton
                  label="Open Table in DHIS2"
                  secondary={true}
                  onClick={ProcessingExport.export_test_open}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td style={{float:"left",width:'30%'}}>
              <div id="export_refer_disabled">
                <RaisedButton
                  label="ART Referral data from:"
                  disabled={true}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_refer_month">
                <RaisedButton
                  label="Last Month in *.XLS"
                  secondary={true}
                  onClick={ProcessingExport.start}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_refer_week">
                <RaisedButton
                  label="Last Week in *.XLS"
                  secondary={true}
                  onClick={ProcessingExport.start}
                />
              </div>
            </td>
            <td style={{float:"left"}}>
              <div id="export_refer_disabled">
                <RaisedButton
                  label="Open Table in DHIS2"
                  secondary={true}
                  onClick={ProcessingExport.start}
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
