import { USER_CHANGED, PASSWORD_CHANGED } from "../actions";

const defaultValue = {
    user: '',
    password: ''
}

export default (state = defaultValue, action) => {
    switch (action.type) {
        case USER_CHANGED:
            return {...state, user: action.user};
        case PASSWORD_CHANGED:
            return {...state, password: action.password};
        default: return state;
    }
};