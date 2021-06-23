import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

// authentication modules
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ConfirmAccount from "./components/ConfirmAccount";
import Register from "./components/Register";

// manager manipulation modules
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";

// employee manipulation modules
import Dashboard from "./components/Dashboard";
import AddEmployee from "./components/AddEmployee";
import ViewEmployee from "./components/ViewEmployee";
import EditEmployee from "./components/EditEmployee";

// mics routing modules
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/forgotPassword">
              <ForgotPassword />
            </Route>
            <Route path="/resetPassword">
              <ResetPassword />
            </Route>
            <Route path="/confirmAccount">
              <ConfirmAccount />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/viewProfile">
              <ViewProfile />
            </Route>
            <Route path="/editProfile">
              <EditProfile />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/addEmployee">
              <AddEmployee />
            </Route>
            <Route path="/viewEmployee">
              <ViewEmployee />
            </Route>
            <Route path="/editEmployee">
              <EditEmployee />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
