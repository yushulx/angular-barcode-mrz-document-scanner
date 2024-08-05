import { Component, OnInit } from '@angular/core';
import { OverlayManager } from '../overlay';
import { CapturedResult, CaptureVisionRouter, EnumCapturedResultItemType } from 'dynamsoft-barcode-reader-bundle';
import { LabelRecognizerModule, TextLineResultItem } from 'dynamsoft-label-recognizer';
import { CodeParser, CodeParserModule } from 'dynamsoft-code-parser';

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

  constructor() {
    this.overlayManager = new OverlayManager();
  }

  ngOnInit(): void {
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
      let ret = await this.cvr.initSettings('/assets/template.json');
      console.log(ret);
      this.isLoaded = true;
    })();
  }

  ngOnDestroy() {
    try {
      this.cvr?.dispose();
    } catch (_) { }
  }

  onChange(event: Event) {
    let parser = this.parser;
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
            img.onload = (event: any) => {
              this.overlayManager.updateOverlay(img.width, img.height);
              if (this.cvr) {
                this.cvr.capture(file, "ReadMRZ").then(async (result: CapturedResult) => {
                  let txts: any = [];
                  try {
                    let items = result.items;
                    if (items.length > 0) {

                      for (var i = 0; i < items.length; ++i) {
                        if (items[i].type !== EnumCapturedResultItemType.CRIT_TEXT_LINE) {
                          continue; // check if captured result item is a barcode
                        }

                        let item = items[i] as TextLineResultItem;
                        let localization = item.location;
                        console.log(localization);
                        this.overlayManager.drawOverlay(
                          localization,
                          ''
                        );

                        txts.push(item.text);

                        textarea.value = txts.join('') + '\n';

                        let parseResults = await parser?.parse(item.text);
                        textarea.value += JSON.stringify(this.handleMrzParseResult(parseResults)) + '\n';

                        break;
                      }

                    }
                  } catch (e) {
                    alert(e);
                  }

                  if (txts.length === 0) {
                    textarea.value = 'No MRZ detected.';
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

  handleMrzParseResult(result: any) {
    const parseResultInfo: any = {};
    if (!result.exception) {
      let type = result.getFieldValue("documentCode");
      parseResultInfo['Document Type'] = JSON.parse(result.jsonString).CodeType;
      let nation = result.getFieldValue("issuingState");
      parseResultInfo['Issuing State'] = nation;
      let surName = result.getFieldValue("primaryIdentifier");
      parseResultInfo['Surname'] = surName;
      let givenName = result.getFieldValue("secondaryIdentifier");
      parseResultInfo['Given Name'] = givenName;
      let passportNumber = type === "P" ? result.getFieldValue("passportNumber") : result.getFieldValue("documentNumber");
      parseResultInfo['Passport Number'] = passportNumber;
      let nationality = result.getFieldValue("nationality");
      parseResultInfo['Nationality'] = nationality;
      let gender = result.getFieldValue("sex");
      parseResultInfo["Gender"] = gender;
      let birthYear = result.getFieldValue("birthYear");
      let birthMonth = result.getFieldValue("birthMonth");
      let birthDay = result.getFieldValue("birthDay");
      if (parseInt(birthYear) > (new Date().getFullYear() % 100)) {
        birthYear = "19" + birthYear;
      } else {
        birthYear = "20" + birthYear;
      }
      parseResultInfo['Date of Birth (YYYY-MM-DD)'] = birthYear + "-" + birthMonth + "-" + birthDay
      let expiryYear = result.getFieldValue("expiryYear");
      let expiryMonth = result.getFieldValue("expiryMonth");
      let expiryDay = result.getFieldValue("expiryDay");
      if (parseInt(expiryYear) >= 60) {
        expiryYear = "19" + expiryYear;
      } else {
        expiryYear = "20" + expiryYear;
      }
      parseResultInfo["Date of Expiry (YYYY-MM-DD)"] = expiryYear + "-" + expiryMonth + "-" + expiryDay;
    }
    return parseResultInfo;
  }

}
