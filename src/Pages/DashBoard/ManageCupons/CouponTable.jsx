import  { useContext } from "react";
import useUserInfo from "../../../Hooks/useUserInfo";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSeruce";

const CouponTable = () => {
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/coupons`);
      return res.data;
    },
  });
  console.log(data);
  return (
    <div>
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
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((info, index) => (
              <tr key={info._id}>
                <th>{index + 1}</th>
                <td>{info.title}</td>
                <td>
                 {info.code}
                </td>
                <td>{info.discount}%</td>
                <td>{info.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponTable;
