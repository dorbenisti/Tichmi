import axios from 'axios';
import { push } from 'react-router-redux'

export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const registrationSuccess = (data) => {
    return { type: REGISTRATION_SUCCESS, data };
}

export const REGISTRATION_FAILURE= "REGISTRATION_FAILURE";
export const registrationFailure = (err) => {
    return { type: REGISTRATION_FAILURE, err };
}

export const REGISTER = "REGISTER";
export const register = (event, userDetails) => {
    event.preventDefault();

    return dispatch => {
        axios.post('/api/register', userDetails)
        .then(res => dispatch(push('/')))
        .catch(err => dispatch(push('/register')));
    };
};

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = (data) => {
    return { type: LOGIN_SUCCESS, data };
}

export const LOGIN_FAILURE= "LOGIN_FAILURE";
export const loginFailure = (err) => {
    return { type: LOGIN_FAILURE, err };
}

export const LOGIN = "LOGIN";
export const login = (event, userDetails) => {
    event.preventDefault();

    return dispatch => {
        axios.post('/api/login', userDetails)
            .then(res => dispatch(push('/')))
            .catch(err => dispatch(push('/login')));
    };
};

export const USER_CHANGED = "USER_CHANGED";
export const usernameChanged = (username) => {
    return { type: USER_CHANGED, user: username };
}

export const PASSWORD_CHANGED= "PASSWORD_CHANGED";
export const passwordChanged = (password) => {
    return { type: PASSWORD_CHANGED, password };
}