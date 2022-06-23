import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
})
export class BarcodeReaderComponent implements OnInit {
  barcodeResult: string = '';

  ngOnInit(): void {
  }

  onResultReady(result: string): void {
    this.barcodeResult = result;
  }
}
