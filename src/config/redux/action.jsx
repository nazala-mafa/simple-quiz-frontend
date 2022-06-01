export const deactivateToast = data => dispatch => {
  dispatch({ type: 'DEACTIVATE_TOAST', value: data })
}

export const activateToast = data => dispatch => {
  dispatch({ type: 'ACTIVATE_TOAST', value: data })
}

export const authLogout = dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: 'AUTH_LOGOUT' });
}

export const authLogin = data => dispatch => {
  return new Promise(res => {
    localStorage.setItem('token', data.token);
    dispatch({ type: 'AUTH_LOGIN', value: data });
    res(true)
  })
}

export const authTokenRelogin = data => dispatch => {
  dispatch({ type: 'AUTH_LOGIN', value: data });
}