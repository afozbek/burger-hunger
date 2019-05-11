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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] + 1
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] - 1
        }
      };
    default:
      return state;
  }
};

export default reducer;
