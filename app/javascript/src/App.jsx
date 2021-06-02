import React from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Edit from "./components/Edit";
import Layout from "./components/Layout";
import Poll from "./components/Poll";

const PublicRoute = ({ comp }) => {
  return localStorage.getItem("polly-token") != null ? (
    <Redirect to="/" />
  ) : (
    <>{comp}</>
  );
};

const ProtectedRoute = ({ comp }) => {
  return localStorage.getItem("polly-token") != null ? (
    <>{comp}</>
  ) : (
    <Redirect to="/login" />
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/login">
            <PublicRoute comp={<Login />} />
          </Route>
          <Route exact path="/signup">
            <PublicRoute comp={<Signup />} />
          </Route>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/poll/create">
            <ProtectedRoute comp={<Create />} />
          </Route>
          <Route exact path="/poll/edit/:id">
            <ProtectedRoute comp={<Edit />} />
          </Route>
          <Route exact path="/poll/:id">
            <ProtectedRoute comp={<Poll />} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
