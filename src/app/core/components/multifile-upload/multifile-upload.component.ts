import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FileUpload, UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'multifile-upload',
  templateUrl: './multifile-upload.component.html',
  styleUrl: './multifile-upload.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultifileUploadComponent),
      multi: true
    }
  ]
})
export class MultifileUploadComponent implements ControlValueAccessor {

  @Input() label: string = "Fotos";
  @Input() placeholder: string = "";
  @Input() maxFiles: number = 1;
  @ViewChild(FileUpload) fileUpload!: FileUpload;

  value: File[] = [];
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
    const totalFiles = this.fileUpload.files.length;
    if (totalFiles > this.maxFiles) {
      this.value = this.value.slice(0, this.maxFiles);
    } else {
      let files: File[] = [];
      for (let file of event.currentFiles) {
        files.push(file)
      }
      this.value = files;
    }
    this.onChange(this.value);
    this.onTouched();
  }

  validMaxFields() {
    if (this.fileUpload !== undefined) {
      return (this.fileUpload.files.length !== 0) && (this.fileUpload.files.length > this.maxFiles);
    }
    return false;
  }

}
