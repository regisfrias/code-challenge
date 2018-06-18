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

  dispatch(fetchStart());

  const url = `https://api.github.com/users/${username}/repos?access_token=${token}&sort=created&per_page=4&page=${
    state.nextPage
  }`;

  const linkHeader = '<' + url + '>; rel="next"';

  const parsed = parseLinkHeaders(linkHeader);

  try {
    fetch(parsed.next.url)
      .then(res => res.json())
      .then(data => {
        const nextPage =
          data.length > 0 ? parseInt(parsed.next.page) + 1 : null;
        dispatch(
          fetchSuccess({
            nextPage,
            data: data,
          }),
        );
      });
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
