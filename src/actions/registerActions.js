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

        axios.post('/api/register', getFormData(userDetails), {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                dispatch(registrationSuccess())

                axios.get('/api/user').then(res => {
                    dispatch(LoginActions.loginSuccess(res.data));
                    dispatch(push('/'));
                });
            })
            .catch(err => dispatch(registrationFailure(err)));
    };
}

export const RegistrationActions = {
    register
};

function getFormData(object) {
    const formData = new FormData();

    Object.keys(object).forEach(key => {
        const data = object[key];

        if (typeof data === 'object' && !(data instanceof File)) {
            formData.append(key, JSON.stringify(data))
        } else {
            formData.append(key, data)
        }
    });

    return formData;
}