import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './Utilities/ReduxToolKit/store';
import { TranslationProvider } from './Utilities/context/TranslationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <TranslationProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </TranslationProvider>
    </Provider>
);