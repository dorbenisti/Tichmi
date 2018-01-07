import React, { Component } from 'react';
import styles from './style.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Teacher from "./Teacher";

class Teachers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: []
        }
    }

    render(){

        this.state.teachers = [<Teacher firstName={"אבי"}/>,
            <Teacher firstName={"דני"} />,
            <Teacher firstName={"דור"}/>,
            <Teacher firstName={"בר"}/>]
        return <div>
            {this.state.teachers}
        </div>;
    }
}

export default Teachers;
