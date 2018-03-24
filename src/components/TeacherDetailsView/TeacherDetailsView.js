import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import StarsRating from "../common-components/stars-rating/StarsRating";
import RaisedButton from "material-ui/RaisedButton";

import styles from './style.css';

class TeacherDetailsView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teacher: null
        };
    }

    componentDidMount() {
        axios.get(`/api/teacher/${this.props.id}`).then(res => {
            this.setState({
                teacher: res.data
            });
        });
    }

    render() {
        const { teacher } = this.state;

        if (!teacher) return (<div>Loading...</div>);


        return (
            <div className={styles.container}>
                <div className={styles.banner}>
                    <img className={styles.image} src={teacher.image_url} />
                    <div className={styles['general-details']}>
                        <div className={styles.name}>{teacher.first_name} {teacher.last_name}</div>
                        <div className={styles.city}>{teacher.city_name}</div>
                    </div>
                    <div className={styles.price}>
                        {`₪${teacher.price}`}
                    </div>
                </div>
                <div className={styles['extended-details']}>
                    <div className={styles['extended-details-title']}>על עצמי</div>
                    <div className={styles['extended-details-content']}>
                        {teacher.description}
                    </div>
                    <div className={styles['extended-details-title']}>תחומי לימוד</div>
                    <div className={styles['extended-details-content']} style={{ paddingTop: '0' }}>
                        {/* {(teacher.subjects.map(s => s.name)).join()} */}
                        <ul>
                        { teacher.subjects.map(s => (
                            <li key={s.name}>{s.name}</li>
                        )) }
                        </ul>
                    </div>
                    <div className={styles['extended-details-title']}>הדרכה בקבוצות</div>
                    <div className={styles['extended-details-content']}>
                        {teacher.group_lesson ? 'כן' : 'לא'}
                    </div>
                </div>
                <div className={styles['contact-box']}>
                    {teacher.avgRating !== null && <StarsRating rating={teacher.avgRating} disabled={true} style={{ marginBottom: '10px' }} />}
                    <div>ביקורות: {teacher.numOfReviews}</div>
                    <RaisedButton className={styles['contact-button']} type="button" secondary={true} buttonStyle={{color:"white"}}>צור קשר</RaisedButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;

    return { id };
};

export default connect(mapStateToProps)(TeacherDetailsView);