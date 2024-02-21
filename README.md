<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Zalo.js</h3>

  <p align="center">
    an API to control Zalo over the DevTools Protocol based which is allow you to make a Client bot
    <br/>
    May cai link ben duoi cho dep chu deo co gi dau
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

- Đả đảo những kẻ chống lại tiến trình phát triển loài người

- Đả đảo Zalo 

- Đả đảo Lê Hồng Minh 

- Đả đảo Vương Quang Khải

- Telegram Bất diệt 

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install zalojs@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/DaQMinh/Zalo.js
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

```ts
import { Client, init } from 'zalojs';

(async () => {
    // turn headless to true when deploy
    const { browser, page } = await init('Lonely', '#group-item-g5701541405487732670', true);
    const client = new Client(page);
    const prefix = '!';
    await client.on('ready',async (user: any) => {
      await client.sendMsg("Message event have been started!")
      client.mPolls('Nhà dái F69',['tai','xiu'])
      console.log(`Logged in as ${user.name}`)
    })
    await client.on('message' , (message : any) => {
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if(command == 'ping'){
          client.sendMsg('ping ping pong pong cmm')
        }
    });
})();

```


