import React, { Component } from "react";
import { render } from "react-dom";

import { InvenioAppIlsUI } from "../../src";

class Demo extends Component {
  render() {
    return (
      <div>
        <div
          id="invenio-config"
          data-config='{"circulation": {"loanActiveStates": ["ITEM_AT_DESK", "ITEM_ON_LOAN", "ITEM_IN_TRANSIT_FOR_PICKUP", "ITEM_IN_TRANSIT_TO_HOUSE"], "loanCompletedStates": ["ITEM_RETURNED"]}, "documents": {"search": {"aggs": ["keywords", "languages", "document_types", "items_available_for_loan", "moi"], "sortBy": {"onEmptyQuery": "mostrecent", "values": [{"field": "mostrecent", "order": 1, "title": "Newest"}, {"field": "bestmatch", "order": 2, "title": "Best match"}]}, "sortOrder": ["asc", "desc"]}}, "editor": {"url": "/editor"}, "eitems": {"available": {"status": "CAN_CIRCULATE"}, "search": {"aggs": [], "sortBy": {"onEmptyQuery": "mostrecent", "values": [{"field": "mostrecent", "order": 1, "title": "Newest"}, {"field": "bestmatch", "order": 2, "title": "Best match"}]}, "sortOrder": ["asc", "desc"]}}, "items": {"available": {"status": "CAN_CIRCULATE"}, "search": {"aggs": ["status", "medium", "circulation_status"], "sortBy": {"onEmptyQuery": "mostrecent", "values": [{"field": "mostrecent", "order": 1, "title": "Newest"}, {"field": "bestmatch", "order": 2, "title": "Best match"}]}, "sortOrder": ["asc", "desc"]}}, "loans": {"search": {"aggs": ["state"], "sortBy": {"onEmptyQuery": "mostrecent", "values": [{"field": "mostrecent", "order": 1, "title": "Newest"}, {"field": "bestmatch", "order": 2, "title": "Best match"}]}, "sortOrder": ["asc", "desc"]}}, "patrons": {"search": {"aggs": [], "sortBy": {"onEmptyQuery": null, "values": []}, "sortOrder": ["asc", "desc"]}}, "series": {"search": {"aggs": ["moi", "keywords", "languages"], "sortBy": {"onEmptyQuery": "mostrecent", "values": [{"field": "mostrecent", "order": 1, "title": "Newest"}, {"field": "bestmatch", "order": 2, "title": "Best match"}]}, "sortOrder": ["asc", "desc"]}}, "support_email": "info@inveniosoftware.org"}'
        ></div>
        <h1>invenio-app-ils Demo</h1>
        <InvenioAppIlsUI />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
