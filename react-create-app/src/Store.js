//import react from 'react'
import {Action, createStore} from 'redux';
import reducer from './reducer';

const makeStore = () => {
    return createStore(reducer, {
        lastUpdated: 0,
        todos: [
            'Make the fire!',
            'Fix the breakfast!',
            'Wash the dishes!',
            'Do the mopping!',
        ],
    });
}

export default makeStore;
