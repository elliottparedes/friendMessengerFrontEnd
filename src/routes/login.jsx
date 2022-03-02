import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {Navigate} from "react-router-dom";
import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class login extends Component
{

      
     state = {loggedIn:false,
              usernameFound:true,
              passwordFound:true,
              navigateToRegister:false          
    }

      HandleSubmit =(event) =>{
        event.preventDefault();
 
        console.log(event.target.elements.email.value);
        console.log(event.target.elements.password.value);
        console.log("this worked");
        try{

        axios.post("https://friendmessenger.herokuapp.com/login", {email:event.target.elements.email.value,password:event.target.elements.password.value}).then(
          res=>{ 
            console.log(res);
            console.log(res.data)
            if(res.data.message ==="Could not find username in Database")
            {
              this.setState({usernameFound:false})
            }
            else if(res.data.message==="password invalid")
            {
              this.setState({passwordFound:false})
            }
            else{
            localStorage.setItem("JWTKEY",res.data.token);
            sessionStorage.setItem("JWTKEY",res.data.token);
            this.setState({loggedIn: true});
            localStorage.setItem("user",res.data.username);
            sessionStorage.setItem("user",res.data.username);
            }

          
          }
        );
    
    
        }catch(err){
          console.log(err);
        }
        
      }

      handleRegister = () =>
      {
        
        this.setState({navigateToRegister:true}, ()=>console.log(this.state.navigateToRegister))
        
      }
    
    render()
    {
      if (this.state.loggedIn)
      {
        
       return <Navigate to="/" replace ={true}/>
      }
      if(this.state.navigateToRegister)
      {
       
        return <Navigate to="/register"/>
        
      }
      return (
      <div style={{height:"100vh", backgroundColor:"rgb(28,141,248)"}}>
    
         
        <Container className="ml-0 mr-0 pl-0 pr-0" style ={{display:"flex", justifyContent:"center",alignItems:"center", paddingTop:"2rem"}}>
          
          <Row className ="w-80">
            <Col className="border" style={{backgroundColor:"white", padding:"3rem", borderRadius:"30px"}}>
              <form onSubmit={this.HandleSubmit}>
            <h3 className=" mb-3 text-center">Sign In</h3>
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label className="" style={{fontWeight:"bold"}}>Email address</Form.Label>
              <p style={{color:"red",display:this.state.usernameFound?"none":""}}>invalid username</p>
              <Form.Control className="mb-4" type="email" name="email" placeholder="Enter email" />
        
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label  style={{fontWeight:"bold"}}>Password</Form.Label>
              <p style={{color:"red",display:this.state.passwordFound?"none":""}}>incorrect password</p>
              <Form.Control className="mb-4" type="password" name="password" placeholder="Enter password" />
              </Form.Group>
            <Col className="text-center">
            <Button className="mb-4 w-100" variant="primary" type="submit">
                Submit
            </Button>

            
            </Col>
            </form>
            
              <Col className="text-center">
            <p style={{fontWeight:"bold"}}>Dont have an account?</p>
            <Button onClick={this.handleRegister} style={{backgroundColor:"#A865C9"}} className="mb-4 w-100" variant="button" type="submit">
                Register
            </Button>
            </Col>
          
            
            
          
          
            </Col>
              
          </Row>
          
       
        </Container>
        
    
    
    
      </div>
    
     
    
      );
        }
    }




