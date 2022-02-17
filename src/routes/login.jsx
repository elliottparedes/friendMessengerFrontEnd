import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {Navigate} from "react-router-dom";
import React, {Component} from 'react';

export default class login extends Component
{

      
     state = {loggedIn:false}
      HandleSubmit =(event) =>{
        event.preventDefault();
 
        console.log(event.target.elements.email.value);
        console.log(event.target.elements.password.value);
        console.log("this worked");
        try{
        //need to add password authorization, right now /login route only uses username. 
        axios.post("https://friendmessenger.herokuapp.com/login", {email:event.target.elements.email.value}).then(
          res=>{ 
            console.log(res);
            console.log(res.data)
            localStorage.setItem("JWTKEY",res.data.token);
            this.setState({loggedIn: true});
            localStorage.setItem("user",res.data.username);
          
          }
        );
    
    
        }catch(err){
          console.log(err);
        }
        
      }
    
    render()
    {
      if (this.state.loggedIn)
      {
        
       return <Navigate to="/" replace ={true}/>
      }
      return (
      <div>
    
         <h2>This is the login page</h2>

        <form onSubmit={this.HandleSubmit}>
        
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
      
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
    
          <Button variant="primary" type="submit">
              Submit
          </Button>
        
        </form>
    
    
    
      </div>
    
     
    
      );
        }
    }




