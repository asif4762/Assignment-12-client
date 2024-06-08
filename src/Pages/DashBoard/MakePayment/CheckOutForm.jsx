import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSeruce';
import useUserInfo from '../../../Hooks/useUserInfo';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';

const CheckOutForm = ({handlePaymentSuccess, month}) => {
    const [error, setError] = useState();
    const [clientSecret, setClientSecret] = useState();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
const userInfo = useUserInfo();
const {user} = useContext(AuthContext);

    useEffect( () => {
        axiosSecure.post('/create-payment-intent',{rent : userInfo?.rent})
        .then(res => {
            console.log(res.data);
            setClientSecret(res.data.client_secret)
        })
    }, [axiosSecure, userInfo?.rent])

    const handleSubmit = async () =>{
        event.preventDefault();

        if(!stripe || !elements) return

        const card = elements.getElement(CardElement)

        if(card == null) return;

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('payment error' , error)
            setError(error.message)
        }else{
            console.log('payment method', paymentMethod)
            setError('')
        }
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: userInfo?.displayName || 'anonymous',
                    email: userInfo?.email || 'anonymous'
                }
            }
        })

        if(confirmError){
            console.log('confirm', confirmError)
        }else{
            console.log('payment intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id', paymentIntent._id)
                console.log(user)
                const paymentInfo ={
                    name: user?.displayName || 'anonymous',
                    email: userInfo?.email || 'anonymous',
                    photoURL: user?.photoURL,
                    role: userInfo?.role,
                    status: 'Requested',
                    floor_no: userInfo?.floor_no,
                    block_name: userInfo?.block_name,
                    apartment_no: userInfo?.apartment_no,
                    apartment_image: userInfo?.apartment_image,
                    rent: userInfo?.rent,
                    agreement_status: userInfo?.agreement_status,
                    transaction_id: paymentIntent?.id,
                    payment_data: new Date(),
                    month: month,
                }

                axiosSecure.post(`/payment-history`, paymentInfo)
                .then(res => {
                    console.log(res.data);
                })

                navigate('/dashboard/payment-history')
                toast.success('Payment successful')
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-sm btn-primary my-6' type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className='text-red-600'>{error}</p>
        </form>
    );
};

export default CheckOutForm;