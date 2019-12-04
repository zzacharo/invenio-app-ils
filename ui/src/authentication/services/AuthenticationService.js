import { http } from '@api';
import { sessionManager } from './SessionManager';

class AuthenticationService {
  loginWithOauthProvider = (nextUrl, providerUrl) => {
    localStorage.setItem('ILS_USER_WAS_LOGGEDIN', true);
    sessionManager.setAnonymous();
    if (process.env.NODE_ENV === 'production') {
      window.location =
        window.location.origin +
        `${providerUrl}?next=${encodeURIComponent(nextUrl)}`;
    } else {
      const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
      window.location = `${backendBaseUrl}${providerUrl}?next=${encodeURIComponent(
        nextUrl
      )}`;
    }
  };

  loginWithLocalAccount = async data => {
    localStorage.setItem('ILS_USER_WAS_LOGGEDIN', true);
    sessionManager.setAnonymous();
    let loginUrl = '';
    if (process.env.NODE_ENV === 'production') {
      loginUrl = `${window.location.origin}/api/login`;
    } else {
      const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
      loginUrl = `${backendBaseUrl}/api/login`;
    }
    return http.post(loginUrl, data);
  };

  logout = async () => {
    localStorage.setItem('ILS_USER_WAS_LOGGEDIN', false);
    sessionManager.setAnonymous();
    let logoutUrl = '';
    if (process.env.NODE_ENV === 'production') {
      logoutUrl = `${window.location.origin}/logout`;
    } else {
      const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
      logoutUrl = `${backendBaseUrl}/api/logout`;
    }
    return http.post(logoutUrl);
  };

  fetchProfile = async () => {
    try {
      console.log(process.env.REACT_APP_BACKEND_BASE_URL);

      const resp = await http.get('/me');
      return resp;
    } catch (e) {
      return null;
    }
  };

  hasRoles = (user, roles) => {
    if (!roles.length) {
      return true;
    }
    // any of needed roles found in user roles
    const anyNeededRoleFound = roles.some(
      role => user.roles.indexOf(role) !== -1
    );
    return anyNeededRoleFound;
  };
}

export const authenticationService = new AuthenticationService();
