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

class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, infoMessage: "", errorMessage: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // collecting tokens
  async componentDidMount() {
    document.title = "Edit Employee";

    const employee = this.props.location.employee;

    if ((await isAuthenticated(false)) && employee) {
      this.getEmployeeDetails(employee);
    } else {
      this.props.history.replace("/dashboard");
    }
  }

  // network call to fetch employee details
  async getEmployeeDetails(employee) {
    const authToken = localStorage.getItem("Authorization");
    const url =
      process.env.REACT_APP_RAILS_API_URL + `/employees/${employee}.json`;
    const options = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    // data render on success
    if (response.ok) {
      const { name, experience, salary } = data;
      this.setState({
        loading: false,
        name: name,
        experience: experience,
        salary: salary,
      });
    }
    // any failure proceed to dashboard
    // solution to unauthorized and not_found
    else {
      this.props.history.replace("/dashboard");
    }
  }

  handleSubmit() {
    // disable submit button
    const btnSubmit = document.querySelector("form button[type='submit']");
    btnSubmit.disabled = true;

    const employee = this.props.location.employee;
    const url =
      process.env.REACT_APP_RAILS_API_URL + `/employees/${employee}.json`;
    const authToken = localStorage.getItem("Authorization");
    const options = {
      method: "PUT",
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

    this.updateEmployee(url, options);

    // prevent event propagation
    event.preventDefault();
  }

  async updateEmployee(url, options) {
    const response = await fetch(url, options);
    const responseData = await response.json();

    // redirect to dashboard after displaying message
    if (response.ok) {
      this.setState({ infoMessage: responseData.message });

      setTimeout(() => {
        this.props.history.goBack();
      }, 2000);
    }
    // display error message
    else {
      this.setState({ errorMessage: responseData.message });

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
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Container>
          <Row>
            <Col xs="11" md="9" className="mx-auto my-3">
              <Row className="mx-auto">
                <div className="h3 text-center mx-auto">Edit Employee</div>
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
                    <FormGroup>
                      <Label className="w-100 mx-auto">
                        Name
                        <Input
                          name="name"
                          type="text"
                          value={this.state.name}
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
                          value={this.state.experience}
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
                          value={this.state.salary}
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
                        <Button type="submit">Update Employee</Button>
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

export default withRouter(EditEmployee);
