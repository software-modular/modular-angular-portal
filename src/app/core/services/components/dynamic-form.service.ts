import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  private valid: Boolean = false;
  private fields: Map<string, string> = new Map<string, string>;

  private fieldExternalValueChange = new BehaviorSubject<Map<string, any>>(new Map());
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
    let valueChange: Map<string, any> = new Map<string, any>();
    valueChange.set(formControlName, value);
    this.fieldExternalValueChange.next(valueChange)
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
}
