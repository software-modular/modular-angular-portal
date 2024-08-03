import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAutocompleteComponent),
      multi: true
    }
  ]
})
export class InputAutocompleteComponent implements ControlValueAccessor {

  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() options: string[] = [];


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
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  showOptionFormat(option: string): string {
    return option || '';
  }
}
