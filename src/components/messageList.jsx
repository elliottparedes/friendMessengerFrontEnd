import React, {Component} from 'react';
import axios from 'axios';
import AddNewMessage from '../components/addNewMessage'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Textbox from '../components/textbox'


// import io from 'socket.io-client';
import './messageList.css'


export default class messageList extends Component {

   
    intervalID =0;
    state = {messageList:[],
             conversationList:undefined,
             conversationListLength:0,
             isLoading:true,
             currentContact:"",
             currentMessageId:"",
             isLoadingMessages:true,
             editVisible:false
            };

componentDidMount = () =>
{
    // const socket = io("http://localhost:4001")
    // socket.on('connect',() => 
    // console.log("socket connected")
    // )
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

              
     this.intervalID =setInterval(this.getConversations, 1000);
      this.intervalID = setInterval(this.getMessages,1000);

    
               
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
                           
                            if(Array.isArray(res.data))
                            {
                                if(res.data.length<this.state.conversationListLength)
                                {
                                    this.setState({conversationList:res.data});
                                }

                                if(res.data.length>this.state.conversationListLength)
                                {
                                    for(let i=this.state.conversationListLength; i<res.data.length;i++)
                                    {
                                        this.setState({conversationList:this.state.conversationList.concat(res.data[i])});
                                    }
                                this.setState({conversationListLength:res.data.length});
                            }
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
    if(this.state.currentContact!=="")
    try{
        axios({
               method: 'POST',
               url: 'https://friendmessenger.herokuapp.com/getMessages',
               headers: {
                           Authorization: `Bearer ${localStorage.getItem('JWTKEY')}`
                        },
                           data: {id:this.state.currentMessageId}
                         }).then(res =>{   
                            if(Array.isArray(res.data))
                            {
                                this.setState({messageList:res.data});
                                console.log(this.state.messageList)
                            }
                            else{
                                console.log("get message didnt return an array")
                            }
                            
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
           return <div key={i} className="list-group-item list-group-item-action" style={{fontSize:"1.0rem"}}  onClick={()=>{this.setCurrentContact(item.participants[1]); this.setCurrentContactId(item._id);}}> 
                <span>{item.participants[1]}<button style={{float:"right",visibility:this.state.editVisible?"":"hidden"}} className="btn btn-danger fa fa-trash" onClick={()=>this.deleteConversation(item._id)}></button></span>
                </div>
       }
    
       
       return <div key={i} className="list-group-item list-group-item-action" style={{fontSize:"1.0rem"}} onClick={()=>{this.setCurrentContact(item.participants[0]);  this.setCurrentContactId(item._id);}}>
           {item.participants[0]}
           </div>

       
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

showMessages = () =>
{
    if(this.state.messageList !==[])
    {
    try {
    const ret= this.state.messageList.map((item,i) => {
        return <p className={item.sender===sessionStorage.getItem("user")?"from-me":"from-them"} key={i} style={{fontSize:"1rem"}}>{item.body}</p>
 
        
     })
     
     return(
         
         <div className="imessage" style={{height:"15rem", overflowY:"auto", width: "100%",display:"flex"}}>
             {ret}
             
         </div>
         
         )
    }catch (e) {
        console.log("There are no messages for this conversation "+ e)
        return <div className="imessage" style={{maxHeight:"15rem", overflowY:"auto", width: "100%"}}>
        <p>The other person has left the chat...</p>
    </div>
    }
    
    }
   
}

revealEdit = () =>
{
 
    this.setState({editVisible:!this.state.editVisible}, ()=>{console.log("this is state of reveal edit: "+this.state.editVisible)});
   
}




componentWillUnmount ()
{
    clearInterval(this.intervalID);

}

deleteConversation = (convid) =>
{
    try{
        axios({
               method: 'POST',
               url: 'https://friendmessenger.herokuapp.com/deleteConversation',
               headers: {
                           Authorization: `Bearer ${localStorage.getItem('JWTKEY')}`
                        },
                           data: {id:convid}
                         }).then(res =>{   
                           console.log(res);
                           this.setState({currentContact:""});
                         }      
                         ) 
            
               }catch(err) {
                   console.log(err);
               }

  
}



render()
{



    if (this.state.isLoading) {
      return <div className="App">Loading...</div>;
    }

    return(
        <Container style={{marginLeft:"0",paddingLeft:"0", marginRight:"0",paddingRight:"0"}}>
            <Row style={{marginBottom:"0.5rem"}}>
                <Col>
              
                </Col>
                
            </Row>
            <Row style={{maxHeight:"20rem",height:"20rem"}}>
                <Col style={{marginLeft:"0",paddingLeft:"0"}}>
                   <Row className="mb-2">
                       <Col className="mb-2" style={{maxWidth:"100%", maxHeight:"15rem", marginLeft:"0px",paddingLeft:"0"}}>
                            {this.showConversations()}
                       </Col>
                   </Row>
                   <Row>
                       <Col>
                        <AddNewMessage/> 
                       </Col>
                       <Col>
                       <button type="submit" className="btn btn-danger" onClick={this.revealEdit}><i className="fa fa-trash">Edit</i></button>
                       </Col>
                   </Row>
                   
                </Col>
                <Col  style={{maxWidth:"60%"}}>

                    <Row style={{maxHeight:""}}>
                        <Col>{this.state.currentContact!==""?this.showMessages():<div className="imessage" style={{height:"15rem", overflowY:"auto", width: "100%",display:"flex"}}></div>}</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Textbox currentContact={this.state.currentContact} currentMessageId = {this.state.currentMessageId}/>
                        </Col>
                    </Row>
                </Col>
            </Row>

           

        </Container>
    )
}


}