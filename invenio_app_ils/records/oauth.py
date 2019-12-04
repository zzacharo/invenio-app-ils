# -*- coding: utf-8 -*-
#
# Copyright (C) 2018-2019 CERN.
#
# invenio-app-ils is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Ils oauth configuration."""

from __future__ import absolute_import, print_function

from flask import current_app, redirect
from six.moves.urllib_parse import urlencode

from invenio_oauthclient.contrib import cern

def ils_oauth_response_handler(remote, url, payload=dict()):
    """Default response handler."""
    remote_app_config = current_app.config['OAUTHCLIENT_REST_REMOTE_APPS'][
            remote.name]
    redirect_url = url
    if remote_app_config['authorized_url']:
        payload.update({"redirect_url": url})
        redirect_url = remote_app_config['authorized_url']
    if payload:
        return redirect(
            "{url}?{payload}".format(url=redirect_url, payload=urlencode(payload)))
    return redirect(url)
