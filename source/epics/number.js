import rx from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import { ajax } from 'rxjs/observable/dom/ajax';

// TODO: actionハードコーディングやめる
export default [
  action$ => action$
    .ofType('SLOWINCREMENT')
    .delay(1000)
    .mapTo({ type: 'INCREMENT' }),
  (action$, store) => action$
    .ofType('SLOWDECREMENT')
    .delay(1000)
    .mapTo({ type: 'DECREMENT' }),
  action$ => action$
    .ofType('FETCH')
    .mergeMap(() => ajax.getJSON('/api')
      .map(payload => ({ type: 'FETCHDONE', payload }))
    )
    //.mapTo({ type: 'FETCHDONE' })
];
