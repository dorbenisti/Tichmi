import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userInput from "./userPasswordInput";
import login from "./login";
import register from "./register";
import teachers from "./teachers";

const Reducers = combineReducers({
    login,
    register,
    userInput,
    teachers,
    routing: routerReducer
});

export default Reducers;
