
export interface Product {
  id: string;
  name: string;
  description: string;
  route: string;
}

export const products = [
  {
    id: 'reader',
    name: 'Barcode and QR Code Reader (File)',
    description: 'Scan barcode and QR code from image files',
    route: 'barcode-reader',
  },
  {
    id: 'scanner',
    name: 'Barcode and QR Code Scanner (Camera)',
    description: 'Scan barcode and QR code from camera stream',
    route: 'barcode-scanner',
  },
  {
    id: 'file-detection',
    name: 'Document Detector (File)',
    description: 'Detect document from image files',
    route: 'file-detection',
  },
  {
    id: 'camera-detection',
    name: 'Document Scanner (Camera)',
    description: 'Detect document from camera stream',
    route: 'camera-detection',
  },
  {
    id: 'mrz-reader',
    name: 'MRZ Reader (File)',
    description: 'Scan MRZ from image files',
    route: 'mrz-reader',
  },
  {
    id: 'mrz-scanner',
    name: 'MRZ Scanner (Camera)',
    description: 'Scan MRZ from camera stream',
    route: 'mrz-scanner',
  },
  {
    id: 'document-viewer',
    name: 'Document Viewer (File)',
    description: 'View, edit and save documents',
    route: 'document-viewer',
  },

  {
    id: 'acquire-image',
    name: 'Acquire Image (TWAIN/SANE/ICA Scanner)',
    description: 'The basic document scanning functionality',
    route: 'acquire-image',
  },
  {
    id: 'image-editor',
    name: 'Image Editor (TWAIN/SANE/ICA Scanner)',
    description: 'Image editing: rotate, mirror, flip and more',
    route: 'image-editor',
  },
];
