import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  imgs: string[] = [
    "https://perfectdailygrind.com/es/wp-content/uploads/sites/2/2019/11/coffee-farm.jpg",
    "https://agrocode.com/wp-content/uploads/sites/2/2019/10/cultivo-cafe.jpg"
  ]
}
