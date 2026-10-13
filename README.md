# Angular Capture Vision Examples
This project demonstrates how to utilize the Dynamsoft Capture Vision SDK for detecting **1D/2D barcodes**, **documents**, **MRZ (Machine Readable Zone)**, and more in Angular applications.

## Online Demo
[Try the Demo](https://www.dynamsoft.com/codepool/demos/angular-barcode-mrz-document-scanner/)

The hosted demo on dynamsoft.com activates a domain-bound license automatically — no key or sign-up needed. Cloning and running the project yourself requires your own [Dynamsoft Capture Vision trial license](https://www.dynamsoft.com/customer/license/trialLicense/?product=dcv&package=cross-platform).

## Features
- **Barcode Scanner**

    https://github.com/user-attachments/assets/98de98b3-ac28-49a6-a520-11202e48e7ca

- **Document Scanner**

    https://github.com/user-attachments/assets/17cf6449-f1b6-4644-89fc-d3f5f05009f9

- **MRZ Scanner**

    https://github.com/user-attachments/assets/8fb428fb-7846-4cfc-b659-ddfe36aaa34d

- **Document PDF Viewer**

    https://github.com/user-attachments/assets/d1e0c7ef-2e33-4f96-85e6-f48ceef438c2

- **Scan and annotate documents**

    https://github.com/user-attachments/assets/217aae6e-532f-44ae-af73-c0da3cd82639


   
## Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- Angular CLI 

    ```bash
    npm install -g @angular/cli
    ng --version
    ```
- [Dynamsoft Capture Vision Trial License](https://www.dynamsoft.com/customer/license/trialLicense/?product=dcv&package=cross-platform)

  ![Dynamsoft Capture Vision Trial License](https://www.dynamsoft.com/codepool/img/2024/07/capture-vision-suite-license.png)

## Usage    
1. **Install dependencies**:
    
    ```bash
    npm install
    ```

2. **Run the Application**:
    
    ```bash
    ng serve --ssl
    ```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Hosted demo build (`npm run build:demo`)

`ng build --configuration demo` produces the variant deployed to
[dynamsoft.com/codepool/demos/angular-barcode-mrz-document-scanner/](https://www.dynamsoft.com/codepool/demos/angular-barcode-mrz-document-scanner/):

- No license input box — the SDK activates on page load with a hostname-resolved
  license (Codepool key on dynamsoft.com, SDK trial key anywhere else).
- Engine resources (wasm, models, Document Viewer engine, Web TWAIN resources)
  load from the jsDelivr CDN instead of the local `assets/` copies.
- Hash routing (`#/barcode-reader`, …) so every example is reachable on a
  static host, wrapped in the Codepool demo chrome (`src/index.demo.html`).
- The bundle ships unminified: the CLI's minifier rewrites the SDK's native
  class private fields in a way that breaks class inheritance at runtime.

`node scripts/fix-demo-index.js` (run automatically by `npm run build:demo`)
renames the generated `index.demo.html` to `index.html`.


## Blog
- [How to Build an Angular Barcode & QR Code Detection App: A Step-by-Step Guide](https://www.dynamsoft.com/codepool/angular-barcode-qr-code-scanner.html)
- [How to Detect and Rectify Documents in Angular Web Applications](https://www.dynamsoft.com/codepool/angular-document-edge-detection-rectification.html)
- [Steps to Develop an Angular Passport MRZ Reader & Scanner](https://www.dynamsoft.com/codepool/angular-mrz-reader-scanner.html)
- [Building an Angular Document Viewer for Image Loading, Annotation, and PDF Export](https://www.dynamsoft.com/codepool/angular-document-pdf-viewer-annotation.html)
