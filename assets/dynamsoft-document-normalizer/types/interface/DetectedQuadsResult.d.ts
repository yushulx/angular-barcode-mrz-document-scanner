import { ImageTag } from "dynamsoft-core";
import { DetectedQuadResultItem } from "./DetectedQuadResultItem";
export interface DetectedQuadsResult {
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
