import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { LoginActions } from "../../actions";
import { handleInputChange } from "common"
import { Link } from 'react-router-dom';
import logo from "../../images/Tichmi_logo.png";

import styles from './style.css';

class Login extends Component {
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
            <div className={styles.login_page}>
                <form className={styles.form} onSubmit={event => this.props.loginActions.login(event, this.state)}>
                    <img src={logo} className={styles.logo}/>
                    <h1 className={styles.title}>התחברות</h1>
                    <div>
                        <TextField type="email" name="email" floatingLabelText="אימייל" value={this.state.email} onChange={ this.handleInputChange } required />
                        {/*floatingLabelStyle={{color: 'rgb(0,188,212)'}}*/}
                    </div>
                    <div>
                        <TextField type="password" name="password" floatingLabelText="סיסמא" minLength="8" value={this.state.password} onChange={ this.handleInputChange } required />
                    </div>
                    <RaisedButton type="submit" primary={true}>התחבר</RaisedButton>
                    <br/>
                    <br/>
                    <span>עדיין לא רשום??? </span>
                    <Link to='/register'><span>לחץ כאן</span></Link>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(LoginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);