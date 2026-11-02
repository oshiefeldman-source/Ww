// Renders the reel cover (1080x1920 @2x) and a 4:5 grid crop. usage: node cover.js <fonts dir>
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const F = process.argv[2], D = __dirname;
const ff = (pkg, file) => path.join(F, fs.readdirSync(F).find(x => x.includes(pkg) && !x.endsWith('.tgz')), 'package/files', file);
const font = (fam, w, file) => `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(file).toString('base64')}) format("woff2")}`;
const css = [700, 800].map(w => font('Bricolage Grotesque', w, ff('bricolage', `bricolage-grotesque-latin-${w}-normal.woff2`))).join('') + font('IBM Plex Mono', 500, ff('plex', 'ibm-plex-mono-latin-500-normal.woff2'));
const img = (fs.readFileSync(D + '/portraits.js', 'utf8').match(/"(data:[^"]+)"/) || [])[1];
const html = `<!doctype html><meta charset="utf-8"><style>${css}
*{box-sizing:border-box} body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#100c0a;font-family:"Bricolage Grotesque",sans-serif;color:#f4efe8;position:relative}
.bg{position:absolute;left:0;right:0;top:40px;height:1188px;background:url(${img}) center top/cover}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,#100c0a 0%,rgba(16,12,10,.0) 13%,rgba(16,12,10,0) 44%,rgba(16,12,10,.75) 56%,#100c0a 66%,#100c0a 100%)}
.glow{position:absolute;left:-200px;right:-200px;top:980px;height:500px;background:radial-gradient(50% 50% at 50% 50%,rgba(243,108,33,.28),rgba(243,108,33,0))}
.tag{position:absolute;left:84px;top:330px;font:500 30px "IBM Plex Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:#f4efe8;background:rgba(16,12,10,.75);border:3px solid #f36c21;border-radius:99px;padding:10px 26px}
.tag.ai{top:400px;font-size:24px;padding:8px 20px;border-color:rgba(244,239,232,.45)}
.wrap{position:absolute;left:84px;right:84px;top:1110px}
h1{margin:0;font-weight:800;font-size:134px;line-height:.9;letter-spacing:-.045em;text-shadow:0 8px 40px rgba(0,0,0,.6)}
h1 em{font-style:normal;color:#f36c21}
.stats{display:flex;gap:18px;margin-top:40px}
.stats div{flex:1;border-top:6px solid #f36c21;padding-top:14px}
.stats b{display:block;font-weight:800;font-size:76px;line-height:1;letter-spacing:-.03em}
.stats span{display:block;font:500 24px "IBM Plex Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:#b8ab9f;margin-top:8px}
.foot{position:absolute;left:84px;right:84px;bottom:150px;display:flex;justify-content:space-between;font:500 28px "IBM Plex Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#b8ab9f}
</style><div class="bg"></div><div class="glow"></div><div class="shade"></div>
<div class="tag">The path, by the numbers</div><div class="tag ai">AI caricature</div>
<div class="wrap"><h1>Could Hanson<br>become <em>PM?</em></h1>
<div class="stats"><div><b>28%</b><span>in the polls</span></div><div><b>2/150</b><span>House seats</span></div><div><b>76</b><span>to win</span></div></div></div>
<div class="foot"><span style="text-transform:none;letter-spacing:.06em;color:#f4efe8">@osherfeldman</span><span>Sources in reel</span></div>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: D + '/cover.png' });
  await p.screenshot({ path: D + '/cover-grid-4x5.png', clip: { x: 0, y: 285, width: 1080, height: 1350 } });
  await b.close();
})();
