import { put } from "redux-saga/effects";

import * as actions from "../actions";
import axios from "../../axios-orders";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const res = yield axios.post(
      "/orders.json?auth=" + action.payload.token,
      action.payload.orderData
    );

    const id = res.data.name;
    yield put(actions.purchaseBurgerSuccess(id, action.payload.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}
