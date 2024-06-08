import React, { useContext } from "react";
import useUserInfo from "../../../Hooks/useUserInfo";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";

const PaymentHistoryTable = () => {
  const axiosSecure = useAxiosCommon();
  const userInfo = useUserInfo();
  const { user } = useContext(AuthContext);
  const { data } = useQuery({
    queryKey: ["payment-hostory", userInfo, user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history/${user?.email}`);
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
              <th>User</th>
              <th>Transection Id</th>
              <th>payment Data</th>
              <th>Apartment Info</th>
              <th>Month</th>
              <th>
                Rent<small>/monthly</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((info, index) => (
              <tr key={info._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.displayName}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>{info.transaction_id}</td>
                <td>{info?.payment_data}</td>
                <td>
                  ApartMent No :{info?.apartment_no}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Block Name : {info?.block_name}
                  </span>
                </td>
                <td>{info?.month}</td>
                <th>
                  <h1 className="">${info.rent}</h1>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
