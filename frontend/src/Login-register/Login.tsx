import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setToken } from "../Redux/Slice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/login`;

    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: formData,
        withCredentials: true,
      });

      if (response.status === 200) {
        const success = toast.success(response.data.msg);

        if (success) {
          dispatch(setToken(response.data.token));
          localStorage.setItem("token", response.data.token);

          setFormData({
            email: "",
            password: "",
          });

          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error("error");
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-3xl font-bold leading-tight text-black">
            Login
          </h2>
          <p className="mt-4 text-center text-base text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              title=""
              className="font-medium text-[#615EF0] transition-all duration-200 hover:underline"
            >
              Sing up
            </Link>
          </p>
          <form
            onSubmit={handleSubmit}
            action="#"
            method="POST"
            className="mt-8"
          >
            <div className="space-y-5">
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
                      setFormData({
                        ...formData,
                        email: e.target.value,
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
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center  justify-center rounded-md bg-[#615EF0] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-secondary"
                >
                  Login
                  <FaArrowRight className="ml-2 mt-1 text-sm " />
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

export default Login;
