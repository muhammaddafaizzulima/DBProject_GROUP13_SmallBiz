const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
  const { Quantity, Unit_Cost, SubTotal, Purchase_ID, Product_ID } = req.body;

  const query = `
    INSERT INTO purchase_detail 
    (Quantity, Unit_Cost, SubTotal, Purchase_ID, Product_ID)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [Quantity, Unit_Cost, SubTotal, Purchase_ID, Product_ID],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Purchase detail added" });
    }
  );
});

// READ all
router.get('/', (req, res) => {
  db.query("SELECT * FROM purchase_detail", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// READ purchase details by purchase ID
router.get('/:id', (req, res) => {
  db.query(
    "SELECT * FROM purchase_detail WHERE Purchase_ID = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// DELETE detail
router.delete('/:id/:product', (req, res) => {
  db.query(
    "DELETE FROM purchase_detail WHERE Purchase_ID = ? AND Product_ID = ?",
    [req.params.id, req.params.product],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Purchase detail deleted" });
    }
  );
});

module.exports = router;
