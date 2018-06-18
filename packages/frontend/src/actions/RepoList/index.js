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
  const { REACT_APP_GITHUB_OAUTH_TOKEN: token } = process.env;

  // @TODO: We must handle pagination too...
  // https://developer.github.com/v3/guides/traversing-with-pagination/
  // parse-link-header package looks nice?
  // @TODO we want to get the `nextPage` from state?

  dispatch(fetchStart());

  try {
    fetch(
      `https://api.github.com/users/${username}/repos?access_token=${token}&per_page=4`,
    )
      .then(res => res.json())
      .then(data => dispatch(fetchSuccess({ nextPage: 2, data })));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
