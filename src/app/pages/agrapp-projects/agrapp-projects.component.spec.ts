import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappProjectsComponent } from './agrapp-projects.component';

describe('AgrappProjectsComponent', () => {
  let component: AgrappProjectsComponent;
  let fixture: ComponentFixture<AgrappProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
