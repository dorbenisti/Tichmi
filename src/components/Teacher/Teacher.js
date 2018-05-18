import React, { Component } from 'react';
import styles from './style.css';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import HouseIcon from "material-ui/svg-icons/social/location-city";
import MoneyIcon from "material-ui/svg-icons/editor/attach-money";
import SubjectIcon from "material-ui/svg-icons/action/subject";
import { Link } from 'react-router-dom';
import StarsRating from "../common-components/stars-rating/StarsRating";

class Teacher extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    render() {
        const { teacher, match } = this.props;
        const { expanded } = this.state;

        const teacherName = `${teacher.first_name} ${teacher.last_name}`;

        const overlay = (
            <CardTitle title={teacherName} subtitle={teacher.city_name} />
        );

        const subjectsString = (teacher.subjects.map(s => s.name)).join();

        return (
            <Link to={`${match.path}teacherDetails/${teacher.id}`}>
                <Card expanded={expanded}
                    onExpandChange={expanded => this.setState({ expanded })}
                    className={styles.card}>
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
                            className={styles['card-media']} />
                    </CardMedia>
                    <CardText expandable={true}>
                        <List>
                            <ListItem primaryText={teacher.city_name} leftIcon={<HouseIcon />} />
                            <ListItem primaryText={`₪${teacher.price}`} leftIcon={<MoneyIcon />} />
                            <ListItem primaryText={subjectsString} leftIcon={<SubjectIcon />} />
                            {teacher.avgRating !== null && <StarsRating rating={teacher.avgRating ? teacher.avgRating : 0} disabled={true} />}
                            {teacher.avgRating === null && <div>No rating to show...</div>}
                        </List>
                    </CardText>
                </Card>
            </Link>
        );
    }
}

export default Teacher;
