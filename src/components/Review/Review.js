import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import thumbsUpImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,setCart]= useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false)
    const history = useHistory()
    const handleProceedCheckOut = () =>{
        history.push('/shipment');
    }
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
           setCart(newCart);
           removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map(key =>{
        const product = fakeData.find(pd =>pd.key ===key)
        product.quantity = savedCart[key]
        return product;
    });
    setCart(cartProducts);
    },[])
    let greetings;
    if(orderPlaced)
    {
       greetings = <img src={thumbsUpImage} alt=""/>
    }

    return (
        <div className="twin-container">
           <div className="product-container">
           {
                cart.map(pd => <ReviewItem 
                    key={pd.key}
                    removeProduct ={removeProduct}
                    product={pd}></ReviewItem>)
            }
            {
                greetings
            }
           </div>
           <div className="cart-container">
               <Cart cart={cart}>
                   <button style={{width:'250px'}} onClick={handleProceedCheckOut} className="main-button">Proceed Check Out</button>
               </Cart>
           </div>
            
        </div>
    );
};

export default Review;