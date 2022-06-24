# ngx-barcode-qrcode-sdk

Angular Barcode and QR Code scanning library based on [Dynamsoft JavaScript Barcode SDK](https://www.npmjs.com/package/dynamsoft-javascript-barcode).

## Online Demo
[https://yushulx.me/angular-barcode-qr-code-scanner/barcode-scanner](https://yushulx.me/angular-barcode-qr-code-scanner/barcode-scanner)

## Usage
Install the Angular library:

```bash
npm install ngx-barcode-qrcode-sdk --save
``` 

Import the module in your project's main module `app.module.ts`:

```typescript
import { NgxBarcodeQrcodeSdkModule } from 'ngx-barcode-qrcode-sdk';

@NgModule({
  imports: [
    ...
    NgxBarcodeQrcodeSdkModule.forRoot({ licenseKey: "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==", resourcePath: "assets/dynamsoft-javascript-barcode/" }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

- `licenseKey`: get the license key from [Dynamsoft customer portal](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr)
- `resourcePath`: configure the static resources in `angular.json`, and assign the output path to `resourcePath`:

    ```json
    "build": {
        "builder": "@angular-devkit/build-angular:browser",
        ...
        "assets": [
            "src/favicon.ico",
            "src/assets",
            {
            "glob": "**/*",
            "input": "./node_modules/dynamsoft-javascript-barcode/dist",
            "output": "assets/dynamsoft-javascript-barcode"
            }
        ],
        ...
    }
    ```

After generating a new component, inject the `NgxBarcodeQrcodeSdkService`:

```bash
ng generate component foo
```

```typescript
import { Component, OnInit } from '@angular/core';
import { NgxBarcodeQrcodeSdkService } from 'ngx-barcode-qrcode-sdk';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
})
export class FooComponent implements OnInit {
  constructor(private barcodeQrCodeSdkService: NgxBarcodeQrcodeSdkService) {
  }

  ngOnInit(): void {
  }
}
```


## API
- `<ngx-barcode-reader(result)="onResultReady($event)"></ngx-barcode-reader>`: the component to scan barcode and QR code from image files.
    - `result`: called when barcode and QR code are found

    ![Angular barcode QR code reader](https://www.dynamsoft.com/codepool/img/2022/06/angular-barcode-qrcode-reader-library.png)

- `<ngx-barcode-scanner(result)="onResultReady($event)"></ngx-barcode-scanner>`: the component to scan barcode and QR code from video stream.
    - `result`: called when barcode and QR code are found
    
    ![Angular barcode QR code scanner](https://www.dynamsoft.com/codepool/img/2022/06/angular-barcode-qrcode-scanner-library.png)