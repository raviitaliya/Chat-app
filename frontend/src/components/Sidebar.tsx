import { BsChatSquareDots } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-20 border-r-2 flex flex-col items-center justify-between pt-4 ">
      <div className="flex flex-col items-center">
      <div className="bg-[#615EF0] rounded-md w-12 h-12 mb-7"></div>
      <Link to="">
        <BsChatSquareDots className="text-[25px] lg:text-[30px] text-gray-500 hover:text-gray-800" />
      </Link>
      <Link to="/">
        <IoCallOutline className="text-[25px] lg:text-[30px] text-gray-500 mt-7 hover:text-gray-800" />
      </Link>
      <Link to="/calender">
        <IoCalendarOutline className="text-[25px] xl:text-[30px] text-gray-500 mt-7 hover:text-gray-800" />
      </Link>
      </div>
      <Link to="">
        <div className="mb-6">
          <IoSettingsOutline className="text-[25px] xl:text-[30px]  text-gray-500 mt-7 hover:text-gray-800" />
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
