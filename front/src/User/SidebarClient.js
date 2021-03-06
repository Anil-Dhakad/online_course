import React, { useState } from "react";
import { isAuthenticated } from "../Components/apiCore";
import Photo from "./Photo";

const SidebarClient = (props) => {
  const { user } = isAuthenticated();

  const [arrow, setArrow] = useState("fa fa-angle-right");

  const classToggle = () => {
    if (arrow === "fa fa-angle-right") {
      setArrow("fa fa-angle-down");
    } else {
      setArrow("fa fa-angle-right");
    }
  };

  return (
    <nav id="sidebar">
      <div className="img bg-wrap text-center py-4 bg">
        <div className="user-logo">
          <Photo />
          <h3>{user.name}</h3>
        </div>
      </div>
      <ul id="myUL" className="list-unstyled components mb-5">
        <li className="li active">
          <a onClick={() => props.clickHandler("home")}>
            <span className="fa fa-home mr-3"></span> Home
          </a>
        </li>
        <li className="li">
          <a onClick={() => props.clickHandler("order")}>
            <span className="fa fa-list mr-3 notif"></span>
            My Courses
          </a>
        </li>
        <li className="li">
          <a onClick={() => props.clickHandler("cart")}>
            <span className="fa fa-shopping-cart mr-3 notif">
              <sup className="badge badge-pill badge-primary">
                {props.count}
              </sup>
            </span>
            My Cart
          </a>
        </li>

        <li className="li">
          <a data-toggle="collapse" href="#collapse1" onClick={classToggle}>
            <span className="fa fa-cog mr-3"></span> Settings
            <span
              style={{ float: "right", fontSize: "1.7em", marginTop: "-10px" }}
            >
              <i className={arrow}></i>
            </span>
          </a>
          <div id="collapse1" className="panel-collapse collapse">
            <ul className="list-group">
              <a
                style={{ padding: "0.3em 3.5em" }}
                onClick={() => props.clickHandler("profile")}
              >
                <span className="fa fa-edit mr-3"></span> Profile
              </a>
              <a
                style={{ padding: "0.3em 3.5em" }}
                onClick={() => props.clickHandler("changePwd")}
              >
                <span className="fa fa-edit mr-3"></span> Change Password
              </a>
              <a
                style={{ padding: "0.3em 2em 0.3em 3.5em" }}
                onClick={() => props.clickHandler("changeRole")}
              >
                <span className="fa fa-edit mr-3"></span> Become an Instructor
              </a>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarClient;
