import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './slices/authSlice';

export default (history) => combineReducers({
    router: connectRouter(history),
    user: authReducer
});