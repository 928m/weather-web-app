import iconCloud from '../components/images/icon-cloud.png';
import iconMist from '../components/images/icon-mist.png';
import iconRain from '../components/images/icon-rain.png';
import iconSnow from '../components/images/icon-snow.png';
import iconSun from '../components/images/icon-sun.png';

const initialState = {
  temp: 0,
  type: ''
};

const weather = (state = initialState, action) => {
  const {
    type,
    temperature,
    weather
  } = action;

  switch(type) {
    case 'WEATHER_INFO_SETTING':
      const { id } = weather[0];
      let weatherType = '';
      let icon = '';

      if (id >= 200 && id < 300) {
        weatherType = '뇌우';
        icon = iconRain; // 뇌우 아이콘 필요
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

      return {
        temperature,
        icon,
        type: weatherType
      };
    default:
      return state;
  }
};

export default weather;
