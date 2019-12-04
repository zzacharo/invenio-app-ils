import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { authenticationService } from '@authentication/services';

export default class LoginWithOauthButton extends Component {
  render() {
    const { content, nextUrl, baseUrl, ...restProps } = this.props;
    return (
      <Button
        fluid
        content={content}
        inverted
        {...restProps}
        onClick={() =>
          authenticationService.loginWithOauthProvider(
            nextUrl || window.location.pathname,
            baseUrl
          )
        }
      />
    );
  }
}

LoginWithOauthButton.propTypes = {
  content: PropTypes.string,
  nextUrl: PropTypes.string,
};

LoginWithOauthButton.defaultProps = {
  content: 'Login',
};
