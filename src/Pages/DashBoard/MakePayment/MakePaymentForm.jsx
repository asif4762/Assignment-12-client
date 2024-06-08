import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../Hooks/useAxiosSeruce';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import toast from 'react-hot-toast';
import useUserInfo from '../../../Hooks/useUserInfo';

const MakePaymentForm = ({ closeModal, bookingInfo, refetch }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState();
    const [cardError, setCardError] = useState();
    const [processing, setProcessing] = useState(false);
    const userInfo = useUserInfo();

    useEffect(() => {
        if (userInfo?.rent && userInfo?.rent > 1) {
            getClientSecret({ rent: userInfo?.rent });
        }
    }, [userInfo?.rent]);

    const getClientSecret = async ({ rent }) => {
        try {
            const { data } = await axiosSecure.post('/create-payment-intent', { rent });
            console.log('Client Secret from server', data);
            setClientSecret(data.client_secret);
        } catch (error) {
            console.error('Error getting client secret:', error.response ? error.response.data : error.message);
            setCardError('Failed to retrieve payment details');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (error) {
                console.error('Error creating payment method:', error);
                setCardError(error.message);
                setProcessing(false);
                return;
            } else {
                console.log('Payment Method:', paymentMethod);
                setCardError('');
            }

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName,
                    },
                },
            });

            if (confirmError) {
                console.error('Error confirming payment:', confirmError);
                setCardError(confirmError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                console.log('Payment Succeeded:', paymentIntent);
                const paymentInfo = {
                    ...userInfo,
                    apartment_id: userInfo?._id,
                    transaction_id: paymentIntent.id,
                    payment_data: new Date(),
                };
                delete paymentInfo._id;
                console.log('Payment Info:', paymentInfo);

                const { data } = await axiosSecure.post('/payment', paymentInfo);
                console.log('Payment Response:', data);
                refetch();
                closeModal();
                toast.success('Payment made successfully');
                navigate('/dashboard/payment-history');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setCardError('An error occurred while processing the payment');
        }

        setProcessing(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#434770',
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

                <div>
                    <button
                        disabled={!stripe || !clientSecret || processing}
                        type="submit"
                        onClick={handleSubmit}
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                        {processing ? 'Processing...' : `Pay $${userInfo?.rent}`}
                    </button>
                    <button
                        onClick={closeModal}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
        </>
    );
};

export default MakePaymentForm;
