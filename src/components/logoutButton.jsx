import React, {Component} from 'react';

import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'



export default class messageList extends Component {


    handleLogout = () =>
    {
        console.log("we attempted to log out")
        localStorage.clear();
        sessionStorage.clear();
        
    }

    
    render()
    {
        return(<div>
            <Form onSubmit = {this.handleLogout}>
                <Button className="btn-small" type="submit">
                    <i className="fa fa-sign-out"></i>
                </Button>
            </Form>
     
    
        
        </div>)
    }


}