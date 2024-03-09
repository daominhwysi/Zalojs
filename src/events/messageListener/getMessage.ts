import * as cheerio from 'cheerio';
import { Page } from 'puppeteer';
import { User } from '../../types/user';
import { store , setPreviousName } from '../../state';

export default async function getMessage(page: Page, user: User | null) {
    // const resultArray: string[][] = await page.evaluate(() => {
    //     const elements = document.querySelectorAll('.chat-content.flx.flx-col.flx-cell');
    //     const resultArray: string[][] = [];
    //     elements.forEach((element: Element) => {
    //       const childElements = element.querySelectorAll('*[id]');
    //       const childArray: string[] = [];
    //       childElements.forEach((childElement: Element) => {
    //         if (childElement.id && childElement.id.includes('bb_msg_id_')) {
    //           childArray.push(childElement.outerHTML);
    //         }
    //       });
    //       resultArray.push(childArray);
    //     });
    
    //     return resultArray;
    // });
    // const messages: any[][] = resultArray.map((row: string[]) => {
    //   return row.map((element: string) => {

    //   });
    // });
    const previousName = store.getState().previousName.value;
    const elements = await page.evaluate(() => {
      const elements = document.querySelectorAll('[id*=bb_msg_id_]');
      return Array.from(elements).map(element => element.outerHTML);
    });

  const messages = elements.map((element: string) => {
    const $ = cheerio.load(element);
    const messageId = $('.chat-message').attr('id');
    const time = $('.card-send-time__sendTime').text().trim();
    let content: string | undefined; // Adjust content type

    function getName() {
      const isMyMessage = $('.wrap-message').hasClass('me');

      if (isMyMessage) {
          return user?.name;
      } else {
          const senderNameElement = $('.card-sender-name span');
          if (senderNameElement.length > 0) {
              store.dispatch(setPreviousName(senderNameElement.text().trim()));
              return senderNameElement.text().trim();
          } else {
              return previousName;
          }
      }
    }

    const imageMessage = $('div.chatImageMessage');
    if (imageMessage.length > 0) {
        const imageSrc = $('img').attr('src');
        content = imageSrc;
    }

    const textMessage = $('div.card--text');
    if (textMessage.length > 0) {
        content = textMessage.find('.text').text().trim() || undefined;
    }

    const emojiElement = $('.emoji-sizer.emoji-outer.larger');
    if (emojiElement.length > 0) {
      const emojiCode = emojiElement.text();
      content = emojiCode;
    }

    const name = getName();
    
    return { content , name , messageId , time };
  });

  return messages;
}
