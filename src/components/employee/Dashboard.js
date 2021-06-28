import { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import EmployeeManipulate from "./EmployeeManipulate";

import isAuthenticated from "../../helper/authenticate";
import tokenInvalidated from "../../helper/invalidateToken";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.logOut = this.logOut.bind(this);
    this.fetchEmployees = this.fetchEmployees.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  // network call followed by authentication
  async componentDidMount() {
    document.title = "Dashboard | Employee Management";

    if (!(await isAuthenticated())) {
      this.props.history.replace("/login");
      return;
    }

    // fetch data only if authenticated
    this.fetchEmployees();
  }

  // call to logOut
  async logOut() {
    await tokenInvalidated();
    this.props.history.replace("/login");
  }

  // fetch list of employees working under current_manager
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

  // deleteEmployee network call and manipulating list
  async deleteEmployee(employeeToDelete) {
    const authToken = localStorage.getItem("Authorization");
    const url =
      process.env.REACT_APP_RAILS_API_URL +
      `/employees/${employeeToDelete.id}.json`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    // employee removal from list
    if (response.ok) {
      const newEmployeeList = this.state.employees.filter(
        (employee) => employee.id != employeeToDelete.id
      );
      this.setState({ employees: newEmployeeList, infoMessage: data.message });
    }
    // displaying error message
    else {
      this.setState({ errorMessage: data.message });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (this.state.responseError) {
      return <div className="error">{this.state.responseError}</div>;
    } else {
      let listOfEmployee = [];

      // rendering List of Employee
      for (const employee of this.state.employees) {
        listOfEmployee.push(
          <EmployeeManipulate
            key={employee.id}
            employee={employee}
            onDelete={this.deleteEmployee}
          />
        );
      }

      return (
        <div>
          <h1>Employees ({this.state.employees.length})</h1>
          <div>
            <button onClick={this.logOut}>Log Out</button>
          </div>
          <Link to="/addEmployee">
            <div>Add Employee</div>
          </Link>
          <div className="info">{this.state.infoMessage}</div>
          <div className="error">{this.state.errorMessage}</div>
          <ul>{listOfEmployee}</ul>
        </div>
      );
    }
  }
}

export default withRouter(Dashboard);
