import { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

import isAuthenticated from "../../helper/authenticate";
import Loader from "../misc/Loader";

class ViewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.getEmployeeDetails = this.getEmployeeDetails.bind(this);
  }

  // collecting tokens
  async componentDidMount() {
    document.title = "View Employee";

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
      this.setState({ loading: false, employee: data });
    }
    // any failure proceed to dashboard
    // solution to unauthorized and not_found
    else {
      this.props.history.replace("/dashboard");
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      // destructuring employee id
      const { employee } = this.props.location;

      return (
        <Container>
          <Row>
            <Col xs="11" md="9" className="mx-auto my-3">
              <Row className="mx-auto">
                <div className="h3 text-center mx-auto">View Employee</div>
              </Row>
              <Row className="mt-3">
                <Col md="9" className="mx-auto">
                  <Row>
                    <Col xs="6">Name</Col>
                    <Col xs="6">{this.state.employee.name}</Col>
                    <Col xs="12">
                      <hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6">Experience</Col>
                    <Col xs="6">{this.state.employee.experience} yrs.</Col>
                    <Col xs="12">
                      <hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6">Salary</Col>
                    <Col xs="6">
                      ₹ {this.state.employee.salary.toLocaleString()}
                    </Col>
                    <Col xs="12">
                      <hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6" className="text-center">
                      <Button onClick={this.props.history.goBack}>
                        Go Back
                      </Button>
                    </Col>
                    <Col xs="6" className="text-center">
                      <Link
                        to={{ pathname: "editEmployee", employee: employee }}
                      >
                        <Button key={employee} id={employee}>
                          Edit
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default withRouter(ViewEmployee);
