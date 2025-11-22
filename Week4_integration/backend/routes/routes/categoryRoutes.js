const express = require('express');
const router = express.Router();
const db = require('../db');

// READ ALL CATEGORY
router.get('/', (req, res) => {
  db.query('SELECT * FROM Category', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// CREATE CATEGORY
router.post('/', (req, res) => {
  const { Category_ID, Category_Name } = req.body;

  db.query(
    'INSERT INTO Category (Category_ID, Category_Name) VALUES (?, ?)',
    [Category_ID, Category_Name],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Category added!', id: results.insertId });
    }
  );
});

// UPDATE CATEGORY
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { Category_Name } = req.body;

  db.query(
    'UPDATE Category SET Category_Name = ? WHERE Category_ID = ?',
    [Category_Name, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json({ message: 'Category updated' });
    }
  );
});

// DELETE CATEGORY
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM Category WHERE Category_ID = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json({ message: 'Category deleted' });
    }
  );
});


module.exports = router;
