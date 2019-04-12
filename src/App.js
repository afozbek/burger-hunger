import React, { Component } from "react";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
class App extends Component {
  render() {
    return (
      <div>
        <h1>Bolum 8 --> 135.videodayım</h1>
        <Layout>
          {/* Some Component will come here */}
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
