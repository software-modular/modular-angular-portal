import { Component } from '@angular/core';
import { AgrappCardInput } from '../../core/domain/beans/agrappCardInput';

@Component({
  selector: 'app-agrapp-projects',
  templateUrl: './agrapp-projects.component.html',
  styleUrl: './agrapp-projects.component.css'
})
export class AgrappProjectsComponent {
  cards: AgrappCardInput[] = [{
    ownerName: "Juan Camilo Aranda",
    redirect: true,
    urlRedirect: "portal/login",
    nameCrop: "Cultivo Café",
    ubication: "Palmira - Valle",
    minInvestment: 200000,
    percentageProfit: "13% de retorno efetivo anual",
    investmentTarget: 5000000,
    partners: 1,
    funded: 200000,
    imgs: [
      "https://perfectdailygrind.com/es/wp-content/uploads/sites/2/2019/11/coffee-farm.jpg",
      "https://agrocode.com/wp-content/uploads/sites/2/2019/10/cultivo-cafe.jpg"
    ]
  }]
}
