import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name,quantity,key,price} = props.product
    const ReviewItemStyle = {
        border:"1px solid lightgrey",
        
        
    }
    return (
        <div style={ReviewItemStyle} className="review-item">
            <h1 style={{fontSize:"20px"}} className="product-name">Name:{name}</h1>
            <h2>Quantity:{quantity}</h2>
            <h3>$ {price}</h3>
            <button 
            className="main-button"
            onClick={()=>props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;