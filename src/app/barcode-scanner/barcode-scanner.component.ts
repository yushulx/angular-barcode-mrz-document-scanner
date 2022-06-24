import { Component, OnInit } from '@angular/core';
import { NgxBarcodeQrcodeSdkService } from 'ngx-barcode-qrcode-sdk';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
})
export class BarcodeScannerComponent implements OnInit {
  barcodeResult: string = '';
  constructor(private barcodeQrCodeSdkService: NgxBarcodeQrcodeSdkService) {
  }

  ngOnInit(): void {
  }

  onResultReady(result: string): void {
    this.barcodeResult = result;
  }
}
