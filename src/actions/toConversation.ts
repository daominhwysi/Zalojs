import { Page } from "puppeteer";

export default async function toConversation(page: Page, groupName: string, groupId: string) {
    const selector = "#main-tab > div:nth-child(1) > div.nav__tabs__top > div.clickable.leftbar-tab.flx.flx-col.flx-al-c.flx-center.rel.selected";
    await page.waitForSelector(selector);
    await page.click(selector);
    await page.type('#contact-search-input', groupName);
    await page.waitForSelector(groupId);
    await page.click(groupId);
    
}
