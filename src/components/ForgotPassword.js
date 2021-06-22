import { Component } from "react";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { infoMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestResetPasswordLink = this.requestResetPasswordLink.bind(this);
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
    const url = process.env.REACT_APP_RAILS_API_URL + "/managers/password.json";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        api_v1_manager: {
          email: this.state.email,
        },
      }),
    };

    this.requestResetPasswordLink(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  // display info message as no error being thrown
  async requestResetPasswordLink(url, options) {
    const response = await fetch(url, options);
    const responseData = await response.json();
    this.setState({ infoMessage: responseData.message });

    const btnSubmit = document.querySelector("form button[type='submit']");
    btnSubmit.disabled = false;
  }

  render() {
    return (
      <div>
        <h1>Forgot Password</h1>
        <div className="info">{this.state.infoMessage}</div>
        <form onSubmit={this.handleSubmit}>
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
            <button type="submit">Send Instructions</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
