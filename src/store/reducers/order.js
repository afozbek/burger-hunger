import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => updateObject(state, { purchased: false })

const purchaseBurgerStart = (state, action) => updateObject(state, { loading: true })

const purchaseBurgerSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(action.payload)
  });
}

const purchaseBurgerFail = (state, action) => updateObject(state, { loading: false });

const fetchOrdersStart = (state, action) => updateObject(state, { loading: true });

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: action.payload.orders
  });
}

const fetchOrdersFail = (state, action) => updateObject(state, { loading: false });

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action)

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action)

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action)

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action)

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action)

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action)

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action)

    default: return state;
  }
};
export default orderReducer;
