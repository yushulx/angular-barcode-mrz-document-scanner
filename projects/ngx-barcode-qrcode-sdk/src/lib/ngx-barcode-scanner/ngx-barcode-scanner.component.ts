import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';
import { OverlayManager } from '../overlay';

@Component({
  selector: 'ngx-barcode-scanner',
  templateUrl: './ngx-barcode-scanner.component.html',
  styleUrls: ['./ngx-barcode-scanner.component.css'],
})
export class NgxBarcodeScannerComponent implements OnInit {
  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  scanner: BarcodeScanner | undefined;
  cameraInfo: any = {};
  videoSelect: HTMLSelectElement | undefined;
  overlayManager: OverlayManager;

  @Output() result = new EventEmitter<string>();

  constructor() { 
    this.overlayManager = new OverlayManager();
  }

  ngOnInit(): void {
    this.videoSelect = document.querySelector('select#videoSource') as HTMLSelectElement;
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    (async () => {
      await this.initBarcodeScanner();
    })();
  }

  updateResolution(): void {
    if (this.scanner) {
      let resolution = this.scanner.getResolution();
      this.overlayManager.updateOverlay(resolution[0], resolution[1]);
    }
  }

  async initBarcodeScanner(): Promise<void> {
    this.scanner = await BarcodeScanner.createInstance();
    this.isLoaded = true;
    await this.scanner.updateRuntimeSettings("speed");
    let uiElement = document.getElementById('videoContainer');
    if (uiElement) {
      await this.scanner.setUIElement(uiElement);
      let cameras = await this.scanner.getAllCameras();
      this.listCameras(cameras);
      await this.openCamera();
      this.scanner.onFrameRead = results => {
        this.overlayManager.clearOverlay();

        let txts: any = [];
        try {
          let localization;
          if (results.length > 0) {
            for (var i = 0; i < results.length; ++i) {
              txts.push(results[i].barcodeText);
              localization = results[i].localizationResult;
              this.overlayManager.drawOverlay(localization, results[i].barcodeText);
            }
            this.result.emit(txts.join(', '));
          }
          else {
            this.result.emit(txts.join(', '));
          }

        } catch (e) {
          alert(e);
        }
      };
      this.scanner.onPlayed = () => {
        this.updateResolution();
      }
      await this.scanner.show();
    }
  }

  async openCamera(): Promise<void> {
    this.overlayManager.clearOverlay();
    if (this.videoSelect) {
      let deviceId = this.videoSelect.value;
      if (this.scanner) {
        await this.scanner.setCurrentCamera(this.cameraInfo[deviceId]);
      }
    }

  }

  listCameras(deviceInfos: any): void {
    for (var i = 0; i < deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      option.text = deviceInfo.label;
      this.cameraInfo[deviceInfo.deviceId] = deviceInfo;
      if (this.videoSelect) this.videoSelect.appendChild(option);
    }
  }
}
