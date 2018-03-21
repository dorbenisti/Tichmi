import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import logo from './logo.svg';
import styles from './style.css';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Teachers from "../Teachers/Teachers";
import SearchBox from "../SearchBox/SearchBox";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActions } from "../../actions";

class App extends Component {

  render() {

      if (!this.props.user) {
          return (<Redirect to="/login"/>);
      }

      let rightButtons;

      if (this.props.user) {
          rightButtons = (
              <div className={styles.rightButtons}>
                  <span>ברוך הבא {this.props.user}</span>
                  <RaisedButton className={styles.link} onClick={this.props.actions.logout} label="התנתק"/>
              </div>
          );
      } else {
          rightButtons = (
              <div className={styles.rightButtons}>
                  <Link to='/register' className={styles.link}><RaisedButton label="הירשם"/></Link>
                  <Link to='/login' className={styles.link}><RaisedButton label="התחבר"/></Link>
              </div>
          );
      }

      return (
          <div>
              <AppBar title="Tichmi" iconElementRight={rightButtons} />
              <SearchBox />
        <Teachers />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
