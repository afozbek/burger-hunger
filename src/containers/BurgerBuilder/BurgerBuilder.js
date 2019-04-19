import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.6,
  meat: 1.4,
  bacon: 0.9
};

class BurgerBuilder extends Component {
  // state object
  state = {
    ingredients: null,
    totalPrice: 5,
    isPurchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  updateStateHandler = (ingredients, price) => {
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
    this.updateStateHandler(updatedIngredients, newPrice);
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
    this.updateStateHandler(updatedIngredients, newPrice);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    //alert("You can go on...😉");
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Furkan",
    //     address: {
    //       street: "TestStreet",
    //       zipCode: "414141",
    //       country: "Turkey"
    //     },
    //     email: "test@test.com"
    //   },
    //   deliveryMethod: "fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(res => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false, purchasing: false });
    //   });

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://react-my-burger-62bf3.firebaseio.com/ingredients.json")
      .then(ingredients => {
        this.setState({ ingredients: ingredients.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredients can't be received 😢</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            isPurchasable={this.state.isPurchasable}
            price={this.state.totalPrice}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
