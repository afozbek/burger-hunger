import { put } from "redux-saga/effects";

import * as actions from "../actions";
import axios from "../../axios-orders";

export function* initIngredientsSaga(action) {
  try {
    const ingredients = yield axios.get("/ingredients.json");

    yield put(actions.setIngredients(ingredients.data));
  } catch (err) {
    yield put(actions.fetchIngredientsFailed(err));
  }
}
