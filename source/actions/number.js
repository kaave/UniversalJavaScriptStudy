// @flow

import { createAction } from 'redux-actions';

export const actions = {};
[
  'LOAD_START',
  'LOAD_DONE',
  'LOAD_FAIL',
  'INCREMENT',
  'DECREMENT',
  'SLOWINCREMENT',
  'SLOWDECREMENT',
  'FETCH',
  'FETCHDONE'
].forEach(key => (actions[key] = key));

export const creators = {
  loadStart: () => createAction(actions.LOAD_START)(),
  loadDone: () => createAction(actions.LOAD_DONE)(),
  loadFail: () => createAction(actions.LOAD_FAIL)(),
  increment: () => createAction(actions.INCREMENT)(),
  decrement: () => createAction(actions.DECREMENT)(),
  slowIncrement: () => createAction(actions.SLOWINCREMENT)(),
  slowDecrement: () => createAction(actions.SLOWDECREMENT)(),
  fetch: () => createAction(actions.FETCH)(),
  fetchDone: (val: number[]) => createAction(actions.FETCHDONE)(val)
};

