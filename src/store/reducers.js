import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 1,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 5
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.6,
  meat: 1.4,
  bacon: 0.9
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] + 1
        },
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] - 1
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;
