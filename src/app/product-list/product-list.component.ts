import { Component } from '@angular/core';

import { products } from '../products';

import { CoreModule, LicenseManager } from 'dynamsoft-barcode-reader-bundle';

import { SharedService } from '../shared.service';

import 'dynamsoft-document-normalizer';
import 'dynamsoft-label-recognizer';
import 'dynamsoft-code-parser';

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
      std: '/assets/dynamsoft-capture-vision-std/',
      dip: '/assets/dynamsoft-image-processing/',
      core: '/assets/dynamsoft-core/',
      license: '/assets/dynamsoft-license/',
      cvr: '/assets/dynamsoft-capture-vision-router/',
      dbr: '/assets/dynamsoft-barcode-reader/',
      dce: '/assets/dynamsoft-camera-enhancer/',
      ddn: '/assets/dynamsoft-document-normalizer/',
      dlr: '/assets/dynamsoft-label-recognizer/',
      dcp: '/assets/dynamsoft-code-parser/',
      dnn: '/assets/dynamsoft-capture-vision-dnn/',
      dlrData: '/assets/dynamsoft-label-recognizer-data',
    };

    try {
      // Visit https://www.dynamsoft.com/customer/license/trialLicense to get a trial license for capture vision suite.
      let licenseKey: string = this.inputText === '' ? this.placeholderText : this.inputText;
      await LicenseManager.initLicense(licenseKey, true);


      // Preload wasm files for saving the time of loading it when needed.
      // await CoreModule.loadWasm(['DBR', 'DDN']);

      this.toggleDivVisibility();
    } catch (error) {
      throw (error);
    }

  }

  toggleDivVisibility(): void {
    this.sharedService.toggleShowDiv();
  }

  get showDiv(): boolean {
    return this.sharedService.getShowDiv();
  }
}
