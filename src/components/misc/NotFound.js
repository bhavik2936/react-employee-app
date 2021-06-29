import { Component } from "react";
import { withRouter } from "react-router-dom";

import { ReactComponent as _404 } from "../../404.svg";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>You seems to be lost!</h3>
        <_404 />
        <h5>Get headed to...</h5>
        <button onClick={this.props.history.goBack}>Previous Page</button>
        <button onClick={() => this.props.history.replace("/")}>Home</button>
      </div>
    );
  }
}

export default withRouter(NotFound);
