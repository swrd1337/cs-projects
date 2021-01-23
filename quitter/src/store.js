import { createStore, combineReducers } from 'redux';
import common from './reducers/common';

const store = createStore(combineReducers({
    common
}));

export default store;