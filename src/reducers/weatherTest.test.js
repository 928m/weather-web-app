import weatherReducer from './weather';
import iconRain from '../components/images/icon-rain.png';
import iconSnow from '../components/images/icon-snow.png';

const initialState = {
  temp: 0,
  type: ''
};

describe('weather reducer', () => {
  it('초기 state를 리턴한다.', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  it('WEATHER_INFO_SETTING type 확인', () => {
    const weatherInfoSetting = {
      type: 'WEATHER_INFO_SETTING',
      temperature: 10,
      weather: [{ id: 200 }]
    };

    expect(typeof weatherReducer(initialState, weatherInfoSetting).temperature).toEqual('number');
    expect(typeof weatherReducer(initialState, weatherInfoSetting).icon).toEqual('string');
    expect(typeof weatherReducer(initialState, weatherInfoSetting).type).toEqual('string');
  });

  it('WEATHER_INFO_SETTING 처리', () => {
    const weatherInfoSettingId200 = {
      type: 'WEATHER_INFO_SETTING',
      temperature: 10,
      weather: [{ id: 200 }]
    };

    const weatherInfoSettingId200Expected = {
      temperature: 10,
      icon: iconRain,
      type: '뇌우'
    };

    const weatherInfoSettingId600 = {
      type: 'WEATHER_INFO_SETTING',
      temperature: 10,
      weather: [{ id: 699 }]
    };

    const weatherInfoSettingId600Expected = {
      temperature: 10,
      icon: iconSnow,
      type: '눈'
    };

    expect(weatherReducer(initialState, weatherInfoSettingId200)).toEqual(weatherInfoSettingId200Expected);
    expect(weatherReducer(initialState, weatherInfoSettingId600)).toEqual(weatherInfoSettingId600Expected);
    expect(weatherReducer(initialState, weatherInfoSettingId600)).not.toBe(weatherInfoSettingId600Expected);
    expect(weatherReducer(initialState, weatherInfoSettingId600)).not.toBe(initialState);
  });

  it('WEATHER_INFO_SETTING 범위 외의 값', () => {
    const weatherInfoSetting = {
      type: 'WEATHER_INFO_SETTING',
      temperature: 10,
      weather: [{ id: 100 }]
    };

    const weatherInfoSettingId100Expected = {
      temperature: 10,
      type: '',
      icon: ''
    };

    expect(weatherReducer(initialState, weatherInfoSetting)).toEqual(weatherInfoSettingId100Expected);
  });
});