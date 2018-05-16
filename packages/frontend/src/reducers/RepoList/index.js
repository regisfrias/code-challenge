import { FETCH_START, FETCH_ERROR, FETCH_SUCCESS } from '../../actions';

const initialState = {
  loading: true,
  error: null,
  data: [],
  nextPage: null,
  isLastPage: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    // @TODO: Implement FETCH_SUCCESS handler. On success, you should apply proper loading/error
    // states, and adjust the other data/variables needed for the container in containers/RepoList
    case FETCH_SUCCESS: {
      throw new Error('Not implemented');
    }
    default:
      return state;
  }
};
