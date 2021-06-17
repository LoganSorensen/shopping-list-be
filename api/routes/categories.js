const router = require("express").Router();
const mongoose = require("mongoose");

const Category = require("../models/category");

// Get Categories
router.get("/", (req, res) => {
  Category.find()
    .select("-__v")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        items: docs,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
