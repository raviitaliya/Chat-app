import axios from "axios";
import { useState } from "react";

const EditUserDetails = ({ onclose, data }) => {
  const placeholderImg = "../public/img/empty_profile.jpg";
  const profile_pic = data.profile_pic || placeholderImg;

  const [updateUser, setupdateUser] = useState({
    name: data.name,
    profile_pic: data.profile_pic,
  });

  // const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-User`;

  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: URL,
  //       data: formData,
  //       withCredentials: true,
  //     })

  const handleOnChenge = (e) => {
    const { name, value } = e.target;

    setupdateUser((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-slate-700 bg-opacity-40 flex items-center justify-center">
      <div className="max-w-sm p-5 pt-6 rounded-md bg-white w-full">
        <h2 className="text-xl font-medium">Profile Details</h2>
        <div className="mt-3 ">
          <form>
          <p className="text-lg">Profile:</p>
          <div className="w-full flex flex-col gap-3 items-center mt-5">
            <img
              className="w-[100px] object-cover items-center rounded-full border-2 h-[100px]"
              src={profile_pic}
            />
            <div className="flex items-center">
              <button className="px-4 py-2 rounded-sm  bg-primary text-white hover:bg-secondary ">
                change photo
              </button>
            </div>
          </div>

            <div className="mt-4 flex flex-col">
              <label htmlFor="name" className="text-lg">
                {" "}
                Name:
              </label>
              <input
                type="text"
                name='name'
                className=" p-2 mt-1 rounded-sm focus:outline-primary"
                value={updateUser.name}
                onChange={handleOnChenge}
              ></input>
            </div>


          <div className="flex flex-row gap-3 ml-auto mr-2 w-fit mt-4 ">
            <button
              className="px-5 py-2 rounded-sm border-2 border-primary hover:-translate-y-1 duration-200"
              onClick={onclose}
            >
              cencel
            </button>
            <button className="px-5 py-2 border border-primary rounded-sm text-white bg-primary hover:bg-secondary hover:-translate-y-1 duration-200">
              save
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserDetails;
