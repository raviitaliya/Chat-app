import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GlobalStore } from "../Redux/Store";
import { useEffect, useState } from "react";

const UserMassage = () => {
  const socket = useSelector<GlobalStore, Socket>(
    (state) => state.user.socketconnection
  );
  const perams = useParams();
  const [userData, setuserData] = useState({
    email: "",
    name: "",
    profile_Pic: "",
    online: false,
  });

  useEffect(() => {
    if (socket) {
      socket.emit("userId", perams.id?.toString());

      socket.on("user", (data) => {
        console.log("userdata from back", data);
        setuserData(data);
      });
    }
  }, [socket, perams]);

  console.log("statedata", userData);

  return (
    <div>
      <div className="w-full h-20 px-4 border-b-2 border-slate-300 shadow-sm flex gap-5 items-center">
        <img
          src={userData.profile_Pic}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h1 className="font-medium text-xl">{userData.name}</h1>
          <h1
            className={`text-sm ${
              userData.online ? "text-primary" : "text-slate-200"
            }`}
          >
            {userData.online ? "online" : "offline"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UserMassage;
