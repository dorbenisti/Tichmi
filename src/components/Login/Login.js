import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { LoginActions } from "../../actions";
import { handleInputChange } from "common"
import { Link } from 'react-router-dom';
import logo from "../../images/Tichmi_logo.png";
import axios from "axios";
import { push } from 'react-router-redux';

import styles from './style.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            returnUrl: props.location.search.split('=')[1]
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    componentDidMount() {

        const { loginSuccess } = this.props.loginActions;
        const { push } = this.props;

        axios.get('/api/user').then(res => {
            loginSuccess(res.data);
            push('/');
        }, () => {});
    }

    render() {
        return (
            <div className={styles.login_page}>
                <form className={styles.form} onSubmit={event => this.props.loginActions.login(event, this.state)}>
                    <img src={logo} className={styles.logo}/>
                    <h1 className={styles.title}>התחברות</h1>
                    <div>
                        <TextField type="email" name="email" floatingLabelText="אימייל" value={this.state.email} onChange={ this.handleInputChange } required />
                    </div>
                    <div>
                        <TextField type="password" name="password" floatingLabelText="סיסמא" minLength="8" value={this.state.password} onChange={ this.handleInputChange } required />
                    </div>
                    {
                        this.props.loginError ? <span className={styles.login_error}>האימייל או הסיסמא אינם נכונים. נסו שוב בבקשה.</span> : null
                    }
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
    return {
        loginError: state.login.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(LoginActions, dispatch),
        push: bindActionCreators(push, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);