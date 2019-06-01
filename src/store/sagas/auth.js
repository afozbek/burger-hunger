import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import axios from "axios";
import { signupUrl, loginUrl } from "../../keys";

import * as actions from "../actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.payload.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true
  };
  let url = `${signupUrl}`;

  if (!action.payload.isSignup) {
    url = `${loginUrl}`;
  }
  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );

    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    yield put(actions.authSuccess(response.data));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    // Check to see if token is expires
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      const authData = {
        localId: userId,
        idToken: token
      };
      yield put(actions.authSuccess(authData));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
