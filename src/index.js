import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importation du Provider de Redux et la fonction de configuration du storeimport.
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Importation du reducer racine
import rootReducer from "./reducers";

// Configuration du store Redux
const store = configureStore({
  reducer: rootReducer,
});

// Le store Redux est passé via le Provider à l'ensemble de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
