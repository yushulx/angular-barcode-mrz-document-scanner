
export interface Product {
  id: string;
  name: string;
  description: string;
}

export const products = [
  {
    id: 'reader',
    name: 'Barcode and QR Code Reader (File)',
    description: 'Scan barcode and QR code from image files',
  },
  {
    id: 'scanner',
    name: 'Barcode and QR Code Scanner (Camera)',
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
    name: 'MRZ Reader (File)',
    description: 'Scan MRZ from image files',
  },
  {
    id: 'mrz-scanner',
    name: 'MRZ Scanner (Camera)',
    description: 'Scan MRZ from camera stream',
  },
  {
    id: 'document-viewer',
    name: 'Document Viewer (File)',
    description: 'View, edit and save documents',
  },

  {
    id: 'acquire-image',
    name: 'Acquire Image (TWAIN/SANE/ICA Scanner)',
    description: 'The basic document scanning functionality',
  },
  {
    id: 'image-editor',
    name: 'Image Editor (TWAIN/SANE/ICA Scanner)',
    description: 'Image editing: rotate, mirror, flip and more',
  },
];

