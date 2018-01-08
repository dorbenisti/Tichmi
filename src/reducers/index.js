import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userInput from "./userPasswordInput";

const Reducers = combineReducers({
    userInput,
    routing: routerReducer
});

export default Reducers;
