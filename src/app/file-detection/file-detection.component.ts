import { Component, OnInit } from '@angular/core';
import { OverlayManager } from '../overlay';
import { CapturedResult, CaptureVisionRouter, SimplifiedCaptureVisionSettings } from 'dynamsoft-barcode-reader-bundle';
import { DetectedQuadResultItem, EnumImageColourMode, NormalizedImageResultItem } from 'dynamsoft-document-normalizer';

@Component({
  selector: 'app-file-detection',
  templateUrl: './file-detection.component.html',
  styleUrls: ['./file-detection.component.css']
})
export class FileDetectionComponent implements OnInit {
  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  cvr: CaptureVisionRouter | undefined;
  overlayManager: OverlayManager;
  points: any[] = [];
  currentFile: File | undefined;
  NormalizeDocument_Color: string = "NormalizeDocument_Color";
  NormalizeDocument_Binary: string = "NormalizeDocument_Binary";
  NormalizeDocument_Gray: string = "NormalizeDocument_Gray";

  constructor() {
    this.overlayManager = new OverlayManager();
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    (async () => {
      this.cvr = await CaptureVisionRouter.createInstance();
      this.isLoaded = true;
    })();
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
      this.normalize(this.currentFile!, this.points);
    })();
  }

  async normalize(file: File, points: any) {
    if (this.cvr) {
      let settings: SimplifiedCaptureVisionSettings = await this.cvr.getSimplifiedSettings('NormalizeDocument_Default');
      settings.roi.points = points;
      settings.roiMeasuredInPercentage = false;
      await this.cvr!.updateSettings('NormalizeDocument_Default', settings);

      this.cvr.capture(file, 'NormalizeDocument_Default').then((normalizedImagesResult: CapturedResult) => {
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

  onChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file = fileList.item(0) as any;
      if (file) {
        this.currentFile = file;
        let fr = new FileReader();
        fr.onload = (event: any) => {
          let image = document.getElementById('image') as HTMLImageElement;
          if (image) {
            image.src = event.target.result;
            const img = new Image();

            img.onload = async (event: any) => {
              this.overlayManager.updateOverlay(img.width, img.height);
              if (this.cvr) {
                let capturedResult: CapturedResult = await this.cvr.capture(file, 'DetectDocumentBoundaries_Default');
                if (capturedResult.items.length > 0) {
                  let result = capturedResult.items[0] as DetectedQuadResultItem;
                  this.points = result.location.points;
                  this.overlayManager.drawOverlay(
                    result.location,
                    ''
                  );
                  this.normalize(file, this.points);
                }
              }
            };
            img.src = event.target.result;
          }
        };
        fr.readAsDataURL(file);
      }
    }
  }

}
