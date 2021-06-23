import { Component } from "react";
import { withRouter } from "react-router-dom";

class ConfirmAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "", infoMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.confirmAccount = this.confirmAccount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    document.title = "Confirm Account";

    const queryParams = new URLSearchParams(this.props.location.search);
    const confirmationToken = queryParams.get("confirmation_token");

    // render confirmation form if token not found
    if (!confirmationToken) return;

    // setting token to state from query string
    this.setState({ confirmation_token: confirmationToken });

    // formatting query after setting to state
    queryParams.delete("confirmation_token");
    this.props.history.replace({ search: queryParams.toString() });

    const url =
      process.env.REACT_APP_RAILS_API_URL +
      `/managers/confirmation?confirmation_token=${confirmationToken}`;

    this.confirmAccount(url);
  }

  // confirm manager account passed in body
  async confirmAccount(url) {
    const response = await fetch(url);
    const responseData = await response.json();

    if (response.ok) {
      this.setState({ infoMessage: responseData.message });
    } else {
      this.setState({ errorMessage: responseData.message });
    }

    setTimeout(() => this.props.history.push("/login"), 2000);
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
    const url =
      process.env.REACT_APP_RAILS_API_URL + "/managers/confirmation.json";
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

    this.requestConfirmationLink(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  // request new confirmation link via mail
  // for manager email passed in body
  async requestConfirmationLink(url, options) {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.ok) {
      this.setState({ infoMessage: responseData.message, errorMessage: "" });

      setTimeout(() => this.props.history.push("/login"), 2000);
    } else {
      this.setState({ errorMessage: responseData.message, infoMessage: "" });

      const btnSubmit = document.querySelector("form button[type='submit']");
      btnSubmit.disabled = false;
    }
  }

  render() {
    // render errors only for confirming the account
    if (this.state.confirmation_token) {
      return (
        <div>
          <div className="info">{this.state.infoMessage}</div>
          <div className="error">{this.state.errorMessage}</div>
        </div>
      );
    }
    // render form to request of confirmation link
    // for manager's account
    else {
      return (
        <div>
          <h1>Request Confirmation Link</h1>
          <div className="info">{this.state.infoMessage}</div>
          <div className="error">{this.state.errorMessage}</div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Email:{" "}
                <input
                  type="email"
                  name="email"
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <button type="submit">Request Confirmation Link</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(ConfirmAccount);
