import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  // Array to store network requests
  const requests: any[] = [];

  // Listen for request events
  page.on('request', request => {
    requests.push({
      url: request.url(),
      method: request.method(),
      headers: request.headers(),
      postData: request.postData()
    });

    // Continue with the request
    request.continue();
  });

  // Listen for response events
  page.on('response', response => {
    console.log('Response received:', response.status(), response.url());
  });

  // Navigate to a page
  await page.goto('https://zaloweb.me/');

  // Output the collected requests
  console.log('Requests:', requests);

  // Don't close the browser automatically
  // await browser.close();
})();
