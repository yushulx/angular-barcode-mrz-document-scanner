import { BarcodeReader } from 'dynamsoft-javascript-barcode';

// BarcodeReader.license =
//   'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==';

// BarcodeReader.engineResourcePath = 'assets/dynamsoft-javascript-barcode/';

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

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
