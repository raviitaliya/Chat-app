import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import axios from "axios";
import { logout, onlineUser, setUser } from "../Redux/Slice";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import io from "socket.io-client";
import { useEffect } from "react";

const Home = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);
  
  const getUserdata = async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;

    try {
      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data));

      if (response.data.logout) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  getUserdata();

  useEffect(() => {
    const socketconnection = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketconnection.on("onlineuser", (data) => {
      console.log(data);
      dispatch(onlineUser(data));
    });

    return () => {
      socketconnection.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-[400px,1fr] ">
      <div className="grid grid-cols-[64px,1fr]">
        <Sidebar />
        <div className="overflow-hidden">
          <Message />
        </div>
      </div>

      <div className="border-l-2 border-slate-200"></div>
    </div>
  );
};

export default Home;
