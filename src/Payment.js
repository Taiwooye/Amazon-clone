import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import {Link, useHistory} from 'react-router-dom';
import { getBasetTotal } from "./Reducer";
import axios from './Axios.js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { db } from './firebase';

function Payment() {
    const [{basket, user}, dispatch] =useStateValue();
    const history = useHistory();
    // const [paymentIntent, setPaymentIntent] = useState(null);

    const stripe = useStripe();
    const elements= useElements();
    
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, SetSucceeded] = useState(false);
    const [processing, SetProcessing] = useState("");
    const [clientSecret, SetClientSecret] = useState(true);

    useEffect(()=>{
        const getclientSecret = async()=>{

            const response = await axios({
                method: 'post',
                url: `/payment/create?total=${getBasetTotal(basket) * 100}`
            });
            SetClientSecret(response.data.clientSecret)
        }
        getclientSecret();
    }, [basket]);

    const handlesubmit =async (e) =>{
        e.preventDefault();
        SetProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
        //payemntIntent = payment confirmation
        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
            basket: basket,
            amount: paymentIntent.amount,
            created:paymentIntent.created,
        })

        SetSucceeded(true);
        setError(null)
        SetProcessing(false)

        dispatch({
            type:'EMPTY_BASKET'
        })

        history.replace('/orders')
        }) 
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
                        <div className="payment__pricecontainer">
                        <p>

            {/* Subtotal ({basket.length} items):{" "} */}
            <strong>Order Total: ${getBasetTotal(basket)}</strong>
          </p>
          <button disabled={processing || disabled || succeeded}>
            <span>{processing ? <p>Processing</p> :'Buy Now '}</span>
          </button>

          </div>
          {/*Error*/ }
          {error && <div>{error}</div>}
          </form>

                </div>
                </div>
    
        </div>
      
    </div>
  )
}

export default Payment;
