import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDetectionComponent } from './file-detection.component';

describe('FileDetectionComponent', () => {
  let component: FileDetectionComponent;
  let fixture: ComponentFixture<FileDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDetectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
