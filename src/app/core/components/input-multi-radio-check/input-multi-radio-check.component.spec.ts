import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMultiRadioCheckComponent } from './input-multi-radio-check.component';

describe('InputMultiRadioCheckComponent', () => {
  let component: InputMultiRadioCheckComponent;
  let fixture: ComponentFixture<InputMultiRadioCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputMultiRadioCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMultiRadioCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
