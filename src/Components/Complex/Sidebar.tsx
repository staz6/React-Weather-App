import React from "react";
import Searchbar from "../Compound/Searchbar";

const Sidebar: React.FC = () => (
  <div className="border-r border-custom-gray flex flex-col bg-linearSide min-h-screen  w-full lg:w-1/3 p-7 lg:p-4 xl:p-7 space-y-0 overflow-x-hidden">
    <Searchbar />
  </div>
);

export default Sidebar;
