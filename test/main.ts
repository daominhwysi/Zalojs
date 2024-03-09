// import * as cheerio from 'cheerio';

// // Assume msgHTML là chuỗi HTML chứa tất cả các tin nhắn
// const msgHTML: string = `
// <div class="chat-message wrap-message rotate-container me  -send-time -reaction bubble-jump-target" id="bb_msg_id_1709619982372" data-node-type="bubble-message"><div class="" style="display: flex; width: 100%; justify-content: flex-end;"><div class="chat-message__actionholder  me  last-msg" style="min-width: 116px;"></div><div class="card card-with-reaction-v2  me  last-msg card--text" data-id="div_SentMsg_Text"><div-13 class="card-sender-name hidden"><span style="padding: 2px 10px 0px 2px; cursor: pointer;"></span></div-13><div><span-15 id="mtc-5218653747925"><span class="text">vào discord</span></span-15></div><div style="margin-top: 10px;"><div class="card-send-time flx flx-al-c flx-1 me   preview-ts__first-msg"><span-13 classname="card-send-time__sendTime" class="card-send-time__sendTime">13:26</span-13></div></div><div class="message-reaction-container message-reaction-container-v2 has-send-time  me "><div id="reaction-btn-5218653747925" data-id="btn_SentMsg_React" style="position: relative;"><div class="msg-reaction-icon reaction-shadow react-icon"><span style="pointer-events: none;"><img class="default-react-icon-thumb" src="https://res-zalo.zadn.vn/upload/media/2019/1/25/iconlike_1548389696575_103596.png"></span></div><div class="emoji-list-wrapper me hide-elist"><div class="reaction-emoji-list"><div class="reaction-emoji-icon" style="animation-delay: 20ms;"><span class="emoji-sizer emoji-outer " style="background-size: 5100%; background-repeat: no-repeat; -webkit-user-drag: none; background-image: url(&quot;assets/emoji-md.6fa8afb705db684e87d22868d5d85557.png?v=20222710&quot;); background-position: 84% 82.5%; margin: -1px; position: relative; top: 2px;">/-strong</span></div><div class="reaction-emoji-icon" style="animation-delay: 40ms;"><span class="emoji-sizer emoji-outer " style="background-size: 5100%; background-repeat: no-repeat; -webkit-user-drag: none; background-image: url(&quot;assets/emoji-md.6fa8afb705db684e87d22868d5d85557.png?v=20222710&quot;); background-position: 84% 72.5%; margin: -1px; position: relative; top: 2px;">/-heart</span></div><div class="reaction-emoji-icon" style="animation-delay: 60ms;"><span class="emoji-sizer emoji-outer " style="background-size: 5100%; background-repeat: no-repeat; -webkit-user-drag: none; background-image: url(&quot;assets/emoji-md.6fa8afb705db684e87d22868d5d85557.png?v=20222710&quot;); background-position: 82% 7.5%; margin: -1px; position: relative; top: 2px;">:&gt;</span></div><div class="reaction-emoji-icon" style="animation-delay: 80ms;"><span class="emoji-sizer emoji-outer " style="background-size: 5100%; background-repeat: no-repeat; -webkit-user-drag: none; background-image: url(&quot;assets/emoji-md.6fa8afb705db684e87d22868d5d85557.png?v=20222710&quot;); background-position: 84% 20%; margin: -1px; position: relative; top: 2px;">:o</span></div><div class="reaction-emoji-icon" style="animation-delay: 100ms;"><span class="emoji-sizer emoji-outer " style="background-size: 5100%; background-repeat: no-repeat; -webkit-user-drag: none; background-image: url(&quot;assets/emoji-md.6fa8afb705db684e87d22868d5d85557.png?v=20222710&quot;); background-position: 84% 2.5%; margin: -1px; position: relative; top: 2px;">:-((</span></div><div class="reaction-emoji-icon" style="animation-delay: 120ms;"><span class="emoji-sizer emoji-outer " style="background-size: 5100%; background-repeat: no-repeat; -webkit-user-drag: none; background-image: url(&quot;assets/emoji-md.6fa8afb705db684e87d22868d5d85557.png?v=20222710&quot;); background-position: 84% 5%; margin: -1px; position: relative; top: 2px;">:-h</span></div></div><div class="reaction-emoji-bottom"></div></div></div><div id="reaction-canvas-layer-05218653747925" class="react-effect  me "></div><div id="reaction-canvas-layer-15218653747925" class="react-effect  me "></div></div></div></div></div>`;

// // Load HTML vào Cheerio
// const $ = cheerio.load(msgHTML);

// function getName(messageHtml: string): string {
//   const $ = cheerio.load(messageHtml);

//   // Kiểm tra xem tin nhắn có phải của bạn hay không bằng cách kiểm tra class của thẻ div chứa tin nhắn
//   const isMyMessage = $('.wrap-message').hasClass('me');

//   if (isMyMessage) {
//       // Nếu là tin nhắn của bạn tôi, trả về 'client'
//       return 'client';
//   } else {
//       // Nếu là tin nhắn của bạn tôi, thử xác định tên
//       const senderNameElement = $('.card-sender-name span');
//       if (senderNameElement.length > 0) {
//           // Nếu tìm thấy phần tử chứa tên, trả về tên đã được xác định
//           return senderNameElement.text().trim();
//       } else {
//           // Nếu không xác định được tên, trả về 'i-1'
//           return 'i-1';
//       }
//   }
// }