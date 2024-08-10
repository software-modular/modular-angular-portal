import { IInputForm } from "../contracts/IinputForm";
import { TypeInputForm } from "../enum/TypeInputForm";

export abstract class InputForm<V> implements IInputForm<V> {
  label?: string;
  placeholder?: string;
  formControlName: string;
  customErrorMessage?: string;
  type: TypeInputForm;
  required: Boolean;

  constructor(label: string, placeholder: string, formControlName: string,
    customErrorMessage: string, type: TypeInputForm, required: Boolean) {
    this.label = label;
    this.placeholder = placeholder;
    this.formControlName = formControlName;
    this.customErrorMessage = customErrorMessage;
    this.type = type;
    this.required = required;
  }

  abstract getValue(): V;

}
