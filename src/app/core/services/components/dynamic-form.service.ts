import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  private fields: Map<string, string> = new Map<string, string>;

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
