import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddEmployee from "./components/AddEmployee";

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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
