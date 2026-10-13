import { Component, OnInit } from '@angular/core';

import { products } from '../products';

import { SharedService } from '../shared.service';
import { SdkService } from '../sdk.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  isLoading = false;
  products = products;
  inputText: string = '';
  placeholderText: string = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==';

  /* The hosted demo activates on its own (see SdkService) — there is no
     license input box and the examples are listed straight away. The
     standalone build keeps the tutorial flow: paste a key, press Activate. */
  readonly demoMode = this.sdk.demoMode;

  constructor(private sharedService: SharedService, public sdk: SdkService) {
  }

  ngOnInit(): void {
    // Demo mode already started activating from the root component; this call
    // is a no-op there. In standalone mode it deliberately does nothing until
    // the user presses Activate.
    if (this.demoMode) {
      this.sdk.init();
    }
  }

  async activate(): Promise<void> {
    this.isLoading = true;
    await this.sdk.activateWithKey(this.inputText === '' ? this.placeholderText : this.inputText);
    if (this.sdk.state === 'ready') {
      this.sharedService.setShowDiv(true);
    }
    this.isLoading = false;
  }

  get activationError(): string {
    return this.sdk.errorMessage;
  }

  /* In demo mode the list is visible as soon as the activation attempt
     finishes (success or failure) so a license problem never leaves the page
     blank. In standalone mode the list stays gated behind a successful
     activation, exactly like the tutorial describes. */
  get showDiv(): boolean {
    if (this.demoMode) {
      return this.sdk.state !== 'loading';
    }
    return this.sharedService.getShowDiv();
  }

  get licenseNote(): string {
    return this.sdk.licenseNote;
  }
}
