import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { BarcodeReaderComponent } from './barcode-reader/barcode-reader.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { FileDetectionComponent } from './file-detection/file-detection.component';
import { CameraDetectionComponent } from './camera-detection/camera-detection.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'barcode-reader', component: BarcodeReaderComponent },
  { path: 'barcode-scanner', component: BarcodeScannerComponent },
  { path: 'file-detection', component: FileDetectionComponent },
  { path: 'camera-detection', component: CameraDetectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
