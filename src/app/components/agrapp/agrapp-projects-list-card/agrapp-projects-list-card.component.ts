import { Component, Input, OnInit } from '@angular/core';
import { AgrappCardInput } from '../../../core/domain/beans/agrappCardInput';

@Component({
  selector: 'agrapp-projects-list-card',
  templateUrl: './agrapp-projects-list-card.component.html',
  styleUrl: './agrapp-projects-list-card.component.css'
})
export class AgrappProjectsListCardComponent implements OnInit {
  @Input() projects: AgrappCardInput[] = [];

  constructor() {

  }
  ngOnInit(): void {
  }
}
