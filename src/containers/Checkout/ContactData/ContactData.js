import React, { Component } from "react";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";

import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Furkan",
        address: {
          street: "TestStreet",
          zipCode: "414141",
          country: "Turkey"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form action="#">
        <input
          className={classes.Input}
          type="text"
          name="name"
          id=""
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          id=""
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          id=""
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          id=""
          placeholder="Your Postal Code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
