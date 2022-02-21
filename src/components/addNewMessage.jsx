import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


export default class AddNewMessage extends Component {



 state = {
    show: false
    };
    handleClose= () =>
    {
        this.setState({show:false})
        
    }
    handleShow = () =>
    {
        this.setState({show:true})
    }

    sendMessageToNewContact= (e) => 
    {
           e.preventDefault();
        
            axios({
            method: 'POST',
            url: 'https://friendmessenger.herokuapp.com/sendMessage',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('JWTKEY')}`
            },
            data: {sender:localStorage.getItem("user"), receiver:e.target.username.value, message:e.target.message.value}
          }).then(res =>{
              console.log("this is the response from the sendMessage "+res);
              
          })
         this.handleClose();
        

    }
    render()
    {
        return(<div style={{float:"right"}}>
           
            <Button variant="primary" onClick={this.handleShow}>
            new message
      </Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit = {this.sendMessageToNewContact}>
  <Form.Group className="mb-3">
  <Form.Control type="" name="username" placeholder="username" />
    <Form.Control type="" name="message" placeholder="Message" />

  </Form.Group>


  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
               
        
        </div>)
    }


}