import React, { useState } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import {Link} from 'react-router-dom';
import { CardElement, useStripe,useElements } from '@stripe/react-stripe-js';


function Payment() {
    const [{basket, user}, dispatch] =useStateValue();

    const stripe = useStripe();
    const elements= useElements();
    
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const handlesubmit =e =>{

    }
    const handlechange =e =>{
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "")

    }

  return (
    <div className='payment'>
        <div className="payment__container">
            <h1>Checkout {<Link to='/checkout'>{basket?.length}(items)</Link>}
            </h1>
            {/*payemnt section and delivert address*/}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>

                </div>
                <div className="payment__address">
                   <p>{user.email}</p> 
                   <p>123 Mark lane</p>
                   <p>Ibadan Nigeria</p>
                </div>
            </div>

            {/*payemnt section and review item*/}

            <div className="payment__section">
                
            <div className="payment__title">
                    <h3> Review items and delivery</h3>

                </div>
                <div className="payment__items">
                    {basket.map(item =>(
                         <CheckoutProduct
                         id ={item.id}
                         title ={item.title}
                         image={item.image}
                         price={item.price}
                         rating={item.rating}
                         />
                    ))}
                </div>
            </div>


            {/*payemnt section and payment method*/}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    <form onSubmit={handlesubmit}>
                        <CardElement onChange={handlechange}/>
                    </form>

                </div>
                </div>
    
        </div>
      
    </div>
  )
}

export default Payment;
