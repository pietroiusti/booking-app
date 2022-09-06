export interface Filter {
  [k: string]: string | boolean;
  name: string;
  ac: boolean;
  wb: boolean;
  display: boolean;
  date: string;
  from: string;
  to: string;
  capacity: string;
}