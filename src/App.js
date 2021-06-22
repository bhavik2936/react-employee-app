import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddEmployee from "./components/AddEmployee";
import ViewEmployee from "./components/ViewEmployee";
import EditEmployee from "./components/EditEmployee";

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
            <Route path="/Register">
              <Register />
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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
