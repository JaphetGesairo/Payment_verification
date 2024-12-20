const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'payement'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// API to insert a new order
app.post('/order', (req, res) => {
  const { CustomerName, Item, Price, OrderedDate } = req.body;
  const query = `INSERT INTO \`order\` (CustomerName, Item, Price, OrderedDate) VALUES (?, ?, ?, ?)`;

  connection.query(query, [CustomerName, Item, Price, OrderedDate], (err, result) => {
    if (err) {
      console.error('Error inserting order:', err);
      res.status(500).send('Error inserting order');
      return;
    }
    res.status(201).send({ message: 'Order created successfully', OrderID: result.insertId });
  });
});

// API to get all orders
app.get('/orders', (req, res) => {
  const query = 'SELECT * FROM `order`';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).send('Error fetching orders');
      return;
    }
    res.status(200).send(results);
  });
});

// API to get a specific order by ID
app.get('/order/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM `order` WHERE OrderID = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching order:', err);
      res.status(500).send('Error fetching order');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Order not found');
      return;
    }
    res.status(200).send(results[0]);
  });
});

// API to delete an order by ID
app.delete('/order/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM `order` WHERE OrderID = ?';

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting order:', err);
      res.status(500).send('Error deleting order');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Order not found');
      return;
    }
    res.status(200).send({ message: 'Order deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
