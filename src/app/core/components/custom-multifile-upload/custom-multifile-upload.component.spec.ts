import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMultifileUploadComponent } from './custom-multifile-upload.component';

describe('CustomMultifileUploadComponent', () => {
  let component: CustomMultifileUploadComponent;
  let fixture: ComponentFixture<CustomMultifileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomMultifileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMultifileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
