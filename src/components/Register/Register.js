import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
            group_lesson: false,
            subjects: []
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    render() {

        const { state } = this;
        const { is_teacher } = state;

        return (
            <div className={styles.register_page}>
                <form className={styles.form} onSubmit={event => this.props.registerActions.register(event, this.state)}>
                    <h1 className={styles.title}>הרשמה</h1>
                    <div className={styles.center}>
                        <CustomToggle label="מורה?" value={!!state.is_teacher} fieldName="is_teacher" setValue={this.setValue} />
                    </div>
                    {this.renderGeneralUserForm()}
                    {is_teacher && this.renderTeacherForm()}
                    {!is_teacher && this.renderStudentForm()}
                    <br/>
                    <div className={styles.center}>
                        <RaisedButton type="submit" primary={true}>הירשם</RaisedButton>
                    </div>
                </form>
            </div>
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
                <div className={styles.center}>
                    <SelectField
                        floatingLabelText="מין"
                        value={state.gender}
                        onChange={(_, __, value) => this.setValue('gender', value)}>

                        <MenuItem value={0} primaryText="Male" />
                        <MenuItem value={1} primaryText="Female" />
                    </SelectField>
                </div>
                <div className={styles.col}>
                    <TextField type="email" name="email" floatingLabelText="אימייל" value={state.email} onChange={handleInputChange} required />
                </div>
                <div className={styles.col}>
                    <TextField type="password" name="password" floatingLabelText="סיסמא" minLength="8" value={state.password} onChange={handleInputChange} required />
                </div>
                <div className={styles.col}>
                    <TextField name="first_name" floatingLabelText="שם פרטי" value={state.first_name} onChange={handleInputChange} required />
                </div>
                <div className={styles.col}>
                    <TextField name="last_name" floatingLabelText="שם משפחה" value={state.last_name} onChange={handleInputChange} required />
                </div>
                <div className={styles.col}>
                    <CitySelect onChange={city => this.setValue('city_id', city.id)} value={state.city_id} />
                </div>
                <div className={styles.col}>
                    <CustomToggle label={state.is_teacher ? "מדריך בקבוצות?" : "מעוניין בשיעורים קבוצתיים?"} value={!!state.group_lesson} fieldName="group_lesson" setValue={this.setValue} />
                </div>
            </React.Fragment>
        );
    }

    renderTeacherForm() {

        const { state, handleInputChange } = this;

        return (
            <React.Fragment>
                <div className={styles.col}>
                    <TextField name="phone" floatingLabelText="טלפון" value={state.phone} onChange={handleInputChange} required />
                </div>
                <div className={styles.col}>
                    <TextField type="number" name="price" floatingLabelText="מחיר" value={state.price} onChange={handleInputChange} required />
                </div>
                <div className={styles.col}>
                    <SubjectSelect onChange={subject => this.setValue('subjects', subject)} value={state.subjects.map(s => s.id)} />
                </div>
                <div className={styles.last}>
                    <ImageUpload style={{ marginTop: '5px' }} onChange={file => this.setValue('image', file)}/>
                </div>
            </React.Fragment>
        );
    }

    renderStudentForm() {

        const { state, handleInputChange } = this;

        return (
            <React.Fragment>
                <div className={styles.col}>
                    <TextField type="number" name="min_price" floatingLabelText="מחיר מינימלי" value={state.min_price} onChange={handleInputChange} required />
                </div>
                <div className={styles.col}>
                    <TextField type="number" name="max_price" floatingLabelText="מחיר מקסימלי" value={state.max_price} onChange={handleInputChange} required />
                </div>
                <div className={styles.last}>
                    <TextField type="number" name="max_km_distance" floatingLabelText="מרחק מקסימלי בקילומטרים" value={state.max_km_distance} onChange={handleInputChange} required />
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