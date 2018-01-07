import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import demo from './demo';
import server from "./serverCallPending";
import userInput from "./userPasswordInput";

const Reducers = combineReducers({
    demo,
    server,
    userInput,
    routing: routerReducer
});

export default Reducers;
