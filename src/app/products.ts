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
