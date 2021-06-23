import { Component } from "react";
import { withRouter } from "react-router-dom";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { infoMessage: "", errorMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
  }

  // checking for token
  componentDidMount() {
    document.title = "Add Employee";

    const authToken = localStorage.getItem("Authorization");

    if (authToken) {
      this.getManagerDetails(authToken);
    } else {
      this.props.history.replace("/dashboard");
    }
  }

  handleSubmit(event) {
    // disable submit button
    const btnSubmit = document.querySelector("form button[type='submit']");
    btnSubmit.disabled = true;

    // build network url, headers, body
    const url = process.env.REACT_APP_RAILS_API_URL + "/employees.json";
    const authToken = localStorage.getItem("Authorization");
    const options = {
      method: "POST",
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

    this.addEmployee(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  async addEmployee(url, options) {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // redirect to dashboard after displaying message
    if (response.ok) {
      this.setState({ infoMessage: responseData.message, errorMessage: "" });

      setTimeout(() => {
        this.props.history.goBack();
      }, 2000);
    }
    // display error message
    else {
      this.setState({ errorMessage: responseData.message, infoMessage: "" });

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
    return (
      <div>
        <h1>Add Employee</h1>
        <div className="info">{this.state.infoMessage}</div>
        <div className="error">{this.state.errorMessage}</div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Name
              <input
                name="name"
                type="text"
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
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <button type="button" onClick={this.props.history.goBack}>
              Go Back
            </button>
            <button type="submit">Add Employee</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AddEmployee);
