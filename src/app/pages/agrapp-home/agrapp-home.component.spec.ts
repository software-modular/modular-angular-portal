import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
