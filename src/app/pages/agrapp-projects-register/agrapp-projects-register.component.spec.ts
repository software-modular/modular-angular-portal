import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappProjectsRegisterComponent } from './agrapp-projects-register.component';

describe('AgrappProjectsRegisterComponent', () => {
  let component: AgrappProjectsRegisterComponent;
  let fixture: ComponentFixture<AgrappProjectsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappProjectsRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappProjectsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
