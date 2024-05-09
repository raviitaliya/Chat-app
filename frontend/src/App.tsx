import Calender from "./components/Calender";
import Login from "./Login-register/Login";
import Register from "./Login-register/Register";
import Message from "./components/Message";
import Home from "./components/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AuthLayout from "./Auth/AuthLayout";

import "./App.css";

function App() {
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
      ],
    }
  ]);

  return <RouterProvider router={Router} />;
}

export default App;


const AppLayout = () => {
  
  return (
    <div>
      <Outlet/>
    </div>
  )
}


