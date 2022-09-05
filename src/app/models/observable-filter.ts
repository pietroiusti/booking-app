import { Observable } from "rxjs";

export interface ObservableFilter {
  name$: Observable<string>;
  ac$: Observable<boolean>;
  wb$: Observable<boolean>;
  display$: Observable<boolean>;
  date$: Observable<string>;
  from$: Observable<string>;
  to$: Observable<string>;
}