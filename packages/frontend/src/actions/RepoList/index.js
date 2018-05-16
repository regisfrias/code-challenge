import parseLinkHeaders from 'parse-link-header';

export const FETCH_START = '@fetch/start';
export const FETCH_ERROR = '@fetch/error';
export const FETCH_SUCCESS = '@fetch/success';

const fetchStart = () => ({
  type: FETCH_START,
});

const fetchError = error => ({
  type: FETCH_ERROR,
  error,
});

const fetchSuccess = ({ nextPage, data }) => ({
  type: FETCH_SUCCESS,
  nextPage,
  data,
});

/**
 * Fetches repositories asyncronously for the given username, see {@link https://developer.github.com/v3/repos/#list-user-repositories}
 * @param { string } username - username to fetch
 */
export const fetchUserRepos = username => async (dispatch, getState) => {
  dispatch(fetchStart());
  // @TODO: I might want to use `fetch` for this...
  // @TODO: I need a GitHub API key as for this to work in .env...
  // https://developer.github.com/apps/building-oauth-apps/
  // @TODO: We must handle pagination too...
  // https://developer.github.com/v3/guides/traversing-with-pagination/
  // parse-link-header package looks nice?
  // @TODO we want to get the `nextPage` from state?

  const { REACT_APP_GITHUB_API_KEY: token } = process.env;

  try {
    throw new Error('Not implemented (actions/RepoList/index.js)');
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
