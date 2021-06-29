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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerResource = this.registerResource.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    document.title = "Register";
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
      <Container>
        <Row>
          <Col xs="11" md="9" className="mx-auto my-3">
            <Row className="mx-auto">
              <div className="h3 text-center mx-auto">Register</div>
            </Row>
            <Row>
              <Col md="9" className="mx-auto w-100">
                <Form onSubmit={this.handleSubmit}>
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
                  <FormGroup>
                    <Label className="w-100">
                      Name
                      <Input
                        type="text"
                        name="name"
                        required
                        onChange={this.handleInputChange}
                      />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className="w-100">
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
                    <Label className="w-100">
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
                    <Label className="w-100">
                      Confirm Password
                      <Input
                        type="password"
                        name="password_confirmation"
                        required
                        onChange={this.handleInputChange}
                      />
                    </Label>
                  </FormGroup>
                  <FormGroup className="text-center">
                    <Button type="submit">Register</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col md="9" className="mx-auto text-center">
                Have an account?{" "}
                <Link to="login" className="link">
                  Log in
                </Link>
                .
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Register);
