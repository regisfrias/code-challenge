import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RepoList from './containers/RepoList';
import ErrorBoundary from './components/ErrorBoundary';
import reducers from './reducers';

const middleware = [thunk];
const initialState = {};

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <RepoList username="petetnt" />
    </ErrorBoundary>
  </Provider>
);

export default App;
