import React from 'react';
import ReactDOM from 'react-dom';
import {StoreContext} from 'redux-react-hook';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Action, createStore} from 'redux';

import { Provider } from 'react-redux'
import counter from './reducer'


ReactDOM.render(
    <Provider store={createStore(counter)}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
