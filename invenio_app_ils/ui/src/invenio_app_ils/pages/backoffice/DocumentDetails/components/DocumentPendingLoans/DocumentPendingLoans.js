import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Error } from '../../../../../common/components';
import { toString } from '../../../../../common/api/date';
import { ResultsTable } from '../../../../../common/components';
import { loan as loanApi } from '../../../../../common/api';

import {
  loanSearchQueryUrl,
  viewLoanDetailsUrl,
} from '../../../../../common/urls';

export default class DocumentPendingLoans extends Component {
  constructor(props) {
    super(props);
    this.fetchPendingLoans = props.fetchPendingLoans;
    this.showDetailsUrl = viewLoanDetailsUrl;
    this.showAllUrl = loanSearchQueryUrl;
  }

  componentDidMount() {
    const { document_pid } = this.props.document.metadata;
    this.fetchPendingLoans(document_pid);
  }

  _getFormattedDate = d => (d ? toString(d) : '');

  _showDetailsHandler = loan_pid =>
    this.props.history.push(this.showDetailsUrl(loan_pid));

  _showAllHandler = () => {
    const { document_pid } = this.props.document.id;
    this.props.history.push(
      this.showAllUrl(
        loanApi
          .query()
          .withDocPid(document_pid)
          .withState('PENDING')
          .qs()
      )
    );
  };

  prepareData() {
    return this.props.data.map(row => ({
      ID: row.loan_pid,
      'Patron PID': row.patron_pid,
      'Request created': this._getFormattedDate(row.updated),
    }));
  }

  render() {
    const rows = this.prepareData();
    const { data, isLoading, hasError } = this.props;
    const errorData = hasError ? data : null;
    return (
      <Loader isLoading={isLoading}>
        <Error error={errorData}>
          <ResultsTable
            rows={rows}
            name={'Pending loans requests'}
            actionClickHandler={this._showDetailsHandler}
            showAllClickHandler={{
              handler: this._showAllHandler,
              params: null,
            }}
            showMaxRows={this.props.showMaxPendingLoans}
          />
        </Error>
      </Loader>
    );
  }
}

DocumentPendingLoans.propTypes = {
  document: PropTypes.object.isRequired,
  fetchPendingLoans: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  showMaxPendingLoans: PropTypes.number,
};

DocumentPendingLoans.defaultProps = {
  showMaxPendingLoans: 5,
};