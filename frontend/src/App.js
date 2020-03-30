import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import Navbar from "./components/navbar";
import Home from "./components/home";
import Predict from "./components/predict";
import Prediction from "./components/prediction";

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <style>{"body { background-color: #6698FF; }"}</style>
      </Helmet>
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/predict" component={Predict} />
          <Route path="/prediction" component={Prediction} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
