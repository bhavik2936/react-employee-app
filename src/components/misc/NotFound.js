import { Component } from "react";
import { withRouter } from "react-router-dom";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>You seems to be lost! Get headed to...</h1>
        <button onClick={this.props.history.goBack}>Previous Page</button>
        <button onClick={() => this.props.history.replace("/")}>Home</button>
      </div>
    );
  }
}

export default withRouter(NotFound);
