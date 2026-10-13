import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SdkService } from './sdk.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-barcode-mrz-document-scanner';

  /* The hosted demo carries the Dynamsoft Codepool header (logo, page title,
     All Demos / Blog nav) in index.html, so the app's own top bar would be a
     second, competing header. It is kept for the standalone build only. */
  readonly demoMode = environment.demoMode;
  isHome = true;

  constructor(private router: Router, private sdk: SdkService) {
    // Activate the SDK on every page load, whatever route is open — a deep
    // link straight to an example must not skip the license init.
    this.sdk.init();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHome = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '';
      }
    });
  }
}
