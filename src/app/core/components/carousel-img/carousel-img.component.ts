import { Component, Input } from '@angular/core';

@Component({
  selector: 'carousel-img',
  templateUrl: './carousel-img.component.html',
  styleUrl: './carousel-img.component.css'
})
export class CarouselImgComponent {
  imgDefault: string = "/assets/img/carousel/img-carousel-not-found.svg";
  @Input() imgs: string[] = [];
  @Input() carouselId: string = "carousel";
  @Input() heightImg: string = "250px";
}
