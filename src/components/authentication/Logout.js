import { Component } from "react";
import { withRouter } from "react-router-dom";

import tokenInvalidated from "../../helper/invalidateToken";
import Loader from "../misc/Loader";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    document.title = "Logout";

    await tokenInvalidated();
    this.props.history.replace("/login");
  }

  render() {
    return <Loader />;
  }
}

export default withRouter(Logout);
