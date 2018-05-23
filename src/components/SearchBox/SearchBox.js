import React, { Component } from 'react';
import styles from './style.css';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TeachersActions } from "../../actions";
import axios from "axios";
import Snackbar from 'material-ui/Snackbar';

class SearchBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjects: null,
            selectedSubjectId: null,
            selectedText: '',
            errorMessage: '',
            snackBarOpen: false
        };

        this.handleOpenSnackBar = this.handleOpenSnackBar.bind(this);
        this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
        this.handleSnackBarMessege = this.handleSnackBarMessege.bind(this);
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
                    onNewRequest={(_, idx) => this.searchTeachers(subjects[idx].value)}
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
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackBarOpen}
                        autoHideDuration={5000}
                        message={<span id="message-id">{this.state.errorMessage}</span>}
                        action={[

                        ]}
                    />
                </div>
            </div>

        );
    }

    searchTeachers(subjectId) {
        var self = this;

        if (isNaN(Number(subjectId))){
            self.handleOpenSnackBar();
            self.handleSnackBarMessege('לא נבחר נושא לסינון');
        }
        else {
            try{
                self.props.actions.getAllTeachers(subjectId);
            }
            catch (e){
                self.handleOpenSnackBar();
                self.handleSnackBarMessege('בדיקה');
            }

        }


    }

    handleOpenSnackBar() {
        this.setState({ snackBarOpen: true });
    }

    handleCloseSnackBar() {
        this.setState({ snackBarOpen: false });
    }

    handleSnackBarMessege(txt) {
        this.setState({ errorMessage: txt });
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