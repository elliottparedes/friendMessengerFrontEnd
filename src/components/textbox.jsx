import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import AddNewMessage from '../components/addNewMessage';

export default class messageList extends Component {

   

 state = {
        message:"",
        selectedContact: "",
        submitDisabled:false,
        currentContact : this.props.currentContact
    };
    sendMessage= (e) => 
    {
         e.preventDefault();
        console.log("message works")
        console.log("this is the message: "  +e.target.message.value);
        this.setState({message:e.target.message.value, currentContact:this.props.currentContact }, function () {
             console.log("this is the value of currentContact"+ this.state.currentContact)
             console.log("this is the state before the axios post" + this.state.message)
            axios({
            method: 'POST',
            url: 'https://friendmessenger.herokuapp.com/sendMessage',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('JWTKEY')}`
            },
            data: {sender:localStorage.getItem("user"), receiver:this.state.currentContact, message:this.state.message}
          }).then(res =>{
              console.log("this is the response from the sendMessage "+res);
          })

          e.target.message.value = "";
        })
       

    }
    render()
    {
        return(
        <div>
          <Form  className="input-group" onSubmit = {this.sendMessage}>
            <Form.Group >
                <Form.Control required type="text" className="form-control" name="message" placeholder="Message" />
            </Form.Group>
            <Button className="btn" variant="primary" type="submit">
            <i className="glyphicon glyphicon-send"></i> 
            </Button>
           </Form>
        </div>)
    }


}