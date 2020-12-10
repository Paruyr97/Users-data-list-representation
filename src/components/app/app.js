import React, {Component} from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom';

import Table from './data';
import "../../index.css";

export default class App extends Component {

    state = {
        showData: false,
        urlType: ''
    }

    handleClick = (urlType) => {
        this.setState({ showData: true, urlType });
    }

    render(){

        const { showData, urlType } = this.state;

        return (
            <Router>
                <Link to='/users'>
                    <div >                
                        {
                            showData ? <Table urlType={urlType}></Table> :
                                <div className="big_and_short">
                                    <button onClick={() => this.handleClick('short')}>Small amount of data</button>
                                    <button onClick={() => this.handleClick('big')}>Big amount of data</button>
                                </div>
                        }
                    </div>
                </Link>
            </Router>
            
        )
    }
}
