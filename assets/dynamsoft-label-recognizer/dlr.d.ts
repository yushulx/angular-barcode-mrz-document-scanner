import { Quadrilateral, CapturedResultItem, RegionObjectElement, IntermediateResultExtraInfo, IntermediateResultUnit, ImageTag, EnumGrayscaleTransformationMode, EnumGrayscaleEnhancementMode, DSImageData } from 'dynamsoft-core';

declare class LabelRecognizerModule {
    /**
     * An event that repeatedly fires during the loading of a recognition data file (.data).
     * @param filePath Returns the path of the recognition data file.
     * @param tag Indicates the ongoing status of the file download. Available values are "starting", "in progress", "completed".
     * @param progress Shows the numerical progress of the download.
     */
    static onDataLoadProgressChanged: (filePath: string, tag: "starting" | "in progress" | "completed", progress: {
        loaded: number;
        total: number;
    }) => void;
    static getVersion(): string;
    static loadRecognitionData(dataName: string, dataPath?: string): Promise<void | object>;
}

interface CharacterResult {
    characterH: string;
    characterM: string;
    characterL: string;
    characterHConfidence: number;
    characterMConfidence: number;
    characterLConfidence: number;
    location: Quadrilateral;
}

interface TextLineResultItem extends CapturedResultItem {
    text: string;
    location: Quadrilateral;
    confidence: number;
    characterResults: Array<CharacterResult>;
    specificationName: string;
    rawText: string;
}

declare function filterVINResult(vinItem: TextLineResultItem): string;
/**
 * check if the vin code is valid
 * @ignore
 */
declare function checkValidVIN(code: string): boolean;
/**
 * check if the second row of passport mrz code is valid.
 * check digit only exits in second row in passport mrz.
 * @ignore
 */
declare function checkValidMRP(code: string): boolean;
/**
 * check if the second row of visa mrz code is valid.
 * check digit only exits in second row in visa mrz.
 * @ignore
 */
declare function checkValidMRV(code: string): boolean;
/**
 * check if the two row or third row of id card mrz code is valid.
 * check digit only exits in two row or third row in id card mrz.
 * @ignore
 */
declare function checkValidIDCard(code: string, codeUpperLine?: string): boolean;
declare const utilsFuncs: {
    filterVINResult: typeof filterVINResult;
    checkValidVIN: typeof checkValidVIN;
    checkValidMRP: typeof checkValidMRP;
    checkValidMRV: typeof checkValidMRV;
    checkValidIDCard: typeof checkValidIDCard;
};

/**
 * Enumerates the status of a raw text line.
 */
declare enum EnumRawTextLineStatus {
    /** Localized but recognition not performed. */
    RTLS_LOCALIZED = 0,
    /** Recognition failed. */
    RTLS_RECOGNITION_FAILED = 1,
    /** Successfully recognized. */
    RTLS_RECOGNITION_SUCCEEDED = 2
}

interface LocalizedTextLineElement extends RegionObjectElement {
    characterQuads: Array<Quadrilateral>;
    rowNumber: number;
}

interface LocalizedTextLinesUnit extends IntermediateResultUnit {
    localizedTextLines: Array<LocalizedTextLineElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onLocalizedTextLinesReceived?: (result: LocalizedTextLinesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface RecognizedTextLineElement extends RegionObjectElement {
    text: string;
    confidence: number;
    characterResults: Array<CharacterResult>;
    rowNumber: number;
    specificationName: string;
    rawText: string;
}

interface RecognizedTextLinesResult {
    readonly originalImageHashId: string;
    readonly originalImageTag: ImageTag;
    textLineResultItems: Array<TextLineResultItem>;
    readonly errorCode: number;
    readonly errorString: string;
}
declare module "dynamsoft-capture-vision-router" {
    interface CapturedResultReceiver {
        onRecognizedTextLinesReceived?: (result: RecognizedTextLinesResult) => void;
    }
    interface CapturedResultFilter {
        onRecognizedTextLinesReceived?: (result: RecognizedTextLinesResult) => void;
    }
}

interface SimplifiedLabelRecognizerSettings {
    characterModelName: string;
    lineStringRegExPattern: string;
    grayscaleTransformationModes: Array<EnumGrayscaleTransformationMode>;
    grayscaleEnhancementModes: Array<EnumGrayscaleEnhancementMode>;
}

interface BufferedCharacterItem {
    character: string;
    image: DSImageData;
    features: Map<number, number>;
}

interface CharacterCluster {
    character: string;
    Mean: BufferedCharacterItem;
}

interface BufferedCharacterItemSet {
    items: Array<BufferedCharacterItem>;
    characterClusters: Array<CharacterCluster>;
}

/**
 * The `RawTextLine` represents a text line in an image. It can be in one of the following states:
 * - `TLS_LOCALIZED`: Localized but recognition not performed.
 * - `TLS_RECOGNITION_FAILED`: Recognition failed.
 * - `TLS_RECOGNIZED_SUCCESSFULLY`: Successfully recognized.
 */
interface RawTextLine extends RegionObjectElement {
    text: string;
    confidence: number;
    characterResults: Array<CharacterResult>;
    rowNumber: number;
    specificationName: string;
    location: Quadrilateral;
    status: EnumRawTextLineStatus;
}

interface RawTextLinesUnit extends IntermediateResultUnit {
    rawTextlines: Array<RawTextLine>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onRawTextLinesReceived?: (result: RawTextLinesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

export { BufferedCharacterItem, BufferedCharacterItemSet, CharacterCluster, CharacterResult, EnumRawTextLineStatus, LabelRecognizerModule, LocalizedTextLineElement, LocalizedTextLinesUnit, RawTextLine, RawTextLinesUnit, RecognizedTextLineElement, RecognizedTextLinesResult, SimplifiedLabelRecognizerSettings, TextLineResultItem, utilsFuncs };
