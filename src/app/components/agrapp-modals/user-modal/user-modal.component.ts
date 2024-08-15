import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {

  constructor(public dialogRef: MatDialogRef<UserModalComponent>) {

  }

  closeModal() {
    this.dialogRef.close()
  }

  save() { }

}
