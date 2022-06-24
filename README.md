# Angular Barcode and QR Code SDK

This project demonstrates how to build an Angular barcode QR code library with [Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/).

## Development Environment

```bash
ng --version

Angular CLI: 13.3.7
Node: 16.13.1
Package Manager: npm 8.1.2
OS: win32 x64

Angular: 13.3.10
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1303.7
@angular-devkit/build-angular   13.3.7
@angular-devkit/core            13.3.7
@angular-devkit/schematics      13.3.7
@angular/cli                    13.3.7
@schematics/angular             13.3.7
ng-packagr                      13.3.1
rxjs                            7.5.5
typescript                      4.6.4

```

## Online Demo
[https://yushulx.me/angular-barcode-qr-code-scanner/barcode-scanner](https://yushulx.me/angular-barcode-qr-code-scanner/barcode-scanner)


## Debug the Angular Library Project
1. The `ngx-barcode-qrcode-sdk` is located in `projects/ngx-barcode-qrcode-sdk`. Add the `--watch` flag to run incremental build as a background process:

    ```bash
    ng build ngx-barcode-qrcode-sdk --watch
    ```

2. Apply for a [30-day free trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr) of Dynamsoft Barcode SDK and update the license key in `app.module.ts` file:
    
    ```typescript
    NgxBarcodeQrcodeSdkModule.forRoot({ licenseKey: "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==", resourcePath: "assets/dynamsoft-javascript-barcode/" }),
    ```
3. Install the dependencies:
    
    ```bash
    npm install
    ```
4 `HTTPS` is required for web camera access. Run the Angular application as follows:
    
    ```bash
    ng serve --ssl
    ```
    
    ![Angular Barcode and QR Code scanner](https://www.dynamsoft.com/codepool/img/2022/06/angular-barcode-qrcode-scanner.png)

## Publish the Angular Library Project

```bash
ng build ngx-barcode-qrcode-sdk
cd dist/ngx-barcode-qrcode-sdk
npm publish
```


