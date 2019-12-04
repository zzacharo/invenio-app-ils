class SessionManager {
  constructor() {
    this.setAnonymous();
  }

  isAnonymous() {
    return this.user === null;
  }

  setAnonymous() {
    this.user = null;
  }

  setUser(user) {
    this.user = {
      id: user['id'],
      roles: user['roles'] || [],
      username: user['username'],
      locationPid: user['locationPid'],
    };
  }
}

export const sessionManager = new SessionManager();
