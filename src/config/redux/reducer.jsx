const initialState = {
  message: {
    show: false,
    text: ''
  },
  error: {
    show: false,
    text: ''
  },
  errors: {
    show: false,
    text: ''
  },
  user: null
}

export default function reducer(state = initialState, action) {
  if (action.type === 'ACTIVATE_TOAST') {
    return {
      ...state,
      [action.value.type]: {
        show: true,
        text: action.value.text
      }
    }
  }
  if (action.type === 'DEACTIVATE_TOAST') {
    return {
      ...state,
      [action.value]: {
        show: false,
        text: ''
      }
    }
  }
  if (action.type === 'AUTH_LOGIN') {
    return {
      ...state,
      user: action.value
    }
  }
  if (action.type === 'AUTH_LOGOUT') {
    return {
      ...state,
      user: null
    }
  }
  return state
}