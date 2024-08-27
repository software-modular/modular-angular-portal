import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from '../../core/services/project/project.service';
import { ProjectDto } from '../../core/domain/dto/projectDto';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { getCityByCode, getDepartmentByCode } from '../../core/domain/const/Colombia';
import { getStateProjectByCode } from '../../core/domain/const/StateProject';
import { getTypeGroundByCode } from '../../core/domain/const/TypeGround';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InvestmentModalComponent } from '../../components/agrapp-modals/investment-modal/investment-modal.component';
import { InputInvestmentModal } from '../../core/domain/beans/inputInvestmentModal';

@Component({
  selector: 'agrapp-projects',
  templateUrl: './agrapp-projects.component.html',
  styleUrl: './agrapp-projects.component.css'
})
export class AgrappProjectsComponent implements AfterViewInit {
  projectInfo: ProjectDto = {};
  carouselId: string = "project_info";
  imgs: string[] = [];
  projectId!: string;
  urlVideo!: SafeResourceUrl;
  userIsAuthenticated: Boolean = false;
  @ViewChild('iframeMap') iframeMap!: ElementRef<HTMLIFrameElement>;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    if (this.projectId !== '') {
      this.projectService.findPublicProjectById(this.projectId).subscribe({
        next: (data) => {
          this.projectInfo = data;
          this.loadInformation();
        },
        error: (_) => {
          this.redirect("portal/home");
        }
      });
    } else {
      this.redirect("portal/home");
    }
  }

  ngAfterViewInit(): void {
    this.userIsAuthenticated = this.authenticationService.userIsAuthenticated();
    if (this.projectInfo.crop?.google_maps_ubication !== null
      && this.projectInfo.crop?.google_maps_ubication !== undefined) {
      if (this.iframeMap && this.iframeMap.nativeElement) {
        this.iframeMap.nativeElement.src = `${this.projectInfo.crop?.google_maps_ubication}`;
      }
    }
  }

  loadInformation() {
    this.loadImgs();
    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.getUrlVideo());
  }

  loadImgs() {
    if (this.validImgValue(this.projectInfo.photo_1)) {
      this.imgs.push(this.projectInfo.photo_1 ?? '');
    }
    if (this.validImgValue(this.projectInfo.photo_2)) {
      this.imgs.push(this.projectInfo.photo_2 ?? '');
    }
    if (this.validImgValue(this.projectInfo.photo_3)) {
      this.imgs.push(this.projectInfo.photo_3 ?? '');
    }
    if (this.validImgValue(this.projectInfo.photo_4)) {
      this.imgs.push(this.projectInfo.photo_4 ?? '');
    }
  }

  formatMoney(value?: Number) {
    if (value !== undefined && value !== null) {
      return value.toLocaleString('es-CO');
    }
    return Number(0).toLocaleString('es-CO');
  }

  private getUrlVideo() {
    return `https://www.youtube-nocookie.com/embed/${this.projectInfo.video_url}`;
  }

  doInvestment() {
    let data = this.getInputInvestmentModal("INV");
    this.openModal(InvestmentModalComponent, data);
  }

  doPrecompra() {
    let data = this.getInputInvestmentModal("PRP");
    this.openModal(InvestmentModalComponent, data);
  }

  getInputInvestmentModal(typeTransaction: string): InputInvestmentModal {
    let userInfo = this.authenticationService.getUserAuthenticated();
    return {
      money: "CO",
      projectId: this.projectInfo.code_project,
      paymentType: typeTransaction,
      unit: this.projectInfo.pre_purcharse?.units,
      clientId: userInfo.code_client
    }
  }

  getCityByCodeHtml(code?: string): string {
    if (code !== null && code !== undefined) {
      return getCityByCode(code);
    }
    return "";
  }

  getDeparmentByCodeHtml(code?: string): string {
    if (code !== null && code !== undefined) {
      return getDepartmentByCode(code);
    }
    return "";
  }

  getStateByCode(code?: string): string {
    if (code !== null && code !== undefined) {
      return getStateProjectByCode(code);
    }
    return "";
  }

  getTypeGroundLabel(code?: string): string {
    if (code !== null && code !== undefined) {
      return getTypeGroundByCode(code).split(":")[0];
    }
    return "";
  }


  private validImgValue(value?: string): boolean {
    return value !== undefined && value !== '';
  }
  private redirect(url: string) {
    this.router.navigate([url]);
  }

  private openModal(component: any, data?: any) {
    const dialogRef: MatDialogRef<any> = this.dialog.open(component, {
      data: data
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
