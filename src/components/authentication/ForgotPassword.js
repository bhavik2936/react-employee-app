import { Component } from "react";
import {
  Container,
  Row,
  Col,
  UncontrolledAlert,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { infoMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestResetPasswordLink = this.requestResetPasswordLink.bind(this);
  }

  componentDidMount() {
    document.title = "Forgot Password";
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
      <Container>
        <Row>
          <Col xs="11" md="9" className="mx-auto my-3">
            <Row className="mx-auto">
              <div className="h3 text-center mx-auto">Frogot Password ?</div>
            </Row>
            {this.state.infoMessage && (
              <UncontrolledAlert color="info">
                {this.state.infoMessage}
              </UncontrolledAlert>
            )}
            <Row>
              <Col md="9" className="mx-auto">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label className="w-100 mx-auto">
                      Email
                      <Input
                        type="email"
                        name="email"
                        onChange={this.handleInputChange}
                      />
                    </Label>
                  </FormGroup>
                  <FormGroup className="text-center">
                    <Button type="submit">Send Instructions</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ForgotPassword;
