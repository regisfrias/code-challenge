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

const fetchSuccess = ({ nextPage, data, isLastPage }) => ({
  type: FETCH_SUCCESS,
  nextPage,
  data,
  isLastPage,
});

/**
 * Fetches repositories asyncronously for the given username, see {@link https://developer.github.com/v3/repos/#list-user-repositories}
 * @param { string } username - username to fetch
 */
export const fetchUserRepos = username => async (dispatch, getState) => {
  const { REACT_APP_GITHUB_OAUTH_TOKEN: token } = process.env;
  const state = getState().RepoList;

  // @TODO: We must handle pagination too...
  // https://developer.github.com/v3/guides/traversing-with-pagination/
  // parse-link-header package looks nice?

  dispatch(fetchStart());

  try {
    fetch(
      `https://api.github.com/users/${username}/repos?access_token=${token}&sort=created&per_page=4&page=${
        state.nextPage
      }`,
    )
      .then(res => {
        let isLastPage = false;

        for (const value of res.headers.values()) {
          if (value.indexOf('first') >= 0) {
            isLastPage = true;
          }
        }

        return { data: res.json(), isLastPage };
      })
      .then(res =>
        res.data.then(data =>
          dispatch(
            fetchSuccess({
              nextPage: state.nextPage,
              data: data,
              isLastPage: res.isLastPage,
            }),
          ),
        ),
      );
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
