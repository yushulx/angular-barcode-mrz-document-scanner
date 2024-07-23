import { ImageTag } from "dynamsoft-core";
import { NormalizedImageResultItem } from "./NormalizedImageResultItem";
export interface NormalizedImagesResult {
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
