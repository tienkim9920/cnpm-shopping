import React from 'react';
import PropTypes from 'prop-types';

OrderFail.propTypes = {
    
};

function OrderFail(props) {
    return (
        <div className="container fix_order">
            <h1>Bạn Đã Đặt Hàng Thật Bại</h1>
            <span style={{ fontSize: '1.2rem' }}>Vui lòng kiểm tra lại Thông Tin!</span>
        </div>
    );
}

export default OrderFail;