import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements OnInit {
  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  scanner: BarcodeScanner | undefined;
  cameraInfo: any = {};
  videoSelect: HTMLSelectElement | undefined;

  constructor() { }

  ngOnInit(): void {
    this.videoSelect = document.querySelector('select#videoSource') as HTMLSelectElement;
    this.initOverlay();
    (async () => {
      await this.initBarcodeScanner();
    })();
  }

  updateResolution(): void {
    if (this.scanner) {
      let resolution = this.scanner.getResolution();
      this.updateOverlay(resolution[0], resolution[1]);
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
        this.clearOverlay();

        let txts = [];
        let resultElement = document.getElementById('result');
        try {
          let localization;
          if (results.length > 0) {
            for (var i = 0; i < results.length; ++i) {
              txts.push(results[i].barcodeText);
              localization = results[i].localizationResult;
              this.drawOverlay(localization, results[i].barcodeText);
            }
            if (resultElement) {
              resultElement.innerHTML = txts.join(', ');
            }
          }
          else {
            if (resultElement) {
              resultElement.innerHTML = "No barcode found";
            }
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
    this.clearOverlay();
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

  initOverlay(): void {
    this.overlay = document.getElementById('overlay') as HTMLCanvasElement;
    this.context = this.overlay.getContext('2d') as CanvasRenderingContext2D;
  }

  updateOverlay(width: number, height: number): void {
    if (this.overlay) {
      this.overlay.width = width;
      this.overlay.height = height;
      this.clearOverlay();
    }
  }

  clearOverlay(): void {
    if (this.context && this.overlay) {
      this.context.clearRect(0, 0, this.overlay.width, this.overlay.height);
      this.context.strokeStyle = '#ff0000';
      this.context.lineWidth = 5;
    }
  }

  drawOverlay(localization: any, text: any): void {
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(localization.x1, localization.y1);
      this.context.lineTo(localization.x2, localization.y2);
      this.context.lineTo(localization.x3, localization.y3);
      this.context.lineTo(localization.x4, localization.y4);
      this.context.lineTo(localization.x1, localization.y1);
      this.context.stroke();

      this.context.font = '18px Verdana';
      this.context.fillStyle = '#ff0000';
      let x = [
        localization.x1,
        localization.x2,
        localization.x3,
        localization.x4,
      ];
      let y = [
        localization.y1,
        localization.y2,
        localization.y3,
        localization.y4,
      ];
      x.sort(function (a, b) {
        return a - b;
      });
      y.sort(function (a, b) {
        return b - a;
      });
      let left = x[0];
      let top = y[0];

      this.context.fillText(text, left, top + 50);
    }
  }
}
