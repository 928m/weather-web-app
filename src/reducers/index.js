import { combineReducers } from 'redux';
import weather from './weather';
import date from './date';
import city from './city';
import isLoading from './isLoading';
import atmosphere from './atmosphere';

export default combineReducers({
  weather,
  date,
  city,
  atmosphere,
  isLoading
});
