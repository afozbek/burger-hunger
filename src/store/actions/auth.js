import * as actionTypes from "./actionsTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

// Auth Success Handler
export const authSuccess = ({ localId, idToken }) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      userId: localId,
      idToken: idToken
    }
  };
};

// handle auth failing
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error: error
    }
  };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    payload: {
      expirationTime: expirationTime
    }
  };
};

// Logout Handler
export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// Handle login & signup state and set token if is login
export const auth = (email, password, isSignup = true) => {
  return {
    type: actionTypes.AUTH_USER,
    payload: {
      email: email,
      password: password,
      isSignup: isSignup
    }
  };
};

export const setAuthRedirect = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    payload: {
      path: path
    }
  };
};

// check auth token state
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      // Check to see if token is expires
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const authData = {
          localId: userId,
          idToken: token
        };
        dispatch(authSuccess(authData));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
