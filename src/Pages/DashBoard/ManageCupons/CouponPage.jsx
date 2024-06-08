import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import { Modal, Button, Input } from 'antd';
import useAxiosSecure from '../../../Hooks/useAxiosSeruce';
import toast from 'react-hot-toast';

const CouponPage = ({refetch}) => {
    const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [couponTitle, setCouponTitle] = useState('')
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [couponDescription, setCouponDescription] = useState('');

  const handleAddCoupon = async () => {
    try {
      const newCoupon = {
        title : couponTitle,
        code : couponCode,
        discount: discountPercentage,
        description: couponDescription,
        expiryDate : new Date().toLocaleDateString()
      };
      const res = await axiosSecure.post('/coupons', newCoupon);
      console.log(res.data);
      if(res.data.insertedId){
        toast.success('Coupons added successfully')
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
      toast.error('Error adding coupon');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(true)}>Add Coupon</Button>
      <Modal 
        title="Add Coupon"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddCoupon}>
            Submit
          </Button>,
        ]}
      >
      <Input
          type="text"
          placeholder="Coupon Title"
          value={couponTitle}
          onChange={e => setCouponTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={e => setCouponCode(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Discount Percentage"
          value={discountPercentage}
          onChange={e => setDiscountPercentage(e.target.value)}
        />
        <Input
          type="text"
          name='description'
          placeholder="Coupon Description"
          value={couponDescription}
          onChange={e => setCouponDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default CouponPage;
