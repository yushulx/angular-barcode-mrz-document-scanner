import { Component, OnInit } from '@angular/core';
import { NgxBarcodeQrcodeSdkService } from 'ngx-barcode-qrcode-sdk';

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
})
export class BarcodeReaderComponent implements OnInit {
  barcodeResult: string = '';

  constructor(private barcodeQrCodeSdkService: NgxBarcodeQrcodeSdkService) {
  }

  ngOnInit(): void {
  }

  onResultReady(result: string): void {
    this.barcodeResult = result;
  }
}
