import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { MdEmail, MdOutlineMapsHomeWork } from "react-icons/md";
import { FaRegClock, FaUser } from "react-icons/fa";
import useUserInfo from "../../../Hooks/useUserInfo";

const ProfileCard = () => {
  const { user } = useContext(AuthContext);
  const userInfo = useUserInfo();

  const formattedDate = userInfo?.timestamp
    ? new Date(userInfo.timestamp).toLocaleString()
    : "none";

  return (
    <div className="w-full max-w-lg mt-20 overflow-hidden bg-green-50 rounded-lg shadow-lg dark:bg-gray-800">
      <img
        className="object-cover object-center w-full h-56"
        src={user.photoURL}
        alt="avatar"
      />

      <div className="flex items-center px-6 py-3 bg-gray-900">
        <FaUser className="text-2xl text-white" />
        <h1 className="mx-3 text-lg font-semibold text-white">{userInfo?.role || 'User'}</h1>
      </div>

      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {user.displayName}
        </h1>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
        <FaRegClock className="text-2xl" />
          <div className="px-2 text-xl">
            <h1 className="">
              {userInfo?.status === 'Accepted' && 'Accepted Date : '}
              {" "}
              <span className="text-lg">{ userInfo?.status === 'Accepted' ? userInfo?.date : ''}</span>
            </h1>
          </div>
        </div>

        <div className="flex mt-4 text-gray-700 dark:text-gray-200">
          <MdOutlineMapsHomeWork className="text-2xl" />
          <div className="px-2 text-xl">
            <h1 className="">Rented apartment : </h1>
            <p>Floor : <span className="text-lg">{userInfo?.role == 'user' || !userInfo?.role ? 'none' : userInfo?.floor_no}</span></p>
            <p>Block name : <span className="text-lg">{userInfo?.role == 'user' || !userInfo?.role ? 'none' : userInfo?.block_name}</span></p>
            <p>Apertment no : <span className="text-lg">{userInfo?.role == 'user' || !userInfo?.role ? 'none' : userInfo?.apartment_no}</span></p>
            <p>Rent : <span className="text-lg">${userInfo?.role == 'user' || !userInfo?.role ? 'none' : userInfo?.rent}</span></p>
          </div>
        </div>

        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <MdEmail className="text-2xl" />
          <h1 className="px-2 text-xl">{user.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
