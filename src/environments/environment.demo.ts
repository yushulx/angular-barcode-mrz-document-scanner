// Deployment variant used by `npm run build:demo` (the Codepool hosted demo).
//
// demoMode = true means:
//   * no license input box — the SDK activates automatically on page load;
//   * the license key is resolved from the hostname (Codepool key on
//     dynamsoft.com, SDK trial key anywhere else);
//   * engine resources (wasm / models / DDV engine / DWT resources) load from
//     the jsDelivr CDN instead of the locally copied assets;
//   * the Angular router uses hash routing so the app works when it is
//     mounted under /codepool/demos/<slug>/ on a static host.
export const environment = {
  production: true,
  demoMode: true,
};
