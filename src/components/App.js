import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    const { getLocation } = this.props;

    getLocation();
  }

  render() {
    return (
      <div className="App">
        App
      </div>
    );
  }
}

export default App;
