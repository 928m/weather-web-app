const day = ['일', '월', '화', '수', '목', '금', '토'];
const date = (state = '', action) => {
  const { type, date } = action;

  switch(type) {
    case 'DATE_INFO_SETTING':
      return `오늘 ${date.getMonth() + 1}월 ${date.getDate()}일 ${day[date.getDay()]}요일`;
    default:
      return state;
  }
};

export default date;
