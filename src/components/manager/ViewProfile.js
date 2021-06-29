import { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import isAuthenticated from "../../helper/authenticate";
import Loader from "../misc/Loader";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.getCurrentManagerDetails = this.getCurrentManagerDetails.bind(this);
  }

  // checking for token
  async componentDidMount() {
    document.title = "View Profile";

    if (await isAuthenticated(false)) {
      this.getCurrentManagerDetails();
    } else {
      this.props.history.replace("/login");
    }
  }

  // network call to fetch manager details
  async getCurrentManagerDetails() {
    const authToken = localStorage.getItem("Authorization");
    const url = process.env.REACT_APP_RAILS_API_URL + `/managers/show.json`;
    const options = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
    };

    const response = await fetch(url, options);

    // data render on success
    if (response.ok) {
      const data = await response.json();
      this.setState({ loading: false, manager: data });
    }
    // any failure proceed to dashboard
    // solution to unauthorized and not_found
    else {
      this.props.history.replace("/dashboard");
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      const { name, email } = this.state.manager;

      return (
        <div>
          <h1>View Profile</h1>
          <div>
            <div>Name: {name}</div>
            <div>Email: {email}</div>
          </div>
          <div>
            <Link to={{ pathname: "/editProfile" }}>
              <button>Edit Profile</button>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(ViewProfile);
