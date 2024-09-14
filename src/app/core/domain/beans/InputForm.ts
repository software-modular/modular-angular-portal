import { IInputForm } from "../contracts/IInputForm";
import { TypeInputForm } from "../enum/TypeInputForm";
import { DynamicValidator } from "./dynamicValidator";

export abstract class InputForm<V> implements IInputForm<V> {
  label?: string;
  placeholder?: string;
  formControlName: string;
  customErrorMessage?: string;
  type: TypeInputForm;

  constructor(label: string, placeholder: string, formControlName: string,
    customErrorMessage: string, type: TypeInputForm,) {
    this.label = label;
    this.placeholder = placeholder;
    this.formControlName = formControlName;
    this.customErrorMessage = customErrorMessage;
    this.type = type;
  }

  abstract getValue(): V;

  abstract getValidators(): DynamicValidator[];
}
