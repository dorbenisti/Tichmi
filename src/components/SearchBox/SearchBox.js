import React, { Component } from 'react';
import styles from './style.css';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TeachersActions } from "../../actions";
import axios from "axios";

class SearchBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjects: null,
            selectedSubjectId: null,
            selectedText: ''
        };

        this.searchInputChange = this.searchInputChange.bind(this);
        this.searchTeachers = this.searchTeachers.bind(this);
    }

    componentDidMount() {
        axios.get('/api/subjects').then(result => {
            this.setState({
                subjects: result.data.map(subject => ({
                    text: subject.name,
                    value: subject.id
                }))
            })
        });
    }

    render() {

        const { subjects, selectedSubjectId } = this.state;

        let searchField;
        if (!subjects)
            searchField = (<TextField hintText="מה בא לך ללמוד?" />);
        else {
            const dataSourceConfig = {
                text: 'text',
                value: 'value',
            };
            searchField = (
                <AutoComplete
                    floatingLabelText="מה בא לך ללמוד?"
                    openOnFocus={true}
                    dataSource={subjects}
                    dataSourceConfig={dataSourceConfig}
                    filter={AutoComplete.noFilter}
                    floatingLabelFocusStyle={{color: "rgba(0, 0, 0, 0.3)"}}
                    onUpdateInput={this.searchInputChange}
                    onNewRequest={this.searchTeachers}
                />
            );
        }

        return (
            <div className={'search-box'}>
                <h1 className={styles['header-title']}>מאגר המורים הגדול בישראל!</h1>
                <h2 className={styles['sub-title']}>מורים ומרצים מנוסים לכל המקצועות בכל הארץ</h2>

                {searchField}

                <RaisedButton label="חפש" secondary={true} className={styles.button} onClick={this.searchTeachers} />
                <RaisedButton label="חיפוש מתקדם" secondary={true} className={styles.button} />
            </div>
        );
    }

    searchInputChange(searchText) {
        this.setState( { selectedText: searchText } );
    }

    searchTeachers() {
        this.props.actions.setSearchText(this.state.selectedText);
    }
}

function mapStateToProps(state) {
    const { searchText } = state.teachers;

    return { searchText };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TeachersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);