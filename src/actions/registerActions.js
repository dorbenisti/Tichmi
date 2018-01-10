import { REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_CALLED } from "../constants";
import { push } from 'react-router-redux';
import { LoginActions } from "./loginActions";
import axios from 'axios';

const registrationCalled = () => {
    return { type: REGISTER_CALLED };
}

const registrationSuccess = () => {
    return { type: REGISTER_SUCCESS };
}

const registrationFailure = (err) => {
    return { type: REGISTER_FAILURE, err };
}

const register = (event, userDetails) => {
    event.preventDefault();

    return dispatch => {

        dispatch(registrationCalled());

        axios.post('/api/register', userDetails)
            .then(res => {
                dispatch(registrationSuccess())

                axios.get('/api/user').then(res => {
                    dispatch(LoginActions.loginSuccess(res.data));
                });

                dispatch(push('/'));
            })
            .catch(err => dispatch(registrationFailure(err)));
    };
}

export const RegistrationActions = {
    register
};

