import { IntermediateResultExtraInfo, IntermediateResultUnit, LineSegment } from "dynamsoft-core";
export interface LongLinesUnit extends IntermediateResultUnit {
    longLines: Array<LineSegment>;
}
declare module "dynamsoft-capture-vision-router" {
    interface IntermediateResultReceiver {
        onLongLinesUnitReceived?: (result: LongLinesUnit, info: IntermediateResultExtraInfo) => void;
    }
}
