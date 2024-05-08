import App from "../App";
import Sidebar from "../components/Sidebar";
import Calender from "../components/Calender";
import Login from "../Login-register/Login";
import Register from "../Login-register/Register";
import Message from "../components/Message";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
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
        path: "",
        element: <Sidebar />,
        children: [
          {
            path: ":userId",
            element: <Message />,
          },
        ],
      },
    ],
  },
]);

export default Router;
