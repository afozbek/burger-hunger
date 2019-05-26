import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.6,
  meat: 1.4,
  bacon: 0.9
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.payload.ingredientName]:
      state.ingredients[action.payload.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice:
      state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngrd = {
    [action.payload.ingredientName]:
      state.ingredients[action.payload.ingredientName] - 1
  };
  const updatedIngrds = updateObject(state.ingredients, updatedIngrd);
  const updatedStt = {
    ingredients: updatedIngrds,
    totalPrice:
      state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
    building: true
  };
  return updateObject(state, updatedStt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload.ingredients,
    error: false,
    totalPrice: 5,
    building: false
  });
};

const fetchIngredientsFailed = (state, action) =>
  updateObject(state, { error: true });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
