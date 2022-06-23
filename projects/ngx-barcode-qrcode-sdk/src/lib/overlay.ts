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

    drawOverlay(localization: any, text: any): void {
        if (this.context) {
            this.context.beginPath();
            this.context.moveTo(localization.x1, localization.y1);
            this.context.lineTo(localization.x2, localization.y2);
            this.context.lineTo(localization.x3, localization.y3);
            this.context.lineTo(localization.x4, localization.y4);
            this.context.lineTo(localization.x1, localization.y1);
            this.context.stroke();

            this.context.font = '18px Verdana';
            this.context.fillStyle = '#ff0000';
            let x = [
                localization.x1,
                localization.x2,
                localization.x3,
                localization.x4,
            ];
            let y = [
                localization.y1,
                localization.y2,
                localization.y3,
                localization.y4,
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