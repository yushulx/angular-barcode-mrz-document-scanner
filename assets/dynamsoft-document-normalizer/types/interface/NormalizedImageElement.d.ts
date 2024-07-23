import { DSImageData, RegionObjectElement } from "dynamsoft-core";
export interface NormalizedImageElement extends RegionObjectElement {
    imageData: DSImageData;
    referencedElement: RegionObjectElement;
}
