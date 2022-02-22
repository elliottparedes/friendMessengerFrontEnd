import React, {Component} from 'react';
import axios from 'axios';
import AddNewMessage from '../components/addNewMessage'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Textbox from '../components/textbox'

import './messageList.css'
import { ThemeProvider } from 'react-bootstrap';

export default class messageList extends Component {

    intervalID =0;
    state = {messageList:[],
             conversationList:undefined,
             conversationListLength:0,
             isLoading:true,
             currentContact:"",
             currentMessageId:"",
             isLoadingMessages:true
            };

componentDidMount = () =>
{
                
  
    console.log("messageList component did mount!")
    try{
        axios({
               method: 'POST',
               url: 'https://friendmessenger.herokuapp.com/getConversations',
               headers: {
                           Authorization: `Bearer ${localStorage.getItem('JWTKEY')}`
                        },
                           data: {participant:sessionStorage.getItem("user")}
                         }).then(res =>{   
                            this.setState({conversationList:res.data});
                            this.setState({isLoading:false});
                            this.setState({conversationListLength:res.data.length});
                         }      
                         ) 
               }catch(err) {
                   console.log(err);
               }


    this.intervalID =setInterval(this.getConversations, 3000);

    
               
} 

getConversations =async () =>
{
       try{
        axios({
               method: 'POST',
               url: 'https://friendmessenger.herokuapp.com/getConversations',
               headers: {
                           Authorization: `Bearer ${localStorage.getItem('JWTKEY')}`
                        },
                           data: {participant:sessionStorage.getItem("user")}
                         }).then(res =>{   
                           
                            if(res.data.length>this.state.conversationListLength)
                            {
                                for(let i=this.state.conversationListLength; i<res.data.length;i++)
                                {
                                    this.setState({conversationList:this.state.conversationList.concat(res.data[i])});
                                }
                                this.setState({conversationListLength:res.data.length});
                            }
                            
                         }      
                         ) 
               }catch(err) {
                   console.log(err);
               }
}

setCurrentContact = (contact) =>
{
    this.setState({currentContact:contact},()=>{console.log(this.state.currentContact); this.getMessages()});
    
}
setCurrentContactId= (id) =>
{
    this.setState({currentMessageId:id}, ()=>{console.log("the conv id is" + id); });
}
getMessages = () =>
{
    this.setState({isLoadingMessages:true});
    console.log("show messages is sending with this id" + this.state.currentMessageId)
    try{
        axios({
               method: 'POST',
               url: 'https://friendmessenger.herokuapp.com/getMessages',
               headers: {
                           Authorization: `Bearer ${localStorage.getItem('JWTKEY')}`
                        },
                           data: {id:this.state.currentMessageId}
                         }).then(res =>{   
                            this.setState({messageList:res.data});
                            console.log(this.state.messageList)
                            
                         }      
                         ) 
               }catch(err) {
                   console.log(err);
               }

}

showConversations =  () =>
{
    try {

          console.log("calling show conversations function")
    console.log(this.state.conversationList);
    const ret= this.state.conversationList.map((item,i) => {
       if(item.participants[0] ===sessionStorage.getItem("user")) 
       {
           return <div key={i} style={{fontSize:"1.75rem"}} onClick={()=>{this.setCurrentContact(item.participants[1]); this.setCurrentContactId(item._id);}}>{item.participants[1]}</div>
       }
    
       
       return <div key={i} style={{fontSize:"1.75rem"}} onClick={()=>this.setCurrentContact(item.participants[0])}>{item.participants[0]}</div>

       
    })
    
    return(ret)
    } catch (e) {
        console.log("there was an issue with contacts" + e);
        return <div></div>
    }
  
     
    
}

showMessages = () =>
{
    try {
    const ret= this.state.messageList.map((item,i) => {

        
        return <div key={i} style={{fontSize:"1.75rem"}}>{item.body}</div>
 
        
     })
     
     return(ret)
    }catch (e) {
        console.log("There are no messages for this conversation "+ e)
        return <div></div>
    }
}

componentWillUnmount ()
{
    clearInterval(this.intervalID);

}


render()
{



    if (this.state.isLoading) {
      return <div className="App">Loading...</div>;
    }

    return(
        <div>
            the data loaded
            {this.showConversations()}

            current Contact: {this.state.currentContact}
            
            messages:{this.showMessages()}

            <Textbox currentContact={this.state.currentContact} currentMessageId = {this.state.currentMessageId}/>

            <AddNewMessage/>

        </div>
    )
}


}