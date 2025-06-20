import { Component } from '@angular/core';

import { products } from '../products';

import { CoreModule, LicenseManager } from 'dynamsoft-capture-vision-bundle';

import { SharedService } from '../shared.service';
import { getFullUrl } from '../utils';
import { DDV } from 'dynamsoft-document-viewer';
import Dynamsoft from 'dwt';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  isLoading = false;
  products = products;
  inputText: string = '';
  processedText: string = '';
  placeholderText: string = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==';

  constructor(private sharedService: SharedService) {
  }

  async activate(): Promise<void> {
    this.isLoading = true;
    this.processedText = this.inputText.toUpperCase();
    // Configure the paths where the .wasm files and other necessary resources for modules are located.
    CoreModule.engineResourcePaths = {
      dcvBundle: getFullUrl('assets/dynamsoft-capture-vision-bundle/'),
      dcvData: getFullUrl('assets/dynamsoft-capture-vision-data/'),
      dwt: getFullUrl('assets/dynamic-web-twain/'),
    };

    try {
      // Visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dcv&package=cross-platform to get a trial license for capture vision suite.
      let licenseKey: string = this.inputText === '' ? this.placeholderText : this.inputText;
      await LicenseManager.initLicense(licenseKey, { executeNow: true });

      // DDV.Core.license = licenseKey;
      DDV.Core.engineResourcePath = getFullUrl('assets/dynamsoft-document-viewer/engine/');
      await DDV.Core.init();
      DDV.setProcessingHandler("imageFilter", new DDV.ImageFilter());
      // Preload wasm files for saving the time of loading it when needed.
      // await CoreModule.loadWasm(['DBR', 'DDN']);

      this.sharedService.setShowDiv(true);

      // DWT
      Dynamsoft.DWT.ProductKey = licenseKey;
      Dynamsoft.DWT.ResourcesPath = "assets/dynamic-web-twain";
      Dynamsoft.DWT.UseLocalService = true;
    } catch (error) {
      console.log(error);
    }

    this.isLoading = false;
  }

  get showDiv(): boolean {
    return this.sharedService.getShowDiv();
  }
}
