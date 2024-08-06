import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'multifile-upload',
  templateUrl: './multifile-upload.component.html',
  styleUrl: './multifile-upload.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultifileUploadComponent),
      multi: true
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    }
  ]
})
export class MultifileUploadComponent implements ControlValueAccessor {

  @Input() label: string = "Fotos";
  @Input() placeholder: string = "";


  value: any[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onInputChange(event: any) {
    const value = event.currentFiles;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

}
