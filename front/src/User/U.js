import React, { Fragment, useState, useEffect } from "react";
import ShowCard from "../Course/ShowCard";
import { isAuthenticated } from "./apiUser";
import { showCartItem } from "../Cart/apiCart";

const UserHome = (props) => {
  const courses = props.courses;

  const [cart, setCart] = useState();

  const { user } = isAuthenticated();

  const cartItem = () => {
    const id = user._id;
    showCartItem({ id }).then((data) => {
      if (data.error) {
        console.log("Cart Item: ", data.error);
      } else {
        setCart(data);
      }
    });
  };

  useEffect(() => {
    cartItem();
  }, []);

  return (
    <Fragment>
      {courses &&
        courses.map((course, i) => {
          if (course.user._id !== user._id)
            return (
              <ShowCard
                key={i}
                clickHandler={props.clickHandler}
                course={course}
                cart={cart}
              />
            );
        })}
    </Fragment>
  );
};

export default UserHome;
