// import { CoreModule } from 'dynamsoft-core';
// import { LicenseManager } from 'dynamsoft-license';
// import 'dynamsoft-barcode-reader';
import { CoreModule, LicenseManager } from 'dynamsoft-barcode-reader-bundle';

// Configure the paths where the .wasm files and other necessary resources for modules are located.
CoreModule.engineResourcePaths = {
  std: 'assets/dynamsoft-capture-vision-std/',
  dip: 'assets/dynamsoft-image-processing/',
  core: 'assets/dynamsoft-core/',
  license: 'assets/dynamsoft-license/',
  cvr: 'assets/dynamsoft-capture-vision-router/',
  dbr: 'assets/dynamsoft-barcode-reader/',
  dce: 'assets/dynamsoft-camera-enhancer/',
};

// Visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr to get a trial license.
LicenseManager.initLicense('DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==', true);


// Preload "BarcodeReader" module for saving the time of loading it when needed.
CoreModule.loadWasm(['DBR']);

export interface Product {
  id: string;
  name: string;
  description: string;
}

export const products = [
  {
    id: 'reader',
    name: 'Barcode and QR Code Reader',
    description: 'Scan barcode and QR code from image files',
  },
  {
    id: 'scanner',
    name: 'Barcode and QR Code Scanner',
    description: 'Scan barcode and QR code from camera stream',
  },
];

