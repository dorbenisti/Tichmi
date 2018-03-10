import React, { Component } from 'react';
import styles from './style.css';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

class Teacher extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            firstName: props.firstName ? props.firstName : "בר",
            lastName: props.lastName ? props.lastName : "יעקב",
            city: props.city ? props.city : "תל אביב",
            price: props.price ? props.price : "150",
            rate: props.rate ? props.rate : 4,
            reviewsCount: props.reviewsCount ? props.reviewsCount : 5,
            description: props.description ? props.description : "מורה טובה",
            imagePath: props.imagePath ? props.imagePath : "/images/dani.jpg",
        }


    }

    render(){
        return <div className={styles.teacher}>
            <Link to={`/teacherDetails/2`}>
                <Card>
                <img src={this.state.imagePath} className={styles.teacherImageProfile}/>
                <div className={styles.teacherDetails}>
                    <h5 style={{marginRight: '10px'}}>{this.state.firstName} </h5>
                    <h6 style={{marginRight: '10px', marginTop: 0}}>{this.state.city}</h6>
                    <h5 style={{marginRight: '10px'}}>{this.state.description}</h5>
                    <h4 >{this.state.price}</h4>
                </div>
                </Card>
            </Link>
        </div>;
    }
}

export default Teacher;
