import { Component } from "react";
import { Link } from "react-router-dom";

class EmployeeManipulate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const employee = this.props.employee;
    const deleteEmployee = this.props.onDelete;

    return (
      <li>
        <Link to={{ pathname: "/viewEmployee", employee: employee.id }}>
          {employee.name}
        </Link>
        <Link to={{ pathname: "/editEmployee", employee: employee.id }}>
          <button>Edit</button>
        </Link>
        <button onClick={() => deleteEmployee(employee)}>Delete</button>
      </li>
    );
  }
}

export default EmployeeManipulate;
