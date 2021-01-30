+++
title = "Using Puppeteer to read table data"
subtitle = "Basic example on how to use Puppeteer to read the content of a table element."
tags = ['web']
date = 2021-01-29

# For description meta tag
description = "Using Puppeteer to read table data"

# Comment next line and the default banner wil be used.
banner = 'img/puppeteer_logo.png'

+++

## What is [Puppeteer](https://pptr.dev/)?

Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). Puppeteer runs [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) by default, but can be configured to run full (non-headless) Chrome or Chromium.

## Why use Puppeteer?

Imaging that there is not an API to get data from a public site. Using Puppeteer you are able to render the content a web page and scrap data from it.

Also, there are several features that Puppeteer provides besides data, like generating screenshots and PDFs from pages, automate form submission, UI testing, keyboard input, etc.

A great example of this would be to get COVID-19 related data from a government website like [covid19honduras.org](https://covid19honduras.org/). They don't provide an API to fetch data.

![](https://raw.githubusercontent.com/Javier3131/datascrapper/main/Screen%20Shot%202021-01-29%20at%209.34.22%20PM.png)

## Preparation

In this example, we are going to use NodeJS to create a server side application to scrap from [covid19honduras.org](https://covid19honduras.org/) and specifically get the data from the table of confirmed cases by departments. If you go to the site and inspect the table, you are going to see the id of the table, we are going to use this id to get this element.

1. Create a new project

   ```javascript
   npm init
   ```

2. Install Puppeteer

   ```javascript
   npm install --save puppeteer
   ```

3. Create a file index.js. This is going to be the place were we are going to add the following code.

## Fetch data from an HTML table

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://covid19honduras.org/';

  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    await page.goto(url);

    // Method to create a faster Page
    // From: https://github.com/shirshak55/scrapper-tools/blob/master/src/fastPage/index.ts#L113
    const session = await page.target().createCDPSession();
    await page.setBypassCSP(true);
    await session.send('Page.enable');
    await session.send('Page.setWebLifecycleState', {
      state: 'active',
    });

    // Bloquea la carga de recursos como imagenes y css
    await page.setRequestInterception(true);

    const rawData = await page.evaluate(() => {
      let data = [];
      let table = document.getElementById('tablaDatos');

      for (var i = 1; i < table.rows.length; i++) {
        let objCells = table.rows.item(i).cells;

        let values = [];
        for (var j = 0; j < objCells.length; j++) {
          let text = objCells.item(j).innerHTML;
          values.push(text);
        }
        let d = { i, values };
        data.push(d);
      }

      return data;
    });

    console.log(rawData);
  } catch (error) {
    console.log('error', error);
  }
})();
```

## Result

![](https://raw.githubusercontent.com/Javier3131/datascrapper/main/Screen%20Shot%202021-01-29%20at%204.07.45%20PM.png)