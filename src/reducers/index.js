import {combineReducers} from 'redux';
import {personsReducer} from "./persons";
import {orderReducer} from "./order";

export const rootReducer = combineReducers({
    persons: personsReducer,
    order: orderReducer,
});