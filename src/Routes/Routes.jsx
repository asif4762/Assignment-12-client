import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Appartments from "../Pages/Appartments/Appartments";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import Error from "../Pages/Error/Error";
import PrivateRoute from "./PrivateRoute";
import DashBorad from "../Layout/DashBorad";
import MyProflie from "../Pages/DashBoard/MyProflie/MyProflie";
import Announcements from "../Components/DashBoard/Announcements/Announcements";
import MakePayment from "../Pages/DashBoard/MakePayment/MakePayment";
import PaymentHistroy from "../Pages/DashBoard/PaymentHistory/PaymentHistroy";
import ManageMembers from "../Pages/DashBoard/ManageMembers/ManageMembers";
import MakeAnouncements from "../Pages/DashBoard/MakeAnouncements/MakeAnouncements";
import AgreementRequests from "../Pages/DashBoard/AgreementRequests/AgreementRequests";
import ManageCupons from "../Pages/DashBoard/ManageCupons/ManageCupons";
import MyProfileAdmin from "../Pages/DashBoard/MyProflie/MyProfileAdmin";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error/>,
      children: [
        {
            path: '/',
            element:<Home></Home>
        },
        {
            path: '/apartment',
            element: <Appartments/>,
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: 'signUp',
          element: <SignUp/>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><DashBorad/></PrivateRoute>,
      children: [
        {
          path: 'announcments',
          element: <PrivateRoute><Announcements/></PrivateRoute>
        },
        {
          path: 'my-profile',
          element: <PrivateRoute><MyProflie/></PrivateRoute>
        },
        {
          path: 'make-payment',
          element: <PrivateRoute><MemberRoute><MakePayment/></MemberRoute></PrivateRoute>
        },
        {
          path: 'payment-history',
          element: <PrivateRoute><MemberRoute><PaymentHistroy/></MemberRoute></PrivateRoute>
        },
        {
          path: 'manage-members',
          element: <PrivateRoute><AdminRoute><ManageMembers/></AdminRoute></PrivateRoute>
        },
        {
          path: 'make-anouncement',
          element: <PrivateRoute><AdminRoute><MakeAnouncements/></AdminRoute></PrivateRoute>
        },
        {
          path: 'agreement-request',
          element: <PrivateRoute><AdminRoute><AgreementRequests/></AdminRoute></PrivateRoute>
        },
        {
          path: 'manage-coupon',
          element: <PrivateRoute><AdminRoute><ManageCupons/></AdminRoute></PrivateRoute>
        },
        {
          path: 'my-profile-admin',
          element: <PrivateRoute><AdminRoute><MyProfileAdmin/></AdminRoute></PrivateRoute>
        },
      ]
    }
  ]);
  