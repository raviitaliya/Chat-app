import { HiSearch } from "react-icons/hi";

const Message = () => {
  return (
    <div className="p-4">
      <div className="h-12 mb-2 flex items-center text-xl font-medium text-slate-600">
        Chats
      </div>
      <div className="flex w-full h-10 border-b-[3px] border-primary rounded-md bg-white">
        <HiSearch className="flex text-2xl mt-[0.5px] w-7 px-1 text-slate-500 items-center justify-center h-full"/>
        <input type="text" className="w-full p-1 rounded-md focus:outline-none select-none" placeholder="search or start new chat"></input>
      </div>
    </div>
  );
};

export default Message;
