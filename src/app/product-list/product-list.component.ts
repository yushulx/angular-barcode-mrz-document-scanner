import { Component } from '@angular/core';

import { products } from '../products';

import { CoreModule, LicenseManager } from 'dynamsoft-barcode-reader-bundle';

import { SharedService } from '../shared.service';

import 'dynamsoft-document-normalizer';
import 'dynamsoft-label-recognizer';
import 'dynamsoft-code-parser';
import { getFullUrl } from '../utils';
import { DDV } from 'dynamsoft-document-viewer';
import Dynamsoft from 'dwt';

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

  constructor(private sharedService: SharedService) {
  }

  async activate(): Promise<void> {

    this.processedText = this.inputText.toUpperCase();
    // Configure the paths where the .wasm files and other necessary resources for modules are located.
    CoreModule.engineResourcePaths = {
      std: getFullUrl('assets/dynamsoft-capture-vision-std/'),
      dip: getFullUrl('assets/dynamsoft-image-processing/'),
      core: getFullUrl('assets/dynamsoft-core/'),
      license: getFullUrl('assets/dynamsoft-license/'),
      cvr: getFullUrl('assets/dynamsoft-capture-vision-router/'),
      dbr: getFullUrl('assets/dynamsoft-barcode-reader/'),
      dce: getFullUrl('assets/dynamsoft-camera-enhancer/'),
      ddn: getFullUrl('assets/dynamsoft-document-normalizer/'),
      dlr: getFullUrl('assets/dynamsoft-label-recognizer/'),
      dcp: getFullUrl('assets/dynamsoft-code-parser/'),
      dnn: getFullUrl('assets/dynamsoft-capture-vision-dnn/'),
      dlrData: getFullUrl('assets/dynamsoft-label-recognizer-data/'),
    };

    try {
      // Visit https://www.dynamsoft.com/customer/license/trialLicense to get a trial license for capture vision suite.
      let licenseKey: string = this.inputText === '' ? this.placeholderText : this.inputText;
      await LicenseManager.initLicense(licenseKey, true);

      // DDV.Core.license = licenseKey;
      DDV.Core.engineResourcePath = getFullUrl('assets/dynamsoft-document-viewer/engine/');
      await DDV.Core.init();
      DDV.setProcessingHandler("imageFilter", new DDV.ImageFilter());
      // Preload wasm files for saving the time of loading it when needed.
      // await CoreModule.loadWasm(['DBR', 'DDN']);

      this.toggleDivVisibility();

      // DWT
      Dynamsoft.DWT.ProductKey = licenseKey;
      Dynamsoft.DWT.ResourcesPath = "assets/dynamic-web-twain";
      Dynamsoft.DWT.UseLocalService = true;
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
