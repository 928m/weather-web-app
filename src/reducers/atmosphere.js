const initialState = {
  ozone: 0,
  pm10: 0,
  pm25: 0,
  nitrogen: 0
};

const atmosphere = (state = initialState, action) => {
  const {
    type,
    ozone,
    pm10,
    pm25,
    nitrogen
  } = action;

  switch (type) {
    case 'ATMOSPHERE_INFO_SETTING':
      return {
        ozone,
        nitrogen,
        pm10,
        pm25
      };
    default:
      return state;
  }
};

export default atmosphere;
