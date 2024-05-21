import React from "react";

const UserCard = ({ data }) => {
  const placeholderImg = "../../img/empty profile.jpg";

  return (
    <div className="w-full h-16 border-2 border-primary flex items-center rounded-md mt-2 p-2">
      <div className="flex-shrink-0 w-12 h-12 mr-4">
        <img
          src={data.profile_pic ? data.profile_pic : placeholderImg}
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="font-medium whitespace-nowrap overflow-ellipsis overflow-hidden">
          {data.name}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
