const router = require("express").Router();
const { json } = require("body-parser");
const mongoose = require("mongoose");

const Item = require("../models/item");

// Get Items
router.get("/", (req, res) => {
  Item.find()
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

// Add Item
router.post("/", (req, res) => {
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    note: req.body.note,
    image: req.body.image,
    category: req.body.category,
  });

  item
    .save()
    .then((result) => {
      res.status(201).json({
        message: "item created successfully",
        createdItem: {
          name: result.name,
          category: result.category,
          note: result.note,
          image: result.image,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Get Item by Id
router.get("/:itemId", (req, res) => {
  const id = req.params.itemId;
  Item.findById(id)
    .select("-__v")
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Delete Item
router.delete("/:itemId", (req, res) => {
  const id = req.params.itemId;
  Item.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "Product Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
