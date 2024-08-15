import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappManageUserComponent } from './agrapp-manage-user.component';

describe('AgrappManageUserComponent', () => {
  let component: AgrappManageUserComponent;
  let fixture: ComponentFixture<AgrappManageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappManageUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappManageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
