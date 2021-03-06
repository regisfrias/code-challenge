import reducer from './';
import { FETCH_SUCCESS, FETCH_START } from '../../actions';

it('should return the initialState', () => {
  const action = { type: FETCH_START };

  const initialState = {
    loading: true,
    error: null,
  };

  const result = reducer(initialState, action);

  expect(result.loading).toBe(true);
});

it('should append to the data array with FETCH_SUCCESS', () => {
  const action = { type: FETCH_SUCCESS, data: [3, 4] };

  const initialState = {
    loading: true,
    error: null,
    data: [1, 2],
    nextPage: null,
    isLastPage: false,
  };

  const result = reducer(initialState, action);

  const expected = [1, 2, 3, 4];

  expect(result.data).toEqual(expected);
});

it('should set isLastPage to true if nextPage is null', () => {
  const action = { type: FETCH_SUCCESS, nextPage: null };

  const initialState = {
    loading: true,
    error: null,
    data: [1, 2],
    nextPage: null,
    isLastPage: false,
  };

  const result = reducer(initialState, action);
  expect(result.isLastPage).toBe(true);
});
