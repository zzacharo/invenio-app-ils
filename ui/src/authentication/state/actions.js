import { IS_LOADING, SUCCESS, IS_ANONYMOUS } from './types';
import {
  authenticationService,
  sessionManager,
} from '@authentication/services';

export const fetchUserProfile = () => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    const response = await authenticationService.fetchProfile();
    if (!response) {
      sessionManager.setAnonymous();
      dispatch({
        type: IS_ANONYMOUS,
      });
    } else {
      sessionManager.setUser(response.data);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    }
  };
};
