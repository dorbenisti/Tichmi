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
        const { match, isFiltered, teachers, error, loading, actions } = this.props;
        const { getAllTeachers } = actions;

        if (error) {
            return (
                <h1>Error occured: {this.props.error}</h1>
            )
        } else if (loading) {
            return (
                <h1>loading...</h1>
            )
        } else {
            return (
                <React.Fragment>
                    { isFiltered && <a href="" onClick={getAllTeachers}>בטל חיפוש</a> }
                    <div className={styles.teachers_view}>
                        {teachers.map(teacher => (
                            <Teacher key={teacher.id} teacher={teacher} match={match} />))}
                    </div>
                </React.Fragment>
            )
        }
    }
}

function mapStateToProps(state) {

    const { teachers, loading, error, searchText, isFiltered } = state.teachers;

    return {
        teachers,
        loading,
        isFiltered,
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
