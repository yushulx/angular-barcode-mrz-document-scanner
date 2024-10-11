import { CapturedResultItem, Quadrilateral, ImageTag, DSImageData, IntermediateResultExtraInfo, IntermediateResultUnit, Edge, Corner, RegionObjectElement, LineSegment } from 'dynamsoft-core';

declare class DocumentNormalizerModule {
    static getVersion(): string;
    setThresholdValue(cvr: any, threshold: number, leftLimit: number, rightLimit: number): Promise<void>;
}

/**
 * `EnumImageColourMode` determines the output colour mode of the normalized image.
 */
declare enum EnumImageColourMode {
    /** Output image in color mode. */
    ICM_COLOUR = 0,
    /** Output image in grayscale mode. */
    ICM_GRAYSCALE = 1,
    /** Output image in binary mode. */
    ICM_BINARY = 2
}

interface DetectedQuadResultItem extends CapturedResultItem {
    location: Quadrilateral;
    confidenceAsDocumentBoundary: number;
}

interface DetectedQuadsResult {
    readonly originalImageHashId: string;
    readonly originalImageTag: ImageTag;
    readonly errorCode: number;
    readonly errorString: string;
    detectedQuadResultItems: Array<DetectedQuadResultItem>;
}
declare module "dynamsoft-capture-vision-router" {
    interface CapturedResultReceiver {
        onDetectedQuadsReceived?: (result: DetectedQuadsResult) => void;
    }
    interface CapturedResultFilter {
        onDetectedQuadsReceived?: (result: DetectedQuadsResult) => void;
    }
}

interface NormalizedImageResultItem extends CapturedResultItem {
    imageData: DSImageData;
    location: Quadrilateral;
    toCanvas: () => HTMLCanvasElement;
    toImage: (MIMEType: "image/png" | "image/jpeg") => HTMLImageElement;
    toBlob: (MIMEType: "image/png" | "image/jpeg") => Promise<Blob>;
    saveToFile: (name: string, download?: boolean) => Promise<File>;
}

interface NormalizedImagesResult {
    readonly originalImageHashId: string;
    readonly originalImageTag: ImageTag;
    readonly errorCode: number;
    readonly errorString: string;
    normalizedImageResultItems: Array<NormalizedImageResultItem>;
}
declare module "dynamsoft-capture-vision-router" {
    interface CapturedResultReceiver {
        onNormalizedImagesReceived?: (result: NormalizedImagesResult) => void;
    }
    interface CapturedResultFilter {
        onNormalizedImagesReceived?: (result: NormalizedImagesResult) => void;
    }
}

interface CandidateQuadEdgesUnit extends IntermediateResultUnit {
    candidateQuadEdges: Array<Edge>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onCandidateQuadEdgesUnitReceived?: (result: CandidateQuadEdgesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface CornersUnit extends IntermediateResultUnit {
    corners: Array<Corner>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onCornersUnitReceived?: (result: CornersUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface DetectedQuadElement extends RegionObjectElement {
    confidenceAsDocumentBoundary: number;
}

interface DetectedQuadsUnit extends IntermediateResultUnit {
    detectedQuads: Array<DetectedQuadElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onDetectedQuadsReceived?: (result: DetectedQuadsUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface LongLinesUnit extends IntermediateResultUnit {
    longLines: Array<LineSegment>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onLongLinesUnitReceived?: (result: LongLinesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface NormalizedImageElement extends RegionObjectElement {
    imageData: DSImageData;
    referencedElement: RegionObjectElement;
}

interface NormalizedImagesUnit extends IntermediateResultUnit {
    normalizedImages: Array<NormalizedImageElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onNormalizedImagesReceived?: (result: NormalizedImagesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

export { CandidateQuadEdgesUnit, CornersUnit, DetectedQuadElement, DetectedQuadResultItem, DetectedQuadsResult, DetectedQuadsUnit, DocumentNormalizerModule, EnumImageColourMode, LongLinesUnit, NormalizedImageElement, NormalizedImageResultItem, NormalizedImagesResult, NormalizedImagesUnit };
