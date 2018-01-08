import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActions, UserPasswordFormActions } from "../../actions";

import styles from './style.css';

class Login extends Component {
    render() {
        return (
            <form onSubmit={event => this.props.loginActions.login(event, { email: this.props.user, password: this.props.password })}>
                <h2>Login</h2>
                <div>
                    <label>email</label>
                    <input type="email" name="email" value={this.props.user} onChange={event => this.props.userPasswordFormActions.usernameChanged(event.target.value)} required />
                </div>
                <div>
                    <label>password</label>
                    <input type="password" name="password" minLength="8" value={this.props.password} onChange={event => this.props.userPasswordFormActions.passwordChanged(event.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
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