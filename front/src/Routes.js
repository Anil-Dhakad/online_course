import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UserHome from "./User/UserHome";
import Home from "./Components/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/home" exact component={Home} />
      <Route path="/main" exact component={UserHome} />
    </BrowserRouter>
  );
};

export default Routes;
