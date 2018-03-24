import React, { Component } from 'react';
import styles from './style.css';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import axios from "axios";

class SearchBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjects: null,
            selectedSubjectId: null
        };
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
                    onNewRequest={(selected) => this.setState({
                        selectedSubjectId: selected.value
                    })}
                />
            );
        }

        return <div className={styles.Finder}>
            <h1>מאגר המורים הגדול בישראל!</h1>
            <h2>מורים ומרצים מנוסים לכל המקצועות בכל הארץ</h2>

            {searchField}

            <RaisedButton label="חפש" secondary={true} className={styles.button} />
            <RaisedButton label="חיפוש מתקדם" secondary={true} className={styles.button} />
        </div>;
    }
}

export default SearchBox;