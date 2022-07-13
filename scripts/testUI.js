const puppeteer = require('puppeteer');
const fs = require('fs');
const fullPageScreenshot = require('puppeteer-full-page-screenshot').default;

(async () => {
    try {
        fs.mkdirSync('snaps');
    } catch (e) {
        console.log('"snaps" directory already exists');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3001');

    await page.waitForSelector('#search-input');
    await page.click('#search-input');
    await page.type('#search-input', 'x-wing');
    await page.waitForTimeout(1000);

    await page.waitForSelector('#search-button');
    await page.click('#search-button');
    await page
        .waitForSelector('#search-card', {
            timeout: 5000,
        })
        .then(async () => {
            await page.waitForTimeout(1000);
            await fullPageScreenshot(page, { path: 'snaps/screen-1.png' });

            await page.click('#search-card');
            await page.waitForTimeout(1000);
            await fullPageScreenshot(page, { path: 'snaps/screen-2.png' });
        })
        .catch(async () => {
            await fullPageScreenshot(page, { path: 'snaps/error.png' });
            await browser.close();
        });

    await browser.close();
})();
