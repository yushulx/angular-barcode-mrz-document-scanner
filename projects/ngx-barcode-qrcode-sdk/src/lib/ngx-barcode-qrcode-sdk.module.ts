import { NgModule } from '@angular/core';
import { NgxBarcodeReaderComponent } from './ngx-barcode-reader/ngx-barcode-reader.component';
import { NgxBarcodeScannerComponent } from './ngx-barcode-scanner/ngx-barcode-scanner.component';


@NgModule({
  declarations: [
    NgxBarcodeReaderComponent,
    NgxBarcodeScannerComponent,
  ],
  imports: [
  ],
  exports: [
    NgxBarcodeReaderComponent,
    NgxBarcodeScannerComponent,
  ]
})
export class NgxBarcodeQrcodeSdkModule { }
