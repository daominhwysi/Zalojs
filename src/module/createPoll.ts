export default async function createPoll(page: any, title: string, choices: string[]) {
    if (choices.length > 30) {
        throw new Error("Number of choices exceeds the maximum limit of 30.");
    }

    await page.waitForSelector('#ztoolbar > div:nth-child(10) > i');
    await page.click('#ztoolbar > div:nth-child(10) > i');
    await page.waitForSelector('body > div.popover-v3');
    await page.click('body > div.popover-v3 > div.zmenu-body > div > div > div-14:nth-child(2)');
    await page.type('#input_line_0', title);
    
    for(let i = 0; i < choices.length; i++) {
        if (i > 1) {
            await page.click('#zl-modal__dialog-body > div > div > div > div.z--btn--v2.btn-tertiary-primary.medium.btn__add__option__custom.--rounded.btn__add__option__custom > div');
        }
        await page.type(`#zl-modal__dialog-body > div > div > div > div.zl-lbl-component.options-wrapper > div.options > span:nth-child(${i + 1}) > span > input`, choices[i]);
    }
    const sibling = await page.evaluate(() => {
        const scriptElement = document.querySelector("body > script:nth-child(9)") as HTMLElement | null;
        if (scriptElement && scriptElement.nextElementSibling) {
            return scriptElement.nextElementSibling.id;
        }
        return null;
    });

    console.log(sibling);
    // const regex = /\d+/;
    // const match : any = regex.exec(sibling);
    // const number = match[0]
    // console.log(number);
    await page.click(`#${sibling} > div > div > div.zl-modal__footer.footer-sep > div > div.z--btn--v2.btn-tertiary-neutral.large.--rounded.icon-only > i`)
    await page.waitForSelector(`#zl-modal__dialog-body > div > div > div.setting-poll-v3.compact > div:nth-child(4) > span:nth-child(3) > div > div`)
    await page.click(`#zl-modal__dialog-body > div > div > div.setting-poll-v3.compact > div:nth-child(4) > span:nth-child(3) > div > div`)
    await page.click(`#zl-modal__dialog-body > div > div > div.setting-poll-v3.compact > div:nth-child(4) > span.option__setting__v3.last > div > div`)
    await page.waitForSelector(`#${sibling} > div > div > div.zl-modal__footer.footer-sep > div > div.flx > div.z--btn--v2.btn-primary.large.zl-modal__footer__button.--rounded.zl-modal__footer__button > div`)
    await page.click(`#${sibling} > div > div > div.zl-modal__footer.footer-sep > div > div.flx > div.z--btn--v2.btn-primary.large.zl-modal__footer__button.--rounded.zl-modal__footer__button > div`);
    //#zl-modal-v2-1708498577299 > div > div > div.zl-modal__footer.footer-sep > div > div.flx > div.z--btn--v2.btn-primary.large.zl-modal__footer__button.--rounded.zl-modal__footer__button > div
    //#zl-modal-v2-zl-modal-v2-1708498577299 > div > div > div.zl-modal__footer.footer-sep > div > div.flx > div.z--btn--v2.btn-primary.large.zl-modal__footer__button.--rounded.zl-modal__footer__button > div

}
