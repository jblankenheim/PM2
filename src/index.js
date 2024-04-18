
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import config from './aws-exports';
import {Amplify} from 'aws-amplify';
import { BrowserRouter as Router} from 'react-router-dom'

Amplify.configure(config);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
 
    <App />
  
  </Router>
);