import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import StarsRating from "../common-components/stars-rating/StarsRating";
import { RaisedButton, FlatButton, Dialog, TextField } from "material-ui";

import styles from './style.css';

class TeacherDetailsView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teacher: null,
            contactDialogOpen: false,
            reviewDialogOpen: false,
            chosenRating: 0,
        };

        this.onRatingChange = this.onRatingChange.bind(this);
        this.handleContactDialogOpen = this.handleContactDialogOpen.bind(this);
        this.handleContactDialogClose = this.handleContactDialogClose.bind(this);
        this.handleReviewDialogOpen = this.handleReviewDialogOpen.bind(this);
        this.handleReviewDialogClose = this.handleReviewDialogClose.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/teacher/${this.props.id}`).then(res => {
            this.setState({
                teacher: res.data
            });
        });
    }

    render() {
        const contactActions = [
            <FlatButton label='סגור' onClick={this.handleContactDialogClose} primary={true} />
        ];

        const { teacher, contactDialogOpen, reviewDialogOpen, chosenRating } = this.state;

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
                            {teacher.subjects.map(s => (
                                <li key={s.name}>{s.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles['extended-details-title']}>הדרכה בקבוצות</div>
                    <div className={styles['extended-details-content']}>
                        {teacher.group_lesson ? 'כן' : 'לא'}
                    </div>
                </div>
                <div className={styles['contact-box']}>
                    <span>דירוג ממוצע:</span>
                    <StarsRating rating={teacher.avgRating ? teacher.avgRating : 0} style={{ marginBottom: '10px' }} disabled={true} />
                    <FlatButton>ביקורות: {teacher.numOfReviews}</FlatButton>  {/* onClick={}*/}
                    <Dialog title='ביקורות'>  {/* open={}*/}
                        <div></div>
                    </Dialog>
                    <RaisedButton
                        className={styles['contact-button']}
                        type="button"
                        secondary={true}
                        buttonStyle={{ color: "white" }}
                        onClick={this.handleReviewDialogOpen}>
                        הוסף ביקורת
                    </RaisedButton>
                    <RaisedButton
                        className={styles['contact-button']}
                        type="button"
                        secondary={true}
                        buttonStyle={{ color: "white" }}
                        onClick={this.handleContactDialogOpen}>
                        צור קשר
                    </RaisedButton>
                    <ReviewSubmitModal teacher={teacher} isModalOpen={reviewDialogOpen} handleClose={this.handleReviewDialogClose} />
                </div>
                <Dialog title={'צור קשר'} open={contactDialogOpen} onRequestClose={this.handleContactDialogClose} actions={contactActions}>
                    <b>{`${teacher.first_name} ${teacher.last_name}`}</b>
                    <p>{`כתובת מייל:  ${teacher.email}`}</p>
                    <p>{`פלאפון:  ${teacher.phone}`}</p>
                </Dialog>
            </div>
        );
    }

    onRatingChange(newRating) {
        this.setState({ chosenRating: newRating });
    }

    handleReviewSubmit() {
        // TODO: update DB with the new rating via server side
        this.handleReviewDialogClose();
    }

    handleContactDialogOpen() {
        this.setState({ contactDialogOpen: true });
    }

    handleContactDialogClose() {
        this.setState({ contactDialogOpen: false });
    }

    handleReviewDialogOpen() {
        this.setState({ reviewDialogOpen: true });
    }

    handleReviewDialogClose() {
        this.setState({ reviewDialogOpen: false });
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;

    return { id };
};

class ReviewSubmitModal extends Component {
    constructor(props) {
        super(props);

        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);

        this.state = {
            ratings: 0,
            reviewText: ""
        };
    }

    handleReviewSubmit() {
        const { teacher, handleClose } = this.props;
        const { ratings, reviewText } = this.state;

        axios.post('/api/review', { ratings, reviewText, teacherId: teacher.id }).then(handleClose);
    }

    render() {
        const { teacher, isModalOpen, handleClose } = this.props;
        const { ratings, reviewText } = this.state;

        const reviewActions = [
            <FlatButton label='סגור' onClick={handleClose} primary={true} />,
            <FlatButton label='שלח' onClick={this.handleReviewSubmit} primary={true} disabled={!ratings || !reviewText} />
        ];

        return (<Dialog title={'הוספת ביקורת'} open={isModalOpen} onRequestClose={handleClose} actions={reviewActions}>
            <b>{`${teacher.first_name} ${teacher.last_name}`}</b>
            <StarsRating rating={ratings} style={{ marginBottom: '10px' }} onChange={ratings => this.setState({ratings})} />
            <TextField multiLine={true} rows={2} rowsMax={4} value={reviewText} onChange={(e, reviewText) => this.setState({reviewText})} /> 
        </Dialog>);
    }
}

export default connect(mapStateToProps)(TeacherDetailsView);