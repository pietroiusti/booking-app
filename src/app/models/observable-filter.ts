import { Observable } from "rxjs";

export interface ObservableFilter {
  name$: Observable<string>;
  ac$: Observable<boolean>;
  wb$: Observable<boolean>;
}