import { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "" };

    this.attemptAutoLogin = this.attemptAutoLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.authenticateResource = this.authenticateResource.bind(this);
  }

  componentDidMount() {
    const authToken = localStorage.getItem("Authorization");

    if (authToken) {
      const url =
        process.env.REACT_APP_RAILS_API_URL + "/managers/authenticate.json";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: authToken,
        },
      };

      this.attemptAutoLogin(url, options);
    }
  }

  // attempt for auto-login if already authenticated
  async attemptAutoLogin(url, options) {
    const response = await fetch(url, options);
    if (response.ok) this.props.history.push("/dashboard");
  }

  // single inputChange method to handle multiple input change
  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    // disable submit button
    const btnSubmit = document.querySelector("form button[type='submit']");
    btnSubmit.disabled = true;

    // build network url, headers, body
    const url = process.env.REACT_APP_RAILS_API_URL + "/managers/sign_in.json";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        api_v1_manager: {
          email: this.state.email,
          password: this.state.password,
        },
      }),
    };

    this.authenticateResource(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  // authentication network call
  async authenticateResource(url, options) {
    const response = await fetch(url, options);

    // redirect to dashboard if authenticated
    if (response.ok) {
      const authToken = response.headers.get("Authorization");
      localStorage.setItem("Authorization", authToken);

      this.props.history.push("/dashboard");
    }
    // else display error message
    else {
      const responseData = await response.json();
      this.setState({ errorMessage: responseData.error });

      const btnSubmit = document.querySelector("form button[type='submit']");
      btnSubmit.disabled = false;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="error">{this.state.errorMessage}</div>
        <div>
          <input type="email" name="email" onChange={this.handleInputChange} />
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
