#!/usr/bin/env node
/*
 * Post-build step for the hosted Codepool demo. Two jobs:
 *
 * 1. `ng build --configuration demo` uses src/index.demo.html as its index file,
 *    and the CLI keeps that basename in the output folder — so the build lands as
 *    dist/angular-barcode-mrz-document-scanner/index.demo.html. Web servers look
 *    for index.html, so rename it.
 *
 * 2. Rewrite the CLI-injected bundle script tags from type="module" to classic
 *    deferred scripts. Inside module scripts document.currentScript is always
 *    null, which breaks the script-path sniffer in the bundled dwt (Web TWAIN)
 *    npm package: it falls back to "the last <script> element in the document"
 *    and, whenever that element has no src (a script appended by GTM, a browser
 *    extension, ...), it throws
 *    "Uncaught TypeError: Cannot read properties of null (reading 'indexOf')".
 *    The error aborts the evaluation of the whole main bundle, so Angular never
 *    bootstraps and the page stays blank until a reload. Classic defer scripts
 *    run in the exact same order but keep document.currentScript set, so the
 *    sniffer reads main.js's own src and the crash cannot happen regardless of
 *    what other scripts do to the DOM.
 *
 * Usage: node scripts/fix-demo-index.js   (run automatically by build:demo)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist', 'angular-barcode-mrz-document-scanner');
const src = path.join(distDir, 'index.demo.html');
const dest = path.join(distDir, 'index.html');

function rewriteBundleScripts(file) {
  const html = fs.readFileSync(file, 'utf8');
  const moduleTag = /<script src="([^"]+\.js)" type="module"><\/script>/g;
  const files = [...html.matchAll(moduleTag)].map((m) => m[1]);
  const fixed = html.replace(moduleTag, (all, f) => '<script src="' + f + '" defer></script>');
  const leftover = fixed.match(/type="module"/g) || [];

  if (leftover.length > 0) {
    console.error('[fix-demo-index] found ' + leftover.length + ' script tag(s) still using ' +
      'type="module" that the rewrite did not cover — the CLI output shape changed. ' +
      'Review this script before deploying.');
    process.exit(1);
  }

  if (files.length === 0) {
    console.warn('[fix-demo-index] no type="module" script tags found; nothing to rewrite ' +
      '(already classic?). Double-check that the dwt currentScript crash cannot reappear.');
    return;
  }

  // Classic scripts cannot contain ESM-only syntax — refuse to rewrite if they do.
  for (const f of files) {
    if (/\bimport\s*\.\s*meta\b/.test(fs.readFileSync(path.join(distDir, f), 'utf8'))) {
      console.error('[fix-demo-index] ' + f + ' uses import.meta and cannot run as a ' +
        'classic script — review the rewrite strategy for the dwt crash.');
      process.exit(1);
    }
  }

  fs.writeFileSync(file, fixed);
  console.log('[fix-demo-index] rewrote ' + files.length + ' bundle script tag(s) to classic defer');
}

if (!fs.existsSync(src)) {
  if (fs.existsSync(dest)) {
    console.log('[fix-demo-index] index.html already in place, nothing to rename.');
    rewriteBundleScripts(dest);
    process.exit(0);
  }
  console.error('[fix-demo-index] index.demo.html not found in ' + distDir);
  process.exit(1);
}

fs.renameSync(src, dest);
console.log('[fix-demo-index] renamed index.demo.html -> index.html');

rewriteBundleScripts(dest);
