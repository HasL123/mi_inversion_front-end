import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import Plan from "../pages/Plan";
import PlanUpdate from "../pages/PlanUpdate";
import Performance from "../pages/Performance";
import Context from "../context/Context";
const RouteApp = () => {
  const [auth, setAuth] = useState({ id: null, User: null });

  const State = { auth: { auth, setAuth } };
  return (
    <BrowserRouter>
      <Context.Provider value={State}>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/plan" component={Plan} />
          <Route exact path="/Performance" component={Performance} />
          <Route exact path="/plan/update/:id" component={PlanUpdate} />
        </Switch>
      </Context.Provider>
    </BrowserRouter>
  );
};

export default RouteApp;
