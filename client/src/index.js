import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Component from './Component';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
const initialState = {
    counter: 0,
    step: 1
}

function reducer (state = initialState, action) {
    console.log(action);

    switch (action.type) {
        case "CHANGE_STEP": {
            return {
                ...state,
                step: action.value
            }
        }
        case 'INCREMENT': {
            return {
                ...state,
                counter: state.counter+state.step
            }
        }
        case 'DECREMENT': {
            return {
                ...state,
                counter: state.counter-state.step
            }
        }

        default: {
            return state
        }
    }
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
         <Component />
    </Provider>

);

