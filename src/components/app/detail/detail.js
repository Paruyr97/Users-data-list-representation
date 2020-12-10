import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './detail.css';


export default class Detail extends Component {

    state = {
        show: true
    }

    toggleShowDetail = () =>{
        this.setState({show: !this.state.show});
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.show !== nextState.show || JSON.stringify(this.props.info) !== JSON.stringify(nextProps.info);
    }

    render(){

        const {firstName, lastName, description, address} = this.props.info;

        const {city, state, zip, streetAddress } = address;

        return (
            <div className='wrapper'>
                <div className='container' style={{display: this.state.show ? 'block' : 'none'}}>
                    <div>
                        <span>Выбран пользователь</span><b>{firstName} {lastName}</b>
                    </div>
                    <div>
                        <span>Description</span><textarea defaultValue={description}></textarea>
                    </div>
                    <div>
                        <span>Address</span><b>{streetAddress}</b>
                    </div>
                    <div>
                        <span>City:</span> <b>{city}</b>
                    </div>
                    <div>
                        <span>Province/state:</span> <b>{state}</b>
                    </div>
                    <div>
                        <span>Zip:</span><b>{zip}</b>
                    </div>
                    <button className='close' onClick={this.props.closeShowDetail}>&#10060;</button>
                </div>
            </div>
        );
    }
}

Detail.propTypes = {
    info: PropTypes.object.isRequired
};
