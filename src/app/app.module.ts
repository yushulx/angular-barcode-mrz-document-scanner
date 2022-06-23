import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeReaderComponent } from './barcode-reader/barcode-reader.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgxBarcodeQrcodeSdkModule } from 'ngx-barcode-qrcode-sdk';

@NgModule({
  declarations: [
    AppComponent,
    BarcodeReaderComponent,
    BarcodeScannerComponent,
    ProductListComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBarcodeQrcodeSdkModule.forRoot({ licenseKey: "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==", resourcePath: "assets/dynamsoft-javascript-barcode/" }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
