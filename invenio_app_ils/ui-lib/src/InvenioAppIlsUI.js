import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { FrontSite, BackOffice } from "./routes/components";
import { BackOfficeRoutes } from "./routes/urls";
import history from "./history";
import { NotFound } from "./common/components";
import { AuthenticationGuard, UnAuthorized } from "./authentication/components";
import { configureStore, ilsContext } from "./store";

export default class InvenioAppIlsUI extends Component {
  constructor(props) {
    super(props);
    this.appConfig = props.appConfig;
    this.store = configureStore(this.appConfig);
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router history={history}>
          <Switch>
            <AuthenticationGuard
              path={`${BackOfficeRoutes.home}`}
              authorizedComponent={BackOffice}
              unAuthorizedComponent={UnAuthorized}
              roles={["admin", "librarian"]}
            />
            <FrontSite />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

InvenioAppIlsUI.propTypes = {
  appConfig: PropTypes.object
};

InvenioAppIlsUI.defaultProps = {
  appConfig: {}
};
