const router = require("express").Router();
const mongoose = require("mongoose");

const List = require("../models/list");
const {
  formatDate,
  formatMonthAndYear,
} = require("../../utils/dateFormatting");

// Get Lists
router.get("/", (req, res) => {
  List.find()
    .select("-__v")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        lists: docs,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Add List
router.post("/", (req, res) => {
  const list = new List({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    dateCreated: formatDate(),
    monthCreated: formatMonthAndYear(),
    categories: req.body.categories,
    items: req.body.items,
    completed: false,
  });

  list
    .save()
    .then((result) => {
      res.status(201).json({
        message: "List saved",
        createdList: {
          _id: result._id,
          name: result.name,
          dateCreated: result.dateCreated,
          monthCreated: result.monthCreated,
          categories: result.categories,
          items: result.items,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Get List By Id
router.get("/:listId", (req, res) => {
  const id = req.params.listId;
  List.findById(id)
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

router.delete("/:listId", (req, res) => {
  const id = req.params.listId;
  List.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "List Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;
