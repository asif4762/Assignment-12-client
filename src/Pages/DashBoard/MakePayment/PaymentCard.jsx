import { useState } from 'react';
import useUserInfo from '../../../Hooks/useUserInfo';
import toast from 'react-hot-toast';

const PaymentCard = ({showModal, month, setMonth}) => {
    const userInfo = useUserInfo();
  const [coupon, setCoupon] = useState('');
  const [rent, setRent] = useState(1000); 
  const [discountedRent, setDiscountedRent] = useState(userInfo?.rent);
  const handleApplyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      const discount = rent * 0.10;
      setDiscountedRent(rent - discount);
    } else {
      toast.error('Invalid coupon code');
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pay Rent</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Member Email</label>
          <input
            type="email"
            value={userInfo?.email}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Floor</label>
          <input
            type="text"
            value={userInfo?.floor_no}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Block Name</label>
          <input
            type="text"
            value={userInfo?.block_name}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Apartment No/Room No</label>
          <input
            type="text"
            value={userInfo?.apartment_no}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Rent</label>
          <input
            type="text"
            value={`$${discountedRent}`}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
  <label className="block text-gray-700">Month</label>
  <select
    value={month}
    required
    onChange={(e) => setMonth(e.target.value)}
    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Select Month</option>
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
    <option value="May">May</option>
    <option value="June">June</option>
    <option value="July">July</option>
    <option value="August">August</option>
    <option value="September">September</option>
    <option value="October">October</option>
    <option value="November">November</option>
    <option value="December">December</option>
  </select>
</div>
        <div className="flex items-center">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-grow px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="ml-4 px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Apply
          </button>
        </div>
        <button
          type="button"
          onClick={showModal}
          className="w-full px-4 py-2 mt-6 text-white bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
