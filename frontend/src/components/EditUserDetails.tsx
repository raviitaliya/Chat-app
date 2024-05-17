import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Slice";
import UploadFile from "../helpers/UploadFile";

const EditUserDetails = ({ onclose, data }) => {
  const placeholderImg = "../public/img/empty_profile.jpg";
  const profile_pic = data.profile_pic || placeholderImg;

  const dispatch = useDispatch();

  const [updateUser, setupdateUser] = useState({
    name: data.name,
    profile_pic: data.profile_pic,
  });

  const uploadPhotoRef = useRef();

  useEffect(() => {
    setupdateUser((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  }, [data]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setupdateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const photo = await UploadFile(file);
      setupdateUser((prev) => ({
        ...prev,
        profile_pic: photo.url,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-User`;

    try {
      const response = await axios({
        method: "put",
        url: URL,
        data: {
          name: updateUser.name,
          profile_pic: updateUser.profile_pic,
        },
        withCredentials: true,
      });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setUser(response.data.user));
      }
    } catch (err) {
      toast.error("Error updating user");
    }
  };

  const handleProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-slate-700 bg-opacity-40 flex items-center justify-center">
      <div className="max-w-sm p-5 pt-6 rounded-md bg-white w-full">
        <h2 className="text-xl font-medium">Profile Details</h2>
        <div className="mt-3 ">
          <form onSubmit={handleSubmit}>
            <label htmlFor="profile_pic">
              <p className="text-lg">Profile:</p>
              <div className="w-full flex flex-col gap-3 items-center mt-5">
                <img
                  className="w-[100px] object-cover items-center rounded-full border-2 h-[100px]"
                  src={profile_pic}
                  alt="Profile"
                />
                <div className="flex items-center">
                  <button
                    onClick={handleProfile}
                    className="px-4 py-2 rounded-sm bg-primary text-white hover:bg-secondary "
                  >
                    Change photo
                  </button>
                  <input
                    type="file"
                    name="profile_pic"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={uploadPhotoRef}
                  />
                </div>
              </div>
            </label>

            <div className="mt-4 flex flex-col">
              <label htmlFor="name" className="text-lg">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="p-2 mt-1 rounded-sm focus:outline-primary"
                value={updateUser.name}
                onChange={handleTextChange}
              />
            </div>

            <div className="flex flex-row gap-3 ml-auto mr-2 w-fit mt-4">
              <button
                className="px-5 py-2 rounded-sm border-2 border-primary hover:-translate-y-1 duration-200"
                onClick={onclose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 border border-primary rounded-sm text-white bg-primary hover:bg-secondary hover:-translate-y-1 duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserDetails;
