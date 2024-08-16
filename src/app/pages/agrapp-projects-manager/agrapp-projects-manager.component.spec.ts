import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappProjectsManagerComponent } from './agrapp-projects-manager.component';

describe('AgrappProjectsManagerComponent', () => {
  let component: AgrappProjectsManagerComponent;
  let fixture: ComponentFixture<AgrappProjectsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappProjectsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappProjectsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
