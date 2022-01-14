import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/nav';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
 import {useState} from 'react';
import axios from 'axios';
import React, {Component} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/register";
import Home from "./routes/home";
import Logout from "./routes/logout";

export default class App extends Component {

  state ={};
  componentDidMount= () =>{
    if(localStorage.getItem("JWTKEY")) // if a JWTKEY is found go ahead and call the user route from backend
    {
    axios.get("https://friendmessenger.herokuapp.com/user").then(
      res => {
          console.log(res.data.username);
          console.log("you logged in yay!");
          this.setUser(res.data);
          localStorage.setItem("user",res.data.username);
      }, 
      err => {
          console.log(err);
      }
  )
  }
  }

  setUser = (user) => {
    this.setState({
      user:user
    })
  }

  render(){
  
    return(
    <div>
    
    <BrowserRouter>
    <Routes>
      <Route exact path ="/" element ={ <Home/>} />
      <Route exact path ="/login" element ={<Login/> }/>
      <Route exact path ="/register" element ={<Register/>} /> 
      <Route exact path ="/logout" element = {<Logout/>} />

    </Routes>


  </BrowserRouter>
  </div>
    )}
  
}


