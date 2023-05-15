import {combineReducers} from 'redux';
import { userReducer } from './UserReducer';
import { postReducer } from './PostReducer';
export const rootReducer = combineReducers({userReducer,postReducer})