import React, {Component} from 'react';
import axios from 'axios';
import AddNewMessage from '../components/addNewMessage'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Textbox from '../components/textbox'
import LogoutButton from '../components/logoutButton'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import './messageList.css'

export default class messageList extends Component {

    state = {messageList:[],
             contactList:[],
             filteredContactList:[],
             messageListLength:0, // is the inital length of messages found from database. Later code will check if res.data.length is larger (which means a new message was added in database, if so go ahead and update above list states.)
             contactListLength:0,
             currentContact:""
            };



    grabData = async () =>
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
        this.setState({currentContact:this.state.filteredContactList[0]});
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

            
            <Card key = {i} className="text-nowrap border-bottom" style = {{width: '100%'}} onClick={() =>this.setState({currentContact:item})} >
                
                    {item}
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
        <Row className="mb-3">
           <Col>     
            <Card key = {i} style = {{width: 'auto', backgroundColor: messages[i].sender===this.state.currentContact? '#A865C9':'#4285F4',float:messages[i].sender===this.state.currentContact? 'left':'right'}} >
                <Card.Body>
                    <Card.Text>{item}</Card.Text>
                </Card.Body>
            </Card>
           </Col>
        </Row>
      
        )
        return (displayMessage);
    }
    
    render()
    {
        return(<div>

            <Row className ="mb-4">
                <Row>
                    <Col><h1>Friends</h1>  </Col><Col> <h2>{this.state.currentContact}</h2> </Col> <Col><AddNewMessage/> </Col>
                </Row> 
                <Row>
                    <Col className="scrollbar scrollbar-primary" style={{height: "16rem", overflowY:"auto", width: "30%"}}>
                     {this.showContacts()}
                    </Col>
                    <Col sm={12} className="scrollbar scrollbar-primary" style={{height: "16rem", overflowY:"auto", width: "70%"}}>
                        <Row>
                            <p>{this.showMessages()}</p>
                        </Row>
                    </Col>
               
                </Row>
                
                <Row className="mt-4 align-items-end">
                    
                        <Textbox currentContact = {this.state.currentContact}/>
                    
                </Row>
            </Row>
                  
            

            
               
        </div>)
    }


}