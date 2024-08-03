import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { formatServerDate } from '../../utils/Date';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.css',
  providers: [provideNativeDateAdapter(),
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDateComponent),
    multi: true
  },
  ]
})
export class InputDateComponent implements ControlValueAccessor {

  @Input() label: string = "Fecha de inicio";
  @Input() placeholder: string = "";


  value: string = '';
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
    this.value = formatServerDate(value);
    this.onChange(value);
    this.onTouched();
  }

}
