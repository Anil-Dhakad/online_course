import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Index from "./Components/Index";
import Home from "./Components/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/home" exact component={Home} />
      <Route path="/index" exact component={Index} />
    </BrowserRouter>
  );
};

export default Routes;
