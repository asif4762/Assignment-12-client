import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSeruce";
import toast from "react-hot-toast";

const CouponTable = () => {
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/coupons`);
      return res.data;
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [couponData, setCouponData] = useState({
    title: "",
    code: "",
    discount: "",
    description: "",
  });

  const handleDelete = async (info) => {
    console.log(info?._id);
    const res = await axiosSecure.delete(`/coupons/${info?._id}`);
    console.log(res.data);
    if (res.status === 200) {
      toast.success('Coupon deleted successfully');
      refetch();
    } else {
      toast.error('Error deleting coupon');
    }
  };

  const handleAddCoupon = async () => {
    try {
      const res = await axiosSecure.post(`/coupons`, couponData);
      if (res.status === 200) {
        toast.success('Coupon added successfully');
        setCouponData({ title: "", code: "", discount: "", description: "" });
        setShowModal(false);
        refetch();
      } else {
        toast.error('Error adding coupon');
      }
    } catch (error) {
      toast.error('Error adding coupon');
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="btn btn-primary mb-4">Add Coupon</button>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Coupon code</th>
              <th>Discount percentage</th>
              <th>Coupon description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((info, index) => (
              <tr key={info._id}>
                <th>{index + 1}</th>
                <td>{info.title}</td>
                <td>{info.code}</td>
                <td>{info.discount}%</td>
                <td>{info.description}</td>
                <th><button onClick={() => handleDelete(info)} className="btn btn-sm btn-error">Delete</button></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="mb-4">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={couponData.title}
                onChange={(e) => setCouponData({ ...couponData, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Coupon Code</label>
              <input
                type="text"
                value={couponData.code}
                onChange={(e) => setCouponData({ ...couponData, code: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Discount Percentage</label>
              <input
                type="number"
                value={couponData.discount}
                onChange={(e) => setCouponData({ ...couponData, discount: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                value={couponData.description}
                onChange={(e) => setCouponData({ ...couponData, description: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary mr-2">Cancel</button>
              <button onClick={handleAddCoupon} className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponTable;
