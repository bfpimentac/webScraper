# Web Scraper Challenge

Welcome to the Web Scraper Challenge! This project is a technical challenge to build a web scraper that extracts product information from the Netshoes website. The scraper is built using Node.js and Selenium WebDriver.

## Features

- Extracts product title, price, image URL, and description.
- Handles scrolling to ensure all data is loaded.
- Maximizes the browser window for better visibility.
- Validates that the URL is from the Netshoes site.
- Appends multiple products to a CSV file, preserving the header.

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

Replace <product-url> with the URL(s) of the product page(s) you want to scrape. You can provide multiple URLs separated by spaces. The scraper will extract the title, price, image URL, and description from each Netshoes product page and append the data to a CSV file.


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

- Title: The name of the product.
- Price: The price of the product.
- Image URL: The URL of the product's image.
- Description: A brief description of the product.

## Error Handling

- If the URL is not from Netshoes, the script will notify you and exit.
- If the elements are not found or take too long to load, it will log an error message.
- If the CSV file cannot be written or appended to, it will log an error message.

## Authors 

[Beatriz Freire](https://github.com/bfpimentac)

