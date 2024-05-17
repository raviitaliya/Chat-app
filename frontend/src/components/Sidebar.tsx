import { BsChatSquareDots } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useState } from "react";
import EditUserDetails from "../components/EditUserDetails"
import { useSelector } from "react-redux";


const Sidebar = () => {
  const user = useSelector(state => state?.user)
  const [editProfile, seteditProfile] = useState(false);

  const placeholderImg = "../public/img/empty_profile.jpg";
  const profile_pic = user.profile_pic || placeholderImg;
  

  return (
    <div className="h-screen w-20 border-r-2 flex flex-col items-center justify-between pt-4 ">
      <div className="flex flex-col items-center">
        <div className="bg-[#615EF0] rounded-md w-12 h-12 mb-7"></div>
        <Link to="">
          <BsChatSquareDots className="text-[30px] text-gray-500 hover:text-gray-800" />
        </Link>
        <Link to="/">
          <IoCallOutline className="text-[30px] text-gray-500 mt-7 hover:text-gray-800" />
        </Link>
        <Link to="/calender">
          <IoCalendarOutline className="text-[30px] text-gray-500 mt-7 hover:text-gray-800" />
        </Link>
      </div>
      <div className="flex items-center flex-col justify-center">
        <Link to="">
          <div className="mb-6">
            <IoSettingsOutline className="text-[30px] text-gray-500 mt-7 hover:text-gray-800" />
          </div>
        </Link>
        <button title="profile" onClick={()=>seteditProfile(true)}>
        <img className="w-[40px] object-cover mb-5 border-2 rounded-full h-[40px]" src={profile_pic} />
        </button>
      </div>

      {
        editProfile && (<EditUserDetails onclose={()=>seteditProfile(false)} data={user}/>)
      }
    </div>
  );
};

export default Sidebar;
