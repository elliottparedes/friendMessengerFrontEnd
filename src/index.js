import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Nav from './components/nav';
import Login from "./routes/login";
import Register from "./routes/register";
import axios from 'axios';

// axios.defaults.baseURL = "http:localhost:3000/";
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTKEY');
ReactDOM.render(
 <App/>,document.getElementById('root')
);



