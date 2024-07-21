import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappInvestmentsComponent } from './agrapp-investments.component';

describe('AgrappInvestmentsComponent', () => {
  let component: AgrappInvestmentsComponent;
  let fixture: ComponentFixture<AgrappInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappInvestmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
