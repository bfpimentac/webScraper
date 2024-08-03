const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv'); 

// Caminho para o arquivo CSV onde os produtos serão salvos
const csvFilePath = path.join(__dirname, 'products.csv');

// Cabeçalhos do CSV
const headers = ["title", "price", "image", "description"];

/**
 * Função para extrair informações de um produto de uma URL
 * @param {object} driver - Instância do WebDriver
 * @param {string} url - URL do produto
 * @returns {object|null} - Dados do produto ou null em caso de erro
 */
async function scrapeProduct(driver, url) {
  try {
    await driver.get(url);
    await driver.manage().window().maximize();

    /**
     * Função para rolar a página até o final
     */
    async function scrollToBottom() {
      let lastHeight = await driver.executeScript('return document.body.scrollHeight');
      while (true) {
        await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
        await driver.sleep(3000); // Aguarda o carregamento
        let newHeight = await driver.executeScript('return document.body.scrollHeight');
        if (newHeight === lastHeight) {
          break; // Se a altura não mudar, chegou ao fim
        }
        lastHeight = newHeight;
      }
    }

    /**
     * Função para rolar a página até um elemento específico
     * @param {object} element - Elemento a ser visualizado
     */
    async function scrollToElement(element) {
      await driver.executeScript('arguments[0].scrollIntoView(true);', element);
      await driver.sleep(3000); // Aguarda o carregamento
    }

    // Localiza os elementos do produto
    const titleElement = await driver.wait(until.elementLocated(By.css('h1.product-name')), 20000);
    const priceElement = await driver.wait(until.elementLocated(By.css('span.saleInCents-value')), 20000);
    const imageElement = await driver.wait(until.elementLocated(By.css('img.zoom-image.imageLoadingBg')), 20000);
    const descriptionElement = await driver.wait(until.elementLocated(By.css('p.features--description')), 20000);

    // Rola até o final da página e até o elemento de descrição
    await scrollToBottom();
    await scrollToElement(descriptionElement);

    // Aguarda os elementos se tornarem visíveis
    await driver.wait(until.elementIsVisible(titleElement), 20000);
    await driver.wait(until.elementIsVisible(priceElement), 20000);
    await driver.wait(until.elementIsVisible(imageElement), 20000);
    await driver.wait(until.elementIsVisible(descriptionElement), 20000);

    // Extrai os dados dos elementos
    const title = await titleElement.getText();
    const price = await priceElement.getText();
    const image = await imageElement.getAttribute('src');
    const description = await descriptionElement.getText();

    return { title, price, image, description };
  } catch (error) {
    console.error('Error scraping the product:', error);
    return null;
  }
}

/**
 * Adiciona dados ao arquivo CSV
 * @param {Array<object>} data - Dados do produto
 */
async function appendToCSV(data) {
  try {
    let csv = '';
    // Verifica se o arquivo CSV já existe
    if (!fs.existsSync(csvFilePath)) {
      // Cria o arquivo com cabeçalhos se não existir
      csv = headers.join(',') + '\n';
    } else {
      // Apenas adiciona os dados, sem cabeçalhos
      csv = '';
    }

    // Adiciona os dados dos produtos ao CSV
    for (const item of data) {
      csv += [item.title, item.price, item.image, item.description]
        .map(field => `"${field.replace(/"/g, '""')}"`) 
        .join(',') + '\n';
    }

    fs.appendFileSync(csvFilePath, csv);
    console.log('Products saved to products.csv');
  } catch (error) {
    console.error('Error writing to CSV file:', error);
  }
}

/**
 * Função principal para executar o scraping
 */
async function main() {
  // Recebe múltiplas URLs a partir dos argumentos
  const urls = process.argv.slice(2);
  if (urls.length === 0) {
    console.log('No URLs provided.');
    return;
  }

  let driver = null;
  try {
    // Configura e inicializa o WebDriver
    driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
    driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000 });

    for (const url of urls) {
      // Verifica se a URL é válida
      if (!url.includes('netshoes.com.br')) {
        console.log(`The URL ${url} is not from the Netshoes site.`);
        continue;
      }

      // Realiza o scraping do produto e salva no CSV
      const product = await scrapeProduct(driver, url);
      if (product) {
        console.log('Scraped Product:', product); 
        await appendToCSV([product]);
      }
    }
  } catch (error) {
    console.error('Error in scraping process:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

main();
