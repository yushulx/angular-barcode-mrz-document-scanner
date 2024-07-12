# Angular Barcode and QR Code Scanner
This project demonstrates how to build an Angular barcode and QR code scanner using the [Dynamsoft JavaScript Barcode SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/).

https://github.com/user-attachments/assets/98de98b3-ac28-49a6-a520-11202e48e7ca

## Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- Angular CLI 

    ```bash
    npm install -g @angular/cli
    ng --version
    ```
- [Dynamsoft Barcode Reader Trial License](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr)

## Online Demo
[Try the Demo](https://yushulx.me/angular-barcode-qr-code-scanner/)


## Usage
1. **Obtain a License**: Get a [30-day free trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr) for Dynamsoft Barcode SDK and update the license key in `products.ts` file.
    
    ```typescript
    LicenseManager.initLicense('LICENSE-KEY', true);
    ```
    
2. **Install dependencies**:
    
    ```bash
    npm install
    ```

3. **Run the Application**:
    
    ```bash
    ng serve --ssl
    ```
    
    ![Angular Barcode and QR Code scanner](https://www.dynamsoft.com/codepool/img/2022/06/angular-barcode-qrcode-scanner.png)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Blog
[How to Build Angular Barcode and QR Code Scanner Apps from Scratch](https://www.dynamsoft.com/codepool/angular-barcode-qr-code-scanner.html)
