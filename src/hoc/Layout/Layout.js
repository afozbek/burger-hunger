import React, { useState } from "react";
import { connect } from "react-redux";

import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = props => {
  const [SdIsVisible, setSdIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSdIsVisible(false);
  };
  const sideDrawerToggleHandler = () => {
    setSdIsVisible(!SdIsVisible);
  };

  return (
    <Auxiliary>
      <Toolbar
        isAuth={props.isAuth}
        drawerToggleClick={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuth}
        open={SdIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);
