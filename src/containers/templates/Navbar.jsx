import { Link, NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { connect } from "react-redux";
import { authLogout } from "../../config/redux/action";

const reduxState = state => ({
  user: state.user
})

const reduxDispatch = dispatch => ({
  logout: () => dispatch(authLogout)
})

function getAuth(props) {
  return (!props.user) ? <NavLink to="/login" className="nav-link" activeclassname="active">Login</NavLink>
    : <button onClick={() => props.logout()} className="nav-link bg-transparent border-0" activeclassname="active">Logout</button>;
}

export const AdminNavbar = connect(reduxState, reduxDispatch)(props => {
  let auth = getAuth(props)

  return (
    <>
      <Navbar bg="dark" expand="md" variant="dark">
        <Container>
          <Link to="/admin" className="navbar-brand fw-bold">Home</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <li className="nav-item">
                <NavLink to="admin/users" className="nav-link" activeclassname="active">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/kontribusi" className="nav-link" activeclassname="active">Kontribusi</NavLink>
              </li>
              <li className="nav-item">
                {auth}
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
});

export const StudentNavbar = connect(reduxState, reduxDispatch)(props => {
  let auth = getAuth(props)

  return (
    <>
      <Navbar bg="dark" expand="md" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand fw-bold">Home</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <li className="nav-item">
                <NavLink to="/student/quiz" className="nav-link" activeclassname="active">Quiz</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/student/score" className="nav-link" activeclassname="active">Score</NavLink>
              </li>
              <li className="nav-item">
                {auth}
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
});

export const GuestNavbar = () => {
  return (
    <>
      <Navbar bg="dark" expand="md" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand fw-bold">Home</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" activeclassname="active">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link" activeclassname="active">Register</NavLink>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

