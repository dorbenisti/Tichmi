import React, { Component } from 'react';
import styles from './style.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TeachersActions } from "../../actions";
import Teacher from "../Teacher/Teacher";

class Teachers extends Component {

    componentDidMount() {
        this.props.actions.getAllTeachers();
    }

    render() {
        if (this.props.error) {
            return (
                <h1>Error occured: {this.props.error}</h1>
            )
        } else if (this.props.loading) {
            return (
                <h1>loading...</h1>
            )
        } else {
            return (
                <div>
                    {/* <GridList> */}
                    {this.props.teachers.map(teacher => (
                        <GridTile key={teacher.id}><Teacher teacher={teacher} /></GridTile>
                    ))}
                    {/* </GridList> */}
                </div>
            )
        }
    }
}

function mapStateToProps(state) {

    const { teachers, loading, error } = state.teachers;

    return {
        teachers,
        loading,
        error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TeachersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
