import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< Updated upstream:src/app/pages/agrapp-home/agrapp-home.component.spec.ts
import { AgrappHomeComponent } from './agrapp-home.component';

describe('AgrappHomeComponent', () => {
  let component: AgrappHomeComponent;
  let fixture: ComponentFixture<AgrappHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappHomeComponent);
=======
import { InputTextAreaComponent } from './input-text-area.component';

describe('InputTextAreaComponent', () => {
  let component: InputTextAreaComponent;
  let fixture: ComponentFixture<InputTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTextAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTextAreaComponent);
>>>>>>> Stashed changes:src/app/core/components/input-text-area/input-text-area.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
