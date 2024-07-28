import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappProjectsCardComponent } from './agrapp-projects-card.component';

describe('AgrappProjectsCardComponent', () => {
  let component: AgrappProjectsCardComponent;
  let fixture: ComponentFixture<AgrappProjectsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappProjectsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappProjectsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
