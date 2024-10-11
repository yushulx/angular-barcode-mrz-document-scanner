import { Component, OnInit } from '@angular/core';
import { OverlayManager } from '../overlay';
import { CameraEnhancer, CameraView, CapturedResult, CaptureVisionRouter, EnumCapturedResultItemType, Resolution } from 'dynamsoft-capture-vision-bundle';
import { CodeParser, CodeParserModule } from 'dynamsoft-code-parser';
import { LabelRecognizerModule, TextLineResultItem } from 'dynamsoft-label-recognizer';
import { handleMrzParseResult } from '../utils';

const componentDestroyedErrorMsg = 'VideoCapture Component Destroyed';

@Component({
  selector: 'app-mrz-scanner',
  templateUrl: './mrz-scanner.component.html',
  styleUrls: ['./mrz-scanner.component.css']
})
export class MrzScannerComponent implements OnInit {
  isLoaded = false;
  overlay?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  cameraInfo: any = {};
  videoSelect: HTMLSelectElement | undefined;
  overlayManager: OverlayManager;
  cvr?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;
  parser?: CodeParser;
  isDestroyed = false;

  constructor() { this.overlayManager = new OverlayManager(); }

  ngOnInit(): void {
    this.videoSelect = document.querySelector('select#videoSource') as HTMLSelectElement;
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    (async () => {
      await CodeParserModule.loadSpec("MRTD_TD1_ID");
      await CodeParserModule.loadSpec("MRTD_TD2_FRENCH_ID");
      await CodeParserModule.loadSpec("MRTD_TD2_ID");
      await CodeParserModule.loadSpec("MRTD_TD2_VISA");
      await CodeParserModule.loadSpec("MRTD_TD3_PASSPORT");
      await CodeParserModule.loadSpec("MRTD_TD3_VISA");

      await LabelRecognizerModule.loadRecognitionData("MRZ");
      this.cvr = await CaptureVisionRouter.createInstance();
      this.parser = await CodeParser.createInstance();
      let ret = await this.cvr.initSettings('assets/template.json');
      console.log(ret);
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

    let uiElement = document.getElementById('videoContainer');
    if (uiElement) {
      uiElement.append(cameraView.getUIElement());

      cameraView.getUIElement().shadowRoot?.querySelector('.dce-sel-camera')?.setAttribute('style', 'display: none');
      cameraView.getUIElement().shadowRoot?.querySelector('.dce-sel-resolution')?.setAttribute('style', 'display: none');

      let cameras = await this.cameraEnhancer.getAllCameras();
      this.listCameras(cameras);

      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
      this.cvr?.setInput(this.cameraEnhancer);

      // Define a callback for results.
      this.cvr?.addResultReceiver({
        onCapturedResultReceived: async (result: CapturedResult) => {
          this.overlayManager.clearOverlay();
          let txts: any = [];
          let resultElement = document.getElementById('result');
          try {
            let localization;
            let items = result.items
            if (items.length > 0) {
              for (var i = 0; i < items.length; ++i) {

                if (items[i].type !== EnumCapturedResultItemType.CRIT_TEXT_LINE) {
                  continue;
                }

                let item = items[i] as TextLineResultItem;

                txts.push(item.text);
                localization = item.location;
                this.overlayManager.drawOverlay(
                  localization,
                  ''
                );

                let parseResults = await this.parser?.parse(item.text);
                if (resultElement) {
                  resultElement.innerHTML = JSON.stringify(handleMrzParseResult(parseResults!)) + '\n';
                }

                break;
              }

            }
          } catch (e) {
            alert(e);
          }
        },
      });

      this.cameraEnhancer.on('played', () => {
        this.updateResolution();
      });
      await this.openCamera();
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
      await this.cvr?.startCapturing('ReadMRZ');
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }

      this.isLoaded = true;
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
