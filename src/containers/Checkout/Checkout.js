import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 2
    }
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // param = ['salad', '1'] {[],[],[]}
      ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: ingredients
    });
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  onCheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.onCheckoutContinuedHandler}
        />
      </div>
    );
  }
}
