import { connect } from 'react-redux';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import {
  weatherInfoSetting,
  cityInfoSetting,
  dateInfoSetting,
  atmosphereInfoSetting,
  loadingStateSetting
} from '../actions';
import App from '../components/App';
import appId from '../credential';

const mapStateToProps = (state) => {
  const newState = cloneDeep(state);
  const { atmosphere } = newState;

  newState.atmosphere = Object.keys(atmosphere).map((item) => {
    switch(item) {
      case 'pm10':
        return {
          index: 1,
          name: '미세먼지',
          value: atmosphere[item]
        };
      case 'pm25':
        return {
          index: 2,
          name: '초미세먼지',
          value: atmosphere[item]
        };
      case 'ozone':
        return {
          index: 3,
          name: '오존',
          value: atmosphere[item]
        };
      case 'nitrogen':
        return {
          index: 4,
          name: '이산화질소',
          value: atmosphere[item]
        };
      default:
        return {};
    }
  }).sort((prev, current) => prev.index - current.index);

  return newState;
};

const mapDispatchToProps = (dispatch) => ({
  loading(state) {
    dispatch(loadingStateSetting(state));
  },
  getLocation() {
    const success = (position) => {
      const { latitude, longitude } = position.coords;

      const weatherApiRequest = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId.weather}`);
      const mustApiRequest = axios.get(`http://openAPI.seoul.go.kr:8088/${appId.atmosphere}/json/ListAvgOfSeoulAirQualityService/1/5/`);

      Promise
        .all([weatherApiRequest, mustApiRequest])
        .then((response) => {
          const { name, weather, main } = response[0].data;
          const atmosphere = response[1].data.ListAvgOfSeoulAirQualityService.row[0];
          const { NITROGEN, OZONE, PM10, PM25 } = atmosphere;
          const temperature = (main.temp - 273.15).toFixed(2);
          const city = name;

          dispatch(atmosphereInfoSetting(NITROGEN, OZONE, PM10, PM25));
          dispatch(cityInfoSetting(city));
          dispatch(weatherInfoSetting(temperature, weather));
          dispatch(dateInfoSetting(new Date()));
          dispatch(loadingStateSetting(false));
        });
    };

    const error = (err) => {
      console.error(err);
      dispatch(loadingStateSetting(false));
    };

    const options = {
      enableHighAccuracy: false,
      timeout: 100000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
