import { actions } from '../actions/number';

export function Numbers (state = [], action) {
  switch (action.type) {
    case actions.LOAD_START:
      return [1, 2, 3, 4, 5];
    case actions.LOAD_DONE:
      return [5, 4, 3, 2, 1];
    case actions.LOAD_FAIL:
      return [10, 20, 30, 40, 50];
    case actions.INCREMENT:
      return state.map(num => num + 1);
    case actions.DECREMENT:
      return state.map(num => num - 1);
    case actions.FETCHDONE:
      return action.payload;
    default:
      return state;
  }
}
