import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_CALLED, LOGOUT_CALLED, LOGOUT_DONE } from "../constants";
import { push } from 'react-router-redux'
import axios from 'axios';

const loginCalled = () => { 
    return { type: LOGIN_CALLED };
};

const loginSuccess = (user) => {
    return { type: LOGIN_SUCCESS, user };
}

const loginFailure = (err) => {
    return { type: LOGIN_FAILURE, err };
}

const logoutStarted = () => {
    return { type: LOGOUT_CALLED };
};

const logoutDone = () => {
    return { type: LOGOUT_DONE }
};

const login = (event, userDetails) => {
    event.preventDefault();

    return dispatch => {

        dispatch(loginCalled());

        axios.post('/api/login', userDetails)
            .then(res => {
                    axios.get('/api/user').then(res => {
                        dispatch(loginSuccess(res.data));
                        dispatch(push('/'));
                    });
                })
            .catch(err => dispatch(loginFailure(err)));
    };
};

const logout = (event) => {
    if (event) {
        event.preventDefault();
    }

    return dispatch => {
        
        dispatch(logoutStarted());

        axios.get('/api/logout').then(() => {
            dispatch(logoutDone());
            dispatch(push('/'));   
        })
    };
};

export const LoginActions = {
    login,
    logout,
    loginSuccess
};