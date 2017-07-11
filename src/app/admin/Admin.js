import React from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';

import ProcessingAdmin from './ProcessingAdmin';

var Admin = React.createClass({
  render(){
    return(
      <div>
        <p>The following json allows the configuration of all hard coded elements:</p>
        <ul>
          <li>Data points by type (trackedEntityAttribute or dataElement) and stage</li>
          <li>Organisation units</li>
          <li>PSI workers</li>
        </ul>
        <p>Reference for configuration is available: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval">here</a></p>
        <br />
        <div id="ace" style={{float:"left",width:'100%'}}>
        </div>
        <br />
        <RaisedButton
          label="Save"
          secondary={true}
          onClick={ProcessingAdmin.save}
        />
      </div>
    );
  },
  componentDidMount(){
      ProcessingAdmin.start();
  }
});

export default Admin;
