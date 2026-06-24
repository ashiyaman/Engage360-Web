import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

const Body = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <Header />
      <div className="md:flex flex-row">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <button
        className="md:hidden fixed top-25 left-2 z-50
        border-0
        p-0
        w-10 h-10
        rounded-full
        bg-black text-white
        flex items-center justify-center
        shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <HiChevronLeft className="text-xl text-white" />
        ) : (
          <HiChevronRight className="text-xl" />
        )}
      </button>
      {isSidebarOpen && (
        <div className="md:hidden fixed top-16 left-0 w-56 h-[calc(100vh-4rem)] bg-[#242424] z-40 shadow-lg">
          <Sidebar />
        </div>
      )}
      <Outlet />
      </div>
    </div>
  );
};

export default Body;
