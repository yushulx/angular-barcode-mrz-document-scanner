#!/usr/bin/env node
/*
 * Post-build step for the hosted Codepool demo.
 *
 * `ng build --configuration demo` uses src/index.demo.html as its index file,
 * and the CLI keeps that basename in the output folder — so the build lands as
 * dist/angular-barcode-mrz-document-scanner/index.demo.html. Web servers look
 * for index.html, so rename it. Everything else in the folder is already
 * deployable as-is.
 *
 * Usage: node scripts/fix-demo-index.js   (run automatically by build:demo)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist', 'angular-barcode-mrz-document-scanner');
const src = path.join(distDir, 'index.demo.html');
const dest = path.join(distDir, 'index.html');

if (!fs.existsSync(src)) {
  if (fs.existsSync(dest)) {
    console.log('[fix-demo-index] index.html already in place, nothing to do.');
    process.exit(0);
  }
  console.error('[fix-demo-index] index.demo.html not found in ' + distDir);
  process.exit(1);
}

fs.renameSync(src, dest);
console.log('[fix-demo-index] renamed index.demo.html -> index.html');
