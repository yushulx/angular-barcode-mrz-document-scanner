
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
  {
    id: 'file-detection',
    name: 'Document Detector (File)',
    description: 'Detect document from image files',
  },
  {
    id: 'camera-detection',
    name: 'Document Scanner (Camera)',
    description: 'Detect document from camera stream',
  },
];

