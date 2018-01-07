import React, { Component } from 'react';
import styles from './style.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Finder extends Component {

    render(){
        return <div className={styles.Finder}>
            <h2>מצא את המורה שלך:</h2>
            <TextField
                /*style={{backgroundColor: 'white'}}*/
                hintText="תחום עיסוק"
            />
            <RaisedButton label="חפש" secondary={true} />
        </div>;
    }
}

export default Finder;
