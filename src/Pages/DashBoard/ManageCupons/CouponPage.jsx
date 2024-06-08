import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import { Modal, Button, Input } from 'antd';

const CouponPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [couponDescription, setCouponDescription] = useState('');

  // Function to fetch coupons from the database
  const fetchCoupons = async () => {
    try {
      const response = await axios.get('/api/coupons'); // Assuming endpoint '/api/coupons' to get coupons
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  useEffect(() => {
    fetchCoupons(); // Fetch coupons when component mounts
  }, []);

  // Function to handle adding a new coupon
  const handleAddCoupon = async () => {
    try {
      const newCoupon = {
        couponCode,
        discountPercentage,
        couponDescription
      };
      await axios.post('/api/coupons', newCoupon); // Assuming endpoint '/api/coupons' to add coupon
      fetchCoupons(); // Fetch coupons again to update the list
      setShowModal(false); // Close the modal after adding the coupon
    } catch (error) {
      console.error('Error adding coupon:', error);
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
          placeholder="Coupon Description"
          value={couponDescription}
          onChange={e => setCouponDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default CouponPage;
