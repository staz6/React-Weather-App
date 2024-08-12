import React from "react";
import Mainbar from "../Complex/Mainbar";
import Sidebar from "../Complex/Sidebar";

const Layout: React.FC = () => (
  <div className=" flex flex-col lg:flex-row bg-linearBg dark:bg-DarklinearBg ">
    <Sidebar />
    <Mainbar />
  </div>
);

export default Layout;
