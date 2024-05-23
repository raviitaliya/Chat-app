import { HiSearch } from "react-icons/hi";
import axios from "axios";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import UserCard from "./UserCard";
import { MdOutlineClose } from "react-icons/md";

interface User {
  _id: string;
  name: string;
  profile_pic?: string;
}

const Message: React.FC = () => {
  const [searchData, setSearchData] = useState<string>("");
  const [resData, setResData] = useState<User[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const searchUser = useCallback(async () => {
    if (searchData.trim() === "") {
      setResData([]);
      return;
    }

    try {
      const response = await axios.get<{ data: User[] }>(
        `${import.meta.env.VITE_BACKEND_URL}/api/search/${searchData}`,
        { withCredentials: true }
      );

      setResData(response.data.data);
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

  useEffect(() => {
    setSearchOpen(searchData !== "");
  }, [searchData]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  return (
    <div className="h-screen overflow-hidden">
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
          {searchOpen && (
            <button onClick={() => setSearchData("")}>
              <MdOutlineClose className="flex mt-[0.5px] w-7 px-1 text-slate-500 items-center justify-center h-full rounded-md hover:bg-gray-200" />
            </button>
          )}
        </div>
      </div>

      <div className="pl-4 pr-1 overflow-y-auto">
        <div className="border-gray-200 pr-2 h-[calc(100vh-150px)]">
          {resData.length > 0 &&
            resData.map((data) => (
              <UserCard key={data._id} data={data} searchOpen={setSearchData}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
