import React, { Component } from 'react';
import styles from './style.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SearchBox extends Component {

    render(){
        return <div className={styles.Finder}>
            <h1>מאגר המורים הגדול בישראל!</h1>
            <h2>מורים ומרצים מנוסים לכל המקצועות בכל הארץ</h2>
            <TextField hintText="מה בא לך ללמוד?" />
            <RaisedButton label="חפש" secondary={true} className={styles.button}/>
            <RaisedButton label="חיפוש מתקדם" secondary={true} className={styles.button}/>
        </div>;
    }
}

export default SearchBox;