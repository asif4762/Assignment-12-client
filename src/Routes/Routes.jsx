import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Appartments from "../Pages/Appartments/Appartments";
import Apartment from "../Pages/Apartment/Apartment";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
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
          path: '/apartment/:id',
          element: <PrivateRoute><Apartment/></PrivateRoute>
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
  ]);
  