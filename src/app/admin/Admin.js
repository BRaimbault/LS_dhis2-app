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
        <p>The following code allows the configuration of all hard coded elements:
          <li>
           <il>Something</il>
          </li>
        </p>
        <div id="ace">
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
