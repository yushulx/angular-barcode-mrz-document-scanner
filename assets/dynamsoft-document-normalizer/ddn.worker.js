/*!
* Dynamsoft JavaScript Library
* @product Dynamsoft Document Normalizer JS Edition
* @website http://www.dynamsoft.com
* @copyright Copyright 2024, Dynamsoft Corporation
* @author Dynamsoft
* @version 2.4.20
* @fileoverview Dynamsoft JavaScript Library for Document Normalizer
* More info on ddn JS: https://www.dynamsoft.com/document-normalizer/docs/web/programming/javascript/
*/
!function(){"use strict";self.ddnWorkerVersion="2.4.20",Object.assign(mapController,{ddn_setThresholdValue:async(s,e,t)=>{try{const r=wasmImports.emscripten_bind_DdnWasm_0(t);wasmImports.emscripten_bind_DdnWasm_setThresholdValue_3(r,s.threshold,s.leftLimit,s.rightLimit),handleTaskRes(e,{success:!0})}catch(s){return void handleTaskErr(e,s)}}})}();
