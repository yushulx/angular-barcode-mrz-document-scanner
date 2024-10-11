import { Component, OnInit } from '@angular/core';
import { OverlayManager } from '../overlay';
import { BarcodeResultItem, CameraEnhancer, CameraView, CapturedResult, CaptureVisionRouter, EnumCapturedResultItemType, MultiFrameResultCrossFilter, Resolution } from 'dynamsoft-capture-vision-bundle';

const componentDestroyedErrorMsg = 'VideoCapture Component Destroyed';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements OnInit {
  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  cameraInfo: any = {};
  videoSelect: HTMLSelectElement | undefined;
  overlayManager: OverlayManager;
  cvr?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;
  isDestroyed = false;

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

  ngOnDestroy(): void {
    this.isDestroyed = true;
    try {
      this.cvr?.dispose();
      this.cameraEnhancer?.dispose();
    } catch (_) { }
  }

  updateResolution(): void {
    if (this.cameraEnhancer && this.overlayManager) {
      let resolution: Resolution = this.cameraEnhancer.getResolution();
      this.overlayManager.updateOverlay(resolution.width, resolution.height);
    }
  }

  async initBarcodeScanner(): Promise<void> {
    const cameraView: CameraView = await CameraView.createInstance();

    this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);

    this.isLoaded = true;
    let uiElement = document.getElementById('videoContainer');
    if (uiElement) {
      uiElement.append(cameraView.getUIElement());

      cameraView.getUIElement().shadowRoot?.querySelector('.dce-sel-camera')?.setAttribute('style', 'display: none');
      cameraView.getUIElement().shadowRoot?.querySelector('.dce-sel-resolution')?.setAttribute('style', 'display: none');

      let cameras = await this.cameraEnhancer.getAllCameras();
      this.listCameras(cameras);


      this.cvr = await CaptureVisionRouter.createInstance();
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
      this.cvr.setInput(this.cameraEnhancer);

      // Define a callback for results.
      this.cvr.addResultReceiver({
        onCapturedResultReceived: (result: CapturedResult) => {
          this.overlayManager.clearOverlay();
          let txts: any = [];
          let resultElement = document.getElementById('result');
          try {
            let localization;
            let items = result.items
            if (items.length > 0) {
              for (var i = 0; i < items.length; ++i) {

                if (items[i].type !== EnumCapturedResultItemType.CRIT_BARCODE) {
                  continue; // check if captured result item is a barcode
                }

                let item = items[i] as BarcodeResultItem;

                txts.push(item.text);
                localization = item.location;
                console.log(localization);
                this.overlayManager.drawOverlay(
                  localization,
                  item.text
                );
              }

              if (resultElement) {
                resultElement.innerHTML = txts.join(', ');
              }
            }

          } catch (e) {
            alert(e);
          }
        },
      });

      this.cvr.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          if (!result.barcodeResultItems.length) return;

          console.log(result);
        },
      });

      this.cameraEnhancer.on('played', () => {
        this.updateResolution();
      });
      await this.openCamera();
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
      await this.cvr.startCapturing('ReadSingleBarcode');
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
    }
  }

  async openCamera(): Promise<void> {
    this.overlayManager.clearOverlay();
    if (this.videoSelect) {
      let deviceId = this.videoSelect.value;
      if (this.cameraEnhancer) {
        await this.cameraEnhancer.selectCamera(deviceId);
        await this.cameraEnhancer.open();
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
