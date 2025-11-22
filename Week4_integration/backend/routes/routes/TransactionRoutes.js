const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM Transaction", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM Transaction WHERE Transaction_ID = ?", 
  [req.params.id], 
  (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

router.post("/", (req, res) => {
  db.query("INSERT INTO Transaction SET ?", req.body, (err) => {
    if (err) throw err;
    res.json({ message: "Transaction created" });
  });
});

router.put("/:id", (req, res) => {
  db.query("UPDATE Transaction SET ? WHERE Transaction_ID = ?", 
  [req.body, req.params.id], 
  (err) => {
    if (err) throw err;
    res.json({ message: "Transaction updated" });
  });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM Transaction WHERE Transaction_ID = ?", 
  [req.params.id], 
  (err) => {
    if (err) throw err;
    res.json({ message: "Transaction deleted" });
  });
});

module.exports = router;