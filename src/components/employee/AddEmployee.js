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

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { infoMessage: "", errorMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
  }

  // checking for token
  async componentDidMount() {
    document.title = "Add Employee";

    if (!(await isAuthenticated(false))) {
      this.props.history.replace("/dashboard");
    }
  }

  handleSubmit(event) {
    // disable submit button
    const btnSubmit = document.querySelector("form button[type='submit']");
    btnSubmit.disabled = true;

    // build network url, headers, body
    const url = process.env.REACT_APP_RAILS_API_URL + "/employees.json";
    const authToken = localStorage.getItem("Authorization");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
      body: JSON.stringify({
        api_v1_employee: {
          name: this.state.name,
          experience: this.state.experience,
          salary: this.state.salary,
        },
      }),
    };

    this.addEmployee(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  async addEmployee(url, options) {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // redirect to dashboard after displaying message
    if (response.ok) {
      this.setState({ infoMessage: responseData.message, errorMessage: "" });

      setTimeout(() => {
        this.props.history.goBack();
      }, 2000);
    }
    // display error message
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
              <div className="h3 text-center mx-auto">Add Employee</div>
            </Row>
            <Row>
              <Col md="9" className="mx-auto">
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
                    <Label className="w-100 mx-auto">
                      Name
                      <Input
                        name="name"
                        type="text"
                        onChange={this.handleInputChange}
                      />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className="w-100 mx-auto">
                      Experience
                      <Input
                        name="experience"
                        type="number"
                        onChange={this.handleInputChange}
                      />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className="w-100 mx-auto">
                      Salary
                      <Input
                        name="salary"
                        type="number"
                        onChange={this.handleInputChange}
                      />
                    </Label>
                  </FormGroup>
                  <Row>
                    <Col xs="6" className="text-center">
                      <Button type="button" onClick={this.props.history.goBack}>
                        Go Back
                      </Button>
                    </Col>
                    <Col xs="6" className="text-center">
                      <Button type="submit">Add Employee</Button>
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

export default withRouter(AddEmployee);
