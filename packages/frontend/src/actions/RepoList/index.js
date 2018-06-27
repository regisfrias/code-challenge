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
  const state = getState().RepoList;
  const url = `https://api.github.com/users/${username}/repos?access_token=${token}&page=1`;

  dispatch(fetchStart());

  try {
    const response = await fetch(state.nextPage ? state.nextPage : url);
    const { headers } = response;
    const data = await response.json();
    const { next } = parseLinkHeaders(headers.get('Link'));
    const nextPage = next ? next.url : null;

    dispatch(
      fetchSuccess({
        nextPage,
        data: data,
      }),
    );
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
