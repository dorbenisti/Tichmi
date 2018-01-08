import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import history from "./history";
import { createLogger } from 'redux-logger';

const middleware = applyMiddleware(thunk, createLogger(), routerMiddleware(history));

const store = createStore(rootReducer, middleware);

export default store;