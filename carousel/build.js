const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const S = process.argv[2], OUT = '/home/user/Ww/carousel', F = S + '/fonts';
const glob = (d, f) => path.join(F, fs.readdirSync(F).find(x => x.includes(d)), 'package/files', f);
const font = (fam, w, file) => `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(file).toString('base64')}) format("woff2")}`;
const css = [400,500,700,800].map(w => font('B', w, glob('bricolage', `bricolage-grotesque-latin-${w}-normal.woff2`))).join('') + [400,500].map(w => font('M', w, glob('plex', `ibm-plex-mono-latin-${w}-normal.woff2`))).join('');
const N = 8;
const photo = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'photos/albanese-grin.jpg')).toString('base64');
const SRC = {1: "Source: ABC News, “Cricket, climate and colonialism on agenda as Commonwealth leaders meet in Caribbean”, 1 Nov 2026. Photo: file image, not taken at CHOGM.", 2: "Source: ABC News, “Cricket, climate and colonialism on agenda as Commonwealth leaders meet in Caribbean”, 1 Nov 2026 (rate rise “widely anticipated”; leaders’ cricket match at Viv Richards Stadium).", 3: "Source: ABC News, “Cricket, climate and colonialism on agenda as Commonwealth leaders meet in Caribbean”, 1 Nov 2026 (Albanese’s stated agenda; reparations raised by Caribbean and African leaders).", 4: "Source: ABC News, “Cricket, climate and colonialism on agenda as Commonwealth leaders meet in Caribbean”, 1 Nov 2026. Republic: Albanese created an Assistant Minister for the Republic role in 2022.", 5: "Source: ABC News, “Cricket, climate and colonialism on agenda as Commonwealth leaders meet in Caribbean”, 1 Nov 2026 (visa numbers, 2021 UK trade deal, rural labour shortages).", 6: "Source: ABC News, “Cricket, climate and colonialism on agenda as Commonwealth leaders meet in Caribbean”, 1 Nov 2026 (Chinese-funded port, airport and stadium; US$340m US pledge).", 7: "Source: ABC News, “Cricket, climate and colonialism on agenda as Commonwealth leaders meet in Caribbean”, 1 Nov 2026 (COP31, APEC, G20 and East Asia Summit all in November).", 8: "Opinion. Source: ABC News, “Cricket, climate and colonialism on agenda as Commonwealth leaders meet in Caribbean”, 1 Nov 2026."};
const chrome = (i, dark = true) => `<div class="srcl">${SRC[i]}</div><div class="hd"><span><i></i>Canberra explained</span><span class="h">@osherfeldman</span></div>
<div class="ft"><span>${i}/${N}</span><span>${i < N ? 'Swipe →' : ''}</span></div>`;
const slides = [
// 1 cover: boarding pass
`<div class="s cover"><div class="photo" style="background-image:url(${photo})"></div>${chrome(1)}
 <div class="kick big">Rates likely go up Tuesday.</div>
 <h1>Albo's in <em>the Caribbean.</em></h1>
 <div class="pass">
  <div class="pl"><div class="row"><div><small>Passenger</small><b>ALBANESE / ANTHONY MR</b></div></div>
   <div class="route"><div><big>CBR</big><small>Canberra</small></div><div class="plane">✈</div><div><big>ANU</big><small>Antigua</small></div></div>
   <div class="row g"><div><small>Event</small><b>CHOGM</b></div><div><small>Opens</small><b>SUN 1 NOV</b></div><div><small>Rate day</small><b class="r">TUE 3 NOV</b></div><div><small>Class</small><b>VIP</b></div></div></div>
  <div class="stub"><small>Seat</small><big>1A</big><div class="bars"></div></div>
 </div>
 <div class="note">Boarding pass is an illustration</div></div>`,
// 2 the week
`<div class="s red">${chrome(2)}
 <div class="kick">His week vs your week</div>
 <div class="cal"><div class="day"><small>Sun 1 Nov</small><b>Leaders' cricket match</b><span>Viv Richards Stadium, Antigua. He'll be there.</span></div>
 <div class="day hot"><small>Tue 3 Nov</small><b>Interest rate rise likely</b><span>Back home. Colleagues left to face the fallout.</span></div></div>
 <h2>You likely get a rate rise. <em>He gets the cricket.</em></h2></div>`,
// 3 agenda
`<div class="s">${chrome(3)}
 <div class="kick">On the table at CHOGM</div>
 <ul class="chips"><li>Climate change</li><li>Our oceans</li><li>Trade and investment</li><li>The rise of AI</li><li>A UN Security Council seat</li><li class="hot">Reparations for slavery</li></ul>
 <p class="punch">Missing from the list: <em>your mortgage.</em></p></div>`,
// 4 why
`<div class="s">${chrome(4)}
 <div class="kick">His reason for going</div>
 <blockquote>He says he's there at the <em>personal request of King Charles.</em></blockquote>
 <p class="punch small">A prime minister who wants Australia to become a republic, flying across the world because the King asked him to.</p></div>`,
// 5 backpackers
`<div class="s tight">${chrome(5)}
 <div class="kick">His gift to the UK</div>
 <h2>British backpackers <em>won't have to work</em> in the regions.</h2>
 <dl class="facts"><dt>UK visas</dt><dd>About 80,000 a year, nearly double since the 2021 trade deal</dd><dt>The cost</dt><dd>The deal is partly blamed for rural labour shortages</dd></dl>
 <p class="punch">Good news for London. <em>What about the farms?</em></p></div>`,
// 6 china
`<div class="s">${chrome(6)}
 <div class="kick">Who built the venue</div>
 <h2>The port. The airport. The cricket stadium. <em>China paid for them.</em></h2>
 <p class="punch small">Beijing has poured billions into the Caribbean. Washington just pledged US$340 million. Australia is sending a prime minister to watch the cricket.</p></div>`,
// 7 november
`<div class="s">${chrome(7)}
 <div class="kick">And that's just the start</div>
 <h2>Next up: <em>summit season.</em></h2>
 <p class="src">All in November:</p>
 <ul class="trips"><li>COP31</li><li>APEC</li><li>G20</li><li>East Asia Summit</li></ul>
 <p class="punch">How many days will he spend <em>in Australia</em> this month?</p></div>`,
// 8 cta
`<div class="s cta">${chrome(8)}
 <div class="kick">Your call</div>
 <h2>Rate rise week. Should the PM be <em>at home?</em></h2>
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
.pass b.r{color:var(--red)}
.tight{gap:32px}.tight h2{font-size:88px}.tight .facts{font-size:38px;gap:22px 30px;margin-top:0}.tight .facts dt,.tight .facts dd{padding-top:18px}.tight .punch{font-size:56px}
.srcl{position:absolute;left:96px;right:96px;bottom:110px;font:400 19px/1.45 M,monospace;color:var(--dim);border-top:1px solid rgba(242,239,230,.15);padding-top:14px;z-index:2}
.cover{justify-content:flex-end;padding-bottom:215px;gap:30px}
.cover .photo{position:absolute;left:0;right:0;top:0;height:900px;background-size:cover;background-position:50% 18%;filter:saturate(1.05) contrast(1.05);-webkit-mask-image:linear-gradient(180deg,#000 45%,transparent 96%);mask-image:linear-gradient(180deg,#000 45%,transparent 96%)}
.cover .photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,20,16,.75) 0%,rgba(11,20,16,0) 16%,rgba(11,20,16,0) 34%,rgba(11,20,16,.7) 62%,rgba(11,20,16,.85) 100%)}
.cover .hd,.cover .ft,.cover .kick,.cover h1,.cover .pass,.cover .note{position:relative;z-index:1}
.cover .hd{position:absolute}.cover .ft{position:absolute}
.cover h1{font-size:118px}
.cover .kick.big{font:800 66px B,sans-serif;letter-spacing:-.02em;text-transform:none;color:var(--ink);line-height:1;margin-bottom:-6px;text-shadow:0 4px 24px rgba(0,0,0,.6)}
.cover .pass{transform:rotate(-3deg) scale(.86);transform-origin:left center;margin:-20px 0 -30px}
.cover .route big{font-size:104px}
.cal{display:flex;flex-direction:column;gap:26px}
.day{background:rgba(242,239,230,.07);border:2px solid rgba(242,239,230,.22);border-radius:28px;padding:34px 40px;display:flex;flex-direction:column;gap:10px}
.day small{font:500 26px M,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.day b{font-size:64px;font-weight:800;letter-spacing:-.02em;line-height:1}
.day span{font-size:34px;color:var(--dim)}
.day.hot{background:#ff7a6e;border-color:#ff7a6e;color:var(--f)}.day.hot small,.day.hot span{color:rgba(11,20,16,.75)}
.trips{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:20px}
.trips li{font-size:60px;font-weight:800;border:2px solid rgba(227,181,74,.5);border-radius:22px;padding:24px 34px;position:relative}
.trips li::after{content:"✈";position:absolute;right:30px;color:var(--gold);font-size:44px;top:50%;transform:translateY(-50%)}
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
