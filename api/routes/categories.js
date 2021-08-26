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

// Delete a Category
router.delete("/:categoryId", (req, res) => {
  const id = req.params.categoryId;
  Category.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({ message: "Category Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
