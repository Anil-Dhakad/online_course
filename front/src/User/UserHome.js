import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../Components/apiCore";
import { showAllCourse } from "../Course/apiCourse";
import { showCartItem } from "../Cart/apiCart";
import NavbarHome from "../Components/NavbarHome";
import YourCourse from "../Course/YourCourse";
import ShowCard from "../Course/ShowCard";

import SidebarInstructor from "./SidebarInstructor";
import SidebarAdmin from "../Admin/SidebarAdmin";

import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import Cart from "../Cart/Cart";

import AddCategory from "../Admin/AddCategory";
import AddSkill from "../Admin/AddSkill";
import ShowInstructors from "../Admin/ShowInstructors";
import ShowClients from "../Admin/ShowClients";

import "../asset/css/style.css";
import "../asset/css/sidebar.css";
import "../asset/js/javascript";

const UserHome = () => {
  console.log("USERHOME");
  if (!isAuthenticated()) {
    return <Redirect to="/" />;
  }

  const [values, setValues] = useState();

  const [courses, setCourses] = useState();
  const [cart, setCart] = useState();
  const [cartLen, setCartLen] = useState();

  const ShowCourses = () => {
    showAllCourse().then((data) => {
      if (data.error) {
        console.log("showCourses: ", data.error);
      } else {
        setCourses(data);
      }
    });
  };

  const { user } = isAuthenticated();

  const cartItem = () => {
    const id = user._id;
    showCartItem({ id }).then((data) => {
      if (data.error) {
        console.log("Cart Item: ", data.error);
      } else {
        setCartLen(data.length);
        setCart(data);
      }
    });
  };

  useEffect(() => {
    ShowCourses();
    cartItem();
  }, [cartLen, values]);

  const clickSidebar = (child) => {
    setValues(child);
  };

  const homePage = () => {
    if (cart) {
      return (
        <Fragment>
          {courses &&
            courses.map((course, i) => {
              if (course.user._id !== user._id)
                return (
                  <ShowCard
                    key={i}
                    clickHandler={clickSidebar}
                    course={course}
                    cart={cart}
                  />
                );
            })}
        </Fragment>
      );
    }
  };

  const sideBar = () => {
    if (user && user.role === "admin") {
      return <SidebarAdmin clickHandler={clickSidebar} />;
    } else if (user && user.role === "instructor") {
      return <SidebarInstructor count={cartLen} clickHandler={clickSidebar} />;
    } else if (user && user.role === "client") {
      return <ClientInstructor clickHandler={clickSidebar} />;
    }
  };
  const rightSection = () => {
    if (values === "home") {
      return <Fragment>{homePage()}</Fragment>;
    } else if (values === "course") {
      return <YourCourse courses={courses} clickHandler={clickSidebar} />;
    } else if (values === "add_category") {
      return <AddCategory />;
    } else if (values === "add_skill") {
      return <AddSkill />;
    } else if (values === "all_client") {
      return <ShowClients />;
    } else if (values === "all_instructor") {
      return <ShowInstructors courses={courses} />;
    } else if (values === "cart") {
      return <Cart cart={cart} />;
    } else if (values === "profile") {
      return <Profile />;
    } else if (values === "changePwd") {
      return <ChangePassword />;
    } else {
      if (user && user.role === "admin") {
        return <YourCourse courses={courses} clickHandler={clickSidebar} />;
      } else {
        return <Fragment>{homePage()}</Fragment>;
      }
    }
  };
  return (
    <Fragment>
      <NavbarHome />
      <div className="wrapper d-flex align-items-stretch">
        {sideBar()}
        <div id="content" className="p-2 p-md-3 pt-4">
          {rightSection()}
        </div>
      </div>
    </Fragment>
  );
};

export default UserHome;
