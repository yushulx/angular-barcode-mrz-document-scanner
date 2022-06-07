# Angular Barcode and QR Code Scanner

This project demonstrates how to build an Angular barcode and QR code scanner with [Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/).

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

## Online Coding
[https://stackblitz.com/edit/angular-9f1xyn](https://stackblitz.com/edit/angular-9f1xyn)

## Usage
1. Apply for a [30-day free trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr) of Dynamsoft Barcode SDK.
2. Update the license key in `products.ts` file:
    
    ```typescript
    BarcodeReader.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==';
    ```
3. Install the dependencies:
    
    ```bash
    npm install
    ```

4. `HTTPS` is required for web camera access. Run the Angular application as follows:
    
    ```bash
    ng serve --ssl
    ```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

