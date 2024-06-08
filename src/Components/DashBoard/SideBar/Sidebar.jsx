import { useContext } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaHome, FaUser, FaUserAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import useAxiosSecure from "../../../Hooks/useAxiosSeruce";
import { useQuery } from "@tanstack/react-query";
import { MdOutlinePayment, MdOutlineRequestPage } from "react-icons/md";
import { AiFillDollarCircle, AiFillSound } from "react-icons/ai";
import useUserInfo from "../../../Hooks/useUserInfo";
import { FaHandshakeSimple } from "react-icons/fa6";

const SidebarUser = () => {
  const { user, logOut } = useContext(AuthContext); 
  const axiosSecure = useAxiosSecure();

  const userInfo = useUserInfo();

  console.log(userInfo);
  

  // const role = userInfo.role
  const role = userInfo?.role || 'user';
  // const role = 'admin';

  const linkClasses ="flex items-center px-4 py-2 transition-colors duration-300 transform rounded-md dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400";
  const activeLinkClasses ="text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200";

  return (
    <aside className="flex flex-col min-h-screen w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <img
        className="w-[80px] h-[500px] sm:h-7"
        src="https://api.logo.com/api/v2/images?logo=logo_12043915-fe7e-4d51-bcaf-46696dc86028&u=1717606049&width=500&height=400&fit=contain&margins=100&format=webp&quality=60"
        alt=""
      />

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
        <NavLink to='/'
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }>
            <FaHome />
            <span className="mx-4 font-medium">Home</span>
        </NavLink>
          {
            role === 'user' || role === 'member' && <NavLink
            to="/dashboard/announcments"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
          >
            <HiSpeakerphone />
            <span className="mx-4 font-medium">Announcements</span>
          </NavLink>
          }

          {
            role === 'member' && <div>
            <NavLink
            to="/dashboard/make-payment"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
          >
            <MdOutlinePayment />
            <span className="mx-4 font-medium">Make Payment</span>
          </NavLink>

          <NavLink
            to="/dashboard/payment-history"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
          >
            <AiFillDollarCircle />
            <span className="mx-4 font-medium">Payment History</span>
          </NavLink>
            </div>
          }
          {
            role === 'admin' && <div>
            <NavLink
            to="/dashboard/payment-history"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
          >
            <FaUserAlt />
            <span className="mx-4 font-medium">Manage Members</span>
          </NavLink>
          <NavLink
            to="/dashboard/payment-history"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
          >
            <AiFillSound />
            <span className="mx-4 font-medium">Make Announcement</span>
          </NavLink>
          <NavLink
            to="/dashboard/payment-history"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
          >
            <FaHandshakeSimple />
            <span className="mx-4 font-medium">Agreement Request</span>
          </NavLink>
          <NavLink
            to="/dashboard/payment-history"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
          >
            <MdOutlineRequestPage />
            <span className="mx-4 font-medium">Mange Cupon</span>
          </NavLink>
            </div>
          }
          
          
        </nav>
        <div>
          <hr className="mb-10" />
          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ""}`
            }
          >
            <FaUser />
            <h1 className="mx-4 font-medium">My Profile</h1>
          </NavLink>
          <button onClick={() => logOut()} className="Logout btn w-full btn-sm justify-start mt-10"> <CiLogout /> Logout</button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarUser;
