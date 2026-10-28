# dwt npm 包缺陷报告

## 模块脚本（`type="module"`）加载下，脚本路径嗅探抛错并中断整个主 bundle

| 项目 | 内容 |
|---|---|
| 产品 | `dwt`（Dynamic Web TWAIN）npm 包 |
| 版本 | **19.4.4**（报告撰写时的 npm 最新版）。2026-10-27 发布的 19.5.0 仍保留同一段 `document.currentScript` 嗅探与"最后一个 `<script>`"回退，缺陷未修复 |
| 涉及文件 | `dist/dynamsoft.webtwain.min.mjs`（ESM 构建）<br>`dist/dynamsoft.webtwain.min.js`（UMD 构建，存在同类代码） |
| 严重程度 | **高** —— 整个宿主 bundle 求值中断，应用完全无法启动（整页白屏）；表现为间歇性、极难排查 |
| 发现场景 | `angular-barcode-mrz-document-scanner`（<https://www.dynamsoft.com/codepool/demos/angular-barcode-mrz-document-scanner/>） |
| 报告日期 | 2026-10-13 |

**一句话结论**：`dynamsoft.webtwain.min.mjs` 在模块求值期执行一段"探测自身脚本路径"的代码；当宿主以 `type="module"` 加载时（Angular CLI 13+、Vite 等现代构建默认如此），按 HTML 规范 `document.currentScript` 恒为 `null`，该代码退化为"取文档中最后一个 `<script>` 元素"——只要该元素没有 `src`（GTM/营销标签、浏览器扩展等第三方追加的内联脚本，或任何无 src 的脚本），就在 `null.indexOf()` 处抛错并中断整个 bundle 求值。建议至少将空值接管为安全值，并按"三级回退"重写该探测（详见 §6）。

---

## 1. 问题现象

宿主应用（Angular 13 + webpack，以 `type="module"` 加载三个 bundle）在**首次打开**（冷缓存）时高概率出现：

```
Uncaught TypeError: Cannot read properties of null (reading 'indexOf')
    at main.af85e421ae81b86d.js:70167:16            ← dwt 路径嗅探代码
    at main.af85e421ae81b86d.js:70168:16
    at 7703 (main.af85e421ae81b86d.js:101534:4)     ← webpack 模块 7703 = node_modules/dwt/dist/dynamsoft.webtwain.min.mjs
    at __webpack_require__ (runtime.74f6a734c0304071.js:23:41)
    …（后续为 webpack 模块 require 调用链：路由模块 → 组件 → dwt）
```

异常发生在**模块求值阶段**（webpack 的 `__webpack_require__` 级联中），导致整个主 bundle 求值中断，Angular 从未启动 —— 控制台报错、页面空白。**刷新页面（缓存命中）后一切正常，且反复出现"首次崩、刷新好"的模式。**

该故障极具迷惑性：页面内容没有任何变化，只是加载时序不同，结果就不同。

## 2. 缺陷代码与使用位置

### 2.1 缺陷代码（`dwt@19.4.4 / dist/dynamsoft.webtwain.min.mjs`）

全文件唯一一处 `document.currentScript`（搜索该关键字即可定位）。原文为压缩形态，以下按逻辑换行便于阅读（语义与原文完全一致）：

```js
var vf = function () {
  var e = null;
  if (document.currentScript) e = document.currentScript;
  else {
    var t = document.getElementsByTagName("script");
    e = t[t.length - 1];                       // ← 无脑取"最后一个 <script>"
  }
  var r = e.getAttribute("src");               // ← 该元素可能没有 src 属性 → r = null
  return r.indexOf("?") > -1 && (r = r.substring(0, r.indexOf("?"))),
         r.lastIndexOf("/") > -1 && (r = r.substring(0, r.lastIndexOf("/"))),
         r;                                    // ← null.indexOf(...) → TypeError
}();
```

### 2.2 返回值的使用位置

同文件中，该值仅作为 `Dynamsoft.DWT.ResourcesPath` 的**默认值**：

```js
… ContainerMap:{}, WebTwainIdMap:{}, RemoteScanIdMap:{}, Trial:!1,
ResourcesPath: vf, ServiceInstallerLocation:undefined, …
```

也就是说：它只是一个"尽力而为"的默认路径探测 —— 算不准确可以容忍（集成方可通过 `Dynamsoft.DWT.ResourcesPath = …` 显式覆盖，npm 用法下通常都会设置），但**探测失败导致整个 bundle 崩掉不能容忍**。

## 3. 触发条件（三个条件叠加）

1. **模块脚本环境**：宿主以 `<script type="module">` 加载 bundle（Angular CLI 13+、Vite 等默认行为；webpack 产物被这么加载时同理）。按 HTML 规范，模块脚本执行期间 `document.currentScript` 恒为 `null`，代码**必然**进入 `else` 分支。
2. **"最后一个 `<script>`"没有 `src`**：页面生命周期内，任何第三方代码向 DOM 末尾追加过无 `src` 的 `<script>` 元素，例如：
   - 营销标签：GTM 容器 → HubSpot 等。实测线上 Demo 冷加载后的 DOM 中，HubSpot 加载器在 `<body>` 尾部追加了两个脚本，**最后一个正是无 `src` 的内联 `<script>`**；
   - 浏览器扩展注入的脚本；
   - 任何 `document.createElement('script')` + `appendChild()` 的内联脚本。
3. **时序（竞态）**：追加动作发生在 dwt 求值**之前**。dwt 在 bundle 求值期被同步执行；而 bundle 的求值时刻 = 其完成**下载**之后。冷加载（无缓存）时主包体积为数 MB、下载需要数秒，脆弱窗口很宽；命中缓存时窗口只有百毫秒级。

**为什么"刷新就好了"**：刷新并未改变页面内容，只改变了时序 —— 缓存命中后 bundle 在约 0.2s 内完成求值，而营销标签链（加载 gtm.js → 触发标签 → 追加脚本）需要更久，追加必定"迟到"；冷加载时则相反，追加大概率落在窗口内。因此表现为间歇性：**首次访问 / 部署后 / 新访客高概率触发；刷新（缓存）大概率正常。**

## 4. 确定性复现（最小步骤）

不需要真实营销标签，用一个定时器即可模拟条件 2，并人为拖慢主包到达来模拟冷加载：

1. 准备一个以 `type="module"` 加载、且内部打包了 `dwt/dist/dynamsoft.webtwain.min.mjs` 的宿主页面（任意 webpack/Vite/Angular 宿主均可）；
2. 在页面 `<head>` 中加入：`setTimeout(() => { const s = document.createElement('script'); s.text = ''; document.body.appendChild(s); }, 4000);` —— 模拟"第 4 秒第三方注入一个无 src 脚本"；
3. 用本地服务器对该主包文件**延迟 12 秒返回**（模拟冷加载的下载耗时，也可用浏览器 DevTools 的慢速网络节流）；
4. 打开页面。

预期结果：控制台出现 `Cannot read properties of null (reading 'indexOf')`，指向 dwt 嗅探代码所在行；宿主应用不启动（整页空白）。

**对照实验（本地无头 Chrome，其余条件完全相同）**：

| 实验 | 主 bundle 到达 | 注入（第 4 秒）落在 | 结果 |
|---|---|---|---|
| A | 延迟 12 秒（模拟冷加载） | 求值**之前** | ❌ 复现崩溃，应用白屏 |
| B | 即时（模拟命中缓存） | 求值**之后** | ✅ 正常 |
| C | 对照：不做任何注入 | — | ✅ 正常 |
| D | 延迟 12 秒 + §6.1 最小补丁 | 求值**之前** | ✅ 正常（补丁有效，应用完整渲染） |

> 复现提示：模拟注入的那段 `setTimeout` 脚本本身必须放在主 bundle 的 `<script>` 标签**之前**（如 `<head>` 中）。若把无 src 的内联脚本直接写在 bundle 标签之后，它一解析就会成为"最后一个 script"，导致不带时序控制的恒定复现（也可以用来做最简复现，但无法演示"冷/热差异"）。

## 5. 影响面

- **受影响**：所有以 module 方式加载/打包 dwt 的宿主 —— `import Dynamsoft from 'dwt'` 的 Angular/Vite/webpack 项目，以及直接 `<script type="module" src="…/dynamsoft.webtwain.min.mjs">` 的页面。满足时序条件时，**宿主应用整体无法启动**。
- **不受影响**：经典脚本加载（传统 `<script src="dynamsoft.webtwain.min.js">`）—— 此时 `document.currentScript` 正常返回自身元素。
- **排查难度**：故障随缓存状态、网络速度、第三方注入时机漂移，容易被误判为"偶发网络问题"。

## 6. 修复建议（SDK 侧）

### 6.1 最小修复（必须，建议尽快并入）

在读取 `src` 处接管空值，保证任何情况下不抛错：

```js
var r = (e && e.getAttribute("src")) || "";
```

（已验证：仅此一处改动，"延迟 12 秒 + 注入"的最坏时序下不再崩溃，宿主应用正常启动。）

### 6.2 推荐修复（重写探测逻辑：三级回退）

按优先级选择路径来源，并保证整段永不抛错：

```js
var vf = function () {
  // ① ESM 构建首选：模块自身 URL（不依赖 DOM；打包器会正确转换 import.meta.url）
  try {
    return new URL(".", import.meta.url).href.replace(/\/$/, "");
  } catch (e) {}
  // ② 回退：从后往前找第一个"带 src"的 <script>（跳过内联/注入脚本），
  //    返回值与原逻辑保持一致（去掉 query/hash 与文件名）
  try {
    var t = document.getElementsByTagName("script");
    for (var i = t.length - 1; i >= 0; i--) {
      var r = t[i].getAttribute("src");
      if (r) return r.replace(/[?#].*$/, "").replace(/\/[^/]*$/, "");
    }
  } catch (e) {}
  // ③ 兜底：返回值可退化为 ""，但绝不抛错
  return "";
}();
```

说明：

- `import.meta` 语法仅适用于 `.mjs`（ESM）构建；UMD 的 `.js` 构建保留脚本扫描回退即可，但两处**都必须有 ③ 的 try/catch 兜底与空值接管**；
- 最坏情况返回空串是可接受的：`ResourcesPath` 本来就允许集成方显式配置；"探测失败"只应导致默认路径退化，不应导致进程级崩溃。

### 6.3 后续增强（可选）

- 把探测从 **import 时求值** 改为 **首次 `DWT.Load()` 时惰性求值**，进一步缩小故障面；
- 整段探测包 `try/catch`，任何环境异常都不影响模块加载；
- 文档中明确：npm / 打包场景推荐显式设置 `Dynamsoft.DWT.ResourcesPath`，探测仅作兜底。

## 7. 宿主侧规避（已上线，供修复期间的参考）

在 SDK 修复发布前，宿主可用"将 bundle 改为经典 defer 脚本加载"完全规避该问题（`document.currentScript` 恢复为正常可用，嗅探不再进入脆弱分支，且资源路径结果更准确）：

- 本仓库（`angular-barcode-mrz-document-scanner`）的 `scripts/fix-demo-index.js`：构建后自动将 CLI 注入的 `type="module"` 标签改写为经典 `defer`（含防呆校验：残留 `type="module"` 或产物含 `import.meta` 时构建失败）；
- Codepool 在线 Demo 已按此修复并验证（codepool 仓库提交 `b1e8763`，2026-10-13；冷加载实测：页面正常启动、控制台无报错，即使营销标签照常注入脚本）。

## 8. 证据材料

- 线上故障栈：`main.af85e421ae81b86d.js:70167:16`；该文件为宿主主包，其中 webpack 模块 `7703` 即 `node_modules/dwt/dist/dynamsoft.webtwain.min.mjs`（webpack 注释可查证）；
- 缺陷定位：两处 dist 文件中搜索 `currentScript` 均为**全文件唯一命中**；
- 本地确定性复现与对照实验（A/B/C/D，见 §4）：无头 Chrome + 本地服务器（对主包延迟返回）+ 定时注入脚本；
- 线上页面冷加载 DOM 中确认存在第三方（HubSpot）追加的无 `src` 内联脚本，与 §3 条件 2 吻合。

---

*本报告基于 `dwt@19.4.4`；19.5.0 的 `dist/dynamsoft.webtwain.min.js` 仍包含相同的嗅探逻辑。复现与验证均可按 §4 独立完成，无需宿主业务代码。*
