import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const { getLocation } = this.props;

    getLocation();
  }

  render() {
    const { atmosphere, weather, date, city } = this.props;
    const { type, temperature, icon } = weather;

    return (
      <div className="App">
        <section>
          <h1>{city}</h1>
          <img src={icon} alt={type} />
          <div>{temperature}℃</div>
          <p>{type}</p>
        <p className="date">{date}</p>
        </section>
        <section className="dust-area">
          <ul>
            {
              atmosphere.map((item) => (
                <li key={item.name}>
                  <h3>{item.name}</h3>
                  <span className="atmosphere-value">{item.value}</span>
                </li>
              ))
            }
          </ul>
        </section>
        <footer>
          <img src={logo} alt='houstep' />
        </footer>
      </div>
    );
  }
}

export default App;
