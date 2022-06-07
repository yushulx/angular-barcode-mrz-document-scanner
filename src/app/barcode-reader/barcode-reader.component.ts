import { Component, OnInit } from '@angular/core';
import { BarcodeReader } from 'dynamsoft-javascript-barcode';

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.css'],
})
export class BarcodeReaderComponent implements OnInit {
  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  reader: BarcodeReader | undefined;

  constructor() {}

  ngOnInit(): void {
    this.initOverlay();
    (async () => {
      this.reader = await BarcodeReader.createInstance();
      this.isLoaded = true;
    })();
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

  onChange(event: Event) {
    var globalObject = this;
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file = fileList.item(0) as any;
      if (file) {
        let fr = new FileReader();
        fr.onload = function (event: any) {
          let image = document.getElementById('image') as HTMLImageElement;
          if (image) {
            image.src = event.target.result;
            const img = new Image();

            img.onload = (event: any) => {
              globalObject.updateOverlay(img.width, img.height);
              if (globalObject.reader) {
                globalObject.reader.decode(file).then(function (results: any) {
                  console.log(results);
                  let txts: any = [];
                  let elem = document.getElementById('result');
                  try {
                    let localization;
                    if (results.length > 0) {
                      for (var i = 0; i < results.length; ++i) {
                        txts.push(results[i].barcodeText);
                        localization = results[i].localizationResult;
                        globalObject.drawOverlay(
                          localization,
                          results[i].barcodeText
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
