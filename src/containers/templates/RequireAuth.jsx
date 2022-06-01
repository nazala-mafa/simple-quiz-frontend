import { connect } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const reduxState = state => ({
  user: state.user
})

export default connect(reduxState)(function RequireAuth({ user, group }) {
  let location = useLocation();
  //pastikan sudah login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  //pastikan pada group/role yang sama
  if (group) {
    if (user.group !== group) {
      return <Navigate to="/login" state={{ from: location }} />
    }
  }
  return <Outlet />
})