import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { RegistrationActions } from "../../actions";
import { handleInputChange } from "common"

import styles from './style.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    render() {
        return (
            <MuiThemeProvider>
                <form className={styles.form} onSubmit={event => this.props.registerActions.register(event, this.state)}>
                    <h2>הרשמה</h2>
                    <div>
                        <TextField type="email" name="email" floatingLabelText="אימייל" value={this.state.email} onChange={ this.handleInputChange } required />
                    </div>
                    <div>
                        <TextField type="password" name="password" floatingLabelText="סיסמא" minLength="8" value={this.state.password} onChange={ this.handleInputChange } required />
                    </div>
                    <RaisedButton type="submit" primary={true}>הירשם</RaisedButton>
                </form>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(RegistrationActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);