import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionInput } from '../dto/OptionInput';

@Component({
  selector: 'app-input-list-option',
  templateUrl: './input-list-option.component.html',
  styleUrl: './input-list-option.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputListOptionComponent),
      multi: true
    }
  ]
})
export class InputListOptionComponent implements ControlValueAccessor {

  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() options: OptionInput[] = [];


  value: OptionInput = {
    label: "Seleccione",
    value: "Seleccione"
  };

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
    debugger
    const value = event.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  showOptionFormat(option: string): string {
    return option || '';
  }
}
