import React, { useState, useEffect } from "react";
import SidebarClient from "./SidebarClient";
import AddCategory from "../Admin/AddCategory";
import Profile from "../User/Profile";
import AddSkill from "../Admin/AddSkill";
import ChangePassword from "../User/ChangePassword";

const ClientHome = () => {
  const [values, setValues] = useState();

  useEffect(() => {}, [values]);

  const clickSidebar = (child) => {
    console.log("child: ", child);
    setValues(child);
  };

  const rightSection = () => {
    if (values === "add_category") {
      return <AddCategory />;
    } else if (values === "add_skill") {
      return <AddSkill />;
    } else if (values === "profile") {
      return <Profile />;
    } else if (values === "changePwd") {
      return <ChangePassword />;
    }
  };
  return (
    <div className="wrapper d-flex align-items-stretch">
      <SidebarClient clickHandler={clickSidebar} />
      <div id="content" className="p-2 p-md-3 pt-4">
        {rightSection()}
      </div>
    </div>
  );
};

export default ClientHome;
