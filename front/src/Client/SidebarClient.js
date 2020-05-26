import React, { useState } from "react";
import { isAuthenticated } from "../User/apiUser";

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
      <div className="img bg-wrap text-center py-4 bg_1">
        <div className="user-logo">
          <div className="img logo"></div>
          <h3>{user.name}</h3>
        </div>
      </div>
      <ul className="list-unstyled components mb-5">
        <li className="active">
          <a href="#">
            <span className="fa fa-home mr-3"></span> Home
          </a>
        </li>

        <li>
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
            </ul>
          </div>
        </li>

        <li>
          <a href="#">
            <span className="fa fa-sign-out mr-3"></span> Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarClient;
