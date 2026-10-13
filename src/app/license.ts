import { environment } from '../environments/environment';
import { getFullUrl } from './utils';

/*
 * License and engine-resource resolution for the hosted Codepool demo.
 *
 * The standalone build (ng serve / ng build) keeps the tutorial flow: the user
 * pastes a license key into the input box on the home page and the engine
 * resources are served from the app's own `assets/` folder. The hosted demo
 * (ng build --configuration demo) must work without any user interaction, so:
 *
 *   1. the license key is resolved from the hostname — the Codepool key is
 *      bound to dynamsoft.com; anywhere else (localhost, a fork, a staging
 *      host) we fall back to the SDK's public 24-hour trial key;
 *   2. engine resources (wasm, models, DDV engine, DWT resources) are loaded
 *      from the jsDelivr CDN, which is what the other Codepool demos do — it
 *      keeps the hosted folder small and avoids copying ~200 MB of SDK
 *      resources into the site.
 *
 * This mirrors the license logic in the sibling Codepool demos
 * (demos/barcode-mrz-document-scanner/main.js, demos/driver-license-scanner).
 */

const BOUND_HOSTS = ['dynamsoft.com'];

// Codepool license — bound to dynamsoft.com, shared by the /codepool/demos/ pages.
const CODEPOOL_LICENSE_KEY = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLTEwMTY0ODQ5MCIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbS8iLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMCIsInN0YW5kYnlTZXJ2ZXJVUkwiOiJodHRwczovL3NsdHMuZHluYW1zb2Z0LmNvbS8iLCJjaGVja0NvZGUiOjE0MDA4MDY1Mjl9';

// SDK public trial key — no domain binding, good for 24 hours.
const TRIAL_LICENSE_KEY = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==';

/* Versions of the engine resources served from the CDN. Keep in sync with
   package.json. */
const CDN = 'https://cdn.jsdelivr.net/npm/';
const DCV_BUNDLE_VERSION = '3.6.3200';
const DCV_DATA_VERSION = '1.2.2';
const DDV_VERSION = '5.0.1';
const DWT_VERSION = '19.4.4';

/* Analytics shim: the hosted page loads demos/shared/analytics.js, but the
   shared helpers must never be a hard dependency — if the file is missing
   (e.g. the demo folder is opened as its own web root) everything still
   works, it just reports nothing. Same degrade-gracefully pattern as the
   sibling demos. */
const analytics = (window as any).DemoAnalytics || {
  action: function () { /* noop */ },
};

export function isBoundHost(): boolean {
  const host = window.location.hostname.toLowerCase();
  return BOUND_HOSTS.some((bound) => host === bound || host.endsWith('.' + bound));
}

export function resolveLicenseKey(): string {
  if (isBoundHost()) {
    return CODEPOOL_LICENSE_KEY;
  }
  console.info('[demo] Using the SDK trial license: the Codepool license is bound to '
    + BOUND_HOSTS.join(', ') + ' and cannot activate on "' + window.location.hostname + '".');
  analytics.action('license_fallback', { host: window.location.hostname });
  return TRIAL_LICENSE_KEY;
}

/* One-line description of the license in use, for the status chip on the
   hosted demo's home page. */
export function licenseNote(): string {
  if (!environment.demoMode) {
    return 'your own license';
  }
  return isBoundHost()
    ? 'Codepool license bound to dynamsoft.com'
    : 'public 24-hour trial license — host your own copy with a Dynamsoft license';
}

/* Engine resource paths. The standalone build serves everything from the
   app's own assets/ folder (angular.json copies them there at build time);
   the hosted demo pulls them from the jsDelivr CDN. */
export function getDcvEngineResourcePaths() {
  if (environment.demoMode) {
    return {
      dcvBundle: CDN + 'dynamsoft-capture-vision-bundle@' + DCV_BUNDLE_VERSION + '/dist/',
      dcvData: CDN + 'dynamsoft-capture-vision-data@' + DCV_DATA_VERSION + '/',
    };
  }
  return {
    dcvBundle: getFullUrl('assets/dynamsoft-capture-vision-bundle/'),
    dcvData: getFullUrl('assets/dynamsoft-capture-vision-data/'),
  };
}

export function getDdvEngineResourcePath(): string {
  if (environment.demoMode) {
    return CDN + 'dynamsoft-document-viewer@' + DDV_VERSION + '/dist/engine/';
  }
  return getFullUrl('assets/dynamsoft-document-viewer/engine/');
}

export function getDwtResourcesPath(): string {
  if (environment.demoMode) {
    return CDN + 'dwt@' + DWT_VERSION + '/dist';
  }
  return 'assets/dynamic-web-twain';
}
