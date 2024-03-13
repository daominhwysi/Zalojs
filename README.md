
<div align="center">
<p>
  <img src="https://raw.githubusercontent.com/DaQMinh/Zalojs/main/public/logo.svg" alt="Zalo">


</p>
<a href="https://zalo.me/g/dcbase359">
<img src="https://img.shields.io/badge/chat-join-blue?style=flat-square&logo=zalo">
</a>
<a href="https://www.npmjs.com/package/zalojs">
  <img src="https://img.shields.io/npm/v/zalojs.svg?style=flat-square" alt="Version">
  <img src="https://img.shields.io/npm/dt/zalojs.svg?style=flat-square" alt="Total Downloads">
</a>


</div>

<!-- ABOUT THE PROJECT -->
## About The Project
ZaloJS is a unstable , unreliable , high-level scraping API designed for accessing data from Zalo, a popular messaging platform in Vietnam. This versatile tool provides developers with the means to extract various types of data from Zalo, enabling them to build applications, gather insights, and automate tasks effectively.
<!-- GETTING STARTED -->
### Use Cases
- Chatbot Development: Develop chatbots capable of interacting with Zalo users, responding to messages, providing information, and executing tasks.

- Automated Workflows: Streamline repetitive tasks by automating actions within the Zalo client, such as sending notifications or gathering data.


### Example Use
```sh
$ npm i zalojs@latest
```

```js
const { init } = require("zalojs");
const config = require("./config.json");
const Client = require("zalojs").default;

const prefix = "!";

(async () => {
  const { browser, page } = await init({
    groupName: config.gname,
    groupSelector: config.gselector,
    headless: config.headless,
  });

  const client = new Client(page);

  client.on("message", (message) => {
    message.forEach(async (element) => {
      if (element.content === "Zalo") {
        client.send({
          message: "rac",
        });
      }
    });
  });

  client.once("ready", () => {
    console.log(`Bot is ready! ${client.user.name}`);
  });
})();

```
