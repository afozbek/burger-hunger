import React, { Component } from 'react';

import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <p>Testing</p>
          {/* Some Component will come here */}
        </Layout>

      </div>
    );
  }
}

export default App;
