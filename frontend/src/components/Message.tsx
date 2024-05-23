import { HiSearch } from "react-icons/hi";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import UserCard from "./UserCard"; // Ensure the path is correct based on your project structure

const Message = () => {
  const [searchData, setSearchData] = useState("");
  const [resData, setResData] = useState([]);
  const [searchOpen, setsearchOpen] = useState(false);

  console.log(searchOpen);
  
  

  const searchUser = useCallback(async () => {
    if (searchData.trim() === "") {
      setResData([]);
      return;
    }

    try {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/search/${searchData}`,
        withCredentials: true,
      });

      const data = response.data.data;
      setResData(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchUser();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchData, searchUser]);

  //handle search close open
  useEffect(() => {
    if(searchData === ''){
      setsearchOpen(false)
    }else{
      setsearchOpen(true)
    }
  }, [searchData]);
  

  const handleSearch = (e) => {
    setSearchData(e.target.value)
    
  };

  return (
    <div className=" h-screen overflow-hidden">
      <div className="p-4">
        <div className="h-12 mb-2 flex items-center text-xl font-medium text-slate-600">
          Chats
        </div>
        <div className="flex w-full h-10 border-b-[3px] border-primary rounded-md bg-white">
          <HiSearch className="flex text-2xl mt-[0.5px] w-7 px-1 text-slate-500 items-center justify-center h-full" />
          <input
            type="text"
            value={searchData}
            onChange={handleSearch}
            className="w-full p-1 rounded-md focus:outline-none select-none"
            placeholder="search or start new chat"
          />
        </div>
      </div>

      <div className="pl-4 pr-1 overflow-y-auto">
      <div className=" border-gray-200 pr-2 h-[calc(100vh-150px)]">
        {resData.length > 0 &&
          resData.map((data) => <UserCard key={data.id} data={data} />)}
      </div>
      </div>
      
    </div>
  );
};

export default Message;
