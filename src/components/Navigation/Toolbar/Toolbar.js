import React from "react";
import classes from "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import Logo from "../../Logo/Logo";
const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClick} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
