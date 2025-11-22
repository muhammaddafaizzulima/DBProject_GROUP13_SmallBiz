const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE Supplier
router.post('/', (req, res) => {
  const { Name, Contact, Address } = req.body;

  const query = `
    INSERT INTO supplier (Name, Contact, Address)
    VALUES (?, ?, ?)
  `;

  db.query(query, [Name, Contact, Address], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ 
      message: 'Supplier created successfully', 
      Supplier_ID: result.insertId 
    });
  });
});

// READ all suppliers
router.get('/', (req, res) => {
  db.query('SELECT * FROM supplier', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// READ supplier by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM supplier WHERE Supplier_ID = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// UPDATE supplier
router.put('/:id', (req, res) => {
  const { Name, Contact, Address } = req.body;

  const query = `
    UPDATE supplier
    SET Name = ?, Contact = ?, Address = ?
    WHERE Supplier_ID = ?
  `;

  db.query(query, [Name, Contact, Address, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Supplier updated successfully' });
  });
});

// DELETE supplier
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM supplier WHERE Supplier_ID = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Supplier deleted successfully' });
  });
});

module.exports = router;
