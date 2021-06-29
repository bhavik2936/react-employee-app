import { Component } from "react";
import { withRouter } from "react-router-dom";
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
        <Container>
          <Row>
            <Col xs="11" md="9" className="mx-auto my-3">
              {this.state.infoMessage && (
                <UncontrolledAlert color="info">
                  {this.state.infoMessage}
                </UncontrolledAlert>
              )}
              {this.state.errorMessage && (
                <UncontrolledAlert color="info">
                  {this.state.errorMessage}
                </UncontrolledAlert>
              )}
            </Col>
          </Row>
        </Container>
      );
    }
    // render form to request of confirmation link
    // for manager's account
    else {
      return (
        <Container>
          <Row>
            <Col xs="11" md="9" className="mx-auto my-3">
              <Row className="mx-auto">
                <div className="h3 text-center mx-auto">
                  Request Confirmation Link
                </div>
              </Row>
              {this.state.infoMessage && (
                <UncontrolledAlert color="info">
                  {this.state.infoMessage}
                </UncontrolledAlert>
              )}
              {this.state.errorMessage && (
                <UncontrolledAlert color="info">
                  {this.state.errorMessage}
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
                      <Button type="submit">Request Confirmation Link</Button>
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
}

export default withRouter(ConfirmAccount);
