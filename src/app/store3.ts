import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { State } from "./models/state";

export class StateService3 {
  private state$: BehaviorSubject<any>;

  constructor(initialSate: any) {
    this.state$ = new BehaviorSubject(initialSate);
  }

  protected get state() {
    return this.state$.getValue();
  }

  protected select<T>(name: string): Observable<T> {
    return this.state$.asObservable().pipe(
      map(state => state[name]),
      distinctUntilChanged()
    );
  }

  protected set(name: string, state: any): void {
    this.state$.next({ ...this.state, [name]: state });
  }
}
