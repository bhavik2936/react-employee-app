import { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import { ReactComponent as LoadingSvg } from "../../loader.svg";

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="h-100">
            <LoadingSvg className="loader" />
            <a
              className="loader-ref"
              target="_blank"
              rel="noreferrer"
              href="https://loading.io/icon/"
            >
              <p className="text-center">
                icon &apos;chunk&apos; from loading.io
              </p>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Loader;
