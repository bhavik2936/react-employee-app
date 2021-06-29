import { Component } from "react";
import { Link } from "react-router-dom";

import Loader from "./Loader";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, manager: "many", employee: "many" };

    this.fetchMembersCount = this.fetchMembersCount.bind(this);
  }

  componentDidMount() {
    this.fetchMembersCount();
  }

  async fetchMembersCount() {
    const url = process.env.REACT_APP_RAILS_API_URL + `/count.json`;
    const options = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    const response = await fetch(url, options);

    // data render on success
    if (response.ok) {
      const { manager, employee } = await response.json();
      this.setState({ loading: false, manager: manager, employee: employee });
    }
    // any failure set loading false
    else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <>
          <h1>Employee Management App</h1>
          <div>
            There are {this.state.employee} employees are working under the
            guidance of {this.state.manager} managers.
          </div>
          <div>
            Be the part of this system and guide more power towards a great
            journey of success.
          </div>
          <Link to="/register">
            <button>Join as Manager</button>
          </Link>
        </>
      );
    }
  }
}

export default LandingPage;
