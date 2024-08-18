import { Component, Input } from '@angular/core';
import { AgrappCardInput } from '../../../core/domain/beans/agrappCardInput';

@Component({
  selector: 'app-agrapp-project-carousel',
  templateUrl: './agrapp-project-carousel.component.html',
  styleUrl: './agrapp-project-carousel.component.css'
})
export class AgrappProjectCarouselComponent {
  @Input() projects: AgrappCardInput[] = []

  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

}
