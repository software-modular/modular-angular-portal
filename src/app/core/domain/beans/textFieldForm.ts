import { ValidatorFn } from "@angular/forms";
import { TypeInputForm } from "../enum/TypeInputForm";
import { InputForm } from "./InputForm";

export class TextFieldForm extends InputForm<string> {

  value: string;
  validators: ValidatorFn[];

  constructor(label: string, placeholder: string, formControlName: string,
    customErrorMessage: string, type: TypeInputForm,
    value: string, validators: ValidatorFn[]) {
    super(label, placeholder, formControlName, customErrorMessage, type);
    this.value = value;
    this.validators = validators;
  }

  override getValue(): string {
    if (this.value !== undefined) {
      return this.value;
    }
    return '';
  }

  override getValidators(): ValidatorFn[] {
    return this.validators;
  }

}
