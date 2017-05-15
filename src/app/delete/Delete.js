import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';

import ProcessingDelete from './ProcessingDelete';

var Delete = React.createClass({
  render(){
    return(
      <div id="import">
        <RaisedButton
          label="Delete Imported TEIs"
          secondary={true}
          onClick={ProcessingDelete.start}
        />
        <div id="logStateDelete"></div>
      </div>
    );
  }
});

export default Delete;
