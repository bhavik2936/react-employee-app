import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddEmployee from "./components/AddEmployee";
import ViewEmployee from "./components/ViewEmployee";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
