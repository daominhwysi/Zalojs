// Importing necessary modules from your custom module
import { Group, init } from '../dist/index.js';

(async () => {
    const { browser, page } = await init('Nhóm hỏi bài', '#group-item-g1778418226826539279');

    const group = new Group(page);

    await group.capture();
        await group.msgListener(() => {
            console.log("A message has been sent");
        });
    await group.isLogin( async () => {
      console.log("logined")
      await group.sendMsg("Tài")
      await group.getAllMsg()
    })
})();
