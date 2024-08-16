import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InputUserModal } from '../../../core/domain/beans/inputUserModal';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { ProjectDto } from '../../../core/domain/dto/projectDto';
import { ProjectService } from '../../../core/services/project/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: InputUserModal
  ) {
  }

  saveProject(data: ProjectDto) {
    debugger
    this.projectService.createProject(data).subscribe({
      next: (response) => {
        debugger
      },
      error: (err) => {
        debugger
      }
    })
  }


  closeModal() {
    this.dialogRef.close()
  }
}
