import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeReaderComponent } from './barcode-reader/barcode-reader.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FileDetectionComponent } from './file-detection/file-detection.component';
import { CameraDetectionComponent } from './camera-detection/camera-detection.component';
import { MrzReaderComponent } from './mrz-reader/mrz-reader.component';
import { MrzScannerComponent } from './mrz-scanner/mrz-scanner.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { AcquireImageComponent } from './acquire-image/acquire-image.component';
import { ImageEditorComponent } from './image-editor/image-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BarcodeReaderComponent,
    BarcodeScannerComponent,
    ProductListComponent,
    TopBarComponent,
    FileDetectionComponent,
    CameraDetectionComponent,
    MrzReaderComponent,
    MrzScannerComponent,
    DocumentViewerComponent,
    AcquireImageComponent,
    ImageEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
