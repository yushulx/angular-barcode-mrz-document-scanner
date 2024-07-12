import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private showDiv: boolean = false;

  getShowDiv(): boolean {
    return this.showDiv;
  }

  setShowDiv(value: boolean): void {
    this.showDiv = value;
  }

  toggleShowDiv(): void {
    this.showDiv = !this.showDiv;
  }
}
