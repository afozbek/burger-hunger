import React from "react";
import classses from "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";

import Logo from "../../Logo/Logo";
const toolbar = props => (
  <header className={classses.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
