import 'bootstrap/dist/css/bootstrap.min.css';
 import Container from 'react-bootstrap/Container';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import React, {Component} from 'react';
import {Navigate} from "react-router-dom";

export default class register extends Component 
{
   state = {
     registered:false,
     validUsername:true,
     validPassword:true,
     validEmail:true
   };

        handleSubmit = (event) => 
        {
        
        event.preventDefault();
        console.log("handlesubmit was called")
        console.log(event.target.elements.username.value);
        console.log(event.target.elements.password.value);
        console.log("this worked");
        try{
        axios.post("https://friendmessenger.herokuapp.com/addUser", {username:event.target.elements.username.value,email:event.target.elements.email.value, password: event.target.elements.password.value}).then(
          res=>{ 
            console.log("Created a new user!");
            console.log(res);
            console.log(res.data)
            this.setState({registered: true});
            
          }
        );
    
    
        }catch(err){
          console.log(err);
        }
    
      }
      
    render(){
       if(this.state.registered)
       return <Navigate to="/login" />

      return (
        <div style={{backgroundColor:"rgb(28,141,248)"}}>
    
         
        <Container className="ml-0 mr-0 pl-0 pr-0 pb-4" style ={{height:"100vh",display:"flex", justifyContent:"center",alignItems:"center", paddingTop:"2rem"}}>
          
          <Row className ="w-80">
            <Col className="border" style={{backgroundColor:"white", padding:"3rem", borderRadius:"30px"}}>
              <form onSubmit={this.handleSubmit}>
            <h3 className=" mb-3 text-center">Sign Up</h3>
           
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label className="" style={{fontWeight:"bold"}}>Email address</Form.Label>
              <p style={{color:"red",display:this.state.validEmail?"none":""}}>invalid username</p>
              <Form.Control className="mb-4" type="email" name="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="" controlId="">
              <Form.Label className="" style={{fontWeight:"bold"}}>Username</Form.Label>
              <p style={{color:"red",display:this.state.validUsername?"none":""}}>invalid username</p>
              <Form.Control className="mb-4" type="" name="username" placeholder="Enter username" />
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label  style={{fontWeight:"bold"}}>Password</Form.Label>
              <p style={{color:"red",display:this.state.validPassword?"none":""}}>incorrect password</p>
              <Form.Control className="mb-4" type="password" name="password" placeholder="Enter password" />
            </Form.Group>

            <Col className="text-center">
            <Button className="mb-4 w-100" variant="primary" type="submit">
                Submit
            </Button>

            
            </Col>
            </form> 
            </Col>
              
          </Row>
          
       
        </Container>
        
    
    
    
      </div>


      ); }
}



