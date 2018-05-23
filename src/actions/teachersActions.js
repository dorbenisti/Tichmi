import { GET_ALL_TEACHERS_CALLED, GET_ALL_TEACHERS_FAIL, GET_ALL_TEACHERS_SUCCESS } from "../constants";
import axios from 'axios';

const getAllTeachersStarted = (subjectId = null) => {
    return { type: GET_ALL_TEACHERS_CALLED };
}

const getAllTeachersSuccess = (teachers, isFiltered) => {
    return { type: GET_ALL_TEACHERS_SUCCESS, teachers, isFiltered };
};

const getAllTeachersFailed = (error) => {
    return { type: GET_ALL_TEACHERS_FAIL, error };
};

const getAllTeachers = (subjectId = null) => {
    return dispatch => {
        dispatch(getAllTeachersStarted());

        let promise;

        let isFiltered = subjectId !== null;
        if (!isFiltered) {
            promise = axios.get('/api/teachers');
        } else {
            promise = axios.get(`/api/relevant-teachers/${subjectId}`);
        }

        promise.then(res => {
            dispatch(getAllTeachersSuccess(res.data, isFiltered));
        });

        //.catch(e => {console.log(e)});
    };
};

export const TeachersActions = {
    getAllTeachers
};