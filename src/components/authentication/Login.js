import { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  UncontrolledAlert,
  Label,
  Input,
  Button,
} from "reactstrap";

import isAuthenticated from "../../helper/authenticate";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.authenticateResource = this.authenticateResource.bind(this);
  }

  async componentDidMount() {
    document.title = "Login";

    // attempt for auto-login if already authenticated
    if (await isAuthenticated(true)) {
      this.props.history.replace("/dashboard");
      return;
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
      <Container>
        <Row>
          <Col xs="11" md="9" className="mx-auto py-3">
            <Row className="mx-auto">
              <div className="h3 text-center mx-auto">Login</div>
            </Row>
            <Row>
              <Col md="9" className="mx-auto">
                <Form onSubmit={this.handleSubmit}>
                  {this.state.errorMessage && (
                    <UncontrolledAlert color="danger">
                      {this.state.errorMessage}
                    </UncontrolledAlert>
                  )}
                  <FormGroup>
                    <Label className="w-100 mx-auto">
                      Email
                      <Input
                        type="email"
                        name="email"
                        required
                        onChange={this.handleInputChange}
                      />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className="w-100 mx-auto">
                      Password
                      <Input
                        type="password"
                        name="password"
                        required
                        onChange={this.handleInputChange}
                      />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Link to="/forgotPassword" className="link">
                      Forgot your password?
                    </Link>
                  </FormGroup>
                  <FormGroup className="text-center">
                    <Button type="submit">Login</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col md="9" className="mx-auto text-center">
                <hr />
                <div>Don&apos;t have an manager account?</div>
                <Link to="/register" className="link">
                  Sign Up
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
