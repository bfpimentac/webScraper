const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function scrapeProduct(url) {
  let driver;

  try {
  
    driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
    driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000 });

    
    if (!url.includes('netshoes.com.br')) {
      console.log('The URL is not from the Netshoes site.');
      return;
    }

    await driver.get(url);

    await driver.manage().window().maximize();

    async function scrollToBottom() {
      let lastHeight = await driver.executeScript('return document.body.scrollHeight');
      while (true) {
        await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
        await driver.sleep(3000); 
        let newHeight = await driver.executeScript('return document.body.scrollHeight');
        if (newHeight === lastHeight) {
          break; 
        }
        lastHeight = newHeight;
      }
    }

    async function scrollToElement(element) {
      await driver.executeScript('arguments[0].scrollIntoView(true);', element);
      await driver.sleep(3000); 
    }

    const titleElement = await driver.wait(until.elementLocated(By.css('h1.product-name')), 20000);
    const priceElement = await driver.wait(until.elementLocated(By.css('span.saleInCents-value')), 20000);
    const imageElement = await driver.wait(until.elementLocated(By.css('img.zoom-image.imageLoadingBg')), 20000);
    const descriptionElement = await driver.wait(until.elementLocated(By.css('p.features--description')), 20000);

    await scrollToBottom();
    await scrollToElement(descriptionElement); 

    await driver.wait(until.elementIsVisible(titleElement), 20000);
    await driver.wait(until.elementIsVisible(priceElement), 20000);
    await driver.wait(until.elementIsVisible(imageElement), 20000);
    await driver.wait(until.elementIsVisible(descriptionElement), 20000);

    const title = await titleElement.getText();
    const price = await priceElement.getText();
    const image = await imageElement.getAttribute('src');
    const description = await descriptionElement.getText();

    return { title, price, image, description };
  } catch (error) {
    console.error('Error scraping the product:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.log('O URL não foi fornecido.');
    return;
  }

  const product = await scrapeProduct(url);
  if (product) {
    console.log(product);
  }
}

main();
