import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import {Link} from "react-router-dom";

// import {useState} from 'react';
import React, {Component} from 'react';


export default class logout extends Component{

    componentDidMount(){
        localStorage.clear();
        sessionStorage.clear();
    }
    
    
    render(){
        return(<h2>You have been logged out</h2>);
    }

    
  
        
    
     
    
      
}




