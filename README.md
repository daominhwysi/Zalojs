
<div align="center">
<p>
 <image src="https://gist.githubusercontent.com/DaQMinh/0407639babdc216a78156c1ed27672af/raw/6c8aedd90fb26639730393e1101bd0d7257f8388/logo.svg" alt="logo">
</p>
<a>
<img src="https://img.shields.io/badge/Zalo-Join-5bc0de?style=for-the-badge)" alt="Zalo Badge">
</a>
<a href="https://www.npmjs.com/package/zalojs">
  <img src="https://img.shields.io/npm/dt/zalojs?style=for-the-badge)" alt="npm downloads">
</a>
<a href="https://www.npmjs.com/package/zalojs">
  <img src="https://img.shields.io/npm/v/zalojs?style=for-the-badge)" alt="npm version">
</a>

</div>

<!-- ABOUT THE PROJECT -->
## About The Project
Zalo.JS is a project that offers an API for controlling the Zalo client programmatically, leveraging Puppeteer.

<!-- GETTING STARTED -->
### Use Cases
- Chatbot Development: Develop chatbots capable of interacting with Zalo users, responding to messages, providing information, and executing tasks.

- Automated Workflows: Streamline repetitive tasks by automating actions within the Zalo client, such as sending notifications or gathering data.

## Getting Started

### Prerequisites

1. **Prepare a Mobile Device:** As Zalo imposes strict security measures, it's essential to have a mobile device ready for the setup process.

2. **Installation:** Install the Zalo.JS package by running 
  ```sh
  npm i zalo.js@latest
  ```

<!-- USAGE EXAMPLES -->
### Usage

```js
import Client, { init } from "zalo.js";
import config from "./config.json";

(async () => {
  const { browser, page } = await init({
    groupName: config.gname,
    groupSelector: config.gselector,
    headless: config.headless,
  });
  const client = new Client(page);

  client.on("message", (message) => {
    console.log(message);
  });

  client.once("ready", (user) => {
    console.log(user);
  });
})();
```
**Config File:**
```json
{
  "gselector": "your-group/user-selector", //#group-item-g5701541405487732670
  "gname": "your-group/user-name", //Testing
  "headless" : true //turn to true when production
}
```

3. **Authentication:** Upon running the program, a server will automatically start at http://localhost:3000. Next, use your mobile device to scan the QR code displayed on localhost:3000 using the Zalo app
