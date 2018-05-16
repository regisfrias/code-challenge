import React from 'react';
import /**/ from 'redux';
import /**/ from 'react-redux';
import /**/ from 'redux-thunk';
import RepoList from './containers/RepoList';
import ErrorBoundary from './components/ErrorBoundary';
import reducers from './reducers';

// @TODO - Setup redux with redux-thunk

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <RepoList username="petetnt" />
    </ErrorBoundary>
  </Provider>
);

export default App;
