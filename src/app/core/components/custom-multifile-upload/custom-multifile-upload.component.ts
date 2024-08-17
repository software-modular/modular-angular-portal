import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-multifile-upload',
  templateUrl: './custom-multifile-upload.component.html',
  styleUrl: './custom-multifile-upload.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomMultifileUploadComponent),
      multi: true
    }
  ]
})
export class CustomMultifileUploadComponent implements ControlValueAccessor {

  @Input() label: string = "Fotos";
  @Input() placeholder: string = "";
  fileUpload: File[] = [];

  value: any[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  files: File[] = [];

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

  onInputChange() {
  }

  uploadFiles(event: any) {
  }

  onFileSelected(event: any) {
    this.fileUpload.push(event.target.files[0]);

  }
}
