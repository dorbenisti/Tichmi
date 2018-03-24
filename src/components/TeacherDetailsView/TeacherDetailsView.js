import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";

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
            </div>
        );

        // return (
        //     <div>
        //         Teacher is {teacher.first_name} {teacher.last_name} from {teacher.city_name}
        //     </div>
        // );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;

    return { id };
};

export default connect(mapStateToProps)(TeacherDetailsView);