import { IS_LOADING, SUCCESS, HAS_ERROR } from './types';
import { document as documentApi } from '../../../../../../common/api';
import { sendErrorNotification } from '../../../../../../common/components/Notifications';

export const fetchMostRecentDocuments = () => {
  return async dispatch => {
    try {
      dispatch({
        type: IS_LOADING,
      });
      const response = await documentApi.list(
        documentApi
          .query()
          .withSort('-mostrecent')
          .qs()
      );
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
