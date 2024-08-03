import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-multi-radio-check',
  templateUrl: './input-multi-radio-check.component.html',
  styleUrl: './input-multi-radio-check.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMultiRadioCheckComponent),
      multi: true
    }
  ]
})
export class InputMultiRadioCheckComponent implements ControlValueAccessor {

  @Input() label: string = "";
  @Input() placeholder: string = "";


  value: boolean = false;
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
    const value = event.target.value;
    this.value = value === "true" ? true : false;
    this.onChange(value);
    this.onTouched();
  }
}
