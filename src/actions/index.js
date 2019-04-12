export const weatherInfoSetting = (temperature, weather) => {
  return {
    type: 'WEATHER_INFO_SETTING',
    temperature,
    weather
  };
};

export const cityInfoSetting = (city) => {
  return {
    type: 'CITY_INFO_SETTING',
    city
  };
};

export const dateInfoSetting = (date) => {
  return {
    type: 'DATE_INFO_SETTING',
    date
  };
};

export const atmosphereInfoSetting = (nitrogen, ozone, pm10, pm25) => {
  return {
    type: 'ATMOSPHERE_INFO_SETTING',
    nitrogen,
    ozone,
    pm10,
    pm25
  };
};

export const loadingStateSetting = (loadingState) => {
  return {
    type: 'LOADING_STATE_SETTING',
    loadingState
  };
};
