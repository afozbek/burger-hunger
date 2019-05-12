import * as actionTypes from "./actionsTypes";
import axios from "axios";

import { singupUrl, loginUrl, API_KEY } from "../../../keys";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { authData }
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
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
