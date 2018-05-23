import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import StarsRating from "../common-components/stars-rating/StarsRating";
import { RaisedButton, FlatButton, Dialog, TextField, Paper } from "material-ui";
import Snackbar from 'material-ui/Snackbar';

import styles from './style.css';

class TeacherDetailsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacher: null,
            contactDialogOpen: false,
            reviewDialogOpen: false,
            reviewViewOpen: false,
            chosenRating: 0,
            errorMessage: '',
            snackBarOpen: false
        };

        this.onReviewSubmit = this.onReviewSubmit.bind(this);
        this.getTeacherDetails = this.getTeacherDetails.bind(this);
        this.handleOpenSnackBar = this.handleOpenSnackBar.bind(this);
        this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
        this.handleSnackBarMessege = this.handleSnackBarMessege.bind(this);
    }

    async componentDidMount() {
        const teacher = await this.getTeacherDetails();
        const didAlreadyRateThisTeacher = await this.didUserAlreadyRate();

        this.setState({ teacher, didAlreadyRateThisTeacher });
    }

    render() {
        const contactActions = [
            <FlatButton label='סגור' onClick={() => this.setState({contactDialogOpen: false})} primary={true} />
        ];

        const { teacher, contactDialogOpen, reviewDialogOpen, reviewViewOpen, didAlreadyRateThisTeacher } = this.state;

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
                    <FlatButton onClick={() => this.setState({ reviewViewOpen: true })} disabled={teacher.reviews.length === 0}>ביקורות: {teacher.reviews.length}</FlatButton>
                    <ReviewViewModal isModalOpen={reviewViewOpen} handleClose={() => this.setState({ reviewViewOpen: false })} reviews={teacher.reviews}/>
                    <RaisedButton
                        className={styles['contact-button']}
                        type="button"
                        secondary={true}
                        buttonStyle={{ color: "white" }}
                        onClick={() => this.setState({ reviewDialogOpen: true })}
                        disabled={didAlreadyRateThisTeacher}>
                        הוסף ביקורת
                    </RaisedButton>
                    <RaisedButton
                        className={styles['contact-button']}
                        type="button"
                        primary={true}
                        buttonStyle={{ color: "white" }}
                        onClick={() => this.setState({contactDialogOpen: true})}>
                        צור קשר
                    </RaisedButton>
                    <ReviewSubmitModal
                        teacher={teacher}
                        isModalOpen={reviewDialogOpen}
                        handleClose={() => this.setState({ reviewDialogOpen: false })}
                        onSuccess={this.onReviewSubmit}
                        handleOpenSnackBar={this.handleOpenSnackBar}
                        handleCloseSnackBar={this.handleCloseSnackBar}
                        handleSnackBarMessege={(txt) => this.handleSnackBarMessege(txt)}
                    />
                </div>
                <Dialog title={'צור קשר'} open={contactDialogOpen} onRequestClose={() => this.setState({contactDialogOpen: false})} actions={contactActions}>
                    <b>{`${teacher.first_name} ${teacher.last_name}`}</b>
                    <p>{`כתובת מייל:  ${teacher.email}`}</p>
                    <p>{`פלאפון:  ${teacher.phone}`}</p>
                </Dialog>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackBarOpen}
                        autoHideDuration={5000}
                        message={<span id="message-id">{this.state.errorMessage}</span>}
                        action={[

                        ]}
                    />
                </div>

            </div>
        );
    }

    async getTeacherDetails() {
        return axios.get(`/api/teacher/${this.props.id}`).then(res => res.data);
    }

    async didUserAlreadyRate() {
        const { id } = this.props;

        return axios.get(`/api/didUserRateTeacher/${id}`).then(res => res.data);
    }

    async onReviewSubmit() {
        const teacher = await this.getTeacherDetails();

        this.setState({ teacher, didAlreadyRateThisTeacher: true });
    }

    handleOpenSnackBar() {
        this.setState({ snackBarOpen: true });
    }

    handleCloseSnackBar() {
        this.setState({ snackBarOpen: false });
    }

    handleSnackBarMessege(txt) {
        this.setState({ errorMessage: txt });
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
        const { teacher, handleClose, onSuccess, handleCloseSnackBar, handleOpenSnackBar, handleSnackBarMessege } = this.props;
        const { ratings, reviewText } = this.state;

        axios.post('/api/review', { ratings, reviewText, teacherId: teacher.id })
            .then(() => {
                handleOpenSnackBar();
                handleSnackBarMessege('הביקורת נשמרה בהצלחה!');
                onSuccess();
                handleClose();
            })
            .catch((e) => {
                handleOpenSnackBar();
                handleSnackBarMessege('אירעה שגיאה בעת שמירת הביקורת.');
            });

        setTimeout(handleCloseSnackBar, 5000);
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
            <TextField multiLine={true} rowsMax={4} value={reviewText} hintText={'פרגנו בהערות...'} onChange={(e, reviewText) => this.setState({reviewText})} />
        </Dialog>);
    }
}

class ReviewViewModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { reviews, isModalOpen, handleClose } = this.props;

        const modalActions = [
            <FlatButton label='סגור' onClick={handleClose} primary={true} />
        ];

        return (
            <Dialog title={'ביקורות'} open={isModalOpen} onrequestclose={handleClose} actions={modalActions} autoScrollBodyContent={true}>
                {
                    reviews.map(review =>
                        <Paper zDepth={3} style={{height: 'max-content', width: '70%', marginBottom: '20px', paddingLeft: '5px'}}>
                            <StarsRating rating={review.rating} disabled={true}/>
                            {review.content}
                            <p>{(new Date(review.update_time)).toLocaleDateString()}</p>
                        </Paper>
                    )
                }
            </Dialog>
        );
    }
}

export default connect(mapStateToProps)(TeacherDetailsView);