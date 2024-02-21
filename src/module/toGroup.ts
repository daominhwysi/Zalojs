
export default async function toGroup(page: any, groupName: string, groupId: string) {
    const selector = "#main-tab > div:nth-child(1) > div.nav__tabs__top > div.clickable.leftbar-tab.flx.flx-col.flx-al-c.flx-center.rel.selected";
    await page.waitForSelector(selector);
    await page.click(selector);
    await page.type('#contact-search-input', groupName);
    // Construct CSS selector using groupId
    await page.waitForSelector(groupId);
    await page.click(groupId);
    console.log(`"${groupName}" has been typed into the search input and the specified element has been clicked`);
}
