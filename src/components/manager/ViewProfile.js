import { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

import isAuthenticated from "../../helper/authenticate";
import Loader from "../misc/Loader";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.getCurrentManagerDetails = this.getCurrentManagerDetails.bind(this);
  }

  // checking for token
  async componentDidMount() {
    document.title = "View Profile";

    if (await isAuthenticated(false)) {
      this.getCurrentManagerDetails();
    } else {
      this.props.history.replace("/login");
    }
  }

  // network call to fetch manager details
  async getCurrentManagerDetails() {
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
      this.setState({ loading: false, manager: data });
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
      const { name, email } = this.state.manager;

      return (
        <Container>
          <Row>
            <Col xs="11" md="9" className="mx-auto my-3">
              <Row className="mx-auto">
                <div className="h3 text-center mx-auto">Profile</div>
              </Row>
              <Row className="mt-3">
                <Col md="9" className="mx-auto">
                  <Row>
                    <Col xs="12" md="6">
                      Name
                    </Col>
                    <Col xs="12" md="6">
                      {name}
                    </Col>
                    <Col xs="12">
                      <hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="6">
                      Email
                    </Col>
                    <Col xs="12" md="6">
                      {email}
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
                      <Link to={{ pathname: "/editProfile" }}>
                        <Button>Edit Profile</Button>
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

export default withRouter(ViewProfile);
