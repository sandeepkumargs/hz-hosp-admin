/**Entry point for a JS file
 * Parent JS file for the project
 * Redux store is declared
 * Saga inclusion
 * Bootstrap inclusion
 * SUGGESTED NOT TO MAKE ANY CHANGES IN THIS FILE
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import { BrowserRouter } from 'react-router-dom';

// import 'core-js/es6/map';
// import 'core-js/es6/set';
// import 'core-js/fn/array/find';
// import 'core-js/fn/array/includes';
// import 'core-js/fn/number/is-nan';
// import "core-js/fn/set";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './gtWalsheimFont.ttf';
import './index.scss';

render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>,
   document.getElementById('root')
);
if (module.hot) {
   module.hot.accept(App);
}
