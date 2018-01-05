import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import demo from './demo';
import server from "./serverCallPending";

const Reducers = combineReducers({
    demo,
    server,
    routing: routerReducer
});

export default Reducers;
