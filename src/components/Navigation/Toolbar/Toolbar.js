import React from "react";
import classses from "./Toolbar.css";

import Logo from "../../Logo/Logo";
const toolbar = props => (
  <header className={classses.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>...</nav>
  </header>
);

export default toolbar;
