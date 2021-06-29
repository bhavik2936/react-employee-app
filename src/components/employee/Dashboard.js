import { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import EmployeeManipulate from "./EmployeeManipulate";

import isAuthenticated from "../../helper/authenticate";
import Loader from "../misc/Loader";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, masterCheckboxVisibility: false };

    this.fetchEmployees = this.fetchEmployees.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.slaveCheckboxChanged = this.slaveCheckboxChanged.bind(this);
    this.masterCheckboxChanged = this.masterCheckboxChanged.bind(this);
    this.deleteSelectedEmployees = this.deleteSelectedEmployees.bind(this);
  }

  // network call followed by authentication
  async componentDidMount() {
    document.title = "Dashboard | Employee Management";

    if (!(await isAuthenticated(true))) {
      this.props.history.replace("/login");
      return;
    }

    // fetch data only if authenticated
    this.fetchEmployees();
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

  // if master checkbox is toggled
  // toggle all the checkboxes
  masterCheckboxChanged(event) {
    const isChecked = event.target.checked;

    const listOfCheckboxes = document.querySelectorAll(
      "input[name='employee']"
    );

    [...listOfCheckboxes].map((checkbox) => {
      checkbox.checked = isChecked;
    });

    // make delete button visible
    // if master checkbox is checked
    this.setState({ masterCheckboxVisibility: isChecked });
  }

  // change checked status of master checkbox
  // based on status of slave checkboxes
  slaveCheckboxChanged() {
    const allCheckboxesLength = document.querySelectorAll(
      "input[name='employee']"
    ).length;
    const checkedCheckboxesLength = document.querySelectorAll(
      "input[name='employee']:checked"
    ).length;

    let masterCheckbox = document.querySelector("input[name='all']");
    masterCheckbox.checked = allCheckboxesLength === checkedCheckboxesLength;

    // make button visible if any checkbox is checked
    this.setState({
      masterCheckboxVisibility: Boolean(checkedCheckboxesLength),
    });
  }

  // delete selected employees
  deleteSelectedEmployees() {
    const checkedCheckboxes = document.querySelectorAll(
      "input[name='employee']:checked"
    );
    const employeesToDelete = [...checkedCheckboxes].map((selectedCheckbox) => {
      return { id: selectedCheckbox.id };
    });

    for (const employee of employeesToDelete) {
      this.deleteEmployee(employee);
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
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
            onToggleCheck={this.slaveCheckboxChanged}
          />
        );
      }

      return (
        <div>
          <h1>Employees ({this.state.employees.length})</h1>
          <Link to="/addEmployee">
            <div>Add Employee</div>
          </Link>

          <div className="info">{this.state.infoMessage}</div>
          <div className="error">{this.state.errorMessage}</div>

          <div>
            <input
              type="checkbox"
              name="all"
              onChange={this.masterCheckboxChanged}
            />
            {this.state.masterCheckboxVisibility ? (
              <button onClick={this.deleteSelectedEmployees}>
                Delete Selected Employees
              </button>
            ) : (
              ""
            )}
          </div>
          <div>{listOfEmployee}</div>
        </div>
      );
    }
  }
}

export default withRouter(Dashboard);
