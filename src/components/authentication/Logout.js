import { Component } from "react";
import { withRouter } from "react-router-dom";

import tokenInvalidated from "../../helper/invalidateToken";

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
    return null;
  }
}

export default withRouter(Logout);
