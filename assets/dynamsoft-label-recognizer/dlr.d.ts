import { Quadrilateral, RegionObjectElement, IntermediateResultExtraInfo, IntermediateResultUnit, CapturedResultItem, ImageTag, EnumGrayscaleTransformationMode, EnumGrayscaleEnhancementMode, DSImageData } from 'dynamsoft-core';

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
}

interface TextLineResultItem extends CapturedResultItem {
    text: string;
    location: Quadrilateral;
    confidence: number;
    characterResults: Array<CharacterResult>;
    specificationName: string;
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

export { BufferedCharacterItem, BufferedCharacterItemSet, CharacterCluster, CharacterResult, LabelRecognizerModule, LocalizedTextLineElement, LocalizedTextLinesUnit, RecognizedTextLineElement, RecognizedTextLinesResult, SimplifiedLabelRecognizerSettings, TextLineResultItem };
