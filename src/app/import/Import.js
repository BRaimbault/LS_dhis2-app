import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';

import Tools from './../Tools';

import ProcessingImport from './ProcessingImport';

const styles = {
  button: {
    margin: 0,
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
  progress: {
    position: 'absolute',
    margin: 20,
    width: '75%',
  },
  logStateImport: {
    margin: 20,
  },
};

var dev = false;

window.completed = 0;

var Import = React.createClass({
  render(){
    window.completed = 10;

    return(
      <div id="import">
        <RaisedButton
          label="Choose file"
          secondary={true}
          style={styles.button}
        >
          <input
            type="file"
            accept=".xlsx"
            style={styles.input}
            ref={(ref) => this.fileUpload = ref}
            onChange={ProcessingImport.start}
          />
        </RaisedButton>
        <div id="progress" style={styles.progress}></div>
        <div id="logStateImport" style={styles.logStateImport}></div>
      </div>
    );
  },
  componentWillMount(){
    Tools.getUrl();
    Tools.getList();
  },
  componentDidMount(){
    //if(!window.e){
    if(!true){
      ProcessingImport.start();
    };
  }
});

export default Import;
