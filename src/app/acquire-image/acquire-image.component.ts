import { Component, OnInit } from '@angular/core';
import { WebTwain } from 'dwt/dist/types/WebTwain';
import Dynamsoft from 'dwt';
import { SdkService } from '../sdk.service';

@Component({
  selector: 'app-acquire-image',
  templateUrl: './acquire-image.component.html',
  styleUrls: ['./acquire-image.component.css']
})
export class AcquireImageComponent implements OnInit {

  dwtObject: WebTwain | undefined;
  selectSources: HTMLSelectElement | undefined;
  sourceList: any[] = [];
  containerId = 'dwtcontrolContainer';
  width = '600px';
  height = '600px';

  constructor(private sdk: SdkService) {
  }

  ngOnDestroy() {
    Dynamsoft.DWT.Unload();
  }

  ngOnInit(): void {
    // Dynamic Web TWAIN is configured (product key, resource path) by
    // SdkService during activation; wait for it so deep links work too.
    (async () => {
      await this.sdk.whenReady();
      Dynamsoft.DWT.Containers = [{ ContainerId: this.containerId, Width: this.width, Height: this.height }];
      Dynamsoft.DWT.Load();

      Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => { this.onReady(); });
    })();
  }

  onReady(): void {
    this.dwtObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
    this.dwtObject.IfShowUI = false;

    this.dwtObject.GetDevicesAsync(Dynamsoft.DWT.EnumDWT_DeviceType.TWAINSCANNER | Dynamsoft.DWT.EnumDWT_DeviceType.TWAINX64SCANNER | Dynamsoft.DWT.EnumDWT_DeviceType.ESCLSCANNER).then((sources) => {
      this.sourceList = sources;

      this.selectSources = <HTMLSelectElement>document.getElementById("sources");
      this.selectSources.options.length = 0;
      for (let i = 0; i < sources.length; i++) {
        this.selectSources.options.add(new Option(<string>sources[i].displayName, i.toString()));
      }
    });
  }

  acquireImage(): void {
    if (!this.dwtObject) {
      return;
    }

    // Judge availability by the enumerated device list, not by the legacy
    // SourceCount property — the source manager may report 0 while
    // GetDevicesAsync (which drives the dropdown) lists devices fine.
    const index = this.selectSources ? this.selectSources.selectedIndex : -1;
    const device = this.sourceList[index];
    if (!device) {
      alert("No Source Available!");
      return;
    }

    let pixelType = 2; // 0 = B&W, 1 = Gray, 2 = Color
    const pixelTypeInputs = document.getElementsByName("PixelType");
    for (let i = 0; i < pixelTypeInputs.length; i++) {
      if ((<HTMLInputElement>pixelTypeInputs[i]).checked) {
        pixelType = parseInt((<HTMLInputElement>pixelTypeInputs[i]).value);
        break;
      }
    }

    const dwtObject = this.dwtObject;
    dwtObject.SelectDeviceAsync(device).then(() => {

      return dwtObject.OpenSourceAsync()

    }).then(() => {

      return dwtObject.AcquireImageAsync({
        IfFeederEnabled: (<HTMLInputElement>document.getElementById("ADF"))!.checked,
        PixelType: pixelType,
        Resolution: parseInt((<HTMLSelectElement>document.getElementById("Resolution"))!.value),
        IfDisableSourceAfterAcquire: true
      })

    }).then(() => {

      if (dwtObject) {

        dwtObject.CloseSource();

      }

    }).catch(

      (e) => {

        console.error(e)

      }

    );
  }

  openImage(): void {
    if (!this.dwtObject)
      this.dwtObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainer');
    // this.dwtObject.IfShowFileDialog = true;  
    this.dwtObject.Addon.PDF.SetConvertMode(Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL);
    this.dwtObject.LoadImageEx("", Dynamsoft.DWT.EnumDWT_ImageType.IT_ALL,
      () => {
        //success
      }, () => {
        //failure
      });
  }

  downloadDocument() {
    if (this.dwtObject && this.dwtObject.HowManyImagesInBuffer > 0) {
      this.dwtObject.IfShowFileDialog = true;
      if ((<HTMLInputElement>document.getElementById("imgTypejpeg")).checked == true) {
        //If the current image is B&W
        //1 is B&W, 8 is Gray, 24 is RGB
        if (this.dwtObject.GetImageBitDepth(this.dwtObject.CurrentImageIndexInBuffer) == 1)
          //If so, convert the image to Gray
          this.dwtObject.ConvertToGrayScale(this.dwtObject.CurrentImageIndexInBuffer);
        //Save image in JPEG
        this.dwtObject.SaveAsJPEG("DynamicWebTWAIN.jpg", this.dwtObject.CurrentImageIndexInBuffer);
      }
      else if ((<HTMLInputElement>document.getElementById("imgTypetiff")).checked == true)
        this.dwtObject.SaveAllAsMultiPageTIFF("DynamicWebTWAIN.tiff", () => { }, () => { });
      else if ((<HTMLInputElement>document.getElementById("imgTypepdf")).checked == true)
        this.dwtObject.SaveAllAsPDF("DynamicWebTWAIN.pdf", () => { }, () => { });
    }
  }

}
