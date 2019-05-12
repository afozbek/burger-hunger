import * as actionTypes from "./actionsTypes";
import axios from "axios";
import { singupUrl, loginUrl, API_KEY } from "../../keys";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      userId: authData.localId,
      idToken: authData.idToken
    }
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error: error
    }
  };
};

export const auth = (email, password, isSignup = true) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = `${singupUrl}${API_KEY}`;
    if (!isSignup) {
      url = `${loginUrl}${API_KEY}`;
    }
    axios
      .post(url, authData)
      .then(res => {
        console.log(res.data);
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
