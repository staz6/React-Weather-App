import React from "react";
import Mainbar from "../Complex/Mainbar";
import Sidebar from "../Complex/Sidebar";

const Layout: React.FC = () => (
  <div className=" flex flex-col lg:flex-row ">
    <Sidebar />
    <Mainbar />
  </div>
);

export default Layout;
