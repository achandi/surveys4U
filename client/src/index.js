// import 'materialize-css/dist/css/materialize.min.css';
import './Index.sass';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app';
import thunk from 'redux-thunk';
import userReducer from './store/reducers/user';
import surveysReducer from './store/reducers/surveys';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedRed = combineReducers({
  user: userReducer,
  surveys: surveysReducer,
});

const store = createStore(
  combinedRed,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

console.log('STRIPE KEY=', process.env.REACT_APP_STRIPE_KEY);
