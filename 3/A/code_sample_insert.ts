const mysql = require('mysql2');
const request = require('request-promise-native');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'database'
});

connection.connect();

const apiUrl = 'https://raw.githubusercontent.com/Exove/developer-test/main/material/products.json';

async function saveProductData() {
  try {
    const response = await request.get(apiUrl);
    const products = JSON.parse(response);

    for (const product of products) {
      // Save product data
      const productData = {
          id: product.id,
          name: product.name,
          description: product.description
      };

      try{
        connection.query('INSERT INTO products SET ?', [productData]);
        console.log(`Product with ID ${product.id} saved.`);
      }
      catch(error){
        throw error;
      }

      // Save product translations
      for (const language in product.translations) {
        const productTranslation = {
            product_id: product.id,
            language: language,
            name: product.translations[language].name,
            description: product.translations[language].description
        };

        try{
          connection.query('INSERT INTO product_translations SET ?', [productTranslation]);
          console.log(`Translation for product ID ${product.id} and language ${language} saved.`);
        }
        catch(error){
          throw error;
        }
      }

      // Save product categories
      for (const category of product.categories) {
        try{
          connection.query('INSERT INTO product_categories SET ?', { product_id: product.id, category_id: category.id });
          console.log(`Category ID ${category.id} saved for product ID ${product.id}.`);
        }
        catch(error){
          throw error;
        }
      }

      // Save product variations
      for (const variation of product.variations) {
        const variationData = { product_id: product.id };
        for (const key in variation) {
          variationData[key] = variation[key];
        }
        try{
          connection.query('INSERT INTO product_variations SET ?', [variationData]);
          console.log(`Variation for product ID ${product.id} saved.`);
        }
        catch(error){
          throw error;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

saveProductData();