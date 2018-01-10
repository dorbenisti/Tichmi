import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import login from "./login";
import register from "./register";
import teachers from "./teachers";

const Reducers = combineReducers({
    login,
    register,
    teachers,
    routing: routerReducer
});

export default Reducers;
