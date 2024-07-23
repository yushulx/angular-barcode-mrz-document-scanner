import { Component } from '@angular/core';

import { products } from '../products';

import { CoreModule, LicenseManager } from 'dynamsoft-barcode-reader-bundle';

import { SharedService } from '../shared.service';

import 'dynamsoft-document-normalizer';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products = products;
  inputText: string = '';
  processedText: string = '';
  placeholderText: string = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==';

  constructor(private sharedService: SharedService) { }

  async activate(): Promise<void> {
    this.processedText = this.inputText.toUpperCase();
    // Configure the paths where the .wasm files and other necessary resources for modules are located.
    CoreModule.engineResourcePaths = {
      std: 'assets/dynamsoft-capture-vision-std/',
      dip: 'assets/dynamsoft-image-processing/',
      core: 'assets/dynamsoft-core/',
      license: 'assets/dynamsoft-license/',
      cvr: 'assets/dynamsoft-capture-vision-router/',
      dbr: 'assets/dynamsoft-barcode-reader/',
      dce: 'assets/dynamsoft-camera-enhancer/',
      ddn: 'assets/dynamsoft-document-normalizer/',
    };

    try {
      // Visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr to get a trial license.
      let licenseKey: string = this.inputText === '' ? this.placeholderText : this.inputText;
      await LicenseManager.initLicense(licenseKey, true);


      // Preload "BarcodeReader" module for saving the time of loading it when needed.
      await CoreModule.loadWasm(['DBR', 'DDN']);

      this.toggleDivVisibility();
    } catch (error) {
      alert(error);
    }

  }

  toggleDivVisibility(): void {
    this.sharedService.toggleShowDiv();
  }

  get showDiv(): boolean {
    return this.sharedService.getShowDiv();
  }
}
