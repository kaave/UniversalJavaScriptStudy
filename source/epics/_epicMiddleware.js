import { createEpicMiddleware, combineEpics } from 'redux-observable';

import numberEpics from './number';

export default createEpicMiddleware(combineEpics(...numberEpics));
