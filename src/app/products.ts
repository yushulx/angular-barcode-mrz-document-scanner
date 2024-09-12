
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
  {
    id: 'mrz-reader',
    name: 'MRZ Reader',
    description: 'Scan MRZ from image files',
  },
  {
    id: 'mrz-scanner',
    name: 'MRZ Scanner',
    description: 'Scan MRZ from camera stream',
  },
  {
    id: 'document-viewer',
    name: 'Document Viewer',
    description: 'View, edit and save documents',
  },

  {
    id: 'acquire-image',
    name: 'Acquire Image',
    description: 'The basic document scanning functionality',
  },
  {
    id: 'image-editor',
    name: 'Image Editor',
    description: 'Image editing: rotate, mirror, flip and more',
  },
];

