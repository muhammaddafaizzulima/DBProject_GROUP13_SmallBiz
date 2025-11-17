const express = require('express');
const router = express.Router();
const db = require('../db');


// ============================
//  GET ALL PRODUCTS
// ============================
router.get('/', (req, res) => {
  const sql = `
    SELECT p.*, c.Category_Name
    FROM Products p
    LEFT JOIN Category c ON p.Category_ID = c.Category_ID
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


// ============================
//  GET PRODUCT BY ID
// ============================
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'SELECT * FROM Products WHERE Product_ID = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });

      if (results.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(results[0]);
    }
  );
});


// ============================
//  CREATE PRODUCT (POST)
// ============================
router.post('/', (req, res) => {
  const {Product_Name, Price, Stock_Quantity, Description, Category_ID } = req.body;

  // Pastikan Category_ID valid
  db.query(
    'SELECT * FROM Category WHERE Category_ID = ?',
    [Category_ID],
    (err, category) => {
      if (err) return res.status(500).json({ error: err });

      if (category.length === 0) {
        return res.status(400).json({ message: 'Category does not exist' });
      }

      // Insert product
      db.query(
        'INSERT INTO products (Product_Name, Price, Stock_Quantity, Description, Category_ID) VALUES (?, ?, ?, ?, ?)',
        [Product_Name, Price, Stock_Quantity, Description, Category_ID],
        (err, result) => {
          if (err) return res.status(500).json({ error: err });

          res.json({
            message: 'Product created',
            productId: result.insertId,
          });
        }
      );
    }
  );
});


// ============================
//  UPDATE PRODUCT (PUT)
// ============================
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { Product_Name, Price, Stock_Quantity, Description, Category_ID } = req.body;

  db.query(
    `UPDATE Products 
     SET Product_Name=?, Price=?, Stock_Quantity=?, Description=?, Category_ID=? 
     WHERE Product_ID=?`,
    [Product_Name, Price, Stock_Quantity, Description, Category_ID, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: 'Product not found' });

      res.json({ message: 'Product updated' });
    }
  );
});


// ============================
//  DELETE PRODUCT
// ============================
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM Products WHERE Product_ID = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: 'Product not found' });

      res.json({ message: 'Product deleted' });
    }
  );
});


module.exports = router;