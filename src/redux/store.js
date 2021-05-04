import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';

export const history = createBrowserHistory();

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), thunkMiddleware));

export default (preloadState) => {
    return createStore(
        createRootReducer(history),
        preloadState,
        enhancer
    )
}