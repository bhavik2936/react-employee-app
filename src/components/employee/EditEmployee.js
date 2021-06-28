import { Component } from "react";
import { withRouter } from "react-router-dom";

import isAuthenticated from "../../helper/authenticate";

class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, infoMessage: "", errorMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // collecting tokens
  async componentDidMount() {
    document.title = "Edit Employee";

    const employee = this.props.location.employee;

    if ((await isAuthenticated(false)) && employee) {
      this.getEmployeeDetails(employee);
    } else {
      this.props.history.replace("/dashboard");
    }
  }

  // network call to fetch employee details
  async getEmployeeDetails(employee) {
    const authToken = localStorage.getItem("Authorization");
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
      const { name, experience, salary } = data;
      this.setState({
        loading: false,
        name: name,
        experience: experience,
        salary: salary,
      });
    }
    // any failure proceed to dashboard
    // solution to unauthorized and not_found
    else {
      this.props.history.replace("/dashboard");
    }
  }

  handleSubmit() {
    // disable submit button
    const btnSubmit = document.querySelector("form button[type='submit']");
    btnSubmit.disabled = true;

    const employee = this.props.location.employee;
    const url =
      process.env.REACT_APP_RAILS_API_URL + `/employees/${employee}.json`;
    const authToken = localStorage.getItem("Authorization");
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
      body: JSON.stringify({
        api_v1_employee: {
          name: this.state.name,
          experience: this.state.experience,
          salary: this.state.salary,
        },
      }),
    };

    this.updateEmployee(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  async updateEmployee(url, options) {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // redirect to dashboard after displaying message
    if (response.ok) {
      this.setState({ infoMessage: responseData.message });

      setTimeout(() => {
        this.props.history.goBack();
      }, 2000);
    }
    // display error message
    else {
      this.setState({ errorMessage: responseData.message });

      const btnSubmit = document.querySelector("form button[type='submit']");
      btnSubmit.disabled = false;
    }
  }

  // single inputChange method to handle multiple input change
  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Edit Employee</h1>
          <div className="info">{this.state.infoMessage}</div>
          <div className="error">{this.state.errorMessage}</div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Experience
                <input
                  name="experience"
                  type="number"
                  value={this.state.experience}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Salary
                <input
                  name="salary"
                  type="number"
                  value={this.state.salary}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <button type="button" onClick={this.props.history.goBack}>
                Go Back
              </button>
              <button type="submit">Update Employee</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(EditEmployee);
