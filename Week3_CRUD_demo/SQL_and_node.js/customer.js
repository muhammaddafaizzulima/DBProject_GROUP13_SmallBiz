const express = require('express');
const router = express.Router();
const db = require('../db');


// ============================
//  GET ALL CUSTOMERS
// ============================
router.get('/', (req, res) => {
  db.query('SELECT * FROM Customer', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


// ============================
//  GET CUSTOMER BY ID
// ============================
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'SELECT * FROM Customer WHERE Customer_ID = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });

      if (results.length === 0) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      res.json(results[0]);
    }
  );
});


// ============================
//  CREATE CUSTOMER (POST)
// ============================
router.post('/', (req, res) => {
  const { Name, Phone, Email, Address } = req.body;

  db.query(
    `INSERT INTO customer (Name, Phone, Email, Address) 
     VALUES (?, ?, ?, ?)`,
    [Name, Phone, Email, Address],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: 'Customer created',
        customerId: result.insertId
      });
    }
  );
});


// ============================
//  UPDATE CUSTOMER (PUT)
// ============================
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { Name, Phone, Email, Address } = req.body;

  db.query(
    `UPDATE customer 
     SET Name=?, Phone=?, Email=?, Address=? 
     WHERE Customer_ID=?`,
    [Name, Phone, Email, Address, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: 'Customer not found' });

      res.json({ message: 'Customer updated' });
    }
  );
});


// ============================
//  DELETE CUSTOMER
// ============================
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM customer WHERE Customer_ID = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: 'Customer not found' });

      res.json({ message: 'Customer deleted' });
    }
  );
});


module.exports = router;
