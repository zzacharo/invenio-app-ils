import React, { Component } from 'react';
import { LoginPage } from '@pages/loginpage';
import { Notifications } from '@components/Notifications';

export class LoginRoutes extends Component {
  render() {
    return (
      <>
        <Notifications />
        <LoginPage />
      </>
    );
  }
}
