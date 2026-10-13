import { Component, OnInit } from '@angular/core';
import { OverlayManager } from '../overlay';
import { CapturedResult, CaptureVisionRouter, CodeParser, CodeParserModule, EnumCapturedResultItemType, TextLineResultItem } from 'dynamsoft-capture-vision-bundle';
import { handleMrzParseResult } from '../utils';
import { SdkService } from '../sdk.service';

@Component({
  selector: 'app-mrz-reader',
  templateUrl: './mrz-reader.component.html',
  styleUrls: ['./mrz-reader.component.css']
})
export class MrzReaderComponent implements OnInit {
  isLoaded = false;
  overlay?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  cvr?: CaptureVisionRouter;
  overlayManager: OverlayManager;
  parser?: CodeParser;

  /* Lazily prepared reader: the SDK may still be activating when this page is
     opened via a deep link, and a file chosen before the reader exists must
     not be silently dropped — the upload waits for it instead. */
  private readerReady: Promise<{ cvr: CaptureVisionRouter; parser: CodeParser }> | null = null;

  constructor(private sdk: SdkService) {
    this.overlayManager = new OverlayManager();
  }

  ngOnInit(): void {
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    this.getReader();
  }

  private getReader(): Promise<{ cvr: CaptureVisionRouter; parser: CodeParser }> {
    if (!this.readerReady) {
      this.readerReady = (async () => {
        await this.sdk.whenReady();
        await CodeParserModule.loadSpec("MRTD_TD1_ID");
        await CodeParserModule.loadSpec("MRTD_TD2_FRENCH_ID");
        await CodeParserModule.loadSpec("MRTD_TD2_ID");
        await CodeParserModule.loadSpec("MRTD_TD2_VISA");
        await CodeParserModule.loadSpec("MRTD_TD3_PASSPORT");
        await CodeParserModule.loadSpec("MRTD_TD3_VISA");

        await CaptureVisionRouter.appendDLModelBuffer("MRZCharRecognition");
        await CaptureVisionRouter.appendDLModelBuffer("MRZTextLineRecognition");
        this.cvr = await CaptureVisionRouter.createInstance();
        this.parser = await CodeParser.createInstance();
        let ret = await this.cvr.initSettings('assets/template.json');
        console.log(ret);
        this.isLoaded = true;
        return { cvr: this.cvr, parser: this.parser };
      })();
    }
    return this.readerReady;
  }

  ngOnDestroy() {
    try {
      this.cvr?.dispose();
    } catch (_) { }
  }

  onChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let textarea = document.getElementById('detection_result') as HTMLTextAreaElement;
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
            textarea.value = '';
            img.onload = async (event: any) => {
              this.overlayManager.updateOverlay(img.width, img.height);
              try {
                const { cvr, parser } = await this.getReader();
                const result: CapturedResult = await cvr.capture(file, "ReadMRZ");
                let txts: any = [];
                let items = result.items;
                if (items.length > 0) {

                  for (var i = 0; i < items.length; ++i) {
                    if (items[i].type !== EnumCapturedResultItemType.CRIT_TEXT_LINE) {
                      continue; // check if captured result item is a text line
                    }

                    let item = items[i] as TextLineResultItem;
                    let localization = item.location;
                    this.overlayManager.drawOverlay(
                      localization,
                      ''
                    );

                    txts.push(item.text);

                    textarea.value = txts.join('') + '\n';

                    let parseResults = await parser?.parse(item.text);
                    textarea.value += JSON.stringify(handleMrzParseResult(parseResults!)) + '\n';

                    break;
                  }

                }

                if (txts.length === 0) {
                  textarea.value = 'No MRZ detected.';
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
