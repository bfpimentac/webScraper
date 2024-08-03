# Web Scraper Challenge

Welcome to the Web Scraper Challenge! This project is a technical challenge to build a web scraper that extracts product information from the Netshoes website. The scraper is built using Node.js and Selenium WebDriver.

## Features

- Extracts product title, price, image URL, and description.
- Handles scrolling to ensure all data is loaded.
- Maximizes the browser window for better visibility.
- Checks if the URL is valid and from the Netshoes site.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v14 or higher)
- ChromeDriver (compatible with your Chrome version)
- Google Chrome (v80 or higher)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/web-scraper-challenge.git
   cd web-scraper-challenge
   ```

2. Install the required npm packages:

   ```
   npm install
   ```

3. Ensure that ChromeDriver is in your system's PATH or specify its location in your code.

## Usage 

To run the web scraper, execute the following command:

   ```
    node index.js <product-url>
   ```

Replace <product-url> with the URL of the product page you want to scrape. The scraper will extract the title, price, image URL, and description from the Netshoes website.

## Output

The script will print the product details to the console in the following format:

```
{
  "title": "Tênis Masculino Adidas VL Court Base - Preto + Branco",
  "price": "R$ 299,99",
  "image": "https://example.com/image.jpg",
  "description": "O Tênis Masculino Adidas VL Court Base combina estilo e conforto para o seu dia a dia."
}
```

Title: The name of the product.
Price: The price of the product.
Image URL: The URL of the product's image.
Description: A brief description of the product.

## Error Handling

- If the URL is not from Netshoes, the script will notify you and exit.
- If the elements are not found or take too long to load, it will log an error message.


## Authors 

[beatriz freire](https://github.com/bfpimentac)

