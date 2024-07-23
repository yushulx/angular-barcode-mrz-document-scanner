import { Corner, IntermediateResultExtraInfo, IntermediateResultUnit } from "dynamsoft-core";
export interface CornersUnit extends IntermediateResultUnit {
    corners: Array<Corner>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onCornersUnitReceived?: (result: CornersUnit, info: IntermediateResultExtraInfo) => void;
    }
}
