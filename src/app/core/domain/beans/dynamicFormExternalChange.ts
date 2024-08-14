import { DynamicTypeExternalChange } from "../enum/dynamicTypeExternalChange";

export interface DynamicFormExternalChange {
  formControlName: string,
  typeExternalChange: DynamicTypeExternalChange,
  value: any
}
