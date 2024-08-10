import { InputForm } from "./InputForm";
import { TextFieldForm } from "./textFieldForm";

export interface DynamicFormInput {
  title: string,
  titleAling: string,
  btnLabel?: string,
  fields?: InputForm<any>[],
  showFooter?: Boolean,
  showBorder?: Boolean,


}
