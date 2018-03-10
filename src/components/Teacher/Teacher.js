import React, { Component } from 'react';
import styles from './style.css';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
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

        return (
            <Link to={`/teacherDetails/${teacher.id}`}>
                <Card expanded={expanded} onExpandChange={expanded => this.setState({ expanded })} style={{  width: '400px' }}>
                    <CardHeader
                        title={teacherName}
                        subtitle={teacher.city_name}
                        avatar="/images/dani.jpg"
                        actAsExpander={true}
                        showExpandableButton={true} />
                    <CardMedia
                        overlay={overlay}
                        >
                        <img src="/images/dani.jpg" style={{ width: '400px', height: '100%', objectFit: 'contain', minWidth: 'unset' }}/>
                    </CardMedia>
                    <CardText expandable={true} style={{ textDecoration: 'none' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                </Card>
            </Link>
        );
    }
}

export default Teacher;
