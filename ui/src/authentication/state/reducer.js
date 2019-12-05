import { IS_LOADING, SUCCESS, IS_ANONYMOUS } from './types';

export const initialState = {
  isLoading: true,
  isAnonymous: true,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          id: `${action.payload['id']}`,
          roles: action.payload['roles'] || [],
          username: action.payload['username'],
          locationPid: action.payload['locationPid'],
        },
        isAnonymous: false,
      };
    case IS_ANONYMOUS:
      return {
        ...state,
        isLoading: false,
        isAnonymous: true,
        data: {},
      };
    default:
      return state;
  }
};
