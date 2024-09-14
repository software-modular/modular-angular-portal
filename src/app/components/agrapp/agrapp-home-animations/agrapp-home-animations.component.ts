import { AfterContentChecked, AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-agrapp-home-animations',
  templateUrl: './agrapp-home-animations.component.html',
  styleUrl: './agrapp-home-animations.component.css'
})
export class AgrappHomeAnimationsComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      const elements = document.querySelectorAll(".svg");
      if (elements.length > 0) {
        const duration = 5;
        gsap.fromTo(".svg",
          { opacity: 0 },
          { opacity: 1, duration, repeat: -1, yoyo: true, stagger: duration }
        );
      }
    }
  }
}
