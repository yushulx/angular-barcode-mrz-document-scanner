import { Component, OnInit } from '@angular/core';
import { OverlayManager } from '../overlay';
import { CapturedResult, CaptureVisionRouter, BarcodeResultItem, EnumCapturedResultItemType } from 'dynamsoft-capture-vision-bundle';
import { SdkService } from '../sdk.service';

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.css'],
})
export class BarcodeReaderComponent implements OnInit {
  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  overlayManager: OverlayManager;
  cvr: CaptureVisionRouter | undefined;

  /* Lazily created router: the SDK may still be activating when this page is
     opened via a deep link, and a file chosen before the router exists must
     not be silently dropped — the upload waits for the router instead. */
  private cvrReady: Promise<CaptureVisionRouter> | null = null;

  constructor(private sdk: SdkService) {
    this.overlayManager = new OverlayManager();
  }

  ngOnInit(): void {
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    this.getCvr();
  }

  private getCvr(): Promise<CaptureVisionRouter> {
    if (!this.cvrReady) {
      this.cvrReady = (async () => {
        await this.sdk.whenReady();
        this.cvr = await CaptureVisionRouter.createInstance();
        this.isLoaded = true;
        return this.cvr;
      })();
    }
    return this.cvrReady;
  }

  ngOnDestroy() {
    try {
      this.cvr?.dispose();
    } catch (_) { }
  }

  onChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file = fileList.item(0) as any;
      if (file) {
        let fr = new FileReader();
        fr.onload = (event: any) => {
          let image = document.getElementById('image') as HTMLImageElement;
          if (image) {
            image.src = event.target.result;
            const img = new Image();

            img.onload = async (event: any) => {
              this.overlayManager.updateOverlay(img.width, img.height);

              try {
                const cvr = await this.getCvr();
                const result: CapturedResult = await cvr.capture(file, 'ReadBarcodes_Balance');
                console.log(result);
                let txts: any = [];
                let elem = document.getElementById('result');
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
                      this.overlayManager.drawOverlay(
                        localization,
                        item.text
                      );
                    }
                  }

                  if (elem) {
                    elem.innerHTML = txts.join(', ');
                  }
                } catch (e) {
                  alert(e);
                }
              } catch (e) {
                alert(e);
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
