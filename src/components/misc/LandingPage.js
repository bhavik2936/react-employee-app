import { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

import Loader from "./Loader";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, manager: "many", employee: "many" };

    this.fetchMembersCount = this.fetchMembersCount.bind(this);
  }

  componentDidMount() {
    document.title = process.env.REACT_APP_SITE_TITLE;

    this.fetchMembersCount();
  }

  async fetchMembersCount() {
    const url = process.env.REACT_APP_RAILS_API_URL + `/count.json`;
    const options = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    const response = await fetch(url, options);

    // data render on success
    if (response.ok) {
      const { manager, employee } = await response.json();
      this.setState({ loading: false, manager: manager, employee: employee });
    }
    // any failure set loading false
    else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Container>
          <Row>
            <Col xs="11" md="9" className="mx-auto py-3">
              <Row className="mx-auto py-3">
                <div className="h1 text-center mx-auto">
                  Employee Management App
                </div>
              </Row>
              <Row className="py-3">
                <div className="h4 text-center mx-auto">
                  There are
                  {" " + this.state.employee + " "}
                  employees are working under the guidance of
                  {" " + this.state.manager + " "}
                  managers.
                </div>
              </Row>
              <Row className="py-3">
                <div className="h6 text-center mx-auto">
                  Be the part of this system and guide more power towards a
                  great journey of success.
                </div>
              </Row>
              <Row className="my-3">
                <Link to="/register" className="mx-auto">
                  <Button size="lg">Join as Manager</Button>
                </Link>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default LandingPage;
