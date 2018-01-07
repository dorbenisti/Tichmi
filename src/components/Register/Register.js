import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './style.css';

export default class Register extends Component {
    render() {
        return (
            <form onSubmit={event => this.props.actions.register(event, { email: this.props.user, password: this.props.password })}>
                <h2>Register</h2>
                <div>
                    <label>email</label>
                    <input type="email" name="email" value={this.props.user} onChange={event => this.props.actions.usernameChanged(event.target.value)} required />
                </div>
                <div>
                    <label>password</label>
                    <input type="password" name="password" minLength="8" value={this.props.password} onChange={event => this.props.actions.passwordChanged(event.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
        );
    }
}