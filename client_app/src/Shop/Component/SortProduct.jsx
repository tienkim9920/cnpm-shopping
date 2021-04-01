import React from 'react';
import PropTypes from 'prop-types';

SortProduct.propTypes = {
    handlerChangeSort: PropTypes.func
};

SortProduct.defaultProps = {
    handlerChangeSort: null
}

function SortProduct(props) {

    const { handlerChangeSort } = props

    const onChangeValue = (e) => {
        
        const keyword = e.target.value

        if (!handlerChangeSort){
            return
        }

        handlerChangeSort(keyword)

    }

    return (
        <select className="selectpicker ml-auto" onChange={onChangeValue}>
            <option value="default">Default sorting</option>
            <option value="DownToUp">Price: Low to High</option>
            <option value="UpToDown">Price: High to Low</option>
        </select>
    );
}

export default SortProduct;