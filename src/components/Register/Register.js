import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import CitySelect from "../common-components/city-select/CitySelect";

import { RegistrationActions } from "../../actions";
import { handleInputChange } from "common"

import styles from './style.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            is_teacher: false,
            gender: 0,
            city_id: null,
            phone: '',
            price: 0
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    render() {

        const { is_teacher } = this.state;

        return (
            <MuiThemeProvider>
                <form className={styles.form} onSubmit={event => this.props.registerActions.register(event, this.state)}>
                    <h2>הרשמה</h2>
                    {this.renderGeneralUserForm()}
                    {is_teacher && this.renderTeacherForm()}
                    {!is_teacher && this.renderStudentForm()}
                    <RaisedButton type="submit" primary={true}>הירשם</RaisedButton>
                </form>
            </MuiThemeProvider>
        );
    }

    setValue(key, value) {
        this.setState({
            [key]: value
        });
    }

    renderGeneralUserForm() {

        const { state, handleInputChange } = this;

        return (
            <React.Fragment>
                <div>
                    <TextField type="email" name="email" floatingLabelText="אימייל" value={state.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <TextField type="password" name="password" floatingLabelText="סיסמא" minLength="8" value={state.password} onChange={handleInputChange} required />
                </div>
                    <Toggle label="מורה?" labelPosition="right" labelStyle={{ marginRight: '10px' }} toggled={!!state.is_teacher} onToggle={(_, isInputChecked) => this.setValue('is_teacher', isInputChecked ? 1 : 0)} />
                <div>
                    <SelectField
                        floatingLabelText="מין"
                        value={state.gender}
                        onChange={(_, __, value) => this.setValue('gender', value)}>

                        <MenuItem value={0} primaryText="Male" />
                        <MenuItem value={1} primaryText="Female" />
                    </SelectField>
                </div>
                <div>
                    <TextField name="first_name" floatingLabelText="שם פרטי" value={state.first_name} onChange={handleInputChange} required />
                </div>
                <div>
                    <TextField name="last_name" floatingLabelText="שם משפחה" value={state.last_name} onChange={handleInputChange} required />
                </div>
                {/* <div>
                    <CitySelect onChange={city => this.setValue('city_id', city.id)} value={state.city_id} />
                </div> */}
            </React.Fragment>
        );
    }

    renderTeacherForm() {

        const { state, handleInputChange } = this;

        return (
            <React.Fragment>
                <div>
                    <TextField name="phone" floatingLabelText="טלפון" value={state.phone} onChange={handleInputChange} required />
                </div>
                <div>
                    <TextField type="number" name="price" floatingLabelText="מחיר" value={state.price} onChange={handleInputChange} required />
                </div>
            </React.Fragment>
        );
    }

    renderStudentForm() {

        const { state, handleInputChange } = this;

        return (
            <React.Fragment>
                <div>
                    Student stuff
                </div>
            </React.Fragment>
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