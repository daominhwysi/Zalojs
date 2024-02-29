import { Page } from "puppeteer";

export default async function scrapeData(page: Page): Promise<any> {
    await page.click('#main-tab > div.nav__tabs__bottom > div:nth-child(3)');
    await page.waitForSelector('body > div.popover-v3');

    await page.click('body > div.popover-v3 > div.zmenu-body.has-submenu > div > div > div-14:nth-child(1)');

    await page.waitForSelector('#zl-modal__dialog-body');

    const [name, bio, birth, number] = await Promise.all([
        page.evaluate(() => document.querySelector('.pi-mini-info-section__name .truncate')!.textContent),
        page.evaluate(() => document.querySelector('.pi-info-section__info-list > div:nth-child(1) > div > span.content-copiable > div')!.textContent),
        page.evaluate(() => document.querySelector('.pi-info-section__info-list > div:nth-child(3) > div > span.content-copiable > p')!.textContent),
        page.evaluate(() => document.querySelector('.pi-info-section__info-list > div:nth-child(4) > div > span.content-copiable > p')!.textContent)
    ]);

    const cornerX = 0;
    const cornerY = 0;
    await page.mouse.click(cornerX, cornerY);
    const info : Object = { name, bio, birth, number };
    return info
}
