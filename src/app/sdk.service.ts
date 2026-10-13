import { Injectable } from '@angular/core';
import { CoreModule, LicenseManager } from 'dynamsoft-capture-vision-bundle';
import { DDV } from 'dynamsoft-document-viewer';
import Dynamsoft from 'dwt';
import { environment } from '../environments/environment';
import { getDcvEngineResourcePaths, getDdvEngineResourcePath, getDwtResourcesPath, licenseNote, resolveLicenseKey } from './license';

/*
 * One-shot SDK activation for the whole app.
 *
 * The activation used to live in ProductListComponent.ngOnInit, which meant it
 * only ran when the home route was active: opening (or reloading on) an
 * example deep link like #/mrz-reader skipped the license init entirely and
 * every capture on that page failed. The root component now kicks this off on
 * every page load, and the example components await `whenReady()` before they
 * create their CaptureVisionRouter instances.
 *
 * Two flows share one code path:
 *   - hosted demo (environment.demoMode): activates on bootstrap with a
 *     hostname-resolved license key — no user interaction;
 *   - standalone build: stays inert until the user pastes a key and presses
 *     Activate on the home page (the tutorial flow).
 */
@Injectable({
  providedIn: 'root'
})
export class SdkService {
  state: 'loading' | 'ready' | 'error' = 'loading';
  errorMessage = '';

  private initPromise: Promise<void> | null = null;
  private initDone: Promise<void>;

  readonly demoMode = environment.demoMode;

  constructor() {
    // Resolves once the first activation attempt (auto or manual) finishes,
    // successfully or not — never rejects, so components can await it safely.
    this.initDone = new Promise<void>((resolve) => {
      this.resolveInitDone = resolve;
    });
  }

  private resolveInitDone: () => void = () => { };

  /* Hosted demo: called by the root component on every page load. */
  init(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.activate(resolveLicenseKey());
    }
    return this.initDone;
  }

  /* Standalone build: called by the Activate button with the user's key. */
  activateWithKey(licenseKey: string): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.activate(licenseKey);
    }
    return this.initDone;
  }

  /* Components await this before touching the SDK. */
  whenReady(): Promise<void> {
    return this.initDone;
  }

  get licenseNote(): string {
    return licenseNote();
  }

  private async activate(licenseKey: string): Promise<void> {
    this.state = 'loading';
    this.errorMessage = '';
    try {
      // Configure the paths where the .wasm files and other necessary resources for modules are located.
      CoreModule.engineResourcePaths = getDcvEngineResourcePaths();

      // Visit https://www.dynamsoft.com/customer/license/trialLicense/?product=dcv&package=cross-platform to get a trial license for capture vision suite.
      await LicenseManager.initLicense(licenseKey, { executeNow: true });

      DDV.Core.license = licenseKey;
      DDV.Core.engineResourcePath = getDdvEngineResourcePath();
      await DDV.Core.init();
      DDV.setProcessingHandler("imageFilter", new DDV.ImageFilter());

      // Preload the recognition modules so the first capture does not pay for
      // the wasm download. Capture Vision Router 3.6 expects the modules to be
      // loaded explicitly; relying on lazy loading leaves capture() unresolved.
      await CoreModule.loadWasm();

      // Dynamic Web TWAIN is only configured here — it loads on demand when a
      // scanner example is opened.
      Dynamsoft.DWT.ProductKey = licenseKey;
      Dynamsoft.DWT.ResourcesPath = getDwtResourcesPath();
      Dynamsoft.DWT.UseLocalService = true;

      this.state = 'ready';
    } catch (error) {
      console.log(error);
      this.state = 'error';
      this.errorMessage = (error && (error as any).message) ? (error as any).message : String(error);
    }
    this.resolveInitDone();
  }
}
