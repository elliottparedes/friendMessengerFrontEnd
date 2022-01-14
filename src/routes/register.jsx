import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import {useState} from 'react';
import axios from 'axios';

export default function register() 
{

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.elements.username.value);
        console.log(event.target.elements.password.value);
        console.log("this worked");
        try{
        axios.post("https://friendmessenger.herokuapp.com/addUser", {username:event.target.elements.username.value, password: event.target.elements.password.value}).then(
          res=>{ 
            console.log("Created a new user!");
            console.log(res);
            console.log(res.data)
            
          }
        );
    
    
        }catch(err){
          console.log(err);
        }
    
      }
    
    
      return (
      <div>
    
         <h2>This is the Register page</h2>
         {/* <Link to="/invoices"> Invoices</Link> 
    
          <Link to="/expenses"> Expenses</Link>
         */}
        <form onSubmit={handleSubmit}>
        
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="username" placeholder="Enter email" />
      
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



