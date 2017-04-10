import { combineReducers } from 'redux';

import * as Num from './number';

const reducers = {};
Object.keys(Num).forEach(key => (reducers[`number${key}`] = Num[key]));

export default combineReducers(reducers);
