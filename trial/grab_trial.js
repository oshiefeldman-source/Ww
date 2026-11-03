const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 4 });
  await p.goto('file://' + process.argv[2] + '/rec.html'); await p.waitForTimeout(600);
  await p.evaluate(() => { window.__render(3.0); document.querySelectorAll('.line,.follow,.top').forEach(e => e.style.display = 'none'); document.getElementById('countV').textContent = '+$456'; });
  await p.screenshot({ path: process.argv[2] + '/cover_trial_raw.png' });
  await b.close();
})();
