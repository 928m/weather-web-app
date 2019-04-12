import React, { Component, Fragment } from 'react';
import logo from './images/logo.png';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const { getLocation, loading } = this.props;

    loading(true);
    getLocation();
  }

  render() {
    const { atmosphere, weather, date, city, isLoading } = this.props;
    const { type, temperature, icon } = weather;

    return (
      <div className="App">
        {
          isLoading
          ? <div className="loading">loading...</div>
          : (<Fragment>
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
            </Fragment>)
        }
      </div>
    );
  }
}

export default App;
