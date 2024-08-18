import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappProjectCarouselComponent } from './agrapp-project-carousel.component';

describe('AgrappProjectCarouselComponent', () => {
  let component: AgrappProjectCarouselComponent;
  let fixture: ComponentFixture<AgrappProjectCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappProjectCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappProjectCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
