const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { sendEventEmail } = require('../utils/mailer');
const emailRoutes = require('./routes/email');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // Default XAMPP username
  password: '',     // Default XAMPP password is empty
  database: 'product_details',
  port: 3306        // Default MySQL port
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Test database connection
db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Error testing database connection:', err);
  } else {
    console.log('Database connection test successful');
  }
});

// Create cart table if it doesn't exist
const createCartTable = `
  CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product_details(id)
  )
`;

db.query(createCartTable, (err) => {
  if (err) {
    console.error('Error creating cart table:', err);
  } else {
    console.log('Cart table ready');
  }
});

// Create sent_emails table if it doesn't exist
const createSentEmailsTable = `
  CREATE TABLE IF NOT EXISTS sent_emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender VARCHAR(100),
    recipient VARCHAR(100),
    subject VARCHAR(255),
    body TEXT,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createSentEmailsTable, (err) => {
  if (err) {
    console.error('Error creating sent_emails table:', err);
  } else {
    console.log('sent_emails table ready');
  }
});

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM product_details';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Error fetching products' });
      return;
    }
    console.log('Products fetched:', results); // Debug log
    res.json(results);
  });
});

// Add new product
app.post('/api/products', (req, res) => {
  const { name, price, category, image, description } = req.body;
  const query = 'INSERT INTO product_details (`Product Name`, Price, Category, `Image URL`, Desciption) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [name, price, category, image, description], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Error adding product' });
      return;
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// Update product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, category, image, description } = req.body;
  const query = 'UPDATE product_details SET `Product Name` = ?, Price = ?, Category = ?, `Image URL` = ?, Desciption = ? WHERE id = ?';
  
  db.query(query, [name, price, category, image, description, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Error updating product' });
      return;
    }
    res.json({ id, ...req.body });
  });
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM product_details WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Error deleting product' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

// Cart API Routes

// Get cart items
app.get('/api/cart', (req, res) => {
  const query = `
    SELECT c.*, p.\`Product Name\` as name, p.Price as price, p.\`Image URL\` as image, p.Category as category, p.Desciption as description 
    FROM cart c 
    JOIN product_details p ON c.product_id = p.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching cart:', err);
      res.status(500).json({ error: 'Error fetching cart' });
      return;
    }
    res.json(results);
  });
});

// Add to cart
app.post('/api/cart', (req, res) => {
  const { product_id, quantity } = req.body;
  const query = 'INSERT INTO cart (product_id, quantity) VALUES (?, ?)';
  
  db.query(query, [product_id, quantity || 1], (err, result) => {
    if (err) {
      console.error('Error adding to cart:', err);
      res.status(500).json({ error: 'Error adding to cart' });
      return;
    }
    res.status(201).json({ id: result.insertId, product_id, quantity: quantity || 1 });
  });
});

// Remove from cart
app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM cart WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error removing from cart:', err);
      res.status(500).json({ error: 'Error removing from cart' });
      return;
    }
    res.json({ message: 'Item removed from cart' });
  });
});

// Email API Routes
app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function sendEventEmail(event) {
  const mailOptions = {
    from: 'iburahim004@gmail.com',
    to: 'iburahim004@gmail.com',
    subject: 'New Calendar Event Created',
    text: `A new event was created:\n\nTitle: ${event.title}\nDate: ${event.start}\nCategory: ${event.category || ''}`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEventEmail }; 