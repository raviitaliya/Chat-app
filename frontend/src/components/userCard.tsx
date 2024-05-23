import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GlobalStore } from "../Redux/Store";

interface UserCardProps {
  data: {
    _id: string;
    name: string;
    profile_pic?: string;
  };
  searchOpen: (value: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ data, searchOpen }) => {
  const onlineStatus = useSelector<GlobalStore, string[]>(state => state?.user?.online) || [];
  const placeholderImg = "../../img/empty profile.jpg";
  const navigate = useNavigate();

  const isOnline = onlineStatus.includes(data._id);

  const handleClick = () => {
    navigate(`/user/${data._id}`);
    searchOpen("");
  };

  return (
    <div 
      className="w-full h-16 border-2 border-primary flex items-center rounded-md mt-2 p-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex-shrink-0 w-12 h-12 mr-4">
        <img
          src={data.profile_pic ? data.profile_pic : placeholderImg}
          className="w-12 h-12 object-cover rounded-full"
          alt="Profile"
        />
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="font-medium whitespace-nowrap overflow-ellipsis overflow-hidden">
          {data.name}
        </div>
        {isOnline && (
          <div className="text-xs text-gray-400">
            <span className="text-xs text-green-400">online</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
