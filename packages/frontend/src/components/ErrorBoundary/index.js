import React, { Component } from 'react';
import { node } from 'prop-types';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  componentDidCatch(error) {
    this.setState({ hasError: true, error: error.message });
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.error}</h1>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: node.isRequired,
};

export default ErrorBoundary;
