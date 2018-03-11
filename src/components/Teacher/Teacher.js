import React, { Component } from 'react';
import styles from './style.css';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import HouseIcon from "material-ui/svg-icons/social/location-city";
import MoneyIcon from "material-ui/svg-icons/editor/attach-money";
import SubjectIcon from "material-ui/svg-icons/action/subject";
import { Link } from 'react-router-dom';

class Teacher extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    render() {
        const { teacher } = this.props;
        const { expanded } = this.state;

        const teacherName = `${teacher.first_name} ${teacher.last_name}`;

        const overlay = (
            <CardTitle title={teacherName} subtitle={teacher.city_name} />
        );

        const itemWidth = '500px';
        const subjectsString = (teacher.subjects.map(s => s.name)).join();

        return (
            <Link to={`/teacherDetails/${teacher.id}`}>
                <Card expanded={expanded} onExpandChange={expanded => this.setState({ expanded })} style={{ width: itemWidth }}>
                    <CardHeader
                        title={teacherName}
                        subtitle={teacher.city_name}
                        avatar={teacher.image_url}
                        actAsExpander={true}
                        showExpandableButton={true} />
                    <CardMedia
                        overlay={overlay}>
                        <img src={teacher.image_url} 
                             alt={teacherName} 
                             style={{ width: itemWidth, height: '100%', objectFit: 'contain', minWidth: 'unset' }} />
                    </CardMedia>
                    <CardText expandable={true}>
                        <List>
                            <ListItem primaryText={teacher.city_name} leftIcon={<HouseIcon />} />
                            <ListItem primaryText={`₪${teacher.price}`} leftIcon={<MoneyIcon />} />
                            <ListItem primaryText={subjectsString} leftIcon={<SubjectIcon />} />                            
                        </List>
                    </CardText>
                </Card>
            </Link>
        );
    }
}

export default Teacher;
