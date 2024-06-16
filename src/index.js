import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './Utilities/ReduxToolKit/store';

// removed homePage because of the hashrouter   
// "homepage": "https://par-baz.ir/",

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);