import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import CitySelect from "../common-components/city-select/CitySelect";
import SubjectSelect from "../common-components/subject-select/SubjectSelect";
import ImageUpload from "./ImageUpload";

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
            price: 0,
            min_price: 0,
            max_price: 0,
            max_km_distance: 0,
            want_group_lesson: false,
            subjects: []
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    render() {

        const { state } = this;
        const { is_teacher } = state;

        return (
            <MuiThemeProvider>
                <form className={styles.form} onSubmit={event => this.props.registerActions.register(event, this.state)}>
                    <h2>הרשמה</h2>
                    <div>
                        <CustomToggle label="מורה?" value={!!state.is_teacher} fieldName="is_teacher" setValue={this.setValue} />
                    </div>
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
                {/* <StarsRating rating={3} disabled={false} onChange={() => {}} /> */}
                <div>
                    <TextField type="email" name="email" floatingLabelText="אימייל" value={state.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <TextField type="password" name="password" floatingLabelText="סיסמא" minLength="8" value={state.password} onChange={handleInputChange} required />
                </div>
              
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
                <div>
                    <CitySelect onChange={city => this.setValue('city_id', city.id)} value={state.city_id} />
                </div>
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
                <div>
                    <SubjectSelect onChange={subject => this.setValue('subjects', subject)} value={state.subjects.map(s => s.id)} />
                </div>
                <ImageUpload style={{ marginTop: '5px' }} onChange={file => this.setValue('image', file)}/>
            </React.Fragment>
        );
    }

    renderStudentForm() {

        const { state, handleInputChange } = this;

        return (
            <React.Fragment>
                <div>
                    <TextField type="number" name="min_price" floatingLabelText="מחיר מינימלי" value={state.min_price} onChange={handleInputChange} required />
                </div>
                <div>
                    <TextField type="number" name="max_price" floatingLabelText="מחיר מקסימלי" value={state.max_price} onChange={handleInputChange} required />
                </div>
                <div>
                    <TextField type="number" name="max_km_distance" floatingLabelText="מרחק מקסימלי בקילומטרים" value={state.max_km_distance} onChange={handleInputChange} required />
                </div>
                <div>
                    <CustomToggle label="מעוניין בשיעורים קבוצתיים?" value={!!state.want_group_lesson} fieldName="want_group_lesson" setValue={this.setValue} />
                </div>
            </React.Fragment>
        );
    }
}

function CustomToggle({ value, fieldName, setValue, ...rest }) {
    return (
        <div>
            <Toggle {...rest} labelPosition="right" labelStyle={{ marginRight: '10px' }} toggled={!!value} onToggle={(_, isInputChecked) => setValue(fieldName, isInputChecked ? 1 : 0)} />
        </div>
    );
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