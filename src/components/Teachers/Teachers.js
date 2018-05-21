import React, { Component } from 'react';
import styles from './style.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { GridList, GridTile } from 'material-ui/GridList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TeachersActions } from "../../actions";
import Teacher from "../Teacher/Teacher";

class Teachers extends Component {

    componentDidMount() {
        this.props.actions.getAllTeachers();
    }

    render() {
        const { match } = this.props;

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
                <div className={styles.teachers_view}>
                    {this.props.teachers.map(teacher => (
                        <Teacher key={teacher.id} teacher={teacher} match={match} />))}
                </div>
            )
        }
    }
}

function mapStateToProps(state) {

    const { teachers, loading, error, searchText } = state.teachers;

    return {
        teachers,
        loading,
        error,
        searchText
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TeachersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
