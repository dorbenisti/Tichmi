import { GET_ALL_TEACHERS_CALLED, GET_ALL_TEACHERS_FAIL, GET_ALL_TEACHERS_SUCCESS, SET_SEARCH_TEXT } from "../constants";

const defaultValue = { 
    teachers: [],
    searchText: ''
};

export default (state = defaultValue, action) => {
    switch (action.type) {
        case GET_ALL_TEACHERS_CALLED:
            return {...state, loading: true, error: null};
        case GET_ALL_TEACHERS_FAIL:
            return {...state, error: action.error, loading: false };
        case GET_ALL_TEACHERS_SUCCESS:
            return {...state, teachers: action.teachers, loading: false, error: null};
        case SET_SEARCH_TEXT:
            return {...state, searchText: action.searchText, loading: false, error: null};
        default: return state;
    }
};