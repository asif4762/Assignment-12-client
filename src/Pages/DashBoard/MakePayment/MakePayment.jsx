import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Modal } from 'antd';
import CheckOutForm from './CheckOutForm';
import PaymentCard from './PaymentCard';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const MakePayment = () => {
    const [month, setMonth] = useState('');
    const [visible, setVisible] = useState(false);
    console.log(month)
    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handlePaymentSuccess = () => {
        setVisible(false); 
    };

    return (
        <div>
            <div className="mt-20">
        <div className=" lg:w-1/2 mx-full text-blue-900 mb-10">
          <h1 className="text-center font-bold text-3xl border-y-4 border-green-700 py-10">
            Make Your Payment Here
          </h1>
        </div>
      </div>
            <div className='w-full lg:-ml-60 mx-auto'>
            <PaymentCard showModal={showModal} month={month} setMonth={setMonth} handlePaymentSuccess={handlePaymentSuccess}/>
            </div>
            <Modal
                title="Make a Payment"
                visible={visible}
                onCancel={handleCancel}
                footer={null} 
                destroyOnClose 
            >
                <Elements stripe={stripePromise}>
                    <CheckOutForm month={month} handlePaymentSuccess={handlePaymentSuccess}/>
                    {/* <MakePaymentForm onSuccess={handlePaymentSuccess} closeModal={handleCancel} /> */}
                </Elements>
            </Modal>
        </div>
    );
};

export default MakePayment;
