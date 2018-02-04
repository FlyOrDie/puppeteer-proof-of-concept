const puppeteer = require('puppeteer');
const { record } = require('./puppeteer-recorder');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await record({
      browser, // Optional: a puppeteer Browser instance,
      page, // Optional: a puppeteer Page instance,
      output: './results/output.webm',
      fps: 60,
      frames: 60 * 5, // 5 seconds at 60 fps
      prepare: function (browser, page) { /* executed before first capture */ },
      render: function (browser, page, frame) { /* executed before each capture */ }
    });

    await browser.close();
  } catch (e) {
    console.log('ERROR');
    console.log(e);
  }
})();