import { REGISTER_CALLED, REGISTER_FAILURE, REGISTER_SUCCESS } from "../constants";

const defaultValue = {};

export default (state = defaultValue, action) => {
    switch (action.type) {
        case REGISTER_CALLED:
            return { ...state, loading: true };
        case REGISTER_SUCCESS:
            return {...state, success: true};
        case REGISTER_FAILURE:
            return {...state, error: action};
        default: return state;
    }
};