import React, { Component } from 'react';
import { LoginWithOauthButton } from '@authentication/components';
import { Grid, Header, Divider, Segment } from 'semantic-ui-react';

import { LoginWithLocalAccountForm } from './LoginWithLocalAccountForm';
import { parse } from './utils';
import { FrontSiteRoutes } from '@routes/urls';
import { goTo } from '@history';
import {
  OAUTH_PROVIDERS,
  ENABLE_LOCAL_ACCOUNT_LOGIN,
  ENABLE_OAUTH_LOGIN,
} from '@config';

export default class LoginPage extends Component {
  componentDidMount() {
    const params = parse(window.location.search);
    if ('sessionExpired' in params) {
      this.props.sendErrorNotification(
        'Session Error',
        'You are either not signed in or your session has been expired.'
      );
    }
  }

  redirectIfAlreadyLoggedIn = params => {
    if (!this.props.isLoading && !this.props.isAnonymous) {
      if (!('sessionExpired' in params)) {
        this.props.clearNotifications();
        goTo(params.next || FrontSiteRoutes.home);
      }
    }
  };

  checkIfOauthLoginResponse = params => {
    if (params.code) {
      if (params.code === 200) {
        this.props.clearNotifications();
        goTo(params.redirect_url);
      } else {
        this.props.sendErrorNotification('Login failed.', params.message);
      }
    }
  };

  onLocalAccountLoginSucess = () => {
    const params = parse(window.location.search);
    this.props.fetchUserProfile();
    this.props.clearNotifications();
    goTo(params.next || FrontSiteRoutes.home);
  };

  renderOauthProviders = () => {
    const params = parse(window.location.search);
    return OAUTH_PROVIDERS.map(provider => {
      const { label, name, ...restProps } = provider;
      return (
        <LoginWithOauthButton
          key={name}
          content={label}
          name={name}
          nextUrl={params.next || FrontSiteRoutes.home}
          secondary
          {...restProps}
        />
      );
    });
  };

  render() {
    const params = parse(window.location.search);
    this.redirectIfAlreadyLoggedIn(params);
    this.checkIfOauthLoginResponse(params);

    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        columns={2}
        style={{ height: '100vh', backgroundColor: '#f9f9f9' }}
      >
        <Grid.Column>
          <Segment>
            <Header as="h2" textAlign="center">
              Login to account
            </Header>
            {ENABLE_OAUTH_LOGIN && this.renderOauthProviders()}
            {ENABLE_LOCAL_ACCOUNT_LOGIN && (
              <>
                <Divider horizontal>Or</Divider>
                <LoginWithLocalAccountForm
                  onLocalAccountLoginSucess={this.onLocalAccountLoginSucess}
                />
              </>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
