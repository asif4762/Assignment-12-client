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
        // {
        //   path: '/apartment/:id',
        //   element: <PrivateRoute><Apartment/></PrivateRoute>
        // },
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
          path: 'my-profile',
          element: <PrivateRoute><MyProflie/></PrivateRoute>
        },
        {
          path: 'announcments',
          element: <PrivateRoute><Announcements/></PrivateRoute>
        },
        {
          path: 'make-payment',
          element: <PrivateRoute><MakePayment/></PrivateRoute>
        },
        {
          path: 'payment-history',
          element: <PrivateRoute><PaymentHistroy/></PrivateRoute>
        }
      ]
    }
  ]);
  