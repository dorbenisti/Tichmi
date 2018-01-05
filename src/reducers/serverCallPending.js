import { EXPRESS_TEST_START } from "../actions";

export default (state = {}, action) => {
    switch (action.type) {
        case EXPRESS_TEST_START:
            return {...state, expressTestPending: true};
        default: return { ...state, expressTestPending: false };
    }
};