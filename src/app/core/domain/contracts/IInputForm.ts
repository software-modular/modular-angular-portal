import { ValidatorFn } from "@angular/forms";

export interface IInputForm<V> {
  getValue(): V;

  getValidators(): ValidatorFn[];
}
