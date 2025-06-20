declare enum EnumBufferOverflowProtectionMode {
    /** New images are blocked when the buffer is full.*/
    BOPM_BLOCK = 0,
    /** New images are appended at the end, and oldest images are pushed out from the beginning if the buffer is full.*/
    BOPM_UPDATE = 1
}

declare enum EnumCapturedResultItemType {
    CRIT_ORIGINAL_IMAGE = 1,
    CRIT_BARCODE = 2,
    CRIT_TEXT_LINE = 4,
    CRIT_DETECTED_QUAD = 8,
    CRIT_DESKEWED_IMAGE = 16,
    CRIT_PARSED_RESULT = 32,
    CRIT_ENHANCED_IMAGE = 64
}

declare enum EnumCornerType {
    CT_NORMAL_INTERSECTED = 0,
    CT_T_INTERSECTED = 1,
    CT_CROSS_INTERSECTED = 2,
    CT_NOT_INTERSECTED = 3
}

/**
 * `ErrorCode` enumerates the specific error codes that the SDK may return, providing a systematic way to identify and handle errors encountered during its operation.
 */
declare enum EnumErrorCode {
    /** Operation completed successfully. */
    EC_OK = 0,
    /** An unspecified error occurred. */
    EC_UNKNOWN = -10000,
    /** The system does not have enough memory to perform the requested operation. */
    EC_NO_MEMORY = -10001,
    /** A null pointer was encountered where a valid pointer was required. */
    EC_NULL_POINTER = -10002,
    /** The provided license is not valid. */
    EC_LICENSE_INVALID = -10003,
    /** The provided license has expired. */
    EC_LICENSE_EXPIRED = -10004,
    /** The specified file could not be found. */
    EC_FILE_NOT_FOUND = -10005,
    /** The file type is not supported for processing. */
    EC_FILE_TYPE_NOT_SUPPORTED = -10006,
    /** The image's bits per pixel (BPP) is not supported. */
    EC_BPP_NOT_SUPPORTED = -10007,
    /** The specified index is out of the valid range. */
    EC_INDEX_INVALID = -10008,
    /** The specified custom region value is invalid or out of range. */
    EC_CUSTOM_REGION_INVALID = -10010,
    /** Failed to read the image due to an error in accessing or interpreting the image data. */
    EC_IMAGE_READ_FAILED = -10012,
    /** Failed to read a TIFF image, possibly due to corruption or unsupported format. */
    EC_TIFF_READ_FAILED = -10013,
    /** The provided DIB (Device-Independent Bitmaps) buffer is invalid or corrupted. */
    EC_DIB_BUFFER_INVALID = -10018,
    /** Failed to read a PDF image, possibly due to corruption or unsupported format. */
    EC_PDF_READ_FAILED = -10021,
    /** Required PDF processing DLL is missing. */
    EC_PDF_DLL_MISSING = -10022,
    /** The specified page number is invalid or out of bounds for the document. */
    EC_PAGE_NUMBER_INVALID = -10023,
    /** The specified custom size is invalid or not supported. */
    EC_CUSTOM_SIZE_INVALID = -10024,
    /** The operation timed out. */
    EC_TIMEOUT = -10026,
    /** Failed to parse JSON input. */
    EC_JSON_PARSE_FAILED = -10030,
    /** The JSON type is invalid for the expected context. */
    EC_JSON_TYPE_INVALID = -10031,
    /** The JSON key is invalid or unrecognized in the current context. */
    EC_JSON_KEY_INVALID = -10032,
    /** The JSON value is invalid for the specified key. */
    EC_JSON_VALUE_INVALID = -10033,
    /** The required "Name" key is missing in the JSON data. */
    EC_JSON_NAME_KEY_MISSING = -10034,
    /** The value of the "Name" key is duplicated and conflicts with existing data. */
    EC_JSON_NAME_VALUE_DUPLICATED = -10035,
    /** The template name is invalid or does not match any known template. */
    EC_TEMPLATE_NAME_INVALID = -10036,
    /** The reference made by the "Name" key is invalid or points to nonexistent data. */
    EC_JSON_NAME_REFERENCE_INVALID = -10037,
    /** The parameter value provided is invalid or out of the expected range. */
    EC_PARAMETER_VALUE_INVALID = -10038,
    /** The domain of the current site does not match the domain bound to the current product key. */
    EC_DOMAIN_NOT_MATCH = -10039,
    /** The license key does not match the license content. */
    EC_LICENSE_KEY_NOT_MATCH = -10043,
    /** Error setting the mode's argument, indicating invalid or incompatible arguments. */
    EC_SET_MODE_ARGUMENT_ERROR = -10051,
    /** Failed to retrieve the mode's argument, possibly due to invalid state or configuration. */
    EC_GET_MODE_ARGUMENT_ERROR = -10055,
    /** The Intermediate Result Types (IRT) license is invalid or not present. */
    EC_IRT_LICENSE_INVALID = -10056,
    /** Failed to save the file, possibly due to permissions, space, or an invalid path. */
    EC_FILE_SAVE_FAILED = -10058,
    /** The specified stage type is invalid or not supported in the current context. */
    EC_STAGE_TYPE_INVALID = -10059,
    /** The specified image orientation is invalid or not supported. */
    EC_IMAGE_ORIENTATION_INVALID = -10060,
    /** Failed to convert complex template to simplified settings, indicating a configuration or compatibility issue. */
    EC_CONVERT_COMPLEX_TEMPLATE_ERROR = -10061,
    /** Rejecting function call while capturing is in progress, to prevent conflicts or data corruption. */
    EC_CALL_REJECTED_WHEN_CAPTURING = -10062,
    /** The specified image source was not found, indicating a missing or inaccessible input source. */
    EC_NO_IMAGE_SOURCE = -10063,
    /** Failed to read the directory, possibly due to permissions, non-existence, or other access issues. */
    EC_READ_DIRECTORY_FAILED = -10064,
    /** A required module (e.g., DynamsoftBarcodeReader, DynamsoftLabelRecognizer) was not found. */
    EC_MODULE_NOT_FOUND = -10065,
    EC_MULTI_PAGES_NOT_SUPPORTED = -10066,
    /** Indicates an attempt to write to a file that already exists, with overwriting explicitly disabled. This error suggests the need for either enabling overwriting or ensuring unique file names to avoid conflicts. */
    EC_FILE_ALREADY_EXISTS = -10067,
    /** The specified file path does not exist and could not be created. This error could be due to insufficient permissions, a read-only filesystem, or other environmental constraints preventing file creation. */
    EC_CREATE_FILE_FAILED = -10068,
    /** The input ImageData object contains invalid parameters. This could be due to incorrect data types, out-of-range values, or improperly formatted data being passed to a function expecting ImageData. */
    EC_IMGAE_DATA_INVALID = -10069,
    /** The size of the input image does not meet the requirements. */
    EC_IMAGE_SIZE_NOT_MATCH = -10070,
    /** The pixel format of the input image does not meet the requirements. */
    EC_IMAGE_PIXEL_FORMAT_NOT_MATCH = -10071,
    /** The section level result is irreplaceable. */
    EC_SECTION_LEVEL_RESULT_IRREPLACEABLE = -10072,
    /** Incorrect axis definition. */
    EC_AXIS_DEFINITION_INCORRECT = -10073,
    /**The result is not replaceable due to type mismatch*/
    EC_RESULT_TYPE_MISMATCH_IRREPLACEABLE = -10074,
    /**Failed to load the PDF library.*/
    EC_PDF_LIBRARY_LOAD_FAILED = -10075,
    EC_UNSUPPORTED_JSON_KEY_WARNING = -10077,
    /**Model file is not found*/
    EC_MODEL_FILE_NOT_FOUND = -10078,
    /**[PDF] No license found.*/
    EC_PDF_LICENSE_NOT_FOUND = -10079,
    /**The rectangle is invalid.*/
    EC_RECT_INVALID = -10080,
    /** Indicates no license is available or the license is not set. */
    EC_NO_LICENSE = -20000,
    /** Encountered failures while attempting to read or write to the license buffer. */
    EC_LICENSE_BUFFER_FAILED = -20002,
    /** Synchronization with the license server failed, possibly due to network issues or server unavailability. */
    EC_LICENSE_SYNC_FAILED = -20003,
    /** The device attempting to use the license does not match the device specified in the license buffer. */
    EC_DEVICE_NOT_MATCH = -20004,
    /** Binding the device to the license failed, indicating possible issues with the license or device identifier. */
    EC_BIND_DEVICE_FAILED = -20005,
    /** The number of instances using the license exceeds the limit allowed by the license terms. */
    EC_INSTANCE_COUNT_OVER_LIMIT = -20008,
    /** Indicates the license in use is a trial version with limited functionality or usage time. */
    EC_TRIAL_LICENSE = -20010,
    /** The specified barcode format is invalid or unsupported. */
    EC_BARCODE_FORMAT_INVALID = -30009,
    /** The specified custom module size for barcode generation is invalid or outside acceptable limits. */
    EC_CUSTOM_MODULESIZE_INVALID = -30025,
    /**There is a conflict in the layout of TextLineGroup. */
    EC_TEXT_LINE_GROUP_LAYOUT_CONFLICT = -40101,
    /**There is a conflict in the regex of TextLineGroup. */
    EC_TEXT_LINE_GROUP_REGEX_CONFLICT = -40102,
    /** The specified quadrilateral is invalid, potentially due to incorrect points or an unprocessable shape. */
    EC_QUADRILATERAL_INVALID = -50057,
    /** The license for generating or processing panoramas is invalid or missing. */
    EC_PANORAMA_LICENSE_INVALID = -70060,
    /** The specified resource path does not exist, indicating a missing directory or incorrect path specification. */
    EC_RESOURCE_PATH_NOT_EXIST = -90001,
    /** Failed to load the specified resource, which might be due to missing files, access rights, or other issues preventing loading. */
    EC_RESOURCE_LOAD_FAILED = -90002,
    /** The code specification required for processing was not found, indicating a missing or incorrect specification. */
    EC_CODE_SPECIFICATION_NOT_FOUND = -90003,
    /** The full code string provided is empty, indicating no data was provided for processing. */
    EC_FULL_CODE_EMPTY = -90004,
    /** Preprocessing the full code string failed, possibly due to invalid format, corruption, or unsupported features. */
    EC_FULL_CODE_PREPROCESS_FAILED = -90005,
    /**The license is initialized successfully but detected invalid content in your key.*/
    EC_LICENSE_WARNING = -10076,
    /** [Barcode Reader] No license found.*/
    EC_BARCODE_READER_LICENSE_NOT_FOUND = -30063,
    /**[Label Recognizer] No license found.*/
    EC_LABEL_RECOGNIZER_LICENSE_NOT_FOUND = -40103,
    /**[Document Normalizer] No license found.*/
    EC_DOCUMENT_NORMALIZER_LICENSE_NOT_FOUND = -50058,
    /**[Code Parser] No license found.*/
    EC_CODE_PARSER_LICENSE_NOT_FOUND = -90012
}

declare enum EnumGrayscaleEnhancementMode {
    GEM_SKIP = 0,
    GEM_AUTO = 1,
    GEM_GENERAL = 2,
    GEM_GRAY_EQUALIZE = 4,
    GEM_GRAY_SMOOTH = 8,
    GEM_SHARPEN_SMOOTH = 16,
    GEM_REV = -2147483648,
    GEM_END = -1
}

declare enum EnumGrayscaleTransformationMode {
    GTM_SKIP = 0,
    GTM_INVERTED = 1,
    GTM_ORIGINAL = 2,
    GTM_AUTO = 4,
    GTM_REV = -2147483648,
    GTM_END = -1
}

declare enum EnumImagePixelFormat {
    IPF_BINARY = 0,
    IPF_BINARYINVERTED = 1,
    IPF_GRAYSCALED = 2,
    IPF_NV21 = 3,
    IPF_RGB_565 = 4,
    IPF_RGB_555 = 5,
    IPF_RGB_888 = 6,
    IPF_ARGB_8888 = 7,
    IPF_RGB_161616 = 8,
    IPF_ARGB_16161616 = 9,
    IPF_ABGR_8888 = 10,
    IPF_ABGR_16161616 = 11,
    IPF_BGR_888 = 12,
    IPF_BINARY_8 = 13,
    IPF_NV12 = 14,
    IPF_BINARY_8_INVERTED = 15
}

declare enum EnumImageTagType {
    ITT_FILE_IMAGE = 0,
    ITT_VIDEO_FRAME = 1
}

declare enum EnumPDFReadingMode {
    /** Outputs vector data found in the PDFs.*/
    PDFRM_VECTOR = 1,
    /** The default value.
     * Outputs raster data found in the PDFs.
     * Depending on the argument Resolution,
     * the SDK may rasterize the PDF pages.
     * Check the template for available argument settings.*/
    PDFRM_RASTER = 2,
    PDFRM_REV = -2147483648
}

declare enum EnumRasterDataSource {
    /** Specifies the target type for reading a PDF. */
    RDS_RASTERIZED_PAGES = 0,
    RDS_EXTRACTED_IMAGES = 1
}

declare enum EnumColourChannelUsageType {
    CCUT_AUTO = 0,
    CCUT_FULL_CHANNEL = 1,
    CCUT_Y_CHANNEL_ONLY = 2,
    CCUT_RGB_R_CHANNEL_ONLY = 3,
    CCUT_RGB_G_CHANNEL_ONLY = 4,
    CCUT_RGB_B_CHANNEL_ONLY = 5
}

declare enum EnumCrossVerificationStatus {
    /** The cross verification has not been performed yet. */
    CVS_NOT_VERIFIED = 0,
    /** The cross verification has been passed successfully. */
    CVS_PASSED = 1,
    /** The cross verification has failed. */
    CVS_FAILED = 2
}

declare const EnumIntermediateResultUnitType: {
    /** No intermediate result. */
    IRUT_NULL: bigint;
    /** A full-color image. */
    IRUT_COLOUR_IMAGE: bigint;
    /** A color image that has been scaled down for efficiency. */
    IRUT_SCALED_COLOUR_IMAGE: bigint;
    /** A grayscale image derived from the original input. */
    IRUT_GRAYSCALE_IMAGE: bigint;
    /** A grayscale image that has undergone transformation. */
    IRUT_TRANSOFORMED_GRAYSCALE_IMAGE: bigint;
    /** A grayscale image enhanced for further processing. */
    IRUT_ENHANCED_GRAYSCALE_IMAGE: bigint;
    /** Regions pre-detected as potentially relevant for further analysis. */
    IRUT_PREDETECTED_REGIONS: bigint;
    /** A binary (black and white) image. */
    IRUT_BINARY_IMAGE: bigint;
    /** Results from detecting textures within the image. */
    IRUT_TEXTURE_DETECTION_RESULT: bigint;
    /** A grayscale image with textures removed to enhance subject details like text or barcodes. */
    IRUT_TEXTURE_REMOVED_GRAYSCALE_IMAGE: bigint;
    /** A binary image with textures removed), useful for clear detection of subjects without background noise. */
    IRUT_TEXTURE_REMOVED_BINARY_IMAGE: bigint;
    /** Detected contours within the image), which can help in identifying shapes and objects. */
    IRUT_CONTOURS: bigint;
    /** Detected line segments), useful in structural analysis of the image content. */
    IRUT_LINE_SEGMENTS: bigint;
    /** Identified text zones), indicating areas with potential textual content. */
    IRUT_TEXT_ZONES: bigint;
    /** A binary image with text regions removed. */
    IRUT_TEXT_REMOVED_BINARY_IMAGE: bigint;
    /** Zones identified as potential barcode areas), aiding in focused barcode detection. */
    IRUT_CANDIDATE_BARCODE_ZONES: bigint;
    /** Barcodes that have been localized but not yet decoded. */
    IRUT_LOCALIZED_BARCODES: bigint;
    /** Barcode images scaled up for improved readability or decoding accuracy. */
    IRUT_SCALED_BARCODE_IMAGE: bigint;
    /** Images of barcodes processed to resist deformation and improve decoding success. */
    IRUT_DEFORMATION_RESISTED_BARCODE_IMAGE: bigint;
    /** Barcode images that have been complemented. */
    IRUT_COMPLEMENTED_BARCODE_IMAGE: bigint;
    /** Successfully decoded barcodes. */
    IRUT_DECODED_BARCODES: bigint;
    /** Detected long lines. */
    IRUT_LONG_LINES: bigint;
    /** Detected corners within the image. */
    IRUT_CORNERS: bigint;
    /** Candidate edges identified as potential components of quadrilaterals. */
    IRUT_CANDIDATE_QUAD_EDGES: bigint;
    /** Successfully detected quadrilaterals. */
    IRUT_DETECTED_QUADS: bigint;
    /** Text lines that have been localized in preparation for recognition. */
    IRUT_LOCALIZED_TEXT_LINES: bigint;
    /** Successfully recognized text lines. */
    IRUT_RECOGNIZED_TEXT_LINES: bigint;
    /** Successfully normalized images. */
    IRUT_DESKEWED_IMAGE: bigint;
    /** Successfully detected short lines. */
    IRUT_SHORT_LINES: bigint;
    IRUT_RAW_TEXT_LINES: bigint;
    /** Detected logic lines. */
    IRUT_LOGIC_LINES: bigint;
    IRUT_ENHANCED_IMAGE: bigint;
    /** A mask to select all types of intermediate results. */
    IRUT_ALL: bigint;
};
type EnumIntermediateResultUnitType = bigint;

declare enum EnumRegionObjectElementType {
    ROET_PREDETECTED_REGION = 0,
    ROET_LOCALIZED_BARCODE = 1,
    ROET_DECODED_BARCODE = 2,
    ROET_LOCALIZED_TEXT_LINE = 3,
    ROET_RECOGNIZED_TEXT_LINE = 4,
    ROET_DETECTED_QUAD = 5,
    ROET_DESKEWED_IMAGE = 6,
    ROET_SOURCE_IMAGE = 7,
    ROET_TARGET_ROI = 8,
    ROET_ENHANCED_IMAGE = 9
}

declare enum EnumSectionType {
    ST_NULL = 0,
    ST_REGION_PREDETECTION = 1,
    ST_BARCODE_LOCALIZATION = 2,
    ST_BARCODE_DECODING = 3,
    ST_TEXT_LINE_LOCALIZATION = 4,
    ST_TEXT_LINE_RECOGNITION = 5,
    ST_DOCUMENT_DETECTION = 6,
    ST_DOCUMENT_DESKEWING = 7,
    ST_IMAGE_ENHANCEMENT = 8
}

declare enum EnumImageFileFormat {
    IFF_JPEG = 0,
    IFF_PNG = 1,
    IFF_BMP = 2,
    IFF_PDF = 3
}

declare enum EnumImageCaptureDistanceMode {
    ICDM_NEAR = 0,
    ICDM_FAR = 1
}

declare enum EnumModuleName {
    MN_DYNAMSOFT_CAPTURE_VISION_ROUTER = "cvr",
    MN_DYNAMSOFT_CORE = "core",
    MN_DYNAMSOFT_LICENSE = "license",
    MN_DYNAMSOFT_IMAGE_PROCESSING = "dip",
    MN_DYNAMSOFT_UTILITY = "utility",
    MN_DYNAMSOFT_BARCODE_READER = "dbr",
    MN_DYNAMSOFT_DOCUMENT_NORMALIZER = "ddn",
    MN_DYNAMSOFT_LABEL_RECOGNIZER = "dlr",
    MN_DYNAMSOFT_CAPTURE_VISION_DATA = "dcvData",
    MN_DYNAMSOFT_NEURAL_NETWORK = "dnn",
    MN_DYNAMSOFT_CODE_PARSER = "dcp",
    MN_DYNAMSOFT_CAMERA_ENHANCER = "dce",
    MN_DYNAMSOFT_CAPTURE_VISION_STD = "std"
}

declare enum EnumTransformMatrixType {
    TMT_LOCAL_TO_ORIGINAL_IMAGE = 0,
    TMT_ORIGINAL_TO_LOCAL_IMAGE = 1,
    TMT_LOCAL_TO_SECTION_IMAGE = 2,
    TMT_SECTION_TO_LOCAL_IMAGE = 3
}

type WorkerAutoResources = {
    [key in EnumModuleName]?: {
        js?: boolean;
        wasm?: boolean;
        deps?: EnumModuleName[];
    };
};
interface PostMessageBody {
    needLoadCore?: boolean;
    bLog?: boolean;
    bd?: boolean;
    dm?: string;
    value?: boolean;
    count?: number;
    engineResourcePaths?: EngineResourcePaths;
    autoResources?: WorkerAutoResources;
    names?: string[];
    _bundleEnv?: "DCV" | "DBR";
    _useSimd?: boolean;
}
type PathInfo = {
    version: string;
    path: string;
    isInternal?: boolean;
};
type DwtInfo = {
    resourcesPath?: string;
    serviceInstallerLocation?: string;
};
interface EngineResourcePaths {
    "rootDirectory"?: string;
    "std"?: string | PathInfo;
    "dip"?: string | PathInfo;
    "dnn"?: string | PathInfo;
    "core"?: string | PathInfo;
    "license"?: string | PathInfo;
    "cvr"?: string | PathInfo;
    "utility"?: string | PathInfo;
    "dbr"?: string | PathInfo;
    "dlr"?: string | PathInfo;
    "ddn"?: string | PathInfo;
    "dcp"?: string | PathInfo;
    "dce"?: string | PathInfo;
    "dcvData"?: string | PathInfo;
    "ddv"?: string | PathInfo;
    "dwt"?: string | DwtInfo;
    "dbrBundle"?: string | PathInfo;
    "dcvBundle"?: string | PathInfo;
}
interface InnerVersions {
    [key: string]: {
        worker?: string;
        wasm?: string;
    };
}
interface WasmVersions {
    "DIP"?: string;
    "DNN"?: string;
    "CORE"?: string;
    "LICENSE"?: string;
    "CVR"?: string;
    "UTILITY"?: string;
    "DBR"?: string;
    "DLR"?: string;
    "DDN"?: string;
    "DCP"?: string;
}
interface MapController {
    [key: string]: ((body: any, taskID: number, instanceID?: number) => void);
}
type MimeType = "image/png" | "image/jpeg";

declare const mapAsyncDependency: {
    [key: string]: any;
};
declare const waitAsyncDependency: (depName: string | string[]) => Promise<void>;
declare const doOrWaitAsyncDependency: (depName: string | string[], asyncFunc: () => Promise<void>) => Promise<void>;
declare let worker: Worker;
declare const getNextTaskID: () => number;
declare const mapTaskCallBack: {
    [key: string]: Function;
};
declare let onLog: (message: string) => void | undefined;
declare const setOnLog: (value: typeof onLog) => void;
declare let bDebug: boolean;
declare const setBDebug: (value: boolean) => void;
declare const innerVersions: InnerVersions;
declare const mapPackageRegister: {
    [key: string]: any;
};
declare const workerAutoResources: WorkerAutoResources;
declare class CoreModule {
    static get engineResourcePaths(): EngineResourcePaths;
    static set engineResourcePaths(value: EngineResourcePaths);
    private static _bSupportDce4Module;
    static get bSupportDce4Module(): number;
    private static _bSupportIRTModule;
    static get bSupportIRTModule(): number;
    private static _versions;
    static get versions(): any;
    static get _onLog(): (message: string) => void;
    static set _onLog(value: (message: string) => void);
    static get _bDebug(): boolean;
    static set _bDebug(value: boolean);
    static _bundleEnv: "DCV" | "DBR";
    static _workerName: string;
    static _useSimd: boolean;
    /**
     * Determine if the decoding module has been loaded successfully.
     * @category Initialize and Destroy
     */
    static isModuleLoaded(name?: string): boolean;
    static loadWasm(): Promise<void>;
    /**
     * Detect environment and get a report.
     */
    static detectEnvironment(): Promise<any>;
    /**
     * modify from https://gist.github.com/2107/5529665
     * @ignore
     */
    static browserInfo: any;
    static getModuleVersion(): Promise<WasmVersions>;
    static getVersion(): string;
    static enableLogging(): void;
    static disableLogging(): void;
    static cfd(count: number): Promise<void>;
}

interface ImageTag {
    imageId: number;
    type: EnumImageTagType;
}

interface DSImageData {
    bytes: Uint8Array;
    width: number;
    height: number;
    stride: number;
    format: EnumImagePixelFormat;
    tag?: ImageTag;
}

interface CapturedResultItem {
    readonly type: EnumCapturedResultItemType;
    readonly referenceItem: CapturedResultItem | null;
    readonly targetROIDefName: string;
    readonly taskName: string;
}

interface OriginalImageResultItem extends CapturedResultItem {
    readonly imageData: DSImageData;
}

interface Point {
    x: number;
    y: number;
}

interface Contour {
    points: Array<Point>;
}

interface LineSegment {
    startPoint: Point;
    endPoint: Point;
}

interface Corner {
    type: EnumCornerType;
    intersection: Point;
    line1: LineSegment;
    line2: LineSegment;
}

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    isMeasuredInPercentage?: boolean;
}

interface Arc {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
}

interface Polygon {
    points: Array<Point>;
}

interface DSRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
    isMeasuredInPercentage?: boolean;
}

interface Edge {
    startCorner: Corner;
    endCorner: Corner;
}

interface FileImageTag extends ImageTag {
    filePath: string;
    pageNumber: number;
    totalPages: number;
}

interface ImageSourceErrorListener {
    /**
     * Called when an error is received from the image source.
     *
     * @param errorCode An enumeration value of type "EnumErrorCode" indicating the type of error.
     * @param errorMessage A C-style string containing the error message providing
     *                     additional information about the error.
     */
    onErrorReceived: (errorCode: EnumErrorCode, errorMessage: string) => void;
}

interface PDFReadingParameter {
    mode: EnumPDFReadingMode;
    dpi: number;
    rasterDataSource: EnumRasterDataSource;
}

interface Quadrilateral {
    points: [Point, Point, Point, Point];
    boundingRect?: DSRect;
    area?: number;
}

interface DSFile extends File {
    download: () => void;
}

interface Warning {
    id: number;
    message: string;
}

interface IntermediateResultUnit {
    hashId: string;
    originalImageHashId: string;
    originalImageTag: ImageTag;
    unitType: EnumIntermediateResultUnitType;
}

interface BinaryImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface ColourImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface ContoursUnit extends IntermediateResultUnit {
    contours: Array<Contour>;
}

interface EnhancedGrayscaleImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface GrayscaleImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface IntermediateResult {
    intermediateResultUnits: Array<IntermediateResultUnit>;
}

interface IntermediateResultExtraInfo {
    targetROIDefName: string;
    taskName: string;
    isSectionLevelResult: boolean;
    sectionType: EnumSectionType;
}

interface LineSegmentsUnit extends IntermediateResultUnit {
    lineSegments: Array<LineSegment>;
}

interface RegionObjectElement {
    location: Quadrilateral;
    referencedElement: RegionObjectElement;
    elementType: EnumRegionObjectElementType;
    imageData: DSImageData;
}

interface PredetectedRegionElement extends RegionObjectElement {
    modeName: string;
    labelID: number;
    labelName: string;
}

interface PredetectedRegionsUnit extends IntermediateResultUnit {
    predetectedRegions: Array<PredetectedRegionElement>;
}

interface ScaledColourImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface ShortLinesUnit extends IntermediateResultUnit {
    shortLines: Array<LineSegment>;
}

interface TextRemovedBinaryImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface TextureDetectionResultUnit extends IntermediateResultUnit {
    xSpacing: number;
    ySpacing: number;
}

interface TextureRemovedBinaryImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface TextureRemovedGrayscaleImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

interface TextZone {
    location: Quadrilateral;
    charContoursIndices: Array<number>;
}

interface TextZonesUnit extends IntermediateResultUnit {
    textZones: Array<TextZone>;
}

interface TransformedGrayscaleImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}

/**
 * The `ObservationParameters` interface represents an object used to configure intermediate result observation.
 */
interface ObservationParameters {
    /**
     * Sets the types of intermediate result units that are observed.
     * @param types The types of intermediate result units to observe.
     * @returns A promise that resolves when the types have been successfully set. It does not provide any value upon resolution.
     */
    setObservedResultUnitTypes: (types: bigint) => void;
    /**
     * Retrieves the types of intermediate result units that are observed.
     * @returns A promise that resolves with a number that represents the types that are observed.
     */
    getObservedResultUnitTypes: () => bigint;
    /**
     * Determines whether the specified result unit type is observed.
     * @param type The result unit type to check.
     * @returns Boolean indicating whether the result unit type is observed.
     */
    isResultUnitTypeObserved: (type: EnumIntermediateResultUnitType) => boolean;
    /**
     * Adds an observed task by its name.
     * @param taskName The name of the task.
     */
    addObservedTask: (taskName: string) => void;
    /**
     * Removes an observed task by its name.
     * @param taskName The name of the task.
     */
    removeObservedTask: (taskName: string) => void;
    /**
     * Determines whether the specified task is observed.
     * @param taskName The name of the task.
     * @returns Boolean indicating whether the task is observed.
     */
    isTaskObserved: (taskName: string) => boolean;
}

interface CapturedResultBase {
    readonly errorCode: number;
    readonly errorString: string;
    readonly originalImageHashId: string;
    readonly originalImageTag: ImageTag;
}

declare abstract class ImageSourceAdapter {
    #private;
    /**
     * @ignore
     */
    static _onLog: (message: any) => void;
    /**
     * @ignore
     */
    get _isFetchingStarted(): boolean;
    constructor();
    abstract hasNextImageToFetch(): boolean;
    /**
     * @brief Sets the error listener for the image source.
     *
     * This function allows you to set an error listener object that will receive
     * notifications when errors occur during image source operations.
     * If an error occurs, the error information will be passed to the listener's
     * OnErrorReceived method.
     *
     * @param listener An instance of ImageSourceErrorListener or its
     *                 derived class, which will handle error notifications.
     */
    setErrorListener(listener: ImageSourceErrorListener): void;
    /**
     * Adds an image to the internal buffer.
     *
     * @param image An instance of `DSImageData` containing the image to buffer.
     */
    addImageToBuffer(image: DSImageData): void;
    /**
     * Retrieves a buffered image, of type `DSImageData`.
     *
     * This function retrieves the latest image added to the buffer, and removes it from the buffer in the process.
     *
     * @returns A `DSImageData` object retrieved from the buffer which contains the image data of the frame and related information.
     */
    getImage(): DSImageData;
    /**
     * Sets the processing priority of a specific image. This can affect the order in which images are returned by getImage.
     *
     * @param imageId The ID of the image to prioritize.
     * @param keepInBuffer [Optional] Boolean indicating whether to keep the image in the buffer after it has been returned.
     */
    setNextImageToReturn(imageId: number, keepInBuffer?: boolean): void;
    /**
     * @ignore
     */
    _resetNextReturnedImage(): void;
    /**
     * Checks if an image with the specified ID is present in the buffer.
     *
     * @param imageId The ID of the image to check.
     *
     * @returns Boolean indicating whether the image is present in the buffer.
     */
    hasImage(imageId: number): boolean;
    /**
     * Starts the process of fetching images.
     */
    startFetching(): void;
    /**
     * Stops the process of fetching images.
     * to false, indicating that image fetching has been halted.
     */
    stopFetching(): void;
    /**
     * Sets the maximum number of images that can be buffered at any time. Implementing classes should attempt to keep the buffer within this limit.
     *
     * @param count The maximum number of images the buffer can hold.
     */
    setMaxImageCount(count: number): void;
    /**
     * Retrieves the maximum number of images that can be buffered.
     *
     * @returns The maximum image count for the buffer.
     */
    getMaxImageCount(): number;
    /**
     * Retrieves the current number of images in the buffer.
     *
     * @returns The current image count in the buffer.
     */
    getImageCount(): number;
    /**
     * Clears all images from the buffer, resetting the state for new image fetching.
     */
    clearBuffer(): void;
    /**
     * Determines whether the buffer is currently empty.
     *
     * @returns Boolean indicating whether the buffer is empty.
     */
    isBufferEmpty(): boolean;
    /**
     * Sets the behavior for handling new incoming images when the buffer is full. Implementations should adhere to the specified mode to manage buffer overflow.
     *
     * @param mode One of the modes defined in EnumBufferOverflowProtectionMode, specifying how to handle buffer overflow.
     */
    setBufferOverflowProtectionMode(mode: EnumBufferOverflowProtectionMode): void;
    /**
     * Retrieves the current mode for handling buffer overflow.
     *
     * @returns The current buffer overflow protection mode.
     */
    getBufferOverflowProtectionMode(): EnumBufferOverflowProtectionMode;
    /**
     * Sets the usage type for color channels in images.
     *
     * @param type One of the types defined in EnumColourChannelUsageType, specifying how color channels should be used.
     */
    setColourChannelUsageType(type: EnumColourChannelUsageType): void;
    /**
     * Retrieves the current mode for handling buffer overflow.
     *
     * @returns The current buffer overflow protection mode.
     */
    getColourChannelUsageType(): EnumColourChannelUsageType;
}

/**
 * Judge if the input is an object(exclude array and function). If `null` or `undefined`, return `false`.
 * @param value
 * @returns
 */
declare const isObject: (value: any) => value is Object;
/**
 * Judge is the input is a {@link Arc} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isArc: (value: any) => value is Arc;
/**
 * Judge is the input is a {@link Contour} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isContour: (value: any) => value is Contour;
declare const isOriginalDsImageData: (value: any) => boolean;
/**
 * Judge is the input is a {@link DSImageData} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isDSImageData: (value: any) => value is DSImageData;
/**
 * Judge is the input is a {@link DSRect} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isDSRect: (value: any) => value is DSRect;
/**
 * Judge is the input is a {@link ImageTag} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isImageTag: (value: any) => value is ImageTag;
/**
 * Judge is the input is a {@link LineSegment} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isLineSegment: (value: any) => value is LineSegment;
/**
 * Judge is the input is a {@link Point} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isPoint: (value: any) => value is Point;
/**
 * Judge is the input is a {@link Polygon} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isPolygon: (value: any) => value is Polygon;
/**
 * Judge is the input is a {@link Quadrilateral} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isQuad: (value: any) => value is Quadrilateral;
/**
 * Judge is the input is a {@link Rect} object.
 * @param value
 * @returns
 * @ignore
 */
declare const isRect: (value: any) => value is Rect;

declare const requestResource: (url: string, type: "text" | "blob" | "arraybuffer") => Promise<any>;
declare const checkIsLink: (str: string) => boolean;
declare const compareVersion: (strV1: string, strV2: string) => number;
declare const handleEngineResourcePaths: (engineResourcePaths: EngineResourcePaths) => EngineResourcePaths;
declare const _saveToFile: (imageData: ImageData, name: string, download?: boolean) => Promise<File>;
declare const _toCanvas: (imageData: ImageData | DSImageData) => HTMLCanvasElement;
declare const _toImage: (MIMEType: MimeType, imageData: ImageData | DSImageData) => HTMLImageElement;
declare const _toBlob: (MIMEType: MimeType, imageData: ImageData | DSImageData) => Promise<Blob>;
declare const _getNorImageData: (dsImageData: DSImageData) => ImageData;
declare const isSimdSupported: () => Promise<boolean>;
declare const productNameMap: {
    readonly std: "dynamsoft-capture-vision-std";
    readonly dip: "dynamsoft-image-processing";
    readonly core: "dynamsoft-core";
    readonly dnn: "dynamsoft-capture-vision-dnn";
    readonly license: "dynamsoft-license";
    readonly utility: "dynamsoft-utility";
    readonly cvr: "dynamsoft-capture-vision-router";
    readonly dbr: "dynamsoft-barcode-reader";
    readonly dlr: "dynamsoft-label-recognizer";
    readonly ddn: "dynamsoft-document-normalizer";
    readonly dcp: "dynamsoft-code-parser";
    readonly dcvData: "dynamsoft-capture-vision-data";
    readonly dce: "dynamsoft-camera-enhancer";
    readonly ddv: "dynamsoft-document-viewer";
    readonly dwt: "dwt";
    readonly dbrBundle: "dynamsoft-barcode-reader-bundle";
    readonly dcvBundle: "dynamsoft-capture-vision-bundle";
};

export { Arc, BinaryImageUnit, CapturedResultBase, CapturedResultItem, ColourImageUnit, Contour, ContoursUnit, CoreModule, Corner, DSFile, DSImageData, DSRect, DwtInfo, Edge, EngineResourcePaths, EnhancedGrayscaleImageUnit, EnumBufferOverflowProtectionMode, EnumCapturedResultItemType, EnumColourChannelUsageType, EnumCornerType, EnumCrossVerificationStatus, EnumErrorCode, EnumGrayscaleEnhancementMode, EnumGrayscaleTransformationMode, EnumImageCaptureDistanceMode, EnumImageFileFormat, EnumImagePixelFormat, EnumImageTagType, EnumIntermediateResultUnitType, EnumModuleName, EnumPDFReadingMode, EnumRasterDataSource, EnumRegionObjectElementType, EnumSectionType, EnumTransformMatrixType, FileImageTag, GrayscaleImageUnit, ImageSourceAdapter, ImageSourceErrorListener, ImageTag, InnerVersions, IntermediateResult, IntermediateResultExtraInfo, IntermediateResultUnit, LineSegment, LineSegmentsUnit, MapController, MimeType, ObservationParameters, OriginalImageResultItem, PDFReadingParameter, PathInfo, Point, Polygon, PostMessageBody, PredetectedRegionElement, PredetectedRegionsUnit, Quadrilateral, Rect, RegionObjectElement, ScaledColourImageUnit, ShortLinesUnit, TextRemovedBinaryImageUnit, TextZone, TextZonesUnit, TextureDetectionResultUnit, TextureRemovedBinaryImageUnit, TextureRemovedGrayscaleImageUnit, TransformedGrayscaleImageUnit, Warning, WasmVersions, WorkerAutoResources, _getNorImageData, _saveToFile, _toBlob, _toCanvas, _toImage, bDebug, checkIsLink, compareVersion, doOrWaitAsyncDependency, getNextTaskID, handleEngineResourcePaths, innerVersions, isArc, isContour, isDSImageData, isDSRect, isImageTag, isLineSegment, isObject, isOriginalDsImageData, isPoint, isPolygon, isQuad, isRect, isSimdSupported, mapAsyncDependency, mapPackageRegister, mapTaskCallBack, onLog, productNameMap, requestResource, setBDebug, setOnLog, waitAsyncDependency, worker, workerAutoResources };






interface CapturedResult extends CapturedResultBase {
    items: Array<CapturedResultItem>;
    decodedBarcodesResult?: DecodedBarcodesResult;
    recognizedTextLinesResult?: RecognizedTextLinesResult;
    processedDocumentResult?: ProcessedDocumentResult;
    parsedResult?: ParsedResult;
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
    onTargetROIResultsReceived?: (result: IntermediateResultUnit, info: IntermediateResultExtraInfo) => void;
    onColourImageUnitReceived?: (result: ColourImageUnit, info: IntermediateResultExtraInfo) => void;
    onScaledColourImageUnitReceived?: (result: ScaledColourImageUnit, info: IntermediateResultExtraInfo) => void;
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
    _intermediateResultReceiverSet: Set<IntermediateResultReceiver>;
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
    outputOriginalImage: boolean;
    roi: Quadrilateral;
    roiMeasuredInPercentage: boolean;
    timeout: number;
    minImageCaptureInterval: number;
    barcodeSettings: SimplifiedBarcodeReaderSettings;
    documentSettings: SimplifiedDocumentNormalizerSettings;
    labelSettings: SimplifiedLabelRecognizerSettings;
}

interface CapturedResultFilter {
    onOriginalImageResultReceived?: (result: OriginalImageResultItem) => void;
    [key: string]: any;
}

declare class CaptureVisionRouter {
    #private;
    static _onLog: (message: string) => void;
    static _defaultTemplate: string;
    maxImageSideLength: number;
    onCaptureError: (error: Error) => void;
    _instanceID: number;
    private _dsImage;
    private _loopReadVideoTimeoutId;
    private _isPauseScan;
    private _isOutputOriginalImage;
    private _templateName;
    private _isOpenDetectVerify;
    private _isOpenNormalizeVerify;
    private _isOpenBarcodeVerify;
    private _isOpenLabelVerify;
    private _minImageCaptureInterval;
    private _averageProcessintTimeArray;
    private _averageFetchImageTimeArray;
    private _currentSettings;
    private _averageTime;
    private _dynamsoft;
    /**
     * Returns whether the `CaptureVisionRouter` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CaptureVisionRouter` instance has been disposed of.
     */
    get disposed(): boolean;
    /**
     * Initializes a new instance of the `CaptureVisionRouter` class.
     *
     * @returns A promise that resolves with the initialized `CaptureVisionRouter` instance.
     */
    static createInstance(loadPresetTemplates?: boolean): Promise<CaptureVisionRouter>;
    /**
      * Loads a specific data file containing recognition information. This file typically comprises a Convolutional Neural Networks (CNN) model.
      * @param dataName Specifies the name of the data.
      * @param dataPath [Optional] Specifies the path to find the data file. If not specified, the default path points to the package "dynamsoft-capture-vision-data" which has the same root path as the packag"dynamsoft-capture-vision-router".
      *
      * @returns A promise that resolves once the recognition data file is successfully loaded. It does not provide any value upon resolution.
      */
    static appendModelBuffer(modelName: string, dataPath?: string): Promise<unknown>;
    /**
     * An event that fires during the loading of a recognition data file (.data).
     * @param filePath The path of the recognition data file.
     * @param tag Indicates the ongoing status of the file download ("starting", "in progress", "completed").
     * @param progress An object indicating the progress of the download, with `loaded` and `total` bytes.
     */
    static onDataLoadProgressChanged: (filePath: string, tag: "starting" | "in progress" | "completed", progress: {
        loaded: number;
        total: number;
    }) => void;
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
    private _handleFilterUpdate;
    /**
     * Initiates a capturing process based on a specified template. This process is repeated for each image fetched from the source.
     * @param templateName [Optional] Specifies a "CaptureVisionTemplate" to use.
     *
     * @returns A promise that resolves when the capturing process has successfully started. It does not provide any value upon resolution.
     */
    startCapturing(templateName: string): Promise<void>;
    /**
     * Stops the capturing process.
     */
    stopCapturing(): void;
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
    outputSettings(templateName?: string, includeDefaultValues?: boolean): Promise<any>;
    /**
     * Generates a Blob object or initiates a JSON file download containing the settings for the specified `CaptureVisionTemplate`.
     * @param templateName Specifies a `CaptureVisionTemplate` by its name. If passed "*", the returned object will contain all templates.
     * @param fileName Specifies the name of the file.
     * @param download Boolean that specifies whether to initiates a file download.
     *
     * @returns A promise that resolves with the Blob object that contains settings for the specified template or all templates.
     */
    outputSettingsToFile(templateName: string, fileName: string, download?: boolean, includeDefaultValues?: boolean): Promise<Blob>;
    /** Get all parameter template names.
     *
     * @returns A promise that resolves with an array of template names.
     */
    getTemplateNames(): Promise<Array<string>>;
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
    getIntermediateResultManager(): IntermediateResultManager;
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
    /**
    * For Debug
    */
    private _getInternalData;
    private _getWasmFilterState;
}

declare class CaptureVisionRouterModule {
    private static _version;
    static getVersion(): string;
}

interface RawImageResultItem extends CapturedResultItem {
    readonly imageData: DSImageData;
}

declare enum EnumPresetTemplate {
    /**
     * @brief Versatile function for barcode reading, document detection, or text recognition.
     */
    PT_DEFAULT = "Default",
    /**
     * @brief Scans a single barcode.
     */
    PT_READ_BARCODES = "ReadBarcodes_Default",
    /**
     * @brief Identifies and reads any text present.
     */
    PT_RECOGNIZE_TEXT_LINES = "RecognizeTextLines_Default",
    /**
     * @brief Identifies the edges of a document.
     */
    PT_DETECT_DOCUMENT_BOUNDARIES = "DetectDocumentBoundaries_Default",
    /**
     * @brief Detects document edges and standardizes its format.
     */
    PT_DETECT_AND_NORMALIZE_DOCUMENT = "DetectAndNormalizeDocument_Default",
    /**
     * @brief Adjusts a document to a standard format using detected borders.
     */
    PT_NORMALIZE_DOCUMENT = "NormalizeDocument_Default",
    /**
     * @brief Represents a barcode reading mode where speed is prioritized.
     *
     * In this mode, the barcode reader will optimize for faster barcode detection
     * and decoding, sacrificing some level of accuracy and read rate. It is suitable
     * for situations where a quick response time is more important than perfect
     * barcode recognition.
     */
    PT_READ_BARCODES_SPEED_FIRST = "ReadBarcodes_SpeedFirst",
    /**
     * @brief Represents a barcode reading mode where barcode read rate is prioritized.
     *
     * In this mode, the barcode reader will optimize for higher barcode read rates,
     * even if it may sometimes result in reduced accuracy and speed. It is suitable for
     * scenarios where maximizing the number of successfully read barcodes is critical.
     */
    PT_READ_BARCODES_READ_RATE_FIRST = "ReadBarcodes_ReadRateFirst",
    /**
     * @brief Represents a balanced barcode reading mode.
     *
     * This mode aims for a reasonable balance between speed and read rate in barcode
     * recognition. It is suitable for most common use cases where a compromise between
     * speed and read rate is acceptable.
     */
    PT_READ_BARCODES_BALANCE = "ReadBarcodes_Balance",
    /**
    * @brief Represents a barcode reading mode for single barcode code detection.
    *
    * In this mode, the barcode reader will focus on detecting and decoding a single
    * barcode code, ignoring any additional codes in the same image. It is efficient
    * when the target image has only one barcode.
    */
    PT_READ_SINGLE_BARCODE = "ReadSingleBarcode",
    /**
     * @brief Represents a barcode reading mode optimized for dense barcode codes.
     *
     * This mode is designed to handle dense or closely packed barcode codes where
     * accuracy is paramount. It may operate slower than other modes but is suitable
     * for challenging scenarios where code density is high.
     */
    PT_READ_DENSE_BARCODES = "ReadDenseBarcodes",
    /**
     * @brief Represents a barcode reading mode optimized for distant barcode codes.
     *
     * This mode is designed to scanning a barcode that is placed far from the device.
     */
    PT_READ_DISTANT_BARCODES = "ReadDistantBarcodes",
    /**
    * @brief Represents a text recognition mode focused on recognizing numbers.
    */
    PT_RECOGNIZE_NUMBERS = "RecognizeNumbers",
    /**
     * @brief Represents a text recognition mode focused on recognizing alphabetic characters (letters).
     *
     */
    PT_RECOGNIZE_LETTERS = "RecognizeLetters",
    /**
     * @brief Represents a text recognition mode that combines numbers and alphabetic characters (letters) recognition.
     */
    PT_RECOGNIZE_NUMBERS_AND_LETTERS = "RecognizeNumbersAndLetters",
    /**
     * @brief Represents a text recognition mode that combines numbers and uppercase letters recognition.
     */
    PT_RECOGNIZE_NUMBERS_AND_UPPERCASE_LETTERS = "RecognizeNumbersAndUppercaseLetters",
    /**
     * @brief Represents a text recognition mode focused on recognizing uppercase letters.
     */
    PT_RECOGNIZE_UPPERCASE_LETTERS = "RecognizeUppercaseLetters"
}

export { CaptureVisionRouter, CaptureVisionRouterModule, CapturedResult, CapturedResultFilter, CapturedResultReceiver, EnumImageSourceState, EnumPresetTemplate, ImageSourceStateListener, IntermediateResultReceiver, RawImageResultItem, SimplifiedCaptureVisionSettings };


declare class BarcodeReaderModule {
    static getVersion(): string;
}

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
    /**Telepen*/
    BF_TELEPEN: bigint;
    /**Telepen Numeric. A variation of the Telepen format optimized for encoding numeric data only.*/
    BF_TELEPEN_NUMERIC: bigint;
};
type EnumBarcodeFormat = bigint;

declare enum EnumExtendedBarcodeResultType {
    EBRT_STANDARD_RESULT = 0,
    EBRT_CANDIDATE_RESULT = 1,
    EBRT_PARTIAL_RESULT = 2
}

declare enum EnumQRCodeErrorCorrectionLevel {
    QRECL_ERROR_CORRECTION_H = 0,
    QRECL_ERROR_CORRECTION_L = 1,
    QRECL_ERROR_CORRECTION_M = 2,
    QRECL_ERROR_CORRECTION_Q = 3
}

/** Label: DBRJS10.0.10-Check
 * @enum EnumLocalizationMode
 *
 * Describes the localization mode.
 */
declare enum EnumLocalizationMode {
    LM_AUTO = 1,
    LM_CONNECTED_BLOCKS = 2,
    LM_STATISTICS = 4,
    LM_LINES = 8,
    LM_SCAN_DIRECTLY = 16,
    LM_STATISTICS_MARKS = 32,
    LM_STATISTICS_POSTAL_CODE = 64,
    LM_CENTRE = 128,
    LM_ONED_FAST_SCAN = 256,
    LM_REV = -2147483648,
    LM_SKIP = 0,
    LM_END = -1
}

declare enum EnumDeblurMode {
    DM_DIRECT_BINARIZATION = 1,
    DM_THRESHOLD_BINARIZATION = 2,
    DM_GRAY_EQUALIZATION = 4,
    DM_SMOOTHING = 8,
    DM_MORPHING = 16,
    DM_DEEP_ANALYSIS = 32,
    DM_SHARPENING = 64,
    DM_BASED_ON_LOC_BIN = 128,
    DM_SHARPENING_SMOOTHING = 256,
    DM_NEURAL_NETWORK = 512,
    DM_REV = -2147483648,
    DM_SKIP = 0,
    DM_END = -1
}

interface BarcodeDetails {
}

interface AztecDetails extends BarcodeDetails {
    rows: number;
    columns: number;
    layerNumber: number;
}

interface BarcodeResultItem extends CapturedResultItem {
    format: EnumBarcodeFormat;
    formatString: string;
    text: string;
    bytes: Uint8Array;
    location: Quadrilateral;
    confidence: number;
    angle: number;
    moduleSize: number;
    details: BarcodeDetails;
    isMirrored: boolean;
    isDPM: boolean;
}

interface DataMatrixDetails extends BarcodeDetails {
    rows: number;
    columns: number;
    dataRegionRows: number;
    dataRegionColumns: number;
    dataRegionNumber: number;
}

interface DecodedBarcodesResult extends CapturedResultBase {
    readonly barcodeResultItems: Array<BarcodeResultItem>;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface CapturedResultReceiver {
        onDecodedBarcodesReceived?: (result: DecodedBarcodesResult) => void;
    }
    interface CapturedResultFilter {
        onDecodedBarcodesReceived?: (result: DecodedBarcodesResult) => void;
    }
}

interface DecodedBarcodeElement extends RegionObjectElement {
    format: EnumBarcodeFormat;
    formatString: string;
    text: string;
    bytes: Uint8Array;
    details: BarcodeDetails;
    isDPM: boolean;
    isMirrored: boolean;
    angle: number;
    moduleSize: number;
    confidence: number;
    extendedBarcodeResults: Array<ExtendedBarcodeResult>;
}

interface ExtendedBarcodeResult extends DecodedBarcodeElement {
    extendedBarcodeResultType: EnumExtendedBarcodeResultType;
    deformation: number;
    clarity: number;
    samplingImage: DSImageData;
}

interface OneDCodeDetails extends BarcodeDetails {
    startCharsBytes: Array<number>;
    stopCharsBytes: Array<number>;
    checkDigitBytes: Array<number>;
    startPatternRange: number;
    middlePatternRange: number;
    endPatternRange: number;
}

interface PDF417Details extends BarcodeDetails {
    rows: number;
    columns: number;
    errorCorrectionLevel: number;
    hasLeftRowIndicator: boolean;
    hasRightRowIndicator: boolean;
    codewords: Array<number>;
}

interface QRCodeDetails extends BarcodeDetails {
    rows: number;
    columns: number;
    errorCorrectionLevel: number;
    version: number;
    model: number;
    mode: number;
    page: number;
    totalPage: number;
    parityData: number;
    dataMaskPattern: number;
    codewords: Array<string>;
}

interface SimplifiedBarcodeReaderSettings {
    barcodeFormatIds: EnumBarcodeFormat;
    expectedBarcodesCount: number;
    grayscaleTransformationModes: Array<EnumGrayscaleTransformationMode>;
    grayscaleEnhancementModes: Array<EnumGrayscaleEnhancementMode>;
    localizationModes: Array<number>;
    deblurModes: Array<number>;
    minResultConfidence: number;
    minBarcodeTextLength: number;
    barcodeTextRegExPattern: string;
    scaleDownThreshold: number;
}

/**
 * The `CandidateBarcodeZone` interface represents a candidate barcode zone.
 */
interface CandidateBarcodeZone {
    /** Location of the candidate barcode zone within the image. */
    location: Quadrilateral;
    /** Possible formats of the localized barcode. */
    possibleFormats: EnumBarcodeFormat;
}

/**
 * The `CandidateBarcodeZonesUnit` interface extends the `IntermediateResultUnit` interface and represents a unit of candidate barcode zones.
 */
interface CandidateBarcodeZonesUnit extends IntermediateResultUnit {
    /** Array of candidate barcode zones represented as quadrilaterals. */
    candidateBarcodeZones: Array<CandidateBarcodeZone>;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onCandidateBarcodeZonesUnitReceived?: (result: CandidateBarcodeZonesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface ComplementedBarcodeImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
    location: Quadrilateral;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onComplementedBarcodeImageUnitReceived?: (result: ComplementedBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface DecodedBarcodesUnit extends IntermediateResultUnit {
    decodedBarcodes: Array<DecodedBarcodeElement>;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onDecodedBarcodesReceived?: (result: DecodedBarcodesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

/**
 * The `DeformationResistedBarcode` interface represents a deformation-resisted barcode image.
 */
interface DeformationResistedBarcode {
    /** Format of the barcode, as defined by `EnumBarcodeFormat`. */
    format: EnumBarcodeFormat;
    /** Image data of the deformation-resisted barcode image. */
    imageData: DSImageData;
    /** Location of the deformation-resisted barcode within the image. */
    location: Quadrilateral;
}

/**
 * The `DeformationResistedBarcodeImageUnit` interface extends the `IntermediateResultUnit` interface and represents a unit that holds the deformation-resisted barcode which includes the corresponding image data, its location, and the barcode format.
 */
interface DeformationResistedBarcodeImageUnit extends IntermediateResultUnit {
    /** The deformation-resisted barcode. */
    deformationResistedBarcode: DeformationResistedBarcode;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onDeformationResistedBarcodeImageUnitReceived?: (result: DeformationResistedBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface LocalizedBarcodeElement extends RegionObjectElement {
    possibleFormats: EnumBarcodeFormat;
    possibleFormatsString: string;
    angle: number;
    moduleSize: number;
    confidence: number;
}

interface LocalizedBarcodesUnit extends IntermediateResultUnit {
    localizedBarcodes: Array<LocalizedBarcodeElement>;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onLocalizedBarcodesReceived?: (result: LocalizedBarcodesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface ScaledBarcodeImageUnit extends IntermediateResultUnit {
    imageData: DSImageData;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onScaledBarcodeImageUnitReceived?: (result: ScaledBarcodeImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}

export { BarcodeReaderModule, EnumBarcodeFormat, EnumDeblurMode, EnumExtendedBarcodeResultType, EnumLocalizationMode, EnumQRCodeErrorCorrectionLevel };
export type { AztecDetails, BarcodeDetails, BarcodeResultItem, CandidateBarcodeZone, CandidateBarcodeZonesUnit, ComplementedBarcodeImageUnit, DataMatrixDetails, DecodedBarcodeElement, DecodedBarcodesResult, DecodedBarcodesUnit, DeformationResistedBarcode, DeformationResistedBarcodeImageUnit, ExtendedBarcodeResult, LocalizedBarcodeElement, LocalizedBarcodesUnit, OneDCodeDetails, PDF417Details, QRCodeDetails, ScaledBarcodeImageUnit, SimplifiedBarcodeReaderSettings };


declare class CameraEnhancerModule {
    static getVersion(): string;
}

interface VideoFrameTag extends ImageTag {
    isCropped: boolean;
    cropRegion: DSRect;
    originalWidth: number;
    originalHeight: number;
    currentWidth: number;
    currentHeight: number;
    timeSpent: number;
    timeStamp: number;
}

interface DCEFrame extends DSImageData {
    toCanvas: () => HTMLCanvasElement;
    isDCEFrame: boolean;
    tag?: VideoFrameTag;
}

interface DrawingItemEvent extends Event {
    targetItem: DrawingItem;
    itemClientX: number;
    itemClientY: number;
    itemPageX: number;
    itemPageY: number;
}

interface DrawingStyle {
    id?: number;
    lineWidth?: number;
    fillStyle?: string;
    strokeStyle?: string;
    paintMode?: "fill" | "stroke" | "strokeAndFill";
    fontFamily?: string;
    fontSize?: number;
}

interface Note {
    name: string;
    content: any;
}

interface PlayCallbackInfo {
    height: number;
    width: number;
    deviceId: string;
}

interface Resolution {
    width: number;
    height: number;
}

interface TipConfig {
    topLeftPoint: Point;
    width: number;
    duration: number;
    coordinateBase?: "view" | "image";
}

interface VideoDeviceInfo {
    deviceId: string;
    label: string;
    /** @ignore */
    _checked: boolean;
}

declare enum EnumDrawingItemMediaType {
    DIMT_RECTANGLE = 1,
    DIMT_QUADRILATERAL = 2,
    DIMT_TEXT = 4,
    DIMT_ARC = 8,
    DIMT_IMAGE = 16,
    DIMT_POLYGON = 32,
    DIMT_LINE = 64,
    DIMT_GROUP = 128
}

declare enum EnumDrawingItemState {
    DIS_DEFAULT = 1,
    DIS_SELECTED = 2
}

declare enum EnumEnhancedFeatures {
    EF_ENHANCED_FOCUS = 4,
    EF_AUTO_ZOOM = 16,
    EF_TAP_TO_FOCUS = 64
}

declare enum EnumPixelFormat {
    GREY = "grey",
    GREY32 = "grey32",
    RGBA = "rgba",
    RBGA = "rbga",
    GRBA = "grba",
    GBRA = "gbra",
    BRGA = "brga",
    BGRA = "bgra"
}

declare enum EnumItemType {
    ARC = 0,
    IMAGE = 1,
    LINE = 2,
    POLYGON = 3,
    QUAD = 4,
    RECT = 5,
    TEXT = 6,
    GROUP = 7
}
declare enum EnumItemState {
    DEFAULT = 0,
    SELECTED = 1
}
declare abstract class DrawingItem {
    #private;
    /**
     * TODO: replace with enum
     * @ignore
     */
    static arrMediaTypes: string[];
    /**
     * @ignore
     */
    static mapItemType: Map<EnumItemType, string>;
    /**
     * TOOD: replace with enum
     * @ignore
     */
    static arrStyleSelectors: string[];
    /**
     * @ignore
     */
    static mapItemState: Map<EnumItemState, string>;
    protected _fabricObject: any;
    /**
     * TODO: make it private and replace it with 'mediaType'
     * @ignore
     */
    _mediaType: string;
    /**
     * @ignore
     */
    get mediaType(): EnumDrawingItemMediaType;
    /**
     * TODO: rename it to 'state' and return enum
     */
    get styleSelector(): string;
    /**
     * @ignore
     */
    styleId?: number;
    /**
     * Returns or sets the numeric ID for the `DrawingStyle` that applies to this `DrawingItem`.
     * Invoke `renderAll()` for the new `DrawingStyle` to take effect.
     */
    set drawingStyleId(id: number);
    get drawingStyleId(): number;
    /**
     * Returns or sets the coordinate system base with a string:
     * - "view" for viewport-based coordinates or
     * - "image" for image-based coordinates.
     */
    set coordinateBase(base: "view" | "image");
    get coordinateBase(): "view" | "image";
    /**
     * @ignore
     */
    _zIndex?: number;
    /**
     * @ignore
     */
    _drawingLayer: any;
    /**
     * @ignore
     */
    _drawingLayerId: number;
    /**
     * Returns the numeric ID for the `DrawingLayer` this `DrawingItem` belongs to.
     */
    get drawingLayerId(): number;
    /**
     * record the item's styles
     * TODO: use enum
     * @ignore
     */
    _mapState_StyleId: Map<string, number>;
    protected mapEvent_Callbacks: Map<string, Map<Function, Function>>;
    protected mapNoteName_Content: Map<string, Array<any>>;
    /**
     * @ignore
     */
    readonly isDrawingItem: boolean;
    /**
     *
     * @param fabricObject
     * @param drawingStyleId
     * @ignore
     */
    constructor(fabricObject?: any, drawingStyleId?: number);
    protected _setFabricObject(fabricObject: any): void;
    /**
     *
     * @returns
     * @ignore
     */
    _getFabricObject(): any;
    /**
     *
     * @param state
     * @ignore
     */
    setState(state: EnumDrawingItemState): void;
    /**
     * Returns the current state of the `DrawingItem`.
     *
     * @returns The current state of the `DrawingItem`, of type `EnumDrawingItemState`.
     */
    getState(): EnumDrawingItemState;
    /**
     * @ignore
     */
    _on(eventName: string, listener: (event: DrawingItemEvent) => void): void;
    /**
     * Binds a listener for a specific event.
     * The event name is limited to "mousedown" | "mouseup" | "dblclick" | "mouseover" | "mouseout".
     * @param eventName Specifies the event by its name.
     * @param listener The event listener.
     */
    on(eventName: "mousedown" | "mouseup" | "dblclick" | "mouseover" | "mouseout", listener: (event: DrawingItemEvent) => void): void;
    /**
     * @ignore
     */
    _off(eventName: string, listener: (event: DrawingItemEvent) => void): void;
    /**
     * Unbinds a listener for a specific event.
     * The event name is limited to "mousedown" | "mouseup" | "dblclick" | "mouseover" | "mouseout".
     * @param eventName Specifies the event by its name.
     * @param listener The event listener.
     */
    off(eventName: "mousedown" | "mouseup" | "dblclick" | "mouseover" | "mouseout", listener: (event: DrawingItemEvent) => void): void;
    /**
     * Set if this item can be edited.
     * @param editable
     * @ignore
     */
    _setEditable(editable: boolean): void;
    /**
     * Checks if a `Note` object with the specified name exists.
     * @param name Specifies the name of the `Note` object.
     *
     * @returns Boolean indicating whether the `Note` object exists.
     */
    hasNote(name: string): boolean;
    /**
     * Adds a `Note` object to this `DrawingItem`.
     * @param note Specifies the `Note` object.
     * @param replace [Optional] Whether to replace an existing note if the notes share the same name.
     */
    addNote(note: Note, replace?: boolean): void;
    /**
     * Returns a `Note` object specified by its name, if it exists.
     * @param name Specifies the name of the `Note` object.
     *
     * @returns The corresponding `Note` object specified by its name, if it exists.
     */
    getNote(name: string): Note;
    /**
     * Returns a collection of all existing `Note` objects on this `DrawingItem`.
     *
     * @returns All existing `Note` objects on this `DrawingItem`.
     */
    getNotes(): Array<Note>;
    /**
     * Updates the content of a specified `Note` object.
     * @param name Specifies the name of the `Note` object.
     * @param content Specifies the new content, can be of any type.
     * @param mergeContent [Optional] Whether to merge the new content with the existing one.
     */
    updateNote(name: string, content: any, mergeContent?: boolean): void;
    /**
     * Deletes a `Note` object specified by its name.
     * @param name Specifies the name of the `Note` object.
     */
    deleteNote(name: string): void;
    /**
     * Deletes all `Note` objects on this `DrawingItem`.
     */
    clearNotes(): void;
    protected abstract extendSet(property: string, value: any): boolean;
    protected abstract extendGet(property: string): any;
    /**
     *
     * @param property
     * @returns
     * @ignore
     */
    set(property: string, value: any): void;
    /**
     *
     * @param property
     * @returns
     * @ignore
     */
    get(property: string): any;
    /**
     * Remove this item from drawing layer.
     * @ignore
     */
    remove(): void;
    /**
     * Convert item's property(width, height, x, y, etc.) from related to image/video to related to view/page.
     * @param value
     * @returns
     */
    protected convertPropFromImageToView(value: number): number;
    /**
     * Convert item's property(width, height, x, y, etc.) from related to view/page to related to image/video.
     * @param value
     * @returns
     */
    protected convertPropFromViewToImage(value: number): number;
    protected abstract updateCoordinateBaseFromImageToView(): void;
    protected abstract updateCoordinateBaseFromViewToImage(): void;
    /**
     * @ignore
     */
    _setLineWidth(value: number): void;
    /**
     * @ignore
     */
    _getLineWidth(): number;
    /**
     * @ignore
     */
    _setFontSize(value: number): void;
    /**
     * @ignore
     */
    _getFontSize(): number;
    /**
     * @ignore
     */
    abstract setPosition(position: any): void;
    /**
     * @ignore
     */
    abstract getPosition(): any;
    /**
     * Update item's propertys(width, height, x, y, etc.).
     * It is called when item is added to layer.
     * @ignore
     */
    abstract updatePosition(): void;
}

declare class DT_Rect extends DrawingItem {
    #private;
    constructor(rect: Rect, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): void;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    setRect(rect: Rect): void;
    getRect(): Rect;
}

declare class DT_Polygon extends DrawingItem {
    #private;
    constructor(polygon: Polygon, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): any;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    setPolygon(polygon: Polygon): void;
    getPolygon(): Polygon;
}

declare class DT_Image extends DrawingItem {
    #private;
    private image;
    set maintainAspectRatio(value: boolean);
    get maintainAspectRatio(): boolean;
    constructor(image: DSImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, rect: Rect, maintainAspectRatio: boolean, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): any;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    setImage(image: DSImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): void;
    getImage(): DSImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    setImageRect(rect: Rect): void;
    getImageRect(): Rect;
}

declare class DT_Text extends DrawingItem {
    #private;
    private _text;
    constructor(text: string, rect: Rect, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): any;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    setText(text: string): void;
    getText(): string;
    setTextRect(rect: Rect): void;
    getTextRect(): Rect;
}

declare class DT_Line extends DT_Polygon {
    #private;
    constructor(line: LineSegment, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): any;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    /**
     * @ignore
     */
    setPolygon(): void;
    /**
     * @ignore
     */
    getPolygon(): Polygon;
    setLine(line: LineSegment): void;
    getLine(): LineSegment;
}

declare class DT_Quad extends DT_Polygon {
    #private;
    constructor(quad: Quadrilateral, drawingStyleId?: number);
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    /**
     * @ignore
     */
    setPolygon(): void;
    /**
     * @ignore
     */
    getPolygon(): Polygon;
    setQuad(quad: Quadrilateral): void;
    getQuad(): Quadrilateral;
}

declare class DT_Group extends DrawingItem {
    constructor(childItems: Array<DrawingItem>);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): void;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(): void;
    getPosition(): any;
    updatePosition(): void;
    getChildDrawingItems(): Array<DrawingItem>;
    setChildDrawingItems(item: DrawingItem): void;
    removeChildItem(item: DrawingItem): void;
}

declare class DrawingLayer {
    static DDN_LAYER_ID: number;
    static DBR_LAYER_ID: number;
    static DLR_LAYER_ID: number;
    static USER_DEFINED_LAYER_BASE_ID: number;
    /**
     * @ignore
     */
    static TIP_LAYER_ID: number;
    /**
     * returns the 'fabric.Canvas' object
     * @ignore
     */
    fabricCanvas: any;
    private id;
    /**
     * @ignore
     */
    get width(): number;
    /**
     * @ignore
     */
    get height(): number;
    private mapType_StateAndStyleId;
    private mode;
    /**
     * Event triggered whenever there is a change in which `DrawingItem` objects are selected or deselected.
     * @param selectedDrawingItems An array of `DrawingItem` objects that have been selected as a result of the latest selection change.
     * @param deselectedDrawingItems An array of `DrawingItem` objects that have been deselected as a result of the latest selection change.
     * [NOTE]: This event is only functional when the `DrawingLayer` in which it is defined belongs to an `ImageEditorView` instance.
     */
    onSelectionChanged: (selectedDrawingItems: Array<DrawingItem>, deselectedDrawingItems: Array<DrawingItem>) => void;
    private _arrDrwaingItem;
    private _arrFabricObject;
    private _visible;
    /**
     * @ignore
     */
    _manager: any;
    /**
     * @ignore
     */
    set _allowMultiSelect(value: boolean);
    get _allowMultiSelect(): boolean;
    /**
     * @ignore
     */
    constructor(canvas: HTMLCanvasElement, id: number, options?: Object);
    /**
     * Retrieves the unique identifier of the layer.
     */
    getId(): number;
    /**
     * Sets the visibility of the layer.
     * @param visible Whether to show or hide the layer.
     */
    setVisible(visible: boolean): void;
    /**
     * Retrieves the visibility status of the layer.
     *
     * @returns Boolean indicating whether the layer is visible.
     */
    isVisible(): boolean;
    private _getItemCurrentStyle;
    /**
     * Change style of drawingItems of specific media type in specific style selector.
     * DrawingItems that have 'styleId' won't be changed.
     * @param mediaType the mediaType of drawingItems that attend to change
     * @param styleSelector
     * @param drawingStyle
     * @private
     */
    private _changeMediaTypeCurStyleInStyleSelector;
    /**
     * Change the style of specific drawingItem.
     * DrawingItem that has 'styleId' won't be changed.
     * @param drawingItem
     * @param drawingStyle
     * @private
     */
    private _changeItemStyle;
    /**
     *
     * @param targetGroup
     * @param item
     * @param addOrRemove
     * @returns
     * @ignore
     */
    _updateGroupItem(targetGroup: DrawingItem, item: DrawingItem, addOrRemove: string): void;
    private _addDrawingItem;
    /**
     * Add a drawing item to the drawing layer.
     * Drawing items in drawing layer with higher id are always above those in drawing layer with lower id.
     * In a same drawing layer, the later added is above the previous added.
     * @param drawingItem
     * @ignore
     */
    private addDrawingItem;
    /**
     * Adds an array of `DrawingItem` objects to the layer.
     * @param drawingItems An array of `DrawingItem` objects.
     */
    addDrawingItems(drawingItems: Array<DrawingItem>): void;
    /**
     *
     * @param drawingItem
     * @returns
     * @ignore
     */
    private removeDrawingItem;
    /**
     * Removes specified `DrawingItem` objects from the layer.
     * @param drawingItems An array of `DrawingItem` objects.
     */
    removeDrawingItems(drawingItems: Array<DrawingItem>): void;
    /**
     * Sets the layer's `DrawingItem` objects, replacing any existing items.
     * @param drawingItems An array of `DrawingItem` objects.
     */
    setDrawingItems(drawingItems: Array<DrawingItem>): void;
    /**
     * Retrieves `DrawingItem` objects from the layer, optionally filtered by a custom function.
     * @param filter [Optional] A predicate function used to select a subset of `DrawingItem` objects based on specific criteria. Only items for which this function returns `true` are included in the result.
     *
     */
    getDrawingItems(filter?: (item: DrawingItem) => boolean): Array<DrawingItem>;
    /**
     * Returns an array of all selected DrawingItem instances.
     *
     * @returns  An array of `DrawingItem` objects.
     */
    getSelectedDrawingItems(): Array<DrawingItem>;
    /**
     * Checks if a specific `DrawingItem` exists within the layer.
     * @param drawingItem Specifies the `DrawingItem`.
     *
     * @returns Boolean indicating whether the specific `DrawingItem` exists.
     */
    hasDrawingItem(drawingItem: DrawingItem): boolean;
    /**
     * Clears all `DrawingItem` objects from the layer.
     */
    clearDrawingItems(): void;
    private _setDefaultStyle;
    /**
     * Establishes the baseline styling preferences for `DrawingItem` objects on the layer.
     * This method offers flexible styling options tailored to the diverse requirements of `DrawingItem` objects based on their state and type:
     * - Universal Application: By default, without specifying `state` or `mediaType`, the designated style is universally applied to all `DrawingItem` objects on the layer, ensuring a cohesive look and feel.
     * - State-Specific Styling: Specifying only the state parameter allows the method to target `DrawingItem` objects matching that particular state, enabling differentiated styling that reflects their current status or condition.
     * - Refined Targeting with State and MediaType: Providing both `state` and `mediaType` parameters focuses the style application even further, affecting only those `DrawingItem` objects that align with the specified type while in the given state.
     *
     * This precision is particularly useful for creating visually distinct interactions or highlighting specific elements based on their content and interaction state.
     * @param drawingStyleId The unique ID of the `DrawingStyle` to be applied.
     * @param state [Optional] Allows the styling to be conditional based on the `DrawingItem`'s current state.
     * @param mediaType [Optional] Further refines the application of the style based on the the `DrawingItem`'s type.
     */
    setDefaultStyle(drawingStyleId: number, state?: EnumDrawingItemState, mediaType?: EnumDrawingItemMediaType): void;
    /**
     * Change drawing layer mode, "viewer" or "editor".
     * @param newMode
     * @ignore
     */
    setMode(newMode: string): void;
    /**
     *
     * @returns
     * @ignore
     */
    getMode(): string;
    /**
     * Update the dimensions of drawing layer.
     * @param dimensions
     * @param options
     * @ignore
     */
    _setDimensions(dimensions: {
        width: number | string;
        height: number | string;
    }, options?: {
        backstoreOnly?: boolean;
        cssOnly?: boolean;
    }): void;
    /**
     * Update the object-fit of drawing layer.
     * @param value
     * @ignore
     */
    _setObjectFit(value: string): void;
    /**
     *
     * @returns
     * @ignore
     */
    _getObjectFit(): string;
    /**
     * Forces a re-render of all `DrawingItem` objects on the layer.
     * Invoke this method to ensure any modifications made to existing `DrawingItem` objects are visually reflected on the layer.
     */
    renderAll(): void;
    /**
     * @ignore
     */
    dispose(): void;
}

declare class DrawingLayerManager {
    _arrDrawingLayer: DrawingLayer[];
    createDrawingLayer(baseCvs: HTMLCanvasElement, drawingLayerId: number): DrawingLayer;
    deleteDrawingLayer(drawingLayerId: number): void;
    clearDrawingLayers(): void;
    getDrawingLayer(drawingLayerId: number): DrawingLayer;
    getAllDrawingLayers(): Array<DrawingLayer>;
    getSelectedDrawingItems(): Array<DrawingItem>;
    setDimensions(dimensions: {
        width: number | string;
        height: number | string;
    }, options?: {
        backstoreOnly?: boolean;
        cssOnly?: boolean;
    }): void;
    setObjectFit(value: string): void;
    getObjectFit(): string;
    setVisible(visible: boolean): void;
    _getFabricCanvas(): any;
    _switchPointerEvent(): void;
}

declare class InnerComponent extends HTMLElement {
    #private;
    constructor();
    getWrapper(): HTMLDivElement;
    setElement(slot: "content" | "single-frame-input-container" | "drawing-layer", el: HTMLElement): void;
    getElement(slot: "content" | "single-frame-input-container" | "drawing-layer"): HTMLElement;
    removeElement(slot: "content" | "single-frame-input-container" | "drawing-layer"): void;
}

declare class DT_Tip extends DT_Text {
    #private;
    constructor(text: string, x: number, y: number, width: number, styleId?: number);
    /**
     * Make the tip hidden after a period of time.
     * @param duration if less then 0, it clears the timer.
     */
    setDuration(duration: number): void;
    getDuration(): number;
}
declare abstract class View {
    #private;
    /**
     * @ignore
     */
    _innerComponent: InnerComponent;
    /** @ignore */
    _drawingLayerManager: DrawingLayerManager;
    /** @ignore */
    _layerBaseCvs: HTMLCanvasElement;
    /** @ignore */
    _drawingLayerOfTip: DrawingLayer;
    private _tipStyleId;
    /** @ignore */
    _tip: DT_Tip;
    constructor();
    /**
     * get the dimensions of content which the view shows. In 'CameraView', the 'content' usually means the video; in 'ImageEditorView', the 'content' usually means the image.
     */
    protected abstract getContentDimensions(): {
        width: number;
        height: number;
        objectFit: string;
    };
    /**
     * Create a native 'canvas' element, which will be passed to 'fabric' to create a 'fabric.Canvas'.
     * In fact, all drawing layers are in one canvas.
     * @ignore
     */
    protected createDrawingLayerBaseCvs(width: number, height: number, objectFit?: string): HTMLCanvasElement;
    /**
     * Create drawing layer with specified id and size.
     * Differ from 'createDrawingLayer()', the drawing layers created'createDrawingLayer()' can not Specified id, and their size is the same as video.
     * @ignore
     */
    _createDrawingLayer(drawingLayerId: number, width?: number, height?: number, objectFit?: string): DrawingLayer;
    /**
     * Creates a new `DrawingLayer` object and returns it.
     *
     * @returns The created `DrawingLayer` object.
     */
    createDrawingLayer(): DrawingLayer;
    /**
     * Differ from 'deleteUserDefinedDrawingLayer()', 'deleteDrawingLayer()' can delete any layer, while 'deleteUserDefinedDrawingLayer()' can only delete user defined layer.
     */
    protected deleteDrawingLayer(drawingLayerId: number): void;
    /**
     * Deletes a user-defined `DrawingLayer` object specified by its unique identifier (ID).
     * @param id The unique identifier (ID) of the `DrawingLayer` object.
     */
    deleteUserDefinedDrawingLayer(id: number): void;
    /**
     * Not used yet.
     * @ignore
     */
    _clearDrawingLayers(): void;
    /**
     * Clears all user-defined `DrawingLayer` objects, resetting the drawing space without affecting default built-in `DrawingLayer` objects.
     */
    clearUserDefinedDrawingLayers(): void;
    /**
     * Retrieves a `DrawingLayer` object by its unique identifier (ID).
     * @param id The unique identifier (ID) of the `DrawingLayer` object.
     *
     * @returns The `DrawingLayer` object specified by its unique identifier (ID) or `null`.
     */
    getDrawingLayer(drawingLayerId: number): DrawingLayer;
    /**
     * Returns an array of all `DrawingLayer` objects .
     *
     * @returns An array of all `DrawingLayer` objects.
     */
    getAllDrawingLayers(): Array<DrawingLayer>;
    /**
     * update drawing layers according to content(video/image) dimensions.
     */
    protected updateDrawingLayers(contentDimensions: {
        width: number;
        height: number;
        objectFit: string;
    }): void;
    /**
     * Returns an array of all selected DrawingItem instances across different layers, supporting complex selection scenarios.
     *
     * @returns An array of `DrawingItem` objects.
     */
    getSelectedDrawingItems(): Array<DrawingItem>;
    /**
     * Applies configuration settings to the tip message box.
     * This includes its position, size, display duration, and the coordinate system basis.
     * @param tipConfig Configuration object for the tip message box, including top-left position, width, display duration, and coordinate system basis.
     */
    setTipConfig(tipConfig: TipConfig): void;
    /**
     * Retrieves the current configuration of the tip message box, reflecting its position, size, display duration, and the coordinate system basis.
     *
     * @returns The current configuration settings of the tip message box.
     */
    getTipConfig(): TipConfig;
    /**
     * Controls the visibility of the tip message box on the screen.
     * This can be used to show or hide the tip based on user interaction or other criteria.
     * @param visible Boolean flag indicating whether the tip message box should be visible (`true`) or hidden (`false`).
     */
    setTipVisible(visible: boolean): void;
    /**
     * Checks whether the tip message box is currently visible to the user.
     *
     * @returns Boolean indicating the visibility of the tip message box (`true` for visible, `false` for hidden).
     */
    isTipVisible(): boolean;
    /**
     * Updates the message displayed in the tip message box.
     * This can be used to provide dynamic feedback or information to the user.
     * @param message The new message to be displayed in the tip message box.
     */
    updateTipMessage(message: string): void;
}

declare class EventHandler {
    #private;
    get disposed(): boolean;
    on(event: string, listener: Function): void;
    off(event: string, listener: Function): void;
    offAll(event: string): void;
    fire(event: string, params?: Array<any>, options?: {
        target?: object;
        async?: boolean;
        copy?: boolean;
    }): void;
    dispose(): void;
}

declare class CameraEnhancer extends ImageSourceAdapter {
    #private;
    /** @ignore */
    static _debug: boolean;
    static set _onLog(value: (message: any) => void);
    static get _onLog(): (message: any) => void;
    /**
     * @ignore
     */
    static browserInfo: {
        browser: string;
        version: number;
        OS: string;
    };
    /**
     * Event triggered when the running environment is not ideal.
     * @param warning The warning message.
     */
    static onWarning: (warning: Warning) => void;
    /**
     * Detect environment and get a report.
     * ```js
     * console.log(Dynamsoft.DCE.CameraEnhancer.detectEnvironment());
     * // {"wasm":true, "worker":true, "getUserMedia":true, "camera":true, "browser":"Chrome", "version":90, "OS":"Windows"}
     * ```
     */
    static detectEnvironment(): Promise<any>;
    /**
     * Tests whether the application has access to the camera.
     * This static method can be used before initializing a `CameraEnhancer` instance to ensure that the device's camera can be accessed, providing a way to handle permissions or other access issues preemptively.
     * This method offers the additional advantage of accelerating the camera opening process for the first time.
     *
     * @returns A promise that resolves with an object containing:
     * - `ok`: Boolean indicating whether camera access is available.
     * - `message`: A string providing additional information or the reason why camera access is not available, if applicable.
     */
    static testCameraAccess(): Promise<{
        ok: boolean;
        message: string;
    }>;
    /**
     * Initializes a new instance of the `CameraEnhancer` class.
     * @param view [Optional] Specifies a `CameraView` instance to provide the user interface element to display the live feed from the camera.
     *
     * @returns A promise that resolves with the initialized `CameraEnhancer` instance.
     */
    static createInstance(view?: CameraView): Promise<CameraEnhancer>;
    private cameraManager;
    private cameraView;
    /**
     * @ignore
    */
    private _imageDataGetter;
    private _isEnableMirroring;
    get isEnableMirroring(): boolean;
    /**
     * @ignore
     */
    get video(): HTMLVideoElement;
    /**
     * Sets or returns the source URL for the video stream to be used by the `CameraEnhancer`.
     * 1. You can use this property to specify an existing video as the source to play which will be processed the same way as the video feed from a live camera.
     * 2. When playing an existing video, the camera selection and video selection boxes will be hidden.
     *
     * It is particularly useful for applications that need to process or display video from a specific source rather than the device's default camera.
     */
    set videoSrc(src: string);
    get videoSrc(): string;
    /**
     * Determines whether the last used camera settings should be saved and reused the next time the `CameraEnhancer` is initialized.
     *
     * The default is `false`.
     *
     * When set to `true`, the enhancer attempts to restore the previously used camera settings, offering a more seamless user experience across sessions.
     *
     * - This feature makes use of the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) of the browser.
     * - This feature only works on mainstream browsers like Chrome, Firefox, and Safari. Other browsers may change the device IDs dynamically thus making it impossible to track the camera.
     */
    set ifSaveLastUsedCamera(value: boolean);
    get ifSaveLastUsedCamera(): boolean;
    /**
     * Determines whether to skip the initial camera inspection process.
     *
     * The default is `false`, which means to opt for an optimal rear camera at the first `open()`.
     *
     * Setting this property to `true` bypasses the automatic inspection and configuration that typically occurs when a camera connection is established.
     * This can be useful for scenarios where the default inspection process may not be desirable or necessary.
     *
     * Note that if a previously used camera is already available in the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), the inspection is skipped automatically. Read more on `ifSaveLastUsedCamera`.
     */
    set ifSkipCameraInspection(value: boolean);
    get ifSkipCameraInspection(): boolean;
    /**
     * Specifies the timeout in milliseconds for opening the camera. The default value is 15000 ms.
     *
     * Setting 0 means canceling the timeout or waiting indefinitely.
     *
     * This property sets a limit on how long the `CameraEnhancer` will attempt to open the camera before timing out.
     * It can be adjusted to accommodate different devices and scenarios, ensuring that the application does not hang indefinitely while trying to access the camera.
     */
    set cameraOpenTimeout(value: number);
    get cameraOpenTimeout(): number;
    isTorchOn: undefined | boolean;
    set singleFrameMode(value: "disabled" | "camera" | "image");
    get singleFrameMode(): "disabled" | "camera" | "image";
    /**
     * Event handler in camera selection in default UI.
     * @ignore
     */
    private _onCameraSelChange;
    /**
     * Event handler in resolution selection in default UI.
     * @ignore
     */
    private _onResolutionSelChange;
    /**
     * Event handler in close button in default UI.
     *
     * Now the close button is removed, so it is useless.
     * @ignore
     */
    private _onCloseBtnClick;
    /**
     * Event handler for single frame mode.
     * @ignore
     */
    private _onSingleFrameAcquired;
    _intermediateResultReceiver: any;
    /**
     * @ignore
     */
    get _isFetchingStarted(): boolean;
    /**
     * Set the size limit of the gotten images.
     *
     * By default, there is no limit.
     * @ignore
     */
    canvasSizeLimit: number;
    /**
     * It is used in `DCEFrame.tag.imageId`.
     * @ignore
     */
    _imageId: number;
    private fetchInterval;
    /**
     * Returns whether the `CameraEnhancer` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CameraEnhancer` instance has been disposed of.
     */
    get disposed(): boolean;
    readonly isCameraEnhancer = true;
    private constructor();
    /**
     * Sets the `CameraView` instance to be used with the `CameraEnhancer`.
     * This method allows for specifying a custom camera view, which can be used to display the camera feed and interface elements.
     *
     * @param view A `CameraView` instance that will be used to display the camera's video feed and any associated UI components.
     */
    setCameraView(view: CameraView): void;
    /**
     * Retrieves the current `CameraView` instance associated with the `CameraEnhancer`.
     * This method allows for accessing the camera view, which can be useful for manipulating the view or accessing its properties and methods.
     *
     * @returns The current `CameraView` instance used by the `CameraEnhancer`.
     */
    getCameraView(): CameraView;
    /**
     *
     * @returns
     * @ignore
     */
    private releaseCameraView;
    /**
     * Add some event listeners to UI element in camera view.
     * @returns
     * @ignore
     */
    private addListenerToView;
    /**
     * Remove event listeners from UI element in camera view.
     * @returns
     */
    private removeListenerFromView;
    /**
     * Retrieves the current state of the camera.
     *
     * @returns A string indicating the camera's current state, which can be "opening", "open", or "closed".
     */
    getCameraState(): string;
    /**
     * Checks if the camera is currently open and streaming video.
     *
     * @returns Boolean indicating whether the camera is open (`true`) or not (`false`).
     */
    isOpen(): boolean;
    /**
     * Retrieves the HTMLVideoElement used by the `CameraEnhancer` for displaying the camera feed.
     * This method provides direct access to the video element, enabling further customization or interaction with the video stream.
     *
     * @returns The `HTMLVideoElement` that is being used to display the camera's video feed.
     */
    getVideoEl(): HTMLVideoElement;
    /**
     * Opens the currently selected camera and starts the video stream.
     *
     * @returns A promise that resolves with a `PlayCallbackInfo` object with details about the operation's outcome.
     */
    open(): Promise<PlayCallbackInfo>;
    /**
     * Closes the currently active camera and stops the video stream.
     */
    close(): void;
    /**
     * Pauses the video stream without closing the camera.
     * This can be useful for temporarily halting video processing while keeping the camera ready.
     */
    pause(): void;
    /**
     * Checks if the video stream is currently paused.
     *
     * @returns Boolean indicating whether the video stream is paused (`true`) or active (`false`).
     */
    isPaused(): boolean;
    /**
     * Resumes the video stream from a paused state.
     *
     * @returns A promise that resolves when the video stream resumes. It does not provide any value upon resolution.
     */
    resume(): Promise<void>;
    /**
     * Selects a specific camera for use by the `CameraEnhancer`. The camera can be specified by a `VideoDeviceInfo` object or by its device ID.
     * If called before `open()` or `show()`, the selected camera will be used. Otherwise, the system will decide which one to use.
     * @param cameraObjectOrDeviceID The `VideoDeviceInfo` object or device ID string of the camera to select.
     *
     * @returns A promise that resolves with a `PlayCallbackInfo` object indicating the outcome of the camera selection operation.
     */
    selectCamera(videoDeviceInfoOrDeviceId: VideoDeviceInfo | string): Promise<PlayCallbackInfo>;
    /**
     * Returns the currently selected camera device.
     *
     * @returns The `VideoDeviceInfo` object representing the currently active camera.
     */
    getSelectedCamera(): VideoDeviceInfo;
    /**
     * Retrieves a list of all available video input devices (cameras) on the current device.
     *
     * @returns A promise that resolves with an array of `VideoDeviceInfo` objects representing each available camera.
     */
    getAllCameras(): Promise<Array<VideoDeviceInfo>>;
    /**
     * Sets the resolution of the video stream to a specified value.
     * If the specified resolution is not exactly supported, the closest resolution will be applied.
     * If called before `open()` or `show()`, the camera will use the set resolution when it opens. Otherwise, the default resolution used is 1920x1080 on desktop and 1280x720 on mobile devices.
     * @param resolution The `Resolution` to which the video stream should be set.
     *
     * @returns A promise that resolves with a `PlayCallbackInfo` object with details about the operation's outcome.
     */
    setResolution(resolution: Resolution): Promise<PlayCallbackInfo>;
    /**
     * Gets the current resolution of the video stream.
     *
     * @returns The current `Resolution` of the video stream.
     */
    getResolution(): Resolution;
    /**
     * Retrieves a list of available resolutions supported by the currently selected camera.
     *
     * - The returned resolutions are limited to these values "160 by 120", "320 by 240", "480 by 360", "640 by 480", "800 by 600", "960 by 720", "1280 by 720", "1920 by 1080", "2560 by 1440", "3840 by 2160".
     * - The SDK tests all these resolutions to find out which ones are supported. As a result, the method may be time-consuming.
     *
     * @returns A promise that resolves with an array of `Resolution` objects representing each supported resolution.
     */
    getAvailableResolutions(): Promise<Array<Resolution>>;
    /**
     * 'on()' is the wrapper of '_on()'.
     * @param event includes
     * @param listener
     * @ignore
     */
    private _on;
    /**
     * 'off()' is the wrapper of '_off()'.
     * @param event
     * @param listener
     * @ignore
     */
    private _off;
    /**
     * Registers an event listener for specific camera-related events.
     * This method allows you to respond to various changes and states in the camera lifecycle.
     * @param eventName The name of the event to listen for. Possible values include "cameraOpen", "cameraClose", "cameraChange", "resolutionChange", "played", "singleFrameAcquired", and "frameAddedToBuffer".
     * @param listener The callback function to be invoked when the event occurs.
     */
    on(eventName: "cameraOpen" | "cameraClose" | "cameraChange" | "resolutionChange" | "played" | "singleFrameAcquired" | "frameAddedToBuffer", listener: Function): void;
    /**
     * Removes an event listener previously registered with the `on` method.
     * @param eventName The name of the event for which to remove the listener.
     * @param listener The callback function that was originally registered for the event.
     */
    off(eventName: "cameraOpen" | "cameraClose" | "cameraChange" | "resolutionChange" | "played" | "singleFrameAcquired" | "frameAddedToBuffer", listener: Function): void;
    /**
     * Retrieves the current video settings applied to the camera stream.
     *
     * @returns The current `MediaStreamConstraints` object representing the video stream's settings.
     */
    getVideoSettings(): MediaStreamConstraints;
    /**
     * Updates the video settings for the camera stream with new constraints.
     * @param constraints The new `MediaStreamConstraints` to apply to the video stream.
     *
     * @returns A promise that resolves when the new `MediaStreamConstraints` is applied. It does not provide any value upon resolution.
     */
    updateVideoSettings(mediaStreamConstraints: MediaStreamConstraints): Promise<void>;
    /**
     * Gets the capabilities of the current camera.
     *
     * At present, this method only works in Edge, Safari, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
     * @returns A `MediaTrackCapabilities` object representing the capabilities of the camera's video track.
     */
    getCapabilities(): MediaTrackCapabilities;
    /**
     * Retrieves the current settings of the camera.
     *
     * @returns The `MediaTrackSettings` object representing the current settings of the camera's video track.
     */
    getCameraSettings(): MediaTrackSettings;
    /**
     * Turns on the camera's torch (flashlight) mode, if supported.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @returns A promise that resolves when the torch has been successfully turned on. It does not provide any value upon resolution.
     */
    turnOnTorch(): Promise<void>;
    /**
     * Turns off the camera's torch (flashlight) mode.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     *
     * @returns A promise that resolves when the torch has been successfully turned off. It does not provide any value upon resolution.
     */
    turnOffTorch(): Promise<void>;
    _taskid4AutoTorch: any;
    _delay4AutoTorch: number;
    grayThreshold4AutoTorch: number;
    maxDarkCount4AutoTroch: number;
    turnAutoTorch(delay?: number): Promise<void>;
    /**
     * Sets the color temperature of the camera's video feed.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @param colorTemperature The desired color temperature in Kelvin.
     *
     * @returns A promise that resolves when the color temperature has been successfully set. It does not provide any value upon resolution.
     */
    setColorTemperature(value: number): Promise<void>;
    /**
     * Retrieves the current color temperature setting of the camera's video feed.
     *
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     *
     * @returns The current color temperature in Kelvin.
     */
    getColorTemperature(): number;
    /**
     * Sets the exposure compensation of the camera's video feed.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @param exposureCompensation The desired exposure compensation value.
     *
     * @returns A promise that resolves when the exposure compensation has been successfully set. It does not provide any value upon resolution.
     */
    setExposureCompensation(value: number): Promise<void>;
    /**
     * Retrieves the current exposure compensation setting of the camera's video feed.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     *
     * @returns The current exposure compensation value.
     */
    getExposureCompensation(): number;
    /**
     * 'setZoom()' is the wrapper of '_setZoom()'. '_setZoom()' can set the zoom center, which is not tested and there are no plans to make it open to clients.
     * @ignore
     */
    private _setZoom;
    /**
     * Sets the zoom level of the camera.
     *
     * - How it works:
     * 1. If the camera supports zooming and the zoom factor is within its supported range, zooming is done directly by the camera.
     * 2. If the camera does not support zooming, software-based magnification is used instead.
     * 3. If the camera supports zooming but the zoom factor is beyond what it supports, the camera's maximum zoom is used, and software-based magnification is used to do the rest. (In this case, you may see a brief video flicker between the two zooming processes).
     * @param settings An object containing the zoom settings.
     * @param settings.factor: A number specifying the zoom level. At present, it is the only available setting.
     *
     * @returns A promise that resolves when the zoom level has been successfully set. It does not provide any value upon resolution.
     */
    setZoom(settings: {
        factor: number;
    }): Promise<void>;
    /**
     * Retrieves the current zoom settings of the camera.
     *
     * @returns An object containing the current zoom settings. As present, it contains only the zoom factor.
     */
    getZoomSettings(): {
        factor: number;
    };
    /**
     * Resets the zoom level of the camera to its default value.
     *
     * @returns A promise that resolves when the zoom level has been successfully reset. It does not provide any value upon resolution.
     */
    resetZoom(): Promise<void>;
    /**
     * Sets the frame rate of the camera's video stream.
     * - At present, this method only works in Edge, Safari, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
     * - If you provide a value that exceeds the camera's capabilities, we will automatically adjust it to the maximum value that can be applied.
     *
     * @param rate The desired frame rate in frames per second (fps).
     *
     * @returns A promise that resolves when the frame rate has been successfully set. It does not provide any value upon resolution.
     */
    setFrameRate(value: number): Promise<void>;
    /**
     * Retrieves the current frame rate of the camera's video stream.
     *
     * @returns The current frame rate in frames per second (fps).
     */
    getFrameRate(): number;
    /**
     * Sets the focus mode of the camera. This method allows for both manual and continuous focus configurations, as well as specifying a focus area.
     * - This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * - Typically, `continuous` mode works best. `manual` mode based on a specific area helps the camera focus on that particular area which may seem blurry under `continuous` mode. `manual` mode with specified distances is for those rare cases where the camera distance must be fine-tuned to get the best results.
     * @param settings An object describing the focus settings. The structure of this object varies depending on the mode specified (`continuous`, `manual` with fixed `distance`, or `manual` with specific `area`).
     *
     * @returns A promise that resolves when the focus settings have been successfully applied. It does not provide any value upon resolution.
     */
    setFocus(settings: {
        mode: string;
    } | {
        mode: "manual";
        distance: number;
    } | {
        mode: "manual";
        area: {
            centerPoint: {
                x: string;
                y: string;
            };
            width?: string;
            height?: string;
        };
    }): Promise<void>;
    /**
     * Retrieves the current focus settings of the camera.
     *
     * @returns An object representing the current focus settings or null.
     */
    getFocusSettings(): Object;
    /**
     * Sets the auto zoom range for the camera.
     * `EF_AUTO_ZOOM` is one of the enhanced features that require a license, and is only effective when used in conjunction with other functional products of Dynamsoft.
     * This method allows for specifying the minimum and maximum zoom levels that the camera can automatically adjust to.
     *
     * @param range An object specifying the minimum and maximum zoom levels. Both `min` and `max` should be positive numbers, with `min` less than or equal to `max`. The default is `{min: 1, max: 999}`.
     */
    setAutoZoomRange(range: {
        min: number;
        max: number;
    }): void;
    /**
     * Retrieves the current auto zoom range settings for the camera.
     * `EF_AUTO_ZOOM` is one of the enhanced features that require a license, and is only effective when used in conjunction with other functional products of Dynamsoft.
     *
     * @returns An object representing the current auto zoom range, including the minimum and maximum zoom levels.
     */
    getAutoZoomRange(): {
        min: number;
        max: number;
    };
    /**
     * Enables one or more enhanced features.
     * This method allows for activating specific advanced capabilities that may be available.
     *
     * - The enhanced features require a license, and only take effect when used in conjunction with other functional products under the Dynamsoft Capture Vision（DCV）architecture.
     * - `EF_ENHANCED_FOCUS` and `EF_TAP_TO_FOCUS` only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @param enhancedFeatures An enum value or a bitwise combination of `EnumEnhancedFeatures` indicating the features to be enabled.
     */
    enableEnhancedFeatures(enhancedFeatures: EnumEnhancedFeatures): void;
    /**
     * Disables one or more previously enabled enhanced features.
     * This method can be used to deactivate specific features that are no longer needed or to revert to default behavior.
     *
     * @param enhancedFeatures An enum value or a bitwise combination of `EnumEnhancedFeatures` indicating the features to be disabled.
     */
    disableEnhancedFeatures(enhancedFeatures: EnumEnhancedFeatures): void;
    /**
     * Differ from 'setScanRegion()', 'setScanRegion()' will update the UI in camera view, while '_setScanRegion()' not.
     * @param region
     * @ignore
     */
    private _setScanRegion;
    /**
     * Sets the scan region within the camera's view which limits the frame acquisition to a specific area of the video feed.
     *
     * Note: The region is always specified relative to the original video size, regardless of any transformations or zoom applied to the video display.
     *
     * @param region Specifies the scan region.
     */
    setScanRegion(region: DSRect | Rect): void;
    /**
     * Retrieves the current scan region set within the camera's view.
     *
     * Note: If no scan region has been explicitly set before calling this method, an error may be thrown, indicating the necessity to define a scan region beforehand.
     *
     * @returns A `DSRect` or `Rect` object representing the current scan region.
     *
     * @throws Error indicating that no scan region has been set, if applicable.
     */
    getScanRegion(): DSRect | Rect;
    /**
     * Sets an error listener to receive notifications about errors that occur during image source operations.
     *
     * @param listener An instance of `ImageSourceErrorListener` or its derived class to handle error notifications.
     */
    setErrorListener(listener: ImageSourceErrorListener): void;
    /**
     * Determines whether there are more images available to fetch.
     *
     * @returns Boolean indicating whether more images can be fetched. `false` means the image source is closed or exhausted.
     */
    hasNextImageToFetch(): boolean;
    /**
     * Starts the process of fetching images.
     */
    startFetching(): void;
    /**
     * Stops the process of fetching images.
     * to false, indicating that image fetching has been halted.
     */
    stopFetching(): void;
    /**
    * Toggles the mirroring of the camera's video stream.
    * This method flips the video stream horizontally when enabled, creating a mirror effect.
    * It is useful for applications using the front-facing camera where a mirrored view is more intuitive for users.
    *
    * @param enable - If true, enables the mirroring; if false, disables the mirroring.
    */
    toggleMirroring(enable: boolean): void;
    /**
     * Fetches the current frame from the camera's video feed.
     * This method is used to obtain the latest image captured by the camera.
     *
     * @returns A `DCEFrame` object representing the current frame.
     * The structure and content of this object will depend on the pixel format set by `setPixelFormat()` and other settings.
     */
    fetchImage(isUserCall?: boolean): DCEFrame;
    /**
     * Sets the interval at which images are continuously fetched from the camera's video feed.
     * This method allows for controlling how frequently new frames are obtained when `startFetching()` is invoked,
     * which can be useful for reducing computational load or for pacing the frame processing rate.
     *
     * @param interval The desired interval between fetches, specified in milliseconds.
     */
    setImageFetchInterval(interval: number): void;
    /**
     * Retrieves the current interval at which images are continuously fetched from the camera's video feed.
     *
     * @returns The current fetch interval, specified in milliseconds.
     */
    getImageFetchInterval(): number;
    /**
     * Sets the pixel format for the images fetched from the camera, which determines the format of the images added to the buffer when the `fetchImage()` or `startFetching()` method is called.
     * It can affect both the performance of image processing tasks and the compatibility with certain analysis algorithms.
     *
     * @param pixelFormat The desired pixel format for the images. Supported formats include `IPF_GRAYSCALED`, `IPF_ABGR_8888`.
     */
    setPixelFormat(format: EnumImagePixelFormat.IPF_GRAYSCALED | EnumImagePixelFormat.IPF_ABGR_8888): void;
    /**
     * Retrieves the current pixel format used for images fetched from the camera.
     *
     * @returns The current pixel format, which could be one of the following: `IPF_GRAYSCALED`, `IPF_ABGR_8888`, and `IPF_ARGB_8888`.
     */
    getPixelFormat(): EnumImagePixelFormat;
    /**
     * Initiates a sequence to capture a single frame from the camera, only valid when the camera was open. halting the video stream temporarily.
     * This method prompts the user to either select a local image or capture a new one using the system camera, similar to the behavior in `singleFrameMode` but without changing the mode.
     *
     * Note: This method is intended for use cases where capturing a single, user-obtained image is necessary while the application is otherwise utilizing a live video stream.
     *
     * Steps performed by `takePhoto`:
     * 1. Stops the video stream and releases the camera, if it was in use.
     * 2. Prompts the user to take a new image with the system camera (on desktop, it prompts the user to select an image from the disk). This behavior mirrors that of `singleFrameMode[=="camera"]`
     * 3. Returns the obtained image in a callback function, this differs from `singleFrameMode` which would display the image in the view.
     * NOTE: user should resume the video stream after the image has been obtained to keep the video stream going.
     * @param listener A callback function that is invoked with a `DCEFrame` object containing the obtained image.
     */
    takePhoto(listener: (dceFrame: DCEFrame) => void): void;
    /**
     * Converts coordinates from the video's coordinate system to coordinates relative to the whole page.
     * This is useful for overlaying HTML elements on top of specific points in the video, aligning with the page's layout.
     *
     * @param point A `Point` object representing the x and y coordinates within the video's coordinate system.
     *
     * @returns A `Point` object representing the converted x and y coordinates relative to the page.
     */
    convertToPageCoordinates(point: Point): Point;
    /**
     * Converts coordinates from the video's coordinate system to coordinates relative to the viewport.
     * This is useful for positioning HTML elements in relation to the video element on the screen, regardless of page scrolling.
     *
     * @param point A `Point` object representing the x and y coordinates within the video's coordinate system.
     *
     * @returns A `Point` object representing the converted x and y coordinates relative to the viewport.
     */
    convertToClientCoordinates(point: Point): Point;
    /**
     * Converts coordinates from the video's coordinate system to coordinates relative to the viewport.
     * This is useful for positioning HTML elements in relation to the video element on the screen, regardless of page scrolling.
     *
     * @param point A `Point` object representing the x and y coordinates within the video's coordinate system.
     *
     * @returns A `Point` object representing the converted x and y coordinates relative to the viewport.
     */
    convertToScanRegionCoordinates(point: Point): Point;
    /**
     * Releases all resources used by the `CameraEnhancer` instance.
     */
    dispose(): void;
}

declare class CameraView extends View {
    #private;
    /**
     * @ignore
     */
    static _onLog: (message: any) => void;
    private static get engineResourcePath();
    private static _defaultUIElementURL;
    /**
     * Specifies the URL to a default UI definition file.
     * This URL is used as a fallback source for the UI of the `CameraView` class when the `createInstance()` method is invoked without specifying a `HTMLDivElement`.
     * This ensures that `CameraView` has a user interface even when no custom UI is provided.
     */
    static set defaultUIElementURL(value: string);
    static get defaultUIElementURL(): string;
    /**
     * Initializes a new instance of the `CameraView` class.
     * This method allows for optional customization of the user interface (UI) through a specified HTML element or an HTML file.
     */
    static createInstance(elementOrUrl?: HTMLElement | string): Promise<CameraView>;
    /**
     * Transform the coordinates from related to scan region to related to the whole video/image.
     * @param coord The coordinates related to scan region.
     * @param sx The x coordinate of scan region related to the whole video/image.
     * @param sy The y coordinate of scan region related to the whole video/image.
     * @param sWidth The width of scan region.
     * @param sHeight The height of scan region.
     * @param dWidth The width of cropped image. Its value is different from `sWidth` when the image is compressed.
     * @param dHeight The height of cropped image. Its value is different from `sHeight` when the image is compressed.
     * @ignore
     */
    static _transformCoordinates(coord: {
        x: number;
        y: number;
    }, sx: number, sy: number, sWidth: number, sHeight: number, dWidth: number, dHeight: number): void;
    cameraEnhancer: CameraEnhancer;
    /**
     * @ignore
     */
    eventHandler: EventHandler;
    private UIElement;
    private _poweredByVisible;
    /**
     * @ignore
     */
    containerClassName: string;
    _videoContainer: HTMLDivElement;
    private videoFit;
    /** @ignore */
    _hideDefaultSelection: boolean;
    /** @ignore */
    _divScanArea: any;
    /** @ignore */
    _divScanLight: any;
    /** @ignore */
    _bgLoading: any;
    /** @ignore */
    _selCam: any;
    /** @ignore */
    _bgCamera: any;
    /** @ignore */
    _selRsl: any;
    /** @ignore */
    _optGotRsl: any;
    /** @ignore */
    _btnClose: any;
    /** @ignore */
    _selMinLtr: any;
    /** @ignore */
    _optGotMinLtr: any;
    /** @ignore */
    _poweredBy: any;
    /** @ignore */
    _cvsSingleFrameMode: HTMLCanvasElement;
    private scanRegion;
    private _drawingLayerOfMask;
    private _maskBackRectStyleId;
    private _maskCenterRectStyleId;
    private regionMaskFillStyle;
    private regionMaskStrokeStyle;
    private regionMaskLineWidth;
    /**
     * @ignore
     */
    _userSetMaskVisible: boolean;
    /**
     * @ignore
     */
    _userSetLaserVisible: boolean;
    private _updateLayersTimeoutId;
    private _updateLayersTimeout;
    /**
     * Trigger when the css dimensions of the container of video element changed, or window changed.
     */
    private _videoResizeListener;
    private _windowResizeListener;
    private _resizeObserver;
    /**
     * @ignore
     */
    set _singleFrameMode(value: "disabled" | "camera" | "image");
    get _singleFrameMode(): "disabled" | "camera" | "image";
    _onSingleFrameAcquired: (canvas: HTMLCanvasElement) => void;
    private _singleFrameInputContainer;
    _clickIptSingleFrameMode: () => void;
    _capturedResultReceiver: any;
    /**
     * Returns whether the `CameraView` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CameraView` instance has been disposed of.
     */
    get disposed(): boolean;
    private constructor();
    /**
     * Differ from 'setUIElement()', 'setUIElement()' allow parameter of 'string' type, which means a url, '_setUIElement()' only accept parameter of 'HTMLElement' type.
     * @param element
     */
    private _setUIElement;
    setUIElement(elementOrUrl: HTMLElement | string): Promise<void>;
    getUIElement(): HTMLElement;
    private _bindUI;
    private _unbindUI;
    /**
     * Show loading animation.
     * @ignore
     */
    _startLoading(): void;
    /**
     * Hide loading animation.
     * @ignore
     */
    _stopLoading(): void;
    /**
     * Render cameras info in camera selection in default UI.
     * @ignore
     */
    _renderCamerasInfo(curCamera: {
        deviceId: string;
        label: string;
    }, cameraList: Array<{
        deviceId: string;
        label: string;
    }>): void;
    /**
     * Render resolution list in resolution selection in default UI.
     * @ignore
     */
    _renderResolutionInfo(curResolution: {
        width: number;
        height: number;
    }): void;
    /**
     * Retrieves the `HTMLVideoElement` that is currently being used for displaying the video in this `CameraView` instance.
     * This method allows access to the underlying video element, enabling direct interaction or further customization.
     *
     * @returns The `HTMLVideoElement` currently used by this `CameraView` instance for video display.
     */
    getVideoElement(): HTMLVideoElement;
    /**
     * tell if video is loaded.
     * @ignore
     */
    isVideoLoaded(): boolean;
    /**
     * Sets the `object-fit` CSS property of the `HTMLVideoElement` used by this `CameraView` instance.
     * The `object-fit` property specifies how the video content should be resized to fit the container in a way that maintains its aspect ratio.
     * @param objectFit The value for the `object-fit` property. At present, only "cover" and "contain" are allowed and the default is "contain".
     * Check out more on [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    setVideoFit(value: "contain" | "cover"): void;
    /**
     * Retrieves the current value of the `object-fit` CSS property from the `HTMLVideoElement` used by this `CameraView` instance.
     * The `object-fit` property determines how the video content is resized to fit its container.
     *
     * @returns The current value of the `object-fit` property applied to the video element. At present, the value is limited to "cover" and "contain".
     * Check out more on [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    getVideoFit(): "contain" | "cover";
    /**
     * Get dimensions of content(video, or image in single frame mode). It decides what dimensions the layers should be created.
     * @returns
     */
    protected getContentDimensions(): {
        width: number;
        height: number;
        objectFit: string;
    };
    /**
     * Update prop '#convertedRegion' and update related UI.
     * @param contentDimensions
     * @ignore
     */
    private updateConvertedRegion;
    /**
     * @ignore
     */
    getConvertedRegion(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * @ignore
     */
    setScanRegion(region: DSRect | Rect): void;
    /**
     * @ignore
     */
    getScanRegion(): any;
    /**
     * Returns the region of the video that is currently visible to the user.
     * @param options [Optional] Specifies how the visible region should be returned.
     * @param options.inPixels [Optional] If `true`, the coordinates of the visible region are returned in pixels. If `false` or omitted, the coordinates are returned as a percentage of the video element's size.
     *
     * @returns An object representing the visible region of the video.
     */
    getVisibleRegionOfVideo(options: {
        inPixels?: boolean;
    }): Rect;
    private setScanRegionMask;
    private clearScanRegionMask;
    /**
     * Not used yet.
     * @ignore
     */
    private deleteScanRegionMask;
    /**
     *
     * @param visible
     * @ignore
     */
    _setScanRegionMaskVisible(visible: boolean): void;
    /**
     * Sets the visibility of the scan region mask. This can be used to show or hide the mask.
     * @param visible Boolean indicating whether the scan region mask should be visible (`true`) or not (`false`).
     */
    setScanRegionMaskVisible(visible: boolean): void;
    /**
     * Checks if the scan region mask is currently visible.
     *
     * @returns Boolean indicating whether the scan region mask is visible (`true`) or not (`false`).
     */
    isScanRegionMaskVisible(): boolean;
    /**
     * Sets the style of the scan region mask. This style includes the line width, stroke color, and fill color.
     * @param style An object containing the new style settings for the scan region mask.
     * @param style.lineWidth The width of the line used to draw the border of the scan region mask.
     * @param style.strokeStyle The color of the stroke (border) of the scan region mask.
     * @param style.fillStyle The fill color of the scan region mask.
     */
    setScanRegionMaskStyle(style: {
        lineWidth: number;
        strokeStyle: string;
        fillStyle: string;
    }): void;
    /**
     * Retrieves the current style of the scan region mask. This includes the line width, stroke color, and fill color.
     */
    getScanRegionMaskStyle(): {
        fillStyle: string;
        strokeStyle: string;
        lineWidth: number;
    };
    /**
     * @ignore
     */
    private _setScanLaserVisible;
    /**
     * Sets the visibility of the scan laser effect. This can be used to show or hide the scan laser.
     * @param visible Boolean indicating whether the scan laser should be visible (`true`) or not (`false`).
     */
    setScanLaserVisible(visible: boolean): void;
    /**
     * Checks if the scan laser effect is currently visible.
     *
     * @returns Boolean indicating whether the scan laser is visible (`true`) or not (`false`).
     */
    isScanLaserVisible(): boolean;
    /**
     * @ignore
     */
    _updateVideoContainer(): void;
    /**
     * Sets the visibility of the `power by Dynamsoft` message. This can be used to show or hide the message.
     * @param visible Boolean indicating whether the message should be visible (`true`) or not (`false`).
     */
    setPowerByMessageVisible(visible: boolean): void;
    /**
     * Checks if the `power by Dynamsoft` message is currently visible.
     *
     * @returns Boolean indicating whether the message is visible (`true`) or not (`false`).
     */
    isPowerByMessageVisible(): boolean;
    /**
     * Update all layers(scan laser, drawing layers, scan region mask). Not used yet.
     * @ignore
     */
    private updateLayers;
    /**
     * Clears all system-defined `DrawingItem` objects while keeping user-defined ones.
     */
    clearAllInnerDrawingItems(): void;
    /**
     * Remove added elements. Remove event listeners.
     */
    dispose(): void;
}

declare class ImageEditorView extends View {
    #private;
    static createInstance(elementOrUrl?: HTMLElement | string): Promise<ImageEditorView>;
    private UIElement;
    /**
     * @ignore
     */
    containerClassName: string;
    /**
     * Control if enable magnifier function.
     * @ignore
     */
    private isUseMagnifier;
    /**
     * Returns whether the `ImageEditorView` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `ImageEditorView` instance has been disposed of.
     */
    get disposed(): boolean;
    private constructor();
    /**
     * Differ from 'setUIElement()', 'setUIElement()' allow parameter of 'string' type, which means a url, '_setUIElement()' only accept parameter of 'HTMLElement' type.
     * @param element
     */
    private _setUIElement;
    setUIElement(elementOrUrl: HTMLElement | string): Promise<void>;
    getUIElement(): HTMLElement;
    private _bindUI;
    private _unbindUI;
    /**
     * Draw image in inner canvas.
     * @ignore
     */
    private setImage;
    /**
     * Not used yet.
     * @ignore
     */
    private getImage;
    /**
     * Not used yet.
     * @ignore
     */
    private clearImage;
    /**
     * Not used yet.
     * @ignore
     */
    private removeImage;
    /**
     * Sets the image to be drawn on the `ImageEditorView`.
     * This method allows for the initialization or updating of the image.
     * @param image The image to be drawn on the `ImageEditorView`.
     */
    setOriginalImage(img: DSImageData | HTMLCanvasElement | HTMLImageElement): void;
    /**
     * Returns the current image drawn on the `ImageEditorView`.
     *
     * @returns The current image drawn on the `ImageEditorView`. The returned type will match the format of the image originally set via `setOriginalImage()`.
     */
    getOriginalImage(): DSImageData | HTMLCanvasElement | HTMLImageElement;
    /**
    * Get dimensions of content(that is, the image). It decides what dimensions the layers should be created.
    * @returns
    */
    protected getContentDimensions(): {
        width: number;
        height: number;
        objectFit: string;
    };
    /**
     * Create drawing layer with specified id and size.
     * Differ from 'createDrawingLayer()', the drawing layers created'createDrawingLayer()' can not Specified id, and their size is the same as video.
     * @ignore
     */
    _createDrawingLayer(drawingLayerId: number, width?: number, height?: number, objectFit?: string): DrawingLayer;
    /**
     * Releases all resources used by the `ImageEditorView` instance.
     */
    dispose(): void;
}

declare class ImageDataGetter {
    #private;
    static _onLog: (message: any) => void;
    static get version(): string;
    static _webGLSupported: boolean;
    static get webGLSupported(): boolean;
    useWebGLByDefault: boolean;
    _reusedCvs: HTMLCanvasElement;
    _reusedWebGLCvs?: HTMLCanvasElement;
    get disposed(): boolean;
    constructor();
    /**
     * Draw a image to canvas.
     * TODO: fix image is flipped when drawing in 'WebGL'.
     * @param canvas
     * @param source
     * @param sourceWidth
     * @param sourceHeight
     * @param position
     * @param options
     * @param options.bufferContainer if it is set and WebGL is used, the image data will be put into this variable.
     * @returns
     */
    drawImage(canvas: HTMLCanvasElement, source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, sourceWidth: number, sourceHeight: number, position?: {
        sx?: number;
        sy?: number;
        sWidth?: number;
        sHeight?: number;
        dx?: number;
        dy?: number;
        dWidth?: number;
        dHeight?: number;
    }, options?: {
        pixelFormat?: EnumPixelFormat;
        bUseWebGL?: boolean;
        bufferContainer?: Uint8Array;
        isEnableMirroring?: boolean;
    }): {
        context: CanvasRenderingContext2D | WebGLRenderingContext;
        pixelFormat: EnumPixelFormat;
        bUseWebGL: boolean;
    };
    /**
     * Read 'Unit8Array' from context of canvas.
     * @param context
     * @param position
     * @param bufferContainer If set, the data will be put into this variable, which will be useful when you want to reuse container.
     * @returns
     */
    readCvsData(context: CanvasRenderingContext2D | WebGLRenderingContext, position?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    }, bufferContainer?: Uint8Array): Uint8Array;
    /**
     * Transform pixel format.
     * @param data
     * @param originalFormat
     * @param targetFormat
     * @param copy
     * @returns
     */
    transformPixelFormat(data: Uint8Array, originalFormat: EnumPixelFormat, targetFormat: EnumPixelFormat, copy?: boolean): Uint8Array;
    /**
     * Get image data from image.
     * @param source
     * @param sourceWidth
     * @param sourceHeight
     * @param position
     * @param options
     * @returns
     */
    getImageData(source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, position: {
        sx: number;
        sy: number;
        sWidth: number;
        sHeight: number;
        dWidth: number;
        dHeight: number;
    }, options?: {
        pixelFormat?: EnumPixelFormat.RGBA | EnumPixelFormat.GREY;
        bufferContainer?: Uint8Array;
        isEnableMirroring?: boolean;
    }): {
        data: Uint8Array;
        pixelFormat: EnumPixelFormat;
        width: number;
        height: number;
        bUseWebGL: boolean;
    };
    /**
     * Draw image data to a canvas.
     * @param data
     * @param width
     * @param height
     * @param pixelFormat
     * @returns
     */
    convertDataToCvs(data: Uint8Array | Uint8ClampedArray, width: number, height: number, pixelFormat: EnumPixelFormat): HTMLCanvasElement;
    /**
     * Force lose webgl context.
     * @private
     */
    forceLoseContext(): void;
    dispose(): void;
}

interface CameraInfo {
    deviceId: string;
    label: string;
    /** @ignore */
    _checked: boolean;
}

type CameraEvent = "before:open" | "opened" | "before:close" | "closed" | "before:camera:change" | "camera:changed" | "before:resolution:change" | "resolution:changed" | "played" | "paused" | "resumed" | "tapfocus";
declare class CameraManager {
    #private;
    static _onLog: (message: any) => void;
    static get version(): string;
    static browserInfo: {
        browser: string;
        version: number;
        OS: string;
    };
    static onWarning: (message: string) => void;
    /**
     * Check if storage is available.
     * @ignore
     */
    static isStorageAvailable(type: string): boolean;
    static findBestRearCameraInIOS(cameraList: Array<{
        label: string;
        deviceId: string;
    }>, options?: {
        getMainCamera?: boolean;
    }): string;
    static findBestRearCamera(cameraList: Array<{
        label: string;
        deviceId: string;
    }>, options?: {
        getMainCameraInIOS?: boolean;
    }): string;
    static findBestCamera(cameraList: Array<{
        label: string;
        deviceId: string;
    }>, facingMode: "environment" | "user" | null, options?: {
        getMainCameraInIOS?: boolean;
    }): string;
    static playVideo(videoEl: HTMLVideoElement, source: string | MediaStream | MediaSource | Blob, timeout?: number): Promise<HTMLVideoElement>;
    static testCameraAccess(constraints?: MediaStreamConstraints): Promise<{
        ok: boolean;
        errorName?: string;
        errorMessage?: string;
    }>;
    /**
     * Camera/video state.
     */
    get state(): "closed" | "opening" | "opened";
    _zoomPreSetting: {
        factor: number;
        centerPoint?: {
            x: string;
            y: string;
        };
    };
    videoSrc: string;
    _mediaStream: MediaStream;
    defaultConstraints: MediaStreamConstraints;
    cameraOpenTimeout: number;
    /**
     * @ignore
     */
    _arrCameras: Array<CameraInfo>;
    /**
     * Whether to record camera you selected after reload the page.
     */
    set ifSaveLastUsedCamera(value: boolean);
    get ifSaveLastUsedCamera(): boolean;
    /**
     * Whether to skip the process of picking a proper rear camera when opening camera the first time.
     */
    ifSkipCameraInspection: boolean;
    selectIOSRearMainCameraAsDefault: boolean;
    get isVideoPlaying(): boolean;
    _focusParameters: any;
    _focusSupported: boolean;
    calculateCoordInVideo: (clientX: number, clientY: number) => {
        x: number;
        y: number;
    };
    set tapFocusEventBoundEl(element: HTMLElement);
    get tapFocusEventBoundEl(): HTMLElement;
    updateVideoElWhenSoftwareScaled: () => void;
    imageDataGetter: ImageDataGetter;
    detectedResolutions: {
        width: number;
        height: number;
    }[];
    get disposed(): boolean;
    constructor(videoEl?: HTMLVideoElement);
    setVideoEl(videoEl: HTMLVideoElement): void;
    getVideoEl(): HTMLVideoElement;
    releaseVideoEl(): void;
    isVideoLoaded(): boolean;
    /**
     * Open camera and play video.
     * @returns
     */
    open(): Promise<void>;
    close(): Promise<void>;
    pause(): void;
    resume(): Promise<void>;
    setCamera(deviceId: string): Promise<CameraInfo>;
    switchToFrontCamera(options?: {
        resolution: {
            width: number;
            height: number;
        };
    }): Promise<CameraInfo>;
    getCamera(): CameraInfo;
    _getCameras(force?: boolean): Promise<Array<CameraInfo>>;
    getCameras(): Promise<Array<CameraInfo>>;
    getAllCameras(): Promise<CameraInfo[]>;
    setResolution(width: number, height: number, exact?: boolean): Promise<{
        width: number;
        height: number;
    }>;
    getResolution(): {
        width: number;
        height: number;
    };
    getResolutions(reGet?: boolean): Promise<Array<{
        width: number;
        height: number;
    }>>;
    setMediaStreamConstraints(mediaStreamConstraints: MediaStreamConstraints, reOpen?: boolean): Promise<void>;
    getMediaStreamConstraints(): MediaStreamConstraints;
    resetMediaStreamConstraints(): void;
    getCameraCapabilities(): MediaTrackCapabilities;
    getCameraSettings(): MediaTrackSettings;
    turnOnTorch(): Promise<void>;
    turnOffTorch(): Promise<void>;
    setColorTemperature(value: number, autoCorrect?: boolean): Promise<number>;
    getColorTemperature(): number;
    setExposureCompensation(value: number, autoCorrect?: boolean): Promise<number>;
    getExposureCompensation(): number;
    setFrameRate(value: number, autoCorrect?: boolean): Promise<number>;
    getFrameRate(): number;
    setFocus(settings: {
        mode: string;
    } | {
        mode: "manual";
        distance: number;
    } | {
        mode: "manual";
        area: {
            centerPoint: {
                x: string;
                y: string;
            };
            width?: string;
            height?: string;
        };
    }, autoCorrect?: boolean): Promise<void>;
    getFocus(): Object;
    /**
     * Attention: tap focus is a feature that requires payment in DCE JS 4.x. Please consult relevant members if you want to export it to customers.
     */
    enableTapToFocus(): void;
    disableTapToFocus(): void;
    isTapToFocusEnabled(): boolean;
    /**
     *
     * @param settings factor: scale value; centerPoint: experimental argument, set the scale center. Video center by default.
     */
    setZoom(settings: {
        factor: number;
        centerPoint?: {
            x: string;
            y: string;
        };
    }): Promise<void>;
    getZoom(): {
        factor: number;
    };
    resetZoom(): Promise<void>;
    setHardwareScale(value: number, autoCorrect?: boolean): Promise<number>;
    getHardwareScale(): number;
    /**
     *
     * @param value scale value
     * @param center experimental argument, set the scale center. Video center by default.
     */
    setSoftwareScale(value: number, center?: {
        x: string;
        y: string;
    }): void;
    getSoftwareScale(): number;
    /**
     * Reset scale center to video center.
     * @experimental
     */
    resetScaleCenter(): void;
    resetSoftwareScale(): void;
    getFrameData(options?: {
        position?: {
            sx: number;
            sy: number;
            sWidth: number;
            sHeight: number;
            dWidth: number;
            dHeight: number;
        };
        pixelFormat?: EnumPixelFormat.GREY | EnumPixelFormat.RGBA;
        scale?: number;
        scaleCenter?: {
            x: string;
            y: string;
        };
        bufferContainer?: Uint8Array;
        isEnableMirroring?: boolean;
    }): {
        data: Uint8Array;
        width: number;
        height: number;
        pixelFormat: EnumPixelFormat;
        timeSpent: number;
        timeStamp: number;
        toCanvas: () => HTMLCanvasElement;
    };
    /**
     *
     * @param event {@link CameraEvent}
     * @param listener
     * @see {@link CameraEvent}
     * @see {@link off}
     */
    on(event: CameraEvent, listener: Function): void;
    /**
     *
     * @param event
     * @param listener
     * @see {@link CameraEvent}
     * @see {@link on}
     */
    off(event: CameraEvent, listener: Function): void;
    dispose(): Promise<void>;
}

declare class Feedback {
    #private;
    static allowBeep: boolean;
    static beepSoundSource: string;
    static beep(): void;
    static allowVibrate: boolean;
    static vibrateDuration: number;
    static vibrate(): void;
}

declare class DrawingStyleManager {
    #private;
    static STYLE_BLUE_STROKE: number;
    static STYLE_GREEN_STROKE: number;
    static STYLE_ORANGE_STROKE: number;
    static STYLE_YELLOW_STROKE: number;
    static STYLE_BLUE_STROKE_FILL: number;
    static STYLE_GREEN_STROKE_FILL: number;
    static STYLE_ORANGE_STROKE_FILL: number;
    static STYLE_YELLOW_STROKE_FILL: number;
    static STYLE_BLUE_STROKE_TRANSPARENT: number;
    static STYLE_GREEN_STROKE_TRANSPARENT: number;
    static STYLE_ORANGE_STROKE_TRANSPARENT: number;
    static USER_START_STYLE_ID: number;
    static createDrawingStyle(styleDefinition: DrawingStyle): number;
    private static _getDrawingStyle;
    static getDrawingStyle(styleId: number): DrawingStyle;
    static getAllDrawingStyles(): Array<DrawingStyle>;
    private static _updateDrawingStyle;
    static updateDrawingStyle(styleId: number, styleDefinition: DrawingStyle): void;
}

export { CameraEnhancer, CameraEnhancerModule, CameraManager, CameraView, DCEFrame, DrawingItem, DrawingItemEvent, DrawingLayer, DrawingStyle, DrawingStyleManager, EnumDrawingItemMediaType, EnumDrawingItemState, EnumEnhancedFeatures, Feedback, DT_Group as GroupDrawingItem, ImageDataGetter, DT_Image as ImageDrawingItem, ImageEditorView, DT_Line as LineDrawingItem, Note, PlayCallbackInfo, DT_Quad as QuadDrawingItem, DT_Rect as RectDrawingItem, Resolution, DT_Text as TextDrawingItem, TipConfig, VideoDeviceInfo, VideoFrameTag };


interface ParsedResultItem extends CapturedResultItem {
    codeType: string;
    jsonString: string;
    parsedFields: Array<{
        FieldName: string;
        Value: string;
    }>;
    getFieldValue(fieldName: string): string;
    getFieldRawValue(fieldName: string): string;
    getFieldMappingStatus: (fieldName: string) => EnumMappingStatus;
    getFieldValidationStatus: (fieldName: string) => EnumValidationStatus;
}

declare class CodeParser {
    private _instanceID;
    /**
     * Initializes a new instance of the `CodeParser` class.
     *
     * @returns A promise that resolves with the initialized `CodeParser` instance.
     */
    static createInstance(): Promise<CodeParser>;
    /**
     * Releases all resources used by the `CodeParser` instance.
     *
     * @returns A promise that resolves when the resources have been successfully released. It does not provide any value upon resolution.
     */
    dispose(): Promise<void>;
    /**
     * Returns whether the `CodeParser` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CodeParser` instance has been disposed of.
     */
    protected bDestroyed: boolean;
    get disposed(): boolean;
    /**
     * Configures runtime settings using a provided JSON string.
     * @param settings A JSON string that represents the content of the settings which contain at least one `CodeParserTaskSetting` object.
     *
     * @returns A promise that resolves when the operation has completed. It does not provide any value upon resolution.
     */
    initSettings(settings: string): Promise<void>;
    /**
     * Restores all runtime settings to their original default values.
     *
     * @returns A promise that resolves when the operation has completed. It does not provide any value upon resolution.
     */
    resetSettings(): Promise<void>;
    /**
     * Parses a single string or a `Uint8Array` object to be human-readable.
     * @param source Specifies the string or the `Uint8Array` object.
     * @param taskSettingName [Optional] Specifies a `CodeParserTaskSetting` to use.
     *
     * @returns A promise that resolves with a `ParsedResultItem` object which contains the parsed result.
     */
    parse(source: Uint8Array | string | Array<number>, taskSettingName?: string): Promise<ParsedResultItem>;
}

declare class CodeParserModule {
    static getVersion(): string;
    static loadSpec(specificationName: string | Array<string>, specificationPath?: string): Promise<void>;
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

interface ParsedResult extends CapturedResultBase {
    parsedResultItems: Array<ParsedResultItem>;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface CapturedResultReceiver {
        onParsedResultsReceived?: (result: ParsedResult) => void;
    }
}

export { CodeParser, CodeParserModule, EnumMappingStatus, EnumValidationStatus, ParsedResult, ParsedResultItem };


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
    /** Indicates whether the DetectedQuadResultItem has passed corss verification. */
    CrossVerificationStatus: EnumCrossVerificationStatus;
}

interface DeskewedImageResultItem extends CapturedResultItem {
    imageData: DSImageData;
    location: Quadrilateral;
    toCanvas: () => HTMLCanvasElement;
    toImage: (MIMEType: "image/png" | "image/jpeg") => HTMLImageElement;
    toBlob: (MIMEType: "image/png" | "image/jpeg") => Promise<Blob>;
}

interface EnhancedImageUnit extends IntermediateResultUnit {
    /** An array of `EnhancedImageElement` objects, each representing a piece of the original image after enhancement. */
    enhancedImage: EnhancedImageElement;
}

interface EnhancedImageElement extends RegionObjectElement {
    imageData: DSImageData;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onEnhancedImageReceived?: (result: EnhancedImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface EnhancedImageResultItem extends CapturedResultItem {
    /** The image data for the enhanced image result. */
    imageData: DSImageData;
    /** Converts the enhanced image data into an HTMLCanvasElement for display or further manipulation in web applications. */
    toCanvas: () => HTMLCanvasElement;
    /** Converts the enhanced image data into an HTMLImageElement of a specified MIME type ('image/png' or 'image/jpeg'). */
    toImage: (MIMEType: "image/png" | "image/jpeg") => HTMLImageElement;
    /** Converts the enhanced image data into a Blob object of a specified MIME type ('image/png' or 'image/jpeg'). */
    toBlob: (MIMEType: "image/png" | "image/jpeg") => Promise<Blob>;
}

interface CandidateQuadEdgesUnit extends IntermediateResultUnit {
    candidateQuadEdges: Array<Edge>;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onCandidateQuadEdgesUnitReceived?: (result: CandidateQuadEdgesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface CornersUnit extends IntermediateResultUnit {
    corners: Array<Corner>;
}
declare module "dynamsoft-capture-vision-bundle" {
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
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onDetectedQuadsReceived?: (result: DetectedQuadsUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface LongLinesUnit extends IntermediateResultUnit {
    longLines: Array<LineSegment>;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onLongLinesUnitReceived?: (result: LongLinesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface LogicLinesUnit extends IntermediateResultUnit {
    /** An array of logic line segments detected within the image. */
    logicLines: Array<LineSegment>;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onLogicLinesUnitReceived?: (result: LogicLinesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface DeskewedImageElement extends RegionObjectElement {
    imageData: DSImageData;
    referencedElement: RegionObjectElement;
}

interface DeskewedImageUnit extends IntermediateResultUnit {
    deskewedImage: DeskewedImageElement;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onDeskewedImageReceived?: (result: DeskewedImageUnit, info: IntermediateResultExtraInfo) => void;
    }
}

interface ProcessedDocumentResult extends CapturedResultBase {
    /** An array of `DetectedQuadResultItem` objects, each representing a quadrilateral after document detection. */
    readonly detectedQuadResultItems: Array<DetectedQuadResultItem>;
    /** An array of `DeskewedImageResultItem` objects, each representing a piece of the original image after deskewing. */
    readonly deskewedImageResultItems: Array<DeskewedImageResultItem>;
    /** An array of `EnhancedImageResultItem` objects, each representing a piece of the original image after enhancement. */
    readonly enhancedImageResultItems: Array<EnhancedImageResultItem>;
}
declare module "dynamsoft-capture-vision-bundle" {
    interface CapturedResultReceiver {
        onProcessedDocumentResultReceived?: (result: ProcessedDocumentResult) => void;
    }
}

/**
 * The `SimplifiedDocumentNormalizerSettings` interface defines simplified settings for document detection and normalization.
 */
interface SimplifiedDocumentNormalizerSettings {
    /** Grayscale enhancement modes to apply for improving detection in challenging conditions. */
    grayscaleEnhancementModes: Array<EnumGrayscaleEnhancementMode>;
    /** Grayscale transformation modes to apply, enhancing detection capability. */
    grayscaleTransformationModes: Array<EnumGrayscaleTransformationMode>;
    /** Color mode of the anticipated normalized page */
    colourMode: EnumImageColourMode;
    /** Width and height of the anticipated normalized page. */
    pageSize: [number, number];
    /** Anticipated brightness level of the normalized image. */
    brightness: number;
    /** Anticipated contrast level of the normalized image. */
    contrast: number;
    /**
     * Threshold for reducing the size of large images to speed up processing.
     * If the size of the image's shorter edge exceeds this threshold, the image may be downscaled to decrease processing time. The standard setting is 2300.
     */
    scaleDownThreshold: number;
    /** The minimum ratio between the target document area and the total image area. Only those exceedingthis value will be output (measured in percentages).*/
    minQuadrilateralAreaRatio: number;
    /** The number of documents expected to be detected.*/
    expectedDocumentsCount: number;
}

export { CandidateQuadEdgesUnit, CornersUnit, DeskewedImageElement, DeskewedImageResultItem, DeskewedImageUnit, DetectedQuadElement, DetectedQuadResultItem, DetectedQuadsUnit, DocumentNormalizerModule, EnhancedImageElement, EnhancedImageResultItem, EnhancedImageUnit, EnumImageColourMode, LogicLinesUnit, LongLinesUnit, ProcessedDocumentResult, SimplifiedDocumentNormalizerSettings };


declare class LabelRecognizerModule {
    #private;
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
    static loadConfusableCharsData(dataName: string, dataPath?: string): Promise<unknown>;
    static loadOverlappingCharsData(dataName: string, dataPath?: string): Promise<unknown>;
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
declare module "dynamsoft-capture-vision-bundle" {
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

interface RecognizedTextLinesResult extends CapturedResultBase {
    textLineResultItems: Array<TextLineResultItem>;
}
declare module "dynamsoft-capture-vision-bundle" {
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
    scaleDownThreshold: number;
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
declare module "dynamsoft-capture-vision-bundle" {
    interface IntermediateResultReceiver {
        onRawTextLinesUnitReceived?: (result: RawTextLinesUnit, info: IntermediateResultExtraInfo) => void;
    }
}

export { BufferedCharacterItem, BufferedCharacterItemSet, CharacterCluster, CharacterResult, EnumRawTextLineStatus, LabelRecognizerModule, LocalizedTextLineElement, LocalizedTextLinesUnit, RawTextLine, RawTextLinesUnit, RecognizedTextLineElement, RecognizedTextLinesResult, SimplifiedLabelRecognizerSettings, TextLineResultItem, utilsFuncs };

declare class LicenseModule {
    static getVersion(): string;
}

declare class LicenseManager {
    private static setLicenseServer;
    static _pLoad: any;
    static bPassValidation: boolean;
    static bCallInitLicense: boolean;
    private static _license;
    static get license(): string;
    static set license(license: string);
    /**
     * Specify the license server URL.
    */
    private static _licenseServer?;
    static get licenseServer(): string[] | string;
    static set licenseServer(value: string[] | string);
    private static _deviceFriendlyName;
    static get deviceFriendlyName(): string;
    static set deviceFriendlyName(value: string);
    /**
     * License the components.
     * @param license the license key to be used.
     * @remarks - for an online license, LicenseManager asks DLS for the license associated with the 'license' key and gets all usable modules
                - for an offline license, LicenseManager parses it to get a list of usable modules
     * @returns a promise resolving to true or false to indicate whether the license was initialized successfully.
    */
    static initLicense(license: string, options?: {
        executeNow: boolean;
    } | boolean): void | Promise<void>;
    /**
     * The following methods should be called before `initLicense`.
     */
    static setDeviceFriendlyName(name: string): void;
    static getDeviceFriendlyName(): string;
    static getDeviceUUID(): Promise<string>;
}

export { LicenseManager, LicenseModule };



declare class UtilityModule {
    static getVersion(): string;
}

type resultItemTypesString = "barcode" | "text_line" | "detected_quad" | "normalized_image";

declare class MultiFrameResultCrossFilter implements CapturedResultFilter {
    #private;
    constructor();
    verificationEnabled: {
        [key: number]: boolean;
    };
    duplicateFilterEnabled: {
        [key: number]: boolean;
    };
    duplicateForgetTime: {
        [key: number]: number;
    };
    private latestOverlappingEnabled;
    private maxOverlappingFrames;
    private overlapSet;
    private stabilityCount;
    private crossVerificationFrames;
    _dynamsoft(): void;
    /**
     * Enables or disables the verification of one or multiple specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param enabled Boolean to toggle verification on or off.
     */
    enableResultCrossVerification(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, enabled: boolean): void;
    /**
     * Checks if verification is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @returns Boolean indicating the status of verification for the specified type.
     */
    isResultCrossVerificationEnabled(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString): boolean;
    /**
     * Enables or disables the deduplication process for one or multiple specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param enabled Boolean to toggle deduplication on or off.
     */
    enableResultDeduplication(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, enabled: boolean): void;
    /**
     * Checks if deduplication is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @returns Boolean indicating the deduplication status for the specified type.
     */
    isResultDeduplicationEnabled(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString): boolean;
    /**
     * Sets the interval during which duplicates are disregarded for specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param time Time in milliseconds during which duplicates are disregarded.
     */
    setDuplicateForgetTime(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, time: number): void;
    /**
     * Retrieves the interval during which duplicates are disregarded for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @returns The set interval for the specified item type.
     */
    getDuplicateForgetTime(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString): number;
    /**
     * Set the max referencing frames count for the to-the-latest overlapping feature.
     *
     * @param resultItemTypes Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param maxOverlappingFrames The max referencing frames count for the to-the-latest overlapping feature.
     */
    setMaxOverlappingFrames(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, maxOverlappingFrames: number): void;
    /**
     * Get the max referencing frames count for the to-the-latest overlapping feature.
     * @param resultItemTypes Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @return Returns the max referencing frames count for the to-the-latest overlapping feature.
     */
    getMaxOverlappingFrames(resultItemType: EnumCapturedResultItemType): number;
    /**
     * Enables or disables the deduplication process for one or multiple specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param enabled Boolean to toggle deduplication on or off.
     */
    enableLatestOverlapping(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, enabled: boolean): void;
    /**
     * Checks if deduplication is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     *
     * @returns Boolean indicating the deduplication status for the specified type.
     */
    isLatestOverlappingEnabled(resultItemType: EnumCapturedResultItemType | resultItemTypesString): boolean;
    getFilteredResultItemTypes(): number;
    latestOverlappingFilter(result: any): void;
}

declare class ImageIO {
    #private;
    /**
     * This method reads an image from a file. The file format is automatically detected based on the file extensioor content.
     *
     * @param file The file to read, as a File object.
     *
     * @returns A promise that resolves with the loaded image of type `DSImageData`.
     */
    readFromFile(file: File): Promise<DSImageData>;
    /**
     * This method saves an image in either PNG or JPG format. The desired file format is inferred from the filextension provided in the 'name' parameter. Should the specified file format be omitted or unsupported, thdata will default to being exported in PNG format.
     *
     * @param image The image to be saved, of type `DSImageData`.
     * @param name The name of the file, as a string, under which the image will be saved.
     * @param download An optional boolean flag that, when set to true, triggers the download of the file.
     *
     * @returns A promise that resolves with the saved File object.
     */
    saveToFile(image: DSImageData, name: string, download?: boolean): Promise<File>;
    /**
     * Reads image data from memory using the specified ID.
     *
     * @param id - The memory ID referencing a previously stored image.
     *
     * @returns A Promise that resolves to the `DSImageData` object.
     */
    readFromMemory(id: number): Promise<DSImageData>;
    /**
     * This method saves an image to memory. The desired file format is inferred from the 'format' parameter. Should the specified file format be omitted or unsupported, the data will default to being exported in PNG format.
     *
     * @param image A `Blob` representing the image to be saved.
     * @param fileFormat The desired image format.
     *
     * @returns A Promise that resolves to a memory ID which can later be used to retrieve the image via readFromMemory.
     */
    saveToMemory(image: Blob, fileFormat: EnumImageFileFormat): Promise<number>;
}

declare class ImageDrawer {
    /**
     * This method draws various shapes on an image, and save it in PNG format.
     *
     * @param image The image to be saved.
     * @param drawingItem An array of different shapes to draw on the image.
     * @param type The type of drawing shapes.
     * @param color The color to use for drawing. Defaults to 0xFFFF0000 (red).
     * @param thickness The thickness of the lines to draw. Defaults to 1.
     * @param download An optional boolean flag that, when set to true, triggers the download of the file.
     *
     * @returns A promise that resolves with the saved File object.
     */
    drawOnImage(image: Blob | string | DSImageData, drawingItem: Array<Quadrilateral> | Quadrilateral | Array<LineSegment> | LineSegment | Array<Contour> | Contour | Array<Corner> | Corner | Array<Edge> | Edge, type: "quads" | "lines" | "contours" | "corners" | "edges", color?: number, thickness?: number, download?: boolean): Promise<DSImageData>;
}

declare enum EnumFilterType {
    FT_HIGH_PASS = 0,
    FT_SHARPEN = 1,
    FT_SMOOTH = 2
}

declare class ImageProcessor {
    /**
     * Crops an image using a rectangle or quadrilateral.
     * @param image The image data to be cropped.
     * @param roi The rectangle or quadrilateral to be cropped.
     *
     * @returns A promise that resolves with the cropped image data.
     */
    cropImage(image: Blob, roi: DSRect | Quadrilateral): Promise<DSImageData>;
    /**
     * Adjusts the brightness of the image.
     * @param image The image data to be adjusted.
     * @param brightness Brightness adjustment value (range: [-100, 100]).
     *
     * @returns A promise that resolves with the adjusted image data.
     */
    adjustBrightness(image: Blob, brightness: number): Promise<DSImageData>;
    /**
     * Adjusts the contrast of the image.
     * @param image The image data to be adjusted.
     * @param contrast Contrast adjustment value (range: [-100, 100]).
     *
     * @returns A promise that resolves with the adjusted image data.
     */
    adjustContrast(image: Blob, contrast: number): Promise<DSImageData>;
    /**
     * Applies a specified image filter to an input image.
     * @param image The image data to be filtered.
     * @param filterType The type of filter to apply.
     * @returns A promise that resolves with the filtered image data.
     */
    filterImage(image: Blob, filterType: EnumFilterType): Promise<DSImageData>;
    /**
     * Converts a colour image to grayscale.
     * @param image The image data to be converted.
     * @param R [R=0.3] - Weight for the red channel.
     * @param G [G=0.59] - Weight for the green channel.
     * @param B [B=0.11] - Weight for the blue channel.
     * @returns A promise that resolves with the grayscale image data.
     */
    convertToGray(image: Blob, R?: number, G?: number, B?: number): Promise<DSImageData>;
    /**
     * Converts a grayscale image to a binary image using a global threshold.
     * @param image The grayscale image data.
     * @param threshold [threshold=-1] Global threshold for binarization (-1 for automatic calculation).
     * @param invert [invert=false] Whether to invert the binary image.
     * @returns A promise that resolves with the binary image data.
     */
    convertToBinaryGlobal(image: Blob, threshold?: number, invert?: boolean): Promise<DSImageData>;
    /**
     * Converts a grayscale image to a binary image using local (adaptive) binarization.
     * @param image The grayscale image data.
     * @param blockSize [blockSize=0] Size of the block for local binarization.
     * @param compensation [compensation=0] Adjustment value to modify the threshold.
     * @param invert [invert=false] Whether to invert the binary image.
     * @returns A promise that resolves with the binary image data.
     */
    convertToBinaryLocal(image: Blob, blockSize?: number, compensation?: number, invert?: boolean): Promise<DSImageData>;
}

export { EnumFilterType, ImageDrawer, ImageIO, ImageProcessor, MultiFrameResultCrossFilter, UtilityModule };
