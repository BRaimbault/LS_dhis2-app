import React from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';

const styles = {
  button: {
    margin: 0
  },
  input: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

var ReadCSV = React.createClass({
  readFile() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8989/dhis/api/documents/Zacj6Ykgyox/data",
      "method": "GET",
      "headers": {
        "authorization": "Basic YnJhaW1iYXVsdDpEaXN0cmljdDg4",
        "cache-control": "no-cache",
        "postman-token": "3d7d62fe-17f0-e6e9-2790-c6872de8dcb5"
      }
    }

    $.ajax(settings).done(function (response) {
    console.log(response);
    });
  },
  render(){
    return(
      <div>
        <RaisedButton
          label="Read file"
          secondary={true}
          style={styles.button}
        >
          <input
            style={styles.input}
            onClick={this.readFile}
          />
        </RaisedButton>
      </div>
    );
  }
});

export default ReadCSV;
