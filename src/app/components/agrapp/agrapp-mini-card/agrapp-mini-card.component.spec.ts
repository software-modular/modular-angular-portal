import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappMiniCardComponent } from './agrapp-mini-card.component';

describe('AgrappMiniCardComponent', () => {
  let component: AgrappMiniCardComponent;
  let fixture: ComponentFixture<AgrappMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappMiniCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
