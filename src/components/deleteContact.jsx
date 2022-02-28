import React, {Component} from 'react';

import Button from 'react-bootstrap/Button'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


export default class DeleteContact extends Component {



 state = {
    show: false,
    messageid:"",
    conversationList:this.props.conversationList,
    conversationsToBeDeleted:[]
    
    };
    handleClose= () =>
    {
        this.setState({show:false})
        
    }
    handleShow = () =>
    {
        this.setState({show:true})
    }
    

    deleteContacts= async (e) => 
    {
            
           e.preventDefault();
            
        
        //    const firstResponse = await axios({
        //     method: 'POST',
        //     url: 'https://friendmessenger.herokuapp.com/createConversation',
        //     headers: {
        //       Authorization: `Bearer ${sessionStorage.getItem('JWTKEY')}`
        //     },
        //     data: {participants:[sessionStorage.getItem("user"),e.target.username.value]}
        //   })
        //     console.log(firstResponse.data._id)
        
        //   const secondResponse = await axios({
        //     method: 'POST',
        //     url: 'https://friendmessenger.herokuapp.com/sendMessage',
        //     headers: {
        //       Authorization: `Bearer ${sessionStorage.getItem('JWTKEY')}`
        //     },
        //     data: {id:firstResponse.data._id,sender:sessionStorage.getItem("user"),message:e.target.message.value}
        //   })
             
        //   console.log(secondResponse);
          


         this.handleClose();
        

    }
    handleChange = (participant,index) =>
    {
        console.log(participant + "at index" + index +" needs to be changed");

    }

    showConversations =  () =>
{
    try {

       
        const ret= this.props.conversationList.map((item,i) => {
       if(item.participants[0] ===sessionStorage.getItem("user")) 
       {

            return <Form.Check key={i} type="checkbox" id="default-checkbox" label={item.participants[1]} onChange={()=> this.handleChange(item.participants[1],i)}>
                
            </Form.Check>
       }
    
       
       return <Form.Check key={i} type="checkbox" id={`default-checkbox`} label={item.participants[0]}>
                
            </Form.Check>

       
    })
    
    return(
        <div className="list-group list-group-flush" style={{height: "15rem", overflowY:"auto"}}>
            {ret}
        </div>
        
        )
    } catch (e) {
        console.log("there was an issue with contacts" + e);
        return <div></div>
    }
  
     
    
}
    render()
    {
        return(
        <div>
           
            <Button variant="danger" onClick={this.handleShow}>
             <i className = " fa fa-trash"> Delete Contacts</i> 
          
            </Button>
            <Modal show={this.state.show} animation={true}>
            <Modal.Header>
          <Modal.Title>Select the conversations you want to delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit = {this.deleteContacts}>
        
            {this.showConversations()}

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