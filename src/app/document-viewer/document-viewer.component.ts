import { Component, OnInit } from '@angular/core';
import Dynamsoft from 'dwt';
import { DDV, EditViewer, IDocument, UiConfig } from 'dynamsoft-document-viewer';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit {
  editViewer?: EditViewer;
  dropdown?: HTMLElement;
  dwtObject?: any = null;
  sourceList = [];
  acquireDocumentButton: HTMLElement | null = null;
  cancelCaptureButton: HTMLElement | null = null;
  currentDoc?: IDocument;

  dropdownButton = {
    type: DDV.Elements.Button,
    className: "ddv-button ddv-load-image",
    tooltip: "Sources: File, Camera, Scanner",
    events: {
      click: "toggleDropdown",
    },
  };

  // Layout
  pcEditViewerUiConfig: UiConfig = {
    type: DDV.Elements.Layout,
    flexDirection: "column",
    className: "ddv-edit-viewer-desktop",
    children: [
      {
        type: DDV.Elements.Layout,
        className: "ddv-edit-viewer-header-desktop",
        children: [
          {
            type: DDV.Elements.Layout,
            children: [
              DDV.Elements.ThumbnailSwitch,
              DDV.Elements.Zoom,
              DDV.Elements.FitMode,
              DDV.Elements.Crop,
              DDV.Elements.Filter,
              DDV.Elements.Undo,
              DDV.Elements.Redo,
              DDV.Elements.DeleteCurrent,
              DDV.Elements.DeleteAll,
              DDV.Elements.Pan,
              DDV.Elements.AnnotationSet,
              this.dropdownButton,
            ],
          },
          {
            type: DDV.Elements.Layout,
            children: [
              {
                type: DDV.Elements.Pagination,
                className: "ddv-edit-viewer-pagination-desktop",
              },
              DDV.Elements.Load,
              DDV.Elements.Download,
            ],
          },
        ],
      },
      DDV.Elements.MainView,
    ],
  };

  mobileEditViewerUiConfig: UiConfig = {
    type: DDV.Elements.Layout,
    flexDirection: "column",
    className: "ddv-edit-viewer-mobile",
    children: [
      {
        type: DDV.Elements.Layout,
        className: "ddv-edit-viewer-header-mobile",
        children: [
          DDV.Elements.Pagination,
          DDV.Elements.Load,
          DDV.Elements.Download,
        ],
      },
      DDV.Elements.MainView,
      {
        type: DDV.Elements.Layout,
        className: "ddv-edit-viewer-footer-mobile",
        children: [
          DDV.Elements.Crop,
          DDV.Elements.Filter,
          DDV.Elements.Undo,
          DDV.Elements.Delete,
          DDV.Elements.AnnotationSet,
          this.dropdownButton,
        ],
      },
    ],
  };

  constructor() {
    // Type declaration for window extension
    (window as any).handleDropdownSelect = (btn: HTMLElement) => {
      document.querySelectorAll(".dropdown-menu button").forEach(el => el.classList.remove("selected"));
      btn.classList.add("selected");
      if (this.dropdown) {
        this.dropdown.style.display = "none";
      }

      if (btn.textContent === "Scanner (Dynamic Web TWAIN)") {
        this.popDWTScanner();
      }
    };

    window.addEventListener("click", () => {
      if (this.dropdown) this.dropdown.style.display = "none";
    });
  }
  ngOnDestroy() {
    // Unload Dynamic Web TWAIN
    if (this.dwtObject) {
      Dynamsoft.DWT.DeleteDWTObject(this.dwtObject._id);
      this.dwtObject = null;
    }
  }
  ngOnInit() {
    // Initialize Dynamic Web TWAIN
    const mytooltips = DDV.Elements.getTooltip();
    mytooltips.DisplayMode = "Display Mode";
    mytooltips.AnnotationSet = "Add Annotation";
    DDV.Elements.setTooltip(mytooltips);

    let editContainer = document.getElementById("edit-viewer");

    if (!editContainer) {
      throw new Error('Edit container element with id "edit-viewer" not found.');
    }

    this.editViewer = new DDV.EditViewer({
      container: editContainer,
      viewerConfig: {
        scrollToLatest: true,
      },
      uiConfig: this.isMobile() ? this.mobileEditViewerUiConfig : this.pcEditViewerUiConfig
    });
    this.editViewer.displayMode = "single";
    this.editViewer.on("toggleDropdown", this.toggleDropdown);

    Dynamsoft.DWT.CreateDWTObjectEx({ "WebTwainId": "container" }, (obj) => {
      this.dwtObject = obj;

      this.dwtObject.Viewer.bind(document.createElement("div"));
      this.dwtObject.Viewer.width = 640;
      this.dwtObject.Viewer.height = 640;
    }, (errorString) => {
      console.log(errorString);
    });

    // Bind scan popup buttons after DOM is ready
    setTimeout(() => {
      const cancelBtn = document.getElementById('cancelCapture');
      const acquireBtn = document.getElementById('acquireDocument');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          const popScanner = document.getElementById('pop-scanner');
          if (popScanner) popScanner.style.display = 'none';
        });
      }
      if (acquireBtn) {
        acquireBtn.addEventListener('click', async () => {
          const popScanner = document.getElementById('pop-scanner');
          if (popScanner) popScanner.style.display = 'none';

          // Create a scan job
          const select = document.getElementById('sources') as HTMLSelectElement;
          const scanner = select?.value;
          if (!scanner || scanner.length === 0) {
            alert('Please select a scanner.');
            return;
          }
          const resolutionSelect = document.getElementById('Resolution') as HTMLSelectElement;
          const adfCheck = document.getElementById('ADF') as HTMLInputElement;
          if (!this.dwtObject) return;
          this.dwtObject.IfShowUI = false;
          await this.dwtObject.SelectDeviceAsync(this.sourceList[select.selectedIndex]);
          await this.dwtObject.OpenSourceAsync();
          await this.dwtObject.AcquireImageAsync({
            IfFeederEnabled: adfCheck?.checked,
            PixelType: 2,
            Resolution: parseInt(resolutionSelect?.value || '200'),
            IfDisableSourceAfterAcquire: true
          });
          await this.dwtObject.CloseSourceAsync();
          for (let i = 0; i < this.dwtObject.HowManyImagesInBuffer; i++) {
            let blob = await this.convertToBlobAsync(this.dwtObject, [i], Dynamsoft.DWT.EnumDWT_ImageType.IT_JPG);
            if (blob) {
              await this.load(blob, '');
            }
          }
          this.dwtObject.RemoveAllImages();
        });
      }
    }, 0);

  }

  toggleDropdown = (e: any) => {
    e[0].stopPropagation();
    if (!this.dropdown) {
      this.dropdown = this.createDropdownMenu();
      this.dropdown.style.position = "absolute";
    }

    // Toggle visibility
    this.dropdown.style.display = this.dropdown.style.display === "block" ? "none" : "block";
    const rect = e[0].target.getBoundingClientRect();
    this.dropdown.style.left = `${rect.left}px`;
    this.dropdown.style.top = `${rect.bottom + 5}px`;
  }

  async convertToBlobAsync(dwtObject: any, indices: number[], imageType: any): Promise<Blob> {
    return new Promise((resolve, reject) => {
      dwtObject.ConvertToBlob(indices, imageType, (result: Blob) => {
        console.log("Image converted to Blob successfully.");
        resolve(result);
      }, (errorCode: number, errorString: string) => {
        console.error("Failed to convert image to Blob:", errorString);
        reject(new Error(errorString));
      });
    });
  }

  async load(blob: Blob, password: string) {
    try {
      if (!this.currentDoc) {
        this.currentDoc = this.editViewer?.currentDocument == null ? DDV.documentManager.createDocument({
          name: Date.now().toString(),
          author: "DDV",
        }) : this.editViewer.currentDocument;
      }

      const source = {
        fileData: blob,
        password: password,
        renderOptions: {
          renderAnnotations: "loadAnnotations"
        }
      };
      await this.currentDoc!.loadSource([source]);
      if (this.editViewer && this.currentDoc) {
        this.editViewer.openDocument(this.currentDoc);
        this.editViewer.goToPage(this.editViewer.getPageCount() - 1);
      }
    } catch (error: any) {
      console.error(error);

      // PDF is encrypted
      if (error.cause && error.cause.code == -80202) {
        const passwordInput = document.getElementById("password-input");
        if (passwordInput) passwordInput.style.display = "flex";
        // Optionally prompt for password and retry
      }
    }
  }

  isMobile(): boolean {
    return "ontouchstart" in document.documentElement;
  }

  async popDWTScanner(): Promise<void> {
    if (!this.dwtObject) {
      alert("Dynamic Web TWAIN is not initialized.");
      return;
    }

    try {
      this.sourceList = await this.dwtObject.GetDevicesAsync();
      let select = document.getElementById('sources') as HTMLSelectElement;
      select.innerHTML = '';

      for (let i = 0; i < this.sourceList.length; i++) {
        let device: any = this.sourceList[i];
        let option = document.createElement("option");
        option.text = device.displayName;
        option.value = i.toString();
        select.add(option);
      };
    } catch (error) {
      alert(error);
      return;
    }

    const popScanner = document.getElementById("pop-scanner");
    if (popScanner) {
      popScanner.style.display = "flex";
    }
  }

  createDropdownMenu(): HTMLElement {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown-menu");

    dropdown.innerHTML = `
      <button class="selected" onclick="handleDropdownSelect(this)">Scanner (Dynamic Web TWAIN)</button>
    `;

    document.body.appendChild(dropdown);
    return dropdown;
  }

}
