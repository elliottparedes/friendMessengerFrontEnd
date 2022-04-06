import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

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
            data: {sender:sessionStorage.getItem("user"),id:this.props.currentMessageId , message:this.state.message}
          }).then(res =>{
              console.log("this is the response from the sendMessage "+res);
          })

         
        })
       e.target.message.value ="";

    }

    handleChange= (e) =>
    {

    }

    render()
    {
        return(
     
          <form onSubmit={this.sendMessage}>
          <div className="input-group mb-3">
          <input type="text" required className="form-control" name="message" style={{borderRadius:"0"}} placeholder="message" aria-label="message" aria-describedby="basic-addon2"/>
          <div className="input-group-append">
          <Button className="" variant="primary" style={{borderRadius:"0"}} type="submit"><i className="fa fa-telegram"/></Button>
          </div>
          </div>
          </form>
       )
    }


}