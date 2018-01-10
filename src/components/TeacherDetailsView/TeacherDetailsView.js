import React, { Component } from 'react';
import Teacher from "../Teacher/Teacher";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from "react-redux";

import styles from './style.css';

class TeacherDetailsView extends Component {
    render() {
        const [ firstName ] = this.props.id.split('_');
        return (
            <MuiThemeProvider>
                <Teacher firstName={firstName} />
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;

    return { id };
};

export default connect(mapStateToProps)(TeacherDetailsView);