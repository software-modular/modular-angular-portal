import { ValidatorFn } from "@angular/forms";
import { TypeInputForm } from "../enum/TypeInputForm";
import { InputForm } from "./InputForm";
import { DynamicValidator } from "./dynamicValidator";

export class TextFieldForm extends InputForm<string> {

  value: string;
  validators: DynamicValidator[];

  constructor(label: string, placeholder: string, formControlName: string,
    customErrorMessage: string, type: TypeInputForm,
    value: string, validators: DynamicValidator[]) {
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

  override getValidators(): DynamicValidator[] {
    return this.validators;
  }

}
