import { Link, NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { connect } from "react-redux";
import { authLogout } from "../../../config/redux/action";

function ExpNavbar(props) {
  let auth = (!props.user)? <NavLink to="/login" className="nav-link" activeclassname="active">Login</NavLink>
    : <NavLink to="/logout" className="nav-link" activeclassname="active">Logout</NavLink>;
  return (
    <>
      <Navbar bg="dark" expand="md" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">Home</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <li className="nav-item">
                <NavLink to="/quiz" className="nav-link" activeclassname="active">Quiz</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/kontribusi" className="nav-link" activeclassname="active">Kontribusi</NavLink>
              </li>
              <li className="nav-item">
                { auth }
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
const reduxState = state => ({
  user: state.user
})

const reduxDispatch = dispatch => ({
  logout: dispatch( authLogout )
})
export default connect(reduxState, reduxDispatch)(ExpNavbar);