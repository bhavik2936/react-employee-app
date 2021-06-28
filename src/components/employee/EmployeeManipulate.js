import { Component } from "react";
import { Link } from "react-router-dom";

class EmployeeManipulate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const employee = this.props.employee;
    const deleteEmployee = this.props.onDelete;
    const toggleCheckbox = this.props.onToggleCheck;

    return (
      <div>
        <input
          type="checkbox"
          id={employee.id}
          name="employee"
          onChange={toggleCheckbox}
        />
        <Link to={{ pathname: "/viewEmployee", employee: employee.id }}>
          {employee.name}
        </Link>
        <Link to={{ pathname: "/editEmployee", employee: employee.id }}>
          <button>Edit</button>
        </Link>
        <button onClick={() => deleteEmployee(employee)}>Delete</button>
      </div>
    );
  }
}

export default EmployeeManipulate;
