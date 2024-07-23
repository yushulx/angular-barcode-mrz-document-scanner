import { RegionObjectElement } from "dynamsoft-core";
export interface DetectedQuadElement extends RegionObjectElement {
    confidenceAsDocumentBoundary: number;
}
