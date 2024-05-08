import Sidebar from "./components/Sidebar";
import Calender from "./components/Calender";
import Login from "./Login-register/Login";
import Register from "./Login-register/Register";
import Message from "./components/Message";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "Calender",
      element: <Calender />,
    },
    {
      path: "/message/:userId",
      element: <Message />,
    },
  ]);

  return <RouterProvider router={Router} />;
}

export default App;
