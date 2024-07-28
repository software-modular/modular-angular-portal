import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappProjectsListCardComponent } from './agrapp-projects-list-card.component';

describe('AgrappProjectsListCardComponent', () => {
  let component: AgrappProjectsListCardComponent;
  let fixture: ComponentFixture<AgrappProjectsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappProjectsListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappProjectsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
