import React, { Component } from 'react';
import styles from './style.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SearchBox extends Component {

    render(){
        return <div className={styles.Finder}>
            <h2>מצא את המורה שלך:</h2>
            <TextField
                hintText="תחום עיסוק"
            />
            <RaisedButton label="חפש" secondary={true} className={styles.button}/>
        </div>;
    }
}

export default SearchBox;