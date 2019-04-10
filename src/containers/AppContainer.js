import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { action } from '../actions';
import App from '../components/App';

const mapStateToProps = (state) => {
  const newState = cloneDeep(state);
  return newState;
};

const mapDispatchToProps = (dispatch) => ({
  getLocation() {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude);
      console.log(longitude);
    };

    const error = (err) => {
      console.log(err);
    };

    const options = {
      enableHighAccuracy: false,
      timeout: 3000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
