import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


export default class AddNewMessage extends Component {



 state = {
    show: false,
    messageid:""
    };
    handleClose= () =>
    {
        this.setState({show:false})
        
    }
    handleShow = () =>
    {
        this.setState({show:true})
    }

    sendMessageToNewContact= async (e) => 
    {
            
           e.preventDefault();
        
           const firstResponse = await axios({
            method: 'POST',
            url: 'https://friendmessenger.herokuapp.com/createConversation',
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('JWTKEY')}`
            },
            data: {participants:[sessionStorage.getItem("user"),e.target.username.value]}
          })
            console.log(firstResponse.data._id)
        
          const secondResponse = await axios({
            method: 'POST',
            url: 'https://friendmessenger.herokuapp.com/sendMessage',
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('JWTKEY')}`
            },
            data: {id:firstResponse.data._id,sender:sessionStorage.getItem("user"),message:e.target.message.value}
          })
             
          console.log(secondResponse);
          


         this.handleClose();
        

    }
    render()
    {
        return(
        <div>
           
            <Button variant="primary" onClick={this.handleShow}>
             <i className = " fa fa-plus"> New</i> 
          
            </Button>
            <Modal show={this.state.show} animation={true}>
            <Modal.Header>
          <Modal.Title>Start a new conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit = {this.sendMessageToNewContact}>
  <Form.Group className="mb-3">
  <Form.Control style={{marginBottom:"1rem"}} type="" name="username" placeholder="username" />
    <Form.Control type="" name="message" placeholder="Message" />

  </Form.Group>


  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
     
        </Modal.Footer>
      </Modal>
               
        
        </div>)
    }


}