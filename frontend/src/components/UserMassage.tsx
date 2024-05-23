import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GlobalStore } from "../Redux/Store";
import { useEffect, useState } from "react";
import { VscSmiley } from "react-icons/vsc";
import { FiPaperclip } from "react-icons/fi";
import { GoPaperAirplane } from "react-icons/go";
import EmojiPicker from 'emoji-picker-react';

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

  const handleEmoji = () => {
    return 
  };

  return (
    <div>
      <div className="w-full h-20 px-4 border-b-2 border-slate-300 shadow-sm flex gap-5 items-center">
        <img
          src={userData.profile_Pic}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h1 className="font-medium text-lg">{userData.name}</h1>
          <h1
            className={`text-sm ${
              userData.online ? "text-primary" : "text-slate-400"
            }`}
          >
            {userData.online ? "online" : "offline"}
          </h1>
        </div>
      </div>
      <section className="h-[calc(100vh-140px)] p-4">
        <h1>show massge</h1>
      </section>
      <div className="flex items-center w-full border-t-2 h-[60px] p-1">
        <button onClick={handleEmoji}>
          <VscSmiley  className="text-2xl ml-2 h-full" />
        </button>
        <FiPaperclip className="text-2xl h-full ml-5" />
        <input
          type="text"
          className="w-full h-full text-lg p-3 mb-1 ml-5 rounded-md focus:outline-none"
          placeholder="Type a message"
        />
        <GoPaperAirplane className="text-2xl mr-3 h-full" />
      </div>
    </div>
  );
};

export default UserMassage;
