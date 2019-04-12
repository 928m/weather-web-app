import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import {
  weatherInfoSetting,
  cityInfoSetting,
  dateInfoSetting,
  atmosphereInfoSetting
} from '../actions';
import App from '../components/App';
import axios from 'axios';

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
  getLocation() {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      const appId = {
        weather: 'cadf8a77863b7e2c66730091f350ef3e',
        atmosphere: '6d425357716d696e35346a45486951'
      };

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId.weather}`)
        .then((response) => {
          const { name, weather, main } = response.data;
          const temperature = (main.temp - 273.15).toFixed(2);
          const city = name;

          dispatch(cityInfoSetting(city));
          dispatch(weatherInfoSetting(temperature, weather));
          dispatch(dateInfoSetting(new Date()));
        })
        .catch((err) => { console.log(err); });

      axios
        .get(`http://openAPI.seoul.go.kr:8088/${appId.atmosphere}/json/ListAvgOfSeoulAirQualityService/1/5/`)
        .then((response) => {
          const atmosphere = response.data.ListAvgOfSeoulAirQualityService.row[0];
          const { NITROGEN, OZONE, PM10, PM25 } = atmosphere;

          dispatch(atmosphereInfoSetting(NITROGEN, OZONE, PM10, PM25));
        })
        .catch((err) => { console.log(err); });
    };

    const error = (err) => {
      console.log(err);
    };

    const options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
