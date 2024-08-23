import { AfterViewInit, Component, Input } from '@angular/core';
import { AgrappCardInput } from '../../../core/domain/beans/agrappCardInput';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'agrapp-projects-card',
  templateUrl: './agrapp-projects-card.component.html',
  styleUrl: './agrapp-projects-card.component.css'
})
export class AgrappProjectsCardComponent implements AfterViewInit {
  imgsDefault: string[] = ["/assets/img/carousel/img-carousel-not-found.svg"];

  @Input() data: AgrappCardInput = {
    ownerName: "Luis alberto gomez",
    imgs: this.imgsDefault,
    ubication: "Cali - Valle del cauca",
    minInvestment: 5000000,
    funded: 1000000,
    nameCrop: "Cultivo de yuca",
    partners: 2,
    investmentTarget: 10000000,
    percentageProfit: "13",
    redirect: true,
    id: "carousel"
  };

  formCard: FormGroup;
  funded: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.formCard = formBuilder.group({
      "slider": [0, []]
    });
    this.formCard.get('slider')?.valueChanges.subscribe((value) => {
      this.setSliderValue();
    });
  }

  ngAfterViewInit(): void {
    this.setSliderValue();
  }

  setSliderValue() {
    if (this.data.funded !== undefined
      && this.data.investmentTarget !== undefined) {
      this.funded = Number(((100 / this.data.investmentTarget) * this.data.funded).toFixed(1));
      this.formCard.get("slider")?.setValue(this.funded.toFixed(1), { emitEvent: false });
      return;
    }
    this.funded = 0;
    this.formCard.get("slider")?.setValue(this.funded);
  }

  formatLabel(value: number): string {
    return `${value}%`;
  }

  getOwnerName(name?: string): string {
    if (name !== undefined) {
      return `${name.slice(0, name.length - 1)}...`;
    }
    return "";
  }
}
