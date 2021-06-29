import { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
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
              <DropdownItem to="/viewProfile" tag={Link}>
                Account
              </DropdownItem>
              <DropdownItem to="/logout" tag={Link}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
      this.setState({ authenticateAction: authenticateModule });
    } else {
      const unAuthenticateModule = (
        <>
          <NavItem>
            <NavLink to="/register" tag={Link} onClick={this.navbarToggle}>
              Register
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login" tag={Link} onClick={this.navbarToggle}>
              Login
            </NavLink>
          </NavItem>
        </>
      );
      this.setState({ authenticateAction: unAuthenticateModule });
    }
  }

  render() {
    return (
      <Navbar dark color="dark" expand="md">
        <NavbarBrand to="/" tag={Link}>
          Employee Management App
        </NavbarBrand>
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
