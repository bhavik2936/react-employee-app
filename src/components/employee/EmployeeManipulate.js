import { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Input } from "reactstrap";

class EmployeeManipulate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const employee = this.props.employee;
    const deleteEmployee = this.props.onDelete;
    const toggleCheckbox = this.props.onToggleCheck;

    return (
      <Row className="py-1">
        <Col xs="2" className="text-center">
          <Input
            type="checkbox"
            id={employee.id}
            name="employee"
            className="position-static mx-auto"
            onChange={toggleCheckbox}
          />
        </Col>
        <Col
          xs="6"
          className="link"
          tag={Link}
          to={{ pathname: "/viewEmployee", employee: employee.id }}
        >
          {employee.name}
        </Col>
        <Col
          xs="2"
          className="link text-center"
          tag={Link}
          to={{ pathname: "/editEmployee", employee: employee.id }}
        >
          <i className="fas fa-edit" />
        </Col>
        <Col
          xs="2"
          className="link text-center"
          role="button"
          onClick={() => deleteEmployee(employee)}
        >
          <i className="far fa-trash-alt" />
        </Col>
      </Row>
    );
  }
}

export default EmployeeManipulate;
