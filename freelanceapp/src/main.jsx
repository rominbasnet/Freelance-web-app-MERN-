import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
// import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import {Provider} from 'react-redux';
// import store from './store'; 
// import {createStore, applyMiddleware} from 'redux';
// import freelancersReducer from './reducers/reducer';

// const store = createStore(freelancersReducer, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
