import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { BarcodeResultItem, CameraEnhancer, CameraView, CapturedResult, CaptureVisionRouter, DSImageData, EnumCapturedResultItemType, OriginalImageResultItem, Resolution, SimplifiedCaptureVisionSettings } from 'dynamsoft-barcode-reader-bundle';
import { OverlayManager } from '../overlay';
import { DetectedQuadResultItem, DetectedQuadsResult, EnumImageColourMode, NormalizedImageResultItem } from 'dynamsoft-document-normalizer';

const componentDestroyedErrorMsg = 'VideoCapture Component Destroyed';

@Component({
  selector: 'app-camera-detection',
  templateUrl: './camera-detection.component.html',
  styleUrls: ['./camera-detection.component.css']
})
export class CameraDetectionComponent implements OnInit {

  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  cvr: CaptureVisionRouter | undefined;
  overlayManager: OverlayManager;
  cameraInfo: any = {};
  videoSelect: HTMLSelectElement | undefined;
  isNormalized = true;
  captured: any[] = [];
  isDestroyed = false;
  cameraEnhancer?: CameraEnhancer;
  points: any[] = [];
  currentData?: DSImageData;
  detectedResult: DetectedQuadResultItem | undefined;
  isDetecting = false;
  cameraView?: CameraView;

  constructor() {
    this.overlayManager = new OverlayManager();
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    try {
      this.cvr?.dispose();
      this.cameraEnhancer?.dispose();
    } catch (_) { }
  }

  ngOnInit(): void {
    this.videoSelect = document.querySelector('select#videoSource') as HTMLSelectElement;
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    (async () => {
      this.cameraView = await CameraView.createInstance();

      this.cameraEnhancer = await CameraEnhancer.createInstance(this.cameraView);

      this.isLoaded = true;
      let uiElement = document.getElementById('videoContainer');
      if (uiElement) {
        uiElement.append(this.cameraView.getUIElement());

        this.cameraView.getUIElement().shadowRoot?.querySelector('.dce-sel-camera')?.setAttribute('style', 'display: none');
        this.cameraView.getUIElement().shadowRoot?.querySelector('.dce-sel-resolution')?.setAttribute('style', 'display: none');

        let cameras = await this.cameraEnhancer.getAllCameras();
        this.listCameras(cameras);


        this.cvr = await CaptureVisionRouter.createInstance();
        if (this.isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
        this.cvr.setInput(this.cameraEnhancer);

        let settings: SimplifiedCaptureVisionSettings = await this.cvr.getSimplifiedSettings('DetectDocumentBoundaries_Default');
        settings.capturedResultItemTypes |= EnumCapturedResultItemType.CRIT_ORIGINAL_IMAGE;
        await this.cvr!.updateSettings('DetectDocumentBoundaries_Default', settings);

        // Define a callback for results.
        this.cvr.addResultReceiver({
          onCapturedResultReceived: (result: CapturedResult) => {
            this.overlayManager.clearOverlay();

            let txts: any = [];
            try {
              let items = result.items
              if (items.length > 0) {
                for (var i = 0; i < items.length; ++i) {

                  if (items[i].type === EnumCapturedResultItemType.CRIT_DETECTED_QUAD) {
                    this.detectedResult = items[i] as DetectedQuadResultItem;
                    this.points = this.detectedResult.location.points;

                    this.overlayManager.drawOverlay(
                      this.detectedResult.location,
                      ''
                    );
                  }
                  else if (items[i].type === EnumCapturedResultItemType.CRIT_ORIGINAL_IMAGE && !this.isNormalized) {
                    this.isNormalized = true;
                    let item = items[i] as OriginalImageResultItem;
                    this.currentData = item.imageData;
                    this.normalize(item.imageData, this.points);
                    this.toggleDetection();
                    break;
                  }

                }
              }

            } catch (e) {
              throw (e);
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
        if (this.isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
      }
    })();
  }

  async openCamera(): Promise<void> {
    this.overlayManager.clearOverlay();
    if (this.videoSelect) {
      let deviceId = this.videoSelect.value;
      if (this.cameraEnhancer) {
        await this.cameraEnhancer.selectCamera(this.cameraInfo[deviceId]);
        await this.cameraEnhancer.open()
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

  onRadioChange(event: Event) {
    if (!this.cvr) {
      return;
    }

    let target = event.target as HTMLInputElement;
    let colorMode = EnumImageColourMode.ICM_COLOUR;
    if (target.value === 'binary') {
      colorMode = EnumImageColourMode.ICM_BINARY;
    } else if (target.value === 'grayscale') {
      colorMode = EnumImageColourMode.ICM_GRAYSCALE;
    } else if (target.value === 'color') {
      colorMode = EnumImageColourMode.ICM_COLOUR;
    }

    let cvr = this.cvr;
    (async () => {
      let settings: SimplifiedCaptureVisionSettings = await cvr.getSimplifiedSettings('NormalizeDocument_Default');
      settings.documentSettings.colourMode = colorMode;
      await this.cvr!.updateSettings('NormalizeDocument_Default', settings);
      this.normalize(this.currentData!, this.points);
    })();
  }

  async normalize(data: DSImageData, points: any) {
    if (this.cvr) {
      let settings: SimplifiedCaptureVisionSettings = await this.cvr.getSimplifiedSettings('NormalizeDocument_Default');
      settings.roi.points = points;
      settings.roiMeasuredInPercentage = false;
      await this.cvr!.updateSettings('NormalizeDocument_Default', settings);

      this.cvr.capture(data, 'NormalizeDocument_Default').then((normalizedImagesResult: CapturedResult) => {
        if (normalizedImagesResult.items.length === 0) { return; }
        let result = normalizedImagesResult.items[0] as NormalizedImageResultItem;
        let image = document.getElementById('normalizedImage') as HTMLCanvasElement;
        image.width = result.imageData.width;
        image.height = result.imageData.height;
        const destinationContext = image.getContext('2d');
        destinationContext?.drawImage(result.toCanvas(), 0, 0);
      });
    }
  }

  captureDocument() {
    this.isNormalized = false;
  }

  toggleDetection() {
    if (this.isDetecting) {
      this.isDetecting = false;
      this.cvr?.stopCapturing();
      this.cameraView?.clearAllInnerDrawingItems();
      this.overlayManager.clearOverlay();
      let button = document.getElementById('detectButton') as HTMLButtonElement;
      button.textContent = 'Start Detection';
    } else {
      this.isDetecting = true;
      let button = document.getElementById('detectButton') as HTMLButtonElement;
      button.textContent = 'Stop Detection';
      this.cvr?.startCapturing('DetectDocumentBoundaries_Default');
    }
  }

  updateResolution(): void {
    if (this.cameraEnhancer && this.overlayManager) {
      let resolution: Resolution = this.cameraEnhancer.getResolution();
      this.overlayManager.updateOverlay(resolution.width, resolution.height);
    }
  }

}
