import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

import { ReactComponent as _404 } from "../../404.svg";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="11" md="9" className="mx-auto my-3">
            <Row>
              <div className="h3 text-center mx-auto">
                You seems to be lost!
              </div>
            </Row>
            <_404 />
            <Row>
              <Col xs="12" className="h5 text-center">
                Get headed to...
              </Col>
            </Row>
            <Row className="my-3">
              <Col xs="6" className="text-center">
                <Button onClick={this.props.history.goBack}>
                  Previous Page
                </Button>
              </Col>
              <Col xs="6" className="text-center">
                <Button onClick={() => this.props.history.replace("/")}>
                  Home
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(NotFound);
