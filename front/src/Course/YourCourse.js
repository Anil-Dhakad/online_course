import React, { Fragment, useState, useEffect } from "react";
import NewCourse from "./NewCourse";
import Card from "./Card";
import { showAllCategory, showAllSkill } from "../Admin/apiAdmin";
import { deleteCourse } from "./apiCourse";
import { isAuthenticated } from "../User/apiUser";

const YourCourse = ({ courses }) => {
  const [categories, setCategories] = useState();
  const [skills, setSkills] = useState();

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

  useEffect(() => {
    showCategories();
    showSkills();
  }, []);

  const { user } = isAuthenticated();

  const deleteHandler = (_id) => {
    // console.log("id: ", child);
    deleteCourse({ _id }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        <b onloadeddata={() => props.clickHandler("course")} />;
      }
    });
  };

  return (
    <Fragment>
      <center>
        <h2>Courses</h2>
      </center>
      <NewCourse categories={categories} skills={skills} />
      <br />
      <br />

      {courses &&
        courses.map((course, i) => {
          if (user.role === "admin") {
            return (
              <Card
                key={i}
                categories={categories}
                skills={skills}
                course={course}
                delHandler={deleteHandler}
              />
            );
          } else if (course.user._id === user._id)
            return (
              <Card
                key={i}
                categories={categories}
                skills={skills}
                course={course}
                delHandler={deleteHandler}
              />
            );
        })}
    </Fragment>
  );
};

export default YourCourse;
