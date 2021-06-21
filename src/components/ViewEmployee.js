import { Component } from "react";
import { withRouter } from "react-router-dom";

class ViewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.getEmployeeDetails = this.getEmployeeDetails.bind(this);
  }

  // collecting tokens
  async componentDidMount() {
    const authToken = localStorage.getItem("Authorization");
    const employee = this.props.location.employee;

    if (authToken && employee) {
      this.getEmployeeDetails(authToken, employee);
    } else {
      this.props.history.replace("/dashboard");
    }
  }

  // network call to fetch employee details
  async getEmployeeDetails(authToken, employee) {
    const url =
      process.env.REACT_APP_RAILS_API_URL + `/employees/${employee}.json`;
    const options = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    // data render on success
    if (response.ok) {
      this.setState({ loading: false, employee: data });
    }
    // any failure proceed to dashboard
    // solution to unauthorized and not_found
    else {
      this.props.history.replace("/dashboard");
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>View Employee</h1>
          <div>Name: {this.state.employee.name}</div>
          <div>Experience: {this.state.employee.experience} yrs.</div>
          <div>Salary: ₹ ${this.state.employee.salary}</div>
          <button onClick={this.props.history.goBack}>Go Back</button>
          <button>Edit</button>
        </div>
      );
    }
  }
}

export default withRouter(ViewEmployee);
