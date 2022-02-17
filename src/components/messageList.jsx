import React, {Component} from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Textbox from '../components/textbox'

export default class messageList extends Component {

    state = {messageList:[],
             contactList:[],
             filteredContactList:[],
             messageListLength:0, // is the inital length of messages found from database. Later code will check if res.data.length is larger (which means a new message was added in database, if so go ahead and update above list states.)
             contactListLength:0,
             currentContact:""
            };



    grabData = () =>
    {
         try{

                
                axios({
                    method: 'POST',
                    url: 'https://friendmessenger.herokuapp.com/getMessages',
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('JWTKEY')}`
                    },
                    data: {sender:localStorage.getItem("user"),receiver: localStorage.getItem("user")}
                  }).then(res =>{   
                      
                    console.log("this is the data response" +res.data);
                    if(res.data.length>this.state.messageListLength) // checks if message list from database has gotten longer since last check
                    {
                            for(let i=this.state.messageListLength;i<res.data.length;i++)
                            {
                              
                            this.setState({contactList: this.state.contactList.concat(res.data[i]["sender"])})
                            this.setState({contactList: this.state.contactList.concat(res.data[i]["receiver"])})    
                            this.setState({messageList: this.state.messageList.concat(res.data[i])});
                                
                            }
                            console.log("this is the messageList array :" + this.state.messageList);
                            console.log("this is what is at array 0 index: " + this.state.messageList[0].body)
                        // console.log("State is:" + this.state.messageList[0]["body"]);
                        // there will be duplicates so make a set and push set to filtered array to only get unique contacts.
                        let filteredContacts = [...new Set(this.state.contactList)]
                        for(let j=this.state.contactListLength;j<filteredContacts.length;j++)
                        {
                            
                           if(filteredContacts[j] !== localStorage.getItem("user") )
                        
                            this.setState({filteredContactList:this.state.filteredContactList.concat(filteredContacts[j])})
                        }

                        
                        
                        
                        console.log("the filtered contact list has: " +this.state.filteredContactList);
                        this.setState({messageListLength:res.data.length});
                        this.setState({contactListLength:filteredContacts.length});
                    }
                       
                  } )

                
            
           
        }catch(err) {
            console.log(err);
        }
    }
    componentDidMount = () =>
    {
        
        console.log(localStorage.getItem("JWTKEY"))
        console.log("messageList component did mount!")
        this.grabData();
         this.updateTimer = setInterval(() => this.grabData(),5000);


       
    } 
    componentWillUnmount = () =>
    {
        clearInterval(this.updateTimer);
    }
    
    showContacts = () => 
    {
        
        console.log("calling show conttacts function")
        console.log(this.state.filteredContactList);
        

        const con = this.state.filteredContactList.map( (item,i) =>  

            
            <Card key = {i} style = {{width: '18rem'}} onClick={() =>this.setState({currentContact:item})} >
                <Card.Body>
                    <Card.Title>{item}</Card.Title>
                    <Card.Text>maybe first few words of last message</Card.Text>
                </Card.Body>

            </Card> 
        )
        return (con)
   
    }
    showMessages = () =>
    {
        const m =[]; // String array becuase we cant output objects in react .

        
        const messages = this.state.messageList.filter(m => m.receiver ===this.state.currentContact || m.sender ===this.state.currentContact)
        console.log("these are the messages in the show messages function :" + messages)
        messages.forEach(element =>m.push(element.body))

        const displayMessage = m.map((item,i) => 
        <Card key = {i} style = {{width: '18rem', backgroundColor: messages[i].sender===this.state.currentContact? 'red':'blue'}} >
                <Card.Body>
                    <Card.Text>{item}</Card.Text>
                </Card.Body>

            </Card> 

        )
        return (displayMessage);
    }
    
    render()
    {
        return(<div>

               <Row>
                
                <h1>Contacts</h1> 
                <Col sm={6} style={{height: "16rem", overflowY:"auto", width: "20rem"}}>
                   
                {this.showContacts()}
                </Col>
               
                <Col sm={6} style={{height: "16rem", overflowY:"auto", width: "25rem"}}>
                     <h1>Current Contact</h1>
                    <h2>{this.state.currentContact}</h2>
                    <h1>{this.showMessages()}</h1>

                </Col>


               </Row>
               <Row>
                   <Col sm={12}>
                       <Textbox currentContact = {this.state.currentContact}/>
                    
                   </Col>

               </Row>
            
               
               
              
                
               
        </div>)
    }


}