import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import styles from './style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Teachers from "../Teachers/Teachers";
import SearchBox from "../SearchBox/SearchBox";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActions } from "../../actions";
import { Route, Switch } from 'react-router-dom';

import Register from "../Register/Register";
import Login from "../Login/Login";
import TeacherDetailsView from "../TeacherDetailsView/TeacherDetailsView";

class App extends Component {

  render() {
    const { match } = this.props;
    
    const muiTheme = getMuiTheme({
      appBar: {
        height: 50,
      },
      isRtl: true
    });
    // To switch to RTL...

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

    return (<MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <AppBar title="Tichmi" iconElementRight={rightButtons} />

        <Switch>
          <Route exact path={match.path} render={props => (
            <React.Fragment>
              <SearchBox />
              <Teachers {...props}/>
            </React.Fragment>
          )} />
          <Route exact path={`${match.path}register/`} component={Register} />
          <Route exact path={`${match.path}login/`} component={Login} />
          <Route exact path={`${match.path}teacherDetails/:id/`} render={props => (
            <React.Fragment>
              <SearchBox />
              <TeacherDetailsView {...props} />
            </React.Fragment>
          )} />
        </Switch>

      </div>
    </MuiThemeProvider>);
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
