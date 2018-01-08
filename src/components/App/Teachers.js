import React, { Component } from 'react';
import styles from './style.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Teacher from "./Teacher";

class Teachers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: ['אבי', 'דני', 'דור', 'בר']
        }
    }

    render(){
        return <div>
            {this.state.teachers.map(teacherName => (
                <Teacher firstName={teacherName} key={teacherName} />
            ))}
        </div>;
    }
}

export default Teachers;
