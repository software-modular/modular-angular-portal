import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFormExternalChange } from '../../domain/beans/dynamicFormExternalChange';
import { DynamicTypeExternalChange } from '../../domain/enum/dynamicTypeExternalChange';
import { DynamicTypeFieldProperty } from '../../domain/enum/dynamicTypeFieldProperty';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  private valid: Boolean = false;
  private fields: Map<string, string> = new Map<string, string>;

  private fieldExternalValueChange = new BehaviorSubject<Map<string, DynamicFormExternalChange>>(new Map());
  private fieldExternalValueChangeEvent = this.fieldExternalValueChange.asObservable();



  public setValidForm(valid: Boolean) {
    this.valid = valid;
  }

  public isValidForm(): Boolean {
    return this.valid;
  }

  public getFieldExternalValueChangeEvent(): Observable<Map<string, any>> {
    return this.fieldExternalValueChangeEvent;
  }

  public setValueField(formControlName: string, value: any) {
    this.fieldExternalValueChange.next(this.getMapExternalChange(
      formControlName, value, DynamicTypeExternalChange.VALUE));
  }

  public disableFieldByFormControlName(formControlName: string, disable: Boolean): void {
    let value = DynamicTypeFieldProperty.DISABLE
    if (!disable) {
      value = DynamicTypeFieldProperty.ENABLE
    }
    this.fieldExternalValueChange.next(this.getMapExternalChange(
      formControlName, value, DynamicTypeExternalChange.PROPERTY));
  }

  public enableFieldByFormControlName(formControlName: string): void {
    this.fieldExternalValueChange.next(this.getMapExternalChange(
      formControlName, 'enable', DynamicTypeExternalChange.VALUE));
  }

  public setValueByFieldName(fieldName: string, fieldValue: string) {
    this.fields.set(fieldName, fieldValue);
  }

  public getValueByFieldName(fieldName: string): string {
    return this.fields.get(fieldName) || '';
  }

  public getJsonOfForm(): string {
    let obj: any = {};
    this.fields.forEach((valor, clave) => {
      obj[clave] = valor;
    });
    return JSON.stringify(obj);
  }

  private getMapExternalChange(formControlName: string, value: any, typeChange: DynamicTypeExternalChange) {
    let valueChange: Map<string, DynamicFormExternalChange>
      = new Map<string, DynamicFormExternalChange>();
    valueChange.set(formControlName,
      this.getDynamicFormExternalChange(formControlName, value, typeChange));
    return valueChange;
  }

  private getDynamicFormExternalChange(formControlName: string, value: any, typeChange: DynamicTypeExternalChange):
    DynamicFormExternalChange {
    return {
      formControlName: formControlName,
      value: value,
      typeExternalChange: typeChange
    }
  }
}
