import { TypeInputForm } from "../enum/TypeInputForm";
import { InputForm } from "./InputForm";

export class TextFieldForm extends InputForm<string> {

  value: string;

  constructor(label: string, placeholder: string, formControlName: string,
    customErrorMessage: string, type: TypeInputForm, required: boolean, value: string) {
    super(label, placeholder, formControlName, customErrorMessage, type, required);
    this.value = value;
  }

  override getValue(): string {
    if (this.value !== undefined) {
      return this.value;
    }
    return '';
  }

}
