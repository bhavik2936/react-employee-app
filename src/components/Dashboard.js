import { Component } from "react";
import { withRouter } from "react-router-dom";
import isAuthenticated from "../helper/authenticate";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (!(await isAuthenticated())) {
      this.props.history.replace("/login");
      return;
    }
  }

  render() {
    return <div></div>;
  }
}

export default withRouter(Dashboard);
