import React from "react";
import { signout } from "../Components/apiCore";
import { withRouter } from "react-router-dom";
import "../asset/css/style.css";

const NavbarHome = (props, history) => {
  return (
    <nav className="navbar">
      {/* <div className="menu_container" id="sidebarCollapse">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div> */}
      <div className="custom-menu">
        <i id="sidebarCollapse" className="fa fa-bars btn btn-primary"></i>
      </div>

      <a className="navbar-brand">Online-Study</a>
      <div className="nav_usr">
        <button
          className="btn btn-primary"
          onClick={() => {
            signout(() => {
              props.history.push("/");
            });
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default withRouter(NavbarHome);
