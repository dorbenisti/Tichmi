// src/components/About/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './style.css';

export default class TeacherMain extends Component {
    render() {
        return (
            <div className={classnames('TeacherMain')}>
                <h1>המורה דנה</h1>
                <h3>המורה הכי טובה עם קבלות</h3>
            </div>
        );
    }
}
