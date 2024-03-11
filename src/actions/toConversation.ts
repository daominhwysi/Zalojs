import { Page } from "puppeteer";

export default async function toConversation(page: Page, conversationName : string, conversationID : string) {
    const selector = "#main-tab > div:nth-child(1) > div.nav__tabs__top > div.clickable.leftbar-tab.flx.flx-col.flx-al-c.flx-center.rel.selected";
    await page.waitForSelector(selector);
    await page.click(selector);
    await page.type('#contact-search-input', conversationName);
    await page.waitForSelector(conversationID);
    await page.click(conversationID);
}
