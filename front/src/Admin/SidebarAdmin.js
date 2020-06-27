import React from "react";
import { isAuthenticated } from "../Components/apiCore";

const Sidebar_Admin = (props) => {
  const { user } = isAuthenticated();
  return (
    <nav id="sidebar">
      <div className="img bg-wrap text-center py-4 bg">
        <div className="user-logo">
          {/* <div
            className="custom-menu"
            style={{ top: "0px", margin: "0px", padding: "0.5em" }}
          >
            <i
              id="sidebarCollapse"
              className="fa fa-times-circle"
              style={{
                background: "transparent",
                fontSize: "2em",
                cursor: "pointer",
              }}
            ></i>
          </div> */}
          {/* <div className="img logo"></div> */}
          <img
            className="img"
            src={`/images/user/${user.photo}`}
            alt="sample image"
          />
          <h3>{user.name}</h3>
        </div>
      </div>
      <ul id="myUL" className="list-unstyled components mb-5">
        <li className="li active">
          <a onClick={() => props.clickHandler("course")}>
            <span className="fa fa-list mr-3 notif"></span>
            All Courses
          </a>
        </li>
        <li className="li">
          <a onClick={() => props.clickHandler("add_category")}>
            <span className="fa fa-edit mr-3 notif"></span>
            Add Category
          </a>
        </li>
        <li className="li">
          <a onClick={() => props.clickHandler("add_skill")}>
            <span className="fa fa-edit mr-3 notif"></span>
            Add Skill
          </a>
        </li>
        <li className="li">
          <a onClick={() => props.clickHandler("all_client")}>
            <span className="fa fa-user mr-3 notif"></span>
            All User
          </a>
        </li>
        <li className="li">
          <a onClick={() => props.clickHandler("all_instructor")}>
            <span className="fa fa-chalkboard-teacher mr-3 notif"></span>
            All Instructor
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar_Admin;
