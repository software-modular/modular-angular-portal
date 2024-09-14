import { ValidatorFn } from "@angular/forms";
import { DynamicValidator } from "../beans/dynamicValidator";

export interface IInputForm<V> {
  getValue(): V;

  getValidators(): DynamicValidator[];
}
