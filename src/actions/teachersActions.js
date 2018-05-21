import { GET_ALL_TEACHERS_CALLED, GET_ALL_TEACHERS_FAIL, GET_ALL_TEACHERS_SUCCESS } from "../constants";
import axios from 'axios';

const getAllTeachersStarted = (subjectId = null) => {
    return { type: GET_ALL_TEACHERS_CALLED };
}

const getAllTeachersSuccess = teachers => {
    return { type: GET_ALL_TEACHERS_SUCCESS, teachers };
};

const getAllTeachersFailed = (error) => {
    return { type: GET_ALL_TEACHERS_FAIL, error };
};

const getAllTeachers = (subjectId = null) => {
    return dispatch => {
        dispatch(getAllTeachersStarted());

        let promise;

        if (subjectId === null) {
            promise = axios.get('/api/teachers');
        } else {
            promise = axios.get(`/api/relevant-teachers/${subjectId}`);
        }

        promise.then(res => {
            dispatch(getAllTeachersSuccess(res.data));
        }, err => dispatch(getAllTeachersFailed(err)));
    };
};

export const TeachersActions = {
    getAllTeachers
};