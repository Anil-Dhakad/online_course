import React, { Fragment, useState, useEffect } from "react";
import NewCourse from "./NewCourse";
import EditCard from "./EditCard";
import { showAllCategory, showAllSkill, showAllUser } from "../Admin/apiAdmin";
import { deleteCourse } from "./apiCourse";
import { isAuthenticated } from "../Components/apiCore";
import SearchBar from "../Components/SearchBar";

const YourCourse = ({ courses, clickHandler }) => {
  const [categories, setCategories] = useState();
  const [skills, setSkills] = useState();
  const [users, setUsers] = useState();

  const showCategories = () => {
    showAllCategory().then((data) => {
      if (data.error) {
        console.log("showCategories: ", data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const showSkills = () => {
    showAllSkill().then((data) => {
      if (data.error) {
        console.log("showSkills: ", data.error);
      } else {
        setSkills(data);
      }
    });
  };

  const showUsers = () => {
    showAllUser().then((data) => {
      if (data.error) {
        console.log("showUsers: ", data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    showCategories();
    showSkills();
    showUsers();
  }, []);

  const { user } = isAuthenticated();

  const deleteHandler = (_id) => {
    // console.log("id: ", _id);
    deleteCourse({ _id }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <Fragment>
      <center>
        <h2>Courses</h2>
      </center>
      <SearchBar users={users} />
      <NewCourse categories={categories} skills={skills} />
      <br />

      {courses &&
        courses.map((course, i) => {
          if (user.role === "admin") {
            return (
              <EditCard
                key={i}
                categories={categories}
                skills={skills}
                course={course}
                delHandler={deleteHandler}
                clickHandler={clickHandler}
              />
            );
          } else if (course.user._id === user._id)
            return (
              <EditCard
                key={i}
                categories={categories}
                skills={skills}
                course={course}
                delHandler={deleteHandler}
                clickHandler={clickHandler}
              />
            );
        })}
    </Fragment>
  );
};

export default YourCourse;
