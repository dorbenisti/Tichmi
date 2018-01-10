import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { LoginActions, UserPasswordFormActions } from "../../actions";

import styles from './style.css';

class Login extends Component {
    render() {
        return (
            <MuiThemeProvider>
            <form className={styles.form} onSubmit={event => this.props.loginActions.login(event, { email: this.props.user, password: this.props.password })}>
                <h2>התחברות</h2>
                <div>
                    <TextField type="email" name="email" floatingLabelText="אימייל" value={this.props.user} onChange={event => this.props.userPasswordFormActions.usernameChanged(event.target.value)} required />
                </div>
                <div>
                    <TextField type="password" name="password" floatingLabelText="סיסמא" minLength="8" value={this.props.password} onChange={event => this.props.userPasswordFormActions.passwordChanged(event.target.value)} required />
                </div>
                <RaisedButton type="submit" primary={true}>התחבר</RaisedButton>
            </form>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userInput.user,
        password: state.userInput.password
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(LoginActions, dispatch),
        userPasswordFormActions: bindActionCreators(UserPasswordFormActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);