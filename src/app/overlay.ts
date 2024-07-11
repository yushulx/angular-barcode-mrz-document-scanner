import { Quadrilateral } from "dynamsoft-barcode-reader-bundle";

export class OverlayManager {
    overlay: HTMLCanvasElement | undefined;
    context: CanvasRenderingContext2D | undefined;

    initOverlay(overlay: HTMLCanvasElement): void {
        this.overlay = overlay;
        this.context = this.overlay.getContext('2d') as CanvasRenderingContext2D;
    }

    updateOverlay(width: number, height: number): void {
        if (this.overlay) {
            this.overlay.width = width;
            this.overlay.height = height;
            this.clearOverlay();
        }
    }

    clearOverlay(): void {
        if (this.context && this.overlay) {
            this.context.clearRect(0, 0, this.overlay.width, this.overlay.height);
            this.context.strokeStyle = '#ff0000';
            this.context.lineWidth = 5;
        }
    }

    drawOverlay(localization: Quadrilateral, text: any): void {
        if (this.context) {
            let points = localization.points;
            this.context.beginPath();
            this.context.moveTo(points[0].x, points[0].y);
            this.context.lineTo(points[1].x, points[1].y);
            this.context.lineTo(points[2].x, points[2].y);
            this.context.lineTo(points[3].x, points[3].y);
            this.context.lineTo(points[0].x, points[0].y);
            this.context.stroke();

            this.context.font = '18px Verdana';
            this.context.fillStyle = '#ff0000';
            let x = [
                points[0].x,
                points[1].x,
                points[2].x,
                points[3].x,
            ];
            let y = [
                points[0].y,
                points[1].y,
                points[2].y,
                points[3].y,
            ];
            x.sort(function (a, b) {
                return a - b;
            });
            y.sort(function (a, b) {
                return b - a;
            });
            let left = x[0];
            let top = y[0];

            this.context.fillText(text, left, top + 50);
        }
    }
}