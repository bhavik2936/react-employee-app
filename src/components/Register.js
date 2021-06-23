import { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerResource = this.registerResource.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit() {
    // disable submit button
    const btnSubmit = document.querySelector("form button[type='submit']");
    btnSubmit.disabled = true;

    // build network url, headers, body
    const url = process.env.REACT_APP_RAILS_API_URL + "/managers.json";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        api_v1_manager: {
          email: this.state.email,
          name: this.state.name,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        },
      }),
    };

    this.registerResource(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  async registerResource(url, options) {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // redirect to login if registered successfully
    if (response.ok) {
      this.setState({ infoMessage: responseData.message, errorMessage: "" });

      setTimeout(() => {
        this.props.history.push("/login");
      }, 2000);
    }
    // else display error message
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
        <form onSubmit={this.handleSubmit}>
          <div className="info">{this.state.infoMessage}</div>
          <div className="error">{this.state.errorMessage}</div>
          <div>
            <label>
              Name
              <input
                type="text"
                name="name"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Email
              <input
                type="email"
                name="email"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Confirm Password
              <input
                type="password"
                name="password_confirmation"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
        <div>
          Have an account? <Link to="login">Log in</Link>.
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
