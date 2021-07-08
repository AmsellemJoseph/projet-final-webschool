import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Font from './utils/Font'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import loginReducer from './Redux/loginReducer'
import userLoggedReducer from './Redux/userLoggedReducer'
import userInfoReducer from './Redux/userInfoReducer'
import horseReducer from './Redux/horseReducer'
import gameLauncherReducer from './Redux/gameLauncherReducer'
import loadingReducer from './Redux/loadingReducer'
import navBarUserReducer from './Redux/navBarUserReducer'
import './utils/FontAwesome'

const rootReducer = combineReducers({
  loginReducer,
  userLoggedReducer,
  userInfoReducer,
  horseReducer,
  gameLauncherReducer,
  loadingReducer,
  navBarUserReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Font />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
