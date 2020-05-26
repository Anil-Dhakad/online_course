import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import SignUp from "../User/SignUp";
import SignIn from "../User/SignIn";
import ForgotPassword from "../User/ForgotPassword";
import { isAuthenticated } from "../User/apiUser";
import MainPage from "./MainPage";
import "../asset/css/style.css";

const Index = () => {
  const [child, setChild] = useState("");

  const navbarHandler = (navChild) => {
    setChild(navChild);
  };

  useEffect(() => {}, [child]);

  const checkAuthentication = () => {
    if (isAuthenticated()) {
      return <Redirect to="/home" />;
    }
  };

  const getComponents = () => {
    if (child === "signin") {
      return <SignIn clickHandler={navbarHandler} />;
    } else if (child === "signup") {
      return <SignUp clickHandler={navbarHandler} />;
    } else if (child === "forgotpwd") {
      return <ForgotPassword clickHandler={navbarHandler} />;
    } else if (child === "home") {
      return <MainPage clickHandler={navbarHandler} />;
    } else {
      return <MainPage clickHandler={navbarHandler} />;
    }
  };

  return (
    <div>
      {checkAuthentication()}
      <Navbar clickHandler={navbarHandler} />
      {getComponents()}
    </div>
  );
};

export default Index;
