import { Point, Quadrilateral } from "dynamsoft-barcode-reader-bundle";

export class OverlayManager {
    overlay: HTMLCanvasElement | undefined;
    context: CanvasRenderingContext2D | undefined;
    globalPoints: Point[] | undefined;

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
            this.globalPoints = points;
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

    setPoints(points: Point[]): void {
        this.globalPoints = points;
        this.overlay!.addEventListener("mousedown", (event) => this.updatePoint(event, this.context!, this.overlay!));
        this.overlay!.addEventListener("touchstart", (event) => this.updatePoint(event, this.context!, this.overlay!));
        this.drawQuad(this.context!, this.overlay!);
    }

    updatePoint(e: MouseEvent | TouchEvent, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        if (!this.globalPoints) {
            return;
        }
        let globalPoints = this.globalPoints;
        function getCoordinates(e: MouseEvent | TouchEvent): Point {
            let rect = canvas.getBoundingClientRect();

            let scaleX = canvas.clientWidth / canvas.width;
            let scaleY = canvas.clientHeight / canvas.height;

            let mouseX = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX);
            let mouseY = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY);
            if (scaleX < scaleY) {
                mouseX = mouseX - rect.left;
                mouseY = mouseY - rect.top - (canvas.clientHeight - canvas.height * scaleX) / 2;

                mouseX = mouseX / scaleX;
                mouseY = mouseY / scaleX;
            }
            else {
                mouseX = mouseX - rect.left - (canvas.clientWidth - canvas.width * scaleY) / 2;
                mouseY = mouseY - rect.top;

                mouseX = mouseX / scaleY;
                mouseY = mouseY / scaleY;
            }

            return { x: Math.round(mouseX), y: Math.round(mouseY) };
        }

        let delta = 10;
        let coordinates = getCoordinates(e);
        let ref = this;
        for (let i = 0; i < globalPoints.length; i++) {
            if (Math.abs(globalPoints[i].x - coordinates.x) < delta && Math.abs(globalPoints[i].y - coordinates.y) < delta) {
                canvas.addEventListener("mousemove", dragPoint);
                canvas.addEventListener("mouseup", releasePoint);
                canvas.addEventListener("touchmove", dragPoint);
                canvas.addEventListener("touchend", releasePoint);

                function dragPoint(e: MouseEvent | TouchEvent) {
                    coordinates = getCoordinates(e);
                    globalPoints[i].x = coordinates.x;
                    globalPoints[i].y = coordinates.y;
                    ref.drawQuad(context, canvas);
                }

                function releasePoint() {
                    canvas.removeEventListener("mousemove", dragPoint);
                    canvas.removeEventListener("mouseup", releasePoint);
                    canvas.removeEventListener("touchmove", dragPoint);
                    canvas.removeEventListener("touchend", releasePoint);
                }

                break;
            }
        }
    }

    drawQuad(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        let globalPoints = this.globalPoints;
        if (!globalPoints || globalPoints.length < 4) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "#00ff00";
        context.lineWidth = 2;
        for (let i = 0; i < globalPoints.length; i++) {
            context.beginPath();
            context.arc(globalPoints[i].x, globalPoints[i].y, 5, 0, 2 * Math.PI);
            context.stroke();
        }
        context.beginPath();
        context.moveTo(globalPoints[0].x, globalPoints[0].y);
        context.lineTo(globalPoints[1].x, globalPoints[1].y);
        context.lineTo(globalPoints[2].x, globalPoints[2].y);
        context.lineTo(globalPoints[3].x, globalPoints[3].y);
        context.lineTo(globalPoints[0].x, globalPoints[0].y);
        context.stroke();
    }
}