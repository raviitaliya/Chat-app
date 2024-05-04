import { BsChatSquareDots } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    
      <div className="h-screen w-20 border-r-2 flex row justify-center pt-4">
        <div className="w-auto h-auto ">
          <div className="bg-[#615EF0] rounded-md w-12 h-12 "></div>
          <div className="grid justify-center mt-8">
            <Link to="">
              <BsChatSquareDots className="text-[25px] text-gray-500" />
            </Link>
            <Link to="/">
              <IoCallOutline className="text-[25px] text-gray-500 mt-7" />
            </Link>
            <Link to="/Calender">
              <IoCalendarOutline className="text-[25px] text-gray-500 mt-7" />
            </Link>
            <Link to="">
              <div className="absolute bottom-7 left-7">
                <IoSettingsOutline className="text-[25px] text-gray-500 mt-7 " />
              </div>
            </Link>
          </div>
        </div>
      </div>
    
  );
};

export default Sidebar;