import { EnumGrayscaleEnhancementMode, EnumGrayscaleTransformationMode } from "dynamsoft-core";
import { EnumImageColourMode } from "../enum/EnumImageColourMode";
/**
 * The `SimplifiedDocumentNormalizerSettings` interface defines simplified settings for document detection and normalization.
 */
export interface SimplifiedDocumentNormalizerSettings {
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
}
