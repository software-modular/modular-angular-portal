import { AfterViewInit, Component, Input } from '@angular/core';
import { AgrappCardInput } from '../../../core/domain/beans/agrappCardInput';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'agrapp-projects-card',
  templateUrl: './agrapp-projects-card.component.html',
  styleUrl: './agrapp-projects-card.component.css'
})
export class AgrappProjectsCardComponent implements AfterViewInit {
  @Input() data: AgrappCardInput = {};

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
      this.funded = (100 / this.data.investmentTarget) * this.data.funded;
      this.formCard.get("slider")?.setValue(this.funded, { emitEvent: false });
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
