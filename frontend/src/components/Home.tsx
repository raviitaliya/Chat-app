import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import axios from "axios";
import { logout, onlineUser, setUser, setSocketConnection } from "../Redux/Slice";
import { useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import io from "socket.io-client";
import { useEffect } from "react";
import UserMassage from "./UserMassage";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  

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
      dispatch(onlineUser(data));
    });

    dispatch(setSocketConnection(socketconnection)); 
    
    return () => {
      socketconnection.disconnect();
    };
  }, []);

  if(params){
    
  }

  return (
    <div className="grid grid-cols-[400px,1fr] ">
      <div className="grid grid-cols-[64px,1fr]">
        <Sidebar />
        <div className="overflow-hidden">
          <Message />
        </div>
      </div>

      <div className="border-l-2 border-slate-200">
        <UserMassage />
      </div>
    </div>
  );
};

export default Home;
