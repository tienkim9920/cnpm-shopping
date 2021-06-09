import React from 'react';
import PropTypes from 'prop-types';

OrderSuccess.propTypes = {

};

function OrderSuccess(props) {

    return (
        <div className="container fix_order">
            <h1>You Have Ordered Successfully</h1>
            <span style={{ fontSize: '1.2rem' }}>Please Checking Email!</span>
        </div>
    );
}

export default OrderSuccess;