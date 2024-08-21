import { Component, OnInit } from '@angular/core';
import { DDV, EditViewer } from 'dynamsoft-document-viewer';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit {
  editViewer?: EditViewer;

  constructor() {

  }

  ngOnInit(): void {
    let config = DDV.getDefaultUiConfig("editViewer", { includeAnnotationSet: true });
    this.editViewer = new DDV.EditViewer({
      container: "document_container",
      uiConfig: config!,
    });
  }

}