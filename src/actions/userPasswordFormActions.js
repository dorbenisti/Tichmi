import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER, REGISTRATION_FAILURE, REGISTRATION_SUCCESS, USER_CHANGED, PASSWORD_CHANGED } from "../constants";

const usernameChanged = (username) => {
    return { type: USER_CHANGED, user: username };
}

const passwordChanged = (password) => {
    return { type: PASSWORD_CHANGED, password };
}

export const UserPasswordFormActions = {
    usernameChanged,
    passwordChanged
};