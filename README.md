
<div align="center">
<p>
  <img src="https://raw.githubusercontent.com/DaQMinh/Zalojs/main/public/logo.svg" alt="Zalo">
</p>
  <h4> Unstable , unreliable , minimalist 
  <br/>Zalo Scraper library for Nodejs</h4>
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
  $ npm i zalojs@latest
  ```

<!-- USAGE EXAMPLES -->
### Usage

```js
const { init } = require('zalojs');
const config = require('./config.json');
const Client = require('zalojs').default;
const fs = require('fs');
const path = require('path');

const prefix = '!';

(async () => {
  const { browser, page } = await init({
    groupName: config.groupName,
    groupID: config.groupID,
    headless: config.headless,
  });

  const client = new Client(page);
  const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

  client.on("message", (message) => {
    message.forEach( async (element) => {
          if (!element.content) return;
          if (!element.content.startsWith(prefix)) return;
          const args = element.content.slice(prefix.length).trim().split(/ +/);
          const commandName = args.shift().toLowerCase();
          const commandFile = commandFiles.find(
            (file) => file.split(".").shift() === commandName,
          );
          if (!commandFile) return;
          const command = require(path.join(__dirname, "commands", commandFile));
          try {
            await command(element, client, args);
          } catch (error) {
            console.log(error);
            await client.send({ message: "There was an error executing the command." });
          }
    });
  });

  client.once('ready', () => {
    console.log(`Bot is ready! ${client.user.name}`);
  });
})();

```
**Config File:**
```json
{
  "groupID": "your-group/user-ID", //#g5701541405487732670
  "groupName": "your-group/user-name", //Testing
  "headless" : true
}
```

3. **Authentication:** Upon running the program, a server will automatically start at http://localhost:3000. Next, use your mobile device to scan the QR code displayed on localhost:3000 using the Zalo app
