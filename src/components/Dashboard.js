import { Component } from "react";
import { withRouter } from "react-router-dom";
import isAuthenticated from "../helper/authenticate";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.fetchEmployees = this.fetchEmployees.bind(this);
  }

  // network call followed by authentication
  async componentDidMount() {
    if (!(await isAuthenticated())) {
      this.props.history.replace("/login");
      return;
    }

    // fetch data only if authenticated
    this.fetchEmployees();
  }

  async fetchEmployees() {
    const authToken = localStorage.getItem("Authorization");
    const url = process.env.REACT_APP_RAILS_API_URL + "/employees.json";
    const options = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    // setting response data in state
    if (response.ok) {
      this.setState({ loading: false, employees: data });
    }
    // setting error message in state
    else {
      this.setState({ loading: false, responseError: data.error });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (this.state.responseError) {
      return <div className="error">{this.state.responseError}</div>;
    } else {
      const listOfEmployee = [];
      const employees = this.state.employees;

      for (let i = 0; i < employees.length; i++) {
        listOfEmployee.push(<li key={i}>{employees[i].name}</li>);
      }

      return (
        <div>
          <h1>Employees ({this.state.employees.length})</h1>
          <ul>{listOfEmployee}</ul>
        </div>
      );
    }
  }
}

export default withRouter(Dashboard);
