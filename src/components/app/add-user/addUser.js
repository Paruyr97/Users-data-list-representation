import React, {Component} from 'react';

import '../../../index.css';


export default class AddUser extends Component {

    state = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    }

    handleChange = ({target: { value }}, type) => {

        if(!value.trim()){
            return;
        }
        
        this.setState({[type]: value});
    }

    render(){

        const {id, firstName, lastName, email, phone} = this.state;

        return (
            <div className="add_table">
                <input type='text' value={id} placeholder='write your id' onChange={(event) => this.handleChange(event, 'id')}/>
                <input type='text' value={firstName} placeholder='write your firstname' onChange={(event) => this.handleChange(event, 'firstName')}/>
                <input type='text' value={lastName} placeholder='write your lastname' onChange={(event) => this.handleChange(event, 'lastName')}/>
                <input type='text' value={email} placeholder='write your email' onChange={(event) => this.handleChange(event, 'email')}/>
                <input type='text' value={phone} placeholder='write your phone' onChange={(event) => this.handleChange(event, 'phone')}/>
                <button 
                 type='submit'
                 disabled={!(id && firstName && lastName && email && phone)}
                 onClick={() => this.props.addUser({
                    id,
                    firstName,
                    lastName,
                    email,
                    phone,
                    description: 'some description',
                    address: {
                        streetAddress: '9792 Mattis Ct',
			            city: 'Los Angeles',
                        state: 'California',
                        zip: '90057'
                    }
                })}>
                    add
                </button>
            </div>
        )
    }
}