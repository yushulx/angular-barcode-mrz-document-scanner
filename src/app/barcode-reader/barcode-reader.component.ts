import { Component, OnInit } from '@angular/core';
import { OverlayManager } from '../overlay';
import { CapturedResult, CaptureVisionRouter, BarcodeResultItem, EnumCapturedResultItemType } from 'dynamsoft-barcode-reader-bundle';

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

  constructor() {
    this.overlayManager = new OverlayManager();
  }

  ngOnInit(): void {
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    (async () => {
      this.cvr = await CaptureVisionRouter.createInstance();
      this.isLoaded = true;
    })();
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

            img.onload = (event: any) => {
              this.overlayManager.updateOverlay(img.width, img.height);
              if (this.cvr) {

                this.cvr.capture(file, 'ReadBarcodes_Balance').then((result: CapturedResult) => {
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
                        console.log(localization);
                        this.overlayManager.drawOverlay(
                          localization,
                          item.text
                        );
                      }

                      if (elem) {
                        elem.innerHTML = txts.join(', ');
                      }
                    } else {
                      if (elem) {
                        elem.innerHTML = txts.join(', ');
                      }
                    }
                  } catch (e) {
                    alert(e);
                  }
                });
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
