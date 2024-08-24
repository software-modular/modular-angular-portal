import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappVideoPlayerComponent } from './agrapp-video-player.component';

describe('AgrappVideoPlayerComponent', () => {
  let component: AgrappVideoPlayerComponent;
  let fixture: ComponentFixture<AgrappVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappVideoPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
