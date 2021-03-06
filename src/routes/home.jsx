import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MessageList from '../components/messageList';
import LogoutButton from '../components/logoutButton'
import {Navigate} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
export default class Home extends Component {

    render(){
       
       if(sessionStorage.getItem("user"))
       {
           return ( 
            <div>
                <Container>
                <Navbar style={{marginBottom:"2rem"}}>
                        
                        <Navbar.Text href="#home">Friend Messenger</Navbar.Text>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text style={{marginRight: "1rem"}}>
                            Hello {sessionStorage.getItem("user")} 
                        </Navbar.Text>   <LogoutButton/>
                        </Navbar.Collapse>
                    
                </Navbar>
                   
                    <Row>
                        <Col>
                         <MessageList/>
                        </Col>


                    </Row>

                </Container>
                
              
               
            </div>
           )
       }
       return(<Navigate to="/login"/>)
    }


}