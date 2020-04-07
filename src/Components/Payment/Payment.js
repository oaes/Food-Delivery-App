import React, { useState, useEffect } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';


const Payment = (props) => {
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    props.markAsPaid(paymentSuccess);
  } , [paymentSuccess])
  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(error, paymentMethod);
    if(error){
      setPaymentError(error);
      setPaymentSuccess(null);

    }else{
      setPaymentSuccess(paymentMethod);
      setPaymentError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button  className="btn btn-danger my-3" type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <p style={{color:"red"}}>Failed, {paymentError.message}</p>}
      {paymentSuccess && <p style={{color:"green"}}>Payment Successful</p>}
    </form>
  );
};

export default Payment;