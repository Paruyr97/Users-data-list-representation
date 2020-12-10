import React from 'react';
import PropTypes from 'prop-types';

const Arrow = ({sorted}) => sorted ? <button>&#x25B2;</button> : <button>&#x25BC;</button>;

Arrow.propTypes = {
    sorted: PropTypes.bool
}

export default Arrow;