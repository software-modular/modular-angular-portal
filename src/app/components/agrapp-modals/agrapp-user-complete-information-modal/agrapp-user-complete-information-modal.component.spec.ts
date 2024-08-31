import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappUserCompleteInformationModalComponent } from './agrapp-user-complete-information-modal.component';

describe('AgrappUserCompleteInformationModalComponent', () => {
  let component: AgrappUserCompleteInformationModalComponent;
  let fixture: ComponentFixture<AgrappUserCompleteInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappUserCompleteInformationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappUserCompleteInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
