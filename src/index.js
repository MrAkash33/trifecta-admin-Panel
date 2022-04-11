import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import swDev from './swDev.js';
import Print from './print'

ReactDOM.render(
  <React.StrictMode>
    <App /> 
    {/* <Print /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

swDev();