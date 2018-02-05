const puppeteer = require('puppeteer');
const { record } = require('./puppeteer-recorder');

/**
 *
 * @param {object} options
 * @param {string} options.url               - Website to record video from.
 * @param {string} options.output            - Path to executable
 * @param {number=60} [options.fps]          - FPS parameter. Defaults to 60
 * @param {number=5} [options.recordingTime] - Length of video in seconds. Defaults to 5
 * @param {string} [options.executablePath]  - Path to Chrome executable. If not provided, will use Chromium by default.
 * @param {function} [options.prepare]       - Passed puppeteer browser and puppeteer page instances.
 * @param {function} [options.render]        - Passed puppeteer browser, page and frame instances.
 *
 * @returns {Promise.<void>}
 */
module.exports = async (options) => {
  if (!options) throw new Error('No options object was provided');
  if (!options.url) throw new Error('options.url parameter is required');
  if (typeof options.url !== 'string') throw new Error('options.url should have type string');
  if (!options.output) throw new Error('options.output parameter is required');
  if (typeof options.output !== 'string') throw new Error('options.output should have type string');
  if (options.fps && typeof options.fps !== 'number') throw new Error('options.fps should be a number, if provided');
  if (options.recordingTime && typeof options.recordingTime !== 'number') throw new Error('options.recordingTime should be a number, if provided');
  if (options.executablePath && typeof options.executablePath !== 'string') throw new Error('options.executablePath should be a string, if provided');
  if (options.prepare && typeof options.prepare !== 'function') throw new Error('options.prepare should be a function, if provided');
  if (options.render && typeof options.render !== 'function') throw new Error('options.render should be a function, if provided');

  const emptyFunc = () => {};
  const puppeteerOptions = options.executablePath ? { executablePath: options.executablePath } : null;

  // MacOS chrome destination executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
  const browser = await puppeteer.launch(puppeteerOptions);
  const page = await browser.newPage();
  await page.goto(options.url);

  await record({
    browser,
    page,
    output: options.output,
    fps: options.fps,
    frames: options.fps * options.recordingTime,
    prepare: options.prepare || emptyFunc,
    render: options.render || emptyFunc
  });

  await browser.close();
};
