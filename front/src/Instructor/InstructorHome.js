import React, { useState, useEffect } from "react";
import SidebarInstructor from "./SidebarInstructor";
import Profile from "../User/Profile";
import ChangePassword from "../User/ChangePassword";
import UserHome from "../Components/UserHome";
import YourCourse from "../Course/YourCourse";
import { showAllCourse } from "../Course/apiCourse";

const InstructorHome = () => {
  const [values, setValues] = useState();

  const [courses, setCourses] = useState();

  const ShowCourses = () => {
    showAllCourse().then((data) => {
      if (data.error) {
        console.log("showCourses: ", data.error);
      } else {
        setCourses(data);
      }
    });
  };

  useEffect(() => {
    ShowCourses();
  }, [values]);

  const clickSidebar = (child) => {
    console.log("child: ", child);
    setValues(child);
  };

  const rightSection = () => {
    if (values === "home") {
      return <UserHome courses={courses} clickHandler={clickSidebar} />;
    } else if (values === "course") {
      return <YourCourse courses={courses} clickHandler={clickSidebar} />;
    } else if (values === "cart") {
      return "Cart";
    } else if (values === "profile") {
      return <Profile />;
    } else if (values === "changePwd") {
      return <ChangePassword />;
    } else {
      return <UserHome courses={courses} clickHandler={clickSidebar} />;
    }
  };
  return (
    <div className="wrapper d-flex align-items-stretch">
      <SidebarInstructor clickHandler={clickSidebar} />
      <div id="content" className="p-2 p-md-3 pt-4">
        {rightSection()}
      </div>
    </div>
  );
};

export default InstructorHome;
