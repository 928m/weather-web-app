const date = (state = new Date(), action) => {
  const { type, date } = action;

  switch(type) {
    case 'DATE_INFO_SETTING':
      return date;
    default:
      return state;
  }
};

export default date;
