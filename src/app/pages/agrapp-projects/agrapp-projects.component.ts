import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from '../../core/services/project/project.service';
import { ProjectDto } from '../../core/domain/dto/projectDto';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { getCityByCode, getDepartmentByCode } from '../../core/domain/const/Colombia';
import { getStateProjectByCode } from '../../core/domain/const/StateProject';
import { getTypeGroundByCode } from '../../core/domain/const/TypeGround';

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
  @ViewChild('iframeMap') iframeMap!: ElementRef<HTMLIFrameElement>;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sanitizer: DomSanitizer
  ) {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    if (this.projectId !== '') {
      this.projectService.findProjectById(this.projectId).subscribe({
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
    return `https://www.youtube-nocookie.com/embed/tfAveT1Hjcw?si=${this.projectInfo.video_url}`;
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

  private showMessageDialog(titleHeader: string, message: string) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      acceptLabel: "Continuar",
      rejectVisible: false,

    });
  }
}
