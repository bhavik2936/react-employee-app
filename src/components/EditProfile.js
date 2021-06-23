import { Component } from "react";
import { withRouter } from "react-router-dom";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateManager = this.updateManager.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getManagerDetails = this.getManagerDetails.bind(this);
  }

  // checking for token
  componentDidMount() {
    document.title = "Edit Profile";

    const authToken = localStorage.getItem("Authorization");

    if (authToken) {
      this.getManagerDetails(authToken);
    } else {
      this.props.history.replace("/dashboard");
    }
  }

  // network call to fetch manager details
  async getManagerDetails(authToken) {
    const url = process.env.REACT_APP_RAILS_API_URL + `/managers/show.json`;
    const options = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
    };

    const response = await fetch(url, options);

    // data render on success
    if (response.ok) {
      const data = await response.json();
      const { name, email } = data;
      this.setState({ loading: false, name: name, email: email });
    }
    // any failure proceed to dashboard
    // solution to unauthorized and not_found
    else {
      this.props.history.replace("/dashboard");
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

  handleSubmit(event) {
    // disable submit button
    const btnSubmit = document.querySelector("form button[type='submit']");
    btnSubmit.disabled = true;

    // build network url, headers, body
    const url = process.env.REACT_APP_RAILS_API_URL + `/managers.json`;
    const authToken = localStorage.getItem("Authorization");
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
      body: JSON.stringify({
        api_v1_manager: {
          name: this.state.name,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          current_password: this.state.current_password,
        },
      }),
    };

    this.updateManager(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  async updateManager(url, options) {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // redirect to view profile after displaying message
    if (response.ok) {
      this.setState({ infoMessage: responseData.message, errorMessage: "" });

      setTimeout(() => this.props.history.goBack(), 2000);
    }
    // display error message
    else {
      this.setState({ errorMessage: responseData.message, infoMessage: "" });

      const btnSubmit = document.querySelector("form button[type='submit']");
      btnSubmit.disabled = false;
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Edit Profile</h1>
          <div className="info">{this.state.infoMessage}</div>
          <div className="error">{this.state.errorMessage}</div>
          <form onSubmit={this.handleSubmit}>
            <div>Email: {this.state.email}</div>
            <div>
              <div>
                <h3>Edit Personal Details</h3>
              </div>
              <div>
                <label>
                  Name:{" "}
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </label>
              </div>
            </div>
            <div>
              <div>
                <h3>Change Password</h3>
              </div>
              <div>
                <label>
                  New Password:{" "}
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleInputChange}
                    placeholder="enter only if you want to change"
                  />
                </label>
              </div>
              <div>
                <label>
                  Confirm New Password:{" "}
                  <input
                    type="password"
                    name="password_confirmation"
                    onChange={this.handleInputChange}
                    placeholder="enter only if you want to change"
                  />
                </label>
              </div>
            </div>
            <div>
              <label>
                Current Password:{" "}
                <input
                  type="password"
                  name="current_password"
                  onChange={this.handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <button type="submit">Update Profile</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(EditProfile);
