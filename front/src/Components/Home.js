import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import SignUp from "../Components/SignUp";
import SignIn from "../Components/SignIn";
import ForgotPassword from "../Components/ForgotPassword";
import { isAuthenticated } from "../Components/apiCore";
import MainPage from "./MainPage";
import "../asset/css/style.css";

const Home = () => {
  const [child, setChild] = useState("");

  const navbarHandler = (navChild) => {
    setChild(navChild);
  };

  const checkAuthentication = () => {
    if (isAuthenticated()) {
      return <Redirect to="/main" />;
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

export default Home;
