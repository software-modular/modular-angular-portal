import { ValidatorFn } from "@angular/forms";
import { TypeInputForm } from "../enum/TypeInputForm";
import { InputForm } from "./InputForm";
import { OptionInput } from "./OptionInput";

export class ListOptionFieldForm extends InputForm<OptionInput[]> {

  value: OptionInput[];
  validators: ValidatorFn[];

  constructor(label: string, placeholder: string, formControlName: string,
    customErrorMessage: string, type: TypeInputForm,
    value: OptionInput[], validators: ValidatorFn[]) {
    super(label, placeholder, formControlName, customErrorMessage, type);
    this.value = value;
    this.validators = validators;
  }

  override getValue(): OptionInput[] {
    if (this.value !== undefined) {
      return this.value;
    }
    return [];
  }

  override getValidators(): ValidatorFn[] {
    return this.validators;
  }
}
