import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DynamicFormInput } from '../../domain/beans/dynamicFormInput';
import { TypeInputForm } from '../../domain/enum/TypeInputForm';
import { DynamicFormService } from '../../services/components/dynamic-form.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  providers: [provideNativeDateAdapter()]
})
export class DynamicFormComponent implements OnInit {

  formGroup: FormGroup;
  @Input() data: DynamicFormInput = {
    title: "Default",
    titleAling: "left",
    fields: [],
    btnLabel: "Presione",
  };

  constructor(
    private formBuilder: FormBuilder,
    private dynamicFormService: DynamicFormService
  ) {
    this.formGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    if (!this.formGroup) {
      throw new Error('The "formGroup" input is necessary to use DynamicFormComponent.');
    }
    this.buildFormGroup();
  }

  private buildFormGroup() {
    if (this.data.fields) {
      for (let field of this.data.fields) {
        let validators = [];
        if (field.required) {
          validators.push(Validators.required)
        }
        if (field.type === TypeInputForm.EMAIL) {
          validators.push(Validators.email)
        }
        this.formGroup.addControl(field.formControlName, new FormControl('', validators))
      }
    }
    this.formFieldValueChangeEvent();
  }

  private formFieldValueChangeEvent() {
    this.formGroup.valueChanges.subscribe({
      next: (event: any) => {
        this.updateFormValue();
      }
    });
  }

  private updateFormValue() {
    if (this.data.fields) {
      for (let field of this.data.fields) {
        this.dynamicFormService.setValueByFieldName(field.formControlName,
          this.formGroup.get(field.formControlName)?.value)
      }
    }
  }

  getTypeField(type: string): TypeInputForm {
    switch (type) {
      case TypeInputForm.TEXT: {
        return TypeInputForm.TEXT;
      }
      case TypeInputForm.TEXT_AREA: {
        return TypeInputForm.TEXT_AREA;
      }
      case TypeInputForm.LIST_OPTION: {
        return TypeInputForm.LIST_OPTION;
      }
      case TypeInputForm.AUTO_COMPLETE_LIST_OPTION: {
        return TypeInputForm.AUTO_COMPLETE_LIST_OPTION;
      }
      case TypeInputForm.CHECK: {
        return TypeInputForm.CHECK;
      }
      case TypeInputForm.BI_MULTI_RADIO_CHECK: {
        return TypeInputForm.BI_MULTI_RADIO_CHECK;
      }
      case TypeInputForm.SINGLE_UPLOAD_FILE: {
        return TypeInputForm.SINGLE_UPLOAD_FILE;
      }
      case TypeInputForm.MULTI_UPLOAD_FILE: {
        return TypeInputForm.MULTI_UPLOAD_FILE;
      }
      case TypeInputForm.DATE: {
        return TypeInputForm.DATE;
      }
      case TypeInputForm.NUMBER: {
        return TypeInputForm.NUMBER;
      }
      case TypeInputForm.EMAIL: {
        return TypeInputForm.EMAIL;
      }
      case TypeInputForm.PASSWORD: {
        return TypeInputForm.PASSWORD;
      }
      default: {
        return TypeInputForm.TEXT;
      }
    }
  }

}
