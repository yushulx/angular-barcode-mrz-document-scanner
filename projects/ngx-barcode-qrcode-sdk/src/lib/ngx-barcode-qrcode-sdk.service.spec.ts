import { TestBed } from '@angular/core/testing';

import { NgxBarcodeQrcodeSdkService } from './ngx-barcode-qrcode-sdk.service';

describe('NgxBarcodeQrcodeSdkService', () => {
  let service: NgxBarcodeQrcodeSdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBarcodeQrcodeSdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
