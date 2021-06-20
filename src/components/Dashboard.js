import { Component } from "react";
import { Redirect } from "react-router";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const authToken = localStorage.getItem("Authorization");

    if (authToken) {
      // authenticated logic
    } else {
      return <Redirect to="/login" />;
    }
    return "";
  }
}

export default Dashboard;
