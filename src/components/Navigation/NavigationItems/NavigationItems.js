import React, { Fragment } from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {!props.isAuth ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <Fragment>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Fragment>
    )}
  </ul>
);

export default navigationItems;
