import React, { Component } from 'react';
import Teacher from "../Teacher/Teacher";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import styles from './style.css';

class TeacherDetailsView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Teacher firstName={this.props.firstName} key={this.props.firstName} />
            </MuiThemeProvider>
        );
    }
}

export default TeacherDetailsView;