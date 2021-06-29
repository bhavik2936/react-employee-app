import { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  UncontrolledAlert,
} from "reactstrap";

import isAuthenticated from "../../helper/authenticate";
import Loader from "../misc/Loader";

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
  async componentDidMount() {
    document.title = "Edit Profile";

    if (await isAuthenticated(false)) {
      this.getManagerDetails();
    } else {
      this.props.history.replace("/dashboard");
    }
  }

  // network call to fetch manager details
  async getManagerDetails() {
    const authToken = localStorage.getItem("Authorization");
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
      return <Loader />;
    } else {
      return (
        <Container>
          <Row>
            <Col xs="11" md="9" className="mx-auto my-3">
              <Row className="mx-auto">
                <div className="h3 text-center mx-auto">Edit Profile</div>
              </Row>
              {this.state.infoMessage && (
                <UncontrolledAlert color="info">
                  {this.state.infoMessage}
                </UncontrolledAlert>
              )}
              {this.state.errorMessage && (
                <UncontrolledAlert color="danger">
                  {this.state.errorMessage}
                </UncontrolledAlert>
              )}
              <Row>
                <Col md="9" className="mx-auto">
                  <Form onSubmit={this.handleSubmit}>
                    <div className="border rounded p-3 my-3">
                      <div className="h5 text-center mx-auto">
                        Edit Personal Details
                      </div>
                      <FormGroup>
                        <Label className="w-100 mx-auto">
                          Name:{" "}
                          <Input
                            type="text"
                            name="name"
                            required
                            value={this.state.name}
                            onChange={this.handleInputChange}
                          />
                        </Label>
                      </FormGroup>
                    </div>
                    <div className="border rounded p-3 my-3">
                      <div className="h5 text-center mx-auto">
                        Change Password
                      </div>
                      <FormGroup>
                        <Label className="w-100 mx-auto">
                          New Password:{" "}
                          <Input
                            type="password"
                            name="password"
                            onChange={this.handleInputChange}
                            placeholder="enter only if you want to change"
                          />
                        </Label>
                      </FormGroup>
                      <FormGroup>
                        <Label className="w-100 mx-auto">
                          Confirm New Password:{" "}
                          <Input
                            type="password"
                            name="password_confirmation"
                            onChange={this.handleInputChange}
                            placeholder="enter only if you want to change"
                          />
                        </Label>
                      </FormGroup>
                    </div>
                    <FormGroup>
                      <Label className="w-100 mx-auto">
                        Current Password:{" "}
                        <Input
                          type="password"
                          name="current_password"
                          required
                          onChange={this.handleInputChange}
                        />
                      </Label>
                    </FormGroup>
                    <Row>
                      <Col xs="6" className="text-center">
                        <Button
                          type="button"
                          onClick={this.props.history.goBack}
                        >
                          Go Back
                        </Button>
                      </Col>
                      <Col xs="6" className="text-center">
                        <Button type="submit">Update Profile</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default withRouter(EditProfile);
