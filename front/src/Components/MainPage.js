import React, { useState, useEffect } from "react";
import { showAllCourse } from "../Course/apiCourse";
import ShowCard from "../Course/ShowCard";

const MainPage = (props) => {
  const [courses, setCourses] = useState();

  // const showCategories = () => {
  //   showAllCategory().then((data) => {
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setCategories(data);
  //     }
  //   });
  // };

  // const showSkills = () => {
  //   showAllSkill().then((data) => {
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setSkills(data);
  //     }
  //   });
  // };

  const ShowCourses = () => {
    showAllCourse().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCourses(data);
      }
    });
  };

  useEffect(() => {
    // showCategories();
    // showSkills();
    ShowCourses();
  }, []);

  return (
    <div style={{ padding: "0.8em 0 0 1.8em" }}>
      {courses &&
        courses.map((course, i) => (
          <ShowCard
            key={i}
            // categories={categories}
            // skills={skills}
            course={course}
            AddToCart={false}
            clickHandler={props.clickHandler}
          />
        ))}
    </div>
  );
};

export default MainPage;
