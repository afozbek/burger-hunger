import * as actionTypes from "./actionsTypes";
import axios from "axios";
import { signupUrl, loginUrl } from "../../keys";

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
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = `${signupUrl}`;

    if (!isSignup) {
      url = `${loginUrl}`;
    }

    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);

        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
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
