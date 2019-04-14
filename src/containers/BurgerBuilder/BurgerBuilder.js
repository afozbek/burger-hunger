import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.6,
  meat: 1.4,
  bacon: 0.9
};

class BurgerBuilder extends Component {
  // state object
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5,
    isPurchasable: false
  };

  updatePurchaseState = (ingredients, price) => {
    //map the ingredients then return the sum in the sum constant
    const sum = Object.keys(ingredients)
      .map(type => {
        return ingredients[type];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      ingredients: ingredients,
      totalPrice: price,
      isPurchasable: sum > 0
    });
  };
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAdd = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdd;
    this.updatePurchaseState(updatedIngredients, newPrice);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.updatePurchaseState(updatedIngredients, newPrice);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          isPurchasable={this.state.isPurchasable}
          price={this.state.totalPrice}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
