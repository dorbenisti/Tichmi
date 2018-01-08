import { GET_ALL_TEACHERS_CALLED, GET_ALL_TEACHERS_FAIL, GET_ALL_TEACHERS_SUCCESS } from "../constants";
import axios from 'axios';

const getAllTeachersStarted = () => {
    return { type: GET_ALL_TEACHERS_CALLED };
}

const getAllTeachersSuccess = teachers => {
    return { type: GET_ALL_TEACHERS_SUCCESS, teachers };
};

const getAllTeachersFailed = (error) => {
    return { type: GET_ALL_TEACHERS_FAIL, error };
};

const getAllTeachers = () => {
    return dispatch => {
        dispatch(getAllTeachersStarted());

        axios.get('/api/teachers').then(res => {
            dispatch(getAllTeachersSuccess(res.data));
        }, err => dispatch(getAllTeachersFailed(err)));
    };
};

export const TeachersActions = {
    getAllTeachers
};