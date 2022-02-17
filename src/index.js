import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import axios from 'axios';

// axios.defaults.baseURL = "http:localhost:3000/";
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTKEY');
ReactDOM.render(
 <App/>,document.getElementById('root')
);



