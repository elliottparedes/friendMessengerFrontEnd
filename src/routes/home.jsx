import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MessageList from '../components/messageList';
import {Navigate} from "react-router-dom";
export default class Home extends Component {

    render(){
       
       if(localStorage.getItem("user")){
           return ( 
            <div>
                <Container>
                    <h2>Hello {localStorage.getItem("user")}</h2>
                    <Row>
                        <Col lg={12}>
                         <MessageList/>
                        </Col>


                    </Row>

                </Container>
                
              
               
            </div>
           )
       }
            return(

                <Navigate to="/login" replace ={true}/>

        )
    }


}