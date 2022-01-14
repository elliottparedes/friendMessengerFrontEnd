import React, {Component} from 'react';
import axios from 'axios';

export default class Home extends Component {

    render(){
       
       if(localStorage.getItem("user")){
           return (
               <h2>Hello {localStorage.getItem("user")}</h2>
           )
       }
        return(

             <h2>This is the home page You are not logged in</h2>

        )
    }


}