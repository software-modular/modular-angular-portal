import { TypeInputForm } from "../enum/TypeInputForm";
import { InputForm } from "./InputForm";
import { OptionInput } from "./OptionInput";

export class ListOptionFieldForm extends InputForm<OptionInput[]> {

  value: OptionInput[];


  constructor(label: string, placeholder: string, formControlName: string,
    customErrorMessage: string, type: TypeInputForm, required: Boolean, value: OptionInput[]) {
    super(label, placeholder, formControlName, customErrorMessage, type, required);
    this.value = value;
  }

  override getValue(): OptionInput[] {
    if (this.value !== undefined) {
      return this.value;
    }
    return [];
  }
}
