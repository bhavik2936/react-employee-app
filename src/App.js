import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "./404.css";

// authentication modules
import Login from "./components/authentication/Login";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import ConfirmAccount from "./components/authentication/ConfirmAccount";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";

// manager manipulation modules
import ViewProfile from "./components/manager/ViewProfile";
import EditProfile from "./components/manager/EditProfile";

// employee manipulation modules
import Dashboard from "./components/employee/Dashboard";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";

// mics routing modules
import LandingPage from "./components/misc/LandingPage";
import NotFound from "./components/misc/NotFound";
import NavigationBar from "./components/misc/NavigationBar";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavigationBar />
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
            <Route path="/logout">
              <Logout />
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
      </>
    );
  }
}

export default App;
