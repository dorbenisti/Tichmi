import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import styles from './style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Teachers from "./Teachers";
import FlatButton from 'material-ui/FlatButton';
import SearchBox from "../SearchBox/SearchBox";
import { connect } from 'react-redux'

class App extends Component {

  render() {

    const muiTheme = getMuiTheme({
      appBar: {
        height: 50,
      },
      isRtl: true
    });
    // To switch to RTL...

    const rightButtons = (
      <div>
        <Link to='register'>  <FlatButton label="הירשם" /></Link>
        <Link to='login'> <FlatButton label="התחבר" /></Link>
      </div>
    );


    return <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <AppBar title="Tichmi" iconElementRight={rightButtons} />
        <SearchBox />
        <Teachers />
      </div>
    </MuiThemeProvider>;
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(App);
