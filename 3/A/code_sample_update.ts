const mysql = require('mysql2');
const axios = require('axios');

// Connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database'
});

const apiUrl = 'https://raw.githubusercontent.com/Exove/developer-test/main/material/products.json';

// Retrieve product data from the API
async function getProductData() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Compare newly retrieved product data with existing data in the database
async function compareAndUpdate() {
    const newData = await getProductData();
    const existingData = await getExistingData(newData.id);

    if (!existingData) {
        // Save the product data as a new record in the database
        saveProductData(newData);
        return;
    }

    // Identify the parts of the data that have changed
    const changes = {};
    for (const key in newData) {
        if (newData[key] !== existingData[key]) {
            changes[key] = newData[key];
        }
    }

    // Update only the changed parts in the database
    updateProductData(newData.id, changes);
}

// Get existing product data from the database
function getExistingData(productId) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM products WHERE id = ?', [productId],
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results[0]);
        }
    );
  });
}

// Save product data as a new record in the database
function saveProductData(data) {
    connection.query('INSERT INTO products SET ?', data,
        (error, results) => {
            if (error) {
                console.error(error);
            }
            console.log(`Product data saved with ID: ${results.insertId}`);
        }
    );
}

// Update product data in the database
function updateProductData(productId, data) {
    try{
        connection.query('UPDATE products SET ? WHERE id = ?', [data, productId]);
        console.log(`Product data updated with ID: ${productId}`);
    }
    catch(error){
        throw error;
    }
}

// Call the compareAndUpdate function to start the process
compareAndUpdate();
