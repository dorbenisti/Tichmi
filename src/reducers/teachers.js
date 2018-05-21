import { GET_ALL_TEACHERS_CALLED, GET_ALL_TEACHERS_FAIL, GET_ALL_TEACHERS_SUCCESS, SET_SEARCH_TEXT } from "../constants";

const defaultValue = { 
    teachers: [],
    searchText: '',
    isFiltered: false
};

export default (state = defaultValue, action) => {
    switch (action.type) {
        case GET_ALL_TEACHERS_CALLED:
            return {...state, loading: true, error: null, isFiltered: false };
        case GET_ALL_TEACHERS_FAIL:
            return {...state, error: action.error, loading: false, isFiltered: false };
        case GET_ALL_TEACHERS_SUCCESS:
            return {...state, teachers: action.teachers, isFiltered: action.isFiltered, loading: false, error: null};
        default: return state;
    }
};