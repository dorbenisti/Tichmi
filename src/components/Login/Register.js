// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './style.css';
import Teachers from "../App/Teachers";

export default class Register extends Component {
    render() {
        return (
            <div className={classnames('TeacherMain')}>
                <h1>עמוד הרשמה</h1>
            </div>
        );
    }
}
