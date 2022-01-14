import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import {useState} from 'react';
import React, {Component} from 'react';
import axios from 'axios';

export default class logout extends Component{

    componentDidMount(){
        localStorage.clear();
    }
    
    
    render(){
        return(<h2>You have been logged out</h2>);
    }

    
  
        
    
     
    
      
}




