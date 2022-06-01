import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { server_url } from "../../config/env";
import { authTokenRelogin } from "../../config/redux/action";
import { AdminNavbar, GuestNavbar, StudentNavbar } from "./Navbar";

const reduxState = state => ({
  user: state.user
})

const reduxDispatch = dispatch => ({
  tokenRelog: data => dispatch(authTokenRelogin(data))
})

export default connect(reduxState, reduxDispatch)(function Layout(props) {
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      if (!props?.user && token) {
        let user = await axios.post(server_url + 'token_login', { token: token });
        props.tokenRelog(user.data.data)
      }
    }
    fetchData();
  }, [props, token])

  switch (props?.user?.group) {

    case 'admin':
      return (
        <>
          <AdminNavbar />
          <div className="container">
            <Outlet />
          </div>
        </>
      )
    
    case 'student':
      return (
        <>
          <StudentNavbar />
          <div className="container">
            <Outlet />
          </div>
        </>
      )

    default:
      return (
        <>
          <GuestNavbar />
          <div className="container">
            <Outlet />
          </div>
        </>
      )

  }
})