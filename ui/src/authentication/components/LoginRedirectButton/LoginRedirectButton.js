import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { AuthenticationRoutes } from '@routes/urls';
import { goTo } from '@history';

export class LoginRedirectButton extends Component {
  render() {
    const { content, nextUrl, ...restProps } = this.props;
    return (
      <Button
        fluid
        content={content}
        {...restProps}
        onClick={() => {
          goTo(
            AuthenticationRoutes.redirectAfterLogin(
              nextUrl || window.location.pathname
            )
          );
        }}
      />
    );
  }
}

LoginRedirectButton.propTypes = {
  content: PropTypes.string.isRequired,
  nextUrl: PropTypes.string,
};

LoginRedirectButton.defaultProps = {
  content: 'Login',
};
