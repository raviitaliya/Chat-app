import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GlobalStore } from "../Redux/Store";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { VscSmiley } from "react-icons/vsc";
import { FiPaperclip } from "react-icons/fi";
import { GoPaperAirplane } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { User } from "../Redux/Slice";
import moment from "moment";
// import uploadFiles from "../helpers/UploadFile";

const UserMessage = () => {
  const user = useSelector<GlobalStore>((state) => state?.user) as User;

  const socket = useSelector<GlobalStore, Socket>(
    (state) => state.user.socketconnection
  );
  const params = useParams();
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    profile_Pic: "",
    online: false,
  });
  const currentMessage = useRef(null);

  // const [imageVideo, setImageVideo] = useState({
  //   image: null,
  //   video: null,
  // });

  const [message, setMessage] = useState({
    message: "",
    image: "",
    video: "",
  });
  const [allMessage, setallMessage] = useState([]);
  console.log(allMessage);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView();
    }
  }, [allMessage]);

  // const handleImage = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = await uploadFiles(file);
  //     setImageVideo({ image: imageUrl.url, video: null });
  //   }
  // };

  // const handleVideo = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const videoUrl = await uploadFiles(file);
  //     setImageVideo({ image: null, video: videoUrl.url });

  //   }
  // };

  useEffect(() => {
    if (socket) {
      socket.emit("userId", {
        resiver: params.id?.toString(),
        sender: user._id,
      });

      const handleUser = (
        data: SetStateAction<{
          email: string;
          name: string;
          profile_Pic: string;
          online: boolean;
        }>
      ) => {
        setUserData(data);
      };

      socket.on("user", handleUser);

      socket.on("message", (data) => {
        if (data) {
          setallMessage(data);
        } else {
          setallMessage([]);
        }

        console.log(data);
      });

      return () => {
        socket.off("user", handleUser);
      };
    }
  }, [socket, params]);

  if (!params.id) {
    return (
      <h1 className="w-full h-full flex justify-center items-center text-2xl text-slate-400">
        Welcome to the chatting app
      </h1>
    );
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);

    if (message.message || message.image || message.video) {
      if (socket) {
        socket.emit("NewMessage", {
          sender: user._id,
          receiver: params.id,
          message: message.message,
          image: message.image,
          video: message.video,
          msgById: user._id,
        });

        setMessage({
          message: "",
          image: "",
          video: "",
        });
      }
    }
  };

  return (
    <div>
      <div className="w-full h-20 px-4 border-b-2 border-slate-300 shadow-sm flex gap-5 items-center">
        <img
          src={userData.profile_Pic}
          className="w-12 h-12 rounded-full object-cover"
          alt={`${userData.name}'s profile`}
        />
        <div>
          <h1 className="font-medium text-lg">{userData.name}</h1>
          <h1
            className={`text-sm ${
              userData.online ? "text-primary" : "text-slate-400"
            }`}
          >
            {userData.online ? "Online" : "Offline"}
          </h1>
        </div>
      </div>
      <section className="h-[calc(100vh-140px)] px-3 py-3 bg-slate-200 flex flex-col w-full overflow-y-scroll ">
        {allMessage.map((msg) => {
          return (
            <div
              ref={currentMessage}
              key={msg._id}
              className={`bg-white px-3 py-2 flex mt-2 gap-4 max-w-96 rounded-md w-fit justify-end ${
                user?._id === msg.msgById
                  ? "ml-auto text-white !bg-primary"
                  : ""
              }`}
            >
              <p className="flex-grow">{msg.message}</p>
              <p
                className={`text-slate-400 text-xs flex items-end max-w-14 flex-shrink-0 ${
                  user?._id === msg.msgById ? "text-white" : ""
                }`}
              >
                {moment(msg.createdAt).format("hh:mm A")}
              </p>
            </div>
          );
        })}
      </section>

      {toggleEmoji && (
        <div className="absolute w-32 h-28 bottom-16 p-2 border-slate-400 rounded-sm shadow-slate-300 shadow-xl z-20 hover:transition-all select-none">
          <label htmlFor="video">
            <div className="w-full h-[50%] flex justify-center items-center border-slate-400 gap-2 border-b hover:bg-slate-100">
              <IoVideocamOutline className="text-2xl" />
              <h3 className="text-lg">Video</h3>
            </div>
          </label>
          <label htmlFor="image">
            <div className="w-full h-[50%] flex justify-center gap-2 items-center hover:bg-slate-100">
              <IoImageOutline className="text-2xl" />
              <h3 className="text-lg">Image</h3>
            </div>
          </label>
          <input
            // onChange={handleVideo}
            type="file"
            id="video"
            className="hidden"
          />
          <input
            // onChange={handleImage}
            type="file"
            id="image"
            className="hidden"
          />
        </div>
      )}

      <div className="flex items-center w-full border-t-2 h-[60px] p-1">
        <button>
          <VscSmiley className="text-2xl ml-2 h-full" />
        </button>
        <FiPaperclip
          onClick={() => setToggleEmoji(!toggleEmoji)}
          className="text-2xl h-full ml-5"
        />
        <form onSubmit={handleSendMessage} className="flex items-center w-full">
          <input
            type="text"
            value={message.message}
            onChange={(e) =>
              setMessage({
                message: e.target.value,
                image: "",
                video: "",
              })
            }
            className="w-full h-full text-lg p-3 mb-1 ml-5 rounded-md focus:outline-none"
            placeholder="Type a message"
          />
          <button>
            <GoPaperAirplane className="text-2xl mr-3 h-full" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserMessage;
