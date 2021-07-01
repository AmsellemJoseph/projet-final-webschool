import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import loginReducer from './Redux/loginReducer'
import userLoggedReducer from './Redux/userLoggedReducer'
import userInfoReducer from './Redux/userInfoReducer'

const rootReducer = combineReducers({
  loginReducer,
  userLoggedReducer,
  userInfoReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
