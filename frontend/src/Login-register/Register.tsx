import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import UploadFile from "../helpers/UploadFile";

const Register = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    profile_photo: "",
  });

  const [uploadPhoto, setuploadPhoto] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  const handleUpload = async (e: Event) => {
    e.preventDefault();
    const file = e.target.files[0];

    const photo = await UploadFile(file);

    setuploadPhoto(file);

    setformData((preve) => {
      return {
        ...preve,
        profile_photo: photo.url,
      };
    });
  };

  const handleClearPhoto = (e: Event) => {
    setuploadPhoto("");
    e.preventDefault();
    e.stopPropagation();
  };

  // console.log(uploadPhoto);
  console.log(formData);
  

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-3xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-4 text-center text-base text-gray-600">
            Already have an account?
            <Link
              to="/login"
              title=""
              className="font-medium text-[#615EF0] transition-all duration-200 hover:underline"
            >
              Log in
            </Link>
          </p>
          <form
            onSubmit={() => handleSubmit}
            action="#"
            method="POST"
            className="mt-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setformData({
                        name: e.target.value,
                        email: formData.email,
                        password: formData.password,
                        profile_photo: formData.profile_photo,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setformData({
                        name: formData.name,
                        email: e.target.value,
                        password: formData.password,
                        profile_photo: formData.profile_photo,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setformData({
                        name: formData.name,
                        email: formData.email,
                        password: e.target.value,
                        profile_photo: formData.profile_photo,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="file"
                  className="text-base font-medium text-gray-900"
                >
                  upload profile photo
                  <div className="w-full font-normal text-sm bg-gray-300 h-14 flex items-center justify-center cursor-pointer rounded-md mt-2 hover:border-2 border-primary">
                    <p>
                      {uploadPhoto?.name
                        ? uploadPhoto?.name
                        : "Upload profile photo"}
                    </p>
                    {uploadPhoto?.name && (
                      <button
                        className=" ml-2 mt-1 text-xl hover:text-red-600"
                        onClick={handleClearPhoto}
                      >
                        <IoClose />
                      </button>
                    )}
                    <input
                      className="h-10 w-full rounded-md border hidden border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="file"
                      placeholder="file"
                      id="file"
                      onChange={handleUpload}
                    />
                  </div>
                </label>
                <div className="mt-2"></div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#615EF0] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-secondary"
                >
                  Create Account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Register;
