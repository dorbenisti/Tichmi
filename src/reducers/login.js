import { LOGIN_CALLED, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_CALLED, LOGOUT_DONE } from "../constants";

const defaultValue = {};

export default (state = defaultValue, action) => {
    switch (action.type) {
        case LOGIN_CALLED:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return {...state, user: action.user};
        case LOGIN_FAILURE:
            return {...state, error: action};
        case LOGOUT_CALLED:
            return { ...state, loading: true };
        case LOGOUT_DONE:
            return { ...state, user: null };
        default: return state;
    }
};