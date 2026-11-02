const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const S = process.argv[2], F = S + '/fonts';
const glob = (d, f) => path.join(F, fs.readdirSync(F).find(x => x.includes(d)), 'package/files', f);
const font = (fam, w, file) => `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(file).toString('base64')}) format("woff2")}`;
const css = [700,800].map(w => font('Bricolage Grotesque', w, glob('bricolage', `bricolage-grotesque-latin-${w}-normal.woff2`))).join('') + font('IBM Plex Mono', 500, glob('plex', 'ibm-plex-mono-latin-500-normal.woff2'));
const bg = 'data:image/png;base64,' + fs.readFileSync(S + '/bg_coins.png').toString('base64');
const html = `<!doctype html><meta charset="utf-8"><style>${css}
*{box-sizing:border-box} body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#0b1410;font-family:"Bricolage Grotesque",sans-serif;color:#f2efe6}
.bg{position:absolute;inset:0;background:url(${bg}) center/cover;transform:scale(1.12) translateY(140px);filter:saturate(1.1)}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,#0b1410 0%,rgba(11,20,16,.96) 26%,rgba(11,20,16,.55) 52%,rgba(11,20,16,0) 68%,rgba(11,20,16,0) 86%,rgba(11,20,16,.85) 100%)}
.wrap{position:absolute;left:84px;right:84px;top:300px}
.tag{display:inline-block;font:500 34px "IBM Plex Mono",monospace;letter-spacing:.16em;color:#e3b54a;border:3px solid #e3b54a;border-radius:99px;padding:12px 30px;text-transform:uppercase}
.row{display:flex;align-items:flex-end;gap:28px;margin-top:22px}
.five{font-weight:800;font-size:520px;line-height:.74;color:#e3b54a;letter-spacing:-.06em;text-shadow:0 20px 60px rgba(0,0,0,.5)}
.ways{font-weight:800;font-size:128px;line-height:.86;letter-spacing:-.03em;padding-bottom:10px}
h1{margin:34px 0 0;font-weight:800;font-size:104px;line-height:.92;letter-spacing:-.03em;text-shadow:0 6px 30px rgba(0,0,0,.6)}
h1 em{font-style:normal;color:#e3b54a}
.hk{font-size:150px;line-height:.92;margin:0;letter-spacing:-.04em}.wrap .tag{margin-bottom:34px}.hk.r{color:#ff6b5e}.rr{font-weight:800;font-size:150px;line-height:.9;letter-spacing:-.03em;margin-top:30px;text-transform:uppercase}.rate{font-weight:800;font-size:282px;line-height:.82;letter-spacing:-.06em;color:#ff4a3a;text-shadow:0 20px 70px rgba(255,60,40,.35)}.rate span{color:#ff8a7e}.fp{font-weight:800;font-size:84px;line-height:.98;letter-spacing:-.03em;margin-top:34px;max-width:900px}.fp em{font-style:normal;color:#e3b54a}.any{font-weight:800;font-size:196px;line-height:.86;letter-spacing:-.05em;color:#ff4a3a;margin-top:30px;text-transform:uppercase;text-shadow:0 20px 70px rgba(255,60,40,.3)}.five-r{display:inline-block;margin-top:34px;font-weight:800;font-size:58px;color:#0b1410;background:#e3b54a;border-radius:20px;padding:8px 32px 14px}
.foot{position:absolute;left:84px;right:84px;bottom:300px;display:flex;justify-content:space-between;font:500 30px "IBM Plex Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#f2efe6}
.foot span{background:rgba(11,20,16,.75);padding:12px 20px;border-radius:10px}
</style><div class="bg"></div><div class="shade"></div>
<div class="wrap"><div class="tag">Rates at a 15-year high</div>
<div class="any">Any<br>rate hike</div>
<div class="fp">has <em>Labor's fingerprints</em> all over it.</div>
<div class="five-r">5 reasons →</div></div>
<div class="foot"><span style="text-transform:none;letter-spacing:.06em">@osherfeldman</span><span>Opinion</span></div>`;
fs.writeFileSync(S + '/cover.html', html);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + S + '/cover.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: '/home/user/Ww/rates/cover-any.png' }); await b.close();
})();
