import { TypeInputForm } from "../enum/TypeInputForm";
import { InputForm } from "./InputForm";

export class HiddenFieldForm extends InputForm<any> {

  value: any;

  constructor(label: string, placeholder: string, formControlName: string,
    customErrorMessage: string, type: TypeInputForm, required: boolean, value: any) {
    super(label, placeholder, formControlName, customErrorMessage, type, required);
    this.value = value;
  }

  override getValue(): any {
    if (this.value !== undefined) {
      return this.value;
    }
    return null;
  }

}
