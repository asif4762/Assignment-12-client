import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { MdEmail, MdOutlineMapsHomeWork } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import useUserInfo from "../../../Hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSeruce";
import { FaHouseChimneyUser } from "react-icons/fa6";

const AdminProfileCard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: count } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apartment-count`);
      return res.data;
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfMembers, setNumberOfMembers] = useState(0);

  useEffect(() => {
    if (users) {
      const userCount = users.filter(user => user.role === 'user').length;
      const memberCount = users.filter(user => user.role === 'member').length;
      setNumberOfUsers(userCount);
      setNumberOfMembers(memberCount);
    }
  }, [users]);

  const totalRooms = count?.count || 0;
  const availableRooms = totalRooms - numberOfUsers - numberOfMembers;
  const percentageAvailableRooms = (availableRooms / totalRooms) * 100;

  return (
    <div className="w-full max-w-lg mt-20 overflow-hidden bg-green-50 rounded-lg shadow-lg dark:bg-gray-800">
      <img
        className="object-cover object-center w-full h-56"
        src={user.photoURL}
        alt="avatar"
      />

      <div className="flex items-center px-6 py-3 bg-gray-900">
        <h1 className="mx-3 text-lg font-semibold text-white">Admin</h1>
      </div>

      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {user.displayName}
        </h1>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <div className="px-2 text-xl">
            <h1>Total Rooms: {totalRooms}</h1>
          </div>
        </div>

        <div className="flex mt-4 text-gray-700 dark:text-gray-200">
          <div className="px-2 text-xl">
            <p>
              Percentage of available rooms:{" "}
              <span className="text-lg">{percentageAvailableRooms.toFixed(2)}%</span>
            </p>
            <p>
              Number of Users:{" "}
              <span className="text-lg">{numberOfUsers}</span>
            </p>
            <p>
              Number of Members:{" "}
              <span className="text-lg">{numberOfMembers}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <h1 className="px-2 text-xl">{user.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileCard;
