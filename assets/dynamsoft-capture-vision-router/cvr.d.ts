import { ImageTag, CapturedResultItem, Quadrilateral, DSImageData, OriginalImageResultItem, ObservationParameters, IntermediateResult, IntermediateResultExtraInfo, PredetectedRegionsUnit, ColourImageUnit, ScaledDownColourImageUnit, GrayscaleImageUnit, TransformedGrayscaleImageUnit, EnhancedGrayscaleImageUnit, BinaryImageUnit, TextureDetectionResultUnit, TextureRemovedGrayscaleImageUnit, TextureRemovedBinaryImageUnit, ContoursUnit, LineSegmentsUnit, TextZonesUnit, TextRemovedBinaryImageUnit, ShortLinesUnit, EnumCapturedResultItemType, ImageSourceAdapter, IntermediateResultUnit, Point } from 'dynamsoft-core';

declare const EnumBarcodeFormat: {
    /**No barcode format in BarcodeFormat*/
    BF_NULL: bigint;
    /**All supported formats in BarcodeFormat*/
    BF_ALL: bigint;
    /**Use the default barcode format settings*/
    BF_DEFAULT: bigint;
    /**Combined value of BF_CODABAR, BF_CODE_128, BF_CODE_39, BF_CODE_39_Extended, BF_CODE_93, BF_EAN_13, BF_EAN_8, INDUSTRIAL_25, BF_ITF, BF_UPC_A, BF_UPC_E, BF_MSI_CODE;  */
    BF_ONED: bigint;
    /**Combined value of BF_GS1_DATABAR_OMNIDIRECTIONAL, BF_GS1_DATABAR_TRUNCATED, BF_GS1_DATABAR_STACKED, BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL, BF_GS1_DATABAR_EXPANDED, BF_GS1_DATABAR_EXPANDED_STACKED, BF_GS1_DATABAR_LIMITED*/
    BF_GS1_DATABAR: bigint;
    /**Code 39 */
    BF_CODE_39: bigint;
    /**Code 128 */
    BF_CODE_128: bigint;
    /**Code 93 */
    BF_CODE_93: bigint;
    /**Codabar */
    BF_CODABAR: bigint;
    /**Interleaved 2 of 5 */
    BF_ITF: bigint;
    /**EAN-13 */
    BF_EAN_13: bigint;
    /**EAN-8 */
    BF_EAN_8: bigint;
    /**UPC-A */
    BF_UPC_A: bigint;
    /**UPC-E */
    BF_UPC_E: bigint;
    /**Industrial 2 of 5 */
    BF_INDUSTRIAL_25: bigint;
    /**CODE39 Extended */
    BF_CODE_39_EXTENDED: bigint;
    /**GS1 Databar Omnidirectional*/
    BF_GS1_DATABAR_OMNIDIRECTIONAL: bigint;
    /**GS1 Databar Truncated*/
    BF_GS1_DATABAR_TRUNCATED: bigint;
    /**GS1 Databar Stacked*/
    BF_GS1_DATABAR_STACKED: bigint;
    /**GS1 Databar Stacked Omnidirectional*/
    BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL: bigint;
    /**GS1 Databar Expanded*/
    BF_GS1_DATABAR_EXPANDED: bigint;
    /**GS1 Databar Expaned Stacked*/
    BF_GS1_DATABAR_EXPANDED_STACKED: bigint;
    /**GS1 Databar Limited*/
    BF_GS1_DATABAR_LIMITED: bigint;
    /**Patch code. */
    BF_PATCHCODE: bigint;
    /**PDF417 */
    BF_CODE_32: bigint;
    /**PDF417 */
    BF_PDF417: bigint;
    /**QRCode */
    BF_QR_CODE: bigint;
    /**DataMatrix */
    BF_DATAMATRIX: bigint;
    /**AZTEC */
    BF_AZTEC: bigint;
    /**MAXICODE */
    BF_MAXICODE: bigint;
    /**Micro QR Code*/
    BF_MICRO_QR: bigint;
    /**Micro PDF417*/
    BF_MICRO_PDF417: bigint;
    /**GS1 Composite Code*/
    BF_GS1_COMPOSITE: bigint;
    /**MSI Code*/
    BF_MSI_CODE: bigint;
    BF_CODE_11: bigint;
    BF_TWO_DIGIT_ADD_ON: bigint;
    BF_FIVE_DIGIT_ADD_ON: bigint;
    BF_MATRIX_25: bigint;
    /**Combined value of BF2_USPSINTELLIGENTMAIL, BF2_POSTNET, BF2_PLANET, BF2_AUSTRALIANPOST, BF2_RM4SCC.*/
    BF_POSTALCODE: bigint;
    /**Nonstandard barcode */
    BF_NONSTANDARD_BARCODE: bigint;
    /**USPS Intelligent Mail.*/
    BF_USPSINTELLIGENTMAIL: bigint;
    /**Postnet.*/
    BF_POSTNET: bigint;
    /**Planet.*/
    BF_PLANET: bigint;
    /**Australian Post.*/
    BF_AUSTRALIANPOST: bigint;
    /**Royal Mail 4-State Customer Barcode.*/
    BF_RM4SCC: bigint;
    /**KIX.*/
    BF_KIX: bigint;
    /**DotCode.*/
    BF_DOTCODE: bigint;
    /**_PHARMACODE_ONE_TRACK.*/
    BF_PHARMACODE_ONE_TRACK: bigint;
    /**PHARMACODE_TWO_TRACK.*/
    BF_PHARMACODE_TWO_TRACK: bigint;
    /**PHARMACODE.*/
    BF_PHARMACODE: bigint;
} | {
    /**No barcode format in BarcodeFormat*/
    BF_NULL: string;
    /**All supported formats in BarcodeFormat*/
    BF_ALL: string;
    /**Use the default barcode format settings*/
    BF_DEFAULT: string;
    /**Combined value of BF_CODABAR, BF_CODE_128, BF_CODE_39, BF_CODE_39_Extended, BF_CODE_93, BF_EAN_13, BF_EAN_8, INDUSTRIAL_25, BF_ITF, BF_UPC_A, BF_UPC_E, BF_MSI_CODE;  */
    BF_ONED: string;
    /**Combined value of BF_GS1_DATABAR_OMNIDIRECTIONAL, BF_GS1_DATABAR_TRUNCATED, BF_GS1_DATABAR_STACKED, BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL, BF_GS1_DATABAR_EXPANDED, BF_GS1_DATABAR_EXPANDED_STACKED, BF_GS1_DATABAR_LIMITED*/
    BF_GS1_DATABAR: string;
    /**Code 39 */
    BF_CODE_39: string;
    /**Code 128 */
    BF_CODE_128: string;
    /**Code 93 */
    BF_CODE_93: string;
    /**Codabar */
    BF_CODABAR: string;
    /**Interleaved 2 of 5 */
    BF_ITF: string;
    /**EAN-13 */
    BF_EAN_13: string;
    /**EAN-8 */
    BF_EAN_8: string;
    /**UPC-A */
    BF_UPC_A: string;
    /**UPC-E */
    BF_UPC_E: string;
    /**Industrial 2 of 5 */
    BF_INDUSTRIAL_25: string;
    /**CODE39 Extended */
    BF_CODE_39_EXTENDED: string;
    /**GS1 Databar Omnidirectional*/
    BF_GS1_DATABAR_OMNIDIRECTIONAL: string;
    /**GS1 Databar Truncated*/
    BF_GS1_DATABAR_TRUNCATED: string;
    /**GS1 Databar Stacked*/
    BF_GS1_DATABAR_STACKED: string;
    /**GS1 Databar Stacked Omnidirectional*/
    BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL: string;
    /**GS1 Databar Expanded*/
    BF_GS1_DATABAR_EXPANDED: string;
    /**GS1 Databar Expaned Stacked*/
    BF_GS1_DATABAR_EXPANDED_STACKED: string;
    /**GS1 Databar Limited*/
    BF_GS1_DATABAR_LIMITED: string;
    /**Patch code. */
    BF_PATCHCODE: string;
    /**PDF417 */
    BF_CODE_32: string;
    /**PDF417 */
    BF_PDF417: string;
    /**QRCode */
    BF_QR_CODE: string;
    /**DataMatrix */
    BF_DATAMATRIX: string;
    /**AZTEC */
    BF_AZTEC: string;
    /**MAXICODE */
    BF_MAXICODE: string;
    /**Micro QR Code*/
    BF_MICRO_QR: string;
    /**Micro PDF417*/
    BF_MICRO_PDF417: string;
    /**GS1 Composite Code*/
    BF_GS1_COMPOSITE: string;
    /**MSI Code*/
    BF_MSI_CODE: string;
    BF_CODE_11: string;
    BF_TWO_DIGIT_ADD_ON: string;
    BF_FIVE_DIGIT_ADD_ON: string;
    BF_MATRIX_25: string;
    /**Combined value of BF2_USPSINTELLIGENTMAIL, BF2_POSTNET, BF2_PLANET, BF2_AUSTRALIANPOST, BF2_RM4SCC.*/
    BF_POSTALCODE: string;
    /**Nonstandard barcode */
    BF_NONSTANDARD_BARCODE: string;
    /**USPS Intelligent Mail.*/
    BF_USPSINTELLIGENTMAIL: string;
    /**Postnet.*/
    BF_POSTNET: string;
    /**Planet.*/
    BF_PLANET: string;
    /**Australian Post.*/
    BF_AUSTRALIANPOST: string;
    /**Royal Mail 4-State Customer Barcode.*/
    BF_RM4SCC: string;
    /**KIX.*/
    BF_KIX: string;
    /**DotCode.*/
    BF_DOTCODE: string;
    /**_PHARMACODE_ONE_TRACK.*/
    BF_PHARMACODE_ONE_TRACK: string;
    /**PHARMACODE_TWO_TRACK.*/
    BF_PHARMACODE_TWO_TRACK: string;
    /**PHARMACODE.*/
    BF_PHARMACODE: string;
};
type EnumBarcodeFormat = BigInt;
interface BarcodeDetails {
}
interface BarcodeResultItem extends CapturedResultItem {
    format: EnumBarcodeFormat;
    formatString: string;
    text: string;
    bytes: Array<number>;
    location: Quadrilateral;
    confidence: number;
    angle: number;
    moduleSize: number;
    details: BarcodeDetails;
    isMirrored: boolean;
    isDPM: boolean;
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
    /** The following are new as of 2023/09/13  */
    characterResults: Array<CharacterResult>;
}
interface DetectedQuadResultItem extends CapturedResultItem {
    location: Quadrilateral;
    confidenceAsDocumentBoundary: number;
}
interface NormalizedImageResultItem extends CapturedResultItem {
    imageData: DSImageData;
    location: Quadrilateral;
    toCanvas: () => HTMLCanvasElement;
    toImage: (MIMEType: "image/png" | "image/jpeg") => HTMLImageElement;
    toBlob: (MIMEType: "image/png" | "image/jpeg") => Promise<Blob>;
    saveToFile: (name: string, download?: boolean) => Promise<File>;
}
declare enum EnumMappingStatus {
    MS_NONE = 0,
    MS_SUCCEEDED = 1,
    MS_FAILED = 2
}
declare enum EnumValidationStatus {
    VS_NONE = 0,
    VS_SUCCEEDED = 1,
    VS_FAILED = 2
}
interface ParsedResultItem extends CapturedResultItem {
    codeType: string;
    jsonString: string;
    parsedFields: Array<{
        FieldName: string;
        Value: string;
    }>;
    getFieldValue(fieldName: string): string;
    getFieldMappingStatus: (fieldName: string) => EnumMappingStatus;
    getFieldValidationStatus: (fieldName: string) => EnumValidationStatus;
}
interface CapturedResult {
    readonly errorCode: number;
    readonly errorString: string;
    readonly originalImageHashId: string;
    readonly originalImageTag: ImageTag;
    readonly items: Array<CapturedResultItem>;
    readonly barcodeResultItems: Array<BarcodeResultItem>;
    readonly textLineResultItems: Array<TextLineResultItem>;
    readonly detectedQuadResultItems: Array<DetectedQuadResultItem>;
    readonly normalizedImageResultItems: Array<NormalizedImageResultItem>;
    readonly parsedResultItems: Array<ParsedResultItem>;
}

declare class CapturedResultReceiver {
    /**
     * Event triggered when a generic captured result is available, occurring each time an image finishes its processing.
     * This event can be used for any result that does not fit into the specific categories of the other callback events.
     * @param result The captured result, an instance of `CapturedResult`.
     */
    onCapturedResultReceived?: (result: CapturedResult) => void;
    /**
     * Event triggered when the original image result is available.
     * This event is used to handle the original image captured by an image source such as Dynamsoft Camera Enhancer.
     * @param result The original image result, an instance of `OriginalImageResultItem`.
     */
    onOriginalImageResultReceived?: (result: OriginalImageResultItem) => void;
    [key: string]: any;
}

interface BufferedCharacterItem {
    character: string;
    image: DSImageData;
    features: Map<number, number>;
}
interface BufferedCharacterItemSet {
    items: Array<BufferedCharacterItem>;
    characterClusters: Array<CharacterCluster>;
}
interface CharacterCluster {
    character: string;
    mean: BufferedCharacterItem;
}
declare class BufferedItemsManager {
    private _cvr;
    constructor(cvr: any);
    /**
     * Gets the maximum number of buffered items.
     * @returns Returns the maximum number of buffered items.
     */
    getMaxBufferedItems(): Promise<number>;
    /**
     * Sets the maximum number of buffered items.
     * @param count the maximum number of buffered items
     */
    setMaxBufferedItems(count: number): Promise<void>;
    /**
     * Gets the buffered character items.
     * @return the buffered character items
     */
    getBufferedCharacterItemSet(): Promise<Array<BufferedCharacterItemSet>>;
}

declare class IntermediateResultReceiver {
    private _observedResultUnitTypes;
    private _observedTaskMap;
    private _parameters;
    /**
     * Gets the observed parameters of the intermediate result receiver. Allowing for configuration of intermediate result observation.
     * @return The observed parameters, of type ObservationParameters. The default parameters are to observe all intermediate result unit types and all tasks.
     */
    getObservationParameters(): ObservationParameters;
    onTaskResultsReceived?: (result: IntermediateResult, info: IntermediateResultExtraInfo) => void;
    onPredetectedRegionsReceived?: (result: PredetectedRegionsUnit, info: IntermediateResultExtraInfo) => void;
    onColourImageUnitReceived?: (result: ColourImageUnit, info: IntermediateResultExtraInfo) => void;
    onScaledDownColourImageUnitReceived?: (result: ScaledDownColourImageUnit, info: IntermediateResultExtraInfo) => void;
    onGrayscaleImageUnitReceived?: (result: GrayscaleImageUnit, info: IntermediateResultExtraInfo) => void;
    onTransformedGrayscaleImageUnitReceived?: (result: TransformedGrayscaleImageUnit, info: IntermediateResultExtraInfo) => void;
    onEnhancedGrayscaleImageUnitReceived?: (result: EnhancedGrayscaleImageUnit, info: IntermediateResultExtraInfo) => void;
    onBinaryImageUnitReceived?: (result: BinaryImageUnit, info: IntermediateResultExtraInfo) => void;
    onTextureDetectionResultUnitReceived?: (result: TextureDetectionResultUnit, info: IntermediateResultExtraInfo) => void;
    onTextureRemovedGrayscaleImageUnitReceived?: (result: TextureRemovedGrayscaleImageUnit, info: IntermediateResultExtraInfo) => void;
    onTextureRemovedBinaryImageUnitReceived?: (result: TextureRemovedBinaryImageUnit, info: IntermediateResultExtraInfo) => void;
    onContoursUnitReceived?: (result: ContoursUnit, info: IntermediateResultExtraInfo) => void;
    onLineSegmentsUnitReceived?: (result: LineSegmentsUnit, info: IntermediateResultExtraInfo) => void;
    onTextZonesUnitReceived?: (result: TextZonesUnit, info: IntermediateResultExtraInfo) => void;
    onTextRemovedBinaryImageUnitReceived?: (result: TextRemovedBinaryImageUnit, info: IntermediateResultExtraInfo) => void;
    onShortLinesUnitReceived?: (result: ShortLinesUnit, info: IntermediateResultExtraInfo) => void;
}

declare class IntermediateResultManager {
    private _cvr;
    private _irrRegistryState;
    constructor(cvr: any);
    /**
     * Adds a `IntermediateResultReceiver` object as the receiver of intermediate results.
     * @param receiver The receiver object, of type `IntermediateResultReceiver`.
     */
    addResultReceiver(receiver: IntermediateResultReceiver): Promise<void>;
    /**
     * Removes the specified `IntermediateResultReceiver` object.
     * @param receiver The receiver object, of type `IntermediateResultReceiver`.
     */
    removeResultReceiver(receiver: IntermediateResultReceiver): Promise<void>;
    /**
     * Retrieves the original image data.
     *
     * @returns A promise that resolves when the operation has successfully completed. It provides the original image upon resolution.
     */
    getOriginalImage(): DSImageData;
}

declare enum EnumImageSourceState {
    ISS_BUFFER_EMPTY = 0,
    ISS_EXHAUSTED = 1
}

interface ImageSourceStateListener {
    onImageSourceStateReceived?: (status: EnumImageSourceState) => void;
}

interface SimplifiedCaptureVisionSettings {
    capturedResultItemTypes: EnumCapturedResultItemType;
    roi: Quadrilateral;
    roiMeasuredInPercentage: boolean;
    timeout: number;
    /**
     * @brief Minimum time interval (in milliseconds) allowed between consecutive image captures.
     *
     * This property represents the minimum time interval (in milliseconds) that must
     * elapse before the next image capture operation can be initiated.
     * Setting a larger value for this property will introduce a delay between image
     * captures, while setting a smaller value allows for more frequent captures. It
     * can be used to reduce the computational frequency, which can effectively lower
     * energy consumption.
     *
     * @note The actual time interval between captures may be longer than the specified
     *       minimum interval due to various factors, such as image processing time and
     *       hardware limitations.
     *
     */
    minImageCaptureInterval: number;
    /**
    * Specifies the basic settings for the barcode reader module. It is of type `SimplifiedBarcodeReaderSettings`.
    */
    barcodeSettings: any;
    /**
     * Specifies the basic settings for the document normalizer module. It is of type `SimplifiedDocumentNormalizerSettings`.
     */
    documentSettings: any;
    /**
     * Specifies the basic settings for the label recognizer module. It is of type `SimplifiedLabelRecognizerSettings`.
     */
    labelSettings: any;
}

interface CapturedResultFilter {
    onOriginalImageResultReceived?: (result: OriginalImageResultItem) => void;
    [key: string]: any;
}

declare class CaptureVisionRouter {
    static _onLog: (message: any) => void;
    maxCvsSideLength: number;
    private _isa;
    private _dsImage;
    private _instanceID;
    private _loopReadVideoTimeoutId;
    private _bPauseScan;
    private _bNeedOutputOriginalImage;
    private _canvas;
    private _resultReceiverSet;
    private _isaStateListenerSet;
    private _resultFilterSet;
    private _intermediateResultReceiverSet;
    private _intermediateResultManager;
    private _bufferdItemsManager;
    private _templateName;
    private _bOpenDetectVerify;
    private _bOpenNormalizeVerify;
    private _bOpenBarcodeVerify;
    private _bOpenLabelVerify;
    private _minImageCaptureInterval;
    private _averageProcessintTimeArray;
    private _averageFetchImageTimeArray;
    private _currentSettings;
    private _averageTime;
    private _compressRate;
    private _dynamsoft;
    protected captureInParallel: boolean;
    /**
     * Returns whether the `CaptureVisionRouter` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CaptureVisionRouter` instance has been disposed of.
     */
    protected bDestroyed: boolean;
    get disposed(): boolean;
    /**
     * Initializes a new instance of the `CaptureVisionRouter` class.
     *
     * @returns A promise that resolves with the initialized `CaptureVisionRouter` instance.
     */
    static createInstance(): Promise<CaptureVisionRouter>;
    private _singleFrameModeCallback;
    private _singleFrameModeCallbackBind;
    /**
     * Sets up an image source to provide images for continuous processing.
     * @param imageSource The image source which is compliant with the `ImageSourceAdapter` interface.
     */
    setInput(imageSource: ImageSourceAdapter): void;
    /**
     * Returns the image source object.
     */
    getInput(): ImageSourceAdapter;
    /**
     * Adds or removes listeners for image source state change.
     */
    addImageSourceStateListener(listener: ImageSourceStateListener): void;
    removeImageSourceStateListener(listener: ImageSourceStateListener): boolean;
    /**
     * Adds a `CapturedResultReceiver` object as the receiver of captured results.
     * @param receiver The receiver object, of type `CapturedResultReceiver`.
     */
    addResultReceiver(receiver: CapturedResultReceiver): void;
    /**
     * Removes the specified `CapturedResultReceiver` object.
     * @param receiver The receiver object, of type `CapturedResultReceiver`.
     */
    removeResultReceiver(receiver: CapturedResultReceiver): void;
    private _setCrrRegistry;
    /**
     * Adds a `MultiFrameResultCrossFilter` object to filter non-essential results.
     * @param filter The filter object, of type `MultiFrameResultCrossFilter`.
     *
     * @returns A promise that resolves when the operation has successfully completed. It does not provide any value upon resolution.
     */
    addResultFilter(filter: CapturedResultFilter): Promise<void>;
    /**
     * Removes the specified `MultiFrameResultCrossFilter` object.
     * @param filter The filter object, of type `MultiFrameResultCrossFilter`.
     *
     * @returns A promise that resolves when the operation has successfully completed. It does not provide any value upon resolution.
     */
    removeResultFilter(filter: CapturedResultFilter): Promise<void>;
    private _handleFilterSwitch;
    /**
     * Initiates a capturing process based on a specified template. This process is repeated for each image fetched from the source.
     * @param templateName [Optional] Specifies a "CaptureVisionTemplate" to use.
     *
     * @returns A promise that resolves when the capturing process has successfully started. It does not provide any value upon resolution.
     */
    private _promiseStartScan;
    startCapturing(templateName: string): Promise<void>;
    /**
     * Stops the capturing process.
     */
    stopCapturing(): void;
    private _clearVerifyList;
    _getIntermediateResult(): Promise<{
        intermediateResultUnits: Array<IntermediateResultUnit>;
        info: IntermediateResultExtraInfo;
    }>;
    containsTask(templateName: string): Promise<any>;
    /**
     * Video stream capture, recursive call, loop frame capture
     */
    private _loopReadVideo;
    private _reRunCurrnetFunc;
    /**
     * Processes a single image or a file containing a single image to derive important information.
     * @param imageOrFile Specifies the image or file to be processed. The following data types are accepted: `Blob`, `HTMLImageElement`, `HTMLCanvasElement`, `HTMLVideoElement`, `DSImageData`, `string`.
     * @param templateName [Optional] Specifies a "CaptureVisionTemplate" to use.
     *
     * @returns A promise that resolves with a `CapturedResult` object which contains the derived information from the image processed.
     */
    capture(imageOrFile: Blob | string | DSImageData | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, templateName?: string): Promise<CapturedResult>;
    private _captureDsimage;
    private _captureUrl;
    private _captureBase64;
    private _captureBlob;
    private _captureImage;
    private _captureCanvas;
    private _captureVideo;
    private _captureInWorker;
    /**
     * Configures runtime settings using a provided JSON string, an object, or a URL pointing to an object, which contains settings for one or more `CaptureVisionTemplates`.
     * @param settings A JSON string, an object, or a URL pointing to an object that contains settings for one or more `CaptureVisionTemplates`.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    initSettings(settings: string | object): Promise<any>;
    /**
     * Returns an object that contains settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name. If passed "*", the returned object will contain all templates.
     *
     * @returns A promise that resolves with the object that contains settings for the specified template or all templates.
     */
    outputSettings(templateName?: string): Promise<any>;
    /**
     * Generates a Blob object or initiates a JSON file download containing the settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name. If passed "*", the returned object will contain all templates.
     * @param fileName Specifies the name of the file.
     * @param download Boolean that specifies whether to initiates a file download.
     *
     * @returns A promise that resolves with the Blob object that contains settings for the specified template or all templates.
     */
    outputSettingsToFile(templateName: string, fileName: string, download?: boolean): Promise<Blob>;
    /**
     * Retrieves a JSON object that contains simplified settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name.
     *
     * @returns A promise that resolves with a JSON object, of type `SimplifiedCaptureVisionSettings`, which represents the simplified settings for the specified template.
     * @remarks If the settings of the specified template are too complex, we cannot create a SimplifiedCaptureVisionSettings, and as a result, it will return an error.
     */
    getSimplifiedSettings(templateName: string): Promise<SimplifiedCaptureVisionSettings>;
    /**
     * Updates the specified `CaptureVisionTemplate` with an updated `SimplifiedCaptureVisionSettings` object.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name.
     * @param settings The `SimplifiedCaptureVisionSettings` object that contains updated settings.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    updateSettings(templateName: string, settings: SimplifiedCaptureVisionSettings): Promise<any>;
    /**
     * Restores all runtime settings to their original default values.
     *
     * @returns A promise that resolves when the operation has completed. It provides an object that describes the result.
     */
    resetSettings(): Promise<any>;
    /**
     * Returns an object, of type `BufferedItemsManager`, that manages buffered items.
     * @returns The `BufferedItemsManager` object.
     */
    getBufferedItemsManager(): BufferedItemsManager;
    /**
     * Returns an object, of type `IntermediateResultManager`, that manages intermediate results.
     *
     * @returns The `IntermediateResultManager` object.
     */
    getIntermediateResultManager(bInner?: boolean): IntermediateResultManager;
    contains(points: [Point, Point, Point, Point], point: Point): boolean;
    parseRequiredResources(templateName: string): Promise<{
        models: string[];
        specss: string[];
    }>;
    /**
     * Releases all resources used by the `CaptureVisionRouter` instance.
     *
     * @returns A promise that resolves when the resources have been successfully released. It does not provide any value upon resolution.
     */
    dispose(): Promise<void>;
    private _enableResultCrossVerification;
    private _enableResultDeduplication;
    private _setDuplicateForgetTime;
    _getDuplicateForgetTime(type: EnumCapturedResultItemType): Promise<number>;
    _setThresholdValue(threshold: number, leftLimit: number, rightLimit: number): Promise<void>;
    private _checkIsDisposed;
}

declare class CaptureVisionRouterModule {
    private static _version;
    static getVersion(): string;
}

interface RawImageResultItem extends CapturedResultItem {
    readonly imageData: DSImageData;
}

export { CaptureVisionRouter, CaptureVisionRouterModule, CapturedResult, CapturedResultFilter, CapturedResultReceiver, EnumImageSourceState, ImageSourceStateListener, IntermediateResultManager, IntermediateResultReceiver, RawImageResultItem, SimplifiedCaptureVisionSettings };
