import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeReaderComponent } from './barcode-reader/barcode-reader.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {NgxBarcodeQrcodeSdkModule} from 'ngx-barcode-qrcode-sdk';
// import {NgxBarcodeQrcodeModule} from 'ngx-barcode-qrcode';

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
    NgxBarcodeQrcodeSdkModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
