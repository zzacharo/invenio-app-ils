import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FrontSiteRoutes } from '@routes/urls';
import { onQueryChanged } from 'react-searchkit';

export class DocumentTags extends Component {
  searchTag = tag => {
    console.log(tag);
    onQueryChanged({
      searchQuery: { filters: ['tag', tag] },
    });
  };

  renderTags = () => {
    if (this.props.metadata.tags) {
      const {
        activeTab,
        dispatch,
        isLoading,
        hasError,
        metadata,
        ...uiProps
      } = this.props;
      return metadata.tags.map(tag => (
        <Label className={'highlighted'} key={tag} {...uiProps}>
          <Link
            onClick={() => this.searchTag(tag)}
            // to={FrontSiteRoutes.documentsListWithQuery(
            //   `&sort=mostrecent&order=desc&f=tag%3A${tag}`
            // )}
          >
            {tag}
          </Link>
        </Label>
      ));
    }
    return null;
  };

  render() {
    return this.renderTags();
  }
}

DocumentTags.propTypes = {
  metadata: PropTypes.object.isRequired,
};
