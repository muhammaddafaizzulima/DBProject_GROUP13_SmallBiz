const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE purchase
router.post('/', (req, res) => {
  const { Date, Total_Cost, Supplier_ID, User_ID } = req.body;

  const query = `
    INSERT INTO purchase (Date, Total_Cost, Supplier_ID, User_ID)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [Date, Total_Cost, Supplier_ID, User_ID], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      message: "Purchase created successfully",
      Purchase_ID: result.insertId
    });
  });
});

// READ all
router.get('/', (req, res) => {
  db.query("SELECT * FROM purchase", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// READ by ID
router.get('/:id', (req, res) => {
  db.query(
    "SELECT * FROM purchase WHERE Purchase_ID = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
});

// UPDATE
router.put('/:id', (req, res) => {
  const { Date, Total_Cost, Supplier_ID, User_ID } = req.body;

  const query = `
    UPDATE purchase
    SET Date=?, Total_Cost=?, Supplier_ID=?, User_ID=?
    WHERE Purchase_ID=?
  `;

  db.query(query, [Date, Total_Cost, Supplier_ID, User_ID, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Purchase updated successfully" });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  db.query("DELETE FROM purchase WHERE Purchase_ID = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Purchase deleted" });
  });
});

module.exports = router;
