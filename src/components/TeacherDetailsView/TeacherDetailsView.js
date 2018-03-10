import React, { Component } from 'react';
import Teacher from "../Teacher/Teacher";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from "react-redux";
import axios from "axios";

import styles from './style.css';

class TeacherDetailsView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teacher: null
        };
    }

    componentDidMount() {
        axios.get(`/api/teacher/${this.props.id}`).then(res => {
            this.setState({
                teacher: res.data
            });
        });
    }

    render() {
        const { teacher } = this.state;

        if (!teacher) return (<div>Loading...</div>);

        return (
            <div>
                Teacher is {teacher.first_name} {teacher.last_name} from {teacher.city_name}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;

    return { id };
};

export default connect(mapStateToProps)(TeacherDetailsView);