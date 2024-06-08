import { useContext, useEffect, useState } from "react";
import useUserInfo from "../../../Hooks/useUserInfo";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageMembersTable = () => {
  const axiosSecure = useAxiosCommon();
  const userInfo = useUserInfo();
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const { data, refetch } = useQuery({
    queryKey: ["manage-members", userInfo, user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      const filterData = data.filter(item => item.role === 'member');
      setMembers(filterData);
    }
  }, [data]);

  const handleRemove = async (info) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/user/${info.email}`);
          if (res.data.deletedCount === 1) {
            refetch();
            Swal.fire("Deleted!", "Member has been removed successfully.", "success");
          } else {
            Swal.fire("Error!", "Failed to remove member.", "error");
          }
        } catch (error) {
          console.error('Error removing member:', error);
          Swal.fire("Error!", "Failed to remove member.", "error");
        }
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((info, index) => (
              <tr key={info._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={info.photoURL} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{info.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm opacity-50">{info.email}</div>
                </td>
                <td>
                  <button onClick={() => handleRemove(info)} className="btn btn-error btn-sm">
                    <MdDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembersTable;
