import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraDetectionComponent } from './camera-detection.component';

describe('CameraDetectionComponent', () => {
  let component: CameraDetectionComponent;
  let fixture: ComponentFixture<CameraDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraDetectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
