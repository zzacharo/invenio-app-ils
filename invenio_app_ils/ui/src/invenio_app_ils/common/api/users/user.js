import { http } from '../base';
import { serializer } from './serializer';

const url = '/users/';

const get = userPid => {
  return http.get(`${url}${userPid}`).then(response => {
    response.data = serializer.fromJSON(response.data);
    return response;
  });
};

export const user = {
  url: url,
  get: get,
};
