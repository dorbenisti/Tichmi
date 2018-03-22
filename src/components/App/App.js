import React, { Component } from 'react';
import classnames from 'classnames';
import logo from './logo.svg';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import Teachers from "../Teachers/Teachers";
import SearchBox from "../SearchBox/SearchBox";
import Register from "../Register/Register";
import Login from "../Login/Login";
import TeacherDetailsView from "../TeacherDetailsView/TeacherDetailsView";
import { LoginActions } from "../../actions";
import styles from './style.css';

class App extends Component {

  render() {

      const { match } = this.props;
      const loggedIn = !!this.props.user;

      // if (!this.props.user) {
      //     return (<Redirect to={`${match.path}login/`}/>);
      // }

      let rightButtons;

    if (this.props.user) {
      rightButtons = (
        <div className={styles.rightButtons}>
          <span>ברוך הבא {this.props.user}</span>
          <RaisedButton className={styles.link} onClick={this.props.actions.logout} label="התנתק" />
        </div>
      );
    } else {
      rightButtons = (
        <div className={styles.rightButtons}>
          <Link to={`${match.path}register/`} className={styles.link}><RaisedButton label="הירשם" /></Link>
          <Link to={`${match.path}login/`} className={styles.link}><RaisedButton label="התחבר" /></Link>
        </div>
      );
    }

    return (
      <div>
        <Switch>
          <Route exact path={match.path} render={props => (
            !loggedIn ? (
                    <Redirect to={`${match.path}login/`}/>
                ) : (
                <React.Fragment>
                    <AppBar title="Tichmi" iconElementRight={rightButtons} />
                    <SearchBox />
                    <Teachers {...props}/>
                </React.Fragment>
                )
          )} />
          <Route exact path={`${match.path}register/`} component={Register} />
          <Route exact path={`${match.path}login/`} component={Login} />
          <Route exact path={`${match.path}teacherDetails/:id/`} render={props => (
            <React.Fragment>
              <AppBar title="Tichmi" iconElementRight={rightButtons} />
              <SearchBox />
              <TeacherDetailsView {...props} />
            </React.Fragment>
          )} />
        </Switch>

      </div>
    );
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
