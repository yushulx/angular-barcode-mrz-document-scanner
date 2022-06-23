import { Component, OnInit } from '@angular/core';
import { NgxBarcodeQrcodeSdkService } from 'ngx-barcode-qrcode-sdk';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
})
export class BarcodeScannerComponent implements OnInit {

  constructor(private barcodeQrCodeSdkService: NgxBarcodeQrcodeSdkService) {
  }

  ngOnInit(): void {
  }
}
