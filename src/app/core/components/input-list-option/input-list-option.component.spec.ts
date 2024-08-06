import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputListOptionComponent } from './input-list-option.component';

describe('InputListOptionComponent', () => {
  let component: InputListOptionComponent;
  let fixture: ComponentFixture<InputListOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputListOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputListOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
