import { connect } from 'react-redux';
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
        return;
    }
  }).sort((current, next) => current.index - next.index);

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
          dispatch(dateInfoSetting(new Date()));
          dispatch(weatherInfoSetting(temperature, weather));
          dispatch(loadingStateSetting(false));
        })
        .catch((err) => {
          dispatch(loadingStateSetting(false));
          console.error(err);
        });
    };

    const error = (err) => {
      const replacePosition = {
        coords: {
          latitude: 37.4923661,
          longitude: 127.0205431
        }
      };

      switch(err.code) {
        case 1:
          alert('위치권한을 허용되지 않아 임시위치로 대체됩니다.');
          success(replacePosition);
          break;
        case 2:
          alert('위치확인이 불가하여 임시위치로 대체됩니다.');
          success(replacePosition);
          break;
        case 3:
          alert('위치확인이 불가하여 임시위치로 대체됩니다.');
          success(replacePosition);
          break;
        default:
          break;
      }
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
