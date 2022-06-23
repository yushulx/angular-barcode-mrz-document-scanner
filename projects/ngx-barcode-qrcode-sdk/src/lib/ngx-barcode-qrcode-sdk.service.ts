import { Injectable, Optional } from '@angular/core';
import { BarcodeReader } from 'dynamsoft-javascript-barcode';

export class BarcodeQrcodeSdkServiceConfig {
  licenseKey = '';
  resourcePath = '';
}

@Injectable({
  providedIn: 'root'
})
export class NgxBarcodeQrcodeSdkService {

  constructor(@Optional() config?: BarcodeQrcodeSdkServiceConfig) { 
    if (config) { 
      BarcodeReader.license = config.licenseKey;
      BarcodeReader.engineResourcePath = config.resourcePath;
    }
  }
}
