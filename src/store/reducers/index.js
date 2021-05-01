import { combineReducers } from 'redux';
import user from './user';
import card from './card';

export default combineReducers ({
    user,
    card
});