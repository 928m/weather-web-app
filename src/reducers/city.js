const city = (state = '', action) => {
  const { type, city } = action;

  switch(type) {
    case 'CITY_INFO_SETTING':
      return city;
    default:
      return state;
  }
};

export default city;
