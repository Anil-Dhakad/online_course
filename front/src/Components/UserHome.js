import React, { Fragment } from "react";
import ShowCard from "../Course/ShowCard";
import { isAuthenticated } from "../User/apiUser";

const UserHome = (props) => {
  const courses = props.courses;
  const { user } = isAuthenticated();
  return (
    <Fragment>
      {courses &&
        courses.map((course, i) => {
          if (course.user._id !== user._id)
            return (
              <ShowCard
                key={i}
                clickHandler={props.clickHandler}
                AddToCart={true}
                course={course}
              />
            );
        })}
    </Fragment>
  );
};

export default UserHome;
