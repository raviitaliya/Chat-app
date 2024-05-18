import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import axios from "axios";
import { logout, setUser } from "../Redux/Slice";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

const Home = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      if (response.data.logout) {
        dispatch(logout());
        navigate("/login");
      }

      // const userData = response.data;

      // console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  getUserdata();

  return (
    <div className="grid grid-cols-[400px,1fr] ">
      <div className="grid grid-cols-[64px,1fr]">
        <Sidebar />
        <div className="">
          <Message />
        </div>
      </div>

      <div className="border-l-2 border-slate-200"></div>
    </div>
  );
};

export default Home;
