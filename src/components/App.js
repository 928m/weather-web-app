import React, { Component, Fragment } from 'react';
import AtmosphereList from './AtmosphereList';
import logo from './images/logo.png';
import './App.scss';

import iconCloud from '../components/images/icon-cloud.png';
import iconMist from '../components/images/icon-mist.png';
import iconRain from '../components/images/icon-rain.png';
import iconSnow from '../components/images/icon-snow.png';
import iconSun from '../components/images/icon-sun.png';

class App extends Component {
  componentDidMount() {
    const { getLocation, loading } = this.props;

    loading(true);
    getLocation();
  }

  render() {
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    const { atmosphere, weather, city, isLoading } = this.props;
    const { id, temperature } = weather;
    let { date } = this.props;
    let weatherType = '';
    let icon = '';

    date = `오늘 ${date.getMonth() + 1}월 ${date.getDate()}일 ${day[date.getDay()]}요일`;

    if (id >= 200 && id < 300) {
      weatherType = '뇌우';
      icon = iconRain; // 뇌우 아이콘이 없어 임시로 대체하였습니다.
    } else if (id >= 300 && id < 500) {
      weatherType = '이슬비';
      icon = iconRain;
    } else if (id >= 500 && id < 600) {
      weatherType = '비';
      icon = iconRain;
    } else if (id >= 600 && id < 700) {
      weatherType = '눈';
      icon = iconSnow;
    } else if (id >= 700 && id < 800) {
      weatherType = '안개';
      icon = iconMist;
    } else if (id === 800) {
      weatherType = '맑음';
      icon = iconSun;
    } else if (id > 800) {
      weatherType = '구름';
      icon = iconCloud;
    }

    return (
      <div className="App">
        {
          isLoading
          ? <div className="loading">loading...</div>
          : (<Fragment>
              <section>
                <h1>{city}</h1>
                <img src={icon} alt={weatherType} />
                <div className="temperature">{temperature}℃</div>
                <p>{weatherType}</p>
              <p className="date">{date}</p>
              </section>
              <section className="dust-area">
                <ul>
                  <AtmosphereList atmosphereInfos={atmosphere} />
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
