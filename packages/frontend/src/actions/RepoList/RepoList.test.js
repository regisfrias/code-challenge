import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FETCH_START, fetchUserRepos } from './';
import mockData from './__mocks__/data';

import 'isomorphic-fetch';

const { REACT_APP_GITHUB_OAUTH_TOKEN: token } = process.env;
const mockStore = configureMockStore([thunk]);

const username = 'petetnt';

const url = `https://api.github.com/users/${username}/repos?access_token=${token}&page=1`;

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Link: '<' + url + '&page=2>; rel="next"',
};

fetchMock.get(url, {
  body: mockData,
  headers: headers,
});

const store = mockStore({
  RepoList: {
    nextPage: null,
  },
});

it('fetches repos for the user and sets them as action data', async () => {
  await store.dispatch(fetchUserRepos(username));
  expect(store.getActions().pop().data).toEqual(mockData);
});

test('fetching repos first sets state to loading', async () => {
  await store.dispatch(fetchUserRepos(username));
  expect(store.getActions()[0].type).toEqual(FETCH_START);
});

test('successful fetch sets nextPage to Link header value', async () => {
  await store.dispatch(fetchUserRepos(username));
  expect(store.getActions()[2].nextPage).toEqual(expect.anything());
});
