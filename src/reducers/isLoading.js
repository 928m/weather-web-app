import { LOADING_STATE_SETTING } from '../actions/actionTypes';

const isLoading = (state = false, action) => {
  const { type, loadingState } = action;

  switch (type) {
    case LOADING_STATE_SETTING:
      return loadingState;
    default:
      return state;
  }
};

export default isLoading;
