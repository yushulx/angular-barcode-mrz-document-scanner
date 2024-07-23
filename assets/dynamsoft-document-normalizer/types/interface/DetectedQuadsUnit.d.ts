import { IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
import { DetectedQuadElement } from "./DetectedQuadElement";
export interface DetectedQuadsUnit extends IntermediateResultUnit {
    detectedQuads: Array<DetectedQuadElement>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onDetectedQuadsReceived?: (result: DetectedQuadsUnit, info: IntermediateResultExtraInfo) => void;
    }
}
