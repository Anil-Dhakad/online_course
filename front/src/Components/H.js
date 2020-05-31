import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../User/apiUser";
import AdminHome from "../Admin/AdminHome";
import InstructorHome from "../Instructor/InstructorHome";
import ClientHome from "../Client/ClientHome";
import NavbarHome from "./NavbarHome";

const Home = () => {
  const { user } = isAuthenticated();

  const showHome = () => {
    if (user && user.role === "admin") {
      return <AdminHome />;
    } else if (user && user.role === "instructor") {
      return <InstructorHome />;
    } else if (user && user.role === "client") {
      return <ClientHome />;
    }
  };
  return (
    <Fragment>
      {checkAuthentication()}
      <NavbarHome />
      {showHome()}
    </Fragment>
  );
};

export default Home;
