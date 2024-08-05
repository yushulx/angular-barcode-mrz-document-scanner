import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrzReaderComponent } from './mrz-reader.component';

describe('MrzReaderComponent', () => {
  let component: MrzReaderComponent;
  let fixture: ComponentFixture<MrzReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrzReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrzReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
