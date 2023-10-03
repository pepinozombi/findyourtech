import React, { Component } from 'react';

class AuthCallback extends Component {
  componentDidMount() {
    const { twitchAuth } = this.props;

    twitchAuth.handleRedirectCallback();
  }

  render() {
    return null;
  }
}

export default AuthCallback;