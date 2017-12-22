import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';


import App from './containers/App';

import reducers from './reducers/index';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    reducers,
    applyMiddleware(middleware)
);


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
