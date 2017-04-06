import { createAction } from 'redux-actions';
import { format } from 'date-fns';

export const actions = {};
[
  'LOAD_START',
  'LOAD_DONE',
  'LOAD_FAIL'
].forEach(key => actions[key] = key);

export const creators = {
};

