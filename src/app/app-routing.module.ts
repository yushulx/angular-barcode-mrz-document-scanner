import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { BarcodeReaderComponent } from './barcode-reader/barcode-reader.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { FileDetectionComponent } from './file-detection/file-detection.component';
import { CameraDetectionComponent } from './camera-detection/camera-detection.component';
import { MrzReaderComponent } from './mrz-reader/mrz-reader.component';
import { MrzScannerComponent } from './mrz-scanner/mrz-scanner.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'barcode-reader', component: BarcodeReaderComponent },
  { path: 'barcode-scanner', component: BarcodeScannerComponent },
  { path: 'file-detection', component: FileDetectionComponent },
  { path: 'camera-detection', component: CameraDetectionComponent },
  { path: 'mrz-reader', component: MrzReaderComponent },
  { path: 'mrz-scanner', component: MrzScannerComponent },
  { path: 'document-viewer', component: DocumentViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
