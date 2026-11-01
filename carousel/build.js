const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const S = process.argv[2], OUT = '/home/user/Ww/carousel', F = S + '/fonts';
const glob = (d, f) => path.join(F, fs.readdirSync(F).find(x => x.includes(d)), 'package/files', f);
const font = (fam, w, file) => `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(file).toString('base64')}) format("woff2")}`;
const css = [400,500,700,800].map(w => font('B', w, glob('bricolage', `bricolage-grotesque-latin-${w}-normal.woff2`))).join('') + [400,500].map(w => font('M', w, glob('plex', `ibm-plex-mono-latin-${w}-normal.woff2`))).join('');
const N = 7;
const chrome = (i, dark = true) => `<div class="hd"><span><i></i>Canberra explained</span><span class="h">@osherfeldman</span></div>
<div class="ft"><span>${i}/${N}</span><span>${i < N ? 'Swipe →' : 'Opinion · Sources: ABC News, SBS, PM\'s office · 1 Nov 2026'}</span></div>`;
const slides = [
// 1 cover: boarding pass
`<div class="s cover">${chrome(1)}
 <div class="kick">While you pay the bills</div>
 <h1>Albo's off to <em>the Caribbean.</em></h1>
 <div class="pass">
  <div class="pl"><div class="row"><div><small>Passenger</small><b>ALBANESE / ANTHONY MR</b></div></div>
   <div class="route"><div><big>CBR</big><small>Canberra</small></div><div class="plane">✈</div><div><big>ANU</big><small>Antigua</small></div></div>
   <div class="row g"><div><small>Departs</small><b>31 OCT</b></div><div><small>Returns</small><b>4 NOV</b></div><div><small>Event</small><b>CHOGM</b></div><div><small>Class</small><b>VIP</b></div></div></div>
  <div class="stub"><small>Seat</small><big>1A</big><div class="bars"></div></div>
 </div>
 <div class="note">Illustration</div></div>`,
// 2 where
`<div class="s">${chrome(2)}
 <div class="kick">The trip</div>
 <h2>Five days. <em>The other side of the world.</em></h2>
 <dl class="facts"><dt>Where</dt><dd>St John's, Antigua and Barbuda</dd><dt>What</dt><dd>The 28th Commonwealth Heads of Government Meeting</dd><dt>When</dt><dd>Travel 31 October – 4 November 2026</dd><dt>Who's there</dt><dd>King Charles, plus the UK and Canadian leaders</dd></dl></div>`,
// 3 agenda
`<div class="s">${chrome(3)}
 <div class="kick">On the agenda</div>
 <h2>Here's what he flew there to discuss</h2>
 <ul class="chips"><li>Climate change</li><li>Ocean preservation</li><li>Trade</li><li>Investment</li><li>Artificial intelligence</li><li class="hot">Reparations for colonialism</li></ul>
 <p class="punch">Now find the one that brings down <em>your power bill.</em></p></div>`,
// 4 why
`<div class="s">${chrome(4)}
 <div class="kick">His reason</div>
 <blockquote>He says he's going at the <em>personal request of King Charles.</em></blockquote>
 <p class="punch small">A prime minister who wants Australia to become a republic, flying across the world because the King asked him to.</p>
 <div class="side"><small>Also on his list</small><b>Lobbying for Australia's 2029–30 UN Security Council seat</b></div></div>`,
// 5 meanwhile
`<div class="s red">${chrome(5)}
 <div class="kick">Meanwhile, at home</div>
 <ul class="bills"><li><span>Rent</span><s></s></li><li><span>Groceries</span><s></s></li><li><span>Power</span><s></s></li><li><span>Mortgage</span><s></s></li></ul>
 <h2>Australians are doing the maths. <em>He's doing the Caribbean.</em></h2>
 <p class="src">The Coalition says he's "jetting off" while Australians struggle with the cost of living.</p></div>`,
// 6 labor reply
`<div class="s">${chrome(6)}
 <div class="kick">Labor's answer</div>
 <blockquote>Deputy PM Richard Marles called the criticism <em>unreasonable.</em></blockquote>
 <p class="punch">Tell that to the family choosing between <em>groceries and the power bill.</em></p></div>`,
// 7 cta
`<div class="s cta">${chrome(7)}
 <div class="kick">Your call</div>
 <h2>Should the PM be <em>at home</em> or on the world stage?</h2>
 <div class="vote"><div>🏠 <b>Stay home</b><small>Comment HOME</small></div><div>🌏 <b>Go global</b><small>Comment WORLD</small></div></div>
 <div class="follow"><span>Follow</span> @osherfeldman</div></div>`,
];
const style = `${css}
*{box-sizing:border-box}body{margin:0;background:#000}
:root{--f:#0b1410;--g:#173528;--ink:#f2efe6;--dim:#a9b8ae;--gold:#e3b54a;--red:#d8343a}
.s{position:relative;width:1080px;height:1350px;overflow:hidden;background:radial-gradient(120% 70% at 80% 0%,#1f4a36 0%,var(--f) 60%);color:var(--ink);font-family:B,sans-serif;padding:200px 96px 0;display:flex;flex-direction:column;gap:44px}
.s::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgba(227,181,74,.035) 0 2px,transparent 2px 46px);pointer-events:none}
.s.red{background:radial-gradient(120% 70% at 80% 0%,#4a1a1c 0%,var(--f) 62%)}
.hd,.ft{position:absolute;left:96px;right:96px;display:flex;justify-content:space-between;font:500 26px M,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--dim)}
.hd{top:72px}.ft{bottom:64px;font-size:22px;gap:40px;align-items:flex-end}.ft span:last-child{text-align:right;max-width:720px;line-height:1.5}.hd i{display:inline-block;width:18px;height:18px;border-radius:50%;background:var(--gold);margin-right:14px;vertical-align:-1px}
.hd .h{text-transform:none;letter-spacing:.06em;color:var(--ink)}
.kick{font:500 30px M,monospace;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.red .kick{color:#ff7a6e}
h1,h2{margin:0;font-weight:800;letter-spacing:-.03em;line-height:.92;text-wrap:balance}
h1{font-size:132px}h2{font-size:100px}
h1 em,h2 em,blockquote em,.punch em{font-style:normal;color:var(--gold)}
.red h2 em{color:#ff7a6e}
.pass{display:flex;background:var(--ink);color:var(--f);border-radius:28px;margin-top:10px;box-shadow:0 40px 80px rgba(0,0,0,.5);transform:rotate(-3deg);position:relative}
.pl{flex:1;padding:36px 40px;display:flex;flex-direction:column;gap:26px}
.pass small{display:block;font:500 18px M,monospace;letter-spacing:.14em;text-transform:uppercase;color:#5b6b61}
.pass b{font:700 30px M,monospace}
.route{display:flex;align-items:center;justify-content:space-between}
.route big{display:block;font:800 120px B,sans-serif;line-height:.85;letter-spacing:-.03em}
.plane{font-size:64px;color:var(--red)}
.row.g{display:grid;grid-template-columns:repeat(4,auto);justify-content:space-between;border-top:2px dashed #b9c2bb;padding-top:22px}
.stub{width:200px;border-left:3px dashed #b9c2bb;padding:36px 30px;display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.stub big{font:800 96px B,sans-serif;line-height:.9;color:var(--red)}
.bars{margin-top:auto;width:100%;height:120px;background:repeating-linear-gradient(90deg,var(--f) 0 4px,transparent 4px 7px,var(--f) 7px 9px,transparent 9px 14px)}
.note{font:400 20px M,monospace;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;margin-top:-10px}
.facts{display:grid;grid-template-columns:240px 1fr;gap:30px 30px;margin:20px 0 0;font-size:44px;line-height:1.15}
.facts dt{font:500 24px M,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);padding-top:12px}
.facts dd{margin:0;font-weight:500}
.facts dt,.facts dd{border-top:1px solid rgba(242,239,230,.18);padding-top:24px}
.chips{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:18px}
.chips li{font-size:46px;font-weight:700;border:2px solid rgba(242,239,230,.35);border-radius:99px;padding:14px 34px}
.chips li.hot{background:var(--gold);color:var(--f);border-color:var(--gold)}
.punch{margin:0;font-size:64px;font-weight:700;line-height:1.05;letter-spacing:-.02em;text-wrap:balance}
.punch.small{font-size:50px;font-weight:500;line-height:1.15;color:var(--ink)}
blockquote{margin:0;font-size:92px;font-weight:800;line-height:.98;letter-spacing:-.03em;padding-left:40px;border-left:10px solid var(--gold);text-wrap:balance}
.side{margin-top:auto;margin-bottom:170px;border-top:1px solid rgba(242,239,230,.2);padding-top:28px}
.side small{display:block;font:500 24px M,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin-bottom:10px}
.side b{font-size:44px;font-weight:700;line-height:1.15}
.bills{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:22px}
.bills li{position:relative;font-size:64px;font-weight:800;background:rgba(242,239,230,.06);border:2px solid rgba(255,122,110,.4);border-radius:22px;padding:26px 34px}
.bills s{position:absolute;right:30px;top:50%;width:46px;height:46px;margin-top:-23px;background:#ff7a6e;clip-path:polygon(50% 0,100% 60%,68% 60%,68% 100%,32% 100%,32% 60%,0 60%)}
.src{margin:0;font:400 28px M,monospace;color:var(--dim);line-height:1.5}
.vote{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.vote div{background:rgba(242,239,230,.07);border:2px solid rgba(242,239,230,.25);border-radius:28px;padding:40px 36px;font-size:64px}
.vote b{display:block;font-size:56px;margin-top:10px}.vote small{display:block;font:500 24px M,monospace;letter-spacing:.14em;color:var(--gold);margin-top:10px}
.follow{align-self:flex-start;font-size:68px;font-weight:800;color:var(--f);background:var(--gold);border-radius:24px;padding:12px 40px 20px;letter-spacing:-.02em}
.follow span{font-weight:500}
`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (let i = 0; i < slides.length; i++) {
    await p.setContent(`<!doctype html><meta charset="utf-8"><style>${style}</style>${slides[i]}`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    await p.locator('.s').screenshot({ path: `${OUT}/slide-${i + 1}.png` });
  }
  await b.close();
})();
