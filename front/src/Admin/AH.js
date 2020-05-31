import React, { useState, useEffect } from "react";
import SidebarAdmin from "./SidebarAdmin";
import AddCategory from "./AddCategory";
import AddSkill from "./AddSkill";
import YourCourse from "../Course/YourCourse";
import { showAllCourse } from "../Course/apiCourse";
import ShowInstructors from "./ShowInstructors";
import ShowClients from "./ShowClients";

const AdminHome = () => {
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
    if (values === "course") {
      return <YourCourse courses={courses} clickHandler={clickSidebar} />;
    } else if (values === "add_category") {
      return <AddCategory />;
    } else if (values === "add_skill") {
      return <AddSkill />;
    } else if (values === "all_client") {
      return <ShowClients />;
    } else if (values === "all_instructor") {
      return <ShowInstructors courses={courses} />;
    } else {
      return <YourCourse courses={courses} clickHandler={clickSidebar} />;
    }
  };
  return (
    <div className="wrapper d-flex align-items-stretch">
      <SidebarAdmin clickHandler={clickSidebar} />
      <div id="content" className="p-2 p-md-3 pt-2">
        {rightSection()}
      </div>
    </div>
  );
};

export default AdminHome;
