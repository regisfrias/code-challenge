import reducer from './';
import { FETCH_SUCCESS } from '../../actions';

it('should return the initialState', () => {
  throw new Error('Not implemented');
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
  throw new Error('Not implemented');
});
