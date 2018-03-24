import React, { Component } from 'react';
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
import logo from "../../images/Tichmi_logo.png";
import styles from './style.css';

class App extends Component {
    render() {

        const { match, user, location } = this.props;
        const loggedIn = user;

        const barContent = (
            <div className={styles.barContent}>
                <Link to={`${match.path}`}><img src={logo} className={styles.logo} /></Link>
                <SearchBox />
            </div>
        );

        let rightButtons = (
            <div className={styles.rightButtons}>
                <span>שלום אורח</span>
            </div>
        );

        if (user) {
            rightButtons = (
                <div className={styles.rightButtons}>
                    <span>ברוך הבא {user}</span>
                    <RaisedButton className={styles.link} onClick={this.props.actions.logout} label="התנתק" />
                </div>
            );
        }

        return (
            (!loggedIn && pathNeedsAuth(location.pathname)) ? (
                <Redirect to={`${match.path}login/?originUrl=${location.pathname}`} />) : (
                    <div style={{ height: '100vh' }}>
                        <Switch>
                            <Route exact path={match.path} render={props => (
                                <React.Fragment>
                                    <AppBar iconElementLeft={barContent} iconElementRight={rightButtons} iconStyleLeft={ {width: '63%'} } />
                                    <Teachers {...props} />
                                </React.Fragment>

                            )} />
                            <Route exact path={`${match.path}register/`} component={Register} />
                            <Route exact path={`${match.path}login/`} component={Login} />
                            <Route exact path={`${match.path}teacherDetails/:id/`} render={props => (
                                <React.Fragment>
                                    <AppBar iconElementLeft={barContent} iconElementRight={rightButtons} />
                                    <TeacherDetailsView {...props} />
                                </React.Fragment>
                            )} />
                        </Switch>

                    </div>
                ));
    }
}

function pathNeedsAuth(path) {
    return (!path.includes('login') && !path.includes('register'));
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
