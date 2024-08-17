import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InputUserModal } from '../../../core/domain/beans/inputUserModal';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { ProjectDto } from '../../../core/domain/dto/projectDto';
import { ProjectService } from '../../../core/services/project/project.service';
import { InputProjectModal } from '../../../core/domain/beans/InputProjectModal';
import { TypeModalMode } from '../../../core/domain/enum/TypeModalMode';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {

  isEdit: Boolean = false;
  projectData: ProjectDto = {};
  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: InputProjectModal
  ) {
    if (data !== undefined && data.mode === TypeModalMode.EDIT) {
      this.isEdit = true;
      this.projectData = data.data;
    }
  }

  saveProject(data: ProjectDto) {
    this.projectService.createProject(data).subscribe({
      next: (response) => {
      },
      error: (err) => {
      }
    })
  }


  closeModal() {
    this.dialogRef.close()
  }
}
