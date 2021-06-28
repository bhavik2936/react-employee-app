import { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  // NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import isAuthenticated from "../../helper/authenticate";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticateAction: null,
      isNavbarOpen: false,
    };

    this.navbarToggle = this.navbarToggle.bind(this);
  }

  // reactstrap Navigation Bar toggling
  navbarToggle() {
    this.setState(function (state) {
      return { isNavbarOpen: !state.isNavbarOpen };
    });
  }

  async componentDidMount() {
    if (await isAuthenticated(false)) {
      const authenticateModule = (
        <>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Profile
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem>Log Out</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
      this.setState({ authenticateAction: authenticateModule });
    } else {
      const unAuthenticateModule = (
        <>
          <NavItem>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </NavItem>
        </>
      );
      this.setState({ authenticateAction: unAuthenticateModule });
    }
  }

  render() {
    return (
      <Navbar dark color="dark" expand="md">
        <Link to="/" className="navbar-brand">
          Employee Management App
        </Link>
        <NavbarToggler onClick={this.navbarToggle} />
        <Collapse isOpen={this.state.isNavbarOpen} navbar>
          <Nav className="ml-auto mr-3" navbar>
            <NavItem>
              <NavLink
                href="https://github.com/bhavik2936/react-employee-app"
                target="_blank"
              >
                GitHub
              </NavLink>
            </NavItem>
            <NavbarText className="d-none d-md-inline-block">|</NavbarText>
            {this.state.authenticateAction}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
