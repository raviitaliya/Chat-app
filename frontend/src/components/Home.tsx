import Sidebar from "./Sidebar";
import axios from "axios";

const Home = () => {


  const getUserdata = async ()=>{


  const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;

    try {
      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true,
      })

      const userData = response.data;

      console.log(userData);
      
    }
      catch (err) {
        console.log(err);
        
      }
  }

  getUserdata()
      
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Home;
