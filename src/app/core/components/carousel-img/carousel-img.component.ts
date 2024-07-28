import { Component, Input } from '@angular/core';

@Component({
  selector: 'carousel-img',
  templateUrl: './carousel-img.component.html',
  styleUrl: './carousel-img.component.css'
})
export class CarouselImgComponent {
  @Input() imgs: string[] = [];
}
