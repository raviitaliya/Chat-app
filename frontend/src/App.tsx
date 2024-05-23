import Calender from "./components/Calender";
import Login from "./Login-register/Login";
import Register from "./Login-register/Register";
import Message from "./components/Message";
import Home from "./components/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AuthLayout from "./Auth/AuthLayout";
import { Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import axios from "axios";
import { setUser } from "./Redux/Slice";

function App() {

  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  // console.log("data",user);

  const getUserdata = async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;

    try {
      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data));

    } catch (err) {
      console.log(err);
    }
  };

  getUserdata();


  const Router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>,
      children: [
        {
          path: "register",
          element: <AuthLayout><Register/></AuthLayout>,
        },
        {
          path: "login",
          element:<AuthLayout><Login /></AuthLayout> ,
        },
        {
          path: "Calender",
          element: <Calender />,
        },
        {
          path: "Message",
          element: <Message />,
        },
        {
          path: "",
          element: <Home />,
        },
        {
          path: `/user/:id`,
          element: <Home/>,
        }
      ],
    }
  ]);

  return <RouterProvider router={Router} />;
}

export default App;


const AppLayout = () => {
  
  return (
    <>
    <Toaster/>
    <div>
      <Outlet/>
    </div>
    </>
  )
}


