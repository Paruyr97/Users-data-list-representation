import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../../index';


export default class SearchPanel extends Component{

    state = {
        inputValue: ''
    };

    handleChange = ({ target: {value} }) => {
        this.setState({inputValue: value});
    }

    render(){
        const {inputValue} = this.state;
        return (
            <div className="search_box">
                <input value={inputValue} onChange={this.handleChange}/>
                <button disabled={!inputValue.trim()}
                 onClick={() => this.props.filter(inputValue, 'search')}>
                        Search
                </button>
                <button onClick={() => {
                    this.setState({inputValue: ''});
                    this.props.filter('', 'back');
                    }}>
                    back
                </button>
            </div>
        )
    }
}

SearchPanel.propTypes = {
    filter: PropTypes.func.isRequired
};
