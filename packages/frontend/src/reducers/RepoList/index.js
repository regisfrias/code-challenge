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
    case FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: action.error,
        data: state.data.concat(action.data),
        nextPage: action.nextPage,
        isLastPage: action.nextPage === null ? true : false,
      };
    }
    default:
      return state;
  }
};
