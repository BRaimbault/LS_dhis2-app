import React from 'react';
import ReactDOM from 'react-dom';
import log from 'loglevel';

import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';

import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component';

import Export from './export/Export';
import Import from './import/Import';
import Admin from './admin/Admin';
import Delete from './delete/Delete';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);

const sideBarSections = [
  { key: 'export', label: 'Export' },
  { key: 'import', label: 'Import' },
  { key: 'admin', label: 'Admin' },
  //{ key: 'delete', label: 'Delete' },
];

var App = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    d2: React.PropTypes.object,
  },
  childContextTypes: {
    d2: React.PropTypes.object,
  },
  getChildContext() {
    return {
      d2: this.props.d2,
    };
  },

  changeSectionHandler(key) {
    ReactDOM.render(<App  d2={this.props.d2} sectionKey={key}/>, document.getElementById('app'));
  },

  renderSection(key) {
    var sectionContent = (
      <div>
      {key == 'export' && <Export />}
      {key == 'import' && <Import />}
      {key == 'admin' && <Admin />}
      {key == 'delete' && <Delete />}
      {(key != 'import' && key != 'delete' && key != 'export' && key != 'admin') && <p>This section is under construction...</p>}
      </div>
    );
    return(
      <div>
        {sideBarSections.map(function(section,i) {
          var sectionLabel = (
            <h1 key={'sectionLabel_'+i}>{section.key == key && section.label}</h1>
          );
          return sectionLabel;
        })}
        {sectionContent}
      </div>
    );

  },
  render() {
    console.log("App - render: sectionKey=", this.props.sectionKey);
    return (
      <div className="app-wrapper">
        <HeaderBar />
        <Sidebar
          sections={sideBarSections}
          onChangeSection={this.changeSectionHandler}
          currentSection={this.props.sectionKey}
        />
        <div className="main-content">
          {this.renderSection(this.props.sectionKey)}
        </div>
      </div>
    );
  }
});

export default App;
