import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../Components/apiCore";
import { showAllCourse } from "../Course/apiCourse";
import { showCartItem } from "../Cart/apiCart";
import NavbarHome from "../Components/NavbarHome";
import YourCourse from "../Course/YourCourse";
import DefaultPage from "./DefaultPage";

import SidebarInstructor from "./SidebarInstructor";
import SidebarClient from "./SidebarClient";
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
import CourseDetail from "../Course/CourseDetail";
import OrderList from "../Order/OrderList";

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

    ///////////////// Toggle class //////////////////////
    var ul = document.getElementById("myUL");
    var li = ul.getElementsByClassName("li");
    for (var i = 0; i < li.length; i++) {
      li[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
      });
    }
  };

  const sideBar = () => {
    if (user && user.role === "admin") {
      return <SidebarAdmin clickHandler={clickSidebar} />;
    } else if (user && user.role === "instructor") {
      return <SidebarInstructor count={cartLen} clickHandler={clickSidebar} />;
    } else if (user && user.role === "client") {
      return <SidebarClient count={cartLen} clickHandler={clickSidebar} />;
    }
  };
  const rightSection = () => {
    let abc = "";
    if (values && values.includes("detail-")) {
      abc = values.split("-")[0];
    }

    if (values === "home") {
      return (
        <DefaultPage
          courses={courses}
          cart={cart}
          clickHandler={clickSidebar}
        />
      );
    } else if (values === "course") {
      return <YourCourse courses={courses} clickHandler={clickSidebar} />;
    } else if (abc === "detail") {
      return <CourseDetail courseId={values.split("-")[1]} />;
    } else if (values === "add_category") {
      return <AddCategory />;
    } else if (values === "add_skill") {
      return <AddSkill />;
    } else if (values === "all_client") {
      return <ShowClients />;
    } else if (values === "all_instructor") {
      return <ShowInstructors courses={courses} />;
    } else if (values === "cart") {
      return <Cart cart={cart} clickHandler={clickSidebar} />;
    } else if (values === "order") {
      return <OrderList clickHandler={clickSidebar} />;
    } else if (values === "profile") {
      return <Profile />;
    } else if (values === "changePwd") {
      return <ChangePassword />;
    } else {
      if (user && user.role === "admin") {
        return <YourCourse courses={courses} clickHandler={clickSidebar} />;
      } else if (cart && courses) {
        return (
          <DefaultPage
            courses={courses}
            cart={cart}
            clickHandler={clickSidebar}
          />
        );
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
