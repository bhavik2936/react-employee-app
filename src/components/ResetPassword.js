import { Component } from "react";
import { withRouter } from "react-router-dom";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "", infoMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    document.title = "Reset Password";

    const queryParams = new URLSearchParams(this.props.location.search);
    const resetPasswordToken = queryParams.get("reset_password_token");

    // redirect to login if token not found
    if (!resetPasswordToken) {
      this.props.history.replace("/login");
      return;
    }

    // setting token to state from query string
    this.setState({ reset_password_token: resetPasswordToken });

    // formatting query after setting to state
    queryParams.delete("reset_password_token");
    this.props.history.replace({ search: queryParams.toString() });
  }

  // single inputChange method to handle multiple input change
  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    // disable submit button
    const btnSubmit = document.querySelector("form button[type='submit']");
    btnSubmit.disabled = true;

    // build network url, headers, body
    const url = process.env.REACT_APP_RAILS_API_URL + "/managers/password.json";
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        api_v1_manager: {
          reset_password_token: this.state.reset_password_token,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        },
      }),
    };

    this.resetPassword(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  // redirect to login after displaying message
  async resetPassword(url, options) {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // redirect to login after password successful reset
    if (response.ok) {
      this.setState({ infoMessage: responseData.message, errorMessage: "" });

      setTimeout(() => {
        this.props.history.push("/login");
      }, 2000);
    }
    // display error message
    else {
      this.setState({ errorMessage: responseData.message, infoMessage: "" });

      const btnSubmit = document.querySelector("form button[type='submit']");
      btnSubmit.disabled = false;
    }
  }

  render() {
    return (
      <div>
        <h1>Reset Password</h1>
        <div className="info">{this.state.infoMessage}</div>
        <div className="error">{this.state.errorMessage}</div>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">Reset Password</button>
        </form>
      </div>
    );
  }
}

export default withRouter(ResetPassword);
