import React from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';

import ProcessingAdmin from './ProcessingAdmin';

var Admin = React.createClass({
  render(){
    return(
      <div>
        <p>The following json allows the configuration of the app:</p>
        <ul>
          <li>Export: General ressources</li>
          <li>Import: General ressource</li>
          <li>Import: Duplicates detection</li>
          <li>Import: Data points by type (trackedEntityAttribute or dataElement) and stage</li>
          <li>Import: PSI workers</li>
          <li>Import: Organisation units</li>
        </ul>
        <p>Reference for configuration is available at: <a href="https://github.com/BRaimbault/LS_dhis2-app/blob/master/config_ref.md">here</a></p>
        <br />
        <div id="ace" style={{float:"left",width:'100%'}}>
        </div>
        <br />
        <div>
          <span style={{marginRight:"10px"}}>
          <TextField
            id="password"
            style={{marginTop:"10px",paddingTop:"10px"}}
            hintText="Enter password"
            errorText="This field is required to save changes"
            onChange={ProcessingAdmin.handleInputChange}
          />
          </span>
          <span>
          <RaisedButton
            style={{height:"50px"}}
            label="Save changes"
            secondary={true}
            onClick={ProcessingAdmin.save}
          />
          </span>
        </div>
      </div>
    );
  },
  componentDidMount(){
      ProcessingAdmin.start();
  }
});

export default Admin;
