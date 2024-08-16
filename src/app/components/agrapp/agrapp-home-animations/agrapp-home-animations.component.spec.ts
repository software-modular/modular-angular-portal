import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappHomeAnimationsComponent } from './agrapp-home-animations.component';

describe('AgrappHomeAnimationsComponent', () => {
  let component: AgrappHomeAnimationsComponent;
  let fixture: ComponentFixture<AgrappHomeAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappHomeAnimationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappHomeAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
