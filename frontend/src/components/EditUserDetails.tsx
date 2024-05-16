import { HiOutlineUserCircle } from "react-icons/hi2";

const EditUserDetails = ({ data }) => {
  const placeholderImg = "../public/img/1.png";
  const profile_pic = data.profile_pic || placeholderImg;
  return (
    <div className="fixed  left-0 right-0 top-0 bottom-0 bg-slate-700 bg-opacity-40 flex items-center justify-center">
      <div className="max-w-sm p-4 rounded-md bg-white w-full">
        <h2 className="text-xl font-medium">Profile Details</h2>
        <div className="mt-3">
          <p className="text-lg">Profile:</p>
          <img className="w-[100px] object-cover rounded-full h-[100px]" src={profile_pic} />
        </div>
      </div>
    </div>
  );
};

export default EditUserDetails;
