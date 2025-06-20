var Module = typeof Module != "undefined" ? Module : {};

var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = (status, toThrow) => {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = false;

var ENVIRONMENT_IS_WORKER = true;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

if (Module["ENVIRONMENT"]) {
 throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary;

if (ENVIRONMENT_IS_SHELL) {
 if ((typeof process == "object" && typeof require === "function") || typeof window == "object" || typeof importScripts == "function") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
 if (typeof read != "undefined") {
  read_ = read;
 }
 readBinary = f => {
  if (typeof readbuffer == "function") {
   return new Uint8Array(readbuffer(f));
  }
  let data = read(f, "binary");
  assert(typeof data == "object");
  return data;
 };
 readAsync = (f, onload, onerror) => {
  setTimeout(() => onload(readBinary(f)));
 };
 if (typeof clearTimeout == "undefined") {
  globalThis.clearTimeout = id => {};
 }
 if (typeof setTimeout == "undefined") {
  globalThis.setTimeout = f => (typeof f == "function") ? f() : abort();
 }
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit == "function") {
  quit_ = (status, toThrow) => {
   setTimeout(() => {
    if (!(toThrow instanceof ExitStatus)) {
     let toLog = toThrow;
     if (toThrow && typeof toThrow == "object" && toThrow.stack) {
      toLog = [ toThrow, toThrow.stack ];
     }
     err(`exiting due to exception: ${toLog}`);
    }
    quit(status);
   });
   throw toThrow;
  };
 }
 if (typeof print != "undefined") {
  if (typeof console == "undefined") console = /** @type{!Console} */ ({});
  console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
  console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr != "undefined" ? printErr : print);
 }
} else  if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (typeof document != "undefined" && document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 if (!(typeof window == "object" || typeof importScripts == "function")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
 {
  read_ = url => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, false);
   xhr.send(null);
   return xhr.responseText;
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = url => {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return new Uint8Array(/** @type{!ArrayBuffer} */ (xhr.response));
   };
  }
  readAsync = (url, onload, onerror) => {
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = () => {
    if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
     onload(xhr.response);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
} else  {
 throw new Error("environment detection error");
}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.error.bind(console);

Object.assign(Module, moduleOverrides);

moduleOverrides = null;

checkIncomingModuleAPI();

if (Module["arguments"]) arguments_ = Module["arguments"];

legacyModuleProp("arguments", "arguments_");

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

legacyModuleProp("thisProgram", "thisProgram");

if (Module["quit"]) quit_ = Module["quit"];

legacyModuleProp("quit", "quit_");

assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["read"] == "undefined", "Module.read option was removed (modify read_ in JS)");

assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");

assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");

assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");

assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");

legacyModuleProp("asm", "wasmExports");

legacyModuleProp("read", "read_");

legacyModuleProp("readAsync", "readAsync");

legacyModuleProp("readBinary", "readBinary");

legacyModuleProp("setWindowTitle", "setWindowTitle");

assert(!ENVIRONMENT_IS_WEB, "web environment detected but not enabled at build time.  Add 'web' to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_NODE, "node environment detected but not enabled at build time.  Add 'node' to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

legacyModuleProp("wasmBinary", "wasmBinary");

var noExitRuntime = Module["noExitRuntime"] || true;

legacyModuleProp("noExitRuntime", "noExitRuntime");

if (typeof WebAssembly != "object") {
 abort("no native wasm support detected");
}

var wasmMemory;

var ABORT = false;

var EXITSTATUS;

/** @type {function(*, string=)} */ function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed" + (text ? ": " + text : ""));
 }
}

var /** @type {!Int8Array} */ HEAP8, /** @type {!Uint8Array} */ HEAPU8, /** @type {!Int16Array} */ HEAP16, /** @type {!Uint16Array} */ HEAPU16, /** @type {!Int32Array} */ HEAP32, /** @type {!Uint32Array} */ HEAPU32, /** @type {!Float32Array} */ HEAPF32, /** @type {!Float64Array} */ HEAPF64;

function updateMemoryViews() {
 var b = wasmMemory.buffer;
 Module["HEAP8"] = HEAP8 = new Int8Array(b);
 Module["HEAP16"] = HEAP16 = new Int16Array(b);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
 Module["HEAP32"] = HEAP32 = new Int32Array(b);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
}

assert(!Module["STACK_SIZE"], "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");

assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined, "JS engine does not provide full typed array support");

assert(!Module["wasmMemory"], "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");

assert(!Module["INITIAL_MEMORY"], "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");

function writeStackCookie() {
 var max = _emscripten_stack_get_end();
 assert((max & 3) == 0);
 if (max == 0) {
  max += 4;
 }
 HEAPU32[((max) >> 2)] = 34821223;
 HEAPU32[(((max) + (4)) >> 2)] = 2310721022;
 HEAPU32[((0) >> 2)] = 1668509029;
}

function checkStackCookie() {
 if (ABORT) return;
 var max = _emscripten_stack_get_end();
 if (max == 0) {
  max += 4;
 }
 var cookie1 = HEAPU32[((max) >> 2)];
 var cookie2 = HEAPU32[(((max) + (4)) >> 2)];
 if (cookie1 != 34821223 || cookie2 != 2310721022) {
  abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
 }
 if (HEAPU32[((0) >> 2)] != 1668509029) /* 'emsc' */ {
  abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
 }
}

(function() {
 var h16 = new Int16Array(1);
 var h8 = new Int8Array(h16.buffer);
 h16[0] = 25459;
 if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
})();

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
 return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 assert(!runtimeInitialized);
 runtimeInitialized = true;
 checkStackCookie();
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 FS.ignorePermissions = false;
 TTY.init();
 SOCKFS.root = FS.mount(SOCKFS, {}, null);
 callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
 checkStackCookie();
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
 __ATINIT__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

var runDependencyTracking = {};

function getUniqueRunDependency(id) {
 var orig = id;
 while (1) {
  if (!runDependencyTracking[id]) return id;
  id = orig + Math.random();
 }
}

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(!runDependencyTracking[id]);
  runDependencyTracking[id] = 1;
  if (runDependencyWatcher === null && typeof setInterval != "undefined") {
   runDependencyWatcher = setInterval(() => {
    if (ABORT) {
     clearInterval(runDependencyWatcher);
     runDependencyWatcher = null;
     return;
    }
    var shown = false;
    for (var dep in runDependencyTracking) {
     if (!shown) {
      shown = true;
      err("still waiting on run dependencies:");
     }
     err(`dependency: ${dep}`);
    }
    if (shown) {
     err("(end of list)");
    }
   }, 1e4);
  }
 } else {
  err("warning: run dependency added without ID");
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(runDependencyTracking[id]);
  delete runDependencyTracking[id];
 } else {
  err("warning: run dependency removed without ID");
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

/** @param {string|number=} what */ function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 what = "Aborted(" + what + ")";
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 /** @suppress {checkTypes} */ var e = new WebAssembly.RuntimeError(what);
 throw e;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return filename.startsWith(dataURIPrefix);
}

function isFileURI(filename) {
 return filename.startsWith("file://");
}

function createExportWrapper(name) {
 return function() {
  assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
  var f = wasmExports[name];
  assert(f, `exported native function \`${name}\` not found`);
  return f.apply(null, arguments);
 };
}

class EmscriptenEH extends Error {}

class EmscriptenSjLj extends EmscriptenEH {}

class CppException extends EmscriptenEH {
 constructor(excPtr) {
  super(excPtr);
  this.excPtr = excPtr;
  const excInfo = getExceptionMessage(excPtr);
  this.name = excInfo[0];
  this.message = excInfo[1];
 }
}

var wasmBinaryFile;

wasmBinaryFile = "dynamsoft-capture-vision-bundle.wasm";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinarySync(file) {
 if (file == wasmBinaryFile && wasmBinary) {
  return new Uint8Array(wasmBinary);
 }
 if (readBinary) {
  return readBinary(file);
 }
 throw "both async and sync fetching of the wasm failed";
}

function getBinaryPromise(binaryFile) {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
  if (typeof fetch == "function") {
   return fetch(binaryFile, {
    credentials: "same-origin"
   }).then(response => {
    if (!response["ok"]) {
     throw "failed to load wasm binary file at '" + binaryFile + "'";
    }
    return response["arrayBuffer"]();
   }).catch(() => getBinarySync(binaryFile));
  }
 }
 return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
 return getBinaryPromise(binaryFile).then(binary => WebAssembly.instantiate(binary, imports)).then(instance => instance).then(receiver, reason => {
  err(`failed to asynchronously prepare wasm: ${reason}`);
  if (isFileURI(wasmBinaryFile)) {
   err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
  }
  abort(reason);
 });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
 if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
  return fetch(binaryFile, {
   credentials: "same-origin"
  }).then(response => {
   /** @suppress {checkTypes} */ var result = WebAssembly.instantiateStreaming(response, imports);
   return result.then(callback, function(reason) {
    err(`wasm streaming compile failed: ${reason}`);
    err("falling back to ArrayBuffer instantiation");
    return instantiateArrayBuffer(binaryFile, imports, callback);
   });
  });
 }
 return instantiateArrayBuffer(binaryFile, imports, callback);
}

function createWasm() {
 var info = {
  "env": wasmImports,
  "wasi_snapshot_preview1": wasmImports
 };
 /** @param {WebAssembly.Module=} module*/ function receiveInstance(instance, module) {
  wasmExports = instance.exports;
  wasmMemory = wasmExports["memory"];
  assert(wasmMemory, "memory not found in wasm exports");
  updateMemoryViews();
  wasmTable = wasmExports["__indirect_function_table"];
  assert(wasmTable, "table not found in wasm exports");
  addOnInit(wasmExports["__wasm_call_ctors"]);
  removeRunDependency("wasm-instantiate");
  return wasmExports;
 }
 addRunDependency("wasm-instantiate");
 var trueModule = Module;
 function receiveInstantiationResult(result) {
  assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
  trueModule = null;
  receiveInstance(result["instance"]);
 }
 if (Module["instantiateWasm"]) {
  try {
   return Module["instantiateWasm"](info, receiveInstance);
  } catch (e) {
   err(`Module.instantiateWasm callback failed with error: ${e}`);
   return false;
  }
 }
 instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
 return {};
}

var tempDouble;

var tempI64;

function legacyModuleProp(prop, newName, incomming = true) {
 if (!Object.getOwnPropertyDescriptor(Module, prop)) {
  Object.defineProperty(Module, prop, {
   configurable: true,
   get() {
    let extra = incomming ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)" : "";
    abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);
   }
  });
 }
}

function ignoredModuleProp(prop) {
 if (Object.getOwnPropertyDescriptor(Module, prop)) {
  abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
 }
}

function isExportedByForceFilesystem(name) {
 return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" ||  name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
}

function missingGlobal(sym, msg) {
 if (typeof globalThis !== "undefined") {
  Object.defineProperty(globalThis, sym, {
   configurable: true,
   get() {
    warnOnce("`" + sym + "` is not longer defined by emscripten. " + msg);
    return undefined;
   }
  });
 }
}

missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");

missingGlobal("asm", "Please use wasmExports instead");

function missingLibrarySymbol(sym) {
 if (typeof globalThis !== "undefined" && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
  Object.defineProperty(globalThis, sym, {
   configurable: true,
   get() {
    var msg = "`" + sym + "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";
    var librarySymbol = sym;
    if (!librarySymbol.startsWith("_")) {
     librarySymbol = "$" + sym;
    }
    msg += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='" + librarySymbol + "')";
    if (isExportedByForceFilesystem(sym)) {
     msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    warnOnce(msg);
    return undefined;
   }
  });
 }
 unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
 if (!Object.getOwnPropertyDescriptor(Module, sym)) {
  Object.defineProperty(Module, sym, {
   configurable: true,
   get() {
    var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)";
    if (isExportedByForceFilesystem(sym)) {
     msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    abort(msg);
   }
  });
 }
}

var ASM_CONSTS = {
 978504: ($0, $1, $2, $3) => {
  if (typeof Module == "undefined" || !Module.MountedFiles) {
   return 1;
  }
  let fileName = UTF8ToString($0 >>> 0);
  if (fileName.startsWith("./")) {
   fileName = fileName.substring(2);
  }
  const fileData = Module.MountedFiles.get(fileName);
  if (!fileData) {
   return 2;
  }
  const offset = $1 >>> 0;
  const length = $2 >>> 0;
  const buffer = $3 >>> 0;
  if (offset + length > fileData.byteLength) {
   return 3;
  }
  try {
   HEAPU8.set(fileData.subarray(offset, offset + length), buffer);
   return 0;
  } catch {
   return 4;
  }
 }
};

/** @constructor */ function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = `Program terminated with exit(${status})`;
 this.status = status;
}

var callRuntimeCallbacks = callbacks => {
 while (callbacks.length > 0) {
  callbacks.shift()(Module);
 }
};

var withStackSave = f => {
 var stack = stackSave();
 var ret = f();
 stackRestore(stack);
 return ret;
};

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

/**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */ var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
  return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
 }
 var str = "";
 while (idx < endPtr) {
  var u0 = heapOrArray[idx++];
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = heapOrArray[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode(((u0 & 31) << 6) | u1);
   continue;
  }
  var u2 = heapOrArray[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
  } else {
   if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
   u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
  }
 }
 return str;
};

/**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */ var UTF8ToString = (ptr, maxBytesToRead) => {
 assert(typeof ptr == "number");
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
};

var getExceptionMessageCommon = ptr => withStackSave(() => {
 var type_addr_addr = stackAlloc(4);
 var message_addr_addr = stackAlloc(4);
 ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
 var type_addr = HEAPU32[((type_addr_addr) >> 2)];
 var message_addr = HEAPU32[((message_addr_addr) >> 2)];
 var type = UTF8ToString(type_addr);
 _free(type_addr);
 var message;
 if (message_addr) {
  message = UTF8ToString(message_addr);
  _free(message_addr);
 }
 return [ type, message ];
});

var getExceptionMessage = ptr => getExceptionMessageCommon(ptr);

Module["getExceptionMessage"] = getExceptionMessage;

var ptrToString = ptr => {
 assert(typeof ptr === "number");
 ptr >>>= 0;
 return "0x" + ptr.toString(16).padStart(8, "0");
};

var warnOnce = text => {
 if (!warnOnce.shown) warnOnce.shown = {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  err(text);
 }
};

/** @type {function(...*):?} */ function _TIFFCleanup() {
 abort("missing function: TIFFCleanup");
}

_TIFFCleanup.stub = true;

/** @type {function(...*):?} */ function _TIFFClientOpen() {
 abort("missing function: TIFFClientOpen");
}

_TIFFClientOpen.stub = true;

/** @type {function(...*):?} */ function _TIFFComputeStrip() {
 abort("missing function: TIFFComputeStrip");
}

_TIFFComputeStrip.stub = true;

/** @type {function(...*):?} */ function _TIFFGetField() {
 abort("missing function: TIFFGetField");
}

_TIFFGetField.stub = true;

/** @type {function(...*):?} */ function _TIFFGetFieldDefaulted() {
 abort("missing function: TIFFGetFieldDefaulted");
}

_TIFFGetFieldDefaulted.stub = true;

/** @type {function(...*):?} */ function _TIFFReadDirectory() {
 abort("missing function: TIFFReadDirectory");
}

_TIFFReadDirectory.stub = true;

/** @type {function(...*):?} */ function _TIFFReadEncodedStrip() {
 abort("missing function: TIFFReadEncodedStrip");
}

_TIFFReadEncodedStrip.stub = true;

/** @type {function(...*):?} */ function _TIFFReadRGBAImageOriented() {
 abort("missing function: TIFFReadRGBAImageOriented");
}

_TIFFReadRGBAImageOriented.stub = true;

/** @type {function(...*):?} */ function _TIFFScanlineSize() {
 abort("missing function: TIFFScanlineSize");
}

_TIFFScanlineSize.stub = true;

/** @type {function(...*):?} */ function _TIFFSetField() {
 abort("missing function: TIFFSetField");
}

_TIFFSetField.stub = true;

/** @type {function(...*):?} */ function _TIFFStripSize() {
 abort("missing function: TIFFStripSize");
}

_TIFFStripSize.stub = true;

/** @type {function(...*):?} */ function __ZN5nsync13nsync_cv_waitEPNS_11nsync_cv_s_EPNS_11nsync_mu_s_E() {
 abort("missing function: _ZN5nsync13nsync_cv_waitEPNS_11nsync_cv_s_EPNS_11nsync_mu_s_E");
}

__ZN5nsync13nsync_cv_waitEPNS_11nsync_cv_s_EPNS_11nsync_mu_s_E.stub = true;

/** @type {function(...*):?} */ function __ZN5nsync15nsync_cv_signalEPNS_11nsync_cv_s_E() {
 abort("missing function: _ZN5nsync15nsync_cv_signalEPNS_11nsync_cv_s_E");
}

__ZN5nsync15nsync_cv_signalEPNS_11nsync_cv_s_E.stub = true;

var ___assert_fail = (condition, filename, line, func) => {
 abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
};

var exceptionCaught = [];

var uncaughtExceptionCount = 0;

var ___cxa_begin_catch = ptr => {
 var info = new ExceptionInfo(ptr);
 if (!info.get_caught()) {
  info.set_caught(true);
  uncaughtExceptionCount--;
 }
 info.set_rethrown(false);
 exceptionCaught.push(info);
 ___cxa_increment_exception_refcount(info.excPtr);
 return info.get_exception_ptr();
};

var exceptionLast = 0;

var ___cxa_end_catch = () => {
 _setThrew(0, 0);
 assert(exceptionCaught.length > 0);
 var info = exceptionCaught.pop();
 ___cxa_decrement_exception_refcount(info.excPtr);
 exceptionLast = 0;
};

/** @constructor */ function ExceptionInfo(excPtr) {
 this.excPtr = excPtr;
 this.ptr = excPtr - 24;
 this.set_type = function(type) {
  HEAPU32[(((this.ptr) + (4)) >> 2)] = type;
 };
 this.get_type = function() {
  return HEAPU32[(((this.ptr) + (4)) >> 2)];
 };
 this.set_destructor = function(destructor) {
  HEAPU32[(((this.ptr) + (8)) >> 2)] = destructor;
 };
 this.get_destructor = function() {
  return HEAPU32[(((this.ptr) + (8)) >> 2)];
 };
 this.set_caught = function(caught) {
  caught = caught ? 1 : 0;
  HEAP8[(((this.ptr) + (12)) >> 0)] = caught;
 };
 this.get_caught = function() {
  return HEAP8[(((this.ptr) + (12)) >> 0)] != 0;
 };
 this.set_rethrown = function(rethrown) {
  rethrown = rethrown ? 1 : 0;
  HEAP8[(((this.ptr) + (13)) >> 0)] = rethrown;
 };
 this.get_rethrown = function() {
  return HEAP8[(((this.ptr) + (13)) >> 0)] != 0;
 };
 this.init = function(type, destructor) {
  this.set_adjusted_ptr(0);
  this.set_type(type);
  this.set_destructor(destructor);
 };
 this.set_adjusted_ptr = function(adjustedPtr) {
  HEAPU32[(((this.ptr) + (16)) >> 2)] = adjustedPtr;
 };
 this.get_adjusted_ptr = function() {
  return HEAPU32[(((this.ptr) + (16)) >> 2)];
 };
 this.get_exception_ptr = function() {
  var isPointer = ___cxa_is_pointer_type(this.get_type());
  if (isPointer) {
   return HEAPU32[((this.excPtr) >> 2)];
  }
  var adjusted = this.get_adjusted_ptr();
  if (adjusted !== 0) return adjusted;
  return this.excPtr;
 };
}

var ___resumeException = ptr => {
 if (!exceptionLast) {
  exceptionLast = new CppException(ptr);
 }
 throw exceptionLast;
};

var findMatchingCatch = args => {
 var thrown = exceptionLast && exceptionLast.excPtr;
 if (!thrown) {
  setTempRet0(0);
  return 0;
 }
 var info = new ExceptionInfo(thrown);
 info.set_adjusted_ptr(thrown);
 var thrownType = info.get_type();
 if (!thrownType) {
  setTempRet0(0);
  return thrown;
 }
 for (var arg in args) {
  var caughtType = args[arg];
  if (caughtType === 0 || caughtType === thrownType) {
   break;
  }
  var adjusted_ptr_addr = info.ptr + 16;
  if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
   setTempRet0(caughtType);
   return thrown;
  }
 }
 setTempRet0(thrownType);
 return thrown;
};

var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);

var ___cxa_find_matching_catch_3 = arg0 => findMatchingCatch([ arg0 ]);

var ___cxa_rethrow = () => {
 var info = exceptionCaught.pop();
 if (!info) {
  abort("no exception to throw");
 }
 var ptr = info.excPtr;
 if (!info.get_rethrown()) {
  exceptionCaught.push(info);
  info.set_rethrown(true);
  info.set_caught(false);
  uncaughtExceptionCount++;
 }
 exceptionLast = new CppException(ptr);
 throw exceptionLast;
};

var ___cxa_rethrow_primary_exception = ptr => {
 if (!ptr) return;
 var info = new ExceptionInfo(ptr);
 exceptionCaught.push(info);
 info.set_rethrown(true);
 ___cxa_rethrow();
};

var ___cxa_throw = (ptr, type, destructor) => {
 var info = new ExceptionInfo(ptr);
 info.init(type, destructor);
 exceptionLast = new CppException(ptr);
 uncaughtExceptionCount++;
 throw exceptionLast;
};

var ___cxa_uncaught_exceptions = () => uncaughtExceptionCount;

var PATH = {
 isAbs: path => path.charAt(0) === "/",
 splitPath: filename => {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: (parts, allowAboveRoot) => {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: path => {
  var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: path => {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: path => {
  if (path === "/") return "/";
  path = PATH.normalize(path);
  path = path.replace(/\/$/, "");
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments);
  return PATH.normalize(paths.join("/"));
 },
 join2: (l, r) => PATH.normalize(l + "/" + r)
};

var initRandomFill = () => {
 if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
  return view => crypto.getRandomValues(view);
 } else  abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
};

var randomFill = view => (randomFill = initRandomFill())(view);

var PATH_FS = {
 resolve: function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = (i >= 0) ? arguments[i] : FS.cwd();
   if (typeof path != "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = PATH.isAbs(path);
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
  return ((resolvedAbsolute ? "/" : "") + resolvedPath) || ".";
 },
 relative: (from, to) => {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var FS_stdin_getChar_buffer = [];

var lengthBytesUTF8 = str => {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var c = str.charCodeAt(i);
  if (c <= 127) {
   len++;
  } else if (c <= 2047) {
   len += 2;
  } else if (c >= 55296 && c <= 57343) {
   len += 4;
   ++i;
  } else {
   len += 3;
  }
 }
 return len;
};

var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
 assert(typeof str === "string");
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | (u1 & 1023);
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++] = 192 | (u >> 6);
   heap[outIdx++] = 128 | (u & 63);
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++] = 224 | (u >> 12);
   heap[outIdx++] = 128 | ((u >> 6) & 63);
   heap[outIdx++] = 128 | (u & 63);
  } else {
   if (outIdx + 3 >= endIdx) break;
   if (u > 1114111) warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
   heap[outIdx++] = 240 | (u >> 18);
   heap[outIdx++] = 128 | ((u >> 12) & 63);
   heap[outIdx++] = 128 | ((u >> 6) & 63);
   heap[outIdx++] = 128 | (u & 63);
  }
 }
 heap[outIdx] = 0;
 return outIdx - startIdx;
};

/** @type {function(string, boolean=, number=)} */ function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var FS_stdin_getChar = () => {
 if (!FS_stdin_getChar_buffer.length) {
  var result = null;
  if (typeof window != "undefined" && typeof window.prompt == "function") {
   result = window.prompt("Input: ");
   if (result !== null) {
    result += "\n";
   }
  } else if (typeof readline == "function") {
   result = readline();
   if (result !== null) {
    result += "\n";
   }
  }
  if (!result) {
   return null;
  }
  FS_stdin_getChar_buffer = intArrayFromString(result, true);
 }
 return FS_stdin_getChar_buffer.shift();
};

var TTY = {
 ttys: [],
 init() {},
 shutdown() {},
 register(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  fsync(stream) {
   stream.tty.ops.fsync(stream.tty);
  },
  read(stream, buffer, offset, length, pos) {
   /* ignored */ if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char(tty) {
   return FS_stdin_getChar();
  },
  put_char(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  },
  ioctl_tcgets(tty) {
   return {
    c_iflag: 25856,
    c_oflag: 5,
    c_cflag: 191,
    c_lflag: 35387,
    c_cc: [ 3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
   };
  },
  ioctl_tcsets(tty, optional_actions, data) {
   return 0;
  },
  ioctl_tiocgwinsz(tty) {
   return [ 24, 80 ];
  }
 },
 default_tty1_ops: {
  put_char(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  fsync(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

var zeroMemory = (address, size) => {
 HEAPU8.fill(0, address, address + size);
 return address;
};

var alignMemory = (size, alignment) => {
 assert(alignment, "alignment argument is required");
 return Math.ceil(size / alignment) * alignment;
};

var mmapAlloc = size => {
 size = alignMemory(size, 65536);
 var ptr = _emscripten_builtin_memalign(65536, size);
 if (!ptr) return 0;
 return zeroMemory(ptr, size);
};

var MEMFS = {
 ops_table: null,
 mount(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, /* 0777 */ 0);
 },
 createNode(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
   parent.timestamp = node.timestamp;
  }
  return node;
 },
 getFileDataAsTypedArray(node) {
  if (!node.contents) return new Uint8Array(0);
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
 },
 resizeFileStorage(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
  } else {
   var oldContents = node.contents;
   node.contents = new Uint8Array(newSize);
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
  }
 },
 node_ops: {
  getattr(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.parent.timestamp = Date.now();
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   new_dir.timestamp = old_node.parent.timestamp;
   old_node.parent = new_dir;
  },
  unlink(parent, name) {
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  rmdir(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
   parent.timestamp = Date.now();
  },
  readdir(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | /* 0777 */ 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   assert(size >= 0);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write(stream, buffer, offset, length, position, canOwn) {
   assert(!(buffer instanceof ArrayBuffer));
   if (buffer.buffer === HEAP8.buffer) {
    canOwn = false;
   }
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     assert(position === 0, "canOwn must imply no weird position inside the file");
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = buffer.slice(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) {
    node.contents.set(buffer.subarray(offset, offset + length), position);
   } else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap(stream, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < contents.length) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    ptr = mmapAlloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    HEAP8.set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync(stream, buffer, offset, length, mmapFlags) {
   MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

/** @param {boolean=} noRunDep */ var asyncLoad = (url, onload, onerror, noRunDep) => {
 var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : "";
 readAsync(url, arrayBuffer => {
  assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
  onload(new Uint8Array(arrayBuffer));
  if (dep) removeRunDependency(dep);
 }, event => {
  if (onerror) {
   onerror();
  } else {
   throw `Loading data file "${url}" failed.`;
  }
 });
 if (dep) addRunDependency(dep);
};

var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);

var preloadPlugins = Module["preloadPlugins"] || [];

var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
 if (typeof Browser != "undefined") Browser.init();
 var handled = false;
 preloadPlugins.forEach(plugin => {
  if (handled) return;
  if (plugin["canHandle"](fullname)) {
   plugin["handle"](byteArray, fullname, finish, onerror);
   handled = true;
  }
 });
 return handled;
};

var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
 var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
 var dep = getUniqueRunDependency(`cp ${fullname}`);
 function processData(byteArray) {
  function finish(byteArray) {
   if (preFinish) preFinish();
   if (!dontCreateFile) {
    FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
   }
   if (onload) onload();
   removeRunDependency(dep);
  }
  if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
   if (onerror) onerror();
   removeRunDependency(dep);
  })) {
   return;
  }
  finish(byteArray);
 }
 addRunDependency(dep);
 if (typeof url == "string") {
  asyncLoad(url, byteArray => processData(byteArray), onerror);
 } else {
  processData(url);
 }
};

var FS_modeStringToFlags = str => {
 var flagModes = {
  "r": 0,
  "r+": 2,
  "w": 512 | 64 | 1,
  "w+": 512 | 64 | 2,
  "a": 1024 | 64 | 1,
  "a+": 1024 | 64 | 2
 };
 var flags = flagModes[str];
 if (typeof flags == "undefined") {
  throw new Error(`Unknown file open mode: ${str}`);
 }
 return flags;
};

var FS_getMode = (canRead, canWrite) => {
 var mode = 0;
 if (canRead) mode |= 292 | 73;
 if (canWrite) mode |= 146;
 return mode;
};

var ERRNO_MESSAGES = {
 0: "Success",
 1: "Arg list too long",
 2: "Permission denied",
 3: "Address already in use",
 4: "Address not available",
 5: "Address family not supported by protocol family",
 6: "No more processes",
 7: "Socket already connected",
 8: "Bad file number",
 9: "Trying to read unreadable message",
 10: "Mount device busy",
 11: "Operation canceled",
 12: "No children",
 13: "Connection aborted",
 14: "Connection refused",
 15: "Connection reset by peer",
 16: "File locking deadlock error",
 17: "Destination address required",
 18: "Math arg out of domain of func",
 19: "Quota exceeded",
 20: "File exists",
 21: "Bad address",
 22: "File too large",
 23: "Host is unreachable",
 24: "Identifier removed",
 25: "Illegal byte sequence",
 26: "Connection already in progress",
 27: "Interrupted system call",
 28: "Invalid argument",
 29: "I/O error",
 30: "Socket is already connected",
 31: "Is a directory",
 32: "Too many symbolic links",
 33: "Too many open files",
 34: "Too many links",
 35: "Message too long",
 36: "Multihop attempted",
 37: "File or path name too long",
 38: "Network interface is not configured",
 39: "Connection reset by network",
 40: "Network is unreachable",
 41: "Too many open files in system",
 42: "No buffer space available",
 43: "No such device",
 44: "No such file or directory",
 45: "Exec format error",
 46: "No record locks available",
 47: "The link has been severed",
 48: "Not enough core",
 49: "No message of desired type",
 50: "Protocol not available",
 51: "No space left on device",
 52: "Function not implemented",
 53: "Socket is not connected",
 54: "Not a directory",
 55: "Directory not empty",
 56: "State not recoverable",
 57: "Socket operation on non-socket",
 59: "Not a typewriter",
 60: "No such device or address",
 61: "Value too large for defined data type",
 62: "Previous owner died",
 63: "Not super-user",
 64: "Broken pipe",
 65: "Protocol error",
 66: "Unknown protocol",
 67: "Protocol wrong type for socket",
 68: "Math result not representable",
 69: "Read only file system",
 70: "Illegal seek",
 71: "No such process",
 72: "Stale file handle",
 73: "Connection timed out",
 74: "Text file busy",
 75: "Cross-device link",
 100: "Device not a stream",
 101: "Bad font file fmt",
 102: "Invalid slot",
 103: "Invalid request code",
 104: "No anode",
 105: "Block device required",
 106: "Channel number out of range",
 107: "Level 3 halted",
 108: "Level 3 reset",
 109: "Link number out of range",
 110: "Protocol driver not attached",
 111: "No CSI structure available",
 112: "Level 2 halted",
 113: "Invalid exchange",
 114: "Invalid request descriptor",
 115: "Exchange full",
 116: "No data (for no delay io)",
 117: "Timer expired",
 118: "Out of streams resources",
 119: "Machine is not on the network",
 120: "Package not installed",
 121: "The object is remote",
 122: "Advertise error",
 123: "Srmount error",
 124: "Communication error on send",
 125: "Cross mount point (not really error)",
 126: "Given log. name not unique",
 127: "f.d. invalid for this operation",
 128: "Remote address changed",
 129: "Can   access a needed shared lib",
 130: "Accessing a corrupted shared lib",
 131: ".lib section in a.out corrupted",
 132: "Attempting to link in too many libs",
 133: "Attempting to exec a shared library",
 135: "Streams pipe error",
 136: "Too many users",
 137: "Socket type not supported",
 138: "Not supported",
 139: "Protocol family not supported",
 140: "Can't send after socket shutdown",
 141: "Too many references",
 142: "Host is down",
 148: "No medium (in tape drive)",
 156: "Level 2 not synchronized"
};

var ERRNO_CODES = {};

var demangle = func => {
 warnOnce("warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling");
 return func;
};

var demangleAll = text => {
 var regex = /\b_Z[\w\d_]+/g;
 return text.replace(regex, function(x) {
  var y = demangle(x);
  return x === y ? x : (y + " [" + x + "]");
 });
};

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 lookupPath(path, opts = {}) {
  path = PATH_FS.resolve(path);
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  opts = Object.assign(defaults, opts);
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = path.split("/").filter(p => !!p);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = (i === parts.length - 1);
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || (islast && opts.follow_mount)) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count + 1
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath(node) {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
   }
   path = path ? `${node.name}/${path}` : node.name;
   node = node.parent;
  }
 },
 hashName(parentid, name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  }
  return ((parentid + hash) >>> 0) % FS.nameTable.length;
 },
 hashAddNode(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode(parent, name) {
  var errCode = FS.mayLookup(parent);
  if (errCode) {
   throw new FS.ErrnoError(errCode, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode(parent, name, mode, rdev) {
  assert(typeof parent == "object");
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode(node) {
  FS.hashRemoveNode(node);
 },
 isRoot(node) {
  return node === node.parent;
 },
 isMountpoint(node) {
  return !!node.mounted;
 },
 isFile(mode) {
  return (mode & 61440) === 32768;
 },
 isDir(mode) {
  return (mode & 61440) === 16384;
 },
 isLink(mode) {
  return (mode & 61440) === 40960;
 },
 isChrdev(mode) {
  return (mode & 61440) === 8192;
 },
 isBlkdev(mode) {
  return (mode & 61440) === 24576;
 },
 isFIFO(mode) {
  return (mode & 61440) === 4096;
 },
 isSocket(mode) {
  return (mode & 49152) === 49152;
 },
 flagsToPermissionString(flag) {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if ((flag & 512)) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions(node, perms) {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.includes("r") && !(node.mode & 292)) {
   return 2;
  } else if (perms.includes("w") && !(node.mode & 146)) {
   return 2;
  } else if (perms.includes("x") && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup(dir) {
  var errCode = FS.nodePermissions(dir, "x");
  if (errCode) return errCode;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate(dir, name) {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete(dir, name, isdir) {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var errCode = FS.nodePermissions(dir, "wx");
  if (errCode) {
   return errCode;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen(node, flags) {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" ||  (flags & 512)) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd() {
  for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStreamChecked(fd) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  return stream;
 },
 getStream: fd => FS.streams[fd],
 createStream(stream, fd = -1) {
  if (!FS.FSStream) {
   FS.FSStream = /** @constructor */ function() {
    this.shared = {};
   };
   FS.FSStream.prototype = {};
   Object.defineProperties(FS.FSStream.prototype, {
    object: {
     /** @this {FS.FSStream} */ get() {
      return this.node;
     },
     /** @this {FS.FSStream} */ set(val) {
      this.node = val;
     }
    },
    isRead: {
     /** @this {FS.FSStream} */ get() {
      return (this.flags & 2097155) !== 1;
     }
    },
    isWrite: {
     /** @this {FS.FSStream} */ get() {
      return (this.flags & 2097155) !== 0;
     }
    },
    isAppend: {
     /** @this {FS.FSStream} */ get() {
      return (this.flags & 1024);
     }
    },
    flags: {
     /** @this {FS.FSStream} */ get() {
      return this.shared.flags;
     },
     /** @this {FS.FSStream} */ set(val) {
      this.shared.flags = val;
     }
    },
    position: {
     /** @this {FS.FSStream} */ get() {
      return this.shared.position;
     },
     /** @this {FS.FSStream} */ set(val) {
      this.shared.position = val;
     }
    }
   });
  }
  stream = Object.assign(new FS.FSStream, stream);
  if (fd == -1) {
   fd = FS.nextfd();
  }
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream(fd) {
  FS.streams[fd] = null;
 },
 chrdev_stream_ops: {
  open(stream) {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  },
  llseek() {
   throw new FS.ErrnoError(70);
  }
 },
 major: dev => ((dev) >> 8),
 minor: dev => ((dev) & 255),
 makedev: (ma, mi) => ((ma) << 8 | (mi)),
 registerDevice(dev, ops) {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: dev => FS.devices[dev],
 getMounts(mount) {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 },
 syncfs(populate, callback) {
  if (typeof populate == "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(errCode) {
   assert(FS.syncFSRequests > 0);
   FS.syncFSRequests--;
   return callback(errCode);
  }
  function done(errCode) {
   if (errCode) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(errCode);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(mount => {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount(type, opts, mountpoint) {
  if (typeof type == "string") {
   throw type;
  }
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount(mountpoint) {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(hash => {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.includes(current.mount)) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  assert(idx !== -1);
  node.mount.mounts.splice(idx, 1);
 },
 lookup(parent, name) {
  return parent.node_ops.lookup(parent, name);
 },
 mknod(path, mode, dev) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.mayCreate(parent, name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create(path, mode) {
  mode = mode !== undefined ? mode : 438;
  /* 0666 */ mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir(path, mode) {
  mode = mode !== undefined ? mode : 511;
  /* 0777 */ mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree(path, mode) {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev(path, mode, dev) {
  if (typeof dev == "undefined") {
   dev = mode;
   mode = 438;
  }
  /* 0666 */ mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink(oldpath, newpath) {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var errCode = FS.mayCreate(parent, newname);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename(old_path, new_path) {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  lookup = FS.lookupPath(old_path, {
   parent: true
  });
  old_dir = lookup.node;
  lookup = FS.lookupPath(new_path, {
   parent: true
  });
  new_dir = lookup.node;
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var errCode = FS.mayDelete(old_dir, old_name, isdir);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   errCode = FS.nodePermissions(old_dir, "w");
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
 },
 rmdir(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, true);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
 },
 readdir(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, false);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
 },
 readlink(path) {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat(path, dontFollow) {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat(path) {
  return FS.stat(path, true);
 },
 chmod(path, mode, dontFollow) {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: (mode & 4095) | (node.mode & ~4095),
   timestamp: Date.now()
  });
 },
 lchmod(path, mode) {
  FS.chmod(path, mode, true);
 },
 fchmod(fd, mode) {
  var stream = FS.getStreamChecked(fd);
  FS.chmod(stream.node, mode);
 },
 chown(path, uid, gid, dontFollow) {
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown(path, uid, gid) {
  FS.chown(path, uid, gid, true);
 },
 fchown(fd, uid, gid) {
  var stream = FS.getStreamChecked(fd);
  FS.chown(stream.node, uid, gid);
 },
 truncate(path, len) {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path == "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.nodePermissions(node, "w");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate(fd, len) {
  var stream = FS.getStreamChecked(fd);
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime(path, atime, mtime) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open(path, flags, mode) {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
  mode = typeof mode == "undefined" ? 438 : /* 0666 */ mode;
  if ((flags & 64)) {
   mode = (mode & 4095) | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path == "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if ((flags & 64)) {
   if (node) {
    if ((flags & 128)) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if ((flags & 65536) && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var errCode = FS.mayOpen(node, flags);
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  if ((flags & 512) && !created) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512 | 131072);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  });
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
   }
  }
  return stream;
 },
 close(stream) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed(stream) {
  return stream.fd === null;
 },
 llseek(stream, offset, whence) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read(stream, buffer, offset, length, position) {
  assert(offset >= 0);
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write(stream, buffer, offset, length, position, canOwn) {
  assert(offset >= 0);
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.seekable && stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position != "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  return bytesWritten;
 },
 allocate(stream, offset, length) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap(stream, length, position, prot, flags) {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, length, position, prot, flags);
 },
 msync(stream, buffer, offset, length, mmapFlags) {
  assert(offset >= 0);
  if (!stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 munmap: stream => 0,
 ioctl(stream, cmd, arg) {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile(path, opts = {}) {
  opts.flags = opts.flags || 0;
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error(`Invalid encoding type "${opts.encoding}"`);
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile(path, data, opts = {}) {
  opts.flags = opts.flags || 577;
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data == "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: () => FS.currentPath,
 chdir(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var errCode = FS.nodePermissions(lookup.node, "x");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories() {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices() {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: () => 0,
   write: (stream, buffer, offset, length, pos) => length
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var randomBuffer = new Uint8Array(1024), randomLeft = 0;
  var randomByte = () => {
   if (randomLeft === 0) {
    randomLeft = randomFill(randomBuffer).byteLength;
   }
   return randomBuffer[--randomLeft];
  };
  FS.createDevice("/dev", "random", randomByte);
  FS.createDevice("/dev", "urandom", randomByte);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories() {
  FS.mkdir("/proc");
  var proc_self = FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount() {
    var node = FS.createNode(proc_self, "fd", 16384 | 511, /* 0777 */ 73);
    node.node_ops = {
     lookup(parent, name) {
      var fd = +name;
      var stream = FS.getStreamChecked(fd);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: () => stream.path
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams() {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", 0);
  var stdout = FS.open("/dev/stdout", 1);
  var stderr = FS.open("/dev/stderr", 1);
  assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
  assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
  assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
 },
 ensureErrnoError() {
  if (FS.ErrnoError) return;
  FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
   this.name = "ErrnoError";
   this.node = node;
   this.setErrno = /** @this{Object} */ function(errno) {
    this.errno = errno;
    for (var key in ERRNO_CODES) {
     if (ERRNO_CODES[key] === errno) {
      this.code = key;
      break;
     }
    }
   };
   this.setErrno(errno);
   this.message = ERRNO_MESSAGES[errno];
   if (this.stack) {
    Object.defineProperty(this, "stack", {
     value: (new Error).stack,
     writable: true
    });
    this.stack = demangleAll(this.stack);
   }
  };
  FS.ErrnoError.prototype = new Error;
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 44 ].forEach(code => {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
 },
 staticInit() {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS
  };
 },
 init(input, output, error) {
  assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit() {
  FS.init.initialized = false;
  _fflush(0);
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 findObject(path, dontResolveLastLink) {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (!ret.exists) {
   return null;
  }
  return ret.object;
 },
 analyzePath(path, dontResolveLastLink) {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createPath(parent, path, canRead, canWrite) {
  parent = typeof parent == "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile(parent, name, properties, canRead, canWrite) {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile(parent, name, data, canRead, canWrite, canOwn) {
  var path = name;
  if (parent) {
   parent = typeof parent == "string" ? parent : FS.getPath(parent);
   path = name ? PATH.join2(parent, name) : parent;
  }
  var mode = FS_getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data == "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, 577);
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 },
 createDevice(parent, name, input, output) {
  var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
  var mode = FS_getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open(stream) {
    stream.seekable = false;
   },
   close(stream) {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   },
   read(stream, buffer, offset, length, pos) {
    /* ignored */ var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 forceLoadFile(obj) {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  if (typeof XMLHttpRequest != "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
 },
 createLazyFile(parent, name, url, canRead, canWrite) {
  /** @constructor */ function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = (idx / this.chunkSize) | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest;
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = (from, to) => {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest;
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(/** @type{Array<number>} */ (xhr.response || []));
    }
    return intArrayFromString(xhr.responseText || "", true);
   };
   var lazyArray = this;
   lazyArray.setDataGetter(chunkNum => {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] == "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   });
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    out("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest != "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array;
   Object.defineProperties(lazyArray, {
    length: {
     get: /** @this{Object} */ function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     }
    },
    chunkSize: {
     get: /** @this{Object} */ function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     }
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: /** @this {FSNode} */ function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(key => {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    FS.forceLoadFile(node);
    return fn.apply(null, arguments);
   };
  });
  function writeChunks(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   assert(size >= 0);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  }
  stream_ops.read = (stream, buffer, offset, length, position) => {
   FS.forceLoadFile(node);
   return writeChunks(stream, buffer, offset, length, position);
  };
  stream_ops.mmap = (stream, length, position, prot, flags) => {
   FS.forceLoadFile(node);
   var ptr = mmapAlloc(length);
   if (!ptr) {
    throw new FS.ErrnoError(48);
   }
   writeChunks(stream, HEAP8, ptr, length, position);
   return {
    ptr: ptr,
    allocated: true
   };
  };
  node.stream_ops = stream_ops;
  return node;
 },
 absolutePath() {
  abort("FS.absolutePath has been removed; use PATH_FS.resolve instead");
 },
 createFolder() {
  abort("FS.createFolder has been removed; use FS.mkdir instead");
 },
 createLink() {
  abort("FS.createLink has been removed; use FS.symlink instead");
 },
 joinPath() {
  abort("FS.joinPath has been removed; use PATH.join instead");
 },
 mmapAlloc() {
  abort("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
 },
 standardizePath() {
  abort("FS.standardizePath has been removed; use PATH.normalize instead");
 }
};

var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 calculateAt(dirfd, path, allowEmpty) {
  if (PATH.isAbs(path)) {
   return path;
  }
  var dir;
  if (dirfd === -100) {
   dir = FS.cwd();
  } else {
   var dirstream = SYSCALLS.getStreamFromFD(dirfd);
   dir = dirstream.path;
  }
  if (path.length == 0) {
   if (!allowEmpty) {
    throw new FS.ErrnoError(44);
   }
   return dir;
  }
  return PATH.join2(dir, path);
 },
 doStat(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -54;
   }
   throw e;
  }
  HEAP32[((buf) >> 2)] = stat.dev;
  HEAP32[(((buf) + (4)) >> 2)] = stat.mode;
  HEAPU32[(((buf) + (8)) >> 2)] = stat.nlink;
  HEAP32[(((buf) + (12)) >> 2)] = stat.uid;
  HEAP32[(((buf) + (16)) >> 2)] = stat.gid;
  HEAP32[(((buf) + (20)) >> 2)] = stat.rdev;
  (tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  HEAP32[(((buf) + (24)) >> 2)] = tempI64[0], HEAP32[(((buf) + (28)) >> 2)] = tempI64[1]);
  HEAP32[(((buf) + (32)) >> 2)] = 4096;
  HEAP32[(((buf) + (36)) >> 2)] = stat.blocks;
  var atime = stat.atime.getTime();
  var mtime = stat.mtime.getTime();
  var ctime = stat.ctime.getTime();
  (tempI64 = [ Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), 
  (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  HEAP32[(((buf) + (40)) >> 2)] = tempI64[0], HEAP32[(((buf) + (44)) >> 2)] = tempI64[1]);
  HEAPU32[(((buf) + (48)) >> 2)] = (atime % 1e3) * 1e3;
  (tempI64 = [ Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), 
  (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  HEAP32[(((buf) + (56)) >> 2)] = tempI64[0], HEAP32[(((buf) + (60)) >> 2)] = tempI64[1]);
  HEAPU32[(((buf) + (64)) >> 2)] = (mtime % 1e3) * 1e3;
  (tempI64 = [ Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), 
  (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  HEAP32[(((buf) + (72)) >> 2)] = tempI64[0], HEAP32[(((buf) + (76)) >> 2)] = tempI64[1]);
  HEAPU32[(((buf) + (80)) >> 2)] = (ctime % 1e3) * 1e3;
  (tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  HEAP32[(((buf) + (88)) >> 2)] = tempI64[0], HEAP32[(((buf) + (92)) >> 2)] = tempI64[1]);
  return 0;
 },
 doMsync(addr, stream, len, flags, offset) {
  if (!FS.isFile(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (flags & 2) {
   return 0;
  }
  var buffer = HEAPU8.slice(addr, addr + len);
  FS.msync(stream, buffer, offset, len, flags);
 },
 varargs: undefined,
 get() {
  assert(SYSCALLS.varargs != undefined);
  var ret = HEAP32[((+SYSCALLS.varargs) >> 2)];
  SYSCALLS.varargs += 4;
  return ret;
 },
 getp() {
  return SYSCALLS.get();
 },
 getStr(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 getStreamFromFD(fd) {
  var stream = FS.getStreamChecked(fd);
  return stream;
 }
};

function ___syscall__newselect(nfds, readfds, writefds, exceptfds, timeout) {
 try {
  assert(nfds <= 64, "nfds must be less than or equal to 64");
  var total = 0;
  var srcReadLow = (readfds ? HEAP32[((readfds) >> 2)] : 0), srcReadHigh = (readfds ? HEAP32[(((readfds) + (4)) >> 2)] : 0);
  var srcWriteLow = (writefds ? HEAP32[((writefds) >> 2)] : 0), srcWriteHigh = (writefds ? HEAP32[(((writefds) + (4)) >> 2)] : 0);
  var srcExceptLow = (exceptfds ? HEAP32[((exceptfds) >> 2)] : 0), srcExceptHigh = (exceptfds ? HEAP32[(((exceptfds) + (4)) >> 2)] : 0);
  var dstReadLow = 0, dstReadHigh = 0;
  var dstWriteLow = 0, dstWriteHigh = 0;
  var dstExceptLow = 0, dstExceptHigh = 0;
  var allLow = (readfds ? HEAP32[((readfds) >> 2)] : 0) | (writefds ? HEAP32[((writefds) >> 2)] : 0) | (exceptfds ? HEAP32[((exceptfds) >> 2)] : 0);
  var allHigh = (readfds ? HEAP32[(((readfds) + (4)) >> 2)] : 0) | (writefds ? HEAP32[(((writefds) + (4)) >> 2)] : 0) | (exceptfds ? HEAP32[(((exceptfds) + (4)) >> 2)] : 0);
  var check = function(fd, low, high, val) {
   return (fd < 32 ? (low & val) : (high & val));
  };
  for (var fd = 0; fd < nfds; fd++) {
   var mask = 1 << (fd % 32);
   if (!(check(fd, allLow, allHigh, mask))) {
    continue;
   }
   var stream = SYSCALLS.getStreamFromFD(fd);
   var flags = SYSCALLS.DEFAULT_POLLMASK;
   if (stream.stream_ops.poll) {
    var timeoutInMillis = -1;
    if (timeout) {
     var tv_sec = (readfds ? HEAP32[((timeout) >> 2)] : 0), tv_usec = (readfds ? HEAP32[(((timeout) + (8)) >> 2)] : 0);
     timeoutInMillis = (tv_sec + tv_usec / 1e6) * 1e3;
    }
    flags = stream.stream_ops.poll(stream, timeoutInMillis);
   }
   if ((flags & 1) && check(fd, srcReadLow, srcReadHigh, mask)) {
    fd < 32 ? (dstReadLow = dstReadLow | mask) : (dstReadHigh = dstReadHigh | mask);
    total++;
   }
   if ((flags & 4) && check(fd, srcWriteLow, srcWriteHigh, mask)) {
    fd < 32 ? (dstWriteLow = dstWriteLow | mask) : (dstWriteHigh = dstWriteHigh | mask);
    total++;
   }
   if ((flags & 2) && check(fd, srcExceptLow, srcExceptHigh, mask)) {
    fd < 32 ? (dstExceptLow = dstExceptLow | mask) : (dstExceptHigh = dstExceptHigh | mask);
    total++;
   }
  }
  if (readfds) {
   HEAP32[((readfds) >> 2)] = dstReadLow;
   HEAP32[(((readfds) + (4)) >> 2)] = dstReadHigh;
  }
  if (writefds) {
   HEAP32[((writefds) >> 2)] = dstWriteLow;
   HEAP32[(((writefds) + (4)) >> 2)] = dstWriteHigh;
  }
  if (exceptfds) {
   HEAP32[((exceptfds) >> 2)] = dstExceptLow;
   HEAP32[(((exceptfds) + (4)) >> 2)] = dstExceptHigh;
  }
  return total;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var SOCKFS = {
 mount(mount) {
  Module["websocket"] = (Module["websocket"] && ("object" === typeof Module["websocket"])) ? Module["websocket"] : {};
  Module["websocket"]._callbacks = {};
  Module["websocket"]["on"] = /** @this{Object} */ function(event, callback) {
   if ("function" === typeof callback) {
    this._callbacks[event] = callback;
   }
   return this;
  };
  Module["websocket"].emit = /** @this{Object} */ function(event, param) {
   if ("function" === typeof this._callbacks[event]) {
    this._callbacks[event].call(this, param);
   }
  };
  return FS.createNode(null, "/", 16384 | 511, /* 0777 */ 0);
 },
 createSocket(family, type, protocol) {
  type &= ~526336;
  var streaming = type == 1;
  if (streaming && protocol && protocol != 6) {
   throw new FS.ErrnoError(66);
  }
  var sock = {
   family: family,
   type: type,
   protocol: protocol,
   server: null,
   error: null,
   peers: {},
   pending: [],
   recv_queue: [],
   sock_ops: SOCKFS.websocket_sock_ops
  };
  var name = SOCKFS.nextname();
  var node = FS.createNode(SOCKFS.root, name, 49152, 0);
  node.sock = sock;
  var stream = FS.createStream({
   path: name,
   node: node,
   flags: 2,
   seekable: false,
   stream_ops: SOCKFS.stream_ops
  });
  sock.stream = stream;
  return sock;
 },
 getSocket(fd) {
  var stream = FS.getStream(fd);
  if (!stream || !FS.isSocket(stream.node.mode)) {
   return null;
  }
  return stream.node.sock;
 },
 stream_ops: {
  poll(stream) {
   var sock = stream.node.sock;
   return sock.sock_ops.poll(sock);
  },
  ioctl(stream, request, varargs) {
   var sock = stream.node.sock;
   return sock.sock_ops.ioctl(sock, request, varargs);
  },
  read(stream, buffer, offset, length, position) {
   /* ignored */ var sock = stream.node.sock;
   var msg = sock.sock_ops.recvmsg(sock, length);
   if (!msg) {
    return 0;
   }
   buffer.set(msg.buffer, offset);
   return msg.buffer.length;
  },
  write(stream, buffer, offset, length, position) {
   /* ignored */ var sock = stream.node.sock;
   return sock.sock_ops.sendmsg(sock, buffer, offset, length);
  },
  close(stream) {
   var sock = stream.node.sock;
   sock.sock_ops.close(sock);
  }
 },
 nextname() {
  if (!SOCKFS.nextname.current) {
   SOCKFS.nextname.current = 0;
  }
  return "socket[" + (SOCKFS.nextname.current++) + "]";
 },
 websocket_sock_ops: {
  createPeer(sock, addr, port) {
   var ws;
   if (typeof addr == "object") {
    ws = addr;
    addr = null;
    port = null;
   }
   if (ws) {
    if (ws._socket) {
     addr = ws._socket.remoteAddress;
     port = ws._socket.remotePort;
    } else  {
     var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
     if (!result) {
      throw new Error("WebSocket URL must be in the format ws(s)://address:port");
     }
     addr = result[1];
     port = parseInt(result[2], 10);
    }
   } else {
    try {
     var runtimeConfig = (Module["websocket"] && ("object" === typeof Module["websocket"]));
     var url = "ws:#".replace("#", "//");
     if (runtimeConfig) {
      if ("string" === typeof Module["websocket"]["url"]) {
       url = Module["websocket"]["url"];
      }
     }
     if (url === "ws://" || url === "wss://") {
      var parts = addr.split("/");
      url = url + parts[0] + ":" + port + "/" + parts.slice(1).join("/");
     }
     var subProtocols = "binary";
     if (runtimeConfig) {
      if ("string" === typeof Module["websocket"]["subprotocol"]) {
       subProtocols = Module["websocket"]["subprotocol"];
      }
     }
     var opts = undefined;
     if (subProtocols !== "null") {
      subProtocols = subProtocols.replace(/^ +| +$/g, "").split(/ *, */);
      opts = subProtocols;
     }
     if (runtimeConfig && null === Module["websocket"]["subprotocol"]) {
      subProtocols = "null";
      opts = undefined;
     }
     var WebSocketConstructor;
     {
      WebSocketConstructor = WebSocket;
     }
     ws = new WebSocketConstructor(url, opts);
     ws.binaryType = "arraybuffer";
    } catch (e) {
     throw new FS.ErrnoError(23);
    }
   }
   var peer = {
    addr: addr,
    port: port,
    socket: ws,
    dgram_send_queue: []
   };
   SOCKFS.websocket_sock_ops.addPeer(sock, peer);
   SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
   if (sock.type === 2 && typeof sock.sport != "undefined") {
    peer.dgram_send_queue.push(new Uint8Array([ 255, 255, 255, 255, "p".charCodeAt(0), "o".charCodeAt(0), "r".charCodeAt(0), "t".charCodeAt(0), ((sock.sport & 65280) >> 8), (sock.sport & 255) ]));
   }
   return peer;
  },
  getPeer(sock, addr, port) {
   return sock.peers[addr + ":" + port];
  },
  addPeer(sock, peer) {
   sock.peers[peer.addr + ":" + peer.port] = peer;
  },
  removePeer(sock, peer) {
   delete sock.peers[peer.addr + ":" + peer.port];
  },
  handlePeerEvents(sock, peer) {
   var first = true;
   var handleOpen = function() {
    Module["websocket"].emit("open", sock.stream.fd);
    try {
     var queued = peer.dgram_send_queue.shift();
     while (queued) {
      peer.socket.send(queued);
      queued = peer.dgram_send_queue.shift();
     }
    } catch (e) {
     peer.socket.close();
    }
   };
   function handleMessage(data) {
    if (typeof data == "string") {
     var encoder = new TextEncoder;
     data = encoder.encode(data);
    } else  {
     assert(data.byteLength !== undefined);
     if (data.byteLength == 0) {
      return;
     }
     data = new Uint8Array(data);
    }
    var wasfirst = first;
    first = false;
    if (wasfirst && data.length === 10 && data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 && data[4] === "p".charCodeAt(0) && data[5] === "o".charCodeAt(0) && data[6] === "r".charCodeAt(0) && data[7] === "t".charCodeAt(0)) {
     var newport = ((data[8] << 8) | data[9]);
     SOCKFS.websocket_sock_ops.removePeer(sock, peer);
     peer.port = newport;
     SOCKFS.websocket_sock_ops.addPeer(sock, peer);
     return;
    }
    sock.recv_queue.push({
     addr: peer.addr,
     port: peer.port,
     data: data
    });
    Module["websocket"].emit("message", sock.stream.fd);
   }
   if (ENVIRONMENT_IS_NODE) {
    peer.socket.on("open", handleOpen);
    peer.socket.on("message", function(data, isBinary) {
     if (!isBinary) {
      return;
     }
     handleMessage((new Uint8Array(data)).buffer);
    });
    peer.socket.on("close", function() {
     Module["websocket"].emit("close", sock.stream.fd);
    });
    peer.socket.on("error", function(error) {
     sock.error = 14;
     Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
    });
   } else {
    peer.socket.onopen = handleOpen;
    peer.socket.onclose = function() {
     Module["websocket"].emit("close", sock.stream.fd);
    };
    peer.socket.onmessage = function peer_socket_onmessage(event) {
     handleMessage(event.data);
    };
    peer.socket.onerror = function(error) {
     sock.error = 14;
     Module["websocket"].emit("error", [ sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused" ]);
    };
   }
  },
  poll(sock) {
   if (sock.type === 1 && sock.server) {
    return sock.pending.length ? (64 | 1) : 0;
   }
   var mask = 0;
   var dest = sock.type === 1 ?  SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) : null;
   if (sock.recv_queue.length || !dest ||  (dest && dest.socket.readyState === dest.socket.CLOSING) || (dest && dest.socket.readyState === dest.socket.CLOSED)) {
    mask |= (64 | 1);
   }
   if (!dest ||  (dest && dest.socket.readyState === dest.socket.OPEN)) {
    mask |= 4;
   }
   if ((dest && dest.socket.readyState === dest.socket.CLOSING) || (dest && dest.socket.readyState === dest.socket.CLOSED)) {
    mask |= 16;
   }
   return mask;
  },
  ioctl(sock, request, arg) {
   switch (request) {
   case 21531:
    var bytes = 0;
    if (sock.recv_queue.length) {
     bytes = sock.recv_queue[0].data.length;
    }
    HEAP32[((arg) >> 2)] = bytes;
    return 0;

   default:
    return 28;
   }
  },
  close(sock) {
   if (sock.server) {
    try {
     sock.server.close();
    } catch (e) {}
    sock.server = null;
   }
   var peers = Object.keys(sock.peers);
   for (var i = 0; i < peers.length; i++) {
    var peer = sock.peers[peers[i]];
    try {
     peer.socket.close();
    } catch (e) {}
    SOCKFS.websocket_sock_ops.removePeer(sock, peer);
   }
   return 0;
  },
  bind(sock, addr, port) {
   if (typeof sock.saddr != "undefined" || typeof sock.sport != "undefined") {
    throw new FS.ErrnoError(28);
   }
   sock.saddr = addr;
   sock.sport = port;
   if (sock.type === 2) {
    if (sock.server) {
     sock.server.close();
     sock.server = null;
    }
    try {
     sock.sock_ops.listen(sock, 0);
    } catch (e) {
     if (!(e.name === "ErrnoError")) throw e;
     if (e.errno !== 138) throw e;
    }
   }
  },
  connect(sock, addr, port) {
   if (sock.server) {
    throw new FS.ErrnoError(138);
   }
   if (typeof sock.daddr != "undefined" && typeof sock.dport != "undefined") {
    var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
    if (dest) {
     if (dest.socket.readyState === dest.socket.CONNECTING) {
      throw new FS.ErrnoError(7);
     } else {
      throw new FS.ErrnoError(30);
     }
    }
   }
   var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
   sock.daddr = peer.addr;
   sock.dport = peer.port;
   throw new FS.ErrnoError(26);
  },
  listen(sock, backlog) {
   if (!ENVIRONMENT_IS_NODE) {
    throw new FS.ErrnoError(138);
   }
  },
  accept(listensock) {
   if (!listensock.server || !listensock.pending.length) {
    throw new FS.ErrnoError(28);
   }
   var newsock = listensock.pending.shift();
   newsock.stream.flags = listensock.stream.flags;
   return newsock;
  },
  getname(sock, peer) {
   var addr, port;
   if (peer) {
    if (sock.daddr === undefined || sock.dport === undefined) {
     throw new FS.ErrnoError(53);
    }
    addr = sock.daddr;
    port = sock.dport;
   } else {
    addr = sock.saddr || 0;
    port = sock.sport || 0;
   }
   return {
    addr: addr,
    port: port
   };
  },
  sendmsg(sock, buffer, offset, length, addr, port) {
   if (sock.type === 2) {
    if (addr === undefined || port === undefined) {
     addr = sock.daddr;
     port = sock.dport;
    }
    if (addr === undefined || port === undefined) {
     throw new FS.ErrnoError(17);
    }
   } else {
    addr = sock.daddr;
    port = sock.dport;
   }
   var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
   if (sock.type === 1) {
    if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
     throw new FS.ErrnoError(53);
    } else if (dest.socket.readyState === dest.socket.CONNECTING) {
     throw new FS.ErrnoError(6);
    }
   }
   if (ArrayBuffer.isView(buffer)) {
    offset += buffer.byteOffset;
    buffer = buffer.buffer;
   }
   var data;
   data = buffer.slice(offset, offset + length);
   if (sock.type === 2) {
    if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
     if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
      dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
     }
     dest.dgram_send_queue.push(data);
     return length;
    }
   }
   try {
    dest.socket.send(data);
    return length;
   } catch (e) {
    throw new FS.ErrnoError(28);
   }
  },
  recvmsg(sock, length) {
   if (sock.type === 1 && sock.server) {
    throw new FS.ErrnoError(53);
   }
   var queued = sock.recv_queue.shift();
   if (!queued) {
    if (sock.type === 1) {
     var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
     if (!dest) {
      throw new FS.ErrnoError(53);
     }
     if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
      return null;
     }
     throw new FS.ErrnoError(6);
    }
    throw new FS.ErrnoError(6);
   }
   var queuedLength = queued.data.byteLength || queued.data.length;
   var queuedOffset = queued.data.byteOffset || 0;
   var queuedBuffer = queued.data.buffer || queued.data;
   var bytesRead = Math.min(length, queuedLength);
   var res = {
    buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
    addr: queued.addr,
    port: queued.port
   };
   if (sock.type === 1 && bytesRead < queuedLength) {
    var bytesRemaining = queuedLength - bytesRead;
    queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
    sock.recv_queue.unshift(queued);
   }
   return res;
  }
 }
};

var getSocketFromFD = fd => {
 var socket = SOCKFS.getSocket(fd);
 if (!socket) throw new FS.ErrnoError(8);
 return socket;
};

var setErrNo = value => {
 HEAP32[((___errno_location()) >> 2)] = value;
 return value;
};

var inetNtop4 = addr => (addr & 255) + "." + ((addr >> 8) & 255) + "." + ((addr >> 16) & 255) + "." + ((addr >> 24) & 255);

var inetNtop6 = ints => {
 var str = "";
 var word = 0;
 var longest = 0;
 var lastzero = 0;
 var zstart = 0;
 var len = 0;
 var i = 0;
 var parts = [ ints[0] & 65535, (ints[0] >> 16), ints[1] & 65535, (ints[1] >> 16), ints[2] & 65535, (ints[2] >> 16), ints[3] & 65535, (ints[3] >> 16) ];
 var hasipv4 = true;
 var v4part = "";
 for (i = 0; i < 5; i++) {
  if (parts[i] !== 0) {
   hasipv4 = false;
   break;
  }
 }
 if (hasipv4) {
  v4part = inetNtop4(parts[6] | (parts[7] << 16));
  if (parts[5] === -1) {
   str = "::ffff:";
   str += v4part;
   return str;
  }
  if (parts[5] === 0) {
   str = "::";
   if (v4part === "0.0.0.0") v4part = "";
   if (v4part === "0.0.0.1") v4part = "1";
   str += v4part;
   return str;
  }
 }
 for (word = 0; word < 8; word++) {
  if (parts[word] === 0) {
   if (word - lastzero > 1) {
    len = 0;
   }
   lastzero = word;
   len++;
  }
  if (len > longest) {
   longest = len;
   zstart = word - longest + 1;
  }
 }
 for (word = 0; word < 8; word++) {
  if (longest > 1) {
   if (parts[word] === 0 && word >= zstart && word < (zstart + longest)) {
    if (word === zstart) {
     str += ":";
     if (zstart === 0) str += ":";
    }
    continue;
   }
  }
  str += Number(_ntohs(parts[word] & 65535)).toString(16);
  str += word < 7 ? ":" : "";
 }
 return str;
};

var readSockaddr = (sa, salen) => {
 var family = HEAP16[((sa) >> 1)];
 var port = _ntohs(HEAPU16[(((sa) + (2)) >> 1)]);
 var addr;
 switch (family) {
 case 2:
  if (salen !== 16) {
   return {
    errno: 28
   };
  }
  addr = HEAP32[(((sa) + (4)) >> 2)];
  addr = inetNtop4(addr);
  break;

 case 10:
  if (salen !== 28) {
   return {
    errno: 28
   };
  }
  addr = [ HEAP32[(((sa) + (8)) >> 2)], HEAP32[(((sa) + (12)) >> 2)], HEAP32[(((sa) + (16)) >> 2)], HEAP32[(((sa) + (20)) >> 2)] ];
  addr = inetNtop6(addr);
  break;

 default:
  return {
   errno: 5
  };
 }
 return {
  family: family,
  addr: addr,
  port: port
 };
};

var inetPton4 = str => {
 var b = str.split(".");
 for (var i = 0; i < 4; i++) {
  var tmp = Number(b[i]);
  if (isNaN(tmp)) return null;
  b[i] = tmp;
 }
 return (b[0] | (b[1] << 8) | (b[2] << 16) | (b[3] << 24)) >>> 0;
};

/** @suppress {checkTypes} */ var jstoi_q = str => parseInt(str);

var inetPton6 = str => {
 var words;
 var w, offset, z;
 /* http://home.deds.nl/~aeron/regex/ */ var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
 var parts = [];
 if (!valid6regx.test(str)) {
  return null;
 }
 if (str === "::") {
  return [ 0, 0, 0, 0, 0, 0, 0, 0 ];
 }
 if (str.startsWith("::")) {
  str = str.replace("::", "Z:");
 } else  {
  str = str.replace("::", ":Z:");
 }
 if (str.indexOf(".") > 0) {
  str = str.replace(new RegExp("[.]", "g"), ":");
  words = str.split(":");
  words[words.length - 4] = jstoi_q(words[words.length - 4]) + jstoi_q(words[words.length - 3]) * 256;
  words[words.length - 3] = jstoi_q(words[words.length - 2]) + jstoi_q(words[words.length - 1]) * 256;
  words = words.slice(0, words.length - 2);
 } else {
  words = str.split(":");
 }
 offset = 0;
 z = 0;
 for (w = 0; w < words.length; w++) {
  if (typeof words[w] == "string") {
   if (words[w] === "Z") {
    for (z = 0; z < (8 - words.length + 1); z++) {
     parts[w + z] = 0;
    }
    offset = z - 1;
   } else {
    parts[w + offset] = _htons(parseInt(words[w], 16));
   }
  } else {
   parts[w + offset] = words[w];
  }
 }
 return [ (parts[1] << 16) | parts[0], (parts[3] << 16) | parts[2], (parts[5] << 16) | parts[4], (parts[7] << 16) | parts[6] ];
};

var DNS = {
 address_map: {
  id: 1,
  addrs: {},
  names: {}
 },
 lookup_name(name) {
  var res = inetPton4(name);
  if (res !== null) {
   return name;
  }
  res = inetPton6(name);
  if (res !== null) {
   return name;
  }
  var addr;
  if (DNS.address_map.addrs[name]) {
   addr = DNS.address_map.addrs[name];
  } else {
   var id = DNS.address_map.id++;
   assert(id < 65535, "exceeded max address mappings of 65535");
   addr = "172.29." + (id & 255) + "." + (id & 65280);
   DNS.address_map.names[addr] = name;
   DNS.address_map.addrs[name] = addr;
  }
  return addr;
 },
 lookup_addr(addr) {
  if (DNS.address_map.names[addr]) {
   return DNS.address_map.names[addr];
  }
  return null;
 }
};

/** @param {boolean=} allowNull */ var getSocketAddress = (addrp, addrlen, allowNull) => {
 if (allowNull && addrp === 0) return null;
 var info = readSockaddr(addrp, addrlen);
 if (info.errno) throw new FS.ErrnoError(info.errno);
 info.addr = DNS.lookup_addr(info.addr) || info.addr;
 return info;
};

function ___syscall_connect(fd, addr, addrlen, d1, d2, d3) {
 try {
  var sock = getSocketFromFD(fd);
  var info = getSocketAddress(addr, addrlen);
  sock.sock_ops.connect(sock, info.addr, info.port);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fcntl64(fd, cmd, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (cmd) {
  case 0:
   {
    var arg = SYSCALLS.get();
    if (arg < 0) {
     return -28;
    }
    while (FS.streams[arg]) {
     arg++;
    }
    var newStream;
    newStream = FS.createStream(stream, arg);
    return newStream.fd;
   }

  case 1:
  case 2:
   return 0;

  case 3:
   return stream.flags;

  case 4:
   {
    var arg = SYSCALLS.get();
    stream.flags |= arg;
    return 0;
   }

  case 5:
   {
    var arg = SYSCALLS.getp();
    var offset = 0;
    HEAP16[(((arg) + (offset)) >> 1)] = 2;
    return 0;
   }

  case 6:
  case 7:
   return 0;

  case 16:
  case 8:
   return -28;

  case 9:
   setErrNo(28);
   return -1;

  default:
   {
    return -28;
   }
  }
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_fstat64(fd, buf) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  return SYSCALLS.doStat(FS.stat, stream.path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
 assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
};

function ___syscall_getcwd(buf, size) {
 try {
  if (size === 0) return -28;
  var cwd = FS.cwd();
  var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
  if (size < cwdLengthInBytes) return -68;
  stringToUTF8(cwd, buf, size);
  return cwdLengthInBytes;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_getdents64(fd, dirp, count) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (!stream.getdents) {
   stream.getdents = FS.readdir(stream.path);
  }
  var struct_size = 280;
  var pos = 0;
  var off = FS.llseek(stream, 0, 1);
  var idx = Math.floor(off / struct_size);
  while (idx < stream.getdents.length && pos + struct_size <= count) {
   var id;
   var type;
   var name = stream.getdents[idx];
   if (name === ".") {
    id = stream.node.id;
    type = 4;
   } else if (name === "..") {
    var lookup = FS.lookupPath(stream.path, {
     parent: true
    });
    id = lookup.node.id;
    type = 4;
   } else {
    var child = FS.lookupNode(stream.node, name);
    id = child.id;
    type = FS.isChrdev(child.mode) ? 2 :  FS.isDir(child.mode) ? 4 :  FS.isLink(child.mode) ? 10 :  8;
   }
   assert(id);
   (tempI64 = [ id >>> 0, (tempDouble = id, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
   HEAP32[((dirp + pos) >> 2)] = tempI64[0], HEAP32[(((dirp + pos) + (4)) >> 2)] = tempI64[1]);
   (tempI64 = [ (idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, 
   (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
   HEAP32[(((dirp + pos) + (8)) >> 2)] = tempI64[0], HEAP32[(((dirp + pos) + (12)) >> 2)] = tempI64[1]);
   HEAP16[(((dirp + pos) + (16)) >> 1)] = 280;
   HEAP8[(((dirp + pos) + (18)) >> 0)] = type;
   stringToUTF8(name, dirp + pos + 19, 256);
   pos += struct_size;
   idx += 1;
  }
  FS.llseek(stream, idx * struct_size, 0);
  return pos;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_ioctl(fd, op, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  switch (op) {
  case 21509:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21505:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tcgets) {
     var termios = stream.tty.ops.ioctl_tcgets(stream);
     var argp = SYSCALLS.getp();
     HEAP32[((argp) >> 2)] = termios.c_iflag || 0;
     HEAP32[(((argp) + (4)) >> 2)] = termios.c_oflag || 0;
     HEAP32[(((argp) + (8)) >> 2)] = termios.c_cflag || 0;
     HEAP32[(((argp) + (12)) >> 2)] = termios.c_lflag || 0;
     for (var i = 0; i < 32; i++) {
      HEAP8[(((argp + i) + (17)) >> 0)] = termios.c_cc[i] || 0;
     }
     return 0;
    }
    return 0;
   }

  case 21510:
  case 21511:
  case 21512:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21506:
  case 21507:
  case 21508:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tcsets) {
     var argp = SYSCALLS.getp();
     var c_iflag = HEAP32[((argp) >> 2)];
     var c_oflag = HEAP32[(((argp) + (4)) >> 2)];
     var c_cflag = HEAP32[(((argp) + (8)) >> 2)];
     var c_lflag = HEAP32[(((argp) + (12)) >> 2)];
     var c_cc = [];
     for (var i = 0; i < 32; i++) {
      c_cc.push(HEAP8[(((argp + i) + (17)) >> 0)]);
     }
     return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
      c_iflag: c_iflag,
      c_oflag: c_oflag,
      c_cflag: c_cflag,
      c_lflag: c_lflag,
      c_cc: c_cc
     });
    }
    return 0;
   }

  case 21519:
   {
    if (!stream.tty) return -59;
    var argp = SYSCALLS.getp();
    HEAP32[((argp) >> 2)] = 0;
    return 0;
   }

  case 21520:
   {
    if (!stream.tty) return -59;
    return -28;
   }

  case 21531:
   {
    var argp = SYSCALLS.getp();
    return FS.ioctl(stream, op, argp);
   }

  case 21523:
   {
    if (!stream.tty) return -59;
    if (stream.tty.ops.ioctl_tiocgwinsz) {
     var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
     var argp = SYSCALLS.getp();
     HEAP16[((argp) >> 1)] = winsize[0];
     HEAP16[(((argp) + (2)) >> 1)] = winsize[1];
    }
    return 0;
   }

  case 21524:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  case 21515:
   {
    if (!stream.tty) return -59;
    return 0;
   }

  default:
   return -28;
  }
 }  catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_lstat64(path, buf) {
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.lstat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_mkdirat(dirfd, path, mode) {
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_newfstatat(dirfd, path, buf, flags) {
 try {
  path = SYSCALLS.getStr(path);
  var nofollow = flags & 256;
  var allowEmpty = flags & 4096;
  flags = flags & (~6400);
  assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
  path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
  return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_openat(dirfd, path, flags, varargs) {
 SYSCALLS.varargs = varargs;
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  var mode = varargs ? SYSCALLS.get() : 0;
  return FS.open(path, flags, mode).fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (bufsize <= 0) return -28;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = HEAP8[buf + len];
  stringToUTF8(ret, buf, bufsize + 1);
  HEAP8[buf + len] = endChar;
  return len;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_rmdir(path) {
 try {
  path = SYSCALLS.getStr(path);
  FS.rmdir(path);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_socket(domain, type, protocol) {
 try {
  var sock = SOCKFS.createSocket(domain, type, protocol);
  assert(sock.stream.fd < 64);
  return sock.stream.fd;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_stat64(path, buf) {
 try {
  path = SYSCALLS.getStr(path);
  return SYSCALLS.doStat(FS.stat, path, buf);
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function ___syscall_unlinkat(dirfd, path, flags) {
 try {
  path = SYSCALLS.getStr(path);
  path = SYSCALLS.calculateAt(dirfd, path);
  if (flags === 0) {
   FS.unlink(path);
  } else if (flags === 512) {
   FS.rmdir(path);
  } else {
   abort("Invalid flags passed to unlinkat");
  }
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var nowIsMonotonic = true;

var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

var __emscripten_throw_longjmp = () => {
 throw new EmscriptenSjLj;
};

var convertI32PairToI53Checked = (lo, hi) => {
 assert(lo == (lo >>> 0) || lo == (lo | 0));
 assert(hi === (hi | 0));
 return ((hi + 2097152) >>> 0 < 4194305 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
};

function __gmtime_js(time_low, time_high, tmPtr) {
 var time = convertI32PairToI53Checked(time_low, time_high);
 var date = new Date(time * 1e3);
 HEAP32[((tmPtr) >> 2)] = date.getUTCSeconds();
 HEAP32[(((tmPtr) + (4)) >> 2)] = date.getUTCMinutes();
 HEAP32[(((tmPtr) + (8)) >> 2)] = date.getUTCHours();
 HEAP32[(((tmPtr) + (12)) >> 2)] = date.getUTCDate();
 HEAP32[(((tmPtr) + (16)) >> 2)] = date.getUTCMonth();
 HEAP32[(((tmPtr) + (20)) >> 2)] = date.getUTCFullYear() - 1900;
 HEAP32[(((tmPtr) + (24)) >> 2)] = date.getUTCDay();
 var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
 var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
 HEAP32[(((tmPtr) + (28)) >> 2)] = yday;
}

var isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

var MONTH_DAYS_LEAP_CUMULATIVE = [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ];

var MONTH_DAYS_REGULAR_CUMULATIVE = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

var ydayFromDate = date => {
 var leap = isLeapYear(date.getFullYear());
 var monthDaysCumulative = (leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE);
 var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
 return yday;
};

function __localtime_js(time_low, time_high, tmPtr) {
 var time = convertI32PairToI53Checked(time_low, time_high);
 var date = new Date(time * 1e3);
 HEAP32[((tmPtr) >> 2)] = date.getSeconds();
 HEAP32[(((tmPtr) + (4)) >> 2)] = date.getMinutes();
 HEAP32[(((tmPtr) + (8)) >> 2)] = date.getHours();
 HEAP32[(((tmPtr) + (12)) >> 2)] = date.getDate();
 HEAP32[(((tmPtr) + (16)) >> 2)] = date.getMonth();
 HEAP32[(((tmPtr) + (20)) >> 2)] = date.getFullYear() - 1900;
 HEAP32[(((tmPtr) + (24)) >> 2)] = date.getDay();
 var yday = ydayFromDate(date) | 0;
 HEAP32[(((tmPtr) + (28)) >> 2)] = yday;
 HEAP32[(((tmPtr) + (36)) >> 2)] = -(date.getTimezoneOffset() * 60);
 var start = new Date(date.getFullYear(), 0, 1);
 var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
 var winterOffset = start.getTimezoneOffset();
 var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
 HEAP32[(((tmPtr) + (32)) >> 2)] = dst;
}

var __mktime_js = function(tmPtr) {
 var ret = (() => {
  var date = new Date(HEAP32[(((tmPtr) + (20)) >> 2)] + 1900, HEAP32[(((tmPtr) + (16)) >> 2)], HEAP32[(((tmPtr) + (12)) >> 2)], HEAP32[(((tmPtr) + (8)) >> 2)], HEAP32[(((tmPtr) + (4)) >> 2)], HEAP32[((tmPtr) >> 2)], 0);
  var dst = HEAP32[(((tmPtr) + (32)) >> 2)];
  var guessedOffset = date.getTimezoneOffset();
  var start = new Date(date.getFullYear(), 0, 1);
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  var winterOffset = start.getTimezoneOffset();
  var dstOffset = Math.min(winterOffset, summerOffset);
  if (dst < 0) {
   HEAP32[(((tmPtr) + (32)) >> 2)] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
  } else if ((dst > 0) != (dstOffset == guessedOffset)) {
   var nonDstOffset = Math.max(winterOffset, summerOffset);
   var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
   date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
  }
  HEAP32[(((tmPtr) + (24)) >> 2)] = date.getDay();
  var yday = ydayFromDate(date) | 0;
  HEAP32[(((tmPtr) + (28)) >> 2)] = yday;
  HEAP32[((tmPtr) >> 2)] = date.getSeconds();
  HEAP32[(((tmPtr) + (4)) >> 2)] = date.getMinutes();
  HEAP32[(((tmPtr) + (8)) >> 2)] = date.getHours();
  HEAP32[(((tmPtr) + (12)) >> 2)] = date.getDate();
  HEAP32[(((tmPtr) + (16)) >> 2)] = date.getMonth();
  HEAP32[(((tmPtr) + (20)) >> 2)] = date.getYear();
  return date.getTime() / 1e3;
 })();
 return (setTempRet0((tempDouble = ret, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0)), 
 ret >>> 0);
};

function __mmap_js(len, prot, flags, fd, offset_low, offset_high, allocated, addr) {
 var offset = convertI32PairToI53Checked(offset_low, offset_high);
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  var res = FS.mmap(stream, len, offset, prot, flags);
  var ptr = res.ptr;
  HEAP32[((allocated) >> 2)] = res.allocated;
  HEAPU32[((addr) >> 2)] = ptr;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

function __munmap_js(addr, len, prot, flags, fd, offset_low, offset_high) {
 var offset = convertI32PairToI53Checked(offset_low, offset_high);
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  if (prot & 2) {
   SYSCALLS.doMsync(addr, stream, len, flags, offset);
  }
  FS.munmap(stream);
 }  catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return -e.errno;
 }
}

var stringToNewUTF8 = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8(str, ret, size);
 return ret;
};

var __tzset_js = (timezone, daylight, tzname) => {
 var currentYear = (new Date).getFullYear();
 var winter = new Date(currentYear, 0, 1);
 var summer = new Date(currentYear, 6, 1);
 var winterOffset = winter.getTimezoneOffset();
 var summerOffset = summer.getTimezoneOffset();
 var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
 HEAPU32[((timezone) >> 2)] = stdTimezoneOffset * 60;
 HEAP32[((daylight) >> 2)] = Number(winterOffset != summerOffset);
 function extractZone(date) {
  var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
  return match ? match[1] : "GMT";
 }
 var winterName = extractZone(winter);
 var summerName = extractZone(summer);
 var winterNamePtr = stringToNewUTF8(winterName);
 var summerNamePtr = stringToNewUTF8(summerName);
 if (summerOffset < winterOffset) {
  HEAPU32[((tzname) >> 2)] = winterNamePtr;
  HEAPU32[(((tzname) + (4)) >> 2)] = summerNamePtr;
 } else {
  HEAPU32[((tzname) >> 2)] = summerNamePtr;
  HEAPU32[(((tzname) + (4)) >> 2)] = winterNamePtr;
 }
};

var _abort = () => {
 abort("native code called abort()");
};

var readEmAsmArgsArray = [];

var readEmAsmArgs = (sigPtr, buf) => {
 assert(Array.isArray(readEmAsmArgsArray));
 assert(buf % 16 == 0);
 readEmAsmArgsArray.length = 0;
 var ch;
 while (ch = HEAPU8[sigPtr++]) {
  var chr = String.fromCharCode(ch);
  var validChars = [ "d", "f", "i", "p" ];
  assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
  var wide = (ch != 105);
  wide &= (ch != 112);
  buf += wide && (buf % 8) ? 4 : 0;
  readEmAsmArgsArray.push( ch == 112 ? HEAPU32[((buf) >> 2)] : ch == 105 ? HEAP32[((buf) >> 2)] : HEAPF64[((buf) >> 3)]);
  buf += wide ? 8 : 4;
 }
 return readEmAsmArgsArray;
};

var runEmAsmFunction = (code, sigPtr, argbuf) => {
 var args = readEmAsmArgs(sigPtr, argbuf);
 if (!ASM_CONSTS.hasOwnProperty(code)) abort(`No EM_ASM constant found at address ${code}`);
 return ASM_CONSTS[code].apply(null, args);
};

var _emscripten_asm_const_int = (code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf);

var _emscripten_date_now = () => Date.now();

var _emscripten_errn = (str, len) => err(UTF8ToString(str, len));

var getHeapMax = () =>  2147483648;

var _emscripten_get_heap_max = () => getHeapMax();

var _emscripten_get_now;

_emscripten_get_now = () => performance.now();

var reallyNegative = x => x < 0 || (x === 0 && (1 / x) === -Infinity);

var convertI32PairToI53 = (lo, hi) => {
 assert(hi === (hi | 0));
 return (lo >>> 0) + hi * 4294967296;
};

var convertU32PairToI53 = (lo, hi) => (lo >>> 0) + (hi >>> 0) * 4294967296;

var reSign = (value, bits) => {
 if (value <= 0) {
  return value;
 }
 var half = bits <= 32 ? Math.abs(1 << (bits - 1)) : Math.pow(2, bits - 1);
 if (value >= half && (bits <= 32 || value > half)) {
  value = -2 * half + value;
 }
 return value;
};

var unSign = (value, bits) => {
 if (value >= 0) {
  return value;
 }
 return bits <= 32 ? 2 * Math.abs(1 << (bits - 1)) + value : Math.pow(2, bits) + value;
};

var strLen = ptr => {
 var end = ptr;
 while (HEAPU8[end]) ++end;
 return end - ptr;
};

var formatString = (format, varargs) => {
 assert((varargs & 3) === 0);
 var textIndex = format;
 var argIndex = varargs;
 function prepVararg(ptr, type) {
  if (type === "double" || type === "i64") {
   if (ptr & 7) {
    assert((ptr & 7) === 4);
    ptr += 4;
   }
  } else {
   assert((ptr & 3) === 0);
  }
  return ptr;
 }
 function getNextArg(type) {
  var ret;
  argIndex = prepVararg(argIndex, type);
  if (type === "double") {
   ret = HEAPF64[((argIndex) >> 3)];
   argIndex += 8;
  } else if (type == "i64") {
   ret = [ HEAP32[((argIndex) >> 2)], HEAP32[(((argIndex) + (4)) >> 2)] ];
   argIndex += 8;
  } else {
   assert((argIndex & 3) === 0);
   type = "i32";
   ret = HEAP32[((argIndex) >> 2)];
   argIndex += 4;
  }
  return ret;
 }
 var ret = [];
 var curr, next, currArg;
 while (1) {
  var startTextIndex = textIndex;
  curr = HEAP8[((textIndex) >> 0)];
  if (curr === 0) break;
  next = HEAP8[((textIndex + 1) >> 0)];
  if (curr == 37) {
   var flagAlwaysSigned = false;
   var flagLeftAlign = false;
   var flagAlternative = false;
   var flagZeroPad = false;
   var flagPadSign = false;
   flagsLoop: while (1) {
    switch (next) {
    case 43:
     flagAlwaysSigned = true;
     break;

    case 45:
     flagLeftAlign = true;
     break;

    case 35:
     flagAlternative = true;
     break;

    case 48:
     if (flagZeroPad) {
      break flagsLoop;
     } else {
      flagZeroPad = true;
      break;
     }

    case 32:
     flagPadSign = true;
     break;

    default:
     break flagsLoop;
    }
    textIndex++;
    next = HEAP8[((textIndex + 1) >> 0)];
   }
   var width = 0;
   if (next == 42) {
    width = getNextArg("i32");
    textIndex++;
    next = HEAP8[((textIndex + 1) >> 0)];
   } else {
    while (next >= 48 && next <= 57) {
     width = width * 10 + (next - 48);
     textIndex++;
     next = HEAP8[((textIndex + 1) >> 0)];
    }
   }
   var precisionSet = false, precision = -1;
   if (next == 46) {
    precision = 0;
    precisionSet = true;
    textIndex++;
    next = HEAP8[((textIndex + 1) >> 0)];
    if (next == 42) {
     precision = getNextArg("i32");
     textIndex++;
    } else {
     while (1) {
      var precisionChr = HEAP8[((textIndex + 1) >> 0)];
      if (precisionChr < 48 || precisionChr > 57) break;
      precision = precision * 10 + (precisionChr - 48);
      textIndex++;
     }
    }
    next = HEAP8[((textIndex + 1) >> 0)];
   }
   if (precision < 0) {
    precision = 6;
    precisionSet = false;
   }
   var argSize;
   switch (String.fromCharCode(next)) {
   case "h":
    var nextNext = HEAP8[((textIndex + 2) >> 0)];
    if (nextNext == 104) {
     textIndex++;
     argSize = 1;
    } else {
     argSize = 2;
    }
    break;

   case "l":
    var nextNext = HEAP8[((textIndex + 2) >> 0)];
    if (nextNext == 108) {
     textIndex++;
     argSize = 8;
    } else {
     argSize = 4;
    }
    break;

   case "L":
   case "q":
   case "j":
    argSize = 8;
    break;

   case "z":
   case "t":
   case "I":
    argSize = 4;
    break;

   default:
    argSize = null;
   }
   if (argSize) textIndex++;
   next = HEAP8[((textIndex + 1) >> 0)];
   switch (String.fromCharCode(next)) {
   case "d":
   case "i":
   case "u":
   case "o":
   case "x":
   case "X":
   case "p":
    {
     var signed = next == 100 || next == 105;
     argSize = argSize || 4;
     currArg = getNextArg("i" + (argSize * 8));
     var argText;
     if (argSize == 8) {
      currArg = next == 117 ? convertU32PairToI53(currArg[0], currArg[1]) : convertI32PairToI53(currArg[0], currArg[1]);
     }
     if (argSize <= 4) {
      var limit = Math.pow(256, argSize) - 1;
      currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
     }
     var currAbsArg = Math.abs(currArg);
     var prefix = "";
     if (next == 100 || next == 105) {
      argText = reSign(currArg, 8 * argSize).toString(10);
     } else if (next == 117) {
      argText = unSign(currArg, 8 * argSize).toString(10);
      currArg = Math.abs(currArg);
     } else if (next == 111) {
      argText = (flagAlternative ? "0" : "") + currAbsArg.toString(8);
     } else if (next == 120 || next == 88) {
      prefix = (flagAlternative && currArg != 0) ? "0x" : "";
      if (currArg < 0) {
       currArg = -currArg;
       argText = (currAbsArg - 1).toString(16);
       var buffer = [];
       for (var i = 0; i < argText.length; i++) {
        buffer.push((15 - parseInt(argText[i], 16)).toString(16));
       }
       argText = buffer.join("");
       while (argText.length < argSize * 2) argText = "f" + argText;
      } else {
       argText = currAbsArg.toString(16);
      }
      if (next == 88) {
       prefix = prefix.toUpperCase();
       argText = argText.toUpperCase();
      }
     } else if (next == 112) {
      if (currAbsArg === 0) {
       argText = "(nil)";
      } else {
       prefix = "0x";
       argText = currAbsArg.toString(16);
      }
     }
     if (precisionSet) {
      while (argText.length < precision) {
       argText = "0" + argText;
      }
     }
     if (currArg >= 0) {
      if (flagAlwaysSigned) {
       prefix = "+" + prefix;
      } else if (flagPadSign) {
       prefix = " " + prefix;
      }
     }
     if (argText.charAt(0) == "-") {
      prefix = "-" + prefix;
      argText = argText.substr(1);
     }
     while (prefix.length + argText.length < width) {
      if (flagLeftAlign) {
       argText += " ";
      } else {
       if (flagZeroPad) {
        argText = "0" + argText;
       } else {
        prefix = " " + prefix;
       }
      }
     }
     argText = prefix + argText;
     argText.split("").forEach(function(chr) {
      ret.push(chr.charCodeAt(0));
     });
     break;
    }

   case "f":
   case "F":
   case "e":
   case "E":
   case "g":
   case "G":
    {
     currArg = getNextArg("double");
     var argText;
     if (isNaN(currArg)) {
      argText = "nan";
      flagZeroPad = false;
     } else if (!isFinite(currArg)) {
      argText = (currArg < 0 ? "-" : "") + "inf";
      flagZeroPad = false;
     } else {
      var isGeneral = false;
      var effectivePrecision = Math.min(precision, 20);
      if (next == 103 || next == 71) {
       isGeneral = true;
       precision = precision || 1;
       var exponent = parseInt(currArg.toExponential(effectivePrecision).split("e")[1], 10);
       if (precision > exponent && exponent >= -4) {
        next = ((next == 103) ? "f" : "F").charCodeAt(0);
        precision -= exponent + 1;
       } else {
        next = ((next == 103) ? "e" : "E").charCodeAt(0);
        precision--;
       }
       effectivePrecision = Math.min(precision, 20);
      }
      if (next == 101 || next == 69) {
       argText = currArg.toExponential(effectivePrecision);
       if (/[eE][-+]\d$/.test(argText)) {
        argText = argText.slice(0, -1) + "0" + argText.slice(-1);
       }
      } else if (next == 102 || next == 70) {
       argText = currArg.toFixed(effectivePrecision);
       if (currArg === 0 && reallyNegative(currArg)) {
        argText = "-" + argText;
       }
      }
      var parts = argText.split("e");
      if (isGeneral && !flagAlternative) {
       while (parts[0].length > 1 && parts[0].includes(".") && (parts[0].slice(-1) == "0" || parts[0].slice(-1) == ".")) {
        parts[0] = parts[0].slice(0, -1);
       }
      } else {
       if (flagAlternative && argText.indexOf(".") == -1) parts[0] += ".";
       while (precision > effectivePrecision++) parts[0] += "0";
      }
      argText = parts[0] + (parts.length > 1 ? "e" + parts[1] : "");
      if (next == 69) argText = argText.toUpperCase();
      if (currArg >= 0) {
       if (flagAlwaysSigned) {
        argText = "+" + argText;
       } else if (flagPadSign) {
        argText = " " + argText;
       }
      }
     }
     while (argText.length < width) {
      if (flagLeftAlign) {
       argText += " ";
      } else {
       if (flagZeroPad && (argText[0] == "-" || argText[0] == "+")) {
        argText = argText[0] + "0" + argText.slice(1);
       } else {
        argText = (flagZeroPad ? "0" : " ") + argText;
       }
      }
     }
     if (next < 97) argText = argText.toUpperCase();
     argText.split("").forEach(function(chr) {
      ret.push(chr.charCodeAt(0));
     });
     break;
    }

   case "s":
    {
     var arg = getNextArg("i8*");
     var argLength = arg ? strLen(arg) : "(null)".length;
     if (precisionSet) argLength = Math.min(argLength, precision);
     if (!flagLeftAlign) {
      while (argLength < width--) {
       ret.push(32);
      }
     }
     if (arg) {
      for (var i = 0; i < argLength; i++) {
       ret.push(HEAPU8[((arg++) >> 0)]);
      }
     } else {
      ret = ret.concat(intArrayFromString("(null)".substr(0, argLength), true));
     }
     if (flagLeftAlign) {
      while (argLength < width--) {
       ret.push(32);
      }
     }
     break;
    }

   case "c":
    {
     if (flagLeftAlign) ret.push(getNextArg("i8"));
     while (--width > 0) {
      ret.push(32);
     }
     if (!flagLeftAlign) ret.push(getNextArg("i8"));
     break;
    }

   case "n":
    {
     var ptr = getNextArg("i32*");
     HEAP32[((ptr) >> 2)] = ret.length;
     break;
    }

   case "%":
    {
     ret.push(curr);
     break;
    }

   default:
    {
     for (var i = startTextIndex; i < textIndex + 2; i++) {
      ret.push(HEAP8[((i) >> 0)]);
     }
    }
   }
   textIndex += 2;
  } else  {
   ret.push(curr);
   textIndex += 1;
  }
 }
 return ret;
};

function jsStackTrace() {
 var error = new Error;
 if (!error.stack) {
  try {
   throw new Error;
  } catch (e) {
   error = e;
  }
  if (!error.stack) {
   return "(no stack trace available)";
  }
 }
 return error.stack.toString();
}

/** @param {number=} flags */ function getCallstack(flags) {
 var callstack = jsStackTrace();
 var iThisFunc = callstack.lastIndexOf("_emscripten_log");
 var iThisFunc2 = callstack.lastIndexOf("_emscripten_get_callstack");
 var iNextLine = callstack.indexOf("\n", Math.max(iThisFunc, iThisFunc2)) + 1;
 callstack = callstack.slice(iNextLine);
 if (flags & 8 && typeof emscripten_source_map == "undefined") {
  warnOnce('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.');
  flags ^= 8;
  flags |= 16;
 }
 var lines = callstack.split("\n");
 callstack = "";
 var newFirefoxRe = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)");
 var firefoxRe = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?");
 var chromeRe = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");
 for (var l in lines) {
  var line = lines[l];
  var symbolName = "";
  var file = "";
  var lineno = 0;
  var column = 0;
  var parts = chromeRe.exec(line);
  if (parts && parts.length == 5) {
   symbolName = parts[1];
   file = parts[2];
   lineno = parts[3];
   column = parts[4];
  } else {
   parts = newFirefoxRe.exec(line);
   if (!parts) parts = firefoxRe.exec(line);
   if (parts && parts.length >= 4) {
    symbolName = parts[1];
    file = parts[2];
    lineno = parts[3];
    column = parts[4] | 0;
   } else {
    callstack += line + "\n";
    continue;
   }
  }
  var haveSourceMap = false;
  if (flags & 8) {
   var orig = emscripten_source_map.originalPositionFor({
    line: lineno,
    column: column
   });
   haveSourceMap = (orig && orig.source);
   if (haveSourceMap) {
    if (flags & 64) {
     orig.source = orig.source.substring(orig.source.replace(/\\/g, "/").lastIndexOf("/") + 1);
    }
    callstack += `    at ${symbolName} (${orig.source}:${orig.line}:${orig.column})\n`;
   }
  }
  if ((flags & 16) || !haveSourceMap) {
   if (flags & 64) {
    file = file.substring(file.replace(/\\/g, "/").lastIndexOf("/") + 1);
   }
   callstack += (haveSourceMap ? (`     = ${symbolName}`) : (`    at ${symbolName}`)) + ` (${file}:${lineno}:${column})\n`;
  }
 }
 callstack = callstack.replace(/\s+$/, "");
 return callstack;
}

var emscriptenLog = (flags, str) => {
 if (flags & 24) {
  str = str.replace(/\s+$/, "");
  str += (str.length > 0 ? "\n" : "") + getCallstack(flags);
 }
 if (flags & 1) {
  if (flags & 4) {
   err(str);
  } else if (flags & 2) {
   err(str);
  } else if (flags & 512) {
   out(str);
  } else if (flags & 256) {
   out(str);
  } else {
   out(str);
  }
 } else if (flags & 6) {
  err(str);
 } else {
  out(str);
 }
};

var _emscripten_log = (flags, format, varargs) => {
 var result = formatString(format, varargs);
 var str = UTF8ArrayToString(result, 0);
 emscriptenLog(flags, str);
};

var growMemory = size => {
 var b = wasmMemory.buffer;
 var pages = (size - b.byteLength + 65535) / 65536;
 try {
  wasmMemory.grow(pages);
  updateMemoryViews();
  return 1;
 } /*success*/ catch (e) {
  err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
 }
};

var _emscripten_resize_heap = requestedSize => {
 var oldSize = HEAPU8.length;
 requestedSize >>>= 0;
 assert(requestedSize > oldSize);
 var maxHeapSize = getHeapMax();
 if (requestedSize > maxHeapSize) {
  err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
  return false;
 }
 var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  var replacement = growMemory(newSize);
  if (replacement) {
   return true;
  }
 }
 err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
 return false;
};

var ENV = {};

var getExecutableName = () => thisProgram || "./this.program";

var getEnvStrings = () => {
 if (!getEnvStrings.strings) {
  var lang = ((typeof navigator == "object" && navigator.languages && navigator.languages[0]) || "C").replace("-", "_") + ".UTF-8";
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": lang,
   "_": getExecutableName()
  };
  for (var x in ENV) {
   if (ENV[x] === undefined) delete env[x]; else env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(`${x}=${env[x]}`);
  }
  getEnvStrings.strings = strings;
 }
 return getEnvStrings.strings;
};

var stringToAscii = (str, buffer) => {
 for (var i = 0; i < str.length; ++i) {
  assert(str.charCodeAt(i) === (str.charCodeAt(i) & 255));
  HEAP8[((buffer++) >> 0)] = str.charCodeAt(i);
 }
 HEAP8[((buffer) >> 0)] = 0;
};

var _environ_get = (__environ, environ_buf) => {
 var bufSize = 0;
 getEnvStrings().forEach((string, i) => {
  var ptr = environ_buf + bufSize;
  HEAPU32[(((__environ) + (i * 4)) >> 2)] = ptr;
  stringToAscii(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
};

var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
 var strings = getEnvStrings();
 HEAPU32[((penviron_count) >> 2)] = strings.length;
 var bufSize = 0;
 strings.forEach(string => bufSize += string.length + 1);
 HEAPU32[((penviron_buf_size) >> 2)] = bufSize;
 return 0;
};

var _proc_exit = code => {
 EXITSTATUS = code;
 if (!keepRuntimeAlive()) {
  if (Module["onExit"]) Module["onExit"](code);
  ABORT = true;
 }
 quit_(code, new ExitStatus(code));
};

/** @param {boolean|number=} implicit */ var exitJS = (status, implicit) => {
 EXITSTATUS = status;
 checkUnflushedContent();
 if (keepRuntimeAlive() && !implicit) {
  var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
  err(msg);
 }
 _proc_exit(status);
};

var _exit = exitJS;

function _fd_close(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

/** @param {number=} offset */ var doReadv = (stream, iov, iovcnt, offset) => {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAPU32[((iov) >> 2)];
  var len = HEAPU32[(((iov) + (4)) >> 2)];
  iov += 8;
  var curr = FS.read(stream, HEAP8, ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (curr < len) break;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
};

function _fd_read(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doReadv(stream, iov, iovcnt);
  HEAPU32[((pnum) >> 2)] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
 var offset = convertI32PairToI53Checked(offset_low, offset_high);
 try {
  if (isNaN(offset)) return 61;
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.llseek(stream, offset, whence);
  (tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, (+(Math.abs(tempDouble))) >= 1 ? (tempDouble > 0 ? (+(Math.floor((tempDouble) / 4294967296))) >>> 0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296))))) >>> 0) : 0) ], 
  HEAP32[((newOffset) >> 2)] = tempI64[0], HEAP32[(((newOffset) + (4)) >> 2)] = tempI64[1]);
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

/** @param {number=} offset */ var doWritev = (stream, iov, iovcnt, offset) => {
 var ret = 0;
 for (var i = 0; i < iovcnt; i++) {
  var ptr = HEAPU32[((iov) >> 2)];
  var len = HEAPU32[(((iov) + (4)) >> 2)];
  iov += 8;
  var curr = FS.write(stream, HEAP8, ptr, len, offset);
  if (curr < 0) return -1;
  ret += curr;
  if (typeof offset !== "undefined") {
   offset += curr;
  }
 }
 return ret;
};

function _fd_write(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = doWritev(stream, iov, iovcnt);
  HEAPU32[((pnum) >> 2)] = num;
  return 0;
 } catch (e) {
  if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
  return e.errno;
 }
}

var _llvm_eh_typeid_for = type => type;

var arraySum = (array, index) => {
 var sum = 0;
 for (var i = 0; i <= index; sum += array[i++]) {}
 return sum;
};

var MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var addDays = (date, days) => {
 var newDate = new Date(date.getTime());
 while (days > 0) {
  var leap = isLeapYear(newDate.getFullYear());
  var currentMonth = newDate.getMonth();
  var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
  if (days > daysInCurrentMonth - newDate.getDate()) {
   days -= (daysInCurrentMonth - newDate.getDate() + 1);
   newDate.setDate(1);
   if (currentMonth < 11) {
    newDate.setMonth(currentMonth + 1);
   } else {
    newDate.setMonth(0);
    newDate.setFullYear(newDate.getFullYear() + 1);
   }
  } else {
   newDate.setDate(newDate.getDate() + days);
   return newDate;
  }
 }
 return newDate;
};

var writeArrayToMemory = (array, buffer) => {
 assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
 HEAP8.set(array, buffer);
};

var _strftime = (s, maxsize, format, tm) => {
 var tm_zone = HEAPU32[(((tm) + (40)) >> 2)];
 var date = {
  tm_sec: HEAP32[((tm) >> 2)],
  tm_min: HEAP32[(((tm) + (4)) >> 2)],
  tm_hour: HEAP32[(((tm) + (8)) >> 2)],
  tm_mday: HEAP32[(((tm) + (12)) >> 2)],
  tm_mon: HEAP32[(((tm) + (16)) >> 2)],
  tm_year: HEAP32[(((tm) + (20)) >> 2)],
  tm_wday: HEAP32[(((tm) + (24)) >> 2)],
  tm_yday: HEAP32[(((tm) + (28)) >> 2)],
  tm_isdst: HEAP32[(((tm) + (32)) >> 2)],
  tm_gmtoff: HEAP32[(((tm) + (36)) >> 2)],
  tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
 };
 var pattern = UTF8ToString(format);
 var EXPANSION_RULES_1 = {
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m/%d/%y",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%r": "%I:%M:%S %p",
  "%R": "%H:%M",
  "%T": "%H:%M:%S",
  "%x": "%m/%d/%y",
  "%X": "%H:%M:%S",
  "%Ec": "%c",
  "%EC": "%C",
  "%Ex": "%m/%d/%y",
  "%EX": "%H:%M:%S",
  "%Ey": "%y",
  "%EY": "%Y",
  "%Od": "%d",
  "%Oe": "%e",
  "%OH": "%H",
  "%OI": "%I",
  "%Om": "%m",
  "%OM": "%M",
  "%OS": "%S",
  "%Ou": "%u",
  "%OU": "%U",
  "%OV": "%V",
  "%Ow": "%w",
  "%OW": "%W",
  "%Oy": "%y"
 };
 for (var rule in EXPANSION_RULES_1) {
  pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
 }
 var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
 var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 function leadingSomething(value, digits, character) {
  var str = typeof value == "number" ? value.toString() : (value || "");
  while (str.length < digits) {
   str = character[0] + str;
  }
  return str;
 }
 function leadingNulls(value, digits) {
  return leadingSomething(value, digits, "0");
 }
 function compareByDay(date1, date2) {
  function sgn(value) {
   return value < 0 ? -1 : (value > 0 ? 1 : 0);
  }
  var compare;
  if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
   if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
    compare = sgn(date1.getDate() - date2.getDate());
   }
  }
  return compare;
 }
 function getFirstWeekStartDate(janFourth) {
  switch (janFourth.getDay()) {
  case 0:
   return new Date(janFourth.getFullYear() - 1, 11, 29);

  case 1:
   return janFourth;

  case 2:
   return new Date(janFourth.getFullYear(), 0, 3);

  case 3:
   return new Date(janFourth.getFullYear(), 0, 2);

  case 4:
   return new Date(janFourth.getFullYear(), 0, 1);

  case 5:
   return new Date(janFourth.getFullYear() - 1, 11, 31);

  case 6:
   return new Date(janFourth.getFullYear() - 1, 11, 30);
  }
 }
 function getWeekBasedYear(date) {
  var thisDate = addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
  var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
  var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
  var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
  var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
   if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
    return thisDate.getFullYear() + 1;
   }
   return thisDate.getFullYear();
  }
  return thisDate.getFullYear() - 1;
 }
 var EXPANSION_RULES_2 = {
  "%a": date => WEEKDAYS[date.tm_wday].substring(0, 3),
  "%A": date => WEEKDAYS[date.tm_wday],
  "%b": date => MONTHS[date.tm_mon].substring(0, 3),
  "%B": date => MONTHS[date.tm_mon],
  "%C": date => {
   var year = date.tm_year + 1900;
   return leadingNulls((year / 100) | 0, 2);
  },
  "%d": date => leadingNulls(date.tm_mday, 2),
  "%e": date => leadingSomething(date.tm_mday, 2, " "),
  "%g": date => getWeekBasedYear(date).toString().substring(2),
  "%G": date => getWeekBasedYear(date),
  "%H": date => leadingNulls(date.tm_hour, 2),
  "%I": date => {
   var twelveHour = date.tm_hour;
   if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
   return leadingNulls(twelveHour, 2);
  },
  "%j": date => leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year + 1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date.tm_mon - 1), 3),
  "%m": date => leadingNulls(date.tm_mon + 1, 2),
  "%M": date => leadingNulls(date.tm_min, 2),
  "%n": () => "\n",
  "%p": date => {
   if (date.tm_hour >= 0 && date.tm_hour < 12) {
    return "AM";
   }
   return "PM";
  },
  "%S": date => leadingNulls(date.tm_sec, 2),
  "%t": () => "\t",
  "%u": date => date.tm_wday || 7,
  "%U": date => {
   var days = date.tm_yday + 7 - date.tm_wday;
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%V": date => {
   var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7) / 7);
   if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
    val++;
   }
   if (!val) {
    val = 52;
    var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
    if (dec31 == 4 || (dec31 == 5 && isLeapYear(date.tm_year % 400 - 1))) {
     val++;
    }
   } else if (val == 53) {
    var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
    if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year))) val = 1;
   }
   return leadingNulls(val, 2);
  },
  "%w": date => date.tm_wday,
  "%W": date => {
   var days = date.tm_yday + 7 - ((date.tm_wday + 6) % 7);
   return leadingNulls(Math.floor(days / 7), 2);
  },
  "%y": date => (date.tm_year + 1900).toString().substring(2),
  "%Y": date => date.tm_year + 1900,
  "%z": date => {
   var off = date.tm_gmtoff;
   var ahead = off >= 0;
   off = Math.abs(off) / 60;
   off = (off / 60) * 100 + (off % 60);
   return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
  },
  "%Z": date => date.tm_zone,
  "%%": () => "%"
 };
 pattern = pattern.replace(/%%/g, "\0\0");
 for (var rule in EXPANSION_RULES_2) {
  if (pattern.includes(rule)) {
   pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
  }
 }
 pattern = pattern.replace(/\0\0/g, "%");
 var bytes = intArrayFromString(pattern, false);
 if (bytes.length > maxsize) {
  return 0;
 }
 writeArrayToMemory(bytes, s);
 return bytes.length - 1;
};

var _strftime_l = (s, maxsize, format, tm, loc) => _strftime(s, maxsize, format, tm);

var wasmTable;

var getWasmTableEntry = funcPtr => wasmTable.get(funcPtr);

var uleb128Encode = (n, target) => {
 assert(n < 16384);
 if (n < 128) {
  target.push(n);
 } else {
  target.push((n % 128) | 128, n >> 7);
 }
};

var sigToWasmTypes = sig => {
 assert(!sig.includes("j"), "i64 not permitted in function signatures when WASM_BIGINT is disabled");
 var typeNames = {
  "i": "i32",
  "j": "i64",
  "f": "f32",
  "d": "f64",
  "p": "i32"
 };
 var type = {
  parameters: [],
  results: sig[0] == "v" ? [] : [ typeNames[sig[0]] ]
 };
 for (var i = 1; i < sig.length; ++i) {
  assert(sig[i] in typeNames, "invalid signature char: " + sig[i]);
  type.parameters.push(typeNames[sig[i]]);
 }
 return type;
};

var generateFuncType = (sig, target) => {
 var sigRet = sig.slice(0, 1);
 var sigParam = sig.slice(1);
 var typeCodes = {
  "i": 127,
  "p": 127,
  "j": 126,
  "f": 125,
  "d": 124
 };
 target.push(96);
 /* form: func */ uleb128Encode(sigParam.length, target);
 for (var i = 0; i < sigParam.length; ++i) {
  assert(sigParam[i] in typeCodes, "invalid signature char: " + sigParam[i]);
  target.push(typeCodes[sigParam[i]]);
 }
 if (sigRet == "v") {
  target.push(0);
 } else {
  target.push(1, typeCodes[sigRet]);
 }
};

var convertJsFunctionToWasm = (func, sig) => {
 assert(!sig.includes("j"), "i64 not permitted in function signatures when WASM_BIGINT is disabled");
 if (typeof WebAssembly.Function == "function") {
  return new WebAssembly.Function(sigToWasmTypes(sig), func);
 }
 var typeSectionBody = [ 1 ];
 generateFuncType(sig, typeSectionBody);
 var bytes = [ 0, 97, 115, 109,  1, 0, 0, 0,  1 ];
 uleb128Encode(typeSectionBody.length, bytes);
 bytes.push.apply(bytes, typeSectionBody);
 bytes.push(2, 7,  1, 1, 101, 1, 102, 0, 0, 7, 5,  1, 1, 102, 0, 0);
 var module = new WebAssembly.Module(new Uint8Array(bytes));
 var instance = new WebAssembly.Instance(module, {
  "e": {
   "f": func
  }
 });
 var wrappedFunc = instance.exports["f"];
 return wrappedFunc;
};

var updateTableMap = (offset, count) => {
 if (functionsInTableMap) {
  for (var i = offset; i < offset + count; i++) {
   var item = getWasmTableEntry(i);
   if (item) {
    functionsInTableMap.set(item, i);
   }
  }
 }
};

var functionsInTableMap;

var getFunctionAddress = func => {
 if (!functionsInTableMap) {
  functionsInTableMap = new WeakMap;
  updateTableMap(0, wasmTable.length);
 }
 return functionsInTableMap.get(func) || 0;
};

var freeTableIndexes = [];

var getEmptyTableSlot = () => {
 if (freeTableIndexes.length) {
  return freeTableIndexes.pop();
 }
 try {
  wasmTable.grow(1);
 } catch (err) {
  if (!(err instanceof RangeError)) {
   throw err;
  }
  throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
 }
 return wasmTable.length - 1;
};

var setWasmTableEntry = (idx, func) => wasmTable.set(idx, func);

/** @param {string=} sig */ var addFunction = (func, sig) => {
 assert(typeof func != "undefined");
 var rtn = getFunctionAddress(func);
 if (rtn) {
  return rtn;
 }
 var ret = getEmptyTableSlot();
 try {
  setWasmTableEntry(ret, func);
 } catch (err) {
  if (!(err instanceof TypeError)) {
   throw err;
  }
  assert(typeof sig != "undefined", "Missing signature argument to addFunction: " + func);
  var wrapped = convertJsFunctionToWasm(func, sig);
  setWasmTableEntry(ret, wrapped);
 }
 functionsInTableMap.set(func, ret);
 return ret;
};

var stringToUTF8OnStack = str => {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8(str, ret, size);
 return ret;
};

var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
 if (!parent) {
  parent = this;
 }
 this.parent = parent;
 this.mount = parent.mount;
 this.mounted = null;
 this.id = FS.nextInode++;
 this.name = name;
 this.mode = mode;
 this.node_ops = {};
 this.stream_ops = {};
 this.rdev = rdev;
};

var readMode = 292 | /*292*/ 73;

/*73*/ var writeMode = 146;

/*146*/ Object.defineProperties(FSNode.prototype, {
 read: {
  get: /** @this{FSNode} */ function() {
   return (this.mode & readMode) === readMode;
  },
  set: /** @this{FSNode} */ function(val) {
   val ? this.mode |= readMode : this.mode &= ~readMode;
  }
 },
 write: {
  get: /** @this{FSNode} */ function() {
   return (this.mode & writeMode) === writeMode;
  },
  set: /** @this{FSNode} */ function(val) {
   val ? this.mode |= writeMode : this.mode &= ~writeMode;
  }
 },
 isFolder: {
  get: /** @this{FSNode} */ function() {
   return FS.isDir(this.mode);
  }
 },
 isDevice: {
  get: /** @this{FSNode} */ function() {
   return FS.isChrdev(this.mode);
  }
 }
});

FS.FSNode = FSNode;

FS.createPreloadedFile = FS_createPreloadedFile;

FS.staticInit();

ERRNO_CODES = {
 "EPERM": 63,
 "ENOENT": 44,
 "ESRCH": 71,
 "EINTR": 27,
 "EIO": 29,
 "ENXIO": 60,
 "E2BIG": 1,
 "ENOEXEC": 45,
 "EBADF": 8,
 "ECHILD": 12,
 "EAGAIN": 6,
 "EWOULDBLOCK": 6,
 "ENOMEM": 48,
 "EACCES": 2,
 "EFAULT": 21,
 "ENOTBLK": 105,
 "EBUSY": 10,
 "EEXIST": 20,
 "EXDEV": 75,
 "ENODEV": 43,
 "ENOTDIR": 54,
 "EISDIR": 31,
 "EINVAL": 28,
 "ENFILE": 41,
 "EMFILE": 33,
 "ENOTTY": 59,
 "ETXTBSY": 74,
 "EFBIG": 22,
 "ENOSPC": 51,
 "ESPIPE": 70,
 "EROFS": 69,
 "EMLINK": 34,
 "EPIPE": 64,
 "EDOM": 18,
 "ERANGE": 68,
 "ENOMSG": 49,
 "EIDRM": 24,
 "ECHRNG": 106,
 "EL2NSYNC": 156,
 "EL3HLT": 107,
 "EL3RST": 108,
 "ELNRNG": 109,
 "EUNATCH": 110,
 "ENOCSI": 111,
 "EL2HLT": 112,
 "EDEADLK": 16,
 "ENOLCK": 46,
 "EBADE": 113,
 "EBADR": 114,
 "EXFULL": 115,
 "ENOANO": 104,
 "EBADRQC": 103,
 "EBADSLT": 102,
 "EDEADLOCK": 16,
 "EBFONT": 101,
 "ENOSTR": 100,
 "ENODATA": 116,
 "ETIME": 117,
 "ENOSR": 118,
 "ENONET": 119,
 "ENOPKG": 120,
 "EREMOTE": 121,
 "ENOLINK": 47,
 "EADV": 122,
 "ESRMNT": 123,
 "ECOMM": 124,
 "EPROTO": 65,
 "EMULTIHOP": 36,
 "EDOTDOT": 125,
 "EBADMSG": 9,
 "ENOTUNIQ": 126,
 "EBADFD": 127,
 "EREMCHG": 128,
 "ELIBACC": 129,
 "ELIBBAD": 130,
 "ELIBSCN": 131,
 "ELIBMAX": 132,
 "ELIBEXEC": 133,
 "ENOSYS": 52,
 "ENOTEMPTY": 55,
 "ENAMETOOLONG": 37,
 "ELOOP": 32,
 "EOPNOTSUPP": 138,
 "EPFNOSUPPORT": 139,
 "ECONNRESET": 15,
 "ENOBUFS": 42,
 "EAFNOSUPPORT": 5,
 "EPROTOTYPE": 67,
 "ENOTSOCK": 57,
 "ENOPROTOOPT": 50,
 "ESHUTDOWN": 140,
 "ECONNREFUSED": 14,
 "EADDRINUSE": 3,
 "ECONNABORTED": 13,
 "ENETUNREACH": 40,
 "ENETDOWN": 38,
 "ETIMEDOUT": 73,
 "EHOSTDOWN": 142,
 "EHOSTUNREACH": 23,
 "EINPROGRESS": 26,
 "EALREADY": 7,
 "EDESTADDRREQ": 17,
 "EMSGSIZE": 35,
 "EPROTONOSUPPORT": 66,
 "ESOCKTNOSUPPORT": 137,
 "EADDRNOTAVAIL": 4,
 "ENETRESET": 39,
 "EISCONN": 30,
 "ENOTCONN": 53,
 "ETOOMANYREFS": 141,
 "EUSERS": 136,
 "EDQUOT": 19,
 "ESTALE": 72,
 "ENOTSUP": 138,
 "ENOMEDIUM": 148,
 "EILSEQ": 25,
 "EOVERFLOW": 61,
 "ECANCELED": 11,
 "ENOTRECOVERABLE": 56,
 "EOWNERDEAD": 62,
 "ESTRPIPE": 135
};

function checkIncomingModuleAPI() {
 ignoredModuleProp("fetchSettings");
}

var wasmImports = {
 /** @export */ TIFFCleanup: _TIFFCleanup,
 /** @export */ TIFFClientOpen: _TIFFClientOpen,
 /** @export */ TIFFComputeStrip: _TIFFComputeStrip,
 /** @export */ TIFFGetField: _TIFFGetField,
 /** @export */ TIFFGetFieldDefaulted: _TIFFGetFieldDefaulted,
 /** @export */ TIFFReadDirectory: _TIFFReadDirectory,
 /** @export */ TIFFReadEncodedStrip: _TIFFReadEncodedStrip,
 /** @export */ TIFFReadRGBAImageOriented: _TIFFReadRGBAImageOriented,
 /** @export */ TIFFScanlineSize: _TIFFScanlineSize,
 /** @export */ TIFFSetField: _TIFFSetField,
 /** @export */ TIFFStripSize: _TIFFStripSize,
 /** @export */ _ZN5nsync13nsync_cv_waitEPNS_11nsync_cv_s_EPNS_11nsync_mu_s_E: __ZN5nsync13nsync_cv_waitEPNS_11nsync_cv_s_EPNS_11nsync_mu_s_E,
 /** @export */ _ZN5nsync15nsync_cv_signalEPNS_11nsync_cv_s_E: __ZN5nsync15nsync_cv_signalEPNS_11nsync_cv_s_E,
 /** @export */ __assert_fail: ___assert_fail,
 /** @export */ __cxa_begin_catch: ___cxa_begin_catch,
 /** @export */ __cxa_end_catch: ___cxa_end_catch,
 /** @export */ __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
 /** @export */ __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3,
 /** @export */ __cxa_rethrow: ___cxa_rethrow,
 /** @export */ __cxa_rethrow_primary_exception: ___cxa_rethrow_primary_exception,
 /** @export */ __cxa_throw: ___cxa_throw,
 /** @export */ __cxa_uncaught_exceptions: ___cxa_uncaught_exceptions,
 /** @export */ __resumeException: ___resumeException,
 /** @export */ __syscall__newselect: ___syscall__newselect,
 /** @export */ __syscall_connect: ___syscall_connect,
 /** @export */ __syscall_fcntl64: ___syscall_fcntl64,
 /** @export */ __syscall_fstat64: ___syscall_fstat64,
 /** @export */ __syscall_getcwd: ___syscall_getcwd,
 /** @export */ __syscall_getdents64: ___syscall_getdents64,
 /** @export */ __syscall_ioctl: ___syscall_ioctl,
 /** @export */ __syscall_lstat64: ___syscall_lstat64,
 /** @export */ __syscall_mkdirat: ___syscall_mkdirat,
 /** @export */ __syscall_newfstatat: ___syscall_newfstatat,
 /** @export */ __syscall_openat: ___syscall_openat,
 /** @export */ __syscall_readlinkat: ___syscall_readlinkat,
 /** @export */ __syscall_rmdir: ___syscall_rmdir,
 /** @export */ __syscall_socket: ___syscall_socket,
 /** @export */ __syscall_stat64: ___syscall_stat64,
 /** @export */ __syscall_unlinkat: ___syscall_unlinkat,
 /** @export */ _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
 /** @export */ _emscripten_throw_longjmp: __emscripten_throw_longjmp,
 /** @export */ _gmtime_js: __gmtime_js,
 /** @export */ _localtime_js: __localtime_js,
 /** @export */ _mktime_js: __mktime_js,
 /** @export */ _mmap_js: __mmap_js,
 /** @export */ _munmap_js: __munmap_js,
 /** @export */ _tzset_js: __tzset_js,
 /** @export */ abort: _abort,
 /** @export */ emscripten_asm_const_int: _emscripten_asm_const_int,
 /** @export */ emscripten_date_now: _emscripten_date_now,
 /** @export */ emscripten_errn: _emscripten_errn,
 /** @export */ emscripten_get_heap_max: _emscripten_get_heap_max,
 /** @export */ emscripten_get_now: _emscripten_get_now,
 /** @export */ emscripten_log: _emscripten_log,
 /** @export */ emscripten_resize_heap: _emscripten_resize_heap,
 /** @export */ environ_get: _environ_get,
 /** @export */ environ_sizes_get: _environ_sizes_get,
 /** @export */ exit: _exit,
 /** @export */ fd_close: _fd_close,
 /** @export */ fd_read: _fd_read,
 /** @export */ fd_seek: _fd_seek,
 /** @export */ fd_write: _fd_write,
 /** @export */ invoke_di: invoke_di,
 /** @export */ invoke_dii: invoke_dii,
 /** @export */ invoke_diii: invoke_diii,
 /** @export */ invoke_diiiifi: invoke_diiiifi,
 /** @export */ invoke_fi: invoke_fi,
 /** @export */ invoke_fif: invoke_fif,
 /** @export */ invoke_fii: invoke_fii,
 /** @export */ invoke_fiif: invoke_fiif,
 /** @export */ invoke_fiifiiji: invoke_fiifiiji,
 /** @export */ invoke_fiii: invoke_fiii,
 /** @export */ invoke_fiiif: invoke_fiiif,
 /** @export */ invoke_fiiifffi: invoke_fiiifffi,
 /** @export */ invoke_fiiiffii: invoke_fiiiffii,
 /** @export */ invoke_fiiifiifii: invoke_fiiifiifii,
 /** @export */ invoke_fiiii: invoke_fiiii,
 /** @export */ invoke_fiiiiff: invoke_fiiiiff,
 /** @export */ invoke_fiiiifi: invoke_fiiiifi,
 /** @export */ invoke_fiiiii: invoke_fiiiii,
 /** @export */ invoke_fiiiiiff: invoke_fiiiiiff,
 /** @export */ invoke_fiiiiifiii: invoke_fiiiiifiii,
 /** @export */ invoke_fiiiiii: invoke_fiiiiii,
 /** @export */ invoke_fiiiiiifii: invoke_fiiiiiifii,
 /** @export */ invoke_fiiiiiii: invoke_fiiiiiii,
 /** @export */ invoke_fiiiiiiii: invoke_fiiiiiiii,
 /** @export */ invoke_fiiiiiiiii: invoke_fiiiiiiiii,
 /** @export */ invoke_fiiiiiiiiiii: invoke_fiiiiiiiiiii,
 /** @export */ invoke_i: invoke_i,
 /** @export */ invoke_iffffff: invoke_iffffff,
 /** @export */ invoke_ii: invoke_ii,
 /** @export */ invoke_iid: invoke_iid,
 /** @export */ invoke_iif: invoke_iif,
 /** @export */ invoke_iifff: invoke_iifff,
 /** @export */ invoke_iiffi: invoke_iiffi,
 /** @export */ invoke_iiffii: invoke_iiffii,
 /** @export */ invoke_iiffiii: invoke_iiffiii,
 /** @export */ invoke_iifii: invoke_iifii,
 /** @export */ invoke_iii: invoke_iii,
 /** @export */ invoke_iiid: invoke_iiid,
 /** @export */ invoke_iiif: invoke_iiif,
 /** @export */ invoke_iiiff: invoke_iiiff,
 /** @export */ invoke_iiiffff: invoke_iiiffff,
 /** @export */ invoke_iiifffiiiiiii: invoke_iiifffiiiiiii,
 /** @export */ invoke_iiiffii: invoke_iiiffii,
 /** @export */ invoke_iiifi: invoke_iiifi,
 /** @export */ invoke_iiifii: invoke_iiifii,
 /** @export */ invoke_iiifiii: invoke_iiifiii,
 /** @export */ invoke_iiifiiii: invoke_iiifiiii,
 /** @export */ invoke_iiifiiiii: invoke_iiifiiiii,
 /** @export */ invoke_iiii: invoke_iiii,
 /** @export */ invoke_iiiiddd: invoke_iiiiddd,
 /** @export */ invoke_iiiif: invoke_iiiif,
 /** @export */ invoke_iiiiff: invoke_iiiiff,
 /** @export */ invoke_iiiiffffif: invoke_iiiiffffif,
 /** @export */ invoke_iiiiffif: invoke_iiiiffif,
 /** @export */ invoke_iiiiffii: invoke_iiiiffii,
 /** @export */ invoke_iiiifi: invoke_iiiifi,
 /** @export */ invoke_iiiifii: invoke_iiiifii,
 /** @export */ invoke_iiiifiifffifi: invoke_iiiifiifffifi,
 /** @export */ invoke_iiiifiii: invoke_iiiifiii,
 /** @export */ invoke_iiiifiiii: invoke_iiiifiiii,
 /** @export */ invoke_iiiifiiiii: invoke_iiiifiiiii,
 /** @export */ invoke_iiiifijii: invoke_iiiifijii,
 /** @export */ invoke_iiiii: invoke_iiiii,
 /** @export */ invoke_iiiiid: invoke_iiiiid,
 /** @export */ invoke_iiiiidd: invoke_iiiiidd,
 /** @export */ invoke_iiiiif: invoke_iiiiif,
 /** @export */ invoke_iiiiiff: invoke_iiiiiff,
 /** @export */ invoke_iiiiifffiiii: invoke_iiiiifffiiii,
 /** @export */ invoke_iiiiiffifjiiii: invoke_iiiiiffifjiiii,
 /** @export */ invoke_iiiiiffiii: invoke_iiiiiffiii,
 /** @export */ invoke_iiiiifi: invoke_iiiiifi,
 /** @export */ invoke_iiiiifii: invoke_iiiiifii,
 /** @export */ invoke_iiiiii: invoke_iiiiii,
 /** @export */ invoke_iiiiiif: invoke_iiiiiif,
 /** @export */ invoke_iiiiiiff: invoke_iiiiiiff,
 /** @export */ invoke_iiiiiiffijifii: invoke_iiiiiiffijifii,
 /** @export */ invoke_iiiiiiffijifiiiii: invoke_iiiiiiffijifiiiii,
 /** @export */ invoke_iiiiiifi: invoke_iiiiiifi,
 /** @export */ invoke_iiiiiifii: invoke_iiiiiifii,
 /** @export */ invoke_iiiiiifiiiii: invoke_iiiiiifiiiii,
 /** @export */ invoke_iiiiiii: invoke_iiiiiii,
 /** @export */ invoke_iiiiiiif: invoke_iiiiiiif,
 /** @export */ invoke_iiiiiiiff: invoke_iiiiiiiff,
 /** @export */ invoke_iiiiiiiffi: invoke_iiiiiiiffi,
 /** @export */ invoke_iiiiiiififfiiiii: invoke_iiiiiiififfiiiii,
 /** @export */ invoke_iiiiiiifii: invoke_iiiiiiifii,
 /** @export */ invoke_iiiiiiii: invoke_iiiiiiii,
 /** @export */ invoke_iiiiiiiif: invoke_iiiiiiiif,
 /** @export */ invoke_iiiiiiiii: invoke_iiiiiiiii,
 /** @export */ invoke_iiiiiiiiif: invoke_iiiiiiiiif,
 /** @export */ invoke_iiiiiiiiiffi: invoke_iiiiiiiiiffi,
 /** @export */ invoke_iiiiiiiiiffiii: invoke_iiiiiiiiiffiii,
 /** @export */ invoke_iiiiiiiiii: invoke_iiiiiiiiii,
 /** @export */ invoke_iiiiiiiiiiff: invoke_iiiiiiiiiiff,
 /** @export */ invoke_iiiiiiiiiii: invoke_iiiiiiiiiii,
 /** @export */ invoke_iiiiiiiiiiii: invoke_iiiiiiiiiiii,
 /** @export */ invoke_iiiiiiiiiiiifiiiii: invoke_iiiiiiiiiiiifiiiii,
 /** @export */ invoke_iiiiiiiiiiiii: invoke_iiiiiiiiiiiii,
 /** @export */ invoke_iiiiiiiiiiiiif: invoke_iiiiiiiiiiiiif,
 /** @export */ invoke_iiiiiiiiiiiiii: invoke_iiiiiiiiiiiiii,
 /** @export */ invoke_iiiiiiiiiiiiiifif: invoke_iiiiiiiiiiiiiifif,
 /** @export */ invoke_iiiiiiiiiiiiiififiiiii: invoke_iiiiiiiiiiiiiififiiiii,
 /** @export */ invoke_iiiiiiiiiiiiiiiiii: invoke_iiiiiiiiiiiiiiiiii,
 /** @export */ invoke_iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii: invoke_iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii,
 /** @export */ invoke_iiiiiiiiiiiiji: invoke_iiiiiiiiiiiiji,
 /** @export */ invoke_iiiiiiiiiijii: invoke_iiiiiiiiiijii,
 /** @export */ invoke_iiiiiiiiiji: invoke_iiiiiiiiiji,
 /** @export */ invoke_iiiiiiiijiii: invoke_iiiiiiiijiii,
 /** @export */ invoke_iiiiiiijifiiiii: invoke_iiiiiiijifiiiii,
 /** @export */ invoke_iiiiiiijiiii: invoke_iiiiiiijiiii,
 /** @export */ invoke_iiiiiij: invoke_iiiiiij,
 /** @export */ invoke_iiiiiiji: invoke_iiiiiiji,
 /** @export */ invoke_iiiiiijii: invoke_iiiiiijii,
 /** @export */ invoke_iiiiiijiiii: invoke_iiiiiijiiii,
 /** @export */ invoke_iiiiiijiiiii: invoke_iiiiiijiiiii,
 /** @export */ invoke_iiiiij: invoke_iiiiij,
 /** @export */ invoke_iiiiiji: invoke_iiiiiji,
 /** @export */ invoke_iiiij: invoke_iiiij,
 /** @export */ invoke_iiiiji: invoke_iiiiji,
 /** @export */ invoke_iiiijii: invoke_iiiijii,
 /** @export */ invoke_iiiijiiii: invoke_iiiijiiii,
 /** @export */ invoke_iiij: invoke_iiij,
 /** @export */ invoke_iiiji: invoke_iiiji,
 /** @export */ invoke_iiijii: invoke_iiijii,
 /** @export */ invoke_iij: invoke_iij,
 /** @export */ invoke_iiji: invoke_iiji,
 /** @export */ invoke_iijiiiiiii: invoke_iijiiiiiii,
 /** @export */ invoke_iijiiiiiiii: invoke_iijiiiiiiii,
 /** @export */ invoke_ij: invoke_ij,
 /** @export */ invoke_iji: invoke_iji,
 /** @export */ invoke_j: invoke_j,
 /** @export */ invoke_ji: invoke_ji,
 /** @export */ invoke_jii: invoke_jii,
 /** @export */ invoke_jiii: invoke_jiii,
 /** @export */ invoke_jiiii: invoke_jiiii,
 /** @export */ invoke_jij: invoke_jij,
 /** @export */ invoke_v: invoke_v,
 /** @export */ invoke_vi: invoke_vi,
 /** @export */ invoke_vid: invoke_vid,
 /** @export */ invoke_vidd: invoke_vidd,
 /** @export */ invoke_vididdii: invoke_vididdii,
 /** @export */ invoke_vif: invoke_vif,
 /** @export */ invoke_viff: invoke_viff,
 /** @export */ invoke_vifff: invoke_vifff,
 /** @export */ invoke_viffi: invoke_viffi,
 /** @export */ invoke_vifi: invoke_vifi,
 /** @export */ invoke_vifiiii: invoke_vifiiii,
 /** @export */ invoke_vifiiiif: invoke_vifiiiif,
 /** @export */ invoke_vifiiiii: invoke_vifiiiii,
 /** @export */ invoke_vifiiiiiii: invoke_vifiiiiiii,
 /** @export */ invoke_vii: invoke_vii,
 /** @export */ invoke_viid: invoke_viid,
 /** @export */ invoke_viidd: invoke_viidd,
 /** @export */ invoke_viiddi: invoke_viiddi,
 /** @export */ invoke_viidii: invoke_viidii,
 /** @export */ invoke_viidiiiidii: invoke_viidiiiidii,
 /** @export */ invoke_viidiiiidiii: invoke_viidiiiidiii,
 /** @export */ invoke_viidiiiii: invoke_viidiiiii,
 /** @export */ invoke_viif: invoke_viif,
 /** @export */ invoke_viiffff: invoke_viiffff,
 /** @export */ invoke_viiffi: invoke_viiffi,
 /** @export */ invoke_viifi: invoke_viifi,
 /** @export */ invoke_viifii: invoke_viifii,
 /** @export */ invoke_viifiif: invoke_viifiif,
 /** @export */ invoke_viifiiii: invoke_viifiiii,
 /** @export */ invoke_viifiiiiff: invoke_viifiiiiff,
 /** @export */ invoke_viifiiiii: invoke_viifiiiii,
 /** @export */ invoke_viii: invoke_viii,
 /** @export */ invoke_viiid: invoke_viiid,
 /** @export */ invoke_viiidd: invoke_viiidd,
 /** @export */ invoke_viiiddd: invoke_viiiddd,
 /** @export */ invoke_viiiddi: invoke_viiiddi,
 /** @export */ invoke_viiidii: invoke_viiidii,
 /** @export */ invoke_viiif: invoke_viiif,
 /** @export */ invoke_viiifff: invoke_viiifff,
 /** @export */ invoke_viiiffffiiii: invoke_viiiffffiiii,
 /** @export */ invoke_viiiffii: invoke_viiiffii,
 /** @export */ invoke_viiiffiiiii: invoke_viiiffiiiii,
 /** @export */ invoke_viiifi: invoke_viiifi,
 /** @export */ invoke_viiifii: invoke_viiifii,
 /** @export */ invoke_viiifiifiiiiii: invoke_viiifiifiiiiii,
 /** @export */ invoke_viiifiii: invoke_viiifiii,
 /** @export */ invoke_viiifiiii: invoke_viiifiiii,
 /** @export */ invoke_viiifiiiiiii: invoke_viiifiiiiiii,
 /** @export */ invoke_viiifjii: invoke_viiifjii,
 /** @export */ invoke_viiii: invoke_viiii,
 /** @export */ invoke_viiiid: invoke_viiiid,
 /** @export */ invoke_viiiif: invoke_viiiif,
 /** @export */ invoke_viiiiff: invoke_viiiiff,
 /** @export */ invoke_viiiiffffi: invoke_viiiiffffi,
 /** @export */ invoke_viiiifffii: invoke_viiiifffii,
 /** @export */ invoke_viiiiffi: invoke_viiiiffi,
 /** @export */ invoke_viiiiffii: invoke_viiiiffii,
 /** @export */ invoke_viiiifi: invoke_viiiifi,
 /** @export */ invoke_viiiifii: invoke_viiiifii,
 /** @export */ invoke_viiiifiiii: invoke_viiiifiiii,
 /** @export */ invoke_viiiii: invoke_viiiii,
 /** @export */ invoke_viiiiid: invoke_viiiiid,
 /** @export */ invoke_viiiiidi: invoke_viiiiidi,
 /** @export */ invoke_viiiiif: invoke_viiiiif,
 /** @export */ invoke_viiiiifi: invoke_viiiiifi,
 /** @export */ invoke_viiiiifii: invoke_viiiiifii,
 /** @export */ invoke_viiiiifiji: invoke_viiiiifiji,
 /** @export */ invoke_viiiiii: invoke_viiiiii,
 /** @export */ invoke_viiiiiif: invoke_viiiiiif,
 /** @export */ invoke_viiiiiiff: invoke_viiiiiiff,
 /** @export */ invoke_viiiiiifi: invoke_viiiiiifi,
 /** @export */ invoke_viiiiiifii: invoke_viiiiiifii,
 /** @export */ invoke_viiiiiii: invoke_viiiiiii,
 /** @export */ invoke_viiiiiiidiiiiiiiiii: invoke_viiiiiiidiiiiiiiiii,
 /** @export */ invoke_viiiiiiif: invoke_viiiiiiif,
 /** @export */ invoke_viiiiiiifiii: invoke_viiiiiiifiii,
 /** @export */ invoke_viiiiiiii: invoke_viiiiiiii,
 /** @export */ invoke_viiiiiiiii: invoke_viiiiiiiii,
 /** @export */ invoke_viiiiiiiiii: invoke_viiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiifiiiii: invoke_viiiiiiiiiifiiiii,
 /** @export */ invoke_viiiiiiiiiii: invoke_viiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiii: invoke_viiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiifi: invoke_viiiiiiiiiiiifi,
 /** @export */ invoke_viiiiiiiiiiiii: invoke_viiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiii: invoke_viiiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiifiiiii: invoke_viiiiiiiiiiiiiifiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiii: invoke_viiiiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiiii: invoke_viiiiiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiiiii: invoke_viiiiiiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiiiiii: invoke_viiiiiiiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiiiiiiiii: invoke_viiiiiiiiiiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiiiiiiiiii: invoke_viiiiiiiiiiiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii: invoke_viiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii: invoke_viiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii,
 /** @export */ invoke_viiiiiiiiiiiiiijiiifi: invoke_viiiiiiiiiiiiiijiiifi,
 /** @export */ invoke_viiiiiiiiiiiji: invoke_viiiiiiiiiiiji,
 /** @export */ invoke_viiiiiiiiijiii: invoke_viiiiiiiiijiii,
 /** @export */ invoke_viiiiiiij: invoke_viiiiiiij,
 /** @export */ invoke_viiiiiiji: invoke_viiiiiiji,
 /** @export */ invoke_viiiiiijiii: invoke_viiiiiijiii,
 /** @export */ invoke_viiiiij: invoke_viiiiij,
 /** @export */ invoke_viiiiiji: invoke_viiiiiji,
 /** @export */ invoke_viiiiijiiiii: invoke_viiiiijiiiii,
 /** @export */ invoke_viiiij: invoke_viiiij,
 /** @export */ invoke_viiiijii: invoke_viiiijii,
 /** @export */ invoke_viiiijj: invoke_viiiijj,
 /** @export */ invoke_viiij: invoke_viiij,
 /** @export */ invoke_viiiji: invoke_viiiji,
 /** @export */ invoke_viij: invoke_viij,
 /** @export */ invoke_viijii: invoke_viijii,
 /** @export */ invoke_viijiii: invoke_viijiii,
 /** @export */ invoke_viijiiii: invoke_viijiiii,
 /** @export */ invoke_viijj: invoke_viijj,
 /** @export */ invoke_vij: invoke_vij,
 /** @export */ invoke_viji: invoke_viji,
 /** @export */ invoke_vji: invoke_vji,
 /** @export */ invoke_vjii: invoke_vjii,
 /** @export */ llvm_eh_typeid_for: _llvm_eh_typeid_for,
 /** @export */ strftime: _strftime,
 /** @export */ strftime_l: _strftime_l
};

var wasmExports = createWasm();

var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors");

var ___cxa_free_exception = createExportWrapper("__cxa_free_exception");

var ___errno_location = createExportWrapper("__errno_location");

var _malloc = Module["_malloc"] = createExportWrapper("malloc");

var _free = Module["_free"] = createExportWrapper("free");

var setTempRet0 = createExportWrapper("setTempRet0");

var _fflush = Module["_fflush"] = createExportWrapper("fflush");

var _emscripten_bind_VoidPtr___destroy___0 = Module["_emscripten_bind_VoidPtr___destroy___0"] = createExportWrapper("emscripten_bind_VoidPtr___destroy___0");

var _emscripten_bind_Create_CImageData = Module["_emscripten_bind_Create_CImageData"] = createExportWrapper("emscripten_bind_Create_CImageData");

var _emscripten_bind_Destory_CImageData = Module["_emscripten_bind_Destory_CImageData"] = createExportWrapper("emscripten_bind_Destory_CImageData");

var _emscripten_bind_Destory_CString = Module["_emscripten_bind_Destory_CString"] = createExportWrapper("emscripten_bind_Destory_CString");

var _emscripten_bind_CoreWasm_static_init_1 = Module["_emscripten_bind_CoreWasm_static_init_1"] = createExportWrapper("emscripten_bind_CoreWasm_static_init_1");

var _emscripten_bind_CoreWasm_static_GetIsSupportDceModule_0 = Module["_emscripten_bind_CoreWasm_static_GetIsSupportDceModule_0"] = createExportWrapper("emscripten_bind_CoreWasm_static_GetIsSupportDceModule_0");

var _emscripten_bind_CoreWasm_static_GetIsSupportIRTModule_0 = Module["_emscripten_bind_CoreWasm_static_GetIsSupportIRTModule_0"] = createExportWrapper("emscripten_bind_CoreWasm_static_GetIsSupportIRTModule_0");

var _emscripten_bind_CoreWasm_static_GetIsSupportModule_2 = Module["_emscripten_bind_CoreWasm_static_GetIsSupportModule_2"] = createExportWrapper("emscripten_bind_CoreWasm_static_GetIsSupportModule_2");

var _emscripten_bind_CoreWasm_static_CFD_1 = Module["_emscripten_bind_CoreWasm_static_CFD_1"] = createExportWrapper("emscripten_bind_CoreWasm_static_CFD_1");

var _emscripten_bind_CoreWasm_GetModuleVersion_0 = Module["_emscripten_bind_CoreWasm_GetModuleVersion_0"] = createExportWrapper("emscripten_bind_CoreWasm_GetModuleVersion_0");

var __ZN22DocumentNormalizerWasm10getVersionEv = Module["__ZN22DocumentNormalizerWasm10getVersionEv"] = createExportWrapper("_ZN22DocumentNormalizerWasm10getVersionEv");

var __ZN17BarcodeReaderWasm10getVersionEv = Module["__ZN17BarcodeReaderWasm10getVersionEv"] = createExportWrapper("_ZN17BarcodeReaderWasm10getVersionEv");

var __ZN19LabelRecognizerWasm10getVersionEv = Module["__ZN19LabelRecognizerWasm10getVersionEv"] = createExportWrapper("_ZN19LabelRecognizerWasm10getVersionEv");

var __ZN14CodeParserWasm10getVersionEv = Module["__ZN14CodeParserWasm10getVersionEv"] = createExportWrapper("_ZN14CodeParserWasm10getVersionEv");

var _emscripten_bind_CoreWasm_PreSetModuleExist = Module["_emscripten_bind_CoreWasm_PreSetModuleExist"] = createExportWrapper("emscripten_bind_CoreWasm_PreSetModuleExist");

var _emscripten_bind_funcs = Module["_emscripten_bind_funcs"] = createExportWrapper("emscripten_bind_funcs");

var _emscripten_bind_UtilityWasm_DrawOnImageQuads = Module["_emscripten_bind_UtilityWasm_DrawOnImageQuads"] = createExportWrapper("emscripten_bind_UtilityWasm_DrawOnImageQuads");

var _emscripten_bind_UtilityWasm_DrawOnImageLines = Module["_emscripten_bind_UtilityWasm_DrawOnImageLines"] = createExportWrapper("emscripten_bind_UtilityWasm_DrawOnImageLines");

var _emscripten_bind_UtilityWasm_DrawOnImageContours = Module["_emscripten_bind_UtilityWasm_DrawOnImageContours"] = createExportWrapper("emscripten_bind_UtilityWasm_DrawOnImageContours");

var _emscripten_bind_UtilityWasm_DrawOnImageCorners = Module["_emscripten_bind_UtilityWasm_DrawOnImageCorners"] = createExportWrapper("emscripten_bind_UtilityWasm_DrawOnImageCorners");

var _emscripten_bind_UtilityWasm_DrawOnImageEdges = Module["_emscripten_bind_UtilityWasm_DrawOnImageEdges"] = createExportWrapper("emscripten_bind_UtilityWasm_DrawOnImageEdges");

var _emscripten_bind_UtilityWasm_ReadFromMemory = Module["_emscripten_bind_UtilityWasm_ReadFromMemory"] = createExportWrapper("emscripten_bind_UtilityWasm_ReadFromMemory");

var _emscripten_bind_UtilityWasm_SaveToMemory = Module["_emscripten_bind_UtilityWasm_SaveToMemory"] = createExportWrapper("emscripten_bind_UtilityWasm_SaveToMemory");

var _emscripten_bind_UtilityWasm_CropImageFromRect = Module["_emscripten_bind_UtilityWasm_CropImageFromRect"] = createExportWrapper("emscripten_bind_UtilityWasm_CropImageFromRect");

var _emscripten_bind_UtilityWasm_CropImageFromQuadrilateral = Module["_emscripten_bind_UtilityWasm_CropImageFromQuadrilateral"] = createExportWrapper("emscripten_bind_UtilityWasm_CropImageFromQuadrilateral");

var _emscripten_bind_UtilityWasm_AdjustBrightness = Module["_emscripten_bind_UtilityWasm_AdjustBrightness"] = createExportWrapper("emscripten_bind_UtilityWasm_AdjustBrightness");

var _emscripten_bind_UtilityWasm_AdjustContrast = Module["_emscripten_bind_UtilityWasm_AdjustContrast"] = createExportWrapper("emscripten_bind_UtilityWasm_AdjustContrast");

var _emscripten_bind_UtilityWasm_FilterImage = Module["_emscripten_bind_UtilityWasm_FilterImage"] = createExportWrapper("emscripten_bind_UtilityWasm_FilterImage");

var _emscripten_bind_UtilityWasm_ConvertToGray = Module["_emscripten_bind_UtilityWasm_ConvertToGray"] = createExportWrapper("emscripten_bind_UtilityWasm_ConvertToGray");

var _emscripten_bind_UtilityWasm_ConvertToBinaryGlobal = Module["_emscripten_bind_UtilityWasm_ConvertToBinaryGlobal"] = createExportWrapper("emscripten_bind_UtilityWasm_ConvertToBinaryGlobal");

var _emscripten_bind_UtilityWasm_ConvertToBinaryLocal = Module["_emscripten_bind_UtilityWasm_ConvertToBinaryLocal"] = createExportWrapper("emscripten_bind_UtilityWasm_ConvertToBinaryLocal");

var __ZN17BarcodeReaderWasm23getJvFromBarcodeDetailsERK13BarcodeFormatPKN9dynamsoft3dbr15CBarcodeDetailsE = Module["__ZN17BarcodeReaderWasm23getJvFromBarcodeDetailsERK13BarcodeFormatPKN9dynamsoft3dbr15CBarcodeDetailsE"] = createExportWrapper("_ZN17BarcodeReaderWasm23getJvFromBarcodeDetailsERK13BarcodeFormatPKN9dynamsoft3dbr15CBarcodeDetailsE");

var __ZN17BarcodeReaderWasm31getJvFromBarcodeResultItem_JustEPKN9dynamsoft3dbr18CBarcodeResultItemE = Module["__ZN17BarcodeReaderWasm31getJvFromBarcodeResultItem_JustEPKN9dynamsoft3dbr18CBarcodeResultItemE"] = createExportWrapper("_ZN17BarcodeReaderWasm31getJvFromBarcodeResultItem_JustEPKN9dynamsoft3dbr18CBarcodeResultItemE");

var __ZN17BarcodeReaderWasm12DbrWasmClassC2Ev = Module["__ZN17BarcodeReaderWasm12DbrWasmClassC2Ev"] = createExportWrapper("_ZN17BarcodeReaderWasm12DbrWasmClassC2Ev");

var __ZN17BarcodeReaderWasm12DbrWasmClass29enableResultCrossVerificationEb = Module["__ZN17BarcodeReaderWasm12DbrWasmClass29enableResultCrossVerificationEb"] = createExportWrapper("_ZN17BarcodeReaderWasm12DbrWasmClass29enableResultCrossVerificationEb");

var __ZN17BarcodeReaderWasm12DbrWasmClass25enableResultDeduplicationEb = Module["__ZN17BarcodeReaderWasm12DbrWasmClass25enableResultDeduplicationEb"] = createExportWrapper("_ZN17BarcodeReaderWasm12DbrWasmClass25enableResultDeduplicationEb");

var __ZN17BarcodeReaderWasm12DbrWasmClass22setDuplicateForgetTimeEi = Module["__ZN17BarcodeReaderWasm12DbrWasmClass22setDuplicateForgetTimeEi"] = createExportWrapper("_ZN17BarcodeReaderWasm12DbrWasmClass22setDuplicateForgetTimeEi");

var __ZN17BarcodeReaderWasm12DbrWasmClass22getDuplicateForgetTimeEv = Module["__ZN17BarcodeReaderWasm12DbrWasmClass22getDuplicateForgetTimeEv"] = createExportWrapper("_ZN17BarcodeReaderWasm12DbrWasmClass22getDuplicateForgetTimeEv");

var __ZN17BarcodeReaderWasm12DbrWasmClass15clearVerifyListEv = Module["__ZN17BarcodeReaderWasm12DbrWasmClass15clearVerifyListEv"] = createExportWrapper("_ZN17BarcodeReaderWasm12DbrWasmClass15clearVerifyListEv");

var __ZN17BarcodeReaderWasm12DbrWasmClass26getJvFromBarcodeResultItemEPKN9dynamsoft3dbr18CBarcodeResultItemEPKcb = Module["__ZN17BarcodeReaderWasm12DbrWasmClass26getJvFromBarcodeResultItemEPKN9dynamsoft3dbr18CBarcodeResultItemEPKcb"] = createExportWrapper("_ZN17BarcodeReaderWasm12DbrWasmClass26getJvFromBarcodeResultItemEPKN9dynamsoft3dbr18CBarcodeResultItemEPKcb");

var __ZN17BarcodeReaderWasm12DbrWasmClass12isSameResultEN4Json5ValueES2_ = Module["__ZN17BarcodeReaderWasm12DbrWasmClass12isSameResultEN4Json5ValueES2_"] = createExportWrapper("_ZN17BarcodeReaderWasm12DbrWasmClass12isSameResultEN4Json5ValueES2_");

var __ZN17BarcodeReaderWasm12DbrWasmClassC1Ev = Module["__ZN17BarcodeReaderWasm12DbrWasmClassC1Ev"] = createExportWrapper("_ZN17BarcodeReaderWasm12DbrWasmClassC1Ev");

var __ZN19LabelRecognizerWasm32getJvFromTextLineResultItem_JustEPKN9dynamsoft3dlr19CTextLineResultItemE = Module["__ZN19LabelRecognizerWasm32getJvFromTextLineResultItem_JustEPKN9dynamsoft3dlr19CTextLineResultItemE"] = createExportWrapper("_ZN19LabelRecognizerWasm32getJvFromTextLineResultItem_JustEPKN9dynamsoft3dlr19CTextLineResultItemE");

var __ZN22DocumentNormalizerWasm36getJvFromDetectedQuadResultItem_JustEPKN9dynamsoft3ddn23CDetectedQuadResultItemE = Module["__ZN22DocumentNormalizerWasm36getJvFromDetectedQuadResultItem_JustEPKN9dynamsoft3ddn23CDetectedQuadResultItemE"] = createExportWrapper("_ZN22DocumentNormalizerWasm36getJvFromDetectedQuadResultItem_JustEPKN9dynamsoft3ddn23CDetectedQuadResultItemE");

var __ZN22DocumentNormalizerWasm37getJvFromDeskewedImageResultItem_JustEPKN9dynamsoft3ddn24CDeskewedImageResultItemE = Module["__ZN22DocumentNormalizerWasm37getJvFromDeskewedImageResultItem_JustEPKN9dynamsoft3ddn24CDeskewedImageResultItemE"] = createExportWrapper("_ZN22DocumentNormalizerWasm37getJvFromDeskewedImageResultItem_JustEPKN9dynamsoft3ddn24CDeskewedImageResultItemE");

var __ZN19LabelRecognizerWasm29getJvLocalizedTextLineElementEPKN9dynamsoft3dlr20intermediate_results25CLocalizedTextLineElementE = Module["__ZN19LabelRecognizerWasm29getJvLocalizedTextLineElementEPKN9dynamsoft3dlr20intermediate_results25CLocalizedTextLineElementE"] = createExportWrapper("_ZN19LabelRecognizerWasm29getJvLocalizedTextLineElementEPKN9dynamsoft3dlr20intermediate_results25CLocalizedTextLineElementE");

var __ZN19LabelRecognizerWasm30getJvRecognizedTextLineElementEPKN9dynamsoft3dlr20intermediate_results26CRecognizedTextLineElementE = Module["__ZN19LabelRecognizerWasm30getJvRecognizedTextLineElementEPKN9dynamsoft3dlr20intermediate_results26CRecognizedTextLineElementE"] = createExportWrapper("_ZN19LabelRecognizerWasm30getJvRecognizedTextLineElementEPKN9dynamsoft3dlr20intermediate_results26CRecognizedTextLineElementE");

var __ZN19LabelRecognizerWasm24getJvFromCharacterResultEPKN9dynamsoft3dlr16CCharacterResultE = Module["__ZN19LabelRecognizerWasm24getJvFromCharacterResultEPKN9dynamsoft3dlr16CCharacterResultE"] = createExportWrapper("_ZN19LabelRecognizerWasm24getJvFromCharacterResultEPKN9dynamsoft3dlr16CCharacterResultE");

var __ZN22DocumentNormalizerWasm12DdnWasmClassC1Ev = Module["__ZN22DocumentNormalizerWasm12DdnWasmClassC1Ev"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClassC1Ev");

var __ZN19LabelRecognizerWasm12DlrWasmClassC1Ev = Module["__ZN19LabelRecognizerWasm12DlrWasmClassC1Ev"] = createExportWrapper("_ZN19LabelRecognizerWasm12DlrWasmClassC1Ev");

var __ZN19LabelRecognizerWasm12DlrWasmClass27getJvFromTextLineResultItemEPKN9dynamsoft3dlr19CTextLineResultItemEPKcb = Module["__ZN19LabelRecognizerWasm12DlrWasmClass27getJvFromTextLineResultItemEPKN9dynamsoft3dlr19CTextLineResultItemEPKcb"] = createExportWrapper("_ZN19LabelRecognizerWasm12DlrWasmClass27getJvFromTextLineResultItemEPKN9dynamsoft3dlr19CTextLineResultItemEPKcb");

var __ZN22DocumentNormalizerWasm12DdnWasmClass31getJvFromDetectedQuadResultItemEPKN9dynamsoft3ddn23CDetectedQuadResultItemEPKcb = Module["__ZN22DocumentNormalizerWasm12DdnWasmClass31getJvFromDetectedQuadResultItemEPKN9dynamsoft3ddn23CDetectedQuadResultItemEPKcb"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClass31getJvFromDetectedQuadResultItemEPKN9dynamsoft3ddn23CDetectedQuadResultItemEPKcb");

var __ZN22DocumentNormalizerWasm12DdnWasmClass32getJvFromDeskewedImageResultItemEPKN9dynamsoft3ddn24CDeskewedImageResultItemEPKcb = Module["__ZN22DocumentNormalizerWasm12DdnWasmClass32getJvFromDeskewedImageResultItemEPKN9dynamsoft3ddn24CDeskewedImageResultItemEPKcb"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClass32getJvFromDeskewedImageResultItemEPKN9dynamsoft3ddn24CDeskewedImageResultItemEPKcb");

var __ZN22DocumentNormalizerWasm12DdnWasmClass32getJvFromEnhancedImageResultItemEPKN9dynamsoft3ddn24CEnhancedImageResultItemE = Module["__ZN22DocumentNormalizerWasm12DdnWasmClass32getJvFromEnhancedImageResultItemEPKN9dynamsoft3ddn24CEnhancedImageResultItemE"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClass32getJvFromEnhancedImageResultItemEPKN9dynamsoft3ddn24CEnhancedImageResultItemE");

var __ZN14CodeParserWasm25getJvFromParsedResultItemEPKN9dynamsoft3dcp17CParsedResultItemE = Module["__ZN14CodeParserWasm25getJvFromParsedResultItemEPKN9dynamsoft3dcp17CParsedResultItemE"] = createExportWrapper("_ZN14CodeParserWasm25getJvFromParsedResultItemEPKN9dynamsoft3dcp17CParsedResultItemE");

var __ZN19LabelRecognizerWasm26getJvBufferedCharacterItemEPKN9dynamsoft3dlr22CBufferedCharacterItemE = Module["__ZN19LabelRecognizerWasm26getJvBufferedCharacterItemEPKN9dynamsoft3dlr22CBufferedCharacterItemE"] = createExportWrapper("_ZN19LabelRecognizerWasm26getJvBufferedCharacterItemEPKN9dynamsoft3dlr22CBufferedCharacterItemE");

var __ZN22DocumentNormalizerWasm12DdnWasmClass29enableResultCrossVerificationEib = Module["__ZN22DocumentNormalizerWasm12DdnWasmClass29enableResultCrossVerificationEib"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClass29enableResultCrossVerificationEib");

var __ZN19LabelRecognizerWasm12DlrWasmClass29enableResultCrossVerificationEb = Module["__ZN19LabelRecognizerWasm12DlrWasmClass29enableResultCrossVerificationEb"] = createExportWrapper("_ZN19LabelRecognizerWasm12DlrWasmClass29enableResultCrossVerificationEb");

var __ZN22DocumentNormalizerWasm12DdnWasmClass25enableResultDeduplicationEib = Module["__ZN22DocumentNormalizerWasm12DdnWasmClass25enableResultDeduplicationEib"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClass25enableResultDeduplicationEib");

var __ZN19LabelRecognizerWasm12DlrWasmClass25enableResultDeduplicationEb = Module["__ZN19LabelRecognizerWasm12DlrWasmClass25enableResultDeduplicationEb"] = createExportWrapper("_ZN19LabelRecognizerWasm12DlrWasmClass25enableResultDeduplicationEb");

var __ZN22DocumentNormalizerWasm12DdnWasmClass22setDuplicateForgetTimeEii = Module["__ZN22DocumentNormalizerWasm12DdnWasmClass22setDuplicateForgetTimeEii"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClass22setDuplicateForgetTimeEii");

var __ZN19LabelRecognizerWasm12DlrWasmClass22setDuplicateForgetTimeEi = Module["__ZN19LabelRecognizerWasm12DlrWasmClass22setDuplicateForgetTimeEi"] = createExportWrapper("_ZN19LabelRecognizerWasm12DlrWasmClass22setDuplicateForgetTimeEi");

var __ZN22DocumentNormalizerWasm12DdnWasmClass22getDuplicateForgetTimeEi = Module["__ZN22DocumentNormalizerWasm12DdnWasmClass22getDuplicateForgetTimeEi"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClass22getDuplicateForgetTimeEi");

var __ZN19LabelRecognizerWasm12DlrWasmClass22getDuplicateForgetTimeEv = Module["__ZN19LabelRecognizerWasm12DlrWasmClass22getDuplicateForgetTimeEv"] = createExportWrapper("_ZN19LabelRecognizerWasm12DlrWasmClass22getDuplicateForgetTimeEv");

var _emscripten_bind_CvrWasm_SetModuleExist = Module["_emscripten_bind_CvrWasm_SetModuleExist"] = createExportWrapper("emscripten_bind_CvrWasm_SetModuleExist");

var _emscripten_bind_CvrWasm_CvrWasm_0 = Module["_emscripten_bind_CvrWasm_CvrWasm_0"] = createExportWrapper("emscripten_bind_CvrWasm_CvrWasm_0");

var _emscripten_bind_CvrWasm_InitSettings_1 = Module["_emscripten_bind_CvrWasm_InitSettings_1"] = createExportWrapper("emscripten_bind_CvrWasm_InitSettings_1");

var _emscripten_bind_CvrWasm_AppendParameterContent_1 = Module["_emscripten_bind_CvrWasm_AppendParameterContent_1"] = createExportWrapper("emscripten_bind_CvrWasm_AppendParameterContent_1");

var _emscripten_bind_CvrWasm_InitParameter_0 = Module["_emscripten_bind_CvrWasm_InitParameter_0"] = createExportWrapper("emscripten_bind_CvrWasm_InitParameter_0");

var _emscripten_bind_CvrWasm_ParseRequiredResources_1 = Module["_emscripten_bind_CvrWasm_ParseRequiredResources_1"] = createExportWrapper("emscripten_bind_CvrWasm_ParseRequiredResources_1");

var _emscripten_bind_CvrWasm_OutputSettings_1 = Module["_emscripten_bind_CvrWasm_OutputSettings_1"] = createExportWrapper("emscripten_bind_CvrWasm_OutputSettings_1");

var _emscripten_bind_CvrWasm_GetSimplifiedSettings_1 = Module["_emscripten_bind_CvrWasm_GetSimplifiedSettings_1"] = createExportWrapper("emscripten_bind_CvrWasm_GetSimplifiedSettings_1");

var _emscripten_bind_CvrWasm_UpdateSettings_2 = Module["_emscripten_bind_CvrWasm_UpdateSettings_2"] = createExportWrapper("emscripten_bind_CvrWasm_UpdateSettings_2");

var _emscripten_bind_CvrWasm_ResetSettings_0 = Module["_emscripten_bind_CvrWasm_ResetSettings_0"] = createExportWrapper("emscripten_bind_CvrWasm_ResetSettings_0");

var _emscripten_bind_CvrWasm_Capture_4 = Module["_emscripten_bind_CvrWasm_Capture_4"] = createExportWrapper("emscripten_bind_CvrWasm_Capture_4");

var _emscripten_bind_CvrWasm_GetIntermediateResult_0 = Module["_emscripten_bind_CvrWasm_GetIntermediateResult_0"] = createExportWrapper("emscripten_bind_CvrWasm_GetIntermediateResult_0");

var _emscripten_bind_CvrWasm_ContainsTask_1 = Module["_emscripten_bind_CvrWasm_ContainsTask_1"] = createExportWrapper("emscripten_bind_CvrWasm_ContainsTask_1");

var _emscripten_bind_CvrWasm_GetObservedResultUnitTypes_0 = Module["_emscripten_bind_CvrWasm_GetObservedResultUnitTypes_0"] = createExportWrapper("emscripten_bind_CvrWasm_GetObservedResultUnitTypes_0");

var _emscripten_bind_CvrWasm_GetBufferedCharacterItemSet_0 = Module["_emscripten_bind_CvrWasm_GetBufferedCharacterItemSet_0"] = createExportWrapper("emscripten_bind_CvrWasm_GetBufferedCharacterItemSet_0");

var _emscripten_bind_CvrWasm_GetFilterState_0 = Module["_emscripten_bind_CvrWasm_GetFilterState_0"] = createExportWrapper("emscripten_bind_CvrWasm_GetFilterState_0");

var _emscripten_bind_CvrWasm_GetTemplateNames_0 = Module["_emscripten_bind_CvrWasm_GetTemplateNames_0"] = createExportWrapper("emscripten_bind_CvrWasm_GetTemplateNames_0");

var _emscripten_bind_CvrWasm_AppendModelBuffer_4 = Module["_emscripten_bind_CvrWasm_AppendModelBuffer_4"] = createExportWrapper("emscripten_bind_CvrWasm_AppendModelBuffer_4");

var _emscripten_bind_CvrWasm_EnableResultCrossVerification_2 = Module["_emscripten_bind_CvrWasm_EnableResultCrossVerification_2"] = createExportWrapper("emscripten_bind_CvrWasm_EnableResultCrossVerification_2");

var _emscripten_bind_CvrWasm_EnableResultDeduplication_2 = Module["_emscripten_bind_CvrWasm_EnableResultDeduplication_2"] = createExportWrapper("emscripten_bind_CvrWasm_EnableResultDeduplication_2");

var _emscripten_bind_CvrWasm_SetDuplicateForgetTime_2 = Module["_emscripten_bind_CvrWasm_SetDuplicateForgetTime_2"] = createExportWrapper("emscripten_bind_CvrWasm_SetDuplicateForgetTime_2");

var _emscripten_bind_CvrWasm_GetDuplicateForgetTime_1 = Module["_emscripten_bind_CvrWasm_GetDuplicateForgetTime_1"] = createExportWrapper("emscripten_bind_CvrWasm_GetDuplicateForgetTime_1");

var _emscripten_bind_CvrWasm_GetMaxBufferedItems_0 = Module["_emscripten_bind_CvrWasm_GetMaxBufferedItems_0"] = createExportWrapper("emscripten_bind_CvrWasm_GetMaxBufferedItems_0");

var _emscripten_bind_CvrWasm_IsResultUnitTypeObserved_1 = Module["_emscripten_bind_CvrWasm_IsResultUnitTypeObserved_1"] = createExportWrapper("emscripten_bind_CvrWasm_IsResultUnitTypeObserved_1");

var _emscripten_bind_CvrWasm_IsTaskObserved_1 = Module["_emscripten_bind_CvrWasm_IsTaskObserved_1"] = createExportWrapper("emscripten_bind_CvrWasm_IsTaskObserved_1");

var _emscripten_bind_CvrWasm_SetObservedResultUnitTypes_1 = Module["_emscripten_bind_CvrWasm_SetObservedResultUnitTypes_1"] = createExportWrapper("emscripten_bind_CvrWasm_SetObservedResultUnitTypes_1");

var _emscripten_bind_CvrWasm_AddObservedTask_1 = Module["_emscripten_bind_CvrWasm_AddObservedTask_1"] = createExportWrapper("emscripten_bind_CvrWasm_AddObservedTask_1");

var _emscripten_bind_CvrWasm_RemoveObservedTask_1 = Module["_emscripten_bind_CvrWasm_RemoveObservedTask_1"] = createExportWrapper("emscripten_bind_CvrWasm_RemoveObservedTask_1");

var _emscripten_bind_CvrWasm_SetCrrRegistry_1 = Module["_emscripten_bind_CvrWasm_SetCrrRegistry_1"] = createExportWrapper("emscripten_bind_CvrWasm_SetCrrRegistry_1");

var _emscripten_bind_CvrWasm_SetIrrRegistry_1 = Module["_emscripten_bind_CvrWasm_SetIrrRegistry_1"] = createExportWrapper("emscripten_bind_CvrWasm_SetIrrRegistry_1");

var _emscripten_bind_CvrWasm_ClearVerifyList_0 = Module["_emscripten_bind_CvrWasm_ClearVerifyList_0"] = createExportWrapper("emscripten_bind_CvrWasm_ClearVerifyList_0");

var __ZN22DocumentNormalizerWasm12DdnWasmClass15clearVerifyListEv = Module["__ZN22DocumentNormalizerWasm12DdnWasmClass15clearVerifyListEv"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClass15clearVerifyListEv");

var __ZN19LabelRecognizerWasm12DlrWasmClass15clearVerifyListEv = Module["__ZN19LabelRecognizerWasm12DlrWasmClass15clearVerifyListEv"] = createExportWrapper("_ZN19LabelRecognizerWasm12DlrWasmClass15clearVerifyListEv");

var _emscripten_bind_CvrWasm_SetMaxBufferedItems_1 = Module["_emscripten_bind_CvrWasm_SetMaxBufferedItems_1"] = createExportWrapper("emscripten_bind_CvrWasm_SetMaxBufferedItems_1");

var _emscripten_bind_CvrWasm_CaptureConsume_3 = Module["_emscripten_bind_CvrWasm_CaptureConsume_3"] = createExportWrapper("emscripten_bind_CvrWasm_CaptureConsume_3");

var _emscripten_bind_CvrWasm___destroy___0 = Module["_emscripten_bind_CvrWasm___destroy___0"] = createExportWrapper("emscripten_bind_CvrWasm___destroy___0");

var _emscripten_bind_DdnWasm_0 = Module["_emscripten_bind_DdnWasm_0"] = createExportWrapper("emscripten_bind_DdnWasm_0");

var _emscripten_bind_DbrWasm_0 = Module["_emscripten_bind_DbrWasm_0"] = createExportWrapper("emscripten_bind_DbrWasm_0");

var _emscripten_bind_DlrWasm_0 = Module["_emscripten_bind_DlrWasm_0"] = createExportWrapper("emscripten_bind_DlrWasm_0");

var __ZN22DocumentNormalizerWasm37getJvFromEnhancedImageResultItem_JustEPKN9dynamsoft3ddn24CEnhancedImageResultItemE = Module["__ZN22DocumentNormalizerWasm37getJvFromEnhancedImageResultItem_JustEPKN9dynamsoft3ddn24CEnhancedImageResultItemE"] = createExportWrapper("_ZN22DocumentNormalizerWasm37getJvFromEnhancedImageResultItem_JustEPKN9dynamsoft3ddn24CEnhancedImageResultItemE");

var __ZN22DocumentNormalizerWasm12DdnWasmClassC2Ev = Module["__ZN22DocumentNormalizerWasm12DdnWasmClassC2Ev"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClassC2Ev");

var __ZN22DocumentNormalizerWasm12DdnWasmClass17setThresholdValueEfii = Module["__ZN22DocumentNormalizerWasm12DdnWasmClass17setThresholdValueEfii"] = createExportWrapper("_ZN22DocumentNormalizerWasm12DdnWasmClass17setThresholdValueEfii");

var _emscripten_bind_DdnWasm_setThresholdValue_3 = Module["_emscripten_bind_DdnWasm_setThresholdValue_3"] = createExportWrapper("emscripten_bind_DdnWasm_setThresholdValue_3");

var __ZN14CodeParserWasm20appendResourceBufferEPKcS1_iS1_i = Module["__ZN14CodeParserWasm20appendResourceBufferEPKcS1_iS1_i"] = createExportWrapper("_ZN14CodeParserWasm20appendResourceBufferEPKcS1_iS1_i");

var __ZN14CodeParserWasm25getMapNameBySpecificationEPKci = Module["__ZN14CodeParserWasm25getMapNameBySpecificationEPKci"] = createExportWrapper("_ZN14CodeParserWasm25getMapNameBySpecificationEPKci");

var _emscripten_bind_DcpWasm_CreateInstance_0 = Module["_emscripten_bind_DcpWasm_CreateInstance_0"] = createExportWrapper("emscripten_bind_DcpWasm_CreateInstance_0");

var _emscripten_bind_DcpWasm___destroy___0 = Module["_emscripten_bind_DcpWasm___destroy___0"] = createExportWrapper("emscripten_bind_DcpWasm___destroy___0");

var _emscripten_bind_DcpWasm_InitSettings_1 = Module["_emscripten_bind_DcpWasm_InitSettings_1"] = createExportWrapper("emscripten_bind_DcpWasm_InitSettings_1");

var _emscripten_bind_DcpWasm_ResetSettings_0 = Module["_emscripten_bind_DcpWasm_ResetSettings_0"] = createExportWrapper("emscripten_bind_DcpWasm_ResetSettings_0");

var _emscripten_bind_DcpWasm_Parse_3 = Module["_emscripten_bind_DcpWasm_Parse_3"] = createExportWrapper("emscripten_bind_DcpWasm_Parse_3");

var _emscripten_bind_DcpWasm_AppendResourceBuffer_5 = Module["_emscripten_bind_DcpWasm_AppendResourceBuffer_5"] = createExportWrapper("emscripten_bind_DcpWasm_AppendResourceBuffer_5");

var _emscripten_bind_DcpWasm_GetMapNameBySpecification_2 = Module["_emscripten_bind_DcpWasm_GetMapNameBySpecification_2"] = createExportWrapper("emscripten_bind_DcpWasm_GetMapNameBySpecification_2");

var __ZN19LabelRecognizerWasm12DlrWasmClassC2Ev = Module["__ZN19LabelRecognizerWasm12DlrWasmClassC2Ev"] = createExportWrapper("_ZN19LabelRecognizerWasm12DlrWasmClassC2Ev");

var __ZN19LabelRecognizerWasm12DlrWasmClass16isSameResultTextENSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEES7_ = Module["__ZN19LabelRecognizerWasm12DlrWasmClass16isSameResultTextENSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEES7_"] = createExportWrapper("_ZN19LabelRecognizerWasm12DlrWasmClass16isSameResultTextENSt3__212basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEES7_");

var _emscripten_bind_DlrWasm_AppendConfusableCharactersBuffer_3 = Module["_emscripten_bind_DlrWasm_AppendConfusableCharactersBuffer_3"] = createExportWrapper("emscripten_bind_DlrWasm_AppendConfusableCharactersBuffer_3");

var _emscripten_bind_DlrWasm_AppendOverLappingCharactersBuffer_3 = Module["_emscripten_bind_DlrWasm_AppendOverLappingCharactersBuffer_3"] = createExportWrapper("emscripten_bind_DlrWasm_AppendOverLappingCharactersBuffer_3");

var _CVR_LoadDynamicDlls = Module["_CVR_LoadDynamicDlls"] = createExportWrapper("CVR_LoadDynamicDlls");

var _htons = createExportWrapper("htons");

var _emscripten_builtin_memalign = createExportWrapper("emscripten_builtin_memalign");

var _ntohs = createExportWrapper("ntohs");

var _setThrew = createExportWrapper("setThrew");

var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports["emscripten_stack_init"])();

var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"])();

var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"])();

var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();

var stackSave = createExportWrapper("stackSave");

var stackRestore = createExportWrapper("stackRestore");

var stackAlloc = createExportWrapper("stackAlloc");

var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();

var ___cxa_decrement_exception_refcount = createExportWrapper("__cxa_decrement_exception_refcount");

var ___cxa_increment_exception_refcount = createExportWrapper("__cxa_increment_exception_refcount");

var ___get_exception_message = Module["___get_exception_message"] = createExportWrapper("__get_exception_message");

var ___cxa_can_catch = createExportWrapper("__cxa_can_catch");

var ___cxa_is_pointer_type = createExportWrapper("__cxa_is_pointer_type");

var dynCall_iij = Module["dynCall_iij"] = createExportWrapper("dynCall_iij");

var dynCall_iiiiiji = Module["dynCall_iiiiiji"] = createExportWrapper("dynCall_iiiiiji");

var dynCall_ji = Module["dynCall_ji"] = createExportWrapper("dynCall_ji");

var dynCall_iiji = Module["dynCall_iiji"] = createExportWrapper("dynCall_iiji");

var dynCall_iiiijii = Module["dynCall_iiiijii"] = createExportWrapper("dynCall_iiiijii");

var dynCall_viijj = Module["dynCall_viijj"] = createExportWrapper("dynCall_viijj");

var dynCall_vij = Module["dynCall_vij"] = createExportWrapper("dynCall_vij");

var dynCall_iiiiiijiiii = Module["dynCall_iiiiiijiiii"] = createExportWrapper("dynCall_iiiiiijiiii");

var dynCall_viiiiiijiii = Module["dynCall_viiiiiijiii"] = createExportWrapper("dynCall_viiiiiijiii");

var dynCall_viiiiijiiiii = Module["dynCall_viiiiijiiiii"] = createExportWrapper("dynCall_viiiiijiiiii");

var dynCall_iiiiiij = Module["dynCall_iiiiiij"] = createExportWrapper("dynCall_iiiiiij");

var dynCall_viji = Module["dynCall_viji"] = createExportWrapper("dynCall_viji");

var dynCall_iiiiiijii = Module["dynCall_iiiiiijii"] = createExportWrapper("dynCall_iiiiiijii");

var dynCall_iiiiji = Module["dynCall_iiiiji"] = createExportWrapper("dynCall_iiiiji");

var dynCall_iji = Module["dynCall_iji"] = createExportWrapper("dynCall_iji");

var dynCall_viiiijj = Module["dynCall_viiiijj"] = createExportWrapper("dynCall_viiiijj");

var dynCall_viiiijii = Module["dynCall_viiiijii"] = createExportWrapper("dynCall_viiiijii");

var dynCall_viiij = Module["dynCall_viiij"] = createExportWrapper("dynCall_viiij");

var dynCall_iiiij = Module["dynCall_iiiij"] = createExportWrapper("dynCall_iiiij");

var dynCall_viiiij = Module["dynCall_viiiij"] = createExportWrapper("dynCall_viiiij");

var dynCall_iiiijiiii = Module["dynCall_iiiijiiii"] = createExportWrapper("dynCall_iiiijiiii");

var dynCall_iiiiiiiiiijii = Module["dynCall_iiiiiiiiiijii"] = createExportWrapper("dynCall_iiiiiiiiiijii");

var dynCall_iiiiiiiiiji = Module["dynCall_iiiiiiiiiji"] = createExportWrapper("dynCall_iiiiiiiiiji");

var dynCall_iiiiiiijifiiiii = Module["dynCall_iiiiiiijifiiiii"] = createExportWrapper("dynCall_iiiiiiijifiiiii");

var dynCall_iiiiiiffijifiiiii = Module["dynCall_iiiiiiffijifiiiii"] = createExportWrapper("dynCall_iiiiiiffijifiiiii");

var dynCall_viiiiifiji = Module["dynCall_viiiiifiji"] = createExportWrapper("dynCall_viiiiifiji");

var dynCall_iiiiiijiiiii = Module["dynCall_iiiiiijiiiii"] = createExportWrapper("dynCall_iiiiiijiiiii");

var dynCall_viiiiiiiiijiii = Module["dynCall_viiiiiiiiijiii"] = createExportWrapper("dynCall_viiiiiiiiijiii");

var dynCall_fiifiiji = Module["dynCall_fiifiiji"] = createExportWrapper("dynCall_fiifiiji");

var dynCall_iiiji = Module["dynCall_iiiji"] = createExportWrapper("dynCall_iiiji");

var dynCall_iiiiiiffijifii = Module["dynCall_iiiiiiffijifii"] = createExportWrapper("dynCall_iiiiiiffijifii");

var dynCall_iiiiiiji = Module["dynCall_iiiiiiji"] = createExportWrapper("dynCall_iiiiiiji");

var dynCall_iiiifijii = Module["dynCall_iiiifijii"] = createExportWrapper("dynCall_iiiifijii");

var dynCall_iiiiiffifjiiii = Module["dynCall_iiiiiffifjiiii"] = createExportWrapper("dynCall_iiiiiffifjiiii");

var dynCall_viiifjii = Module["dynCall_viiifjii"] = createExportWrapper("dynCall_viiifjii");

var dynCall_viiiiiiji = Module["dynCall_viiiiiiji"] = createExportWrapper("dynCall_viiiiiiji");

var dynCall_iiiiiiiiiiiiji = Module["dynCall_iiiiiiiiiiiiji"] = createExportWrapper("dynCall_iiiiiiiiiiiiji");

var dynCall_viiiiiiiiiiiji = Module["dynCall_viiiiiiiiiiiji"] = createExportWrapper("dynCall_viiiiiiiiiiiji");

var dynCall_iiiiij = Module["dynCall_iiiiij"] = createExportWrapper("dynCall_iiiiij");

var dynCall_viiiji = Module["dynCall_viiiji"] = createExportWrapper("dynCall_viiiji");

var dynCall_viiiiiiiiiiiiiijiiifi = Module["dynCall_viiiiiiiiiiiiiijiiifi"] = createExportWrapper("dynCall_viiiiiiiiiiiiiijiiifi");

var dynCall_viiiiiji = Module["dynCall_viiiiiji"] = createExportWrapper("dynCall_viiiiiji");

var dynCall_viiiiiiij = Module["dynCall_viiiiiiij"] = createExportWrapper("dynCall_viiiiiiij");

var dynCall_iiiiiiijiiii = Module["dynCall_iiiiiiijiiii"] = createExportWrapper("dynCall_iiiiiiijiiii");

var dynCall_ij = Module["dynCall_ij"] = createExportWrapper("dynCall_ij");

var dynCall_vji = Module["dynCall_vji"] = createExportWrapper("dynCall_vji");

var dynCall_iiiiiiiijiii = Module["dynCall_iiiiiiiijiii"] = createExportWrapper("dynCall_iiiiiiiijiii");

var dynCall_iiijii = Module["dynCall_iiijii"] = createExportWrapper("dynCall_iiijii");

var dynCall_viijiiii = Module["dynCall_viijiiii"] = createExportWrapper("dynCall_viijiiii");

var dynCall_vjii = Module["dynCall_vjii"] = createExportWrapper("dynCall_vjii");

var dynCall_viijiii = Module["dynCall_viijiii"] = createExportWrapper("dynCall_viijiii");

var dynCall_viiiiij = Module["dynCall_viiiiij"] = createExportWrapper("dynCall_viiiiij");

var dynCall_jij = Module["dynCall_jij"] = createExportWrapper("dynCall_jij");

var dynCall_viij = Module["dynCall_viij"] = createExportWrapper("dynCall_viij");

var dynCall_jii = Module["dynCall_jii"] = createExportWrapper("dynCall_jii");

var dynCall_jiii = Module["dynCall_jiii"] = createExportWrapper("dynCall_jiii");

var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");

var dynCall_jiij = Module["dynCall_jiij"] = createExportWrapper("dynCall_jiij");

var dynCall_iijiiiiiii = Module["dynCall_iijiiiiiii"] = createExportWrapper("dynCall_iijiiiiiii");

var dynCall_iijiiiiiiii = Module["dynCall_iijiiiiiiii"] = createExportWrapper("dynCall_iijiiiiiiii");

var dynCall_j = Module["dynCall_j"] = createExportWrapper("dynCall_j");

var dynCall_iiij = Module["dynCall_iiij"] = createExportWrapper("dynCall_iiij");

var dynCall_viijii = Module["dynCall_viijii"] = createExportWrapper("dynCall_viijii");

var dynCall_jiiii = Module["dynCall_jiiii"] = createExportWrapper("dynCall_jiiii");

var dynCall_iiiiijj = Module["dynCall_iiiiijj"] = createExportWrapper("dynCall_iiiiijj");

var dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = createExportWrapper("dynCall_iiiiiijj");

var dynCall_viiijii = Module["dynCall_viiijii"] = createExportWrapper("dynCall_viiijii");

var dynCall_viijiiiiiiiiii = Module["dynCall_viijiiiiiiiiii"] = createExportWrapper("dynCall_viijiiiiiiiiii");

var dynCall_jfi = Module["dynCall_jfi"] = createExportWrapper("dynCall_jfi");

function invoke_viii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iii(index, a1, a2) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vi(index, a1) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_ii(index, a1) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vii(index, a1, a2) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiidii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fii(index, a1, a2) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiifiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fi(index, a1) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_i(index) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)();
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iif(index, a1, a2) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiifiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_v(index) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)();
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiddi(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiidiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiif(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiif(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viidii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vif(index, a1, a2) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_dii(index, a1, a2) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiifii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vidd(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iid(index, a1, a2) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiifi(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiif(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viidiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iifii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viffi(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiffii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiifi(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viif(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viifi(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiifiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiifiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiif(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vifi(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vifiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiif(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viidiiiidiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiifi(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiifi(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iffffff(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiffi(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiifi(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiif(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viid(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiff(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiifiiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiidd(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiifiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiffii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiifii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiifii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiffi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viifii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiifi(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiffiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiifii(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viifiiiiff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiiff(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vifff(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiif(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiifiifiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viidd(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiddd(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiifi(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vifiiiif(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiffffi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiif(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiif(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiffff(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiifi(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiifii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_diiiifi(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiid(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiffi(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiiiiififiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiiiiifif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiffii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiffii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiff(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vid(index, a1, a2) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiifffiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiif(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viifiif(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiifiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_di(index, a1) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiff(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiff(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiif(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiifiifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vifiiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiifiifffifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiffffif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viifiiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiffii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiff(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiffiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiifiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiifffiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiiifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiiiff(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iifff(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiffff(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiffiii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiifff(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiffi(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiffffiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiff(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiffif(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fif(index, a1, a2) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viff(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiifffii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiifffi(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiff(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiffii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vididdii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, a33, a34, a35, a36, a37, a38, a39, a40) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, a33, a34, a35, a36, a37, a38, a39, a40);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, a33, a34, a35, a36, a37, a38, a39) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, a33, a34, a35, a36, a37, a38, a39);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, a33, a34, a35, a36, a37, a38, a39, a40, a41) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, a33, a34, a35, a36, a37, a38, a39, a40, a41);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiid(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiddi(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiidi(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiid(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiddd(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_diii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiid(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viidiiiidii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiidd(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiffi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vifiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiififfiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21) {
 var sp = stackSave();
 try {
  getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiid(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iij(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return dynCall_iij(index, a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiji(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiji(index, a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiji(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return dynCall_iiji(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiijii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return dynCall_iiiijii(index, a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viijj(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  dynCall_viijj(index, a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vij(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  dynCall_vij(index, a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiijiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  dynCall_viiiiiijiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiijiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
 var sp = stackSave();
 try {
  dynCall_viiiiijiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_ji(index, a1) {
 var sp = stackSave();
 try {
  return dynCall_ji(index, a1);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiij(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiij(index, a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viji(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  dynCall_viji(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiji(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return dynCall_iiiiji(index, a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iji(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return dynCall_iji(index, a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiijj(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  dynCall_viiiijj(index, a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  dynCall_viiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiij(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  dynCall_viiij(index, a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiij(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return dynCall_iiiij(index, a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiij(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  dynCall_viiiij(index, a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return dynCall_iiiijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiijifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiijifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiffijifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiffijifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiifiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
 var sp = stackSave();
 try {
  dynCall_viiiiifiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiijiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiijiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiijiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
 var sp = stackSave();
 try {
  dynCall_viiiiiiiiijiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_fiifiiji(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  return dynCall_fiifiiji(index, a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiji(index, a1, a2, a3, a4, a5) {
 var sp = stackSave();
 try {
  return dynCall_iiiji(index, a1, a2, a3, a4, a5);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiffijifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiffijifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiifijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  return dynCall_iiiifijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiffifjiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiffifjiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiifjii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  dynCall_viiifjii(index, a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  dynCall_viiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiiiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
 var sp = stackSave();
 try {
  dynCall_viiiiiiiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiij(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return dynCall_iiiiij(index, a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiji(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  dynCall_viiiji(index, a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiiiiiiiiijiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21) {
 var sp = stackSave();
 try {
  dynCall_viiiiiiiiiiiiiijiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  dynCall_viiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiiiij(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
 var sp = stackSave();
 try {
  dynCall_viiiiiiij(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_ij(index, a1, a2) {
 var sp = stackSave();
 try {
  return dynCall_ij(index, a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vji(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  dynCall_vji(index, a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiiiiiiijiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
 var sp = stackSave();
 try {
  return dynCall_iiiiiiiijiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiijii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  return dynCall_iiijii(index, a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
 var sp = stackSave();
 try {
  dynCall_viijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_vjii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  dynCall_vjii(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viijiii(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  dynCall_viijiii(index, a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viiiiij(index, a1, a2, a3, a4, a5, a6, a7) {
 var sp = stackSave();
 try {
  dynCall_viiiiij(index, a1, a2, a3, a4, a5, a6, a7);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_jij(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return dynCall_jij(index, a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viij(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  dynCall_viij(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_jiii(index, a1, a2, a3) {
 var sp = stackSave();
 try {
  return dynCall_jiii(index, a1, a2, a3);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_viijii(index, a1, a2, a3, a4, a5, a6) {
 var sp = stackSave();
 try {
  dynCall_viijii(index, a1, a2, a3, a4, a5, a6);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iijiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
 var sp = stackSave();
 try {
  return dynCall_iijiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iijiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
 var sp = stackSave();
 try {
  return dynCall_iijiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_j(index) {
 var sp = stackSave();
 try {
  return dynCall_j(index);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_iiij(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return dynCall_iiij(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_jii(index, a1, a2) {
 var sp = stackSave();
 try {
  return dynCall_jii(index, a1, a2);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

function invoke_jiiii(index, a1, a2, a3, a4) {
 var sp = stackSave();
 try {
  return dynCall_jiiii(index, a1, a2, a3, a4);
 } catch (e) {
  stackRestore(sp);
  if (!(e instanceof EmscriptenEH)) throw e;
  _setThrew(1, 0);
 }
}

Module["addFunction"] = addFunction;

Module["stringToUTF8OnStack"] = stringToUTF8OnStack;

var missingLibrarySymbols = [ "writeI53ToI64", "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "readI53FromI64", "readI53FromU64", "writeSockaddr", "getHostByName", "convertPCtoSourceLocation", "runMainThreadEmAsm", "jstoi_s", "listenOnce", "autoResumeAudioContext", "dynCallLegacy", "getDynCaller", "dynCall", "handleException", "runtimeKeepalivePush", "runtimeKeepalivePop", "callUserCallback", "maybeExit", "safeSetTimeout", "asmjsMangle", "handleAllocatorInit", "HandleAllocator", "getNativeTypeSize", "STACK_SIZE", "STACK_ALIGN", "POINTER_SIZE", "ASSERTIONS", "getCFunc", "ccall", "cwrap", "removeFunction", "intArrayToString", "AsciiToString", "UTF16ToString", "stringToUTF16", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "registerKeyEventCallback", "maybeCStringToJsString", "findEventTarget", "findCanvasEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerMouseEventCallback", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "hideEverythingExceptGivenElement", "restoreHiddenElements", "setLetterbox", "softFullscreenResizeWebGLRenderTarget", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "registerPointerlockErrorEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "setCanvasElementSize", "getCanvasElementSize", "stackTrace", "checkWasiClock", "wasiRightsToMuslOFlags", "wasiOFlagsToMuslOFlags", "createDyncallWrapper", "setImmediateWrapped", "clearImmediateWrapped", "polyfillSetImmediate", "getPromise", "makePromise", "idsToPromises", "makePromiseCallback", "setMainLoop", "FS_unlink", "FS_mkdirTree", "_setNetworkCallback", "heapObjectForWebGLType", "heapAccessShiftForWebGLHeap", "webgl_enable_ANGLE_instanced_arrays", "webgl_enable_OES_vertex_array_object", "webgl_enable_WEBGL_draw_buffers", "webgl_enable_WEBGL_multi_draw", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "colorChannelsInGlTextureFormat", "emscriptenWebGLGetTexPixelData", "__glGenObject", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "__glGetActiveAttribOrUniform", "writeGLArray", "registerWebGlEventCallback", "runAndAbortIfError", "SDL_unicode", "SDL_ttfContext", "SDL_audio", "ALLOC_NORMAL", "ALLOC_STACK", "allocate", "writeStringToMemory", "writeAsciiToMemory" ];

missingLibrarySymbols.forEach(missingLibrarySymbol);

var unexportedSymbols = [ "run", "addOnPreRun", "addOnInit", "addOnPreMain", "addOnExit", "addOnPostRun", "addRunDependency", "removeRunDependency", "FS_createFolder", "FS_createPath", "FS_createLazyFile", "FS_createLink", "FS_createDevice", "FS_readFile", "out", "err", "callMain", "abort", "keepRuntimeAlive", "wasmMemory", "wasmExports", "stackAlloc", "stackSave", "stackRestore", "getTempRet0", "setTempRet0", "writeStackCookie", "checkStackCookie", "convertI32PairToI53", "convertI32PairToI53Checked", "convertU32PairToI53", "ptrToString", "zeroMemory", "exitJS", "getHeapMax", "growMemory", "ENV", "MONTH_DAYS_REGULAR", "MONTH_DAYS_LEAP", "MONTH_DAYS_REGULAR_CUMULATIVE", "MONTH_DAYS_LEAP_CUMULATIVE", "isLeapYear", "ydayFromDate", "arraySum", "addDays", "ERRNO_CODES", "ERRNO_MESSAGES", "setErrNo", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "DNS", "Protocols", "Sockets", "initRandomFill", "randomFill", "timers", "warnOnce", "getCallstack", "emscriptenLog", "UNWIND_CACHE", "readEmAsmArgsArray", "readEmAsmArgs", "runEmAsmFunction", "jstoi_q", "getExecutableName", "setWasmTableEntry", "getWasmTableEntry", "asyncLoad", "alignMemory", "mmapAlloc", "wasmTable", "uleb128Encode", "sigToWasmTypes", "generateFuncType", "convertJsFunctionToWasm", "freeTableIndexes", "functionsInTableMap", "getEmptyTableSlot", "updateTableMap", "getFunctionAddress", "reallyNegative", "unSign", "strLen", "reSign", "formatString", "setValue", "getValue", "PATH", "PATH_FS", "UTF8Decoder", "UTF8ArrayToString", "UTF8ToString", "stringToUTF8Array", "stringToUTF8", "lengthBytesUTF8", "intArrayFromString", "stringToAscii", "UTF16Decoder", "stringToNewUTF8", "writeArrayToMemory", "JSEvents", "specialHTMLTargets", "currentFullscreenStrategy", "restoreOldWindowedStyle", "demangle", "demangleAll", "jsStackTrace", "ExitStatus", "getEnvStrings", "doReadv", "doWritev", "promiseMap", "uncaughtExceptionCount", "exceptionLast", "exceptionCaught", "ExceptionInfo", "findMatchingCatch", "getExceptionMessageCommon", "incrementExceptionRefcount", "decrementExceptionRefcount", "getExceptionMessage", "Browser", "wget", "SYSCALLS", "getSocketFromFD", "getSocketAddress", "preloadPlugins", "FS_createPreloadedFile", "FS_modeStringToFlags", "FS_getMode", "FS_stdin_getChar_buffer", "FS_stdin_getChar", "FS", "FS_createDataFile", "MEMFS", "TTY", "PIPEFS", "SOCKFS", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "miniTempWebGLIntBuffers", "GL", "emscripten_webgl_power_preferences", "AL", "GLUT", "EGL", "GLEW", "IDBStore", "SDL", "SDL_gfx", "allocateUTF8", "allocateUTF8OnStack" ];

unexportedSymbols.forEach(unexportedRuntimeSymbol);

var calledRun;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function stackCheckInit() {
 _emscripten_stack_init();
 writeStackCookie();
}

function run() {
 if (runDependencies > 0) {
  return;
 }
 stackCheckInit();
 preRun();
 if (runDependencies > 0) {
  return;
 }
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  
  wasmExports.emscripten_bind_funcs(addFunction((a, b, c) => {
    return stringToUTF8OnStack(self[UTF8ToString(a)][UTF8ToString(b)]()[UTF8ToString(c)]())
  }, 'iiii'));
  wasmExports.emscripten_bind_funcs(addFunction((a, b, c) => {
    return stringToUTF8OnStack((new self[UTF8ToString(a)])[UTF8ToString(b)](UTF8ToString(c)))
  }, 'iiii'));
  wasmExports.emscripten_bind_funcs(addFunction((a, b, c, d) => {
    self[UTF8ToString(a)](null, UTF8ToString(b).trim(), UTF8ToString(c), d)
  }, 'viiii'));
  wasmExports.emscripten_bind_funcs(addFunction((a, b, c, d) => {
    return stringToUTF8OnStack(self[UTF8ToString(a)][UTF8ToString(b)][UTF8ToString(c)](UTF8ToString(d)) ? '' : self[UTF8ToString(a)][UTF8ToString(b)])
  }, 'iiiii'));

  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  
  assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
 checkStackCookie();
}

function checkUnflushedContent() {
 var oldOut = out;
 var oldErr = err;
 var has = false;
 out = err = x => {
  has = true;
 };
 try {
  _fflush(0);
  [ "stdout", "stderr" ].forEach(function(name) {
   var info = FS.analyzePath("/dev/" + name);
   if (!info) return;
   var stream = info.object;
   var rdev = stream.rdev;
   var tty = TTY.ttys[rdev];
   if (tty && tty.output && tty.output.length) {
    has = true;
   }
  });
 } catch (e) {}
 out = oldOut;
 err = oldErr;
 if (has) {
  warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
 }
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

run();
